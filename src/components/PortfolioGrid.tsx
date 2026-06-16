import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { portfolio, type PortfolioTab } from '../data/portfolio'
import VideoLightbox, { type VideoSource } from './VideoLightbox'

const TABS: { id: PortfolioTab; label: string }[] = [
  { id: 'moving-image',  label: 'Broadcast' },
  { id: 'brand-digital', label: 'Brand Films' },
  { id: 'tech-writing',  label: 'Digital' },
]

function vimeoParamsFromLink(link: string): { id: string; hash?: string } | null {
  const idMatch = link.match(/vimeo\.com\/(?:manage\/videos\/)?(\d+)/)
  if (!idMatch) return null
  const hashMatch = link.match(/[?&]h=([a-f0-9]+)/)
  return { id: idMatch[1], hash: hashMatch?.[1] }
}

export default function PortfolioGrid() {
  const [activeTab, setActiveTab] = useState<PortfolioTab>('moving-image')
  const [lightboxSrc, setLightboxSrc] = useState<VideoSource | null>(null)
  const [hoveredThumb, setHoveredThumb] = useState<string | null>(null)
  const items = portfolio.filter((p) => p.tab === activeTab)

  // Cursor tracking — fixed-position values
  const rawX = useMotionValue(-400)
  const rawY = useMotionValue(-400)
  const x = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.6 })

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  const openVideo = useCallback((link: string) => {
    // YouTube
    const ytMatch = link.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/)
    if (ytMatch) {
      setLightboxSrc({ type: 'youtube', id: ytMatch[1] })
      return
    }
    // Vimeo
    const params = vimeoParamsFromLink(link)
    if (params) {
      setLightboxSrc({
        type: 'vimeo',
        id: params.id,
        ...(params.hash ? { extraParams: `h=${params.hash}` } : {}),
      })
    }
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ padding: '40px 40px 100px', maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Cursor-following image — fixed, rendered once at section level */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        <motion.div
          animate={{
            opacity: hoveredThumb ? 1 : 0,
            scale: hoveredThumb ? 1 : 0.82,
            rotate: hoveredThumb ? -2 : 3,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          style={{
            width: 300,
            aspectRatio: '16/9',
            overflow: 'hidden',
            border: '1px solid rgba(200,169,110,0.2)',
            boxShadow: '0 28px 70px rgba(0,0,0,0.7)',
          }}
        >
          {hoveredThumb && (
            <img
              src={hoveredThumb}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'contrast(1.04) saturate(0.88)',
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 40,
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <h2 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          fontWeight: 400,
          margin: 0,
        }}>
          Selected Work
        </h2>

        {/* Tabs */}
        <div role="tablist" aria-label="Work categories" style={{ display: 'flex', gap: 4 }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls="work-panel"
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

      {/* Editorial list or Digital carousel */}
      <div id="work-panel" role="tabpanel" style={{ borderTop: activeTab === 'tech-writing' ? 'none' : '0.5px solid var(--border)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            {activeTab === 'tech-writing' ? (
              <DigitalCarousel items={items} />
            ) : (
              items.map((item, i) => (
                <WorkRow
                  key={item.id}
                  item={item}
                  index={i}
                  onPlay={openVideo}
                  onHover={(thumb) => setHoveredThumb(thumb)}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <VideoLightbox source={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </section>
  )
}

function WorkRow({ item, index, onPlay, onHover }: {
  item: (typeof portfolio)[0]
  index: number
  onPlay: (link: string) => void
  onHover: (thumb: string | null) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => {
        setHovered(true)
        const thumb = item.thumb ?? null
        onHover(thumb)
      }}
      onHoverEnd={() => { setHovered(false); onHover(null) }}
      onClick={() => item.link && onPlay(item.link)}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '28px 0',
        borderBottom: '0.5px solid var(--border)',
        cursor: item.link ? 'pointer' : 'default',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', transform: 'translateY(-1px)' }}>
          {item.role && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 8,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(200,169,110,0.55)',
            }}>
              {item.role}
            </span>
          )}
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>
            {item.client}
          </span>
        </div>
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

      {/* Gold play button */}
      {item.link && (
        <motion.div
          animate={{
            scale: hovered ? 1.12 : 1,
            backgroundColor: hovered ? 'rgba(200,169,110,0.18)' : 'rgba(200,169,110,0.06)',
            borderColor: hovered ? 'rgba(200,169,110,0.7)' : 'rgba(200,169,110,0.3)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          style={{
            flexShrink: 0,
            marginLeft: 24,
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1px solid rgba(200,169,110,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {/* Play triangle */}
          <motion.div
            animate={{ x: hovered ? 2 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            style={{
              width: 0,
              height: 0,
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent',
              borderLeft: '12px solid var(--gold)',
              marginLeft: 2,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}

function DigitalCarousel({ items }: { items: (typeof portfolio) }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? 480 : -480, behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'relative', marginTop: 8 }}>
      {/* Track */}
      <div
        ref={trackRef}
        onScroll={checkScroll}
        style={{
          display: 'flex',
          gap: 20,
          overflowX: 'auto',
          paddingBottom: 16,
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
            style={{
              flexShrink: 0,
              width: 480,
              scrollSnapAlign: 'start',
              position: 'relative',
              cursor: item.link ? 'pointer' : 'default',
            }}
            onClick={() => item.link && window.open(item.link, '_blank')}
          >
            {/* Outer bezel */}
            <div style={{
              padding: 4,
              border: '1px solid var(--border)',
              background: 'rgba(232,226,213,0.02)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}>
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '16/9',
                background: 'rgba(232,226,213,0.04)',
              }}>
                <img
                  src={item.thumb}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'contrast(1.04) saturate(0.88)',
                    transition: 'transform 0.6s cubic-bezier(0.32,0.72,0,1)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 8,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  padding: '3px 8px',
                  border: '1px solid rgba(200,169,110,0.3)',
                  background: 'rgba(7,7,6,0.7)',
                  backdropFilter: 'blur(8px)',
                }}>
                  {item.type}
                </div>
              </div>
            </div>

            {/* Caption */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingTop: 14,
              paddingBottom: 4,
            }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 22,
                color: 'var(--fg)',
                lineHeight: 1,
              }}>
                {item.title}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                flexShrink: 0,
                marginLeft: 16,
              }}>
                {item.client}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll arrows */}
      <div style={{
        display: 'flex',
        gap: 8,
        justifyContent: 'flex-end',
        marginTop: 20,
      }}>
        {[{ dir: 'left' as const, label: '←', active: canScrollLeft },
          { dir: 'right' as const, label: '→', active: canScrollRight }].map(({ dir, label, active }) => (
          <button
            key={dir}
            onClick={() => scroll(dir)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              color: active ? 'var(--gold)' : 'rgba(200,169,110,0.2)',
              background: 'transparent',
              border: '1px solid',
              borderColor: active ? 'rgba(200,169,110,0.3)' : 'rgba(200,169,110,0.1)',
              width: 36,
              height: 36,
              cursor: active ? 'pointer' : 'default',
              transition: 'all 0.25s cubic-bezier(0.32,0.72,0,1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
