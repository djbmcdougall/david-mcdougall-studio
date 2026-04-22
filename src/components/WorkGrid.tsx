import { motion } from 'framer-motion'

const TILES = [
  {
    num: '01',
    client: 'AI Production',
    title: 'Neural Canvas',
    type: 'AI-Assisted Short Film',
    badge: 'AI-NATIVE',
    bg: 'linear-gradient(135deg, #0f0e0d 0%, #1a1208 100%)',
    image: '/work-01.jpg',
  },
  {
    num: '02',
    client: 'BBC',
    title: 'Fault Lines',
    type: 'Broadcast Documentary',
    badge: 'BROADCAST',
    bg: 'linear-gradient(135deg, #0c0d10 0%, #080d14 100%)',
    image: '/work-02.jpg',
  },
  {
    num: '03',
    client: 'Brand Client',
    title: 'Origin Story',
    type: 'Brand Film',
    badge: 'BRAND',
    bg: 'linear-gradient(135deg, #0e0d0c 0%, #14100a 100%)',
    image: '/work-03.jpg',
  },
]

export default function WorkGrid() {
  return (
    <section id="work" style={{ padding: '0 40px 100px', maxWidth: 1200, margin: '0 auto' }}>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        marginBottom: 28,
      }}>
        Selected Work
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
      }}>
        {TILES.map((tile) => (
          <WorkTile key={tile.num} {...tile} />
        ))}
      </div>
    </section>
  )
}

interface TileProps {
  num: string
  client: string
  title: string
  type: string
  badge: string
  bg: string
  image: string
}

function WorkTile({ num, client, title, type, badge, bg }: TileProps) {
  return (
    <motion.div
      className="work-tile"
      initial="idle"
      whileHover="hovered"
      style={{
        position: 'relative',
        aspectRatio: '16/10',
        background: bg,
        overflow: 'hidden',
        border: '1px solid var(--border)',
      }}
    >
      {/* Faint background number */}
      <motion.span
        variants={{
          idle: { opacity: 1 },
          hovered: { opacity: 0 },
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: 52,
          color: 'rgba(232,226,213,0.04)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {num}
      </motion.span>

      {/* Hover gradient overlay */}
      <motion.div
        variants={{
          idle: { opacity: 0 },
          hovered: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(7,7,6,0.95) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Badge */}
      <motion.div
        variants={{
          idle: { opacity: 0 },
          hovered: { opacity: 1 },
        }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: 8,
          letterSpacing: '0.18em',
          color: 'var(--gold)',
          border: '1px solid var(--gold-dim)',
          padding: '3px 8px',
          background: 'rgba(7,7,6,0.7)',
        }}
      >
        {badge}
      </motion.div>

      {/* Info block slides up */}
      <motion.div
        variants={{
          idle: { y: 20, opacity: 0 },
          hovered: { y: 0, opacity: 1 },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
        }}
      >
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: 4,
        }}>
          {client}
        </p>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: 16,
          color: 'var(--fg)',
          marginBottom: 4,
        }}>
          {title}
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          color: 'var(--fg-dim)',
          letterSpacing: '0.1em',
        }}>
          {type}
        </p>
      </motion.div>
    </motion.div>
  )
}
