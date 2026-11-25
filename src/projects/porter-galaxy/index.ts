import type { ProjectPage } from '../types'
import { COPY } from './data'
import { mountGalaxy } from './galaxy.mount'

// Porter Galaxy: the live galaxy in the hero, the Pod list that turns into it, and the real app scrubbed by scroll.
const page: ProjectPage = {
  id: 'porter-galaxy',
  tone: 'dark',
  ogImage: '/og/porter-galaxy.png',
  meta: {
    es: { title: COPY.es.metaTitle, description: COPY.es.metaDescription },
    en: { title: COPY.en.metaTitle, description: COPY.en.metaDescription },
  },
  mount: mountGalaxy,
}

export default page
