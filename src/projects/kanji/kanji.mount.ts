import type { Mount } from '../../home/useMount'
import type { ProjectData } from '../types'
import { takeFlight, playFlight, cancelFlight } from '../cardFlight'
import { motions } from '../../home/sections/card-motion'
import { COPY, MODES, REPO, STROKES } from './data'
import './kanji.css'
import washi from './assets/washi.svg'
import writeDone from './assets/write-done.webp'
import indice from './assets/indice.webp'
import lessonTop from './assets/lesson-top.webp'
import lessonScrolled from './assets/lesson-scrolled.webp'
import writeBlank from './assets/write-blank.webp'
import ink from './assets/ink.webp'
import setup from './assets/setup.webp'
import q0 from './assets/q0.webp'
import q0ok from './assets/q0-ok.webp'
import c1 from './assets/c1.webp'
import c1ok from './assets/c1-ok.webp'
import c2 from './assets/c2.webp'
import c2ok from './assets/c2-ok.webp'
import c3 from './assets/c3.webp'
import c3ok from './assets/c3-ok.webp'
import c4 from './assets/c4.webp'
import c4ok from './assets/c4-ok.webp'
import c5 from './assets/c5.webp'
import c5ok from './assets/c5-ok.webp'

// The scroll story of Kanji Study App: a still life on washi, the real app captures on a phone that turns as you scroll, and the quiz
// cards that flip out of it. One rAF drives one damped scroll value and stops when it settles. Layout is read on load and on resize;
// the frame loop only writes transform, opacity, visibility and clip-path, and places its labels from the same math as the 3D scene.

const CARDS: [string, string][] = [[c1, c1ok], [c2, c2ok], [c3, c3ok], [c4, c4ok], [c5, c5ok]]

type Vec = [number, number]
const cl = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const S = (p: number, a: number, b: number) => cl((p - a) / (b - a))

function bez(x1: number, y1: number, x2: number, y2: number) {
  const X = (t: number) => 3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t
  const Y = (t: number) => 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t
  const D = (t: number) => 3 * (1 - t) * (1 - t) * x1 + 6 * (1 - t) * t * (x2 - x1) + 3 * t * t * (1 - x2)
  return (x: number) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let t = x
    for (let i = 0; i < 6; i++) { const d = D(t); if (Math.abs(d) < 1e-6) break; t -= (X(t) - x) / d }
    if (t < 0 || t > 1) { let a = 0, b = 1; t = x; for (let i = 0; i < 24; i++) { if (X(t) < x) a = t; else b = t; t = (a + b) / 2 } }
    return Y(t)
  }
}
const EO = bez(0.23, 1, 0.32, 1), EIO = bez(0.77, 0, 0.175, 1), BACK = bez(0.34, 1.3, 0.64, 1)

// ---------- 4 x 4 matrices (row-major, column vectors), the same composition CSS uses ----------
type Mat = number[]
const mul = (a: Mat, b: Mat): Mat => {
  const o = new Array<number>(16)
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) o[r * 4 + c] = a[r * 4] * b[c] + a[r * 4 + 1] * b[4 + c] + a[r * 4 + 2] * b[8 + c] + a[r * 4 + 3] * b[12 + c]
  return o
}
const T3 = (x: number, y: number, z: number): Mat => [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1]
const RX = (d: number): Mat => { const a = d * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1] }
const RY = (d: number): Mat => { const a = d * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return [c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1] }
const RZ = (d: number): Mat => { const a = d * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return [c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] }
const SC = (k: number): Mat => [k, 0, 0, 0, 0, k, 0, 0, 0, 0, k, 0, 0, 0, 0, 1]
// A transform that acts about the point (ox, oy), the way transform-origin does.
const about = (ox: number, oy: number, m: Mat) => mul(T3(ox, oy, 0), mul(m, T3(-ox, -oy, 0)))

interface Box { l: number; t: number; r: number; b: number }

