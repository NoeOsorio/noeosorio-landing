# Research: noeosorio.com as Noe's knowledge hub

Each decision lists what was chosen, why, and what else was considered.

## R1. Root cause of what is broken today

The live site is a client-only single page app behind a Firebase rewrite of every path to
`/index.html`. That one design decision produces most of the technical failures found in the
audit (NOE-558):

- Every URL answers 200, so there is no real 404 and made-up paths render a developer error.
- Crawlers and link previews receive the same `<head>` for every page (same title, description,
  canonical and image), because per-page tags are only set after JavaScript runs.
- Content and copy are spread across components and data files that drifted (footer links to
  Spanish paths, a sitemap listing routes the code no longer has, a deploy that does not match the
  repo).

The content failures (invented numbers, agency voice, prices) come from a second root cause: the
copy was written to look like a company, not taken from Noe's real work.

## R2. Rendering: static HTML per page

- **Decision**: rebuild the site as a static site where every page is rendered to its own HTML file
  at build time, using Astro 5 with content collections. Interactive parts (video search and
  filters) are small client islands.
- **Rationale**: each page ships its own title, description, canonical and preview image in the
  served HTML; unknown paths fall through to a real `404.html` served with status 404; content
  lives in typed collections (one source of truth); almost no JavaScript ships, which makes the
  90+ mobile scores realistic. It removes the class of failure instead of patching it.
- **Alternatives considered**:
  - Keep the Vite React app and add a prerender plugin: keeps a router, lazy loading and a catch-all
    rewrite that all have to be bent into static output; more moving parts for a content site.
  - Next.js static export: heavier runtime and build for no gain here.
  - Patch the current app (fix footer links, add an error route, add meta per route): leaves the
    soft 404 and the shared head for crawlers, so it hides the symptom.

### Evidence (measured 2026-11-14, Lighthouse 12.1 mobile, median of 3 runs each)

Same home page, same design and CSS, served the same way locally with compression. The only
difference is how the HTML is produced: the current published build (client-rendered) versus a
static HTML snapshot of the same page.

| Metric | Current site | Same page, static | Change |
|---|---|---|---|
| Performance score | 78 | 99 | |
| Largest content visible | 5.30 s | 1.65 s | 3.2x faster |
| Time to interactive | 5.31 s | 1.65 s | 3.2x faster |
| JavaScript transferred | 323 KB | 0 KB | none needed to read the page |
| Total transferred | 367 KB | 57 KB | 6.4x lighter |
| Requests | 23 | 11 | 2.1x fewer |

Live site for reference (same tool, production): home 78 (largest content 5.1 s), portfolio 91,
about 89; each page ships about 300 KB of JavaScript, 124 KB of it unused.

Caveat: the static snapshot has no interactivity; a real build adds a few kilobytes for the mobile
menu and the cookie consent, still far from 323 KB. Fonts still load from Google in both; self-hosting
them would improve the static version further. Per-page link previews and a real 404 are yes or no
properties the current architecture cannot provide.

## R3. Keep or replace the current code

- **Decision**: replace the application code in the same repository (`NoeOsorio/noeosorio-landing`)
  on the branch `noe-558-rediseno-porter`. The old app stays in git history and in the Paper file
  «noeosorio.com, sitio actual (antes)».
- **Rationale**: almost every page, data file and component of the old app is retired by the spec
  (services, prices, case studies, lead form, cookie banner, Firebase SDK). Reusing it would mean
  deleting most of it anyway.
- **Alternatives considered**: a new repository (loses the history and the Firebase setup for no
  benefit).

## R4. Hosting, redirects and previews

- **Decision**: stay on Firebase Hosting (project `noeosorio-web`). Remove the catch-all rewrite;
  add explicit 301 redirects for every retired URL; long cache headers for hashed assets; a preview
  channel URL for Noe's review before production.
