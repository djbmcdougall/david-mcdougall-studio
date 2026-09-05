import { motion } from 'framer-motion'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  return (
    <div style={{ background: 'rgba(4,4,3,1)' }}>
    <section className="section-pad" style={{ padding: '56px 40px 56px', maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        marginBottom: 36,
        fontWeight: 400,
      }}>
        What Clients Say
      </h2>

      <div className="testimonials-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
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
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              fontSize: 15,
              lineHeight: 1.75,
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
                {t.linkedIn ? (
                  <a
                    href={t.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      fontSize: 12,
                      color: 'var(--fg)',
                      textDecoration: 'none',
                      marginBottom: 2,
                      display: 'block',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                  >
                    {t.name} ↗
                  </a>
                ) : (
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    fontSize: 12,
                    color: 'var(--fg)',
                    marginBottom: 2,
                  }}>
                    {t.name}
                  </p>
                )}
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                  fontSize: 11,
                  color: 'var(--fg-dim)',
                }}>
                  {t.title}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    </div>
  )
}
