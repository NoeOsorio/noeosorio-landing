import fs from 'fs';
const P1='M123 111 L225 111 L250 154 L225 198 L199 155 L150 155 L123 198 L147 243 L97 243 L72 199 Z';
const P2='M252 156 L302 156 L327 200 L276 288 L175 288 L149 244 L174 200 L200 244 L250 244 L276 200 Z';
const COLS=50;
const row=(t,q)=>{const dots=Math.max(2,COLS-t.length-q.length-2);return `${t} ${'.'.repeat(dots)} ${q}`;};
const lines=[row('Cuaderno profesional','x2'),row('Lápiz 2B','x12'),row('Goma de migajón','x3'),row('Folder tamaño carta','x5')];
let x=1,seed=9;const r=()=>(seed=seed*16807%2147483647)/2147483647;
let bars='';let bx=118;
while(bx<296){const w=[1,1,2,3][Math.floor(r()*4)];bars+=`<rect x="${bx}" y="150" width="${w}" height="52"/>`;bx+=w+[1,1,2,2,3][Math.floor(r()*5)];}
const LOGO=`<svg class="mark" viewBox="60 100 280 200" fill="#7FA62A" aria-hidden="true"><path d="${P1}"/><path d="${P2}"/></svg>`;
const NFC=`<svg class="nfc" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 8.5 a6 6 0 0 1 0 9 M12 5.5 a10 10 0 0 1 0 15 M16 2.5 a14 14 0 0 1 0 21"/></svg>`;
const CHIP=`<svg class="chip" viewBox="0 0 52 40"><rect x=".5" y=".5" width="51" height="39" rx="7" fill="#D7B56A"/><rect x=".5" y=".5" width="51" height="39" rx="7" fill="none" stroke="#9C7B33" stroke-opacity=".6"/><path d="M0 14 H17 M0 26 H17 M35 14 H52 M35 26 H52 M17 0 V40 M35 0 V40 M17 20 H35" stroke="#9C7B33" stroke-opacity=".7" fill="none"/></svg>`;
const art=`<svg class="art" viewBox="0 0 520 328" preserveAspectRatio="xMidYMid slice" role="presentation">
<defs>
<linearGradient id="pp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F8F3E7"/><stop offset=".6" stop-color="#F3EEE0"/><stop offset="1" stop-color="#E9E1CD"/></linearGradient>
<radialGradient id="vg" cx=".5" cy=".45" r=".75"><stop offset=".6" stop-color="#8a7a55" stop-opacity="0"/><stop offset="1" stop-color="#8a7a55" stop-opacity=".16"/></radialGradient>
<linearGradient id="roll" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".08" stop-color="#fff" stop-opacity="0"/><stop offset=".92" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".07"/></linearGradient>
<filter id="streak" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".003 .85" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .3  0 0 0 0 .2  0 0 0 .55 -.12"/></filter>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" seed="2"/><feColorMatrix values="0 0 0 0 .3  0 0 0 0 .26  0 0 0 0 .18  0 0 0 .5 -.18"/></filter>
<filter id="fade" x="-2%" y="-5%" width="104%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035 .5" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 2.2" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>
</defs>
<rect width="520" height="328" fill="url(#pp)"/>
<rect width="520" height="328" filter="url(#streak)" opacity=".38"/>
<rect width="520" height="328" filter="url(#grain)" opacity=".5"/>
<rect width="520" height="328" fill="url(#vg)"/>
<rect width="520" height="328" fill="url(#roll)"/>
<path d="M20 13.5 H500" stroke="#6b5f45" stroke-opacity=".5" stroke-dasharray="2.4 3.6" stroke-linecap="round"/>
<g filter="url(#fade)" fill="#23201A">
${lines.map((l,i)=>`<text x="112" y="${96+i*16}" font-family="Geist Mono" font-weight="500" font-size="10.5" letter-spacing=".3" xml:space="preserve" opacity=".78">${l}</text>`).join('')}
<path d="M112 166 H492" stroke="#23201A" stroke-width="1" stroke-dasharray="5 4" opacity=".5" fill="none"/>
<g opacity=".82">${bars.replace(/y="150"/g,'y="177"').replace(/height="52"/g,'height="36"')}</g>
<g transform="rotate(-3 410 196)" fill="none" stroke="#23201A" opacity=".85">
<rect x="334" y="176" width="150" height="40" rx="5" stroke-width="1.6"/>
<rect x="338.5" y="180.5" width="141" height="31" rx="3" stroke-width=".8"/>
<g transform="translate(346 184.5) scale(.92)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21 H17.5 A5 5 0 0 0 18.4 11.1 A7 7 0 0 0 5.3 9.7 A5.6 5.6 0 0 0 7 21 Z"/><path d="M3 2.5 L22 24" /></g>
<text x="378" y="202.5" font-family="Geist Mono" font-weight="600" font-size="17" letter-spacing="2.2" fill="#23201A" stroke="none">OFFLINE</text>
</g>
</g>
</svg>`;
const css=`
:root{--night:#0E0D0B;--ink:#F4EEE4;--lime:#D6F35C}
*{box-sizing:border-box}
body{margin:0;background:var(--night);color:var(--ink);font-family:Geist,sans-serif;padding:56px;display:flex;flex-direction:column;gap:56px;align-items:flex-start}
.stage{padding:40px;background:var(--night)}
.pass{position:relative;width:520px;height:328px;border-radius:19px;color:#1E1B16;display:block}
.pass::before{content:"";position:absolute;inset:3px 0 -3px;border-radius:inherit;background:#F4F1E9;filter:brightness(.6)}
.pass::after{content:"";position:absolute;inset:10% 6% -6%;border-radius:inherit;background:rgba(0,0,0,.55);filter:blur(22px);z-index:-1}
.card{position:absolute;inset:0;border-radius:19px;overflow:hidden;contain:paint;padding:24px 28px 22px;display:grid;grid-template-columns:1fr auto;grid-template-rows:auto auto 1fr auto auto;background:#F4F1E9;
 -webkit-mask:radial-gradient(circle 3.4px at 5px 0,transparent 97%,#000) 0 0/10px 7px repeat-x,linear-gradient(#000,#000) 0 6px/100% calc(100% - 6px) no-repeat;
 box-shadow:inset 0 1px 0 rgba(255,255,255,.28),inset 0 -1px 0 rgba(0,0,0,.2)}
.card>*{position:relative}
.art{position:absolute!important;inset:0;width:100%;height:100%;pointer-events:none}
.title{grid-column:1;display:flex;flex-direction:column;gap:6px;margin-top:6px}
.name{font:700 23px/1.05 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em}
.topic{font:600 10px/1 Geist;letter-spacing:.2em;text-transform:uppercase;opacity:.7}
.nfc{grid-column:2;width:26px;height:26px;opacity:.8;margin-top:6px}
svg.chip{grid-column:1;margin-top:16px;width:52px;height:40px}
.num{grid-column:1/3;align-self:end;margin-bottom:14px;font:500 21px/1 'Geist Mono',monospace;letter-spacing:.16em}
.bottom{grid-column:1/3;display:flex;align-items:flex-end;gap:30px}
.field{display:flex;flex-direction:column;gap:5px}
.lab{font:600 8.5px/1 Geist;letter-spacing:.2em;opacity:.62}
.val{font:600 13px/1 Geist;letter-spacing:.14em}
.mark{margin-left:auto;width:54px;height:38px;flex:none}
.strip{width:520px;height:80px;overflow:hidden;position:relative;border-radius:19px 19px 0 0}
.strip .pass{position:absolute;top:0}
`;
const card=`<div class="pass"><div class="card">${art}<div class="title"><span class="name">Pyventa Web</span><span class="topic">Tools</span></div>${NFC}${CHIP}<div class="num">•••• •••• •••• 0154</div><div class="bottom"><div class="field"><span class="lab">CREATED</span><span class="val">09/26</span></div><div class="field"><span class="lab">&nbsp;</span><span class="val">NOÉ OSORIO</span></div>${LOGO}</div></div></div>`;
fs.writeFileSync('pyventa.html',`<!doctype html><html lang="es"><meta charset="utf-8"><title>Pyventa Web</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700&family=Geist:wght@400;500;600&family=Geist+Mono:wght@500;600&display=swap" rel="stylesheet">
<style>${css}</style><body>
<div class="stage" id="full">${card}</div>
<div class="stage" id="stripwrap"><div class="strip">${card}</div></div></body></html>`);
