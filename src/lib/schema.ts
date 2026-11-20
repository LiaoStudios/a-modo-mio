import { absUrl } from './site'
import { venues, type Venue, type VenueId } from '../data/venues'

const DAY: Record<string, string> = {
  Lunedì: 'Monday',
  Martedì: 'Tuesday',
  Mercoledì: 'Wednesday',
  Giovedì: 'Thursday',
  Venerdì: 'Friday',
  Sabato: 'Saturday',
  Domenica: 'Sunday',
}
const ORDER = Object.keys(DAY)

/** Espande "Lunedì – Giovedì" / "Sabato" in una lista di giorni schema.org. */
function expandDays(label: string): string[] {
  const [from, to] = label.split(/\s[–-]\s/).map((s) => s.trim())
  const start = ORDER.indexOf(from)
  if (start < 0) return []
  const end = to ? ORDER.indexOf(to) : start
  return ORDER.slice(start, end + 1).map((d) => DAY[d])
}

/** Orari di apertura derivati dagli stessi dati mostrati a video (venues.hours): niente doppia fonte. */
export function openingHours(v: Venue) {
  return v.hours.flatMap((h) => {
    if (/chiuso/i.test(h.value)) return []
    const dayOfWeek = expandDays(h.days)
    return h.value.split('·').map((range) => {
      const [opens, closes] = range.trim().split('–').map((t) => t.trim())
      return { '@type': 'OpeningHoursSpecification', dayOfWeek, opens, closes }
    })
  })
}

const IMAGE: Record<VenueId, string> = {
  osteria: '/images/hero/osteria.webp',
  taverna: '/images/taverna/bologna-burger-2.webp',
}

export function restaurantSchema(id: VenueId, pagePath: string, withMenu = true) {
  const v = venues[id]
  return {
    '@type': 'Restaurant',
    '@id': `${absUrl(`/${id}`)}#restaurant`,
    name: v.name,
    url: absUrl(`/${id}`),
    image: absUrl(IMAGE[id]),
    logo: absUrl(v.logo),
    description: `${v.kind} a ${v.locality}. ${v.claim}`,
    servesCuisine: ['Bolognese', 'Emiliana'],
    telephone: v.phoneHref.replace('tel:', ''),
    acceptsReservations: 'True',
    ...(withMenu ? { hasMenu: absUrl(`/${id}/menu`) } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: v.address,
      addressLocality: v.locality,
      postalCode: v.zip,
      addressRegion: v.province,
      addressCountry: 'IT',
    },
    openingHoursSpecification: openingHours(v),
    sameAs: [v.instagram, v.booking, ...(v.facebook ? [v.facebook] : [])],
    mainEntityOfPage: absUrl(pagePath),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absUrl(it.path) })),
  }
}

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes })
