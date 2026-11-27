import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnalytics } from '../../hooks/useAnalytics'
import HomeTopBar from '../../home/HomeTopBar'
import StarField from '../../home/sections/StarField'
import { useMount } from '../../home/useMount'
import { mountFooter } from '../../home/sections/tips-footer.mount'
import { tips } from '../../home/data/tips'
import '../../home/home-tokens.css'
import '../../home/sections/tips-footer.css'
import '../project-shell.css'
import { applyMeta } from '../ProjectShell'
import type { ProjectPage } from '../types'
import { META, OG_IMAGE } from './data'
import { mountPortfolio } from './portfolio.mount'

// /portfolio is not a project page, but it wears the same frame: the home's stars, bar and footer around its own grid.
const PAGE: ProjectPage = {
  id: 'portfolio',
  tone: 'dark',
  ogImage: OG_IMAGE,
  meta: { es: META, en: META },
  mount: () => () => {},
}

export default function PortfolioPage() {
  useAnalytics()
  const navigate = useNavigate()

  useEffect(() => applyMeta(PAGE, 'en'), [])
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    const prev = meta?.getAttribute('content')
    meta?.setAttribute('content', '#0E0D0B')
    return () => { if (prev) meta?.setAttribute('content', prev) }
  }, [])

  const data = useMemo(() => ({ navigate: (to: string) => navigate(to) }), [navigate])
  const pageRef = useMount(mountPortfolio, data)
  const footRef = useMount(mountFooter, tips)

  return (
    <div className="home-root project-root">
      <StarField />
      <HomeTopBar subscribeHref={tips.youtube} />
      <main className="project-page pg-portfolio" ref={pageRef} />
      <div className="home-close" ref={footRef} />
    </div>
  )
}
