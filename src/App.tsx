import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Osteria } from './pages/Osteria'
import { Taverna } from './pages/Taverna'
import { MenuPage } from './pages/MenuPage'
import { Privacy } from './pages/Privacy'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 80)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  // Il colore di contesto (var --accent) segue il locale della pagina.
  const venue = pathname.startsWith('/taverna') ? 'taverna' : 'osteria'
  return (
    <div data-venue={venue}>
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/osteria" element={<Osteria />} />
          <Route path="/osteria/menu" element={<MenuPage id="osteria" />} />
          <Route path="/taverna" element={<Taverna />} />
          <Route path="/taverna/menu" element={<MenuPage id="taverna" />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/menu" element={<MenuPage id="osteria" />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
