import { wallet } from '../../home/data/wallet'
import type { Lang } from '../types'

// Shared facts (headline, status) come from the wallet, the one source for every project card.
const card = wallet.projects.find((p) => p.id === 'whiteboard')!
const pitch = card.pitch

export interface Scene { t: string; say: string; a: string; b?: string }
export interface WhiteboardCopy {
  head: string
  status: string
  // The demo class: title of the feature, what the teacher says, and what the board writes.
  sc: Scene[]
  metaTitle: string
  metaDescription: string
}

export const COPY: Record<Lang, WhiteboardCopy> = {
  es: {
    head: 'Notas que se dibujan solas mientras enseñas.',
    status: 'En desarrollo',
    sc: [
      { t: 'Escucha mientras hablas', say: 'Hoy vamos a ver cómo toman agua las plantas.', a: 'Las raíces absorben agua' },
      { t: 'Dibuja notas cortas en vivo', say: 'El agua sube por el tallo hasta las hojas.', a: 'Raíz, tallo, hojas' },
      { t: 'Respeta tus correcciones', say: 'Una planta bebe diez litros al día... perdón, un litro.', a: 'Bebe 10 L al día', b: 'Bebe 1 L al día' },
      { t: 'Solo dibuja lo que se puede dibujar', say: 'La fotosíntesis es una idea. Una hoja sí se puede dibujar.', a: 'Fotosíntesis', b: 'Una hoja' },
      { t: 'En vivo o desde una nota de voz', say: 'Puedes hablar en vivo, o subir una nota de voz.', a: 'En vivo', b: 'Nota de voz' },
    ],
    metaTitle: 'Whiteboard: notas que se dibujan solas mientras enseñas | Noé Osorio',
    metaDescription: 'Un pizarrón que escucha mientras hablas y dibuja notas cortas en vivo. Respeta tus correcciones y solo dibuja lo que se puede dibujar. En desarrollo.',
  },
  en: {
    head: pitch.head,
    status: pitch.price,
    sc: [
      { t: 'It listens while you talk', say: "Today we'll see how plants take in water.", a: 'Roots absorb water' },
      { t: 'It draws short notes, live', say: 'Water travels up the stem to the leaves.', a: 'Root, stem, leaves' },
      { t: 'It respects your corrections', say: 'A plant drinks ten liters a day... sorry, one liter.', a: 'Drinks 10 L a day', b: 'Drinks 1 L a day' },
      { t: 'It only draws what can be drawn', say: 'Photosynthesis is an idea. A leaf can be drawn.', a: 'Photosynthesis', b: 'A leaf' },
      { t: 'Live or from a voice note', say: 'You can talk live, or upload a voice note.', a: 'Live', b: 'Voice note' },
    ],
    metaTitle: 'Whiteboard: notes that draw themselves while you teach | Noé Osorio',
    metaDescription: `${card.text} ${pitch.how} ${pitch.price}.`,
  },
}

export const INK = '#1D1B18', BLU = '#2F6FD6', RED = '#D64545', GRN = '#2E9E62'

type Strokes = [string, string][]
// The card's own strokes: a speech bubble, a wavy note, an arrow, the board with a tick and two red lines.
export const ART: Strokes = [
  ['M196 86 C 220 82 250 84 274 83 C 281 84 283 90 283 98 L 282 120 C 282 128 278 131 270 131 L 226 132 L 204 148 L 207 132 C 198 132 192 129 192 121 L 193 96 C 193 90 192 87 196 86 Z', BLU],
  ['M206 100 q6 -6 12 0 t12 0 t12 0 t12 0 t12 0', INK], ['M206 115 q6 -5 12 0 t12 0 t12 0', INK],
  ['M204 72 L198 63 M237 69 L237 58 M270 72 L277 63', BLU],
  ['M294 112 C 312 104 330 106 352 112', INK], ['M342 103 L353 112 L341 119', INK],
  ['M368 84 C 395 80 430 82 462 81 C 468 82 470 88 470 95 L 469 140 C 469 147 465 150 458 150 L 376 151 C 369 151 366 147 366 140 L 367 92 C 367 88 366 85 368 84 Z', GRN],
  ['M382 102 q6 -5 12 0 t12 0 t12 0 t12 0 t12 0', INK], ['M382 118 q6 -5 12 0 t12 0 t12 0', INK],
  ['M382 133 l6 7 l14 -15', RED], ['M372 166 C 400 160 430 170 466 162', RED], ['M384 175 C 408 171 436 177 456 172', RED],
]
export const MICP: Strokes = [['M141 92 a9 9 0 0 1 18 0 v18 a9 9 0 0 1 -18 0 Z', BLU], ['M133 106 a17 17 0 0 0 34 0', BLU], ['M150 124 v12 M139 137 h22', BLU]]
export const CL = { x0: 133, y0: 58, w: 337, h: 122 }

const bars = (x0: number, n: number, step: number, hs: number[], cy: number) => {
  let d = ''
  for (let i = 0; i < n; i++) { const h = hs[i % hs.length]; d += `M${x0 + i * step} ${cy - h / 2} V${cy + h / 2} ` }
  return d
}
// Simple doodles, hand-built vector strokes: [box width, box height, strokes].
export const DOO: Record<string, [number, number, Strokes]> = {
  plant: [100, 130, [['M24 94 L76 94 L68 126 L32 126 Z', INK], ['M19 94 H81', INK], ['M50 94 C49 76 51 58 50 38', GRN], ['M50 66 C30 64 20 50 22 38 C40 38 50 50 50 66 Z', GRN], ['M50 52 C70 50 80 36 78 24 C60 24 50 38 50 52 Z', GRN], ['M10 22 C10 22 4 31 4 36 a6 6 0 0 0 12 0 C16 31 10 22 10 22 Z', BLU], ['M92 66 C92 66 86 75 86 80 a6 6 0 0 0 12 0 C98 75 92 66 92 66 Z', BLU]]],
  leaf: [80, 90, [['M40 8 C70 20 74 56 40 84 C6 56 10 20 40 8 Z', GRN], ['M40 20 V80 M40 42 L55 32 M40 58 L25 48', GRN]]],
  mic: [70, 60, [['M17 12 a9 9 0 0 1 18 0 v18 a9 9 0 0 1 -18 0 Z', BLU], ['M9 26 a17 17 0 0 0 34 0', BLU], ['M26 44 v12 M15 57 h22', BLU], ['M50 18 a14 14 0 0 1 0 22', BLU], ['M58 10 a24 24 0 0 1 0 38', BLU]]],
  memo: [160, 64, [['M14 2 H146 a12 12 0 0 1 12 12 V50 a12 12 0 0 1 -12 12 H14 a12 12 0 0 1 -12 -12 V14 a12 12 0 0 1 12 -12 Z', RED], ['M22 22 L22 42 L38 32 Z', RED], [bars(52, 11, 9, [6, 16, 32, 12, 44, 20, 36, 12, 24, 8, 20], 32), RED]]],
}
