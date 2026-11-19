import { Link } from 'react-router-dom'
import Logo from './Logo'
import SocialLinks from './SocialLinks'
import { footerLinks } from '../data/footerLinks'
import { siteLinks } from '../data/siteLinks'

const linkClass = 'text-zinc-400 hover:text-lime-300 transition-colors'

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-zinc-400">
              Product Engineer in New York. I build tools with AI and share what I learn.
            </p>
            <SocialLinks />
          </div>

          {/* Site */}
          <div>
            <h3 className="text-white font-semibold mb-4">Site</h3>
            <ul className="space-y-3">
              {footerLinks.site.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-white font-semibold mb-4">Projects</h3>
            <ul className="space-y-3">
              {footerLinks.projects.map((link) => (
                <li key={link.title}>
                  {link.href ? (
                    <Link to={link.href} className={linkClass}>
                      {link.title}
                    </Link>
                  ) : (
                    <span className="text-zinc-400">{link.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Say hi */}
          <div>
            <h3 className="text-white font-semibold mb-4">Say hi</h3>
            <a href={`mailto:${siteLinks.email}`} className={linkClass}>
              {siteLinks.email}
            </a>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <p className="text-zinc-400">© 2026 Noé Osorio</p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('cookie-settings'))}
            className="text-zinc-400 hover:text-lime-300 transition-colors underline underline-offset-4"
          >
            Cookie settings
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
