// Redrawn Pyventa and Maiden OS card art (stills). Deterministic. Run: node living.mjs [outDir]
// Moving parts are separate <g id="..."> groups so an overlay can be split out later.
import fs from 'fs';
import os from 'os';
import {chromium} from '/private/tmp/claude-501/-Users-noe-Dev-Web/2507de66-3b5f-4d4b-b0d4-cab428c99f73/scratchpad/refs/node_modules/playwright/index.mjs';
const OUT=process.argv[2]||'/private/tmp/claude-501/-Users-noe-Dev-Web/2507de66-3b5f-4d4b-b0d4-cab428c99f73/scratchpad/cards-vivas/stills';
const ROOT=new URL('../../',import.meta.url).pathname;
fs.mkdirSync(OUT,{recursive:true});
let s=7;const rnd=()=>(s=s*16807%2147483647)/2147483647;
const f1=n=>n.toFixed(1);

/* ---------- PYVENTA ---------- */
const INK='#23201A', RED='#D2402F';
function pyventaArt(){
  const items=[[132,'12.50'],[96,'3.00'],[150,'45.90'],[110,'8.25']];
  const rows=items.map(([w,p],i)=>{const y=82+i*19;
    return `<path d="M${112+w+8} ${y+.5} H${488-p.length*6.9-8}" stroke="${INK}" stroke-width="1" stroke-dasharray="1.2 3.2" stroke-linecap="round" opacity=".4"/><rect x="112" y="${y-2.6}" width="${w}" height="5.2" rx="2.6" opacity=".78"/><text x="488" y="${y+3.6}" text-anchor="end" font-family="Geist Mono" font-weight="500" font-size="11" opacity=".82">${p}</text>`}).join('');
  let bars='';let bx=112;
  while(bx<300){const w=[1,1,2,3][Math.floor(rnd()*4)];bars+=`<rect x="${bx}" y="181" width="${w}" height="44"/>`;bx+=w+[1,1,2,2,3][Math.floor(rnd()*5)];}
  return `<svg xmlns="http://www.w3.org/2000/svg" class="art" viewBox="0 0 520 328" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="pp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F8F3E7"/><stop offset=".6" stop-color="#F3EEE0"/><stop offset="1" stop-color="#E9E1CD"/></linearGradient>
<radialGradient id="vg" cx=".5" cy=".45" r=".75"><stop offset=".6" stop-color="#8a7a55" stop-opacity="0"/><stop offset="1" stop-color="#8a7a55" stop-opacity=".16"/></radialGradient>
<linearGradient id="roll" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".08" stop-color="#fff" stop-opacity="0"/><stop offset=".92" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".07"/></linearGradient>
<filter id="streak" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".003 .85" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .3  0 0 0 0 .2  0 0 0 .55 -.12"/></filter>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" seed="2"/><feColorMatrix values="0 0 0 0 .3  0 0 0 0 .26  0 0 0 0 .18  0 0 0 .5 -.18"/></filter>
<linearGradient id="lz" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${RED}" stop-opacity="0"/><stop offset=".08" stop-color="${RED}"/><stop offset=".92" stop-color="${RED}"/><stop offset="1" stop-color="${RED}" stop-opacity="0"/></linearGradient>
<filter id="glow" x="-10%" y="-200%" width="120%" height="500%"><feGaussianBlur stdDeviation="2.4"/></filter>
</defs>
<g id="pv-paper"><rect width="520" height="328" fill="url(#pp)"/>
<rect width="520" height="328" filter="url(#streak)" opacity=".38"/>
<rect width="520" height="328" filter="url(#grain)" opacity=".5"/>
<rect width="520" height="328" fill="url(#vg)"/><rect width="520" height="328" fill="url(#roll)"/>
<path d="M20 13.5 H500" stroke="#6b5f45" stroke-opacity=".5" stroke-dasharray="2.4 3.6" stroke-linecap="round"/></g>
<g fill="${INK}">
<g id="pv-items">${rows}</g>
<path d="M112 153 H488" stroke="${INK}" stroke-width="1" stroke-dasharray="5 4" opacity=".5" fill="none"/>
<g id="pv-total"><rect x="112" y="161.5" width="74" height="8.5" rx="4.25" opacity=".92"/><text x="488" y="170.4" text-anchor="end" font-family="Geist Mono" font-weight="700" font-size="14" opacity=".92">69.65</text></g>
<g id="pv-barcode" opacity=".85">${bars}</g>
<g id="pv-laser"><rect x="104" y="200.5" width="206" height="5" rx="2.5" fill="${RED}" opacity=".4" filter="url(#glow)"/><rect x="104" y="202.1" width="206" height="1.8" rx=".9" fill="url(#lz)"/></g>
</g></svg>`;
}

/* ---------- MAIDEN ---------- */
function maidenArt(){
  const html=fs.readFileSync(new URL('./maiden.html',import.meta.url),'utf8');
  const topo=(html.match(/mask="url\(#gm\)">(<path d="M360[^]*?)<\/g>/)||[])[1]||'';
  const CR='rgba(244,238,228,', L='#D6F35C';
  const bar=(x,y,w,h,fill,op=1)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="${fill}" opacity="${op}"/>`;
  // table 3x3
  let cells='';const cw=27,ch=17,g=4;const tx=218,ty=146;
  const fill=[[L,CR+'.5)',CR+'.5)'],[CR+'.5)',null,L],[null,CR+'.5)',CR+'.5)']]; // content in cells
  for(let r=0;r<3;r++)for(let c=0;c<3;c++){const x=tx+c*(cw+g),y=ty+r*(ch+g);
    cells+=`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="4" fill="${r==0?'rgba(214,243,92,.14)':CR+'.07)'}"/>`;
    const f=fill[r][c];if(f)cells+=bar(x+5,y+ch/2-2,[16,12,19][(r+c)%3],4,f,f===L?1:.8);}
  // page lines
  const pw=[62,50,66,44,58]; let page=bar(330,146,28,5,L,.95);
  pw.forEach((w,i)=>page+=bar(330,160+i*10,w,3.6,CR+'.5)',.75));
  // wave
  const hs=[8,16,26,36,22,40,28,14,24,34,18,10];let wave='';
  hs.forEach((h,i)=>wave+=`<rect x="${410+i*6.5}" y="${f1(174-h/2)}" width="3.6" height="${h}" rx="1.8" fill="${L}" opacity="${(.55+.45*(h/40)).toFixed(2)}"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" class="art" viewBox="0 0 520 328" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#2A2927"/><stop offset=".46" stop-color="#1C1B19"/><stop offset="1" stop-color="#151412"/></linearGradient>
<linearGradient id="gf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/></linearGradient>
<mask id="gm"><rect width="520" height="328" fill="url(#gf)"/></mask>
<linearGradient id="sheen" x1="0" y1="0" x2="1" y2=".4"><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".44" stop-color="#fff" stop-opacity=".055"/><stop offset=".58" stop-color="#fff" stop-opacity="0"/></linearGradient>
<filter id="tex" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="5"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0"/></filter>
<radialGradient id="aura"><stop offset="0" stop-color="${L}" stop-opacity=".55"/><stop offset=".4" stop-color="${L}" stop-opacity=".16"/><stop offset="1" stop-color="${L}" stop-opacity="0"/></radialGradient>
<radialGradient id="repl" cx=".85" cy=".9" r="1"><stop offset="0" stop-color="${L}" stop-opacity=".10"/><stop offset="1" stop-color="${L}" stop-opacity="0.03"/></radialGradient>
<filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
</defs>
<g id="mn-obsidian"><rect width="520" height="328" fill="url(#bg)"/>
<g fill="none" stroke="rgba(244,238,228,.05)" stroke-width=".6" mask="url(#gm)">${topo}</g>
<rect width="520" height="328" filter="url(#tex)" opacity=".16" style="mix-blend-mode:overlay"/>
<rect width="520" height="328" fill="url(#sheen)"/></g>
<g id="mn-request"><path d="M118 70 H236 a14 14 0 0 1 14 14 V92 a14 14 0 0 1 -14 14 H128 L110 118 L114 104 a14 14 0 0 1 -10 -12 V84 a14 14 0 0 1 14 -14 Z" fill="${CR}.09)" stroke="${CR}.18)" stroke-width="1"/>
${bar(120,82,104,5,CR+'.55)')}${bar(120,93,64,5,CR+'.35)')}</g>
<g id="mn-agent"><circle cx="164" cy="204" r="26" fill="url(#aura)"/><circle cx="164" cy="204" r="12" fill="none" stroke="${L}" stroke-opacity=".35" stroke-width="1"/><circle cx="164" cy="204" r="5.4" fill="${L}"/><circle cx="162.4" cy="202.4" r="1.8" fill="#fff" opacity=".7"/></g>
<g id="mn-reply"><path d="M222 126 H474 a16 16 0 0 1 16 16 V208 a16 16 0 0 1 -16 16 H222 a16 16 0 0 1 -16 -16 V218 L186 214 L206 200 V142 a16 16 0 0 1 16 -16 Z" fill="url(#repl)" stroke="${L}" stroke-opacity=".38" stroke-width="1.1"/></g>
<g id="mn-table" transform="translate(0 3)">${cells}</g>
<g id="mn-page" transform="translate(0 3)">${page}</g>
<g id="mn-wave" transform="translate(0 3)">${wave}</g>
<g id="mn-check"><circle cx="476" cy="126" r="13" fill="${L}" opacity=".22" filter="url(#soft)"/><circle cx="476" cy="126" r="10.5" fill="${L}"/><path d="M471 126.4 L474.6 130 L481.4 122" fill="none" stroke="#1C1B19" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></g>
</svg>`;
}

/* ---------- card chrome (labels) ---------- */
const NFC=`<svg class="nfc" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 8.5 a6 6 0 0 1 0 9 M12 5.5 a10 10 0 0 1 0 15 M16 2.5 a14 14 0 0 1 0 21"/></svg>`;
const CHIP=`<svg class="chip" viewBox="0 0 52 40"><rect x=".5" y=".5" width="51" height="39" rx="7" fill="#D7B56A"/><rect x=".5" y=".5" width="51" height="39" rx="7" fill="none" stroke="#9C7B33" stroke-opacity=".6"/><path d="M0 14 H17 M0 26 H17 M35 14 H52 M35 26 H52 M17 0 V40 M35 0 V40 M17 20 H35" stroke="#9C7B33" stroke-opacity=".7" fill="none"/></svg>`;
const P1='M123 111 L225 111 L250 154 L225 198 L199 155 L150 155 L123 198 L147 243 L97 243 L72 199 Z';
const P2='M252 156 L302 156 L327 200 L276 288 L175 288 L149 244 L174 200 L200 244 L250 244 L276 200 Z';
const logo=c=>`<svg class="mark" viewBox="60 100 280 200" fill="${c}"><path d="${P1}"/><path d="${P2}"/></svg>`;
const css=`
*{box-sizing:border-box}body{margin:0;background:transparent;font-family:Geist,sans-serif}
.pass{position:relative;width:520px;height:328px;border-radius:19px;display:block}
.card{position:absolute;inset:0;border-radius:19px;overflow:hidden;padding:24px 28px 22px;display:grid;grid-template-columns:1fr auto;grid-template-rows:auto auto 1fr auto auto}
.card.pv{background:#F4F1E9;color:#1E1B16;-webkit-mask:radial-gradient(circle 3.4px at 5px 0,transparent 97%,#000) 0 0/10px 7px repeat-x,linear-gradient(#000,#000) 0 6px/100% calc(100% - 6px) no-repeat}
.card.mn{background:#1C1B19;color:#EDE7DB}
.card>*{position:relative}.art{position:absolute!important;inset:0;width:100%;height:100%}
.title{grid-column:1;display:flex;flex-direction:column;gap:6px;margin-top:6px}
.name{font:700 23px/1.05 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em}
.topic{font:600 10px/1 Geist;letter-spacing:.2em;text-transform:uppercase;opacity:.7}
.nfc{grid-column:2;width:26px;height:26px;opacity:.75;margin-top:6px}
svg.chip{grid-column:1;margin-top:16px;width:52px;height:40px}
.mn svg.chip{margin-top:22px}
.num{grid-column:1/3;align-self:end;margin-bottom:14px;font:500 21px/1 'Geist Mono',monospace;letter-spacing:.16em}
.bottom{grid-column:1/3;display:flex;align-items:flex-end;gap:30px}
.field{display:flex;flex-direction:column;gap:5px}.lab{font:600 8.5px/1 Geist;letter-spacing:.2em;opacity:.62}
.val{font:600 13px/1 Geist;letter-spacing:.14em}.mark{margin-left:auto;width:54px;height:38px}
`;
const font=`<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700&family=Geist:wght@400;500;600&family=Geist+Mono:wght@500;600;700&display=swap" rel="stylesheet">`;
const chrome=(k,name,topic,num,lg)=>`<div class="title"><span class="name">${name}</span><span class="topic">${topic}</span></div>${NFC}${CHIP}<div class="num">${num}</div><div class="bottom"><div class="field"><span class="lab">CREATED</span><span class="val">09/26</span></div><div class="field"><span class="lab">&nbsp;</span><span class="val">NOÉ OSORIO</span></div>${logo(lg)}</div>`;
const page=(inner)=>`<!doctype html><meta charset="utf-8">${font}<style>${css}</style><body>${inner}`;
const artOnly=(k,svg)=>page(`<div class="pass" id="t"><div class="card ${k}">${svg}</div></div>`);
const full=(k,svg,...a)=>page(`<div class="pass" id="t"><div class="card ${k}">${svg}${chrome(k,...a)}</div></div>`);

const pv=pyventaArt(), mn=maidenArt();
for(const [n,h] of Object.entries({'pyventa-art':artOnly('pv',pv),'maiden-art':artOnly('mn',mn),'pyventa-card':full('pv',pv,'Pyventa Web','Tools','•••• •••• •••• 0154','#7FA62A'),'maiden-card':full('mn',mn,'Maiden OS','AI agents','•••• •••• •••• 0632','#D6F35C')}))
  fs.writeFileSync(`${OUT}/${n}.html`,h);
fs.writeFileSync(new URL('./pyventa-art.svg',import.meta.url),pv);
fs.writeFileSync(new URL('./maiden-art.svg',import.meta.url),mn);

const b=await chromium.launch({headless:true,executablePath:os.homedir()+'/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
const ctx=await b.newContext({deviceScaleFactor:2,viewport:{width:560,height:360}});
const p=await ctx.newPage();
for(const n of ['pyventa-art','maiden-art','pyventa-card','maiden-card']){
  await p.goto(`file://${OUT}/${n}.html`);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
  await p.locator('#t').screenshot({path:`${OUT}/${n}.png`,omitBackground:true});
}
// old vs new
for(const n of ['pyventa','maiden']){
  const old=`file://${ROOT}public/home/cards/${n}.webp`;
  fs.writeFileSync(`${OUT}/${n}-vs.html`,`<!doctype html><body style="margin:0;background:#0E0D0B;display:flex;gap:40px;padding:40px"><img src="${old}" width="520"><img src="file://${OUT}/${n}-art.png" width="520">`);
  const q=await ctx.newPage();await q.setViewportSize({width:1160,height:408});
  await q.goto(`file://${OUT}/${n}-vs.html`);await q.waitForTimeout(500);await q.screenshot({path:`${OUT}/${n}-old-vs-new.png`});
}
await b.close();
