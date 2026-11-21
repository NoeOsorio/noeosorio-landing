import type { Mount } from '../useMount'
import type { LearningContent, LearningVideo } from '../data/learning'

const E = 'cubic-bezier(0.23, 1, 0.32, 1)'
const GRID = 15
const KEYS = ['build', 'life', 'career', 'podcast', 'taco']

const esc = (s: string | number) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string)
const fmtLen = (s: number) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = String(s % 60).padStart(2, '0')
  return h ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`
}
const fmtDate = (d: string) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
const url = (id: string) => `https://www.youtube.com/watch?v=${id}`

type Ctx = CanvasRenderingContext2D
type TextMask = { w: number; h: number; m: boolean[] }

// LED pictograms, drawn as shapes and sampled into dots.
const ICON: Record<string, (o: Ctx) => void> = {
  podcast: (o) => { o.lineWidth = 2.4; o.beginPath(); o.roundRect(8.5, 2.5, 7, 11.5, 3.5); o.fill(); o.beginPath(); o.arc(12, 11, 6.5, 0, Math.PI); o.stroke(); o.beginPath(); o.moveTo(12, 17.5); o.lineTo(12, 21); o.moveTo(7.5, 21.5); o.lineTo(16.5, 21.5); o.stroke() },
  build: (o) => { o.lineWidth = 2.6; o.beginPath(); o.moveTo(8, 6.5); o.lineTo(2.5, 12); o.lineTo(8, 17.5); o.moveTo(16, 6.5); o.lineTo(21.5, 12); o.lineTo(16, 17.5); o.moveTo(14, 4); o.lineTo(10, 20); o.stroke() },
  life: (o) => { o.beginPath(); o.moveTo(12, 22); o.bezierCurveTo(6, 15.5, 4.5, 12.5, 4.5, 9.5); o.arc(12, 9.5, 7.5, Math.PI, 0); o.bezierCurveTo(19.5, 12.5, 18, 15.5, 12, 22); o.fill(); o.globalCompositeOperation = 'destination-out'; o.beginPath(); o.arc(12, 9.5, 3, 0, Math.PI * 2); o.fill(); o.globalCompositeOperation = 'source-over' },
  career: (o) => { o.beginPath(); o.moveTo(12, 2); o.bezierCurveTo(16.5, 5.5, 17.5, 11, 15.5, 16); o.lineTo(8.5, 16); o.bezierCurveTo(6.5, 11, 7.5, 5.5, 12, 2); o.fill(); o.lineWidth = 2.2; o.beginPath(); o.moveTo(8.5, 12.5); o.lineTo(4.5, 17); o.lineTo(8.5, 16.5); o.moveTo(15.5, 12.5); o.lineTo(19.5, 17); o.lineTo(15.5, 16.5); o.moveTo(12, 18); o.lineTo(12, 22); o.stroke(); o.globalCompositeOperation = 'destination-out'; o.beginPath(); o.arc(12, 9, 2.2, 0, Math.PI * 2); o.fill(); o.globalCompositeOperation = 'source-over' },
  // A taco on its side: the folded shell is a dome, the filling peeks out along the bottom.
  taco: (o) => { o.lineWidth = 3.2; o.beginPath(); o.arc(12, 16, 9.5, Math.PI, 0); o.stroke(); o.beginPath(); [5, 9, 13, 17].forEach((x, i) => { const y = i % 2 ? 15.5 : 16.5; o.moveTo(x + 2.3, y); o.arc(x, y, 2.3, 0, 7) }); o.fill() },
}

