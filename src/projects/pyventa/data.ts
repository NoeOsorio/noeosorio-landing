import { wallet } from '../../home/data/wallet'
import type { Lang } from '../types'

// Shared facts (price, note, button, link) come from the wallet, the one source for every project card.
const card = wallet.projects.find((p) => p.id === 'pyventa')!
const pitch = card.pitch

// The button goes to the site's own contact page.
export const CONTACT = (() => { try { const u = new URL(pitch.cta![1]); return u.hostname.endsWith('noeosorio.com') ? u.pathname : u.href } catch { return '/contact' } })()

export interface PyventaCopy {
  head: string
  rows: [string, string, string]
  price: string
  plat: string
  cta: string
  // Labels beside the scenes of the scroll story.
  t: { reader: string; line: string; f5: string; change: string; ticket: string; drop: string; offsale: string; sends: string; phone: string }
  metaTitle: string
  metaDescription: string
}

export const COPY: Record<Lang, PyventaCopy> = {
  es: {
    head: 'Un punto de venta que sigue vendiendo aunque se caiga el internet.',
    rows: ['A pedido', 'Para tiendas', 'Web y celular'],
    price: 'A pedido',
    plat: 'Para tiendas, en la web y en el celular.',
    cta: 'Solicítalo',
    t: { reader: 'Lee el código de barras', line: 'Renglón, precio y total', f5: 'Cobra con F5', change: 'Cambio al instante', ticket: 'Sale el ticket', drop: 'Se cae el internet', offsale: 'La venta sigue', sends: 'Se envía al volver', phone: 'El celular escanea precios' },
    metaTitle: 'Pyventa Web: punto de venta que sigue sin internet | Noé Osorio',
    metaDescription: 'Punto de venta para tiendas, en la web y en el celular. Cobra con lector de código de barras, imprime el ticket y sigue vendiendo aunque se caiga el internet.',
  },
  en: {
    head: pitch.head,
    rows: [pitch.price, pitch.note, 'Web and phone'],
    price: pitch.price,
    plat: 'For shops, on the web and on the phone.',
    cta: pitch.cta![0],
    t: { reader: 'Reads the barcode', line: 'Line, price and total', f5: 'Charge with F5', change: 'Change due', ticket: 'The ticket prints', drop: 'The internet drops', offsale: 'The sale still goes through', sends: 'It sends itself when back', phone: 'Phone as price scanner' },
    metaTitle: 'Pyventa Web: a point of sale that keeps selling offline | Noé Osorio',
    metaDescription: `${card.text} ${pitch.how} ${pitch.edge}`,
  },
}
