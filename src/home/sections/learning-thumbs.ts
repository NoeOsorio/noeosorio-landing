// Scene art for the "Learning out loud" thumbnails and comment avatars (generated SVG strings).
// Pattern and filter ids are prefixed lrn- and live in one shared defs block (see LEARNING_DEFS).
const INK = '#1A1712', CREAM = '#F4EEE4'
const rng = (s: number) => () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 }
const f1 = (n: number) => Math.round(n * 10) / 10

function wordSVG(w: string, x: number, y: number, rot: number, fill: string, size: number | null): string {
  const fs=size||Math.min(44,(w.length>8?200:236)/(w.length*.62)), sw=fs*.14;
  const T = (a: string) => `<text x="0" y="0" font-size="${f1(fs)}" letter-spacing="${f1(w.length>8?fs*.07:-fs*.02)}" ${a}>${w}</text>`;
  return `<g transform="translate(${x} ${y}) rotate(${rot})" stroke-linejoin="round" font-family="'Bricolage Grotesque',sans-serif" font-weight="800">
    <g transform="translate(0 3.5)" opacity=".92">${T(`fill="${INK}" stroke="${INK}" stroke-width="${f1(sw*2.3)}"`)}</g>
    ${T(`fill="${CREAM}" stroke="${CREAM}" stroke-width="${f1(sw*1.3)}"`)}
    ${T(`fill="${fill}"`)}
  </g>`;
}

