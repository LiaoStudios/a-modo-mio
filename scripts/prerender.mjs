// Dopo `vite build` + `vite build --ssr`: genera un HTML statico per ogni rotta (con title, description,
// canonical, Open Graph, JSON-LD e contenuto già nel markup), sitemap.xml e robots.txt.
// Motivo: GitHub Pages risponde 404 a tutti gli URL che non corrispondono a un file; senza questo passaggio
// /osteria, /taverna e i menù verrebbero serviti con status 404 (e Google non li indicizzerebbe).
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const BASE = '/a-modo-mio'
const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://liaostudios.github.io/a-modo-mio').replace(/\/+$/, '')
const root = process.cwd()
const dist = path.join(root, 'dist')

const routes = [
  { path: '/', file: 'index.html', priority: '1.0' },
  { path: '/osteria', file: 'osteria/index.html', priority: '0.9' },
  { path: '/taverna', file: 'taverna/index.html', priority: '0.9' },
  { path: '/osteria/menu', file: 'osteria/menu/index.html', priority: '0.7' },
  { path: '/taverna/menu', file: 'taverna/menu/index.html', priority: '0.7' },
  { path: '/privacy', file: 'privacy/index.html', priority: null }, // noindex: fuori dalla sitemap
]

const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
// Il titolo segnaposto del template viene rimpiazzato da quello della pagina.
const stripped = template.replace(/\s*<title>[^<]*<\/title>/, '')

for (const r of routes) {
  const { html, head } = render(`${BASE}${r.path === '/' ? '/' : r.path}`)
  const page = stripped.replace('<!--seo-head-->', head).replace('<!--app-html-->', html)
  const out = path.join(dist, r.file)
  await mkdir(path.dirname(out), { recursive: true })
  await writeFile(out, page)
  console.log('prerender', r.path, '→', r.file)
}

// 404.html: fallback SPA per URL sconosciuti (la Home, senza canonical per non duplicarla).
const home = render(`${BASE}/`)
const notFoundHead = home.head.replace(/<link[^>]*rel="canonical"[^>]*>/, '').replace(/<meta[^>]*name="robots"[^>]*>/, '<meta data-rh="true" name="robots" content="noindex">')
await writeFile(path.join(dist, '404.html'), stripped.replace('<!--seo-head-->', notFoundHead).replace('<!--app-html-->', home.html))

const today = new Date().toISOString().slice(0, 10)
const urls = routes
  .filter((r) => r.priority)
  .map((r) => `  <url>\n    <loc>${SITE_URL}${r.path === '/' ? '/' : `${r.path}/`}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r.priority}</priority>\n  </url>`)
  .join('\n')
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
console.log('sitemap.xml + robots.txt scritti')
