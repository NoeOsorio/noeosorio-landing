import type { Mount } from '../useMount'
import type { Tip, TipsContent } from '../data/tips'
import { esc } from '../dom'
import { HOT, LED, LIME, LIME_RGB, LOGO_D, logoPaths } from '../brand'

const E = 'cubic-bezier(0.23, 1, 0.32, 1)'
const CUP = '<svg class="cup" viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 11 H21 V18 A6 6 0 0 1 15 24 H11 A6 6 0 0 1 5 18 Z M21 13 H23.5 A3 3 0 0 1 23.5 19 H21 M10 4 C 9 6 11 7 10 9 M15 4 C 14 6 16 7 15 9"/></svg>'
const ICONS = [
  CUP,
  '<svg class="cup" viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="6.5" width="23" height="17" rx="4"/><path d="M12.5 11 L19 15 L12.5 19 Z" fill="currentColor"/></svg>',
  '<svg class="cup" viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 9 L5 15 L11 21 M19 9 L25 15 L19 21 M17 6 L13 24"/></svg>',
]
const GLYPH: Record<string, string> = {
  Projects: '<rect x="3" y="5" width="18" height="12" rx="3"/><path d="M7 9 H13"/>', 'Essay Studio': '<path d="M6 3 H14 L18 7 V21 H6 Z M14 3 V7 H18 M9 12 H15 M9 15.5 H15"/>',
  About: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20 C 5 15.5 19 15.5 19 20"/>', 'llms.txt': '<path d="M5 7 L9 11 L5 15 M11 16 H19"/>',
  YouTube: '<rect x="3" y="6" width="18" height="12" rx="4"/><path d="M10.5 9.5 L14.5 12 L10.5 14.5 Z" fill="currentColor"/>', TikTok: '<path d="M14 3 V15 A4 4 0 1 1 10 11 M14 3 C 14.5 5.8 16.4 7.6 19 7.8"/>',
  Instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/>', GitHub: '<path d="M9 19 C 5 20.5 5 17 3.5 16.5 M14.5 21 V17.5 C 14.5 16.5 14.8 15.8 15.3 15.3 C 18 15 20.5 14 20.5 9.8 C 20.5 8.6 20 7.6 19.3 6.8 C 19.6 5.8 19.5 4.7 19 3.7 C 19 3.7 18 3.4 15.8 4.9 C 13.9 4.4 11.9 4.4 10 4.9 C 7.8 3.4 6.8 3.7 6.8 3.7 C 6.3 4.7 6.2 5.8 6.5 6.8 C 5.8 7.6 5.3 8.6 5.3 9.8 C 5.3 14 7.8 15 10.5 15.3 C 10 15.8 9.7 16.6 9.7 17.5 V21"/>',
  LinkedIn: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5 V16.5 M8 7.5 V7.6 M11.5 16.5 V10.5 M11.5 13 C 11.5 11.5 12.5 10.4 14 10.4 C 15.5 10.4 16.2 11.4 16.2 13 V16.5"/>',
}
const BELL_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 16 V11 A6 6 0 0 1 18 11 V16 L20 18 H4 Z M10 21 H14"/></svg>'

