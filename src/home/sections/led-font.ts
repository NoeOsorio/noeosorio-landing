// A 5x7 dot-matrix font for the footer sign. Every glyph is 7 rows tall; lowercase sits in the lower 5 rows,
// ascenders and the accent use the top 2. Widths are proportional. '#' is a lit dot.
const SRC: Record<string, string[]> = {
  ' ': ['...', '...', '...', '...', '...', '...', '...'],
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  B: ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
  C: ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
  D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  F: ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
  G: ['.###.', '#...#', '#....', '#.###', '#...#', '#...#', '.###.'],
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  I: ['###', '.#.', '.#.', '.#.', '.#.', '.#.', '###'],
  J: ['....#', '....#', '....#', '....#', '....#', '#...#', '.###.'],
  K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  N: ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
  O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  Q: ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
  R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  V: ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  W: ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '##.##', '#...#'],
  X: ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
  Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
  Z: ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
  0: ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
  1: ['.#.', '##.', '.#.', '.#.', '.#.', '.#.', '###'],
  2: ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
  3: ['#####', '...#.', '..#..', '...#.', '....#', '#...#', '.###.'],
  4: ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
  5: ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
  6: ['..##.', '.#...', '#....', '####.', '#...#', '#...#', '.###.'],
  7: ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
  8: ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
  9: ['.###.', '#...#', '#...#', '.####', '....#', '...#.', '.##..'],
  '%': ['##..#', '##..#', '...#.', '..#..', '.#...', '#..##', '#..##'],
  ':': ['.', '.', '#', '.', '.', '#', '.'],
  '/': ['....#', '....#', '...#.', '..#..', '.#...', '#....', '#....'],
  '(': ['.#', '#.', '#.', '#.', '#.', '#.', '.#'],
  ')': ['#.', '.#', '.#', '.#', '.#', '.#', '#.'],
  '!': ['#', '#', '#', '#', '#', '.', '#'],
  '?': ['.###.', '#...#', '....#', '...#.', '..#..', '.....', '..#..'],
  '.': ['.', '.', '.', '.', '.', '.', '#'],
  ',': ['..', '..', '..', '..', '.#', '.#', '#.'],
  "'": ['#', '#', '.', '.', '.', '.', '.'],
  '-': ['...', '...', '...', '###', '...', '...', '...'],
  '+': ['...', '...', '.#.', '###', '.#.', '...', '...'],
  e: ['.....', '.....', '.###.', '#...#', '#####', '#....', '.###.'],
  i: ['#', '.', '#', '#', '#', '#', '#'],
  o: ['.....', '.....', '.###.', '#...#', '#...#', '#...#', '.###.'],
  r: ['....', '....', '#.##', '##..', '#...', '#...', '#...'],
  s: ['.....', '.....', '.####', '#....', '.###.', '....#', '####.'],
  é: ['...#.', '.....', '.###.', '#...#', '#####', '#....', '.###.'],
}

export const GLYPH_ROWS = 7
export const LINE_GAP = 2
export const SPACE_W = 3
export const LETTER_GAP = 1

type Glyph = { w: number; rows: number[][] }
export const FONT: Record<string, Glyph> = {}
for (const [ch, rows] of Object.entries(SRC)) FONT[ch] = { w: rows[0].length, rows: rows.map((r) => [...r].map((c) => (c === '#' ? 1 : 0))) }

if (import.meta.env?.DEV) {
  for (const [ch, rows] of Object.entries(SRC)) {
    if (rows.length !== GLYPH_ROWS || rows.some((r) => r.length !== rows[0].length)) console.warn(`led-font: glyph "${ch}" is not ${GLYPH_ROWS} rows of equal width`)
  }
}

export const missingGlyphs = (texts: string[]) => [...new Set(texts.flatMap((t) => [...t]).filter((c) => !FONT[c]))]

const g = (c: string) => FONT[c] ?? FONT['?']
export const textWidth = (s: string) => [...s].reduce((n, c, i) => n + g(c).w + (i ? LETTER_GAP : 0), 0)
const blockHeight = (lines: number) => lines * GLYPH_ROWS + (lines - 1) * LINE_GAP

// Every way to cut the text into one to three lines at word boundaries.
export function breaks(text: string) {
  const words = text.split(' ')
  const out: string[][] = [[text]]
  for (let i = 1; i < words.length; i++) {
    out.push([words.slice(0, i).join(' '), words.slice(i).join(' ')])
    for (let j = i + 1; j < words.length; j++) out.push([words.slice(0, i).join(' '), words.slice(i, j).join(' '), words.slice(j).join(' ')])
  }
  return out
}

