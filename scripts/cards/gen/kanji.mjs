import { writeFileSync } from 'fs';
import { page, rng, f, smooth } from './common.mjs';
const R = rng(88123); const rr = (a, b) => a + (b - a) * R();
// ---- brush engine (glyph units, 100 grid) ----
function cr(pts, n) { // catmull-rom open sampling
  if (pts.length === 2) return Array.from({ length: n }, (_, i) => [pts[0][0] + (pts[1][0] - pts[0][0]) * i / (n - 1), pts[0][1] + (pts[1][1] - pts[0][1]) * i / (n - 1)]);
  const out = [], m = pts.length - 1, g = (i) => pts[Math.max(0, Math.min(m, i))];
  for (let k = 0; k < n; k++) { const u = k / (n - 1) * m, i = Math.min(m - 1, Math.floor(u)), t = u - i, p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    const q = (a, b, c, d) => .5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
    out.push([q(p0[0], p1[0], p2[0], p3[0]), q(p0[1], p1[1], p2[1], p3[1])]); }
  return out;
}
const wAt = (ws, t) => { const u = t * (ws.length - 1), i = Math.min(ws.length - 2, Math.floor(u)), s = u - i, e = s * s * (3 - 2 * s); return ws[i] * (1 - e) + ws[i + 1] * e; };
let ink = '', dry = '';
function seg(pts, ws, { cap0 = true, cap1 = true, dryAmt = .6 } = {}) {
  ws = ws.map((w) => w * 1.2);
  const N = 46, P = cr(pts, N), L = [], Rr = [];
  P.forEach((p, i) => { const a = P[Math.max(0, i - 1)], b = P[Math.min(N - 1, i + 1)]; let tx = b[0] - a[0], ty = b[1] - a[1]; const m = Math.hypot(tx, ty) || 1; tx /= m; ty /= m;
    const w = wAt(ws, i / (N - 1)) / 2, nx = -ty, ny = tx, j1 = (R() - .5) * .22, j2 = (R() - .5) * .22;
    L.push([p[0] + nx * (w + j1), p[1] + ny * (w + j1)]); Rr.push([p[0] - nx * (w + j2), p[1] - ny * (w + j2)]); });
  let poly = [...L, ...Rr.reverse()];
  ink += `<path d="${smooth(poly)}"/>`;
  // round caps
  const c = (p, w) => `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(w / 2)}"/>`;
  if (cap0) ink += c(P[0], ws[0] * .96); if (cap1) ink += c(P[N - 1], ws[ws.length - 1] * .9);
  // dry brush streaks along the later part
  for (let k = 0; k < 9; k++) { const off = rr(-.38, .38), a = rr(.35, .8), b = Math.min(1, a + rr(.15, .4)); let d = '';
    for (let i = Math.floor(a * (N - 1)); i <= Math.floor(b * (N - 1)); i++) { const p = P[i], q = P[Math.min(N - 1, i + 1)], tx = q[0] - p[0] || .001, ty = q[1] - p[1], m = Math.hypot(tx, ty) || 1, w = wAt(ws, i / (N - 1));
      d += `${d ? 'L' : 'M'}${f(p[0] - ty / m * w * off)} ${f(p[1] + tx / m * w * off)}`; }
    if (d) dry += `<path d="${d}" stroke-width="${f(rr(.12, .34))}" opacity="${f(rr(.35, .8) * dryAmt)}"/>`; }
}
// 学, stroke order: 1-3 the three marks on top, 4-5 the roof, 6-8 the child component (子)
seg([[22, 16], [26, 21], [30, 28]], [3.6, 5.8, 1.4]);                       // 1 left mark
seg([[46, 8], [47.5, 16], [47.6, 25]], [3.4, 5.4, 1.5]);                    // 2 middle mark
seg([[73, 11], [69, 18], [64, 26]], [4.4, 4.6, 1.0]);                       // 3 right mark, sweeping left
seg([[17, 44], [16.2, 50], [14.4, 57]], [3.4, 3.8, 1.2]);                    // 4 left leg of the roof
seg([[13.5, 44.2], [48, 43.4], [84, 44.4]], [5.2, 3.8, 3.4]);               // 5 roof, horizontal
seg([[84, 44.4], [84.6, 51], [83.4, 57.5]], [3.4, 3.2, 1.0], { cap0: false }); //   roof, hook down
seg([[83.6, 55], [81.2, 57.6], [78.4, 57]], [1.9, 1.5, .5], { cap0: false }); //   roof, flick
seg([[32, 60.2], [50, 60.4], [67, 61.4]], [4.8, 3.6, 3.2]);                  // 6 child, horizontal
seg([[67, 61.4], [60, 64.5], [52, 67.5], [44, 70.5]], [3.2, 3.2, 2.2, .9], { cap0: false }); //   child, sweep down-left
seg([[51.6, 60.8], [51.8, 76], [51.2, 89.5]], [4.2, 4.0, 3.4]);              // 7 vertical
seg([[51.2, 89.5], [48, 92.4], [43, 90.4]], [3.4, 2.1, .7], { cap0: false }); //   hook
seg([[14, 77.4], [50, 75.8], [87, 76.4]], [5.0, 3.6, 2.2]);                  // 8 long horizontal
// ---- washi ----
let fib = '';
for (let i = 0; i < 520; i++) { const x = R() * 520, y = R() * 328, a = R() * 6.2832, len = rr(8, 46), bend = rr(-14, 14), dx = Math.cos(a) * len, dy = Math.sin(a) * len;
  const light = R() < .62; fib += `<path d="M${f(x)} ${f(y)} q${f(dx / 2 - dy * bend / len)} ${f(dy / 2 + dx * bend / len)} ${f(dx)} ${f(dy)}" fill="none" stroke="${light ? '#fffdf6' : '#a58e66'}" stroke-opacity="${light ? f(rr(.35, .8)) : f(rr(.1, .24))}" stroke-width="${f(rr(.35, 1.1))}" stroke-linecap="round"/>`; }
