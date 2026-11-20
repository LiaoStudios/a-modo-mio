import { Link } from 'react-router-dom'
import { brand, venues } from '../data/venues'
import { Label } from '../components/ui'
import { Seo } from '../components/Seo'

const h2 = 'mt-12 text-2xl leading-tight sm:text-3xl'
const p = 'mt-4 leading-relaxed text-ink-soft'

export function Privacy() {
  return (
    <div className="pt-24">
      <Seo
        path="/privacy"
        noindex
        title="Informativa privacy e cookie | a Modo Mio"
        description="Informativa sul trattamento dei dati personali e sui cookie del sito a Modo Mio (Osteria a Funo di Argelato e Taverna a Castel Maggiore)."
      />
      <section className="shell max-w-3xl pb-24 pt-10 md:pt-16">
        <Label className="text-osteria">Informativa</Label>
        <h1 className="mt-4 text-[clamp(2.6rem,6vw,4.6rem)] font-normal leading-[0.95]">Privacy e cookie</h1>
        <p className="mt-4 text-sm text-ink-soft">Ultimo aggiornamento: 20 novembre 2026 · ai sensi degli artt. 13-14 del Regolamento (UE) 2016/679 (GDPR)</p>

        <h2 className={h2}>Titolare del trattamento</h2>
        <p className={p}>
          {brand.company}, per i locali {venues.osteria.name} ({venues.osteria.address}, {venues.osteria.zip} {venues.osteria.locality}) e{' '}
          {venues.taverna.name} ({venues.taverna.address}, {venues.taverna.zip} {venues.taverna.locality}). Contatti: Osteria{' '}
          <a className="underline" href={venues.osteria.phoneHref}>
            {venues.osteria.phone}
          </a>
          , Taverna{' '}
          <a className="underline" href={venues.taverna.phoneHref}>
            {venues.taverna.phone}
          </a>
          .
        </p>

        <h2 className={h2}>Che dati trattiamo</h2>
        <p className={p}>
          Questo sito è una vetrina informativa: <strong>non ha moduli, account, newsletter né sistemi di prenotazione propri</strong> e non raccoglie
          direttamente dati personali dei visitatori. Le prenotazioni avvengono su TheFork, per telefono o via WhatsApp, con le rispettive
          informative.
        </p>
        <p className={p}>
          Come ogni sito, il fornitore di hosting (GitHub Pages, GitHub Inc.) può trattare dati tecnici di navigazione, come l’indirizzo IP e i log di accesso,
          necessari a erogare il servizio e a garantirne la sicurezza. Ciò può comportare trasferimenti verso paesi extra-UE, in particolare gli Stati Uniti: le
          garanzie adottate sono descritte da GitHub nella{' '}
          <a className="underline" href="https://docs.github.com/it/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noreferrer">
            propria informativa
          </a>
          .
        </p>

        <h2 className={h2}>Cookie</h2>
        <p className={p}>
          Il sito <strong>non imposta cookie propri</strong>, non usa strumenti di analisi o statistica e non effettua profilazione né pubblicità. I font sono
          ospitati sul sito stesso: non vengono caricati da servizi esterni. Per questo non è necessario un banner di consenso.
        </p>

        <h2 className={h2}>Contenuti di terze parti</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-ink-soft">
          <li>
            <strong>Google Maps</strong>: la mappa si carica <em>solo dopo il tuo click</em> su «Carica la mappa». Fino ad allora non viene contattato alcun
            server Google. Dopo il caricamento Google può impostare cookie e trattare dati secondo la{' '}
            <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
              propria informativa
            </a>
            .
          </li>
          <li>
            <strong>TheFork, Instagram, Facebook, WhatsApp</strong>: sono semplici collegamenti. Solo se li apri, il relativo servizio tratta i tuoi dati secondo la propria
            informativa.
          </li>
        </ul>

        <h2 className={h2}>I tuoi diritti</h2>
        <p className={p}>
          Puoi chiedere al Titolare l’accesso ai dati, la rettifica, la cancellazione, la limitazione, la portabilità, e opporti al trattamento, ai
          contatti indicati sopra. Hai inoltre diritto di proporre reclamo al{' '}
          <a className="underline" href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">
            Garante per la protezione dei dati personali
          </a>
          .
        </p>

        <p className="mt-12">
          <Link to="/" className="underline">
            ← Torna alla home
          </Link>
        </p>
      </section>
    </div>
  )
}
