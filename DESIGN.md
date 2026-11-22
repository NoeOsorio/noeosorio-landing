# Design System: noeosorio.com, the home of objects

The home is a night room with physical objects in it. Every section is one object you can touch: a galaxy that draws Noé's logo, a wallet of project passes, a passport with stamps, a slot machine for videos, a tip terminal, a robots terminal, a Subscribe button, and a footer that spells his name in light. The thread that ties them together is the LED dot matrix: small rounded squares that light up to form letters, logos and images.

This file describes what the code in `src/home/` does today. The approved design lives in `specs/002-home-objects/prototypes/`, and the rules come from `.specify/memory/constitution.md`. The other pages (About, Portfolio, Essay, Contact, Social, Privacy, 404) keep their own layout and are not covered here. Real content only; nothing invented.

## Theme and atmosphere

A dark room, quiet, with a few points of light. The page is warm off-black. Each object has its own materials (leather and paper for the passport, enamel and weave for the pass art, a cream screen for the tip terminal) but all of them sit on the same night and answer with the same lime light.

- **The object is the interface.** A section is not a card with a title above it. Navigation, state and feedback live inside the object: the lever pulls the reels, the stamps land on the page, the receipt prints.
- **Flat surfaces.** Objects get their depth from shape, a 1px top highlight and a soft dark shadow. No neumorphism, no glass as decoration, no blur behind panels, no gradients on buttons.
- **Short.** One-line subtitles, status messages of two to five words, nothing explained twice.

## Palette and roles

The brand comes from Noé's brandbook (hexagon mark, lime). The constitution names the lime #D6F35C and the home uses it everywhere.

- **Night** #0E0D0B: page background and the dark inside of every object. Never pure black.
- **Ink** #F4EEE4: primary text and headlines. Secondary text is ink at about 72% and the quietest text is about 48%, never lower.
- **Lime** #D6F35C: the one brand accent. Primary buttons, focus rings, the logo, lit state, the winning result. Text on lime is a dark green-black (#15210A).
- **LED lit** #9FD043: the tone of a lit dot in the matrices and of the dotted reel dividers.
- **LED hot** #F2FFD2: the brightest dot, for the pointer hover and the pulse that runs through a lit shape.
- **Glass fill** rgba(255, 248, 236, 0.07) with a line rgba(255, 248, 236, 0.14): the flat translucent surface used by the wallet's blocks and chips. It is a fill plus a 1px inner top highlight, not a blur.
- **Object materials** are local to the object and never leak out: passport leather #1C2633 and paper #EFE5CF with ink colors for stamps, the tip terminal's cream screen #F6F2EA and bezel #1D1C19, the receipt #F7F4EC, a warning red #C8382D for the judged tip. Each stays inside its object.

Banned: a second accent, purple or blue neon, gradient text, gray-on-gray cards, lowering text contrast below AA.

## Typography

- **Display:** Bricolage Grotesque, 600 to 700, tight tracking, for section titles and object headlines.
- **Body:** Geist, 400 to 600, for copy, buttons and the cookie card.
- **Mono:** Geist Mono, 500 to 600, for data and LED-adjacent labels: prices, dates, commit counts, stamps, status lines and the terminals.
- Titles carry hierarchy by size and weight. Copy lines stay short; labels are sentence case except where the object itself prints in capitals (the marquee, a card holder name, a passport cover).
- Fonts load before the galaxy measures its words.

## Components

Each object, in page order.

