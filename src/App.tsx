import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Contact = lazy(() => import('./pages/Contact'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))

// Lazy load service pages
const WebAppDevelopment = lazy(() => import('./pages/services/WebAppDevelopment'))
const MobileAppDevelopment = lazy(() => import('./pages/services/MobileAppDevelopment'))
const BusinessAutomation = lazy(() => import('./pages/services/BusinessAutomation'))
const StartupAcceleration = lazy(() => import('./pages/services/StartupAcceleration'))

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),
    children: [
      { 
        path: "/", 
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Home />
          </Suspense>
        ) 
      },
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
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Services />
          </Suspense>
        ) 
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
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ProjectDetail />
          </Suspense>
        ) 
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
        path: "/services/web-app",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <WebAppDevelopment />
          </Suspense>
        )
      },
      {
        path: "/services/mobile-app",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MobileAppDevelopment />
          </Suspense>
        )
      },
      {
        path: "/services/business-automation",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <BusinessAutomation />
          </Suspense>
        )
      },
      {
        path: "/services/startup-acceleration",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StartupAcceleration />
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
