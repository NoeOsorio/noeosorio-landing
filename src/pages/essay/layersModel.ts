// The 3D scroll model of the Essay Studio page, ported from the approved prototype
// (specs/001-knowledge-hub-redesign/prototypes/essay-studio-layers.html).
// It stays imperative on purpose: pieces are plain DOM nodes moved by one render function.

import type { APP } from "./content";

export type ModelApp = typeof APP;

type Piece = {
  el: HTMLElement;
  sh: HTMLElement | null;
  z: number;
  under: number;
  rot: number;
  thick?: number;
  x?: number;
  y?: number;
  shadow?: boolean;
  isNote: boolean;
};
type Note = Piece & { sx: number; sy: number; i: number };
type Word = { el: HTMLElement; u: HTMLElement | null };

const ICON = {
  back: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3.5L5.5 8l4.5 4.5"/></svg>',
  check:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',
  ask: '<svg viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="9" height="9" rx="1.5" fill="#BDEBD6"/><rect x="5" y="2.5" width="9" height="9" rx="1.5" fill="#FFE08A" stroke="#C9A640" stroke-width=".8"/></svg>',
  cursor: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5l8.5 5-3.6.9 2 3.8-1.6.8-2-3.8L4.8 12z"/></svg>',
  sticky:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M3 3h10v6.5L9.5 13H3z"/><path d="M13 9.5H9.5V13"/></svg>',
  arrow:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12.5l9-9M6.5 3.5h6v6"/></svg>',
};

const esc = (s: string) =>
  String(s).replace(/[&<>]/g, (c) => (({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }) as Record<string, string>)[c]);

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const io = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // on-screen movement
const out = (t: number) => 1 - Math.pow(1 - t, 4); // things arriving
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

// Camera stops: p, tilt, turn, zoom, and the point of the app it looks at.
const CAM = [
  { p: 0.0, rx: 16, rz: 0, s: 1.0, fx: 0, fy: 0 },
  { p: 0.08, rx: 16, rz: 0, s: 1.0, fx: 0, fy: 0 },
  { p: 0.28, rx: 56, rz: -36, s: 0.66, fx: 0, fy: 0 },
  { p: 0.42, rx: 50, rz: -28, s: 0.88, fx: -250, fy: -60 },
  { p: 0.5, rx: 52, rz: -34, s: 0.82, fx: 200, fy: -40 },
  { p: 0.66, rx: 50, rz: -38, s: 0.84, fx: 260, fy: -20 },
  { p: 0.76, rx: 54, rz: -34, s: 0.7, fx: 0, fy: 0 },
  { p: 0.86, rx: 54, rz: -34, s: 0.7, fx: 0, fy: 0 },
  { p: 1.0, rx: 14, rz: 0, s: 1.0, fx: 0, fy: 0 },
];
type Cam = { rx: number; rz: number; s: number; fx: number; fy: number };
function cam(p: number): Cam {
  let i = 0;
  while (i < CAM.length - 2 && p > CAM[i + 1].p) i++;
  const a = CAM[i],
    b = CAM[i + 1],
    t = io(seg(p, a.p, b.p));
  return {
    rx: mix(a.rx, b.rx, t),
    rz: mix(a.rz, b.rz, t),
    s: mix(a.s, b.s, t),
    fx: mix(a.fx, b.fx, t),
    fy: mix(a.fy, b.fy, t),
  };
}
const CAPS: [number, number][] = [
  [-1, 0.12],
  [0.24, 0.44],
  [0.5, 0.68],
  [0.72, 2],
];

/**
 * Builds the model inside `track`, which must contain `.ly-stage > .ly-captions (with .ly-cap children)`
 * and `.ly-scene > .ly-rig`. Returns a cleanup function.
 */