/* BUILDS: a desk. props change with the motif */
function sceneBuilds(m: string): string {
  const code=m==='code';
  const wall=code?'#2B3B3A':'#34452A';
  const shelf=`
    <rect x="8" y="66" width="110" height="6" rx="2" fill="#6B4528"/><rect x="8" y="66" width="110" height="2" fill="#92613A"/>
    <rect x="13" y="36" width="10" height="30" rx="1.5" fill="#E4572E"/><rect x="13" y="42" width="10" height="2.4" fill="#F4EEE4" opacity=".7"/>
    <rect x="23" y="44" width="8" height="22" rx="1.5" fill="#F1E8D4"/><rect x="25" y="49" width="4" height="9" fill="#1A1712" opacity=".25"/>
    <rect x="31" y="32" width="11" height="34" rx="1.5" fill="#D6F35C"/><rect x="31" y="38" width="11" height="2.4" fill="#1A1712" opacity=".4"/>
    <rect x="42" y="42" width="9" height="24" rx="1.5" fill="#2F6F6A"/>
    <g transform="rotate(13 62 66)"><rect x="56" y="40" width="9" height="26" rx="1.5" fill="#C9A24B"/><rect x="56" y="46" width="9" height="2.2" fill="#1A1712" opacity=".35"/></g>
    <rect x="13" y="36" width="38" height="30" fill="url(#lrn-hatch)" opacity=".5"/>`;
  const plant=`
    <g class="sway" style="transform-origin:50% 100%"><ellipse cx="97" cy="42" rx="5" ry="11" transform="rotate(-24 97 42)" fill="#3F8A4E"/><ellipse cx="105" cy="40" rx="4.5" ry="11" transform="rotate(20 105 40)" fill="#5BA65F"/><ellipse cx="101" cy="37" rx="4" ry="11" fill="#4B9A55"/></g>
    <path d="M91 52h20l-2.5 14h-15z" fill="#C5562F"/><path d="M91 52h20v3H91z" fill="#E07A4C"/>`;
  const gear=code?`
    <path d="M80 66V44q0-8 8-8" fill="none" stroke="#F4EEE4" stroke-width="3" stroke-linecap="round" opacity="0"/>
    <g transform="translate(86 14)"><path d="M0 20a15 15 0 0 1 30 0" fill="none" stroke="#1A1712" stroke-width="4.5" stroke-linecap="round"/><rect x="-3" y="19" width="9" height="15" rx="4" fill="#D6F35C"/><rect x="24" y="19" width="9" height="15" rx="4" fill="#D6F35C"/><rect x="-3" y="19" width="4" height="15" rx="2" fill="#1A1712" opacity=".25"/></g>
    <g transform="translate(66 38)"><path d="M0 28h14l-2-4v-14l2-3H0l2 3v14z" fill="#E4572E"/><rect x="-1" y="28" width="16" height="3" rx="1.5" fill="#1A1712"/><ellipse cx="5" cy="15" rx="2.6" ry="3.4" fill="#F7C08A"/></g>`:plant;
  /* screen */
  let screen;
  if(!code){
    const lines: number[][] = [[140,128],[142,118],[142,132],[142,94],[142,126],[142,110],[142,120]];
    screen=`
    <rect x="130" y="25" width="164" height="94" rx="6" fill="#F3ECDD"/>
    <rect x="142" y="35" width="66" height="7" rx="3.5" fill="#1A1712"/>
    <rect x="140" y="55" width="124" height="10" rx="3" fill="#D6F35C"/>
    ${lines.map((l,i)=>`<rect x="${l[0]}" y="${50+i*9.4}" width="${l[1]}" height="4.4" rx="2.2" fill="#6F6650" opacity="${i==1||i==2?.9:.55}"/>`).join('')}
    <path d="M200 77c18-6 50-2 48 11s-38 13-52 6 0-14 4-17z" fill="none" stroke="#E4572E" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M142 112q4-4 8 0t8 0t8 0t8 0t8 0" fill="none" stroke="#2F9B7D" stroke-width="1.6" stroke-linecap="round"/>
    <g transform="rotate(5 270 96)"><rect x="258" y="86" width="30" height="22" rx="7" fill="#D6F35C" stroke="#1A1712" stroke-width="1.4"/><rect x="263" y="92" width="14" height="2.4" rx="1.2" fill="#1A1712"/><rect x="263" y="98" width="19" height="2.4" rx="1.2" fill="#1A1712"/></g>
    <rect class="blink" x="236" y="105" width="2" height="9" fill="#1A1712"/>`;
  } else {
    const rows: [number, [number, string][]][] = [[0,[[22,'#D6F35C'],[10,'#F4EEE4'],[36,'#F2A65A']]],[1,[[16,'#6FC3B8'],[44,'#F4EEE4']]],[1,[[28,'#F4EEE4'],[12,'#D6F35C'],[26,'#6FC3B8']]],[2,[[34,'#F2A65A'],[20,'#F4EEE4']]],[2,[[18,'#6FC3B8'],[40,'#F4EEE4']]],[1,[[12,'#D6F35C'],[30,'#F4EEE4']]],[0,[[14,'#F2A65A']]]];
    screen=`
    <rect x="130" y="25" width="164" height="94" rx="6" fill="#1B1912"/>
    ${rows.map((r,i)=>{let x = 142 + r[0] * 10;return r[1].map(t=>{const s=`<rect x="${x}" y="${36+i*10}" width="${t[0]}" height="4.6" rx="2.3" fill="${t[1]}"/>`;x+=t[0]+5;return s}).join('')}).join('')}
    <text x="254" y="98" font-family="'Geist Mono',monospace" font-weight="600" font-size="46" fill="#D6F35C" opacity=".95">{}</text>
    <rect class="blink" x="190" y="107" width="3" height="8" fill="#F4EEE4"/>`;
  }
  const monitor=`
    <rect x="123" y="18" width="178" height="108" rx="11" fill="#26231C"/>
    ${screen}
    <rect x="204" y="126" width="18" height="12" fill="#3A362C"/><rect x="184" y="136" width="58" height="6" rx="3" fill="#4A463A"/>`;
  const desk=`
    <rect x="0" y="140" width="320" height="40" fill="#B9814A"/>
    <rect x="0" y="140" width="320" height="5" fill="#D9A064"/>
    <rect x="0" y="145" width="320" height="35" fill="url(#lrn-hatch)" opacity=".6"/>
    <path d="M0 158q40-3 90 0t110 0t120 0" fill="none" stroke="#1A1712" stroke-width=".9" opacity=".22"/>
    <path d="M0 171q50-3 110 0t110 0t100 0" fill="none" stroke="#1A1712" stroke-width=".9" opacity=".18"/>
    <ellipse cx="213" cy="143" rx="38" ry="3.6" fill="#1A1712" opacity=".28"/>`;
  const items=!code?`
    <g transform="translate(262 134)"><rect x="0" y="0" width="26" height="26" rx="6" fill="#F4EEE4"/><rect x="0" y="16" width="26" height="10" rx="5" fill="url(#lrn-hatch)"/><path d="M26 7q9 0 9 7t-9 7" fill="none" stroke="#F4EEE4" stroke-width="3.6"/><ellipse cx="13" cy="2" rx="11" ry="3" fill="#6B3E22"/>
      <path class="steam" d="M8 -3q-4-6 0-11t0-9" fill="none" stroke="#F4EEE4" stroke-width="2" stroke-linecap="round" opacity=".7"/><path class="steam b" d="M17 -3q-4-6 0-11t0-9" fill="none" stroke="#F4EEE4" stroke-width="2" stroke-linecap="round" opacity=".7"/></g>
    <g transform="rotate(-14 296 170)"><rect x="268" y="166" width="46" height="6" rx="3" fill="#E4572E"/><rect x="268" y="166" width="46" height="2" fill="#F4EEE4" opacity=".35"/><path d="M314 166l7 3-7 3z" fill="#1A1712"/></g>`
  :`
    <g transform="translate(262 128)"><ellipse cx="14" cy="26" rx="15" ry="9" fill="#F6C453"/><circle cx="21" cy="9" r="9" fill="#F6C453"/><path d="M28 9q8-1 8 3t-8 3z" fill="#E4572E"/><circle cx="23" cy="7" r="1.6" fill="#1A1712"/><path d="M6 24q8 6 18 0" fill="none" stroke="#C99A2E" stroke-width="1.6"/><ellipse cx="14" cy="26" rx="15" ry="9" fill="url(#lrn-hatch)" opacity=".4"/></g>
    <g transform="translate(296 118)"><path d="M3 4h14l3 6v32h-20v-32z" fill="#E4572E"/><rect x="1" y="38" width="18" height="6" rx="2" fill="#1A1712"/><circle cx="10" cy="22" r="3" fill="#F4EEE4" opacity=".85"/><circle cx="8" cy="31" r="2" fill="#F4EEE4" opacity=".7"/><rect x="4" y="0" width="12" height="5" rx="2" fill="#1A1712"/></g>`;
  return `<rect width="320" height="180" fill="${wall}"/><rect width="320" height="180" fill="url(#lrn-dots)"/>
    <g filter="url(#lrn-wob)">${shelf}${gear}${monitor}${desk}${items}</g>`;
}

