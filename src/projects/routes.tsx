import { lazy, Suspense } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import LoadingScreen from '../components/LoadingScreen'
import { PROJECTS, legacyTarget } from './registry'

// One lazy route per ported project. The page's code, CSS and images arrive only when its URL is opened.
const routeFor = (path: string, load: NonNullable<(typeof PROJECTS)[string]['load']>): RouteObject => {
  const Page = lazy(async () => {
    const [mod, shell] = await Promise.all([load(), import('./ProjectShell')])
    const Shell = shell.default
    return { default: () => <Shell page={mod.default} /> }
  })
  return {
    path,
    element: (
      <>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Page />
        </Suspense>
      </>
    ),
  }
}

// Pages not ported yet have no route, so their URL falls through to the not-found page.
export const projectRoutes: RouteObject[] = Object.values(PROJECTS)
  .filter((p) => p.load)
  .map((p) => routeFor(p.path, p.load!))

// The old detail routes (/portfolio/:id, /landing/:id, /b2b/:id, /open-source/:id) land on the matching new page, or on /portfolio.
export function LegacyProject() {
  const { projectId, id } = useParams()
  return <Navigate to={legacyTarget(projectId ?? id)} replace />
}
