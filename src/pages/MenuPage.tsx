import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { menus } from '../data/menus'
import { venues, type VenueId } from '../data/venues'
import { Label, Lines, Price } from '../components/ui'
import { Seo } from '../components/Seo'
import { breadcrumbSchema, graph } from '../lib/schema'
import { absUrl } from '../lib/site'

export function MenuPage({ id }: { id: VenueId }) {
  const v = venues[id]
  const sections = menus[id]
  const tone = id === 'osteria' ? 'text-osteria' : 'text-taverna'

  return (
    <div data-venue={id} className="pt-24">
      <Seo
        path={`/${id}/menu`}
        title={`Menù ${v.name} | ${v.kind} a ${v.locality}`}
        description={`Il menù di ${v.name} a ${v.locality} (${v.province}): ${sections.map((s) => s.title.toLowerCase()).join(', ')}. Prezzi e piatti aggiornati.`}
        image={id === 'osteria' ? '/images/hero/osteria.webp' : '/images/taverna/bologna-burger-2.webp'}
        jsonLd={graph(
          { '@type': 'Menu', name: `Menù ${v.name}`, url: absUrl(`/${id}/menu`), inLanguage: 'it-IT', mainEntityOfPage: absUrl(`/${id}/menu`) },
          breadcrumbSchema([
            { name: 'a Modo Mio', path: '/' },
            { name: v.name, path: `/${id}` },
            { name: 'Menù', path: `/${id}/menu` },
          ]),
        )}
      />

      <section className="shell pb-10 pt-10 md:pt-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Label className={tone}>
              {v.kind} · {v.locality}
            </Label>
            <h1 className="mt-4 text-[clamp(3.2rem,8vw,7rem)] font-normal leading-[0.9]">
              <Lines onLoad lines={['Il menù', <em className={`font-light ${tone}`}>{id === 'osteria' ? 'dell’Osteria' : 'della Taverna'}</em>]} />
            </h1>
          </div>
          <div className="flex rounded-full border border-ink/15 p-1 text-sm font-semibold" role="tablist" aria-label="Scegli il locale">
            {(['osteria', 'taverna'] as const).map((x) => (
              <Link
                key={x}
                to={`/${x}/menu`}
                role="tab"
                aria-selected={x === id}
                className={`rounded-full px-5 py-2.5 transition ${x === id ? 'bg-accent text-paper' : 'text-ink/60 hover:text-ink'}`}
              >
                {venues[x].short}
              </Link>
            ))}
          </div>
        </div>

        <nav className="sticky top-16 z-30 -mx-4 mt-12 flex gap-2 overflow-x-auto border-y border-ink/10 bg-paper/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 md:-mx-10 md:px-10" aria-label="Sezioni del menù">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full px-4 py-1.5 text-sm text-ink/70 hover:bg-paper-deep hover:text-ink">
              {s.title}
            </a>
          ))}
        </nav>
      </section>

      <div className="shell pb-24">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="grid scroll-mt-36 gap-6 border-t border-ink/15 py-12 md:grid-cols-12 md:py-16">
            <div className="md:col-span-4">
              <h2 className="text-4xl italic font-light md:text-5xl">{s.title}</h2>
              {s.note && <p className="mt-3 max-w-xs text-ink/55">{s.note}</p>}
            </div>
            <ul className="md:col-span-8">
              {s.dishes.map((d) => (
                <li key={d.name} className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4 last:border-0">
                  <span>
                    <span className="flex items-center gap-2 font-medium">
                      {d.name}
                      {d.star && <Star size={13} className={`shrink-0 fill-current ${tone}`} aria-label="Consigliato" />}
                    </span>
                    {d.desc && <span className="mt-1 block text-sm text-ink/55">{d.desc}</span>}
                  </span>
                  <span className="shrink-0 text-lg">
                    <Price value={d.price} />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="mt-6 text-sm text-ink/50">
          Prezzi in euro, IVA inclusa. Il menù può variare con la stagione. Per allergie e intolleranze chiedi al personale.
        </p>
        <a href={v.booking} target="_blank" rel="noreferrer" className="btn-solid mt-8">
          Prenota in {v.short}
        </a>
      </div>
    </div>
  )
}
