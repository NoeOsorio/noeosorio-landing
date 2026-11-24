import { wallet } from '../../home/data/wallet'
import type { Lang } from '../types'

// Shared facts (price, note, button, link, platforms) come from the wallet, the one source for every project card.
const card = wallet.projects.find((p) => p.id === 'porter-galaxy')!
const pitch = card.pitch

export const REPO = pitch.cta![1]

export interface GalaxyCopy {
  head: string
  price: string
  note: string
  plat: string
  cta: string
  // Labels under the window in the scroll story.
  t: Record<'list' | 'd3' | 'topo' | 'find' | 'where' | 'live', string>
  // Column titles of the Pod list, wide and narrow.
  hd: string[]
  hdm: string[]
  metaTitle: string
  metaDescription: string
}

export const COPY: Record<Lang, GalaxyCopy> = {
  es: {
    head: 'Mira tu clúster de Kubernetes como una galaxia viva.',
    price: 'Código abierto', note: 'Gratis',
    plat: 'Para cualquier clúster de Kubernetes, en el navegador.',
    cta: 'Ver código',
    t: { list: 'Difícil de imaginar en una lista', d3: 'Todo el clúster, en 3D', topo: 'Cómo llega el tráfico a tus cargas', find: 'Busca un Pod y vuela hasta él', where: 'Dónde corre cada Pod', live: 'En vivo, mientras el clúster cambia' },
    hd: ['NAMESPACE', 'NOMBRE', 'LISTO', 'ESTADO', 'REINICIOS', 'EDAD'], hdm: ['NOMBRE', 'ESTADO'],
    metaTitle: 'Porter Galaxy: tu clúster de Kubernetes como una galaxia | Noé Osorio',
    metaDescription: 'Dibuja todo el clúster de Kubernetes en 3D y se actualiza en vivo. Dos vistas de un mismo grafo: cómo llega el tráfico y dónde corre cada Pod. Gratis, de código abierto.',
  },
  en: {
    head: pitch.head,
    price: pitch.price, note: pitch.note,
    plat: 'For any Kubernetes cluster, in the browser.',
    cta: pitch.cta![0],
    t: { list: 'Hard to picture from a list', d3: 'The whole cluster, in 3D', topo: 'How traffic reaches your workloads', find: 'Search a Pod and fly to it', where: 'Where every Pod runs', live: 'Live as the cluster changes' },
    hd: ['NAMESPACE', 'NAME', 'READY', 'STATUS', 'RESTARTS', 'AGE'], hdm: ['NAME', 'STATUS'],
    metaTitle: 'Porter Galaxy: your Kubernetes cluster as a living galaxy | Noé Osorio',
    metaDescription: `${card.text} ${pitch.price}, ${pitch.note.toLowerCase()}.`,
  },
}

// The list the window shows before it becomes a galaxy: names the real stream serves.
const NSL = ['shop', 'payments', 'auth', 'search', 'media', 'monitoring', 'data', 'mail']
const DEP = ['web', 'api', 'worker', 'cache', 'gateway', 'queue']
export interface PodRow { ns: string; nm: string; rd: string; st: string; rs: number; c: string; age: string }
export function podRows(n: number): PodRow[] {
  let s = 11
  const r = () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296
  const o: PodRow[] = []
  for (let i = 0; i < n; i++) {
    const ns = NSL[Math.floor(r() * 6)], d = DEP[Math.floor(r() * DEP.length)], id = String(Math.floor(r() * 900) + 20).padStart(6, '0')
    let st = 'Running', c = 'var(--ok)', rd = '1/1', rs = 0
    const q = r()
    if (i === 5) { st = 'CrashLoopBackOff'; c = 'var(--bad)'; rd = '0/1'; rs = 7 }
    else if (i === 11) { st = 'Pending'; c = 'var(--warn)'; rd = '0/1' }
    else if (i === 16) { st = 'Completed'; c = 'var(--done)'; rd = '0/1' }
    else if (q > .93) { st = 'Running'; rs = 1 }
    o.push({ ns, nm: d + '-' + id, rd, st, rs, c, age: Math.max(1, Math.floor(r() * 58)) + (r() > .5 ? 'm' : 'h') })
  }
  return o
}

// Pods found on the live hero capture, as fractions of the frame (the words reach out to them).
export const HERO = {
  d: { ell: [.495, .64, .30, .31], pods: [[.352, .370], [.211, .544], [.521, .341], [.318, .423], [.2875, .447], [.357, .433]], tick: [[.357, .433], [.521, .341], [.211, .544], [.441, .404], [.69, .466], [.769, .68], [.609, .852]] },
  m: { ell: [.49, .564, .47, .18], pods: [[.222, .408], [.032, .527], [.541, .383], [.164, .446], [.119, .464], [.229, .452]], tick: [[.229, .452], [.541, .383], [.032, .527], [.40, .70], [.92, .51], [.748, .678]] },
} as const
