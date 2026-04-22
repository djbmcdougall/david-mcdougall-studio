import { motion } from 'framer-motion'
import { writing, type WritingBorder } from '../data/writing'

const BORDER_COLORS: Record<WritingBorder, string> = {
  gold:  'var(--gold)',
  faint: 'var(--fg-faint)',
  blue:  'rgba(80,120,255,0.6)',
}

export default function Writing() {
  return (
    <section style={{ padding: '80px 40px 100px', maxWidth: 1200, margin: '0 auto' }}>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        marginBottom: 36,
      }}>
        Writing &amp; Ideas
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
      }}>
        {writing.map((item, i) => (
          <motion.a
            key={item.id}
            href={item.link}
            className="writing-card"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 25 }}
            whileHover={{ y: -4 }}
            style={{
              display: 'block',
              padding: '24px 22px',
              background: 'rgba(232,226,213,0.02)',
              border: '1px solid var(--border)',
              borderLeft: `3px solid ${BORDER_COLORS[item.border]}`,
              position: 'relative',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 8,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--fg-dim)',
              marginBottom: 10,
            }}>
              {item.category}
            </p>

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 15,
              lineHeight: 1.35,
              color: 'var(--fg)',
              marginBottom: 10,
            }}>
              {item.title}
            </p>

            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.12em',
              color: 'var(--gold)',
              marginBottom: 10,
            }}>
              {item.client}
            </p>

            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              lineHeight: 1.65,
              color: 'var(--fg-dim)',
              marginBottom: 18,
            }}>
              {item.description}
            </p>

            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.16em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
            }}>
              Read →
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
