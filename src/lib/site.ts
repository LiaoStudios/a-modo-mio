// URL pubblico del sito. Su GitHub Pages è https://<utente>.github.io/a-modo-mio.
// Con un dominio proprio: impostare VITE_SITE_URL (es. https://amodomio.it) e `base` in vite.config.ts.
const raw = (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://liaostudios.github.io/a-modo-mio'

export const SITE_URL = raw.replace(/\/+$/, '')
export const SITE_NAME = 'a Modo Mio'

/**
 * URL assoluto di un percorso interno. Le pagine sono servite da GitHub Pages come cartelle (`/osteria/index.html`),
 * quindi l'URL canonico ha lo slash finale; i file (immagini, ecc.) restano com'sono.
 */
export const absUrl = (path: string) => {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${/\.[a-z0-9]+$/i.test(p) || p.endsWith('/') ? p : `${p}/`}`
}
