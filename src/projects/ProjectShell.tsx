import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAnalytics } from '../hooks/useAnalytics'
import HomeTopBar from '../home/HomeTopBar'
import StarField from '../home/sections/StarField'
import { useMount } from '../home/useMount'
import { mountFooter } from '../home/sections/tips-footer.mount'
import { tips } from '../home/data/tips'
import '../home/home-tokens.css'
import '../home/sections/tips-footer.css'
import './project-shell.css'
import { initialLang, saveLang } from './lang'
import type { Lang, ProjectPage } from './types'

const SITE = 'https://noeosorio.com'
const LOCALE: Record<Lang, string> = { es: 'es_MX', en: 'en_US' }

// Sets the page's own title, description, canonical, social tags and an absolute social image, and puts back what was there.
function applyMeta(page: ProjectPage, lang: Lang) {
  const m = page.meta[lang]
  const url = `${SITE}/${page.id}`
  const image = SITE + page.ogImage
  const undo: (() => void)[] = []
  const prevTitle = document.title
  document.title = m.title
  undo.push(() => { document.title = prevTitle })
  const set = (sel: string, make: () => HTMLElement, attr: string, value: string) => {
    let el = document.head.querySelector<HTMLElement>(sel)
    const created = !el
    if (!el) { el = make(); document.head.appendChild(el) }
    const prev = el.getAttribute(attr)
    el.setAttribute(attr, value)
    undo.push(() => { if (created) el.remove(); else if (prev !== null) el.setAttribute(attr, prev) })
  }
  const meta = (key: 'name' | 'property', name: string, value: string) =>
    set(`meta[${key}="${name}"]`, () => { const e = document.createElement('meta'); e.setAttribute(key, name); return e }, 'content', value)
  meta('name', 'description', m.description)
  meta('name', 'title', m.title)
  meta('property', 'og:title', m.title)
  meta('property', 'og:description', m.description)
  meta('property', 'og:url', url)
  meta('property', 'og:image', image)
  meta('property', 'og:locale', LOCALE[lang])
  meta('property', 'og:type', 'website')
  meta('name', 'twitter:card', 'summary_large_image')
  meta('name', 'twitter:title', m.title)
  meta('name', 'twitter:description', m.description)
  meta('name', 'twitter:image', image)
  set('link[rel="canonical"]', () => { const e = document.createElement('link'); e.setAttribute('rel', 'canonical'); return e }, 'href', url)
  const prevLang = document.documentElement.lang
  document.documentElement.lang = lang
  undo.push(() => { document.documentElement.lang = prevLang })
  return () => undo.reverse().forEach((f) => f())
}

export default function ProjectShell({ page }: { page: ProjectPage }) {
  useAnalytics()
  const [lang, setLang] = useState<Lang>(initialLang)
  const mountedOnce = useRef(false)
  const barEl = useRef<HTMLDivElement | null>(null)
  const pageEl = useRef<HTMLElement | null>(null)
  const footEl = useRef<HTMLDivElement | null>(null)

  useEffect(() => applyMeta(page, lang), [page, lang])
  useEffect(() => { saveLang(lang) }, [lang])

  // Safari tints its bars with the theme colour; every project page ends on the night of the footer.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    const prev = meta?.getAttribute('content')
    meta?.setAttribute('content', '#0E0D0B')
    return () => { if (prev) meta?.setAttribute('content', prev) }
  }, [])

  // The bar never sits over the footer: once the footer reaches the top band it slides away. Over the page's own surface it
  // wears the page's tone; anywhere else (the night between the page and the footer) it wears the dark-surface look.
  useEffect(() => {
    const bar = barEl.current, pageRoot = pageEl.current, foot = footEl.current
    if (!bar || !pageRoot || !foot) return
    const band = '0px 0px -90% 0px'
    const away = new IntersectionObserver(([e]) => bar.classList.toggle('is-away', e.isIntersecting), { rootMargin: band })
    const tone = new IntersectionObserver(([e]) => { bar.dataset.tone = e.isIntersecting ? page.tone : 'dark' }, { rootMargin: band })
    bar.dataset.tone = page.tone
    away.observe(foot); tone.observe(pageRoot)
    return () => { away.disconnect(); tone.disconnect() }
  }, [page])

  // The page mounts again when the language changes. Only the first mount plays the entrance.
  const data = useMemo(() => ({ lang, first: !mountedOnce.current }), [lang])
  useEffect(() => { mountedOnce.current = true }, [])
  const pageRef = useMount(page.mount, data)
  const setPage = useCallback((el: HTMLElement | null) => { pageEl.current = el; return pageRef(el) }, [pageRef])
  const footRef = useMount(mountFooter, tips)
  const setFoot = useCallback((el: HTMLDivElement | null) => { footEl.current = el; return footRef(el) }, [footRef])

  return (
    <div className="home-root project-root">
      <StarField />
      <HomeTopBar
        fixed
        barRef={barEl}
        subscribeHref={tips.youtube}
        lang={{ value: lang, options: ['es', 'en'], onChange: (l) => setLang(l as Lang) }}
      />
      <main className={`project-page pg-${page.id}`} ref={setPage} />
      <div className="home-close" ref={setFoot} />
    </div>
  )
}
