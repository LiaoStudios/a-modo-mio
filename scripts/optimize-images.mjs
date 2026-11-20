// Optimizes the curated real photos of Osteria a Modo Mio (Funo di Argelato)
// into public/images/*. Run with: npm run images
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const SRC = path.resolve('GoogleBusiness')
const g = (n) => `${SRC}/osteriaamodomio_googlebusiness_${String(n).padStart(2, '0')}.jpg`

const OUT = path.resolve('public/images')

// Curated selection (source number -> category/name). Chosen for subject & quality.
// Real dishes of the osteria, matched to the Bolognese menu.
const SELECTION = [
  // Antipasti
  { n: 16, cat: 'antipasti', name: 'tagliere' },
  { n: 17, cat: 'antipasti', name: 'crescentine' },
  { n: 18, cat: 'antipasti', name: 'fritto' },
  { n: 19, cat: 'antipasti', name: 'crostini-mortadella' },
  // Primi — pasta fresca fatta a mano
  { n: 8, cat: 'primi', name: 'tagliatelle' },
  { n: 10, cat: 'primi', name: 'tortellini-brodo' },
  { n: 9, cat: 'primi', name: 'balanzoni' },
  { n: 11, cat: 'primi', name: 'tortelloni' },
  { n: 13, cat: 'primi', name: 'lasagna' },
  // Secondi — carne alla griglia
  { n: 14, cat: 'secondi', name: 'tagliata' },
  { n: 15, cat: 'secondi', name: 'grigliata' },
  { n: 12, cat: 'secondi', name: 'scaloppina' },
  // Contorni
  { n: 22, cat: 'contorni', name: 'verdure' },
  // Dolci
  { n: 20, cat: 'dolci', name: 'mascarpone' },
  { n: 21, cat: 'dolci', name: 'zabaione' },
  // Locale
  { n: 1, cat: 'locale', name: 'facciata' },
  { n: 2, cat: 'locale', name: 'insegna' },
  { n: 3, cat: 'locale', name: 'sala-rossa' },
  { n: 5, cat: 'locale', name: 'sala' },
  { n: 6, cat: 'locale', name: 'sala-legno' },
]

async function run() {
  await mkdir(OUT, { recursive: true })
  const cats = [...new Set(SELECTION.map((s) => s.cat))]
  for (const c of cats) await mkdir(path.join(OUT, c), { recursive: true })

  let ok = 0
  let missing = 0
  for (const { n, cat, name } of SELECTION) {
    const src = g(n)
    if (!existsSync(src)) {
      console.warn('MISSING:', src)
      missing++
      continue
    }
    const base = path.join(OUT, cat, name)
    await sharp(src).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${base}.webp`)
    await sharp(src).rotate().resize({ width: 800, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${base}-sm.webp`)
    ok++
  }

  // Hero — the wide, warm dining room (#04, landscape 1600x1068)
  const HERO = g(4)
  if (existsSync(HERO)) {
    await mkdir(path.join(OUT, 'hero'), { recursive: true })
    await sharp(HERO).rotate().resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(OUT, 'hero/osteria.webp'))
    await sharp(HERO).rotate().resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(OUT, 'hero/osteria-sm.webp'))
  }

  // The real logo — the osteria's own emblem, photographed on the menu cover
  // (#07): a maroon roundel ("OSTERIA a Modo Mio · Cucina Tipica Bolognese",
  // apron + the two towers of Bologna). We crop the circular emblem and apply
  // a feathered circular alpha mask for a clean transparent-background roundel.
  const LOGO_SRC = g(7)
  if (existsSync(LOGO_SRC)) {
    // Crop the roundel out of the menu-cover photo (calibrated coords).
    const CROP = { left: 402, top: 48, width: 800, height: 800 }
    const LOGO_OUT = 1000
    const base = await sharp(LOGO_SRC)
      .rotate()
      .extract(CROP)
      .resize(LOGO_OUT, LOGO_OUT)
      .png()
      .toBuffer()
    const r = LOGO_OUT / 2 - 4
    const maskSvg = Buffer.from(
      `<svg width="${LOGO_OUT}" height="${LOGO_OUT}"><defs><filter id="b"><feGaussianBlur stdDeviation="2"/></filter></defs>` +
        `<circle cx="${LOGO_OUT / 2}" cy="${LOGO_OUT / 2}" r="${r}" fill="white" filter="url(%23b)"/></svg>`,
    )
    const mask = await sharp(maskSvg).resize(LOGO_OUT, LOGO_OUT).toBuffer()
    const logoRounded = await sharp(base).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer()

    await sharp(logoRounded).webp({ quality: 92 }).toFile(path.resolve('public/logo.webp'))

    // Favicon: the logo on an opaque cream square so it reads at tiny sizes.
    await sharp({ create: { width: 256, height: 256, channels: 4, background: '#F6EEDD' } })
      .composite([{ input: await sharp(logoRounded).resize(256, 256).toBuffer() }])
      .png()
      .toFile(path.resolve('public/favicon.png'))
  } else {
    console.warn('MISSING LOGO SOURCE:', LOGO_SRC)
  }

  // OG image from the hero dining room, cropped to 1200x630
  const ogSrc = existsSync(HERO) ? HERO : g(1)
  await sharp(ogSrc).rotate().resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 82 }).toFile(path.resolve('public/og-image.jpg'))

  console.log(`Done. ${ok} images optimized, ${missing} missing.`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
