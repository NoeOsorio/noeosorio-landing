import { createServer, type Plugin } from 'vite'
import type { OutputBundle, OutputChunk } from 'rollup'
import fs from 'node:fs'
import path from 'node:path'

// Link previews (WhatsApp, iMessage, LinkedIn, X, Slack) read the HTML as served and never run the app, so without this every
// shared link would show the home's card. After the build, each project page and /portfolio gets its own copy of index.html
// with its own title, description, canonical and absolute social image, taken from the same meta the pages set at runtime.
// Hosting serves dist/<path>.html for /<path> (cleanUrls in firebase.json).
const SITE = 'https://noeosorio.com'
const LANG = 'en' as const

type Meta = { title: string; description: string }
type Route = { path: string; meta: Meta; image: string; modules: string[] }

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// The page's own code and styles, so the browser fetches them with the HTML instead of after the main bundle.
function preloads(bundle: OutputBundle, modules: string[], html: string) {
  const chunks = Object.values(bundle).filter((c): c is OutputChunk => c.type === 'chunk')
  const js = new Set<string>(), css = new Set<string>()
  const walk = (c: OutputChunk) => {
    if (js.has(c.fileName)) return
    js.add(c.fileName)
    c.viteMetadata?.importedCss.forEach((f) => css.add(f))
    c.imports.forEach((f) => { const n = bundle[f]; if (n?.type === 'chunk') walk(n) })
  }
  for (const m of modules) {
    const root = chunks.find((c) => c.facadeModuleId?.endsWith(m))
    if (!root) throw new Error(`route-meta: no chunk for ${m}`)
    walk(root)
  }
  const tags = [...css].filter((f) => !html.includes(f)).map((f) => `<link rel="stylesheet" crossorigin href="/${f}">`)
    .concat([...js].filter((f) => !html.includes(f)).map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`))
  return tags.join('\n    ')
}

function withMeta(html: string, r: Route, bundle: OutputBundle) {
  const url = SITE + r.path, image = SITE + r.image
  const t = esc(r.meta.title), d = esc(r.meta.description)
  const metaTag = (attr: 'name' | 'property', key: string, value: string) => {
    const re = new RegExp(`<meta ${attr}="${key.replace(/[:]/g, '\\:')}" content="[^"]*"\\s*/?>`)
    if (!re.test(html)) throw new Error(`route-meta: index.html has no <meta ${attr}="${key}">`)
    html = html.replace(re, `<meta ${attr}="${key}" content="${value}" />`)
  }
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
  metaTag('name', 'title', t)
  metaTag('name', 'description', d)
  metaTag('property', 'og:url', url)
  metaTag('property', 'og:title', t)
  metaTag('property', 'og:description', d)
  metaTag('property', 'og:image', image)
  metaTag('name', 'twitter:title', t)
  metaTag('name', 'twitter:description', d)
  metaTag('name', 'twitter:image', image)
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
  return html.replace('</head>', `  ${preloads(bundle, r.modules, html)}\n  </head>`)
}

export function routeMeta(): Plugin {
  let outDir = 'dist', root = process.cwd(), bundle: OutputBundle = {}
  return {
    name: 'route-meta',
    apply: 'build',
    configResolved(c) { outDir = path.resolve(c.root, c.build.outDir); root = c.root },
    writeBundle(_, b) { bundle = b },
    async closeBundle() {
      const server = await createServer({ root, configFile: false, logLevel: 'silent', appType: 'custom', server: { middlewareMode: true, hmr: false } })
      try {
        const { PROJECTS } = await server.ssrLoadModule('/src/projects/registry.ts')
        const routes: Route[] = []
        for (const entry of Object.values(PROJECTS) as { path: string; load: null | (() => Promise<{ default: { meta: Record<string, Meta>; ogImage: string } }>) }[]) {
          if (!entry.load) continue
          const page = (await entry.load()).default as { id: string; meta: Record<string, Meta>; ogImage: string }
          routes.push({ path: entry.path, meta: page.meta[LANG], image: page.ogImage, modules: [`/src/projects/${page.id}/index.ts`, '/src/projects/ProjectShell.tsx'] })
        }
        const pf = await server.ssrLoadModule('/src/projects/portfolio/data.ts')
        routes.push({ path: '/portfolio', meta: pf.META, image: pf.OG_IMAGE, modules: ['/src/projects/portfolio/PortfolioPage.tsx'] })
        const base = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
        for (const r of routes) fs.writeFileSync(path.join(outDir, r.path.slice(1) + '.html'), withMeta(base, r, bundle))
        this.info?.(`route-meta: ${routes.map((r) => r.path).join(' ')}`)
      } finally {
        await server.close()
      }
    },
  }
}
