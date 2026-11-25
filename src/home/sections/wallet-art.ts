import type { WalletArt } from '../data/wallet';
import { LIME, logoPaths } from '../brand';
import artMaiden from '../assets/cards/maiden.webp';
import artEssay from '../assets/cards/essay.webp';
import artTelar from '../assets/cards/telar.webp';
import artGalaxy from '../assets/cards/galaxy.webp';
import artSimworld from '../assets/cards/simworld.webp';
import artKanji from '../assets/cards/kanji.webp';
import artPyventa from '../assets/cards/pyventa.webp';

// The pieces of a wallet pass that the home and the /portfolio grid draw the same way. One copy, so a card never differs between the two.
export const W = 520, H0 = 328;
export type { WalletArt };

// Material: a fine grain, the way a printed card is finished.
export const NOISE = `url("data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>')}")`;
export const LOGO = `<svg class="mark" viewBox="60 100 280 200" fill="#7FA62A" aria-hidden="true">${logoPaths()}</svg>`;
export const CHIP = `<svg class="chip" viewBox="0 0 52 40" aria-hidden="true"><rect x=".5" y=".5" width="51" height="39" rx="7" fill="#D7B56A"/><rect x=".5" y=".5" width="51" height="39" rx="7" fill="none" stroke="#9C7B33" stroke-opacity=".6"/>
    <path d="M0 14 H17 M0 26 H17 M35 14 H52 M35 26 H52 M17 0 V40 M35 0 V40 M17 20 H35" stroke="#9C7B33" stroke-opacity=".7" fill="none"/></svg>`;
export const NFC = `<svg class="nfc" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8 8.5 a6 6 0 0 1 0 9 M12 5.5 a10 10 0 0 1 0 15 M16 2.5 a14 14 0 0 1 0 21"/></svg>`;
export const ART_URL: Record<string, string> = { 'maiden-os': artMaiden, 'essay-studio': artEssay, telar: artTelar, 'porter-galaxy': artGalaxy, 'sim-world': artSimworld, kanji: artKanji, pyventa: artPyventa };
export const DARK_LOGO = new Set(['maiden-os', 'telar', 'porter-galaxy', 'sim-world']);
export const logoFor = (id: string) => (DARK_LOGO.has(id) ? LOGO.replace('#7FA62A', LIME) : LOGO);
export const number = (n: number) => `•••• •••• •••• ${String(n).padStart(4, "0")}`;

// Whiteboard: the strokes of its drawing, ready to be written one after another by the wallet.
export const enamelArt = (): string => {
      const S: [string, string, number][] = [
        ['M196 86 C 220 82 250 84 274 83 C 281 84 283 90 283 98 L 282 120 C 282 128 278 131 270 131 L 226 132 L 204 148 L 207 132 C 198 132 192 129 192 121 L 193 96 C 193 90 192 87 196 86 Z', '#2F6FD6', 360],
        ['M206 100 q6 -6 12 0 t12 0 t12 0 t12 0 t12 0', '#1D1B18', 220],
        ['M206 115 q6 -5 12 0 t12 0 t12 0', '#1D1B18', 180],
        ['M204 72 L198 63 M237 69 L237 58 M270 72 L277 63', '#2F6FD6', 170],
        ['M294 112 C 312 104 330 106 352 112', '#1D1B18', 240],
        ['M342 103 L353 112 L341 119', '#1D1B18', 130],
        ['M368 84 C 395 80 430 82 462 81 C 468 82 470 88 470 95 L 469 140 C 469 147 465 150 458 150 L 376 151 C 369 151 366 147 366 140 L 367 92 C 367 88 366 85 368 84 Z', '#2E9E62', 380],
        ['M382 102 q6 -5 12 0 t12 0 t12 0 t12 0 t12 0', '#1D1B18', 220],
        ['M382 118 q6 -5 12 0 t12 0 t12 0', '#1D1B18', 180],
        ['M382 133 l6 7 l14 -15', '#D64545', 160],
        ['M372 166 C 400 160 430 170 466 162', '#D64545', 200],
        ['M384 175 C 408 171 436 177 456 172', '#D64545', 160],
      ];
      let at = 0;
      const strokes = S.map(([d, c, ms]) => { const el = `<path data-draw data-ms="${ms}" data-at="${Math.round(at)}" d="${d}" stroke="${c}" pathLength="1" stroke-dasharray="1 1"/>`; at += ms * 0.5; return el; }).join('');
      return `<defs><linearGradient id="wb-metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DDE1E3"/><stop offset="1" stop-color="#B3B9BD"/></linearGradient><filter id="wb-smudge" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="4"/></filter></defs>
        <rect width="${W}" height="${H0}" fill="#F4F5F2"/>
        <g filter="url(#wb-smudge)" fill="none" stroke="#1D1B18" stroke-linecap="round" stroke-width="16">
          <path d="M150 120 C 190 100 240 150 300 128" opacity=".045"/><path d="M330 210 C 380 196 420 226 470 206" opacity=".04"/><path d="M130 186 C 170 176 220 200 262 186" opacity=".035"/></g>
        <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">${strokes}</g>
        <rect x="300" y="304" width="58" height="11" rx="4" fill="#EDEFEA" stroke="#C9CDC8"/><rect x="300" y="304" width="14" height="11" rx="4" fill="#2F6FD6"/>
        <rect x="368" y="304" width="58" height="11" rx="4" fill="#EDEFEA" stroke="#C9CDC8"/><rect x="368" y="304" width="14" height="11" rx="4" fill="#D64545"/>
        <rect x="0" y="315" width="${W}" height="${H0 - 315}" fill="url(#wb-metal)"/><path d="M0 315.5 H${W}" stroke="#fff" stroke-opacity=".8"/><path d="M0 ${H0 - .5} H${W}" stroke="#8D9499" stroke-opacity=".5"/>`;
    
};
