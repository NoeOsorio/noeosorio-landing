// Splits the Essay Studio card in two: the still base (public/home/cards/essay.webp, paper only)
// and the moving parts (src/home/sections/card-motion/essay.ts, SVG in the same 520 x 328 space).
// Run from the repo root:  node scripts/cards/gen/essay-split.mjs
import { chromium } from '/private/tmp/claude-501/-Users-noe-Dev-Web/2507de66-3b5f-4d4b-b0d4-cab428c99f73/scratchpad/refs/node_modules/playwright/index.mjs';
import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const root = process.cwd();
const exe = execSync('ls -d ~/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell').toString().trim();
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'essay-split-'));
const b = await chromium.launch({ headless: true, executablePath: exe });
const p = await b.newPage({ deviceScaleFactor: 2, viewport: { width: 700, height: 600 } });
await p.goto('file://' + root + '/scripts/cards/essay.html');
await p.addStyleTag({ content: 'html,body,.stage,.stagewrap{background:transparent!important}.pass::before,.pass::after{display:none!important}.title,.nfc,svg.chip,.num,.bottom{visibility:hidden!important}' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(1200);

// 1. Measure the moving parts, in card coordinates (520 x 328).
const m = await p.evaluate(() => {
  const card = document.querySelector('.card').getBoundingClientRect();
  const es = document.querySelector('.essay');
  const eb = es.getBoundingClientRect();
  const rel = (r) => ({ x: r.left - card.left, y: r.top - card.top, w: r.width, h: r.height });
  // Scribbles, grouped by line and by colour.
  const tw = document.createTreeWalker(es, NodeFilter.SHOW_TEXT);
  const words = []; let n;
  while ((n = tw.nextNode())) { const re = /\S+/g; let mm; while ((mm = re.exec(n.data))) { const r = document.createRange(); r.setStart(n, mm.index); r.setEnd(n, mm.index + mm[0].length); const b = r.getBoundingClientRect(); words.push({ x0: b.left - card.left, x1: b.right - card.left, y: Math.round(b.bottom - card.top) }); } }
  const paths = [...es.querySelectorAll(':scope > svg > path')].map((el) => ({ d: el.getAttribute('d'), c: el.getAttribute('stroke') }));
  const ci = es.querySelector('.ci'), cb = ci.getBoundingClientRect();
  return {
    ox: eb.left - card.left, oy: eb.top - card.top,
    words, paths,
    hl: [...es.querySelector('.hl').getClientRects()].map(rel),
    wv: [...es.querySelector('.wv').getClientRects()].map(rel),
    circle: { x: cb.left - card.left - 5, y: cb.top - card.top - 4, w: cb.width + 10, h: cb.height + 9, d: ci.querySelector('svg path').getAttribute('d') },
  };
});
if (m.words.length !== m.paths.length) throw new Error('word and path counts differ');

// 2. Base: the paper without the moving parts.
await p.addStyleTag({ content: '.essay>svg,.ci svg,.note,.conn{display:none!important}.essay .hl{background:none!important}.essay .wv{text-decoration:none!important}' });
await p.waitForTimeout(200);
const png = path.join(tmp, 'essay.png');
await (await p.$('.card')).screenshot({ path: png, omitBackground: true });
await b.close();
execSync(`cwebp -quiet -q 86 -alpha_q 100 "${png}" -o "${root}/public/home/cards/essay.webp"`);

// 3. Overlay SVG.
const f1 = (v) => String(Math.round(v * 10) / 10);
// Lines, each split into colour runs; one path per run.
const lines = new Map();
m.words.forEach((w, i) => { if (!lines.has(w.y)) lines.set(w.y, []); lines.get(w.y).push({ ...w, d: m.paths[i].d, c: m.paths[i].c }); });
const ys = [...lines.keys()].sort((a, b) => a - b);
const COLOR = {}; // colour to short class
let scrib = '';
const runsMeta = []; // per line: [{x0,x1}]
ys.forEach((y, li) => {
  const ws = lines.get(y).sort((a, b) => a.x0 - b.x0);
  const runs = [];
  ws.forEach((w) => { const last = runs[runs.length - 1]; if (last && last.c === w.c) { last.d += w.d; last.x1 = w.x1; } else runs.push({ c: w.c, d: w.d, x0: w.x0, x1: w.x1 }); });
  const lx0 = ws[0].x0, lx1 = ws[ws.length - 1].x1;
  scrib += `<g data-line="${li}">`;
  runs.forEach((r) => {
    const cls = r.c.toLowerCase();
    COLOR[cls] = true;
    scrib += `<path data-s="${((r.x0 - lx0) / (lx1 - lx0)).toFixed(3)} ${((r.x1 - r.x0) / (lx1 - lx0)).toFixed(3)}" stroke="${cls}" d="${r.d}"/>`;
  });
  scrib += '</g>';
});
const ox = f1(m.ox), oy = f1(m.oy);

const hl = m.hl.map((r) => `<rect x="${f1(r.x)}" y="${f1(r.y + r.h * 0.12)}" width="${f1(r.w)}" height="${f1(r.h * 0.78)}" rx="2"/>`).join('');
// Wavy underline, fitted to the browser's own: centre 1.4 px below the box, 22 waves, 1.25 px amplitude.
const w0 = m.wv[0], N = 22, LEN = w0.w / N, A2 = 2.5;
const wvD = `M${f1(w0.x)} ${f1(w0.y + w0.h + 2.4)} q${LEN / 4} -${A2} ${LEN / 2} 0` + ` t${LEN / 2} 0`.repeat(N * 2 - 1);
const c = m.circle;
const circle = `<path data-d transform="translate(${f1(c.x)} ${f1(c.y)}) scale(${(c.w / 60).toFixed(4)} ${(c.h / 30).toFixed(4)})" d="${c.d}" stroke="#7B5CC9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
// The sticky note: box (112,97) 46 x 40, turned -4 degrees, soft shadow built from stacked shapes (no filters).
const shadow = [[6, .035], [3.5, .045], [1.5, .055], [0, .06]].map(([e, a]) => `<rect x="${116 - e}" y="${109 - e}" width="${38 + 2 * e}" height="${32 + 2 * e}" rx="${6 + e}" fill="#3C286E" fill-opacity="${a}"/>`).join('')
  + '<rect x="112" y="98" width="46" height="40" rx="4" fill="#3C286E" fill-opacity=".14"/>';
const QMARK = 'M3.95-3.16L3.95-3.16Q4.64-3.16 5.04-2.76Q5.44-2.35 5.44-1.75L5.44-1.75Q5.44-1.21 5.18-0.77Q4.93-0.33 4.48-0.06Q4.04 0.20 3.48 0.20L3.48 0.20Q2.80 0.20 2.40-0.20Q2-0.60 2-1.20L2-1.20Q2-1.75 2.26-2.19Q2.51-2.64 2.96-2.90Q3.40-3.16 3.95-3.16ZM6.75-17.15L6.75-17.15Q7.85-17.15 8.75-16.77Q9.65-16.39 10.31-15.73Q10.98-15.08 11.34-14.20Q11.70-13.33 11.70-12.33L11.70-12.33Q11.70-10.85 11.08-9.81Q10.46-8.76 9.04-8.25Q7.61-7.74 5.20-7.88L5.20-7.88L6.51-9.46L5-5.30L4.45-5.30L5.11-9.90Q7.08-9.78 8.26-10.08Q9.44-10.39 9.97-11.12Q10.50-11.85 10.50-13L10.50-13Q10.50-13.78 10.20-14.41Q9.90-15.04 9.38-15.41Q8.85-15.79 8.15-15.79L8.15-15.79Q7.48-15.79 7-15.62Q6.53-15.45 6.18-15.22Q5.83-14.99 5.51-14.82Q5.19-14.65 4.83-14.65L4.83-14.65Q4.38-14.65 4.10-14.93Q3.83-15.20 3.83-15.63L3.83-15.63Q3.83-16.05 4.10-16.39Q4.38-16.74 5.02-16.94Q5.66-17.15 6.75-17.15Z';
const note = `<g transform="rotate(-4 135 117)"><g data-n>${shadow}<path d="M115 97H155a3 3 0 0 1 3 3V134a3 3 0 0 1-3 3H122a10 10 0 0 1-10-10V100a3 3 0 0 1 3-3Z" fill="#E3D5FF"/><path d="M115.5 97.5H154.5" stroke="#fff" stroke-opacity=".6"/><path d="M147 97H155a3 3 0 0 1 3 3V108Z" fill="#EFE6FF"/><path d="M147 97V105a3 3 0 0 0 3 3H158Z" fill="#C9B6F0"/><path transform="translate(129.5 121.9)" d="${QMARK}" fill="#563397"/></g></g>`;
const conn = 'M158 116 C 178 114 196 112 228 110', connRev = 'M228 110 C 196 112 178 114 158 116';
const colors = Object.keys(COLOR);
const svg = `<defs><mask id="essay-m" maskUnits="userSpaceOnUse" x="0" y="0" width="520" height="328"><path data-c d="${connRev}" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none"/></mask></defs>`
  + `<path d="${conn}" stroke="#8A6CD0" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="1 3.2" fill="none" mask="url(#essay-m)"/>`
  + `<g data-h fill="rgb(245 197 66 / .62)">${hl}</g>`
  + `<path data-w d="${wvD}" stroke="#2FA578" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
  + circle
  + `<g transform="translate(${ox} ${oy})" fill="none" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".78">${scrib}</g>`
  + note;

const ts = `// Essay Studio: the moving parts of the card (scribbled lines, circle, dotted link, "?" note, highlight, underline).
// Generated by scripts/cards/gen/essay-split.mjs from the same source as public/home/cards/essay.webp (the paper).
// At rest, this overlay on that base is the approved card. Build-up is about 1.4 s.
import { draw, pop, sweep, type CardMotion } from './index';

const svg = ${JSON.stringify(svg)};

const motion: CardMotion = {
  id: 'essay-studio',
  svg,
  play(root, delay) {
    const out: Animation[] = [];
    // The lines write themselves top to bottom, each one left to right in the colour runs it was measured in.
    root.querySelectorAll<SVGGElement>('[data-line]').forEach((g, i) => {
      g.querySelectorAll<SVGPathElement>('path').forEach((p) => {
        const [from, span] = (p.dataset.s || '0 1').split(' ').map(Number);
        out.push(draw(p, delay + i * 60 + from * 340, span * 340 + 60));
      });
    });
    const one = <T extends Element>(sel: string) => root.querySelector(sel) as unknown as T;
    out.push(draw(one('[data-d]'), delay + 560, 260));
    out.push(draw(one('[data-c]'), delay + 760, 180));
    out.push(pop(one('[data-n]'), delay + 880, 230, '135px 117px'));
    out.push(sweep(one('[data-h]'), delay + 960, 300, '0% 50%'));
    out.push(draw(one('[data-w]'), delay + 1100, 300));
    return out;
  },
};

export default motion;
`;
fs.writeFileSync(root + '/src/home/sections/card-motion/essay.ts', ts);
console.log('essay.ts bytes', ts.length, 'runs', runsMeta.length);
