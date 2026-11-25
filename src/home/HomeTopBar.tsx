import type { MouseEvent, Ref } from 'react'
import { Link } from 'react-router-dom'
import { LIME, LOGO_D } from './brand'
import './home-topbar.css'

interface LangSwitch { value: string; options: string[]; onChange: (next: string) => void }
interface Props {
  // Project pages: the bar follows the visitor (fixed), carries the language switch, and Subscribe goes to the channel.
  fixed?: boolean
  lang?: LangSwitch
  subscribeHref?: string
  barRef?: Ref<HTMLDivElement>
}

export default function HomeTopBar({ fixed, lang, subscribeHref, barRef }: Props) {
  const onSubscribe = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('subscribe')
    if (!target) return
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className={fixed ? 'home-bar is-fixed' : 'home-bar'} ref={barRef}>
      <Link className="home-brand" to="/">
        <svg viewBox="60 100 280 200" fill={LIME} aria-hidden="true">
          <path d={LOGO_D} />
        </svg>
        <span>Noé Osorio</span>
      </Link>
      <div className="home-bar-right">
        {lang && (
          <div className="home-lang" role="group" aria-label="Language">
            {lang.options.map((o) => (
              <button key={o} type="button" aria-pressed={lang.value === o} lang={o} onClick={() => lang.onChange(o)}>{o.toUpperCase()}</button>
            ))}
          </div>
        )}
        {subscribeHref
          ? <a className="home-subbtn" href={subscribeHref} target="_blank" rel="noopener">Subscribe</a>
          : <a className="home-subbtn" href="#subscribe" onClick={onSubscribe}>Subscribe</a>}
      </div>
    </div>
  )
}
