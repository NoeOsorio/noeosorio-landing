import { wallet } from '../../home/data/wallet'
import type { Lang } from '../types'

// Shared facts (the headline and the status) come from the wallet, the one source for every project card.
const card = wallet.projects.find((p) => p.id === 'telar')!
const pitch = card.pitch

export type Beat = 'ink' | 'choice' | 'rule' | 'phone' | 'yml2' | 'later' | 'mem' | 'term'

export interface TelarCopy {
  head: string
  status: string
  // The short label that sits over each beat of the story.
  L: Record<Beat, string>
  metaTitle: string
  metaDescription: string
}

export const COPY: Record<Lang, TelarCopy> = {
  es: {
    head: 'Novelas visuales que recuerdan.',
    status: 'En desarrollo',
    L: { ink: 'Escribes la escena', choice: 'Tú eliges', rule: 'Jorge actúa solo', phone: 'Te enteras después', yml2: 'La escena espera el recuerdo', later: 'Semana 5, vuelve', mem: 'El cuaderno lo dibuja', term: 'Cada vida es distinta' },
    metaTitle: 'Telar: novelas visuales que recuerdan | Noé Osorio',
    metaDescription: 'Telar es un motor para crear novelas visuales. Cada decisión queda guardada como un hecho y vuelve semanas después, mientras los personajes actúan solos. En desarrollo.',
  },
  en: {
    head: pitch.head,
    status: pitch.price,
    L: { ink: 'You write the scene', choice: 'You choose', rule: 'Jorge acts on his own', phone: 'You find out later', yml2: 'The scene waits for the memory', later: 'Week 5, it returns', mem: 'The notebook draws it', term: 'Every life is different' },
    metaTitle: 'Telar: visual novels that remember | Noé Osorio',
    metaDescription: `Telar is an engine for making visual novels. ${pitch.how} ${pitch.price}.`,
  },
}

// The real files, in Spanish as they are written: excerpts of mundos/la-beca. `g` opens a gap above the line, `h` is the line that lights.
export interface Line { t: string; g?: 1; h?: 1 }
export interface FileSpec { fn: string; l: Line[] }
const K = (t: string) => `<span class="k">${t}</span>`
const Sx = (t: string) => `<span class="s">${t}</span>`
const F = (t: string) => `<span class="f">${t}</span>`
const N = (t: string) => `<span class="n">${t}</span>`
const U = (t: string) => `<span class="u">${t}</span>`

export const FILES: Record<'sheet' | 'ink' | 'rule' | 'yml2' | 'term', FileSpec> = {
  sheet: { fn: 'mundo.yaml', l: [{ t: K('nombre:') + Sx(' La beca') }, { t: K('duracion:') + N(' 32') }, { t: K('personajes:') }, { t: '  - ' + K('id:') + Sx(' maria') }, { t: '    ' + K('nombre:') + Sx(' María') }, { t: '    ' + K('rasgos:') + U(' { ') + K('honestidad:') + N(' 85') + U(', ') + K('orgullo:') + N(' 40') + U(' }') }] },
  ink: { fn: 'solicitud-beca.ink', l: [{ t: U('Te quedas mirando la línea en blanco. Es solo un número.') }, { t: F('* [Falsificar el promedio]'), g: 1 }, { t: '    ' + F('~ registrarHecho(') + Sx('"mentira"') + U(', ') + Sx('"jugador"') + U(', ') + Sx('"maria"') + U(', ') + N('6') + F(')'), h: 1 }, { t: F('* [Entregar el promedio real]'), g: 1 }, { t: '    ' + F('~ modificarRelacion(') + Sx('"maria"') + U(', ') + Sx('"jugador"') + U(', ') + Sx('"confianza"') + U(', ') + N('15') + F(')') }] },
  rule: { fn: 'jorge-invita-a-maria.regla.yaml', l: [{ t: K('id:') + Sx(' jorge-invita-a-maria') }, { t: K('probabilidad:') + N(' 0.12') }, { t: K('donde:'), g: 1 }, { t: '  - ' + K('relacion:') + Sx(' afecto(jorge -> maria)') + U(' >= ') + N('25') }, { t: K('efectos:') }, { t: '  - ' + K('hecho:') + Sx(' cita(jorge -> maria)') + K(' peso') + N(' 3'), h: 1 }, { t: K('mensaje:') }, { t: '  ' + K('de:') + Sx(' maria') }, { t: '  ' + K('lineas:') }, { t: '    - ' + Sx('Oye, pregunta rara.') }] },
  yml2: { fn: 'maria-descubre.storylet.yaml', l: [{ t: K('id:') + Sx(' maria-descubre') }, { t: K('titulo:') + Sx(' María encuentra el expediente') }, { t: K('peso:') + N(' 8') }, { t: K('donde:'), g: 1 }, { t: '  - ' + K('hecho:') + Sx(' mentira(jugador -> maria)') + F(' sin_resolver'), h: 1 }, { t: '  - ' + K('quality:') + Sx(' reloj') + U(' >= ') + N('4') }] },
  term: { fn: 'terminal', l: [{ t: '<span class="p">$</span> pnpm telar validar mundos/la-beca' }, { t: '<span class="ok">✓</span> "La beca": 73 storylets, 8 personajes, 6 reglas de personajes' }, { t: '<span class="p">$</span> pnpm telar simular mundos/la-beca', g: 1 }, { t: Sx('Vidas que no se repiten: ') + K('100 de 100'), h: 1 }, { t: Sx('Escenas en común entre dos vidas: ') + K('54%') }, { t: Sx('Una vida dura unos ') + K('28 min') }] },
}