// LED text: a real 5x7 dot-matrix alphabet (marquee and ticket strips).
const FONT: Record<string, string> = {
  A: '01110100011000111111100011000110001', B: '11110100011000111110100011000111110', C: '01110100011000010000100001000101110', D: '11110100011000110001100011000111110',
  E: '11111100001000011110100001000011111', F: '11111100001000011110100001000010000', G: '01110100011000010111100011000101111', H: '10001100011000111111100011000110001',
  I: '01110001000010000100001000010001110', J: '00111000100001000010000101001001100', K: '10001100101010011000101001001010001', L: '10000100001000010000100001000011111',
  M: '10001110111010110101100011000110001', N: '10001100011100110101100111000110001', O: '01110100011000110001100011000101110', P: '11110100011000111110100001000010000',
  Q: '01110100011000110001101011001001101', R: '11110100011000111110101001001010001', S: '01111100001000001110000010000111110', T: '11111001000010000100001000010000100',
  U: '10001100011000110001100011000101110', V: '10001100011000110001100010101000100', W: '10001100011000110101101011010101010', X: '10001100010101000100010101000110001',
  Y: '10001100011000101010001000010000100', Z: '11111000010001000100010001000011111',
  0: '01110100011001110101110011000101110', 1: '00100011000010000100001000010001110', 2: '01110100010000100010001000100011111', 3: '11111000100010000010000011000101110',
  4: '00010001100101010010111110001000010', 5: '11111100001111000001000011000101110', 6: '00110010001000011110100011000101110', 7: '11111000010001000100010000100001000',
  8: '01110100011000101110100011000101110', 9: '01110100011000101111000010001001100',
  '?': '01110100010000100010001000000000100', '-': '00000000000000011111000000000000000',
}
const NARROW: Record<string, string[]> = { ' ': ['000', '000', '000', '000', '000', '000', '000'], ':': ['0', '1', '1', '0', '1', '1', '0'], '!': ['1', '1', '1', '1', '1', '0', '1'], '.': ['0', '0', '0', '0', '0', '0', '1'] }

function textMask(text: string): TextMask {
  const glyphs = [...text.toUpperCase()].map((ch) => NARROW[ch] || (FONT[ch] ? (FONT[ch].match(/.{5}/g) as string[]) : NARROW[' ']))
  const w = glyphs.reduce((a, g) => a + g[0].length + 1, -1)
  const m = new Array<boolean>(w * 7).fill(false)
  let x0 = 0
  glyphs.forEach((g) => {
    for (let y = 0; y < 7; y++) for (let x = 0; x < g[y].length; x++) if (g[y][x] === '1') m[y * w + x0 + x] = true
    x0 += g[0].length + 1
  })
  return { w, h: 7, m }
}

export const mountLearning: Mount<LearningContent> = (root, C, env) => {
  const reduce = env.reduce
  const ac = new AbortController()
  const { signal } = ac
  let stopped = false
  const rafs = new Set<number>()
  const timers = new Set<ReturnType<typeof setTimeout>>()
  const raf = (fn: FrameRequestCallback) => {
    const id = requestAnimationFrame((t) => { rafs.delete(id); if (!stopped) fn(t) })
    rafs.add(id)
    return id
  }
  const later = (ms: number, fn: () => void) => {
    const id = setTimeout(() => { timers.delete(id); if (!stopped) fn() }, ms)
    timers.add(id)
    return id
  }
  const clearLater = (id: ReturnType<typeof setTimeout> | undefined) => { if (id !== undefined) { clearTimeout(id); timers.delete(id) } }

  root.innerHTML = `<div class="lo"><h2 id="lo-title">${esc(C.title)}</h2><p class="sub">${esc(C.sub)}</p>
  <div class="grid">
    <div>
      <div class="machine">
        <div class="cab">
          <canvas class="marq" aria-hidden="true"></canvas>
          <div class="reels" aria-hidden="true"></div>
          <div class="slot"></div>
        </div>
        <div class="lever"><div class="track"><button class="knob" type="button" aria-label="${esc(C.marquee)}"></button></div><span>${esc(C.pull)}</span></div>
      </div>
      <div class="ticket" aria-live="polite"></div>
    </div>
    <div class="list"></div>
  </div></div>`
  root.setAttribute('aria-labelledby', 'lo-title')

  const $ = <T extends Element>(sel: string) => root.querySelector(sel) as T

  // ---------- LED pictograms ----------
  const mask: Record<string, boolean[]> = {}
  for (const k in ICON) {
    const c = document.createElement('canvas'); c.width = c.height = GRID
    const o = c.getContext('2d') as Ctx
    o.fillStyle = o.strokeStyle = '#000'; o.lineCap = o.lineJoin = 'round'; o.save(); o.translate(0.5, 0.5); o.scale((GRID - 1) / 24, (GRID - 1) / 24); ICON[k](o); o.restore()
    const d = o.getImageData(0, 0, GRID, GRID).data; mask[k] = []
    for (let i = 0; i < GRID * GRID; i++) mask[k].push(d[i * 4 + 3] > 95)
  }
  let seed = 3
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  function dots(ctx: Ctx, x0: number, y0: number, cell: number, k: string, dim = true, glow = 0) {
    const m = mask[k], g = Math.max(1, cell * 0.2), s = cell - g
    for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) {
      const on = m[y * GRID + x]
      if (!on && !dim) continue
      ctx.fillStyle = on ? (rnd() < 0.07 + glow ? '#F2FFD2' : '#9FD043') : 'rgba(214,243,92,.07)'
      ctx.beginPath(); ctx.roundRect(x0 + x * cell + g / 2, y0 + y * cell + g / 2, s, s, s * 0.22); ctx.fill()
    }
  }
  const dpr = Math.min(2, devicePixelRatio || 1)
  const sizeCanvas = (cv: HTMLCanvasElement, w: number, h: number) => { cv.width = w * dpr; cv.height = h * dpr; const x = cv.getContext('2d') as Ctx; x.setTransform(dpr, 0, 0, dpr, 0, 0); return x }

  // Draws a dot board. hot(x, y) can light some dots brighter, for the shimmer and the blink.
  function ledText(ctx: Ctx, W: number, H: number, cell: number, tm: TextMask, offset: number, align: string, hot: ((x: number, y: number) => boolean) | null, lit = true) {
    ctx.clearRect(0, 0, W, H)
    const cols = Math.floor(W / cell), rows = Math.floor(H / cell), g = Math.max(1, cell * 0.22), s = cell - g, top = Math.floor((rows - tm.h) / 2)
    const ox = (W - cols * cell) / 2, oy = (H - rows * cell) / 2
    const start = align === 'left' ? 2 : align === 'right' ? cols - tm.w - 2 : Math.floor((cols - tm.w) / 2)
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      let tx = x - start + offset
      if (offset) tx = ((tx % (tm.w + cols)) + tm.w + cols) % (tm.w + cols)
      const ty = y - top
      const on = lit && tx >= 0 && tx < tm.w && ty >= 0 && ty < tm.h && tm.m[ty * tm.w + tx]
      ctx.fillStyle = on ? (hot && hot(x, y) ? '#F2FFD2' : '#9FD043') : 'rgba(214,243,92,.06)'
      ctx.beginPath(); ctx.roundRect(ox + x * cell + g / 2, oy + y * cell + g / 2, s, s, s * 0.22); ctx.fill()
    }
  }

  // ---------- Marquee ----------
  const marq = $<HTMLCanvasElement>('.marq'), base = textMask(C.marquee)
  let marqText = base, marqMode = 'idle', marqT0 = 0, visible = false, looping = false, sayT: ReturnType<typeof setTimeout> | undefined
  function say(text: string, mode: string, ms?: number) {
    marqText = textMask(text); marqMode = mode; marqT0 = performance.now(); clearLater(sayT)
    if (ms) sayT = later(ms, () => say(C.marquee, 'idle'))
    if (reduce) marqDraw(0)
  }
  function marqDraw(t: number) {
    const W = marq.clientWidth || 600, cell = Math.max(3, Math.min(7, Math.floor(W / (base.w + 6)))), H = cell * 11, x = sizeCanvas(marq, W, H)
    marq.style.height = H + 'px'
    const cols = Math.floor(W / cell), fits = marqText.w + 4 <= cols, e = t - marqT0
    let hot: ((c: number, r: number) => boolean) | null = null, lit = true
    if (marqMode === 'idle' && !reduce) { const band = (t / 22) % (cols + 40) - 20; hot = (c, r) => Math.abs(c - band + r * 0.6) < 2.2 }
    if (marqMode === 'spin' && !reduce) hot = () => Math.random() < 0.18
    if (marqMode === 'blink' && !reduce) lit = Math.floor(e / 170) % 2 === 0 || e > 170 * 6
    ledText(x, W, H, cell, marqText, fits ? 0 : Math.floor(e / 45), fits ? 'center' : 'left', hot, lit)
  }

  // ---------- Reels ----------
  const reelsBox = $<HTMLElement>('.reels')
  type Reel = { cv: HTMLCanvasElement; key: string; pos: number; flash: number; done?: boolean }
  const reels: Reel[] = [0, 1, 2].map(() => {
    const r = document.createElement('div'); r.className = 'reel'
    const cv = document.createElement('canvas'); r.appendChild(cv); reelsBox.appendChild(r)
    return { cv, key: 'podcast', pos: 0, flash: 0 }
  })
  function drawReel(R: Reel, spinning: boolean) {
    const W = R.cv.clientWidth || 150, cell = Math.floor(W / (GRID + 2)), H = cell * (GRID + 2), x = sizeCanvas(R.cv, W, H)
    x.clearRect(0, 0, W, H)
    if (!spinning) { const f = Math.max(0, 1 - (performance.now() - R.flash) / 420); dots(x, (W - cell * GRID) / 2, cell, cell, R.key, true, f * 0.8); return }
    // While spinning, symbols slide down past the window, a little blurred.
    const step = H, off = (R.pos % 1) * step, a = KEYS[Math.floor(R.pos) % KEYS.length], b = KEYS[(Math.floor(R.pos) + 1) % KEYS.length]
    x.save(); x.globalAlpha = 0.9; x.filter = 'blur(1px)'; dots(x, (W - cell * GRID) / 2, cell + off - step, cell, b, false); dots(x, (W - cell * GRID) / 2, cell + off, cell, a, false); x.restore()
  }
  const drawAll = () => reels.forEach((R) => drawReel(R, false))

  // ---------- Ticket ----------
  const ticket = $<HTMLElement>('.ticket')
  let current: LearningVideo | null = null
  function printTicket(v: LearningVideo, jackpot: boolean, animate = true) {
    ticket.innerHTML = `<canvas class="strip" aria-hidden="true"></canvas><h3>${esc(v.title)}</h3><div class="meta"><span>${esc(fmtDate(v.date))}</span></div>
      ${jackpot ? `<p class="jp">${esc(C.jackpot)}</p>` : ''}<div class="row"><a class="watch" href="${esc(url(v.id))}" target="_blank" rel="noopener"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4 L20 12 L7 20 Z"/></svg>${esc(C.watch)}</a><button class="again" type="button">${esc(C.again)}</button></div>`
    const st = ticket.querySelector('.strip') as HTMLCanvasElement, W = st.clientWidth || 480, cell = Math.max(3, Math.min(5, Math.floor(W / 80))), H = cell * 11, x = sizeCanvas(st, W, H)
    st.style.height = H + 'px'
    // The strip prints what the reels landed on: the topic on the left, how long the video is on the right.
    const label = textMask(jackpot ? 'JACKPOT' : C.cats[v.cat]), len = textMask(fmtLen(v.len))
    ledText(x, W, H, cell, label, 0, 'left', null)
    const cols = Math.floor(W / cell), rows = Math.floor(H / cell), g = Math.max(1, cell * 0.22), s = cell - g, top = Math.floor((rows - 7) / 2), ox = (W - cols * cell) / 2, oy = (H - rows * cell) / 2
    for (let y = 0; y < 7; y++) for (let xx = 0; xx < len.w; xx++) if (len.m[y * len.w + xx]) { x.fillStyle = '#F2FFD2'; x.beginPath(); x.roundRect(ox + (cols - len.w - 2 + xx) * cell + g / 2, oy + (top + y) * cell + g / 2, s, s, s * 0.22); x.fill() }
    ticket.querySelector('.again')!.addEventListener('click', () => { pullLever() }, { signal })
    if (animate && !reduce) ticket.animate([{ clipPath: 'inset(0 0 100% 0)', transform: 'translateY(-14px)' }, { clipPath: 'inset(0 0 0 0)', transform: 'none' }], { duration: 700, easing: 'steps(12, end)' })
    current = v; markList()
  }

  // ---------- Pull ----------
  let spinning = false
  function pull() {
    if (spinning) return
    spinning = true
    const pool = C.videos.filter((x) => x !== current), v = pool[Math.floor(Math.random() * pool.length)], jackpot = Math.random() < 1 / 12, target = jackpot ? 'taco' : v.cat
    if (reduce) { reels.forEach((R) => (R.key = target)); drawAll(); printTicket(v, jackpot); spinning = false; return }
    say(C.spinning, 'spin')
    ticket.animate([{ opacity: 1, transform: 'none' }, { opacity: 0.35, transform: 'translateY(-6px)' }], { duration: 200, easing: E, fill: 'forwards' })
    const t0 = performance.now(), stops = [900, 1250, 1600]
    reels.forEach((R) => { R.pos = Math.random() * 5; R.done = false })
    const step = (t: number) => {
      reels.forEach((R, i) => {
        if (R.done) return
        const left = stops[i] - (t - t0)
        if (left <= 0) {
          R.done = true; R.key = target; R.flash = t; drawReel(R, false)
          R.cv.animate([{ transform: 'translateY(-10px)' }, { transform: 'translateY(4px)' }, { transform: 'none' }], { duration: 280, easing: E }); return
        }
        R.pos += Math.max(0.06, Math.min(0.38, left / 2200)); drawReel(R, true)
      })
      if (reels.every((R) => R.done)) {
        spinning = false; ticket.getAnimations().forEach((a) => a.cancel()); printTicket(v, jackpot)
        say(jackpot ? C.jackpotSign : C.cats[v.cat], 'blink', jackpot ? 3200 : 2000)
        if (jackpot) reelsBox.animate([{ boxShadow: 'inset 0 0 0 1px rgba(242,255,210,.9), inset 0 0 60px rgba(214,243,92,.35)' }, { boxShadow: 'inset 0 0 0 1px rgba(214,243,92,.28), inset 0 0 40px rgba(214,243,92,.06)' }], { duration: 300, iterations: 5, easing: 'ease' })
        return
      }
      raf(step)
    }
    step(t0)
  }

  // One loop, only while the machine is on screen and the tab is visible: marquee shimmer and the reels' idle twinkle.
  let lastTw = 0
  function loop(t: number) {
    if (!visible || reduce || document.hidden) { looping = false; return }
    marqDraw(t)
    if (!spinning && t - lastTw > 140) { lastTw = t; drawAll() }
    raf(loop)
  }
  const startLoop = () => { if (visible && !looping && !reduce && !document.hidden) { looping = true; raf(loop) } }
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; startLoop() })
  io.observe($('.cab'))
  document.addEventListener('visibilitychange', startLoop, { signal })

  // ---------- Lever: click it or drag it down ----------
  const knob = $<HTMLButtonElement>('.knob'), track = knob.parentElement as HTMLElement
  let drag: { y: number; max: number } | null = null
  const setKnob = (y: number) => { knob.style.transform = `translateY(${y}px)` }
  function release(full: boolean) {
    knob.animate([{ transform: knob.style.transform || 'none' }, { transform: 'translateY(0)' }], { duration: 420, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' })
    setKnob(0); if (full) pull()
  }
  knob.addEventListener('pointerdown', (e) => { drag = { y: e.clientY, max: track.clientHeight - 10 }; knob.setPointerCapture(e.pointerId) }, { signal })
  knob.addEventListener('pointermove', (e) => { if (!drag) return; setKnob(Math.max(0, Math.min(drag.max, e.clientY - drag.y))) }, { signal })
  knob.addEventListener('pointerup', (e) => {
    if (!drag) return
    const moved = e.clientY - drag.y; drag = null
    if (Math.abs(moved) < 6) pullLever()
    else release(moved > (track.clientHeight - 10) * 0.55)
  }, { signal })
  knob.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pullLever() } }, { signal })
  // A click or "Pull again" still shows the lever going down and springing back.
  function pullLever() {
    if (spinning) return
    if (!reduce) knob.animate([{ transform: 'translateY(0)' }, { transform: `translateY(${track.clientHeight - 10}px)`, offset: 0.4, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }, { transform: 'translateY(0)' }], { duration: 640, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' })
    setKnob(0); later(reduce ? 0 : 220, pull)
  }

  // ---------- List ----------
  const list = $<HTMLElement>('.list')
  let filter = 'all'
  const cats = ['all', ...Object.keys(C.cats)]
  list.innerHTML = `<h3>${esc(C.latest)}</h3><div class="chips" role="group" aria-label="Topics">${cats.map((k) => `<button class="chip" type="button" data-k="${k}" aria-pressed="${k === 'all'}">${esc(k === 'all' ? C.all : C.cats[k as keyof typeof C.cats])}</button>`).join('')}</div><div class="vids"></div>
    <a class="more" href="${esc(C.channel)}" target="_blank" rel="noopener">${esc(C.allVideos)}<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8 H13 M9 4 L13 8 L9 12"/></svg></a>`
  const vids = list.querySelector('.vids') as HTMLElement
  function renderList() {
    const shown = C.videos.filter((v) => filter === 'all' || v.cat === filter).slice(0, 6)
    vids.innerHTML = shown.map((v) => `<a class="vid" href="${esc(url(v.id))}" target="_blank" rel="noopener" data-id="${esc(v.id)}"><canvas aria-hidden="true"></canvas><div><div class="top"><b>${esc(C.cats[v.cat])}</b><span>${esc(fmtDate(v.date))}</span></div><div class="t">${esc(v.title)}</div></div></a>`).join('')
    vids.querySelectorAll<HTMLElement>('.vid').forEach((a, i) => { const v = shown[i], cv = a.querySelector('canvas') as HTMLCanvasElement, x = sizeCanvas(cv, 64, 64); dots(x, (64 - 3.6 * GRID) / 2, (64 - 3.6 * GRID) / 2, 3.6, v.cat, false) })
    markList()
  }
  function markList() { vids.querySelectorAll<HTMLElement>('.vid').forEach((a) => a.classList.toggle('on', !!current && a.dataset.id === current.id)) }
  list.querySelectorAll<HTMLElement>('.chip').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.k as string; list.querySelectorAll('.chip').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); renderList() }, { signal }))

  // ---------- Start: the machine shows the newest video ----------
  function boot() { marqDraw(performance.now()); reels.forEach((R) => (R.key = C.videos[0].cat)); drawAll(); renderList(); printTicket(C.videos[0], false, false) }
  ;(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => { if (!stopped) boot() })
  let resizeT: ReturnType<typeof setTimeout> | undefined
  window.addEventListener('resize', () => { clearLater(resizeT); resizeT = later(200, () => { marqDraw(performance.now()); drawAll(); if (current) printTicket(current, false, false) }) }, { signal })

  return () => {
    stopped = true
    ac.abort()
    io.disconnect()
    rafs.forEach((id) => cancelAnimationFrame(id)); rafs.clear()
    timers.forEach((id) => clearTimeout(id)); timers.clear()
    root.getAnimations({ subtree: true }).forEach((a) => a.cancel())
    root.removeAttribute('aria-labelledby')
    root.innerHTML = ''
  }
}
