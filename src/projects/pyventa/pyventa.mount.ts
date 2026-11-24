import type { Mount } from '../../home/useMount'
import type { ProjectData } from '../types'
import { takeFlight, playFlight, cancelFlight } from '../cardFlight'
import { COPY, CONTACT } from './data'
import { ART, LAB, barcode } from './art'
import './pyventa.css'
import cambio from './assets/cambio.webp'
import cel0 from './assets/cel-0.webp'
import celCam from './assets/cel-cam.webp'
import celRes from './assets/cel-res.webp'
import cobro0 from './assets/cobro-0.webp'
import cobro from './assets/cobro.webp'
import mCambio from './assets/m-cambio.webp'
import mCobro0 from './assets/m-cobro-0.webp'
import mCobro from './assets/m-cobro.webp'
import mOff0 from './assets/m-off-0.webp'
import mOff1 from './assets/m-off-1.webp'
import mOff3 from './assets/m-off-3.webp'
import mOffCambio from './assets/m-off-cambio.webp'
import mOffCobro from './assets/m-off-cobro.webp'
import mPos0 from './assets/m-pos-0.webp'
import mPos1 from './assets/m-pos-1.webp'
import mPos2 from './assets/m-pos-2.webp'
import mPos3 from './assets/m-pos-3.webp'
import mPos4 from './assets/m-pos-4.webp'
import off0 from './assets/off-0.webp'
import off1 from './assets/off-1.webp'
import off3 from './assets/off-3.webp'
import offCambio from './assets/off-cambio.webp'
import offCobro from './assets/off-cobro.webp'
import pos0 from './assets/pos-0.webp'
import pos1 from './assets/pos-1.webp'
import pos2 from './assets/pos-2.webp'
import pos3 from './assets/pos-3.webp'
import pos4 from './assets/pos-4.webp'
import ticket from './assets/ticket.webp'

// The scroll story of Pyventa Web: a receipt prints the headline, products are scanned into the real checkout, the ticket rises, the
// internet drops and the sale still goes through, and a phone scans prices. One rAF drives one damped scroll value and stops when it
// settles. Layout is read on load and on resize; the frame loop only writes transform, opacity, visibility and clip-path.

type Mode = 'fade' | 'wipe'
type Screen = [string] | [string, Mode, [number, number]]
// Desktop screens (the monitor) and phone screens (the narrow layout): same beats, same windows.
const DS: Screen[] = [[pos4], [pos0, 'fade', [.075, .095]], [pos1, 'wipe', [.13, .156]], [pos2, 'wipe', [.21, .236]], [pos3, 'wipe', [.29, .316]], [pos4, 'wipe', [.37, .396]],
  [cobro0, 'fade', [.448, .457]], [cobro, 'fade', [.50, .506]], [cambio, 'fade', [.545, .554]],
  [off0, 'fade', [.752, .762]], [off1, 'wipe', [.785, .812]], [offCobro, 'fade', [.828, .837]], [offCambio, 'fade', [.858, .867]], [off3, 'fade', [.885, .894]]]
const MS: Screen[] = [[mPos4], [mPos0, 'fade', [.075, .095]], [mPos1, 'fade', [.13, .142]], [mPos2, 'fade', [.21, .222]], [mPos3, 'fade', [.29, .302]], [mPos4, 'fade', [.37, .382]],
  [mCobro0, 'fade', [.448, .457]], [mCobro, 'fade', [.50, .506]], [mCambio, 'fade', [.545, .554]],
  [mOff0, 'fade', [.752, .762]], [mOff1, 'fade', [.785, .797]], [mOffCobro, 'fade', [.828, .837]], [mOffCambio, 'fade', [.858, .867]], [mOff3, 'fade', [.885, .894]]]
const TS = [.13, .21, .29, .37] // the four scans

type Key = 'mon' | 'ph' | 'prn' | 'sg' | 'rcp'
type Shot = 'rcpH' | 'hero' | 'scan' | 'pay' | 'tick' | 'phn'
// key, the object it names, the shot it is placed in, the side, and the window it shows in
const TAGS: [string, string, Shot, 'below' | 'right', number, number][] = [
  ['reader', 'sg', 'scan', 'below', .115, .40], ['line', 'main', 'scan', 'below', .20, .42],
  ['f5', 'main', 'pay', 'below', .452, .50], ['change', 'main', 'pay', 'below', .515, .57],
  ['ticket', 'prn', 'tick', 'right', .618, .715],
  ['drop', 'main', 'pay', 'below', .762, .80], ['offsale', 'main', 'pay', 'below', .808, .865], ['sends', 'main', 'pay', 'below', .872, .896],
  ['phone', 'ph', 'phn', 'right', .932, .972]]

