import { motion } from 'framer-motion'

const PILLARS = [
  {
    num: '001',
    title: 'AI Content Production',
    tagline: 'One director. Every tool on the planet.',
    body: 'I deliver cinematic, broadcast-ready video, synthetic voice, sound design, and original music — in days, not months — without ever compromising craft or taste.',
  },
  {
    num: '002',
    title: 'Brand Design & Identity',
    tagline: 'Identity systems built on truth, not decoration.',
    body: 'Every mark, colour, and word has purpose. No logo without a story. No story without strategy. I create brands that feel authentic and impossible to copy.',
  },
  {
    num: '003',
    title: 'Brand Story & Audience',
    tagline: 'Twenty years uncovering the real story in war zones, boardrooms, and slums.',
    body: 'Brands have powerful stories too — most just don\'t know how to find them. I discover yours, then find exactly who needs to hear it.',
  },
  {
    num: '004',
    title: 'Broadcast & Documentary',
    tagline: 'BBC. Al Jazeera. Discovery. National Geographic.',
    body: 'Award-winning long-form storytelling with hard-earned credibility. The depth, rigor, visual quality, and editorial standards demanded by blue-chip broadcasters.',
  },
]

export default function Pillars() {
  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      style={{
        padding: '0 40px 60px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Visually hidden h2 for SEO */}
      <h2 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        Filmmaker & AI Creative Director Services
      </h2>
      {/* Section eyebrow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 40,
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
          Services
        </span>
        <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
      </div>

      {/* Double-bezel outer shell */}
      <div style={{
        padding: 5,
        borderRadius: 20,
        background: 'rgba(232,226,213,0.02)',
        border: '1px solid var(--border)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
      }}>
        {/* Inner grid */}
        <div className="pillars-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 3,
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          {PILLARS.map((p, i) => (
            <Pillar key={p.num} {...p} index={i} />
          ))}
        </div>
      </div>

      {/* Mid-page CTA — commission prompt after services */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '32px 0 0',
        borderTop: '0.5px solid var(--border)',
        marginTop: 40,
        gap: 24,
        flexWrap: 'wrap',
      }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: 'var(--fg-dim)',
          lineHeight: 1.6,
        }}>
          Ready to commission? One director, clear brief, fast delivery.
        </p>
        <a
          href="#contact"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            border: '1px solid rgba(200,169,110,0.35)',
            padding: '10px 20px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s, color 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(200,169,110,0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
        >
          Get in touch →
        </a>
      </div>
    </motion.section>
  )
}

function Pillar({ num, title, tagline, body, index }: {
  num: string; title: string; tagline: string; body: string; index: number
}) {
  return (
    <motion.div
      className="pillar"
      initial="idle"
      whileHover="hovered"
      style={{
        background: 'rgba(10,10,9,1)',
        padding: '32px 24px 28px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent bar — scaleX from left */}
      <motion.div
        variants={{ idle: { scaleX: 0 }, hovered: { scaleX: 1 } }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 2,
          background: 'linear-gradient(90deg, var(--gold) 0%, rgba(200,169,110,0.4) 100%)',
          transformOrigin: 'left',
        }}
      />

      {/* Subtle hover glow */}
      <motion.div
        variants={{ idle: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 80,
          background: 'linear-gradient(to bottom, rgba(200,169,110,0.05) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.18em',
        color: 'rgba(232,226,213,0.2)',
        marginBottom: 20,
      }}>
        {num}
      </p>

      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontWeight: 700,
        fontSize: 16,
        color: 'var(--fg)',
        marginBottom: 10,
        lineHeight: 1.35,
      }}>
        {title}
      </h3>

      <p style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        fontSize: 12,
        lineHeight: 1.55,
        color: 'var(--gold)',
        marginBottom: 12,
        opacity: 0.85,
      }}>
        {tagline}
      </p>

      <p style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 1.65,
        color: 'rgba(232,226,213,0.45)',
        marginBottom: 28,
      }}>
        {body}
      </p>

      {/* Arrow with spring */}
      <motion.span
        variants={{
          idle: { x: 0, color: 'rgba(232,226,213,0.25)' },
          hovered: { x: 5, color: 'var(--gold)' },
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 14,
          display: 'inline-block',
          willChange: 'transform',
        }}
      >
        →
      </motion.span>

      {/* Subtle index watermark */}
      <span style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        fontFamily: 'var(--font-display)',
        fontSize: 56,
        color: 'rgba(232,226,213,0.03)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.div>
  )
}