/* LIFE: city dusk, parachute, bridge in fog */
function sceneCity(): string {
  const r=rng(11);let far = '', near = '', win = '', i = 0, x = 0;
  while(x<320){const w=14+r()*18,h=30+r()*46;far+=`<rect x="${f1(x)}" y="${f1(132-h)}" width="${f1(w)}" height="${f1(h+30)}" fill="#C4623F"/>`;x+=w+1.5}
  x=-4;
  while(x<250){const w=18+r()*20,h=44+r()*50,y=152-h;
    near+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h+30)}" fill="#2B1B18"/>`;
    for(let wy=y+7;wy<146;wy+=9)for(let wx=x+4;wx<x+w-4;wx+=7){if(r()<.4)win+=`<rect class="tw tw${i++%4}" x="${f1(wx)}" y="${f1(wy)}" width="3.2" height="4.4" rx=".6" fill="#FFD36B"/>`}
    x+=w+2}
  return `<rect width="320" height="180" fill="#F0974F"/><rect y="62" width="320" height="50" fill="#F5B070"/><rect y="108" width="320" height="72" fill="#F9CB93"/>
    <circle cx="236" cy="100" r="52" fill="#F7B777"/><circle cx="236" cy="100" r="38" fill="#FFE3A8"/>
    <g class="drift"><path d="M28 40h56M44 48h44" stroke="#FBD9B0" stroke-width="5" stroke-linecap="round"/></g>
    <g filter="url(#lrn-wob)">
      ${far}${near}${win}
      <g><rect x="150" y="62" width="22" height="92" fill="#2B1B18"/><rect x="154" y="44" width="14" height="20" fill="#2B1B18"/><rect x="158" y="30" width="6" height="16" fill="#2B1B18"/><rect x="160.4" y="12" width="1.4" height="20" fill="#2B1B18"/>
        <rect class="tw" x="156" y="70" width="3" height="4" fill="#FFD36B"/><rect class="tw tw2" x="163" y="82" width="3" height="4" fill="#FFD36B"/><rect class="tw tw1" x="156" y="96" width="3" height="4" fill="#FFD36B"/></g>
      <g transform="translate(60 64)"><path d="M0 24h22l-3 6H3z" fill="#2B1B18"/><rect x="2" y="2" width="18" height="22" rx="1" fill="#6B3E22"/><path d="M0 4l11-8 11 8z" fill="#2B1B18"/><path d="M2 8h18M2 14h18M2 20h18" stroke="#1A1712" stroke-width="1" opacity=".5"/></g>
      <rect x="0" y="152" width="320" height="28" fill="#1E1311"/><rect x="0" y="152" width="320" height="4" fill="#3B2621"/><rect x="0" y="156" width="320" height="24" fill="url(#lrn-hatchL)" opacity=".5"/>
      <g transform="translate(238 128)">
        <ellipse cx="0" cy="26" rx="34" ry="5" fill="#1A1712" opacity=".5"/>
        <polygon points="0,-34 29.4,-17 29.4,17 0,34 -29.4,17 -29.4,-17" fill="#D6F35C" stroke="#1A1712" stroke-width="2.4" stroke-linejoin="round"/>
        <polygon points="0,-17.5 15.1,8.8 -15.1,8.8" fill="#C3DD42" stroke="#1A1712" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="0,-34 29.4,-17 15.1,-0 0,-17.5" fill="#E9FA95" opacity=".9"/>
        <polygon points="-29.4,17 0,34 15.1,8.8 -15.1,8.8" fill="#A9C22F" opacity=".95"/>
        <path d="M0 -17.5V-34M15.1 8.8L29.4 17M-15.1 8.8L-29.4 17M0 -17.5L29.4 -17M0 -17.5L-29.4 -17M15.1 8.8L0 34M-15.1 8.8L0 34M15.1 8.8L29.4 -17M-15.1 8.8L-29.4 -17" stroke="#1A1712" stroke-width="1.7" stroke-linecap="round" fill="none"/>
        <text x="0" y="3.6" text-anchor="middle" font-family="'Bricolage Grotesque',sans-serif" font-weight="800" font-size="11" fill="#1A1712">20</text>
      </g>
    </g>`;
}
function sceneSky(): string {
  const sc = (cx: number, cy: number, s: number) => `<g transform="translate(${cx} ${cy}) scale(${s})"><ellipse cx="0" cy="8" rx="34" ry="9" fill="#E6DDC7"/><circle cx="-14" cy="0" r="13" fill="#F4EEE4"/><circle cx="6" cy="-6" r="17" fill="#F4EEE4"/><circle cx="22" cy="2" r="11" fill="#F4EEE4"/><rect x="-34" y="4" width="68" height="12" rx="6" fill="#F4EEE4"/><ellipse cx="0" cy="10" rx="34" ry="7" fill="url(#lrn-hatch)" opacity=".5"/></g>`;
  let stripes = '';const cx = 196, pts: number[][] = [];
  for(let k=0;k<=6;k++){const a=Math.PI+(Math.PI*k/6);pts.push([cx+62*Math.cos(a),74+52*Math.sin(a)])}
  for(let k=0;k<6;k++){if(k%2===0){stripes+=`<path d="M${f1(pts[k][0])} ${f1(pts[k][1])}L${cx} 24L${f1(pts[k+1][0])} ${f1(pts[k+1][1])}Z" fill="#F4EEE4" opacity=".95"/>`}}
  return `<rect width="320" height="180" fill="#6EC9C6"/><rect y="50" width="320" height="60" fill="#8ED7CF"/><rect y="104" width="320" height="30" fill="#B5E4D6"/>
    <circle cx="288" cy="34" r="22" fill="#FFE3A8"/><circle cx="288" cy="34" r="30" fill="#FFE3A8" opacity=".35"/>
    <g class="drift">${sc(60,30,.8)}</g><g class="drift b">${sc(270,96,.9)}</g>
    <g filter="url(#lrn-wob)">
      <path d="M0 136L52 100l44 36z" fill="#2E6F59"/><path d="M40 136l40-26 52 26z" fill="#3E8467"/>
      <rect y="134" width="320" height="46" fill="#1F8E8A"/><rect y="134" width="320" height="46" fill="url(#lrn-hatch)" opacity=".5"/>
      <path d="M0 146q20-5 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" fill="none" stroke="#F4EEE4" stroke-width="1.6" opacity=".55"/>
      <path d="M0 160q26-5 52 0t52 0t52 0t52 0t52 0t52 0" fill="none" stroke="#F4EEE4" stroke-width="1.4" opacity=".4"/>
      <g transform="translate(262 136)"><path d="M-30 6q30-26 60 0z" fill="#2E6F59"/><path d="M-4 -2q-3-18 5-30" fill="none" stroke="#6B3E22" stroke-width="3.4" stroke-linecap="round"/><g class="sway"><ellipse cx="-12" cy="-34" rx="13" ry="4" transform="rotate(-24 -12 -34)" fill="#3F8A4E"/><ellipse cx="12" cy="-35" rx="13" ry="4" transform="rotate(24 12 -35)" fill="#5BA65F"/><ellipse cx="1" cy="-40" rx="4" ry="11" fill="#4B9A55"/></g></g>
      <g class="bob">
        <path d="M${f1(pts[0][0])} 74Q${f1(pts[0][0])} 24 ${cx} 24Q${f1(pts[6][0])} 24 ${f1(pts[6][0])} 74Q${cx+46} 62 ${cx+31} 74Q${cx+15} 62 ${cx} 74Q${cx-15} 62 ${cx-31} 74Q${cx-46} 62 ${cx-62} 74Z" fill="#E4572E"/>
        ${stripes}
        <path d="M${cx-62} 74Q${cx-62} 24 ${cx} 24Q${cx+62} 24 ${cx+62} 74Q${cx+46} 62 ${cx+31} 74Q${cx+15} 62 ${cx} 74Q${cx-15} 62 ${cx-31} 74Q${cx-46} 62 ${cx-62} 74Z" fill="url(#lrn-hatch)" opacity=".4"/>
        <path d="M${cx-62} 74L${cx-4} 124M${cx-31} 74L${cx-2} 124M${cx} 74L${cx} 124M${cx+31} 74L${cx+2} 124M${cx+62} 74L${cx+4} 124" stroke="#1A1712" stroke-width="1" opacity=".75"/>
        <g transform="translate(${cx} 124)">
          <path d="M-5 14l-7 20M5 14l7 18" stroke="#1A1712" stroke-width="5" stroke-linecap="round"/><path d="M-12 34l-3 3M12 32l3 3" stroke="#E4572E" stroke-width="5" stroke-linecap="round"/>
          <rect x="-8" y="-2" width="16" height="20" rx="6" fill="#D6F35C"/><circle cx="0" cy="-8" r="7.4" fill="#F4EEE4"/><rect x="-6" y="-11" width="12" height="5" rx="2.5" fill="#1A1712"/><rect x="-6" y="-11" width="5" height="5" rx="2" fill="#6EC9C6"/>
          <path d="M-8 2l-5-12M8 2l5-12" stroke="#D6F35C" stroke-width="4.2" stroke-linecap="round"/>
        </g>
      </g>
      <g transform="translate(34 52)"><g class="drift b"><path d="M0 0h26l5 3-5 3H0z" fill="#F4EEE4"/><path d="M8 3L2-6h5l8 9z" fill="#E6DDC7"/><path d="M-26 3h24" stroke="#F4EEE4" stroke-width="2" stroke-dasharray="4 3" opacity=".7"/></g></g>
    </g>`;
}
function sceneBridge(): string {
  const tx=[98,228],deck=116;
  const q = (t: number, p0: number, p1: number, p2: number) => (1-t)*(1-t)*p0+2*(1-t)*t*p1+t*t*p2;
  let sus = '';
  for(let k=1;k<12;k++){const t=k/12,x=q(t,tx[0]+5,163,tx[1]+5),y=q(t,40,112,40);sus+=`M${f1(x)} ${f1(y)}V${deck}`}
  for(let k=1;k<4;k++){const t=k/4,x=q(t,0,50,tx[0]+5),y=q(t,92,50,40);sus+=`M${f1(x)} ${f1(y)}V${deck}`;const x2=q(t,320,276,tx[1]+5),y2=q(t,92,50,40);sus+=`M${f1(x2)} ${f1(y2)}V${deck}`}
  const tower = (x: number) => `<g><rect x="${x}" y="36" width="10" height="120" fill="#D8482B"/><rect x="${x}" y="36" width="4" height="120" fill="#EF6C45"/><rect x="${x-3}" y="30" width="16" height="8" rx="2" fill="#B93B22"/><rect x="${x}" y="62" width="10" height="4" fill="#B93B22"/><rect x="${x}" y="88" width="10" height="4" fill="#B93B22"/><rect x="${x}" y="36" width="10" height="120" fill="url(#lrn-hatch)" opacity=".4"/></g>`;
  return `<rect width="320" height="180" fill="#F4B98C"/><rect y="40" width="320" height="50" fill="#F8CDA2"/><rect y="86" width="320" height="40" fill="#FBE0BC"/>
    <circle cx="86" cy="86" r="30" fill="#FFEBC4"/>
    <g filter="url(#lrn-wob)">
      <path d="M0 126L40 96l36 22 40-34 50 42z" fill="#3A6B66"/><path d="M180 126l30-28 36 20 38-22 36 30z" fill="#3A6B66"/>
      <rect y="126" width="320" height="54" fill="#3E7C84"/><rect y="126" width="320" height="54" fill="url(#lrn-hatch)" opacity=".5"/>
      <path d="M0 144q20-4 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" fill="none" stroke="#F4EEE4" stroke-width="1.5" opacity=".5"/>
      <path d="M0 162q26-4 52 0t52 0t52 0t52 0t52 0t52 0" fill="none" stroke="#F4EEE4" stroke-width="1.4" opacity=".35"/>
      ${tower(tx[0])}${tower(tx[1])}
      <path d="M0 92Q50 50 ${tx[0]+5} 40Q163 112 ${tx[1]+5} 40Q270 50 320 92" fill="none" stroke="#D8482B" stroke-width="2.2"/>
      <path d="${sus}" stroke="#B93B22" stroke-width="1" fill="none"/>
      <rect x="0" y="${deck}" width="320" height="6" fill="#D8482B"/><rect x="0" y="${deck+6}" width="320" height="3" fill="#B93B22"/>
      <rect x="0" y="${deck}" width="320" height="2" fill="#EF6C45"/>
      <g class="drift"><rect x="-20" y="128" width="190" height="14" rx="7" fill="#F4EEE4" opacity=".85"/><rect x="40" y="118" width="120" height="12" rx="6" fill="#F4EEE4" opacity=".7"/></g>
      <g class="drift b"><rect x="160" y="136" width="190" height="14" rx="7" fill="#F4EEE4" opacity=".8"/></g>
      <g transform="translate(244 40) rotate(9)">
        <rect x="-2" y="2" width="68" height="122" rx="13" fill="#000" opacity=".25"/>
        <rect x="0" y="0" width="66" height="122" rx="13" fill="#1A1712"/><rect x="4" y="4" width="58" height="114" rx="9.5" fill="#2A261F"/>
        <rect x="26" y="8" width="14" height="4" rx="2" fill="#1A1712"/>
        <rect x="14" y="40" width="38" height="22" rx="5" fill="none" stroke="#E4572E" stroke-width="3.2"/><rect x="52" y="46" width="4" height="10" rx="1.5" fill="#E4572E"/><rect x="17" y="43" width="4" height="16" rx="1.5" fill="#E4572E" class="blink"/>
        <text x="33" y="86" text-anchor="middle" font-family="'Geist Mono',monospace" font-weight="600" font-size="11" fill="#F4EEE4">0%</text>
        <path d="M33 118c0 14 18 12 22 24s14 10 24 6" fill="none" stroke="#F4EEE4" stroke-width="2.2" stroke-linecap="round" opacity=".9"/>
      </g>
    </g>`;
}

