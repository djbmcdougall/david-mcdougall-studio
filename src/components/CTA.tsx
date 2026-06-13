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
        padding: '100px 40px 100px',
        maxWidth: 1200,
        margin: '0 auto',
        position: 'relative',
        borderTop: '0.5px solid var(--border)',
      }}
    >
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