export const mountKanji: Mount<ProjectData> = (root, { lang, first }, { reduce }) => {
  const ac = new AbortController()
  const { signal } = ac
  const C = COPY[lang]
  let disposed = false

  // The seal is the one the wallet card draws.
  const seal = (motions.kanji.svg.match(/data-seal href="([^"]+)"/) || [])[1] || ''
  root.style.setProperty('--seal', `url("${seal}")`)
  root.classList.toggle('rm', reduce)
  // Unique ids for the inline art, so nothing here can collide with another part of the page.
  const u = (s: string) => s.replace(/\b(id="|url\(#)/g, '$1kj-')

  // ---------- Strokes of 学, sampled once ----------
  type Stroke = { a: Vec[]; L: number; t0: number; t1: number }
  const SP: Stroke[] = (() => {
    const ns = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(ns, 'svg')
    svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.style.position = 'absolute'
    document.body.appendChild(svg)
    const out = STROKES.map((d) => {
      const p = document.createElementNS(ns, 'path'); p.setAttribute('d', d); svg.appendChild(p)
      const L = p.getTotalLength(), n = 44, a: Vec[] = []
      for (let i = 0; i <= n; i++) { const q = p.getPointAtLength(L * i / n); a.push([q.x, q.y]) }
      return { a, L, t0: 0, t1: 0 }
    })
    svg.remove()
    const tot = out.reduce((s, k) => s + k.L + 14, 0)
    let c = 0
    out.forEach((k) => { k.t0 = c / tot; c += k.L + 14; k.t1 = c / tot })
    return out
  })()
  const HW = 3.5
  function ribbon(a: Vec[], upto: number): Vec[] | null {
    const n = a.length - 1, f = upto * n, i = Math.floor(f), pts: Vec[] = []
    for (let j = 0; j <= Math.min(i, n); j++) pts.push(a[j])
    if (i < n && f > i) { const t = f - i; pts.push([a[i][0] + (a[i + 1][0] - a[i][0]) * t, a[i][1] + (a[i + 1][1] - a[i][1]) * t]) }
    if (pts.length < 2) return null
    const L: Vec[] = [], R: Vec[] = []
    for (let j = 0; j < pts.length; j++) {
      const p0 = pts[Math.max(0, j - 1)], p1 = pts[Math.min(pts.length - 1, j + 1)]
      let dx = p1[0] - p0[0], dy = p1[1] - p0[1]
      const m = Math.hypot(dx, dy) || 1
      dx /= m; dy /= m
      L.push([pts[j][0] - dy * HW, pts[j][1] + dx * HW]); R.push([pts[j][0] + dy * HW, pts[j][1] - dx * HW])
    }
    const e = pts[pts.length - 1], q = pts[pts.length - 2]
    let dx = e[0] - q[0], dy = e[1] - q[1]
    const m = Math.hypot(dx, dy) || 1
    dx /= m; dy /= m
    const poly = L.concat([[e[0] + dx * HW * 0.9, e[1] + dy * HW * 0.9]], R.reverse())
    let A = 0
    for (let j = 0; j < poly.length; j++) { const p = poly[j], q2 = poly[(j + 1) % poly.length]; A += p[0] * q2[1] - q2[0] * p[1] }
    if (A < 0) poly.reverse()
    return poly
  }
  function inkPath(g: number, sz: number) {
    const k = sz / 109
    let d = ''
    for (let s = 0; s < SP.length; s++) {
      const tt = cl((g - SP[s].t0) / ((SP[s].t1 - SP[s].t0) * 0.9))
      if (tt <= 0) continue
      const poly = ribbon(SP[s].a, tt)
      if (!poly) continue
      d += 'M' + poly.map((p) => (p[0] * k).toFixed(1) + ' ' + (p[1] * k).toFixed(1)).join('L') + 'Z'
    }
    return d
  }
  function penAt(g: number): Vec {
    let s = 0
    for (let i = 0; i < SP.length; i++) if (g >= SP[i].t0) s = i
    const tt = cl((g - SP[s].t0) / ((SP[s].t1 - SP[s].t0) * 0.9)), a = SP[s].a, n = a.length - 1, f = tt * n, i = Math.min(n - 1, Math.floor(f)), t = f - i
    return [a[i][0] + (a[i + 1][0] - a[i][0]) * t, a[i][1] + (a[i + 1][1] - a[i][1]) * t]
  }

  // ---------- The still life: everything is drawn flat and lies on the washi ----------
  function kj(sx: number, tx: number, ty: number, sw: number, col: string, n: number, ghost?: boolean) {
    return STROKES.slice(0, n).map((d) => `<path d="${d}" transform="translate(${tx} ${ty}) scale(${sx})" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${ghost ? 'opacity=".16"' : ''}/>`).join('')
  }
  function pools(sx: number, tx: number, ty: number, r: number, n: number) {
    return SP.slice(0, n).map((k) => {
      const e = k.a[k.a.length - 1], s = k.a[0]
      return `<circle cx="${(tx + e[0] * sx).toFixed(1)}" cy="${(ty + e[1] * sx).toFixed(1)}" r="${r}" fill="#120e0b" opacity=".9"/><circle cx="${(tx + s[0] * sx).toFixed(1)}" cy="${(ty + s[1] * sx).toFixed(1)}" r="${(r * 0.78).toFixed(1)}" fill="#120e0b" opacity=".8"/>`
    }).join('')
  }
  function cell(x: number, y: number, n: number, corr: boolean) {
    const S1 = 1.3, tx = x + 9, ty = y + 9
    return `<rect x="${x}" y="${y}" width="160" height="160" fill="#FFFDF8" stroke="#D9AFA6" stroke-width="1.3"/>
  <path d="M${x + 80} ${y + 6}V${y + 154}M${x + 6} ${y + 80}H${x + 154}" stroke="#D9A59C" stroke-width="1" stroke-dasharray="5 5"/>
  ${n < 8 ? kj(S1, tx, ty, 3.6, '#7d7468', 8, true) : ''}${kj(S1, tx, ty, 4.7, '#1a1612', n)}${pools(S1, tx, ty, 2.7, n)}
  ${corr ? `<path d="${STROKES[4]}" transform="translate(${tx + 2.4} ${ty + 4.2}) scale(${S1})" fill="none" stroke="#B5483C" stroke-width="3.3" stroke-linecap="round" opacity=".85"/>
  <path d="M${x + 118} ${y + 22}c18-12 38 6 28 24c-9 17-37 16-44-1c-4-9 2-17 12-21" fill="none" stroke="#B5483C" stroke-width="2.4" stroke-linecap="round" transform="rotate(-8 ${x + 124} ${y + 34})"/>` : ''}`
  }
  const ART: Record<string, (i?: number) => string> = {
    sheet: () => u(`<svg viewBox="0 0 520 700" width="520" height="700"><defs><pattern id="shp" width="260" height="260" patternUnits="userSpaceOnUse"><image href="${washi}" width="260" height="260"/></pattern><filter id="shd" x="-8%" y="-8%" width="116%" height="116%"><feDropShadow dx="2" dy="6" stdDeviation="7" flood-color="#46301a" flood-opacity=".38"/><feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#46301a" flood-opacity=".4"/></filter></defs>
  <g filter="url(#shd)"><rect width="520" height="700" rx="3" fill="#FBF8F0"/><rect width="520" height="700" rx="3" fill="url(#shp)" opacity=".55"/></g>
  <g stroke="#C9B9A2" stroke-opacity=".5" stroke-width="1">${Array.from({ length: 9 }, (_, i) => `<path d="M30 ${70 + i * 70}H250"/>`).join('')}</g>
  ${cell(344, 56, 8, false)}${cell(344, 250, 8, true)}${cell(344, 444, 5, false)}
  <path d="M322 120l9 12 17-24" fill="none" stroke="#B5483C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/></svg>`),
    brush: () => u(`<svg viewBox="0 0 380 150" width="380" height="150"><defs><linearGradient id="br1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EDF2EE"/><stop offset=".6" stop-color="#C6D4CC"/><stop offset="1" stop-color="#9DB1A8"/></linearGradient><linearGradient id="br2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9AC6B"/><stop offset=".5" stop-color="#A9783A"/><stop offset="1" stop-color="#6e4a20"/></linearGradient><linearGradient id="br3" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a3a2c"/><stop offset=".7" stop-color="#17110c"/><stop offset="1" stop-color="#050403"/></linearGradient><radialGradient id="br4" cx=".3" cy=".25" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><filter id="brd" x="-10%" y="-20%" width="120%" height="170%"><feDropShadow dx="2" dy="6" stdDeviation="5" flood-color="#3c2a12" flood-opacity=".45"/></filter></defs>
  <g filter="url(#brd)"><rect x="96" y="70" width="156" height="58" rx="29" fill="url(#br1)"/><rect x="96.5" y="70.5" width="155" height="57" rx="28.5" fill="none" stroke="#fff" stroke-opacity=".6"/><ellipse cx="140" cy="86" rx="34" ry="11" fill="url(#br4)" opacity=".85"/><path d="M118 112c20 8 60 8 98 0" stroke="#7f968b" stroke-opacity=".5" stroke-width="2" fill="none" stroke-linecap="round"/></g>
  <g transform="rotate(-14 190 80)" filter="url(#brd)"><rect x="14" y="68" width="236" height="13" rx="6.5" fill="url(#br2)"/><path d="M92 68v13M160 68v13" stroke="#5a3a18" stroke-width="1.6" opacity=".7"/><path d="M20 71H246" stroke="#fff" stroke-opacity=".35" stroke-width="1.4"/><rect x="248" y="66" width="22" height="17" rx="4" fill="#2a2018"/><rect x="250" y="67" width="3" height="15" fill="#C9A24F" opacity=".8"/><path d="M270 66C298 63 330 69 362 75C330 80 298 84 270 83Z" fill="url(#br3)"/><path d="M276 69C300 67 326 71 350 75" stroke="#fff" stroke-opacity=".28" stroke-width="1.2" fill="none"/></g></svg>`),
    petal: (i = 0) => u(`<svg viewBox="-16 -16 32 40" width="32" height="40"><defs><linearGradient id="pt${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBD3DD"/><stop offset="1" stop-color="#F0A0B6"/></linearGradient><filter id="ptd${i}" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="1" dy="2.4" stdDeviation="1.6" flood-color="#46301a" flood-opacity=".4"/></filter></defs><g filter="url(#ptd${i})"><path d="M0 -4C-4 -13-14 -11-12 -1C-10 9-3 15 0 21C3 15 10 9 12 -1C14 -11 4 -13 0 -4Z" fill="url(#pt${i})"/><path d="M0 -3C-2 4 -1 11 0 18" stroke="#E27D98" stroke-opacity=".55" stroke-width=".8" fill="none"/><path d="M-5 -7C-8 -2-6 6-3 11" stroke="#fff" stroke-opacity=".5" stroke-width=".9" fill="none"/></g></svg>`),
  }
  // Placement in desk units (1 = a 337px phone), relative to the phone centre; y runs toward the viewer.
  type Item = [string, number, number, number, number]
  function deskItems(m: boolean, vw: number): Item[] {
    if (!m && vw < 1200) return [['sheet', 120, 12, -6, .74], ['brush', 50, 445, -8, .8], ['petal0', -250, -130, 40, 1], ['petal1', 260, -330, -30, .9], ['petal2', -150, 500, 130, .9], ['petal4', 170, -300, -20, .8]]
    return m ? [
      ['sheet', 8, -10, -6, .64], ['brush', 80, 330, -8, .56],
      ['petal0', -210, -190, 40, .8], ['petal1', 215, -150, -30, .75], ['petal2', -20, 340, 120, .7],
    ] : [
      ['sheet', 128, 12, -6, .92], ['brush', 60, 415, -8, .88],
      ['petal0', -250, -130, 40, 1.1], ['petal1', 330, -330, -30, 1], ['petal2', -150, 450, 130, 1], ['petal3', 380, 190, 70, .9], ['petal4', 215, -300, -20, .9],
    ]
  }
  const LAYS = [{ y0: 62, y1: 198, z: 17, x: -7 }, { y0: 250, y1: 414, z: 32, x: 6 }, { y0: 560, y1: 706, z: 46, x: -5 }]
  const TAPS = [{ x: 202, y: 441, a: .075, b: .108 }, { x: 195, y: 802, a: .29, b: .318 }, { x: 195, y: 798, a: .626, b: .656 }, { x: 195, y: 299, a: .68, b: .708 }]
  const SCR: ([number, number, string] | null)[] = [null, [.045, .07, 'fade'], [.098, .125, 'push'], [.283, .291, 'fade'], [.315, .34, 'push'], [.522, .548, 'fade'], [.568, .594, 'push'], [.652, .676, 'push'], [.704, .72, 'fade']]
  const CSTART = [.725, .745, .765, .785, .805]
  const K = .23897 // cqw of the rig per app pixel
  const CH = 118 / 86.8

  // ---------- Markup ----------
  const platIcon = {
    web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  }
  root.innerHTML = `<div class="track"><div class="stage">
  <div class="world"><div class="pa mat"></div></div>
  <div class="intro"><p class="pname">Kanji Study App</p><h1>${C.head}<span class="hanko"></span></h1><p class="pmeta"><span>${C.note}, ${C.price.toLowerCase()}</span><span class="plat"><svg viewBox="0 0 24 24" aria-hidden="true">${platIcon.web}</svg><span>Web</span></span><span class="plat"><svg viewBox="0 0 24 24" aria-hidden="true">${platIcon.phone}</svg><span>${C.phone}</span></span></p><a class="kbtn" href="${REPO}" target="_blank" rel="noopener">${C.cta}</a></div>
  <div class="end"><h2>${C.price}</h2><p>${C.plat}</p><a class="kbtn" href="${REPO}" target="_blank" rel="noopener">${C.cta}</a></div>
  <div class="scene"><div class="desk"><div class="objs"></div><div class="rig">
    <div class="under"></div>
    <div style="display:contents">${Array.from({ length: 2 }, (_, i) => `<i class="slab" style="transform:translateZ(${-(i + 1) * 1.8}cqw)"></i>`).join('')}</div>
    <div class="body"></div>
    <div class="screen">
      <div class="scr"><img src="${writeDone}" alt=""></div>
      <div class="scr"><img src="${indice}" alt=""></div>
      <div class="scr"><img src="${lessonTop}" alt=""><i class="dim"></i></div>
      <div class="scr"><img src="${lessonScrolled}" alt=""></div>
      <div class="scr"><img src="${writeBlank}" alt=""><div class="ink"><img src="${ink}" alt=""></div></div>
      <div class="scr"><img src="${writeDone}" alt=""></div>
      <div class="scr"><img src="${setup}" alt=""></div>
      <div class="scr"><img src="${q0}" alt=""></div>
      <div class="scr"><img src="${q0ok}" alt=""></div>
      <i class="shade"></i>
      ${[0, 1, 2, 3].map(() => '<i class="tap"><b></b></i>').join('')}<i class="pen"></i>
    </div>
    <i class="sheen"></i>
    <div style="display:contents">${LAYS.map((l) => `<div class="lay" style="top:calc(3.4cqw + ${(l.y0 * K).toFixed(2)}cqw);height:${((l.y1 - l.y0) * K).toFixed(2)}cqw"><span class="clip"><img src="${lessonTop}" alt="" style="top:${(-l.y0 * K).toFixed(2)}cqw"></span></div>`).join('')}</div>
    <div style="display:contents">${CARDS.map(([a, b]) => `<div class="card3d"><div class="face front"><img src="${a}" alt=""><img class="ok" src="${b}" alt=""></div><div class="face back"><i></i></div></div>`).join('')}</div>
  </div></div></div>
  <div class="labs"></div>
</div></div>
<section class="rmcta"><div class="in"><h2>${C.price}</h2><p>${C.plat}</p><a class="kbtn" href="${REPO}" target="_blank" rel="noopener">${C.cta}</a></div></section>`

  const $ = <E extends Element>(sel: string) => root.querySelector(sel) as E
  const $$ = <E extends Element>(sel: string) => [...root.querySelectorAll<E>(sel)]
  const track = $<HTMLElement>('.track'), stage = $<HTMLElement>('.stage'), intro = $<HTMLElement>('.intro'), end = $<HTMLElement>('.end')
  const rig = $<HTMLElement>('.rig'), desk = $<HTMLElement>('.desk'), objs = $<HTMLElement>('.objs'), under = $<HTMLElement>('.under')
  const dim = $<HTMLElement>('.dim'), inkEl = $<HTMLElement>('.ink'), pen = $<HTMLElement>('.pen')
  const screens = $$<HTMLElement>('.scr'), lays = $$<HTMLElement>('.lay'), cards = $$<HTMLElement>('.card3d')
  const taps = $$<HTMLElement>('.tap'), tapRings = taps.map((t) => t.firstElementChild as HTMLElement)
  const faces = cards.map((c) => ({ front: c.children[0] as HTMLElement, back: c.children[1] as HTMLElement, ok: c.querySelector('.ok') as HTMLElement }))
  const hanko = $<HTMLElement>('.hanko')
  const labsEl = $<HTMLElement>('.labs')

  const LABELS = [['lessons', 'phone', 441 / 844], ['read', 'lay0', .5], ['phr', 'lay1', .5], ['write', 'phone', 300 / 844], ['six', 'phone', 480 / 844]] as const
  type Label = { k: string; ref: string; fy: number; txt: string; cap: boolean; el: HTMLElement; w: number; h: number }
  const labs: Label[] = [
    ...LABELS.map(([k, ref, fy]) => ({ k, ref: ref as string, fy: fy as number, txt: C.t[k], cap: false })),
    ...MODES.map((t, i) => ({ k: 'cap' + i, ref: 'card' + i, fy: 0, txt: t, cap: true })),
  ].map((l) => ({ ...l, el: null as unknown as HTMLElement, w: 0, h: 0 }))
  labsEl.innerHTML = labs.map((l) => `<span class="lab${l.cap ? ' cap' : ''}">${l.txt}</span>`).join('')
  $$<HTMLElement>('.lab').forEach((el, i) => { labs[i].el = el })

  // ---------- Writes that skip what did not change ----------
  const last = new WeakMap<Element, Record<string, string>>()
  function put(el: HTMLElement, key: 'transform' | 'opacity' | 'visibility' | 'clipPath', v: string) {
    let m = last.get(el)
    if (!m) { m = {}; last.set(el, m) }
    if (m[key] === v) return
    m[key] = v
    el.style[key] = v
  }

  // ---------- Layout: read once on load and on resize ----------
  interface World {
    sw: number; vw: number; vh: number; m: boolean; du: number; ink: number; top: number; span: number; hold: number
    rx0: number; ry0: number; rh: number
    mh: { hf: number }; dD: { x: number; y: number; a: number; rz: number }; me: { hf: number; cy: number }
    fan: Fan
    items: Item[]; obs: HTMLElement[]; fade: HTMLElement[]
  }
  interface Fan { hf: number; cy: number; s: number; sc: number; cs: number; cards: { x: number; y: number; z: number; ry: number; rz: number }[] }
  const W = {} as World
  let KEYS: number[][] = []

  function fanLayout(): Fan {
    const { vw, vh, sw, m } = W
    if (!m) {
      const hf = .74, cy = .53, s = hf / .78, sc = sw * s / 100, natW = 86.8 * sc, half = sw * s / 2
      const avail = vw / 2 - 40 - half, gi = 30, go = 18
      let cw = Math.min(natW, (avail - gi - go) / 2)
      cw = Math.min(cw, ((vh - 72 - 24 - 34 - 24) / 2) / CH)
      const ch = cw * CH, xi = half + gi + cw / 2, xo = half + gi + cw + go + cw / 2, dv = ch / 2 + 17
      return { hf, cy, s, sc, cs: cw / natW, cards: [
        { x: -xi, y: 0, z: 8, ry: 20, rz: -1.5 }, { x: -xo, y: 0, z: -6, ry: 32, rz: 1.5 }, { x: xi, y: 0, z: 8, ry: -20, rz: 1.5 }, { x: xo, y: -dv, z: -6, ry: -32, rz: -1.5 }, { x: xo, y: dv, z: -6, ry: -32, rz: 1.5 }] }
    }
    const gap = 8
    const cw = Math.min((vw - 48 - 2 * gap) / 3, (.165 * vh) / CH), ch = cw * CH
    const top = 86, row2 = top + ch + 34, capBottom = row2 + ch + 22
    let hf = ((vh - 24) - (capBottom + 18)) / vh
    hf = Math.min(hf, .5)
    const cy = (vh - 24) / vh - hf / 2, s = hf / .78, sc = sw * s / 100, natW = 86.8 * sc
    const pcy = cy * vh, yc1 = top + ch / 2 - pcy, yc2 = row2 + ch / 2 - pcy
    return { hf, cy, s, sc, cs: cw / natW, cards: [
      { x: -(cw + gap), y: yc1, z: 0, ry: 12, rz: -1 }, { x: 0, y: yc1, z: 0, ry: 0, rz: 0 }, { x: cw + gap, y: yc1, z: 0, ry: -12, rz: 1 },
      { x: -(cw / 2 + gap / 2), y: yc2, z: 0, ry: 10, rz: -1 }, { x: cw / 2 + gap / 2, y: yc2, z: 0, ry: -10, rz: 1 }] }
  }

  // Camera keys: p, dx (fraction of width), cy (phone centre as a fraction of height), rx, ry, rz, hf (phone height as a fraction of height).
  function buildKeys() {
    const { vh, m } = W, f = W.fan
    if (!m) {
      KEYS = [
        [0, 0, .5, 0, 0, 0, .80], [.045, 0, .5, 0, 0, 0, .80], [.095, .15, .53, 0, -2, 0, .78],
        [.17, .10, .52, 5, -26, 0, .74], [.27, .10, .52, 4, -28, 0, .74],
        [.315, .07, .52, 0, -3, 0, .80], [.365, .06, .52, 0, 0, 0, .84], [.52, .06, .52, 0, 0, 0, .84],
        [.56, .04, .525, 0, 22, 0, .80], [.60, .02, .53, 0, 0, 0, .87], [.705, 0, .53, 0, 0, 0, .87],
        [.74, 0, f.cy, 0, 0, 0, f.hf], [.83, 0, f.cy, 0, 3, 0, f.hf], [.905, 0, f.cy, 0, 0, 0, f.hf],
        [.945, .17, .53, 3, -10, 0, .80], [1, .208, .53, 3, -10, 0, .80]]
    } else {
      const hl = Math.min(.72, 2 * (.55 * vh - 130) / vh), hd = Math.min(.8, 2 * (.54 * vh - 130) / vh)
      KEYS = [
        [0, 0, .5, 0, 0, 0, W.mh.hf], [.065, 0, .5, 0, 0, 0, W.mh.hf], [.105, 0, .55, 0, -2, 0, hl],
        [.17, 0, .55, 4, -14, 0, Math.min(.68, hl)], [.27, 0, .55, 4, -16, 0, Math.min(.68, hl)],
        [.315, 0, .55, 0, -2, 0, hl], [.365, 0, .55, 0, 0, 0, hl], [.52, 0, .55, 0, 0, 0, hl],
        [.56, 0, .55, 0, 18, 0, Math.min(.70, hl)], [.60, 0, .54, 0, 0, 0, hd], [.705, 0, .54, 0, 0, 0, hd],
        [.74, 0, f.cy, 0, 0, 0, f.hf], [.83, 0, f.cy, 0, 0, 0, f.hf], [.905, 0, f.cy, 0, 0, 0, f.hf],
        [.945, 0, W.me.cy, 0, -6, 0, W.me.hf], [1, 0, W.me.cy, 0, -8, 0, W.me.hf]]
    }
  }

  function pose(p: number) {
    const n = KEYS.length
    let i = 0
    while (i < n - 2 && p > KEYS[i + 1][0]) i++
    const a = KEYS[i], b = KEYS[i + 1], h = b[0] - a[0], t = cl((p - a[0]) / h), out: number[] = []
    for (let c = 1; c < 7; c++) {
      const d = (b[c] - a[c]) / h
      const dPrev = i > 0 ? (a[c] - KEYS[i - 1][c]) / (a[0] - KEYS[i - 1][0]) : d
      const dNext = i < n - 2 ? (KEYS[i + 2][c] - b[c]) / (KEYS[i + 2][0] - b[0]) : d
      const m0 = dPrev * d <= 0 ? 0 : (dPrev + d) / 2, m1 = d * dNext <= 0 ? 0 : (d + dNext) / 2
      const t2 = t * t, t3 = t2 * t
      out.push((2 * t3 - 3 * t2 + 1) * a[c] + (t3 - 2 * t2 + t) * h * m0 + (-2 * t3 + 3 * t2) * b[c] + (t3 - t2) * h * m1)
    }
    return out
  }

  function buildObjects() {
    W.items = deskItems(W.m, innerWidth)
    objs.innerHTML = '<i class="glow"></i>' + W.items.map((it) => {
      const k = it[0]
      return `<div class="ob">${k.startsWith('petal') ? ART.petal(+k.slice(5)) : ART[k]()}</div>`
    }).join('')
    W.obs = [...objs.querySelectorAll<HTMLElement>('.ob')]
    W.fade = [...objs.children] as HTMLElement[]
  }
  function placeObjects() {
    const du = W.du
    W.obs.forEach((el, i) => {
      const [k, x, y, r, sc] = W.items[i], z = k === 'sheet' ? -15 : k.startsWith('petal') ? -9 : -11
      el.style.transform = `translate3d(${(x * du).toFixed(1)}px,${(y * du).toFixed(1)}px,${(z * du).toFixed(1)}px) translate(-50%,-50%) rotate(${r}deg) scale(${(du * sc).toFixed(4)})`
    })
  }

  let builtFor = ''
  function layout() {
    const vh = innerHeight, vw = innerWidth, m = vw <= 760
    const sw = Math.min(vh * .374, vw - 48)
    root.style.setProperty('--sw', sw + 'px')
    stage.style.height = vh + 'px'
    track.style.height = (vh * (m ? 13 : 12.7)) + 'px'
    Object.assign(W, { sw, vw, vh, m, ink: inkEl.offsetWidth, top: track.getBoundingClientRect().top + scrollY, span: track.offsetHeight - vh, hold: m ? vh * .55 : vh * .7 })
    W.rx0 = vw / 2 - sw / 2; W.rh = sw * 2.085; W.ry0 = vh / 2 - W.rh / 2
    // Mobile hero and end poses: the phone sits clear of the text.
    const ib = intro.offsetTop + intro.offsetHeight, et = end.offsetTop
    if (m) {
      // The phone takes at least half of the window height; the text above it is compact, so the turn stays gentle.
      const a = 34, area = vh - 24 - (ib + 10)
      const hfM = Math.max(.3, Math.min(.66, area / (vh * Math.cos(a * Math.PI / 180) * 1.12)))
      W.mh = { hf: hfM }; W.dD = { x: 0, y: (ib + 10 + area * .5) - vh / 2, a, rz: -4 }
    } else {
      W.mh = { hf: .8 }
      const du0 = (sw * .8 / .78) / 337
      W.dD = { x: Math.min(.135 * vw, vw - 24 - (vw < 1200 ? 340 : 480) * du0 - vw / 2), y: .02 * vh, a: 54, rz: -7 }
    }
    W.du = (sw * W.mh.hf / .78) / 337
    root.style.setProperty('--du', W.du.toFixed(4) + 'px')
    const meh = Math.max(.3, Math.min(.5, (et - 22 - 96) / vh))
    W.me = { hf: meh, cy: (96 + meh * vh / 2) / vh }
    W.fan = fanLayout()
    buildKeys()
    const key = m + ':' + (vw < 1200)
    if (builtFor !== key) { buildObjects(); builtFor = key }
    placeObjects()
    labs.forEach((l) => { l.w = l.el.offsetWidth; l.h = l.el.offsetHeight })
  }

  // ---------- Projection: where things land on screen, from the same transforms the 3D scene applies ----------
  const PERSP = 2800
  function project(M: Mat, x0: number, y0: number, x1: number, y1: number): Box {
    const ox = W.vw / 2, oy = W.vh * .42
    let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity
    for (const [x, y] of [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]) {
      const X = M[0] * x + M[1] * y + M[3], Y = M[4] * x + M[5] * y + M[7], Z = M[8] * x + M[9] * y + M[11]
      const s = PERSP / (PERSP - Z)
      const px = ox + (X - ox) * s, py = oy + (Y - oy) * s
      if (px < l) l = px; if (px > r) r = px; if (py < t) t = py; if (py > b) b = py
    }
    return { l, t, r, b }
  }

  // ---------- The frame ----------
  function render(p: number) {
    const { sw, vw, vh, m } = W, F = W.fan, cw = sw / 100
    const ps = pose(p)
    const dx = m ? 0 : ps[0] * vw, dy = (ps[1] - .5) * vh, sc = ps[5] / .78
    put(rig, 'transform', `translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0) rotateX(${ps[2].toFixed(3)}deg) rotateY(${ps[3].toFixed(3)}deg) rotateZ(${ps[4].toFixed(3)}deg) scale(${sc.toFixed(4)})`)
    put(under, 'opacity', (.55 + .4 * (1 - S(p, .7, .9))).toFixed(3))
    put(under, 'transform', `translateZ(${(-3.75 - 40.25 * S(p, .02, .12)).toFixed(2)}cqw)`)
    const lf = EIO(S(p, .012, .1)), h = 1 - lf, D = W.dD
    put(desk, 'transform', `translate3d(${(D.x * h).toFixed(1)}px,${(D.y * h).toFixed(1)}px,0) rotateX(${(D.a * h).toFixed(2)}deg) rotateZ(${(D.rz * h).toFixed(2)}deg)`)
    const oo = 1 - S(p, .012, .045)
    // Fade each leaf, never the 3D container: opacity on a preserve-3d parent flattens the whole scene into one surface each frame.
    for (const el of W.fade) { put(el, 'opacity', oo.toFixed(3)); put(el, 'visibility', oo <= .002 ? 'hidden' : 'visible') }
    // Copy.
    const io = S(p, .014, .04)
    put(intro, 'opacity', (1 - io).toFixed(3)); put(intro, 'visibility', io >= 1 ? 'hidden' : 'visible')
    const eo = S(p, .95, .985)
    put(end, 'opacity', eo.toFixed(3)); put(end, 'visibility', eo > 0 ? 'visible' : 'hidden'); put(end, 'transform', `translate3d(0,${((1 - EO(eo)) * 16).toFixed(2)}px,0)`)
    // Screens: one at a time, the old one leaves first.
    const sop = SCR.map((w) => { if (!w) return { in: 1, out: 1, e: 1, push: false }; const e = S(p, w[0], w[1]); return { in: EO(S(e, .35, 1)), out: 1 - S(e, 0, .6), e, push: w[2] === 'push' } })
    screens.forEach((el, i) => {
      const a = i === 0 ? 1 : sop[i].in, b = i < SCR.length - 1 ? sop[i + 1].out : 1, o = a * b
      put(el, 'opacity', o.toFixed(3)); put(el, 'visibility', o <= .002 ? 'hidden' : 'visible')
      put(el, 'transform', i > 0 && sop[i].push ? `translate3d(${((1 - EO(sop[i].e)) * 7).toFixed(2)}%,0,0)` : 'none')
    })
    // Lesson: pieces lift off the real screen and settle back before the page scrolls.
    const lift = EIO(S(p, .14, .205)) * (1 - EIO(S(p, .232, .272)))
    put(dim, 'opacity', (lift * .62).toFixed(3))
    const lk: number[] = [], lm = m ? .45 : 1, layT: [number, number, number][] = []
    lays.forEach((el, i) => {
      const L = LAYS[i], k = EO(S(p, .14 + i * .012, .2 + i * .012)) * (1 - EIO(S(p, .232 + i * .006, .272 + i * .006)))
      lk.push(k)
      const tx = L.x * k * lm, ty = (i === 0 ? -3 : i === 1 ? 0 : 3) * k * lm, tz = L.z * k * lm
      layT.push([tx, ty, tz])
      put(el, 'visibility', k > .002 ? 'visible' : 'hidden'); put(el, 'opacity', k > 0 ? '1' : '0')
      put(el, 'transform', `translate3d(${tx.toFixed(2)}cqw,${ty.toFixed(2)}cqw,${tz.toFixed(2)}cqw)`)
    })
    // Taps.
    TAPS.forEach((t, i) => {
      const e = taps[i], o = S(p, t.a, t.a + .012) - S(p, t.b - .004, t.b + .006), mid = (t.a + t.b) / 2
      const press = 1 - .18 * (S(p, mid - .006, mid) - S(p, mid, mid + .008)), rise = (1 - EO(S(p, t.a, t.a + .02))) * 20
      put(e, 'opacity', o.toFixed(3)); put(e, 'transform', `translate3d(${(t.x * (100 / 390)).toFixed(2)}cqw,${((t.y + rise) * (100 / 390)).toFixed(2)}cqw,0) scale(${press.toFixed(3)})`)
      const rp = S(p, mid, t.b + .002), ring = tapRings[i]
      put(ring, 'opacity', (rp > 0 && rp < 1 ? (1 - rp) * .9 : 0).toFixed(3)); put(ring, 'transform', `scale(${(.6 + rp * 1.1).toFixed(3)})`)
    })
    // Writing 学: the ink is the app's own canvas, uncovered along the real stroke path.
    const g = S(p, .345, .51)
    put(inkEl, 'clipPath', g <= 0 ? 'inset(100%)' : g >= 1 ? 'inset(0)' : `path('${inkPath(g, W.ink)}')`)
    const pn = g > 0 && g < 1
    if (pn) { const q = penAt(g); put(pen, 'transform', `translate3d(${(6.667 + q[0] / 109 * 86.67).toFixed(2)}cqw,${(69.9 + q[1] / 109 * 86.67).toFixed(2)}cqw,0)`) }
    put(pen, 'opacity', (pn ? S(g, 0, .02) * (1 - S(g, .975, 1)) : 0).toFixed(3))
    // Quiz cards flip out of the phone, get answered, and return.
    const csc = F.sc, ci: number[] = [], cardT: Mat[] = []
    cards.forEach((el, i) => {
      const c = F.cards[i], kout = S(p, CSTART[i], CSTART[i] + .07), back = 1 - EIO(S(p, .85 + i * .004, .895 + i * .004)), k = BACK(kout) * back, fk = EIO(kout) * back
      const X = c.x / csc, Y = c.y / csc
      const tx = (X + 3.2) * k, ty = (Y + 26.95) * k, z = 2.2 + (c.z - 2.2) * k, ry = 180 * (1 - fk) + c.ry * fk, rz = c.rz * k, scl = 1 + (F.cs - 1) * k
      const op = S(kout, 0, .06) * (1 - S(p, .892 + i * .004, .902 + i * .004))
      put(el, 'opacity', op.toFixed(3)); put(el, 'visibility', op > 0 ? 'visible' : 'hidden')
      el.dataset.k = k.toFixed(3)
      put(el, 'transform', `translate3d(${tx.toFixed(2)}cqw,${ty.toFixed(2)}cqw,${z.toFixed(2)}cqw) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg) scale(${scl.toFixed(4)})`)
      const showBack = ry > 90
      put(faces[i].front, 'visibility', showBack ? 'hidden' : 'visible'); put(faces[i].back, 'visibility', showBack ? 'visible' : 'hidden')
      put(faces[i].ok, 'opacity', S(p, .80 + i * .016, .80 + i * .016 + .018).toFixed(3))
      ci.push(ry > 90 ? 0 : S(kout, .75, 1) * (1 - S(p, .85, .865)))
      cardT.push(mul(T3(tx * cw, ty * cw, z * cw), mul(RY(ry), mul(RZ(rz), SC(scl)))))
    })
    // Labels: placed from where things really are on screen, worked out with the scene's own transforms (no reads).
    const want = labs.map((l) => {
      let o = 0
      if (l.k === 'lessons') o = EO(S(p, .085, .105)) * (1 - S(p, .125, .135))
      else if (l.k === 'read') o = S(lk[0], .55, 1) * (m ? 1 - S(p, .175, .19) : 1)
      else if (l.k === 'phr') o = S(lk[1], .55, 1) * (m ? S(p, .195, .21) : 1)
      else if (l.k === 'write') o = EO(S(p, .335, .355)) * (1 - S(p, .515, .525))
      else if (l.k === 'six') o = EO(S(p, .575, .595)) * (1 - S(p, .69, .70))
      else o = ci[+l.k.slice(3)]
      return o
    })
    if (want.some((o) => o > .01)) {
      const dcx = vw / 2, dcy = vh / 2
      const Md = about(dcx, dcy, mul(T3(D.x * h, D.y * h, 0), mul(RX(D.a * h), RZ(D.rz * h))))
      const Mr = about(dcx, dcy, mul(T3(dx, dy, 0), mul(RX(ps[2]), mul(RY(ps[3]), mul(RZ(ps[4]), SC(sc))))))
      const Mrig = mul(Md, Mr)
      const { rx0, ry0, rh } = W
      const pr = project(Mrig, rx0, ry0, rx0 + sw, ry0 + rh)
      const layBox = (i: number): Box => {
        const x0 = rx0 + 3.4 * cw, y0 = ry0 + (3.4 + LAYS[i].y0 * K) * cw, wd = 93.2 * cw, ht = (LAYS[i].y1 - LAYS[i].y0) * K * cw
        const [tx, ty, tz] = layT[i]
        return project(mul(Mrig, about(x0 + wd / 2, y0 + ht / 2, T3(tx * cw, ty * cw, tz * cw))), x0, y0, x0 + wd, y0 + ht)
      }
      const cardBox = (i: number): Box => {
        const x0 = rx0 + 3.4 * cw, y0 = ry0 + (3.4 + 14.9) * cw, wd = 86.8 * cw, ht = 118 * cw
        return project(mul(Mrig, about(x0 + wd / 2, y0 + ht / 2, cardT[i])), x0, y0, x0 + wd, y0 + ht)
      }
      labs.forEach((l, i) => {
        const o = want[i]
        put(l.el, 'opacity', o.toFixed(3))
        if (o <= .01) return
        let x: number, y: number
        const rise = (1 - cl(o)) * 6
        if (l.ref.startsWith('card')) { const r = cardBox(+l.ref.slice(4)); x = (r.l + r.r) / 2 - l.w / 2; y = r.b + 8 }
        else {
          const r = l.ref === 'phone' ? pr : l.ref === 'lay0' ? layBox(0) : layBox(1)
          const left = Math.min(r.l, pr.l)
          if (!m && left - 28 - l.w >= 24) {
            x = left - 28 - l.w
            y = l.ref !== 'phone' ? (r.t + r.b) / 2 - l.h / 2 : r.t + (r.b - r.t) * l.fy - l.h / 2
          } else { x = vw / 2 - l.w / 2; y = pr.t - 34 - l.h }
        }
        put(l.el, 'transform', `translate3d(${x.toFixed(1)}px,${(y + rise).toFixed(1)}px,0)`)
      })
    } else labs.forEach((l) => put(l.el, 'opacity', '0'))
  }

  // ---------- One rAF, one damped scroll value ----------
  let target = 0, cur = 0, raf = 0, prev = 0
  const targetP = () => cl(scrollY - W.top, 0, W.span - W.hold) / (W.span - W.hold)
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
    target = targetP()
    if (raf || disposed) return
    root.classList.add('moving')
    prev = performance.now()
    raf = requestAnimationFrame(tick)
  }

  // Decode every capture now, off the main thread, so the first time a screen or card appears costs no frame.
  $$<HTMLImageElement>('img').forEach((img) => { img.decoding = 'async'; void img.decode().catch(() => {}) })

  layout()
  if (reduce) render(.82)
  else { target = cur = targetP(); render(cur) }

  // Resize: a new width or a real height change rebuilds the cached layout. The small height changes of a phone's address bar do not.
  let sizeW = innerWidth, sizeH = innerHeight, sizeRaf = 0
  addEventListener('resize', () => {
    if (sizeRaf) return
    sizeRaf = requestAnimationFrame(() => {
      sizeRaf = 0
      if (innerWidth === sizeW && Math.abs(innerHeight - sizeH) < 140) return
      sizeW = innerWidth; sizeH = innerHeight
      layout()
      if (reduce) render(.82); else { target = targetP(); cur = target; render(cur) }
    })
  }, { signal })
  if (!reduce) addEventListener('scroll', wake, { passive: true, signal })
  document.fonts.ready.then(() => { if (disposed) return; layout(); if (reduce) render(.82); else { target = cur = targetP(); render(cur) } })

  // ---------- Entrance ----------
  const stamp = () => {
    if (reduce || disposed) return
    hanko.animate([{ transform: 'rotate(-10deg) scale(1.45)', opacity: 0 }, { transform: 'rotate(-4deg) scale(1)', opacity: 1 }], { duration: 340, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' })
  }
  const flight = first && !reduce ? takeFlight('kanji') : null
  if (reduce && first) { const f = takeFlight('kanji'); if (f) cancelFlight(f) }
  let stampT = 0
  if (flight) {
    // The card's washi grows into this page; the stage appears over it and the seal lands last.
    stage.style.opacity = '0'
    playFlight(flight, { sheetClass: 'kj-mat', stage, onLanded: stamp, signal })
  } else if (first && !reduce) {
    stage.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 480, easing: 'ease' })
    intro.animate([{ translate: '0 12px' }, { translate: '0 0' }], { duration: 640, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' })
    stampT = window.setTimeout(stamp, 450)
  }

  return () => {
    disposed = true
    ac.abort()
    cancelAnimationFrame(raf); cancelAnimationFrame(sizeRaf); clearTimeout(stampT)
    root.getAnimations({ subtree: true }).forEach((a) => a.cancel())
    root.classList.remove('rm', 'moving')
    root.style.removeProperty('--sw'); root.style.removeProperty('--du'); root.style.removeProperty('--seal')
    root.replaceChildren()
  }
}
