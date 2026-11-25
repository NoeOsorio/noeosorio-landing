import type { ProjectPage } from '../types'
import { COPY } from './data'
import { mountWhiteboard } from './whiteboard.mount'

// Whiteboard: a board that writes, draws and erases a short class on its own as you scroll.
const page: ProjectPage = {
  id: 'whiteboard',
  tone: 'dark',
  ogImage: '/og/whiteboard.png',
  meta: {
    es: { title: COPY.es.metaTitle, description: COPY.es.metaDescription },
    en: { title: COPY.en.metaTitle, description: COPY.en.metaDescription },
  },
  mount: mountWhiteboard,
}

export default page
