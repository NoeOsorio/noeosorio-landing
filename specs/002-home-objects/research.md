# Research: Home made of objects

## R1. How to bring the prototypes into React

- **Decision**: keep each prototype's script, wrap it as `mount(root, data): cleanup` and call it from a small React component.
- **Rationale**: the approved design is mostly motion (canvas, WAAPI, scroll-driven); re-implementing it risks drift. Mounting keeps it exact and React still owns the page, routing and cleanup.
- **Alternatives**: full React rewrite (slow, drift risk); iframes (break scroll-driven sections and SEO); dangerouslySetInnerHTML with inline scripts (scripts do not run, no cleanup).

## R2. Cleanup

- **Decision**: every mount registers its listeners with one `AbortController`, tracks `requestAnimationFrame` ids, intervals, timeouts and observers, and the returned cleanup cancels all of them and empties the root.
- **Rationale**: React 19 StrictMode mounts twice in development, and client-side navigation must not leave loops behind (spec FR-007).

## R3. Scoping

- **Decision**: CSS per section under a root class (`.home-galaxy`, `.home-wallet`...), the same scoping `prototypes/assemble.py` already proved; `document.getElementById` and `document.querySelector` inside scripts become `root.querySelector`; keyframe names get a section prefix.
- **Rationale**: the assembled prototype home already ran all sections together with no clashes this way.

## R4. Content

- **Decision**: each prototype's `CONTENT` block becomes a typed export in `src/home/data/*.ts`.
- **Rationale**: constitution IX; Noe edits copy in one place.

## R5. llms.txt

- **Decision**: serve `public/llms.txt` (already written) and keep the robots terminal reading its embedded copy from `tips.ts`.
- **Note**: two copies of the same text break constitution IX. Task: the terminal fetches `/llms.txt` at run time and falls back to a short line if the fetch fails, so the file is the single source.

## R6. Brand lime

- **Decision**: #D6F35C, chosen by Noe on 2026-11-21.
