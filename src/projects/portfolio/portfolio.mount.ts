import type { Mount } from '../../home/useMount'
import { esc } from '../../home/dom'
import { motions } from '../../home/sections/card-motion'
import { W, H0, NOISE, CHIP, NFC, ART_URL, logoFor, number, enamelArt } from '../../home/sections/wallet-art'
import { pageOf, preloadPage } from '../registry'
import { beginFlight } from '../cardFlight'
import { trackEvent } from '../../hooks/useAnalytics'
import { ITEMS, TOPICS, TITLE, stressItems, type Item } from './data'
import './portfolio.css'

// /portfolio: every project of the home wallet as a grid of its real cards. Built for a thousand of them: only the rows in view
// exist in the page, search is one pass over a precomputed string per item, and the scroll handler does no layout reads.

export interface PortfolioData { navigate: (to: string) => void }

type Link = { kind: 'page' | 'route' | 'external'; to: string }

const ASPECT = 1.586
const ENAMEL = enamelArt()
const SEARCH_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>'
const X_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>'
const CARDS_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="8.5" height="7" rx="2"/><rect x="12.5" y="4" width="8.5" height="7" rx="2"/><rect x="3" y="13" width="8.5" height="7" rx="2"/><rect x="12.5" y="13" width="8.5" height="7" rx="2"/></svg>'
const DENSE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true">' + [3, 9, 15].flatMap((y) => [3, 9.5, 16].map((x) => `<rect x="${x}" y="${y}" width="5" height="4" rx="1.2"/>`)).join('') + '</svg>'

const cl = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x))

// Where a card leads, read from the registry every time: pages that get enabled later work without touching this file.
function linkOf(it: Item): Link | null {
  const page = pageOf(it.id)
  if (page) return { kind: 'page', to: page.path }
  if (it.cta) {
    try {
      const u = new URL(it.cta, window.location.href)
      if (u.origin === window.location.origin) return { kind: 'route', to: u.pathname + u.search }
    } catch { /* not a URL: treat as external below */ }
    return { kind: 'external', to: it.cta }
  }
  return null
}

function mark(text: string, q: string) {
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1
  if (i < 0) return esc(text)
  return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length))
}

// The overlay of a card is a still drawing of hundreds of shapes. As an image it is parsed once and shared by every card that shows it.
// Once the page is up, each card's picture and overlay are also flattened into one bitmap: painting a thousand cards then costs a texture
// per card instead of redrawing hundreds of vector shapes for each of them while the visitor scrolls.
const overlays = new Map<string, string>()
const baked = new Map<string, string>()
const BAKE_W = W * 2, BAKE_H = H0 * 2
function overlayURL(id: string, inner: string) {
  let u = overlays.get(id)
  if (!u) {
    // The drawings were written as HTML (bare attributes like data-draw); an image needs strict XML, so the page's own parser reads them and writes them back.
    const holder = document.createElement('div')
    holder.innerHTML = `<svg viewBox="0 0 ${W} ${H0}" width="${BAKE_W}" height="${BAKE_H}" preserveAspectRatio="xMidYMid slice">${inner}</svg>`
    const xml = new XMLSerializer().serializeToString(holder.firstElementChild as Element)
    u = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml' }))
    overlays.set(id, u)
  }
  return u
}

const decoded = (src: string) => new Promise<HTMLImageElement>((ok, no) => { const im = new Image(); im.onload = () => ok(im); im.onerror = () => no(new Error('image')); im.src = src })

async function bake(it: Item): Promise<string | null> {
  if (baked.has(it.id)) return baked.get(it.id) as string
  const m = motions[it.id]
  const layers = it.art === 'enamel' ? [overlayURL(it.id, ENAMEL)] : [ART_URL[it.id], ...(m ? [overlayURL(it.id, m.svg)] : [])]
  const imgs = await Promise.all(layers.map(decoded))
  const c = document.createElement('canvas'); c.width = BAKE_W; c.height = BAKE_H
  const g = c.getContext('2d')
  if (!g) return null
  g.imageSmoothingQuality = 'high'
  for (const im of imgs) g.drawImage(im, 0, 0, BAKE_W, BAKE_H)
  const blob = await new Promise<Blob | null>((ok) => c.toBlob(ok, 'image/webp', 0.92))
  if (!blob) return null
  const u = URL.createObjectURL(blob)
  baked.set(it.id, u)
  return u
}

