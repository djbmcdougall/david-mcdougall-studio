import { motion } from 'framer-motion'

const PILLARS = [
  {
    num: '001',
    title: 'AI Content Production',
    body: "One director. Every tool on the planet. I produce in days what takes studios months — without losing an ounce of craft.",
  },
  {
    num: '002',
    title: 'Brand Design',
    body: "Identity systems built around truth. No decoration without purpose. No logo without a story behind it.",
  },
  {
    num: '003',
    title: 'Brand Story',
    body: "Twenty years finding the real story in hostile places. Brands have them too. I find yours and make it impossible to ignore.",
  },
  {
    num: '004',
    title: 'Audience Intelligence',
    body: "Investigative instincts meet distribution strategy. I know who's watching, why they care, and how to reach them.",
  },
]

export default function Pillars() {
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 1,
      background: 'rgba(200,169,110,0.06)',
      margin: '0 0 100px',
    }}>
      {PILLARS.map((p) => (
        <Pillar key={p.num} {...p} />
      ))}
    </section>
  )
}

function Pillar({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <motion.div
      className="pillar"
      initial="idle"
      whileHover="hovered"
      style={{
        background: 'var(--bg)',
        padding: '36px 28px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent bar */}
      <motion.div
        variants={{
          idle: { scaleX: 0 },
          hovered: { scaleX: 1 },
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'var(--gold)',
          transformOrigin: 'left',
        }}
      />

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.15em',
        color: 'var(--fg-faint)',
        marginBottom: 20,
      }}>
        {num}
      </p>

      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontWeight: 700,
        fontSize: 17,
        color: 'var(--fg)',
        marginBottom: 14,
        lineHeight: 1.3,
      }}>
        {title}
      </h3>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        lineHeight: 1.75,
        color: 'rgba(232,226,213,0.32)',
        marginBottom: 28,
      }}>
        {body}
      </p>

      {/* Arrow */}
      <motion.span
        variants={{
          idle: { x: 0, color: 'var(--fg-dim)' },
          hovered: { x: 5, color: 'var(--gold)' },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 14,
          display: 'inline-block',
        }}
      >
        →
      </motion.span>
    </motion.div>
  )
}
