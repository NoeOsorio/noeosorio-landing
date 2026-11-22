# Implementation Plan: Living wallet cards

**Branch**: `noe-558-cards-vivas` | **Date**: 2026-11-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-living-cards/spec.md`

## Summary

Six of the seven illustrated cards are flat images today, so nothing in them can move; only Whiteboard is live vector art, which is why it is the only one that feels "in use". Each illustrated card is split into a **static base image** (today's art minus the parts that move) and a **small inline vector overlay** holding only the moving parts. The overlay plays a one-time build-up on first view and on open, through the same trigger Whiteboard uses, and rests on a finished state identical to today's card. Pyventa and Maiden OS are redrawn so they explain themselves with no words.

## Technical Context

**Language/Version**: TypeScript 5, vanilla DOM inside the existing wallet mount
**Primary Dependencies**: none new; Web Animations API (`element.animate`), IntersectionObserver already in `project-wallet.mount.ts`
**Storage**: static assets in `public/home/cards/` (webp base) and overlay markup in `src/home/sections/card-motion/*.ts`
**Testing**: no unit tests; end-to-end checks in a real browser (Playwright, Chromium and WebKit)
**Target Platform**: modern browsers, iPhone Safari first
**Project Type**: web site (React 19 + Vite, vanilla section mounts)
**Performance Goals**: 60 fps during the build-up; only transform, opacity and stroke-dashoffset animate
**Constraints**: iPhone-size peak layer memory within 10% of today; overlay markup under ~25 KB per card; no filters or blur inside overlays; animations cancelled after they finish so no compositor layers linger
**Scale/Scope**: 7 cards; the pattern must take an 8th card by adding one module

## Constitution Check

- **I. Real, Never Invented**: art shows real product behavior (Pyventa offline checkout, Maiden building a table, a page and audio, which its pitch states). Pass.
- **II. Done Is What a Visitor Sees**: verified by watching every card build up at 390 and 1440, in Chromium and WebKit. Pass.
- **III. Design in Paper First**: the five unchanged cards keep approved designs. The two redrawn cards (Pyventa, Maiden) are shown to Noe as static stills of the finished picture before integration; in Paper if the app is open, otherwise as images, the way today's cards were approved. Pass with that gate.
- **IV. No AI Slop**: no words on art, no explanatory captions. Pass.
- **V. Built for 1000 Items**: per-card modules registered by id; nothing assumes seven. Pass.
- **VI. Brand Fidelity**: each card keeps its palette; lime only where it already exists. Pass.
- **VII. Nothing Broken Ships**: e2e (errors, overflow, links, memory) before preview and production. Pass.
- **VIII. Accessible and Fast**: reduced motion shows finished art; overlays are `aria-hidden`; base images stay lazy webp. Pass.
- **IX. One Source of Truth for Content**: card data stays in `data/wallet.ts`; art modules hold only drawing. Pass.

## Design

**Base and overlay.** For each card the generator in the scratchpad (`cards/build.mjs`, `cards/gen/*.mjs`, `cards/*.html`) renders two things from one source: the base webp without the moving parts, and the moving parts as an SVG fragment in the same 520×328 viewBox. The overlay sits exactly on top of the base (`position:absolute; inset:0`, same `preserveAspectRatio="xMidYMid slice"` as the base image's `object-fit: cover`). With the overlay at its finished state, base plus overlay must match today's webp pixel for pixel within anti-aliasing.

**Motion.** Each card module exports `{ id, svg: string, play(svgRoot, delay): Animation[] }`. The wallet keeps one registry. The open-card hook calls `play` for any card with a module. The existing IntersectionObserver (threshold 0.5, once) calls it only for the front card of the stack, since the others show only a top strip; Whiteboard keeps its current behavior. Durations 900 to 1600 ms, ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for things arriving, staggered; `fill: 'backwards'` so the resting state is the plain SVG. Animations are cancelled on close or unmount through the mount's AbortController. Reduced motion: `play` returns `[]`.

**Per card (moving parts only).**
- Essay Studio: scribble lines (stroke draw), circle, dotted connector, "?" note (scale .9 to 1 with opacity), yellow highlight (scaleX from left), green underline (stroke draw).
- Telar: the thread path as stitches revealed left to right along the branches; diamonds fade up to lit as the thread reaches them.
- Porter Galaxy: the orbit nodes and lime points travel a short arc into place and fade in; the dust stays in the base.
- Sim World: the colony cells appear by division (one cell, two, four, the cluster) with small scale steps; drifting organisms translate in a few px.
- Kanji: 学 strokes as masked brush paths drawn in stroke order; then the seal stamps (scale 1.15 to 1, opacity).
- Pyventa (redrawn): receipt paper and barcode in the base; laser line sweeps the barcode, item lines (short ink marks plus digit prices) print top to bottom, the total underlines, the crossed-out wifi icon is present throughout.
- Maiden OS (redrawn): dark obsidian base; a short request bubble arrives, a lime pulse marks the agent thinking, the reply bubble builds a small table (cells fill), a page of lines and an audio waveform (bars scale up), then a lime check.

## What must not break

Whiteboard art and its animation; the pay animation and details panel; stacking and peeks; card labels and logo; no horizontal scroll; iPhone memory (overlays carry no filters, animations cancelled when done); `/essay` and other pages untouched.

## Files

- `src/home/sections/card-motion/index.ts` (new): registry and shared `draw`/`pop` helpers.
- `src/home/sections/card-motion/{essay,telar,galaxy,simworld,kanji,pyventa,maiden}.ts` (new): overlay SVG and `play`.
- `src/home/sections/project-wallet.mount.ts`: render overlay over the base image when a module exists; observer and open hook call the registry.
- `src/home/sections/project-wallet.css`: overlay positioning.
- `public/home/cards/*.webp`: re-rendered bases (moving parts removed); Pyventa and Maiden replaced.
- Scratchpad generators: split output into base and overlay.

## Verification

Real browser at 320, 390 (WebKit iPhone 15 Pro, dsf 3) and 1440 (dsf 2): frames at 0, 400, 800, 1200 ms and rest for every card; finished state compared with today's webp side by side; e2e for errors, overflow, links and leaks; layer memory at 390 dsf 3 with `homemem2.mjs`. An independent reviewer judges the redrawn Pyventa and Maiden stills ("what is this?") and the motion against the Emil rules.

## Execution

Sonnet subagents, each loading the `emil-design-eng` skill before motion code:
1. Shared registry and wallet wiring plus Essay (proves the pattern). Runs first.
2. In parallel after 1: Telar and Kanji; Galaxy and Sim World; Pyventa and Maiden redraws (stills to Noe before integrating).
Opus reviews each diff and the frames.

## Complexity Tracking

None.