export const mountClose: Mount<TipsContent> = (root, C, env) => {
  const reduce = env.reduce
  const ac = new AbortController()
  const { signal } = ac
  let stopped = false
  const rafs = new Set<number>()
  const timers = new Set<ReturnType<typeof setTimeout>>()
  const intervals = new Set<ReturnType<typeof setInterval>>()
  const observers = new Set<IntersectionObserver>()
  const raf = (fn: FrameRequestCallback) => {
    const id = requestAnimationFrame((t) => { rafs.delete(id); if (!stopped) fn(t) })
    rafs.add(id)
    return id
  }
  const timeout = (ms: number, fn: () => void) => {
    const id = setTimeout(() => { timers.delete(id); if (!stopped) fn() }, ms)
    timers.add(id)
    return id
  }
  const interval = (ms: number, fn: () => void) => { const id = setInterval(() => { if (!stopped) fn() }, ms); intervals.add(id); return id }
  const clearInt = (id: ReturnType<typeof setInterval> | null) => { if (id !== null) { clearInterval(id); intervals.delete(id) } }
  const observe = (el: Element, cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) => {
    const io = new IntersectionObserver((entries, o) => { if (!stopped) cb(entries, o) }, opts)
    observers.add(io); io.observe(el); return io
  }

  root.innerHTML = `<section class="wrap" aria-label="${esc(C.sectionLabel)}">
  <div class="scene">
    <div class="device">
      <i class="cam" aria-hidden="true"></i>
      <div class="screen">
        <div class="view v-ask"></div>
        <div class="view pay v-pay" hidden></div>
        <div class="view judge v-judge" hidden></div>
      </div>
      <div class="chin" aria-hidden="true"><svg class="nfc" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9 9.5 A6.5 6.5 0 0 1 9 18.5"/><path d="M13.5 6.5 A10.5 10.5 0 0 1 13.5 21.5"/><path d="M18 3.5 A14.5 14.5 0 0 1 18 24.5"/></svg><i class="led"></i></div>
    </div>
    <svg class="standsvg" viewBox="0 -20 400 126" aria-hidden="true">
      <defs>
        <linearGradient id="close-neck" x1="0" x2="1"><stop offset="0" stop-color="#0E0E0D"/><stop offset=".3" stop-color="#4A4944"/><stop offset=".55" stop-color="#252421"/><stop offset="1" stop-color="#0B0B0A"/></linearGradient>
        <linearGradient id="close-side" x1="0" x2="1"><stop offset="0" stop-color="#0B0B0A"/><stop offset=".22" stop-color="#43423D"/><stop offset=".5" stop-color="#1D1C1A"/><stop offset="1" stop-color="#070706"/></linearGradient>
        <linearGradient id="close-top" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#55544E"/><stop offset=".5" stop-color="#2C2B28"/><stop offset="1" stop-color="#1A1917"/></linearGradient>
        <radialGradient id="close-contact" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#000" stop-opacity=".9"/><stop offset=".6" stop-color="#000" stop-opacity=".4"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
        <radialGradient id="close-cast" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
      <ellipse cx="246" cy="84" rx="200" ry="18" fill="url(#close-cast)"/>
      <ellipse cx="200" cy="79" rx="162" ry="12" fill="url(#close-contact)"/>
      <path d="M50 62 V76 A150 21 0 0 0 350 76 V62 Z" fill="url(#close-side)"/>
      <ellipse cx="200" cy="62" rx="150" ry="21" fill="url(#close-top)"/>
      <path d="M50 62 A150 21 0 0 0 350 62" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.2"/>
      <ellipse cx="200" cy="56" rx="34" ry="7" fill="#090908"/>
      <path d="M166 -22 H234 C232 14 226 38 222 56 A22 6 0 0 1 178 56 C174 38 168 14 166 -22 Z" fill="url(#close-neck)"/>
      <path d="M184 -10 C183 18 181 40 183 54" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="1.4" stroke-linecap="round"/></svg></div>
  <div class="side">
    <div class="robot" data-state="idle"></div>
    <div class="term" data-idle></div>
  </div>
</section>
<section class="band" id="subscribe" aria-labelledby="ships-title"><div class="ships"><div class="btnzone"></div><div class="copy"></div></div></section>
<footer class="band sitefoot"></footer>`

  const $ = <T extends Element>(sel: string) => root.querySelector(sel) as T
  const screen = $<HTMLElement>('.screen')
  const vAsk = $<HTMLElement>('.v-ask'), vPay = $<HTMLElement>('.v-pay'), vJudge = $<HTMLElement>('.v-judge')
  let viewTimers: ReturnType<typeof setTimeout>[] = []
  const later = (ms: number, fn: () => void) => { viewTimers.push(timeout(reduce ? 0 : ms, fn)) }
  function show(v: HTMLElement) {
    viewTimers.forEach((t) => { clearTimeout(t); timers.delete(t) }); viewTimers = []
    ;[vAsk, vPay, vJudge].forEach((x) => { x.hidden = x !== v })
    if (!reduce) v.animate([{ opacity: 0, filter: 'blur(4px)', transform: 'scale(.985)' }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { duration: 280, easing: E })
  }
  void screen

  // ---------- The ask ----------
  vAsk.innerHTML = `<div class="merchant"><svg viewBox="60 100 280 200" fill="var(--screen-ink)" aria-hidden="true">${logoPaths()}</svg><div><b>${esc(C.merchant)}</b><span>${esc(C.place)}</span></div></div><div class="bill"><span>${esc(C.receiptLine)}</span><i></i><span>${esc(C.total)}</span></div>
    <h2 class="ask">${esc(C.ask)}</h2><p class="askSub">${esc(C.askSub)}</p>
    <div class="tips">${C.tips.map((t, i) => `<a class="tip${i ? '' : ' hero'}" href="${esc(C.jar)}" target="_blank" rel="noopener" data-i="${i}"><span class="tt"><span class="price">${esc(t.price)}</span>${ICONS[i] || ''}</span><span class="name">${esc(t.name)}</span><span class="line">${esc(t.line)}</span></a>`).join('')}</div>
    <button class="notip" type="button">${esc(C.noTip)}</button>`
  vAsk.querySelectorAll<HTMLElement>('.tip').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); paid(C.tips[+(a.dataset.i as string)]) }, { signal }))
  vAsk.querySelector('.notip')!.addEventListener('click', judged, { signal })

  // ---------- Paying: the frame, my logo drawing itself, the check ----------
  function paid(t: Tip) {
    vPay.innerHTML = `<svg viewBox="-60 -60 120 120" fill="none" aria-hidden="true">
        <g class="frame" stroke="var(--lime-deep)" stroke-width="4.5" stroke-linecap="round"><path d="M-52 -26 V-40 A12 12 0 0 1 -40 -52 H-26"/><path d="M26 -52 H40 A12 12 0 0 1 52 -40 V-26"/><path d="M52 26 V40 A12 12 0 0 1 40 52 H26"/><path d="M-26 52 H-40 A12 12 0 0 1 -52 40 V26"/></g>
        <g class="logo" transform="scale(.31) translate(-200,-200)" stroke="var(--lime-deep)" stroke-width="7" stroke-linejoin="round">${logoPaths('class="lp" ')}</g>
        <path class="check" d="M-20 2 L-5 17 L22 -14" stroke="var(--lime-deep)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0"/></svg>
      <h3>${esc(C.thanks)}</h3><p>${esc(t.after)}</p>
      <div class="going"><span>${esc(C.openingJar)}</span><i><b></b></i></div>
      <a class="ghost jar" href="${esc(C.jar)}" target="_blank" rel="noopener" hidden>${esc(C.openJar)}</a>`
    show(vPay)
    const going = vPay.querySelector('.going') as HTMLElement, bar = going.querySelector('b') as HTMLElement, jarBtn = vPay.querySelector('.jar') as HTMLElement
    // After the thanks, a short bar fills and the page goes to the tip jar. If the browser blocks it, the button stays.
    const go = () => { try { location.assign(C.jar) } catch { /* the button below stays */ } timeout(700, () => { going.hidden = true; jarBtn.hidden = false }) }
    if (reduce) { vPay.querySelector('.check')!.setAttribute('opacity', '1'); vPay.querySelector('.logo')!.setAttribute('opacity', '0'); later(1200, go); return }
    const frame = vPay.querySelector('.frame') as SVGElement, logo = vPay.querySelector('.logo') as SVGElement, check = vPay.querySelector('.check') as SVGPathElement, lps = [...vPay.querySelectorAll<SVGPathElement>('.lp')]
    const words = [vPay.querySelector('h3') as HTMLElement, vPay.querySelector('p') as HTMLElement, going]
    words.forEach((w) => (w.style.opacity = '0'))
    lps.forEach((l) => { const L = l.getTotalLength(); l.style.strokeDasharray = String(L); l.style.strokeDashoffset = String(L); l.style.fill = 'transparent' })
    check.style.strokeDasharray = '60'; check.style.strokeDashoffset = '60'
    frame.animate([{ transform: 'scale(1.25)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 360, easing: E, fill: 'both' })
    lps.forEach((l, i) => l.animate([{ strokeDashoffset: l.style.strokeDasharray }, { strokeDashoffset: 0 }], { duration: 600, delay: 160 + i * 150, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards' }))
    lps.forEach((l) => l.animate([{ fill: 'rgba(110,154,30,0)' }, { fill: 'rgba(110,154,30,1)' }], { duration: 200, delay: 860, fill: 'forwards' }))
    logo.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(.24) translate(-200px,-200px)' }], { duration: 200, delay: 1160, easing: 'ease-out', fill: 'forwards' })
    check.animate([{ opacity: 0, strokeDashoffset: 60 }, { opacity: 1, strokeDashoffset: 60, offset: 0.01 }, { opacity: 1, strokeDashoffset: 0 }], { duration: 300, delay: 1280, easing: E, fill: 'forwards' })
    frame.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.07)' }, { transform: 'scale(1)' }], { duration: 300, delay: 1320, easing: E, composite: 'add' })
    words.forEach((w, i) => w.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 320, delay: 1500 + i * 90, easing: E, fill: 'forwards' }))
    bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 1500, delay: 1900, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards' })
    later(3500, go)
  }

  // ---------- No tip: the terminal takes it personally ----------
  function judged() {
    vJudge.innerHTML = `<div class="slipwrap"><div class="slip">${esc(C.slip)}</div><span class="noted">${esc(C.stamp)}</span></div>
      ${C.judged.map((l, i) => `<p class="say${i === C.judged.length - 1 ? ' small' : ''}">${esc(l)}</p>`).join('')}
      <div class="last"><h3>${esc(C.subscribeAsk)}</h3><div class="row">
        <a class="yt" href="${esc(C.youtube)}" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5 L19 12 L8 19 Z"/></svg>${esc(C.subscribe)}</a>
        <button class="ghost" type="button" style="margin-top:0">${esc(C.changedMind)}</button></div></div>`
    vJudge.querySelector('.ghost')!.addEventListener('click', () => show(vAsk), { signal })
    show(vJudge)
    if (reduce) return
    const stamp = vJudge.querySelector('.noted') as HTMLElement, says = [...vJudge.querySelectorAll<HTMLElement>('.say')], last = vJudge.querySelector('.last') as HTMLElement
    ;(vJudge.querySelector('.slipwrap') as HTMLElement).animate([{ transform: 'translateY(-30px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 420, easing: E, fill: 'both' })
    stamp.animate([{ opacity: 0, transform: 'rotate(-4deg) scale(1.5)' }, { opacity: 1, transform: 'rotate(-12deg) scale(.96)', offset: 0.6 }, { opacity: 1, transform: 'rotate(-12deg) scale(1)' }], { duration: 380, delay: 520, easing: E, fill: 'forwards' })
    // Long, awkward pauses between lines: that's the joke.
    const beats = [1300, 2400, 3700, 5300]
    says.forEach((s, i) => s.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 320, delay: beats[i], easing: E, fill: 'forwards' }))
    last.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 360, delay: 6500, easing: E, fill: 'forwards' })
  }

  // ---------- LED dot matrix ----------
  // Draw a shape into a tiny grid, then light one rounded square per filled cell.
  // The canvas gets one draw function, one observer and one set of listeners for its whole life;
  // the returned setup only recomputes the grid and the canvas size, then draws again.
  function matrix(canvas: HTMLCanvasElement, opts: { grid?: boolean; twinkle?: boolean }) {
    let cols = 0, rows = 0, cell = 10, gap = 1
    let on: { x: number; y: number; lit: boolean; hot: boolean }[] = []
    let seed = 11
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    let reveal = reduce ? Infinity : 0, mx = -1e4, my = -1e4, drawRaf = 0, inView = false, revealing = false, revealed = reduce
    function draw() {
      ctx.clearRect(0, 0, cols * cell, rows * cell)
      for (const c of on) {
        const px = c.x * cell + gap / 2, py = c.y * cell + gap / 2, s = cell - gap
        const near = Math.hypot(px + s / 2 - mx, py + s / 2 - my) < cell * 4.5
        if (c.lit && c.x <= reveal) ctx.fillStyle = near || c.hot ? HOT : LED
        else ctx.fillStyle = opts.grid ? `rgba(${LIME_RGB},.07)` : 'rgba(0,0,0,0)'
        ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(px, py, s, s, s * 0.22); else ctx.rect(px, py, s, s); ctx.fill()
      }
    }
    // A few dots catch the light now and then, like a real panel.
    if (opts.twinkle && !reduce) interval(900, () => { if (document.hidden || !inView) return; for (const c of on) if (c.lit) c.hot = rnd() < 0.08; draw() })
    // The lights come on from left to right the first time you see them, and never again.
    if (!reduce) observe(canvas, ([e]) => {
      inView = e.isIntersecting
      if (!inView || revealing || revealed) return
      revealing = true
      const t0 = performance.now()
      const step = (t: number) => { reveal = Math.min(cols, ((t - t0) / 1100) * cols); draw(); if (reveal < cols) raf(step); else { revealed = true; reveal = Infinity } }
      step(t0)
    }, { threshold: 0.2 })
    // Near the pointer the dots glow brighter.
    if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      canvas.addEventListener('pointermove', (e) => { const r = canvas.getBoundingClientRect(); mx = (e.clientX - r.left) * (cols * cell / r.width); my = (e.clientY - r.top) * (rows * cell / r.height); cancelAnimationFrame(drawRaf); rafs.delete(drawRaf); drawRaf = raf(draw) }, { signal })
      canvas.addEventListener('pointerleave', () => { mx = my = -1e4; draw() }, { signal })
    }
    return (nc: number, nr: number, ncell: number, paint: (o: CanvasRenderingContext2D, w: number, h: number) => void) => {
      const dpr = Math.min(3, devicePixelRatio || 1)
      cols = nc; rows = nr; cell = ncell; gap = Math.max(1, cell * 0.18)
      canvas.width = Math.round(cols * cell * dpr); canvas.height = Math.round(rows * cell * dpr); canvas.style.width = cols * cell + 'px'; canvas.style.height = rows * cell + 'px'
      const off = document.createElement('canvas'); off.width = cols; off.height = rows
      const o = off.getContext('2d') as CanvasRenderingContext2D; paint(o, cols, rows)
      const data = o.getImageData(0, 0, cols, rows).data
      on = []; seed = 11
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) { const a = data[(y * cols + x) * 4 + 3]; on.push({ x, y, lit: a > 110, hot: rnd() < 0.07 }) }
      ctx.setTransform(canvas.width / (cols * cell), 0, 0, canvas.height / (rows * cell), 0, 0)
      draw()
    }
  }

  // ---------- Robots only ----------
  // A captcha in reverse. People who wiggle the mouse fail it, and still get what robots get.
  const RB = C.robot, robot = $<HTMLElement>('.robot'), term = $<HTMLElement>('.term')
  const CHECK = `<svg class="ok" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 9.5 L7.5 13 L14.5 5"/></svg>`
  const CROSS = `<svg class="no" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 4 L12 12 M12 4 L4 12"/></svg>`
  robot.innerHTML = `<button class="box" type="button" aria-label="${esc(RB.check)}">${CHECK}${CROSS}<span class="spin"></span></button>
    <div class="rtext"><div class="lab">${esc(RB.check)}</div><div class="msg" aria-live="polite"></div></div>
    <div class="brand"><canvas width="34" height="25" aria-hidden="true"></canvas><span>${esc(RB.title)}</span></div>`
  {
    const cv = robot.querySelector('canvas') as HTMLCanvasElement, x = cv.getContext('2d') as CanvasRenderingContext2D
    const dpr = Math.min(3, devicePixelRatio || 1); cv.width = Math.round(34 * dpr); cv.height = Math.round(25 * dpr); x.scale(dpr, dpr)
    x.fillStyle = LIME; x.save(); x.scale(34 / 280, 25 / 200); x.translate(-60, -100); x.fill(new Path2D(LOGO_D)); x.restore()
  }
  let travel = 0, lx: number | null = null, ly: number | null = null
  window.addEventListener('pointermove', (e) => { if (lx !== null && ly !== null) travel += Math.hypot(e.clientX - lx, e.clientY - ly); lx = e.clientX; ly = e.clientY }, { passive: true, signal })
  // My logo as ASCII, drawn from the same shape as everywhere else.
  function asciiLogo(cols = 34, rows = 12) {
    const c = document.createElement('canvas'); c.width = cols; c.height = rows * 2
    const x = c.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D
    x.save(); const k = Math.min(cols / 270, (rows * 2) / 190); x.translate(cols / 2, rows); x.scale(k, k); x.translate(-200, -200)
    x.fill(new Path2D(LOGO_D)); x.restore()
    const d = x.getImageData(0, 0, cols, rows * 2).data, on = (i: number, j: number) => d[(j * cols + i) * 4 + 3] > 100
    let out = ''
    for (let j = 0; j < rows; j++) { let line = ''; for (let i = 0; i < cols; i++) { const t = on(i, j * 2), b = on(i, j * 2 + 1); line += t && b ? '█' : t ? '▀' : b ? '▄' : ' ' } out += line.replace(/\s+$/, '') + '\n' }
    return out.replace(/^\n+|\n+$/g, '')
  }
  const hl = (line: string) => {
    const h = esc(line)
    if (/^# /.test(line)) return `<span class="h1">${h}</span>`
    if (/^## /.test(line)) return `<span class="h2">${h}</span>`
    if (/^> /.test(line)) return `<span class="q">${h}</span>`
    return h.replace(/^- /, '<span class="b">- </span>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '[<span class="lk">$1</span>](<span class="q">$2</span>)')
  }
  // The file is the single source: it is fetched when the terminal runs, and a short line stands in if that fails.
  let llmsP: Promise<string> | null = null
  const loadLlms = () => llmsP ?? (llmsP = fetch(C.llmsUrl, { signal })
    .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.text() })
    .catch(() => { llmsP = null; return RB.fallback }))
  // The window is built once. Before the check it is an empty prompt waiting; each run only rewrites the body.
  const COPY_ICON = '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="2"/><path d="M10.5 5.5 V4.5 A2 2 0 0 0 8.5 2.5 H4.5 A2 2 0 0 0 2.5 4.5 V8.5 A2 2 0 0 0 4.5 10.5 H5.5"/></svg>'
  const DONE_ICON = '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 L6.5 12 L13 4.5"/></svg>'
  const RAW_ICON = '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 11 L11 5 M6 5 H11 V10"/></svg>'
  const PROMPT = '<span class="p">$</span> '
  term.innerHTML = `<div class="bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="t">${esc(RB.host)}</span><span class="acts"><button type="button" class="cp" disabled>${COPY_ICON}<span>${esc(C.copy)}</span></button><a href="${esc(C.llmsUrl)}" target="_blank" rel="noopener">${RAW_ICON}<span>${esc(C.openRaw)}</span></a></span></div><pre tabindex="0" role="region" aria-label="${esc(RB.terminalLabel)}">${PROMPT}<span class="cur"></span></pre>`
  const pre = term.querySelector('pre') as HTMLElement, cpBtn = term.querySelector('.cp') as HTMLButtonElement
  let fileText = ''
  cpBtn.addEventListener('click', () => {
    ;(navigator.clipboard ? navigator.clipboard.writeText(fileText) : Promise.reject()).then(() => {
      cpBtn.innerHTML = `${DONE_ICON}<span>${esc(C.copied)}</span>`; cpBtn.classList.add('done')
      timeout(1400, () => { cpBtn.innerHTML = `${COPY_ICON}<span>${esc(C.copy)}</span>`; cpBtn.classList.remove('done') })
    }).catch(() => {})
  }, { signal })
  let streamT: ReturnType<typeof setInterval> | null = null
  let runId = 0
  function runTerm(note: string) {
    const my = ++runId
    const wasIdle = term.hasAttribute('data-idle')
    term.removeAttribute('data-idle')
    pre.setAttribute('aria-busy', 'true'); pre.scrollTop = 0
    const fileP = loadLlms()
    const head = (note ? `<span class="q"># ${esc(note)}</span>\n` : '') + PROMPT
    const art = `<span class="ascii">${esc(asciiLogo())}</span>\n\n`
    const ready = (text: string) => { fileText = text; cpBtn.disabled = false }
    clearInt(streamT)
    if (reduce) {
      fileP.then((text) => { if (stopped || my !== runId) return; ready(text); pre.innerHTML = head + esc(RB.cmd) + '\n\n' + art + text.trimEnd().split('\n').map(hl).join('\n') + '\n\n' + PROMPT + '<span class="cur"></span>'; pre.setAttribute('aria-busy', 'false') })
      return
    }
    if (wasIdle) term.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 280, easing: E })
    // Type the command, print the logo, then stream the file a few lines at a time.
    let ch = 0
    streamT = interval(38, () => {
      ch++; pre.innerHTML = head + esc(RB.cmd.slice(0, ch)) + '<span class="cur"></span>'
      if (ch < RB.cmd.length) return
      clearInt(streamT)
      timeout(380, () => {
        fileP.then((text) => {
          if (stopped || my !== runId) return
          ready(text)
          const lines = text.trimEnd().split('\n'); let i = 0
          streamT = interval(45, () => {
            i = Math.min(lines.length, i + 2)
            pre.innerHTML = head + esc(RB.cmd) + '\n\n' + art + lines.slice(0, i).map(hl).join('\n') + (i >= lines.length ? '\n\n' + PROMPT + '<span class="cur"></span>' : '')
            pre.scrollTop = pre.scrollHeight; if (i >= lines.length) { clearInt(streamT); pre.setAttribute('aria-busy', 'false') }
          })
        })
      })
    })
  }
  robot.querySelector('.box')!.addEventListener('click', (e) => {
    if (robot.dataset.state === 'busy') return
    const box = e.currentTarget as HTMLButtonElement, msg = robot.querySelector('.msg') as HTMLElement, viaKeys = (e as MouseEvent).detail === 0
    robot.dataset.state = 'busy'; box.setAttribute('aria-busy', 'true'); msg.textContent = ''; msg.className = 'msg'
    timeout(reduce ? 0 : 900, () => {
      const human = !viaKeys && travel > 400
      robot.dataset.state = human ? 'fail' : 'pass'; box.removeAttribute('aria-busy')
      msg.textContent = human ? RB.failed : RB.passed; msg.className = 'msg ' + (human ? 'bad' : 'good')
      timeout(reduce ? 0 : 500, () => runTerm(human ? RB.failedSub : ''))
    })
  }, { signal })

  // ---------- Subscribe: the button you shouldn't press ----------
  // Get close and the safety cover lifts. Press it and it rings, then YouTube asks you to confirm.
  const S = C.ships, btnZone = $<HTMLElement>('.btnzone')
  btnZone.innerHTML = `<div class="halo" aria-hidden="true"></div><div class="plate"><i class="screw a" aria-hidden="true"></i><i class="screw b" aria-hidden="true"></i><i class="screw c" aria-hidden="true"></i><i class="screw d" aria-hidden="true"></i><div class="eng" aria-hidden="true"><span>${esc(S.plate)}</span><i class="lamp"></i></div>
    <div class="rig"><a class="big" href="${esc(C.youtube)}" target="_blank" rel="noopener" aria-label="${esc(S.aria)}"><span><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4 L20 12 L6 20 Z"/></svg>${esc(S.button)}</span></a>
    <span class="cover" aria-hidden="true"><b>${esc(S.cover)}</b></span><span class="hinge" aria-hidden="true"></span></div></div><p class="after" aria-live="polite"></p>`
  const pushBtn = btnZone.querySelector('.big') as HTMLElement, afterLine = btnZone.querySelector('.after') as HTMLElement, plateEl = btnZone.querySelector('.rig') as HTMLElement
  let pushed = false
  const coverOpen = () => btnZone.classList.add('open'), coverClose = () => { if (!pushed) btnZone.classList.remove('open') }
  // With a mouse the cover lifts as you approach and drops back if you walk away. On touch it lifts by itself.
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce) { btnZone.addEventListener('pointerenter', coverOpen, { signal }); btnZone.addEventListener('pointerleave', coverClose, { signal }) }
  else observe(plateEl, ([e], io) => { if (e.isIntersecting) { timeout(reduce ? 0 : 600, coverOpen); io.disconnect() } }, { threshold: 0.5 })
  pushBtn.addEventListener('focus', coverOpen, { signal })
  pushBtn.addEventListener('click', () => {
    pushed = true; coverOpen(); pushBtn.classList.add('down'); timeout(240, () => pushBtn.classList.remove('down'))
    afterLine.innerHTML = BELL_SVG + `<span>${esc(S.after)}</span>`
    if (reduce) return
    ;(afterLine.querySelector('svg') as SVGElement).animate([0, 1, 2, 3, 4, 5, 6].map((i) => ({ rotate: i === 6 ? '0deg' : `${(i % 2 ? -1 : 1) * (22 - i * 3)}deg` })), { duration: 700, easing: 'ease-out' })
    // A burst of lime sparks from the button.
    const r = pushBtn.getBoundingClientRect(), z = btnZone.getBoundingClientRect(), x0 = r.left - z.left + r.width / 2, y0 = r.top - z.top + r.height / 2
    for (let i = 0; i < 16; i++) {
      const sp = document.createElement('span'), an = (i / 16) * Math.PI * 2 + Math.random() * 0.3, d = 110 + Math.random() * 90
      sp.className = 'spark'; sp.style.left = x0 - 3.5 + 'px'; sp.style.top = y0 - 3.5 + 'px'; btnZone.appendChild(sp)
      sp.animate([{ transform: 'translate(0, 0) scale(1)', opacity: 1 }, { transform: `translate(${Math.cos(an) * d}px, ${Math.sin(an) * d}px) scale(.4) rotate(${Math.random() * 180}deg)`, opacity: 0 }], { duration: 700 + Math.random() * 300, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' }).finished.then(() => sp.remove(), () => {})
    }
  }, { signal })
  ;($('.copy') as HTMLElement).innerHTML = `<h2 id="ships-title">${esc(S.title)}</h2><p>${esc(S.text)}</p>`

  // ---------- Footer ----------
  const F = C.foot, sf = $<HTMLElement>('.sitefoot')
  const lnk = ([n, sub, h]: [string, string, string]) => {
    const ext = /^https?:/.test(h)
    return `<a class="lnk" href="${esc(h)}"${ext ? ' target="_blank" rel="noopener"' : ''}><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${GLYPH[n] || ''}</svg></span><span><b>${esc(n)}</b><small>${esc(sub)}</small></span><svg class="ar" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12L12 4M6 4h6v6"/></svg></a>`
  }
  sf.innerHTML = `<div class="top"><div class="lead"><p>${esc(F.line)}</p><a class="now" href="${esc(F.nowHref)}"><i></i>${esc(F.now)}</a></div><div class="cols">
      <div><span class="h">${esc(F.siteLabel)}</span>${F.site.map(lnk).join('')}</div>
      <div><span class="h">${esc(F.elsewhereLabel)}</span>${F.elsewhere.map(lnk).join('')}</div></div></div>
    <canvas class="bigname" role="img" aria-label="Noé Osorio"></canvas>
    <div class="fine2"><span class="c">© ${esc(C.year)} Noé Osorio</span><span class="l"><a href="${esc(F.privacy[1])}">${esc(F.privacy[0])}</a><button type="button" class="cookies">${esc(F.cookies)}</button><span>${esc(F.domain)}</span></span><button type="button" class="totop"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 10 V2 M2.5 5.5 L6 2 L9.5 5.5"/></svg>${esc(F.top)}</button></div>`
  sf.querySelector('.cookies')!.addEventListener('click', () => window.dispatchEvent(new Event('cookie-settings')), { signal })
  sf.querySelector('.totop')!.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }), { signal })
  const big = sf.querySelector('.bigname') as HTMLCanvasElement
  let bigM: ReturnType<typeof matrix> | null = null, bigKey = ''
  function bigName() {
    const pe = big.parentElement as HTMLElement, pcs = getComputedStyle(pe), W = pe.getBoundingClientRect().width - parseFloat(pcs.paddingLeft) - parseFloat(pcs.paddingRight) - parseFloat(pcs.borderLeftWidth) - parseFloat(pcs.borderRightWidth), base = W < 600 ? 6 : 10, cols = Math.floor(W / base), cell = W / cols, rows = 26
    const key = W + 'x' + base + 'x' + (devicePixelRatio || 1)
    if (bigM && key === bigKey) return
    bigKey = key
    if (!bigM) bigM = matrix(big, { grid: true })
    bigM(cols, rows, cell, (o, w, h) => {
      o.fillStyle = '#000'; o.textBaseline = 'alphabetic'; let size = 40; o.font = `600 ${size}px Geist, system-ui, sans-serif`
      const tw = o.measureText('Noé Osorio').width; size = size * Math.min((w - 2) / tw, 1.5); o.font = `600 ${size}px Geist, system-ui, sans-serif`
      const m = o.measureText('Noé Osorio'); o.fillText('Noé Osorio', (w - m.width) / 2, h - 3)
    })
  }
  ;(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => { if (!stopped) bigName() })
  let resizeT: ReturnType<typeof setTimeout> | undefined
  window.addEventListener('resize', () => { if (resizeT !== undefined) { clearTimeout(resizeT); timers.delete(resizeT) } resizeT = timeout(200, bigName) }, { signal })

  return () => {
    stopped = true
    ac.abort()
    observers.forEach((io) => io.disconnect()); observers.clear()
    rafs.forEach((id) => cancelAnimationFrame(id)); rafs.clear()
    timers.forEach((id) => clearTimeout(id)); timers.clear()
    intervals.forEach((id) => clearInterval(id)); intervals.clear()
    root.getAnimations({ subtree: true }).forEach((a) => a.cancel())
    root.innerHTML = ''
  }
}
