import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { LIME, LOGO_D } from './brand'
import './home-topbar.css'

export default function HomeTopBar() {
  const onSubscribe = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('subscribe')
    if (!target) return
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className="home-bar">
      <Link className="home-brand" to="/">
        <svg viewBox="60 100 280 200" fill={LIME} aria-hidden="true">
          <path d={LOGO_D} />
        </svg>
        <span>Noé Osorio</span>
      </Link>
      <a className="home-subbtn" href="#subscribe" onClick={onSubscribe}>Subscribe</a>
    </div>
  )
}
