import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VIMEO_URL = 'https://player.vimeo.com/video/PLACEHOLDER'

export default function Showreel() {
  const [open, setOpen] = useState(false)

  return (
    <section id="showreel" style={{ padding: '0 40px 120px', maxWidth: 1200, margin: '0 auto' }}>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* ── Double-bezel outer shell ── */}
        <div style={{
          padding: 6,
          borderRadius: 20,
          background: 'rgba(200,169,110,0.04)',
          border: '1px solid rgba(200,169,110,0.12)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(200,169,110,0.08)',
        }}>
          {/* ── Inner core ── */}
          <motion.div
            className="reel-frame"
            whileHover="hovered"
            initial="idle"
            style={{
              position: 'relative',
              aspectRatio: '16/9',
              borderRadius: 15,
              overflow: 'hidden',
              background: 'linear-gradient(160deg, #141312 0%, #0a0a09 60%, #0f0e0c 100%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)',
            }}
          >
            {/* Subtle vignette */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />

            {/* Viewfinder corners */}
            {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
              <Corner key={pos} pos={pos} />
            ))}

            {/* Play button */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}>
              {/* Outer glow ring */}
              <motion.div
                variants={{
                  idle: { scale: 1, opacity: 0 },
                  hovered: { scale: 1.6, opacity: 0.12 },
                }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                style={{
                  position: 'absolute',
                  width: 68,
                  height: 68,
                  borderRadius: '50%',
                  background: 'var(--gold)',
                }}
              />

              <motion.button
                onClick={() => setOpen(true)}
                variants={{
                  idle: { scale: 1 },
                  hovered: { scale: 1.08 },
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                style={{
                  position: 'relative',
                  width: 68,
                  height: 68,
                  borderRadius: '50%',
                  border: '1px solid rgba(232,226,213,0.25)',
                  background: 'rgba(7,7,6,0.5)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  const tri = e.currentTarget.querySelector('svg path') as SVGPathElement
                  if (tri) tri.style.fill = 'var(--gold)'
                  e.currentTarget.style.borderColor = 'var(--gold)'
                  e.currentTarget.style.background = 'rgba(200,169,110,0.08)'
                }}
                onMouseLeave={(e) => {
                  const tri = e.currentTarget.querySelector('svg path') as SVGPathElement
                  if (tri) tri.style.fill = 'var(--fg-dim)'
                  e.currentTarget.style.borderColor = 'rgba(232,226,213,0.25)'
                  e.currentTarget.style.background = 'rgba(7,7,6,0.5)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7 5.5L15.5 10L7 14.5V5.5Z"
                    fill="var(--fg-dim)"
                    style={{ transition: 'fill 0.25s cubic-bezier(0.32,0.72,0,1)' }}
                  />
                </svg>
              </motion.button>
            </div>

            {/* HUD readout */}
            <div style={{
              position: 'absolute',
              bottom: 18,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-mono)',
              fontSize: 8,
              letterSpacing: '0.22em',
              color: 'rgba(232,226,213,0.3)',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              zIndex: 2,
            }}>
              VIDEO_ID / DM_REEL_2024 / 16:9 / 1920×1080 / AI-ASSISTED PRODUCTION
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 500,
              background: 'rgba(7,7,6,0.96)',
              backdropFilter: 'blur(24px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40,
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: 6,
                borderRadius: 16,
                background: 'rgba(200,169,110,0.06)',
                border: '1px solid rgba(200,169,110,0.15)',
                width: '100%',
                maxWidth: 960,
              }}
            >
              <div style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '16/9' }}>
                <iframe
                  src={VIMEO_URL}
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const base: React.CSSProperties = {
    position: 'absolute',
    width: 20,
    height: 20,
    opacity: 0.45,
    zIndex: 2,
  }
  if (pos === 'tl') { base.top = 18; base.left = 18 }
  if (pos === 'tr') { base.top = 18; base.right = 18 }
  if (pos === 'bl') { base.bottom = 18; base.left = 18 }
  if (pos === 'br') { base.bottom = 18; base.right = 18 }

  return (
    <div style={base}>
      <div style={{
        width: '100%',
        height: '100%',
        borderTop: pos.includes('t') ? '1px solid var(--gold)' : undefined,
        borderBottom: pos.includes('b') ? '1px solid var(--gold)' : undefined,
        borderLeft: pos.includes('l') ? '1px solid var(--gold)' : undefined,
        borderRight: pos.includes('r') ? '1px solid var(--gold)' : undefined,
      }} />
    </div>
  )
}
