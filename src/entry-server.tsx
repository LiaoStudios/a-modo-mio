import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import App from './App'

/** Render statico di una rotta (usato da scripts/prerender.mjs dopo la build). */
export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {}
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url} basename="/a-modo-mio">
        <App />
      </StaticRouter>
    </HelmetProvider>,
  )
  const h = helmetContext.helmet!
  const head = [h.title, h.meta, h.link, h.script].map((t) => t.toString()).join('\n    ')
  return { html, head }
}
