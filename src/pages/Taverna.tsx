import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { venues } from '../data/venues'
import { menus } from '../data/menus'
import { withBase } from '../lib/paths'
import { Img, Label, Lines, Price, Reveal } from '../components/ui'
import { VenueVisit } from '../components/Visit'
import { Seo } from '../components/Seo'
import { breadcrumbSchema, graph, restaurantSchema } from '../lib/schema'

const v = venues.taverna

const tavernaJsonLd = graph(
  restaurantSchema('taverna', '/taverna'),
  breadcrumbSchema([
    { name: 'a Modo Mio', path: '/' },
    { name: v.name, path: '/taverna' },
  ]),
)

const bites = [
  { img: '/images/taverna/tortellino-fritto.webp', name: 'Tortellino fritto', price: '8' },
  { img: '/images/taverna/polpettine-tortellino.webp', name: 'Polpettine al sapore di tortellino', price: '8' },
  { img: '/images/taverna/stecchini-petroniana.webp', name: 'Stecchini fritti alla petroniana', price: '9' },
  { img: '/images/taverna/crescentine.webp', name: 'Cestino di crescentine fritte', price: '6' },
  { img: '/images/taverna/aperitivo-banco.webp', name: 'Bastoncini di polenta e squacquerone', price: '7' },
]

const build = [
  { k: 'Base', v: 'Crescenta bolognese o doppia crescentina fritta', p: '6' },
  { k: 'Salumi', v: 'Mortadella · Salame rosa · Crudo di Parma', p: '2,5–3' },
  { k: 'Formaggi', v: 'Pecorino dolce dei colli · Squacquerone', p: '2' },
  { k: 'Salse', v: 'A modo mio · Salsa verde · Crema di parmigiano', p: '0,5' },
]

// Allinea il carosello al margine del contenuto (.shell: max 1320px, padding 16→40px)
const gutter = 'max(16px, calc((100vw - 1320px) / 2 + 40px))'

const gallery = [
  { src: '/images/taverna/taglieri.webp', alt: 'Taglieri di salumi e formaggi', cls: 'row-span-2' },
  { src: '/images/taverna/bancone-sera.webp', alt: 'Il bancone la sera' },
  { src: '/images/taverna/cotoletta-crudo.webp', alt: 'Cotoletta alla bolognese' },
  { src: '/images/taverna/sala-piena.webp', alt: 'La Taverna piena', cls: 'col-span-2' },
  { src: '/images/taverna/tartare.webp', alt: 'Tartare di Fassona' },
  { src: '/images/taverna/crescentinata.webp', alt: 'La crescentinata' },
]

