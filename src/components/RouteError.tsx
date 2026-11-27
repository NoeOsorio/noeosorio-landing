import { useRouteError } from 'react-router-dom'
import LoadingScreen from './LoadingScreen'
import { isStaleBuild, reloadForNewBuild } from '../lib/staleBuild'

// Any error a page throws lands here instead of the router's developer screen.
export default function RouteError() {
  const error = useRouteError()
  if (isStaleBuild(error) && reloadForNewBuild()) return <LoadingScreen />
  console.error(error)
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#18181b]">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">This page didn't load.</h1>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-7 py-3.5 rounded-full bg-lime-300 text-zinc-900 font-medium transition-transform duration-150 active:scale-[0.97]"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
