import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
      style={{
        padding: '100px 40px 120px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Eyebrow */}
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

      {/* Big typographic CTA */}
      <a href="mailto:PLACEHOLDER@example.com" style={{ display: 'block' }}>
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
              fontSize: 'clamp(72px, 14vw, 180px)',
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Let's Talk.
          </motion.h2>

          {/* Animated underline */}
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
              height: 3,
              background: 'var(--gold)',
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      </a>

      {/* Sub-line */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.16em',
        color: 'rgba(232,226,213,0.3)',
        marginTop: 40,
        textTransform: 'uppercase',
      }}>
        PLACEHOLDER@example.com
      </p>
    </motion.section>
  )
}
