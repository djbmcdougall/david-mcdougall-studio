import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolio, type PortfolioTab } from '../data/portfolio'

const TABS: { id: PortfolioTab; label: string }[] = [
  { id: 'moving-image',  label: 'Moving Image' },
  { id: 'brand-digital', label: 'Brand & Digital' },
  { id: 'tech-writing',  label: 'Tech & Writing' },
]

const BADGE_COLORS: Record<string, string> = {
  'AI-NATIVE':  'var(--gold)',
  'BROADCAST':  'var(--gold)',
  'BRAND':      'rgba(100,200,180,0.6)',
  'DIGITAL':    'rgba(100,200,180,0.6)',
  'TECH':       'rgba(80,120,255,0.6)',
  'WRITING':    'rgba(80,120,255,0.6)',
  'COPY':       'rgba(80,120,255,0.6)',
}

export default function PortfolioGrid() {
  const [activeTab, setActiveTab] = useState<PortfolioTab>('moving-image')

  const items = portfolio.filter((p) => p.tab === activeTab)

  return (
    <section id="work" style={{ padding: '80px 40px 100px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 36,
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
        }}>
          Selected Work
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className="portfolio-tab"
              onClick={() => setActiveTab(tab.id)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '7px 14px',
                border: '1px solid',
                borderColor: activeTab === tab.id ? 'var(--gold)' : 'var(--border)',
                color: activeTab === tab.id ? 'var(--gold)' : 'var(--fg-dim)',
                background: activeTab === tab.id ? 'rgba(200,169,110,0.08)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.06 } },
          }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {items.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

function PortfolioCard({ item }: { item: (typeof portfolio)[0] }) {
  const badgeColor = BADGE_COLORS[item.badge] ?? 'var(--fg-dim)'

  return (
    <motion.div
      className="w-tile"
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
      }}
      initial="idle"
      whileHover="hovered"
      style={{
        position: 'relative',
        aspectRatio: '16/10',
        background: 'linear-gradient(135deg, #111110 0%, #0c0c0b 100%)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
      }}
    >
      {/* Thumbnail */}
      <motion.div
        variants={{
          idle: { scale: 1 },
          hovered: { scale: 1.05 },
        }}
        transition={{ duration: 7, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${item.thumb})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Badge */}
      <div style={{
        position: 'absolute',
        top: 14,
        right: 14,
        fontFamily: 'var(--font-mono)',
        fontSize: 8,
        letterSpacing: '0.18em',
        color: badgeColor,
        border: `1px solid ${badgeColor}`,
        padding: '3px 8px',
        background: 'rgba(7,7,6,0.7)',
        zIndex: 2,
      }}>
        {item.badge}
      </div>

      {/* Client - top left */}
      <div style={{
        position: 'absolute',
        top: 14,
        left: 14,
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        zIndex: 2,
      }}>
        {item.client}
      </div>

      {/* Hover gradient */}
      <motion.div
        variants={{ idle: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(7,7,6,0.95) 0%, transparent 60%)',
          zIndex: 1,
        }}
      />

      {/* Info — slides up */}
      <motion.div
        variants={{ idle: { y: 20, opacity: 0 }, hovered: { y: 0, opacity: 1 } }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          position: 'absolute',
          bottom: 18,
          left: 18,
          right: 18,
          zIndex: 2,
        }}
      >
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 16,
          color: 'var(--fg)',
          marginBottom: 4,
        }}>
          {item.title}
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          color: 'var(--fg-dim)',
          letterSpacing: '0.1em',
        }}>
          {item.type}
        </p>
      </motion.div>
    </motion.div>
  )
}
