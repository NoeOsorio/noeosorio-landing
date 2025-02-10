import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import Logo from './Logo'
import SocialLinks from './SocialLinks'
import { footerLinks } from '../data/footerLinks'

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-zinc-400">
              Transformando ideas en soluciones digitales innovadoras.
            </p>
            <SocialLinks />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase()}`}
                    className="text-zinc-400 hover:text-lime-300 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6">Servicios</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-lime-300 transition-colors"
                    >
                      {link.title}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-zinc-400 hover:text-lime-300 transition-colors"
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <p className="text-zinc-400 mb-4">
              ¿Listo para transformar tu próximo proyecto?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-lime-300 hover:text-lime-400 transition-colors"
            >
              Contactar Ahora
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-400">
            © {new Date().getFullYear()} Noé Osorio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 