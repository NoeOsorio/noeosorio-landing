// Splits the Sim World card in two: the still base (public/home/cards/simworld.webp: water, glow, faint background cells, colony halo)
// and the moving parts (src/home/sections/card-motion/simworld.ts: the colony cells and the drifting organisms).
// Run from the repo root:  node scripts/cards/gen/simworld-split.mjs
import { chromium } from '/private/tmp/claude-501/-Users-noe-Dev-Web/2507de66-3b5f-4d4b-b0d4-cab428c99f73/scratchpad/refs/node_modules/playwright/index.mjs';
import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const root = process.cwd();
const exe = execSync('ls -d ~/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell').toString().trim();
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'simworld-split-'));
const b = await chromium.launch({ headless: true, executablePath: exe });
const p = await b.newPage({ deviceScaleFactor: 2, viewport: { width: 700, height: 600 } });
await p.goto('file://' + root + '/scripts/cards/simworld.html');
await p.addStyleTag({ content: 'html,body,.stage,.stagewrap{background:transparent!important}.pass::before,.pass::after{display:none!important}.title,.nfc,svg.chip,.num,.bottom{visibility:hidden!important}' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(800);

// 1. Find the moving parts in the first card and hide them for the base.
const parts = await p.evaluate(() => {
  const art = document.querySelector('.card .art');
  const kids = [...art.children];
  const halo = kids.findIndex((k) => k.tagName === 'path' && k.getAttribute('stroke-dasharray') === '1 4');
  const wob = kids[halo + 1];
  const contacts = kids.slice(halo + 2, halo + 8);
  const orgs = [];
  for (let i = halo + 8; kids[i].tagName !== 'rect'; i++) orgs.push(kids[i]);

  // The vignette and scrims are painted over everything in the original. The overlay sits above the base, so fold the same darkening into each part.
  const dark = (x, y) => {
    const d = Math.hypot((x - 286) / 390, (y - 148) / 246);
    const av = d < 0.55 ? 0 : Math.min(0.62, ((d - 0.55) / 0.45) * 0.62);
    const t = (0.75 * (x / 520) + 1 - y / 328) / 1.5625;
    const as = t >= 0.55 ? 0 : 0.62 * (1 - t / 0.55);
    const at = y >= 57 ? 0 : 0.34 * (1 - y / 57);
    return (1 - av) * (1 - as) * (1 - at);
  };

  // Merge neighbouring strokes that share a style into one path, so the overlay stays small.
  const merge = (g) => {
    const key = (e) => [...e.attributes].filter((a) => a.name !== 'd').map((a) => a.name + '=' + a.value).join('|');
    const kidsOf = [...g.children];
    let prev = null;
    kidsOf.forEach((e) => {
      if (e.tagName === 'path' && prev && key(prev) === key(e)) { prev.setAttribute('d', prev.getAttribute('d') + e.getAttribute('d')); e.remove(); }
      else prev = e.tagName === 'path' ? e : null;
    });
  };

  const prep = (el, shade) => {
    const bb = el.getBBox();
    const clone = el.cloneNode(true);
    // The faint inner ring of each cell (13% white, 0.6 px) is invisible at this size; leaving it out saves about 5 KB.
    clone.querySelectorAll('path[stroke="rgba(214,255,235,.13)"]').forEach((e) => e.remove());
    clone.querySelectorAll('g').forEach(merge); merge(clone);
    // Centre in card space (the groups only carry rotations about their own centre, so the box centre is enough).
    const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
    if (shade) { const f = dark(cx, cy); if (f < 0.995) clone.setAttribute('opacity', f.toFixed(2)); }
    return { cx, cy, rot: (el.getAttribute('transform') || '').match(/rotate\((-?[\d.]+)/)?.[1] ?? null, html: clone.outerHTML };
  };

  const cells = [...wob.children].map((c) => prep(c, false));
  const organisms = orgs.map((o) => prep(o, true));
  const contactHtml = contacts.map((c) => c.outerHTML).join('');
  const gradients = ['cyto', 'nuc'].map((id) => document.getElementById(id).outerHTML);
  [wob, ...contacts, ...orgs].forEach((e) => (e.style.display = 'none'));
  return { cells, organisms, contactHtml, gradients };
});
if (parts.cells.length !== 8 || parts.organisms.length !== 11 ) throw new Error('unexpected counts ' + parts.cells.length + ' ' + parts.organisms.length);

// 2. Base without them.
await p.waitForTimeout(200);
const png = path.join(tmp, 'simworld.png');
await (await p.$('.card')).screenshot({ path: png, omitBackground: true });
await b.close();
execSync(`cwebp -quiet -q 86 -alpha_q 100 "${png}" -o "${root}/public/home/cards/simworld.webp"`);

// 3. Overlay SVG.
// Path data to short relative form (0.1 px precision, measured from the rounded points so nothing drifts).
const NP = { m: 2, l: 2, c: 6, q: 4, s: 4, t: 2, h: 1, v: 1, a: 7, z: 0 };
const fmt = (n) => { const r = Math.round(n * 10) / 10; return (r === 0 ? '0' : String(r)).replace(/^(-?)0\./, '$1.'); };
function relPath(d) {
  const tk = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g);
  let i = 0, x = 0, y = 0, sx = 0, sy = 0, first = true, out = '';
  const push = (cmd, nums) => { out += cmd; nums.forEach((v, k) => { const t = fmt(v); out += (k > 0 && !t.startsWith('-') ? ' ' : '') + t; }); };
  const R = (v) => Math.round(v * 10) / 10;
  while (i < tk.length) {
    const c = tk[i++]; const lc = c.toLowerCase(); const abs = c !== lc;
    if (lc === 'z') { out += 'z'; x = sx; y = sy; continue; }
    const n = NP[lc];
    let rep = 0;
    do {
      const a = tk.slice(i, i + n).map(Number); i += n;
      let cmd = lc, v = a;
      if (lc === 'a') { const ex = abs ? R(a[5]) : x + R(a[5]), ey = abs ? R(a[6]) : y + R(a[6]); v = [a[0], a[1], a[2], a[3], a[4], R(ex - x), R(ey - y)]; x = ex; y = ey; }
      else if (lc === 'h') { const ex = abs ? R(a[0]) : x + R(a[0]); v = [R(ex - x)]; x = ex; }
      else if (lc === 'v') { const ey = abs ? R(a[0]) : y + R(a[0]); v = [R(ey - y)]; y = ey; }
      else {
        v = a.map((q, k) => (k % 2 === 0 ? (abs ? R(q) - x : R(q)) : (abs ? R(q) - y : R(q))));
        const lx = a.length - 2;
        const ex = x + v[lx], ey = y + v[lx + 1];
        x = R(ex); y = R(ey);
      }
      if (lc === 'm' && first) { out += 'M' + fmt(x) + ' ' + fmt(y); first = false; sx = x; sy = y; }
      else { if (lc === 'm') { sx = x; sy = y; } if (rep === 0 || lc === 'm') push(cmd, v); else { out += ' '; v.forEach((q, k) => { const t = fmt(q); out += (k > 0 && !t.startsWith('-') ? ' ' : '') + t; }); } }
      rep++;
      first = false;
    } while (i < tk.length && /^[-.\d]/.test(tk[i]));
  }
  return out;
}
const r1 = (h) => h.replace(/ d="([^"]+)"/g, (_, d) => ` d="${relPath(d)}"`).replace(/-?\d+\.\d{2,}/g, (m) => String(Math.round(parseFloat(m) * 10) / 10)).replace(/url\(#(cyto|nuc)\)/g, 'url(#sw-$1)');
const f1 = (v) => String(Math.round(v * 10) / 10);
const defs = '<defs>' + parts.gradients.map((g) => g.replace(/id="(cyto|nuc)"/, 'id="sw-$1"')).join('') + '</defs>';
const colony = parts.cells.map((c, i) => `<g data-k="${i}" data-c="${f1(c.cx)} ${f1(c.cy)}">${r1(c.html)}</g>`).join('');
const contacts = `<g data-m>${r1(parts.contactHtml)}</g>`;
// Kind of organism decides how far it drifts: rods and the flagellated one swim (their tail trails behind), round cells and dividing ones drift a little.
const orgs = parts.organisms.map((o, i) => `<g data-o="${i}" data-c="${f1(o.cx)} ${f1(o.cy)}"${o.rot !== null ? ` data-a="${o.rot}"` : ''}>${r1(o.html)}</g>`).join('');
// Repeated paint (fill, stroke, widths) moves into short classes in one style block.
const GEO = new Set(['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'width', 'height', 'transform', 'points']);
const sheets = new Map();
const body = (colony + contacts + orgs).replace(/<(path|circle|ellipse|rect)\s([^>]*)>/g, (all, tag, attrs) => {
  const geo = [], paint = [];
  for (const m of attrs.matchAll(/([\w:-]+)="([^"]*)"/g)) {
    if (m[1] === 'opacity' && m[2] === '1') continue;
    (GEO.has(m[1]) ? geo : paint).push([m[1], m[2]]);
  }
  const key = paint.map(([k, v]) => `${k}:${v}`).join(';');
  if (!key) return `<${tag} ${geo.map(([k, v]) => `${k}="${v}"`).join(' ')}>`;
  if (!sheets.has(key)) sheets.set(key, { n: 0, id: 'sw' + sheets.size });
  sheets.get(key).n++;
  return `<${tag} class="${sheets.get(key).id}" ${geo.map(([k, v]) => `${k}="${v}"`).join(' ')}>`;
});
// Classes used once go back to attributes (a class costs more than it saves).
let css = '';
let body2 = body;
for (const [key, { n, id }] of sheets) {
  if (n >= 2) css += `.${id}{${key}}`;
  else body2 = body2.replace(`class="${id}"`, key.split(';').map((kv) => { const i = kv.indexOf(':'); return `${kv.slice(0, i)}="${kv.slice(i + 1)}"`; }).join(' '));
}
const svg = defs + `<style>${css}</style>` + body2;

const ts = `// Sim World: the moving parts of the card (the colony cells and the drifting organisms).
// Generated by scripts/cards/gen/simworld-split.mjs from the same source as public/home/cards/simworld.webp (water, glow, faint cells, halo).
// At rest, this overlay on that base is the approved card. Build-up is about 1.3 s.
import { EASE, type CardMotion } from './index';

const svg = ${JSON.stringify(svg)};

// The colony forms by division: one cell, then two, four, and the full eight, each wave growing outward from the centre.
// Cells in the order they were drawn: 0 is the middle one, 1 to 6 the ring (every 60 degrees from 18), 7 the small one on the edge.
const WAVES: number[][] = [[0], [4], [1, 6], [2, 3, 5, 7]];
const COLONY = [392, 150];

const motion: CardMotion = {
  id: 'sim-world',
  svg,
  play(root, delay) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return [];
    const out: Animation[] = [];
    const cells = root.querySelectorAll<SVGGElement>('[data-k]');
    WAVES.forEach((wave, w) => {
      wave.forEach((idx) => {
        const g = cells[idx];
        if (!g) return;
        const [x, y] = (g.dataset.c || '0 0').split(' ').map(Number);
        // A new cell starts tucked toward the middle and slides out to its place as it grows.
        const dx = (COLONY[0] - x) * (w === 0 ? 0 : 0.4), dy = (COLONY[1] - y) * (w === 0 ? 0 : 0.4);
        g.style.transformBox = 'fill-box';
        g.style.transformOrigin = 'center';
        out.push(g.animate(
          [{ transform: \`translate(\${dx.toFixed(1)}px, \${dy.toFixed(1)}px) scale(0.86)\`, opacity: 0 }, { transform: 'translate(0px, 0px) scale(1)', opacity: 1 }],
          { duration: 360, delay: delay + w * 250, easing: EASE, fill: 'backwards' },
        ));
      });
    });
    const m = root.querySelector('[data-m]');
    if (m) out.push(m.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, delay: delay + 3 * 250 + 200, easing: EASE, fill: 'backwards' }));
    // The organisms slide in a few pixels along the way they face (their tail trails behind) while they fade in.
    root.querySelectorAll<SVGGElement>('[data-o]').forEach((g, i) => {
      const [x, y] = (g.dataset.c || '0 0').split(' ').map(Number);
      let ux: number, uy: number, d: number;
      if (g.dataset.a !== undefined) {
        const a = (Number(g.dataset.a) * Math.PI) / 180;
        ux = Math.cos(a); uy = Math.sin(a); d = 8; // facing -x in its own frame, so it starts one length behind: +x
      } else {
        const vx = COLONY[0] - x, vy = COLONY[1] - y, n = Math.hypot(vx, vy) || 1;
        ux = -vx / n; uy = -vy / n; d = 5; // round cells drift toward the colony
      }
      out.push(g.animate(
        [{ transform: \`translate(\${(ux * d).toFixed(1)}px, \${(uy * d).toFixed(1)}px)\`, opacity: 0 }, { transform: 'translate(0px, 0px)', opacity: 1 }],
        { duration: 560, delay: delay + 80 + i * 60, easing: EASE, fill: 'backwards' },
      ));
    });
    return out;
  },
};

export default motion;
`;
fs.writeFileSync(root + '/src/home/sections/card-motion/simworld.ts', ts);
console.log('simworld.ts bytes', ts.length, 'svg bytes', svg.length, 'colony', parts.cells.length, 'organisms', parts.organisms.length, 'rot', parts.organisms.map((o) => o.rot));