const NAT: Record<Key, [number, number]> = { mon: [1000, 730], ph: [300, 650], prn: [300, 560], sg: [300, 340], rcp: [540, 900] }
const GAP = 40, LH = 22, SIDE = 24, TOP = 76

interface Pose { x: number; y: number; s: number; ry: number; rx: number; rz?: number; o: number }
type Keys = [number, Pose][]

const cl = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const S = (p: number, a: number, b: number) => cl((p - a) / (b - a))

function bez(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by
  const X = (t: number) => ((ax * t + bx) * t + cx) * t, Y = (t: number) => ((ay * t + by) * t + cy) * t, dX = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  return (x: number) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let t = x
    for (let i = 0; i < 6; i++) { const d = dX(t); if (Math.abs(d) < 1e-6) break; t -= (X(t) - x) / d }
    if (t < 0 || t > 1) { let lo = 0, hi = 1; t = x; for (let i = 0; i < 24; i++) { if (X(t) < x) lo = t; else hi = t; t = (lo + hi) / 2 } }
    return Y(t)
  }
}
const EIO = bez(.77, 0, .175, 1), EO = bez(.23, 1, .32, 1), EE = bez(.65, 0, .35, 1)

export const mountPyventa: Mount<ProjectData> = (root, { lang, first }, { reduce }) => {
  const ac = new AbortController()
  const { signal } = ac
  const C = COPY[lang]
  let disposed = false
  root.classList.toggle('rm', reduce)
  // Unique ids for the inline art, so nothing here can collide with another part of the page.
  const u = (s: string) => s.replace(/\b(id="|url\(#)/g, '$1pv-')

  // ---------- Markup ----------
  root.innerHTML = `<div class="track"><div class="stage">
  <div class="world"><i class="vig"></i><i class="hglow"></i></div>
  <div class="objs"></div>
  <div class="tags">${TAGS.map((t, i) => `<div class="tag" data-i="${i}">${C.t[t[0] as keyof typeof C.t]}</div>`).join('')}</div>
  <div class="end"><h2>${C.price}</h2><p>${C.plat}</p><a class="pbtn" href="${CONTACT}">${C.cta}</a></div>
</div></div>
<section class="rmcta"><div class="in"><h2>${C.price}</h2><p>${C.plat}</p><a class="pbtn" href="${CONTACT}">${C.cta}</a></div></section>`

  const $ = <E extends Element>(sel: string) => root.querySelector(sel) as E
  const stage = $<HTMLElement>('.stage'), track = $<HTMLElement>('.track'), objsEl = $<HTMLElement>('.objs'), end = $<HTMLElement>('.end'), glow = $<HTMLElement>('.hglow')
  const TG = [...root.querySelectorAll<HTMLElement>('.tag')]

  // ---------- Writes that skip what did not change ----------
  const last = new WeakMap<Element, Record<string, string>>()
  function put(el: HTMLElement, key: 'transform' | 'opacity' | 'visibility' | 'clipPath', v: string) {
    let m = last.get(el)
    if (!m) { m = {}; last.set(el, m) }
    if (m[key] === v) return
    m[key] = v
    el.style[key] = v
  }

  // ---------- State ----------
  interface World {
    vw: number; vh: number; por: boolean; top: number; span: number; hold: number; range: number
    main: 'mon' | 'ph'
    obj: Partial<Record<Key, HTMLElement>>
    dl: HTMLElement[]; ml: HTMLElement[]; it: HTMLElement[]
    cel0: HTMLElement; cam: HTMLElement; cres: HTMLElement; ls: HTMLElement; hl: HTMLElement; laser: HTMLElement; pulse: HTMLElement; tk: HTMLElement; sg: HTMLElement
    glowC: [number, number, number]
    heroOn: boolean | undefined
  }
  const W = {} as World
  let KEYS: Record<Key, Keys> = { mon: [], ph: [], prn: [], sg: [], rcp: [] }
  const tagPos: { x: number; y: number }[] = TAGS.map(() => ({ x: 0, y: 0 }))

  function build() {
    const por = innerWidth / innerHeight < 1
    W.por = por; W.heroOn = undefined
    root.classList.toggle('por', por)
    const layers = (defs: Screen[], pre: string) => defs.map((d, i) => `<div class="L" data-k="${pre}${i}"><img src="${d[0]}" alt="" decoding="async"></div>`).join('')
    const bars = barcode(31, 2, 4, 96, 34)
    const cel = `<div class="L cel0"><img src="${cel0}" alt=""></div><div class="L cam"><div class="feedv"><i class="pk"></i><i class="lb"><svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet">${bars}</svg></i></div><i class="ls"></i><img class="chrome" src="${celCam}" alt=""></div><div class="L cres"><img src="${celRes}" alt=""></div>`
    let h = ''
    if (!por) {
      h += `<div class="obj mon"><div class="bezel"><div class="sc">${layers(DS, 'd')}<i class="hl"></i></div><div class="gloss"></div></div>
     ${u(`<svg class="stand" viewBox="0 0 1000 102"><defs><radialGradient id="ms"><stop offset="0" stop-color="#46341a" stop-opacity=".34"/><stop offset=".6" stop-color="#46341a" stop-opacity=".12"/><stop offset="1" stop-color="#46341a" stop-opacity="0"/></radialGradient>
     <linearGradient id="mn" x1="0" x2="1"><stop offset="0" stop-color="#2b2823"/><stop offset=".5" stop-color="#4a463f"/><stop offset="1" stop-color="#25221e"/></linearGradient><linearGradient id="mb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#55504a"/><stop offset="1" stop-color="#23201c"/></linearGradient></defs>
     <ellipse cx="500" cy="84" rx="280" ry="14" fill="url(#ms)"/><path d="M448 0 L552 0 L566 58 L434 58 Z" fill="url(#mn)"/><rect x="366" y="54" width="268" height="15" rx="7.5" fill="url(#mb)"/></svg>`)}</div>`
    }
    h += `<div class="obj ph"><div class="pbody"><div class="pscr">${por ? layers(MS, 'm') : ''}${u(cel)}</div></div><i class="pshadow"></i></div>`
    const ic = ['<path d="M3 12l9-9h8v8l-9 9z"/><circle cx="15.5" cy="8.5" r="1.2"/>', '<path d="M4 9l1.5-5h13L20 9M5 9v11h14V9M9 20v-6h6v6"/>', '<rect x="3" y="5" width="12" height="9" rx="1.5"/><rect x="16" y="9" width="5" height="10" rx="1.2"/>']
    h += `<div class="obj rcp"><div class="rsheet"><div class="rl rmeta" style="--i:0"><span>22/11/2026 08:38 p.m.</span><span>#1186</span></div><div class="rl rmeta" style="--i:0"><span>Caja 1</span><span>Cliente mostrador</span></div><div class="rdash" style="--i:1"></div><div class="rl c b" style="--i:1">PYVENTA WEB</div><div class="rdash" style="--i:1"></div><h1 class="rh" style="--i:2">${C.head}</h1><div class="rdash" style="--i:5"></div>${C.rows.map((r, i) => `<div class="rl rrow" style="--i:${6 + i}"><span>${r}</span><i></i><svg viewBox="0 0 24 24" aria-hidden="true">${ic[i]}</svg></div>`).join('')}<a class="rbtn" href="${CONTACT}" style="--i:9"><span>${C.cta}</span><span aria-hidden="true">&rarr;</span></a><div class="rtear"></div></div></div>`
    h += `<div class="obj prn"><div class="tkw"><img src="${ticket}" alt=""></div></div>`
    h += `<div class="obj sg">${ART.map((s, i) => `<div class="it" data-i="${i}">${u(s)}</div>`).join('')}<i class="laser"></i><i class="pulse"></i><i class="hl0" style="--lx:111px;--y0:199px;--y1:236px;width:123px"></i><i class="hp0" style="--px:81px;--py:171px;width:184px;height:131px"></i></div>`
    objsEl.innerHTML = h
    const q = <E extends HTMLElement>(sel: string) => objsEl.querySelector(sel) as E
    W.obj = { mon: q('.mon') || undefined, ph: q('.ph'), prn: q('.prn'), sg: q('.sg'), rcp: q('.rcp') }
    W.dl = [...objsEl.querySelectorAll<HTMLElement>('.mon .L')]
    W.ml = [...objsEl.querySelectorAll<HTMLElement>('.pscr .L[data-k]')]
    W.it = [...objsEl.querySelectorAll<HTMLElement>('.it')]
    W.cel0 = q('.cel0'); W.cam = q('.cam'); W.cres = q('.cres'); W.ls = q('.ls'); W.hl = q('.hl'); W.laser = q('.laser'); W.pulse = q('.pulse'); W.tk = q('.tkw img'); W.sg = q('.sg')
    // Decode every capture now, off the main thread, so the first time a screen appears costs no frame.
    objsEl.querySelectorAll<HTMLImageElement>('img').forEach((im) => { im.decoding = 'async'; void im.decode().catch(() => {}) })
  }

  const objKeys = (): Key[] => (['mon', 'ph', 'prn', 'sg', 'rcp'] as Key[]).filter((k) => W.obj[k])
  const poseOf = (key: Key, P: Pose) => {
    const [w, h] = NAT[key]
    return `translate3d(${(P.x - w / 2).toFixed(2)}px,${(P.y - h / 2).toFixed(2)}px,0) rotateZ(${P.rz || 0}deg) rotateX(${P.rx || 0}deg) rotateY(${P.ry || 0}deg) scale(${P.s.toFixed(4)})`
  }

  // ---------- Layout: every layout read happens here ----------
  function layout() {
    const vh = innerHeight, vw = innerWidth, por = W.por
    stage.style.height = vh + 'px'
    track.style.height = (vh * (por ? 15 : 14)) + 'px'
    Object.assign(W, { vw, vh })
    W.top = track.getBoundingClientRect().top + scrollY
    W.span = track.offsetHeight - vh
    W.hold = por ? vh * .4 : vh * .5
    W.range = Math.max(1, W.span - W.hold)
    const lw = (k: number) => TG[k].offsetWidth
    const main: 'mon' | 'ph' = por ? 'ph' : 'mon'
    W.main = main
    const rcp = W.obj.rcp!, sheet = rcp.firstElementChild as HTMLElement
    NAT.rcp = [rcp.offsetWidth, rcp.offsetHeight]
    // The paper above the first line is the part still inside the slot; HC is the part with print on it.
    const HC = NAT.rcp[1] - (sheet.firstElementChild as HTMLElement).offsetTop
    const AW = vw - 2 * SIDE
    const S0: Record<string, Record<string, Pose>> = {}
    let rcpH: Pose
    let heroSg: Pose
    let glowC: [number, number, number]
    if (!por) {
      // hero: the receipt hangs on the left, the checkout and a product mid-scan on the right
      const gl = Math.max(24, vw * .04), ct = TOP + 30, avail = vh - 60 - ct
      const sR = Math.min(avail / HC, vw * .41 / NAT.rcp[0]), wR = NAT.rcp[0] * sR
      // The print starts right under the header; any spare height goes below the receipt, never above the date.
      const yb = ct + HC * sR + (avail - HC * sR) * .35
      rcpH = { x: gl + wR / 2, y: yb - NAT.rcp[1] * sR / 2, s: sR, ry: 5, rx: 0, rz: -1.2, o: 1 }
      const ax0 = gl + wR + 56, aw = vw - SIDE - ax0
      // Monitor and notebook share the height: the notebook never crowds the monitor's base.
      const room = vh - 30 - (TOP + 10) - 44
      const s = Math.min(aw * .93 / NAT.mon[0], (vh * .54) / NAT.mon[1], (room - NAT.sg[1] * .82) / NAT.mon[1])
      const my0 = TOP + 10 + NAT.mon[1] * s / 2
      S0.hero = { mon: { x: ax0 + aw / 2, y: my0, s, ry: -10, rx: 3, o: 1 } }
      S0.heroFlat = { mon: { x: ax0 + aw / 2, y: my0, s, ry: 0, rx: 0, o: 1 } }
      const sgs = Math.min(1.05, (vh * .38) / NAT.sg[1], (room - NAT.mon[1] * s) / NAT.sg[1])
      heroSg = { x: vw - SIDE - NAT.sg[0] * sgs / 2 - 4, y: (vh - 30) - NAT.sg[1] * sgs / 2, s: sgs, ry: 0, rx: 0, o: 1 }
      glowC = [ax0 + aw / 2, my0 + 20, Math.min(aw * 1.35, vh * 1.2)]
      // scan: monitor left, group right
      const cw = cl(vw * .27, 250, 340), sg = cw / NAT.sg[0], mx1 = vw - SIDE - cw - 36, mh = vh - TOP - SIDE - LH - GAP + 10
      let s2 = Math.min((mx1 - SIDE) / NAT.mon[0], mh / NAT.mon[1])
      const my = TOP + mh / 2
      S0.scan = { mon: { x: SIDE + (mx1 - SIDE) / 2, y: my, s: s2, ry: -4, rx: 0, o: 1 }, sg: { x: vw - SIDE - cw / 2, y: my - 10, s: sg, ry: 0, rx: 0, o: 1 } }
      s2 = Math.min(AW / NAT.mon[0], mh / NAT.mon[1])
      S0.pay = { mon: { x: vw / 2, y: TOP + mh / 2, s: s2, ry: 0, rx: 0, o: 1 } }
      const tl = lw(4), gh = vh - TOP - SIDE - 8
      s2 = Math.min(gh / NAT.prn[1], (AW - GAP - tl) / NAT.prn[0])
      const pw = NAT.prn[0] * s2, pair = pw + GAP + tl
      S0.tick = { prn: { x: (vw - pair) / 2 + pw / 2, y: TOP + 4 + NAT.prn[1] * s2 / 2, s: s2, ry: 0, rx: 0, o: 1 } }
      const pl = lw(8)
      s2 = Math.min(gh / NAT.ph[1], (AW - GAP - pl) / NAT.ph[0])
      const phw = NAT.ph[0] * s2, pair2 = phw + GAP + pl
      S0.phn = { ph: { x: (vw - pair2) / 2 + phw / 2, y: TOP + 4 + NAT.ph[1] * s2 / 2, s: s2, ry: 0, rx: 0, o: 1 } }
    } else {
      const ct = TOP + 20
      const sR = Math.min((vw - 2 * SIDE) / NAT.rcp[0], (vh * .56 - ct) / HC), wR = NAT.rcp[0] * sR, yb = ct + HC * sR
      rcpH = { x: SIDE + wR / 2, y: yb - NAT.rcp[1] * sR / 2, s: sR, ry: 3, rx: 0, rz: -1, o: 1 }
      const ay0 = yb + 22, ay1 = vh - SIDE, ah = ay1 - ay0
      const sph = Math.min(ah / NAT.ph[1], (vw * .5) / NAT.ph[0])
      S0.hero = { ph: { x: SIDE + NAT.ph[0] * sph / 2 + 4, y: ay0 + NAT.ph[1] * sph / 2, s: sph, ry: 0, rx: 0, o: 1 } }
      S0.heroFlat = S0.hero
      const sgs = Math.min(ah / NAT.sg[1] * .95, (vw - 2 * SIDE - NAT.ph[0] * sph - 14) / NAT.sg[0])
      heroSg = { x: vw - SIDE - NAT.sg[0] * sgs / 2, y: ay1 - NAT.sg[1] * sgs / 2, s: sgs, ry: 0, rx: 0, o: 1 }
      glowC = [vw / 2, ay0 + ah / 2, Math.max(vw * 1.3, ah * 1.4)]
      // scan: phone on top, label, group below, label
      const ph = cl(vh * .44, 230, 520), sp = ph / NAT.ph[1]
      const phY = TOP + ph / 2
      const gTop = TOP + ph + GAP + LH + GAP, gBot = vh - SIDE - LH - GAP, sg = Math.min(AW / NAT.sg[0], (gBot - gTop) / NAT.sg[1])
      S0.scan = { ph: { x: vw / 2, y: phY, s: sp, ry: 0, rx: 0, o: 1 }, sg: { x: vw / 2, y: gTop + NAT.sg[1] * sg / 2, s: sg, ry: 0, rx: 0, o: 1 } }
      const mh = vh - TOP - SIDE - LH - GAP
      let s2 = Math.min(AW / NAT.ph[0], mh / NAT.ph[1])
      S0.pay = { ph: { x: vw / 2, y: TOP + NAT.ph[1] * s2 / 2, s: s2, ry: 0, rx: 0, o: 1 } }
      S0.phn = S0.pay
      s2 = Math.min(AW / NAT.prn[0], mh / NAT.prn[1])
      S0.tick = { prn: { x: vw / 2, y: TOP + NAT.prn[1] * s2 / 2, s: s2, ry: 0, rx: 0, o: 1 } }
    }
    W.glowC = glowC
    // keyframes per object, same beats for everyone
    const z = (P: Pose, o: number): Pose => Object.assign({}, P, { o })
    const K: Record<Key, Keys> = { mon: [], ph: [], prn: [], sg: [], rcp: [] }
    const A = S0.hero, B = S0.scan, Cc = S0.pay, D = S0.tick, E = S0.phn, R = rcpH, HS = heroSg
    K.rcp = [[0, R], [.012, R], [.034, Object.assign({}, R, { y: R.y + 20, s: R.s * .99, ry: R.ry + 6, rz: 2.5, o: 0 })], [.052, Object.assign({}, R, { y: R.y + 64, s: R.s * .985, ry: R.ry + 10, rz: 4.5, o: 0 })], [1, Object.assign({}, R, { y: R.y + 64, o: 0 })]]
    K.sg = [[0, HS], [.045, HS], [.075, z(HS, 0)], [.088, z(B.sg, 0)], [.10, B.sg], [.42, B.sg], [.445, z(B.sg, 0)], [1, z(B.sg, 0)]]
    if (!por) {
      K.mon = [[0, A.mon], [.015, A.mon], [.06, S0.heroFlat.mon], [.10, B.mon], [.42, B.mon], [.445, Cc.mon], [.575, Cc.mon], [.60, z(Cc.mon, 0)], [.725, z(Cc.mon, 0)], [.75, Cc.mon], [.90, Cc.mon], [.925, z(Cc.mon, 0)], [1, z(Cc.mon, 0)]]
      K.ph = [[0, z(E.ph, 0)], [.90, z(E.ph, 0)], [.925, E.ph], [.968, E.ph], [.982, z(E.ph, 0)], [1, z(E.ph, 0)]]
    } else {
      K.ph = [[0, A.ph], [.055, A.ph], [.10, B.ph], [.42, B.ph], [.445, Cc.ph], [.575, Cc.ph], [.60, z(Cc.ph, 0)], [.725, z(Cc.ph, 0)], [.75, Cc.ph], [.968, Cc.ph], [.982, z(Cc.ph, 0)], [1, z(Cc.ph, 0)]]
    }
    K.prn = [[0, z(D.prn, 0)], [.575, z(D.prn, 0)], [.60, D.prn], [.725, D.prn], [.75, z(D.prn, 0)], [1, z(D.prn, 0)]]
    KEYS = K
    // Place every label from the real, transformed rectangle of the object it names.
    TAGS.forEach((t, i) => {
      const key = (t[1] === 'main' ? main : t[1]) as Key, P = S0[t[2]][key], el = W.obj[key]!
      el.style.transform = poseOf(key, P); el.style.opacity = '1'; el.style.visibility = 'visible'
      const r = el.getBoundingClientRect(), tl = TG[i].offsetWidth
      let x: number, y: number
      if (t[3] === 'right' && !por) { x = r.right + GAP; y = (r.top + r.bottom) / 2 - LH / 2 } else { x = (r.left + r.right) / 2 - tl / 2; y = r.bottom + GAP }
      tagPos[i] = { x, y }
    })
    for (const k of objKeys()) { const el = W.obj[k]!; el.style.opacity = ''; el.style.visibility = ''; el.style.transform = ''; last.delete(el) }
    const g = W.glowC
    glow.style.width = glow.style.height = g[2] + 'px'
    glow.style.left = (g[0] - g[2] / 2) + 'px'; glow.style.top = (g[1] - g[2] / 2) + 'px'
  }

  // ---------- The frame ----------
  function poseAt(keys: Keys, p: number): Pose {
    let i = 0
    while (i < keys.length - 2 && p > keys[i + 1][0]) i++
    const a = keys[i], b = keys[i + 1], t = EIO(S(p, a[0], b[0])), A = a[1], B = b[1]
    return { x: A.x + (B.x - A.x) * t, y: A.y + (B.y - A.y) * t, s: A.s + (B.s - A.s) * t, ry: A.ry + (B.ry - A.ry) * t, rx: A.rx + (B.rx - A.rx) * t, rz: (A.rz || 0) + ((B.rz || 0) - (A.rz || 0)) * t, o: A.o + (B.o - A.o) * t }
  }
  function screens(list: HTMLElement[], defs: Screen[], p: number, wipe: boolean) {
    for (let i = 0; i < list.length; i++) {
      const d = defs[i], w = d[2], mode = d[1], el = list[i]
      let e = 1
      if (w) e = S(p, w[0], w[1])
      const nx = i < defs.length - 1 ? defs[i + 1][2] : null, covered = !!nx && p >= nx[1]
      put(el, 'visibility', (w && e <= 0) || covered ? 'hidden' : 'visible')
      if (mode === 'wipe' && wipe) { put(el, 'clipPath', e >= 1 ? 'none' : `inset(0 ${((1 - EIO(e)) * 100).toFixed(2)}% 0 0)`); put(el, 'opacity', '1') }
      else if (mode) { put(el, 'opacity', EO(e).toFixed(3)); put(el, 'clipPath', 'none') }
    }
  }
  let sy = 0
  function render(p: number) {
    const por = W.por
    for (const k of objKeys()) {
      const el = W.obj[k]!, P = poseAt(KEYS[k], p)
      put(el, 'transform', poseOf(k, P)); put(el, 'opacity', P.o.toFixed(3)); put(el, 'visibility', P.o < .01 ? 'hidden' : 'visible')
    }
    put(glow, 'opacity', (1 - S(p, .03, .12)).toFixed(3))
    const hv = 1 - S(p, .045, .075)
    if ((hv > 0) !== W.heroOn) { W.heroOn = hv > 0; W.sg.classList.toggle('hero-on', hv > 0) }
    const eo = S(p, .986, .998) * (1 - S(sy, W.top + W.span, W.top + W.span + W.vh * .3))
    put(end, 'opacity', eo.toFixed(3)); put(end, 'visibility', eo > 0 ? 'visible' : 'hidden')
    // the screens
    if (!por) {
      screens(W.dl, DS, p, true)
      let hl = 0, hy = 0
      TS.forEach((t, i) => { const k = S(p, t + .006, t + .034); if (k > 0 && k < 1) { hl = Math.sin(Math.PI * k); hy = 22.9 + 5.75 * i } })
      put(W.hl, 'opacity', hl.toFixed(3)); put(W.hl, 'transform', `translate3d(0,${(hy / 5.75 * 100).toFixed(2)}%,0)`)
    } else screens(W.ml, MS, p, false)
    // phone: consulta, camera, result
    const c0 = por ? EO(S(p, .926, .936)) : 1, pc = EO(S(p, por ? .942 : .938, por ? .952 : .948)), pr = EIO(S(p, .962, .978))
    put(W.cel0, 'opacity', String(c0)); put(W.cel0, 'visibility', c0 > 0 ? 'visible' : 'hidden')
    put(W.cam, 'opacity', String(pc)); put(W.cam, 'visibility', pc > 0 && pr < 1 ? 'visible' : 'hidden')
    put(W.cres, 'transform', `translate3d(${((1 - pr) * 100).toFixed(2)}%,0,0)`); put(W.cres, 'visibility', pr > 0 ? 'visible' : 'hidden')
    const lsv = S(p, .948, .962)
    put(W.ls, 'opacity', lsv > 0 && lsv < 1 ? '1' : '0'); put(W.ls, 'transform', `translate3d(0,${(EE(lsv) * 14).toFixed(2)}%,0)`)
    // the ticket slides out of the printer
    const tp = EIO(S(p, .607, .70))
    put(W.tk, 'transform', `translate3d(0,${((1 - tp) * 520).toFixed(1)}px,0)`)
    // products: arrive, a red laser sweeps the barcode, a soft pulse, the line lands on the screen, then they drop away
    let lv = 0, ly = 0, pu = 0, ps2 = 0, act = 0
    for (let i = 0; i < 4; i++) {
      const t = TS[i], e1 = EO(S(p, t - .05, t - .02)), e2 = EIO(S(p, t + .012, t + .038)), el = W.it[i]
      const eh = i === 0 ? Math.max(e1, hv) : e1, o = i === 0 ? Math.max(e1 * (1 - e2), hv) : e1 * (1 - e2)
      put(el, 'opacity', o.toFixed(3))
      put(el, 'transform', `translate3d(${(-40 * (1 - eh)).toFixed(1)}px,${(40 * e2).toFixed(1)}px,0) scale(${(1 - .03 * e2).toFixed(4)})`)
      put(el, 'visibility', o < .01 ? 'hidden' : 'visible')
      const sw = S(p, t - .02, t + .004)
      if (sw > 0 && sw < 1) { act = i; lv = Math.min(1, Math.sin(Math.PI * sw) * 2.4); ly = EE(sw) }
      const r = S(p, t + .003, t + .03)
      if (r > 0 && r < 1) { act = i; pu = Math.sin(Math.PI * r); ps2 = r }
    }
    const L = LAB[act], K = 252 / 300, lx = 24 + (L.x - L.w / 2) * K, lw2 = L.w * K, ltop = 8 + (L.y - L.h / 2) * K, lh = L.h * K
    put(W.laser, 'opacity', lv.toFixed(3))
    put(W.laser, 'transform', `translate3d(${lx.toFixed(1)}px,${(ltop + 6 + ly * (lh - 12) - 13).toFixed(1)}px,0) scaleX(${(lw2 / 100).toFixed(4)})`)
    put(W.pulse, 'opacity', (pu * .85).toFixed(3))
    put(W.pulse, 'transform', `translate3d(${(lx + lw2 / 2 - lw2 * .75).toFixed(1)}px,${(ltop + lh / 2 - lh * .85).toFixed(1)}px,0) scale(${((lw2 * 1.5 / 100) * (.85 + .3 * ps2)).toFixed(4)},${((lh * 1.7 / 100) * (.85 + .3 * ps2)).toFixed(4)})`)
    // labels: fixed slots, 6px rise on entering, leave faster
    TG.forEach((el, i) => {
      if (reduce) { put(el, 'visibility', 'hidden'); return }
      const t = TAGS[i], a = t[4], b = t[5], inn = EO(S(p, a, a + .018)), out = S(p, b - .008, b), o = inn * (1 - out)
      put(el, 'opacity', o.toFixed(3))
      if (o <= 0) { put(el, 'visibility', 'hidden'); return }
      put(el, 'visibility', 'visible')
      put(el, 'transform', `translate3d(${tagPos[i].x.toFixed(1)}px,${(tagPos[i].y + (1 - inn) * 6).toFixed(1)}px,0)`)
    })
  }

  // ---------- One rAF, one damped scroll value ----------
  let target = 0, cur = 0, raf = 0, prev = 0
  const targetP = () => cl(scrollY - W.top, 0, W.range) / W.range
  function tick(now: number) {
    raf = 0
    const dt = Math.min(64, now - prev)
    prev = now
    const d = target - cur
    if (Math.abs(d) < .0005) { cur = target; render(cur); root.classList.remove('moving'); return }
    cur += d * (1 - Math.exp(-dt / 130))
    render(cur)
    raf = requestAnimationFrame(tick)
  }
  function wake() {
    sy = scrollY
    target = targetP()
    if (raf || disposed) return
    root.classList.add('moving')
    prev = performance.now()
    raf = requestAnimationFrame(tick)
  }
  const settle = () => { sy = scrollY; if (reduce) render(.41); else { target = cur = targetP(); render(cur) } }

  build()
  layout()
  settle()

  // Resize: a new width or a real height change rebuilds the cached layout. The small height changes of a phone's address bar do not.
  let sizeW = innerWidth, sizeH = innerHeight, sizeRaf = 0
  addEventListener('resize', () => {
    if (sizeRaf) return
    sizeRaf = requestAnimationFrame(() => {
      sizeRaf = 0
      if (innerWidth === sizeW && Math.abs(innerHeight - sizeH) < 140) return
      sizeW = innerWidth; sizeH = innerHeight
      if ((innerWidth / innerHeight < 1) !== W.por) build()
      layout()
      settle()
    })
  }, { signal })
  if (!reduce) addEventListener('scroll', wake, { passive: true, signal })
  document.fonts.ready.then(() => { if (disposed) return; layout(); settle() })

  // ---------- Entrance ----------
  const startFeed = () => {
    if (reduce || disposed) return
    stage.classList.remove('feed'); void stage.offsetWidth; stage.classList.add('feed')
  }
  const flight = first && !reduce ? takeFlight('pyventa') : null
  if (reduce && first) { const f = takeFlight('pyventa'); if (f) cancelFlight(f) }
  if (flight) {
    // The card's paper grows into this page; the counter appears over it and the receipt prints last.
    stage.style.opacity = '0'
    playFlight(flight, { sheetClass: 'pv-mat', stage, onLanded: startFeed, signal })
  } else if (first && !reduce) {
    stage.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 480, easing: 'ease' })
    startFeed()
  }

  return () => {
    disposed = true
    ac.abort()
    cancelAnimationFrame(raf); cancelAnimationFrame(sizeRaf)
    root.getAnimations({ subtree: true }).forEach((a) => a.cancel())
    stage.classList.remove('feed')
    root.classList.remove('rm', 'moving', 'por')
    root.replaceChildren()
  }
}
