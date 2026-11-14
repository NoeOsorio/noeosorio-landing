# Feature Specification: noeosorio.com as Noe's knowledge hub

**Feature Branch**: `noe-558-rediseno-porter`

**Created**: 2026-11-14

**Status**: Draft

**Input**: User description (Noe, 2026-11-14, translated): "I'm not looking for a job. I want my page to be my knowledge hub, where I share everything I know and what I like doing: the podcasts, the video projects, the apps I make, the essays I write, like a blog, everything I'm learning. But it has to be real, my real self, because my real self is very cool." Direction chosen in Paper: «noeosorio.com, Product Engineer & Org Psychology» (dark, English). Linear: NOE-558.

## Context

The live site presents an invented agency: unsupported numbers ("50+ projects", "100% optimized code", "400%"), a "we" voice, priced service packages, outdated roles, broken footer links, fake app store links and a developer error page for any unknown URL. A full map of the current site lives in the Paper file «noeosorio.com, sitio actual (antes)», and the critique and the verified profile of Noe live in NOE-558 («Quién es Noe»).

Who Noe is (verified): a Mexican Product Engineer at Porter in New York, a master's student in organizational psychology, who builds AI tools with real safeguards and AI that makes people think instead of thinking for them, and tells his story on video. He has taught since 2020 (a debate podcast, livestreams, a coding academy).

Projects Noe approved for the site: Maiden OS, Essay Studio, Whiteboard, Telar, Kanji Study App, Sim World, Porter Galaxy, Pyventa Web (credited as the web redesign he did, one project among many). Not on the site: CFO Personal, AgentFlow, KOS, joke apps, deleted or private projects (Proyecto Ironman), anything framed as his main identity.

## Clarifications

### Session 2026-11-14

- Q: Which videos go in the library? → A: Only long videos, chosen for quality from any year, not only 2026. Each one should work like an essay video: a message for the community with clear takeaways. Shorts stay on social networks.
- Q: Does the essays section ship now? → A: No. It is added in a later spec when Noe has his first essay.
- Q: How much work history goes in About? → A: His story plus companies and years (Smartkode, Finloop, Clip, Osmind, Apex Systems, Porter), the master's, and teaching since 2020.
- Q: Does the podcast go in? → A: Not now. Qué Dirían and the first-job podcast did not continue; a podcast is added later only if Noe starts one tied to his brand.
- Q: Analytics? → A: Firebase Analytics, for real analytics, with a real consent banner (Noe, 2026-11-14; replaces the earlier cookie-less choice).
- Q: Static pages? → A: Only with evidence of a 3x to 10x improvement. Measured: same page and design, largest content visible 5.30 s to 1.65 s, JavaScript 323 KB to 0 KB, total weight 367 KB to 57 KB, score 78 to 99 (research.md R2).
- Q: Redesign now? → A: No. First the restructuring of what exists today. Nothing of the redesign is approved until Noe has seen it in full detail in Paper.
- Q: Logo? → A: SVG.
- Q: Project visuals? → A: We capture them, and present them in a new way: an in-browser demo of each app with mock data, prebuilt and optimized, that feels like using the app instead of looking at a photo.
- Q: The project named «Maiden, Noe Osorio»? → A: Maiden OS (or just Maiden).

## Delivery phases

