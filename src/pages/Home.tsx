import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { venues } from '../data/venues'
import { withBase } from '../lib/paths'
import { absUrl, SITE_NAME } from '../lib/site'
import { graph, restaurantSchema } from '../lib/schema'
import { Seo } from '../components/Seo'
import { Img, Label, Lines, Reveal } from '../components/ui'
import { VenueCard } from '../components/Visit'

const ease = [0.22, 1, 0.36, 1] as const

/** Le Due Torri: l'Osteria è l'Asinelli (più alta), la Taverna la Garisenda (più bassa, e pende). */
function Tower({
  to,
  img,
  index,
  name,
  place,
  when,
  className,
  lean,
  delay,
}: {
  to: string
  img: string
  index: string
  name: string
  place: string
  when: string
  className: string
  lean: number
  delay: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`relative w-1/2 origin-bottom ${className}`}
      initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)', rotate: 0 }}
      animate={{ clipPath: 'inset(0% 0 0 0)', rotate: lean }}
      transition={{
        clipPath: { duration: 1.2, ease, delay },
        rotate: { duration: 1.4, ease, delay: delay + 1.1 },
      }}
    >
      <Link to={to} className="group absolute inset-0 block overflow-hidden rounded-[6px] bg-ink">
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">
          <Img src={img} alt={`${name} — ${place}`} sizes="(max-width: 1024px) 50vw, 25vw" eager />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/25" />
        <span className="label absolute left-4 top-4 text-paper/80">{index}</span>
        <ArrowUpRight className="absolute right-4 top-4 text-paper transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={20} />
        <div className="absolute inset-x-4 bottom-4 text-paper sm:inset-x-5 sm:bottom-5">
          <p className="font-display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-none">
            {name}
          </p>
          <p className="mt-2 text-xs text-paper/75 sm:text-sm">{place}</p>
          <p className="mt-0.5 text-xs text-paper/75 sm:text-sm">{when}</p>
        </div>
      </Link>
    </motion.div>
  )
}

const compare = [
  { k: 'Dove', o: 'Funo di Argelato, Via Galliera 115', t: 'Castel Maggiore, C.C. Le Piazze' },
  { k: 'Quando', o: 'Pranzo e cena · chiuso il mercoledì', t: 'Tutte le sere, dalle 17:30 a tarda notte' },
  { k: 'In tavola', o: 'Sfoglia tirata a mano, brodo di cappone, carni alla griglia', t: 'Crescentine, fritti, taglieri, imbottiti' },
  { k: 'Da provare', o: 'Il Re: tortellino in brodo di cappone', t: 'Il Bologna Burger, con ripieno di tortellino' },
  { k: 'Per', o: 'Il pranzo della domenica, la cena con calma', t: 'L’aperitivo, la cena informale, il dopocena' },
]

const dishes = [
  { img: '/images/primi/tortellini-brodo.webp', title: 'Il Re', dish: 'Tortellino in brodo di cappone', where: 'In Osteria', to: '/osteria', offset: 'lg:mt-0' },
  { img: '/images/primi/tagliatelle.webp', title: 'La Regina', dish: 'Tagliatella al ragù bolognese', where: 'In Osteria e in Taverna', to: '/osteria/menu', offset: 'lg:mt-24' },
  { img: '/images/taverna/bologna-burger-2.webp', title: 'Il Ribelle', dish: 'Bologna Burger, smash con ripieno di tortellino', where: 'Solo in Taverna', to: '/taverna', offset: 'lg:mt-12' },
]

const homeJsonLd = graph(
  { '@type': 'WebSite', '@id': `${absUrl('/')}#website`, name: SITE_NAME, url: absUrl('/'), inLanguage: 'it-IT' },
  restaurantSchema('osteria', '/'),
  restaurantSchema('taverna', '/'),
)

