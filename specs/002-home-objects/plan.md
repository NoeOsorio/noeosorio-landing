# Implementation Plan: Home made of objects

**Branch**: `noe-558-home-objetos` (new, from origin/main) | **Date**: 2026-11-21 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/002-home-objects/spec.md`

## Summary

Replace the current home with the approved prototypes, section by section, without redesigning them. Each prototype is plain HTML, CSS and one script. Each becomes a React section that renders an empty root and, on mount, runs the prototype's script against that root and returns a cleanup. CSS is scoped to the section. Content moves to typed data files. The home route gets its own top bar (logo + Subscribe) and the new footer; every other page keeps the current Layout, navigation and footer.

**Why this approach (simplest that works):** rewriting each prototype as idiomatic React would mean re-implementing about 2,000 lines of tuned canvas and WAAPI motion that Noe already approved, with a high chance of visual drift. Embedding them as iframes would break the passport and wallet, which are driven by page scroll, and would hide the content from search engines. Mounting the existing scripts inside React keeps the approved behavior exactly and gives proper cleanup.

## Technical Context

**Language/Version**: TypeScript 5, React 19

**Primary Dependencies**: Vite 6, React Router 7, Tailwind v4 (unchanged). No new dependency.

**Storage**: none (the Subscribe email form was removed; tips and YouTube are external links)

**Testing**: no unit tests (constitution II). Build + type check as the floor; end-to-end checks in a real browser (Playwright headless) with screenshots, compared against the prototypes.

**Target Platform**: modern browsers, desktop and mobile; Firebase Hosting

**Project Type**: web app (SPA)

**Performance Goals**: 60 fps for the hero and slot machine on a recent laptop; loops pause off screen; Lighthouse mobile at or above 90 on the home (constitution VIII), measured, not assumed.

**Constraints**: reduced motion respected everywhere; no horizontal scroll at 390 px; no leaked loops after client-side navigation.

**Scale/Scope**: one route (`/`), 5 prototype files, about 2,000 lines moved.

## Constitution Check

| Principle | Status | Note |
|---|---|---|
| I. Real, never invented | Pass | Content moves as approved; reviewers re-check every fact against the prototypes. |
| II. Done is what a visitor sees | Pass | Screens at 1440, 768 and 390, independent reviewers, screenshots. |
| III. Design in Paper first | Justified deviation | Noe approved these screens as live prototypes, not Paper frames, because their design is their motion. Task: export each approved section as a frame into Paper (file 01M7DYS823S0HM6J3DY41TYTSE) so Paper stays the record. |
| IV. No AI slop | Pass | Copy already shortened; reviewers check middle dots, repetition and vendor names. |
| V. Built for 1000 items | Pass with note | Wallet and videos list stay short by design (newest first with a link to the full list on YouTube and /portfolio). |
| VI. Brand fidelity | Pass | Noe chose the brandbook lime #D6F35C (2026-11-21): every #C6F06B in the prototypes becomes #D6F35C; #9FD043 stays only as the lit LED dot tone and #F2FFD2 as the hot dot. |
| VII. Nothing broken ships | Pass | Link crawl of the home before the preview is shared; /llms.txt served from `public/`. |
| VIII. Accessible and fast | Verify | Lighthouse mobile measured on the preview; canvas sections are `aria-hidden` with real text alternatives. |
| IX. One source of truth | Pass | Each section's content lives in one data file. |

## Project Structure

### Documentation (this feature)

```text
specs/002-home-objects/
├── plan.md, research.md, data-model.md, quickstart.md
├── contracts/section-mount.md
├── prototypes/          # the approved HTML files (source of truth for design)
└── tasks.md             # next step
```

### Source Code (repository root)

```text
src/pages/Home.tsx                      # rewritten: renders the new sections in order
src/App.tsx                             # "/" moves out of Layout (like /essay), other routes unchanged
src/home/                               # new
├── HomeTopBar.tsx                      # logo + Subscribe (from hero prototype bar)
├── sections/
│   ├── IdeaGalaxy.tsx   + idea-galaxy.mount.ts   + idea-galaxy.css
│   ├── ProjectWallet.tsx + project-wallet.mount.ts + project-wallet.css
│   ├── WorkPassport.tsx + work-passport.mount.ts + work-passport.css
│   ├── LearningSlot.tsx + learning-slot.mount.ts + learning-slot.css
│   └── TipsAndFooter.tsx + tips-footer.mount.ts  + tips-footer.css   # tips, robots, Subscribe, footer
├── data/                               # one typed content file per section (moved from each CONTENT block)
│   ├── galaxy.ts  wallet.ts  passport.ts  learning.ts  tips.ts
└── useMount.ts                         # shared hook: run mount(root, data) once, call cleanup on unmount
public/llms.txt                         # already written, committed in this change
```

Files deleted from the home only when no other page imports them (checked with a search before removal): `src/sections/home/*`, `src/components/home/ServicesShowcase.tsx`.

**Structure Decision**: a self-contained `src/home/` folder, so the new home can be reviewed and removed as one unit and nothing leaks into other pages.

## What must not break

- Other routes render with the current Navbar, Footer and CookieConsent.
- Cookie consent still appears on the home (CookieConsent is mounted on the home too) and "Cookie settings" reopens it through the existing `cookie-settings` window event.
- Analytics still run only after consent (useAnalytics stays on the home).
- SEO: the home keeps its title, description, canonical and preview image (current SEO component).
- /essay waitlist untouched.

## Verification (end to end)

1. `npm run build` and `tsc` clean.
2. Local preview build; Playwright headless at 1440, 768, 390: full-page screenshots per section beside the prototype screenshots; every interaction in the spec's user stories; console errors; horizontal scroll.
3. Leak check: navigate home, About, home ten times; count running animation loops (instrumented in dev).
4. Link crawl of every link on the home.
5. Lighthouse mobile on the preview build.
6. Independent reviewers (Sonnet, did not build it): design fidelity vs prototype, copy and facts, motion and reduced motion, code quality (cleanup, no globals, no duplicated sources).

## Delivery order (each slice works end to end)

1. Route split, top bar, empty sections in order, footer + tips (the shared LED helpers and cookie wiring live here).
2. Hero galaxy.
3. Wallet and passport.
4. Learning slot machine.
5. Paper frames, brand lime pass, reviewers, preview.

## Execution

Opus (this session) plans, reviews every diff and runs verification. Each slice is implemented by Sonnet subagents (`model: "sonnet"`) with the brief in the feature-flow skill. Slices 2, 3 and 4 touch disjoint files and run in parallel after slice 1 lands. Commits name NOE-558, files staged by name, pushed to `noe-558-home-objetos`.

## Safety and approvals

- No production deploy and no merge in this change.
- Noe approved a shareable Firebase Hosting preview channel link (2026-11-21). It is not the live site.
- No keys, no data writes.

## Later, separate proposals

- Subscribe redesign (on hold by Noe).
- Shared top bar and footer for every page (today only the home gets them).
- Project detail pages for the wallet's "See project" (only /essay exists).
- Update DESIGN.md from "design A, warm glass" to the objects + LED system.
