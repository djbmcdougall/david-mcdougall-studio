import { motion } from 'framer-motion'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
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
        What Clients Say
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16,
      }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            className="testimonial-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
            whileHover={{ y: -4 }}
            style={{
              padding: '28px 28px 28px 24px',
              background: 'rgba(232,226,213,0.02)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--gold)',
              willChange: 'transform',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 17,
              lineHeight: 1.6,
              color: 'var(--fg)',
              marginBottom: 20,
            }}>
              "{t.quote}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 24,
                height: 1,
                background: 'var(--gold-dim)',
                flexShrink: 0,
              }} />
              <div>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  fontSize: 12,
                  color: 'var(--fg)',
                  marginBottom: 2,
                }}>
                  {t.name}
                </p>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                  fontSize: 12,
                  color: 'var(--fg-dim)',
                }}>
                  {t.title} · {t.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
