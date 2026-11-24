import type { Mount } from '../../home/useMount'
import type { ProjectData } from '../types'
import { takeFlight, playFlight, cancelFlight } from '../cardFlight'
import { COPY, HERO, REPO, podRows } from './data'
import './galaxy.css'
import dMp4 from './assets/galaxy-d.mp4'
import dWebm from './assets/galaxy-d.webm'
import mMp4 from './assets/galaxy-m.mp4'
import mWebm from './assets/galaxy-m.webm'
import dPoster from './assets/galaxy-d-poster.webp'
import mPoster from './assets/galaxy-m-poster.webp'
import dHPoster from './assets/galaxy-d-hposter.webp'
import mHPoster from './assets/galaxy-m-hposter.webp'
import heroDMp4 from './assets/galaxy-hero-d.mp4'
import heroDWebm from './assets/galaxy-hero-d.webm'
import heroMMp4 from './assets/galaxy-hero-m.mp4'
import heroMWebm from './assets/galaxy-hero-m.webm'

// The scroll story of Porter Galaxy: the live galaxy in the hero with the headline traced as a constellation, a Pod list that turns into
// the galaxy, and the real app recording scrubbed by scroll. One rAF drives one damped scroll value and stops when it settles. Layout is
// read on load and on resize; the frame loop only writes transform, opacity and visibility.

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
const EIO = bez(0.77, 0, 0.175, 1), EO = bez(0.23, 1, 0.32, 1)

function rng(seed: number) { let s = seed; return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 } }

// The window at its natural size, and the beats of the story.
const NATD: [number, number] = [1280, 800], NATM: [number, number] = [460, 760]
const VDUR = { d: 22.04, m: 20.52 } // seconds of the real recording
const B = { fly: [.012, .085], winIn: [.055, .11], morph: [.17, .26], vid: [.22, .27], v0: .27, v1: .87, out: [.87, .91], end: [.91, .96] }
type TagKey = 'list' | 'd3' | 'topo' | 'find' | 'where' | 'live'
const TAGSD: [TagKey, number, number][] = [['list', .138, .205], ['d3', .218, .268], ['topo', .280, .355], ['find', .372, .515], ['where', .585, .74], ['live', .752, .862]]
const TAGSM: [TagKey, number, number][] = [['list', .138, .205], ['d3', .218, .268], ['topo', .280, .545], ['where', .575, .735], ['live', .748, .862]]
const GAP = 40, SIDE = 24, TOP = 76

interface Pose { x: number; y: number; s: number; o: number }
interface Pt { dx: number; dy: number; ord: number }
interface World {
  por: boolean; k: 'd' | 'm'; NAT: [number, number]; tags: [TagKey, number, number][]
  RH: number; HD: number
  vw: number; vh: number; top: number; span: number; hold: number; range: number
  main: Pose; keys: [number, Pose][]
  tagX: number[]; tagY: number[]
  off: number; dIdx: Map<number, number>; dT: Pt[]
  dur: number
}

