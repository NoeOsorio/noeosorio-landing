import type { Mount } from '../../home/useMount'
import type { ProjectData } from '../types'
import { takeFlight, playFlight, cancelFlight } from '../cardFlight'
import { COPY, FILES } from './data'
import type { Beat, FileSpec } from './data'
import './telar.css'
import dChoice from './assets/d-choice.webp'
import dLater from './assets/d-later.webp'
import dMem from './assets/d-mem.webp'
import dPhone from './assets/d-phone.webp'
import mChoice from './assets/m-choice.webp'
import mLater from './assets/m-later.webp'
import mPhone from './assets/m-phone.webp'

// The scroll story of Telar: the name sewn in cross-stitch on a loom, the world file that threads into the game, the real excerpts and
// captures that answer each other, and the 32-week strip where a remembered decision returns. One rAF drives one damped scroll value and
// stops when it settles (it keeps running only while the hero is on screen, for the needle and the glint). Layout is read on load and on
// resize; the frame loop only writes transform, opacity, visibility, clip-path and stroke-dashoffset.

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
const EIO = bez(0.77, 0, 0.175, 1), EO = bez(0.23, 1, 0.32, 1)

function rng(seed: number) { let s = seed; return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 } }

const STRIP_Y = 84, STRIP_H = 64, TAG_Y = STRIP_Y + STRIP_H + 26, REG_T = TAG_Y + 26 + 26, SIDE = 24, GAP = 56

// ---------- Story timeline (scroll p) ----------
type Kind = 'sheet' | 'shot'
const ORDER: [Beat, Kind, 'L' | 'R'][] = [['ink', 'sheet', 'L'], ['choice', 'shot', 'R'], ['rule', 'sheet', 'L'], ['phone', 'shot', 'R'], ['yml2', 'sheet', 'L'], ['later', 'shot', 'R'], ['mem', 'shot', 'L'], ['term', 'sheet', 'R']]
// [in start, in end, out start, out end]: pairs on wide screens, one at a time on narrow.
const WIN: Record<Beat, { d: number[]; m: number[] }> = {
  ink: { d: [.07, .09, .285, .305], m: [.07, .09, .17, .185] }, choice: { d: [.15, .17, .285, .305], m: [.185, .2, .285, .30] },
  rule: { d: [.31, .33, .495, .515], m: [.31, .325, .42, .435] }, phone: { d: [.385, .405, .495, .515], m: [.435, .45, .52, .535] },
  yml2: { d: [.53, .55, .775, .795], m: [.54, .555, .63, .645] }, later: { d: [.605, .625, .775, .795], m: [.645, .66, .73, .745] },
  mem: { d: [.80, .82, .915, .93], m: [.745, .76, .82, .835] }, term: { d: [.84, .86, .915, .93], m: [.835, .85, .93, .945] },
}
const WK = [[0, 1], [.06, 1], [.19, 1], [.215, 2], [.30, 2], [.325, 3], [.39, 3], [.41, 4], [.52, 4], [.545, 5], [.80, 5], [.855, 5], [.925, 32], [1, 32]]
const wkAt = (p: number) => { let i = 0; while (i < WK.length - 2 && p > WK[i + 1][0]) i++; const a = WK[i], b = WK[i + 1]; return lerp(a[1], b[1], EIO(S(p, a[0], b[0]))) }
const HOT: Partial<Record<Beat, number[]>> = { ink: [.115, .14, .23], rule: [.375, .4, .46], yml2: [.575, .6, .77], term: [.885, .9, .92] } // the line that lights
const HOTIDS = ['ink', 'rule', 'yml2', 'term'] as const

