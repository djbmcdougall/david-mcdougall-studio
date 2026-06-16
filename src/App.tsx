import { lazy, Suspense, useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Cursor from './components/Cursor'
import GrainOverlay from './components/GrainOverlay'
import CursorTrail from './components/CursorTrail'
import BootSequence from './components/BootSequence'
import Nav from './components/Nav'
import Tagline from './components/Tagline'
import Showreel from './components/Showreel'
import ClientLogos from './components/ClientLogos'
import Hero from './components/Hero'
import Pillars from './components/Pillars'
import PortfolioGrid from './components/PortfolioGrid'
import TravelSeries from './components/TravelSeries'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

const CVPage = lazy(() => import('./pages/CVPage'))

export default function App() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    document.body.style.overflow = booted ? 'auto' : 'hidden'
  }, [booted])

  return (
    // reducedMotion="user" makes all Framer Motion animations respect prefers-reduced-motion
    <MotionConfig reducedMotion="user">
      <Analytics />
      <a href="#hero" className="skip-link">Skip to content</a>
      <Cursor />
      <GrainOverlay />
      <CursorTrail active={booted} />
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      {/* No opacity gate — content renders immediately for crawlers and LCP.
          BootSequence overlays as position:fixed so users still see the animation. */}
      <div style={{ pointerEvents: booted ? 'auto' : 'none' }}>
        <Nav />
        <Routes>
          <Route path="/" element={
            <main style={{ paddingTop: 84 }}>
              <Tagline />
              <Showreel />
              <ClientLogos />
              <Hero booted={booted} />
              <Pillars />
              <PortfolioGrid />
              <TravelSeries />
              <Testimonials />
              <CTA />
            </main>
          } />
          <Route path="/cv" element={<Suspense fallback={null}><CVPage /></Suspense>} />
        </Routes>
        <Footer />
      </div>
    </MotionConfig>
  )
}
