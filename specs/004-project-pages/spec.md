# Feature Specification: Project pages

**Feature Branch**: `noe-558-proyectos`

**Created**: 2026-11-22

**Status**: Direction approved by Noe (2026-11-22); static designs pending approval

**Input**: User description: "Redesign the rest of the site with what we have here, starting with the project pages, including Essay Studio."

Noe's choices (2026-11-22): each project page is "the card opens"; /portfolio becomes the full wallet; /essay keeps its 3D model.

## Context (inventory, 2026-11-22)

- No project page exists. /portfolio/:id, /landing/:id, /b2b/:id and /open-source/:id all redirect to /portfolio. Their detail components and data are dead code with unrelated old content.
- Seven of the eight home wallet cards point to URLs that show the "not found" page: /maiden-os, /whiteboard, /telar, /porter-galaxy, /sim-world, /kanji, /pyventa. Only /essay exists.
- /portfolio is an old list of 8 projects in the previous style. Its social preview image does not exist.
- /essay has a scroll-driven 3D model, four captions, four detail items, an email waitlist (create-only), a code link, and Spanish/English. Its canonical and social URLs point to the home, its social image path is relative, and its locale is fixed to English.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A card opens into its project (Priority: P1)

A visitor opens a card in the home wallet and wants more. The card becomes the cover of that project's own page. The page is made of the card's material, and the visitor understands in seconds what it is, what it costs, and what to do next.

**Why this priority**: the cards are the most loved part of the home, and today seven of them lead nowhere.

**Independent Test**: from the home, open each of the 8 cards and follow it to its page; open each page URL directly; every page shows its project, never the "not found" page.

**Acceptance Scenarios**:

1. **Given** the home, **When** the visitor follows a card to its page, **Then** the card visibly travels and becomes the page cover, playing its "in use" build. With reduced motion it appears in place.
2. **Given** a project page, **Then**, in order:
   - the cover card
   - the one-line promise (`head`)
   - price first
   - the problem, how it works, and what makes it unique, from the existing pitch data
   - a real demo or video when one exists
   - the platforms
   - the action button when the project has one
3. **Given** each project, **Then** the page surface uses that card's material, never a generic page:
   - Telar: woven cloth
   - Kanji: washi notebook
   - Pyventa: receipt paper
   - Porter Galaxy: space
   - Maiden OS: chat
   - Whiteboard: enamel board
   - Sim World: water
   - Essay Studio: paper
4. **Given** the page URL is opened directly or shared, **Then** it loads that page with its own title, description and social preview image.

### User Story 2 - The full wallet at /portfolio (Priority: P2)

A visitor wants to see everything Noe has built. /portfolio shows every card as a wallet, with search and topic filters, and each card opens its page.

**Why this priority**: it is the index of all projects and must hold up as the list grows.

**Independent Test**: open /portfolio, search by name, filter by topic, open a card. Then repeat with a test list of 1,000 cards and check that search, filters and scrolling stay usable.

**Acceptance Scenarios**:

1. **Given** /portfolio, **Then** every project with a card appears in the same card style as the home, most recent first.
2. **Given** a search term or a topic, **Then** only matching cards show, and an empty result shows a short empty state without explanation.
3. **Given** 1,000 cards, **Then** the page stays smooth and searchable, with a dense view.

### User Story 3 - Essay Studio in the new frame (Priority: P2)

A visitor lands on /essay. It keeps its 3D model and waitlist, but now belongs to the same site: header, star field, cover card and home footer. Its social preview shows Essay Studio correctly in each language.

**Independent Test**: open /essay in Spanish and English, scroll the 3D model, submit the waitlist, and check the social preview tags.

**Acceptance Scenarios**:

1. **Given** /essay, **Then** the 3D scroll and its captions work as today, and the waitlist still accepts an email and rejects an invalid one.
2. **Given** /essay?lang=en and the Spanish default, **Then** the canonical URL, social URL and social image are absolute and point to /essay, and the locale matches the language.
3. **Given** an iPhone, **Then** /essay does not crash or freeze (it did before) and its memory stays within the limit.

### Edge Cases

- **Unknown project URL:** a URL like /something-unknown shows the site's "not found" page, styled in the new look, with a way back to the wallet.
- **Old links:** /portfolio/:id, /landing/:id, /b2b/:id and /open-source/:id resolve to the matching new project page when the id matches one, and to /portfolio otherwise.
- **No demo or video:** the section is simply absent; there is no placeholder.
- **No action button:** for example, Maiden OS is "Not available yet". The page shows its status line and no dead button.
- **Arriving directly on a page:** with no card flight, the cover simply builds in place.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Each of the 8 wallet projects MUST have its own page at the URL its card already uses:
  - /maiden-os
  - /essay
  - /whiteboard
  - /telar
  - /porter-galaxy
  - /sim-world
  - /kanji
  - /pyventa
- **FR-002**: A project page MUST use only real data that already exists for that project. Its sections, in order:
  - cover card
  - promise
  - price
  - problem
  - how
  - what makes it unique
  - demo or video if one exists
  - platforms
  - action

  Copy stays short, never explains the design, and contains no middle dots.
- **FR-003**: Each page MUST take the material of its card for its surface and details; a generic template is not acceptable.
- **FR-004**: Moving from a card on the home or /portfolio to its page MUST read as the card opening into the page. Reduced motion shows the page without the flight.
- **FR-005**: /portfolio MUST show every project card with search and topic filters. It must be usable at 1,000 items, with a dense view.
- **FR-006**: /essay MUST keep its 3D scroll, captions, details, waitlist (same data written, same validation) and both languages. It gains the site header, the star field, the cover card and the home footer.
- **FR-007**: Every page MUST have a correct title, description, canonical URL, social URL and absolute social image. /essay's locale follows its language.
- **FR-008**: Old detail routes MUST redirect to the matching new page, or to /portfolio. The dead detail components and their unrelated data are removed only after confirming nothing uses them.
- **FR-009**: No link on the site may land on the "not found" page. The link check MUST open pages in a real browser, not just read status codes.
- **FR-010**: Nothing may scroll horizontally at 320 to 2000 px. Lights fade to zero before edges. There is no neumorphism.
- **FR-011**: iPhone memory per page MUST stay within the home's current level (about 300 MB peak at the iPhone test size).
- **FR-012**: Static designs of a project page, /portfolio and /essay MUST be approved by Noe before they are built.

### Key Entities

- **Project**: one wallet entry: name, topic, card art and motion, pitch (head, problem, how, edge, price, note, action, platforms), optional demo or video, page URL.

## Success Criteria *(mandatory)*

- **SC-001**: 8 of 8 home cards lead to a real project page, checked in a real browser.
- **SC-002**: A first-time visitor can say what each project is and what to do next within 10 seconds of landing. An independent reviewer checks this for every page.
- **SC-003**: /portfolio search and filters return results instantly with 1,000 test cards.
- **SC-004**: The /essay waitlist works in both languages, and its social preview shows Essay Studio, not the home.
- **SC-005**: There are zero console errors, no horizontal scroll and no not-found landings across all new pages at 320, 390, 768 and 1440 px, in Chromium and WebKit.
- **SC-006**: iPhone peak memory per page is at or under the home's current level.

## Assumptions

- The pitch data in the home wallet is the single source of truth for project content. Pages read it; they do not copy it.
- Videos come from the existing "Learning out loud" data when a video is about that project. Otherwise there is no video section.
- Demo links are the existing action links: the Sim World play link, code repositories, the Essay waitlist and the Pyventa request.
- Out of scope for this feature: About, Services, Contact, Social, Privacy and the 404 page beyond the minimum restyle in the edge cases.
