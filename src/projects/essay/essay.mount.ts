import type { Mount } from '../../home/useMount'
import type { Lang, ProjectData } from '../types'
import { takeFlight, playFlight, cancelFlight } from '../cardFlight'
import { LOGO_D } from '../../home/brand'
import { BODY, COPY, NOTES, REPO, TITLE } from './data'
import type { EssayCopy } from './data'
import { isValidEmail, joinWaitlist } from './waitlist'
import './essay.css'

// The scroll story of Essay Studio: cream paper where the essay writes itself, the four agents leave their notes, the sheet tilts into a
// 3D model over the stars, and the details land on a desk next to a tear-off slip for the waitlist. One rAF drives one damped scroll value
// and stops when it settles. Layout is read on load and on resize; the frame loop only writes transform, opacity, visibility, clip-path
// and the score's text.

const cl = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const S = (p: number, a: number, b: number) => cl((p - a) / (b - a))
const EO = (x: number) => 1 - Math.pow(1 - x, 3)
const EIO = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string)

// The waitlist form lives for the whole visit, not for one mount: a language switch builds the page again and must not lose the typed
// email, a request in flight, or the thank-you.
const wl = { email: '', done: false, sending: false, refresh: null as null | (() => void) }

type Words = { t: HTMLElement; hl: HTMLElement | null }

// Title and essay text as words; every marked phrase gets an underline element that wipes in.
function essayHTML() {
  let i = 0
  const words = (text: string, a?: string) =>
    text.split(' ').filter(Boolean).map((w) => `<span class="w"${a ? ` data-a="${a}"` : ''} data-i="${i++}">${a ? '<i class="hl"></i>' : ''}<span class="t">${esc(w)}</span> </span>`).join('')
  const title = words(TITLE)
  let body = ''
  BODY.replace(/\{(\w+):([^}]*)\}|([^{}]+)/g, (_m, a: string | undefined, t: string | undefined, plain: string | undefined) => {
    body += a ? words(t as string, a) : words(plain as string)
    return ''
  })
  return { title, body }
}

const noteHTML = (n: [string, string, string]) => `<div class="note ${n[0]}"><b>${n[1]}</b>${esc(n[2])}</div>`

function objectsHTML(C: EssayCopy) {
  const t = C.tabs, d = C.details
  return `<article class="obj paper o1"><div class="tabs"><span class="t1">${t[0]}</span><span class="t2">${t[1]}</span><span class="t3">${t[2]}</span><span class="t4">${t[3]}</span></div><h3>${d[0][0]}</h3><p>${d[0][1]}</p></article>
  <article class="obj paper o2"><span class="hole"></span><span class="big">4.0</span><h3>${d[1][0]}</h3><p>${d[1][1]}</p></article>
  <article class="obj o3"><div class="sheet2"><span class="pdf">PDF</span><h3>${d[2][0]}</h3><p>${d[2][1]}</p></div></article>
  <article class="obj paper o4"><span class="file">${esc(TITLE)}</span><h3>${d[3][0]}</h3><p>${d[3][1]}</p></article>`
}

function slipHTML(C: EssayCopy, id: string) {
  const w = C.waitlist
  return `<div class="slip" id="${id}"><div class="pp paper"></div>
    <div class="main"><h2>${w.title}</h2><p>${w.text}</p>
      <div class="mx"></div>
    </div>
    <div class="stub"><svg viewBox="60 100 280 200" aria-hidden="true"><path d="${LOGO_D}"/></svg><b>${C.platform}</b></div></div>
  <div class="after"><a class="ebtn soft" href="${REPO}" target="_blank" rel="noopener noreferrer">${C.github}</a><small>${C.stack}</small></div>`
}