// ---------- Cloth, stitches ----------
type Pal = [string, string, string]
const RED: Pal = ['#38110e', '#702a23', '#9a3c31'], BLU: Pal = ['#10162b', '#25315c', '#34478a']
function tileFor(pal: Pal, dpr: number) {
  const t = document.createElement('canvas'); t.width = t.height = 8 * dpr
  const g = t.getContext('2d')!; g.scale(dpr, dpr)
  const vg = g.createLinearGradient(0, 0, 0, 4); vg.addColorStop(0, pal[0]); vg.addColorStop(.32, pal[2]); vg.addColorStop(.64, pal[1]); vg.addColorStop(1, pal[0])
  const hg = g.createLinearGradient(0, 0, 4, 0); hg.addColorStop(0, pal[0]); hg.addColorStop(.32, pal[2]); hg.addColorStop(.64, pal[1]); hg.addColorStop(1, pal[0])
  ;([[0, 0, vg], [4, 4, vg], [4, 0, hg], [0, 4, hg]] as [number, number, CanvasGradient][]).forEach(([x, y, f]) => { g.fillStyle = f; g.save(); g.translate(x, y); g.fillRect(0, 0, 4, 4); g.restore() })
  return t
}
function stitch(g: CanvasRenderingContext2D, x: number, y: number, s: number, col: string, col2: string) {
  const p = s * .15
  g.lineCap = 'round'
  g.strokeStyle = 'rgba(15,3,3,.5)'; g.lineWidth = s * .27; g.beginPath(); g.moveTo(x + p + s * .05, y + p + s * .08); g.lineTo(x + s - p + s * .05, y + s - p + s * .08); g.moveTo(x + s - p + s * .05, y + p + s * .08); g.lineTo(x + p + s * .05, y + s - p + s * .08); g.stroke()
  g.strokeStyle = col2; g.lineWidth = s * .23; g.beginPath(); g.moveTo(x + p, y + p); g.lineTo(x + s - p, y + s - p); g.stroke()
  g.strokeStyle = col; g.lineWidth = s * .23; g.beginPath(); g.moveTo(x + s - p, y + p); g.lineTo(x + p, y + s - p); g.stroke()
  g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = s * .06; g.beginPath(); g.moveTo(x + s - p - s * .03, y + p + s * .02); g.lineTo(x + p + s * .05, y + s - p - s * .06); g.stroke()
}
const GL: Record<string, string[]> = { T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'], E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'], L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'], A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'], R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'] }
const DIA: [number, number, 'c' | 'o' | 'i'][] = [[2, 0, 'c'], [1, 1, 'c'], [3, 1, 'c'], [0, 2, 'c'], [4, 2, 'c'], [1, 3, 'c'], [3, 3, 'c'], [2, 4, 'c'], [2, 1, 'o'], [1, 2, 'o'], [3, 2, 'o'], [2, 3, 'o'], [2, 2, 'i']]
const COL = { c: ['#ffedc5', '#cdbb98'], o: ['#f0b04a', '#b97f24'], i: ['#7d95ff', '#3e55b8'] }
interface NameBox { w: number; h: number; pad: number }
function drawName(cv: HTMLCanvasElement, c: number): NameBox {
  const dpr = Math.min(2, devicePixelRatio || 1), pad = Math.ceil(c * .5), w = 29 * c + pad * 2, h = 7 * c + pad * 2
  cv.width = w * dpr; cv.height = h * dpr; cv.style.width = w + 'px'; cv.style.height = h + 'px'
  const g = cv.getContext('2d')!; g.scale(dpr, dpr)
  g.fillStyle = 'rgba(20,4,3,.4)'
  for (let i = 0; i <= 29; i++) for (let j = 0; j <= 7; j++) { g.beginPath(); g.arc(pad + i * c, pad + j * c, Math.max(.8, c * .06), 0, 7); g.fill() }
  let ox = 0
  'TELAR'.split('').forEach((ch) => { GL[ch].forEach((row, j) => [...row].forEach((b, i) => { if (b === '1') stitch(g, pad + (ox + i) * c, pad + j * c, c, '#ffedc5', '#cdbb98') })); ox += 6 })
  return { w, h, pad }
}
function drawDiamonds(cv: HTMLCanvasElement, c: number, n: number): NameBox {
  const d = c * .5, dpr = Math.min(2, devicePixelRatio || 1), pad = Math.ceil(d), sp = 6 * d, w = n * sp - d + pad * 2, h = 5 * d + pad * 2
  cv.width = w * dpr; cv.height = h * dpr; cv.style.width = w + 'px'; cv.style.height = h + 'px'
  const g = cv.getContext('2d')!; g.scale(dpr, dpr)
  for (let k = 0; k < n; k++) { DIA.forEach(([i, j, t]) => stitch(g, pad + k * sp + i * d, pad + j * d, d, COL[t][0], COL[t][1])); if (k < n - 1) stitch(g, pad + k * sp + 5 * d, pad + 2 * d, d, '#d9893a', '#9a5d1c') }
  return { w, h, pad }
}
function drawCloth(cv: HTMLCanvasElement, vw: number, vh: number) {
  const dpr = Math.min(2, devicePixelRatio || 1)
  cv.width = vw * dpr; cv.height = vh * dpr
  const g = cv.getContext('2d')!
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = g.createPattern(tileFor(RED, dpr), 'repeat')!; g.fillRect(0, 0, cv.width, cv.height)
  g.scale(dpr, dpr)
  const r = rng(11)
  for (let i = 0; i < 46; i++) {
    const x = r() * vw, y = r() * vh, R = 60 + r() * 240, dark = r() > .45
    const gr = g.createRadialGradient(x, y, 0, x, y, R); gr.addColorStop(0, dark ? 'rgba(20,4,3,.14)' : 'rgba(255,170,130,.08)'); gr.addColorStop(1, 'rgba(0,0,0,0)')
    g.fillStyle = gr; g.fillRect(x - R, y - R, R * 2, R * 2)
  }
  const vg = g.createRadialGradient(vw * .45, vh * .42, Math.min(vw, vh) * .25, vw * .5, vh * .5, Math.hypot(vw, vh) * .62); vg.addColorStop(0, 'rgba(20,4,3,0)'); vg.addColorStop(1, 'rgba(20,4,3,.5)')
  g.fillStyle = vg; g.fillRect(0, 0, vw, vh)
  // Blue selvedge: left, right, bottom, with cream chevron stitches.
  const bt = g.createPattern(tileFor(BLU, dpr), 'repeat')!, B = 18
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = bt
  g.fillRect(0, 0, B * dpr, cv.height); g.fillRect(cv.width - B * dpr, 0, B * dpr, cv.height); g.fillRect(0, cv.height - B * dpr, cv.width, B * dpr); g.fillRect(0, 0, cv.width, B * dpr * .7)
  g.scale(dpr, dpr)
  g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(B, 0, 2, vh); g.fillRect(vw - B - 2, 0, 2, vh); g.fillRect(0, vh - B - 2, vw, 2)
  const sq = (x: number, y: number, s = 3) => { const gr = g.createLinearGradient(x, y, x, y + s); gr.addColorStop(0, '#fff3d2'); gr.addColorStop(1, '#cdbb98'); g.fillStyle = 'rgba(8,10,25,.5)'; g.fillRect(x + .5, y + 1, s, s); g.fillStyle = gr; g.fillRect(x, y, s, s) }
  for (let y = 6; y < vh - 24; y += 30) { ([[3, 0], [6, 3], [9, 6], [6, 9], [3, 12]] as [number, number][]).forEach(([dx, dy]) => { sq(dx + 1, y + dy); sq(vw - B + (12 - dx), y + dy) }) }
  for (let x = 8; x < vw - 24; x += 30) { ([[0, 3], [3, 6], [6, 9], [9, 6], [12, 3]] as [number, number][]).forEach(([dx, dy]) => sq(x + dx, vh - B + dy + 1)) }
}

