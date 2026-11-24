import type { Lang } from './types'

// Shared by every page with a Spanish/English switch. Order: ?lang= in the URL, then the saved choice, then Spanish.
const KEY = 'site-lang'
const LEGACY_KEY = 'essay-lang'

const isLang = (v: unknown): v is Lang => v === 'es' || v === 'en'

export function initialLang(): Lang {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (isLang(q)) return q
  } catch { /* no URL access: fall through */ }
  try {
    const saved = window.localStorage.getItem(KEY) ?? window.localStorage.getItem(LEGACY_KEY)
    if (isLang(saved)) return saved
  } catch { /* storage blocked: fall through */ }
  return 'es'
}

export function saveLang(lang: Lang) {
  try { window.localStorage.setItem(KEY, lang) } catch { /* storage blocked: the choice lasts for this visit */ }
}
