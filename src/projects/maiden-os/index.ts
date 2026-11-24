import type { ProjectPage } from '../types'
import { COPY } from './data'
import { mountMaidenOs } from './maiden-os.mount'

// Maiden OS: a living core in the night, requests that travel as light, and glass objects built live.
const page: ProjectPage = {
  id: 'maiden-os',
  tone: 'dark',
  ogImage: '/og/maiden-os.png',
  meta: {
    es: { title: COPY.es.metaTitle, description: COPY.es.metaDescription },
    en: { title: COPY.en.metaTitle, description: COPY.en.metaDescription },
  },
  mount: mountMaidenOs,
}

export default page