- **Phase A, restructuring (this spec's first deliverable)**: same look as today (the Paper file «noeosorio.com, sitio actual (antes)» is the visual reference), rebuilt as static pages, with everything broken fixed: links, real 404, per-page link previews, image weight, Firebase Analytics behind a real consent banner, redirects. [NEEDS CLARIFICATION: does Phase A also replace the invented copy (numbers, «we», prices) with real content in the same layout, or does copy wait for Phase B?]
- **Phase B, redesign**: the hub described below (projects with in-browser demos, curated videos, Now, About), designed in Paper in full detail and approved by Noe before any code.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand who Noe is in one screen (Priority: P1)

A visitor arriving from a video, a social profile or a search lands on the home page and, without scrolling, understands who Noe is (Product Engineer in New York who builds AI tools and studies people), sees his most recent work, and has one clear way to go deeper.

**Why this priority**: the home page is where the invented agency lives today; replacing it with the real Noe is the core of the redesign.

**Independent Test**: open the home page at 1440, 768 and 390 px; a reviewer who has never heard of Noe writes down who he is and what he makes after 5 seconds; compare with the verified profile.

**Acceptance Scenarios**:

1. **Given** a first-time visitor on desktop, **When** the home page loads, **Then** the first screen states his name, "Product Engineer", New York, and what he builds, in the first person, with one primary action.
2. **Given** any page, **When** a reviewer reads all text, **Then** there is no number without a source, no "we", no service price, no vendor name, and no middle dot.
3. **Given** a visitor on a phone, **When** the home page loads, **Then** the same story is clear without horizontal scrolling and every tap target is comfortably tappable.

---

### User Story 2 - Explore the projects (Priority: P1)

A visitor opens Projects and finds the eight approved projects, each with what it is in one sentence, what makes it interesting, real visuals (screenshots or video, never a broken image or a logo as a stand-in), and a working way to try it, watch it or read the code when public.

**Why this priority**: his projects are the proof the brand rests on.

**Independent Test**: open every project page; every link resolves; each project can be tried through an in-browser demo with mock data; private projects show no repo link.

**Acceptance Scenarios**:

1. **Given** the Projects page, **When** it loads, **Then** exactly the eight approved projects appear, Pyventa Web is labeled as his web redesign, and no project is presented as his identity.
2. **Given** a project whose code is private (Maiden OS, Telar, Whiteboard), **When** its page opens, **Then** it shows screenshots or a video and no link to a repository.
3. **Given** a public project (Essay Studio, Kanji Study App, Sim World, Porter Galaxy), **When** its page opens, **Then** it links to its live demo or repository and both links work.

---

### User Story 3 - Watch his best videos (Priority: P2)

A visitor who knows Noe from YouTube or TikTok finds a curated library of his long videos, each presented like an essay: what it is about and its key takeaways, and plays it without dead ends.

**Why this priority**: video is where most of his audience already is, and each selected video carries a message worth keeping.

**Independent Test**: open the video library; search and filter; open five videos; each shows its takeaways and plays.

**Acceptance Scenarios**:

1. **Given** the video library, **When** it loads, **Then** it shows only the long videos Noe approved, each with a one-line summary and two to four takeaways.
2. **Given** the library, **When** a visitor searches a word in a title or takeaway, **Then** matching videos appear instantly and the rest hide.
3. **Given** a library of 1000 items, **When** it loads, **Then** it stays usable through search, topic filters and a dense list view.
4. **Given** a video, **When** clicked, **Then** it plays on the site or opens on YouTube, never a broken link.

---

### User Story 4 - See what Noe is doing now (Priority: P3)

A visitor opens Now and sees what Noe is building, studying and recording this month.

**Why this priority**: it shows he is active without relying on stats that age.

**Independent Test**: edit the Now content file; after the next build the page shows the new text and its last updated date.

**Acceptance Scenarios**:

1. **Given** the Now page, **When** visited, **Then** it shows what Noe is building, studying and recording this month, with the date it was last updated.
2. **Given** an edit to the Now content file, **When** the site is built, **Then** the page reflects it and no component code changed.

---

### User Story 5 - Nothing is broken (Priority: P1)

Every link, image and URL on the site works, old URLs land somewhere useful, unknown URLs show a real 404 page in the site's style, and links shared on WhatsApp, LinkedIn or X show the right title and preview for each page.

**Why this priority**: the current site fails here on every page.

**Independent Test**: crawl every internal link, check every external link, request ten old URLs and three made-up URLs, and paste three page URLs into a link preview checker.

**Acceptance Scenarios**:

1. **Given** an old URL (for example /services/web-app, /portfolio/osmind, /about), **When** requested, **Then** it redirects to the closest new page.
2. **Given** a made-up URL, **When** requested, **Then** the visitor sees the site's 404 page with a way home, and the server answers with status 404.
3. **Given** any page URL shared in a chat app, **When** the preview renders, **Then** it shows that page's own title, description and image.

---

### User Story 6 - Reach Noe (Priority: P3)

A visitor who wants to talk to Noe finds his email and his social profiles (YouTube, TikTok, Instagram, LinkedIn, GitHub, X) from any page.

**Independent Test**: from three different pages, reach the email and each profile in at most two clicks; every profile link opens the right account.

**Acceptance Scenarios**:

1. **Given** any page, **When** a visitor looks for contact, **Then** the email and social links are reachable and correct.

### Edge Cases

- A project with no public demo or repo: shows visuals only, never a disabled or fake button.
- A video removed from YouTube: the link check flags it and it is taken out instead of showing a broken embed.
- A page with no image of its own: uses a generated preview card in the brand style, never a blank or the home image.
- A visitor with reduced motion enabled: no animation plays.
- A visitor who rejects analytics or blocks trackers: nothing is tracked and the site works the same.
- An empty section: shows a short, useful empty state, never placeholder text.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST be in English, written in the first person, and describe Noe as a Product Engineer in New York.
- **FR-002**: The site MUST NOT show any number, claim, role or project that is not in the verified profile or confirmed by Noe.
- **FR-003**: The site MUST have these areas: Home, Projects (list and one page per project), Videos (list and one page per video), Now, About, and a 404 page.
- **FR-004**: Projects MUST contain only the eight approved projects, each with a one-sentence description, why it is interesting, real visuals, and working links where public.
- **FR-005**: Videos MUST each be searchable and filterable and remain usable with 1000 items (search, filters, dense view).
- **FR-006**: The video library MUST contain only long videos from Noe's YouTube channel @noeosoriodev that he approved for quality, from any year, each with a one-line summary and two to four takeaways written from the video itself. A shortlist with proposed takeaways is prepared for Noe's approval before launch.
- **FR-007**: There is no podcast area in this version.
- **FR-008**: Adding a project, a video or a "Now" update MUST only require adding or editing a content file.
- **FR-009**: Writing is NOT part of this version; it is added in a later spec when Noe has his first essay. The content model MUST NOT block adding it later.
- **FR-010**: About MUST tell his story (Puebla to New York, the master's, teaching since 2020 with Qué Dirían and Sakura Kode Academy) and his work history with company names and years (Smartkode, Finloop, Clip, Osmind, Apex Systems, Porter), using only verified facts.
- **FR-011**: Every internal and external link MUST resolve; old URLs MUST redirect to the closest new page; unknown URLs MUST show the 404 page with HTTP status 404.
- **FR-012**: Each page MUST serve its own title, description, canonical address and preview image in the HTML a link preview or crawler receives.
- **FR-013**: The visual identity MUST use Noe's brandbook (hexagon monogram, lime #D6F35C, petrol #175462 and #052D37, white) and follow the approved Paper design.
- **FR-014**: The site MUST NOT contain: invented metrics, an agency voice, service packages or prices, the SakuraKode promo, "available for roles" messaging, confidentiality placeholders, broken images, fake app store links, vendor names, or the middle dot character.
- **FR-015**: Visits MUST be measured with Firebase Analytics only after the visitor accepts; Accept and Reject MUST be equally visible; the privacy page MUST be linked from the banner and the footer.
- **FR-016**: Contact MUST be by email and social links; no contact form is required.

### Key Entities

- **Project**: name, one-sentence summary, why it is interesting, visuals, status (public or private), links (demo, repo, video), order.
- **Video**: title, date, thumbnail, length, link, one-line summary, takeaways, topics.
- **Now entry**: what he is building, studying and recording, last updated date.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 4 of 5 reviewers who do not know Noe describe him correctly (Product Engineer in New York who builds AI tools and studies people) after 5 seconds on the home page.
- **SC-002**: Zero invented or unsourced numbers, zero "we", zero vendor names and zero middle dots across the whole site, checked by a full text scan.
- **SC-003**: Zero broken internal or external links and zero broken images in a full crawl; ten old URLs and three made-up URLs behave as specified.
- **SC-004**: Shared links for the home, a project and the About page show their own title and image in a link preview checker.
- **SC-005**: A visitor finds a specific video by a word in its title or takeaways in under 10 seconds.
- **SC-006**: Home page on a phone scores at least 90 in performance, accessibility and SEO in a standard audit.
- **SC-007**: Noe adds a new project and a new "Now" update without touching component code, and both appear after the next build.
- **SC-008**: Independent reviewers (usefulness, filler, design against the brandbook and Noe's rules, mobile) each score the result at least 8 of 10.

## Assumptions

- The Paper direction «Product Engineer & Org Psychology» is the starting point for the design, adjusted to remove its own rule violations (numbered labels, middle dot separators, nested boxes, counters) and to stop featuring Pyventa as the flagship.
- Hosting stays on Firebase Hosting under noeosorio.com; production deploys happen only with Noe's approval.
- No writing section, podcast, newsletter or contact form in this version; they would need new services and Noe's approval.
- Old pages (Services, service details, the old case studies, Social) are retired and redirected.
- Noe provides or approves project screenshots and videos for the private projects.
- The live site stays as is until Noe approves the new one; the redesign is previewed on a non-production address first.
