import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { withBase } from '../lib/paths'

const ease = [0.22, 1, 0.36, 1] as const

/** Foto responsive: usa la versione -sm per schermi piccoli. */
export function Img({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  eager = false,
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
  eager?: boolean
}) {
  const full = withBase(src)
  const sm = withBase(src.replace(/\.webp$/, '-sm.webp'))
  return (
    <img
      src={full}
      srcSet={`${sm} 800w, ${full} 1600w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  )
}

/** Comparsa leggera allo scroll (una sola volta). */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Titolo con le righe che salgono da una maschera. */
export function Lines({ lines, className = '', delay = 0, onLoad = false }: { lines: ReactNode[]; className?: string; delay?: number; onLoad?: boolean }) {
  const reduce = useReducedMotion()
  // L'osservatore sta sul contenitore (visibile), non sulle righe mascherate:
  // una riga spostata fuori dalla maschera non risulterebbe mai "in vista".
  return (
    <motion.span
      className={`block ${className}`}
      initial={reduce ? false : 'hidden'}
      {...(onLoad ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.3 } })}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease, delay: delay + i * 0.09 } } }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Il segno del marchio: le Due Torri. La Garisenda (la Taverna) pende un po’. */
export function TowersMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 34" className={className} fill="currentColor" aria-hidden="true">
      <rect x="7.5" y="0" width="2" height="3" />
      <rect x="5.5" y="2.5" width="6" height="31.5" />
      <rect x="14.5" y="12" width="6" height="22" transform="rotate(5 17.5 34)" />
    </svg>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-2 leading-none ${className}`}>
      <TowersMark className="h-[1.15em] w-auto" />
      <span className="font-display italic tracking-tight">
        a <span className="not-italic font-medium">Modo Mio</span>
      </span>
    </span>
  )
}

export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`label block ${className}`}>{children}</span>
}

export function Price({ value }: { value: string }) {
  return <span className="font-display tabular-nums">{value} €</span>
}