export function Taverna() {
  const table = [...menus.taverna[2].dishes.slice(0, 3), ...menus.taverna[3].dishes.slice(0, 3)]

  return (
    <div data-venue="taverna">
      <Seo
        path="/taverna"
        title="Taverna a Modo Mio | Stuzzicheria bolognese · Castel Maggiore"
        description="Taverna a Modo Mio al C.C. Le Piazze di Castel Maggiore: stuzzicheria tipica bolognese, crescentine, tortellino fritto, taglieri e Bologna Burger. Dalle 17:30 a tarda notte."
        image="/images/taverna/bologna-burger-2.webp"
        jsonLd={tavernaJsonLd}
      />

      {/* HERO */}
      <section className="bg-taverna text-paper">
        <div className="shell grid gap-10 pb-14 pt-28 lg:min-h-[100svh] lg:grid-cols-12 lg:items-end lg:pb-12">
          <div className="lg:col-span-6 lg:pb-10">
            <Label className="text-butter">02 — Taverna · Castel Maggiore</Label>
            <h1 className="mt-5 text-[clamp(3.4rem,8vw,7.6rem)] font-normal leading-[0.88]">
              <Lines onLoad lines={['Taverna', <em className="font-light text-butter">a Modo Mio</em>]} />
            </h1>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-paper/75">
                Stuzzicheria tipica bolognese. {v.claim}
              </p>
              <p className="mt-3 font-display text-2xl italic text-butter">Mangia. Bevi. Goditela.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={v.booking} target="_blank" rel="noreferrer" className="btn bg-butter text-taverna-deep hover:bg-paper">
                  Prenota un tavolo <ArrowUpRight size={16} />
                </a>
                <Link to="/taverna/menu" className="btn-line">
                  Il menù
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="relative lg:col-span-6">
            <motion.div
              className="ml-auto h-[56svh] overflow-hidden rounded-[6px] lg:h-[76svh] lg:w-[82%]"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <Img src="/images/taverna/fritti-spritz.webp" alt="Fritti e spritz in Taverna" sizes="(max-width: 1024px) 100vw, 45vw" eager />
            </motion.div>
            <motion.img
              src={withBase(v.logo)}
              alt="Logo Taverna a Modo Mio"
              className="absolute -bottom-6 left-2 h-28 w-28 rounded-full shadow-2xl sm:h-36 sm:w-36 lg:bottom-10 lg:left-0"
              initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -8, scale: 1 }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </section>

      {/* LA STUZZICHERIA — scorrimento orizzontale */}
      <section className="py-24 md:py-32">
        <div className="shell flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
            <Lines lines={['La stuzzicheria,', <em className="font-light">da prendere con le mani.</em>]} />
          </h2>
          <p className="max-w-sm text-ink-soft">Fritti, crescentine e assaggi da dividere al tavolo. Scorri →</p>
        </div>
        <div
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]"
          style={{ paddingInline: gutter, scrollPaddingInline: gutter }}
        >
          {bites.map((b) => (
            <article key={b.name} className="w-[72vw] shrink-0 snap-start sm:w-[40vw] lg:w-[24vw]">
              <div className="aspect-[4/5] overflow-hidden rounded-[6px]">
                <Img src={b.img} alt={b.name} sizes="(max-width: 640px) 72vw, 25vw" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-sans text-lg font-medium leading-snug tracking-normal">{b.name}</h3>
                <span className="text-xl text-taverna">
                  <Price value={b.price} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BOLOGNA BURGER */}
      <section className="bg-butter text-taverna-deep">
        <div className="shell grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:items-center">
          <Reveal className="overflow-hidden rounded-[6px] lg:col-span-6">
            <div className="aspect-[4/5] lg:aspect-[5/6]">
              <Img src="/images/taverna/bologna-burger.webp" alt="Bologna Burger con patate lorde" />
            </div>
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8">
            <Label>Gli imbottiti · solo in Taverna</Label>
            <h2 className="mt-5 text-6xl leading-[0.9] sm:text-7xl">
              <Lines lines={['Bologna', <em className="font-light">Burger.</em>]} />
            </h2>
            <Reveal>
              <p className="mt-6 text-lg leading-relaxed">
                Bun soffice artigianale, smash burger con il <strong>ripieno del tortellino</strong> e friggione alla bolognese.
                Con le nostre patate “lorde”. Il tortellino non era mai stato così fuori dagli schemi.
              </p>
              <p className="mt-6 text-3xl">
                <Price value="16" />
              </p>
              <div className="mt-10 border-t border-taverna-deep/20 pt-6">
                <p className="font-display text-2xl italic">Oppure componilo tu.</p>
                <dl className="mt-4">
                  {build.map((b) => (
                    <div key={b.k} className="grid grid-cols-[88px_1fr_auto] gap-3 border-b border-taverna-deep/15 py-3 text-[15px]">
                      <dt className="label pt-1 opacity-60">{b.k}</dt>
                      <dd>{b.v}</dd>
                      <dd className="tabular-nums">{b.p} €</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ANCHE A TAVOLA */}
      <section className="shell py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-5xl leading-[0.95] sm:text-6xl">
              <Lines lines={['E se hai fame', <em className="font-light">davvero.</em>]} />
            </h2>
            <Reveal className="mt-10 overflow-hidden rounded-[6px]">
              <div className="aspect-[4/5]">
                <Img src="/images/taverna/tagliatelle-terracotta.webp" alt="Tagliatelle al ragù nella terracotta" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-28">
            <p className="text-lg text-ink-soft">Primi e secondi della tradizione, anche in Taverna.</p>
            <ul className="mt-8">
              {table.map((d) => (
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
            <Link to="/taverna/menu" className="group mt-8 inline-flex items-center gap-2 font-semibold text-taverna">
              Tutto il menù, birre e amari <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
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

      <VenueVisit id="taverna" />
    </div>
  )
}
