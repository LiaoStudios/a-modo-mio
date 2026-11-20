// Dati dei due locali "a Modo Mio" — unica fonte per contatti, orari, prenotazioni.
// Fonti: scheda Google, TheFork, Instagram, osteriaamodomio.it (novembre 2026).
// ⚠️ Vedi DA-VERIFICARE.md per i dati da confermare col titolare.

export type VenueId = 'osteria' | 'taverna'

export interface Venue {
  id: VenueId
  name: string
  short: string
  kind: string
  claim: string
  when: string
  address: string
  locality: string
  zip: string
  province: string
  note?: string
  phone: string
  phoneHref: string
  whatsapp?: string
  hours: { days: string; value: string }[]
  promo?: string
  rating: { value: string; count: string; source: string }
  booking: string
  maps: string
  mapsEmbed: string
  instagram: string
  facebook?: string
  logo: string
}

export const venues: Record<VenueId, Venue> = {
  osteria: {
    id: 'osteria',
    name: 'Osteria a Modo Mio',
    short: 'Osteria',
    kind: 'Cucina tipica bolognese',
    claim: 'La sfoglia tirata a mano, il brodo di cappone, la griglia. A tavola come una volta.',
    when: 'Pranzo e cena',
    address: 'Via Galliera, 115',
    locality: 'Funo di Argelato',
    zip: '40050',
    province: 'BO',
    phone: '051 316 8533',
    phoneHref: 'tel:+390513168533',
    whatsapp: 'https://wa.me/390513168533',
    hours: [
      { days: 'Lunedì', value: '12:30–14:30 · 19:30–22:30' },
      { days: 'Martedì', value: '12:30–14:30 · 19:30–22:30' },
      { days: 'Mercoledì', value: 'Chiuso' },
      { days: 'Giovedì', value: '12:30–14:30 · 19:30–22:30' },
      { days: 'Venerdì', value: '12:30–14:30 · 19:30–22:30' },
      { days: 'Sabato', value: '12:30–14:30 · 19:30–22:30' },
      { days: 'Domenica', value: '12:30–14:30' },
    ],
    promo: '−20% sul menù alla carta a pranzo, dal lunedì al venerdì',
    rating: { value: '4,6', count: '900+ recensioni', source: 'Google' },
    booking: 'https://www.thefork.it/ristorante/osteria-a-modo-mio-r687145',
    maps: 'https://www.google.com/maps/dir/?api=1&destination=Osteria+a+Modo+Mio+Via+Galliera+115+Funo+di+Argelato',
    mapsEmbed: 'https://www.google.com/maps?q=Osteria+a+Modo+Mio+Via+Galliera+115+Funo+di+Argelato&output=embed',
    instagram: 'https://www.instagram.com/osteriaamodomio/',
    facebook: 'https://www.facebook.com/osteriaamodomiofuno',
    logo: '/logo.webp',
  },
  taverna: {
    id: 'taverna',
    name: 'Taverna a Modo Mio',
    short: 'Taverna',
    kind: 'Stuzzicheria tipica bolognese',
    claim: 'Crescentine, fritti, taglieri e il Bologna Burger. Dall’aperitivo a tarda notte.',
    when: 'Dalle 17:30 a tarda notte',
    address: 'Via Pio La Torre, 2E',
    locality: 'Castel Maggiore',
    zip: '40013',
    province: 'BO',
    note: 'C.C. Le Piazze · parcheggio comodo',
    phone: '352 284 4723',
    phoneHref: 'tel:+393522844723',
    whatsapp: 'https://wa.me/393522844723',
    hours: [
      { days: 'Lunedì – Giovedì', value: '17:30–01:00' },
      { days: 'Venerdì – Sabato', value: '17:30–02:00' },
      { days: 'Domenica', value: '17:30–01:00' },
    ],
    rating: { value: '4,9', count: '39 recensioni', source: 'Google' },
    booking: 'https://www.thefork.it/ristorante/taverna-a-modo-mio-r869468',
    maps: 'https://www.google.com/maps/dir/?api=1&destination=Taverna+A+Modo+Mio+Via+Pio+La+Torre+2E+Castel+Maggiore',
    mapsEmbed: 'https://www.google.com/maps?q=Taverna+A+Modo+Mio+Via+Pio+La+Torre+2E+Castel+Maggiore&output=embed',
    instagram: 'https://www.instagram.com/tavernaamodomio/',
    logo: '/logo-taverna.webp',
  },
}

export const brand = {
  company: 'Galliera 115 Srl · P.IVA 03934511209',
}
