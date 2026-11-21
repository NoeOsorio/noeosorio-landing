import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import { CookieConsent } from './components/CookieConsent'
import PrivacyPolicy from './pages/PrivacyPolicy'
import NotFound from './pages/NotFound'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Contact = lazy(() => import('./pages/Contact'))
const Social = lazy(() => import('./pages/Social'))
const EssayPage = lazy(() => import('./pages/essay/EssayPage'))

const router = createBrowserRouter([
  {
    path: "/essay",
    element: (
      <>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <EssayPage />
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
        <CookieConsent />
      </>
    )
  },
  {
    element: (
      <>
        <ScrollToTop />
        <Layout />
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
        path: "/portfolio", 
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Portfolio />
          </Suspense>
        ) 
      },
      { 
        path: "/portfolio/:projectId", 
        element: <Navigate to="/portfolio" replace /> 
      },
      { 
        path: "/open-source/:id", 
        element: <Navigate to="/portfolio" replace /> 
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
        element: <PrivacyPolicy />
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
        element: <Navigate to="/portfolio" replace />
      },
      {
        path: "/landing/:projectId",
        element: <Navigate to="/portfolio" replace />
      },
      { path: "*", element: <NotFound /> }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
