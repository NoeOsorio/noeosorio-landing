# Implementation Plan: noeosorio.com as Noe's knowledge hub

**Branch**: `noe-558-rediseno-porter` | **Date**: 2026-11-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-knowledge-hub-redesign/spec.md`. Linear: NOE-558.

## Summary

Replace the invented agency site with Noe's real knowledge hub: Home, Projects (the eight he
approved), a curated video library with takeaways, Now, About with his verified story, Privacy and a
real 404. The site is rebuilt as static HTML per page from typed content files, which removes the
root cause of the soft 404s, the shared metadata and the content drift. Design is done in Paper and
approved before code. Visits are measured with Firebase Analytics after the visitor accepts a real consent banner.

## Root cause and why this attacks it

The current site is a client-only app behind a rewrite of every path to one HTML file, with copy
written to look like a company. The rewrite makes every URL answer 200, gives crawlers and link
previews the same head for every page, and lets content drift across components. Rendering each
page to its own HTML file from one content source removes those failures by construction (unknown
paths have no file, so they get a real 404; each file carries its own tags; content has one home).
Replacing the copy with facts from the verified profile removes the invented content. Details in
[research.md](./research.md) R1 to R3.

## Smallest root fix vs the bigger redesign

- **This plan**: the hub with the scope in the spec (no writing section, no podcast, no
  newsletter).
- **Later, as its own spec**: Writing (essays with references, his weekly article goal), a podcast
  area if he starts one tied to his brand, a newsletter. The content model here leaves room for them.

## Technical Context

**Language/Version**: TypeScript, Node 20+

**Primary Dependencies**: Astro (current stable) with content collections; Tailwind CSS v4; one
small client island for video search; Satori and resvg for preview images; Playwright for
verification

**Storage**: content files in the repository (Markdown and TypeScript), no database

**Testing**: no unit tests (constitution II); end-to-end verification script with Playwright,
Lighthouse, and independent reviewers

**Target Platform**: static site on Firebase Hosting (project `noeosorio-web`), modern browsers,
desktop, tablet and phone

**Project Type**: static content website

**Performance Goals**: home page on mobile scores at least 90 in performance, accessibility and SEO

**Constraints**: analytics only after consent, no secrets in files, no vendor names in visible text, works with JavaScript
disabled except search filtering

**Scale/Scope**: about 8 page types; 8 projects; tens of videos now, designed for 1000

## Constitution Check

| Principle | How this plan complies |
|---|---|
| I Real, never invented | All copy comes from the verified profile (NOE-558, «Quién es Noe») and Noe's approvals; the verification scan flags unsourced numbers and "we" |
| II Done is what a visitor sees | Acceptance bar from the spec; quickstart runs the real build in a browser; reviewers who did not build it grade screenshots |
| III Design in Paper first | Slice 1 designs every page in Paper; code starts only after Noe approves it; motion loads the Emil skill |
| IV No AI slop | Paper designs and copy are checked against the rules; the scan blocks the middle dot and vendor names |
| V Built for 1000 items | Video library with search, topic filters and dense view, tested with a generated 1000 item fixture |
| VI Brand fidelity | Brandbook colors and monogram; any extra color justified in the Paper brief |
| VII Nothing broken ships | Static pages, real 404, 301 redirects for every old URL, per-page metadata, link and image crawl |
| VIII Accessible and fast | Lighthouse gate, keyboard and focus check, alt text required by the schema |
| IX One source of truth | Content collections with schemas; components only render |
| Security and release | No secrets at all; preview and production deploys only with Noe's yes |
| Workflow | Worktree from origin/main, Linear ID in every commit, Sonnet implements, Opus reviews |

No violations; no complexity to justify.

## What must not break

- The domain noeosorio.com and its Firebase project keep working; the old site stays live until
  Noe approves the new one.
- Old links people may have saved (portfolio, services, contact) still land somewhere useful.
- Noe's other properties are untouched. Checked on 2026-11-14 with `dig`: simulations.noeosorio.com
  points to Cloudflare Pages (`simulations-d97.pages.dev`) and research.noeosorio.com to Railway
  (`ebt5j3j9.up.railway.app`); only the apex noeosorio.com and www point to Firebase Hosting
  (151.101.x.195), so a deploy of the `noeosorio-web` site cannot affect them. The Firebase CLI is
  not installed on this Mac yet; the hosting site list is checked when it is, before any deploy.

## Every file touched

**Removed** (old app): `src/App.tsx`, `src/main.tsx`, `src/pages/**`, `src/sections/**`,
`src/components/**`, `src/data/**`, `src/hooks/**`, `src/services/**`, `src/config/firebase.ts`,
`src/types/**`, `src/utils/**`, `email-templates/`, `vite.config.ts`, `tailwind.config.js`,
`eslint.config.js`, `tsconfig.app.json`, `tsconfig.node.json`, `.env.example`, `public/images/proyecto*.png`,
`public/preview.png`, `public/sitemap.xml`, `public/manifest.json`, `public/sakurakode-logo.png`.

**Added**:
- `astro.config.mjs`, `tsconfig.json`, `package.json` (new dependencies), `src/styles/global.css`
  (brand tokens).
- `src/content.config.ts` (schemas from [data-model.md](./data-model.md)), `src/content/projects/*.md`,
  `src/content/videos/*.md`, `src/content/now.md`, `src/content/about.md`, `src/content/site.ts`,
  `src/content/topics.ts`.
- `src/layouts/Base.astro` (head with per-page metadata, header, footer).
- `src/pages/index.astro`, `projects/index.astro`, `projects/[slug].astro`, `videos/index.astro`,
  `videos/[slug].astro`, `now.astro`, `about.astro`, `privacy.astro`, `404.astro`,
  `og/[...path].png.ts`.
- `src/components/` for the pieces the Paper design defines (project list, video list with search
  island, click-to-load player, footer).
- `public/` brand assets (monogram, favicon, self-hosted fonts), project visuals.
- `scripts/verify.mjs` (crawl, redirects, 404, text scan, metadata, screenshots).

**Changed**: `firebase.json` (no catch-all rewrite, redirects from
[contracts/routes.md](./contracts/routes.md), cache headers, `public: "dist"`), `public/robots.txt`,
`README.md`, `index.html` removed.

## Channels

One channel: the website at desktop, tablet and phone widths. Link previews in chat apps and
crawlers are treated as a second surface and verified (SC-004).

## Safety and approvals needed from Noe

- **Analytics**: Firebase Analytics (already in use), now only after consent.
- **Preview deploy**: a temporary Firebase preview URL on the internet, only with his yes.
- **Production deploy**: replaces the live noeosorio.com, only with his yes after he reviews the
  preview.
- **Assets**: the logo as SVG from `LOGO - NOE.ai`, and screenshots or short videos of the private
  projects (Maiden OS, Telar, Whiteboard) or his OK to capture them from the running apps.
- No money is spent in this plan.

## Delivery order

**Phase A, restructuring (same look as today)**

1. **Evidence first** (done): same home page measured both ways; static is 3.2x faster to show
   content, 6.4x lighter and ships no JavaScript to read the page (research.md R2).
2. **Rebuild as static pages with the current look**: every live page (the 20 mapped in Paper
   «antes») rendered as its own HTML file, matching the current design; Paper «antes» is the
   reference and reviewers compare against it.
3. **Fix what is broken**: footer links, real 404, 301 redirects, per-page title, description and
   preview image, images converted and sized, Firebase Analytics behind a real consent banner,
   sitemap and robots.
4. **Verify**: crawl, Lighthouse on every page (target 95+ on mobile), screenshots against Paper
   «antes», independent reviewers.
5. **Preview and ship** (Noe's yes at each step).

**Phase A content map (same layout, real copy in English)**

| Page today | Phase A | Copy changes |
|---|---|---|
| Home | Stays | Hero says who Noe is; the stat row becomes three real facts; the four service cards show four of his projects; the education block shows what he really did (Qué Dirían, Sakura Kode Academy, livestreams) without counters; the industry cards become the fields he worked in (health, fintech, infrastructure, education) without counts; featured projects become three of his approved projects with real screenshots; the closing call becomes his email and channels |
| Portafolio | Becomes Projects | The eight approved projects in the same zig-zag layout |
| Project detail (8 old case studies) | Replaced by the 8 approved projects in the same template | Real description, what it does, stack, timeline and working links; screenshots we capture (live demos come in Phase B) |
| Servicios and its 4 detail pages | Retired, 301 to Home | Noe does not sell packages |
| Acerca de | Stays | His story, verified work history with Porter, real stack, teaching without counters |
| Contacto | Stays, simpler | Email and channels; the reasons cards and the form go (they assume clients and job offers) |
| Social | Stays | Name with accent, Product Engineer, plus YouTube |
| Privacidad | Stays | Rewritten for Firebase Analytics with consent |
| 404 | New, in the current style | A way home |

Each page is shown in Paper (a «Fase A» page next to «antes») with its final copy before any code.

**Phase B, redesign (nothing built until Noe approves it in Paper)**

6. **Design in Paper in full detail**: every page at desktop and phone, including the in-browser
   app demos (each project usable with mock data, prebuilt and light), the curated videos, Now and
   About. Two review rounds at most, then Noe decides.
7. **Build the approved design** on the Phase A foundation, then verify and ship as above.

**After shipping**

8. **Keys cleanup**: confirm nothing reads the old `.env.local` variables (the Firebase web config
   comes from Hosting's `/__/firebase/init.json`); ask Noe before deleting the file; run
   `~/Dev/AI/maiden-research-main/scripts/rotate-secret.sh --auditar`; restrict the Firebase web
   key to the noeosorio.com domains in the console; note it in NOE-558.

## Execution

- Each slice after the design is implemented by Sonnet subagents (Agent with `model: "sonnet"`)
  following `tasks.md`. Content and site build run in parallel only where files do not overlap
  (content files vs components); hosting runs after the build.
- Opus reviews every diff against this plan, the constitution and the quality bar before the next
  slice starts.
- Commits name NOE-558, stage files by name, and are pushed after each slice.

## Project Structure

### Documentation (this feature)

```text
specs/001-knowledge-hub-redesign/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/routes.md
├── checklists/requirements.md
└── tasks.md            (next step, /speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── content/            projects/, videos/, now.md, about.md, site.ts, topics.ts
├── content.config.ts
├── layouts/Base.astro
├── components/
├── pages/              index, projects/, videos/, now, about, privacy, 404, og/
└── styles/global.css
public/                 brand assets, fonts, project visuals, robots.txt
scripts/verify.mjs
firebase.json
astro.config.mjs
```

**Structure Decision**: a single static site at the repository root replacing the old React app.

## Complexity Tracking

Not needed: no constitution violations.
