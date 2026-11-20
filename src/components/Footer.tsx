import { Link } from 'react-router-dom'
import { brand, venues } from '../data/venues'
import { TowersMark } from './ui'

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="shell pb-10 pt-20">
        <div className="flex flex-col gap-14 md:flex-row md:justify-between">
          <div className="max-w-md">
            <p className="flex items-end gap-3 font-display text-6xl leading-none sm:text-7xl">
              <TowersMark className="h-[0.95em] w-auto text-butter" />
              <span>
                <em className="font-light">a</em> Modo Mio
              </span>
            </p>
            <p className="mt-6 text-paper/60">Due locali, una famiglia. La cucina bolognese come piace a noi — a tavola o al bancone.</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:gap-16">
            {(['osteria', 'taverna'] as const).map((id) => {
              const v = venues[id]
              return (
                <div key={id} className="text-sm">
                  <Link to={`/${id}`} className="font-display text-2xl hover:text-butter">
                    {v.name}
                  </Link>
                  <p className="mt-3 text-paper/60">
                    {v.address}
                    <br />
                    {v.zip} {v.locality} ({v.province})
                  </p>
                  <a href={v.phoneHref} className="mt-2 block hover:text-butter">
                    {v.phone}
                  </a>
                  <p className="mt-1 text-paper/60">{v.when}</p>
                  <div className="mt-4 flex gap-4 text-paper/80">
                    <a href={v.instagram} target="_blank" rel="noreferrer" className="hover:text-butter">
                      Instagram
                    </a>
                    {v.facebook && (
                      <a href={v.facebook} target="_blank" rel="noreferrer" className="hover:text-butter">
                        Facebook
                      </a>
                    )}
                    <a href={v.booking} target="_blank" rel="noreferrer" className="hover:text-butter">
                      TheFork
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-paper/15 pt-6 text-xs text-paper/45 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} a Modo Mio · {brand.company}</span>
          <span className="flex gap-4">
            <Link to="/privacy" className="hover:text-butter">
              Privacy e cookie
            </Link>
            <span>Funo di Argelato · Castel Maggiore · Bologna</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
