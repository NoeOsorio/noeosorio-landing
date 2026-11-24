import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import { projectRoutes, LegacyProject } from './projects/routes'

// Layout (navbar, footer), the cookie banner (animation library) and the secondary pages are
// not needed to paint the home, so they load as separate chunks.
const Layout = lazy(() => import('./components/Layout'))
const CookieConsent = lazy(() => import('./components/CookieConsent').then(m => ({ default: m.CookieConsent })))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Portfolio = lazy(() => import('./projects/portfolio/PortfolioPage'))
const Contact = lazy(() => import('./pages/Contact'))
const Social = lazy(() => import('./pages/Social'))

const router = createBrowserRouter([
  ...projectRoutes,
  {
    path: "/portfolio",
    element: (
      <>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Portfolio />
        </Suspense>
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
      </>
    )
  },
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Home />
        </Suspense>
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
      </>
    )
  },
  {
    element: (
      <>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Layout />
        </Suspense>
      </>
    ),
    children: [
      { 
        path: "/about", 
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <About />
          </Suspense>
        ) 
      },
      { 
        path: "/services", 
        element: <Navigate to="/portfolio" replace /> 
      },
      { 
        path: "/portfolio/:projectId", 
        element: <LegacyProject /> 
      },
      { 
        path: "/open-source/:id", 
        element: <LegacyProject /> 
      },
      { 
        path: "/contact", 
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Contact />
          </Suspense>
        ) 
      },
      {
        path: "privacy-policy",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PrivacyPolicy />
          </Suspense>
        )
      },
      {
        path: "/social",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Social />
          </Suspense>
        )
      },
      {
        path: "/b2b/:projectId",
        element: <LegacyProject />
      },
      {
        path: "/landing/:projectId",
        element: <LegacyProject />
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <NotFound />
          </Suspense>
        )
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
