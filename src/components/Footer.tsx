import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-zinc-400">
              Transformando ideas en soluciones digitales innovadoras.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/NoeOsorio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-lime-300 transition-colors"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/noeosorio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-lime-300 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/noeosorio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-lime-300 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
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
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                'Cloud Architecture',
                'Full Stack Development',
                'Tech Consulting',
                'Team Training'
              ].map((service) => (
                <li key={service}>
                  <Link 
                    to="/services"
                    className="text-zinc-400 hover:text-lime-300 transition-colors"
                  >
                    {service}
                  </Link>
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

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-800 text-center text-zinc-400">
          <p>© {new Date().getFullYear()} Noé Osorio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 