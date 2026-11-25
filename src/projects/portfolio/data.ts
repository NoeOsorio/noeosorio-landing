import { wallet, type WalletProject } from '../../home/data/wallet'

// The list is the home wallet's data and nothing else: no project is written down twice.
export interface Item {
  id: string
  name: string
  topic: string
  art: WalletProject['art']
  c: string
  fg: string
  created: string
  commits: number
  // Lower case «name topic», so a search is one indexOf per item.
  hay: string
  // The call to action of the project, when it has one (a link outside its own page).
  cta: string | null
}

const toItem = (p: WalletProject): Item => ({
  id: p.id, name: p.name, topic: p.topic, art: p.art, c: p.c, fg: p.fg, created: p.created, commits: p.commits,
  hay: `${p.name} ${p.topic}`.toLowerCase(), cta: p.pitch.cta ? p.pitch.cta[1] : null,
})

// Most recent first, by the date of the first commit.
export const ITEMS: Item[] = [...wallet.projects]
  .sort((a, b) => Date.parse(b.first) - Date.parse(a.first))
  .map(toItem)

// The topics that exist in the data, in the order the wallet lists them.
export const TOPICS: string[] = [...new Set(wallet.projects.map((p) => p.topic))]

export const TITLE = wallet.title

// Only a stress build (or the dev server) reads ?stress=N; the production build never does, and drops this code.
export function stressItems(): Item[] | null {
  if (!(import.meta.env.DEV || import.meta.env.VITE_PF_STRESS === '1')) return null
  const n = Number(new URLSearchParams(window.location.search).get('stress'))
  if (!Number.isFinite(n) || n <= 0) return null
  return Array.from({ length: Math.min(5000, Math.floor(n)) }, (_, i) => ITEMS[i % ITEMS.length])
}

export const OG_IMAGE = '/og/portfolio.png'

export const META = {
  title: `${wallet.title} | Noé Osorio`,
  description: 'Every project I have built, from AI agents to learning tools and games. Search by name or topic and open any of them.',
}
