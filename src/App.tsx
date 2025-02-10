import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'
import ScrollToTop from './components/ScrollToTop'

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
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/services", element: <Services /> },
      { path: "/portfolio", element: <Portfolio /> },
      { path: "/portfolio/:projectId", element: <ProjectDetail /> },
      { path: "/contact", element: <Contact /> },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
