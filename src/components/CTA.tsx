import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── @wired_zone Instagram portfolio images ────────────────────────────────────
const IG_IMAGES = [
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2012.17.28.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.11.14.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.11.22.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.11.37.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.11.45.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.12.01.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.12.20.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.12.47.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.13.06.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.13.19.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.13.37.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.14.07.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.14.29.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.14.40.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.14.56.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.15.17.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.15.45.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.16.01.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.16.12.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.16.22.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.16.32.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.16.51.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.16.56.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.17.53.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.18.03.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.18.22.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.18.30.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.18.38.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.18.56.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.19.21.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.19.37.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.19.52.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.20.01.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.20.10.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.20.16.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.20.30.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.20.39.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.20.46.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.21.38.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.21.46.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.21.56.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.22.16.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.22.25.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.22.50.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.23.08.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.23.24.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.23.33.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.23.56.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.24.18.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.24.27.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.24.55.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.25.05.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.25.16.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.25.46.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.26.16.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.26.42.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.27.41.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.28.01.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.28.34.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.29.07.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.29.27.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.29.52.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.30.09.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.30.27.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.31.05.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.31.31.png',
  '/Portfolio%20IG%20Pictures/Screenshot%202026-05-17%20at%2022.32.01.png',
]

// Cycle image every N pixels of cursor travel
const CYCLE_DISTANCE = 90

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [imgKey, setImgKey] = useState(0)          // forces re-mount for fade-in
  const distRef = useRef(0)
  const lastPosRef = useRef({ x: 0, y: 0 })

  const imgRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return

    // Position relative to section (absolute, not fixed)
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (imgRef.current) {
      imgRef.current.style.left = `${x}px`
      imgRef.current.style.top  = `${y}px`
    }

    // Cycle to next image after enough movement
    const dx = e.clientX - lastPosRef.current.x
    const dy = e.clientY - lastPosRef.current.y
    distRef.current += Math.sqrt(dx * dx + dy * dy)
    lastPosRef.current = { x: e.clientX, y: e.clientY }

    if (distRef.current >= CYCLE_DISTANCE) {
      distRef.current = 0
      setImgIndex(i => (i + 1) % IG_IMAGES.length)
      setImgKey(k => k + 1)
    }
  }, [])

  const handleMouseEnter = useCallback(() => setActive(true), [])
  const handleMouseLeave = useCallback(() => setActive(false), [])

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: '100px 40px 100px',
        maxWidth: 1200,
        margin: '0 auto',
        position: 'relative',
        cursor: 'crosshair',
        borderTop: '0.5px solid var(--border)',
      }}
    >
      {/* ── Cursor-following image (single, no overlap) ──────────────── */}
      <div
        ref={imgRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 260,
          aspectRatio: '4/3',
          pointerEvents: 'none',
          zIndex: 1,                            // always behind text (zIndex 2+)
          opacity: active ? 1 : 0,
          transition: 'opacity 0.3s ease',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
          transform: 'translate(-50%, -50%)',   // centre on cursor point
          willChange: 'left, top',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={imgKey}
            src={IG_IMAGES[imgIndex]}
            alt=""
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'contrast(1.04) saturate(0.88)',
            }}
          />
        </AnimatePresence>
      </div>

      {/* ── Text content — sits above images via z-index ─────────────── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: 48,
        }}>
          Commission a film
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <a href="mailto:davidmcdougall@proton.me" style={{ display: 'inline-block', pointerEvents: 'all' }}>
          <motion.div
            initial="idle"
            whileHover="hovered"
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <motion.h2
              variants={{
                idle:    { color: 'var(--fg)' },
                hovered: { color: 'var(--gold)' },
              }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(44px, 14vw, 180px)',
                lineHeight: 0.88,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Let's Talk.
            </motion.h2>
            <motion.div
              variants={{
                idle:    { scaleX: 0 },
                hovered: { scaleX: 1 },
              }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              style={{
                position: 'absolute',
                bottom: -8,
                left: 0,
                right: 0,
                height: 2,
                background: 'var(--gold)',
                transformOrigin: 'left',
              }}
            />
          </motion.div>
        </a>
      </div>

      {/* ── Email + LinkedIn — protected clear zone ──────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        marginTop: 48,
        pointerEvents: 'all',
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        flexWrap: 'wrap',
      }}>
        <a
          href="mailto:davidmcdougall@proton.me"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 15,
            letterSpacing: '0.16em',
            color: 'rgba(232,226,213,0.5)',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'color 0.25s',
            display: 'block',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--gold)'
            setActive(false)
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(232,226,213,0.5)'
            setActive(true)
          }}
        >
          davidmcdougall@proton.me
        </a>
        <a
          href="https://www.linkedin.com/in/david-mcdougall-7861287/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on LinkedIn"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(232,226,213,0.35)',
            textDecoration: 'none',
            border: '1px solid rgba(232,226,213,0.12)',
            padding: '9px 16px',
            transition: 'color 0.2s, border-color 0.2s',
            display: 'block',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--gold)'
            e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)'
            setActive(false)
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(232,226,213,0.35)'
            e.currentTarget.style.borderColor = 'rgba(232,226,213,0.12)'
            setActive(true)
          }}
        >
          LinkedIn ↗
        </a>
      </div>

    </motion.section>
  )
}