function cardHTML(it: Item, k: number, q: string, link: Link | null, dense: boolean) {
  const m = motions[it.id]
  const img = (src: string, extra = '') => `<img class="art art-img${extra}" src="${src}" alt="" aria-hidden="true" width="${W}" height="${H0}" decoding="async" draggable="false">`
  const flat = baked.get(it.id)
  const art = flat
    ? `${img(flat)}${it.art === 'enamel' ? `<span class="tex" style="background-image:${NOISE}"></span>` : ''}`
    : it.art === 'enamel'
      ? `${img(overlayURL(it.id, ENAMEL))}<span class="tex" style="background-image:${NOISE}"></span>`
      : `${img(ART_URL[it.id])}${m ? img(overlayURL(it.id, m.svg), ' art-motion') : ''}`
  const num = it.id === 'pyventa' ? '' : `<span class="num">${number(it.commits)}</span>`
  const body = `<span class="card">${art}<span class="title"><span class="name">${mark(it.name, q)}</span><span class="topic">${mark(it.topic, q)}</span></span>${NFC}${CHIP}${num}<span class="bottom"><span class="field"><span class="lab">CREATED</span><span class="val">${esc(it.created)}</span></span><span class="field"><span class="lab">&nbsp;</span><span class="val">NOÉ OSORIO</span></span>${logoFor(it.id)}</span></span>`
  const attrs = `class="pass" data-pf${dense ? ' data-dense' : ''} data-id="${esc(it.id)}" style="--c:${it.c};--fg:${it.fg};--k:${k.toFixed(3)}" aria-label="${esc(it.name)}"`
  if (!link) return `<div ${attrs} data-inert>${body}</div>`
  const ext = link.kind === 'external' ? ' target="_blank" rel="noopener noreferrer"' : ''
  return `<a ${attrs} href="${esc(link.to)}"${ext}>${body}</a>`
}

