import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { venues } from '../data/venues'
import { menus } from '../data/menus'
import { Img, Label, Lines, Price, Reveal } from '../components/ui'
import { VenueVisit } from '../components/Visit'
import { Seo } from '../components/Seo'
import { breadcrumbSchema, graph, restaurantSchema } from '../lib/schema'

const v = venues.osteria

const osteriaJsonLd = graph(
  restaurantSchema('osteria', '/osteria'),
  breadcrumbSchema([
    { name: 'a Modo Mio', path: '/' },
    { name: v.name, path: '/osteria' },
  ]),
)

const gallery = [
  { src: '/images/antipasti/crescentine.webp', alt: 'Crescentine e salumi', cls: 'row-span-2' },
  { src: '/images/primi/balanzoni.webp', alt: 'Balanzoni verdi' },
  { src: '/images/secondi/grigliata.webp', alt: 'Gran grigliata' },
  { src: '/images/locale/sala-legno.webp', alt: 'La sala in legno', cls: 'col-span-2' },
  { src: '/images/primi/lasagna.webp', alt: 'Lasagne verdi' },
  { src: '/images/antipasti/crostini-mortadella.webp', alt: 'Mousse di mortadella' },
]

export function Osteria() {
  const menu = menus.osteria
  const picks = [
    { title: 'Antipasti', items: menu[0].dishes.slice(0, 4) },
    { title: 'Dalla sfoglia', items: menu[1].dishes.slice(2, 6) },
    { title: 'Dalla griglia', items: menu[2].dishes.slice(0, 4) },
  ]

  return (
    <div data-venue="osteria">
      <Seo
        path="/osteria"
        title="Osteria a Modo Mio | Cucina tipica bolognese · Funo di Argelato"
        description="Osteria a Modo Mio a Funo di Argelato: tortellino in brodo di cappone, tagliatella al ragù, pasta tirata a mano e carni alla griglia. Pranzo con il 20% di sconto alla carta, dal lunedì al venerdì."
        image="/images/hero/osteria.webp"
        jsonLd={osteriaJsonLd}
      />

      {/* HERO */}
      <section className="shell grid gap-8 pb-16 pt-28 lg:min-h-[100svh] lg:grid-cols-12 lg:items-end lg:pb-12">
        <div className="lg:col-span-5 lg:pb-10">
          <Label className="text-osteria">01 — Osteria · Funo di Argelato</Label>
          <h1 className="mt-5 text-[clamp(3.4rem,8vw,7.6rem)] font-normal leading-[0.88]">
            <Lines onLoad lines={['Osteria', <em className="font-light text-osteria">a Modo Mio</em>]} />
          </h1>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">{v.claim}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={v.booking} target="_blank" rel="noreferrer" className="btn-solid">
                Prenota un tavolo <ArrowUpRight size={16} />
              </a>
              <Link to="/osteria/menu" className="btn-line">
                Il menù
              </Link>
            </div>
            <p className="mt-8 inline-block border-l-2 border-osteria pl-4 text-sm font-medium">
              −20% sul menù alla carta a pranzo
              <span className="block font-normal text-ink/55">dal lunedì al venerdì</span>
            </p>
          </motion.div>
        </div>
        <motion.div
          className="relative h-[58svh] overflow-hidden rounded-[6px] lg:col-span-7 lg:h-[82svh]"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Img src="/images/locale/sala-rossa.webp" alt="La sala dell'Osteria con le sedute in velluto rosso" sizes="(max-width: 1024px) 100vw, 60vw" eager />
          <span className="label absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-ink">Velluto rosso e boiserie</span>
        </motion.div>
      </section>

      {/* IL RE E LA REGINA */}
      <section className="bg-osteria text-paper">
        <div className="shell py-24 md:py-32">
          <div className="grid gap-6 md:grid-cols-12">
            <h2 className="text-5xl leading-[0.95] sm:text-6xl md:col-span-7 md:text-7xl">
              <Lines lines={['Il Re', <em className="font-light">e la Regina.</em>]} />
            </h2>
            <Reveal className="text-lg leading-relaxed text-paper/75 md:col-span-5 md:pt-4">
              Due piatti, tutta Bologna. Il tortellino cotto nel brodo di cappone e la tagliatella rigorosamente fatta a mano,
              con ragù di carni di prima scelta.
            </Reveal>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {[
              { img: '/images/primi/tortellini-brodo.webp', t: 'Il Re', d: 'Tortellino in brodo di cappone', p: '16' },
              { img: '/images/primi/tagliatelle.webp', t: 'La Regina', d: 'Tagliatella al ragù bolognese', p: '11' },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 0.1} className={i === 1 ? 'md:mt-20' : ''}>
                <div className="aspect-[4/5] overflow-hidden rounded-[6px]">
                  <Img src={x.img} alt={x.d} />
                </div>
                <div className="mt-5 flex items-baseline justify-between border-t border-paper/25 pt-4">
                  <div>
                    <h3 className="text-4xl font-light italic">{x.t}</h3>
                    <p className="mt-1 text-paper/70">{x.d}</p>
                  </div>
                  <span className="text-2xl text-butter">
                    <Price value={x.p} />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DAL MENU */}
      <section className="shell py-24 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="text-5xl leading-[0.95] sm:text-6xl">
            <Lines lines={['Dal menù', <em className="font-light">di stagione.</em>]} />
          </h2>
          <Link to="/osteria/menu" className="group inline-flex items-center gap-2 font-semibold text-osteria">
            Tutto il menù <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {picks.map((col, i) => (
            <Reveal key={col.title} delay={i * 0.08}>
              <Label className="border-b border-ink/15 pb-3 text-ink/50">{col.title}</Label>
              <ul>
                {col.items.map((d) => (
                  <li key={d.name} className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-4">
                    <span>
                      <span className="block font-medium">{d.name}</span>
                      {d.desc && <span className="mt-0.5 block text-sm text-ink/55">{d.desc}</span>}
                    </span>
                    <span className="shrink-0 text-lg">
                      <Price value={d.price} />
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="shell pb-8">
        <div className="grid grid-flow-dense auto-rows-[38vw] grid-cols-2 gap-3 sm:auto-rows-[26vw] md:grid-cols-4 md:auto-rows-[18vw]">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={(i % 4) * 0.05} className={`overflow-hidden rounded-[6px] ${g.cls ?? ''}`}>
              <Img src={g.src} alt={g.alt} sizes="(max-width: 768px) 50vw, 25vw" />
            </Reveal>
          ))}
        </div>
      </section>

      <VenueVisit id="osteria" />
    </div>
  )
}
