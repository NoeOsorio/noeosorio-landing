// Splits the Kanji card in two: the still base (src/home/assets/cards/kanji.webp: the washi paper with its fibers and the red guide frame)
// and the moving parts (src/home/sections/card-motion/kanji.ts: the brush 学, written stroke by stroke, and the red seal).
// Run from the repo root:  node scripts/cards/gen/kanji-split.mjs
//
// The approved card shows 学 set in the Yuji Syuku face at 176 px, baseline at (365, 189), ink #1a1714 at .93 over a soft shadow at .22 (see how it
// was drawn in scripts/cards/gen/kanji.mjs and the replacement of the brush group). GAKU below is that glyph's outline, in font units (1000 per em, y up),
// so at rest the overlay is the same shape. Each stroke is revealed by a thick mask line drawn along its direction (hand-authored below, in the
// coordinates of a 1000 x 1000 working grid read off the glyph, then converted to font units).
//
// Stroke order of 学 (8 strokes), as the Japanese standard has it:
//   1 left dot, 2 middle dot, 3 right sweep (the three marks on top, left to right),
//   4 the short left drop of the roof, 5 the roof: horizontal that turns and hooks down (the crown 冖),
//   6 the top of 子: horizontal that sweeps down-left, 7 the vertical with its hook, 8 the long horizontal.
import { chromium } from '/private/tmp/claude-501/-Users-noe-Dev-Web/2507de66-3b5f-4d4b-b0d4-cab428c99f73/scratchpad/refs/node_modules/playwright/index.mjs';
import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const GAKU = "M931 250Q929 236 907.0 232.5Q885 229 856.5 231.0Q828 233 805 236Q798 236 792.0 237.0Q786 238 782 238Q733 242 680.5 240.5Q628 239 586 235Q585 214 585.5 191.0Q586 168 587 144Q589 94 587.5 44.5Q586 -5 569.0 -44.5Q552 -84 508 -104Q495 -98 482.5 -92.5Q470 -87 452 -86Q409 -69 376.5 -40.5Q344 -12 310 14Q313 13 316.5 12.5Q320 12 323 11Q346 6 372.5 1.5Q399 -3 424.0 -1.0Q449 1 469 14Q493 30 501.5 59.5Q510 89 510.5 123.0Q511 157 509 188Q509 200 508.5 211.0Q508 222 508 231Q470 228 423.0 223.0Q376 218 332.0 206.5Q288 195 258 172Q220 168 191.5 181.5Q163 195 145.0 217.0Q127 239 119 260Q125 272 136.0 271.0Q147 270 158 267Q163 266 167.5 264.5Q172 263 176 263Q217 261 268.0 265.5Q319 270 372 276Q403 280 434.5 283.0Q466 286 496 288Q494 311 479.0 328.0Q464 345 448.0 360.5Q432 376 427 392Q440 398 457.0 390.5Q474 383 491 374Q499 370 506.0 366.0Q513 362 519 360Q547 374 565.5 395.5Q584 417 600 442Q576 445 542.0 445.5Q508 446 472.0 441.0Q436 436 407.0 425.0Q378 414 363 395Q352 396 331.5 408.0Q311 420 291.5 439.0Q272 458 263 478Q270 480 292.0 480.0Q314 480 324 481Q345 482 370.5 484.5Q396 487 423 490Q467 495 512.0 499.0Q557 503 596 502Q609 517 634.5 514.0Q660 511 686.0 497.0Q712 483 728.0 465.5Q744 448 738 434Q735 427 725.5 423.0Q716 419 702 409Q674 390 639.5 365.5Q605 341 568 324Q569 322 571 318Q574 313 577.0 306.5Q580 300 579 295Q591 297 606.5 297.0Q622 297 638 297Q659 297 680.0 297.5Q701 298 718 301Q729 303 738.0 313.5Q747 324 757 326Q770 329 791.5 323.5Q813 318 834.0 311.0Q855 304 863 300Q872 297 889.0 288.5Q906 280 919.5 269.5Q933 259 931 250ZM953 449Q932 444 916.0 435.0Q900 426 884.5 418.5Q869 411 847 409Q822 423 795.5 435.5Q769 448 752 470Q762 488 776.5 500.5Q791 513 804.0 527.5Q817 542 819 566Q794 594 747.5 596.0Q701 598 641 594Q630 593 619.0 592.5Q608 592 596 591Q553 589 504.5 584.5Q456 580 408.5 574.0Q361 568 321 561Q301 557 268.0 548.0Q235 539 215 524Q218 492 211.5 463.5Q205 435 197 406Q193 392 189.5 378.0Q186 364 183 349Q184 345 186.5 341.5Q189 338 192 334Q197 328 200.0 321.0Q203 314 197 303Q179 302 154.5 311.5Q130 321 108.0 338.0Q86 355 75.0 377.5Q64 400 73 427Q96 426 110.5 449.0Q125 472 137 499Q141 506 144.5 513.5Q148 521 151 527Q139 536 130.5 549.0Q122 562 102 563Q105 571 111.5 574.5Q118 578 119 588Q237 607 367.5 619.5Q498 632 625 638Q645 666 666.0 692.5Q687 719 706 748Q699 762 688.5 773.0Q678 784 667 794Q673 798 673.0 801.0Q673 804 671 811Q671 812 671 812Q685 808 708.0 804.5Q731 801 755.0 795.0Q779 789 795.0 778.0Q811 767 812 748Q813 730 796.0 717.0Q779 704 763 702Q755 678 732.5 668.5Q710 659 682.5 654.5Q655 650 632 641Q638 642 648.0 642.5Q658 643 670 643Q691 644 714.0 645.5Q737 647 755.5 651.5Q774 656 780 666Q823 661 858.0 645.0Q893 629 915 595Q908 588 890 588Q922 569 937.5 530.5Q953 492 953 449ZM540 659Q515 652 496.5 666.0Q478 680 461 697Q452 707 442.5 715.5Q433 724 423 730Q418 748 417.0 771.0Q416 794 416 807Q416 811 416 812Q449 799 478.0 782.0Q507 765 524.5 736.5Q542 708 540 659ZM342 623Q319 619 302.0 629.0Q285 639 269 651Q258 659 247.5 666.0Q237 673 225 677Q223 685 221.0 702.0Q219 719 216.5 737.0Q214 755 208 766Q264 750 302.5 718.0Q341 686 342 623Z";
const root = process.cwd();
const exe = execSync('ls -d ~/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell').toString().trim();
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kanji-split-'));
const INK = 'g[transform="translate(285 59) scale(1.62)"]', SEAL = 'g[transform="translate(438 207) rotate(5)"]';
const b = await chromium.launch({ headless: true, executablePath: exe });

