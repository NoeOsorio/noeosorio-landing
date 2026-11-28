import type { Mount } from '../useMount';
import type { PassportContent, PassportMain, PassportSkill } from '../data/passport';
import { esc } from '../dom';

// Mounts the work passport into root. Ported from the approved prototype (specs/002-home-objects/prototypes/work-passport.html).
// ---------- Icons: small abstract drawings, centered on (0,0), about 36px across ----------
  const ICON: Record<string, string> = {
    k8s: `<circle r="15"/><circle r="4.5"/>${[0,1,2,3,4,5,6].map(i => { const a = i * 2 * Math.PI / 7 - Math.PI / 2; return `<path d="M${(5*Math.cos(a)).toFixed(1)} ${(5*Math.sin(a)).toFixed(1)} L${(15*Math.cos(a)).toFixed(1)} ${(15*Math.sin(a)).toFixed(1)}"/>`; }).join("")}`,
    agent: `<path d="M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z"/><path d="M12 -15 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5 z" fill="currentColor" stroke="none"/>`,
    rocket: `<path d="M0 -17 C 8 -10 9 2 6 10 H -6 C -9 2 -8 -10 0 -17 Z"/><circle cy="-4" r="3.5"/><path d="M-6 4 L-12 12 L-6 10 M6 4 L12 12 L6 10 M-3 13 L0 18 L3 13"/>`,
    system: `<rect x="-17" y="-15" width="13" height="10" rx="2"/><rect x="4" y="-15" width="13" height="10" rx="2"/><rect x="-6.5" y="6" width="13" height="10" rx="2"/><path d="M-10 -5 V1 H10 V-5 M0 1 V6"/>`,
    cursor: `<path d="M-10 -15 L10 3 L1 4 L6 15 L1 17 L-4 6 L-10 12 Z" stroke-linejoin="round"/>`,
    shield: `<path d="M0 -17 L14 -11 V0 C14 9 7 14 0 17 C-7 14 -14 9 -14 0 V-11 Z"/><path d="M-6 0 L-1 5 L7 -4"/>`,
    flow: `<circle cx="-12" cy="-10" r="4.5"/><circle cx="12" cy="-10" r="4.5"/><circle cx="0" cy="12" r="4.5"/><path d="M-7.5 -10 H7.5 M10 -6 L3 8 M-10 -6 L-3 8"/>`,
    spark: `<path d="M0 -17 V-8 M0 8 V17 M-17 0 H-8 M8 0 H17 M-11 -11 L-6 -6 M6 6 L11 11 M11 -11 L6 -6 M-6 6 L-11 11"/><circle r="3.5" fill="currentColor" stroke="none"/>`,
    db: `<ellipse cy="-11" rx="13" ry="5"/><path d="M-13 -11 V11 C-13 17 13 17 13 11 V-11 M-13 0 C-13 6 13 6 13 0"/>`,
    migrate: `<ellipse cx="-10" cy="-8" rx="7" ry="3"/><path d="M-17 -8 V8 C-17 12 -3 12 -3 8 V-8"/><ellipse cx="10" cy="-8" rx="7" ry="3"/><path d="M3 -8 V8 C3 12 17 12 17 8 V-8"/><path d="M-4 -16 C 0 -20 4 -20 6 -16 M3 -18 L6 -16 L4 -13"/>`,
    wall: `<rect x="-16" y="-12" width="32" height="24" rx="2"/><path d="M-16 -4 H16 M-16 4 H16 M-6 -12 V-4 M6 -12 V-4 M0 -4 V4 M-10 -4 V4 M10 -4 V4 M-6 4 V12 M6 4 V12"/>`,
    lambda: `<path d="M-11 15 L0 -4 M-6 -15 C 0 -15 2 -12 4 -6 L 11 15"/>`,
    server: `<rect x="-15" y="-16" width="30" height="9" rx="2"/><rect x="-15" y="-4.5" width="30" height="9" rx="2"/><rect x="-15" y="7" width="30" height="9" rx="2"/><circle cx="-9" cy="-11.5" r="1.6" fill="currentColor"/><circle cx="-9" cy="0" r="1.6" fill="currentColor"/><circle cx="-9" cy="11.5" r="1.6" fill="currentColor"/>`,
    lock: `<rect x="-12" y="-3" width="24" height="19" rx="3"/><path d="M-7 -3 V-9 C-7 -18 7 -18 7 -9 V-3"/><circle cy="6" r="2.5" fill="currentColor" stroke="none"/>`,
    calendar: `<rect x="-15" y="-12" width="30" height="27" rx="3"/><path d="M-15 -4 H15 M-8 -16 V-9 M8 -16 V-9"/><rect x="2" y="2" width="7" height="6" rx="1" fill="currentColor" stroke="none"/>`,
    algo: `<path d="M0 -17 L9 -8 L0 1 L-9 -8 Z"/><rect x="-17" y="7" width="12" height="9" rx="2"/><rect x="5" y="7" width="12" height="9" rx="2"/><path d="M-6 -4 L-11 7 M6 -4 L11 7"/>`,
    atom: `<ellipse rx="16" ry="6"/><ellipse rx="16" ry="6" transform="rotate(60)"/><ellipse rx="16" ry="6" transform="rotate(-60)"/><circle r="2.5" fill="currentColor" stroke="none"/>`,
    brain: `<path d="M0 -14 C -6 -18 -15 -14 -14 -6 C -19 -2 -17 7 -11 9 C -10 15 -3 17 0 13 C 3 17 10 15 11 9 C 17 7 19 -2 14 -6 C 15 -14 6 -18 0 -14 Z M0 -14 V13 M-7 -5 C -4 -3 -4 1 -7 3 M7 -5 C 4 -3 4 1 7 3"/>`,
    receipt: `<path d="M-11 -16 H11 V16 L7 13 L3 16 L-1 13 L-5 16 L-9 13 L-11 16 Z"/><path d="M-6 -8 H6 M-6 -2 H6 M-6 4 H2"/>`,
    gauge: `<path d="M-15 8 A15 15 0 1 1 15 8"/><path d="M0 4 L8 -7"/><circle cy="4" r="2.5" fill="currentColor" stroke="none"/>`,
    tap: `<rect x="-17" y="-11" width="22" height="16" rx="2.5"/><path d="M-13 -4 H-7"/><path d="M9 -10 a12 12 0 0 1 0 16 M14 -14 a18 18 0 0 1 0 24"/>`,
    box: `<path d="M0 -16 L15 -8 V9 L0 17 L-15 9 V-8 Z M-15 -8 L0 0 L15 -8 M0 0 V17"/>`,
    tiles: `<rect x="-16" y="-16" width="14" height="14" rx="2"/><rect x="2" y="-16" width="14" height="14" rx="2"/><rect x="-16" y="2" width="14" height="14" rx="2"/><rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor" stroke="none"/>`,
    layers: `<path d="M0 -15 L16 -7 L0 1 L-16 -7 Z M-16 0 L0 8 L16 0 M-16 7 L0 15 L16 7"/>`,
    pipe: `<circle cx="-13" r="4.5"/><circle r="4.5"/><circle cx="13" r="4.5" fill="currentColor"/><path d="M-8.5 0 H-4.5 M4.5 0 H8.5 M-13 -10 C -6 -16 6 -16 13 -10 M10 -13 L13 -10 L10 -7"/>`,
    rings: `<circle r="16"/><circle r="10.5"/><circle r="5"/><circle r="1.6" fill="currentColor" stroke="none"/>`,
    chat: `<path d="M-16 -13 H5 V2 H-6 L-12 8 V2 H-16 Z"/><path d="M9 -5 H16 V10 H13 V15 L8 10 H-2 V6"/>`,
    gear: `<circle r="6"/>${[0,1,2,3,4,5,6,7].map(i => `<path d="M0 -11 V-16" transform="rotate(${i*45})"/>`).join("")}<circle r="11"/>`,
    doc: `<path d="M-12 -17 H6 L13 -10 V17 H-12 Z M6 -17 V-10 H13"/><circle cx="-4" cy="-1" r="2.5"/><circle cx="5" cy="9" r="2.5"/><path d="M6 -3 L-5 11"/>`,
    sigma: `<path d="M13 -15 H-12 L2 0 L-12 15 H13" stroke-linejoin="round"/>`,
    scale: `<path d="M0 -16 V14 M-9 15 H9 M-15 -9 H15 M-15 -9 L-20 3 H-10 Z M15 -9 L10 3 H20 Z"/>`,
    globe: `<circle r="15"/><ellipse rx="6.5" ry="15"/><path d="M-15 0 H15 M-13 -7 H13 M-13 7 H13"/>`,
    check: `<rect x="-14" y="-16" width="28" height="32" rx="3"/><path d="M-8 -7 l3 3 l5 -6 M-8 4 l3 3 l5 -6 M4 -5 H9 M4 6 H9"/>`,
    sparkle: `<path d="M-2 -16 C -1 -6 -6 -2 -16 -1 C -6 0 -1 4 -2 14 C -1 4 4 0 12 -1 C 4 -2 -1 -6 -2 -16 Z"/><path d="M12 8 V17 M7.5 12.5 H16.5"/>`,
    phone: `<rect x="-10" y="-17" width="20" height="34" rx="4"/><path d="M-4 12 H4"/><rect x="-6" y="-11" width="12" height="16" rx="1.5" fill="currentColor" stroke="none" opacity=".45"/>`,
    mentor: `<circle cx="-7" cy="-9" r="5.5"/><path d="M-17 15 C -17 4 3 4 3 15"/><circle cx="10" cy="-3" r="4"/><path d="M3 15 C 3 8 17 8 17 15"/>`,
    store: `<path d="M-16 -6 L-12 -15 H12 L16 -6 Z M-16 -6 C -16 -1 -8 -1 -8 -6 C -8 -1 0 -1 0 -6 C 0 -1 8 -1 8 -6 C 8 -1 16 -1 16 -6 M-13 -1 V15 H13 V-1 M-4 15 V6 H4 V15"/>`,
    coin: `<circle r="15"/><circle r="11"/><path d="M4 -5 C 2 -8 -5 -8 -5 -4 C -5 0 5 -1 5 4 C 5 8 -2 8 -4 5 M0 -10 V10"/>`,
    team: `<circle cy="-9" r="5" fill="currentColor"/><circle cx="-12" cy="-4" r="4"/><circle cx="12" cy="-4" r="4"/><path d="M-8 12 a8 8 0 0 1 16 0 M-19 13 a7 7 0 0 1 12 -4 M7 9 a7 7 0 0 1 12 4"/>`
  };
  const BIG: Record<string, string> = {
    clouds: `<g stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(-210,-200)">
      <path d="M130 172 a16 16 0 0 1 14 -22 a20 20 0 0 1 36 -2 a14 14 0 0 1 12 24 z"/><path d="M186 140 a16 16 0 0 1 14 -22 a20 20 0 0 1 36 -2 a14 14 0 0 1 12 24 z"/><path d="M242 172 a16 16 0 0 1 14 -22 a20 20 0 0 1 36 -2 a14 14 0 0 1 12 24 z"/>
      <path d="M162 184 C 170 206 196 214 210 222 M218 152 L 210 222 M262 184 C 254 206 224 214 210 222"/><path d="M210 222 V 262"/>
      <rect x="172" y="262" width="76" height="34" rx="6" fill="currentColor"/><path d="M196 279 l10 9 l18 -18" stroke="#EFE5CF"/></g>`,
    calendar: `<g stroke-width="5" transform="scale(.8) translate(-210,-196)">
      <rect x="128" y="128" width="164" height="136" rx="10"/><path d="M128 158 H292"/><path d="M160 116 v22 M260 116 v22" stroke-width="6" stroke-linecap="round"/>
      <g fill="currentColor" stroke="none">${[0,1,2].map(r => [0,1,2,3].map(c => `<rect x="${142+c*38}" y="${172+r*28}" width="26" height="18" rx="3" opacity="${r===1&&c===2?1:.35}"/>`).join("")).join("")}</g>
      <path d="M92 252 H170 l12 -26 l16 50 l16 -62 l14 38 H328" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></g>`,
    tap: `<g stroke-width="5" stroke-linecap="round" stroke-linejoin="round" transform="translate(-212,-147)">
      <rect x="112" y="104" width="128" height="86" rx="10"/><rect x="128" y="124" width="26" height="20" rx="3" fill="currentColor"/><path d="M128 168 H190"/>
      <path d="M268 122 a40 40 0 0 1 0 50 M290 108 a62 62 0 0 1 0 78 M312 94 a84 84 0 0 1 0 106"/></g>`,
    team: `<g stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(-220,-150)">
      <path d="M150 116 L118 150 L150 184 M290 116 L322 150 L290 184"/><circle cx="220" cy="128" r="12" fill="currentColor"/><circle cx="186" cy="140" r="9"/><circle cx="254" cy="140" r="9"/>
      <path d="M196 176 a24 24 0 0 1 48 0 M164 182 a20 20 0 0 1 36 -10 M240 172 a20 20 0 0 1 36 10"/></g>`
  };
  const bigIcon = (name: string, x: number, y: number, scale = 2.6) => BIG[name] ? `<g transform="translate(${x},${y})">${BIG[name]}</g>`
    : `<g transform="translate(${x},${y}) scale(${scale})" stroke-width="${(5 / scale).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round">${ICON[name] || ""}</g>`;
  const smallIcon = (name: string, x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${ICON[name] || ""}</g>`;

  const T = (x: number, y: number, size: number, weight: number, spacing: number, text: string) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="${weight}" letter-spacing="${spacing}" fill="currentColor" stroke="none">${esc(text)}</text>`;
  const arc = (id: string, d: string, size: number, weight: number, spacing: number, text: string) => `<path id="${id}" d="${d}" fill="none" stroke="none"/><text font-size="${size}" font-weight="${weight}" letter-spacing="${spacing}" fill="currentColor" stroke="none"><textPath href="#${id}" startOffset="50%" text-anchor="middle">${esc(text)}</textPath></text>`;
  // Split a phrase into one or two balanced lines.
  function wrap(text: string, max: number): string[] {
    if (text.length <= max) return [text];
    const w = text.split(" "); let best = [text], score = 1e9;
    for (let i = 1; i < w.length; i++) { const a = w.slice(0, i).join(" "), b = w.slice(i).join(" "); const s = Math.max(a.length, b.length); if (s < score) { score = s; best = [a, b]; } }
    return best;
  }
  const textW = (lines: string[], cw: number) => Math.max(...lines.map(l => l.length)) * cw;

// ---------- Main stamps ----------
  const MAIN: Record<string, (s: PassportMain, k: string) => { w: number; h: number; body: string }> = {
    circle: (s: PassportMain, k: string) => ({ w: 420, h: 420, body: `<circle cx="210" cy="210" r="196" stroke-width="9"/><circle cx="210" cy="210" r="180" stroke-width="3"/>
      ${s.top ? arc(k + "t", "M62 210 A148 148 0 0 1 358 210", 26, 600, 5, s.top) : ""}${s.bottom ? arc(k + "b", "M38 210 A172 172 0 0 0 382 210", 24, 700, 6, s.bottom) : ""}
      <circle cx="44" cy="210" r="5" fill="currentColor" stroke="none"/><circle cx="376" cy="210" r="5" fill="currentColor" stroke="none"/>${bigIcon(s.icon, 210, 210)}` }),
    hex: (s: PassportMain, k: string) => ({ w: 420, h: 420, body: `<polygon points="210,14 380,112 380,308 210,406 40,308 40,112" stroke-width="9" stroke-linejoin="round"/><polygon points="210,32 364,121 364,299 210,388 56,299 56,121" stroke-width="3" stroke-linejoin="round"/>
      ${s.top ? arc(k + "t", "M84 214 A126 126 0 0 1 336 214", 23, 600, 5, s.top) : ""}${bigIcon(s.icon, 210, 196)}
      ${(s.lines || []).map((t, i) => T(210, 304 + i * 30, i ? 18 : 24, i ? 500 : 700, i ? 4 : 5, t)).join("")}` }),
    octa: (s: PassportMain) => ({ w: 420, h: 420, body: `<polygon points="130,14 290,14 406,130 406,290 290,406 130,406 14,290 14,130" stroke-width="9" stroke-linejoin="round"/><polygon points="137,32 283,32 388,137 388,283 283,388 137,388 32,283 32,137" stroke-width="3" stroke-linejoin="round"/>
      ${T(210, 112, 28, 700, 6, s.top || "")}${bigIcon(s.icon, 210, 186, 2.6)}
      ${(s.lines || []).map((t, i) => T(210, 300 + i * 34, i ? 19 : 26, i ? 500 : 700, i ? 4 : 5, t)).join("")}` }),
    rect: (s: PassportMain) => ({ w: 460, h: 320, body: `<rect x="10" y="10" width="440" height="300" rx="36" stroke-width="9"/><rect x="28" y="28" width="404" height="264" rx="24" stroke-width="3"/>
      ${T(230, 82, 38, 700, 12, (s.lines || [])[0] || "")}${bigIcon(s.icon, 214, 150)}
      ${(s.lines || []).slice(1).map((t, i) => T(230, 236 + i * 34, i ? 19 : 26, i ? 500 : 700, i ? 5 : 7, t)).join("")}` }),
    tri: (s: PassportMain) => ({ w: 400, h: 370, body: `<polygon points="200,14 388,350 12,350" stroke-width="9" stroke-linejoin="round"/><polygon points="200,46 360,332 40,332" stroke-width="3" stroke-linejoin="round"/>
      ${bigIcon(s.icon, 200, 156, 2.4)}${(s.lines || []).map((t, i) => T(200, 240 + i * 30 + (i ? 4 : 0), i ? 17 : 32, i ? 600 : 700, i ? 3 : 8, t)).join("")}` }),
    oval: (s: PassportMain, k: string) => ({ w: 440, h: 300, body: `<ellipse cx="220" cy="150" rx="208" ry="138" stroke-width="9"/><ellipse cx="220" cy="150" rx="190" ry="120" stroke-width="3"/>
      ${s.top ? arc(k + "t", "M70 150 A150 92 0 0 1 370 150", 26, 600, 7, s.top) : ""}${s.bottom ? arc(k + "b", "M40 150 A180 112 0 0 0 400 150", 19, 600, 5, s.bottom) : ""}
      ${bigIcon(s.icon, 220, 140)}${(s.lines || []).map((t, i) => T(220, 206 + i * 28, 24, 700, 7, t)).join("")}` })
  };

// ---------- Small skill stamps ----------
  const CW = 12.4; // average width per character at 18px Oswald with tracking
  const SMALL: Record<string, (s: PassportSkill) => { w: number; h: number; body: string }> = {
    pill: (s: PassportSkill) => { const L = wrap(s.text, 16), tw = textW(L, CW), w = Math.round(tw + 92), h = L.length > 1 ? 84 : 62;
      return { w, h, body: `<rect x="3" y="3" width="${w - 6}" height="${h - 6}" rx="${(h - 6) / 2}" stroke-width="5"/><rect x="10" y="10" width="${w - 20}" height="${h - 20}" rx="${(h - 20) / 2}" stroke-width="1.6"/>
        ${smallIcon(s.icon, 38, h / 2, .82)}${L.map((t, i) => T(64 + tw / 2, h / 2 + 7 + (i - (L.length - 1) / 2) * 22, 18, 700, 2.5, t)).join("")}` }; },
    ribbon: (s: PassportSkill) => { const L = wrap(s.text, 18), tw = textW(L, CW), w = Math.round(tw + 104), h = L.length > 1 ? 82 : 60;
      return { w, h, body: `<path d="M3 3 H${w - 3} L${w - 20} ${h / 2} L${w - 3} ${h - 3} H3 L20 ${h / 2} Z" stroke-width="4.5" stroke-linejoin="round"/>
        ${smallIcon(s.icon, 44, h / 2, .78)}${L.map((t, i) => T(70 + tw / 2, h / 2 + 7 + (i - (L.length - 1) / 2) * 22, 18, 700, 2.5, t)).join("")}` }; },
    square: (s: PassportSkill) => { const L = wrap(s.text, 11), w = Math.max(150, Math.round(textW(L, 11.6) + 36)), h = 156;
      return { w, h, body: `<rect x="3" y="3" width="${w - 6}" height="${h - 6}" rx="6" stroke-width="5"/><rect x="11" y="11" width="${w - 22}" height="${h - 22}" rx="3" stroke-width="1.6"/>
        ${smallIcon(s.icon, w / 2, 56, 1.15)}${L.map((t, i) => T(w / 2, 108 + i * 22, 16, 700, 2, t)).join("")}` }; },
    seal: (s: PassportSkill) => { const L = wrap(s.text, 12), d = 164, c = d / 2;
      return { w: d, h: d, body: `<circle cx="${c}" cy="${c}" r="${c - 4}" stroke-width="5"/><circle cx="${c}" cy="${c}" r="${c - 12}" stroke-width="1.6" stroke-dasharray="2 4"/>
        ${smallIcon(s.icon, c, 62, 1.05)}${L.map((t, i) => T(c, 108 + i * 20, 15, 700, 1.8, t)).join("")}` }; },
    oct: (s: PassportSkill) => { const L = wrap(s.text, 11), w = 160, h = 160, a = 46;
      return { w, h, body: `<polygon points="${a},3 ${w - a},3 ${w - 3},${a} ${w - 3},${h - a} ${w - a},${h - 3} ${a},${h - 3} 3,${h - a} 3,${a}" stroke-width="5" stroke-linejoin="round"/>
        ${smallIcon(s.icon, w / 2, 58, 1.1)}${L.map((t, i) => T(w / 2, 106 + i * 21, 15.5, 700, 1.8, t)).join("")}` }; },
    dash: (s: PassportSkill) => { const L = wrap(s.text, 14), tw = textW(L, CW), w = Math.round(tw + 44), h = 112;
      return { w, h, body: `<rect x="3" y="3" width="${w - 6}" height="${h - 6}" rx="8" stroke-width="3.5" stroke-dasharray="10 6"/>
        ${smallIcon(s.icon, w / 2, 32, .8)}${L.map((t, i) => T(w / 2, 70 + i * 22, 18, 700, 2.5, t)).join("")}` }; }
  };

// Worn ink: mostly solid, speckled, with slightly rough edges. Three seeds so stamps don't wear alike.
const INK_DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="ink0" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" result="d"/><feTurbulence type="fractalNoise" baseFrequency="0.035 0.05" numOctaves="3" seed="3" result="big"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.78" result="speck"/><feColorMatrix in="big" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.3 1.55" result="worn"/><feComposite in="speck" in2="worn" operator="arithmetic" k1="1" result="mask"/><feComposite in="d" in2="mask" operator="in"/></filter>
  <filter id="ink1" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="21" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" result="d"/><feTurbulence type="fractalNoise" baseFrequency="0.04 0.03" numOctaves="3" seed="11" result="big"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.78" result="speck"/><feColorMatrix in="big" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.3 1.55" result="worn"/><feComposite in="speck" in2="worn" operator="arithmetic" k1="1" result="mask"/><feComposite in="d" in2="mask" operator="in"/></filter>
  <filter id="ink2" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="42" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.8" result="d"/><feTurbulence type="fractalNoise" baseFrequency="0.03 0.045" numOctaves="3" seed="29" result="big"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.78" result="speck"/><feColorMatrix in="big" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.3 1.55" result="worn"/><feComposite in="speck" in2="worn" operator="arithmetic" k1="1" result="mask"/><feComposite in="d" in2="mask" operator="in"/></filter>
  <filter id="inkS" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" result="d"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.45" result="m"/><feComposite in="d" in2="m" operator="in"/></filter>
</defs></svg>`;

// Small stamps find their own spots: a jittered grid that steps around the big stamp.
  function rng(seed: number) { let s = seed * 9301 + 49297; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }

// Security paper: fine waves across the page and a rosette watermark, drawn once and reused on every page.
  const SECURITY = (() => {
    let d = "";
    for (let y = 30; y < 700; y += 16) { let q = `M-10 ${y}`; for (let x = -10; x <= 620; x += 20) q += ` L${x} ${(y + Math.sin((x + y * 1.7) / 38) * 5).toFixed(1)}`; d += `<path d="${q}"/>`; }
    let r = "";
    for (let k = 0; k < 9; k++) { const R0 = 70 + k * 18; let q = ""; for (let i = 0; i <= 180; i++) { const a = i / 180 * Math.PI * 2, rr = R0 + Math.sin(a * 12 + k) * 6; q += (i ? " L" : "M") + (305 + rr * Math.cos(a)).toFixed(1) + " " + (390 + rr * Math.sin(a)).toFixed(1); } r += `<path d="${q} Z"/>`; }
    return `<svg class="security" viewBox="0 0 610 700" aria-hidden="true"><g fill="none" stroke="#B49B6E" stroke-width=".7" stroke-opacity=".28">${d}</g><g fill="none" stroke="#B49B6E" stroke-width=".9" stroke-opacity=".22">${r}</g></svg>`;
  })();
  const EMBLEM = `<svg class="emblem" viewBox="-120 -120 240 240" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
    <circle r="78"/><ellipse rx="34" ry="78"/><ellipse rx="64" ry="78"/><path d="M-78 0 H78 M-70 -36 H70 M-70 36 H70"/>
    <ellipse rx="112" ry="38" transform="rotate(-24)" stroke-width="1.8"/><circle cx="96" cy="-60" r="7" fill="currentColor" stroke="none"/>
    <path d="M0 -104 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z" fill="currentColor" stroke="none"/></svg>`;
  const CHIP = `<svg class="chip" viewBox="0 0 52 32" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="1.5" y="1.5" width="49" height="29" rx="5"/><path d="M1.5 12 H17 M1.5 20 H17 M35 12 H50.5 M35 20 H50.5"/><circle cx="26" cy="16" r="6"/></svg>`;

// The book opens on the inside of the cover and the first city; the last page stays blank for the next stamp.
const APPROACH = { main: 300, small: 220 }, STEP = { main: 560, small: 190 };
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number) => Math.max(0, Math.min(1, v));

type Spec = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
// Everything a stamp says, as one line of text.
const stampWords = (s: Spec) => [s.top, ...(s.lines || []), s.text, s.bottom].filter(Boolean).join(', ');

export const mountPassport: Mount<PassportContent> = (root, CONTENT, { reduce }) => {
  const ac = new AbortController();
  const { signal } = ac;
  let uid = 0;
  let raf = 0;
  let disposed = false;

  root.setAttribute('aria-labelledby', 'work-title');
  root.innerHTML = `<div class="track" id="track">
    <div class="stage">
      <div class="glow"></div>
      <div class="head"><h2 id="work-title"></h2><p class="sub"></p></div>
      <div class="room"><div class="book" id="book"><div class="book-shadow"></div></div></div>
    </div>
  </div>
  <div class="mtrack" id="mtrack">
    <div class="mstage">
      <div class="head"><h2></h2><p class="sub"></p></div>
      <div class="mroom" id="mroom"><div class="pad" id="pad"><div class="pback leather"></div></div></div>
    </div>
  </div>
  <div class="stack" id="stack"><div class="head"><h2></h2><p class="sub"></p></div></div>${INK_DEFS}`;
  if (reduce) root.classList.add('pp-reduce');
  const q = <T extends Element>(sel: string) => root.querySelector(sel) as T;

  function stampEl(s: Spec, isMain: boolean, scale = 1) {
    const k = 'st' + (uid++), f = isMain ? MAIN[s.shape](s as PassportMain, k) : SMALL[s.kind](s as PassportSkill);
    const el = document.createElement('div');
    // The page text already says what each stamp says, so the drawing is hidden from screen readers.
    el.setAttribute('aria-hidden', 'true');
    el.className = 'stamp' + (isMain ? ' main' : '') + (reduce ? '' : ' pending');
    const w = isMain ? s.w : f.w * scale;
    el.style.cssText = `left:${s.x}px; top:${s.y}px; width:${w}px; transform: rotate(${s.rot || 0}deg);`;
    el.dataset.rot = s.rot || 0; el.dataset.w = w; el.dataset.h = String(w * f.h / f.w);
    el.innerHTML = `<svg viewBox="-6 -6 ${f.w + 12} ${f.h + 12}"><g filter="url(#${isMain ? 'ink' + (uid % 3) : 'inkS'})" fill="none" stroke="${s.ink}" color="${s.ink}" font-family="Oswald, 'Arial Narrow', sans-serif">${f.body}</g></svg>`;
    const round = isMain ? /circle|oval|hex|octa/.test(s.shape) : /seal|oct/.test(s.kind);
    const press = document.createElement('div'); press.className = 'press'; press.style.setProperty('--pr', round ? '50%' : '14px'); el.prepend(press);
    el.addEventListener('click', () => land1(el, 0, null, isMain), { signal });   // tap a stamp to stamp it again
    return el;
  }

  function placeSkills(page: HTMLElement, p: PassportContent['pages'][number]) {
    const R = rng(p.seed || 1), m = p.main, mh = m.w * (m.shape === 'rect' ? 320 / 460 : m.shape === 'oval' ? 300 / 440 : m.shape === 'tri' ? 370 / 400 : 1);
    const right = page.classList.contains('r'), minX = right ? 50 : 22, maxX = right ? 590 : 560;
    const top = p.city ? 108 : 34, placed = [{ x: m.x + 8, y: m.y + 8, w: m.w - 16, h: mh - 16 }];
    type Box = { x: number; y: number; w: number; h: number };
    // Candidate spots on a fine grid, visited in a seeded order so every page looks hand-stamped.
    const cand: { cx: number; cy: number; k: number }[] = [];
    for (let r = 0; r < 9; r++) for (let c = 0; c < 7; c++) cand.push({ cx: 60 + c * 82, cy: top + 36 + r * ((664 - top - 36) / 8), k: R() });
    cand.sort((a, b) => a.k - b.k);
    const overlap = (a: Box, b: Box) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
    p.skills.forEach((s) => {
      const el = stampEl(Object.assign({}, s, { x: 0, y: 0, rot: Math.round((R() - 0.5) * 20) }), false, 0.86);
      const w = +(el.dataset.w as string), h = +(el.dataset.h as string);
      let best: { x: number; y: number; box: Box } | null = null, bestCost = Infinity;
      for (const c of cand) {
        const x = Math.max(minX, Math.min(maxX - w, c.cx - w / 2 + (R() - 0.5) * 12));
        const y = Math.max(top - 4, Math.min(680 - h, c.cy - h / 2 + (R() - 0.5) * 10));
        const box = { x: x + 2, y: y + 2, w: w - 4, h: h - 4 };
        const cost = placed.reduce((t, b) => t + overlap(box, b), 0);
        if (cost < bestCost) { best = { x, y, box }; bestCost = cost; if (cost === 0) break; }
      }
      const b = best as { x: number; y: number; box: Box };
      placed.push(b.box);
      el.style.left = b.x + 'px'; el.style.top = b.y + 'px';
      page.appendChild(el);
    });
  }

  function coverEl() {
    const el = document.createElement('div'); el.className = 'page coverfront';
    el.innerHTML = `<div class="frame"></div><div class="word">${esc(CONTENT.coverWord)}</div>${EMBLEM}<div class="name">${esc(CONTENT.owner)}</div><div class="role">${esc(CONTENT.role)}</div>${CHIP}`;
    return el;
  }
  function pageEl(p: PassportContent['pages'][number] | 'INSIDE' | 'BLANK' | undefined, side: string) {
    const el = document.createElement('div');
    if (p === 'INSIDE') { el.className = 'page inside'; el.innerHTML = '<div class="frame" style="position:absolute; inset:28px; border:1px solid rgba(207,174,99,.25); border-radius:10px"></div>'; return el; }
    el.className = 'page ' + side;
    el.innerHTML = SECURITY + `<span class="visas">${esc(CONTENT.visasWord)}</span>` + (p && p !== 'BLANK' && p.city ? `<h3>${esc(p.city)}</h3>` : '');
    if (!p || p === 'BLANK') return el;
    // City, company, dates and every stamp, as real text.
    el.insertAdjacentHTML('beforeend', `<p class="sr-only">${esc(stampWords(p.main))}. ${esc(p.skills.map(stampWords).join(', '))}.</p>`);
    el.appendChild(stampEl(p.main, true));
    placeSkills(el, p);
    return el;
  }

  // ---------- The thump ----------
  // A rubber stamp falls toward the page (its shadow tightens and darkens), the ink appears at contact with a small squish,
  // then the stamp lifts away and the book gives a little.
  // The animation is started when its turn comes (not queued with a delay), so only the stamp in flight holds layers.
  const timers = new Set<number>();
  function land1(el: HTMLElement, d: number, book: HTMLElement | null, isMain: boolean) {
    if (reduce) { el.classList.remove('pending'); return; }
    const go = () => {
      el.classList.remove('pending');
      const svg = el.querySelector('svg') as SVGSVGElement, press = el.querySelector('.press') as HTMLElement, a = isMain ? APPROACH.main : APPROACH.small;
      press.animate([
        { opacity: 0, transform: 'translate(18px, 26px) scale(1.22)', filter: 'blur(18px)', easing: 'cubic-bezier(0.55, 0, 1, 0.45)' },
        { opacity: 0.55, transform: 'translate(0, 0) scale(1)', filter: 'blur(4px)', offset: 0.55, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
        { opacity: 0, transform: 'translate(10px, 16px) scale(1.12)', filter: 'blur(14px)' },
      ], { duration: a / 0.55, fill: 'backwards' });
      svg.animate([
        { opacity: 0, transform: 'scale(1.04)' },
        { opacity: 1, transform: 'scale(0.975)', offset: 0.3 },
        { opacity: 1, transform: 'scale(1)' },
      ], { duration: isMain ? 340 : 260, delay: a, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'backwards' });
      if (book) book.animate([{ translate: '0 0' }, { translate: `0 ${isMain ? 5 : 2}px` }, { translate: '0 0' }], { duration: isMain ? 240 : 160, delay: a, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
    };
    if (d > 0) { const id = window.setTimeout(() => { timers.delete(id); go(); }, d); timers.add(id); } else go();
  }
  function land(page: HTMLElement, delay0: number, book: HTMLElement | null) {
    const main = page.querySelector('.stamp.main.pending') as HTMLElement | null, small = [...page.querySelectorAll<HTMLElement>('.stamp:not(.main).pending')];
    if (main) land1(main, delay0, book, true);
    const start = delay0 + (main ? STEP.main : 0);
    small.forEach((el, i) => land1(el, start + i * STEP.small, book, false));
    return (main ? STEP.main : 0) + small.length * STEP.small;
  }

  // ---------- Build ----------
  const P: (PassportContent['pages'][number] | 'INSIDE' | 'BLANK')[] = ['INSIDE', ...CONTENT.pages]; if (P.length % 2) P.push('BLANK');
  const N = P.length / 2;
  root.querySelectorAll('h2').forEach((h) => { h.textContent = CONTENT.title; });
  root.querySelectorAll('.sub').forEach((p) => { p.textContent = CONTENT.sub; });

  const book = q<HTMLElement>('#book'), track = q<HTMLElement>('#track'), room = book.parentElement as HTMLElement;
  const rim = document.createElement('div'); rim.className = 'rim leather'; book.appendChild(rim);
  // The page stacks behind the spreads only show their edges, so each is two thin strips instead of one full page (far less layer memory).
  const mkStack = (side: string) => { const strips = ['v', 'h'].map((k) => { const d = document.createElement('div'); d.className = `stackp ${side} ${k}`; book.appendChild(d); return d; }); return { set visibility(v: string) { strips.forEach((d) => { d.style.visibility = v; d.style.opacity = v === 'visible' ? '1' : '0'; }); } }; };
  mkStack('r'); const stackL = mkStack('l');
  const els: HTMLElement[] = [];
  els[2 * N - 1] = pageEl(P[2 * N - 1], 'r'); els[2 * N - 1].classList.add('base-right'); book.appendChild(els[2 * N - 1]);
  const castR = document.createElement('div'); castR.className = 'cast'; castR.style.cssText = 'left:610px; width:458px; background: linear-gradient(90deg, rgba(30,22,10,.42), rgba(30,22,10,0)); border-radius: 0 14px 14px 0;'; book.appendChild(castR);
  const castL = document.createElement('div'); castL.className = 'cast'; castL.style.cssText = 'left:152px; width:458px; background: linear-gradient(270deg, rgba(30,22,10,.42), rgba(30,22,10,0)); border-radius: 14px 0 0 14px;'; book.appendChild(castL);
  const leaves: { leaf: HTMLElement; front: HTMLElement; back: HTMLElement; s1: HTMLElement; s2: HTMLElement }[] = [];
  for (let k = 0; k < N; k++) {
    const leaf = document.createElement('div'); leaf.className = 'leaf' + (k ? '' : ' coverleaf');
    const front = document.createElement('div'); front.className = 'face front';
    const back = document.createElement('div'); back.className = 'face back';
    if (k === 0) { front.appendChild(coverEl()); els[0] = pageEl('INSIDE', 'l'); back.appendChild(els[0]); }
    else { els[2 * k - 1] = pageEl(P[2 * k - 1], 'r'); els[2 * k] = pageEl(P[2 * k], 'l'); front.appendChild(els[2 * k - 1]); back.appendChild(els[2 * k]); }
    const s1 = document.createElement('div'); s1.className = 'shade'; s1.style.background = 'linear-gradient(90deg, rgba(43,36,24,.45), rgba(43,36,24,.08) 45%, rgba(255,250,235,.10) 80%, rgba(43,36,24,0))'; front.appendChild(s1);
    const s2 = document.createElement('div'); s2.className = 'shade'; s2.style.background = 'linear-gradient(270deg, rgba(43,36,24,.45), rgba(43,36,24,.08) 45%, rgba(255,250,235,.10) 80%, rgba(43,36,24,0))'; back.appendChild(s2);
    leaf.append(front, back); book.appendChild(leaf); leaves.push({ leaf, front, back, s1, s2 });
  }
  track.style.height = `calc(100vh + ${N * 110}vh)`;

  let S = 1;
  function fit() { const r = room.getBoundingClientRect(); S = Math.min(r.width / 1270, r.height / 770); }
  let target = 0, cur = 0; const landed = new Set<number>();
  // Each spread holds still for a while, then the page turns: scroll maps to stops with a pause at each one.
  // The progress comes from the track's own position, so sections above it do not matter.
  function read() {
    const max = track.offsetHeight - innerHeight, p = max > 0 ? clamp(-track.getBoundingClientRect().top / max) : 0;
    const x = p * N, i = Math.floor(x), f = x - i;
    target = Math.min(N, i + clamp((f - 0.2) / 0.55));
  }
  function render() {
    let castRight = 0, castLeft = 0;
    const open = ease(clamp(cur));
    // Only the leaves that can be seen get a layer: the two at rest, plus the one under a page that is turning.
    const base = Math.floor(cur), turning = cur > base + 0.0005;
    // Closed, the cover sits centered; as it opens the book slides over to show both pages.
    book.style.transform = `translate(-50%, -50%) scale(${S}) rotateX(8deg) rotateZ(-1.2deg) translateX(${-305 * (1 - open)}px)`;
    stackL.visibility = open > 0.5 ? 'visible' : 'hidden';
    els[2 * N - 1].style.visibility = cur > N - 2 - 0.0005 ? 'visible' : 'hidden';
    leaves.forEach((L, k) => {
      const t = ease(clamp(cur - k)), sh = Math.sin(Math.PI * t);
      L.leaf.style.transform = `translateZ(${sh * 26}px) rotateY(${-180 * t}deg)`;
      L.leaf.style.zIndex = String(t > 0.5 ? 10 + k : 10 + N - k);
      L.leaf.style.visibility = k === base - 1 || k === base || (turning && k === base + 1) ? 'visible' : 'hidden';
      L.front.style.visibility = t <= 0.5 ? 'inherit' : 'hidden'; L.back.style.visibility = t > 0.5 ? 'inherit' : 'hidden';
      L.s1.style.opacity = String(t < 0.5 ? sh * (k ? 1 : 0.5) : 0); L.s2.style.opacity = String(t >= 0.5 ? sh * (k ? 1 : 0.5) : 0);
      if (t > 0 && t < 1) { if (t < 0.5) castRight = Math.max(castRight, sh); else castLeft = Math.max(castLeft, sh); }
      // Stamps land once a spread is open, or as soon as the book comes to rest with its pages more than half turned (a reader can stop mid-turn).
      if ((clamp(cur - k) > 0.96 || (cur === target && clamp(cur - k) > 0.5)) && !landed.has(k)) { landed.add(k); const t1 = land(els[2 * k], 60, book); land(els[2 * k + 1], 60 + t1 * 0.5, book); }
    });
    castR.style.opacity = String(castRight * 0.9); castL.style.opacity = String(castLeft * 0.9 * (open > 0.5 ? 1 : 0));
    castR.style.visibility = castRight > 0 ? 'visible' : 'hidden'; castL.style.visibility = castLeft > 0 && open > 0.5 ? 'visible' : 'hidden';
    castR.style.zIndex = castL.style.zIndex = '9';
  }
  // The loop runs only while the section is on screen and the tab is visible.
  let onScreen = true;
  // Once the book has settled on its target the loop stops; scrolling or resizing starts it again.
  function frame() { cur += (target - cur) * (reduce ? 1 : 0.1); if (Math.abs(target - cur) < 0.0005) cur = target; render(); raf = cur === target ? 0 : requestAnimationFrame(frame); }
  function sync() {
    const run = onScreen && !document.hidden && !disposed;
    if (run && !raf) { read(); raf = requestAnimationFrame(frame); }
    else if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
  }
  addEventListener('scroll', () => { read(); sync(); }, { passive: true, signal });
  addEventListener('resize', () => { fit(); read(); sync(); }, { signal });
  document.addEventListener('visibilitychange', sync, { signal });
  fit(); read(); cur = target; render(); sync();

  // ---------- Phones: a closed passport held at the top, like a notepad. Scrolling lifts the cover, then each page flips up and away;
  // each page holds while its stamps land. Reduced motion keeps the pages one under another instead. ----------
  const phone = matchMedia('(max-width: 760px)');
  const mtrack = q<HTMLElement>('#mtrack'), mroom = q<HTMLElement>('#mroom'), pad = q<HTMLElement>('#pad');
  const div = (cls: string) => { const d = document.createElement('div'); d.className = cls; return d; };
  const put = (el: HTMLElement, k: string, v: string) => { const s = el.style as unknown as Record<string, string>; if (s[k] !== v) s[k] = v; };
  const items: (PassportContent['pages'][number] | 'COVER')[] = ['COVER', ...CONTENT.pages];
  const M = items.length;
  // The pages still under the top one show as a thin stack of edges below it: strips, not full pages, to keep layers small.
  const edges = [2, 1, 0].map((i) => { const e = div('pedge'); e.style.transform = `translateY(${(i + 1) * 3.5}px)`; pad.appendChild(e); return e; }).reverse();
  const mleaves = items.map((p, k) => {
    const leaf = div('mleaf' + (k ? '' : ' cover')), front = div('mface front'), back = div('mface back');
    let pg: HTMLElement | null = null;
    if (p === 'COVER') { front.appendChild(coverEl()); back.appendChild(pageEl('INSIDE', 'l')); }
    else { pg = pageEl(p, 'top'); front.appendChild(pg); back.appendChild(div('page pblank')); }
    const lift = div('mshade lift'), under = div('mshade under'), dusk = div('mshade dusk');
    front.append(lift, under); back.append(dusk); leaf.append(front, back); pad.appendChild(leaf);
    return { leaf, front, back, pg, lift, under, dusk };
  });
  pad.appendChild(div('pbind leather'));
  mtrack.style.height = `calc(100vh + ${(M - 1) * 85}vh)`;

  let mk = 1, my = 0, mt = 0, mc = 0, mraf = 0, mprev = 0;
  const mlanded = new Set<number>();
  function mfit() { const r = mroom.getBoundingClientRect(); mk = Math.max(0.2, Math.min((r.width - 8) / 622, (r.height - 40) / 744)); my = Math.max(14 * mk, (r.height - 724 * mk) * 0.42 + 14 * mk); }
  function mread() {
    const max = mtrack.offsetHeight - innerHeight, p = max > 0 ? clamp(-mtrack.getBoundingClientRect().top / max) : 0;
    const x = p * (M - 1), i = Math.floor(x), f = x - i;
    mt = Math.min(M - 1, i + clamp((f - 0.15) / 0.6));
  }
  function mrender() {
    put(pad, 'transform', `translateX(-50%) translateY(${my.toFixed(1)}px) scale(${mk.toFixed(4)})`);
    const base = Math.min(M - 1, Math.floor(mc)), turning = mc > base + 0.0005;
    mleaves.forEach((L, k) => {
      const t = k < M - 1 ? ease(clamp(mc - k)) : 0, sh = Math.sin(Math.PI * t);
      const above = k > 0 ? ease(clamp(mc - (k - 1))) : 1;   // how far the leaf on top of this one has lifted
      const shown = k === base || (turning && k === base + 1);
      // Pages that cannot be seen leave the layout entirely, so they hold no layer at all.
      put(L.leaf, 'display', shown ? 'block' : 'none');
      if (!shown) return;
      // The turn is drawn flat: the page foreshortens toward its top edge, widens a little as it lifts toward the reader, and past
      // the edge shows its back above the binding. No 3D scene, so a turning page costs one page-sized layer, not a large 3D surface.
      put(L.leaf, 'transform', t > 0 ? `scale(${(1 + 0.045 * sh).toFixed(4)}, ${Math.cos(Math.PI * Math.min(t, 0.97)).toFixed(4)})` : 'none');
      put(L.leaf, 'zIndex', String(t > 0.5 ? 300 + k : 200 - k));
      // Past the hinge the page shows its back; near the end it fades as it leaves the top of the screen.
      const fade = String(1 - clamp((t - 0.55) / 0.25));
      put(L.front, 'display', t <= 0.5 ? 'block' : 'none'); put(L.back, 'display', t > 0.5 ? 'block' : 'none');
      put(L.front, 'opacity', fade); put(L.back, 'opacity', fade);
      put(L.lift, 'opacity', t > 0 && t <= 0.5 ? (sh * 0.85).toFixed(3) : '0');
      // The shadow falls on this page the moment the page above leaves it, then thins as that page goes away.
      put(L.under, 'opacity', above > 0 && above < 1 ? ((1 - above) * Math.min(1, above * 5) * 0.8).toFixed(3) : '0');
      // The back of a turned page is darkest while it stands near upright and lightens as it lies back above the binding.
      put(L.dusk, 'opacity', t > 0.5 ? (sh * 0.4).toFixed(3) : '0');
      // A page's stamps land once the page above it has gone, or as soon as the reader stops with it mostly uncovered.
      if (L.pg && !mlanded.has(k) && (above > 0.96 || (mc === mt && above > 0.5))) { mlanded.add(k); land(L.pg, 80, pad); }
    });
    const left = M - 1 - base;
    edges.forEach((e, i) => put(e, 'display', i < left ? 'block' : 'none'));
  }
  function mframe(now: number) {
    const dt = Math.min(64, now - (mprev || now)); mprev = now;
    mc += (mt - mc) * (1 - Math.exp(-dt / 130)); if (Math.abs(mt - mc) < 0.0005) mc = mt;
    mrender();
    if (mc === mt) { mraf = 0; mtrack.classList.remove('moving'); } else mraf = requestAnimationFrame(mframe);
  }
  function msync() {
    const run = phone.matches && !reduce && onScreen && !document.hidden && !disposed;
    if (run && !mraf) { mread(); if (mc !== mt) { mprev = 0; mtrack.classList.add('moving'); mraf = requestAnimationFrame(mframe); } }
    else if (!run && mraf) { cancelAnimationFrame(mraf); mraf = 0; }
  }
  // A page left half turned when the reader stops scrolling finishes its turn, or falls back, whichever is nearer.
  let settleTimer = 0;
  const settle = () => { settleTimer = 0; const r = Math.round(mt); if (Math.abs(r - mt) > 0.001) { mt = r; msync(); } };
  addEventListener('scroll', () => { mread(); msync(); if (settleTimer) clearTimeout(settleTimer); settleTimer = window.setTimeout(settle, 160); }, { passive: true, signal });
  addEventListener('resize', () => { mfit(); mread(); mrender(); msync(); }, { signal });
  document.addEventListener('visibilitychange', msync, { signal });
  phone.addEventListener('change', () => { mfit(); mread(); mc = mt; mrender(); msync(); }, { signal });
  mfit(); mread(); mc = mt; mrender();

  // Reduced motion: the pages one under another, stamps already on them.
  const stack = q<HTMLElement>('#stack');
  const mobile = reduce ? CONTENT.pages.map((p) => { const box = div('mpage'); const pg = pageEl(p, 'r'); box.appendChild(pg); stack.appendChild(box); return { box, pg }; }) : [];
  // The 610 × 700 page is scaled with a transform and its box gets the exact scaled height (CSS zoom left Safari's box too tall).
  const stackFit = () => mobile.forEach((m) => { const k = m.box.clientWidth / 610; m.pg.style.transform = `scale(${k})`; m.box.style.height = `${(700 * k).toFixed(2)}px`; });
  addEventListener('resize', stackFit, { signal }); stackFit();
  const vis = new IntersectionObserver((es) => { onScreen = es[es.length - 1].isIntersecting; sync(); msync(); });
  vis.observe(root);

  return () => {
    disposed = true;
    ac.abort();
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    if (mraf) cancelAnimationFrame(mraf);
    mraf = 0;
    if (settleTimer) clearTimeout(settleTimer);
    timers.forEach((id) => clearTimeout(id));
    timers.clear();
    vis.disconnect();
    root.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    root.removeAttribute('aria-labelledby');
    root.classList.remove('pp-reduce');
    root.replaceChildren();
  };
};