- **Top bar:** only the logo and the Subscribe button. The logo links home; the button scrolls to the Subscribe section. The bar floats over the hero and is not a navigation.
- **Idea galaxy (hero):** a canvas where the big concepts appear, collapse into stars, become planets on orbits and build the LED logo. Hover or tap a star to see the idea it came from. Clicking the logo bursts it and pulls it back. The canvas is `aria-hidden` and a screen-reader summary says what it shows.
- **Project wallet:** each project is a pass with its own art. Choosing one plays the pay animation with the logo, then opens a short pitch: price or availability first, then the problem, how it works, what is unique, platforms and the stack. One real action per project. A "Latest activity" list sits beside the pass.
- **Work passport:** a leather cover that opens on scroll. Each page is one job, newest first, with a main stamp and skill stamps that land as the page appears.
- **Learning out loud (slot machine):** a cabinet with a lever, three LED reels, a marquee and a ticket that prints a real video with a Watch link. Topic chips filter a list of the latest videos beside it, with a link to all videos on YouTube.
- **Tip terminal:** a payment terminal with three tips and "No tip". A tip plays the thank-you and goes to the tip jar, with a visible fallback link. "No tip" plays the judged sequence and offers subscribing instead.
- **Robots terminal:** an "I'm a robot" reverse captcha. A human-looking pointer path fails with a joke; keyboard or machine-like input passes and the terminal shows `/llms.txt` with Copy and Open raw.
- **Subscribe:** today it is the YouTube button. Its design is on hold by Noé's decision and will be redone in its own change; do not restyle it here.
- **Footer:** two link columns, a "now" line, Back to top, Privacy and Cookie settings (which reopens the consent card), and Noé's name as a large LED matrix canvas with the name as its accessible label.
- **Cookie card:** a flat floating card, 18px radius, near-black #171714 with a 1px lime inner ring at low opacity, bottom left on desktop and full width on mobile. One sentence and a Privacy link. Accept and decline are the same size and weight.
- **Buttons:** primary is a lime fill with dark text; on pass pitches the primary is ink on dark. Press scales to 0.97. Chips and secondary buttons use the glass fill. Focus is a 2px lime ring with a 3px offset.
- **LED dot matrix:** one rounded square per lit cell on a small grid, with a gap of about 18% of the cell. Letters, the logo and thumbnails are drawn into the grid and lit. Pointer proximity brightens nearby cells toward hot.

## Layout

- Sections run in this order: galaxy, project wallet, passport, learning, tips with the robots terminal, Subscribe, footer.
- Each object is designed first as a full-width scene on desktop at 1440 and 1280, then at 768 and 390. Nothing floats in an empty desk with borders around it.
- Side gutter is `max(16px, 4vw)` with safe-area insets. No horizontal scroll at any width. Tap targets are at least 44px on small screens.
- Every list is designed to hold 1000 items (search, filters, dense view). The wallet and the video list stay short by design, newest first, and link out to the full list on YouTube and the portfolio.
- Content lives in `src/home/data/`, one typed file per section. Components and mount scripts only render it; the same fact is never typed in two places.

## Motion

- Load `emil-design-eng` before writing or changing any motion code.
- Easing is a strong ease-out, `cubic-bezier(0.23, 1, 0.32, 1)`. Press feedback is about 160ms.
- Every motion respects `prefers-reduced-motion`: reduced motion shows the finished state of each object (finished galaxy, stamped pages, printed ticket) and keeps only fades. Hover labels and links still work.
- Loops pause when their section is off screen and when the tab is hidden. Leaving the home and coming back leaves no extra loops, timers, listeners or canvases behind.
- The galaxy completes its logo within 16 seconds of landing without any input.

## Performance on iPhone

Learned the hard way in this build (the Essay page crashed on iPhone and the galaxy rendered at double size on Retina).

- Keep GPU layer memory low. No stacks of full-size 3D copies to fake thickness; use one thickness layer and draw at the real on-screen size on small screens.
- Every canvas has an explicit CSS width and height. Never rely on the intrinsic size, which doubles on Retina screens.
- The canvases cap their pixel ratio at 2.
- Test every canvas and 3D section at 2x and 3x pixel ratios on a real or simulated iPhone, not only on a laptop.
- Lighthouse performance, accessibility and SEO at or above 90 on mobile, measured.

## Anti-patterns

From the constitution, applied to everything on the home:

- No middle dot as a separator, anywhere, including docs and commit messages.
- No numbering for its own sake, no cartoon titles, no invented terms.
- No colored accent bar on the left edge of anything.
- No box inside a box inside a card, no hairline dividers as default structure.
- Nothing said twice on one screen. No keyboard shortcuts printed on the surface (tooltips only). No counters, dates or metadata that do not help the next action.
- No vendor or model names in anything a visitor sees.
- No invented content: every claim, project, date and price is true and checkable. Private and joke projects never appear as real ones, and no single project becomes Noé's identity.
- No glass as decoration, no neumorphism, no gradient on buttons, no neon glow, no pure black.
- No second accent color and no brand color other than lime without a stated reason.
- No broken links, and no section that looks good only with five items.