// 1. Base: the paper and the frame, without the glyph and without the seal.
{
  const p = await b.newPage({ deviceScaleFactor: 2, viewport: { width: 700, height: 600 } });
  await p.goto('file://' + root + '/scripts/cards/kanji.html');
  await p.addStyleTag({ content: `html,body,.stage,.stagewrap{background:transparent!important}.pass::before,.pass::after{display:none!important}.title,.nfc,svg.chip,.num,.bottom{visibility:hidden!important}#full svg.art>${INK},#full svg.art>${SEAL}{display:none!important}` });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(1200);
  await (await p.$('#full .card')).screenshot({ path: path.join(tmp, 'kanji.png'), omitBackground: true });
  await p.close();
}
execSync(`cwebp -quiet -q 86 -alpha_q 100 "${path.join(tmp, 'kanji.png')}" -o "${root}/src/home/assets/cards/kanji.webp"`);

// 2. The seal, alone, as a small picture with transparent background (its rough ink edge comes from a filter in the source, which the overlay cannot use).
{
  const p = await b.newPage({ deviceScaleFactor: 4, viewport: { width: 700, height: 600 } });
  await p.goto('file://' + root + '/scripts/cards/kanji.html');
  await p.addStyleTag({ content: `html,body,.stage,.stagewrap{background:transparent!important}.pass::before,.pass::after{display:none!important}.tex,.title,.nfc,svg.chip,.num,.bottom{display:none!important}#full .card{background:transparent!important;box-shadow:none!important}#full svg.art>*{visibility:hidden!important}#full svg.art>${SEAL}{visibility:visible!important}` });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(1200);
  await (await p.$('#full .card')).screenshot({ path: path.join(tmp, 'seal-full.png'), omitBackground: true });
  await p.close();
}
execSync(`magick "${path.join(tmp, 'seal-full.png')}" -crop 144x144+${420 * 4}+${189 * 4} +repage "${path.join(tmp, 'seal.png')}"`);
execSync(`cwebp -quiet -q 70 -alpha_q 60 -m 6 "${path.join(tmp, 'seal.png')}" -o "${path.join(tmp, 'seal.webp')}"`);
const seal = fs.readFileSync(path.join(tmp, 'seal.webp')).toString('base64');
await b.close();