// The waitlist form: the same checks, the same request and the same four states the page always had.
function wireForm(host: HTMLElement, C: EssayCopy, lang: Lang, signal: AbortSignal) {
  const w = C.waitlist
  const mx = host.querySelector<HTMLElement>('.mx')
  if (!mx) return
  let status: 'idle' | 'invalid' | 'failed' = 'idle'
  const paint = () => {
    if (wl.done) { mx.innerHTML = `<p class="msg good" role="status">${w.done}</p>`; return }
    let form = mx.querySelector<HTMLFormElement>('form')
    if (!form) {
      mx.innerHTML = `<form class="form" novalidate><label class="sr-only" for="es-email">${w.emailLabel}</label><input id="es-email" type="email" name="email" autocomplete="email" inputmode="email" placeholder="${esc(w.placeholder)}"><button type="submit"></button></form><p class="msg bad" role="alert"></p>`
      form = mx.querySelector<HTMLFormElement>('form') as HTMLFormElement
      const input = form.querySelector('input') as HTMLInputElement
      input.value = wl.email
      input.addEventListener('input', () => {
        wl.email = input.value
        if (status !== 'idle') { status = 'idle'; paint() }
      }, { signal })
      form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (wl.sending) return
        if (!isValidEmail(input.value)) { status = 'invalid'; paint(); return }
        wl.sending = true; status = 'idle'
        const email = input.value
        paint()
        joinWaitlist(email, lang).then(
          () => { wl.done = true },
          (error: { code?: string; message?: string }) => {
            // The reason only, never the email.
            console.error('waitlist failed:', error?.code ?? error?.message)
            status = 'failed'
          },
        ).finally(() => { wl.sending = false; wl.refresh?.() })
      }, { signal })
    }
    const input = form.querySelector('input') as HTMLInputElement
    const btn = form.querySelector('button') as HTMLButtonElement
    const msg = mx.querySelector('.msg') as HTMLElement
    btn.disabled = wl.sending
    btn.textContent = wl.sending ? w.sending : w.button
    input.setAttribute('aria-invalid', String(status === 'invalid'))
    msg.textContent = status === 'invalid' ? w.invalid : status === 'failed' ? w.failed : ''
  }
  paint()
  // A request that finishes after a language switch updates whichever page is on screen now.
  const mine = () => { if (!signal.aborted) paint() }
  wl.refresh = mine
  signal.addEventListener('abort', () => { if (wl.refresh === mine) wl.refresh = null }, { once: true })
}

