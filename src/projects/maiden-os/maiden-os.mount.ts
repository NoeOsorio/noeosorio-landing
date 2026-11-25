import type { Mount } from '../../home/useMount'
import type { ProjectData } from '../types'
import { takeFlight, playFlight, cancelFlight } from '../cardFlight'
import { COPY } from './data'
import type { MaidenCopy } from './data'
import './maiden-os.css'
import iconUrl from './assets/maiden-icon.webp'
import faceIdle from './assets/face-idle.webp'
import faceListen from './assets/face-listen.webp'
import faceThink from './assets/face-think.webp'
import faceAct from './assets/face-act.webp'
import faceAppr from './assets/face-appr.webp'
import faceDone from './assets/face-done.webp'
import faceWorried from './assets/face-worried.webp'

// The scroll story of Maiden OS: a living core in the night, requests that travel as light along threads, and glass objects built live
// (a table, a study guide, an audio, the approval gate, the audit chain). One rAF drives one damped scroll value and stops when it settles;
// a second, tiny pass keeps the ambient light moving along the threads. Layout is read on load and on resize; the frame loop only writes
// transform, opacity, visibility, clip-path and filter through put(), which skips what did not change.

const FACES: [string, string][] = [['idle', faceIdle], ['listen', faceListen], ['think', faceThink], ['act', faceAct], ['appr', faceAppr], ['done', faceDone], ['worried', faceWorried]]

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

type Pt = [number, number]
interface Pose { x: number; y: number; s: number; o: number }
type Keys = [number, Pose][]

// ---------- The story, in scroll p ----------
const REQ = [{ n: 0, a: .10, b: .135, c: .165 }, { n: 1, a: .305, b: .335, c: .365 }, { n: 2, a: .575, b: .605, c: .635 }, { n: 2, a: .783, b: .80, c: .82 }]
const PN: Record<string, { i: [number, number]; o: [number, number] }> = {
  tbl: { i: [.165, .19], o: [.305, .335] }, gde: { i: [.365, .39], o: [.575, .605] }, aud: { i: [.635, .66], o: [.75, .775] },
  gat: { i: [.82, .84], o: [.90, .915] }, led: { i: [.905, .922], o: [.966, .981] },
}
const PNL = ['tbl', 'gde', 'aud', 'gat', 'led']
const LT = Array.from({ length: 6 }, (_, i) => .915 + i * .0072)
const LEV: [number, number, number][] = [[0, .165, .19], [1, .19, .30], [1, .375, .56], [1, .645, .77], [2, .82, .895]]
const TAGS: [keyof MaidenCopy['t'], string, number, number][] = [['tg', 'tbl', .105, .16], ['tbl', 'tbl', .195, .30], ['mac', 'gde', .31, .36], ['guide', 'gde', .41, .57], ['ip', 'aud', .58, .63], ['aud', 'aud', .68, .77], ['ask', 'gat', .855, .89], ['lim', 'led', .925, .945], ['log', 'led', .95, .97]]
const GAP = 32, SIDE = 24, TOP = 76, RM2 = 132
const NZ = 'url("data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .7 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>') + '")'
const GL: Record<string, string> = {
  Telegram: '<svg viewBox="0 0 24 24"><path d="M20.5 4.5L3.5 11l5.5 2 2 5.5 2.5-3.5 4 3z"/><path d="M9 13l6-4.5"/></svg>',
  Mac: '<svg viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="12" rx="1.8"/><path d="M8 20h8M12 16.5V20"/></svg>',
  iPhone: '<svg viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.6"/><path d="M10.5 18.5h3"/></svg>',
}
const LOCK = '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3"/></svg>'
const CHK = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
const FAM: Record<string, [string, string]> = { tbl: ['63,194,234', '#6FD6F2'], gde: ['140,158,255', '#AAB8FF'], aud: ['245,163,217', '#FF8F9A'], gat: ['123,97,255', '#A895FF'], led: ['123,97,255', '#A895FF'] }
const LC = ['63,194,234', '140,158,255', '245,184,65', '255,107,122']

interface RVItem { el: HTMLElement; pn: string | null; a: number; b: number; k: string; l: number }
type Key = 'transform' | 'opacity' | 'visibility' | 'clipPath' | 'filter'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

