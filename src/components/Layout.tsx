import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { CookieConsent } from './CookieConsent'
import { useAnalytics } from '../hooks/useAnalytics'

const Layout = () => {
  useAnalytics();
  
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-zinc-900" /> {/* Background base */}
      <div className="relative">
        <Navbar />
        <Outlet />
        <Footer />
        <CookieConsent />
      </div>
    </div>
  )
}

export default Layout 