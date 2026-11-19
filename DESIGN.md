# Design System: noeosorio.com, design A (warm glass)

Design A is the site that ships now, with Noe's real content, while the "Noe OS / Sinapsis" redesign is finished. It keeps what already works (dark canvas, lime accent, glass surfaces) and raises the craft. Real content only; nothing invented.

## 1. Visual Theme & Atmosphere

A night studio seen through frosted glass. The page is dark and quiet; light comes from a few warm sources (a lime glow behind the hero, the glow of each project's screenshot), and every surface that holds content is a pane of frosted glass that lets that light through. Calm, confident and personal, like a well-kept workbench at night, never a SaaS landing page.

- **Density:** 4, balanced. Room to breathe, but every section earns its height.
- **Variance:** 7, offset asymmetric. Left-aligned hero, zig-zag projects, an uneven grid for the four areas. Nothing centered by default.
- **Motion:** 5, fluid CSS. One orchestrated entrance, soft hover lifts, a slow glow drift. No perpetual noise.

## 2. Color Palette & Roles

Brand colors come from Noe's brandbook (hexagon mark, lime, petrol). Brand fidelity wins over generic rules.

- **Night Canvas** (#0E0D0B) — page background. Warm off-black, never pure black.
- **Ember Depth** (#17140F) — section bands and the footer, one step above the canvas.
- **Frosted Glass** (rgba(255, 248, 236, 0.045)) with `backdrop-filter: blur(24px) saturate(140%)` — every content surface (project panels, area tiles, contact). A 1px inner highlight on the top edge (rgba(255, 248, 236, 0.10)) gives the glass its edge; no outer border.
- **Glass Hover** (rgba(255, 248, 236, 0.07)) — the same pane, one step brighter on hover.
- **Warm Ink** (#F4EEE4) — primary text and headlines.
- **Quiet Ink** (rgba(244, 238, 228, 0.66)) — body and secondary text. Never lower than this on the canvas: the current faint grays (≈0.4) fail contrast and are removed.
- **Petrol Shadow** (#052D37) — deep tint used only inside glows and image shadows, so light feels warm-cool instead of flat.
- **Lime Signal** (#D6F35C) — the single accent: the primary button, focus rings, the one highlighted word of each headline, active nav. Used sparingly; at most one lime element per viewport.
- **Lime Glow** (radial-gradient, rgba(214, 243, 92, 0.16) to transparent) — ambient light behind the hero and behind the active project only.

Banned: a second accent, purple or blue neon, gradient text on large headlines (one solid lime word instead), gray-on-gray cards.

## 3. Typography Rules

- **Display:** Bricolage Grotesque, 600 to 700. Track-tight (-0.025em). Hero `clamp(2.75rem, 5.5vw, 4.5rem)`, section titles `clamp(1.9rem, 3.2vw, 2.6rem)`. Hierarchy by weight and the single lime word, not by size jumps.
- **Body:** Geist, 400, 1.0625rem, line-height 1.6, max 62 characters per line, Quiet Ink.
- **Mono:** Geist Mono, 500, 0.8125rem, letter-spacing 0.04em — dates, tech stack, small labels. Sentence case, never all caps.
- **Editorial accent:** Instrument Serif italic, only for pull quotes from Noe's own videos and essays. Never in UI controls.
- **Banned:** Inter, generic serifs, all-caps eyebrows on every section, more than two weights in one block.

## 4. Component Stylings

- **Primary button:** Lime Signal fill, Night Canvas text, 999px radius, 48px tall, 0 22px padding. Hover lifts 1px and brightens 4%; active presses to `scale(0.97)`. No glow. One per screen.
- **Secondary action:** a text link in Warm Ink with an arrow that slides 3px on hover. No outlined ghost buttons next to the primary.
- **Glass panel:** Frosted Glass, 24px radius, padding 28px to 36px, top-edge highlight, shadow `0 30px 80px -30px rgba(5, 45, 55, 0.55)` (petrol-tinted, diffuse). Panels never nest: no box inside a box. Inside a panel, group with spacing and type weight.
- **Project panel:** the real screenshot is the hero of the panel (16:10, 16px radius, sits on its own glow). Name, one-line description, the stack in Geist Mono as plain text separated by commas (no pills), and one link.
- **Area tile (the four areas):** glass panel with a small brand-drawn line icon, the area name and one sentence in Noe's words. Hover brightens the glass and reveals the related project names.
- **Nav:** a floating glass bar, 56px, centered max-width 1120px, sticky with 16px top offset. Logo mark left, four links, one lime "Contact" button right. Collapses to a sheet on mobile.
- **Images:** every image has its alt text and a fixed aspect ratio; while loading, a glass skeleton of the same size.
- **Focus:** 2px lime ring with 3px offset on every interactive element.

## 5. Layout Principles

- Max width 1200px content, 1360px for the hero glow. Side gutter `max(20px, 5vw)`.
- Section rhythm: vertical gap `clamp(4.5rem, 10vw, 8rem)`.
- **Hero:** left-aligned, two columns at desktop (7/5). Left: headline with two small inline app icons sitting at cap height between words (Maiden OS and Essay Studio, real icons), one sentence, one primary button. Right: the latest thing Noe shipped as a live-looking glass card (screenshot plus date). No centered stack, no row of social icons in the hero.
- **Projects:** one section only (the duplicate card grid is removed). Newest first. Zig-zag rows: screenshot 7 columns, text 5, alternating sides. The first project is larger.
- **Four areas:** an uneven grid, never three equal cards: computer science spans two columns; psychology, business and content creation share the rest.
- **Learning out loud:** a horizontal row of the latest long videos with real thumbnails, newest first, scrolls inside its container.
- **Work history:** one compact line of company names with years, linking to About. Old work is for the curious.
- **Contact:** one glass panel, the email as copyable text, one button.
- Mobile (< 768px): everything is one column; inline hero icons move under the headline; tap targets 44px minimum; no horizontal page scroll.

## 6. Motion & Interaction

- Load `anthropic-skills:emil-design-eng` before writing any motion code.
- One entrance: hero headline and card fade up 12px with a 40ms stagger, `cubic-bezier(0.23, 1, 0.32, 1)`, 600ms.
- Sections reveal from a visible resting state (never `opacity: 0` waiting for scroll).
- Hover: glass panels brighten and lift 2px in 200ms; screenshots scale 1.015 inside their frame.
- Ambient: the hero lime glow drifts slowly (40s loop). Nothing else loops.
- Only `transform` and `opacity` animate. `prefers-reduced-motion` keeps fades and drops movement.

## 7. Anti-Patterns (Banned)

- No emojis, no middle dot separators, no numbering for its own sake.
- No accent bar on the left of cards or quotes.
- No repeated content: each project, link or fact appears once per page.
- No pills for tech stacks, no counters or vanity stats.
- No box inside a card, no hairline dividers as default structure.
- No keyboard shortcuts printed on the surface (tooltips only).
- No vendor names in UI copy.
- No invented content: every claim, date and project comes from Noe or his repos.
- No centered hero, no three equal cards, no gradient headline text, no neon glow, no pure black, no Inter.
- No "scroll to explore", bouncing arrows or filler UI text.
- No AI-cliché copy ("elevate", "seamless", "unleash", "next-gen").
