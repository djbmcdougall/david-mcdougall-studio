import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { episodes } from '../data/episodes'

const TOTAL = episodes.length

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function TravelSeries() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = (dir: number) => {
    setActive((prev) => (prev + dir + TOTAL) % TOTAL)
  }

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => go(1), 4000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [paused, active])

  const bind = useDrag(
    ({ swipe: [swipeX] }) => {
      if (swipeX !== 0) go(-swipeX)
    },
    { axis: 'x', swipe: { distance: 50 } },
  )

  return (
    <section
      style={{ padding: '80px 0 100px', overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Label */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        textAlign: 'center',
        marginBottom: 48,
      }}>
        Al Jazeera · 13-Part Travel Series
      </p>

      {/* 3D carousel */}
      <div
        {...bind()}
        style={{
          perspective: 1200,
          perspectiveOrigin: '50% 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 360,
          position: 'relative',
          touchAction: 'none',
        }}
      >
        {episodes.map((ep, i) => {
          const offset = ((i - active + TOTAL) % TOTAL + TOTAL) % TOTAL
          const pos = offset <= TOTAL / 2 ? offset : offset - TOTAL

          // Only render ±2 range
          if (Math.abs(pos) > 2) return null

          return (
            <CarouselCard
              key={ep.ep}
              ep={ep}
              pos={pos}
              onClick={() => pos !== 0 && go(pos > 0 ? 1 : -1)}
            />
          )
        })}
      </div>

      {/* Dot indicators */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        marginTop: 32,
      }}>
        {episodes.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === active ? 'var(--gold)' : 'var(--fg-faint)',
              border: 'none',
              padding: 0,
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  )
}

interface CardProps {
  ep: (typeof episodes)[0]
  pos: number
  onClick: () => void
}

function CarouselCard({ ep, pos, onClick }: CardProps) {
  const abs = Math.abs(pos)

  const transforms: Record<number, {
    rotateY: number; translateX: string; translateZ: number; scale: number; opacity: number
  }> = {
    0: { rotateY: 0,    translateX: '0%',    translateZ: 0,    scale: 1,    opacity: 1 },
    1: { rotateY: -28,  translateX: '55%',   translateZ: -120, scale: 0.88, opacity: 0.6 },
    2: { rotateY: -45,  translateX: '90%',   translateZ: -280, scale: 0.72, opacity: 0.3 },
   '-1': { rotateY: 28, translateX: '-55%',  translateZ: -120, scale: 0.88, opacity: 0.6 },
   '-2': { rotateY: 45, translateX: '-90%',  translateZ: -280, scale: 0.72, opacity: 0.3 },
  }

  const t = transforms[pos] ?? transforms[pos > 0 ? 2 : -2]

  return (
    <motion.div
      className="carousel-card"
      animate={{
        rotateY: t.rotateY,
        x: t.translateX,
        z: t.translateZ,
        scale: t.scale,
        opacity: t.opacity,
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      onClick={onClick}
      style={{
        position: 'absolute',
        width: 560,
        aspectRatio: '16/9',
        background: 'linear-gradient(135deg, #0f0e0d 0%, #1a1208 40%, #0d0d0c 100%)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        pointerEvents: abs === 0 ? 'none' : 'auto',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${ep.thumb})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.6,
      }} />

      {/* Gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(7,7,6,0.9) 0%, transparent 60%)',
      }} />

      {/* Episode number — top left */}
      <p style={{
        position: 'absolute',
        top: 16,
        left: 16,
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.18em',
        color: 'var(--gold)',
      }}>
        EP {pad(ep.ep)} / {pad(TOTAL)}
      </p>

      {/* Title — bottom left */}
      <p style={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 17,
        color: 'var(--fg)',
        maxWidth: '70%',
      }}>
        {ep.title}
      </p>

      {/* Location — bottom right */}
      <p style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.14em',
        color: 'var(--fg-dim)',
        textTransform: 'uppercase',
      }}>
        {ep.location}
      </p>
    </motion.div>
  )
}
