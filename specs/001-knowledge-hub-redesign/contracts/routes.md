# Contract: public URLs, redirects and page metadata

## Pages

| URL | Page | Status |
|---|---|---|
| `/` | Home | 200 |
| `/projects` | All projects | 200 |
| `/projects/{slug}` | One project | 200 |
| `/videos` | Video library with search and filters | 200 |
| `/videos/{slug}` | One video with summary, takeaways and player | 200 |
| `/now` | What Noe is doing now | 200 |
| `/about` | Story, work history, contact | 200 |
| `/privacy` | How visits are counted | 200 |
| any other path | 404 page in the site's style | 404 |

## Redirects (301) from the old site

| Old URL | New URL |
|---|---|
| `/portfolio` | `/projects` |
| `/portfolio/**` | `/projects` |
| `/services`, `/services/**` | `/` |
| `/contact` | `/about#contact` |
| `/social` | `/about#contact` |
| `/privacy-policy` | `/privacy` |
| `/open-source/**`, `/b2b/**`, `/landing/**` | `/projects` |
| `/acerca%20de`, `/acerca de` | `/about` |
| `/servicios` | `/` |
| `/portafolio` | `/projects` |
| `/contacto` | `/about#contact` |

## Metadata every page serves in its HTML

- `<title>` unique per page, for example "Essay Studio, Noé Osorio".
- `<meta name="description">` unique per page, from the content summary.
- `<link rel="canonical">` with the page's own absolute URL.
- Open Graph and Twitter tags: title, description, absolute image URL of the page's generated
  preview, `og:url` equal to the canonical.
- `<html lang="en">`.

## Machine files

- `/sitemap.xml` lists exactly the 200 pages above, generated from the content.
- `/robots.txt` allows everything and points to the sitemap (no blocking of scripts or styles).
