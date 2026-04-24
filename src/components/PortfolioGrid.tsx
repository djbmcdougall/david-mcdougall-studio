import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolio, type PortfolioTab } from '../data/portfolio'

const TABS: { id: PortfolioTab; label: string }[] = [
  { id: 'moving-image',  label: 'Moving Image' },
  { id: 'brand-digital', label: 'Brand & Digital' },
  { id: 'tech-writing',  label: 'Tech & Writing' },
]

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
        marginBottom: 40,
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
                transition: 'all 0.25s cubic-bezier(0.32,0.72,0,1)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial list */}
      <div style={{ borderTop: '0.5px solid var(--border)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            {items.map((item, i) => (
              <WorkRow key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function WorkRow({ item, index }: { item: (typeof portfolio)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        padding: '28px 0',
        borderBottom: '0.5px solid var(--border)',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Subtle row highlight */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(200,169,110,0.03)',
          pointerEvents: 'none',
        }}
      />

      {/* Index */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.12em',
        color: 'rgba(232,226,213,0.2)',
        flexShrink: 0,
        width: 32,
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Title */}
      <motion.h3
        animate={{
          x: hovered ? 16 : 0,
          color: hovered ? 'var(--gold)' : 'var(--fg)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(22px, 2.8vw, 36px)',
          lineHeight: 1,
          flex: 1,
          paddingLeft: 24,
          paddingRight: 24,
          zIndex: 1,
        }}
      >
        {item.title}
      </motion.h3>

      {/* Client + type */}
      <div style={{
        display: 'flex',
        gap: 32,
        alignItems: 'baseline',
        flexShrink: 0,
        zIndex: 1,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
        }}>
          {item.client}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(232,226,213,0.3)',
          width: 160,
          textAlign: 'right',
        }}>
          {item.type}
        </span>
      </div>

      {/* Hover thumbnail — floats in */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '42%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 20,
      }}>
        <motion.div
          initial={false}
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.88,
            rotate: hovered ? 2 : -3,
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          style={{
            width: 260,
            aspectRatio: '16/9',
            background: 'linear-gradient(135deg, #111110 0%, #0c0c0b 100%)',
            overflow: 'hidden',
            border: '1px solid rgba(200,169,110,0.15)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${item.thumb})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
          }} />
        </motion.div>
      </div>
    </motion.div>
  )
}
