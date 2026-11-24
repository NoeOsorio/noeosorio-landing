import type { ProjectPage } from '../types'
import { COPY } from './data'
import { mountPyventa } from './pyventa.mount'

// Pyventa Web: a receipt that prints the headline, a counter of drawn products and the real checkout, scrolled like a shift at the shop.
const page: ProjectPage = {
  id: 'pyventa',
  tone: 'paper',
  ogImage: '/og/pyventa.png',
  meta: {
    es: { title: COPY.es.metaTitle, description: COPY.es.metaDescription },
    en: { title: COPY.en.metaTitle, description: COPY.en.metaDescription },
  },
  mount: mountPyventa,
}

export default page
