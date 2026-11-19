import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page not found | Noé Osorio"
        description="This page doesn't exist."
        image="https://noeosorio.com/og-image.png"
        url="https://noeosorio.com/404"
      />
      <div className="min-h-[70vh] container mx-auto px-4 py-24 flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            This page <span className="text-lime-300">doesn't exist</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-10">It may have moved when I rebuilt the site.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-gradient-to-r from-lime-300 to-emerald-300 text-zinc-900 rounded-lg font-medium hover:from-lime-400 hover:to-emerald-400 transition-all duration-300"
            >
              Go home
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-zinc-800/50 text-white rounded-lg border border-zinc-700/50 hover:border-lime-300/30 transition-all"
            >
              See my projects
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
