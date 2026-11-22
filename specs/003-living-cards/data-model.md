# Data model: Living wallet cards

**CardMotion** (one per illustrated card, keyed by project id from `data/wallet.ts`)
- `id`: project id
- `svg`: overlay markup, viewBox 0 0 520 328, finished state as authored
- `play(root, delay)`: starts the build-up and returns the running animations; returns none under reduced motion

States: unseen, playing, rested. Unseen becomes playing when half the card is visible or the card is opened; playing becomes rested when every animation ends or is cancelled.
