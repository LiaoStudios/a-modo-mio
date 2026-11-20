# a Modo Mio — Osteria (Funo) + Taverna (Castel Maggiore)

Sito unico per i due locali della stessa famiglia:

- **Osteria a Modo Mio** — Via Galliera 115, Funo di Argelato · cucina tipica bolognese, pranzo e cena
- **Taverna a Modo Mio** — Via Pio La Torre 2E, Castel Maggiore (C.C. Le Piazze) · stuzzicheria tipica bolognese, dalle 17:30 a tarda notte (aperta il 3 ottobre 2026)

Vite + React + TypeScript + Tailwind + Framer Motion.

## Avvio

```bash
npm install
npm run dev        # http://localhost:5180/a-modo-mio/
npm run build      # dist/ (+ 404.html per i link diretti su GitHub Pages)
```

> La cartella contiene `:` nel nome: per questo gli script usano `node node_modules/...`.

## Pagine

| URL | Contenuto |
| --- | --- |
| `/` | Home "a Modo Mio": hero con le **Due Torri** (Osteria = Asinelli, alta · Taverna = Garisenda, più bassa e pendente), confronto tra le due case, tre piatti simbolo, contatti di entrambi |
| `/osteria` | Hero, Il Re e la Regina, estratto del menu, gallery, orari/mappa/prenota |
| `/taverna` | Hero prugna, stuzzicheria (carosello), Bologna Burger + "componilo tu", primi e secondi, gallery, orari/mappa/prenota |
| `/osteria/menu` · `/taverna/menu` | Menu completi con selettore tra i due locali |

## Design

- Palette presa dai locali: **bordeaux** (velluto delle sale dell'Osteria), **prugna** (grembiule del logo Taverna), **giallo burro** (manifesti della Taverna), carta calda.
- Font: **Fraunces** (titoli grandi, corsivo) + **Instrument Sans**.
- Un solo motivo forte: le Due Torri, nella home e nel segno del marchio (`TowersMark` in `src/components/ui.tsx`). Nessun effetto cursore.
- Il colore di contesto (`--accent`) cambia tra Osteria e Taverna.

## Dove modificare

- `src/data/venues.ts` — indirizzi, telefoni, orari, link TheFork/Instagram, valutazioni
- `src/data/menus.ts` — i due menu (Osteria da osteriaamodomio.it, Taverna da TheFork 13/10/2026)
- Foto Taverna: `Taverna/GoogleBusiness`, `Taverna/Instagram` → `npm run images:taverna` → `public/images/taverna/`
- Foto Osteria: `GoogleBusiness/` → `npm run images` → `public/images/*`
- Logo Taverna: ritagliato dal manifesto dell'inaugurazione → `public/logo-taverna.webp`

## Pubblicazione e SEO

- Online su GitHub Pages: https://liaostudios.github.io/a-modo-mio/ — il deploy parte da solo a ogni push su `main` (`.github/workflows/deploy.yml`).
- `npm run build` fa: type-check → build → bundle SSR → `scripts/prerender.mjs`, che scrive un HTML statico per ogni rotta (`/osteria/`, `/taverna/`, menù, privacy) con title, description, canonical, Open Graph e JSON-LD (Restaurant) già nel markup, più `sitemap.xml` e `robots.txt`. Serve perché GitHub Pages risponde 404 agli URL che non sono file.
- Titoli/description/schema di ogni pagina: componente `src/components/Seo.tsx` + `src/lib/schema.ts` (gli orari nello schema derivano da `venues.ts`, nessuna doppia fonte).
- Nuova pagina? Aggiungila anche all'array `routes` di `scripts/prerender.mjs`.
- Dominio proprio: impostare `VITE_SITE_URL` (es. `https://amodomio.it`), `base` in `vite.config.ts`, `basename` in `src/main.tsx` e `src/entry-server.tsx`, e `BASE` in `scripts/prerender.mjs`.
- Nessun cookie né servizio esterno al caricamento: font self-hosted, mappa Google caricata solo dopo click.

## Base path

`base` = `/a-modo-mio/` in `vite.config.ts` e `basename` in `src/main.tsx`. Per pubblicare nella radice di un dominio mettere `/` in entrambi.

La versione precedente (solo Osteria) è in `_archivio/sito-solo-osteria-v1/`.

Vedi **DA-VERIFICARE.md** per i dati da confermare col titolare.