export function Home() {
  return (
    <>
      <Seo
        path="/"
        title="a Modo Mio | Osteria a Funo · Taverna a Castel Maggiore (Bologna)"
        description="a Modo Mio: due locali, una famiglia. L'Osteria a Funo di Argelato per la cucina tipica bolognese a pranzo e cena, la Taverna a Castel Maggiore (C.C. Le Piazze) per aperitivo, stuzzicheria e Bologna Burger fino a tarda notte."
        jsonLd={homeJsonLd}
      />

      {/* HERO — le Due Torri */}
      <section className="shell grid min-h-[100svh] items-end overflow-x-clip gap-10 pb-6 pt-24 lg:grid-cols-12 lg:gap-6 lg:pb-10">
        <div className="lg:col-span-6 lg:pb-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <Label className="text-accent">Osteria · Taverna — Bologna</Label>
          </motion.div>
          <h1 className="mt-5 text-[clamp(3.2rem,8.4vw,8.4rem)] font-normal leading-[0.9]">
            <Lines
              onLoad
              delay={0.15}
              lines={['Bologna,', <em className="font-light">a modo</em>, <em className="font-light">nostro.</em>]}
            />
          </h1>
          <motion.p
            className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Due locali, una famiglia. L’<strong className="font-semibold text-ink">Osteria</strong> per sedersi a tavola, la{' '}
            <strong className="font-semibold text-ink">Taverna</strong> per fare tardi. Scegli la tua torre.
          </motion.p>
        </div>

        <div className="flex h-[min(62svh,560px)] items-end gap-3 sm:gap-4 lg:col-span-6 lg:h-[min(80svh,780px)]">
          <Tower
            to="/osteria"
            img="/images/locale/sala-rossa.webp"
            index="01 — Dal pranzo"
            name="Osteria"
            place="Funo di Argelato"
            when="Pranzo · Cena"
            className="h-full"
            lean={0}
            delay={0.25}
          />
          <Tower
            to="/taverna"
            img="/images/taverna/fritti-spritz.webp"
            index="02 — Alla notte"
            name="Taverna"
            place="Castel Maggiore"
            when="Aperitivo · Cena · Dopocena"
            className="h-[78%]"
            lean={2.5}
            delay={0.45}
          />
        </div>
      </section>

      {/* DUE CASE */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Label className="text-accent">Una famiglia, due case</Label>
            <h2 className="mt-5 text-5xl leading-[0.95] sm:text-6xl">
              <Lines lines={['Stessa sfoglia,', <em className="font-light">due modi</em>, <em className="font-light">di stare insieme.</em>]} />
            </h2>
          </div>
          <Reveal className="text-lg leading-relaxed text-ink-soft lg:col-span-6 lg:col-start-7 lg:pt-14">
            <p>
              Prima è nata l’Osteria, a Funo: pasta tirata a mano, brodo di cappone e griglia, come nelle case bolognesi.
              Dal <strong className="font-semibold text-ink">3 ottobre 2026</strong> c’è anche la Taverna, al C.C. Le Piazze di
              Castel Maggiore: la stessa cucina diventa stuzzicheria, da mangiare con le mani e un bicchiere in compagnia.
            </p>
          </Reveal>
        </div>

        {/* Telefono: le due case una sotto l'altra */}
        <div className="mt-14 grid gap-4 md:hidden">
          {(['osteria', 'taverna'] as const).map((id) => (
            <Reveal key={id}>
              <Link to={`/${id}`} className={`block rounded-[22px] p-5 ${id === 'osteria' ? 'bg-paper-deep' : 'bg-taverna text-paper'}`}>
                <span className="flex items-center gap-3">
                  <img src={withBase(venues[id].logo)} alt="" className="h-12 w-12 rounded-full object-contain" />
                  <span className="font-display text-3xl">{venues[id].short}</span>
                  <ArrowUpRight size={18} className="ml-auto opacity-60" />
                </span>
                <dl className="mt-4">
                  {compare.map((r) => (
                    <div key={r.k} className={`grid grid-cols-[92px_1fr] gap-3 border-t py-3 text-[15px] ${id === 'osteria' ? 'border-ink/10' : 'border-paper/15'}`}>
                      <dt className="label pt-1 opacity-55">{r.k}</dt>
                      <dd>{id === 'osteria' ? r.o : r.t}</dd>
                    </div>
                  ))}
                </dl>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 hidden md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="align-bottom">
                <th className="w-[18%]" />
                {(['osteria', 'taverna'] as const).map((id) => (
                  <th key={id} className="w-[41%] pb-6 pr-6 font-normal">
                    <Link to={`/${id}`} className="group flex items-center gap-4">
                      <img src={withBase(venues[id].logo)} alt="" className="h-14 w-14 rounded-full object-contain" />
                      <span className={`font-display text-3xl ${id === 'osteria' ? 'text-osteria' : 'text-taverna'}`}>
                        {venues[id].short}
                        <ArrowUpRight size={18} className="ml-1 inline align-top opacity-50 transition group-hover:opacity-100" />
                      </span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.map((r) => (
                <tr key={r.k} className="border-t border-ink/15 align-top">
                  <th className="label py-5 pr-4 font-semibold text-ink/50">{r.k}</th>
                  <td className="py-5 pr-6 text-[17px]">{r.o}</td>
                  <td className="py-5 pr-6 text-[17px]">{r.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* TRE PIATTI */}
      <section className="bg-paper-deep py-24 md:py-36">
        <div className="shell">
          <h2 className="max-w-3xl text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
            <Lines lines={['Il Re, la Regina', <em className="font-light">e il ribelle.</em>]} />
          </h2>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {dishes.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08} className={d.offset}>
                <Link to={d.to} className="group block">
                  <div className="aspect-[4/5] overflow-hidden rounded-[6px]">
                    <div className="h-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">
                      <Img src={d.img} alt={d.dish} sizes="(max-width: 640px) 100vw, 33vw" />
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="text-4xl italic font-light">{d.title}</h3>
                    <span className="label text-ink/45">{d.where}</span>
                  </div>
                  <p className="mt-2 text-ink-soft">{d.dish}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VISITA */}
      <section id="visita" className="shell scroll-mt-20 py-24 md:py-32">
        <h2 className="mb-12 text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
          <Lines lines={['Prenota il tavolo,', <em className="font-light">scegli la torre.</em>]} />
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <VenueCard id="osteria" compact />
          </Reveal>
          <Reveal delay={0.1}>
            <VenueCard id="taverna" compact />
          </Reveal>
        </div>
      </section>
    </>
  )
}
