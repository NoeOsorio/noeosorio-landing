import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
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
  )
}

export default Navbar 