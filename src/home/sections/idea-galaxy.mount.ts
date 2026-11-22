import type { Mount } from '../useMount'
import type { GalaxyContent } from '../data/galaxy'
import { HOT, HOT_RGB, INK, LED, LIME, LIME_RGB, LOGO_D } from '../brand'

/* eslint-disable @typescript-eslint/no-explicit-any */
// The fixed top bar lives outside the section, so its band is kept free of words.
const BAR_BAND = 84

export const mountGalaxy: Mount<GalaxyContent> = (root, C, { reduce }) => {
  const ac = new AbortController()
  const { signal } = ac
  let raf = 0
  let resizeTimer = 0
  let io: IntersectionObserver | null = null
  let dead = false

  root.replaceChildren()
  const cv = document.createElement('canvas')
  cv.setAttribute('aria-hidden', 'true')
  const copy = document.createElement('div')
  copy.className = 'copy'
  const h1 = document.createElement('h1')
  h1.id = 'home-galaxy-title'
  const p = document.createElement('p')
  const tip = document.createElement('div')
  tip.className = 'tip'
  tip.setAttribute('role', 'status')
  const sr = document.createElement('span')
  sr.className = 'sr-only'
  sr.textContent = C.srSummary
  copy.append(h1, p, sr)
  root.append(cv, copy, tip)

  const ctx = cv.getContext('2d')!
  // The name is lime; the catchphrase is a second, smaller line of the same headline.
  const em = document.createElement('em')
  em.textContent = 'Noé'
  const cp = document.createElement('span')
  cp.className = 'catch'
  cp.textContent = C.catchphrase
  const [pre, post] = C.title.split('Noé')
  h1.append(pre, em, post, cp)
  p.textContent = C.sub

  // ---------- Easing (strong ease-out for arrivals, strong ease-in-out for flights) ----------
  const eOut = (t: number) => 1 - Math.pow(1 - t, 4)
  const eInOut = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2)
  const eBack = (t: number) => { const c = 1.4; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2) }
  const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v))
  let seed = 7
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const shuffle = <T,>(arr: T[]): T[] => { const o = arr.slice(); for (let i = o.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [o[i], o[j]] = [o[j], o[i]] } return o }

  // ---------- The logo, rasterized once into LED cells ----------
  const LOGO = new Path2D(LOGO_D)
  const GW = 30, GH = 21
  const raster: { gx: number; gy: number }[] = []
  {
    const o = document.createElement('canvas'); o.width = GW; o.height = GH
    const x = o.getContext('2d')!; x.scale(GW / 280, GH / 200); x.translate(-60, -100); x.fill(LOGO)
    const d = x.getImageData(0, 0, GW, GH).data
    for (let gy = 0; gy < GH; gy++) for (let gx = 0; gx < GW; gx++) if (d[(gy * GW + gx) * 4 + 3] > 100) raster.push({ gx, gy })
  }

  // ---------- Layout ----------
  let W = 0, H = 0, cx = 0, cy = 0, R = 0, cell = 0, ox = 0, oy = 0
  let avoid: { x: number; y: number; w: number; h: number }[] = []
  let grid: HTMLCanvasElement | null = null
  let mobile = false
  function layout() {
    const r = root.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1)
    W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    mobile = W < 760
    cx = mobile ? W * 0.5 : W * 0.66; cy = mobile ? H * 0.34 : H * 0.54
    R = mobile ? Math.min(W * 0.4, H * 0.2) : Math.min(W * 0.24, H * 0.36)
    const L = R * 1.22; cell = L / GW; ox = cx - L / 2; oy = cy - (GH * cell) / 2
    avoid = [{ x: 0, y: 0, w: W, h: BAR_BAND }, ...[...root.querySelectorAll('.copy > *:not(.sr-only)')].map(el => { const q = el.getBoundingClientRect(); return { x: q.left - r.left - 18, y: q.top - r.top - 14, w: q.width + 36, h: q.height + 28 } })]
    // The empty slots the ideas will fill: a faint dot lattice inside the inner circle.
    grid = document.createElement('canvas'); grid.width = W * dpr; grid.height = H * dpr
    const g = grid.getContext('2d')!; g.setTransform(dpr, 0, 0, dpr, 0, 0)
    g.fillStyle = `rgba(${LIME_RGB},.07)`; const s = cell * 0.5
    for (let gy = -12; gy < GH + 12; gy++) for (let gx = -12; gx < GW + 12; gx++) {
      const x = ox + (gx + 0.5) * cell, y = oy + (gy + 0.5) * cell; if (Math.hypot(x - cx, y - cy) > R * 0.8) continue
      g.beginPath(); g.roundRect(x - s / 2, y - s / 2, s, s, s * 0.25); g.fill()
    }
  }
  const cellPos = (i: number) => ({ x: ox + (raster[i].gx + 0.5) * cell, y: oy + (raster[i].gy + 0.5) * cell })
  const RINGS = [0.98, 1.13, 0.86], SPIN = [0.00016, -0.00011, 0.00021]
  const planetPos = (pl: any, t: number) => { const r = R * RINGS[pl.ring], an = pl.a0 + SPIN[pl.ring] * t; return { x: cx + Math.cos(an) * r, y: cy + Math.sin(an) * r, an, r } }
  const skyPos = (s: any) => ({ x: s.u * W, y: s.v * H })
  const hits = (x: number, y: number, w: number, h: number) => avoid.some(q => x < q.x + q.w && x + w > q.x && y < q.y + q.h && y + h > q.y)
  // Words need room to be read: keep them well inside the hero, clear of the top bar and the bottom edge.
  const safe = () => ({ side: mobile ? 24 : 56, top: BAR_BAND + 24, bottom: mobile ? 40 : 56 })
  function inSafe(x: number, y: number, w: number, h: number) {
    const m = safe(); return x >= m.side && y >= m.top && x + w <= W - m.side && y + h <= H - m.bottom
  }
  function freeSpot(w: number, h: number, near: boolean) {
    const m = safe()
    for (let k = 0; k < 80; k++) {
      let x: number, y: number
      if (near) { const an = rnd() * Math.PI * 2, d = R * (1.25 + rnd() * 0.8); x = cx + Math.cos(an) * d - w / 2; y = cy + Math.sin(an) * d - h / 2 }
      else { x = m.side + rnd() * (W - 2 * m.side - w); y = m.top + rnd() * (H - m.top - m.bottom - h) }
      if (!inSafe(x, y, w, h)) continue
      if (Math.hypot(x + w / 2 - cx, y + h / 2 - cy) < R * 0.78) continue
      if (hits(x, y, w, h)) continue
      return { x: x + w / 2, y: y + h / 2 }
    }
    // Fallback: above the logo, still inside the safe area.
    return { x: clamp(cx, m.side + w / 2, W - m.side - w / 2), y: clamp(cy - R * 1.3, m.top + h / 2, H - m.bottom - h / 2) }
  }
  function skySpot() {
    for (let k = 0; k < 60; k++) { const u = rnd(), v = 0.1 + rnd() * 0.86, x = u * W, y = v * H; if (Math.hypot(x - cx, y - cy) < R * 1.22 || hits(x - 4, y - 4, 8, 8)) continue; return { u, v } }
    return { u: rnd(), v: rnd() }
  }

  // ---------- The cast ----------
  const cellStar: any[] = new Array(raster.length).fill(null)
  const sky: any[] = [], planets: any[] = [], live: any[] = []
  let clock = 0, started = false, floodAt = 0, acc = 0, pulseAt = -1, finaleDone = false, idleNext = 0, burstAt = -1
  const ideaQueue = shuffle(C.ideas.concat(C.eggs)), cellOrder = shuffle(raster.map((_, i) => i))
  const toLogo = Math.min(cellOrder.length, Math.round(ideaQueue.length * 0.72))
  let cellCursor = 0, idlePool: string[] = []
  // How many logo cells have a star; counted when one lands, so a frame never scans the whole list.
  let built = 0

  function measure(text: string, font: string) { ctx.font = font; return ctx.measureText(text).width }
  function spawn(label: string, kind: string, extra: any = {}) {
    const heavy = kind === 'heavy', font = heavy ? `600 ${mobile ? 19 : 26}px Geist` : `500 ${mobile ? 12 : 14}px "Geist Mono"`
    const w = label ? measure(label, font) : 0, pos = extra.at || freeSpot(w, heavy ? 30 : 16, heavy || rnd() < 0.55)
    const s: any = { label, kind, font, w, sx: pos.x, sy: pos.y, t0: clock, appear: label ? 220 : 0, hold: extra.hold ?? 0, collapse: label ? 260 : 0,
      fly: extra.fly ?? 1000, target: extra.target, bend: (rnd() - 0.5) * 0.9, trail: [], size: heavy ? 4.6 : kind === 'dust' ? 1.6 : 2.3, phase: rnd() * 6.28 }
    live.push(s); return s
  }
  function targetPos(tg: any) { if (tg.k === 'cell') return cellPos(tg.i); if (tg.k === 'planet') return planetPos(planets[tg.p], clock); return skyPos(tg) }

  function step(dt: number) {
    clock += dt
    // Heavy concepts first, one by one, around the circle.
    if (clock - dt < 400 && clock >= 400) C.heavy.forEach((label, i) => {
      planets[i] = { label, ring: i % 3, a0: (i / C.heavy.length) * Math.PI * 2 - Math.PI / 2 + (i % 3) * 0.5, arrived: -1 }
    })
    C.heavy.forEach((label, i) => { const at = 400 + i * 620; if (clock - dt < at && clock >= at) {
      const an = planets[i].a0 + SPIN[planets[i].ring] * (at + 2000), d = R * (mobile ? 1.38 : 1.5), w = measure(label, `600 ${mobile ? 19 : 26}px Geist`)
      let x = cx + Math.cos(an) * d, y = cy + Math.sin(an) * d; const m = safe(); x = clamp(x, w / 2 + m.side, W - w / 2 - m.side); y = clamp(y, m.top + 16, H - m.bottom - 16)
      if (hits(x - w / 2, y - 16, w, 32)) { const f = freeSpot(w, 32, true); x = f.x; y = f.y }
      spawn(label, 'heavy', { at: { x, y }, hold: 820, fly: 1250, target: { k: 'planet', p: i } })
    } })
    // Then the flood: ideas spawn faster and faster.
    if (!floodAt && clock > 400 + C.heavy.length * 620 + 300) floodAt = clock
    if (floodAt && ideaQueue.length) {
      const e = clock - floodAt, rate = Math.min(34, 2.2 * Math.exp(e * 0.00052))
      acc += rate * dt / 1000
      while (acc >= 1 && ideaQueue.length) { acc -= 1; const label = ideaQueue.shift()!, hold = Math.max(150, 640 - e * 0.09)
        const target = cellCursor < toLogo ? { k: 'cell', i: cellOrder[cellCursor++] } : { k: 'sky', ...skySpot() }
        spawn(label, C.eggs.includes(label) ? 'egg' : 'idea', { hold, fly: 850 + rnd() * 450, target }) }
      if (!ideaQueue.length) floodAt = -1
    }
    // Last push: star dust fills every empty slot of the logo.
    if (floodAt === -1 && cellCursor < cellOrder.length) {
      acc += 130 * dt / 1000
      while (acc >= 1 && cellCursor < cellOrder.length) { acc -= 1; const an = rnd() * Math.PI * 2, d = R * (1.5 + rnd() * 1.2)
        spawn('', 'dust', { at: { x: cx + Math.cos(an) * d, y: cy + Math.sin(an) * d }, fly: 650 + rnd() * 500, target: { k: 'cell', i: cellOrder[cellCursor++] } }) }
    }
    if (!finaleDone && cellCursor >= cellOrder.length && built >= raster.length) { finaleDone = true; pulseAt = clock; idleNext = clock + 2400 }
    // After that, the galaxy keeps growing: one new idea every few seconds.
    if (finaleDone && clock > idleNext) { idleNext = clock + 2600; if (!idlePool.length) idlePool = shuffle(C.ideas.concat(C.eggs))
      if (sky.length < 220) { const label = idlePool.shift()!; spawn(label, C.eggs.includes(label) ? 'egg' : 'idea', { hold: 900, fly: 1300, target: { k: 'sky', ...skySpot() } }) } }
    // Advance live stars and land the ones that arrived.
    for (let i = live.length - 1; i >= 0; i--) {
      const s = live[i], e = clock - s.t0, flyStart = s.appear + s.hold + s.collapse
      if (e >= flyStart) { const k = clamp((e - flyStart) / s.fly), T = targetPos(s.target), mx = (s.sx + T.x) / 2, my = (s.sy + T.y) / 2, dx = T.x - s.sx, dy = T.y - s.sy
        const c1x = mx - dy * s.bend, c1y = my + dx * s.bend, q = eInOut(k)
        s.x = (1 - q) * (1 - q) * s.sx + 2 * (1 - q) * q * c1x + q * q * T.x; s.y = (1 - q) * (1 - q) * s.sy + 2 * (1 - q) * q * c1y + q * q * T.y
        s.trail.push([s.x, s.y]); if (s.trail.length > 9) s.trail.shift()
        if (k >= 1) { s.landed = clock; live.splice(i, 1)
          if (s.target.k === 'cell') { if (!cellStar[s.target.i]) built++; cellStar[s.target.i] = s } else if (s.target.k === 'sky') sky.push(s); else planets[s.target.p].arrived = clock }
      }
    }
  }

  // ---------- Drawing ----------
  function dot(x: number, y: number, size: number, color: string) { ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(x - size / 2, y - size / 2, size, size, size * 0.24); ctx.fill() }
  // Depth on scroll: as the page leaves the hero, the sky stars trail it more than the logo grid does.
  // The offset is pushed down so the layer moves slower than the page; none of it follows the pointer.
  let gox = 0, goy = 0, sox = 0, soy = 0
  function parallax() { const sy = reduce ? 0 : Math.max(0, Math.min(window.scrollY, H)); goy = sy * 0.1; soy = sy * 0.25 }
  function draw() {
    ctx.clearRect(0, 0, W, H)
    parallax()
    const t = clock, builtFrac = built / raster.length
    // Sky: ideas that became distant stars.
    for (const s of sky) { const P = skyPos(s.target), tw = reduce ? 0.6 : 0.45 + 0.55 * Math.abs(Math.sin(t * 0.0011 + s.phase)), born = clamp((t - s.landed) / 600)
      ctx.globalAlpha = tw * (0.35 + 0.65 * born); ctx.fillStyle = s.kind === 'egg' || s.kind === 'idea' ? '#DDEFB4' : LED
      ctx.beginPath(); ctx.arc(P.x + sox, P.y + soy, 1.3 + born * 0.4, 0, 7); ctx.fill() }
    ctx.globalAlpha = 1
    ctx.save(); ctx.translate(gox, goy)
    ctx.globalAlpha = reduce ? 1 : clamp(t / 1600); ctx.drawImage(grid!, 0, 0, W, H); ctx.globalAlpha = 1
    // Tick ring fades in as the logo fills.
    const tickA = reduce ? 0.5 : builtFrac * 0.5, rot = reduce ? 0 : -t * 0.00004
    if (tickA > 0.01) { ctx.strokeStyle = `rgba(244,238,228,${tickA * 0.45})`; ctx.lineWidth = 1; ctx.beginPath()
      for (let i = 0; i < 132; i++) { const an = rot + i / 132 * Math.PI * 2, r1 = R * 0.9, r2 = R * (i % 6 ? 0.925 : 0.94); ctx.moveTo(cx + Math.cos(an) * r1, cy + Math.sin(an) * r1); ctx.lineTo(cx + Math.cos(an) * r2, cy + Math.sin(an) * r2) }
      ctx.stroke() }
    // Orbits: each heavy concept is a planet that draws its own orbit behind it.
    planets.forEach(pl => { if (!pl || pl.arrived < 0) return; const P = planetPos(pl, t), grow = reduce ? 1 : eOut(clamp((t - pl.arrived) / 2600)), len = (1.1 + pl.ring * 0.35) * grow, dir = Math.sign(SPIN[pl.ring])
      const N = 40; ctx.lineWidth = pl.ring === 0 ? 2.6 : 1.8; ctx.lineCap = 'round'
      for (let k = 0; k < N; k++) { const a1 = P.an - dir * len * (k / N), a2 = P.an - dir * len * ((k + 1) / N); ctx.strokeStyle = `rgba(${LIME_RGB},${(1 - k / N) * (pl.ring === 0 ? 0.95 : 0.55)})`
        ctx.beginPath(); ctx.arc(cx, cy, P.r, Math.min(a1, a2), Math.max(a1, a2)); ctx.stroke() }
      ctx.fillStyle = `rgba(${LIME_RGB},.16)`; ctx.beginPath(); ctx.arc(P.x, P.y, 11, 0, 7); ctx.fill()
      ctx.fillStyle = HOT; ctx.beginPath(); ctx.arc(P.x, P.y, 4.6, 0, 7); ctx.fill() })
    // The logo, one idea per LED.
    const pulse = pulseAt >= 0 ? (t - pulseAt) / 900 : -1, burst = burstAt >= 0 ? t - burstAt : -1
    cellStar.forEach((s, i) => { if (!s) return; let { x, y } = cellPos(i)
      if (burst >= 0 && s.bx !== undefined) { const out = burst < 360 ? eOut(burst / 360) : 1 - eBack(clamp((burst - 360) / 1100)); x += s.bx * out; y += s.by * out }
      const age = t - s.landed, land = clamp(age / 420), d = Math.hypot(x - cx, y - cy) / (R * 0.75)
      const wave = pulse >= 0 && pulse < 1.4 && Math.abs(d - pulse) < 0.09, twinkle = !reduce && Math.sin(t * 0.0021 + s.phase * 9) > 0.985
      if (land < 1 && !reduce) { ctx.strokeStyle = `rgba(${HOT_RGB},${(1 - land) * 0.8})`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, y, cell * (0.3 + land * 1.1), 0, 7); ctx.stroke() }
      dot(x, y, cell * 0.74, wave || twinkle || land < 0.5 ? HOT : LED) })
    ctx.restore()
    // Live ideas: the word, then it collapses into a star and flies home.
    for (const s of live) { const e = t - s.t0, A = s.appear, Hd = A + s.hold, Cl = Hd + s.collapse
      if (s.label && e < Cl) { const k = e < A ? eOut(e / A) : 1, c = e > Hd ? eOut((e - Hd) / s.collapse) : 0
        ctx.save(); ctx.translate(s.sx, s.sy + (1 - k) * 8); ctx.scale(1 - c * 0.85, 1 - c * 0.85); ctx.globalAlpha = k * (1 - c)
        ctx.font = s.font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = s.kind === 'heavy' ? INK : 'rgba(244,238,228,.9)'; ctx.fillText(s.label, 0, 0)
        if (s.kind === 'heavy' && c === 0) { ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(-s.w / 2 - 14, 0, 4, 0, 7); ctx.fill() }
        ctx.restore(); ctx.globalAlpha = 1
        if (c > 0) { const g = Math.sin(c * Math.PI) * 9; ctx.fillStyle = `rgba(${HOT_RGB},${0.25 * c})`; ctx.beginPath(); ctx.arc(s.sx, s.sy, s.size + g, 0, 7); ctx.fill()
          ctx.fillStyle = HOT; ctx.beginPath(); ctx.arc(s.sx, s.sy, s.size * c, 0, 7); ctx.fill() } }
      else if (s.x !== undefined) {
        for (let k = 1; k < s.trail.length; k++) { ctx.strokeStyle = `rgba(${LIME_RGB},${k / s.trail.length * 0.5})`; ctx.lineWidth = s.size * (k / s.trail.length); ctx.beginPath(); ctx.moveTo(s.trail[k - 1][0], s.trail[k - 1][1]); ctx.lineTo(s.trail[k][0], s.trail[k][1]); ctx.stroke() }
        ctx.fillStyle = HOT; ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, 7); ctx.fill() } }
  }

  // ---------- Loop: runs only while the section is on screen and the tab is visible ----------
  let visible = false, running = false, last = 0
  function frame(now: number) {
    if (dead || !visible || document.hidden) { running = false; return }
    const dt = Math.min(48, now - last); last = now; step(dt); draw(); raf = requestAnimationFrame(frame)
  }
  function run() { if (dead || running || reduce || !started) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame) }
  io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; run() })
  io.observe(root)
  document.addEventListener('visibilitychange', run, { signal })

  // Reduced motion: the finished galaxy, no motion.
  function buildStill() {
    clock = 20000; C.heavy.forEach((label, i) => { planets[i] = { label, ring: i % 3, a0: (i / C.heavy.length) * Math.PI * 2 - Math.PI / 2 + (i % 3) * 0.5, arrived: 0 } })
    const q = shuffle(C.ideas.concat(C.eggs))
    cellOrder.forEach((ci, n) => { cellStar[ci] = { label: n < toLogo ? q[n] : '', kind: n < toLogo ? 'idea' : 'dust', landed: -9999, phase: rnd() * 6.28 } })
    q.slice(toLogo).forEach(label => sky.push({ label, kind: 'idea', target: skySpot(), landed: -9999, phase: 0 }))
    built = raster.length
    finaleDone = true
  }

  // ---------- Hover or tap a star to read its idea ----------
  function nearest(x: number, y: number) {
    let best: any = null, bd = 16
    const gx = x - gox, gy = y - goy
    cellStar.forEach((s, i) => { if (!s || !s.label) return; const P = cellPos(i), d = Math.hypot(P.x - gx, P.y - gy); if (d < Math.min(bd, cell * 0.8)) { bd = d; best = { s, P: { x: P.x + gox, y: P.y + goy } } } })
    planets.forEach(pl => { if (!pl || pl.arrived < 0) return; const P = planetPos(pl, clock), d = Math.hypot(P.x - gx, P.y - gy); if (d < 18 && d < bd + 6) { bd = d; best = { s: pl, P: { x: P.x + gox, y: P.y + goy } } } })
    sky.forEach(s => { const P = skyPos(s.target), X = P.x + sox, Y = P.y + soy, d = Math.hypot(X - x, Y - y); if (d < bd) { bd = d; best = { s, P: { x: X, y: Y } } } })
    return best
  }
  function showTip(x: number, y: number) {
    const n = nearest(x, y)
    if (!n) { tip.classList.remove('on'); root.style.cursor = ''; return }
    tip.textContent = n.s.label; const w = tip.offsetWidth
    tip.style.left = clamp(n.P.x - w / 2, 8, W - w - 8) + 'px'; tip.style.top = (n.P.y - 44 < 60 ? n.P.y + 16 : n.P.y - 44) + 'px'
    tip.classList.add('on'); root.style.cursor = 'default'
    if (reduce) draw()
  }
  root.addEventListener('pointermove', e => { const r = root.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top
    if (e.pointerType === 'mouse') showTip(x, y) }, { signal })
  root.addEventListener('pointerleave', () => { tip.classList.remove('on') }, { signal })
  // Click the logo and it blows apart into its ideas, then pulls itself back together.
  root.addEventListener('pointerdown', e => {
    const r = root.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top
    if (e.pointerType !== 'mouse') showTip(x, y)
    if (reduce || !finaleDone || Math.hypot(x - cx, y - cy) > R * 0.62) return
    burstAt = clock; cellStar.forEach((s, i) => { if (!s) return; const P = cellPos(i), an = Math.atan2(P.y - cy, P.x - cx) + (rnd() - 0.5) * 0.8, d = R * (0.35 + rnd() * 0.9); s.bx = Math.cos(an) * d; s.by = Math.sin(an) * d })
  }, { signal })

  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = window.setTimeout(() => { layout(); if (reduce) draw() }, 150) }, { signal })
  ;(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => {
    if (dead) return
    layout(); started = true
    if (reduce) { buildStill(); draw() } else run()
  })

  return () => {
    dead = true
    ac.abort()
    cancelAnimationFrame(raf)
    clearTimeout(resizeTimer)
    io?.disconnect()
    root.style.cursor = ''
    root.replaceChildren()
  }
}