export const mountMaidenOs: Mount<ProjectData> = (root, { lang, first }, { reduce }) => {
  const ac = new AbortController()
  const { signal } = ac
  const C: MaidenCopy = COPY[lang]
  let disposed = false
  const RM = reduce
  root.classList.toggle('rm', RM)
  root.style.setProperty('--nz', NZ)

  const $ = <E extends HTMLElement = HTMLElement>(id: string) => root.querySelector('#' + id) as E
  const $$ = <E extends HTMLElement = HTMLElement>(sel: string) => [...root.querySelectorAll<E>(sel)]

  // ---------- Writes that skip what did not change ----------
  const last = new WeakMap<Element, Partial<Record<Key, string>>>()
  function put(el: HTMLElement, key: Key, v: string) {
    let m = last.get(el)
    if (!m) { m = {}; last.set(el, m) }
    if (m[key] === v) return
    m[key] = v
    el.style[key] = v
  }
  const f3 = (n: number) => n.toFixed(3)

  // ---------- Markup that never changes ----------
  root.innerHTML = `<div class="track" id="track"><div class="stage" id="stage">
  <div class="world" id="world"><svg class="cont" id="cont" aria-hidden="true"></svg><i class="sheen"></i><div class="ltw" id="lw1"><i class="lt" id="lt1"></i></div><div class="ltw b" id="lw2"><i class="lt" id="lt2"></i></div><div class="ltw lw3" id="lw3"><i class="lt" id="lc1" style="background:radial-gradient(closest-side,rgba(63,194,234,.34),rgba(63,194,234,0))"></i><i class="lt" id="lc2" style="background:radial-gradient(closest-side,rgba(140,158,255,.34),rgba(140,158,255,0))"></i><i class="lt" id="lc3" style="background:radial-gradient(closest-side,rgba(245,163,217,.32),rgba(245,163,217,0))"></i><i class="lt" id="lc4" style="background:radial-gradient(closest-side,rgba(123,97,255,.36),rgba(123,97,255,0))"></i></div><div class="dust" id="du1"></div><div class="dust g" id="du2"></div></div>
  <svg id="con" aria-hidden="true"></svg>
  <div id="shards"></div>
  <div id="pnls"></div>
  <div id="nodes"></div>
  <div id="coreg"><div id="kick"><i class="halo"></i><div id="rings"></div><i class="ob2" style="--r:54px;--t:9s"><i></i></i><i class="ob2" style="--r:80px;--t:14s"><i></i></i><i class="ob2" style="--r:104px;--t:21s"><i></i></i><div class="orb" id="orb"></div></div></div>
  <i class="pu" id="pu0"></i><i class="pu" id="pu1"></i><i class="pu" id="pu2"></i><i class="pu" id="pur"></i><i class="pu p" id="pus"></i>
  <div class="rqb" id="rqb"></div>
  <div class="intro" id="intro"><div class="wm" id="wm"><img src="${iconUrl}" alt=""><b id="wmt">Maiden<i>OS</i></b></div><div class="rq" id="rq"><svg class="bsv" aria-hidden="true"><path/></svg><span id="rqt"></span></div><div class="rb" id="rb"><div class="rbf" id="rbf"></div><svg class="bsv" aria-hidden="true"><path fill="url(#mo-rg)"/></svg><h1 id="h1"></h1></div><div class="meta" id="meta"></div></div>
  <div id="tags"></div>
  <div class="end" id="end"><div class="nm"><img src="${iconUrl}" alt=""><span>Maiden<i>OS</i></span></div><h2 id="eh"></h2><p id="es"></p></div>
</div></div>
<section class="rmcta" id="rmcta"></section>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="mo-rg" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#D6F35C" stop-opacity=".12"/><stop offset="1" stop-color="#D6F35C" stop-opacity=".03"/></linearGradient></defs></svg>`

  // ---------- Layout state, read on load and on resize ----------
  const W: Any = {}
  let TG: HTMLElement[] = []
  let RV: RVItem[] = []
  let K: Record<string, Keys | Keys[]> = {}
  const mobile = () => innerWidth <= 760

  // ---------- Glass objects ----------
  function wfBars(n: number, seed: number) {
    let s = seed
    const r = () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296
    return Array.from({ length: n }, (_, i) => { const e = Math.sin((i + .5) / n * Math.PI) * .75 + .25; return `<i style="--s:${(e * (.5 + r() * .5)).toFixed(2)};--d:${(.9 + r() * .9).toFixed(2)}s;--dl:${(-r() * 2).toFixed(2)}s"></i>` }).join('')
  }
  const pnl = (id: string, w: number, h: number, inner: string) => `<div class="pnl" id="pn-${id}" style="width:${w}px;height:${h}px;--f:${FAM[id][0]};--fi:${FAM[id][1]}"><div class="pg"></div>${inner}</div>`
  function tblHTML() {
    const T = C.tbl
    let n = 0
    const cell = (x: string) => { const a = .185 + n * .0045, b = a + .012; n++; return `<span data-r="${a.toFixed(4)},${b.toFixed(4)},p">${x}</span>` }
    const head = `<div class="rw h">${T.c.map((x) => cell(x)).join('')}</div>`
    const rows = T.r.map((r, i) => `<div class="rw${i === 2 ? ' b' : ''}"><i class="bst" ${i === 2 ? 'data-r=".285,.298,f"' : 'style="display:none"'}></i><i class="swp" data-r="${(.262 + i * .01).toFixed(3)},${(.286 + i * .01).toFixed(3)},sw"></i>` + r.map((x) => cell(x)).join('') + '</div>').join('')
    return `<div class="pc"><h3 data-r=".17,.19,f">${T.t}</h3><div class="tb">${head}${rows}</div></div>`
  }
  function gdeHTML() {
    const G = C.gde
    let h = `<div class="pc"><h3 data-r=".365,.385,f">${G.t}</h3><div class="sub" data-r=".37,.39,f">${G.s}</div><div class="gl">`
    G.x.forEach((s, i) => { const b = .39 + i * .054; h += `<h5 data-r="${b.toFixed(3)},${(b + .012).toFixed(3)},f">${s[0]}</h5><div class="ln" data-r="${(b + .008).toFixed(3)},${(b + .03).toFixed(3)},x2">${s[1]}</div><div class="ln" data-r="${(b + .02).toFixed(3)},${(b + .042).toFixed(3)},x2">${s[2]}</div>` })
    return h + '</div></div>'
  }
  function audHTML() {
    const por = W.por
    return `<div class="au"><span class="disc" data-r=".64,.66,p"></span><div class="am"><b data-r=".64,.665,f">${C.aud}</b><div class="wf">${wfBars(por ? 30 : 44, 5)}<div class="pr" data-r=".668,.765,x2">${wfBars(por ? 30 : 44, 5)}</div></div></div><span class="tdur" data-r=".645,.67,f">2:10</span></div>`
  }
  function gatHTML() {
    const G = C.gat
    return `<div class="gfl" id="gfl"></div><div class="pc gt"><div class="gsw"><div data-r=".872,.882,out"><h3>${G.t}</h3><p>${G.p}</p><div class="am2"><em>${G.a}</em><span>${G.o}</span></div><div class="btns"><b>${G.no}</b><b class="y" data-r=".862,.872,press">${G.yes}</b></div></div><div data-r=".884,.894,f"><h3 style="color:#5FD08A">${G.dn}</h3><p>${G.dp}</p></div></div><div class="slit" data-r=".865,.886,slit"></div>
 <div class="mt"><div class="t"><span>${G.sp}</span><b><span style="display:inline-grid"><span style="grid-area:1/1;text-align:right" data-r=".872,.884,out">$0.22</span><span style="grid-area:1/1;text-align:right" data-r=".884,.894,f">$0.62</span></span> / $3</b></div><div class="tr"><i class="m0"></i><i class="m1"></i><i class="m1f" data-r=".876,.897,x"></i></div></div></div>`
  }
  function ledHTML() {
    const L = C.led
    return `<div class="pc"><div class="lh"><h3 data-r=".905,.92,f">${LOCK}${L.t}</h3><span class="ck" data-r=".955,.968,f">${CHK}${L.ok}</span></div>
 <div class="lvl" data-r=".908,.925,f">${L.lv.map((x, i) => `<span data-lv="${i}" style="--lc:${LC[i]}">${x}</span>`).join('')}</div>
 ${L.r.map((r, i) => `<div class="lk" style="--lc:${LC[r[4]]}" data-r="${LT[i].toFixed(4)},${(LT[i] + .008).toFixed(4)},f"><i class="fl" data-r="${LT[i].toFixed(4)},${(LT[i] + .02).toFixed(4)},flash"></i><i class="hf" data-r="${LT[i].toFixed(4)},${(LT[i] + .016).toFixed(4)},flash"></i><time>${r[0]}</time><div><span>${r[1]}</span><em>${r[2]}</em></div><span class="vd">${r[3]}</span></div>`).join('')}</div>`
  }
  function shardsHTML() {
    const t = `<div class="shd" id="sh-t" style="width:190px;height:116px;--f:63,194,234"><div class="pg"></div><div class="in fl2"><i class="l" style="width:46%"></i><div class="gr">${Array.from({ length: 12 }, (_, i) => `<i style="--dl:${(i * .21).toFixed(2)}s;animation:mo-sh 3.2s ease-in-out infinite;animation-delay:${(i * .21).toFixed(2)}s"></i>`).join('')}</div></div></div>`
    const g = '<div class="shd" id="sh-g" style="width:176px;height:116px;--f:140,158,255"><div class="pg"></div><div class="in fl2 b"><i class="l" style="width:38%"></i><i style="width:92%;--dl:.2s"></i><i style="width:78%;--dl:.5s"></i><i style="width:88%;--dl:.8s"></i><i class="l" style="width:30%;margin-top:4px"></i><i style="width:70%;--dl:1.1s"></i></div></div>'
    const a = `<div class="shd" id="sh-a" style="width:200px;height:68px;--f:245,163,217"><div class="pg" style="border-radius:34px"></div><div class="in fl2 c" style="padding:12px 22px"><div class="wb">${wfBars(26, 9)}</div></div></div>`
    return t + g + a
  }
  function bubblePath(w: number, h: number, tail: string) {
    const r = 20, o = 30
    if (tail === 'br') return `M${r + o} ${o}H${w - r + o}a${r} ${r} 0 0 1 ${r} ${r}V${h - 26 + o}L${w + 16 + o} ${h + 8 + o}L${w - 20 + o} ${h + o}H${r + o}a${r} ${r} 0 0 1 ${-r} ${-r}V${r + o}a${r} ${r} 0 0 1 ${r} ${-r}Z`
    return `M${r + o} ${o}H${w - r + o}a${r} ${r} 0 0 1 ${r} ${r}V${h - r + o}a${r} ${r} 0 0 1 ${-r} ${r}H${22 + o}L${-12 + o} ${h + 8 + o}L${o} ${h - 24 + o}V${r + o}a${r} ${r} 0 0 1 ${r} ${-r}Z`
  }
  function contours() {
    const vw = Math.round(innerWidth * 1.12), vh = Math.round(innerHeight * 1.12), c = $('cont')
    c.setAttribute('viewBox', `0 0 ${vw} ${vh}`)
    let s = ''
    const cx = vw * .62, cy = vh * .74
    for (let k = 0; k < 34; k++) {
      const R = 60 + k * 26
      let d = ''
      for (let i = 0; i <= 120; i++) {
        const a = i / 120 * Math.PI * 2, n = 1 + .16 * Math.sin(a * 3 + k * .21) + .1 * Math.sin(a * 5 - k * .13) + .06 * Math.sin(a * 9 + k * .3)
        d += (i ? 'L' : 'M') + (cx + Math.cos(a) * R * 1.45 * n).toFixed(1) + ' ' + (cy + Math.sin(a) * R * .8 * n).toFixed(1)
      }
      s += `<path d="${d}Z" fill="none" stroke="rgba(244,238,228,${(.05 - k * .0009).toFixed(4)})" stroke-width="1"/>`
    }
    c.innerHTML = s
  }
  function dust() {
    let s = 1
    const r = () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296
    const mk = (n: number, o: number) => Array.from({ length: n }, () => `<i style="left:${(r() * 100).toFixed(1)}%;top:${(20 + r() * 90).toFixed(1)}%;--dx:${(r() * 50 - 25).toFixed(0)}px;--o:${(o * (.4 + r() * .6)).toFixed(2)};animation-duration:${(9 + r() * 12).toFixed(1)}s;animation-delay:${(-r() * 20).toFixed(1)}s"></i>`).join('')
    $('du1').innerHTML = mk(26, .45)
    $('du2').innerHTML = mk(14, .8)
  }

  // ---------- Build: the parts that depend on the window ----------
  function build() {
    W.por = innerWidth / innerHeight < 1
    $('rqt').textContent = C.rq
    $('h1').innerHTML = C.head.split(' ').map((w) => `<span class="w">${w} </span>`).join('')
    $('meta').innerHTML = `<span class="pr">${C.price}</span><span class="st">${C.note}</span>`
    $('eh').textContent = C.price; $('es').textContent = C.note
    $('rmcta').innerHTML = `<div class="in"><h2>${C.price}</h2><p>${C.note}</p></div>`
    const por = W.por
    const N = W.N = por ? { tbl: [340, 262], gde: [340, 340], aud: [340, 120], gat: [340, 330], led: [340, 392] } : { tbl: [600, 304], gde: [600, 400], aud: [540, 150], gat: [540, 330], led: [600, 432] }
    $('pnls').innerHTML = pnl('tbl', N.tbl[0], N.tbl[1], tblHTML()) + pnl('gde', N.gde[0], N.gde[1], gdeHTML()) + pnl('aud', N.aud[0], N.aud[1], audHTML()) + pnl('gat', N.gat[0], N.gat[1], gatHTML()) + pnl('led', N.led[0], N.led[1], ledHTML())
    $('shards').innerHTML = shardsHTML()
    $('nodes').innerHTML = ['Telegram', 'Mac', 'iPhone'].map((n) => `<div class="nd" data-n="${n}">${GL[n]}<i class="lit"></i></div><div class="nlb">${n}</div>`).join('')
    W.nd = $$('.nd'); W.nl = $$('.nlb')
    $('rings').innerHTML = [66, 88, 110, 132].map((r, i) => `<i class="rg r${i}" style="--r:${r}px;--t:${[12, 18, 26, 34][i]}s;--c:${LC[i]}"><i class="lit"></i><i class="so"></i></i>`).join('')
    W.lit = $$('.rg .lit')
    $('tags').innerHTML = TAGS.map((t) => `<div class="tag">${C.t[t[0]]}</div>`).join('')
    TG = $$('.tag')
    $('lt1').style.cssText = 'width:640px;height:640px;margin:-320px 0 0 -320px'
    $('lt2').style.cssText = 'width:520px;height:520px;margin:-260px 0 0 -260px;opacity:.7'
    ;['lc1', 'lc2', 'lc3', 'lc4'].forEach((id) => { const e = $(id); e.style.width = '600px'; e.style.height = '600px'; e.style.margin = '-300px 0 0 -300px' })
    contours(); dust()
    W.pn = {}
    PNL.forEach((n) => { W.pn[n] = { el: $('pn-' + n), w: N[n as keyof typeof N][0], h: N[n as keyof typeof N][1], o: 0 } })
    W.sh = ['sh-t', 'sh-g', 'sh-a'].map((id) => $(id))
    RV = $$('[data-r]').map((el) => {
      const [a, b, k] = el.dataset.r!.split(',')
      const pn = el.closest('.pnl') as HTMLElement | null
      const it: RVItem = { el, pn: pn ? pn.id.slice(3) : null, a: +a, b: +b, k, l: -9 }
      if (k === 'f' || k === 'p' || k === 'x2' || k === 'x' || k === 'press' || k === 'slit') el.style.transformOrigin = k === 'p' ? '50% 50%' : (k === 'x' ? '0 50%' : '50% 50%')
      if (k === 'p' || k === 'f' || k === 'flash' || k === 'sw' || k === 'out' || k === 'slit') el.style.opacity = k === 'out' ? '1' : '0'
      return it
    })
    W.lvEls = $$('.lvl span')
    W.core = $('coreg'); W.kick = $('kick'); W.con = $('con'); W.intro = $('intro'); W.end = $('end'); W.rqb = $('rqb')
    W.pu = [$('pu0'), $('pu1'), $('pu2')]; ;['v', 'c', 'k'].forEach((c, i) => W.pu[i].classList.add(c))
    W.pus = $('pus'); W.orb = $('orb')
    W.orb.innerHTML = FACES.map(([n, src]) => `<img src="${src}" data-f="${n}" alt=""${n === 'idle' ? ' class="on"' : ''}>`).join('')
    W.orbImgs = $$<HTMLImageElement>('#orb img'); W.orbF = 'idle'
    W.orbImgs.forEach((img: HTMLImageElement) => { img.decoding = 'async'; void img.decode().catch(() => {}) })
    W.lc = ['lc1', 'lc2', 'lc3', 'lc4'].map((id) => $(id)); W.pur = $('pur'); W.gfl = $('gfl')
    layout()
  }
  function poseAt(keys: Keys, p: number): Pose {
    let i = 0
    while (i < keys.length - 2 && p > keys[i + 1][0]) i++
    const a = keys[i], b = keys[i + 1], t = EIO(S(p, a[0], b[0])), A = a[1], B = b[1]
    return { x: lerp(A.x, B.x, t), y: lerp(A.y, B.y, t), s: lerp(A.s, B.s, t), o: lerp(A.o, B.o, t) }
  }
  function pts(path: SVGPathElement, n = 44): Pt[] {
    const L = path.getTotalLength(), a: Pt[] = []
    for (let i = 0; i < n; i++) { const q = path.getPointAtLength(L * i / (n - 1)); a.push([q.x, q.y]) }
    return a
  }
  function curve(a: Pt, b: Pt, vert: boolean) {
    const dx = b[0] - a[0], dy = b[1] - a[1]
    const c1 = vert ? [a[0], a[1] + dy * .55] : [a[0] + dx * .5, a[1]], c2 = vert ? [b[0], b[1] - dy * .55] : [b[0] - dx * .5, b[1]]
    return `M${a[0].toFixed(1)} ${a[1].toFixed(1)}C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`
  }
  function layout() {
    const vw = innerWidth, vh = innerHeight, por: boolean = W.por
    Object.assign(W, { vw, vh })
    const st = $('stage'), tr = $('track')
    st.style.height = vh + 'px'; tr.style.height = vh * (por ? 18 : 17) + 'px'
    W.top = tr.getBoundingClientRect().top + scrollY; W.span = tr.offsetHeight - vh; W.hold = por ? vh * .4 : vh * .5; W.range = Math.max(1, W.span - W.hold)
    const aBot = vh - SIDE - (vw < 420 ? 44 : 22) - GAP, aTop = TOP + 4
    ;([[$('rq'), 'bl'], [$('rb'), 'br']] as [HTMLElement, string][]).forEach(([e, t]) => {
      const w = e.offsetWidth, h = e.offsetHeight, sv = e.querySelector('.bsv') as unknown as SVGElement
      sv.style.cssText = `left:-30px;top:-30px;width:${w + 60}px;height:${h + 60}px`
      sv.setAttribute('viewBox', `0 0 ${w + 60} ${h + 60}`)
      sv.querySelector('path')!.setAttribute('d', bubblePath(w, h, t))
      if (t === 'br') { $('rbf').style.clipPath = `path('${bubblePath(w, h, 'br')}')`; $('rbf').classList.toggle('bf', !por) }
    })
    const rbR = $('rb').getBoundingClientRect(), mt = $('meta').getBoundingClientRect()
    // story geometry: the core, the channel nodes, the glass region
    const f = por ? Math.min(1, (vh - 72) / 772) : 1
    let C0: Pt2, cs: number, nodes: Pt[] = [], reg: { l: number; r: number; t: number; b: number }
    interface Pt2 { x: number; y: number }
    if (!por) {
      cs = vw < 1100 ? .75 : 1
      const NX = SIDE + 34, dy = 104 * cs
      W.bw = vw < 1100 ? 180 : 230
      C0 = { x: NX + 30 + W.bw + RM2 * cs + 26, y: (aTop + aBot) / 2 }
      nodes = [[NX, C0.y - dy], [NX, C0.y], [NX, C0.y + dy]]
      W.bub = nodes.map((n) => [n[0] + 30, n[1] - 46])
      reg = { l: C0.x + RM2 * cs + 36, r: vw - SIDE, t: aTop, b: aBot }
    } else {
      cs = .62 * (.55 + .45 * f)
      const rowY = TOP + 26 * f + 6, bubY = rowY + 58
      W.bw = vw - 2 * SIDE
      const bh = 64
      C0 = { x: vw / 2, y: bubY + bh + 14 + RM2 * cs }
      nodes = [0, 1, 2].map((i) => [vw * (.22 + i * .28), rowY] as Pt)
      W.bub = nodes.map(() => [SIDE, bubY])
      reg = { l: SIDE, r: vw - SIDE, t: C0.y + RM2 * cs + 16, b: aBot }
    }
    W.CP = C0; W.cs = cs; W.nodes = nodes; W.reg = reg
    W.rqb.style.width = W.bw + 'px'
    const M: Record<string, Pose> = {}
    PNL.forEach((n) => { const d = W.pn[n], s = Math.min(1.1, (reg.r - reg.l) / d.w, (reg.b - reg.t) / d.h); M[n] = { x: (reg.l + reg.r) / 2, y: (reg.t + reg.b) / 2, s, o: 1 } })
    W.M = M
    // hero composition: the core in the middle of three channels and the work around it
    const cb: Any = !por ? { x0: Math.max(rbR.right + 56, vw * .47), x1: vw - SIDE, y0: TOP + 10, y1: vh - SIDE } : { x0: SIDE, x1: vw - SIDE, y0: mt.bottom + 22, y1: vh - SIDE }
    cb.w = cb.x1 - cb.x0; cb.h = cb.y1 - cb.y0
    const R = Math.min(cb.w, cb.h) * .36, kx = por ? 1 : .9
    const hc = { x: cb.x0 + cb.w * .5, y: cb.y0 + cb.h * (por ? .46 : .5) }, hs = por ? .8 : 1.3
    const at = (deg: number, r: number) => ({ x: hc.x + Math.cos(deg * Math.PI / 180) * r * R * kx, y: hc.y + Math.sin(deg * Math.PI / 180) * r * R })
    const hn = [at(200, .78), at(300, .8), at(25, .8)]
    const sz = por ? .72 : 1
    const hsh = por ? [at(335, 1.22), at(62, 1.2), at(138, 1.3)] : [at(340, 1.12), at(78, 1.1), at(128, 1.12)]
    hsh.forEach((q, i) => { const w = [190, 176, 200][i] * sz / 2; q.x = Math.min(Math.max(q.x, SIDE + w + 4), vw - SIDE - w - 4) })
    W.hc = { ...hc, s: hs }
    const ofs = (P: Pose, dx: number, dy: number, s: number): Pose => ({ x: P.x + dx, y: P.y + dy, s: P.s * s, o: 0 })
    // keys
    const endC: Pose = { x: vw / 2, y: Math.max(TOP + 90, vh * .56 - 120), s: por ? .7 : .9, o: 1 }
    K.core = [[0, { ...hc, s: hs, o: 1 }], [.035, { ...hc, s: hs, o: 1 }], [.10, { x: C0.x, y: C0.y, s: cs, o: 1 }], [.975, { x: C0.x, y: C0.y, s: cs, o: 1 }], [.995, endC]]
    K.n = nodes.map((n, i) => [[0, { x: hn[i].x, y: hn[i].y, s: 1, o: 1 }], [.035, { x: hn[i].x, y: hn[i].y, s: 1, o: 1 }], [.10, { x: n[0], y: n[1], s: 1, o: 1 }], [.97, { x: n[0], y: n[1], s: 1, o: 1 }], [.985, { x: n[0], y: n[1], s: 1, o: 0 }], [1, { x: n[0], y: n[1], s: 1, o: 0 }]] as Keys)
    PNL.forEach((n) => { const m = M[n], P = PN[n], hid = ofs(m, 32, 26, .95), out = ofs(m, -34, -10, .95); K[n] = [[0, hid], [P.i[0], hid], [P.i[1], m], [P.o[0], m], [P.o[1], out], [1, out]] })
    // tags
    W.tagXY = TG.map((el, i) => {
      const n = TAGS[i][1], P = M[n], d = W.pn[n]
      if (['tg', 'mac', 'ip'].includes(TAGS[i][0])) return por ? [vw / 2 - el.offsetWidth / 2, aBot + GAP] : [C0.x - el.offsetWidth / 2, C0.y + RM2 * cs + 40]
      return [P.x - el.offsetWidth / 2, P.y + d.h * P.s / 2 + GAP]
    })
    // node labels
    W.nlXY = nodes.map((n, i) => [n[0] - W.nl[i].offsetWidth / 2 + (por ? 0 : Math.max(0, SIDE - (n[0] - W.nl[i].offsetWidth / 2))), n[1] + 28])
    // light sources
    W.l1 = [por ? vw * .6 : (reg.l + reg.r) / 2, por ? vh * .7 : vh * .48]; W.l2 = [por ? vw * .3 : C0.x, por ? vh * .38 : vh * .62]
    // hero shards
    ;[['sh-t', 190, 116], ['sh-g', 176, 116], ['sh-a', 200, 68]].forEach(([id, w, h], i) => {
      const e = $(id as string)
      e.style.transform = `translate3d(${(hsh[i].x - (w as number) / 2 * sz).toFixed(1)}px,${(hsh[i].y - (h as number) / 2 * sz).toFixed(1)}px,0) scale(${sz})`
      e.style.transformOrigin = '0 0'
    })
    // threads: hero fan from the core, story chain node to core to glass
    const tail: Pt = [rbR.right + 16, rbR.bottom + 8]
    let svg = ''
    const hp = [...hn.map((n) => curve([hc.x, hc.y], [n.x, n.y], por)), curve([hc.x, hc.y], tail, false)]
    hp.forEach((d) => { svg += `<path class="tw hh" d="${d}"/><path class="th hh" d="${d}"/>` })
    nodes.map((n) => curve([n[0], n[1]], [C0.x, C0.y], por)).forEach((d) => { svg += `<path class="nt sn" d="${d}"/>` })
    PNL.map((n) => { const P = M[n], d = W.pn[n], a: Pt = por ? [P.x, P.y - d.h * P.s / 2] : [P.x - d.w * P.s / 2, P.y]; return curve([C0.x, C0.y], a, por) })
      .forEach((d, i) => { svg += `<path class="tw sg g${i}" d="${d}"/><path class="th sg g${i}" d="${d}"/>` })
    W.con.innerHTML = svg
    const q = <E extends SVGPathElement>(s: string) => [...W.con.querySelectorAll(s)] as E[]
    W.PL = { h: q('.th.hh').map((p) => pts(p)), n: q('.nt.sn').map((p) => pts(p)), g: PNL.map((_, i) => pts(q('.th.g' + i)[0])) }
    W.thH = q('.hh'); W.thN = q('.sn'); W.thG = PNL.map((_, i) => q('.g' + i))
    W.lw3 = $('lw3'); W.cont = $('cont'); W.d1 = $('du1'); W.d2 = $('du2'); W.lw1 = $('lw1'); W.lw2 = $('lw2'); W.lt1 = $('lt1')
  }

  // ---------- Reveals inside the glass ----------
  function applyRV(it: RVItem, p: number) {
    const k = it.k, t = k === 'flash' ? Math.sin(Math.PI * S(p, it.a, it.b)) : k === 'out' ? 1 - S(p, it.a, it.b) : S(p, it.a, it.b)
    if (t === it.l) return
    it.l = t
    const e = it.el
    if (k === 'flash') { put(e, 'opacity', f3(t)); return }
    const q = EO(t)
    if (k === 'f') { put(e, 'opacity', f3(q)); put(e, 'transform', `translate3d(0,${((1 - q) * 8).toFixed(2)}px,0)`); return }
    if (k === 'p') { put(e, 'opacity', f3(q)); put(e, 'transform', `scale(${(.92 + .08 * q).toFixed(4)})`); return }
    if (k === 'out') { put(e, 'opacity', f3(q)); put(e, 'visibility', q <= 0 ? 'hidden' : 'visible'); return }
    if (k === 'x2') { put(e, 'clipPath', `inset(0 ${((1 - t) * 100).toFixed(2)}% 0 0)`); return }
    if (k === 'x') { put(e, 'transform', `scaleX(${q.toFixed(4)})`); return }
    if (k === 'sw') { const u = S(p, it.a, it.b); put(e, 'opacity', f3(Math.sin(Math.PI * u))); put(e, 'transform', `translate3d(${((u - .5) * 120).toFixed(1)}%,0,0)`); return }
    if (k === 'slit') { const u = S(p, it.a, it.b); put(e, 'opacity', f3(Math.sin(Math.PI * u))); put(e, 'transform', `scaleX(${(.2 + .8 * Math.sin(Math.PI * u * .5)).toFixed(3)})`); return }
    if (k === 'press') { const u = Math.sin(Math.PI * S(p, it.a, it.b)); put(e, 'transform', `scale(${(1 - .045 * u).toFixed(3)})`); put(e, 'filter', `brightness(${(1 + .35 * u).toFixed(3)})`) }
  }
  const win = (p: number, a: number, b: number, r = .008) => S(p, a, a + r) * (1 - S(p, b - r, b))
  function faceAt(p: number) {
    let f = 'idle'
    REQ.forEach((r) => { if (p >= r.a && p < r.b + .012) f = 'listen'; else if (p >= r.b + .012 && p < r.c + .012) f = 'think' })
    if ((p >= .17 && p < .30) || (p >= .375 && p < .57) || (p >= .645 && p < .77)) f = 'act'
    if (p >= .82 && p < .872) f = 'appr'; else if (p >= .872 && p < .906) f = 'done'
    if (p >= LT[4] && p < LT[4] + .016) f = 'worried'
    if (p >= .985) f = 'done'
    return f
  }
  const alongPath = (L: Pt[], u: number): Pt => { const k = u * (L.length - 1), a = Math.floor(k), f = k - a, A = L[a], B = L[Math.min(L.length - 1, a + 1)]; return [lerp(A[0], B[0], f), lerp(A[1], B[1], f)] }
  // Where the budget is unlimited the blur stays on for good (hidden objects cost nothing), so no layer is created in the middle of a scroll.
  const setBlur = (el: HTMLElement & { _b?: boolean }, on: boolean) => { if (!mobile()) { if (!el._b) { el._b = true; el.classList.add('bf') } return } if (el._b !== on) { el._b = on; el.classList.toggle('bf', on) } }

  // ---------- The scene: everything that depends only on the scroll position ----------
  let lastIdle = -1
  function scene(p: number, sy: number) {
    // core, kicked by every request that reaches it
    const Cp = poseAt(K.core as Keys, p)
    let kk = 0
    REQ.forEach((r) => { kk += Math.sin(Math.PI * S(p, r.c - .004, r.c + .022)) })
    put(W.core, 'transform', `translate3d(${Cp.x.toFixed(1)}px,${Cp.y.toFixed(1)}px,0) scale(${Cp.s.toFixed(4)})`)
    put(W.kick, 'transform', `scale(${(1 + .22 * kk).toFixed(4)})`)
    // rings: one lit per action
    const ev = [...LEV]
    C.led.r.forEach((r, i) => ev.push([r[4], LT[i] + .002, LT[i] + .02]))
    const lit = [0, 0, 0, 0]
    ev.forEach((e) => { lit[e[0]] = Math.max(lit[e[0]], win(p, e[1], e[2], .01)) })
    const fc = faceAt(p)
    if (W.orbF !== fc) { W.orbF = fc; W.orbImgs.forEach((i: HTMLImageElement) => i.classList.toggle('on', i.dataset.f === fc)) }
    W.lit.forEach((e: HTMLElement, i: number) => put(e, 'opacity', lit[i].toFixed(3)))
    if (p > .905) {
      const lv = [0, 0, 0, 0]
      C.led.r.forEach((r, i) => { if (p >= LT[i] && p < LT[i] + .012) lv[r[4]] = 1 })
      W.lvEls.forEach((e: HTMLElement & { _on?: boolean }, i: number) => { const on = lv[i] === 1; if (e._on !== on) { e._on = on; e.classList.toggle('on', on); e.classList.toggle('rd', i === 3) } })
    }
    // nodes
    W.nd.forEach((e: HTMLElement, i: number) => {
      const P = poseAt((K.n as Keys[])[i], p)
      put(e, 'transform', `translate3d(${P.x.toFixed(1)}px,${P.y.toFixed(1)}px,0)`); put(e, 'opacity', f3(P.o))
      const r = REQ.reduce((m, q) => q.n === i ? Math.max(m, win(p, q.a, q.c, .012)) : m, 0)
      put(e.firstElementChild!.nextElementSibling as HTMLElement, 'opacity', f3(r))
      const lb = W.nl[i] as HTMLElement, lo = S(p, .09, .11) * (1 - S(p, .965, .975))
      put(lb, 'opacity', f3(lo)); put(lb, 'visibility', lo <= 0 ? 'hidden' : 'visible'); put(lb, 'transform', `translate3d(${W.nlXY[i][0].toFixed(1)}px,${W.nlXY[i][1].toFixed(1)}px,0)`)
    })
    // glass objects. On a phone at most two layers blur at once; the earlier objects of the story keep it first.
    let budget = mobile() ? 2 : 99
    PNL.forEach((n) => {
      const P = poseAt(K[n] as Keys, p), d = W.pn[n], e = d.el as HTMLElement
      d.o = P.o
      put(e, 'transform', `translate3d(${(P.x - d.w / 2).toFixed(2)}px,${(P.y - d.h / 2).toFixed(2)}px,0) scale(${P.s.toFixed(4)})`)
      put(e, 'opacity', f3(P.o)); put(e, 'visibility', P.o < .01 ? 'hidden' : 'visible')
      const want = P.o > .02 && budget > 0
      if (P.o > .02) budget--
      setBlur(e, want)
    })
    RV.forEach((it) => { if (it.pn && W.pn[it.pn].o < .01) return; applyRV(it, p) })
    put(W.gfl, 'opacity', f3(Math.sin(Math.PI * S(p, .862, .89))))
    // requests: a frosted bubble at the channel, then light along the thread into the core
    let ra = -1, rv = 0
    REQ.forEach((r, i) => { const v = win(p, r.a, r.b + .012, .012); if (v > rv) { rv = v; ra = i } })
    const rb = W.rqb as HTMLElement & { _i?: number }
    if (ra >= 0 && rv > 0 && !RM) {
      const r = REQ[ra]
      if (rb._i !== ra) { rb._i = ra; rb.textContent = C.req[ra] }
      const n = W.nodes[r.n], d = W.bub[r.n], tin = EO(S(p, r.a, r.a + .014)), tout = EO(S(p, r.b, r.b + .014)), u = tin * (1 - tout)
      const sc = .4 + .6 * u, x = lerp(n[0] - W.bw * .2, d[0], u), y = lerp(n[1] - 20, d[1], u)
      put(rb, 'transform', `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${sc.toFixed(3)})`); put(rb, 'opacity', f3(cl((u - .7) / .25))); put(rb, 'visibility', 'visible')
      setBlur(rb, budget > 0)
    } else { put(rb, 'visibility', 'hidden'); put(rb, 'opacity', '0'); setBlur(rb, false) }
    let pu = 0, pa = -1
    REQ.forEach((r, i) => { const u = S(p, r.b + .004, r.c); if (u > 0 && u < 1) { pa = i; pu = u } })
    const pr = W.pur as HTMLElement
    if (pa >= 0 && !RM) {
      const A = alongPath(W.PL.n[REQ[pa].n], EO(pu))
      put(pr, 'transform', `translate3d(${A[0].toFixed(1)}px,${A[1].toFixed(1)}px,0)`); put(pr, 'opacity', f3(Math.min(1, Math.sin(Math.PI * pu) * 2)))
    } else put(pr, 'opacity', '0')
    pr.classList.add('v')
    // hero
    const io = S(p, .004, .045)
    put(W.intro, 'opacity', RM ? '1' : f3(1 - io)); put(W.intro, 'visibility', !RM && io >= 1 ? 'hidden' : 'visible')
    const hh = RM ? 1 : 1 - S(p, .02, .06)
    W.thH.forEach((e: HTMLElement) => put(e as HTMLElement, 'opacity', f3(hh)))
    const sho = RM ? 1 : 1 - S(p, .012, .06)
    W.sh.forEach((e: HTMLElement) => { put(e, 'opacity', f3(sho)); put(e, 'visibility', sho <= 0 ? 'hidden' : 'visible') })
    const so = RM ? 0 : S(p, .07, .11)
    W.thN.forEach((e: HTMLElement) => put(e, 'opacity', f3(so * (1 - S(p, .965, .98)))))
    PNL.forEach((n, i) => { const P = PN[n], v = RM ? 0 : S(p, P.i[0], P.i[0] + .012) * (1 - S(p, P.o[0], P.o[0] + .014)); W.thG[i].forEach((e: HTMLElement) => put(e, 'opacity', f3(v))) })
    // depth: three layers drift at different rates, light passes behind the glass
    put(W.cont, 'transform', `translate3d(0,${(-p * 160).toFixed(1)}px,0)`); put(W.d1, 'transform', `translate3d(0,${(-p * 120).toFixed(1)}px,0)`); put(W.d2, 'transform', `translate3d(0,${(-p * 260).toFixed(1)}px,0)`)
    const lx = lerp(W.hc.x, W.l1[0], S(p, .03, .12)), ly = lerp(W.hc.y, W.l1[1], S(p, .03, .12))
    put(W.lw1, 'transform', `translate3d(${lx.toFixed(1)}px,${(ly - p * 90).toFixed(1)}px,0)`)
    put(W.lw2, 'transform', `translate3d(${W.l2[0].toFixed(1)}px,${(W.l2[1] - p * 150).toFixed(1)}px,0)`)
    const vis = (n: string) => { const P = PN[n]; return S(p, P.i[0], P.i[0] + .015) * (1 - S(p, P.o[0], P.o[0] + .02)) }
    const v4 = [vis('tbl'), vis('gde'), vis('aud'), Math.max(vis('gat'), vis('led'))]
    W.lc.forEach((e: HTMLElement, i: number) => put(e, 'opacity', f3(v4[i])))
    put(W.lw3, 'transform', `translate3d(${W.l1[0].toFixed(1)}px,${(W.l1[1] - p * 90).toFixed(1)}px,0)`)
    put(W.lt1, 'opacity', (.65 * (1 - S(p, .965, .995)) + .25).toFixed(3))
    const eo = S(p, .985, .999) * (1 - S(sy, W.top + W.span, W.top + W.span + W.vh * .3))
    put(W.end, 'opacity', RM ? '0' : f3(eo)); put(W.end, 'visibility', eo > 0 && !RM ? 'visible' : 'hidden')
    TG.forEach((el, i) => {
      if (RM) { put(el, 'visibility', 'hidden'); return }
      const t = TAGS[i], a = t[2], b = t[3], inn = EO(S(p, a, a + .018)), o2 = S(p, b - .008, b), o = inn * (1 - o2)
      put(el, 'opacity', f3(o))
      if (o <= 0) { put(el, 'visibility', 'hidden'); return }
      put(el, 'visibility', 'visible')
      put(el, 'transform', `translate3d(${W.tagXY[i][0].toFixed(1)}px,${(W.tagXY[i][1] + (1 - inn) * 6).toFixed(1)}px,0)`)
    })
    const idle = sy > W.top + W.span ? 1 : 0
    if (idle !== lastIdle) { lastIdle = idle; root.classList.toggle('idle', !!idle) }
  }

  // ---------- Ambient light along the threads: tiny, and it only moves translate and opacity ----------
  function ambient(p: number, T: number) {
    if (RM) return
    const hh = 1 - S(p, .02, .06)
    for (let i = 0; i < 3; i++) {
      const u = (T * .3 + i * .34) % 1, A = alongPath(W.PL.h[i], u), pe = W.pu[i] as HTMLElement
      put(pe, 'transform', `translate3d(${A[0].toFixed(1)}px,${A[1].toFixed(1)}px,0)`); put(pe, 'opacity', (hh * Math.sin(Math.PI * u)).toFixed(3))
    }
    let bi = -1, bv = 0
    PNL.forEach((n, i) => { const P = PN[n], v = S(p, P.i[0], P.i[0] + .012) * (1 - S(p, P.o[0], P.o[0] + .014)); if (v > bv) { bv = v; bi = i } })
    const pe = W.pus as HTMLElement & { _c?: string }
    if (bi >= 0 && hh < .5) {
      const u = (T * .42) % 1, A = alongPath(W.PL.g[bi], u), cls = 'pu ' + ['c', 'p', 'k', 'v', 'v'][bi]
      if (pe._c !== cls) { pe._c = cls; pe.className = cls }
      put(pe, 'transform', `translate3d(${A[0].toFixed(1)}px,${A[1].toFixed(1)}px,0)`); put(pe, 'opacity', (bv * Math.sin(Math.PI * u)).toFixed(3))
    } else put(pe, 'opacity', '0')
  }

  // ---------- One rAF, one damped scroll value ----------
  let target = 0, cur = 0, raf = 0, prev = 0, sy = 0, drawnP = -1, drawnY = -1
  const readScroll = () => { sy = scrollY; target = RM ? 0 : cl((sy - W.top) / W.range) }
  function draw(now: number) {
    if (cur !== drawnP || sy !== drawnY) { drawnP = cur; drawnY = sy; scene(cur, sy) }
    ambient(cur, now / 1000)
  }
  function tick(now: number) {
    raf = 0
    const dt = Math.min(64, now - prev)
    prev = now
    const d = target - cur
    if (Math.abs(d) < .00004) cur = target; else cur += d * (1 - Math.exp(-dt / 130))
    draw(now)
    if (cur !== target) { root.classList.add('moving'); raf = requestAnimationFrame(tick); return }
    root.classList.remove('moving')
    if (!RM && cur < .99 && !document.hidden && !root.classList.contains('idle')) raf = requestAnimationFrame(tick)
  }
  function wake() {
    if (disposed) return
    readScroll()
    if (raf) return
    prev = performance.now()
    raf = requestAnimationFrame(tick)
  }
  const redraw = () => { readScroll(); cur = target; drawnP = -1; draw(performance.now()) }

  build()
  redraw()
  if (!RM) wake()

  // Resize: a new width or a real height change rebuilds the page. The small height changes of a phone's address bar do not.
  let sizeW = innerWidth, sizeH = innerHeight, sizeRaf = 0
  addEventListener('resize', () => {
    if (sizeRaf) return
    sizeRaf = requestAnimationFrame(() => {
      sizeRaf = 0
      if (innerWidth === sizeW && Math.abs(innerHeight - sizeH) < 140) return
      sizeW = innerWidth; sizeH = innerHeight
      build(); redraw(); if (!RM) wake()
    })
  }, { signal })
  if (!RM) addEventListener('scroll', wake, { passive: true, signal })
  document.addEventListener('visibilitychange', () => {
    root.classList.toggle('idle', document.hidden)
    lastIdle = -1
    if (!document.hidden) wake()
  }, { signal })
  document.fonts.ready.then(() => { if (disposed) return; layout(); redraw() })

  // ---------- Entrance: a request, then Maiden's reply, then the core wakes ----------
  const OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
  function heroIn(off: number) {
    if (RM || disposed) return
    const A = (el: Element, fr: Keyframe[], o: KeyframeAnimationOptions) => el.animate(fr, { fill: 'backwards', easing: OUT, ...o, delay: (o.delay as number || 0) + off })
    A($('wm'), [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: 0 })
    A($('rq'), [{ opacity: 0, transform: 'translateX(-10px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: 60 })
    const rbE = $('rb'); rbE.style.transformOrigin = '100% 100%'
    A(rbE, [{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'none' }], { duration: 340, delay: 560 })
    const ws = $$('.rb h1 .w')
    ws.forEach((w, i) => A(w, [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 320, delay: 760 + i * 38 }))
    A($('meta'), [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 360, delay: 760 + ws.length * 38 + 60 })
    A(W.core, [{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay: 200, easing: 'ease' })
    W.nd.forEach((n: HTMLElement, i: number) => A(n, [{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: 700 + i * 120, easing: 'ease' }))
    W.sh.forEach((n: HTMLElement, i: number) => A(n, [{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 600 + i * 140, easing: 'ease' }))
    A(W.con, [{ opacity: 0 }, { opacity: 1 }], { duration: 800, delay: 800, easing: 'ease' })
  }
  const stage = $('stage')
  const flight = first && !reduce ? takeFlight('maiden-os') : null
  if (reduce && first) { const f = takeFlight('maiden-os'); if (f) cancelFlight(f) }
  if (flight) {
    // The card's night grows into this page; the stage appears over it and the hero speaks as it lands.
    stage.style.opacity = '0'
    const wait = Math.max(0, 520 - (performance.now() - flight.t0))
    heroIn(wait + 1150 - 380)
    playFlight(flight, { sheetClass: 'mo-sheet', stage, signal })
  } else if (first && !reduce) {
    stage.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 480, easing: 'ease' })
    heroIn(0)
  }

  return () => {
    disposed = true
    ac.abort()
    cancelAnimationFrame(raf); cancelAnimationFrame(sizeRaf)
    root.getAnimations({ subtree: true }).forEach((a) => a.cancel())
    root.classList.remove('rm', 'moving', 'idle')
    root.style.removeProperty('--nz')
    root.replaceChildren()
  }
}
