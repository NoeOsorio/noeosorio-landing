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
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