- **Rationale**: no migration of DNS or hosting; Firebase serves `404.html` with status 404 when no
  rewrite matches; preview channels give a private-by-obscurity URL that expires.
- **Alternatives considered**: Vercel or Cloudflare Pages (would need DNS changes and a new account
  for no clear gain).
- **Needs Noe**: a Firebase preview deploy exposes a temporary URL on the internet and a production
  deploy replaces the live site; both need his explicit yes at that moment.

## R5. Analytics

- **Decision (Noe, 2026-11-14)**: keep Firebase Analytics for real analytics, with a real consent
  banner: Accept and Reject equally visible, nothing tracked until Accept, privacy page linked.
- **Rationale**: Noe wants full analytics of how the site performs and accepts the banner.
- **Note**: the Firebase web config is served by Firebase Hosting itself at
  `/__/firebase/init.json`, so the site does not need it in a `.env` file.
- **Rejected**: GoatCounter and other cookie-less tools (Noe prefers Firebase).

## R6. Videos

- **Decision**: a curated content collection of long YouTube videos chosen by Noe, each with a
  summary and two to four takeaways written from the video. Thumbnails come from YouTube's image
  CDN; playback uses a click-to-load embed from `youtube-nocookie.com` so no YouTube code or cookie
  loads until the visitor presses play.
- **Rationale**: Noe wants each video to read like an essay; automatic feeds would pull in Shorts
  and weak uploads. Click-to-load keeps pages fast and private.
- **Alternatives considered**: automatic sync from the channel feed (no curation, no takeaways);
  full embeds on load (slow, sets cookies).
- **Input**: an agent is reviewing every long video on @noeosoriodev to propose the shortlist with
  takeaways; Noe approves it.

## R7. Search and filters at 1000 items

- **Decision**: build-time JSON index of the video collection plus a small client island that
  filters in memory by text and topic, with a dense list view. Projects stay a short curated grid
  (eight by design) but reuse the same list component so they scale the same way.
- **Rationale**: 1000 entries of title, summary, takeaways and topics is well under 1 MB; filtering
  in memory is instant and needs no service.
- **Alternatives considered**: a hosted search service (cost and a new dependency for no need).

## R8. Preview images per page

- **Decision**: generate one preview image per page at build time from a brand template (logo,
  page title, petrol and lime), using Satori and resvg through an Astro endpoint.
- **Rationale**: adding a project or video automatically gets its own preview, satisfying the
  "content file only" rule.
- **Alternatives considered**: exporting images from Paper by hand per page (breaks the rule each
  time content is added).

## R9. Brand assets and type

- **Decision**: use the hexagon monogram from the brandbook (`noeosorio-brandbook/PNG`), converted
  to optimized SVG if Noe provides it from the `.ai`, otherwise to WebP at the needed sizes. Colors
  from the brandbook. The logo lettering font (Procret Bold) is not available, so the wordmark is
  used as an image and the site type comes from the approved Paper design (the Porter direction
  uses Bricolage Grotesque and Geist Mono, both available and self-hosted).
- **Needs Noe**: an SVG export of the logo from `LOGO - NOE.ai` (two minutes in Illustrator), or his
  OK to use the PNG.

## R10. Secrets

- **Decision**: the new site needs no secrets. The Firebase web SDK, the lead form API and their
  variables are removed. `.env.local` in the main checkout is no longer read; Noe can delete it.
- **Rationale**: the keys rule is satisfied by having nothing to hide.

## R11. Verification without unit tests

- **Decision**: a Playwright script that builds the site, serves it, crawls every internal link,
  checks external links, checks every image, requests the old and made-up URLs, scans all text for
  forbidden patterns (middle dot, "we", vendor names, unsourced numbers), and takes screenshots at
  1440, 768 and 390. Lighthouse runs locally on the home page on mobile. Independent reviewer
  agents grade the screenshots against the spec and the approved Paper design.
- **Rationale**: matches the constitution: done is what a visitor sees.
