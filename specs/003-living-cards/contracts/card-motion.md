# Contract: card motion module

Each module in `src/home/sections/card-motion/` exports `const motion: CardMotion`.

- The overlay is drawn over the base image with the same framing (slice to cover) and is `aria-hidden`.
- At rest, base plus overlay equals the card's approved finished picture.
- `play` animates only transform, opacity and stroke-dashoffset, finishes within 2000 ms including delay, uses `fill: 'backwards'`, and never loops.
- Under reduced motion `play` does nothing.
- The wallet cancels returned animations on close and unmount.
