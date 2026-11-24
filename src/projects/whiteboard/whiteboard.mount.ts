import type { Mount } from '../../home/useMount'
import type { ProjectData } from '../types'
import { takeFlight, playFlight, cancelFlight } from '../cardFlight'
import { COPY, ART, MICP, CL, DOO, INK, BLU, RED, GRN } from './data'
import './whiteboard.css'

// The scroll story of Whiteboard: a short class about plants and water, written, drawn and erased on an enamel board. The first
// seconds run on their own clock (the hero); after that the scroll moves a single abstract time `u` and everything on the board is a
// function of it. One rAF drives one damped scroll value and stops when it settles; the frame loop only writes transform, opacity,
// visibility, clip-path and stroke-dashoffset.

const HEAD = 72, SIDE = 24
const COLS = [INK, BLU, GRN, RED]

const cl = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const S = (p: number, a: number, b: number) => cl((p - a) / (b - a))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
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
const EIO = bez(.77, 0, .175, 1), EO = bez(.23, 1, .32, 1)

const textW = (() => { let c: CanvasRenderingContext2D; return (font: string, txt: string) => { c = c || document.createElement('canvas').getContext('2d')!; c.font = font; return c.measureText(txt).width } })()
const ULP = (x0: number, x1: number, y: number, k: number) => `M${x0} ${y} C ${x0 + (x1 - x0) * .28} ${y - 6 * k} ${x0 + (x1 - x0) * .62} ${y + 7 * k} ${x1} ${y - 2 * k}`

type Pt = [number, number]
interface Item { k: 'text' | 'path'; el: HTMLElement | SVGPathElement; c: string; a: Pt[]; len: number; end: Pt; x: number; y: number; w: number; fs: number }
interface Scene { el: HTMLElement; g: SVGGElement; items: Item[]; gh: HTMLElement; hero?: boolean; end?: boolean; cap: number | null; u0: number; u1: number; sweep: number; fadeG: number }
interface Slot { x: number; y: number; c: string; el: HTMLElement }
interface Geom { vw: number; vh: number; por: boolean; bx: number; by: number; bw: number; bh: number; railH: number; pad: number; enH: number; hlH: number; fsH: number; railTop: number }
type Cur = { x: number; y: number; c: string; lift?: number; up?: number; down?: number }
interface TLe {
  k: string; u0: number; u1: number
  s1?: Slot; s0?: Slot; to?: Pt; from?: Pt; c?: string; it?: Item; s?: number; i?: number; uo?: number; sc?: number
}

