import type { ProjectPage } from '../types'
import { COPY } from './data'
import { mountKanji } from './kanji.mount'

// Kanji Study App: washi still life, a phone that turns as you scroll, and the quiz cards that flip out of it.
const page: ProjectPage = {
  id: 'kanji',
  tone: 'paper',
  ogImage: '/og/kanji.png',
  meta: {
    es: { title: COPY.es.metaTitle, description: COPY.es.metaDescription },
    en: { title: COPY.en.metaTitle, description: COPY.en.metaDescription },
  },
  mount: mountKanji,
}

export default page