const MARGIN = 1
// The biggest whole number of dots per font pixel that fits, with the fewest lines among equals.
export function layoutText(text: string, cols: number, rows: number, share: number) {
  // Among equals, a break that keeps a (bracketed aside) whole wins, then the most even lines, so no word is left alone on a line.
  let best: { k: number; lines: string[]; fits: boolean; w: number; spread: number; torn: number } | null = null
  for (const lines of breaks(text)) {
    const ws = lines.map(textWidth), w = Math.max(...ws), spread = w - Math.min(...ws), torn = lines.some((l) => l.split('(').length !== l.split(')').length) ? 1 : 0, h = blockHeight(lines.length)
    const kFit = Math.min(Math.floor((cols - 2 * MARGIN) / w), Math.floor((rows - 2 * MARGIN) / h))
    const fits = kFit >= 1
    const k = fits ? Math.max(1, Math.min(kFit, Math.floor((share * rows) / h))) : 1
    const better = !best || (fits && !best.fits) || (fits === best.fits && (k > best.k || (k === best.k && (lines.length < best.lines.length || (lines.length === best.lines.length && (torn < best.torn || (torn === best.torn && (w < best.w || (w === best.w && spread < best.spread)))))))))
    if (better) best = { k, lines, fits, w, spread, torn }
  }
  return best as { k: number; lines: string[]; fits: boolean; w: number; spread: number; torn: number }
}

export function rasterText(text: string, cols: number, rows: number, share: number) {
  const out = new Uint8Array(cols * rows)
  const { k, lines } = layoutText(text, cols, rows, share)
  const top = Math.floor((rows - blockHeight(lines.length) * k) / 2)
  lines.forEach((line, li) => {
    let x = Math.floor((cols - textWidth(line) * k) / 2)
    const y0 = top + li * (GLYPH_ROWS + LINE_GAP) * k
    for (const c of line) {
      const gl = g(c)
      for (let r = 0; r < GLYPH_ROWS; r++) for (let q = 0; q < gl.w; q++) {
        if (!gl.rows[r][q]) continue
        for (let dy = 0; dy < k; dy++) for (let dx = 0; dx < k; dx++) {
          const px = x + q * k + dx, py = y0 + r * k + dy
          if (px >= 0 && px < cols && py >= 0 && py < rows) out[py * cols + px] = 1
        }
      }
      x += (gl.w + LETTER_GAP) * k
    }
  })
  return out
}

export const NAME_SHARE = 0.9
export const OFFER_SHARE = 0.85
export const baseCell = (W: number) => (W < 900 ? 6 : 10)

// Grid for a given width. The cell stays near its usual size and only gets finer when a slide would not fit at one dot per font pixel,
// or when the name can be twice as big for a small change. Rows grow (up to 40%) so two-line slides can use bigger dots.
export function gridFor(W: number, name: string, offers: string[]) {
  const base = baseCell(W)
  let cols = Math.floor(W / base)
  const narrowest = (t: string) => Math.min(...breaks(t).map((l) => Math.max(...l.map(textWidth))))
  cols = Math.max(cols, ...[name, ...offers].map((t) => narrowest(t) + 2 * MARGIN))
  const minRows = 3 * GLYPH_ROWS + 2 * LINE_GAP + 2 * MARGIN
  const rowsAt = (c: number) => Math.max(Math.round((26 * base * c) / W), minRows)
  // A finer grid (up to 20%) is worth it when more slides can use two dots per font pixel.
  const bigOnes = (c: number) => [name, ...offers].filter((t) => layoutText(t, c, Math.ceil(rowsAt(c) * 1.4), 1).k >= 2).length
  let bestCols = cols, bestN = bigOnes(cols)
  for (let c = cols + 1; W >= 600 && c <= Math.floor(cols * 1.2); c++) { const n = bigOnes(c); if (n > bestN) { bestN = n; bestCols = c } }
  cols = bestCols
  const cell = W / cols
  const baseRows = rowsAt(cols)
  const limit = Math.ceil(baseRows * 1.4)
  let rows = baseRows
  for (const [t, share] of [[name, NAME_SHARE], ...offers.map((o) => [o, OFFER_SHARE])] as [string, number][]) {
    const l = layoutText(t, cols, limit, 1)
    rows = Math.max(rows, Math.min(limit, Math.ceil((l.k * blockHeight(l.lines.length)) / share)))
  }
  return { cols, rows, cell }
}
