import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
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
      <Link className="home-brand" to="/" aria-label="Home">
        <svg viewBox="60 100 280 200" fill="#D6F35C" aria-hidden="true">
          <path d="M123 111 L225 111 L250 154 L225 198 L199 155 L150 155 L123 198 L147 243 L97 243 L72 199 Z M252 156 L302 156 L327 200 L276 288 L175 288 L149 244 L174 200 L200 244 L250 244 L276 200 Z" />
        </svg>
        <span>Noé Osorio</span>
      </Link>
      <a className="home-subbtn" href="#subscribe" onClick={onSubscribe}>Subscribe</a>
    </div>
  )
}