export const mountGalaxy: Mount<ProjectData> = (root, { lang, first }, { reduce }) => {
  const ac = new AbortController()
  const { signal } = ac
  const C = COPY[lang]
  let disposed = false
  root.classList.toggle('rm', reduce)

  const ROWS = podRows(64)
  const W = {} as World
  let el = {} as {
    track: HTMLElement; stage: HTMLElement; world: HTMLElement; gh: SVGSVGElement; intro: HTMLElement; con: SVGSVGElement; plate: HTMLElement; vh: HTMLVideoElement
    win: HTMLElement; vwr: HTMLElement; vid: HTMLVideoElement | null; ls: HTMLElement; tx: HTMLElement; dt: HTMLElement; hd: HTMLElement
    end: HTMLElement; objs: HTMLElement; d: HTMLElement[]; tags: HTMLElement[]; pa: HTMLCanvasElement[]; neb: HTMLElement[]
  }

  // ---------- Writes that skip what did not change ----------
  const last = new WeakMap<Element, Record<string, string>>()
  function put(e: HTMLElement | SVGElement, key: 'transform' | 'opacity' | 'visibility', v: string) {
    let m = last.get(e)
    if (!m) { m = {}; last.set(e, m) }
    if (m[key] === v) return
    m[key] = v
    e.style[key] = v
  }

  // ---------- Markup ----------
  const icon = {
    k8s: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.2"/><path d="M12 3.5v6.3M12 14.2v6.3M3.9 8l5.7 2.7M14.4 13.3l5.7 2.7M4.4 17l5.5-3.2M14.1 10.2l5.5-3.2"/>',
    web: '<circle cx="12" cy="12" r="8.5"/><ellipse cx="12" cy="12" rx="3.8" ry="8.5"/><path d="M3.5 12h17"/>',
  }
  let raf = 0, sizeRaf = 0, prev = 0
  let target = 0, ps = 0, sy = 0
  let lastSeek = 0, vt = -1, primed = false

  function build() {
    const por = innerWidth / innerHeight < 1
    const k: 'd' | 'm' = por ? 'm' : 'd'
    W.por = por; W.k = k; W.NAT = por ? NATM : NATD; W.tags = por ? TAGSM : TAGSD
    const NAT = W.NAT
    const RH = por ? 32 : 28, HD = por ? 64 : 78, PL = por ? 44 : 62
    W.RH = RH; W.HD = HD
    const hdc = por ? C.hdm : C.hd
    const cols = por ? ['c2', 'c4'] : ['c1', 'c2', 'c3', 'c4', 'c5', '']
    const hd = `<div class="hd" style="padding-left:${PL}px;${por ? 'font-size:14px;height:64px;padding-top:24px' : ''}">${hdc.map((t, i) => `<span class="${cols[i]}">${t}</span>`).join('')}</div>`
    const rows = ROWS.map((r, i) => `<div class="r" style="top:${HD + i * RH}px;padding-left:${PL}px;${por ? 'font-size:15px;height:32px' : ''}">${por
      ? `<span class="c2">${r.nm}</span><span class="c4" style="color:${r.c}">${r.st}</span>`
      : `<span class="c1">${r.ns}</span><span class="c2">${r.nm}</span><span class="c3">${r.rd}</span><span class="c4" style="color:${r.c}">${r.st}</span><span class="c5">${r.rs}</span><span>${r.age}</span>`}</div>`).join('')
    const dots = ROWS.map((r, i) => `<i class="d" style="left:${por ? 20 : 34}px;top:${HD + i * RH + RH / 2}px;color:${r.c};background:${r.c}"></i>`).join('')
    const scrub = por ? { mp4: mMp4, webm: mWebm, poster: mPoster } : { mp4: dMp4, webm: dWebm, poster: dPoster }
    const heroV = por ? { mp4: heroMMp4, webm: heroMWebm, poster: mHPoster } : { mp4: heroDMp4, webm: heroDWebm, poster: dHPoster }
    // Only the size-matching recording is ever requested. Reduced motion shows the hero alone, so it never asks for the scrub video.
    const video = reduce ? '' : `<video class="vid" muted playsinline preload="metadata" poster="${scrub.poster}" aria-hidden="true"><source src="${scrub.mp4}" type="video/mp4"><source src="${scrub.webm}" type="video/webm"></video>`
    root.innerHTML = `<div class="track"><div class="stage">
  <div class="world"></div>
  <svg class="gh" aria-hidden="true"></svg>
  <div class="plateh"><div class="plate"><video class="vh" muted loop ${reduce ? '' : 'autoplay'} playsinline preload="auto" poster="${heroV.poster}" aria-hidden="true"><source src="${heroV.mp4}" type="video/mp4"><source src="${heroV.webm}" type="video/webm"></video>${HERO[k].tick.map((t, i) => `<i class="tk" style="left:${t[0] * 100}%;top:${t[1] * 100}%;animation-delay:${(i * .57).toFixed(2)}s"></i>`).join('')}</div></div>
  <svg class="con" aria-hidden="true"></svg>
  <div class="intro"><p class="nm">Porter Galaxy</p><h1>${C.head.split(' ').map((w) => `<span class="w">${w} </span>`).join('')}</h1><p class="meta"><span>${C.price}, ${C.note.toLowerCase()}</span><span class="pl"><svg viewBox="0 0 24 24" aria-hidden="true">${icon.k8s}</svg>Kubernetes</span><span class="pl"><svg viewBox="0 0 24 24" aria-hidden="true">${icon.web}</svg>Web</span></p><a class="gbtn" href="${REPO}" target="_blank" rel="noopener">${C.cta}</a></div>
  <div class="objs"><div class="obj win" style="width:${NAT[0]}px;height:${NAT[1]}px"><i class="under"></i><div class="fr"><div class="ls">${hd}<div class="tx">${rows}</div><div class="dt">${dots}</div></div><div class="vw">${video}</div></div></div></div>
  <div class="tags">${W.tags.map((t) => `<div class="tag">${C.t[t[0]]}</div>`).join('')}</div>
  <div class="end"><h2>${C.price}</h2><p>${C.plat}</p><a class="gbtn" href="${REPO}" target="_blank" rel="noopener">${C.cta}</a></div>
</div></div>
<section class="rmcta"><div class="in"><h2>${C.price}</h2><p>${C.plat}</p><a class="gbtn" href="${REPO}" target="_blank" rel="noopener">${C.cta}</a></div></section>`
    const q = <E extends Element>(s: string) => root.querySelector(s) as E
    el = {
      track: q('.track'), stage: q('.stage'), world: q('.world'), gh: q('.gh'), intro: q('.intro'), con: q('.con'), plate: q('.plate'), vh: q('.vh'),
      win: q('.win'), vwr: q('.vw'), vid: root.querySelector('.vid'), ls: q('.ls'), tx: q('.tx'), dt: q('.dt'), hd: q('.hd'),
      end: q('.end'), objs: q('.objs'), d: [], tags: [...root.querySelectorAll<HTMLElement>('.tag')], pa: [], neb: [],
    }
    el.d = [...el.dt.children] as HTMLElement[]
    // Far and near star layers, and three glows: depth through different drift.
    el.world.innerHTML = '<i class="neb"></i><i class="neb"></i><i class="neb"></i><canvas class="pa"></canvas><canvas class="pa"></canvas>'
    el.pa = [...el.world.querySelectorAll<HTMLCanvasElement>('canvas')]
    el.neb = [...el.world.querySelectorAll<HTMLElement>('.neb')]
    el.neb.forEach((n) => { n.dataset.i = '' })
    starLayers()
    if (el.vid) {
      el.vid.addEventListener('loadedmetadata', () => { W.dur = el.vid!.duration || VDUR[W.k]; kick() }, { signal })
    }
    W.dur = VDUR[k]
    el.vh.addEventListener('error', () => {}, { signal })
    layout()
    if (reduce) frame(.41)
    else { readScroll(); ps = target; frame(ps) }
  }

  function starLayers() {
    const vw = innerWidth, vh = innerHeight
    ;([[.00012, .5, .28, 1], [.00005, .9, .55, 2]] as const).forEach(([dens, , al, seed], idx) => {
      const c = el.pa[idx], h = Math.round(vh * 1.5)
      c.width = vw; c.height = h; c.style.height = h + 'px'
      const g = c.getContext('2d')!, r = rng(seed * 13 + 3)
      const n = Math.round(vw * h * dens * (seed === 1 ? 5 : 1.2))
      for (let i = 0; i < n; i++) {
        const x = r() * vw, y = r() * h, big = r() > .9, a = al * (.4 + r() * .6), cool = r() > .55
        if (seed === 2 && big) { const gr = g.createRadialGradient(x, y, 0, x, y, 7); gr.addColorStop(0, `rgba(180,205,255,${a})`); gr.addColorStop(1, 'rgba(180,205,255,0)'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, 7, 0, 7); g.fill() }
        g.fillStyle = cool ? `rgba(190,212,255,${a})` : `rgba(255,244,225,${a})`
        g.beginPath(); g.arc(x, y, (big ? 1.4 : .7) * (seed === 2 ? 1.25 : 1) * (.6 + r() * .6), 0, 7); g.fill()
      }
    })
  }

  function poseT(P: Pose) {
    const [w, h] = W.NAT
    return `translate3d(${(P.x - w / 2).toFixed(2)}px,${(P.y - h / 2).toFixed(2)}px,0) scale(${P.s.toFixed(4)})`
  }

  // ---------- Layout: every layout read happens here ----------
  function layout() {
    const vh = innerHeight, vw = innerWidth, por = W.por, NAT = W.NAT, k = W.k
    el.stage.style.height = vh + 'px'
    el.track.style.height = (vh * (por ? 15 : 14)) + 'px'
    W.vw = vw; W.vh = vh
    W.top = el.track.getBoundingClientRect().top + scrollY
    W.span = el.track.offsetHeight - vh
    W.hold = por ? vh * .4 : vh * .5
    W.range = Math.max(1, W.span - W.hold)
    const LH = vw < 420 ? 44 : 22
    const AW = vw - 2 * SIDE
    const aTop = TOP + 4, aBot = vh - SIDE - LH - GAP
    const sc = Math.min(AW / NAT[0], (aBot - aTop) / NAT[1]) * (por ? 1 : .96)
    const main: Pose = { x: vw / 2, y: aTop + (aBot - aTop) / 2, s: sc, o: 1 }
    W.main = main
    const z = (P: Pose, o: number, s?: number): Pose => ({ ...P, o, s: s ? P.s * s : P.s })
    W.keys = [[0, z(main, 0, .9)], [B.winIn[0], z(main, 0, .9)], [B.winIn[1], main], [B.out[0], main], [B.out[1], z(main, 0, .88)], [1, z(main, 0, .88)]]
    // The hero plate: the live galaxy, placed so the ring sits to the right or below the words.
    const H = HERO[k], pw = por ? (vw - 2 * SIDE) / .94 : vw * (vw < 1200 ? .86 : .92), ph = pw * (por ? 1140 / 690 : 1000 / 1600)
    let tcx: number, tcy: number
    if (por) { const ib = el.intro.getBoundingClientRect().bottom; tcx = vw * .5; tcy = ib + (vh - SIDE - ib) * .52 }
    else { tcx = vw - SIDE - H.ell[2] * pw; tcy = vh * .64 + 8 }
    const pl = tcx - H.ell[0] * pw, pt = tcy - H.ell[1] * ph
    Object.assign(el.plate.style, { width: pw + 'px', height: ph + 'px', left: pl + 'px', top: pt + 'px' })
    el.plate.style.setProperty('--ox', (H.ell[0] * 100) + '%'); el.plate.style.setProperty('--oy', (H.ell[1] * 100) + '%')
    // Constellation: baselines under the headline, words as stars, three lines reaching real pods.
    type WordBox = { l: number; r: number; t: number; b: number }
    const words: WordBox[] = [...el.intro.querySelectorAll<HTMLElement>('h1 .w')].map((e) => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right - 6, t: r.top, b: r.bottom } })
    const lines: { l: number; r: number; t: number; b: number; w: WordBox[] }[] = []
    words.forEach((w) => { const L = lines.find((l) => Math.abs(l.t - w.t) < 6); if (L) { L.r = Math.max(L.r, w.r); L.w.push(w) } else lines.push({ l: w.l, r: w.r, t: w.t, b: w.b, w: [w] }) })
    const podp = H.pods.map((q) => [pl + q[0] * pw, pt + q[1] * ph])
    let svg = ''
    const used = new Set<number>()
    lines.forEach((L, i) => {
      const y = L.b - 3
      svg += `<path class="bl" d="M${L.l.toFixed(1)} ${y.toFixed(1)}H${L.r.toFixed(1)}"/>`
      L.w.forEach((w) => { svg += `<circle class="st" cx="${w.l.toFixed(1)}" cy="${y.toFixed(1)}" r="2"/>` })
      svg += `<circle class="st" cx="${L.r.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6"/>`
      let bi = -1, bd = 1e9
      podp.forEach((q, j) => { if (used.has(j)) return; const d = Math.hypot(q[0] - L.r, q[1] - y); if (d < bd) { bd = d; bi = j } })
      if (bi >= 0 && i < 3) {
        used.add(bi)
        const q = podp[bi]
        if (por) {
          // Along the line's own baseline to the right margin, then straight down: never across the words below.
          const gx = vw - 8 - i * 4
          svg += `<path class="ln" d="M${L.r.toFixed(1)} ${y.toFixed(1)}H${gx}V${(q[1] - 40 - i * 8).toFixed(1)}L${q[0].toFixed(1)} ${(q[1] - 6).toFixed(1)}"/><circle class="st" cx="${gx}" cy="${y.toFixed(1)}" r="1.8"/>`
        } else {
          const mx = (L.r + q[0]) / 2, my = Math.min(y, q[1]) - 18 - i * 10
          svg += `<path class="ln" d="M${L.r.toFixed(1)} ${y.toFixed(1)}L${mx.toFixed(1)} ${my.toFixed(1)}L${q[0].toFixed(1)} ${(q[1] - 6).toFixed(1)}"/><circle class="st" cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="1.8"/>`
        }
      }
    })
    el.con.innerHTML = svg
    // Ghost galaxy: the ring of pods, faint, so the hand-offs between the hero, the list and the closing never show an empty sky.
    {
      const ss = main.s, gcx = main.x, gcy = main.y + NAT[1] * .12 * ss, grx = NAT[0] * (por ? .40 : .33) * ss, gry = NAT[1] * (por ? .20 : .29) * ss
      let gs = 11
      const gr = () => (gs = (gs * 1664525 + 1013904223) % 4294967296) / 4294967296
      const cols = ['95,240,176', '95,240,176', '95,240,176', '255,200,87', '120,170,255', '190,150,255']
      let g = `<ellipse cx="${gcx.toFixed(1)}" cy="${gcy.toFixed(1)}" rx="${grx.toFixed(1)}" ry="${gry.toFixed(1)}" fill="none" stroke="rgba(150,190,255,.16)" stroke-width="1"/>`
      for (let i = 0; i < 64; i++) {
        const a = (i / 64) * Math.PI * 2 + gr() * .08, rr = 1 + (gr() - .5) * .07
        const x = gcx + Math.cos(a) * grx * rr, y = gcy + Math.sin(a) * gry * rr, c = cols[Math.floor(gr() * cols.length)], r = (por ? 2.2 : 3) * (.6 + gr() * .9)
        g += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="rgba(${c},.85)"/>`
        if (i % 9 === 0) g += `<path d="M${gcx.toFixed(1)} ${(gcy - gry).toFixed(1)}L${x.toFixed(1)} ${y.toFixed(1)}" stroke="rgba(170,205,255,.18)" stroke-width="1" fill="none"/>`
      }
      el.gh.innerHTML = g
    }
    // Labels: placed from the real, transformed rectangle of the window in its main pose.
    put(el.win, 'transform', poseT(main)); put(el.win, 'opacity', '1'); put(el.win, 'visibility', 'visible')
    const r = el.win.getBoundingClientRect()
    W.tagX = []; W.tagY = []
    el.tags.forEach((t, i) => { const tl = t.offsetWidth; W.tagX[i] = (r.left + r.right) / 2 - tl / 2; W.tagY[i] = r.bottom + GAP })
    put(el.win, 'opacity', '0'); put(el.win, 'visibility', 'hidden')
    // Dots: from their rows (when the list rests) to places on the ring of the galaxy.
    const RH = W.RH, HD = W.HD, off = por ? 110 : 150
    W.off = off
    const visBot = NAT[1] - 24
    const idx: number[] = []
    ROWS.forEach((_, i) => { const y = HD + i * RH + RH / 2 - off; if (y > HD + 8 && y < visBot) idx.push(i) })
    W.dIdx = new Map(idx.map((v, j) => [v, j]))
    const cx = NAT[0] * .5, cy = NAT[1] * .62, rx = NAT[0] * (por ? .40 : .33), ry = NAT[1] * (por ? .20 : .29)
    let sd = 5
    const rn = () => (sd = (sd * 1664525 + 1013904223) % 4294967296) / 4294967296
    W.dT = idx.map((i, j) => {
      const a = (j / idx.length) * Math.PI * 2 + rn() * .3 + .4, rr = 1 + (rn() - .5) * .08
      const tx = cx + Math.cos(a) * rx * rr, ty = cy + Math.sin(a) * ry * rr
      const sx = por ? 20 : 34, sy2 = HD + i * RH + RH / 2 - off
      return { dx: tx - sx, dy: ty - sy2, ord: j / idx.length }
    })
    el.neb.forEach((n) => { n.dataset.i = '' })
  }

  // ---------- The frame ----------
  function poseAt(p: number): Pose {
    const keys = W.keys
    let i = 0
    while (i < keys.length - 2 && p > keys[i + 1][0]) i++
    const a = keys[i], b = keys[i + 1], t = EIO(S(p, a[0], b[0])), A = a[1], Bb = b[1]
    return { x: A.x + (Bb.x - A.x) * t, y: A.y + (Bb.y - A.y) * t, s: A.s + (Bb.s - A.s) * t, o: A.o + (Bb.o - A.o) * t }
  }
  function seek(t: number) {
    const v = el.vid
    if (!v || v.readyState < 1) return
    const now = performance.now()
    if (Math.abs(t - vt) < .02) return
    if (v.seeking && now - lastSeek < 70) return
    vt = t; lastSeek = now
    try { v.currentTime = t } catch { /* the recording is not ready yet */ }
  }
  let heroOn = true
  const NB: [number, number, number, string, number, number][] = [[.62, .18, .34, 'rgba(70,120,255,.40)', -40, .9], [.10, .78, .42, 'rgba(150,90,255,.30)', 60, 1.3], [.78, .74, .30, 'rgba(95,240,176,.20)', -80, 1.1]]

  function frame(p: number) {
    const por = W.por
    const P: Pose = reduce ? { ...W.main, o: 0 } : poseAt(p)
    put(el.win, 'transform', poseT(P)); put(el.win, 'opacity', P.o.toFixed(3)); put(el.win, 'visibility', P.o < .01 ? 'hidden' : 'visible')
    // Hero: words and constellation leave first, then you fly into the galaxy.
    const io = S(p, .004, .04)
    put(el.intro, 'opacity', reduce ? '1' : (1 - io).toFixed(3)); put(el.intro, 'visibility', !reduce && io >= 1 ? 'hidden' : 'visible')
    put(el.con, 'opacity', reduce ? '1' : (1 - S(p, .004, .035)).toFixed(3))
    const fl = S(p, B.fly[0], B.fly[1]), fe = reduce ? 0 : EIO(fl)
    put(el.plate, 'transform', `scale(${(1 + (por ? 1.1 : 1.0) * fe).toFixed(4)})`)
    const po = reduce ? 1 : 1 - S(fl, .35, 1)
    put(el.plate, 'opacity', po.toFixed(3)); put(el.plate, 'visibility', po > 0 ? 'visible' : 'hidden')
    if (!reduce) {
      const run = p < .09
      if (run !== heroOn) {
        heroOn = run
        root.classList.toggle('hero-off', !run)
        if (run) { const q = el.vh.play(); if (q && q.catch) q.catch(() => {}) } else el.vh.pause()
      }
    }
    const eo = S(p, B.end[0], B.end[1]) * (1 - S(sy, W.top + W.span, W.top + W.span + W.vh * .3))
    put(el.end, 'opacity', reduce ? '0' : eo.toFixed(3)); put(el.end, 'visibility', eo > 0 && !reduce ? 'visible' : 'hidden')
    // Depth: two star layers and three glows drift at different rates.
    put(el.pa[0], 'transform', `translate3d(0,${(-p * 70).toFixed(1)}px,0)`); put(el.pa[1], 'transform', `translate3d(0,${(-p * 190).toFixed(1)}px,0)`)
    const g = EIO(S(p, .18, .30)) * (1 - S(p, .88, .95))
    el.neb.forEach((n, i) => {
      const [fx, fy, fz, col, dr, sp] = NB[i]
      if (!n.dataset.i) {
        n.dataset.i = '1'
        const sz = Math.max(W.vw, W.vh) * fz * 2
        n.style.width = n.style.height = sz + 'px'
        n.style.left = (W.vw * fx - sz / 2) + 'px'; n.style.top = (W.vh * fy - sz / 2) + 'px'
        n.style.background = `radial-gradient(closest-side,${col},rgba(0,0,0,0))`
      }
      put(n, 'opacity', (reduce ? .6 : .25 + .75 * g).toFixed(3)); put(n, 'transform', `translate3d(0,${(-p * dr * sp).toFixed(1)}px,0)`)
    })
    // The ghost galaxy shows only in the two hand-offs: hero to list, and the recording to the closing.
    const gho = reduce ? 0 : .5 * (S(p, .05, .085) * (1 - S(p, .1, .135)) + S(p, .84, .875) * (1 - S(p, .925, .955)))
    put(el.gh, 'opacity', gho.toFixed(3)); put(el.gh, 'visibility', gho > 0 ? 'visible' : 'hidden')
    // The list: rests, scrolls, then every row's dot flies to the galaxy.
    const sc = EO(S(p, .09, .17)), off = W.off * (reduce ? 1 : sc)
    const lm = S(p, B.morph[0], B.morph[1])
    put(el.tx, 'transform', `translate3d(0,${(-off).toFixed(1)}px,0)`); put(el.dt, 'transform', `translate3d(0,${(-off).toFixed(1)}px,0)`)
    const txo = 1 - S(p, .15, .185)
    put(el.tx, 'opacity', reduce ? '0' : txo.toFixed(3)); put(el.hd, 'opacity', reduce ? '0' : txo.toFixed(3))
    el.d.forEach((d, i) => {
      const j = W.dIdx.get(i)
      if (j === undefined) { put(d, 'visibility', lm > 0 || reduce ? 'hidden' : 'visible'); return }
      const T = W.dT[j], a = T.ord * .035, e = EIO(S(lm, a, a + .62))
      put(d, 'transform', `translate3d(${(T.dx * e).toFixed(1)}px,${(T.dy * e).toFixed(1)}px,0) scale(${(1 + .15 * Math.sin(Math.PI * e)).toFixed(3)})`)
      put(d, 'opacity', reduce ? '0' : (1 - S(lm, .74, 1)).toFixed(3)); put(d, 'visibility', 'visible')
    })
    // The real galaxy fades in under them.
    const vo = reduce ? 1 : EO(S(p, B.vid[0], B.vid[1]))
    put(el.vwr, 'opacity', vo.toFixed(3)); put(el.vwr, 'visibility', vo > 0 ? 'visible' : 'hidden')
    put(el.ls, 'visibility', vo >= 1 ? 'hidden' : 'visible')
    const dur = W.dur || VDUR[W.k]
    if (vo > 0 && !reduce) seek(cl((p - B.v0) / (B.v1 - B.v0)) * (dur - .05))
    // Labels.
    el.tags.forEach((t, i) => {
      if (reduce) { put(t, 'visibility', 'hidden'); return }
      const [, a, b] = W.tags[i], inn = EO(S(p, a, a + .018)), out = S(p, b - .008, b), o = inn * (1 - out) * (P.o > .9 ? 1 : 0)
      put(t, 'opacity', o.toFixed(3))
      if (o <= 0) { put(t, 'visibility', 'hidden'); return }
      put(t, 'visibility', 'visible')
      put(t, 'transform', `translate3d(${W.tagX[i].toFixed(1)}px,${(W.tagY[i] + (1 - inn) * 6).toFixed(1)}px,0)`)
    })
  }

  // ---------- One rAF, one damped scroll value ----------
  function readScroll() { sy = scrollY; target = reduce ? .41 : cl((sy - W.top) / W.range) }
  function tick(now: number) {
    raf = 0
    const dt = Math.min(64, now - prev)
    prev = now
    const d = target - ps
    if (Math.abs(d) < .00004) { ps = target; frame(ps); root.classList.remove('moving'); return }
    ps += d * (1 - Math.exp(-dt / 130))
    frame(ps)
    raf = requestAnimationFrame(tick)
  }
  function kick() {
    if (disposed) return
    readScroll()
    if (reduce) { ps = target; frame(ps); return }
    if (target > 0) warm()
    if (raf) return
    root.classList.add('moving')
    prev = performance.now()
    raf = requestAnimationFrame(tick)
  }

  // iOS Safari only lets a video seek after it has played once from a gesture: play, then pause, on the first touch. It also starts
  // loading the whole recording then, not before.
  // The recording is only fetched once the visitor starts to scroll: the first frame is decoded ahead, so the list turning into the galaxy never waits for it.
  let warmed = false
  function warm() {
    if (warmed || !el.vid) return
    warmed = true
    el.vid.preload = 'auto'
    try { el.vid.currentTime = .001 } catch { /* not ready yet */ }
  }
  const prime = () => {
    if (primed || !el.vid) return
    primed = true
    const v = el.vid
    warm()
    const pr = v.play()
    if (pr && pr.then) pr.then(() => v.pause()).catch(() => {})
    else v.pause()
  }
  if (!reduce) {
    addEventListener('touchstart', prime, { passive: true, once: true, signal })
    addEventListener('wheel', prime, { passive: true, once: true, signal })
    addEventListener('pointerdown', prime, { passive: true, once: true, signal })
    addEventListener('keydown', prime, { once: true, signal })
    addEventListener('scroll', kick, { passive: true, signal })
  }

  // Resize: a new width, a new aspect or a real height change rebuilds what depends on it. The small height changes of a phone's address bar do not.
  let sizeW = innerWidth, sizeH = innerHeight
  addEventListener('resize', () => {
    if (sizeRaf) return
    sizeRaf = requestAnimationFrame(() => {
      sizeRaf = 0
      if (innerWidth === sizeW && Math.abs(innerHeight - sizeH) < 140) return
      sizeW = innerWidth; sizeH = innerHeight
      if ((innerWidth / innerHeight < 1) !== W.por) { vt = -1; primed = false; warmed = false; build() }
      else { starLayers(); layout() }
      readScroll(); ps = target
      frame(ps)
    })
  }, { signal })

  build()
  document.fonts.ready.then(() => { if (disposed) return; layout(); readScroll(); ps = target; frame(ps) })

  // ---------- Entrance ----------
  const flight = first && !reduce ? takeFlight('porter-galaxy') : null
  if (reduce && first) { const f = takeFlight('porter-galaxy'); if (f) cancelFlight(f) }
  if (flight) {
    // The card's night grows into this page and the stage appears over it.
    el.stage.style.opacity = '0'
    playFlight(flight, { sheetClass: 'gx-mat', stage: el.stage, signal })
  } else if (first && !reduce) {
    el.stage.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 480, easing: 'ease' })
    // The constellation is measured from the words, so it is measured again once they have settled.
    el.intro.animate([{ translate: '0 12px' }, { translate: '0 0' }], { duration: 640, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }).finished
      .then(() => { if (!disposed) { layout(); readScroll(); ps = target; frame(ps) } }).catch(() => {})
  }

  return () => {
    disposed = true
    ac.abort()
    cancelAnimationFrame(raf); cancelAnimationFrame(sizeRaf)
    root.getAnimations({ subtree: true }).forEach((a) => a.cancel())
    // Let go of the recordings so the browser frees their decoded frames.
    root.querySelectorAll('video').forEach((v) => { v.pause(); v.removeAttribute('src'); v.querySelectorAll('source').forEach((s) => s.remove()); v.load() })
    root.classList.remove('rm', 'moving', 'hero-off')
    root.replaceChildren()
  }
}