let fleck = ''; for (let i = 0; i < 16; i++) fleck += `<ellipse cx="${f(R() * 520)}" cy="${f(R() * 328)}" rx="${f(rr(.6, 1.8))}" ry="${f(rr(.3, .8))}" transform="rotate(${f(R() * 180)} ${f(R() * 520)} ${f(R() * 328)})" fill="#8a6f49" opacity="${f(rr(.18, .4))}"/>`;
// hanko
const hp = []; for (let i = 0; i < 28; i++) { const t = i / 28 * 6.2832, m = 1.08; let x = Math.cos(t), y = Math.sin(t); const k = Math.max(Math.abs(x), Math.abs(y)); hp.push([x / k * 15 * (1 + (R() - .5) * .025), y / k * 15 * (1 + (R() - .5) * .025)]); }
const BX = 272, BY = 36, S = 186, GS = 1.62, GX = BX + (S - 100 * GS) / 2 + 1, GY = BY + (S - 100 * GS) / 2 + 11;
const art = `<defs>
<radialGradient id="pap" cx="50%" cy="40%" r="85%"><stop offset="0" stop-color="#F7F2E6"/><stop offset=".7" stop-color="#F1EADB"/><stop offset="1" stop-color="#E6DCC6"/></radialGradient>
<filter id="mott" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .02" numOctaves="3" seed="11"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .43  0 0 0 0 .26  0 0 0 .5 -.12"/></filter>
<filter id="fine" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.4 .5" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 .98  0 0 0 0 .92  0 0 0 .9 -.28"/></filter>
<filter id="sumi" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="2" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="1.1" result="d"/><feGaussianBlur in="d" stdDeviation=".18"/></filter>
<filter id="bleed" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation=".9"/></filter>
<filter id="stamp" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="2" seed="9" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  11 0 0 0 -3.1" result="h"/><feComposite in="SourceGraphic" in2="h" operator="in" result="a"/><feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="2" seed="4" result="w"/><feDisplacementMap in="a" in2="w" scale="1.2"/></filter>
<linearGradient id="edge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".06" stop-color="#fff" stop-opacity="0"/><stop offset=".9" stop-color="#7a5d34" stop-opacity="0"/><stop offset="1" stop-color="#7a5d34" stop-opacity=".16"/></linearGradient>
</defs>
<rect width="520" height="328" fill="url(#pap)"/>
<rect width="520" height="328" filter="url(#mott)" opacity=".55"/>
<rect width="520" height="328" filter="url(#fine)" opacity=".5"/>
<g>${fib}${fleck}</g>
<rect width="520" height="328" fill="url(#edge)"/>
<g fill="none" stroke="#9b4a38">
 <rect x="${BX}" y="${BY}" width="${S}" height="${S}" stroke-opacity=".5" stroke-width="1.3"/>
 <rect x="${BX + 5}" y="${BY + 5}" width="${S - 10}" height="${S - 10}" stroke-opacity=".16" stroke-width=".7"/>
 <path d="M${BX + S / 2} ${BY + 3} V${BY + S - 3} M${BX + 3} ${BY + S / 2} H${BX + S - 3}" stroke-opacity=".4" stroke-width=".9" stroke-dasharray="6 4.5"/>
 <path d="M${BX + S / 2} ${BY} v6 M${BX + S / 2} ${BY + S} v-6 M${BX} ${BY + S / 2} h6 M${BX + S} ${BY + S / 2} h-6" stroke-opacity=".6" stroke-width="1.3"/>
</g>
<g transform="translate(${GX} ${GY}) scale(${GS})">
 <g fill="#2a2018" opacity=".28" filter="url(#bleed)" transform="translate(.35 .5)">${ink}</g>
 <g fill="#16120d" filter="url(#sumi)">${ink}</g>
 <g stroke="#F4EEDF" fill="none" stroke-linecap="round" filter="url(#sumi)">${dry}</g>
</g>
<g transform="translate(438 207) rotate(5)" filter="url(#stamp)">
 <path d="${smooth(hp)}" fill="#C03A2B" opacity=".93"/>
 <rect x="-12.2" y="-12.2" width="24.4" height="24.4" rx="1.6" fill="none" stroke="#F5E9D8" stroke-width=".9" opacity=".75"/>
 <text x="0" y="6.2" text-anchor="middle" font-family="'Yuji Syuku',serif" font-size="19" fill="#F5E9D8">習</text>
</g>`;
writeFileSync('../kanji.html', page({ title: 'Kanji Study App pass', name: 'Kanji Study App', topic: 'Learning', num: 41, created: '08/25', c: '#F1EBDF', fg: '#1C1A17', mark: '#7FA62A', art, texOpacity: .22, texBlend: 'multiply' }));
