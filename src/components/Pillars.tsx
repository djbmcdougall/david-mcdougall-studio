import { motion } from 'framer-motion'

const PILLARS = [
  {
    num: '001',
    title: 'AI Content Production',
    body: "One director. Every tool on the planet. I produce in days what takes studios months — without losing an ounce of craft.",
  },
  {
    num: '002',
    title: 'Brand Design & Identity',
    body: "Identity systems built around truth. No decoration without purpose. No logo without a story behind it.",
  },
  {
    num: '003',
    title: 'Brand Story & Audience',
    body: "Twenty years finding the real story in hostile places. Brands have them too. I find yours, then find exactly who needs to hear it.",
  },
  {
    num: '004',
    title: 'Broadcast & Documentary',
    body: "BBC. Al Jazeera. Award-winning long-form. The credibility that no newcomer can fake and no brief can manufacture.",
  },
]

export default function Pillars() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      style={{
        padding: '0 40px 120px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
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
        <div style={{
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
    </motion.section>
  )
}

function Pillar({ num, title, body, index }: {
  num: string; title: string; body: string; index: number
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
        marginBottom: 14,
        lineHeight: 1.35,
      }}>
        {title}
      </h3>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        lineHeight: 1.8,
        color: 'rgba(232,226,213,0.3)',
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