// 3. Stroke masks. Points are read off a 1000 x 1000 grid picture of the glyph (x right, y down); U converts to font units.
const U = (x, y) => [(x - 55.5) / 0.7407 - 100, 1150 - y / 0.7407];
const f1 = (v) => String(Math.round(v * 10) / 10);
const line = (pts) => pts.map((q, i) => (i ? 'L' : 'M') + U(...q).map(f1).join(' ')).join('');
// [stroke number, from, span (fractions of that stroke's time), width in grid px, points]
const MASKS = [
  [1, 0, 0.75, 100, [[272, 268], [318, 310], [356, 360]]],
  [1, 0.7, 0.3, 56, [[348, 352], [366, 370], [385, 392]]],
  [2, 0, 0.7, 95, [[440, 238], [468, 285], [500, 330]]],
  [2, 0.65, 0.35, 62, [[494, 324], [512, 344], [531, 367]]],
  [3, 0, 0.45, 100, [[596, 282], [764, 302]]],
  [3, 0.4, 0.6, 60, [[690, 310], [650, 345], [598, 380]]],
  [3, 0.7, 0.3, 50, [[704, 368], [640, 376], [572, 391]]],
  [4, 0, 1, 120, [[262, 404], [268, 424], [262, 490], [235, 545], [228, 600], [238, 634], [270, 624], [282, 628]]],
  [5, 0, 0.7, 75, [[200, 436], [250, 436], [400, 415], [500, 405], [600, 397], [700, 393], [760, 395], [802, 406]]],
  [5, 0.65, 0.18, 92, [[745, 400], [752, 450], [772, 505]]],
  [5, 0.8, 0.2, 75, [[790, 415], [815, 470], [808, 520], [765, 540], [722, 520], [686, 498]]],
  [6, 0, 0.6, 80, [[312, 498], [335, 502], [395, 525], [500, 508], [600, 495], [650, 505], [668, 528], [692, 526]]],
  [6, 0.55, 0.45, 85, [[692, 526], [668, 528], [615, 548], [575, 570], [545, 598], [526, 616]]],
  [7, 0, 0.55, 96, [[438, 556], [452, 564], [488, 588], [512, 625], [525, 665], [534, 720], [535, 800], [528, 860], [530, 920]]],
  [7, 0.5, 0.5, 112, [[530, 920], [500, 906], [440, 888], [366, 850], [350, 842]]],
  [8, 0, 1, 88, [[204, 668], [222, 672], [262, 692], [320, 690], [400, 672], [500, 660], [600, 655], [690, 648], [740, 652], [800, 666], [826, 668]]],
];
const T = 'translate(277 189) scale(0.176 -0.176)', TS = 'translate(277.4 189.5) scale(0.176 -0.176)';
// Ownership: every glyph pixel belongs to exactly one stroke, and only shows with that stroke. The four outlines of the glyph are
// the two dots (their own outlines), the roof with its right sweep and left drop (strokes 3, 4, 5), and 子 (strokes 6, 7, 8).
// Where two strokes touch, the overlap belongs to the earlier one. Regions are hand-drawn polygons on the same grid (grid px).
const CONTOURS = GAKU.split(/(?<=Z)(?=M)/);
if (CONTOURS.length !== 4) throw new Error('expected 4 outlines');
const CONTOUR_OF = [3, 2, 1, 1, 1, 0, 0, 0]; // stroke 1..8 -> outline index
const poly = (pts) => 'M' + pts.map((q) => U(...q).map(f1).join(' ')).join('L') + 'Z';
const P3 = [[560, 200], [800, 200], [800, 350], [702, 352], [698, 372], [570, 390]];
const P4 = [[170, 395], [232, 395], [232, 450], [300, 462], [300, 700], [170, 700]];
const P6 = [[300, 440], [720, 440], [720, 545], [556, 632], [505, 566], [470, 556], [438, 552], [438, 570], [300, 570]];
const P8a = [[190, 625], [480, 625], [498, 640], [503, 740], [190, 740]], P8b = [[566, 603], [850, 603], [850, 740], [566, 740]];
const ALL = 'M-200 -400H1300V1100H-200Z'; // covers the whole glyph, for "everything except"
// Neighbouring regions overlap by a hair (2 grid px) so there is no seam at rest: the later stroke's region reaches into the earlier one
// (which is already drawn by then), never the other way round. grow(pts, d) moves each edge out by d (d < 0: in); polygons are clockwise on screen.
const grow = (pts, d) => {
  const n = pts.length, area = pts.reduce((a, q, i) => a + (q[0] * pts[(i + 1) % n][1] - pts[(i + 1) % n][0] * q[1]), 0);
  const sgn = area > 0 ? 1 : -1;
  const line = (i) => { const [x0, y0] = pts[i], [x1, y1] = pts[(i + 1) % n], l = Math.hypot(x1 - x0, y1 - y0), nx = sgn * (y1 - y0) / l, ny = -sgn * (x1 - x0) / l; return { x0: x0 + nx * d, y0: y0 + ny * d, dx: x1 - x0, dy: y1 - y0 }; };
  return pts.map((_, i) => {
    const A = line((i + n - 1) % n), B = line(i), det = A.dx * B.dy - A.dy * B.dx;
    if (Math.abs(det) < 1e-9) return [B.x0, B.y0];
    const t = ((B.x0 - A.x0) * B.dy - (B.y0 - A.y0) * B.dx) / det;
    return [A.x0 + A.dx * t, A.y0 + A.dy * t];
  });
};
const D = 2;
const CLIPS = {
  3: poly(P3), 4: poly(P4), 5: ALL + poly(grow(P3, -D)) + poly(grow(P4, -D)),
  6: poly(P6), 7: ALL + poly(grow(P6, -D)) + poly(P8a) + poly(P8b), 8: poly(grow(P8a, D)) + poly(grow(P8b, D)),
};
const clips = Object.entries(CLIPS).map(([s, d]) => `<clipPath id="kj-c${s}"><path transform="${T}" clip-rule="evenodd" d="${d}"/></clipPath>`).join('');
const maskOf = (s) => `<mask id="kj-m${s}" maskUnits="userSpaceOnUse" x="0" y="0" width="520" height="328"><g transform="${T}" fill="none" stroke="#fff" stroke-linecap="butt" stroke-linejoin="round">${MASKS.filter((m) => m[0] === s).map(([, from, span, w, pts]) => `<path data-s="${s} ${from} ${span}" stroke-width="${f1(w * 1.25 / 0.7407)}" d="${line(pts)}"/>`).join('')}</g></mask>`;
const layer = (tr) => [1, 2, 3, 4, 5, 6, 7, 8].map((s) => {
  const use = `<use href="#kj-o${CONTOUR_OF[s - 1]}"${tr ? ` transform="${tr}"` : ''}/>`;
  const inner = `<g mask="url(#kj-m${s})">${use}</g>`;
  return CLIPS[s] ? `<g clip-path="url(#kj-c${s})">${inner}</g>` : inner;
}).join('');
const svg = `<defs>${CONTOURS.map((d, i) => `<path id="kj-o${i}" transform="${T}" d="${d}"/>`).join('')}${clips}${[1, 2, 3, 4, 5, 6, 7, 8].map(maskOf).join('')}</defs>`
  + `<g fill="#1a1714"><g opacity=".22" transform="translate(.4 .5)">${layer('')}</g><g opacity=".93">${layer('')}</g></g>`
  + `<image data-seal href="data:image/webp;base64,${seal}" x="420" y="189" width="36" height="36"/>`;

