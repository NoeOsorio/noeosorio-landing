# Tasks: Living wallet cards

**Input**: [spec.md](./spec.md), [plan.md](./plan.md), [research.md](./research.md), [contracts/card-motion.md](./contracts/card-motion.md), [quickstart.md](./quickstart.md)

No unit tests: every task's done-check is a real browser frame or command.

## Phase 1: Setup

- [ ] T001 Copy the card generators from the scratchpad `cards/` folder (build.mjs, gen/*.mjs, *.html) into `scripts/cards/` in the repo, so base and overlay come from one tracked source. Done-check: `node scripts/cards/<card>` reproduces today's `public/home/cards/<card>.webp` visually (seed any randomness, e.g. essay.html's script, so scribbles match the approved card).

## Phase 2: Foundational (blocks every story)

- [ ] T002 Create `src/home/sections/card-motion/index.ts` with the `CardMotion` type, a registry keyed by project id, and shared helpers (`draw` for stroke-dashoffset, `pop` for scale .9 to 1 with opacity, `sweep` for scaleX), per contracts/card-motion.md. Done-check: `npx tsc --noEmit -p .` clean.
- [ ] T003 In `src/home/sections/project-wallet.mount.ts` render the overlay SVG over the base image for cards with a module, call `play` from the open-card hook for every registered card, and from the existing observer only for the front card of the stack (Whiteboard keeps today's behavior), cancel animations on close and unmount; overlay positioning in `src/home/sections/project-wallet.css`. Done-check: Whiteboard unchanged at 390 and 1440.

## Phase 3: User Story 1 - Each card shows its project working (P1)

**Independent test**: each card plays its build-up when opened at 390 and 1440 and ends on today's picture; the front card plays once on first view; cards behind stay still.

- [ ] T004 [US1] Essay Studio: base without moving parts in `public/home/cards/essay.webp`, overlay and play in `src/home/sections/card-motion/essay.ts` (lines write, circle, dotted line, "?" note, highlight, underline). Proves the pattern; runs first.
- [ ] T005 [P] [US1] Telar: `card-motion/telar.ts` and `telar.webp` (thread weaves left to right, diamonds light).
- [ ] T006 [P] [US1] Kanji: `card-motion/kanji.ts` and `kanji.webp` (学 in its correct 8-stroke order checked against a stroke-order reference, hand-authored masks, then the seal).
- [ ] T007 [P] [US1] Porter Galaxy: `card-motion/galaxy.ts` and `galaxy.webp` (points arc into orbits, lime nodes light).
- [ ] T008 [P] [US1] Sim World: `card-motion/simworld.ts` and `simworld.webp` (cell divides into the colony, organisms drift in).

## Phase 4: User Story 2 - Pyventa explains itself (P1)

- [ ] T009 [P] [US2] Redraw Pyventa in `scripts/cards/` with no words: receipt items as clean rounded bars (skeleton style, never jagged scribbles) with digit prices, total, barcode, crossed-out wifi icon. Still of the finished picture to Noe before integrating.
- [ ] T010 [US2] `card-motion/pyventa.ts` and `pyventa.webp` (laser sweeps, lines print, total underlines).

## Phase 5: User Story 3 - Maiden OS reads as an AI agent (P1)

- [ ] T011 [P] [US3] Redraw Maiden OS in `scripts/cards/`: dark obsidian, request bubble (left, with tail) and reply bubble (right, with tail), content as clean rounded bars, thinking pulse, reply building a table, a page and an audio waveform, lime check; no words, no orbits. Still to Noe before integrating.
- [ ] T012 [US3] `card-motion/maiden.ts` and `maiden.webp`.

## Phase 6: Polish

- [ ] T013 Verify per quickstart.md: frames at 0, 400, 800, 1200 ms and rest for every card at 320, 390 (WebKit) and 1440; finished pictures vs today's; reduced motion; e2e-final; layer memory within 10%.
- [ ] T014 Independent review: one reviewer on motion (Emil rules), one on "what is this?" for Pyventa and Maiden stills.
- [ ] T015 Build with the Firebase env, deploy the `home-objetos` preview channel, send Noe frames and the link.

## Dependencies

T001 → (T009, T011 start right away). T001 → T002 → T003 → T004 → (T005, T006, T007, T008, T010, T012 in parallel). T009 → T010. T011 → T012. All → T013 → T014 → T015.

## Parallel execution

After T004: agent A takes T005 and T006, agent B takes T007 and T008, agent C takes T009 to T012. Each touches only its own `card-motion/*.ts`, webp and generator files; T003's wallet wiring is not edited again.

## Strategy

MVP is T001 to T004 (pattern proven on Essay). Then the rest in parallel, then verification and preview.
