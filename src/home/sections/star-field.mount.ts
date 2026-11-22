import type { Mount } from '../useMount'

// A quiet field of stars behind every section of the home, the hero included, so space starts from the first frame.
// One viewport-sized canvas, three depth layers that drift at different fractions of the scroll, drawn
// only when the page scrolls or resizes. No loop, no pointer input.
type Star = { u: number; v: number; r: number; a: number; rgb: string; halo: number }
type Layer = { speed: number; stars: Star[] }

const WARM = '255,214,160', LIME = '214,243,92', INK = '244,238,228', HOT = '255,250,238'
const MARGIN = 24

function rng(seed: number) { let x = seed; return () => (x = (x * 16807) % 2147483647) / 2147483647 }

// Density is per megapixel of viewport, so a phone gets fewer stars than a desktop and the look stays the same.
function buildLayers(W: number, H: number): Layer[] {
  const mp = (W * H) / 1e6, r = rng(20261122)
  const tint = (): string => { const t = r(); return t < 0.07 ? WARM : t < 0.095 ? LIME : INK }
  const make = (n: number, f: () => Star) => Array.from({ length: Math.max(1, Math.round(n)) }, f)
  const far = make(Math.max(130, 300 * mp), () => ({ u: r(), v: r(), r: 0.4 + r() * 0.3, a: 0.36 + Math.pow(r(), 1.5) * 0.4, rgb: tint(), halo: 0 }))
  const mid = make(Math.max(22, 55 * mp), () => ({ u: r(), v: r(), r: 0.75 + r() * 0.4, a: 0.55 + r() * 0.3, rgb: tint(), halo: 0 }))
  const near = make(Math.max(6, 9 * mp), () => {
    const t = r()
    return { u: r(), v: r(), r: 1.5 + r() * 0.6, a: 0.88 + r() * 0.1, rgb: t < 0.15 ? LIME : t < 0.3 ? WARM : HOT, halo: 8 + r() * 3 }
  })
  return [{ speed: 0.08, stars: far }, { speed: 0.2, stars: mid }, { speed: 0.4, stars: near }]
}

export const mountStarField: Mount<null> = (root, _data, { reduce }) => {
  const ac = new AbortController(), { signal } = ac
  const cv = document.createElement('canvas')
  cv.setAttribute('aria-hidden', 'true')
  root.appendChild(cv)
  const ctx = cv.getContext('2d')!
  let W = 0, H = 0, layers: Layer[] = [], raf = 0, dead = false

  function layout() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = root.clientWidth, h = root.clientHeight
    if (!w || !h) return
    if (w !== W || h !== H) { W = w; H = h; layers = buildLayers(W, H) }
    const pw = Math.round(W * dpr), ph = Math.round(H * dpr)
    if (cv.width !== pw || cv.height !== ph) { cv.width = pw; cv.height = ph }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    draw()
  }

  function draw() {
    raf = 0
    if (dead || !W) return
    const sy = reduce ? 0 : window.scrollY, period = H + MARGIN * 2
    ctx.clearRect(0, 0, W, H)
    for (const L of layers) {
      const off = sy * L.speed
      for (const s of L.stars) {
        const x = s.u * W, y = (((s.v * period - off) % period) + period) % period - MARGIN
        if (s.halo) {
          ctx.save(); ctx.translate(x, y)
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s.halo)
          g.addColorStop(0, `rgba(${s.rgb},.2)`); g.addColorStop(0.4, `rgba(${s.rgb},.06)`); g.addColorStop(1, `rgba(${s.rgb},0)`)
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, s.halo, 0, 7); ctx.fill(); ctx.restore()
        }
        ctx.fillStyle = `rgba(${s.rgb},${s.a})`; ctx.beginPath(); ctx.arc(x, y, s.r, 0, 7); ctx.fill()
      }
    }
  }
  const schedule = () => { if (!raf && !dead) raf = requestAnimationFrame(draw) }

  layout()
  // The box can change without a window resize (stylesheet arrives late, mobile toolbars), so watch it.
  const ro = new ResizeObserver(layout); ro.observe(root)
  if (!reduce) window.addEventListener('scroll', schedule, { passive: true, signal })

  return () => { dead = true; ac.abort(); ro.disconnect(); cancelAnimationFrame(raf); cv.remove() }
}
