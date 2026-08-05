import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { episodes } from '../data/episodes'
import VideoLightbox, { type VideoSource } from './VideoLightbox'

const TOTAL = episodes.length

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function TravelSeries() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState<VideoSource | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const openLightbox = useCallback((youtubeId: string) => {
    setLightboxSrc({ type: 'youtube', id: youtubeId })
    setPaused(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null)
    setPaused(false)
  }, [])

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
      id="documentary"
      style={{ padding: '80px 0 100px', overflow: 'hidden', background: 'rgba(20,16,10,1)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Highlights reel embed */}
      <div className="section-pad" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 48,
        padding: '0 40px',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(200,169,110,0.6)',
          marginBottom: 16,
          textAlign: 'center',
        }}>
          Highlights Reel
        </p>
        <div style={{
          width: '100%',
          maxWidth: 720,
          aspectRatio: '16/9',
          background: '#000',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          border: '1px solid rgba(200,169,110,0.12)',
        }}>
          <iframe
            title="The Journey — Highlights Reel"
            src="https://player.vimeo.com/video/274317445?h=ab8b87d6e8&color=c8a96e&title=0&byline=0&portrait=0"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Label */}
      <h2 style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        textAlign: 'center',
        marginBottom: 48,
        fontWeight: 400,
      }}>
        The Journey · 15-Part Travel Series · Al Jazeera
      </h2>

      {/* 3D carousel */}
      <div
        {...bind()}
        className="carousel-stage"
        style={{
          perspective: 1200,
          perspectiveOrigin: '50% 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 360,
          position: 'relative',
          // pan-y, not none — otherwise a touch that starts on the carousel
          // can never scroll the page vertically
          touchAction: 'pan-y',
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
              onClick={() => pos === 0 ? openLightbox(ep.youtubeId) : go(pos > 0 ? 1 : -1)}
            />
          )
        })}
      </div>

      <VideoLightbox source={lightboxSrc} onClose={closeLightbox} />

      {/* Dot indicators — 6px pill inside a padded, finger-sized hit area */}
      <div className="carousel-dots" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        marginTop: 19, // 32 less the button's 13px vertical hit padding
      }}>
        {episodes.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to episode ${i + 1}`}
            aria-current={i === active}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              padding: '13px 4px',
              lineHeight: 0,
            }}
          >
            <span style={{
              display: 'block',
              width: i === active ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === active ? 'var(--gold)' : 'var(--fg-faint)',
              transition: 'width 0.3s ease, background 0.3s ease',
            }} />
          </button>
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
        pointerEvents: 'auto',
        cursor: abs === 0 ? 'pointer' : 'pointer',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Thumbnail — maxresdefault with hqdefault fallback via hidden img */}
      <img
        src={ep.thumb}
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* Gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(7,7,6,0.9) 0%, transparent 60%)',
      }} />

      {/* Play button — centre, active card only */}
      {abs === 0 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'rgba(200,169,110,0.15)',
          border: '1px solid rgba(200,169,110,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          pointerEvents: 'none',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3L13 8L5 13V3Z" fill="var(--gold)" />
          </svg>
        </div>
      )}

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
