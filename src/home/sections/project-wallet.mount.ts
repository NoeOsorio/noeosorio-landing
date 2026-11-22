import type { Mount } from '../useMount';
import type { WalletContent, WalletProject } from '../data/wallet';
import { esc } from '../dom';
import { LIME, LIME_RGB, logoPaths } from '../brand';

// Mounts the project wallet into root. Ported from the approved prototype (specs/002-home-objects/prototypes/project-wallet.html).
const PLAT: Record<string, [string, string]> = {
  mac: ['Mac', '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M1.5 19.5 H22.5"/>'],
  iphone: ['iPhone', '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5 H13"/>'],
  phone: ['Phone', '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5 H13"/>'],
  web: ['Web', '<circle cx="12" cy="12" r="9"/><path d="M3 12 H21 M12 3 C 15 6 15 18 12 21 M12 3 C 9 6 9 18 12 21"/>'],
  telegram: ['Telegram', '<path d="M21 4 L3 11 L9 13.5 L11 20 L14.5 15.5 L19 19 Z M9 13.5 L17 7.5"/>'],
  kubernetes: ['Kubernetes', '<path d="M12 2.5 L20.5 6.6 L22.5 15.8 L16.6 23 H7.4 L1.5 15.8 L3.5 6.6 Z" transform="scale(.92) translate(1 0)"/><circle cx="12" cy="12.5" r="3"/>'],
};

