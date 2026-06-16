import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'

const IG_IMAGES = Array.from({ length: 12 }, (_, i) => `/gallery/gallery-${String(i + 1).padStart(2, '0')}.jpg`)

const CYCLE_DISTANCE = 120

export default function CTA() {
  const [imgIndex, setImgIndex]   = useState(0)
  const [imgKey, setImgKey]       = useState(0)
  const [imgPos, setImgPos]       = useState({ x: 0, y: 0 })
  const [imgVisible, setImgVisible] = useState(false)

  const distRef    = useRef(0)
  const lastPosRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const dx = x - lastPosRef.current.x
    const dy = y - lastPosRef.current.y
    distRef.current += Math.sqrt(dx * dx + dy * dy)
    lastPosRef.current = { x, y }

    setImgPos({ x, y })

    if (distRef.current >= CYCLE_DISTANCE) {
      distRef.current = 0
      setImgIndex(i => (i + 1) % IG_IMAGES.length)
      setImgKey(k => k + 1)
    }
  }, [])

  const handleMouseEnter = useCallback(() => setImgVisible(true), [])
  const handleMouseLeave = useCallback(() => setImgVisible(false), [])

  return (
    <motion.section
      id="contact"
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
        borderTop: '0.5px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {imgVisible && (
          <motion.div
            key={imgKey}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: 'absolute',
              left: imgPos.x,
              top: imgPos.y,
              transform: 'translate(-50%, -60%)',
              width: 220,
              height: 160,
              pointerEvents: 'none',
              zIndex: 10,
              overflow: 'hidden',
            }}
          >
            <img
              src={IG_IMAGES[imgIndex]}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

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

      <a href="mailto:davidmcdougall@proton.me" style={{ display: 'inline-block' }}>
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

      <div style={{
        marginTop: 48,
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
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(232,226,213,0.5)' }}
        >
          davidmcdougall@proton.me
        </a>
        <a
          href="https://www.linkedin.com/in/david-mcdougall-7861287/"
          target="_blank"
          rel="noopener noreferrer"
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
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(232,226,213,0.35)'
            e.currentTarget.style.borderColor = 'rgba(232,226,213,0.12)'
          }}
        >
          LinkedIn ↗
        </a>
      </div>
    </motion.section>
  )
}
