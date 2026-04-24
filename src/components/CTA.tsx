import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
      style={{
        padding: '0 40px 120px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Double-bezel outer shell */}
      <div style={{
        padding: 5,
        borderRadius: 24,
        background: 'rgba(200,169,110,0.03)',
        border: '1px solid rgba(200,169,110,0.1)',
        boxShadow: 'inset 0 1px 0 rgba(200,169,110,0.06)',
      }}>
        {/* Inner core */}
        <div style={{
          borderRadius: 20,
          background: 'rgba(10,10,9,1)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.04)',
          padding: '72px 64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 48,
        }}>
          {/* Text block */}
          <div>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 24,
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                padding: '4px 10px',
                border: '1px solid rgba(200,169,110,0.25)',
                borderRadius: 999,
              }}>
                Commission a film
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(26px, 3.2vw, 44px)',
              lineHeight: 1.2,
              color: 'var(--fg)',
              maxWidth: 520,
            }}>
              You have a story.{' '}
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>
                Let's make it impossible to ignore.
              </em>
            </h2>
          </div>

          {/* Button-in-button CTA */}
          <motion.a
            href="mailto:PLACEHOLDER@example.com"
            className="cta-pill"
            whileHover="hovered"
            initial="idle"
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 14px 14px 28px',
              borderRadius: 999,
              background: 'var(--gold)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--fg)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--gold)'
            }}
          >
            Get in touch
            {/* Nested icon circle — button-in-button */}
            <motion.span
              variants={{
                idle: { x: 0, y: 0, scale: 1 },
                hovered: { x: 2, y: -1, scale: 1.08 },
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: 'rgba(7,7,6,0.18)',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 14, lineHeight: 1 }}>↗</span>
            </motion.span>
          </motion.a>
        </div>
      </div>
    </motion.section>
  )
}
