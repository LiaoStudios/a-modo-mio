import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useScrollLock } from '../lib/useScrollLock'
import { venues, type VenueId } from '../data/venues'
import { Wordmark } from './ui'

export function currentVenue(pathname: string): VenueId | null {
  if (pathname.startsWith('/osteria')) return 'osteria'
  if (pathname.startsWith('/taverna')) return 'taverna'
  return null
}

export function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useScrollLock(open)
  const v = currentVenue(pathname)
  // La pagina Taverna parte con un hero scuro: finché non si scorre, la barra è chiara su prugna.
  const onDark = pathname === '/taverna' && !scrolled && !open

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/osteria', label: 'Osteria', sub: 'Funo' },
    { to: '/taverna', label: 'Taverna', sub: 'Castel Maggiore' },
    { to: `/${v ?? 'osteria'}/menu`, label: 'Menù', sub: '' },
  ]

  const book = v ? (
    <a
      href={venues[v].booking}
      target="_blank"
      rel="noreferrer"
      className={`btn !px-5 !py-2.5 ${onDark ? 'bg-butter text-taverna-deep hover:bg-paper' : 'bg-accent text-paper hover:bg-ink'}`}
    >
      Prenota <span className="hidden sm:inline">{v === 'osteria' ? 'in Osteria' : 'in Taverna'}</span>
    </a>
  ) : (
    <a href="#visita" className="btn-solid !px-5 !py-2.5">
      Prenota
    </a>
  )

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-300 ${
          scrolled || open ? 'border-b border-ink/10 bg-paper/90 backdrop-blur-md' : 'border-b border-transparent bg-paper/0'
        } ${onDark ? 'text-paper' : 'text-ink'}`}
      >
        <div className="shell flex h-16 items-center justify-between gap-4">
          <Link to="/" className="text-[26px]" aria-label="a Modo Mio — home">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Principale">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `group relative text-sm font-medium transition-colors ${
                    onDark ? (isActive ? 'text-butter' : 'opacity-80 hover:opacity-100') : isActive ? 'text-accent' : 'text-ink/75 hover:text-ink'
                  }`
                }
              >
                {l.label}
                {l.sub && <span className="ml-1.5 opacity-50">· {l.sub}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {book}
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-current md:hidden"
              aria-label={open ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-paper px-4 pb-8 pt-24 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col" aria-label="Menu mobile">
              <Link to="/" className="rule py-4 font-display text-4xl italic">Home</Link>
              {links.map((l) => (
                <Link key={l.label} to={l.to} className="rule flex items-baseline justify-between py-4">
                  <span className="font-display text-4xl">{l.label}</span>
                  <span className="text-sm text-ink/50">{l.sub}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-auto grid grid-cols-2 gap-3 text-sm">
              {(['osteria', 'taverna'] as const).map((id) => (
                <a key={id} href={venues[id].phoneHref} className="rounded-2xl bg-paper-deep p-4">
                  <span className="label text-ink/50">{venues[id].short}</span>
                  <span className="mt-1 flex items-center gap-1 font-semibold">
                    {venues[id].phone} <ArrowUpRight size={14} />
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
