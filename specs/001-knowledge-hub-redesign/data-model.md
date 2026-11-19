# Data Model: noeosorio.com as Noe's knowledge hub

All content lives in the repository as content files validated by a schema at build time. A build
fails if any required field is missing or a rule below is broken, so invalid content never ships.

## Project

One file per project in `src/content/projects/`.

| Field | Type | Rules |
|---|---|---|
| slug | string | From the file name; used in `/projects/{slug}` |
| name | string | As Noe names it |
| summary | string | One sentence, at most 140 characters, first person |
| why | string | What makes it interesting, at most 400 characters, no unsourced numbers |
| role | string | Optional; for Pyventa Web: "Web redesign" |
| status | `public` or `private` | Private projects MUST NOT have a `repo` link |
| links | list of {label, url} | Each URL must resolve (checked in verification) |
| visuals | list of {src, alt, kind: image or video} | At least one; every image needs alt text |
| topics | list of strings | From a fixed topic list (see Topic) |
| order | number | Display order chosen by Noe |

Approved set (exactly eight): Maiden OS, Essay Studio, Whiteboard, Telar, Kanji Study App, Sim
World, Porter Galaxy, Pyventa Web.

## Video

One file per video in `src/content/videos/`.

| Field | Type | Rules |
|---|---|---|
| slug | string | Used in `/videos/{slug}` |
| youtubeId | string | The YouTube video id; thumbnail and embed derive from it |
| title | string | As published on YouTube |
| date | date | Publication date |
| duration | string | For example "14:32"; long videos only |
| summary | string | One line, English |
| takeaways | list of strings | Two to four, English, written from the video |
| topics | list of strings | From the fixed topic list |
| approved | boolean | Only `true` entries are built |

## Now

A single file `src/content/now.md`.

| Field | Type | Rules |
|---|---|---|
| updated | date | Shown on the page |
| building | text | What Noe is building |
| studying | text | What he is studying |
| recording | text | What he is recording |

## About

A single file `src/content/about.md` with the story in first person and a `roles` list:

| Field | Type | Rules |
|---|---|---|
| company | string | Smartkode, Finloop, Clip, Osmind, Apex Systems, Porter |
| title | string | As verified; Porter is "Product Engineer" (Noe's decision) |
| start, end | year | End empty for the current role |
| place | string | City |

## Topic

A fixed list in `src/content/topics.ts` (for example: AI agents, Learning, Product, Infrastructure,
Psychology, Life in New York). Projects and videos may only use topics from this list, so filters
never show duplicates or typos.

## Site settings

`src/content/site.ts`: name, title ("Product Engineer"), city, email, social links (YouTube,
TikTok, Instagram, LinkedIn, GitHub, X), analytics site code. One place, used by every page.
