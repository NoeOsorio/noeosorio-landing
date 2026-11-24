import type { ProjectPage } from './types'

type Loader = () => Promise<{ default: ProjectPage }>

export interface ProjectEntry {
  // Public path of the page; it is also the URL the wallet card already uses.
  path: string
  // Imports src/projects/<id>/index.ts. `null` until the page is ported: no route, no «Open project» button, no redirect.
  load: Loader | null
  // Ids the old detail routes (/portfolio/:id, /landing/:id, /b2b/:id, /open-source/:id) used for this project.
  legacy: string[]
}

// A porting agent flips its own line: `load: () => import('./pyventa')`. Nothing else in the site changes.
export const PROJECTS: Record<string, ProjectEntry> = {
  kanji: { path: '/kanji', load: () => import('./kanji'), legacy: ['kanji-study-app', 'kanji'] },
  pyventa: { path: '/pyventa', load: null, legacy: ['pyventa-web', 'pyventa'] },
  'porter-galaxy': { path: '/porter-galaxy', load: null, legacy: ['porter-galaxy'] },
  'maiden-os': { path: '/maiden-os', load: null, legacy: ['maiden-os'] },
  telar: { path: '/telar', load: null, legacy: ['telar'] },
  whiteboard: { path: '/whiteboard', load: null, legacy: ['whiteboard'] },
}

// The page of a wallet card, or null when the card has none yet (Sim World never gets one).
export const pageOf = (walletId: string) => {
  const p = PROJECTS[walletId]
  return p && p.load ? p : null
}

// Warms the page's chunk while the visitor is still deciding to click.
export const preloadPage = (walletId: string) => { void pageOf(walletId)?.load?.() }

export const legacyTarget = (id: string | undefined) => {
  const hit = Object.values(PROJECTS).find((p) => p.load && id && p.legacy.includes(id))
  return hit ? hit.path : '/portfolio'
}
