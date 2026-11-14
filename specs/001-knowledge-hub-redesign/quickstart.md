# Quickstart: validate the knowledge hub end to end

## Prerequisites

- Node 20 or newer, run from the worktree `noeosorio-landing-noe-558`.
- No secrets are needed.

## Run

```bash
npm install
```

```bash
npm run build && npm run preview
```

## Validate (each must pass before anyone says it is done)

1. `npm run verify` crawls the built site and must report zero failures for:
   - internal links, external links and images;
   - every old URL in `contracts/routes.md` redirecting to its target in the hosting config;
   - three made-up URLs answering 404 with the site's 404 page;
   - forbidden text: the middle dot character, "we", vendor names, numbers without a source;
   - unique title, description, canonical and preview image per page.
2. Screenshots of every page at 1440, 768 and 390 px land in `verification/screens/` and are
   compared by an independent reviewer with the approved Paper design.
3. Lighthouse on the home page, mobile: performance, accessibility and SEO each at least 90.
4. Content check: add a new project file and edit `now.md`; rebuild; both appear without touching
   any component.
5. Real cases from Noe:
   - "my real self, not invented": a reviewer who does not know Noe describes him after 5 seconds
     on the home page; it matches the verified profile.
   - "the podcasts, the video projects, the apps I make": the eight approved projects and the
     approved videos appear; nothing he excluded appears.
6. After a preview deploy (with Noe's yes), repeat steps 1 and 3 against the preview URL and paste
   three page URLs into a link preview checker.