export const mountPortfolio: Mount<PortfolioData> = (root, data, { reduce }) => {
  const ac = new AbortController()
  const { signal } = ac
  let raf = 0
  let disposed = false
  const timers: number[] = []

  const stress = stressItems()
  const all = stress ?? ITEMS

  // Filters come from the URL on arrival and are written back with replaceState: they can be shared, and Back never walks through keystrokes.
  const params = new URLSearchParams(window.location.search)
  const state = { q: params.get('q') ?? '', topic: TOPICS.includes(params.get('topic') ?? '') ? (params.get('topic') as string) : '', dense: params.get('dense') === '1' }

  root.innerHTML = `<div class="pf-pool" aria-hidden="true"></div>
<div class="pf-page">
  <section class="pf-hero"><h1></h1></section>
  <div class="pf-sent" aria-hidden="true"></div>
  <div class="pf-tools">
    <div class="pf-row1">
      <label class="pf-search"><span class="sr-only">Search projects</span>${SEARCH_ICON}<input type="search" placeholder="Search projects" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search" title="Search (press /)"><button type="button" class="pf-clear" aria-label="Clear">${X_ICON}</button></label>
      <div class="pf-seg" role="group" aria-label="View"><button type="button" data-view="cards" aria-label="Cards" title="Cards">${CARDS_ICON}</button><button type="button" data-view="dense" aria-label="Dense" title="Dense">${DENSE_ICON}</button></div>
    </div>
    <div class="pf-chips" role="group" aria-label="Topic"></div>
  </div>
  <div class="pf-out"><div class="pf-grid"></div></div>
  <p class="sr-only" role="status" aria-live="polite"></p>
</div>`

  const q = <T extends Element>(sel: string) => root.querySelector(sel) as T
  const page = q<HTMLElement>('.pf-page'), tools = q<HTMLElement>('.pf-tools'), sent = q<HTMLElement>('.pf-sent'), hero = q<HTMLElement>('.pf-hero')
  const input = q<HTMLInputElement>('.pf-search input'), searchBox = q<HTMLElement>('.pf-search'), chips = q<HTMLElement>('.pf-chips')
  const out = q<HTMLElement>('.pf-out'), status = q<HTMLElement>('[role=status]')
  const seg = q<HTMLElement>('.pf-seg')
  q<HTMLElement>('h1').textContent = TITLE
  chips.innerHTML = ['All', ...TOPICS].map((t) => `<button type="button" class="pf-chip" data-topic="${t === 'All' ? '' : esc(t)}">${esc(t)}</button>`).join('')
  const chipEls = [...chips.querySelectorAll<HTMLButtonElement>('.pf-chip')]
  const viewEls = [...seg.querySelectorAll<HTMLButtonElement>('button')]

  // ---------- Filtering ----------
  let list: Item[] = all
  function filter() {
    const needle = state.q.trim().toLowerCase()
    list = all.filter((it) => (!state.topic || it.topic === state.topic) && (!needle || it.hay.includes(needle)))
  }

  // ---------- Layout: rows of cards, only the rows near the window are in the page ----------
  const grid = q<HTMLElement>('.pf-grid')
  let cols = 3, cardH = 0, rowH = 0, gapY = 0, k = 1, rows = 0, hostTop = 0
  let rf = -1, rl = -2
  const rowEls = new Map<number, HTMLElement>()
  let tplKey = ''
  const tpls = new Map<string, HTMLTemplateElement>()
  const links = new Map<string, Link | null>()
  const linkFor = (it: Item) => { if (!links.has(it.id)) links.set(it.id, linkOf(it)); return links.get(it.id) as Link | null }

  function measure() {
    const vw = innerWidth, d = state.dense
    const gapX = d ? (vw < 700 ? 14 : 16) : 26
    gapY = d ? (vw < 700 ? 18 : 22) : vw < 700 ? 26 : 34
    cols = d ? (vw < 700 ? 2 : vw < 1100 ? 4 : 6) : vw < 700 ? 1 : vw < 1100 ? 2 : 3
    const width = grid.clientWidth || out.clientWidth
    const cardW = (width - (cols - 1) * gapX) / cols
    k = d ? cl(cardW / 330, 0.62, 0.72) : cl(cardW / 400, 0.9, 1.1)
    cardH = cardW / ASPECT
    rowH = cardH + gapY
    grid.style.setProperty('--pf-gx', gapX + 'px')
    grid.style.setProperty('--pf-cols', String(cols))
    grid.style.setProperty('--pf-h', cardH.toFixed(2) + 'px')
    grid.style.setProperty('--pf-gy', gapY + 'px')
    const key = `${k.toFixed(3)}|${state.dense}|${state.q}`
    if (key !== tplKey) { tplKey = key; tpls.clear() }
  }

  function build(it: Item) {
    const key = it.id
    let t = tpls.get(key)
    if (!t) {
      t = document.createElement('template')
      t.innerHTML = cardHTML(it, k, state.q.trim(), linkFor(it), state.dense)
      tpls.set(key, t)
    }
    return t.content.firstElementChild!.cloneNode(true) as HTMLElement
  }

  function makeRow(r: number) {
    const el = document.createElement('div')
    el.className = 'pf-rowx'
    for (let i = r * cols; i < Math.min(list.length, (r + 1) * cols); i++) el.appendChild(build(list[i]))
    return el
  }

  function range(force = false) {
    if (disposed) return
    const over = Math.max(rowH, innerHeight * 0.5)
    const top = scrollY - hostTop - over, bottom = scrollY + innerHeight - hostTop + over
    const first = cl(Math.floor(top / rowH), 0, Math.max(0, rows - 1)), last = cl(Math.floor(bottom / rowH), -1, rows - 1)
    if (!force && first === rf && last === rl) return
    rf = first; rl = last
    for (const [r, el] of rowEls) if (r < first || r > last) { el.remove(); rowEls.delete(r) }
    let after: HTMLElement | null = null
    for (let r = last; r >= first; r--) {
      let el = rowEls.get(r)
      if (!el) { el = makeRow(r); rowEls.set(r, el); grid.insertBefore(el, after) }
      after = el
    }
    grid.style.paddingTop = first * rowH + 'px'
    grid.style.paddingBottom = Math.max(0, (rows - 1 - last) * rowH) + 'px'
  }

  function reset() {
    rowEls.forEach((el) => el.remove()); rowEls.clear(); rf = -1; rl = -2
  }

  const emptyHTML = `<div class="pf-empty"><div class="pf-slot"><svg viewBox="0 0 424 267" preserveAspectRatio="none" aria-hidden="true"><rect x="4" y="4" width="416" height="259" rx="20" fill="rgba(255,248,236,.035)" stroke="#9FD043" stroke-opacity=".55" stroke-width="5" stroke-linecap="square" stroke-dasharray="0.1 11.9"/></svg><button type="button" class="pf-btn" data-clear>Clear</button></div></div>`

  function measureTop() { hostTop = out.getBoundingClientRect().top + scrollY + 10 /* grid padding-top */ }

  function layout() {
    filter()
    const empty = list.length === 0
    out.classList.toggle('is-empty', empty)
    if (empty) {
      reset(); grid.style.display = 'none'
      if (!out.querySelector('.pf-empty')) out.insertAdjacentHTML('beforeend', emptyHTML)
      rows = 0
    } else {
      out.querySelector('.pf-empty')?.remove(); grid.style.display = ''
      grid.classList.toggle('dense', state.dense)
      measure()
      rows = Math.ceil(list.length / cols)
      reset()
    }
    measureTop()
    if (!empty) range(true)
  }

  // ---------- Controls ----------
  function sync(push: boolean) {
    input.value = state.q
    searchBox.classList.toggle('has', !!state.q)
    chipEls.forEach((c) => c.setAttribute('aria-pressed', String((c.dataset.topic ?? '') === state.topic)))
    viewEls.forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.view === 'dense') === state.dense)))
    status.textContent = `${list.length} ${list.length === 1 ? 'project' : 'projects'}`
    if (!push) return
    const u = new URL(window.location.href)
    const set = (key: string, v: string) => (v ? u.searchParams.set(key, v) : u.searchParams.delete(key))
    set('q', state.q.trim()); set('topic', state.topic); set('dense', state.dense ? '1' : '')
    window.history.replaceState(window.history.state, '', u.pathname + u.search + u.hash)
  }

  // Changing the filter keeps the visitor at the top of the results instead of in the middle of a shorter list.
  function apply() {
    const wasBelow = scrollY > hostTop - tools.offsetHeight
    layout()
    if (wasBelow) scrollTo({ top: Math.max(0, hostTop - tools.offsetHeight - 8), behavior: 'auto' })
    sync(true)
  }

  input.addEventListener('input', () => { state.q = input.value; apply() }, { signal })
  q<HTMLButtonElement>('.pf-clear').addEventListener('click', () => { state.q = ''; apply(); input.focus() }, { signal })
  chips.addEventListener('click', (e) => { const b = (e.target as Element).closest<HTMLElement>('.pf-chip'); if (b) { state.topic = b.dataset.topic ?? ''; apply() } }, { signal })
  seg.addEventListener('click', (e) => { const b = (e.target as Element).closest<HTMLElement>('button'); if (b) { state.dense = b.dataset.view === 'dense'; apply() } }, { signal })
  out.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('[data-clear]')) return
    state.q = ''; state.topic = ''; apply()
  }, { signal })
  addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
    const at = document.activeElement as HTMLElement | null
    if (at && (at.tagName === 'INPUT' || at.tagName === 'TEXTAREA' || at.isContentEditable)) return
    e.preventDefault(); input.focus()
  }, { signal })

  // ---------- Opening a card ----------
  const warmed = new Set<string>()
  const cardOf = (e: Event) => (e.target as Element).closest<HTMLElement>('.pass[data-id]')
  const warm = (e: Event) => {
    const el = cardOf(e); const id = el?.dataset.id
    if (!el || !id || warmed.has(id)) return
    warmed.add(id); preloadPage(id)
  }
  grid.addEventListener('pointerover', warm, { signal })
  grid.addEventListener('focusin', warm, { signal })
  grid.addEventListener('click', (e) => {
    const el = cardOf(e); const id = el?.dataset.id
    if (!el || !id) return
    const link = linkOf(ITEMS.find((i) => i.id === id) as Item)
    if (!link) { e.preventDefault(); return }
    void trackEvent('project_click', { project: id })
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (link.kind === 'external') return
    e.preventDefault()
    if (link.kind === 'page') beginFlight(el, id)
    data.navigate(link.to)
  }, { signal })

  // ---------- Scroll, resize ----------
  const schedule = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; range() }) }
  addEventListener('scroll', schedule, { passive: true, signal })

  // The toolbar gets its backdrop only once it is stuck to the top, found with an observer so no scroll handler reads layout.
  const stuck = new IntersectionObserver(([e]) => tools.classList.toggle('stuck', !e.isIntersecting && e.boundingClientRect.top < 0))
  stuck.observe(sent)

  let lastW = innerWidth
  let resizeT = 0
  addEventListener('resize', () => {
    clearTimeout(resizeT)
    // iOS shows and hides its bars while scrolling: a height change alone, at the same width, changes nothing here.
    resizeT = window.setTimeout(() => { if (innerWidth === lastW) { schedule(); return } lastW = innerWidth; layout() }, 120)
  }, { signal })
  // Anything that moves the grid down (fonts, a chip row that wraps) is measured again.
  const ro = new ResizeObserver(() => { const before = hostTop; measureTop(); if (Math.abs(before - hostTop) > 1) schedule() })
  ro.observe(hero); ro.observe(tools)
  void (document.fonts?.ready ?? Promise.resolve()).then(() => { if (!disposed) { measureTop(); range(true) } })

  // ---------- First paint ----------
  filter(); layout(); sync(false)
  // After the first paint, flatten the cards one by one in idle time, then swap the pictures for the flat ones.
  void (async () => {
    for (const it of ITEMS) {
      if (disposed) return
      await new Promise<void>((ok) => (window.requestIdleCallback ? window.requestIdleCallback(() => ok(), { timeout: 400 }) : setTimeout(ok, 60)))
      try { await bake(it) } catch { /* the layered card stays */ }
    }
    if (disposed) return
    // Cards already in the page change their picture in place; no row is rebuilt, so nothing moves while the visitor scrolls.
    tpls.clear()
    grid.querySelectorAll<HTMLElement>('.pass[data-id]').forEach((card) => {
      const flat = baked.get(card.dataset.id as string)
      const imgs = card.querySelectorAll<HTMLImageElement>('img.art')
      if (flat && imgs.length === 2) { imgs[0].src = flat; imgs[1].remove() }
      else if (flat && imgs.length === 1 && imgs[0].src !== flat) imgs[0].src = flat
    })
  })()
  if (!reduce) {
    out.classList.add('pf-intro')
    timers.push(window.setTimeout(() => out.classList.remove('pf-intro'), 1100))
  }

  return () => {
    disposed = true
    ac.abort()
    cancelAnimationFrame(raf)
    clearTimeout(resizeT)
    timers.forEach((t) => clearTimeout(t))
    stuck.disconnect(); ro.disconnect()
    root.getAnimations({ subtree: true }).forEach((a) => a.cancel())
    page.remove()
    root.replaceChildren()
  }
}