// Material: a fine grain and guilloche lines, the way a printed card is finished.
  const NOISE = `url("data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>')}")`;
  const LOGO = `<svg class="mark" viewBox="60 100 280 200" fill="#7FA62A" aria-hidden="true">${logoPaths()}</svg>`;
  function rand(seed: number) { let x = seed; return () => (x = (x * 16807) % 2147483647) / 2147483647; }
  const W = 520, H0 = 328;
  const ART: Record<string, () => string> = {
    obsidian: () => { const r = rand(7); let l = ""; for (let y = 0; y < H0; y += 2) l += `<path d="M0 ${y} H${W}" stroke="#fff" stroke-opacity="${(r() * .05).toFixed(3)}"/>`;
      return l + `<path d="M400 40 L418 112 L490 130 L418 148 L400 220 L382 148 L310 130 L382 112 Z" fill="none" stroke="#fff" stroke-opacity=".09" stroke-width="1.5"/>`; },
    paper: () => { let l = ""; for (let y = 34; y < H0; y += 22) l += `<path d="M0 ${y} H${W}" stroke="#8FA9C2" stroke-opacity=".35"/>`;
      return l + `<path d="M64 0 V${H0}" stroke="#C8553D" stroke-opacity=".45" stroke-width="1.5"/>
        <path d="M300 214 q 10 -5 20 0 t 20 0 t 20 0 t 20 0" fill="none" stroke="#D99A2B" stroke-width="3" stroke-linecap="round" opacity=".7"/>
        <path d="M352 236 q 10 -5 20 0 t 20 0 t 20 0" fill="none" stroke="#4E8E6B" stroke-width="3" stroke-linecap="round" opacity=".7"/>
        <path d="M318 192 q 10 -5 20 0 t 20 0 t 20 0 t 20 0 t 20 0" fill="none" stroke="#7B61C9" stroke-width="3" stroke-linecap="round" opacity=".65"/>`; },
    enamel: () => `<g fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".55">
        <path d="M300 60 C 340 120 380 170 470 200" stroke="#2F6FD1" stroke-width="4"/><path d="M300 210 C 360 170 420 110 470 70" stroke="#2E9A5E" stroke-width="4"/>
        <path d="M296 50 V232 H486" stroke="#1C2A2E" stroke-width="3"/><circle cx="384" cy="140" r="11" stroke="#D2463B" stroke-width="3"/></g>`,
    weave: () => { let l = ""; for (let x = 0; x < W; x += 12) l += `<path d="M${x} 0 V${H0}" stroke="#F2C2B0" stroke-opacity=".10" stroke-width="5"/>`;
      for (let y = 0; y < H0; y += 12) for (let x = (y / 12) % 2 ? 0 : 12; x < W; x += 24) l += `<path d="M${x - 1} ${y + 6} H${x + 13}" stroke="#F2C2B0" stroke-opacity=".22" stroke-width="5" stroke-linecap="round"/>`; return l; },
    space: () => { const r = rand(11); let l = ""; for (let i = 0; i < 140; i++) l += `<circle cx="${(r() * W).toFixed(1)}" cy="${(r() * H0).toFixed(1)}" r="${(r() * 1.2 + .3).toFixed(2)}" fill="#fff" opacity="${(r() * .7 + .1).toFixed(2)}"/>`;
      return l + `<g fill="none" stroke="#9DB4FF" stroke-opacity=".22"><ellipse cx="400" cy="120" rx="150" ry="52" transform="rotate(-18 400 120)"/><ellipse cx="400" cy="120" rx="96" ry="32" transform="rotate(-18 400 120)"/></g>
        <circle cx="400" cy="120" r="7" fill="#C9D6FF" opacity=".85"/><circle cx="276" cy="160" r="3.5" fill="#8FB3FF"/><circle cx="512" cy="74" r="3" fill="#8FB3FF"/><circle cx="470" cy="166" r="2.6" fill="#B7F0C9"/>`; },
    life: () => { const r = rand(5); let l = ""; const s = 12; for (let gy = 0; gy < H0 / s; gy++) for (let gx = 0; gx < W / s; gx++) if (r() < .14) l += `<rect x="${gx * s + 1}" y="${gy * s + 1}" width="${s - 2}" height="${s - 2}" rx="1.5" fill="#9BE07F" opacity="${(r() * .25 + .08).toFixed(2)}"/>`;
      return l + [[30,4],[31,5],[29,6],[30,6],[31,6]].map(([x, y]) => `<rect x="${x * s + 1}" y="${y * s + 1}" width="${s - 2}" height="${s - 2}" rx="1.5" fill="${LIME}" opacity=".7"/>`).join(""); },
    washi: () => { const r = rand(3); let l = ""; for (let i = 0; i < 90; i++) { const x = r() * W, y = r() * H0, a = r() * 6.28, L = 10 + r() * 30; l += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q ${(Math.cos(a) * L / 2).toFixed(1)} ${(Math.sin(a) * L / 2 + 4).toFixed(1)} ${(Math.cos(a) * L).toFixed(1)} ${(Math.sin(a) * L).toFixed(1)}" fill="none" stroke="#B8A88C" stroke-opacity=".35" stroke-width=".7"/>`; }
      return l + `<text x="430" y="196" text-anchor="middle" font-family="'Yuji Syuku', serif" font-size="190" fill="#1C1A17" opacity=".85">字</text>
        <rect x="474" y="208" width="34" height="34" rx="3" fill="#C23B2E" opacity=".9"/><text x="491" y="232" text-anchor="middle" font-family="'Yuji Syuku', serif" font-size="20" fill="#F1EBDF">漢</text>`; },
    receipt: () => { const r = rand(9); let l = "", x = 330; while (x < 500) { const w = 1 + Math.floor(r() * 4); l += `<rect x="${x}" y="70" width="${w}" height="70" fill="#1E1B16" opacity=".8"/>`; x += w + 1 + Math.floor(r() * 3); }
      for (let i = 0; i < 52; i++) l += `<circle cx="${i * 10 + 5}" cy="6" r="2.2" fill="#0E0D0B" opacity=".25"/>`;
      return l + `<path d="M300 160 H500" stroke="#1E1B16" stroke-opacity=".35" stroke-dasharray="4 4"/>`; }
  };
  const CHIP = `<svg class="chip" viewBox="0 0 52 40" aria-hidden="true"><rect x=".5" y=".5" width="51" height="39" rx="7" fill="#D7B56A"/><rect x=".5" y=".5" width="51" height="39" rx="7" fill="none" stroke="#9C7B33" stroke-opacity=".6"/>
    <path d="M0 14 H17 M0 26 H17 M35 14 H52 M35 26 H52 M17 0 V40 M35 0 V40 M17 20 H35" stroke="#9C7B33" stroke-opacity=".7" fill="none"/></svg>`;
  const NFC = `<svg class="nfc" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8 8.5 a6 6 0 0 1 0 9 M12 5.5 a10 10 0 0 1 0 15 M16 2.5 a14 14 0 0 1 0 21"/></svg>`;
  const number = (n: number) => `•••• •••• •••• ${String(n).padStart(4, "0")}`;

type Pass = { p: WalletProject; el: HTMLButtonElement };
type Sel = { me: Pass; rest: Pass[]; H: number; dh: number };

export const mountWallet: Mount<WalletContent> = (root, C, { reduce }) => {
  const ac = new AbortController();
  const { signal } = ac;
  let timers: number[] = [];
  let disposed = false;

  root.setAttribute('aria-labelledby', 'wallet-title');
  root.style.setProperty('--noise', NOISE);
  root.innerHTML = `<div class="wrap">
  <div class="head"><h2 id="wallet-title"></h2><p id="wallet-sub"></p></div>
  <div class="stage">
    <div class="glow" aria-hidden="true"></div>
    <div class="wallet" id="wallet">
      <div class="auth" id="auth" aria-live="polite">
        <svg viewBox="-60 -60 120 120" fill="none" aria-hidden="true">
          <g id="frame" stroke="var(--lime)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M-52 -26 V-40 A12 12 0 0 1 -40 -52 H-26"/><path d="M26 -52 H40 A12 12 0 0 1 52 -40 V-26"/>
            <path d="M52 26 V40 A12 12 0 0 1 40 52 H26"/><path d="M-26 52 H-40 A12 12 0 0 1 -52 40 V26"/>
          </g>
          <g id="logo" transform="scale(.31) translate(-200,-200)" stroke="var(--lime)" stroke-width="7" stroke-linejoin="round">
            ${logoPaths('class="lp" ')}
          </g>
          <path id="check" d="M-20 2 L-5 17 L22 -14" stroke="var(--lime)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="msg" id="msg"></div>
      </div>
      <div class="details" id="details" role="region"></div>
    </div>
  </div>
</div>`;

  const q = <T extends Element>(sel: string) => root.querySelector(sel) as T;
  q<HTMLElement>('#wallet-title').textContent = C.title;
  q<HTMLElement>('#wallet-sub').textContent = C.sub;
  const wallet = q<HTMLElement>('#wallet'), auth = q<HTMLElement>('#auth'), details = q<HTMLElement>('#details'), msg = q<HTMLElement>('#msg');
  const frame = q<SVGGElement>('#frame'), logo = q<SVGGElement>('#logo'), check = q<SVGPathElement>('#check');
  const lps = [...logo.querySelectorAll<SVGPathElement>('.lp')];

  const closeBtn = document.createElement('button');
  closeBtn.className = 'x'; closeBtn.type = 'button'; closeBtn.setAttribute('aria-label', C.close); closeBtn.style.visibility = 'hidden';
  closeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 4 L12 12 M12 4 L4 12"/></svg>';
  closeBtn.addEventListener('click', () => close(), { signal });
  wallet.appendChild(closeBtn);

  let open: WalletProject | null = null;
  const passes: Pass[] = C.projects.map((p) => {
    const b = document.createElement('button');
    b.className = 'pass'; b.type = 'button'; b.style.setProperty('--c', p.c); b.style.setProperty('--fg', p.fg);
    b.setAttribute('aria-describedby', `wallet-desc-${p.id}`); b.setAttribute('aria-expanded', 'false');
    b.innerHTML = `<span class="sr-only" aria-hidden="true" id="wallet-desc-${esc(p.id)}">${esc(p.text)}</span><div class="card"><svg class="art" viewBox="0 0 ${W} ${H0}" preserveAspectRatio="xMidYMid slice" role="presentation" focusable="false">${(ART[p.art] || (() => ''))()}</svg><div class="tex"></div>
      <div class="title"><span class="name" id="wallet-name-${esc(p.id)}">${esc(p.name)}</span><span class="topic">${esc(p.topic)}</span></div>${NFC}${CHIP}
      <div class="num">${number(p.commits)}</div>
      <div class="bottom"><div class="field"><span class="lab">${esc(C.createdLabel)}</span><span class="val">${esc(p.created)}</span></div><div class="field"><span class="lab">&nbsp;</span><span class="val">${esc(C.holder)}</span></div>${LOGO}</div></div>`;
    b.addEventListener('click', () => (open === p ? close() : select(p)), { signal });
    wallet.appendChild(b);
    return { p, el: b };
  });

  const cardH = () => passes[0].el.getBoundingClientRect().height || 328;
  const peek = () => (passes.length > 12 ? 60 : cardH() * 0.245);
  function place(el: HTMLElement, y: number, s = 1) { const t = `translateY(${y}px) scale(${s})`; el.style.setProperty('--rest', t); el.style.transform = t; }
  function layout() {
    const H = cardH(), P = peek();
    passes.forEach(({ el }, i) => { place(el, i * P); el.style.opacity = '1'; el.style.zIndex = String(i + 1); el.style.filter = ''; el.tabIndex = 0; });
    wallet.style.height = (passes.length - 1) * P + H + 8 + 'px';
  }
  // The window changed while a pass is open: only move things to their new places. The check animation and the scroll are not touched.
  function relayout() {
    if (!open || !sel) { layout(); return; }
    const H = cardH(), dh = details.offsetHeight, base = settled ? SETTLED : AUTH, top = base + H + 24, pileTop = top + dh + 36;
    sel.H = H; sel.dh = dh;
    place(sel.me.el, base); details.style.top = top + 'px';
    sel.rest.forEach((x, i) => place(x.el, pileTop + Math.min(i, 3) * 10, 0.93 - Math.min(i, 3) * 0.015));
    wallet.style.height = pileTop + 3 * 10 + 90 + 'px';
  }

  // ---------- Opening a pass ----------
  // The pass comes forward and drops a little, the others tuck into a pile below. Above it, the frame appears,
  // my logo draws itself, fills, and turns into a check. Then the details slide in under the card.
  const later = (ms: number, fn: () => void) => { timers.push(window.setTimeout(fn, reduce ? 0 : ms)); };
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  const AUTH = 150;
  let sel: Sel | null = null;
  let settled = false;
  function select(p: WalletProject) {
    clearTimers();
    open = p; settled = false;
    const H = cardH(), me = passes.find((x) => x.p === p) as Pass;
    // Bring the top of the wallet into view, so the check above the card is always seen.
    const wt = wallet.getBoundingClientRect().top;
    if (wt < 40 || wt > innerHeight * 0.35) scrollTo({ top: scrollY + wt - 40, behavior: reduce ? 'auto' : 'smooth' });
    place(me.el, AUTH, 1); me.el.style.zIndex = '100'; me.el.style.filter = '';
    const rest = passes.filter((x) => x !== me);

    const pt = p.pitch;
    const plats = pt.platforms.map((k) => `<span class="plat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PLAT[k][1]}</svg>${esc(PLAT[k][0])}</span>`).join('');
    details.innerHTML = `
      <div class="block buy"><div class="price"><b>${esc(pt.price)}</b>${pt.note ? `<span>${esc(pt.note)}</span>` : ''}</div>
        ${pt.cta ? `<a class="btn primary" href="${esc(pt.cta[1])}" target="_blank" rel="noopener">${esc(pt.cta[0])}</a>` : ''}</div>
      <div class="block pitch"><h4>${esc(pt.head)}</h4>
        <div class="line"><span class="k">${esc(C.problemLabel)}</span><span class="v">${esc(pt.problem)}</span></div>
        <div class="line"><span class="k">${esc(C.howLabel)}</span><span class="v">${esc(pt.how)}</span></div>
        <div class="line edge"><span class="k">${esc(C.edgeLabel)}</span><span class="v">${esc(pt.edge)}</span></div></div>
      <div class="block meta"><div><span class="k">${esc(C.platformsLabel)}</span><span class="plats">${plats}</span></div>
        <div><span class="k">${esc(C.stackLabel)}</span><span class="chips">${p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</span></div></div>`;
    closeBtn.style.setProperty('--x', '1');
    details.style.setProperty('--c', p.c); details.style.setProperty('--fg', p.fg);
    const top = AUTH + H + 24;
    details.style.top = top + 'px'; details.style.visibility = 'hidden'; details.style.opacity = '0';
    const dh = details.getBoundingClientRect().height, pileTop = top + dh + 36;
    sel = { me, rest, H, dh };
    rest.forEach((x, i) => { place(x.el, pileTop + Math.min(i, 3) * 10, 0.93 - Math.min(i, 3) * 0.015); x.el.style.zIndex = String(50 - i); x.el.style.opacity = i > 3 ? '0' : '1'; x.el.style.filter = 'brightness(.42)'; x.el.tabIndex = -1; });
    wallet.style.height = pileTop + 3 * 10 + 90 + 'px';
    wallet.classList.add('open');
    passes.forEach((x) => x.el.setAttribute('aria-expanded', String(x === me)));
    details.setAttribute('aria-labelledby', `wallet-name-${p.id}`);
    msg.textContent = `${C.opening} ${p.name}`;

    [auth, frame, logo, check, ...lps].forEach((n) => n.getAnimations().forEach((a) => a.cancel()));
    if (reduce) { showDetails(); return; }
    lps.forEach((l) => { const len = l.getTotalLength(); l.style.strokeDasharray = String(len); l.style.strokeDashoffset = String(len); l.style.fill = 'transparent'; });
    check.style.strokeDasharray = '60'; check.style.strokeDashoffset = '60'; check.style.opacity = '0';
    const E = 'cubic-bezier(0.23, 1, 0.32, 1)';
    auth.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 260, delay: 300, easing: E, fill: 'forwards' });
    frame.animate([{ transform: 'scale(1.25)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 380, delay: 300, easing: E, fill: 'forwards' });
    frame.animate([{ transform: 'scale(1)' }, { transform: 'scale(.94)' }, { transform: 'scale(1)' }], { duration: 640, delay: 680, easing: 'ease-in-out', composite: 'add' });
    lps.forEach((l, i) => l.animate([{ strokeDashoffset: l.style.strokeDasharray }, { strokeDashoffset: 0 }], { duration: 620, delay: 420 + i * 160, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards' }));
    lps.forEach((l) => l.animate([{ fill: `rgba(${LIME_RGB},0)` }, { fill: `rgba(${LIME_RGB},1)` }], { duration: 220, delay: 1140, easing: 'ease-out', fill: 'forwards' }));
    logo.animate([{ opacity: 1, transform: 'scale(.31) translate(-200px,-200px)' }, { opacity: 0, transform: 'scale(.24) translate(-200px,-200px)' }], { duration: 200, delay: 1460, easing: 'ease-in', fill: 'forwards' });
    check.animate([{ opacity: 0, strokeDashoffset: 60 }, { opacity: 1, strokeDashoffset: 60, offset: 0.01 }, { opacity: 1, strokeDashoffset: 0 }], { duration: 300, delay: 1600, easing: E, fill: 'forwards' });
    frame.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.07)' }, { transform: 'scale(1)' }], { duration: 300, delay: 1640, easing: E, composite: 'add' });
    (me.el.querySelector('.card') as HTMLElement).animate([{ filter: 'brightness(1)' }, { filter: 'brightness(1.18)' }, { filter: 'brightness(1)' }], { duration: 420, delay: 1600, easing: 'ease-out' });
    later(2200, showDetails);
  }
  // Once the check is done, the card rises under the close button and the details follow it.
  const SETTLED = 72;
  function showDetails() {
    settled = true;
    if (sel) {
      const { me, rest, H, dh } = sel, top = SETTLED + H + 24, pileTop = top + dh + 36;
      place(me.el, SETTLED); details.style.top = top + 'px';
      rest.forEach((x, i) => place(x.el, pileTop + Math.min(i, 3) * 10, 0.93 - Math.min(i, 3) * 0.015));
      wallet.style.height = pileTop + 3 * 10 + 90 + 'px';
    }
    details.style.visibility = 'visible';
    details.animate([{ opacity: 0, transform: 'translateY(-8px) scale(.98)', filter: 'blur(4px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }],
      { duration: reduce ? 0 : 340, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' });
    details.style.opacity = '1';
    closeBtn.style.visibility = 'visible'; closeBtn.style.opacity = '1'; closeBtn.style.pointerEvents = 'auto'; closeBtn.style.transition = 'opacity 200ms ease';
    // Keyboard users land on the close button, unless they have already moved on to something else.
    const at = document.activeElement;
    if (sel && (!at || at === document.body || at === sel.me.el)) closeBtn.focus({ preventScroll: true });
    auth.animate([{ opacity: 1 }, { opacity: 0 }], { duration: reduce ? 0 : 200, easing: 'ease-out', fill: 'forwards' });
  }
  function close() {
    clearTimers();
    const was = sel?.me.el, keepFocus = !document.activeElement || document.activeElement === document.body || root.contains(document.activeElement);
    open = null; settled = false; sel = null; wallet.classList.remove('open');
    passes.forEach((x) => x.el.setAttribute('aria-expanded', 'false'));
    details.removeAttribute('aria-labelledby');
    [auth, frame, logo, check, ...lps].forEach((n) => n.getAnimations().forEach((a) => a.cancel()));
    auth.style.opacity = '0';
    details.getAnimations().forEach((a) => a.cancel());
    if (!reduce) details.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(6px)' }], { duration: 160, easing: 'ease-out' });
    details.style.opacity = '0'; details.style.visibility = 'hidden';
    closeBtn.style.opacity = '0'; closeBtn.style.pointerEvents = 'none'; closeBtn.style.visibility = 'hidden';
    layout();
    // Back to the pass that opened it.
    if (was && keepFocus) was.focus({ preventScroll: true });
  }
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) close(); }, { signal });
  let resizeT: number | undefined;
  addEventListener('resize', () => { clearTimeout(resizeT); resizeT = window.setTimeout(relayout, 150); }, { signal });
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => { if (!disposed) relayout(); });
  layout();

  return () => {
    disposed = true;
    ac.abort();
    clearTimers();
    clearTimeout(resizeT);
    root.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    root.removeAttribute('aria-labelledby');
    root.style.removeProperty('--noise');
    root.replaceChildren();
  };
};