/* CAREER: a rocket that landed wrong, flowers came up anyway */
function sceneRocket(): string {
  const r=rng(21),cols=['#F28CA3','#F6C453','#F4EEE4','#E4572E'];let fl = '', cf = '';
  for(let i=0;i<22;i++){const x=6+r()*308,y=140+r()*34,c=cols[i%4],s=.7+r()*.6;
    fl+=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><g class="sway ${i%2?'b':''}"><path d="M0 0V-16" stroke="#2F6B3A" stroke-width="2"/><path d="M0 -7l-5-3" stroke="#2F6B3A" stroke-width="1.6"/><g transform="translate(0 -18)">${[0,72,144,216,288].map(a=>`<circle cx="${f1(4.2*Math.cos(a*Math.PI/180))}" cy="${f1(4.2*Math.sin(a*Math.PI/180))}" r="3.4" fill="${c}"/>`).join('')}<circle r="2.6" fill="${c==='#F6C453'?'#E4572E':'#F6C453'}"/></g></g></g>`}
  for(let i=0;i<14;i++){const x=10+r()*300,y=18+r()*80;cf+=`<g transform="rotate(${Math.round(r()*180)} ${f1(x)} ${f1(y)})"><rect class="fall ${i%2?'b':''}" x="${f1(x)}" y="${f1(y)}" width="5" height="2.6" rx=".8" fill="${cols[i%4]}"/></g>`}
  return `<rect width="320" height="180" fill="#8E2F2A"/><rect width="320" height="180" fill="url(#lrn-stitch)"/>
    <rect width="320" height="13" fill="#26305E"/><path d="M0 13l8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9 8-9 8 9" fill="none" stroke="#F4EEE4" stroke-width="1.3" opacity=".8"/>
    <rect y="13" width="320" height="3" fill="#F6C453"/>
    ${cf}
    <g filter="url(#lrn-wob)">
      <path d="M0 140q70-24 150-6t170-4v50H0z" fill="#2F4A2B"/><path d="M0 154q90-18 170-4t150-6v36H0z" fill="#3F6B34"/><path d="M0 154q90-18 170-4t150-6v36H0z" fill="url(#lrn-hatch)" opacity=".5"/>
      <g transform="rotate(-30 212 112)">
        <ellipse cx="205" cy="134" rx="26" ry="6" fill="#1A1712" opacity=".32"/>
        <path d="M186 104l-24 28 26-4z" fill="#E8A93A"/><path d="M224 104l24 28-26-4z" fill="#C98A22"/>
        <path d="M205 34C228 52 232 86 226 118H184C178 86 182 52 205 34z" fill="#F4EEE4"/>
        <path d="M205 34C228 52 232 86 226 118H184C178 86 182 52 205 34z" fill="url(#lrn-hatch)" opacity=".35" clip-path="inset(0 0 0 52%)"/>
        <path d="M205 34C216 42 222 52 224 62H186c2-10 8-20 19-28z" fill="#E4572E"/>
        <circle cx="205" cy="84" r="13" fill="#26305E"/><circle cx="205" cy="84" r="13" fill="none" stroke="#F6C453" stroke-width="3"/><path d="M198 80q4-6 10-5" fill="none" stroke="#F4EEE4" stroke-width="2" stroke-linecap="round" opacity=".8"/>
        <g transform="rotate(-24 213 104)"><rect x="196" y="98" width="34" height="13" rx="6.5" fill="#F6C453" stroke="#1A1712" stroke-width="1.5"/><circle cx="208" cy="104.5" r=".9" fill="#1A1712"/><circle cx="213" cy="104.5" r=".9" fill="#1A1712"/><circle cx="218" cy="104.5" r=".9" fill="#1A1712"/></g>
        <rect x="190" y="116" width="30" height="9" rx="2" fill="#3A2A24"/>
        <path d="M185 118h40" stroke="#E4572E" stroke-width="2.4"/>
      </g>
      <g class="steam"><circle cx="262" cy="70" r="7" fill="#F4EEE4" opacity=".75"/><circle cx="270" cy="58" r="5" fill="#F4EEE4" opacity=".6"/></g>
      <g class="steam b"><circle cx="252" cy="62" r="5.4" fill="#F4EEE4" opacity=".6"/><circle cx="260" cy="48" r="3.6" fill="#F4EEE4" opacity=".5"/></g>
      ${fl}
    </g>`;
}

/* PODCAST: studio with two mics, a CV and a tie */
function sceneStudio(): string {
  let rays = '';
  for(let k=0;k<16;k++){const a0=(k*22.5-90)*Math.PI/180,a1=((k+1)*22.5-90)*Math.PI/180,R=260;
    if(k%2===0)rays+=`<path d="M160 118L${f1(160+R*Math.cos(a0))} ${f1(118+R*Math.sin(a0))}L${f1(160+R*Math.cos(a1))} ${f1(118+R*Math.sin(a1))}Z" fill="#E4B35A"/>`}
  const mic = (x: number, rot: number, flip: string) => `<g transform="translate(${x} 118) scale(${flip})">
    <ellipse cx="0" cy="30" rx="24" ry="4" fill="#1A1712" opacity=".3"/>
    <rect x="-12" y="24" width="24" height="6" rx="3" fill="#2B2620"/><rect x="-2" y="-30" width="4" height="56" fill="#2B2620"/>
    <g transform="rotate(${rot} 0 -30)"><rect x="-5" y="-34" width="10" height="18" fill="#2B2620" transform="translate(0 20)" opacity="0"/>
      <rect x="-13" y="-72" width="26" height="42" rx="13" fill="#CFC9BB"/><rect x="-13" y="-72" width="26" height="42" rx="13" fill="url(#lrn-grille)"/><rect x="-13" y="-72" width="6" height="42" rx="3" fill="#F4EEE4" opacity=".55"/>
      <rect x="-14" y="-56" width="28" height="5" rx="2.5" fill="#E4572E"/><rect x="-6" y="-31" width="12" height="7" rx="2" fill="#2B2620"/></g></g>`;
  return `<rect width="320" height="180" fill="#D9A441"/>${rays}
    <g filter="url(#lrn-wob)">
      <path d="M0 0h42q-6 40 0 90t-4 90H0z" fill="#7C2A2D"/><path d="M0 0h14q-6 50 0 90t-2 90H0z" fill="#93383A"/><path d="M26 0q-2 50 2 90t-4 90" stroke="#5E1D21" stroke-width="3" fill="none"/>
      <path d="M320 0h-42q6 40 0 90t4 90h38z" fill="#7C2A2D"/><path d="M320 0h-14q6 50 0 90t2 90h12z" fill="#93383A"/><path d="M294 0q2 50-2 90t4 90" stroke="#5E1D21" stroke-width="3" fill="none"/>
      <rect x="0" y="136" width="320" height="44" fill="#6B3E22"/><rect x="0" y="136" width="320" height="5" fill="#92613A"/><rect x="0" y="141" width="320" height="39" fill="url(#lrn-hatch)" opacity=".6"/>
      ${mic(104,12,'1 1')}${mic(216,-12,'-1 1')}
      <g transform="translate(160 12)"><rect x="-38" y="0" width="76" height="26" rx="9" fill="#E4572E"/><rect x="-34" y="3" width="68" height="20" rx="6.5" fill="none" stroke="#F4EEE4" stroke-width="1.5" opacity=".7"/><text x="0" y="18" text-anchor="middle" font-family="'Bricolage Grotesque',sans-serif" font-weight="800" font-size="15" fill="#F4EEE4" letter-spacing=".5">AL AIRE</text></g>
      <g transform="translate(160 150)">${[-28,-20,-12,-4,4,12,20,28].map((x,i)=>`<rect class="bar" x="${x-2}" y="${-[8,16,24,14,20,28,12,6][i]}" width="4" height="${[8,16,24,14,20,28,12,6][i]*2}" rx="2" fill="#1A1712" opacity=".85"/>`).join('')}</g>
      <g transform="translate(246 142) rotate(8)"><rect x="0" y="0" width="38" height="28" rx="2" fill="#F4EEE4"/><rect x="5" y="5" width="16" height="3" rx="1.5" fill="#1A1712"/><rect x="5" y="11" width="26" height="2" rx="1" fill="#6F6650"/><rect x="5" y="16" width="22" height="2" rx="1" fill="#6F6650"/><path d="M26 22l3 3 6-7" fill="none" stroke="#2F9B7D" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></g>
      <g transform="translate(50 108)"><path d="M0 0h8l-1 6 4 22-7 12-7-12 4-22z" fill="#1F4E8C" transform="translate(4 0)"/><path d="M4 0h8l-1 5H5z" fill="#173A6A" transform="translate(0 0)"/></g>
    </g>`;
}

function sceneFor(v: { m: string }): string {
  switch(v.m){
    case 'essay': case 'code':return sceneBuilds(v.m);
    case'city':return sceneCity();
    case'sky':return sceneSky();
    case'bridge':return sceneBridge();
    case'rocket':return sceneRocket();
    case'studio':return sceneStudio();
    default:return sceneBuilds('essay');
  }
}
const wordPos: Record<string, [number, number, number]> = {essay:[14,168,-3],code:[14,168,-3],city:[16,64,-4],rocket:[12,60,-3],sky:[14,170,-3],bridge:[14,168,-3],studio:[12,170,-2]};

const STOP = new Set('como para pero esto esta ese esos más mis que con una por del los las sus nos fue'.split(' '))
// A video without a hand-picked word gets its longest meaningful word.
function deriveWord(t: string) {
  const w = t.replace(/[¿?¡!(),.]/g, '').split(/\s+/).filter((x) => x.length > 3 && !STOP.has(x.toLowerCase()))
  return (w.sort((a, b) => b.length - a.length)[0] || t).toUpperCase().slice(0, 10)
}

export function thumbSvg(v: { m: string; title: string; word?: string; fill: string }) {
  const w = v.word || deriveWord(v.title), p = wordPos[v.m] || [14, 168, -3]
  const size = v.m === 'bridge' ? 52 : null
  return `<svg viewBox="0 0 320 180" width="320" height="180" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${v.title.replace(/"/g, '')}">${sceneFor(v)}<rect width="320" height="180" filter="url(#lrn-grain)" opacity=".4" style="mix-blend-mode:multiply"/>${wordSVG(w, p[0], p[1], p[2], v.fill, size)}</svg>`
}

export const AVATARS: Record<string, string> = {
 mom:`<svg viewBox="0 0 40 40"><rect width="40" height="40" fill="#F2B8A0"/><path d="M2 40c1-8 8-10 18-10s17 2 18 10z" fill="#2F6F6A"/><circle cx="20" cy="8" r="5.6" fill="#3A2418"/><path d="M10 21c0-8 4.5-12.500 10-12.500S30 13 30 21c0 7-4.500 12-10 12s-10-5-10-12z" fill="#E3A57B"/><path d="M9.200 22.500C8 13 13 7.500 20 7.500S32 13 30.800 22.500C29.500 17 27 14.500 20 14.500S10.500 17 9.200 22.500z" fill="#3A2418"/><circle cx="16" cy="23" r="1.300" fill="#1A1712"/><circle cx="24" cy="23" r="1.300" fill="#1A1712"/><circle cx="13.500" cy="26.500" r="2" fill="#E4572E" opacity=".28"/><circle cx="26.500" cy="26.500" r="2" fill="#E4572E" opacity=".28"/><path d="M16.800 28.500q3.200 3 6.400 0" fill="none" stroke="#7C2A2D" stroke-width="1.400" stroke-linecap="round"/><circle cx="10" cy="27.500" r="1.700" fill="#F6C453"/><circle cx="30" cy="27.500" r="1.700" fill="#F6C453"/></svg>`,
 me19:`<svg viewBox="0 0 40 40"><rect width="40" height="40" fill="#BFD65A"/><path d="M3 40c1-7 7-9 17-9s16 2 17 9z" fill="#E4572E"/><path d="M15 31h10v4l-5 3-5-3z" fill="#D9A074"/><ellipse cx="20" cy="21" rx="10" ry="11" fill="#D9A074"/><path d="M9.500 19l-2-6 5 2 1-6 4 4 3-6 3 6 4-3 1 6 5-2-2 6c-2-5-6-7-10.500-7S11 14 9.500 19z" fill="#2B1B18"/><circle cx="15.500" cy="22" r="3.600" fill="#F4EEE4" fill-opacity=".5" stroke="#1A1712" stroke-width="1.300"/><circle cx="24.500" cy="22" r="3.600" fill="#F4EEE4" fill-opacity=".5" stroke="#1A1712" stroke-width="1.300"/><path d="M19.100 21.500h1.800" stroke="#1A1712" stroke-width="1.300"/><circle cx="15.500" cy="22" r="1.200" fill="#1A1712"/><circle cx="24.500" cy="22" r="1.200" fill="#1A1712"/><path d="M15.500 28q4.500 4 9 0z" fill="#7C2A2D"/><path d="M16.500 28.200h7" stroke="#F4EEE4" stroke-width="1.400"/></svg>`,
 cat:`<svg viewBox="0 0 40 40"><rect width="40" height="40" fill="#E9B44C"/><path d="M7 20L8 6l10 7zM33 20L32 6 22 13z" fill="#8A6B4A"/><path d="M10 15l.500-6 5 3.500zM30 15l-.500-6-5 3.500z" fill="#F2A3A0"/><ellipse cx="20" cy="24" rx="13.500" ry="12" fill="#A5835D"/><path d="M20 12v6M15 13.500l1.500 4.500M25 13.500L23.500 18" stroke="#6B4F34" stroke-width="1.800" stroke-linecap="round"/><ellipse cx="20" cy="29" rx="6.500" ry="4.500" fill="#F4EEE4"/><ellipse cx="14.500" cy="23" rx="2.800" ry="3.200" fill="#B8D65A"/><ellipse cx="25.500" cy="23" rx="2.800" ry="3.200" fill="#B8D65A"/><rect x="14" y="20.500" width="1.200" height="5" rx=".6" fill="#1A1712"/><rect x="24.800" y="20.500" width="1.200" height="5" rx=".6" fill="#1A1712"/><path d="M18.200 27.200h3.600l-1.800 2z" fill="#E88A8A"/><path d="M20 29.200v1.600M20 30.800q-2 1.800-3.500.600M20 30.800q2 1.800 3.500.600" fill="none" stroke="#1A1712" stroke-width="1" stroke-linecap="round"/><path d="M12 29l-7-1.500M12 30.500l-7 2M28 29l7-1.500M28 30.500l7 2" stroke="#F4EEE4" stroke-width=".9" stroke-linecap="round"/></svg>`,
 future:`<svg viewBox="0 0 40 40"><rect width="40" height="40" fill="#2F6F6A"/><path d="M3 40c1-7 7-9 17-9s16 2 17 9z" fill="#F4EEE4"/><path d="M16 31l4 5 4-5z" fill="#D6F35C"/><path d="M15.500 29h9v3.500l-4.500 2-4.500-2z" fill="#C98E65"/><ellipse cx="20" cy="21" rx="9.500" ry="11" fill="#C98E65"/><path d="M10 19c-.500-8 4-12.500 10-12.500S30.500 11 30 19c-1.500-4-5-6-10-6s-8.500 2-10 6z" fill="#D8D4C8"/><rect x="11" y="19.500" width="8" height="5.600" rx="2.600" fill="#1A1712"/><rect x="21" y="19.500" width="8" height="5.600" rx="2.600" fill="#1A1712"/><path d="M19 21h2" stroke="#1A1712" stroke-width="1.400"/><path d="M12.500 21l3-.800" stroke="#D6F35C" stroke-width="1" stroke-linecap="round"/><path d="M22.500 21l3-.800" stroke="#D6F35C" stroke-width="1" stroke-linecap="round"/><path d="M16.500 29q4 2.500 8-.500" fill="none" stroke="#7C2A2D" stroke-width="1.400" stroke-linecap="round"/></svg>`,
 algo:`<svg viewBox="0 0 40 40"><rect width="40" height="40" fill="#1A1712"/><g transform="translate(20 20)">${[0,45,90,135,180,225,270,315].map(a=>`<rect x="-3" y="-17" width="6" height="7" rx="1.500" fill="#D6F35C" transform="rotate(${a})"/>`).join('')}<circle r="12.500" fill="#D6F35C"/><circle cx="-5" cy="-3" r="4.300" fill="#F4EEE4"/><circle cx="5" cy="-3" r="4.300" fill="#F4EEE4"/><path d="M-5 -3m-2.200 0a2.200 2.200 0 1 1 4.400 0a1.400 1.400 0 1 1-2.800 0" fill="none" stroke="#1A1712" stroke-width="1.100"/><path d="M5 -3m-2.200 0a2.200 2.200 0 1 1 4.400 0a1.400 1.400 0 1 1-2.800 0" fill="none" stroke="#1A1712" stroke-width="1.100"/><path d="M-5 5q5 4 10 0" fill="none" stroke="#1A1712" stroke-width="1.600" stroke-linecap="round"/></g></svg>`,
 skip:`<svg viewBox="0 0 40 40"><rect width="40" height="40" fill="#E4572E"/><path d="M3 40c1-7 7-9 17-9s16 2 17 9z" fill="#26305E"/><ellipse cx="20" cy="22" rx="9.500" ry="11" fill="#E3AE86"/><path d="M10 18c0-8 4.500-12 10-12s10 4 10 12c-2-3.500-5-5-10-5s-8 1.500-10 5z" fill="#4A2E1F"/><rect x="9.500" y="12.500" width="21" height="4.600" rx="2.300" fill="#F4EEE4"/><path d="M15 13.200l3 1.600-3 1.600zM19 13.200l3 1.600-3 1.600z" fill="#E4572E"/><circle cx="15.500" cy="22" r="3.200" fill="#F4EEE4"/><circle cx="24.500" cy="22" r="3.200" fill="#F4EEE4"/><circle cx="16.700" cy="22" r="1.400" fill="#1A1712"/><circle cx="25.700" cy="22" r="1.400" fill="#1A1712"/><path d="M12.500 18l5-1.400M22.500 16.600l5 1.400" stroke="#4A2E1F" stroke-width="1.300" stroke-linecap="round"/><ellipse cx="20" cy="29" rx="2.200" ry="2.600" fill="#7C2A2D"/></svg>`
};

export const LEARNING_DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
    <filter id="lrn-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="4"/><feColorMatrix type="matrix" values="0 0 0 0 .12  0 0 0 0 .09  0 0 0 0 .05  1.1 0 0 0 -.5"/></filter>
    <filter id="lrn-wob" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="turbulence" baseFrequency=".02" numOctaves="2" seed="5" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="1.3"/></filter>
    <pattern id="lrn-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><rect width="1.1" height="4" fill="#1A1712" opacity=".2"/></pattern>
    <pattern id="lrn-hatchL" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)"><rect width="1" height="4" fill="#fff" opacity=".16"/></pattern>
    <pattern id="lrn-dots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1" fill="#fff" opacity=".1"/></pattern>
    <pattern id="lrn-stitch" width="5" height="5" patternUnits="userSpaceOnUse"><rect x=".4" y=".4" width="4.2" height="4.2" rx=".8" fill="#fff" opacity=".07"/></pattern>
    <pattern id="lrn-grille" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r=".8" fill="#1A1712" opacity=".5"/></pattern>
  </defs></svg>`
