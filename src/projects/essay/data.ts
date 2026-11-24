import { wallet } from '../../home/data/wallet'
import type { Lang } from '../types'

// Shared facts come from the wallet, the one source for every project card.
const card = wallet.projects.find((p) => p.id === 'essay-studio')!
export const REPO = card.source as string

export interface EssayCopy {
  metaTitle: string
  metaDescription: string
  intro: string
  // Captions beside the model, in scroll order.
  caps: [string, string][]
  detailsTitle: string
  details: [string, string][]
  // Tabs on the first desk object, one per agent.
  tabs: [string, string, string, string]
  waitlist: { title: string; text: string; placeholder: string; emailLabel: string; button: string; sending: string; done: string; invalid: string; failed: string }
  github: string
  stack: string
  platform: string
}

export const COPY: Record<Lang, EssayCopy> = {
  es: {
    metaTitle: 'Essay Studio, de Noé Osorio',
    metaDescription: 'Una app de escritorio para escribir donde cuatro agentes de IA cuestionan tu ensayo en vez de escribirlo por ti.',
    intro: 'Una app de escritorio para escribir donde cuatro agentes de IA cuestionan tu ensayo en vez de escribirlo por ti.',
    caps: [
      ['Tú escribes.', 'El ensayo sigue siendo tuyo. Nadie lo escribe por ti.'],
      ['Los agentes preguntan.', 'Evidencia, Sistemas y Objeciones dejan sus preguntas en el tablero.'],
      ['Luego revisan.', 'Cada afirmación por revisar queda subrayada con el color de su agente, con una calificación.'],
    ],
    detailsTitle: 'Te hace pensar, no escribe por ti.',
    details: [
      ['Cuatro agentes', 'Evidencia, sistemas, práctica y objeciones tienen cada uno su voz y su color. Hacen preguntas y marcan tu texto.'],
      ['Una calificación que puedes revisar', 'Empieza en 10 y baja con cada hallazgo abierto. Puedes aplicar un hallazgo o descartarlo.'],
      ['Rúbrica y fuentes', 'Suelta la consigna y aparecen sus criterios con su peso. Suelta un PDF y se llenan el título, los autores y la cita.'],
      ['Tuyo, en tu computadora', 'Los ensayos se guardan como archivos en tu máquina, con versiones automáticas y un respaldo antes de cada restauración. También puedes crear tus propios agentes.'],
    ],
    tabs: ['Evidencia', 'Sistemas', 'Objeciones', 'Práctica'],
    waitlist: {
      title: 'Avísame cuando esté lista',
      text: 'Deja tu correo y te escribo cuando puedas descargarla. Solo para eso.',
      placeholder: 'tu@correo.com',
      emailLabel: 'Tu correo',
      button: 'Avísame',
      sending: 'Guardando…',
      done: 'Listo. Te escribo cuando esté lista.',
      invalid: 'Escribe un correo válido.',
      failed: 'No se pudo guardar tu correo. Inténtalo de nuevo.',
    },
    github: 'Ver el código en GitHub',
    stack: 'Código abierto, hecho con Rust, Tauri, Next.js y TypeScript',
    platform: 'Mac',
  },
  en: {
    metaTitle: 'Essay Studio, by Noé Osorio',
    metaDescription: 'A desktop writing app where four AI agents question your essay instead of writing it for you.',
    intro: 'A desktop writing app where four AI agents question your essay instead of writing it for you.',
    caps: [
      ['You write.', 'The essay stays yours. Nothing is written for you.'],
      ['Agents ask.', 'Evidence, Systems and Objections each leave their questions on the board.'],
      ['Then they review.', "Every claim to check is underlined in its agent's color, with a score."],
    ],
    detailsTitle: "It makes you think. It doesn't write for you.",
    details: [
      ['Four agents', 'Evidence, systems, practice and objections each have their own voice and color. They ask questions and mark your text.'],
      ['A score you can check', 'It starts at 10 and drops with each open finding. You can apply a finding or dismiss it.'],
      ['Rubric and sources', 'Drop an assignment and its criteria appear with their weight. Drop a PDF and the title, authors and citation fill in.'],
      ['Yours, on your computer', 'Essays are saved as files on your machine, with automatic versions and a backup before every restore. You can also create your own agents.'],
    ],
    tabs: ['Evidence', 'Systems', 'Objections', 'Practice'],
    waitlist: {
      title: "Tell me when it's ready",
      text: "Leave your email and I'll write when you can download it. Nothing else.",
      placeholder: 'you@email.com',
      emailLabel: 'Your email',
      button: 'Notify me',
      sending: 'Saving…',
      done: "Done. I'll write when it's ready.",
      invalid: 'Enter a valid email.',
      failed: "Your email couldn't be saved. Try again.",
    },
    github: 'See the code on GitHub',
    stack: 'Open source, built with Rust, Tauri, Next.js and TypeScript',
    platform: 'Mac',
  },
}

// The app shown in the model is in Spanish in both languages, because the app itself is in Spanish.
// {em:…} {sis:…} {cri:…} mark what each agent underlines.
export const TITLE = 'La paradoja de la seguridad psicológica en equipos remotos'
export const BODY =
  '{sis:Edmondson definió la seguridad} psicológica como {sis:la creencia compartida de} que el {sis:equipo es seguro para} tomar riesgos interpersonales. {em:En equipos remotos esa} creencia se {em:sostiene con rituales pequeños:} el café, la {em:mirada, el silencio cómodo} después de {cri:una pregunta. Sin} ellos, todos {cri:asumen que preguntar} es {cri:arriesgado y el} {em:equipo deja de aprender.}'

// One note per agent: real findings from the app, and the real lens description of Práctica.
export const NOTES: [string, string, string][] = [
  ['em', 'Evidencia', '¿En qué muestra se midió ese efecto y con qué N?'],
  ['sis', 'Sistemas', '¿Qué loop de retroalimentación sostiene este comportamiento?'],
  ['pra', 'Práctica', 'Aterriza la idea: qué harías el lunes con tu equipo.'],
  ['cri', 'Objeciones', '¿Cuál sería el steelman del lado opuesto?'],
]
