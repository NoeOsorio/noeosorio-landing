import type { ProjectPage } from '../types'
import { COPY } from './data'
import { mountEssay } from './essay.mount'

// Essay Studio: cream paper that writes itself, a sheet that tilts into 3D over the stars, a desk of details and a tear-off waitlist slip.
const page: ProjectPage = {
  id: 'essay',
  tone: 'paper',
  ogImage: '/og/essay.png',
  meta: {
    es: { title: COPY.es.metaTitle, description: COPY.es.metaDescription },
    en: { title: COPY.en.metaTitle, description: COPY.en.metaDescription },
  },
  mount: mountEssay,
}

export default page
