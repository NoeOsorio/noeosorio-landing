# Data model: Home made of objects

All content is static, typed and edited in `src/home/data/`. Fields mirror the approved prototypes' `CONTENT` blocks (see `prototypes/`).

- **Galaxy** (`galaxy.ts`): name, subscribe label and href, title, sub, hint for mouse and touch, `heavy: string[]` (six concepts, become planets), `ideas: string[]` (real), `eggs: string[]` (jokes, shown like ideas).
- **Wallet** (`wallet.ts`): projects newest first; each has name, topic, art style, created (month and year), price or availability, action label and URL, pitch (headline, problem, how it works, unique), platforms, stack.
- **Passport** (`passport.ts`): owner, role, pages newest first; each page has city, company, dates, main stamp (shape, text) and skill stamps (shape, text).
- **Learning** (`learning.ts`): title, sub, marquee and status words, categories, videos newest first (id, category, title, date, length in seconds), channel URL.
- **Tips** (`tips.ts`): merchant, tips (amount, label, note, icon), tip jar URL, thank-you lines, No tip lines, robots copy, Subscribe copy (YouTube), footer columns and links.

Validation: every URL is absolute or a site path that exists; every video id resolves on YouTube; no field contains a middle dot.
