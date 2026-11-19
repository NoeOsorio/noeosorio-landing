// Shared 3D engine for the app models (Whiteboard, Maiden OS).
// A model is a list of independent pieces on a 1440x900 plane. Scroll drives one number, p (0 to 1):
// the pieces separate in depth, the camera moves between stops, and pieces enter or get written in turn.
window.Layers = (() => {
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const seg = (p, a, b) => clamp((p - a) / (b - a));
  const io = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;   // on-screen movement
  const out = t => 1 - Math.pow(1 - t, 4);                                    // things arriving
  const mix = (a, b, t) => a + (b - a) * t;
  const esc = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  const CSS = `
  html, body { height: 100%; }
  body { background: var(--night, #0E0D0B); color: var(--ink, #F4EEE4); font-family: "Geist", system-ui, sans-serif; }
  #track { height: 620vh; position: relative; }
  #stage { position: sticky; top: 0; height: 100vh; height: 100dvh; overflow: clip; }
  .light { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
  .light.a { width: 46vw; height: 46vw; left: 38%; top: 18%; background: var(--light-a, rgba(236,168,88,.20)); }
  .light.b { width: 40vw; height: 40vw; right: -8%; bottom: -12%; background: var(--light-b, rgba(40,140,150,.22)); }
  .captions { position: absolute; z-index: 5; left: max(16px, env(safe-area-inset-left, 0px)); right: max(16px, env(safe-area-inset-right, 0px)); top: 7vh; pointer-events: none; }
  .cap { position: absolute; left: 0; top: 0; max-width: 23rem; opacity: 0; will-change: transform, opacity; }
  .cap h2 { font-family: "Bricolage Grotesque", system-ui, sans-serif; font-weight: 700; font-size: clamp(2rem, 4.2vw, 3.6rem); line-height: 1; letter-spacing: -0.035em; margin: 0 0 .9rem; text-wrap: balance; }
  .cap p { font-size: clamp(1rem, 1.3vw, 1.15rem); line-height: 1.55; color: rgba(244,238,228,.72); margin: 0; }
  @media (min-width: 900px) { .captions { left: 5vw; top: 50%; transform: translateY(-9rem); } }
  .scene { position: absolute; inset: 0; perspective: 4200px; }
  .rig { position: absolute; left: 50%; top: 52%; width: 1440px; height: 900px; margin: -450px 0 0 -720px; transform-style: preserve-3d; will-change: transform; }
  .piece { position: absolute; box-sizing: border-box; transform-style: preserve-3d; border-radius: var(--r, 12px); background: var(--bg, transparent); }
  .edge { position: absolute; inset: 0; border-radius: inherit; background: var(--edge, #D9D3C5); }
  .sh { position: absolute; inset: 0; border-radius: inherit; background: rgba(20,14,4,.55); filter: blur(18px); opacity: 0; pointer-events: none; }
  @media (prefers-reduced-motion: reduce) { #track { height: 100vh; height: 100dvh; } }`;

  function create(cfg) {
    document.head.appendChild(Object.assign(document.createElement("style"), { textContent: CSS }));
    const track = document.createElement("div"); track.id = "track";
    track.innerHTML = `<div id="stage"><div class="light a"></div><div class="light b"></div><div class="captions"></div><div class="scene"><div class="rig"></div></div></div>`;
    (document.body || document.documentElement.appendChild(document.createElement("body"))).appendChild(track);
    const rig = track.querySelector(".rig"), scene = track.querySelector(".scene"), pieces = [];
    const caps = cfg.captions.map(c => { const d = document.createElement("div"); d.className = "cap"; d.innerHTML = `<h2>${esc(c.title)}</h2><p>${esc(c.text)}</p>`; track.querySelector(".captions").appendChild(d); return d; });

    // One independent element: own depth (z), thickness (thick), shadow, and optional entrance.
    //   enter: [a, b]  appears between scroll a and b, travelling from `from` {x, y, z, s, r} with an arc
    //   write: [a, b]  its content is revealed left to right, like handwriting
    function piece(cls, html, o = {}) {
      const el = document.createElement("div");
      el.className = "piece " + cls; el.innerHTML = html || "";
      if (o.x != null) el.style.left = o.x + "px";
      if (o.y != null) el.style.top = o.y + "px";
      if (o.w != null) el.style.width = o.w + "px";
      if (o.h != null) el.style.height = o.h + "px";
      for (let i = Math.round((o.thick || 0) / 2); i >= 1; i--) { const e = document.createElement("div"); e.className = "edge"; e.style.transform = `translateZ(${-i * 2}px)`; el.prepend(e); }
      let sh = null;
      if (o.shadow) { sh = document.createElement("div"); sh.className = "sh"; el.prepend(sh); }
      rig.appendChild(el);
      const p = Object.assign({ el, sh, z: 0, under: 0, rot: 0, arc: 0 }, o); pieces.push(p); return p;
    }

    function cam(p) {
      const C = cfg.cam; let i = 0; while (i < C.length - 2 && p > C[i + 1].p) i++;
      const a = C[i], b = C[i + 1], t = io(seg(p, a.p, b.p)), o = {};
      for (const k of ["rx", "rz", "s", "fx", "fy"]) o[k] = mix(a[k], b[k], t);
      return o;
    }
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, fit = 1, shift = 0, target = 0, cur = 0, mx = 0, my = 0, cmx = 0, cmy = 0, last = -1;
    function measure() {
      W = innerWidth; H = innerHeight; const wide = W >= 900;
      fit = Math.min((wide ? W * 0.63 : W * 0.98) / 1440, H * (wide ? 0.86 : 0.62) / 900);
      shift = wide ? W * 0.16 : 0;
      scene.style.perspectiveOrigin = `calc(50% + ${shift}px) 46%`;
      if (cfg.onMeasure) cfg.onMeasure();
    }
    function readScroll() { const max = track.offsetHeight - H; target = reduce ? 1 : clamp(max > 0 ? -track.getBoundingClientRect().top / max : 0); }

    function render(p) {
      const X = cfg.explode || [0.08, 0.28, 0.86, 0.98];
      const e = io(seg(p, X[0], X[1])) * (1 - io(seg(p, X[2], X[3])));
      const c = cam(p);
      rig.style.transform = `translate3d(${shift}px,${H < 700 ? 30 : 0}px,0) scale(${fit * c.s}) rotateX(${c.rx + cmy * -5}deg) rotateZ(${c.rz + cmx * 7}deg) translate3d(${-c.fx}px,${-c.fy}px,${-(cfg.sink || 190) * e}px)`;

      // Keep the whole app inside the screen: if the camera would cut it off, pull it back in.
      { const sc = scene; sc.style.transform = ""; let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
        for (const q of pieces) { if (q.enter || q.cls === "note") continue; const b = q.el.getBoundingClientRect(); if (!b.width) continue; x0 = Math.min(x0, b.left); y0 = Math.min(y0, b.top); x1 = Math.max(x1, b.right); y1 = Math.max(y1, b.bottom); }
        const r = { left: x0, top: y0, width: x1 - x0, height: y1 - y0 }, m = 20;
        const mt = W >= 900 ? m : 170;   // on narrow screens the caption sits on top: keep the app below it
        const f = Math.min(1, (W - 2 * m) / r.width, (H - m - mt) / r.height);
        const cx = W / 2 + (r.left + r.width / 2 - W / 2) * f, cy = H / 2 + (r.top + r.height / 2 - H / 2) * f, hw = r.width * f / 2, hh = r.height * f / 2;
        const dx = cx - hw < m ? m - (cx - hw) : cx + hw > W - m ? W - m - (cx + hw) : 0;
        const dy = cy - hh < mt ? mt - (cy - hh) : cy + hh > H - m ? H - m - (cy + hh) : 0;
        sc.style.transform = `translate(${dx}px,${dy}px) scale(${f})`; }
      for (const q of pieces) {
        let k = 1, t = 1, op = 1;
        if (q.enter) { t = seg(p, q.enter[0], q.enter[1]); k = out(t); op = clamp(t * 14); }
        if (q.leave) op *= 1 - seg(p, q.leave[0], q.leave[1]);
        const f = q.from || {}, r = 1 - k;
        const arc = Math.sin(Math.PI * t) * q.arc * (0.4 + 0.6 * e);
        const z = q.z * e + (f.z || 0) * r * e + arc;
        q.el.style.transform = `translate3d(${(f.x || 0) * r}px,${(f.y || 0) * r}px,${z}px) rotate(${q.rot * k + (f.r || 0) * r}deg) scale(${mix(f.s ?? 1, 1, k)})`;
        q.el.style.opacity = op >= 1 ? "" : op;
        if (q.write) { const w = seg(p, q.write[0], q.write[1]); q.el.style.clipPath = w >= 1 ? "" : `inset(-20% ${(1 - out(w)) * 104}% -20% -4%)`; }
        if (q.sh) { const lift = (q.z - q.under) * e + arc; q.sh.style.transform = `translate3d(${lift * .1}px,${lift * .16}px,${-lift + 2}px)`; q.sh.style.opacity = .45 * Math.min(1, lift / 90) * op; }
      }
      if (cfg.onRender) cfg.onRender(p, e);
      caps.forEach((d, i) => {
        let v = 0; for (const [a, b] of cfg.captions[i].show) v = Math.max(v, clamp(Math.min((p - a) / 0.04, (b - p) / 0.04)));
        d.style.opacity = v; d.style.transform = `translate3d(0,${(1 - v) * 10}px,0)`;
      });
    }
    function frame() {
      cur += (target - cur) * 0.14; if (Math.abs(target - cur) < 0.0004) cur = target;
      cmx += (mx - cmx) * 0.08; cmy += (my - cmy) * 0.08;
      const key = cur + cmx * 3 + cmy * 7;
      if (key !== last) { render(cur); last = key; }
      requestAnimationFrame(frame);
    }
    function start() {
      addEventListener("scroll", readScroll, { passive: true });
      addEventListener("resize", () => { measure(); readScroll(); last = -1; });
      if (matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce)
        addEventListener("pointermove", ev => { mx = ev.clientX / W - .5; my = ev.clientY / H - .5; });
      (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => { measure(); readScroll(); cur = target; render(cur); requestAnimationFrame(frame); });
    }
    return { piece, start, rig, esc };
  }
  return { create, esc, seg, out, io, clamp, mix };
})();
