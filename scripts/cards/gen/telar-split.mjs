// Splits the Telar card in two: the still base (src/home/assets/cards/telar.webp: the red woven cloth and the blue borders)
// and the moving parts (src/home/sections/card-motion/telar.ts: the cross-stitch thread and its diamonds, SVG in the same 520 x 328 space).
// Run from the repo root:  node scripts/cards/gen/telar-split.mjs
// The thread is made of 4 x 4 stitch cells. They are grouped in distance bands from the left edge (so it weaves and branches),
// one group per band, so the build-up is a few dozen opacity animations, not hundreds.
import { chromium } from '/private/tmp/claude-501/-Users-noe-Dev-Web/2507de66-3b5f-4d4b-b0d4-cab428c99f73/scratchpad/refs/node_modules/playwright/index.mjs';
import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const root = process.cwd();
const src = fs.readFileSync(root + '/scripts/cards/telar.html', 'utf8');
const full = src.slice(src.indexOf('id="full"'), src.indexOf('id="strip"'));
const defsEnd = full.indexOf('</defs>');
const art = full.slice(defsEnd, full.indexOf('<div class="title">'));

// 1. Stitch cells: x, y in cells of 4 px, and their colour.
const cells = new Map();
for (const m of art.matchAll(/<rect x="(\d+)" y="(\d+)" width="4" height="4" fill="url\(#f([wf])-(\w+)\)"\/>/g)) {
  const cx = m[1] / 4, cy = m[2] / 4;
  if (((cx + cy) % 2 === 0) !== (m[3] === 'w')) throw new Error('weave parity differs at ' + cx + ',' + cy);
  cells.set(cx + ',' + cy, { cx, cy, c: m[4] });
}
// Borders (first and last 5 rows) and the two navy rules at the left stay in the base.
const inBase = (c) => c.cy <= 4 || c.cy >= 77 || (c.c === 'indigo' && (c.cy === 44 || c.cy === 49) && c.cx <= 28);
const moving = [...cells.values()].filter((c) => !inBase(c));

// 2. Diamonds: around each ochre or deep centre.
const centres = [];
{
  const seen = new Set();
  for (const c of moving.filter((c) => c.c === 'ochre' || c.c === 'deep')) {
    if (seen.has(c.cx + ',' + c.cy)) continue;
    const st = [c], comp = [];
    seen.add(c.cx + ',' + c.cy);
    while (st.length) {
      const q = st.pop(); comp.push(q);
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
        const k = q.cx + dx + ',' + (q.cy + dy), n = cells.get(k);
        if (n && (n.c === 'ochre' || n.c === 'deep') && !seen.has(k)) { seen.add(k); st.push(n); }
      }
    }
    centres.push({ x: comp.reduce((a, q) => a + q.cx + 0.5, 0) / comp.length, y: comp.reduce((a, q) => a + q.cy + 0.5, 0) / comp.length, r: comp[0].c === 'ochre' ? 6.1 : comp.length > 1 ? 3.6 : 2.6 });
  }
}
const dia = centres.map(() => []);
moving.forEach((c) => {
  centres.forEach((k, i) => { if (Math.abs(c.cx + 0.5 - k.x) + Math.abs(c.cy + 0.5 - k.y) <= k.r) { c.d = i; dia[i].push(c); } });
});
if (moving.some((c) => c.c === 'indigo' && c.d === undefined)) throw new Error('indigo cell outside a diamond');

// 3. Distance from the left edge along the thread (Dijkstra, neighbours within 2 cells).
const dist = new Map();
const key = (c) => c.cx + ',' + c.cy;
const open = moving.filter((c) => c.cx === 0);
open.forEach((c) => dist.set(key(c), 0));
const byKey = new Map(moving.map((c) => [key(c), c]));
const queue = [...open];
while (queue.length) {
  queue.sort((a, b) => dist.get(key(b)) - dist.get(key(a)));
  const q = queue.pop(), dq = dist.get(key(q));
  for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) {
    const n = byKey.get(q.cx + dx + ',' + (q.cy + dy));
    if (!n || (!dx && !dy)) continue;
    const nd = dq + Math.hypot(dx, dy);
    if (nd < (dist.get(key(n)) ?? Infinity)) { dist.set(key(n), nd); queue.push(n); }
  }
}
const lost = moving.filter((c) => !dist.has(key(c)));
if (lost.length) throw new Error('unreachable cells: ' + lost.length);
const maxD = Math.max(...moving.map((c) => dist.get(key(c))));

