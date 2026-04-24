import { useEffect, useState } from 'react'
import Cursor from './components/Cursor'
import GrainOverlay from './components/GrainOverlay'
import BootSequence from './components/BootSequence'
import Nav from './components/Nav'
import ClientLogos from './components/ClientLogos'
import Hero from './components/Hero'
import Showreel from './components/Showreel'
import Pillars from './components/Pillars'
import PortfolioGrid from './components/PortfolioGrid'
import TravelSeries from './components/TravelSeries'
import Writing from './components/Writing'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    document.body.style.overflow = booted ? 'auto' : 'hidden'
  }, [booted])

  return (
    <>
      <Cursor />
      <GrainOverlay />
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <div
        style={{
          opacity: booted ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: booted ? 'auto' : 'none',
        }}
      >
        <Nav />
        <ClientLogos />
        <main style={{ paddingTop: 84 }}>
          <Hero booted={booted} />
          <Showreel />
          <Pillars />
          <PortfolioGrid />
          <TravelSeries />
          <Writing />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
