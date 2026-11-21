// One place for the logo and the palette. Section code imports these; CSS reads the same values from home-tokens.css.
export const LOGO_PATH_LIST = [
  'M123 111 L225 111 L250 154 L225 198 L199 155 L150 155 L123 198 L147 243 L97 243 L72 199 Z',
  'M252 156 L302 156 L327 200 L276 288 L175 288 L149 244 L174 200 L200 244 L250 244 L276 200 Z',
] as const
// Both shapes as one path string (for Path2D and a single <path>).
export const LOGO_D = LOGO_PATH_LIST.join(' ')
// Both shapes as two <path> elements; `attrs` adds attributes such as a class to each.
export const logoPaths = (attrs = '') => LOGO_PATH_LIST.map((d) => `<path ${attrs}d="${d}"/>`).join('')

export const LIME = '#D6F35C'
export const LIME_RGB = '214,243,92'
export const LED = '#9FD043'
export const HOT = '#F2FFD2'
export const HOT_RGB = '242,255,210'
export const NIGHT = '#0E0D0B'
export const INK = '#F4EEE4'