// 4. Base: the cloth without the thread.
const drop = new Set(moving.map((c) => c.cx * 4 + ',' + c.cy * 4));
const artBase = art.replace(/<rect x="(\d+)" y="(\d+)" width="4" height="4" fill="url\(#f(?:[wf]-\w+|ov|oh)\)"\/>/g, (s, x, y) => (drop.has(x + ',' + y) ? '' : s));
const html = src.slice(0, src.indexOf('id="full"')) + full.slice(0, defsEnd) + artBase + full.slice(full.indexOf('<div class="title">')) + src.slice(src.indexOf('id="strip"'));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'telar-split-'));
fs.writeFileSync(path.join(tmp, 'telar.html'), html);
const exe = execSync('ls -d ~/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell').toString().trim();
const b = await chromium.launch({ headless: true, executablePath: exe });
const p = await b.newPage({ deviceScaleFactor: 2, viewport: { width: 700, height: 600 } });
await p.goto('file://' + path.join(tmp, 'telar.html'));
await p.addStyleTag({ content: 'html,body,.stage,.stagewrap,.wrap{background:transparent!important}.pass::before,.pass::after{display:none!important}.title,.nfc,svg.chip,.num,.bottom{visibility:hidden!important}' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(1200);
const png = path.join(tmp, 'telar.png');
await (await p.$('#full .card')).screenshot({ path: png, omitBackground: true });
await b.close();
execSync(`cwebp -quiet -q 86 -alpha_q 100 "${png}" -o "${root}/src/home/assets/cards/telar.webp"`);

// 5. Overlay SVG.
const grab = (re) => { const m = full.match(re); if (!m) throw new Error('missing ' + re); return m[0]; };
const rename = (s) => s.replace(/id="fw-/g, 'id="tw-').replace(/id="ff-/g, 'id="tf-').replace(/#fw-/g, '#tw-').replace(/#ff-/g, '#tf-').replace(/id="fov"/g, 'id="tov"').replace(/id="foh"/g, 'id="toh"').replace(/#fov\b/g, '#tov').replace(/#foh\b/g, '#toh');
const min = (s) => s.replace(/>\s+</g, '><').replace(/\n/g, '');
const COLORS = ['cream', 'dim', 'ochre', 'deep', 'indigo'];
const used = new Set(moving.map((c) => c.c));
let defs = '';
for (const col of COLORS) {
  if (!used.has(col)) continue;
  defs += rename(grab(new RegExp(`<linearGradient id="fw-${col}"[\\s\\S]*?</linearGradient>`))) + rename(grab(new RegExp(`<linearGradient id="ff-${col}"[\\s\\S]*?</linearGradient>`)));
}
defs += rename(grab(/<linearGradient id="fov"[\s\S]*?<\/linearGradient>/)) + rename(grab(/<linearGradient id="foh"[\s\S]*?<\/linearGradient>/));
defs = min(defs);
for (const col of COLORS) {
  if (!used.has(col)) continue;
  defs += `<pattern id="tp-${col}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="url(#tw-${col})"/><rect width="4" height="4" fill="url(#tov)"/><rect x="4" width="4" height="4" fill="url(#tf-${col})"/><rect x="4" width="4" height="4" fill="url(#toh)"/><rect y="4" width="4" height="4" fill="url(#tf-${col})"/><rect y="4" width="4" height="4" fill="url(#toh)"/><rect x="4" y="4" width="4" height="4" fill="url(#tw-${col})"/><rect x="4" y="4" width="4" height="4" fill="url(#tov)"/></pattern>`;
}
// The smooth light and shade that sat over the whole cloth in the original: the same three gradients, in card space, kept to the thread by a clip.
const stops = (id) => min(grab(new RegExp(`<(?:linear|radial)Gradient id="${id}"[\\s\\S]*?</(?:linear|radial)Gradient>`)));
const toUser = (s, id) => s.replace(`id="f${id}"`, `id="tl-${id}" gradientUnits="userSpaceOnUse" gradientTransform="matrix(520 0 0 328 0 0)"`);
defs += toUser(stops('fcalm'), 'calm') + toUser(stops('fsheen'), 'sheen') + toUser(stops('fvig'), 'vig');
defs += '<g id="tl-L"><rect width="520" height="328" fill="url(#tl-calm)"/><rect width="520" height="328" fill="url(#tl-sheen)"/><rect width="520" height="328" fill="url(#tl-vig)"/></g>';

// Horizontal runs of cells as one path.
const pathOf = (list) => {
  const rows = new Map();
  list.forEach((c) => { if (!rows.has(c.cy)) rows.set(c.cy, []); rows.get(c.cy).push(c.cx); });
  let d = '';
  [...rows.keys()].sort((a, b) => a - b).forEach((y) => {
    const xs = rows.get(y).sort((a, b) => a - b);
    for (let i = 0; i < xs.length;) { let j = i; while (xs[j + 1] === xs[j] + 1) j++; d += `M${xs[i] * 4} ${y * 4}h${(j - i + 1) * 4}v4h-${(j - i + 1) * 4}z`; i = j + 1; }
  });
  return d;
};
let n = 0;
const unit = (list, attrs) => {
  const id = n++;
  const byCol = new Map();
  list.forEach((c) => { if (!byCol.has(c.c)) byCol.set(c.c, []); byCol.get(c.c).push(c); });
  let paths = '', fills = '', clip = '';
  [...byCol.entries()].forEach(([col, l], i) => {
    paths += `<path id="t${id}-${i}" d="${pathOf(l)}"/>`;
    fills += `<use href="#t${id}-${i}" fill="url(#tp-${col})"/>`;
    clip += `<use href="#t${id}-${i}"/>`;
  });
  defs += paths + `<clipPath id="tc-${id}">${clip}</clipPath>`;
  return `<g ${attrs}>${fills}<use href="#tl-L" clip-path="url(#tc-${id})"/></g>`;
};
const NB = 40;
const bands = Array.from({ length: NB }, () => []);
moving.filter((c) => c.d === undefined).forEach((c) => bands[Math.min(NB - 1, Math.floor((dist.get(key(c)) / (maxD + 0.001)) * NB))].push(c));
let body = '';
bands.forEach((l, i) => { if (l.length) body += unit(l, `data-k="${i}"`); });
const f1 = (v) => String(Math.round(v * 10) / 10);
dia.forEach((l, i) => {
  const at = Math.min(...l.map((c) => dist.get(key(c)))) / (maxD + 0.001);
  body += unit(l, `data-d="${f1(at * 1000)}" data-o="${f1(centres[i].x * 4)}px ${f1(centres[i].y * 4)}px"`);
});
const svg = `<defs>${defs}</defs>${body}`;

const ts = `// Telar: the moving parts of the card (the cross-stitch thread weaving itself from the left, and its diamonds).
// Generated by scripts/cards/gen/telar-split.mjs from the same source as src/home/assets/cards/telar.webp (the red cloth and blue borders).
// At rest, this overlay on that base is the approved card. Build-up is about 1.3 s.
import { pop, EASE, type CardMotion } from './index';

const svg = ${JSON.stringify(svg)};

const motion: CardMotion = {
  id: 'telar',
  svg,
  play(root, delay) {
    const out: Animation[] = [];
    // The thread: ${NB} bands of stitches, each one fades in as the thread reaches it (distance along the thread from the left edge).
    root.querySelectorAll<SVGGElement>('[data-k]').forEach((g) => {
      out.push(g.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 170, delay: delay + Number(g.dataset.k) * ${Math.round(1000 / NB)}, easing: EASE, fill: 'backwards' }));
    });
    // Each diamond lights up as the thread arrives at it.
    root.querySelectorAll<SVGGElement>('[data-d]').forEach((g) => {
      out.push(pop(g, delay + Number(g.dataset.d) + 40, 240, g.dataset.o));
    });
    return out;
  },
};

export default motion;
`;
fs.writeFileSync(root + '/src/home/sections/card-motion/telar.ts', ts);
console.log('telar.ts bytes', ts.length, 'svg bytes', svg.length, 'units', n, 'cells', moving.length, 'maxD', maxD.toFixed(1));
