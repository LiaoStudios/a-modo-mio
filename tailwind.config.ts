import type { Config } from 'tailwindcss'

// a Modo Mio — palette dai due locali:
// Osteria = bordeaux del velluto delle sale · Taverna = prugna del grembiule del logo + giallo burro dei manifesti.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#F4EEE5', deep: '#E9E0D2' },
        ink: { DEFAULT: '#1B1512', soft: '#4A403A' },
        osteria: { DEFAULT: '#7A1E2C', deep: '#4D111B', soft: '#B5525C' },
        taverna: { DEFAULT: '#4A1E40', deep: '#2A0F25', soft: '#7D4A70' },
        butter: { DEFAULT: '#F0CF78', soft: '#F7E6B8' },
        // Colore "di contesto": cambia con la pagina (var CSS impostata da <VenueTheme>)
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans Variable"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.22em',
      },
    },
  },
  plugins: [],
} satisfies Config
