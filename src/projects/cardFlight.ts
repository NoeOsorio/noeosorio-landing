// The card opens into its project. On «Open project» the wallet calls beginFlight(): the open card is copied into a layer on <body>,
// so it survives the route change and covers the loading gap. The project page then calls takeFlight() and playFlight():
// the card's sheet grows from the card's rectangle until the visitor is inside the page's world.
// A direct visit never has a flight; the page runs its own intro. Reduced motion never starts one.

const NIGHT = '#0E0D0B'
const OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
const IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)'
const STALE_MS = 8000

export interface Flight {
  id: string
  rect: { x: number; y: number; w: number; h: number; r: number }
  layer: HTMLElement
  card: HTMLElement
  veil: HTMLElement
  t0: number
}

let current: Flight | null = null
let staleTimer = 0

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function drop(f: Flight) {
  f.layer.remove()
  if (current === f) { current = null; clearTimeout(staleTimer) }
}

// The copy must not point at the ids of the original: the home removes its own when the route changes.
function renameIds(html: string, ids: string[]) {
  let out = html
  for (const id of ids) {
    const safe = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    out = out.replace(new RegExp(`id="${safe}"`, 'g'), `id="flight-${id}"`).replace(new RegExp(`#${safe}(?![\\w-])`, 'g'), `#flight-${id}`)
  }
  return out
}

export function beginFlight(pass: HTMLElement, id: string) {
  if (reducedMotion()) return
  if (current) drop(current)
  const b = pass.getBoundingClientRect()
  const clone = pass.cloneNode(true) as HTMLElement
  const ids = [...clone.querySelectorAll('[id]')].map((e) => e.id)
  clone.removeAttribute('id'); clone.removeAttribute('aria-describedby'); clone.removeAttribute('aria-expanded')
  const layer = document.createElement('div')
  // `home-root` and `home-wallet` carry the tokens and the card styles the copy was drawn with.
  layer.className = 'home-root home-wallet project-flight'
  layer.setAttribute('aria-hidden', 'true')
  layer.style.cssText = `position:fixed;inset:0;z-index:9999;overflow:hidden;background:transparent;isolation:auto;`
  layer.innerHTML = `<div class="flight-veil" style="position:absolute;inset:0;background:${NIGHT};opacity:0"></div>${renameIds(clone.outerHTML, ids)}`
  const veil = layer.firstElementChild as HTMLElement
  const card = layer.lastElementChild as HTMLElement
  card.removeAttribute('tabindex')
  card.style.cssText += `;position:absolute;left:${b.left}px;top:${b.top}px;width:${b.width}px;transform:none;filter:none;opacity:1;transition:none;z-index:1;pointer-events:none;`
  card.className = 'pass'
  document.body.appendChild(layer)
  // The card lifts a touch and the home goes dark behind it, while the page's code arrives.
  card.animate([{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-8px) scale(1.02)' }], { duration: 380, easing: OUT, fill: 'forwards' })
  veil.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: OUT, fill: 'forwards' })
  const r = Number.parseFloat(getComputedStyle(pass).borderTopLeftRadius) || 19
  current = { id, rect: { x: b.left, y: b.top, w: b.width, h: b.height, r }, layer, card, veil, t0: performance.now() }
  staleTimer = window.setTimeout(() => { if (current) drop(current) }, STALE_MS)
}

// The page asks once, at mount. Only a flight begun for this project (and not stale) is handed over.
export function takeFlight(id: string): Flight | null {
  const f = current
  if (!f || f.id !== id) return null
  clearTimeout(staleTimer)
  current = null
  return f
}

export function cancelFlight(f: Flight) { drop(f) }

interface Play {
  // Class of the page's material (its paper, cloth, board), drawn on the growing sheet so it is the same surface as the world.
  sheetClass: string
  // The page's stage. It is kept at opacity 0 by the page until the sheet has landed, then fades in.
  stage: HTMLElement
  onLanded?: () => void
  signal?: AbortSignal
}

// The card holds, fades, and its sheet grows to the whole window; the stage fades in over the finished sheet.
export function playFlight(f: Flight, { sheetClass, stage, onLanded, signal }: Play) {
  const { x, y, w, h, r } = f.rect
  const vw = innerWidth, vh = innerHeight
  const sheet = document.createElement('div')
  sheet.className = sheetClass
  sheet.style.cssText = `position:absolute;inset:0;will-change:clip-path;clip-path:inset(${y}px ${vw - x - w}px ${vh - y - h}px ${x}px round ${r}px)`
  f.layer.insertBefore(sheet, f.card)
  const wait = Math.max(0, 520 - (performance.now() - f.t0))
  const grow = 1150
  const done = wait + grow
  const anims: Animation[] = []
  const go = (el: Element, k: Keyframe[], o: KeyframeAnimationOptions) => { const a = el.animate(k, { fill: 'forwards', ...o }); anims.push(a); return a }
  go(f.card, [{ opacity: 1 }, { opacity: 0 }], { duration: 380, delay: wait, easing: 'ease' })
  go(sheet, [{ clipPath: sheet.style.clipPath }, { clipPath: 'inset(0px 0px 0px 0px round 0px)' }], { duration: grow, delay: wait, easing: IN_OUT })
  go(stage, [{ opacity: 0 }, { opacity: 1 }], { duration: 560, delay: Math.max(0, done - 420), easing: 'ease' })
  const t1 = window.setTimeout(() => onLanded?.(), Math.max(0, done - 60))
  const t2 = window.setTimeout(() => { stage.style.opacity = '1'; anims.forEach((a) => a.cancel()); drop(f) }, done + 700)
  const stop = () => { clearTimeout(t1); clearTimeout(t2); anims.forEach((a) => a.cancel()); stage.style.opacity = '1'; drop(f) }
  signal?.addEventListener('abort', stop, { once: true })
}