export function mountLayers(track: HTMLElement, A: ModelApp): () => void {
  const rig = track.querySelector<HTMLElement>(".ly-rig")!;
  const scene = track.querySelector<HTMLElement>(".ly-scene")!;
  const caps = Array.from(track.querySelectorAll<HTMLElement>(".ly-cap"));
  const ac = new AbortController();
  const sig = { signal: ac.signal };
  let disposed = false;
  let raf = 0;

  const pieces: Piece[] = [];
  // A piece is one independent element of the app: its own depth, thickness and shadow.
  function piece(
    cls: string,
    html: string,
    o: { x?: number; y?: number; z?: number; thick?: number; rot?: number; shadow?: boolean; under?: number },
  ): Piece {
    const el = document.createElement("div");
    el.className = "piece " + cls;
    el.innerHTML = html || "";
    if (o.x != null && o.y != null) {
      el.style.left = o.x + "px";
      el.style.top = o.y + "px";
    }
    const n = Math.round((o.thick || 0) / 2);
    for (let i = n; i >= 1; i--) {
      const e = document.createElement("div");
      e.className = "edge";
      e.style.transform = `translateZ(${-i * 2}px)`;
      el.prepend(e);
    }
    let sh: HTMLElement | null = null;
    if (o.shadow) {
      sh = document.createElement("div");
      sh.className = "sh";
      el.prepend(sh);
    }
    rig.appendChild(el);
    const p: Piece = {
      el,
      sh,
      z: o.z ?? 0,
      under: o.under ?? 0,
      rot: o.rot ?? 0,
      thick: o.thick,
      isNote: cls.split(" ").includes("note"),
    };
    pieces.push(p);
    return p;
  }

  piece("window", "", { z: 0, thick: 16 });
  piece("btn soft", ICON.back + esc(A.back), { x: 90, y: 14, z: 70, thick: 4 });
  const askTop = piece("btn line", ICON.ask + esc(A.ask), { x: 1010, y: 14, z: 70, thick: 4 });
  const stamp = piece("stamp", esc(A.score), { x: 1196, y: 17, z: 110, thick: 4, rot: -3, shadow: true, under: 0 });
  piece("btn dark", ICON.check + esc(A.review), { x: 1262, y: 14, z: 70, thick: 4 });
  piece("board", "", { z: 130, thick: 8, shadow: true, under: 0 });
  piece("tools", `<span>${ICON.cursor}</span><span>${ICON.sticky}</span><span>${ICON.arrow}</span>`, {
    z: 190,
    thick: 4,
    under: 130,
  });
  const askBoard = piece("btn line", ICON.ask + esc(A.ask), { x: 1000, y: 650, z: 200, thick: 4, under: 130 });
  piece("sheet", "", { z: 250, thick: 8, shadow: true, under: 0 });
  piece("title", esc(A.title), { z: 272 });
  const para = piece("para", "", { z: 272 });

  // Paragraph: every word is its own element, so the text can ripple and each underline can draw.
  const words: Word[] = [];
  A.body.replace(/\{(\w+):([^}]*)\}|([^{]+)/g, (m: string, agent?: string, markedText?: string, plain?: string) => {
    const parts = (markedText ?? plain ?? "").split(/(?<=\s)/);
    parts.forEach((t, i) => {
      if (!t) return;
      const s = document.createElement("span");
      s.className = "w";
      s.textContent = t;
      let u: HTMLElement | null = null;
      if (agent) {
        s.dataset.a = agent;
        if (i === parts.length - 1) s.classList.add("last");
        u = document.createElement("span");
        u.className = "u";
        s.appendChild(u);
      }
      para.el.appendChild(s);
      words.push({ el: s, u });
    });
    return m;
  });
  const marked = words.filter((w) => w.u) as (Word & { u: HTMLElement })[];
  const titleEl = rig.querySelector<HTMLElement>(".title")!;
  // The paragraph starts where the title ends, so a longer or shorter title never overlaps it.
  const flow = () => {
    para.el.style.top = titleEl.offsetTop + titleEl.offsetHeight + 30 + "px";
  };

  // Notes: three columns on the board, one per agent, measured from their real height.
  const cols = Object.keys(A.agents);
  const notes: Note[] = [];
  const colY = cols.map(() => 150);
  A.notes.forEach((n, i) => {
    const c = cols.indexOf(n.agent);
    const p = piece(
      "note",
      `<span class="tape"></span><b><i></i>${esc(A.agents[n.agent].name)}</b>${esc(n.text)}`,
      { z: 400 + c * 26, thick: 4, shadow: true, under: 130, rot: [-1.4, 1.1, -0.6, 0.9, -1.2, 0.7, 1.3, -0.9, 0.5][i % 9] },
    ) as Note;
    p.el.dataset.a = n.agent;
    p.sx = 770 + c * 216;
    p.sy = colY[c];
    p.i = notes.length;
    p.el.style.left = p.sx + "px";
    p.el.style.top = p.sy + "px";
    colY[c] += p.el.offsetHeight + 26;
    notes.push(p);
  });

  // ---- timeline -------------------------------------------------------------
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W = 0,
    H = 0,
    fit = 1,
    shift = 0;
  function measure() {
    W = innerWidth;
    H = innerHeight;
    flow();
    const wide = W >= 900;
    fit = Math.min((wide ? W * 0.63 : W * 0.98) / 1440, (H * (wide ? 0.86 : 0.62)) / 900);
    shift = wide ? W * 0.16 : 0;
    scene.style.perspectiveOrigin = `calc(50% + ${shift}px) 46%`;
  }
  let target = 0,
    cur = 0,
    mx = 0,
    my = 0,
    cmx = 0,
    cmy = 0;
  function readScroll() {
    const max = track.offsetHeight - H;
    target = reduce ? 1 : clamp(max > 0 ? -track.getBoundingClientRect().top / max : 0);
  }
  addEventListener("scroll", readScroll, { passive: true, signal: ac.signal });
  addEventListener(
    "resize",
    () => {
      measure();
      readScroll();
      last = -1;
    },
    sig,
  );
  if (matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce)
    addEventListener(
      "pointermove",
      (e) => {
        mx = e.clientX / W - 0.5;
        my = e.clientY / H - 0.5;
      },
      sig,
    );

  function render(p: number) {
    const e = io(seg(p, 0.08, 0.28)) * (1 - io(seg(p, 0.86, 0.98))); // how far apart the layers are
    const c = cam(p);
    rig.style.transform = `translate3d(${shift}px,${H < 700 ? 30 : 0}px,0) scale(${fit * c.s}) rotateX(${c.rx + cmy * -5}deg) rotateZ(${c.rz + cmx * 7}deg) translate3d(${-c.fx}px,${-c.fy}px,${-190 * e}px)`;

    // Keep the whole app inside the screen: if the camera would cut it off, pull it back in.
    {
      scene.style.transform = "";
      let x0 = 1e9,
        y0 = 1e9,
        x1 = -1e9,
        y1 = -1e9;
      for (const q of pieces) {
        if (q.isNote) continue;
        const b = q.el.getBoundingClientRect();
        if (!b.width) continue;
        x0 = Math.min(x0, b.left);
        y0 = Math.min(y0, b.top);
        x1 = Math.max(x1, b.right);
        y1 = Math.max(y1, b.bottom);
      }
      const r = { left: x0, top: y0, width: x1 - x0, height: y1 - y0 },
        m = 20;
      // Measured against the stage, not the window: once the stage scrolls away the model goes with it.
      const s = scene.getBoundingClientRect();
      const sx = s.left + s.width / 2,
        sy = s.top + s.height / 2;
      const f = Math.min(1, (s.width - 2 * m) / r.width, (s.height - 2 * m) / r.height);
      const cx = sx + (r.left + r.width / 2 - sx) * f,
        cy = sy + (r.top + r.height / 2 - sy) * f,
        hw = (r.width * f) / 2,
        hh = (r.height * f) / 2;
      const dx = cx - hw < s.left + m ? s.left + m - (cx - hw) : cx + hw > s.right - m ? s.right - m - (cx + hw) : 0;
      const dy = cy - hh < s.top + m ? s.top + m - (cy - hh) : cy + hh > s.bottom - m ? s.bottom - m - (cy + hh) : 0;
      scene.style.transform = `translate(${dx}px,${dy}px) scale(${f})`;
    }

    const asked = seg(p, 0.46, 0.5),
      reviewed = out(seg(p, 0.78, 0.84));
    for (const q of pieces) {
      if (q.isNote) continue;
      let z = q.z * e,
        op = 1,
        sc = 1;
      if (q === askBoard) op = 1 - asked;
      if (q === askTop) op = asked;
      if (q === stamp) {
        op = reviewed;
        z += (1 - reviewed) * 260;
        sc = mix(1.5, 1, reviewed);
      }
      q.el.style.transform = `translate3d(0,0,${z}px) rotate(${q.rot}deg) scale(${sc})`;
      q.el.style.opacity = op >= 1 ? "" : String(op);
      if (q.sh) {
        const lift = (q.z - q.under) * e;
        q.sh.style.transform = `translate3d(${lift * 0.1}px,${lift * 0.16}px,${-lift + 2}px)`;
        q.sh.style.opacity = String(0.5 * Math.min(1, lift / 90) * op);
      }
    }
    // The text ripples line by line while the camera reads it.
    const wave = seg(p, 0.26, 0.46) * (words.length + 12) - 6,
      live = e;
    words.forEach((w, i) => {
      const d = (i - wave) / 6,
        bump = Math.exp(-d * d) * 14 * live;
      w.el.style.transform = `translateZ(${bump}px)`;
    });
    // Notes leave the page and land on the board, one after another.
    notes.forEach((n) => {
      const t = seg(p, 0.48 + n.i * 0.018, 0.56 + n.i * 0.018),
        k = out(t);
      const ox = 300 - n.sx,
        oy = 380 - n.sy;
      const x = ox * (1 - k),
        y = oy * (1 - k);
      const base = n.z * e,
        arc = Math.sin(Math.PI * Math.min(1, t)) * 150 * (0.4 + 0.6 * e),
        from = (300 - n.z) * e * (1 - k);
      n.el.style.transform = `translate3d(${x}px,${y}px,${base + from + arc}px) rotate(${n.rot * k - 8 * (1 - k)}deg) scale(${mix(0.72, 1, k)})`;
      const o = clamp(t * 14);
      n.el.style.opacity = o >= 1 ? "" : String(o);
      const lift = (n.z - n.under) * e + arc;
      if (n.sh) {
        n.sh.style.transform = `translate3d(${lift * 0.1}px,${lift * 0.16}px,${-lift + 2}px)`;
        n.sh.style.opacity = String(0.45 * Math.min(1, lift / 90) * clamp(t * 6));
      }
    });
    // Review: each underline draws in reading order.
    const draw = seg(p, 0.7, 0.82) * (marked.length + 4);
    marked.forEach((w, i) => {
      w.u.style.transform = `scaleX(${out(clamp(draw - i))})`;
    });

    caps.forEach((d, i) => {
      const range = CAPS[i];
      if (!range) return;
      const [a, b] = range,
        v = clamp(Math.min((p - a) / 0.04, (b - p) / 0.04));
      d.style.opacity = String(v);
      d.style.transform = `translate3d(0,${(1 - v) * 10}px,0)`;
    });
  }

  let last = -1;
  function frame() {
    if (disposed) return;
    cur += (target - cur) * 0.14;
    if (Math.abs(target - cur) < 0.0004) cur = target;
    cmx += (mx - cmx) * 0.08;
    cmy += (my - cmy) * 0.08;
    const key = cur + cmx * 3 + cmy * 7;
    if (key !== last) {
      render(cur);
      last = key;
    }
    raf = requestAnimationFrame(frame);
  }
  const start = () => {
    if (disposed) return;
    measure();
    readScroll();
    cur = target;
    render(cur);
    raf = requestAnimationFrame(frame);
  };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(start);

  return () => {
    disposed = true;
    cancelAnimationFrame(raf);
    ac.abort();
    rig.textContent = "";
    scene.style.transform = "";
  };
}
