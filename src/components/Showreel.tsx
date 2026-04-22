import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VIMEO_URL = 'https://player.vimeo.com/video/PLACEHOLDER'

export default function Showreel() {
  const [open, setOpen] = useState(false)

  return (
    <section id="showreel" style={{ padding: '0 40px 100px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Frame */}
      <motion.div
        className="reel-frame"
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          background: 'linear-gradient(135deg, #111110 0%, #0d0d0c 100%)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}
        whileHover="hovered"
        initial="idle"
      >
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
        }}>
          <motion.button
            onClick={() => setOpen(true)}
            variants={{
              idle: { scale: 1 },
              hovered: { scale: 1.1 },
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              border: '0.5px solid var(--fg-dim)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              const tri = e.currentTarget.querySelector('svg path') as SVGPathElement
              if (tri) tri.style.fill = 'var(--gold)'
              e.currentTarget.style.borderColor = 'var(--gold)'
            }}
            onMouseLeave={(e) => {
              const tri = e.currentTarget.querySelector('svg path') as SVGPathElement
              if (tri) tri.style.fill = 'var(--fg-dim)'
              e.currentTarget.style.borderColor = 'var(--fg-dim)'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M8 6L17 11L8 16V6Z"
                fill="var(--fg-dim)"
                style={{ transition: 'fill 0.2s' }}
              />
            </svg>
          </motion.button>
        </div>

        {/* HUD readout */}
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.2em',
          color: 'var(--fg-dim)',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
        }}>
          VIDEO_ID / DM_REEL_2024 / 16:9 / 1920×1080 / AI-ASSISTED PRODUCTION
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(7,7,6,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '100%', maxWidth: 960, aspectRatio: '16/9' }}
            >
              <iframe
                src={VIMEO_URL}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const styles: Record<string, string | number> = {
    position: 'absolute',
    width: 22,
    height: 22,
    opacity: 0.35,
  }
  if (pos === 'tl') { styles.top = 16; styles.left = 16 }
  if (pos === 'tr') { styles.top = 16; styles.right = 16 }
  if (pos === 'bl') { styles.bottom = 16; styles.left = 16 }
  if (pos === 'br') { styles.bottom = 16; styles.right = 16 }

  const borderColor = 'var(--gold)'
  const bw = '1px'

  return (
    <div style={styles}>
      <div style={{
        width: '100%',
        height: '100%',
        borderTop: pos.includes('t') ? `${bw} solid ${borderColor}` : undefined,
        borderBottom: pos.includes('b') ? `${bw} solid ${borderColor}` : undefined,
        borderLeft: pos.includes('l') ? `${bw} solid ${borderColor}` : undefined,
        borderRight: pos.includes('r') ? `${bw} solid ${borderColor}` : undefined,
      }} />
    </div>
  )
}