// ---------- The loom ----------
const weaveDefs = (id: string, pal: Pal) => `<linearGradient id="${id}v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pal[0]}"/><stop offset=".32" stop-color="${pal[2]}"/><stop offset=".64" stop-color="${pal[1]}"/><stop offset="1" stop-color="${pal[0]}"/></linearGradient><linearGradient id="${id}h" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${pal[0]}"/><stop offset=".32" stop-color="${pal[2]}"/><stop offset=".64" stop-color="${pal[1]}"/><stop offset="1" stop-color="${pal[0]}"/></linearGradient><pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="url(#${id}v)"/><rect x="4" y="4" width="4" height="4" fill="url(#${id}v)"/><rect x="4" width="4" height="4" fill="url(#${id}h)"/><rect y="4" width="4" height="4" fill="url(#${id}h)"/></pattern>`
const chev = (x: number, y: number, up: boolean, fill: string) => (up ? [[8, 0], [4, 4], [12, 4], [0, 8], [16, 8]] : [[0, 0], [16, 0], [4, 4], [12, 4], [8, 8]]).map(([dx, dy]) => `<rect x="${x + dx}" y="${y + dy}" width="4" height="4" fill="${fill}"/>`).join('')
function tapeSVG() {
  const P = 160, Wd = 432
  let s = `<svg viewBox="0 0 ${Wd} ${P * 2}" width="100%" preserveAspectRatio="none" style="display:block"><defs>${weaveDefs('tl-tr', RED)}${weaveDefs('tl-ti', BLU)}</defs>`
  for (let k = 0; k < 2; k++) {
    const y = k * P
    s += `<rect x="0" y="${y}" width="${Wd}" height="${P}" fill="url(#tl-tr)"/><rect x="0" y="${y}" width="${Wd}" height="22" fill="url(#tl-ti)"/>`
    for (let x = 6; x < Wd - 12; x += 28) s += chev(x, y + 6, true, '#ffedc5')
    ;[72, 216, 360].forEach((cx) => { const d = 7, oy = y + 60; DIA.forEach(([a, b, t]) => { const f = t === 'c' ? '#ffedc5' : t === 'o' ? '#e9a63d' : '#6f86e8'; s += `<rect x="${cx - 2.5 * d + a * d}" y="${oy + b * d}" width="${d}" height="${d}" fill="${f}" stroke="rgba(20,4,3,.35)" stroke-width=".6"/>` }) })
    s += `<rect x="0" y="${y + 128}" width="${Wd}" height="22" fill="url(#tl-ti)"/>`
    for (let x = 6; x < Wd - 12; x += 28) s += chev(x, y + 134, false, '#ffedc5')
  }
  return s + '</svg>'
}
const woodDefs = () => '<linearGradient id="tl-wd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3216"/><stop offset=".28" stop-color="#c0834a"/><stop offset=".6" stop-color="#8a5629"/><stop offset="1" stop-color="#43240e"/></linearGradient><linearGradient id="tl-wp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a2810"/><stop offset=".3" stop-color="#b57a45"/><stop offset=".65" stop-color="#8a5629"/><stop offset="1" stop-color="#43240e"/></linearGradient>'
function loomBack() {
  let s = `<svg viewBox="0 0 520 470" aria-hidden="true"><defs>${woodDefs()}</defs>`
  s += '<rect x="6" y="14" width="24" height="456" rx="7" fill="url(#tl-wp)"/><rect x="490" y="14" width="24" height="456" rx="7" fill="url(#tl-wp)"/>'
  ;([[11, '.22'], [17, '.18'], [23, '.22']] as [number, string][]).forEach(([x, o]) => { s += `<path d="M${x} 24 V460 M${x + 484} 24 V460" stroke="#2a1308" stroke-opacity="${o}" stroke-width="1"/>` })
  s += '<rect x="0" y="4" width="520" height="32" rx="14" fill="url(#tl-wd)"/><path d="M14 10 H506" stroke="#fff" stroke-opacity=".28" stroke-width="2" stroke-linecap="round"/><ellipse cx="6" cy="20" rx="6" ry="14" fill="#43240e"/><ellipse cx="514" cy="20" rx="6" ry="14" fill="#43240e"/>'
  for (let k = 0; k < 5; k++) s += `<path d="M${40 + k * 4} 6 L${52 + k * 4} 34" stroke="#ffedc5" stroke-opacity=".5" stroke-width="2"/><path d="M${470 - k * 4} 6 L${482 - k * 4} 34" stroke="#ffedc5" stroke-opacity=".5" stroke-width="2"/>`
  for (let i = 0; i < 46; i++) { const x = 44 + i * 9.6, c = i % 15 === 7 ? '#7d95ff' : i % 9 === 4 ? '#e9a63d' : '#d9c8a7'; s += `<path d="M${x.toFixed(1)} 34 V338" stroke="${c}" stroke-opacity="${c === '#d9c8a7' ? .62 : .9}" stroke-width="1.5"/><circle cx="${x.toFixed(1)}" cy="35" r="2.2" fill="${c}" opacity=".9"/>` }
  s += '<rect x="34" y="330" width="452" height="28" rx="5" fill="url(#tl-wd)"/><path d="M38 334 H482" stroke="#fff" stroke-opacity=".25" stroke-width="1.5"/>'
  for (let i = 0; i < 46; i++) { const x = 44 + i * 9.6; s += `<path d="M${(x + 4.8).toFixed(1)} 337 V356" stroke="#2a1308" stroke-opacity=".55" stroke-width="1.2"/>` }
  return s + '</svg>'
}
const loomFront = () => `<svg viewBox="0 0 520 470" aria-hidden="true"><defs>${woodDefs()}<linearGradient id="tl-cs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient><linearGradient id="tl-cs2" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
 <rect x="44" y="358" width="432" height="16" fill="url(#tl-cs)"/><rect x="44" y="414" width="432" height="22" fill="url(#tl-cs2)"/>
 <rect x="0" y="432" width="520" height="36" rx="16" fill="url(#tl-wd)"/><path d="M14 438 H506" stroke="#fff" stroke-opacity=".26" stroke-width="2" stroke-linecap="round"/><ellipse cx="6" cy="450" rx="6" ry="16" fill="#43240e"/><ellipse cx="514" cy="450" rx="6" ry="16" fill="#43240e"/></svg>`
const shuttleSVG = () => '<svg viewBox="0 0 64 18" width="100%"><defs><linearGradient id="tl-sw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5629"/><stop offset=".35" stop-color="#d79a5e"/><stop offset="1" stop-color="#5a3216"/></linearGradient></defs><path d="M1 9 C12 0 52 0 63 9 C52 18 12 18 1 9Z" fill="url(#tl-sw)" stroke="#3a1f0c" stroke-width=".8"/><rect x="22" y="4" width="20" height="10" rx="3" fill="#d9c8a7"/><path d="M26 4V14M30 4V14M34 4V14M38 4V14" stroke="#9c8a68" stroke-width="1.2"/><circle cx="3" cy="9" r="1.6" fill="#cfd4dc"/><circle cx="61" cy="9" r="1.6" fill="#cfd4dc"/></svg>'
const needleSVG = () => '<svg id="tl-needle" viewBox="0 0 90 90" aria-hidden="true"><defs><linearGradient id="tl-ng" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f6fa"/><stop offset=".5" stop-color="#aab2c0"/><stop offset="1" stop-color="#6e7685"/></linearGradient></defs><g transform="rotate(38 45 45)"><path d="M45 2 C47 14 47.5 60 46 84 L44 84 C42.5 60 43 14 45 2Z" fill="url(#tl-ng)" stroke="rgba(10,4,4,.5)" stroke-width=".6"/><ellipse cx="45" cy="73" rx="1.5" ry="5.2" fill="#2a0d0b"/></g><path d="M64 22 C80 8 88 -18 120 -26" stroke="#ffedc5" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg>'

const sheetHTML = (id: string, F_: FileSpec, cls = '') => `<div class="pnl sheet ${cls}" id="tl-pn-${id}"><span class="fn">${F_.fn}</span><div class="code">${F_.l.map((l) => `<span class="ln${l.g ? ' gap' : ''}${l.h ? ' hot' : ''}"><i class="hl"></i><span>${l.t}</span></span>`).join('')}</div></div>`
const shotHTML = (id: string, src: string, extra = '') => `<div class="pnl shot" id="tl-pn-${id}"><div class="im"><img src="${src}" alt="" decoding="async">${extra}</div></div>`

interface Pn { el: HTMLElement; kind: Kind; side: 'L' | 'R'; id: Beat; x: number; y: number; w: number; h: number; o: number; tx: number; ty: number }
interface HotInfo { dy: number; ex: number; w: number; hl: HTMLElement | null }
interface NameGeo { x: number; y: number; w: number; h: number; pad: number; c: number; dx: number; dy: number; dw: number; dh: number }
interface RV { el: HTMLElement; a: number; b: number; id: Beat; l: number }

