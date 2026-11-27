import React from 'react'
import ReactDOM from 'react-dom/client'
import './fonts.css'
import './index.css'
import App from './App'
import { reloadForNewBuild } from './lib/staleBuild'

// A preload of a file from an older build failed: load the page again on the new build.
window.addEventListener('vite:preloadError', (e) => { if (reloadForNewBuild()) e.preventDefault() })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <App />
  </React.StrictMode>
)
