import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Phone, MapPin, Star } from 'lucide-react'
import { venues, type VenueId } from '../data/venues'
import { withBase } from '../lib/paths'
import { Label, Lines, Reveal } from './ui'

/** Blocco "vieni a trovarci" di un locale: orari, contatti, mappa, prenotazione. */
export function VenueCard({ id, compact = false }: { id: VenueId; compact?: boolean }) {
  const v = venues[id]
  const dark = id === 'taverna'
  return (
    <div
      className={`flex h-full flex-col rounded-[28px] p-6 sm:p-8 md:p-10 ${
        dark ? 'bg-taverna text-paper' : 'bg-paper-deep text-ink'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <Label className={dark ? 'text-butter' : 'text-osteria'}>{v.kind}</Label>
          <h3 className="mt-3 text-3xl leading-none sm:text-4xl">
            {v.short} <span className="italic font-light">a Modo Mio</span>
          </h3>
        </div>
        <img src={withBase(v.logo)} alt="" className="h-16 w-16 shrink-0 rounded-full object-contain sm:h-20 sm:w-20" />
      </div>

      <div className={`mt-8 grid gap-6 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div className="space-y-4 text-[15px]">
          <a href={v.maps} target="_blank" rel="noreferrer" className="flex gap-3 hover:underline">
            <MapPin size={18} className="mt-0.5 shrink-0 opacity-60" />
            <span>
              {v.address}, {v.zip} {v.locality} ({v.province})
              {v.note && <span className="block opacity-60">{v.note}</span>}
            </span>
          </a>
          <a href={v.phoneHref} className="flex gap-3 hover:underline">
            <Phone size={18} className="mt-0.5 shrink-0 opacity-60" />
            {v.phone}
          </a>
          <p className="flex gap-3">
            <Star size={18} className="mt-0.5 shrink-0 opacity-60" />
            <span>
              <strong className="font-semibold">{v.rating.value}</strong> su {v.rating.source} · {v.rating.count}
            </span>
          </p>
        </div>

        <dl className="text-[15px]">
          {v.hours.map((h) => (
            <div key={h.days} className={`flex justify-between gap-4 border-b py-2 ${dark ? 'border-paper/15' : 'border-ink/10'}`}>
              <dt className="opacity-70">{h.days}</dt>
              <dd className={`text-right tabular-nums ${h.value === 'Chiuso' ? 'opacity-50' : ''}`}>{h.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {v.promo && (
        <p className={`mt-6 rounded-2xl px-4 py-3 text-sm font-medium ${dark ? 'bg-paper/10' : 'bg-osteria/10 text-osteria-deep'}`}>{v.promo}</p>
      )}

      <div className="mt-auto flex flex-wrap gap-3 pt-8">
        <a
          href={v.booking}
          target="_blank"
          rel="noreferrer"
          className={`btn ${dark ? 'bg-butter text-taverna-deep hover:bg-paper' : 'bg-osteria text-paper hover:bg-ink'}`}
        >
          Prenota su TheFork <ArrowUpRight size={16} />
        </a>
        {v.whatsapp && (
          <a href={v.whatsapp} target="_blank" rel="noreferrer" className="btn-line">
            WhatsApp
          </a>
        )}
        <a href={v.maps} target="_blank" rel="noreferrer" className="btn-line">
          Indicazioni
        </a>
      </div>
    </div>
  )
}

/** Sezione finale di una pagina locale: card + mappa. */
export function VenueVisit({ id }: { id: VenueId }) {
  return (
    <section id="visita" className="shell scroll-mt-20 py-24 md:py-32">
      <h2 className="mb-12 text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
        <Lines lines={['Ci vediamo', <em className="font-light">{id === 'osteria' ? 'a tavola.' : 'in Taverna.'}</em>]} />
      </h2>
      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <Reveal>
          <VenueCard id={id} />
        </Reveal>
        <Reveal delay={0.1} className="min-h-[340px] overflow-hidden rounded-[28px] bg-paper-deep">
          <MapEmbed id={id} />
        </Reveal>
      </div>
    </section>
  )
}

/** Mappa Google caricata solo dopo un click: finché l'utente non sceglie, nessun dato parte verso Google. */
function MapEmbed({ id }: { id: VenueId }) {
  const v = venues[id]
  const [loaded, setLoaded] = useState(false)
  if (loaded) {
    return (
      <iframe
        title={`Mappa — ${v.name}`}
        src={v.mapsEmbed}
        className="h-full min-h-[340px] w-full grayscale-[0.6]"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  }
  return (
    <div className="flex h-full min-h-[340px] flex-col items-center justify-center gap-4 p-8 text-center">
      <MapPin size={28} className="opacity-60" />
      <p className="max-w-xs text-sm text-ink-soft">
        La mappa è fornita da Google Maps: caricandola, Google può ricevere dati sulla tua visita e impostare cookie. Vedi l’
        <Link to="/privacy" className="underline">
          informativa
        </Link>
        .
      </p>
      <button type="button" onClick={() => setLoaded(true)} className="btn bg-osteria text-paper hover:bg-ink">
        Carica la mappa
      </button>
      <a href={v.maps} target="_blank" rel="noreferrer" className="text-sm underline">
        oppure apri le indicazioni stradali
      </a>
    </div>
  )
}
