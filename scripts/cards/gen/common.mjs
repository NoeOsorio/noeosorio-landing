export const LOGO = ['M123 111 L225 111 L250 154 L225 198 L199 155 L150 155 L123 198 L147 243 L97 243 L72 199 Z','M252 156 L302 156 L327 200 L276 288 L175 288 L149 244 L174 200 L200 244 L250 244 L276 200 Z'];
export const rng = (seed) => { let x = seed; return () => (x = (x * 16807) % 2147483647) / 2147483647; };
export const f = (n) => Number(n.toFixed(2));
export function smooth(pts, closed = true) {
  const n = pts.length; let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  const g = (i) => closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + (closed ? 'Z' : '');
}
export const NOISE = `url("data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>')}")`;
const CHIP = `<svg class="chip" viewBox="0 0 52 40" aria-hidden="true"><rect x=".5" y=".5" width="51" height="39" rx="7" fill="#D7B56A"/><rect x=".5" y=".5" width="51" height="39" rx="7" fill="none" stroke="#9C7B33" stroke-opacity=".6"/><path d="M0 14 H17 M0 26 H17 M35 14 H52 M35 26 H52 M17 0 V40 M35 0 V40 M17 20 H35" stroke="#9C7B33" stroke-opacity=".7" fill="none"/></svg>`;
const NFC = `<svg class="nfc" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8 8.5 a6 6 0 0 1 0 9 M12 5.5 a10 10 0 0 1 0 15 M16 2.5 a14 14 0 0 1 0 21"/></svg>`;
export function page({ title, name, topic, num, created, c, fg, mark, art, texOpacity = .3, texBlend = 'overlay', extraCss = '' }) {
  const cardInner = `<div class="card"><svg class="art" viewBox="0 0 520 328" preserveAspectRatio="xMidYMid slice" role="presentation">${art}</svg><div class="tex"></div>
 <div class="title"><span class="name">${name}</span><span class="topic">${topic}</span></div>${NFC}${CHIP}
 <div class="num">•••• •••• •••• ${String(num).padStart(4, '0')}</div>
 <div class="bottom"><div class="field"><span class="lab">CREATED</span><span class="val">${created}</span></div><div class="field"><span class="lab">&nbsp;</span><span class="val">NOÉ OSORIO</span></div><svg class="mark" viewBox="60 100 280 200" fill="${mark}" aria-hidden="true">${LOGO.map(d => `<path d="${d}"/>`).join('')}</svg></div></div>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700&family=Geist:wght@400;500;600&family=Geist+Mono:wght@500;600&family=Yuji+Syuku&display=swap" rel="stylesheet">
<style>
:root{--night:#0E0D0B;--ink:#F4EEE4;--lime:#D6F35C;--display:"Bricolage Grotesque","Helvetica Neue",sans-serif;--body:"Geist",system-ui,sans-serif}
*{box-sizing:border-box}body{margin:0;background:var(--night);color:var(--ink);font-family:var(--body);display:flex;flex-direction:column;align-items:flex-start;gap:0}
.stage{padding:40px;background:var(--night)}
.pass{position:relative;width:520px;height:328px;border-radius:19px;--c:${c};--fg:${fg};color:#fff}
.pass::after{content:"";position:absolute;inset:10% 6% -6%;border-radius:19px;background:rgba(0,0,0,.55);filter:blur(22px);z-index:-1}
.card{position:absolute;inset:0;border-radius:19px;overflow:hidden;contain:paint;padding:24px 28px 22px;display:grid;grid-template-columns:1fr auto;grid-template-rows:auto auto 1fr auto auto;background:var(--c);color:var(--fg);box-shadow:inset 0 1px 0 rgba(255,255,255,.28),inset 0 -1px 0 rgba(0,0,0,.2),inset 0 0 0 1px rgba(0,0,0,.08),0 -10px 22px -6px rgba(0,0,0,.42),0 -1px 0 rgba(0,0,0,.25)}
.card>*{position:relative}
.art{position:absolute!important;inset:0;width:100%;height:100%;overflow:hidden;border-radius:inherit}
.tex{position:absolute!important;inset:0;pointer-events:none;opacity:${texOpacity};mix-blend-mode:${texBlend};background-image:${NOISE};background-size:220px}
.title{grid-column:1;display:flex;flex-direction:column;gap:6px}
.name{font:700 23px/1.05 var(--display);letter-spacing:-.02em}
.topic{font:600 10px/1 var(--body);letter-spacing:.2em;text-transform:uppercase;opacity:.7}
.nfc{grid-column:2;width:26px;height:26px;opacity:.8}
svg.chip{grid-column:1;margin-top:22px;width:52px;height:40px}
.num{grid-column:1/3;align-self:end;margin-bottom:14px;font:500 21px/1 "Geist Mono",ui-monospace,monospace;letter-spacing:.16em}
.bottom{grid-column:1/3;display:flex;align-items:flex-end;gap:30px}
.field{display:flex;flex-direction:column;gap:5px}
.lab{font:600 8.5px/1 var(--body);letter-spacing:.2em;opacity:.62}
.val{font:600 13px/1 var(--body);letter-spacing:.14em}
.mark{margin-left:auto;width:54px;height:38px;flex:none}
.strip{position:relative;width:520px;height:80px;overflow:visible}
.strip .clip{position:absolute;inset:0;overflow:hidden;border-radius:19px 19px 0 0}
.strip .pass{position:absolute;left:0;top:0}
.strip .next{position:absolute;left:0;top:80px;width:520px;height:60px;border-radius:19px 19px 0 0;background:#171612;box-shadow:inset 0 1px 0 rgba(255,255,255,.14), 0 -10px 22px -6px rgba(0,0,0,.5);z-index:3}
.strip .over{position:absolute;inset:0 0 auto 0;height:80px;overflow:hidden;border-radius:19px 19px 0 0;z-index:2}
${extraCss}
</style></head><body>
<div class="stage" id="full"><div class="pass">${cardInner}</div></div>
<div class="stage" id="strip"><div class="strip"><div class="over"><div class="pass">${cardInner}</div></div><div class="next"></div></div></div>
</body></html>`;
}
