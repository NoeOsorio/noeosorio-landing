import { wallet } from '../../home/data/wallet'
import type { Lang } from '../types'

// Shared facts (price, note, button, link, platforms) come from the wallet, the one source for every project card.
const card = wallet.projects.find((p) => p.id === 'kanji')!
const pitch = card.pitch

export const REPO = pitch.cta![1]

export interface KanjiCopy {
  head: string
  price: string
  note: string
  phone: string
  plat: string
  cta: string
  // Labels beside the scenes of the scroll story.
  t: { lessons: string; read: string; phr: string; write: string; six: string }
  metaTitle: string
  metaDescription: string
}

export const COPY: Record<Lang, KanjiCopy> = {
  es: {
    head: 'Aprende kanji en español, un trazo a la vez.',
    price: 'Código abierto', note: 'Gratis', phone: 'Teléfono',
    plat: 'Gratis, para tu teléfono y el navegador.',
    cta: 'Ver el código',
    t: { lessons: 'Lecciones cortas', read: 'Lecturas', phr: 'Frases de ejemplo', write: 'Práctica de trazos', six: 'Seis modos de examen' },
    metaTitle: 'Kanji Study App: aprende kanji en español | Noé Osorio',
    metaDescription: 'Aprende kanji japonés en español con lecciones cortas, práctica de trazos y seis modos de examen. Gratis, de código abierto, para tu teléfono y el navegador.',
  },
  en: {
    head: pitch.head,
    price: pitch.price, note: pitch.note, phone: 'Phone',
    plat: 'Free, for your phone and the browser.',
    cta: pitch.cta![0],
    t: { lessons: 'Short lessons', read: 'Readings', phr: 'Example phrases', write: 'Stroke practice', six: 'Six quiz modes' },
    metaTitle: 'Kanji Study App: learn kanji in Spanish | Noé Osorio',
    metaDescription: `${card.text} ${pitch.price}, ${pitch.note.toLowerCase()}, for your phone and the browser.`,
  },
}

// The app itself is in Spanish in both languages, so these quiz-mode names are the app's own.
export const MODES = ['Kanji', 'Lectura', 'Por lectura', 'Palabras', 'Mezcla']

// Real stroke geometry of 学 (KanjiVG, the same data the app draws its guide from), in the app's 109 x 109 box.
export const STROKES = [
  'M29.5,17.25c3.5,3,6.5,7.25,7.75,9.75',
  'M49,12c1.25,2,4.75,8.25,5.25,11.5',
  'M75,11c0.25,1.75-0.12,2.75-0.75,4.25c-1.29,3.1-4.25,7.38-6.5,9.75',
  'M21.25,33.75c-0.12,4.75-2,12.5-3.75,16.25',
  'M23.5,36.5c17-1.62,42.38-5.5,60-5.75c9.5-0.13,4.12,5.12,0,9',
  'M37.25,46.5c1,0.25,3.75,0.25,5.5-0.25s18.25-4,20-4s2.75,0.75,1,2.25S54.5,53.5,53,54.75',
  'M50.75,55.75c4,8.75,7.18,24.67,1.75,38c-2.75,6.75-7.75,1.25-9.75-2',
  'M15.75,67.75c1.75,1,4.64,1.36,7.5,1c15.88-2,44.43-6.25,61.37-5.5c2.5,0.11,4.72,0.25,6.39,1',
]
