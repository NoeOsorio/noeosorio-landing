import { wallet } from '../../home/data/wallet'
import type { Lang } from '../types'

// Shared facts (price, note, head) come from the wallet, the one source for every project card.
const card = wallet.projects.find((p) => p.id === 'maiden-os')!
const pitch = card.pitch

export interface MaidenCopy {
  rq: string
  head: string
  price: string
  note: string
  // The four requests that travel along the threads into the core.
  req: string[]
  // Labels beside the scenes of the scroll story.
  t: { tg: string; tbl: string; mac: string; guide: string; ip: string; aud: string; ask: string; lim: string; log: string }
  tbl: { t: string; c: string[]; r: string[][] }
  gde: { t: string; s: string; x: string[][] }
  aud: string
  gat: { t: string; p: string; a: string; o: string; no: string; yes: string; dn: string; dp: string; sp: string }
  // Rows: time, action, hash, verdict, permission level (0 read, 1 reversible, 2 confirm, 3 forbidden).
  led: { t: string; lv: string[]; ok: string; r: [string, string, string, string, number][] }
  metaTitle: string
  metaDescription: string
}

export const COPY: Record<Lang, MaidenCopy> = {
  es: {
    rq: '¿Y qué haces tú por mí?',
    head: 'Un asistente que hace el trabajo, dentro de los límites que tú pones.',
    price: 'Personal', note: 'Aún no disponible',
    req: ['Compárame tres laptops para la universidad', 'Hazme una guía de estudio de la fotosíntesis', 'Resúmela en un audio de dos minutos', 'Completa la guía con fuentes nuevas'],
    t: { tg: 'Pídeselo a Maiden desde Telegram', tbl: 'Te responde con una tabla', mac: 'O desde tu Mac', guide: 'Una guía de estudio, en vivo', ip: 'O desde tu iPhone', aud: 'Un audio para el camino', ask: 'Maiden te pregunta antes de gastar', lim: 'Tú pones los límites', log: 'Maiden registra cada acción' },
    tbl: { t: 'Tres laptops para la universidad', c: ['Modelo', 'Peso', 'Batería', 'Precio'], r: [['Arco 15', '1.8 kg', '9 h', '$610'], ['Tempo 14', '1.4 kg', '11 h', '$740'], ['Lira 13', '1.2 kg', '14 h', '$890']] },
    gde: { t: 'La fotosíntesis', s: 'Guía de estudio', x: [['Qué necesita la planta', 'Luz del sol, agua de la raíz', 'y dióxido de carbono del aire.'], ['Qué pasa en la hoja', 'Los cloroplastos capturan la luz', 'y arman azúcar con el agua.'], ['Qué produce', 'Glucosa para la planta', 'y oxígeno para el aire.']] },
    aud: 'Resumen de la fotosíntesis',
    gat: { t: '¿Investigo a fondo?', p: 'Un empleado de solo lectura busca fuentes nuevas.', a: 'hasta $0.40', o: 'de $3 al día', no: 'No', yes: 'Sí, dale', dn: 'Hecho', dp: 'Gasté $0.40. Quedan $2.38 hoy.', sp: 'Gasto de hoy' },
    led: { t: 'Registro de Maiden', lv: ['Leer', 'Reversible', 'Confirmar', 'Prohibido'], ok: 'Cadena sin cortes', r: [['4:12', 'Buscó precios de laptops', '9f3a…c1d2', 'Permitido', 0], ['4:12', 'Armó la tabla', 'c1d2…7be0', 'Permitido', 1], ['4:14', 'Escribió la guía', '7be0…a44f', 'Permitido', 1], ['4:16', 'Hizo el audio', 'a44f…03d9', 'Permitido', 1], ['4:19', 'Intentó pagar un pedido', '03d9…e815', 'Bloqueado', 3], ['4:21', 'Investigar a fondo', 'e815…5a6c', 'Preguntó, dijiste sí', 2]] },
    metaTitle: 'Maiden OS: un asistente que trabaja dentro de tus límites | Noé Osorio',
    metaDescription: 'Pídele a Maiden desde Telegram, tu Mac o tu iPhone y haz que el trabajo salga: una tabla, una guía de estudio, un audio. Con niveles de permiso, límites de gasto y un registro de cada acción.',
  },
  en: {
    rq: 'So what do you do for me?',
    head: pitch.head,
    price: pitch.price, note: pitch.note,
    req: ['Compare three laptops for college', 'Make me a study guide on photosynthesis', 'Summarize it as a two-minute audio', 'Complete the guide with new sources'],
    t: { tg: 'Ask Maiden from Telegram', tbl: 'Get a table back', mac: 'Or from your Mac', guide: 'A study guide, written live', ip: 'Or from your iPhone', aud: 'An audio for the road', ask: 'Maiden asks before it spends', lim: 'You set the limits', log: 'Maiden logs every action' },
    tbl: { t: 'Three laptops for college', c: ['Model', 'Weight', 'Battery', 'Price'], r: [['Arco 15', '1.8 kg', '9 h', '$610'], ['Tempo 14', '1.4 kg', '11 h', '$740'], ['Lira 13', '1.2 kg', '14 h', '$890']] },
    gde: { t: 'Photosynthesis', s: 'Study guide', x: [['What the plant needs', 'Sunlight, water from the root', 'and carbon dioxide from the air.'], ['What happens in the leaf', 'Chloroplasts capture the light', 'and build sugar from water.'], ['What it makes', 'Glucose for the plant', 'and oxygen for the air.']] },
    aud: 'Photosynthesis summary',
    gat: { t: 'Research in depth?', p: 'A read-only helper looks for new sources.', a: 'up to $0.40', o: 'of $3 a day', no: 'No', yes: 'Yes, go', dn: 'Done', dp: 'Spent $0.40. $2.38 left today.', sp: 'Spent today' },
    led: { t: "Maiden's log", lv: ['Read', 'Reversible', 'Confirm', 'Forbidden'], ok: 'Chain intact', r: [['4:12', 'Looked up laptop prices', '9f3a…c1d2', 'Allowed', 0], ['4:12', 'Built the table', 'c1d2…7be0', 'Allowed', 1], ['4:14', 'Wrote the guide', '7be0…a44f', 'Allowed', 1], ['4:16', 'Made the audio', 'a44f…03d9', 'Allowed', 1], ['4:19', 'Tried to pay for an order', '03d9…e815', 'Blocked', 3], ['4:21', 'Research in depth', 'e815…5a6c', 'Asked, you said yes', 2]] },
    metaTitle: 'Maiden OS: an assistant that works within your limits | Noé Osorio',
    metaDescription: `${card.text} Ask from Telegram, your Mac or your iPhone; permission levels, spending limits and a log of every action.`,
  },
}
