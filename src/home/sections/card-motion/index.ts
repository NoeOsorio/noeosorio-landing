import essay from './essay';
import telar from './telar';
import kanji from './kanji';
import galaxy from './galaxy';
import simworld from './simworld';
import pyventa from './pyventa';
import maiden from './maiden';

// Moving parts of a wallet card. The card's base picture is a still image; each motion adds an SVG overlay
// in the same 520 x 328 space, so base plus overlay at rest is the finished card. Contract: specs/003-living-cards/contracts/card-motion.md.
export type CardMotion = {
  id: string;
  svg: string;
  // Starts the build-up after `delay` ms and returns the animations so the wallet can cancel them. Never loops.
  play(root: SVGSVGElement, delay: number): Animation[];
};

export const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';

// A stroke that writes itself. Only stroke-dashoffset and opacity move; at rest the stroke is whole.
export function draw(el: Element, at: number, ms: number): Animation {
  el.setAttribute('pathLength', '1');
  (el as SVGElement).style.strokeDasharray = '1 2';
  return el.animate(
    [{ strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 1, opacity: 1, offset: 0.001 }, { strokeDashoffset: 0, opacity: 1 }],
    { duration: ms, delay: at, easing: EASE, fill: 'backwards' },
  );
}

// Something that appears: from slightly small and transparent, never from nothing.
export function pop(el: Element, at: number, ms: number, origin?: string): Animation {
  const s = (el as SVGElement).style;
  s.transformBox = origin ? 'view-box' : 'fill-box';
  s.transformOrigin = origin || 'center';
  return el.animate([{ transform: 'scale(0.9)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: ms, delay: at, easing: EASE, fill: 'backwards' });
}

// A band that grows from one side, like a marker pass.
export function sweep(el: Element, at: number, ms: number, origin = '0% 50%'): Animation {
  const s = (el as SVGElement).style;
  s.transformBox = 'fill-box';
  s.transformOrigin = origin;
  return el.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: ms, delay: at, easing: EASE, fill: 'backwards' });
}

// Registry keyed by project id. Cards without an entry keep their still picture.
// Cards whose overlay is still a placeholder (empty svg) are left out, so they keep showing their full image.
export const motions: Record<string, CardMotion> = Object.fromEntries(
  [essay, telar, kanji, galaxy, simworld, pyventa, maiden].filter((m) => m.svg).map((m) => [m.id, m]),
);
