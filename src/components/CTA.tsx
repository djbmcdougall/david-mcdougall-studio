import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section id="contact" style={{
      padding: '80px 40px',
      maxWidth: 1200,
      margin: '0 auto 60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 40,
      borderTop: '1px solid var(--border)',
    }}>
      <div>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: 16,
        }}>
          Commission a film
        </p>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: 'clamp(24px, 3vw, 40px)',
          lineHeight: 1.2,
          color: 'var(--fg)',
          maxWidth: 520,
        }}>
          You have a story. Let's make it{' '}
          <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>
            impossible to ignore.
          </em>
        </h2>
      </div>

      <motion.a
        href="mailto:PLACEHOLDER@example.com"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--bg)',
          background: 'var(--gold)',
          padding: '16px 32px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--fg)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--gold)'
        }}
      >
        Get in touch →
      </motion.a>
    </section>
  )
}
