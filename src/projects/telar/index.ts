import type { ProjectPage } from '../types'
import { COPY } from './data'
import { mountTelar } from './telar.mount'

// Telar: the engine for visual novels that remember. The name sewn in cross-stitch, a loom, and a world file that threads into the game.
const page: ProjectPage = {
  id: 'telar',
  tone: 'dark',
  ogImage: '/og/telar.png',
  meta: {
    es: { title: COPY.es.metaTitle, description: COPY.es.metaDescription },
    en: { title: COPY.en.metaTitle, description: COPY.en.metaDescription },
  },
  mount: mountTelar,
}

export default page
