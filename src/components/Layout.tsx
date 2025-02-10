import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="fixed w-full bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-lime-300 font-bold text-xl">
              NOE OSORIO
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-zinc-300 hover:text-lime-300 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-zinc-300 hover:text-lime-300 transition-colors">
                About
              </Link>
              <Link to="/services" className="text-zinc-300 hover:text-lime-300 transition-colors">
                Services
              </Link>
              <Link to="/portfolio" className="text-zinc-300 hover:text-lime-300 transition-colors">
                Portfolio
              </Link>
              <Link to="/contact" className="text-zinc-300 hover:text-lime-300 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center text-zinc-400">
          <p>© {new Date().getFullYear()} Noe Osorio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout 