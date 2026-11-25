// Products drawn as soft studio shots: one light from the top left, contact shadow, crisp barcode.
export function rng(seed: number) { let s = seed; return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 } }
/* Products drawn as soft studio shots: one light from the top left, contact shadow, crisp barcode. */
function ean(seed: number){const r=rng(seed);let s='';for(let i=0;i<13;i++)s+=Math.floor(r()*10);return s}
export function barcode(seed: number, x: number, y: number, w: number, h: number, _id?: string) {          // real EAN-style pattern on a 2-unit module, guard bars longer
  const r=rng(seed),m=2,mods=Math.floor(w/m);let out='',cx=0,dark=true;
  const guard=()=>{for(let i=0;i<3;i++){out+=`<rect x="${x+(cx)*m}" y="${y}" width="${m}" height="${h+6}"/>`;cx+=2}};
  guard();while(cx<mods-8){const run=1+Math.floor(r()*3);if(dark)out+=`<rect x="${x+cx*m}" y="${y}" width="${run*m}" height="${h}"/>`;cx+=run;dark=!dark}
  if(!dark)cx+=0;guard();
  const d=ean(seed);
  return `<g fill="#17150f" shape-rendering="crispEdges">${out}</g><text x="${x+w/2}" y="${y+h+17}" text-anchor="middle" font-family="Geist Mono,ui-monospace,monospace" font-size="9.5" font-weight="500" letter-spacing=".8" fill="#2a2823">${d[0]} ${d.slice(1,7)} ${d.slice(7)}</text>`}