const ts = `// Kanji Study App: the moving parts of the card (学 written stroke by stroke in its correct order, then the red seal).
// Generated by scripts/cards/gen/kanji-split.mjs; the base picture (src/home/assets/cards/kanji.webp) keeps the washi paper, its fibers and the red guide frame.
// At rest, this overlay on that base is the approved card. Build-up is about 1.4 s.
import { draw, EASE, type CardMotion } from './index';

const svg = ${JSON.stringify(svg)};

// Stroke order of 学: three marks on top (left dot, middle dot, right sweep), the roof (short left drop, then the horizontal that hooks down),
// then 子 (horizontal that sweeps down-left, vertical with hook, long horizontal). [start, duration] in ms after the delay.
const STROKES: [number, number][] = [[0, 110], [90, 110], [180, 140], [310, 120], [420, 260], [660, 180], [820, 220], [1020, 180]];

const motion: CardMotion = {
  id: 'kanji',
  svg,
  play(root, delay) {
    const out: Animation[] = [];
    // Each stroke is a thick line in the mask, drawn along the stroke direction; the glyph shows wherever the mask has been drawn.
    root.querySelectorAll<SVGPathElement>('mask path').forEach((p) => {
      const [s, from, span] = (p.dataset.s || '1 0 1').split(' ').map(Number);
      const [at, ms] = STROKES[s - 1];
      out.push(draw(p, delay + at + from * ms, Math.max(40, span * ms)));
    });
    // The seal presses down last: from a little large and transparent to its place.
    const seal = root.querySelector('[data-seal]') as SVGElement;
    seal.style.transformBox = 'view-box';
    seal.style.transformOrigin = '438px 207px';
    out.push(seal.animate([{ transform: 'scale(1.15)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 240, delay: delay + 1180, easing: EASE, fill: 'backwards' }));
    return out;
  },
};

export default motion;
`;
fs.writeFileSync(root + '/src/home/sections/card-motion/kanji.ts', ts);
console.log('kanji.ts bytes', ts.length, 'svg bytes', svg.length, 'seal webp bytes', Buffer.from(seal, 'base64').length);