export const mountTelar: Mount<ProjectData> = (root, { lang, first }, { reduce }) => {
  const ac = new AbortController()
  const { signal } = ac
  const C = COPY[lang]
  let disposed = false
  root.classList.toggle('rm', reduce)

  const $ = <E extends Element>(id: string) => root.querySelector('#tl-' + id) as E
  const pngs = { d: { choice: dChoice, later: dLater, phone: dPhone }, m: { choice: mChoice, later: mLater, phone: mPhone } }

  // ---------- Writes that skip what did not change ----------
  let last = new WeakMap<Element, Record<string, string>>()
  type Key = 'transform' | 'opacity' | 'visibility' | 'clipPath' | 'strokeDashoffset'
  function put(e: HTMLElement | SVGElement, key: Key, v: string) {
    let m = last.get(e)
    if (!m) { m = {}; last.set(e, m) }
    if (m[key] === v) return
    m[key] = v
    e.style[key] = v
  }

  // ---------- State ----------
  interface World {
    por: boolean; vw: number; vh: number; top: number; span: number; hold: number; range: number
    pn: Record<Beat, Pn>; tg: Record<Beat, HTMLElement>; hot: Partial<Record<Beat | 'choice', HotInfo>>
    imgs: HTMLImageElement[]; RV: RV[]; press: HTMLElement | null; src: Beat
    cells: HTMLElement[]; knots: Record<'k2' | 'k4' | 'k5', HTMLElement>; cellOn: number; arP: number; sx: number; cx: (i: number) => number
    th: Record<string, SVGPathElement | null>; d1: SVGElement; d3: SVGElement
    nm: NameGeo; heroAt: number | undefined
    hero: HTMLElement; nmEl: HTMLCanvasElement; nm2El: HTMLCanvasElement; needle: SVGElement; strip: HTMLElement; arc: SVGPathElement; end: HTMLElement
    loomW: number; loomH: number; thH: number
  }
  const W = {} as World
  W.heroAt = undefined
  const T0 = performance.now()
  let raf = 0, sizeRaf = 0, prev = 0, target = 0, ps = 0, sy = 0, moving = false
  let heroSeen = true, heroOff = false, idleOn = false, knotOn = { k2: false, k4: false, k5: false }

  // ---------- Build ----------
  function build() {
    const por = W.por = innerWidth <= 900
    const m: 'm' | 'd' = por ? 'm' : 'd'
    const press = por ? '<i class="press" style="left:5.1%;top:2.5%;width:80.5%;height:40.9%"></i>' : '<i class="press" style="left:9.9%;top:79.9%;width:82.5%;height:7.3%"></i>'
    const P = pngs[m]
    const heroHTML = `<h1 class="sr-only">Telar</h1><canvas id="tl-nm" aria-hidden="true"></canvas><canvas id="tl-nm2" aria-hidden="true"></canvas>${needleSVG()}<p id="tl-hl">${C.head.split(' ').map((w) => `<span class="w">${w} </span>`).join('')}</p><div id="tl-st"><i></i><span>${C.status}</span></div>`
      + sheetHTML('sheet', FILES.sheet) + '<svg id="tl-thr" aria-hidden="true"></svg>'
      + `<div class="pnl" id="tl-pn-loom">${loomBack()}<div class="warp-sh" id="tl-wsh"></div><div class="cw" id="tl-cw"><div class="ct" id="tl-ct">${tapeSVG()}</div></div><div class="lane" id="tl-lane"><div class="weft" id="tl-wf"></div><div class="shu" id="tl-shu">${shuttleSVG()}</div></div>${loomFront()}</div>`
    root.innerHTML = `<div class="track"><div class="stage">
  <canvas id="tl-cloth" aria-hidden="true"></canvas><i class="sheen"></i>
  <svg id="tl-con" aria-hidden="true"></svg>
  <div id="tl-pn-strip" class="pnl" aria-hidden="true"></div>
  <div id="tl-pnls">${sheetHTML('ink', FILES.ink)}${shotHTML('choice', P.choice, press)}${sheetHTML('rule', FILES.rule)}${shotHTML('phone', P.phone)}${sheetHTML('yml2', FILES.yml2)}${shotHTML('later', P.later)}${shotHTML('mem', dMem)}${sheetHTML('term', FILES.term, 'term')}</div>
  <div id="tl-tags">${ORDER.map((o) => `<div class="tag" id="tl-tg-${o[0]}">${C.L[o[0]]}</div>`).join('')}</div>
  <div class="hero" id="tl-hero">${heroHTML}</div>
  <div class="end" id="tl-end"><canvas id="tl-enm" aria-hidden="true"></canvas><canvas id="tl-dch" aria-hidden="true"></canvas><h2>${C.status}</h2></div>
</div></div>
<section class="rmcta"><div class="in"><h2>${C.status}</h2></div></section>`
    W.pn = {} as Record<Beat, Pn>
    ORDER.forEach(([id, kind, side]) => { W.pn[id] = { el: $('pn-' + id), kind, side, id, x: 0, y: 0, w: 0, h: 0, o: 0, tx: 0, ty: 0 } })
    W.imgs = [...root.querySelectorAll<HTMLImageElement>('.shot img')]
    W.tg = Object.fromEntries(ORDER.map((o) => [o[0], $<HTMLElement>('tg-' + o[0])])) as Record<Beat, HTMLElement>
    W.hero = $('hero'); W.nmEl = $('nm'); W.nm2El = $('nm2'); W.needle = $('needle'); W.end = $('end')
    layout()
    W.imgs.forEach((i) => { void i.decode?.().catch(() => {}) })
  }

  function stripBuild(sx: number, sw: number) {
    const por = W.por, cg = por ? 2 : 3, n = 32, cw = (sw - (n - 1) * cg) / n
    W.cx = (i) => sx + i * (cw + cg) + cw / 2
    const el = $<HTMLElement>('pn-strip')
    W.strip = el
    el.style.width = sw + 'px'; el.style.height = STRIP_H + 'px'; el.style.setProperty('--cg', cg + 'px')
    el.innerHTML = `<div class="cells">${Array.from({ length: n }, () => '<i class="c"></i>').join('')}</div><svg width="${sw}" height="${STRIP_H}" viewBox="0 0 ${sw} ${STRIP_H}"><path id="tl-arc" pathLength="1" fill="none" stroke="#ffedc5" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`
      + ([[1, 'k2'], [3, 'k4'], [4, 'k5']] as [number, string][]).map(([i, k]) => `<i class="knot ${k}" style="left:${W.cx(i) - sx - 8}px;top:19px"></i>`).join('')
    const x2 = W.cx(1) - sx, x5 = W.cx(4) - sx, y0 = 35, d = STRIP_H - 4
    W.arc = $('arc')
    W.arc.setAttribute('d', `M${x2} ${y0} C${x2} ${y0 + (d - y0) * 1.34} ${x5} ${y0 + (d - y0) * 1.34} ${x5} ${y0}`)
    W.cells = [...el.querySelectorAll<HTMLElement>('.c')]
    W.knots = { k2: el.querySelector('.k2') as HTMLElement, k4: el.querySelector('.k4') as HTMLElement, k5: el.querySelector('.k5') as HTMLElement }
    W.sx = sx
    W.cellOn = -1; W.arP = -1
    knotOn = { k2: false, k4: false, k5: false }
  }

  // Shot sizing: height-limited, never larger than the screen allows.
  function shotSize(id: Beat, RH: number, maxW: number): [number, number] {
    const asp: Record<string, number> = { choice: 1334 / 1614, later: 1334 / 1614, phone: 930 / 1720, mem: 780 / 810 }
    const a = W.por ? ({ choice: 590 / 650, later: 590 / 810, phone: 1080 / 1590, mem: 780 / 810 } as Record<string, number>)[id] : asp[id]
    let ih = Math.min(RH - 18, 640), iw = ih * a
    if (iw > maxW - 18) { iw = maxW - 18; ih = iw / a }
    return [Math.round(iw + 18), Math.round(ih + 18)]
  }
  const thX = (id: Beat) => { const o = W.pn[id]; return W.por ? o.x - 3 : ((o.x - 14 >= 30) ? o.x - 14 : o.x + 10) }

  function layout() {
    const vw = innerWidth, vh = innerHeight, por = W.por
    W.vw = vw; W.vh = vh
    last = new WeakMap()
    const st = root.querySelector<HTMLElement>('.stage')!, tr = root.querySelector<HTMLElement>('.track')!
    st.style.height = vh + 'px'; tr.style.height = (vh * (por ? 19 : 18)) + 'px'
    W.top = tr.getBoundingClientRect().top + scrollY; W.span = tr.offsetHeight - vh; W.hold = vh * .45; W.range = Math.max(1, W.span - W.hold)
    drawCloth($('cloth'), vw, vh)
    // Strip.
    stripBuild(SIDE, vw - 2 * SIDE)
    W.strip.style.transform = `translate3d(${SIDE}px,${STRIP_Y}px,0)`
    // Objects: pairs on wide screens, one at a time on narrow.
    const RH = vh - SIDE - REG_T, avail = vw - 2 * SIDE
    const pos = {} as Record<Beat, { w: number; h: number; x: number; y: number }>
    const codeH = (id: Beat, w: number) => { const e = W.pn[id].el; e.style.width = w + 'px'; e.style.height = 'auto'; e.style.transform = 'none'; return e.offsetHeight }
    if (por) {
      ORDER.forEach(([id, kind]) => {
        let w: number, h: number
        if (kind === 'shot') [w, h] = shotSize(id, RH, avail)
        else { w = Math.min(avail, 520); h = codeH(id, w) }
        pos[id] = { w, h, x: Math.round((vw - w) / 2), y: REG_T + Math.round(Math.max(0, (RH - h) * .45)) }
      })
    } else {
      ([['ink', 'choice'], ['rule', 'phone'], ['yml2', 'later'], ['mem', 'term']] as [Beat, Beat][]).forEach(([a, b]) => {
        const A = W.pn[a], Bo = W.pn[b]
        const sh = A.kind === 'shot' ? a : b, co = A.kind === 'shot' ? b : a
        const [sw_, sh_] = shotSize(sh, RH, avail * .6)
        const cw_ = Math.min(580, avail - GAP - sw_), ch = codeH(co, cw_)
        const tot = cw_ + GAP + sw_, x0 = SIDE + (avail - tot) / 2
        const Lb = A.side === 'L' ? a : b, Rb = A.side === 'L' ? b : a
        const wL = Lb === co ? cw_ : sw_, wR = Rb === co ? cw_ : sw_, hL = Lb === co ? ch : sh_, hR = Rb === co ? ch : sh_
        const yy = (hh: number) => Math.round(REG_T + Math.max(0, (RH - hh) * .5) * (hh < RH * .7 ? 1 : 0))
        pos[Lb] = { w: wL, h: hL, x: Math.round(x0), y: Lb === co ? yy(hL) : REG_T }
        pos[Rb] = { w: wR, h: hR, x: Math.round(x0 + wL + GAP), y: Rb === co ? yy(hR) : REG_T }
        void Bo
      })
    }
    ORDER.forEach(([id]) => { const o = W.pn[id], P = pos[id]; Object.assign(o, P); o.el.style.width = P.w + 'px'; o.el.style.height = P.h + 'px' })
    // Hot lines, rest offsets for threads.
    W.hot = {}
    HOTIDS.forEach((id) => {
      const o = W.pn[id], ln = o.el.querySelector('.ln.hot') as HTMLElement, r0 = o.el.getBoundingClientRect(), r1 = ln.getBoundingClientRect()
      W.hot[id] = { dy: (r1.top + r1.height / 2) - r0.top, ex: r1.left - r0.left, w: r1.width, hl: ln.querySelector('.hl') }
    })
    W.press = root.querySelector('#tl-pn-choice .press')
    if (por) {
      const o = W.pn.choice
      o.el.style.transform = 'none'
      const r0 = o.el.getBoundingClientRect(), r1 = W.press!.getBoundingClientRect()
      W.hot.choice = { dy: r1.top + r1.height / 2 - r0.top, ex: r1.left - r0.left + 4, w: 0, hl: null }
    }
    // Code reveal items.
    W.RV = []
    HOTIDS.forEach((id) => {
      const o = W.pn[id], ls = [...o.el.querySelectorAll<HTMLElement>('.ln>span')], w = WIN[id][por ? 'm' : 'd']
      ls.forEach((el, i) => { const a = w[0] + .004 + i * .0045; W.RV.push({ el, a, b: a + .012, id, l: -9 }); el.style.opacity = '0'; el.style.clipPath = 'inset(0 100% 0 0)' })
    })
    heroLayout()
    W.src = por ? 'choice' : 'ink'
    // Tags.
    ORDER.forEach(([id]) => {
      const o = W.pn[id], t = W.tg[id], tw = t.offsetWidth
      let x = o.x
      if (id === W.src || id === 'yml2') { const tx = thX(id); x = Math.max(o.x, tx + 14) }
      x = Math.min(x, vw - SIDE - tw)
      o.tx = x; t.style.transform = `translate3d(${x}px,${Math.max(TAG_Y, o.y - 26 - 26)}px,0)`; o.ty = Math.max(TAG_Y, o.y - 26 - 26)
    })
    threads()
  }

  function threads() {
    const con = $<SVGSVGElement>('con')
    con.setAttribute('viewBox', `0 0 ${W.vw} ${W.vh}`)
    let s = ''
    const mk = (k: string, d: string) => { s += `<path class="sh" id="tl-${k}s" d="${d}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><path class="th" id="tl-${k}" d="${d}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><path class="lt" id="tl-${k}l" d="${d}" pathLength="1" opacity="0"/>` }
    const ky = STRIP_Y + 26
    const route = (id: Beat, kx: number) => {
      const o = W.pn[id], h = (W.hot[id] as HotInfo), tx = thX(id), ly = o.y + h.dy, sx = o.x + h.ex - 2
      return `M${sx} ${ly} H${tx} V${ky + 46} C${tx} ${ky + 22} ${kx} ${ky + 30} ${kx} ${STRIP_Y + 35}`
    }
    W.src = W.por ? 'choice' : 'ink'
    mk('t1', route(W.src, W.cx(1))); mk('t3', route('yml2', W.cx(4)))
    if (!W.por) {
      const y = W.pn.yml2, l = W.pn.later, h = W.hot.yml2!, ly = y.y + h.dy, x1 = y.x + y.w - 6, x2 = l.x + 2, y2 = Math.min(l.y + l.h - 40, Math.max(l.y + 40, ly))
      mk('t4', `M${x1} ${ly} C${x1 + 36} ${ly} ${x2 - 36} ${y2} ${x2} ${y2}`)
    }
    const hs = W.hot[W.src]!, h3 = W.hot.yml2!
    s += `<circle class="dot" id="tl-d1" r="5" cx="${W.pn[W.src].x + hs.ex}" cy="${W.pn[W.src].y + hs.dy}" opacity="0"/><circle class="dot" id="tl-d3" r="5" cx="${W.pn.yml2.x + h3.ex}" cy="${W.pn.yml2.y + h3.dy}" opacity="0"/>`
    con.innerHTML = s
    const g = (id: string) => root.querySelector<SVGPathElement>('#tl-' + id)
    W.th = { t1l: g('t1l'), t3l: g('t3l'), t4l: g('t4l'), t1: g('t1'), t1s: g('t1s'), t3: g('t3'), t3s: g('t3s'), t4: g('t4'), t4s: g('t4s') }
    W.d1 = $('d1'); W.d3 = $('d3')
  }

  function heroLayout() {
    const vw = innerWidth, vh = innerHeight, por = W.por
    const sheet = $<HTMLElement>('pn-sheet'), loom = $<HTMLElement>('pn-loom')
    const compact = vh < 720
    sheet.querySelectorAll<HTMLElement>('.ln').forEach((l, i) => { l.style.display = (por && compact && i > 3) || (por && vh < 800 && i > 4) ? 'none' : 'block' })
    // Name.
    let c: number, loomW: number, sheetW: number
    if (!por) { loomW = Math.min(520, (vw - 72) * .4); c = Math.floor(Math.min(22, (vw - 140 - loomW) / 29.5)); sheetW = Math.max(loomW, 340) }
    else { c = Math.floor(Math.min(11, (vw - 48) / 29.5)); loomW = Math.min(vw - 48, 342); sheetW = Math.min(vw - 48, 342) }
    const nm = W.nmEl, nm2 = W.nm2El
    const N = drawName(nm, c), nd = Math.floor(29 * c / (3 * c)), D = drawDiamonds(nm2, c, nd)
    sheet.style.width = sheetW + 'px'; sheet.style.height = 'auto'
    const sheetH = sheet.offsetHeight
    const hl = $<HTMLElement>('hl'), st = $<HTMLElement>('st')
    let hlw: number, x0: number
    if (!por) { x0 = 72; hlw = Math.min(vw - 72 - loomW - 48 - 72, 720) } else { x0 = (vw - N.w + 2 * N.pad) / 2; hlw = vw - 48 }
    const nx = por ? Math.round((vw - N.w) / 2) : x0 - N.pad
    hl.style.width = hlw + 'px'
    const hlh = hl.offsetHeight, sth = st.offsetHeight
    let nameY: number, loomX: number, loomY: number, sheetY: number, sheetX: number
    const gap1 = por ? 10 : 26, gap2 = por ? 10 : 28, gap3 = por ? 10 : 22
    const blockH = N.h + gap1 + D.h + gap2 + hlh + gap3 + sth
    if (!por) {
      nameY = Math.round(Math.max(96, (vh - blockH) / 2 + 14))
      loomX = Math.round(vw - 44 - loomW); sheetX = loomX + (loomW - sheetW) / 2; sheetY = 96
      const thH = 38, lh = Math.min(loomW * 470 / 520, vh - 24 - (sheetY + sheetH + thH))
      loomY = sheetY + sheetH + thH; W.loomH = lh; W.loomW = lh * 520 / 470 > loomW ? loomW : lh * 520 / 470; loomX += (loomW - W.loomW) / 2; W.thH = thH
    } else {
      nameY = 84 - N.pad + 4; sheetY = nameY + N.h + gap1 + D.h + gap2 + hlh + gap3 + sth + 18
      const thH = 24, lh = vh - 24 - (sheetY + sheetH + thH)
      W.loomH = Math.max(120, lh); W.loomW = Math.min(loomW, W.loomH * 520 / 470); W.loomH = W.loomW * 470 / 520
      loomX = Math.round((vw - W.loomW) / 2); sheetX = Math.round((vw - sheetW) / 2); loomY = sheetY + sheetH + thH; W.thH = thH
    }
    const place = (e: HTMLElement | SVGElement, x: number, y: number) => { e.style.left = '0'; e.style.top = '0'; e.style.transform = `translate3d(${Math.round(x)}px,${Math.round(y)}px,0)` }
    place(nm, nx, nameY); place(nm2, nx + (N.w - D.w) / 2, nameY + N.h + gap1)
    const hy = nameY + N.h + gap1 + D.h + gap2
    place(hl, por ? Math.round((vw - hlw) / 2) : x0, hy); hl.style.textAlign = por ? 'center' : 'left'
    place(st, por ? (vw - st.offsetWidth) / 2 : x0, hy + hlh + gap3)
    place(sheet, sheetX, sheetY)
    place(loom, loomX, loomY); loom.style.width = W.loomW + 'px'; loom.style.height = W.loomH + 'px'
    // Loom guts in % of the box.
    const k = W.loomW / 520, pct = (a: number, b: number) => a / b * 100 + '%'
    $<HTMLElement>('cw').style.cssText = `left:${pct(44, 520)};top:${pct(356, 470)};width:${pct(432, 520)};height:${pct(80, 470)}`
    $<HTMLElement>('ct').style.cssText = ''
    $<HTMLElement>('wsh').style.cssText = `left:${pct(44, 520)};top:${pct(36, 470)};width:${pct(432, 520)};height:${pct(296, 470)};background:linear-gradient(100deg,rgba(255,237,197,0) 30%,rgba(255,237,197,.55) 50%,rgba(255,237,197,0) 70%)`
    const lane = $<HTMLElement>('lane')
    lane.style.cssText = `position:absolute;overflow:hidden;left:${pct(44, 520)};top:${pct(304, 470)};width:${pct(432, 520)};height:${pct(22, 470)}`
    const sw = Math.max(34, 62 * k), laneW = 432 * k, tl = Math.max(40, laneW * .3)
    $<HTMLElement>('shu').style.cssText = `width:${sw}px;top:50%;margin-top:${-sw * 18 / 64 / 2}px`
    $<HTMLElement>('wf').style.cssText = `width:${tl}px;top:50%;margin-top:-1.5px`
    lane.style.setProperty('--tw', (laneW - sw) + 'px'); lane.style.setProperty('--sw', sw + 'px'); lane.style.setProperty('--tl', tl + 'px')
    // Thread from the file down into the loom.
    const th = $<SVGSVGElement>('thr')
    th.setAttribute('width', String(W.loomW)); th.setAttribute('height', String(W.thH)); th.setAttribute('viewBox', `0 0 ${W.loomW} ${W.thH}`)
    const n = 9
    let ts = ''
    for (let i = 0; i < n; i++) {
      const xs = sheetX + sheetW * (.14 + .72 * i / (n - 1)) - loomX, xe = W.loomW * (.12 + .76 * i / (n - 1))
      const d = `M${xs.toFixed(1)} 0 C${xs.toFixed(1)} ${W.thH * .6} ${xe.toFixed(1)} ${W.thH * .35} ${xe.toFixed(1)} ${W.thH}`
      ts += `<path class="w" d="${d}"/><path class="l" d="${d}" style="animation-delay:${(-i * .37).toFixed(2)}s" pathLength="100"/>`
    }
    th.innerHTML = ts; place(th, loomX, loomY - W.thH)
    // Name and needle geometry.
    W.nm = { x: nx, y: nameY, w: N.w, h: N.h, pad: N.pad, c, dx: nx + (N.w - D.w) / 2, dy: nameY + N.h + gap1, dw: D.w, dh: D.h }
    // The end.
    const ec = por ? Math.min(8, Math.floor((vw - 48) / 29.5)) : 11
    drawName($('enm'), ec); drawDiamonds($('dch'), ec, 9)
  }

  // ---------- The frame ----------
  const win = (p: number, a: number, b: number, r = .008) => S(p, a, a + r) * (1 - S(p, b - r, b))

  function frame(p: number, now?: number) {
    const por = W.por, key = por ? 'm' : 'd'
    // Hero: fades as the story begins.
    const hv = reduce ? 1 : 1 - S(p, .012, .048)
    put(W.hero, 'opacity', hv.toFixed(3)); put(W.hero, 'visibility', hv <= 0 ? 'hidden' : 'visible'); put(W.hero, 'transform', `translate3d(0,${((1 - hv) * 16).toFixed(1)}px,0)`)
    heroSeen = hv > 0
    if (heroSeen) heroLive(now)
    // Strip.
    const so = reduce ? 0 : S(p, .052, .07)
    put(W.strip, 'opacity', so.toFixed(3)); put(W.strip, 'visibility', so <= 0 ? 'hidden' : 'visible')
    put(W.strip, 'transform', `translate3d(${W.sx}px,${(STRIP_Y + (1 - EO(so)) * 8).toFixed(1)}px,0)`)
    if (so > 0) {
      const wk = wkAt(p), on = Math.floor(wk + 1e-6)
      if (on !== W.cellOn) { W.cellOn = on; W.cells.forEach((c, i) => { c.classList.toggle('on', i < on); c.classList.toggle('now', i === on - 1) }) }
      const kn = { k2: p > .235, k4: p > .40, k5: p > .585 }
      ;(Object.keys(kn) as (keyof typeof kn)[]).forEach((k) => { if (knotOn[k] !== kn[k]) { knotOn[k] = kn[k]; W.knots[k].classList.toggle('on', kn[k]) } })
      const ar = S(p, .545, .585)
      if (ar !== W.arP) { W.arP = ar; put(W.arc, 'strokeDashoffset', (1 - EIO(ar)).toFixed(4)) }
    }
    // Objects.
    ORDER.forEach(([id]) => {
      const o = W.pn[id], w = WIN[id][key], qi = EO(S(p, w[0], w[1])), qo = S(p, w[2], w[3]), v = reduce ? 0 : qi * (1 - qo)
      o.o = v
      const e = o.el
      put(e, 'opacity', v.toFixed(3)); put(e, 'visibility', v <= 0.002 ? 'hidden' : 'visible')
      put(e, 'clipPath', qi < 1 ? `inset(0 ${((1 - qi) * 100).toFixed(2)}% 0 0 round 14px)` : 'none')
      put(e, 'transform', `translate3d(${o.x}px,${(o.y + (1 - qi) * 14).toFixed(1)}px,0) scale(${o.kind === 'shot' ? (.97 + .03 * qi * (1 - qo * .5)).toFixed(4) : 1})`)
      const tg = W.tg[id]
      put(tg, 'opacity', v.toFixed(3)); put(tg, 'visibility', v <= 0.002 ? 'hidden' : 'visible')
    })
    RVapply(p)
    // The choice is pressed.
    const pr = W.press
    if (pr) { const u = Math.sin(Math.PI * S(p, .195, .225)); put(pr, 'opacity', (u * .9).toFixed(3)); put(pr, 'transform', `scale(${(1 - .02 * u).toFixed(4)})`) }
    // Hot lines light.
    HOTIDS.forEach((id) => { const h = HOT[id]!, hl = W.hot[id]!.hl; if (hl) put(hl, 'opacity', (win(p, h[0], h[2], .012) * (W.pn[id].o > .5 ? 1 : 0)).toFixed(3)) })
    // Threads.
    const tset = (th: SVGPathElement | null, ths: SVGPathElement | null, t: number, o: number, lt: SVGPathElement | null) => {
      if (!th || !ths) return
      if (lt) put(lt, 'opacity', t >= 1 ? o.toFixed(3) : '0')
      const d = (1 - EIO(t)).toFixed(4)
      put(th, 'strokeDashoffset', d); put(ths, 'strokeDashoffset', d); put(th, 'opacity', o.toFixed(3)); put(ths, 'opacity', (o * .8).toFixed(3))
    }
    const yo = WIN.yml2[key], so_ = WIN[W.src][key]
    const t1a = por ? .215 : .12, t1b = por ? .245 : .24, t1v = (p > t1a ? 1 : 0) * (1 - S(p, so_[2] - .005, so_[3]))
    const T = W.th
    tset(T.t1, T.t1s, S(p, t1a, t1b), t1v, T.t1l)
    tset(T.t3, T.t3s, S(p, .565, .60), (p > .565 ? 1 : 0) * (1 - S(p, yo[2] - .005, yo[3])), T.t3l)
    tset(T.t4, T.t4s, S(p, .60, .64), (p > .60 ? 1 : 0) * (1 - S(p, .775, .795)), T.t4l)
    put(W.d1, 'opacity', (t1v * (p > t1a ? 1 : 0)).toFixed(3)); put(W.d3, 'opacity', ((p > .565 ? 1 : 0) * (1 - S(p, yo[2] - .005, yo[3]))).toFixed(3))
    // End.
    const eo = reduce ? 0 : S(p, .945, .98) * (1 - S(sy, W.top + W.span, W.top + W.span + W.vh * .3))
    put(W.end, 'opacity', eo.toFixed(3)); put(W.end, 'visibility', eo > 0 && !reduce ? 'visible' : 'hidden')
    const idle = sy > W.top + W.span
    if (idle !== idleOn) { idleOn = idle; root.classList.toggle('idle', idle) }
    if (heroSeen === heroOff) { heroOff = !heroSeen; root.classList.toggle('hero-off', heroOff) }
  }
  function RVapply(p: number) {
    W.RV.forEach((it) => {
      if (W.pn[it.id].o < .01) return
      const t = S(p, it.a, it.b)
      if (t === it.l) return
      it.l = t
      put(it.el, 'opacity', Math.min(1, t * 3).toFixed(3)); put(it.el, 'clipPath', `inset(0 ${((1 - t) * 100).toFixed(2)}% 0 0)`)
    })
  }
  // The name is sewn once; afterwards a glint travels over it and the needle rests in the last diamond.
  function heroLive(now?: number) {
    const N = W.nm
    if (!N) return
    const t = ((now ?? performance.now()) - T0) / 1000
    const el = W.heroAt === undefined ? 0 : Math.max(0, t - W.heroAt), a = reduce ? 1 : EO(cl(el / 1.9)), b = reduce ? 1 : EO(cl((el - 1.55) / 1.1))
    put(W.nmEl, 'clipPath', `inset(0 ${((1 - a) * 100).toFixed(2)}% 0 0)`)
    put(W.nm2El, 'clipPath', `inset(0 ${((1 - b) * 100).toFixed(2)}% 0 0)`)
    let x: number, y: number, rot = 0
    if (b <= 0) { x = N.x + N.pad + (N.w - 2 * N.pad) * a; y = N.y + N.pad + N.c * (3.5 + 1.6 * Math.sin(t * 9)) }
    else { x = N.dx + N.dw * b; y = N.dy + N.dh * .5 + Math.sin(t * 9) * N.c * .3 }
    const rest = b >= 1
    if (rest) { x = N.dx + N.dw - N.c * .9 + Math.sin(t * 1.3) * 2; y = N.dy + N.dh * .3 + Math.sin(t * 1.7) * 3; rot = Math.sin(t * 1.1) * 3 }
    put(W.needle, 'transform', `translate3d(${(x - 60).toFixed(1)}px,${(y - 70).toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg)`)
    put(W.needle, 'opacity', reduce ? '0' : (a > 0 ? '1' : '0'))
  }

  // ---------- One rAF, one damped scroll value ----------
  function readScroll() { sy = scrollY; target = reduce ? 0 : cl((sy - W.top) / W.range) }
  function setMoving(on: boolean) { if (on !== moving) { moving = on; root.classList.toggle('moving', on) } }
  function tick(now: number) {
    raf = 0
    const dt = Math.min(64, now - prev)
    prev = now
    const d = target - ps
    const settled = Math.abs(d) < .00004
    if (settled) ps = target; else ps += d * (1 - Math.exp(-dt / 130))
    frame(ps, now)
    setMoving(!settled)
    // Settled, the loop goes on only while the hero is on screen: the needle and the glint are alive.
    if ((!settled || (heroSeen && !idleOn)) && !document.hidden) raf = requestAnimationFrame(tick)
  }
  function kick() {
    if (disposed) return
    readScroll()
    if (reduce) { ps = target; frame(ps, 0); return }
    if (raf) return
    prev = performance.now()
    raf = requestAnimationFrame(tick)
  }
  if (!reduce) {
    addEventListener('scroll', kick, { passive: true, signal })
    document.addEventListener('visibilitychange', () => { root.classList.toggle('idle', document.hidden || idleOn); if (!document.hidden) kick() }, { signal })
  }

  // Resize: a new width or a real height change rebuilds the page. The small height changes of a phone's address bar do not.
  let sizeW = innerWidth, sizeH = innerHeight
  addEventListener('resize', () => {
    if (sizeRaf) return
    sizeRaf = requestAnimationFrame(() => {
      sizeRaf = 0
      if (innerWidth === sizeW && Math.abs(innerHeight - sizeH) < 140) return
      sizeW = innerWidth; sizeH = innerHeight
      build(); readScroll(); ps = target; frame(ps, performance.now())
      kick()
    })
  }, { signal })

  // ---------- Entrance ----------
  const heroIn = () => {
    if (disposed) return
    root.classList.remove('hold')
    W.heroAt = (performance.now() - T0) / 1000
    if (reduce) return
    const A = (e: Element, fr: Keyframe[], o: KeyframeAnimationOptions) => e.animate(fr, { fill: 'backwards', easing: 'cubic-bezier(0.23, 1, 0.32, 1)', ...o })
    A($('hl'), [{ opacity: 0, translate: '0 10px' }, { opacity: 1, translate: '0 0' }], { duration: 520, delay: 1500 })
    A($('st'), [{ opacity: 0 }, { opacity: 1 }], { duration: 420, delay: 1900 })
    A($('pn-sheet'), [{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 200 }); A($('pn-loom'), [{ opacity: 0 }, { opacity: 1 }], { duration: 800, delay: 350 }); A($('thr'), [{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 700 })
    kick()
  }

  const flight = first && !reduce ? takeFlight('telar') : null
  if (reduce && first) { const f = takeFlight('telar'); if (f) cancelFlight(f) }
  // A language switch or reduced motion shows the name already sewn.
  if (!first || reduce) W.heroAt = -10
  else root.classList.add('hold')
  build()
  readScroll(); ps = target; frame(ps, performance.now())
  if (!reduce) kick()
  const stage = root.querySelector<HTMLElement>('.stage')!
  if (flight) {
    // The card's cloth grows into this page; the stage appears over it and the name starts to be sewn as it lands.
    stage.style.opacity = '0'
    playFlight(flight, { sheetClass: 'tl-mat', stage, onLanded: heroIn, signal })
  } else if (first && !reduce) {
    stage.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 480, easing: 'ease' })
    heroIn()
  }

  // Fonts change the width of the headline: measure again once they are in.
  const fonts = ['700 26px "Bricolage Grotesque"', '600 20px "Bricolage Grotesque"', '500 16px "Geist Mono"', '600 14px "Geist Mono"', '600 16px Geist']
  Promise.all(fonts.map((f) => document.fonts.load(f).catch(() => [] as FontFace[]))).then(() => document.fonts.ready).then(() => {
    if (disposed) return
    layout(); readScroll(); ps = target; frame(ps, performance.now()); kick()
  })

  return () => {
    disposed = true
    ac.abort()
    cancelAnimationFrame(raf); cancelAnimationFrame(sizeRaf)
    root.getAnimations({ subtree: true }).forEach((a) => a.cancel())
    root.classList.remove('rm', 'moving', 'idle', 'hold', 'hero-off')
    root.replaceChildren()
  }
}