const D=(_id: string, body: string)=>`<defs>${body}</defs>`;
const shadowDefs=(id: string)=>`<radialGradient id="${id}a"><stop offset="0" stop-color="#3b2a12" stop-opacity=".42"/><stop offset=".55" stop-color="#3b2a12" stop-opacity=".14"/><stop offset="1" stop-color="#3b2a12" stop-opacity="0"/></radialGradient><radialGradient id="${id}b"><stop offset="0" stop-color="#3b2a12" stop-opacity=".5"/><stop offset="1" stop-color="#3b2a12" stop-opacity="0"/></radialGradient>`;
const shadow=(id: string,cx: number,cy: number,rx: number)=>`<ellipse cx="${cx+8}" cy="${cy}" rx="${rx*1.12}" ry="${rx*.13}" fill="url(#${id}a)"/><ellipse cx="${cx+3}" cy="${cy-2}" rx="${rx*.86}" ry="${rx*.045}" fill="url(#${id}b)"/>`;
const sticker=(id: string,x: number,y: number,w: number,h: number,seed: number)=>`<rect x="${x+2}" y="${y+3}" width="${w}" height="${h}" rx="4" fill="#000" opacity=".18"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="url(#${id}st)"/>${barcode(seed,x+(w-Math.floor((w-22)/2)*2)/2,y+13,Math.floor((w-22)/2)*2,h-44,id)}`;
const stDefs=(id: string)=>`<linearGradient id="${id}st" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffefb"/><stop offset="1" stop-color="#ece8dc"/></linearGradient>`;
export const ART=[
/* notebook */
`<svg viewBox="0 0 300 380" width="252" height="319" aria-hidden="true">${D('n',shadowDefs('n')+stDefs('n')+`
<linearGradient id="nc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6a8fe0"/><stop offset=".5" stop-color="#3f64bd"/><stop offset="1" stop-color="#2a438d"/></linearGradient>
<radialGradient id="nh" cx=".18" cy=".1" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></radialGradient>
<linearGradient id="ns" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".34"/><stop offset=".55" stop-color="#000" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<linearGradient id="np" x1="0" x2="1"><stop offset="0" stop-color="#ddd7c6"/><stop offset=".4" stop-color="#f6f2e6"/><stop offset="1" stop-color="#e3ddcc"/></linearGradient>
<linearGradient id="nv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>`)}
${shadow('n',150,368,112)}
<rect x="46" y="26" width="232" height="328" rx="9" fill="url(#np)"/>
${[0,1,2,3,4,5,6].map((i: number)=>`<line x1="${268+i*1.4}" y1="34" x2="${268+i*1.4}" y2="346" stroke="#b9b29d" stroke-width=".6" opacity=".7"/>`).join('')}
<rect x="34" y="16" width="232" height="328" rx="10" fill="url(#nc)"/>
<rect x="34" y="16" width="232" height="328" rx="10" fill="url(#nh)"/><rect x="34" y="16" width="232" height="328" rx="10" fill="url(#nv)"/>
<rect x="34" y="16" width="34" height="328" rx="10" fill="url(#ns)"/><line x1="68" y1="20" x2="68" y2="340" stroke="#17306e" stroke-opacity=".5"/><line x1="69.2" y1="20" x2="69.2" y2="340" stroke="#fff" stroke-opacity=".16"/>
<path d="M51 30 V330" stroke="#fff" stroke-opacity=".38" stroke-width="1.6" stroke-dasharray="7 6"/>
<path d="M36.5 26 Q36.5 18.5 44 18.5 H256" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.4"/>
<rect x="96" y="54" width="146" height="72" rx="6" fill="#000" opacity=".14" transform="translate(2,3)"/><rect x="96" y="54" width="146" height="72" rx="6" fill="#f7f3e8"/>
<rect x="112" y="74" width="86" height="7" rx="3.5" fill="#8d9cc4"/><rect x="112" y="92" width="58" height="7" rx="3.5" fill="#b4bfdb"/><rect x="112" y="108" width="34" height="5" rx="2.5" fill="#cfd6e8"/>
${sticker('n',104,226,146,92,5)}</svg>`,
/* pencils */
`<svg viewBox="0 0 300 380" width="252" height="319" aria-hidden="true">${D('p',shadowDefs('p')+stDefs('p')+`
<linearGradient id="py" x1="0" x2="1"><stop offset="0" stop-color="#fbe27a"/><stop offset=".34" stop-color="#f4c93a"/><stop offset=".34" stop-color="#e9b523"/><stop offset=".68" stop-color="#e2a91c"/><stop offset=".68" stop-color="#c88f14"/><stop offset="1" stop-color="#b57d0f"/></linearGradient>
<linearGradient id="pw" x1="0" x2="1"><stop offset="0" stop-color="#f6dcae"/><stop offset=".5" stop-color="#e8c28a"/><stop offset="1" stop-color="#c79c62"/></linearGradient>
<linearGradient id="pf" x1="0" x2="1"><stop offset="0" stop-color="#e9ebef"/><stop offset=".45" stop-color="#b9bec6"/><stop offset="1" stop-color="#868b94"/></linearGradient>
<linearGradient id="pe" x1="0" x2="1"><stop offset="0" stop-color="#f7b9c3"/><stop offset=".6" stop-color="#ec8fa0"/><stop offset="1" stop-color="#d56f84"/></linearGradient>`)}
${shadow('p',150,366,122)}
${[[82,0],[150,0],[218,0]].map(([x,o])=>`<g transform="translate(0,${o})"><polygon points="${x-30},96 ${x+30},96 ${x+4},36 ${x-4},36" fill="url(#pw)"/><polygon points="${x-6.5},64 ${x+6.5},64 ${x+4},36 ${x-4},36" fill="#3a3834"/><polygon points="${x-30},96 ${x+30},96 ${x+25},84 ${x-25},84" fill="#fff" opacity=".08"/><rect x="${x-30}" y="96" width="60" height="196" fill="url(#py)"/><rect x="${x-30}" y="292" width="60" height="14" fill="url(#pf)"/><path d="M${x-30} 296 H${x+30} M${x-30} 301 H${x+30}" stroke="#6d727a" stroke-opacity=".5"/><rect x="${x-30}" y="306" width="60" height="22" rx="9" fill="url(#pe)"/></g>`).join('')}
<rect x="58" y="190" width="184" height="96" rx="5" fill="#000" opacity=".16" transform="translate(2,3)"/><rect x="58" y="190" width="184" height="96" rx="5" fill="url(#pst)"/>
${barcode(7,82,206,136,44,'p')}</svg>`,
/* glue */
`<svg viewBox="0 0 300 380" width="252" height="319" aria-hidden="true">${D('g',shadowDefs('g')+stDefs('g')+`
<linearGradient id="gbody" x1="0" x2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".22" stop-color="#f4f5f8"/><stop offset=".62" stop-color="#d9dde6"/><stop offset="1" stop-color="#b6bcc9"/></linearGradient>
<linearGradient id="gc" x1="0" x2="1"><stop offset="0" stop-color="#6e8fe6"/><stop offset=".3" stop-color="#4a6fd0"/><stop offset="1" stop-color="#26409a"/></linearGradient>
<linearGradient id="gq" x1="0" x2="1"><stop offset="0" stop-color="#7b9aea"/><stop offset=".25" stop-color="#4f74d6"/><stop offset=".7" stop-color="#34529f"/><stop offset="1" stop-color="#27408c"/></linearGradient>
<linearGradient id="gn" x1="0" x2="1"><stop offset="0" stop-color="#f4f4f6"/><stop offset="1" stop-color="#bcc1cc"/></linearGradient>`)}
${shadow('g',150,366,92)}
<path d="M122 112 H178 V132 C178 146 224 150 224 190 V318 C224 346 204 362 176 362 H124 C96 362 76 346 76 318 V190 C76 150 122 146 122 132 Z" fill="url(#gbody)"/>
<rect x="112" y="108" width="76" height="22" rx="3" fill="url(#gn)"/>
<path d="M108 34 a10 10 0 0 1 10 -10 H182 a10 10 0 0 1 10 10 V104 a8 8 0 0 1 -8 8 H116 a8 8 0 0 1 -8 -8 Z" fill="url(#gc)"/>
${[0,1,2,3,4,5,6].map((i: number)=>`<line x1="${119+i*10.4}" y1="36" x2="${119+i*10.4}" y2="104" stroke="#fff" stroke-opacity=".22"/>`).join('')}
<path d="M116 26 H182" stroke="#fff" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"/>
<path d="M76 196 H224 V250 H76 Z" fill="url(#gq)"/><path d="M76 196 H224" stroke="#fff" stroke-opacity=".2"/>
<path d="M150 206 c10 13 15 19 15 26 a15 15 0 0 1 -30 0 c0 -7 5 -13 15 -26 z" fill="#f4f7ff"/><path d="M143 226 q-2 7 4 11" stroke="#a9bcea" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M93 208 V322" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".6"/>
${sticker('g',92,250,116,86,9)}</svg>`,
/* coloured pencils box */
`<svg viewBox="0 0 300 380" width="252" height="319" aria-hidden="true">${D('c',shadowDefs('c')+stDefs('c')+`
<linearGradient id="cbox" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ec6d5a"/><stop offset=".5" stop-color="#c93d2c"/><stop offset="1" stop-color="#972617"/></linearGradient>
<radialGradient id="ch" cx=".15" cy=".08" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></radialGradient>
<linearGradient id="cw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf8ee"/><stop offset="1" stop-color="#e9e4d3"/></linearGradient>
<linearGradient id="cs" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".0"/><stop offset="1" stop-color="#000" stop-opacity=".26"/></linearGradient>`)}
${shadow('c',150,366,122)}
<rect x="44" y="30" width="224" height="330" rx="10" fill="#7d1d12"/>
<rect x="34" y="22" width="224" height="330" rx="10" fill="url(#cbox)"/><rect x="34" y="22" width="224" height="330" rx="10" fill="url(#ch)"/><rect x="34" y="22" width="224" height="330" rx="10" fill="url(#cs)"/>
<path d="M34 32 a10 10 0 0 1 10 -10 H248 a10 10 0 0 1 10 10 V66 H34 Z" fill="#000" opacity=".16"/><path d="M36 30 a8 8 0 0 1 8 -8 H248" fill="none" stroke="#fff" stroke-opacity=".34" stroke-width="1.5"/>
<rect x="56" y="88" width="180" height="104" rx="8" fill="#000" opacity=".18" transform="translate(2,3)"/><rect x="56" y="88" width="180" height="104" rx="8" fill="url(#cw)"/>
${['#e5493a','#f08a2b','#f4c431','#86c443','#2fa56a','#35a6cc','#3f62c9','#7b50b8','#c94f98','#8a5a3c','#2b2a28','#ececec'].map((c: string,i: number)=>{const x=64+i*14.2;return `<polygon points="${x},116 ${x+11},116 ${x+5.5},100" fill="#ecc790"/><polygon points="${x+2.8},107 ${x+8.2},107 ${x+5.5},100" fill="${c}"/><rect x="${x}" y="116" width="11" height="68" fill="${c}"/><rect x="${x}" y="116" width="4" height="68" fill="#fff" opacity=".28"/><rect x="${x+7.5}" y="116" width="3.5" height="68" fill="#000" opacity=".16"/>`}).join('')}
<path d="M56 88 H236 V192 H56 Z" fill="none" stroke="#000" stroke-opacity=".12"/><path d="M60 92 L110 92 L60 150 Z" fill="#fff" opacity=".18"/>
${sticker('c',72,226,148,100,11)}</svg>`];
/* barcode sticker (centre and size) in the 300x380 art space, for the laser */
export const LAB=[{x:177,y:272,w:146,h:92},{x:150,y:238,w:184,h:96},{x:150,y:293,w:116,h:86},{x:146,y:276,w:148,h:100}];