export const mountEssay: Mount<ProjectData> = (root, { lang, first }, { reduce }) => {
  const ac = new AbortController()
  const { signal } = ac
  const C = COPY[lang]
  let disposed = false
  root.classList.toggle('rm', reduce)

  const { title, body } = essayHTML()
  const slip = (id: string) => slipHTML(C, id)

  if (reduce) {
    // Reduced motion: the finished page, readable top to bottom, with nothing moving.
    root.innerHTML = `<section class="static"><div class="hero"><div class="in"><div class="intro"><h1>Essay Studio</h1><p>${C.intro}</p><a class="ebtn dark" href="#es-slip">${C.waitlist.button}</a></div>
      <div><div class="doc"><h4>${esc(TITLE)}</h4><p>${esc(BODY).replace(/\{(\w+):([^}]*)\}/g, '<span class="w" style="background:var(--$1)">$2</span>')}</p></div><div class="notes">${NOTES.map(noteHTML).join('')}</div></div></div></div>
      <div class="deskS"><div class="in"><h2>${C.detailsTitle}</h2><div class="objs">${objectsHTML(C)}</div><div class="slipS">${slip('es-slip')}</div></div></div></section>`
    wireForm(root, C, lang, signal)
    const f = first ? takeFlight('essay-studio') : null
    if (f) cancelFlight(f)
    return () => {
      disposed = true
      ac.abort()
      root.classList.remove('rm')
      root.replaceChildren()
    }
  }

  root.innerHTML = `<div class="track"><div class="stage">
    <div class="paperA"><div class="pa mat"></div></div>
    <div class="intro"><h1>Essay Studio</h1><p>${C.intro}</p><a class="ebtn dark" href="#es-slip">${C.waitlist.button}</a></div>
    <div class="caps">${C.caps.map((c, i) => `<div class="cap${i === 2 ? ' night' : ''}"><h2>${c[0]}</h2><p>${c[1]}</p></div>`).join('')}</div>
    <div class="scene"><div class="rig"><div class="under"></div><div class="board"></div>
      <div class="sheet"><i class="shd"></i><i class="bgp"></i><span class="score">10.0</span><h4>${title}</h4><p>${body}</p></div>
      <div style="display:contents">${NOTES.map(noteHTML).join('')}</div></div></div>
    <div class="desk"><div class="inner"><h2>${C.detailsTitle}</h2><div class="objs">${objectsHTML(C)}</div></div></div>
    <div class="slipwrap">${slip('es-slip')}</div>
  </div></div>`
  wireForm(root.querySelector('.slipwrap') as HTMLElement, C, lang, signal)

  const $ = <E extends Element>(sel: string) => root.querySelector(sel) as E
  const $$ = <E extends Element>(sel: string) => [...root.querySelectorAll<E>(sel)]
  const track = $<HTMLElement>('.track'), stage = $<HTMLElement>('.stage'), rig = $<HTMLElement>('.rig'), scene = $<HTMLElement>('.scene')
  const paperA = $<HTMLElement>('.paperA'), intro = $<HTMLElement>('.intro'), sheet = $<HTMLElement>('.sheet')
  const shd = $<HTMLElement>('.shd'), bgp = $<HTMLElement>('.bgp'), under = $<HTMLElement>('.under'), board = $<HTMLElement>('.board')
  const score = $<HTMLElement>('.score'), desk = $<HTMLElement>('.desk'), deskIn = $<HTMLElement>('.desk .inner'), deskH = $<HTMLElement>('.desk h2')
  const slipw = $<HTMLElement>('.slipwrap')
  const notes = $$<HTMLElement>('.rig .note'), caps = $$<HTMLElement>('.cap'), objs = $$<HTMLElement>('.desk .obj')
  const words: Words[] = $$<HTMLElement>('.sheet .w').map((e) => ({ t: e.querySelector('.t') as HTMLElement, hl: e.querySelector('.hl') }))
  const hls = words.filter((w) => w.hl)
  const bar = () => document.querySelector<HTMLElement>('.home-bar')

  // ---------- Writes that skip what did not change ----------
  const last = new WeakMap<Element, Record<string, string>>()
  function put(el: HTMLElement, key: 'transform' | 'opacity' | 'visibility' | 'clipPath', v: string) {
    let m = last.get(el)
    if (!m) { m = {}; last.set(el, m) }
    if (m[key] === v) return
    m[key] = v
    el.style[key] = v
  }
  let scoreText = ''

  // ---------- Layout: read once on load and on resize ----------
  interface World { sw: number; sh: number; vw: number; vh: number; m: boolean; unit: number; top: number; span: number }
  const W = {} as World
  function layout() {
    const vh = innerHeight, vw = innerWidth, m = vw <= 760
    const sw = m ? Math.min(330, vw * 0.86) : Math.max(440, Math.min(560, vw * 0.36))
    root.style.setProperty('--sw', sw + 'px')
    stage.style.height = vh + 'px'
    track.style.height = vh * (m ? 11 : 10.5) + 'px'
    rig.style.setProperty('--bl', m ? '-8%' : '-20%')
    rig.style.setProperty('--bw', m ? '116%' : '140%')
    Object.assign(W, { sw, sh: sw * 1.12, vw, vh, m, unit: sw / 100, top: track.getBoundingClientRect().top + scrollY, span: track.offsetHeight - vh })
    // Where each note rests on the sheet: fixed once, the frame only moves it.
    notes.forEach((n, i) => {
      const pos = m ? [19, 64] : ([[92, 4], [95, 28], [90, 52], [94, 76]][i])
      n.style.left = pos[0] + '%'
      n.style.top = pos[1] + '%'
      n.style.width = m ? '62cqw' : ''
    })
    last.delete(rig)
  }

  // ---------- The frame ----------
  function render(p: number) {
    const { sw, sh, vw, vh, m, unit } = W
    const tilt = EIO(S(p, 0.62, 0.8))
    const dx = m ? 0 : vw * (0.12 + 0.05 * tilt)
    const dy = m ? 150 - 100 * EO(S(p, 0.07, 0.16)) + 20 * tilt : 30 * tilt
    const sc = m ? 1 - 0.3 * tilt : 1 - 0.1 * tilt
    put(rig, 'transform', `translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0) rotateX(${(tilt * 52).toFixed(3)}deg) rotateZ(${(-tilt * 31).toFixed(3)}deg) scale(${sc.toFixed(4)})`)
    const sceneO = 1 - S(p, 0.8, 0.855)
    put(scene, 'opacity', sceneO.toFixed(3)); put(scene, 'visibility', sceneO <= 0 ? 'hidden' : 'visible')
    // The paper that fills the screen shrinks onto the sheet.
    const c = EIO(S(p, 0.54, 0.62))
    const cx = vw / 2 + dx, cy = vh / 2 + dy
    const L = cx - sw / 2, T = cy - sh / 2, R = vw - (cx + sw / 2), B = vh - (cy + sh / 2)
    put(paperA, 'clipPath', `inset(${(T * c).toFixed(1)}px ${(R * c).toFixed(1)}px ${(B * c).toFixed(1)}px ${(L * c).toFixed(1)}px round ${(c * sw * 0.03).toFixed(2)}px)`)
    put(paperA, 'visibility', c >= 0.999 ? 'hidden' : 'visible')
    put(shd, 'opacity', c.toFixed(3)); put(bgp, 'opacity', c.toFixed(3))
    put(sheet, 'transform', `translateZ(${(tilt * 4 * unit).toFixed(3)}px)`)
    put(under, 'opacity', tilt.toFixed(3))
    put(board, 'opacity', cl(S(p, 0.66, 0.74) * 3 - 0.3).toFixed(3))
    // Intro out.
    const io = S(p, 0.05, 0.12)
    put(intro, 'opacity', (1 - io).toFixed(3)); put(intro, 'transform', `translate3d(0,${(-24 * EO(io)).toFixed(2)}px,0)`); put(intro, 'visibility', io >= 1 ? 'hidden' : 'visible')
    // The text writes itself.
    const wv = 0.14 + 0.86 * S(p, 0.02, 0.3), N = words.length
    for (let i = 0; i < N; i++) put(words[i].t, 'opacity', cl((wv * (N + 7) - i) / 7).toFixed(3))
    // The agents leave their notes.
    notes.forEach((n, i) => {
      let op: number, tx = 0, sc2 = 1
      if (m) { const a = 0.3 + i * 0.055; op = S(p, a, a + 0.014) - S(p, a + 0.046, a + 0.058); sc2 = 0.96 + 0.04 * EO(S(p, a, a + 0.014)) }
      else { const a = 0.3 + i * 0.045, k = EO(S(p, a, a + 0.06)); op = k; tx = (1 - k) * 10; sc2 = 0.96 + 0.04 * k }
      const rot = [-4, 3, -2, 2][i]
      put(n, 'opacity', op.toFixed(3))
      put(n, 'transform', `translate3d(${(tx * unit).toFixed(2)}px,0,${(tilt * 12 * unit).toFixed(2)}px) rotate(${rot}deg) scale(${sc2.toFixed(4)})`)
    })
    // The highlights wipe in and the score counts down to its mark.
    const h = S(p, 0.5, 0.62), M = hls.length
    hls.forEach((o, j) => put(o.hl as HTMLElement, 'transform', `scaleX(${cl((h * (M + 4) - j) / 4).toFixed(3)})`))
    put(score, 'opacity', S(p, 0.6, 0.64).toFixed(3))
    const st = (10 - 6 * EO(S(p, 0.64, 0.78))).toFixed(1)
    if (st !== scoreText) { scoreText = st; score.textContent = st }
    // Captions.
    const win = [[0.1, 0.3], [0.31, 0.52], [0.6, 0.8]]
    caps.forEach((e, i) => {
      const [a, b] = win[i]
      put(e, 'opacity', (S(p, a, a + 0.03) - S(p, b - 0.03, b)).toFixed(3))
      put(e, 'transform', `translate3d(0,${((1 - EO(S(p, a, a + 0.03))) * 14).toFixed(2)}px,0) ${m ? '' : 'translateY(-50%)'}`)
    })
    // The desk: the details live on the board.
    const dk = EIO(S(p, 0.8, 0.87))
    put(desk, 'visibility', dk > 0 ? 'visible' : 'hidden')
    const ix = (vw / 2 - sw * 0.62) * (1 - dk), iy = (vh / 2 - sh * 0.62) * (1 - dk)
    put(desk, 'clipPath', `inset(${iy.toFixed(1)}px ${ix.toFixed(1)}px ${iy.toFixed(1)}px ${ix.toFixed(1)}px round ${((1 - dk) * 28).toFixed(1)}px)`)
    put(deskIn, 'opacity', S(dk, 0.45, 1).toFixed(3))
    // Phones show the details two at a time: the first pair leaves as the second pair arrives, so all four fit on a short screen.
    const outD = m ? S(p, 0.945, 0.968) : S(p, 0.935, 0.965)
    objs.forEach((o, i) => {
      const rot = [-1, 1.4, 1, -0.8][i]
      let k: number, gone: number
      if (m) {
        const second = i >= 2, a0 = second ? 0.912 + (i - 2) * 0.012 : 0.865 + i * 0.012
        k = EO(S(p, a0, a0 + 0.03)); gone = second ? outD : S(p, 0.9, 0.925)
      } else { k = EO(S(p, 0.865 + i * 0.012, 0.865 + i * 0.012 + 0.03)); gone = outD }
      put(o, 'opacity', (k * (1 - gone)).toFixed(3))
      put(o, 'transform', `translate3d(0,${((1 - k) * 50 - gone * 24).toFixed(2)}px,0) rotate(${(rot * k).toFixed(3)}deg)`)
      put(o, 'visibility', k * (1 - gone) <= 0.002 ? 'hidden' : 'visible')
    })
    put(deskH, 'opacity', (1 - outD).toFixed(3))
    // The waitlist arrives as a slip.
    const sl = EO(m ? S(p, 0.958, 0.988) : S(p, 0.945, 0.985))
    put(slipw, 'visibility', sl > 0 ? 'visible' : 'hidden')
    put(slipw, 'opacity', sl.toFixed(3))
    put(slipw, 'transform', `translate3d(0,${((1 - sl) * 90).toFixed(2)}px,0)`)
    slipw.style.pointerEvents = sl > 0.9 ? 'auto' : 'none'
    // The header wears paper ink over paper and night ink over the stars. The shell sets its own tone when the page enters or leaves the
    // top band, so compare against what is on the bar now.
    const b = bar(), want = p < 0.58 || p > 0.84 ? 'paper' : 'dark'
    if (b && b.dataset.tone !== want) b.dataset.tone = want
  }

  // ---------- One rAF, one damped scroll value ----------
  let target = 0, cur = 0, raf = 0, prev = 0
  const targetP = () => (W.span > 0 ? cl(scrollY - W.top, 0, W.span) / W.span : 0)
  function tick(now: number) {
    raf = 0
    const dt = Math.min(64, now - prev)
    prev = now
    const d = target - cur
    if (Math.abs(d) < 0.0005) { cur = target; render(cur); root.classList.remove('moving'); return }
    cur += d * (1 - Math.exp(-dt / 130))
    render(cur)
    raf = requestAnimationFrame(tick)
  }
  function wake() {
    target = targetP()
    if (raf || disposed) return
    root.classList.add('moving')
    prev = performance.now()
    raf = requestAnimationFrame(tick)
  }
  const settle = () => { target = cur = targetP(); render(cur) }

  layout()
  settle()
  // The shell writes the header tone after the first paint; write ours again once it has.
  const toneRaf = requestAnimationFrame(() => requestAnimationFrame(() => { if (!disposed) render(cur) }))

  // The intro button takes the visitor to the slip.
  $<HTMLAnchorElement>('.intro .ebtn').addEventListener('click', (e) => {
    e.preventDefault()
    scrollTo({ top: W.top + W.span, behavior: 'smooth' })
  }, { signal })

  // Resize: a new width or a real height change rebuilds the cached layout. The small height changes of a phone's address bar do not,
  // and neither does the keyboard opening on the email field.
  let sizeW = innerWidth, sizeH = innerHeight, sizeRaf = 0
  addEventListener('resize', () => {
    if (sizeRaf) return
    sizeRaf = requestAnimationFrame(() => {
      sizeRaf = 0
      const typing = document.activeElement instanceof HTMLInputElement && root.contains(document.activeElement)
      if (innerWidth === sizeW && (Math.abs(innerHeight - sizeH) < 140 || typing)) return
      sizeW = innerWidth; sizeH = innerHeight
      layout()
      settle()
    })
  }, { signal })
  addEventListener('scroll', wake, { passive: true, signal })
  document.fonts.ready.then(() => { if (disposed) return; layout(); settle() })

  // ---------- Entrance ----------
  const flight = first ? takeFlight('essay-studio') : null
  if (flight) {
    // The card's paper grows into this page; the stage appears over it.
    stage.style.opacity = '0'
    playFlight(flight, { sheetClass: 'es-mat', stage, signal })
  } else if (first) {
    stage.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 480, easing: 'ease' })
    intro.animate([{ translate: '0 12px' }, { translate: '0 0' }], { duration: 640, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' })
  }

  return () => {
    disposed = true
    ac.abort()
    cancelAnimationFrame(raf); cancelAnimationFrame(sizeRaf); cancelAnimationFrame(toneRaf)
    root.getAnimations({ subtree: true }).forEach((a) => a.cancel())
    root.classList.remove('rm', 'moving')
    root.style.removeProperty('--sw')
    root.replaceChildren()
  }
}