export const mountWhiteboard: Mount<ProjectData> = (root, { lang, first }, { reduce }) => {
  const ac = new AbortController()
  const { signal } = ac
  const C = COPY[lang]
  let disposed = false
  root.classList.toggle('rm', reduce)
  // Unique ids for the inline art, so nothing here can collide with another part of the page.
  const u = (s: string) => s.replace(/\b(id="|url\(#)/g, '$1wb-')

  root.innerHTML = `<div class="track"><div class="stage"><div class="wall"></div><div class="hero"></div></div></div>
<section class="rmflow"><div class="in">${C.sc.map((s) => `<figure><figcaption>${s.t}</figcaption><p class="demo">${s.say}</p></figure>`).join('')}<h2>${C.status}</h2></div></section>`
  const q1 = <E extends Element>(sel: string, from: ParentNode = root) => from.querySelector(sel) as E
  const stage = q1<HTMLElement>('.stage'), track = q1<HTMLElement>('.track'), hero = q1<HTMLElement>('.hero')

  // ---------- Writes that skip what did not change ----------
  type Key = 'transform' | 'opacity' | 'visibility' | 'clipPath' | 'strokeDashoffset'
  const last = new WeakMap<Element, Record<string, string>>()
  function put(el: Element, key: Key, v: string) {
    let m = last.get(el)
    if (!m) { m = {}; last.set(el, m) }
    if (m[key] === v) return
    m[key] = v
    ;(el as HTMLElement).style[key] = v
  }

  // ---------- State ----------
  let SC: Scene[] = [], TL: TLe[] = [], erases: TLe[] = []
  let G: Geom, tray: { slots: Slot[]; mw: number; mh: number; ew: number; eh: number; ex: number; ey: number }
  let board: HTMLElement, ink: HTMLElement, hl: HTMLElement, st: HTMLElement, cp: HTMLElement, eraser: HTMLElement
  let hands: HTMLElement[] = [], capEls: HTMLElement[] = []
  let UEND = 0, HEROEND = 0
  const V = { vw: 0, vh: 0, por: false, top: 0, span: 0, hold: 0, range: 1 }
  let heroAt: number | undefined
  let U = 0
  // The hero's own clock, in abstract seconds. It advances in real time; if the visitor scrolls before it is done it fast-forwards
  // (about 400 ms) so the whole drawing is complete before the eraser may start.
  let hu = 0, huRate = 1

  // ---------- Build ----------
  function build() {
    V.por = innerWidth <= 900
    const W = V
    hero.innerHTML = `<h1 class="sr-only">Whiteboard</h1><div class="board"><svg class="bsvg" aria-hidden="true"></svg><div class="ink"></div><div class="trayw"></div><div class="eraser"><i></i><b></b></div><div class="vb" aria-hidden="true"><b></b><b></b><b></b><b></b><b></b></div>${COLS.map((c) => `<div class="hand" style="--mc:${c}" aria-hidden="true"><i></i></div>`).join('')}</div><p class="hl"></p><div class="st"><i></i><span>${C.status}</span></div><div class="cp">${C.sc.map((s, i) => `<div class="cs" data-i="${i}"><span class="bg">${s.say.split(' ').map((w) => `<span class="w">${w} </span>`).join('')}</span></div>`).join('')}</div>`
    board = q1('.board', hero); ink = q1('.ink', hero); hl = q1('.hl', hero); st = q1('.st', hero); cp = q1('.cp', hero); eraser = q1('.eraser', hero)
    hands = [...hero.querySelectorAll<HTMLElement>('.hand')]; capEls = [...hero.querySelectorAll<HTMLElement>('.cs')]
    hl.innerHTML = C.head.split(' ').map((w) => `<span class="w">${w} </span>`).join('')
    void W
    layout()
  }

  // Geometry of the board, shared by the hero and the whole class.
  function geom(): Geom {
    const vw = V.vw, vh = V.vh, por = V.por
    const fsH = por ? (vw <= 340 ? 24 : vw <= 400 ? 29 : 36) : Math.round(Math.min(44, Math.max(30, vw * .031)))
    const bx = por ? SIDE : Math.max(SIDE, Math.round(vw * .04)), bw = vw - 2 * bx
    hl.style.fontSize = fsH + 'px'; hl.style.width = (por ? bw : Math.min(bw, 900)) + 'px'
    const hlH = hl.offsetHeight, stH = 26
    const textH = hlH + 14 + stH
    let bh = vh - HEAD - 24 - textH - 20 - 24
    bh = Math.round(Math.min(bh, por ? bw * 1.75 : bw * .56, 640))
    const by = HEAD + 24, railH = por ? 24 : 30, pad = por ? 20 : Math.round(Math.min(56, bw * .04))
    return { vw, vh, por, bx, by, bw, bh, railH, pad, enH: bh - railH - 9, hlH, fsH, railTop: bh - railH }
  }
  function layout() {
    const vw = innerWidth, vh = innerHeight
    Object.assign(V, { vw, vh })
    stage.style.height = vh + 'px'
    track.style.height = (vh * (V.por ? 30 : 28)) + 'px'
    V.top = track.getBoundingClientRect().top + scrollY
    V.span = track.offsetHeight - vh; V.hold = vh * .45; V.range = Math.max(1, V.span - V.hold)
    G = geom()
    const place = (e: HTMLElement, x: number, y: number) => { e.style.transform = `translate3d(${Math.round(x)}px,${Math.round(y)}px,0)` }
    board.style.width = G.bw + 'px'; board.style.height = G.bh + 'px'; place(board, G.bx, G.by)
    place(hl, G.bx, G.by + G.bh + 20); place(st, G.bx, G.by + G.bh + 20 + G.hlH + 14)
    cp.style.cssText = `position:absolute;left:0;top:0;width:${G.bw}px;transform:translate3d(${G.bx}px,${G.by + G.bh + 20}px,0)`
    const fsC = G.por ? (vw <= 340 ? 17 : 19) : Math.round(Math.min(27, Math.max(20, vw * .018)))
    capEls.forEach((e) => { e.style.width = G.bw + 'px'; e.style.fontSize = fsC + 'px' })
    boardSVG()
    buildInk()
    buildTL()
    apply(reduce ? HEROEND - .01 : U)
  }
  function boardSVG() {
    const { bw, bh, railH, railTop, por, pad } = G
    const sm = `<g filter="url(#wbsm)" fill="none" stroke="${INK}" stroke-linecap="round" stroke-width="${por ? 9 : 16}"><path d="M${bw * .3} ${bh * .62} C ${bw * .36} ${bh * .54} ${bw * .44} ${bh * .7} ${bw * .52} ${bh * .62}" opacity=".05"/><path d="M${bw * .1} ${bh * .5} C ${bw * .16} ${bh * .45} ${bw * .22} ${bh * .58} ${bw * .3} ${bh * .5}" opacity=".04"/><path d="M${bw * .56} ${bh * .12} C ${bw * .62} ${bh * .08} ${bw * .7} ${bh * .18} ${bw * .78} ${bh * .12}" opacity=".035"/></g>`
    const sv = q1<SVGElement>('.bsvg', hero)
    sv.setAttribute('width', String(bw)); sv.setAttribute('height', String(bh)); sv.setAttribute('viewBox', `0 0 ${bw} ${bh}`)
    sv.innerHTML = u(`<defs><linearGradient id="wbal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E4E8EA"/><stop offset=".5" stop-color="#C5CBCF"/><stop offset="1" stop-color="#A6ADB2"/></linearGradient>
   <linearGradient id="wbmt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8ECEE"/><stop offset="1" stop-color="#AAB1B6"/></linearGradient>
   <linearGradient id="wbsh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".62"/><stop offset=".34" stop-color="#fff" stop-opacity="0"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient>
   <filter id="wbsm" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="${por ? 3 : 4}"/></filter>
   <clipPath id="wbcp"><rect x="9" y="9" width="${bw - 18}" height="${railTop - 9}" rx="5"/></clipPath></defs>
   <rect width="${bw}" height="${bh}" rx="14" fill="url(#wbal)"/><rect x=".75" y=".75" width="${bw - 1.5}" height="${bh - 1.5}" rx="13.5" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.5"/>
   <rect x="9" y="9" width="${bw - 18}" height="${railTop - 9}" rx="5" fill="#F4F5F2"/>
   <g clip-path="url(#wbcp)">${sm}<rect x="9" y="9" width="${bw - 18}" height="${railTop - 9}" fill="url(#wbsh)"/></g>
   <rect x="0" y="${railTop}" width="${bw}" height="${railH}" fill="url(#wbmt)"/><path d="M0 ${railTop + .5} H${bw}" stroke="#fff" stroke-opacity=".85"/><path d="M0 ${bh - .5} H${bw}" stroke="#7C858B" stroke-opacity=".55"/><path d="M9 ${railTop - .5} H${bw - 9}" stroke="#C9CDC8" stroke-opacity=".9"/>`)
    ink.style.width = bw + 'px'; ink.style.height = bh + 'px'
    // tray: four markers rest on the rail, the eraser beside them
    const mw = por ? 36 : 60, mh = por ? 11 : 13, gapM = por ? 8 : 14, ew = por ? 54 : 86, eh = por ? 26 : 40
    const total = 4 * mw + 4 * gapM + ew, startX = por ? (bw - total) / 2 : Math.round(bw * .40)
    const my = railTop - mh + 3
    const trayw = q1<HTMLElement>('.trayw', hero)
    trayw.innerHTML = ''; trayw.style.cssText = 'position:absolute;left:0;top:0'
    const slots: Slot[] = COLS.map((c, i) => {
      const d = document.createElement('div')
      d.className = 'mk'; d.style.cssText = `--mc:${c};width:${mw}px;height:${mh}px;transform:translate3d(${startX + i * (mw + gapM)}px,${my + mh / 2 - mh / 2}px,0)`; d.innerHTML = '<i></i>'
      trayw.appendChild(d)
      return { x: startX + i * (mw + gapM), y: my + mh / 2, c, el: d }
    })
    eraser.style.width = ew + 'px'; eraser.style.height = eh + 'px'
    tray = { slots, mw, mh, ew, eh, ex: startX + 4 * (mw + gapM) + ew / 2, ey: railTop - eh / 2 + 4 }
    hands.forEach((h) => { h.style.width = mw + 'px'; h.style.height = mh + 'px' })
    const vb = q1<HTMLElement>('.vb', hero)
    if (por) vb.style.display = 'none'
    else { vb.style.display = 'flex'; const d = Math.round(railH + 16); vb.style.width = vb.style.height = d + 'px'; vb.style.left = (bw - pad - d) + 'px'; vb.style.top = (bh - d + 6) + 'px' }
  }

  // ---------- Ink: scenes of handwriting and strokes ----------
  function buildInk() {
    const { bw, por, pad, enH } = G
    ink.innerHTML = ''; SC = []
    const NS = 'http://www.w3.org/2000/svg'
    const mk = () => {
      const el = document.createElement('div')
      el.className = 'sc'
      el.innerHTML = `<svg class="sv" width="${bw}" height="${G.bh}" viewBox="0 0 ${bw} ${G.bh}"><g fill="none" stroke-linecap="round" stroke-linejoin="round"></g></svg>`
      ink.appendChild(el)
      const s = { el, g: el.querySelector('g') as SVGGElement, items: [], cap: null, u0: 0, u1: 0, sweep: 0, fadeG: 0 } as unknown as Scene
      SC.push(s)
      return s
    }
    type TR = { lines: Item[]; bottom: number; right: number; left: number; top: number }
    const text = (s: Scene, txt: string, x: number, y: number, fs: number, c: string, maxw: number, center?: boolean): TR => {
      const font = `700 ${fs}px Caveat`, words = txt.split(' '), lines: string[] = []
      let cur = ''
      for (const w of words) { const t = cur ? cur + ' ' + w : w; if (cur && textW(font, t) > maxw) { lines.push(cur); cur = w } else cur = t }
      lines.push(cur)
      const out: Item[] = []
      lines.forEach((ln, i) => {
        const w = textW(font, ln), yy = y + i * fs * 1.3, el = document.createElement('div')
        el.className = 'hw'; el.textContent = ln
        const xx = center ? x + (maxw - w) / 2 : x
        el.style.cssText = `font-size:${fs}px;color:${c};transform:translate3d(${xx.toFixed(1)}px,${yy.toFixed(1)}px,0)`
        s.el.appendChild(el)
        const it = { k: 'text', el, x: xx, y: yy, w, fs, c, a: [], len: 0, end: [0, 0] } as Item
        s.items.push(it); out.push(it)
      })
      const l = out[out.length - 1]
      return { lines: out, bottom: l.y + fs * 1.22, right: Math.max(...out.map((o) => o.x + o.w)), left: out[0].x, top: out[0].y }
    }
    const path = (s: Scene, g: SVGGElement, d: string, c: string, w: number) => {
      const p = document.createElementNS(NS, 'path')
      p.setAttribute('d', d); p.setAttribute('stroke', c); p.setAttribute('stroke-width', String(w)); p.setAttribute('pathLength', '1'); p.setAttribute('stroke-dasharray', '1 1')
      p.style.strokeDashoffset = '1'
      g.appendChild(p)
      const it = { k: 'path', el: p, c, a: [], len: 0, end: [0, 0], x: 0, y: 0, w: 0, fs: 0 } as Item
      s.items.push(it)
      return it
    }
    const strokeP = (s: Scene, d: string, c: string, w: number) => path(s, s.g, d, c, w)
    const doodle = (s: Scene, name: string, x: number, y: number, w: number, order?: number[]) => {
      const [bw0, bh0, ps] = DOO[name], k = w / bw0
      const g = document.createElementNS(NS, 'g')
      g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${k.toFixed(4)})`); g.dataset.dd = '1'
      s.g.appendChild(g)
      const idx = order || ps.map((_, i) => i)
      idx.forEach((i) => path(s, g, ps[i][0], ps[i][1], (por ? 2.8 : 3.8) / k))
      return { x, y, w, h: bh0 * k, bottom: y + bh0 * k, right: x + w }
    }
    const fitD = (name: string, maxW: number, maxH: number) => { const [a, b] = DOO[name]; return Math.max(30, Math.min(maxW, maxH * a / b)) }
    // layout numbers
    const sp = por ? cl(enH / 430, 1, 1.7) : 1
    const fsT = por ? (bw <= 290 ? 28 : 34) : Math.round(Math.min(86, Math.max(44, enH * .13))), fsN = por ? (bw <= 290 ? 25 : 31) : Math.round(fsT * .82)
    const cx = pad + 9, cw = bw - 2 * pad - 18, ty = por ? pad * .8 + 4 : pad * .7 + 6
    const ulc = [BLU, BLU, GRN, RED, GRN]
    // scene 0: the hero: name, doodle cluster, underlines
    {
      const s = mk(); s.hero = true
      let fs: number, ny: number, cw0: number, sc0: number, cxx: number, cyy: number
      const nx = pad, w100 = textW('700 100px Caveat', 'Whiteboard')
      if (por) {
        fs = Math.min((bw - 2 * pad) * .93 / w100 * 100, enH * .3); ny = pad * .9 + 4; cw0 = bw - 2 * pad; sc0 = cw0 / CL.w; cxx = pad
        const nb = ny + fs * 1.06, room = enH - nb - 10
        cyy = nb + Math.max(8, (room - CL.h * sc0) * .36)
      } else {
        const cwS = Math.min(bw * .5, 700), sS = cwS / CL.w, chS = CL.h * sS, fsS = Math.min(Math.min(bw * .62, 880) / w100 * 100, (enH - chS - pad * 2.6) / 1.12)
        const cwR = Math.min(bw * .38, 540), fsR = Math.min((bw - 3 * pad - cwR - 44) / w100 * 100, enH * .42)
        if (fsS >= fsR * .98) { fs = fsS; ny = Math.round(pad * .8); cw0 = cwS; sc0 = sS; cxx = bw - pad - cw0; cyy = enH + 9 - CL.h * sc0 - pad * 1.1 }
        else { fs = fsR; cw0 = cwR; sc0 = cw0 / CL.w; ny = Math.round((enH - fs * 1.35) / 2); cxx = bw - pad - cw0; cyy = (enH - CL.h * sc0) / 2 + 4 }
      }
      const nm = text(s, 'Whiteboard', nx, ny, fs, INK, 9999)
      const nw = nm.lines[0].w, uy = ny + fs * 1.03, ux1 = nx + nw * .94
      const g = document.createElementNS(NS, 'g')
      g.setAttribute('transform', `translate(${(cxx - CL.x0 * sc0).toFixed(2)} ${(cyy - CL.y0 * sc0).toFixed(2)}) scale(${sc0.toFixed(4)})`); g.dataset.dd = '1'
      s.g.appendChild(g)
      const A = (i: number) => path(s, g, ART[i][0], ART[i][1], 3), M = (i: number) => path(s, g, MICP[i][0], MICP[i][1], 3)
      ;[1, 2, 4, 5, 7, 8].forEach(A); [0, 1, 2].forEach(M); A(0); A(3); A(6); A(9); A(10); A(11)
      strokeP(s, ULP(nx + 6, ux1, uy, 1), RED, 5); strokeP(s, ULP(nx + nw * .16, nx + nw * .86, uy + 11 * (por ? .7 : 1), .8), RED, 4)
    }
    // scenes 1..5: the class
    const titleOf = (s: Scene, i: number) => {
      const t = text(s, C.sc[i].t, cx, ty, fsT, INK, cw), l = t.lines[t.lines.length - 1]
      strokeP(s, ULP(t.left, Math.min(t.right, t.left + cw), l.y + fsT * .98, 1), ulc[i], 4.5)
      return t.bottom + (por ? 8 : 16)
    }
    const ULt = (s: Scene, t: TR, col: string, w?: number) => { const l = t.lines[t.lines.length - 1]; return strokeP(s, ULP(l.x, l.x + l.w * .96, l.y + l.fs * .98, .8), col, w || 4) }
    const sceneDefs: ((s: Scene, y0: number) => void)[] = [
      (s, y0) => {
        const t = text(s, C.sc[0].a, cx + (por ? 0 : 20), y0 + (por ? 4 : 30), fsN, INK, cw); ULt(s, t, BLU)
        if (por) { const w = fitD('mic', cw * .62, enH - t.bottom - 50); doodle(s, 'mic', cx + 4, t.bottom + 14 * sp, w) }
        else doodle(s, 'mic', cx + cw * .6, y0 + 6, fitD('mic', cw * .26, enH - y0 - 60))
      },
      (s, y0) => {
        const t = text(s, C.sc[1].a, cx + (por ? 0 : 20), y0 + (por ? 4 : 40), fsN, INK, cw * (por ? 1 : .58)); ULt(s, t, GRN)
        if (por) { const w = fitD('plant', cw * .72, enH - t.bottom - 40); doodle(s, 'plant', cx + 4, t.bottom + 14 * sp, w, [0, 1, 2, 3, 4, 5, 6]) }
        else doodle(s, 'plant', cx + cw * .64, y0 - 6, fitD('plant', cw * .24, enH - y0 - 40), [0, 1, 2, 3, 4, 5, 6])
      },
      (s, y0) => {
        // the correction: the old number is struck through and the right one is written beside it
        const t1 = text(s, C.sc[2].a, cx + (por ? 0 : 20), y0 + (por ? 6 : 30), fsN, INK, cw)
        const l = t1.lines[0], ym = l.y + l.fs * .56
        strokeP(s, `M${l.x - 6} ${ym + 10} L${l.x + l.w * .34} ${ym - 12} L${l.x + l.w * .14} ${ym + 14} L${l.x + l.w * .62} ${ym - 12} L${l.x + l.w * .42} ${ym + 14} L${l.x + l.w + 6} ${ym - 10}`, RED, por ? 3.5 : 5)
        let nx2: number, ny2: number
        if (por) { nx2 = cx; ny2 = t1.bottom + 26 * sp } else { nx2 = t1.right + 60; ny2 = y0 + 30 }
        const t2 = text(s, C.sc[2].b!, nx2, ny2, fsN, GRN, por ? cw : cw - (t1.right - cx) - 70); ULt(s, t2, GRN)
        const l2 = t2.lines[t2.lines.length - 1]
        strokeP(s, `M${l2.x + l2.w + 12} ${l2.y + l2.fs * .55} l${fsN * .22} ${fsN * .28} l${fsN * .5} ${-fsN * .55}`, GRN, por ? 3.5 : 5)
      },
      (s, y0) => {
        if (por) {
          const t1 = text(s, C.sc[3].a, cx, y0 + 4, fsN, INK, cw), t2 = text(s, C.sc[3].b!, cx, t1.bottom + 22 * sp, fsN, INK, cw * .5)
          const w = fitD('leaf', cw * .5, enH - t2.top - 30); doodle(s, 'leaf', t2.right + 14 < cx + cw - w ? t2.right + 14 : cx + cw - w, t2.top, w)
        } else {
          text(s, C.sc[3].a, cx + 20, y0 + 60, fsN, INK, cw * .45); const t2 = text(s, C.sc[3].b!, cx + cw * .55, y0 + 10, fsN, INK, cw * .4)
          doodle(s, 'leaf', cx + cw * .55 + 20, t2.bottom + 16, fitD('leaf', cw * .2, enH - t2.bottom - 70))
        }
      },
      (s, y0) => {
        if (por) {
          const wm = fitD('mic', cw * .36, (enH - y0) * .4), m = doodle(s, 'mic', cx + 4, y0 + 8 * sp, wm)
          text(s, C.sc[4].a, m.right + 16, m.y + m.h / 2 - fsN * .55, fsN, BLU, cw - wm - 24)
          const lw = textW(`700 ${fsN}px Caveat`, C.sc[4].b!), wmm = Math.min(cw - lw - 18, cw * .6, 150), yy = m.bottom + 34 * sp, d2 = doodle(s, 'memo', cx + 4, yy, wmm)
          text(s, C.sc[4].b!, d2.right + 14, d2.y + d2.h / 2 - fsN * .55, fsN, RED, cw - wmm - 20)
        } else {
          const mw0 = fitD('mic', cw * .24, enH - y0 - fsN * 1.3 - 60), m = doodle(s, 'mic', cx + 50, y0 + 10, mw0)
          text(s, C.sc[4].a, cx + 50, m.bottom + 14, fsN, BLU, cw * .4)
          const d2 = doodle(s, 'memo', cx + cw * .46, y0 + 30, Math.min(cw * .34, fitD('memo', 9999, enH - y0 - fsN * 1.3 - 80)))
          text(s, C.sc[4].b!, cx + cw * .46 + 30, d2.bottom + 14, fsN, RED, cw * .45)
        }
      },
    ]
    for (let i = 0; i < 5; i++) { const s = mk(); s.cap = i; const y0 = titleOf(s, i); sceneDefs[i](s, y0) }
    // the end: a clean board, then the name and the status
    {
      const s = mk(); s.end = true
      const w100 = textW('700 100px Caveat', 'Whiteboard'), fs = Math.min((bw - 2 * pad) * .92 / w100 * 100, por ? enH * .26 : enH * .36)
      const t = text(s, 'Whiteboard', pad + 9, (enH - fs * 1.1 - fsT * 1.3 - 24) / 2, fs, INK, bw - 2 * pad - 18, true); ULt(s, t, RED, 5)
      const t2 = text(s, C.status, pad + 9, t.bottom + (por ? 22 : 30), Math.round(fs * (por ? .42 : .4)), GRN, bw - 2 * pad - 18, true); ULt(s, t2, GRN, 5)
    }
    // path sample points in board px (after layout) and the ghosts left behind by the eraser
    SC.forEach((s) => {
      s.items.forEach((it) => {
        if (it.k === 'path') {
          const el = it.el as SVGPathElement, L = el.getTotalLength(), m = el.getCTM()!, a: Pt[] = [], n = Math.max(8, Math.ceil(L / 6))
          for (let i = 0; i <= n; i++) { const p = el.getPointAtLength(L * i / n); a.push([m.a * p.x + m.c * p.y + m.e, m.b * p.x + m.d * p.y + m.f]) }
          let len = 0
          for (let i = 1; i < a.length; i++) len += Math.hypot(a[i][0] - a[i - 1][0], a[i][1] - a[i - 1][1])
          it.a = a; it.len = len; it.end = a[a.length - 1]
        } else { const y = it.y + it.fs * .68; it.a = [[it.x + 2, y], [it.x + it.w, y]]; it.len = it.w; it.end = [it.x + it.w, y] }
      })
    })
    SC.forEach((s) => {
      const gh = s.el.cloneNode(true) as HTMLElement
      gh.className = 'gh'; gh.setAttribute('aria-hidden', 'true')
      ink.insertBefore(gh, s.el); s.gh = gh; s.el.style.visibility = 'hidden'
    })
  }

  // ---------- Timeline: abstract seconds; the hero in real time, the class laid on the scroll ----------
  function buildTL() {
    const { por } = G, sl = tray.slots, slotOf = (c: string) => sl.find((x) => x.c === c)!
    TL = []
    let t = .25, prev: Item | null = null
    const speedP = por ? 620 : 900
    let kk = 1
    const draw = (it: Item) => {
      const c = it.c
      if (prev === null) { const s1 = slotOf(c); TL.push({ k: 'take', s1, to: it.a[0], c, u0: t, u1: t + .3 * kk }); t += .3 * kk }
      else if (prev.c !== c) { TL.push({ k: 'swap', from: prev.end, s0: slotOf(prev.c), s1: slotOf(c), to: it.a[0], c, u0: t, u1: t + .35 * kk }); t += .35 * kk }
      else { TL.push({ k: 'move', from: prev.end, to: it.a[0], c, u0: t, u1: t + .12 * kk }); t += .12 * kk }
      const dur = (it.k === 'text' ? Math.max(.8, it.w / (por ? 240 : 420)) : cl(it.len / speedP, .16, .7)) * kk
      TL.push({ k: 'draw', it, u0: t, u1: t + dur })
      prev = it; t += dur
    }
    const park = () => { if (prev) { TL.push({ k: 'park', from: prev.end, s0: slotOf(prev.c), c: prev.c, u0: t, u1: t + .45 }); t += .45; prev = null } }
    SC.forEach((s, i) => {
      kk = s.hero ? .68 : 1
      if (i > 0) { TL.push({ k: 'erase', s: i - 1, u0: t, u1: t + 1.6 }); t += 1.6; s.u0 = t } else s.u0 = t
      if (s.cap !== null) TL.push({ k: 'cap', i: s.cap, u0: t, u1: t + 1.5, uo: 0, sc: i })
      s.items.forEach(draw)
      // The correction stays on the board twice as long: the crossed-out number and the right one must be readable before the eraser.
      t += s.end ? .9 : s.hero ? .4 : s.cap === 2 ? 3.6 : 1.5
      park(); s.u1 = t
    })
    // captions leave when their scene's erase starts
    TL.filter((e) => e.k === 'cap').forEach((e) => { const er = TL.find((x) => x.k === 'erase' && x.s === e.sc); e.uo = er ? er.u0 : t + 1 })
    UEND = t
    erases = TL.filter((e) => e.k === 'erase')
    HEROEND = erases[0].u0
  }
  const uOfP = (p: number) => p > .012 ? erases[0].u0 + (p - .012) / (.985 - .012) * (UEND - erases[0].u0) : 0

  // ---------- Apply: everything on the board is a function of u ----------
  function apply(uu: number) {
    const T = tray
    let cur: Cur | null = null
    SC.forEach((s) => { s.sweep = 0; s.fadeG = 0 })
    let ep: { e: TLe; p: number; sw: number } | null = null
    for (const e of erases) {
      const p = cl((uu - e.u0) / (e.u1 - e.u0)), s = SC[e.s!]
      s.sweep = EIO(cl((p - .16) / .68)); s.fadeG = S(uu, e.u1, e.u1 + 1.8)
      if (p > 0 && p < 1) ep = { e, p, sw: s.sweep }
    }
    for (const e of TL) {
      if (e.k === 'draw') {
        const it = e.it!, p = cl((uu - e.u0) / (e.u1 - e.u0))
        if (it.k === 'path') {
          put(it.el, 'strokeDashoffset', (1 - EO(p)).toFixed(4)); put(it.el, 'opacity', p > 0 ? '1' : '0')
        } else {
          const k = (EIO(p) * 112).toFixed(1)
          put(it.el, 'opacity', p > 0 ? '1' : '0')
          put(it.el, 'clipPath', p >= 1 ? 'none' : `polygon(0 -12%, ${k}% -12%, ${(+k - 9).toFixed(1)}% 112%, 0 112%)`)
        }
        if (uu >= e.u0 && uu <= e.u1 + .03) {
          const q = it.k === 'text' ? EIO(p) : EO(p)
          if (it.k === 'text') cur = { x: it.a[0][0] + (it.a[1][0] - it.a[0][0]) * q, y: it.a[0][1] + Math.sin(uu * 11) * it.fs * .05, c: it.c }
          else { const i = Math.min(it.a.length - 1, Math.round(q * (it.a.length - 1))); cur = { x: it.a[i][0], y: it.a[i][1], c: it.c } }
        }
      } else if (e.k !== 'erase' && e.k !== 'cap' && uu >= e.u0 && uu <= e.u1) {
        const v = (uu - e.u0) / (e.u1 - e.u0), q = EIO(v)
        if (e.k === 'move') cur = { x: lerp(e.from![0], e.to![0], q), y: lerp(e.from![1], e.to![1], q), c: e.c!, lift: Math.sin(Math.PI * q) * 8 }
        else if (e.k === 'take') cur = { x: lerp(e.s1!.x, e.to![0], q), y: lerp(e.s1!.y, e.to![1], q), c: e.c!, up: 1 - q }
        else if (e.k === 'swap') {
          if (v < .4) { const r = EIO(v / .4); cur = { x: lerp(e.from![0], e.s0!.x, r), y: lerp(e.from![1], e.s0!.y, r), c: e.s0!.c, down: r } }
          else if (v < .5) cur = null
          else { const r = EIO((v - .5) / .5); cur = { x: lerp(e.s1!.x, e.to![0], r), y: lerp(e.s1!.y, e.to![1], r), c: e.s1!.c, up: 1 - r } }
        } else if (e.k === 'park') cur = { x: lerp(e.from![0], e.s0!.x, q), y: lerp(e.from![1], e.s0!.y, q), c: e.c!, down: q }
      }
    }
    // scenes: the live layer is clipped by the eraser, a ghost stays behind it
    SC.forEach((s) => {
      const sw = s.sweep, started = uu >= s.u0 - .001
      const E0 = -G.bh * .3 + (G.bw + G.bh * .6) * sw, sl = G.bh * .3
      const vis = started && sw < 1
      let clip = 'none'
      if (sw > 0 && sw < 1) clip = `polygon(${(E0 + sl).toFixed(1)}px 0,${G.bw}px 0,${G.bw}px ${G.bh}px,${(E0 - sl).toFixed(1)}px ${G.bh}px)`
      put(s.el, 'visibility', vis ? 'visible' : 'hidden'); put(s.el, 'clipPath', clip)
      let go = 0, gc = 'none'
      if (sw > 0) { go = .1 * (1 - s.fadeG); if (sw < 1) gc = `polygon(0 0,${(E0 + sl).toFixed(1)}px 0,${(E0 - sl).toFixed(1)}px ${G.bh}px,0 ${G.bh}px)` }
      put(s.gh, 'opacity', go.toFixed(3)); put(s.gh, 'clipPath', gc)
    })
    // eraser
    {
      const rx = T.ex, ry = T.ey, ew = T.ew, eh = T.eh
      let x = rx, y = ry, rot = 0
      if (ep) {
        const p = ep.p
        if (p < .16) { const q = EIO(p / .16), sx = -G.bh * .3 - ew * .2, sy = G.enH * .28; x = lerp(rx, sx, q); y = lerp(ry, sy, q) - Math.sin(Math.PI * q) * 30; rot = -10 * q }
        else if (p < .84) { const q = ep.sw, E0 = -G.bh * .3 + (G.bw + G.bh * .6) * q; x = E0; y = G.enH * (.28 + .5 * q) + Math.sin(q * Math.PI * 3) * G.enH * .06; rot = -10 }
        else { const q = EIO((p - .84) / .16), ex = G.bw + G.bh * .3, ey = G.enH * .78; x = lerp(ex, rx, q); y = lerp(ey, ry, q) - Math.sin(Math.PI * q) * 30; rot = -10 * (1 - q) }
      }
      put(eraser, 'transform', `translate3d(${(x - ew / 2).toFixed(1)}px,${(y - eh / 2).toFixed(1)}px,0) rotate(${rot.toFixed(1)}deg)`)
    }
    // the marker in hand (one per colour) and the tray
    const c = cur as Cur | null
    const heldNow = c ? c.c : null
    for (const s of T.slots) { const gone = heldNow === s.c && !(c && c.down !== undefined && c.down > .97); put(s.el, 'opacity', gone ? '0' : '1') }
    hands.forEach((h, j) => {
      if (!c || COLS[j] !== c.c) { put(h, 'opacity', '0'); put(h, 'visibility', 'hidden'); return }
      put(h, 'opacity', '1'); put(h, 'visibility', 'visible')
      const rot = c.down !== undefined ? -38 * (1 - c.down) : c.up !== undefined ? -38 * (1 - c.up) : -38
      put(h, 'transform', `translate3d(${c.x.toFixed(1)}px,${(c.y - T.mh / 2 - (c.lift || 0)).toFixed(1)}px,0) rotate(${rot.toFixed(1)}deg)`)
    })
    // the headline and the status leave when the class starts; the teacher's lines appear as subtitles
    const hv = 1 - S(uu, HEROEND, HEROEND + .8)
    put(hl, 'opacity', hv.toFixed(3)); put(hl, 'visibility', hv <= 0 ? 'hidden' : 'visible')
    put(st, 'opacity', hv.toFixed(3)); put(st, 'visibility', hv <= 0 ? 'hidden' : 'visible')
    for (const e of TL) {
      if (e.k !== 'cap') continue
      const el = capEls[e.i!], ws = el.querySelectorAll<HTMLElement>('.w'), n = ws.length
      const vo = S(uu, e.u0, e.u0 + .3) * (1 - S(uu, e.uo!, e.uo! + .4))
      put(el, 'opacity', vo.toFixed(3)); put(el, 'visibility', vo <= .002 ? 'hidden' : 'visible')
      if (vo > 0) ws.forEach((w, j) => { put(w, 'opacity', cl((uu - (e.u0 + j * (1.3 / n))) / .25).toFixed(2)) })
    }
  }

  // ---------- Frame ----------
  let lastIdle = -1, sy = 0, built = false
  function frame(p: number) {
    let uu: number
    if (reduce) uu = HEROEND - .01
    else if (p > .012) uu = hu < HEROEND - .01 ? hu : uOfP(p)
    else uu = hu
    U = uu
    apply(uu)
    const idle = sy > V.top + V.span ? 1 : 0
    if (idle !== lastIdle) { lastIdle = idle; root.classList.toggle('idle', !!idle) }
  }
  let target = 0, ps = 0, raf = 0, prev = 0
  const targetP = () => reduce ? 0 : cl(scrollY - V.top, 0, V.range) / V.range
  const heroRunning = () => heroAt !== undefined && hu < HEROEND - .01 && !document.hidden
  function tick(now: number) {
    raf = 0
    const dt = Math.min(64, now - prev)
    prev = now
    const d = target - ps
    if (Math.abs(d) < .0002) ps = target; else ps += d * (1 - Math.exp(-dt / 130))
    if (heroAt !== undefined && hu < HEROEND - .01) {
      if (ps > .012 && huRate === 1) huRate = Math.max(1, (HEROEND - .01 - hu) / .4)
      hu = Math.min(HEROEND - .01, hu + dt / 1000 * huRate)
    }
    frame(ps)
    if (ps !== target || heroRunning()) raf = requestAnimationFrame(tick)
    else root.classList.remove('moving')
  }
  function kick() {
    if (!built || disposed) return
    sy = scrollY
    target = targetP()
    if (reduce) { ps = target; frame(ps); return }
    if (raf || disposed) return
    root.classList.add('moving')
    prev = performance.now()
    raf = requestAnimationFrame(tick)
  }

  // Fonts first: the handwriting is measured on a canvas, so the board is built once the face is in.
  let landed = false
  const fonts = ['700 100px Caveat', '700 26px "Bricolage Grotesque"', '600 20px "Bricolage Grotesque"', '500 20px Geist']
  const begin = () => {
    if (disposed || !built || !landed) return
    heroAt = performance.now() / 1000
    if (reduce) { kick(); return }
    const A = (el: HTMLElement, fr: Keyframe[], o: KeyframeAnimationOptions) => el.animate(fr, { fill: 'backwards', easing: 'cubic-bezier(0.23, 1, 0.32, 1)', ...o })
    A(board, [{ opacity: 0 }, { opacity: 1 }], { duration: 420 })
    A(hl, [{ opacity: 0, translate: '0 10px' }, { opacity: 1, translate: '0 0' }], { duration: 520, delay: 900 })
    A(st, [{ opacity: 0 }, { opacity: 1 }], { duration: 420, delay: 1300 })
    kick()
  }
  Promise.all(fonts.map((f) => document.fonts.load(f).catch(() => [] as FontFace[]))).then(() => {
    if (disposed) return
    build(); built = true
    // A language switch or a late arrival keeps the hero in its finished state instead of replaying it.
    if (!first || reduce) { heroAt = performance.now() / 1000; hu = HEROEND; kick() }
    else begin()
  })

  let sizeW = innerWidth, sizeH = innerHeight, sizeRaf = 0
  addEventListener('resize', () => {
    if (sizeRaf) return
    sizeRaf = requestAnimationFrame(() => {
      sizeRaf = 0
      if (!built || (innerWidth === sizeW && Math.abs(innerHeight - sizeH) < 140)) return
      sizeW = innerWidth; sizeH = innerHeight
      build(); kick()
    })
  }, { signal })
  if (!reduce) addEventListener('scroll', kick, { passive: true, signal })
  document.addEventListener('visibilitychange', () => { root.classList.toggle('idle', document.hidden); if (!document.hidden) kick() }, { signal })

  // ---------- Entrance ----------
  const flight = first && !reduce ? takeFlight('whiteboard') : null
  if (reduce && first) { const f = takeFlight('whiteboard'); if (f) cancelFlight(f) }
  if (flight) {
    // The card's slate grows into this page; the board appears over it and starts writing once it has landed.
    stage.style.opacity = '0'
    playFlight(flight, { sheetClass: 'wb-mat', stage, onLanded: () => { landed = true; begin() }, signal })
  } else {
    landed = true
    if (first && !reduce) stage.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 480, easing: 'ease' })
    begin()
  }

  return () => {
    disposed = true
    ac.abort()
    cancelAnimationFrame(raf); cancelAnimationFrame(sizeRaf)
    root.getAnimations({ subtree: true }).forEach((a) => a.cancel())
    root.classList.remove('rm', 'moving', 'idle')
    root.replaceChildren()
  }
}
