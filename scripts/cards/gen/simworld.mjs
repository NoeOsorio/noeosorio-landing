import { writeFileSync } from 'fs';
import { page, rng, f, smooth } from './common.mjs';
const R = rng(20260422);
const rr = (a, b) => a + (b - a) * R();
const blob = (cx, cy, rx, ry, irr = .06, n = 12, rot = 0) => {
  const pts = []; for (let i = 0; i < n; i++) { const t = i / n * Math.PI * 2, k = 1 + (R() - .5) * 2 * irr;
    const x = Math.cos(t) * rx * k, y = Math.sin(t) * ry * k; pts.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]); }
  return smooth(pts);
};
const dot = (x, y, r, fill, o = 1) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}" opacity="${o}"/>`;
function cell(cx, cy, r, { nuc = true, orgs = 7, rot = R() * 6.28, stretch = 1 } = {}) {
  let s = `<g>`;
  s += `<path d="${blob(cx, cy, r, r * stretch, .05, 14, rot)}" fill="url(#cyto)" stroke="rgba(214,255,235,.58)" stroke-width="1"/>`;
  s += `<path d="${blob(cx, cy, r * .86, r * .86 * stretch, .03, 12, rot)}" fill="none" stroke="rgba(214,255,235,.13)" stroke-width=".6"/>`;
  // rim light
  const a0 = rr(3.4, 4), a1 = a0 + 1.1, rx = r * .82;
  s += `<path d="M${f(cx + Math.cos(a0) * rx)} ${f(cy + Math.sin(a0) * rx * stretch)} A${f(rx)} ${f(rx * stretch)} 0 0 1 ${f(cx + Math.cos(a1) * rx)} ${f(cy + Math.sin(a1) * rx * stretch)}" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.1" stroke-linecap="round"/>`;
  if (nuc) { const nx = cx + rr(-.18, .18) * r, ny = cy + rr(-.18, .18) * r, nr = r * rr(.3, .4);
    s += `<path d="${blob(nx, ny, nr, nr * .94, .07, 10)}" fill="url(#nuc)" stroke="rgba(214,243,92,.62)" stroke-width=".8"/>`;
    s += dot(nx + nr * .1, ny - nr * .05, nr * .22, 'rgba(214,243,92,.75)'); }
  for (let i = 0; i < orgs; i++) { const a = R() * 6.28, d = r * rr(.45, .8), x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * stretch, k = R();
    if (k < .45) s += dot(x, y, rr(.7, 1.6), 'rgba(205,255,225,.55)');
    else if (k < .75) s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rr(2.2, 3.4))}" ry="${f(rr(1.1, 1.6))}" transform="rotate(${f(R() * 180)} ${f(x)} ${f(y)})" fill="rgba(160,230,200,.14)" stroke="rgba(214,255,235,.5)" stroke-width=".6"/>`;
    else s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr(1.6, 2.6))}" fill="none" stroke="rgba(214,255,235,.45)" stroke-width=".6"/>`; }
  return s + `</g>`;
}
function rod(cx, cy, len, wid, ang, flag = true) {
  const t = `transform="rotate(${ang} ${cx} ${cy})"`; let s = `<g ${t}>`;
  s += `<rect x="${cx - len / 2}" y="${cy - wid / 2}" width="${len}" height="${wid}" rx="${wid / 2}" fill="url(#cyto)" stroke="rgba(214,255,235,.6)" stroke-width=".9"/>`;
  s += `<path d="M${cx - len / 2 + wid / 2} ${cy - wid * .18} H${cx + len / 2 - wid / 2}" stroke="rgba(255,255,255,.4)" stroke-width=".7" stroke-linecap="round"/>`;
  s += dot(cx - len * .12, cy + wid * .1, wid * .18, 'rgba(214,243,92,.7)') + dot(cx + len * .18, cy + wid * .08, wid * .14, 'rgba(214,255,235,.5)');
  if (flag) { const x0 = cx + len / 2; let d = `M${f(x0)} ${f(cy)}`; for (let i = 1; i <= 24; i++) d += ` L${f(x0 + i * 1.2)} ${f(cy + Math.sin(i * .5) * 2.4 * (i / 24 + .3))}`;
    s += `<path d="${d}" fill="none" stroke="rgba(214,255,235,.55)" stroke-width=".7" stroke-linecap="round"/>`; }
  return s + `</g>`;
}
function paramecium(cx, cy, L, W, ang) {
  let s = `<g transform="rotate(${ang} ${cx} ${cy})">`;
  const body = (k) => { const pts = []; for (let i = 0; i < 28; i++) { const t = i / 28 * 6.2832; const sx = Math.cos(t) * L / 2 * k; const sy = Math.sin(t) * W / 2 * k * (1 + .22 * Math.cos(t)); pts.push([cx + sx, cy + sy]); } return pts; };
  const b = body(1);
  // cilia
  let cil = ''; b.forEach(([x, y], i) => { const dx = x - cx, dy = y - cy, m = Math.hypot(dx, dy) || 1; cil += `<path d="M${f(x)} ${f(y)} q${f(dx / m * 2.2 + 1)} ${f(dy / m * 2.2)} ${f(dx / m * 4.6)} ${f(dy / m * 4.6 + .8)}" fill="none" stroke="rgba(214,255,235,.4)" stroke-width=".5" stroke-linecap="round"/>`; });
  s += cil;
  s += `<path d="${smooth(b)}" fill="url(#cyto)" stroke="rgba(214,255,235,.62)" stroke-width="1"/>`;
  s += `<path d="M${f(cx - L * .42)} ${f(cy - W * .2)} Q${f(cx)} ${f(cy - W * .34)} ${f(cx + L * .38)} ${f(cy - W * .18)}" fill="none" stroke="rgba(255,255,255,.4)" stroke-width=".8" stroke-linecap="round"/>`;
  s += `<path d="${blob(cx + L * .04, cy, W * .24, W * .2, .08, 9)}" fill="url(#nuc)" stroke="rgba(214,243,92,.6)" stroke-width=".7"/>`;
  for (const dx of [-.3, .32]) s += `<circle cx="${f(cx + L * dx)}" cy="${f(cy + W * .02)}" r="${f(W * .13)}" fill="rgba(180,245,225,.08)" stroke="rgba(214,255,235,.5)" stroke-width=".6"/>`;
  for (let i = 0; i < 9; i++) s += dot(cx + rr(-.4, .4) * L, cy + rr(-.28, .28) * W, rr(.5, 1), 'rgba(214,255,235,.5)');
  return s + `</g>`;
}
function dividing(cx, cy, a, b, ang) {
  let s = `<g transform="rotate(${ang} ${cx} ${cy})">`; const pts = [];
  for (let i = 0; i < 40; i++) { const t = i / 40 * 6.2832; pts.push([cx + Math.cos(t) * a, cy + Math.sin(t) * b * (.5 + .5 * Math.cos(t) ** 2)]); }
  s += `<path d="${smooth(pts)}" fill="url(#cyto)" stroke="rgba(214,255,235,.62)" stroke-width="1.05"/>`;
  s += `<path d="M${cx} ${cy - b * .5} Q${cx + 1.5} ${cy} ${cx} ${cy + b * .5}" stroke="rgba(214,255,235,.55)" stroke-width=".8" fill="none" stroke-dasharray="2 2"/>`;
  // spindle
  for (const k of [-1, 1]) { const px = cx + k * a * .88; for (let i = -3; i <= 3; i++) s += `<path d="M${f(px)} ${f(cy + i * .6)} Q${f(cx + k * a * .5)} ${f(cy + i * 3.2)} ${f(cx + k * 3)} ${f(cy + i * .5)}" fill="none" stroke="rgba(214,255,235,.22)" stroke-width=".5"/>`;
    // chromosomes
    for (let i = -2; i <= 2; i++) { const x = cx + k * a * (.45 + (R() - .5) * .06), y = cy + i * 3.4 + (R() - .5); s += `<path d="M${f(x - 1)} ${f(y - 1.6)} L${f(x + 1)} ${f(y + 1.6)}" stroke="rgba(214,243,92,.9)" stroke-width="1.7" stroke-linecap="round"/>`; }
    s += `<path d="${blob(cx + k * a * .45, cy, b * .32, b * .36, .08, 9)}" fill="none" stroke="rgba(214,243,92,.28)" stroke-width=".6" stroke-dasharray="1.5 2"/>`;
    for (let i = 0; i < 5; i++) s += dot(cx + k * a * rr(.5, .85), cy + rr(-.3, .3) * b, rr(.6, 1.4), 'rgba(205,255,225,.5)'); }
  return s + `</g>`;
}
const defs = `<defs>
<radialGradient id="bg" cx="60%" cy="42%" r="80%"><stop offset="0" stop-color="#19525A"/><stop offset=".45" stop-color="#0F3A40"/><stop offset="1" stop-color="#061719"/></radialGradient>
<radialGradient id="cyto" cx="42%" cy="38%" r="68%"><stop offset="0" stop-color="#9fe6cf" stop-opacity=".16"/><stop offset=".7" stop-color="#7fd4bd" stop-opacity=".2"/><stop offset=".93" stop-color="#bfffe6" stop-opacity=".34"/><stop offset="1" stop-color="#e0fff2" stop-opacity=".46"/></radialGradient>
<radialGradient id="nuc" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#e6ff95" stop-opacity=".5"/><stop offset="1" stop-color="#7fcf8a" stop-opacity=".26"/></radialGradient>
<radialGradient id="vig" cx="55%" cy="45%" r="75%"><stop offset=".55" stop-color="#020b0c" stop-opacity="0"/><stop offset="1" stop-color="#020b0c" stop-opacity=".62"/></radialGradient>
<linearGradient id="scrim" x1="0" y1="1" x2=".75" y2="0"><stop offset="0" stop-color="#03100f" stop-opacity=".62"/><stop offset=".55" stop-color="#03100f" stop-opacity="0"/></linearGradient>
<linearGradient id="scrimT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#03100f" stop-opacity=".34"/><stop offset=".3" stop-color="#03100f" stop-opacity="0"/></linearGradient>
<filter id="dof" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.2"/></filter>
<filter id="dof2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.4"/></filter>
<filter id="haze" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
<filter id="wob" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="2.2"/></filter>
</defs>`;
let a = defs + `<rect width="520" height="328" fill="url(#bg)"/>`;
// soft medium variation
a += `<g filter="url(#haze)"><ellipse cx="390" cy="130" rx="130" ry="80" fill="#2f8f86" opacity=".38"/><ellipse cx="150" cy="260" rx="120" ry="50" fill="#0b2c30" opacity=".6"/><ellipse cx="470" cy="290" rx="80" ry="50" fill="#1d6a69" opacity=".3"/></g>`;
// out of focus
a += `<g filter="url(#dof)">`;
a += `<g opacity=".42">${cell(505, 96, 46, { orgs: 4 })}</g><g opacity=".32">${cell(86, 168, 58, { orgs: 4 })}</g><g opacity=".38">${cell(210, 312, 40, { orgs: 3 })}</g><g opacity=".34">${cell(318, 12, 34, { orgs: 3 })}</g><g opacity=".3">${cell(486, 308, 44, { orgs: 3 })}</g>`;
a += `</g><g filter="url(#dof2)" opacity=".62">${cell(250, 62, 17, { orgs: 3 })}${cell(448, 190, 13, { orgs: 3 })}</g>`;
// debris
let deb = ''; for (let i = 0; i < 150; i++) deb += dot(R() * 520, R() * 328, R() * 1 + .25, '#cffbe8', +(R() * .35 + .06).toFixed(2));
a += `<g>${deb}</g>`;
// filaments
a += `<g fill="none" stroke="rgba(190,255,230,.14)" stroke-width=".6" stroke-linecap="round"><path d="M180 100 C 205 118 226 112 244 134 S 262 168 250 190"/><path d="M330 258 C 362 246 392 262 424 252 S 470 236 500 244"/><path d="M60 54 C 92 70 120 58 150 78"/></g>`;
// signalling particles drifting to the community
let sig = ''; for (let i = 0; i < 16; i++) { const t = i / 16; sig += dot(250 + t * 76 + Math.sin(t * 9) * 4, 118 + t * 14 + Math.cos(t * 7) * 5, .5 + t * .7, '#d6f35c', +(.15 + t * .5).toFixed(2)); }
a += sig;
// the community
const cx = 392, cy = 150;
a += `<path d="${blob(cx + 6, cy - 4, 80, 74, .07, 14)}" fill="rgba(214,243,92,.045)" stroke="rgba(214,243,92,.3)" stroke-width=".7" stroke-dasharray="1 4" stroke-linecap="round"/>`;
const kids = [[0, 0, 21]]; for (let k = 0; k < 6; k++) { const ang = (k * 60 + 18) * Math.PI / 180, d = 35 + R() * 4; kids.push([Math.cos(ang) * d, Math.sin(ang) * d * .95, 18 + R() * 3]); }
kids.push([62, -40, 11]);
a += `<g filter="url(#wob)">`;
kids.forEach(([dx, dy, r], i) => { a += cell(cx + dx, cy + dy, r, { orgs: i == 7 ? 2 : 5, nuc: true }); });
a += `</g>`;
// shared membrane contacts
for (let i = 1; i <= 6; i++) { const [dx, dy] = kids[i]; a += `<path d="M${f(cx + dx * .52 - dy * .1)} ${f(cy + dy * .52 + dx * .1)} l${f(-dy * .12)} ${f(dx * .12)}" stroke="rgba(255,255,255,.35)" stroke-width=".8" stroke-linecap="round"/>`; }
// dividing cell
a += dividing(292, 198, 33, 20, -24);
// paramecium
a += paramecium(140, 190, 54, 19, -14);
// rods
a += rod(212, 150, 24, 8.5, 28) + rod(452, 226, 22, 8, 62, true);
// small young cells
a += cell(372, 262, 8, { orgs: 2 }) + cell(236, 232, 7, { orgs: 1, nuc: false }) + cell(100, 108, 8, { orgs: 2 }) + dividing(352, 44, 22, 13, 18) + cell(262, 30, 11, { orgs: 2 }) + rod(410, 40, 20, 7.5, -20) + cell(480, 150, 8, { orgs: 2, nuc: false });
a += `<rect width="520" height="328" fill="url(#vig)"/><rect width="520" height="328" fill="url(#scrim)"/><rect width="520" height="190" fill="url(#scrimT)"/>`;
writeFileSync('../simworld.html', page({ title: 'Sim World pass', name: 'Sim World', topic: 'Games', num: 23, created: '04/26', c: '#0b2326', fg: '#E5F2DE', mark: '#D6F35C', art: a, texOpacity: .16, texBlend: 'soft-light' }));
