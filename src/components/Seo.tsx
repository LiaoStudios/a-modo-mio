import { Helmet } from 'react-helmet-async'
import { absUrl, SITE_NAME } from '../lib/site'

interface SeoProps {
  title: string
  description: string
  /** Percorso interno canonico, es. '/osteria/menu' */
  path: string
  image?: string
  imageAlt?: string
  noindex?: boolean
  jsonLd?: object
}

/** Tutti i meta tag di una pagina in un punto solo: titolo, description, canonical, Open Graph, Twitter, JSON-LD. */
export function Seo({ title, description, path, image = '/og-image.jpg', imageAlt = 'a Modo Mio — Osteria a Funo e Taverna a Castel Maggiore', noindex, jsonLd }: SeoProps) {
  const url = absUrl(path)
  const img = absUrl(image)
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
