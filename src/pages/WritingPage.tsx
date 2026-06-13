import { motion } from 'framer-motion'
import { writing, type WritingBorder } from '../data/writing'

const BORDER_COLORS: Record<WritingBorder, string> = {
  gold:  'var(--gold)',
  faint: 'var(--fg-faint)',
  blue:  'rgba(80,120,255,0.6)',
}

// ── Replace with your Substack URL ───────────────────────────────────────────
const SUBSTACK_URL = 'https://davidmcdougall.substack.com'

export default function WritingPage() {
  return (
    <main style={{ paddingTop: 84 }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 40px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Back link */}
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--fg-dim)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 40,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-dim)')}
          >
            ← davidmcdougall.studio
          </a>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 20,
          }}>
            Writing &amp; Ideas
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(42px, 6vw, 80px)',
            lineHeight: 0.95,
            color: 'var(--fg)',
            marginBottom: 28,
          }}>
            Essays, Notes &amp; Dispatches.
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            lineHeight: 1.75,
            color: 'var(--fg-dim)',
            maxWidth: 560,
          }}>
            Twenty years in the field leaves you with a lot of thoughts about story, truth, and
            what the camera misses. This is where I write them down.
          </p>
        </motion.div>
      </section>

      {/* ── Substack CTA ────────────────────────────────────────────────── */}
      <section style={{
        padding: '0 40px 60px',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            padding: '24px 28px',
            border: '1px solid rgba(200,169,110,0.2)',
            borderLeft: '3px solid var(--gold)',
            background: 'rgba(200,169,110,0.03)',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 6,
            }}>
              On Substack
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              color: 'var(--fg-dim)',
              lineHeight: 1.6,
            }}>
              Subscribe for new essays direct to your inbox.
            </p>
          </div>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--gold)',
              padding: '10px 20px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'opacity 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Subscribe on Substack ↗
          </a>
        </motion.div>
      </section>

      {/* ── Articles grid ───────────────────────────────────────────────── */}
      <section style={{ padding: '0 40px 120px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {writing.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06, type: 'spring', stiffness: 300, damping: 25 }}
              whileHover={{ y: -4 }}
              style={{
                display: 'block',
                padding: '24px 22px',
                background: 'rgba(232,226,213,0.02)',
                border: '1px solid var(--border)',
                borderLeft: `3px solid ${BORDER_COLORS[item.border]}`,
                position: 'relative',
                textDecoration: 'none',
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
                fontFamily: 'var(--font-sans)',
                fontWeight: 400,
                fontSize: 13,
                lineHeight: 1.6,
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

    </main>
  )
}
