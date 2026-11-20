// Ottimizza le foto reali della Taverna a Modo Mio (Castel Maggiore)
// da Taverna/GoogleBusiness e Taverna/Instagram in public/images/taverna/*.
// Esegui con: npm run images:taverna
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'

const GB = path.resolve('Taverna/GoogleBusiness')
const IG = path.resolve('Taverna/Instagram')
const OUT = path.resolve('public/images/taverna')

const gb = (n) => {
  const base = `tavernaamodomio_googlebusiness_${String(n).padStart(2, '0')}`
  const f = readdirSync(GB).find((x) => x.startsWith(base))
  return f ? path.join(GB, f) : null
}
const ig = (code) => path.join(IG, `tavernaamodomio_instagram_${code}.jpg`)

// crop = frazioni [top, height] dell'immagine (per togliere testi/persone dai post)
const SELECTION = [
  { src: ig('DfH9gKXADBw_10'), name: 'insegna', crop: [0, 0.42] },
  { src: ig('DfhlpjXgDxl_06'), name: 'bologna-burger', crop: [0, 0.8] },
  { src: ig('DfhlpjXgDxl_07'), name: 'bologna-burger-2', crop: [0.18, 0.66] },
  { src: ig('De_0da8Ataq_01'), name: 'tortellino-fritto' },
  { src: ig('DfH9gKXADBw_04'), name: 'taglieri' },
  { src: ig('DfH9gKXADBw_13'), name: 'aperitivo-banco' },
  { src: ig('DfH9gKXADBw_15'), name: 'bancone-sera' },
  { src: ig('DfH9gKXADBw_06'), name: 'sala-piena' },
  { src: ig('Detpp_yAD6u_01'), name: 'tagliatelle-terracotta' },
  { src: ig('DfRmC3JgAde_01'), name: 'cotoletta-crudo' },
  { src: gb(2), name: 'tartare' },
  { src: gb(3), name: 'fritti-spritz' },
  { src: gb(4), name: 'polpettine-tortellino' },
  { src: gb(6), name: 'cotoletta' },
  { src: gb(7), name: 'crescentinata' },
  { src: gb(8), name: 'tagliatelle' },
  { src: gb(9), name: 'stecchini-petroniana' },
  { src: gb(10), name: 'crescentine-affettatrice' },
  { src: gb(12), name: 'sottoli' },
  { src: gb(13), name: 'crescentine' },
  { src: gb(1), name: 'sala' },
]

async function run() {
  await mkdir(OUT, { recursive: true })
  for (const { src, name, crop } of SELECTION) {
    if (!src || !existsSync(src)) {
      console.warn('MISSING:', name, src)
      continue
    }
    let img = sharp(src).rotate()
    if (crop) {
      const { width, height } = await sharp(src).rotate().metadata()
      img = img.extract({ left: 0, top: Math.round(height * crop[0]), width, height: Math.round(height * crop[1]) })
    }
    const buf = await img.toBuffer()
    await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(OUT, `${name}.webp`))
    await sharp(buf).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 76 }).toFile(path.join(OUT, `${name}-sm.webp`))
    console.log('ok', name)
  }

  // Logo reale della Taverna: roundel ritagliato dal manifesto dell'inaugurazione
  const poster = ig('Dd1C7lAgT6f_01')
  const { width } = await sharp(poster).metadata()
  const s = width / 900
  const cx = 449 * s, cy = 241 * s, r = 104 * s
  const size = Math.round(r * 2)
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`)
  const square = await sharp(poster)
    .extract({ left: Math.round(cx - r), top: Math.round(cy - r), width: size, height: size })
    .toBuffer()
  const round = await sharp(square).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer()
  await sharp(round)
    .resize(480)
    .webp({ quality: 90 })
    .toFile(path.resolve('public/logo-taverna.webp'))
  console.log('ok logo-taverna')
}

run()
