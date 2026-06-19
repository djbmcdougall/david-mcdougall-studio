import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const REELS = [
  {
    id: 'brand',
    label: 'Brand',
    vimeoId: '1193412587',
    embedExtra: '&h=61d2028622',
    hud: 'BRAND · COMMERCIAL · AI-ASSISTED',
    gridColumn: '1 / 3',
  },
  {
    id: 'broadcast',
    label: 'Broadcast',
    vimeoId: '1193410820',
    embedExtra: '&h=e090844bc9',
    hud: 'BROADCAST · DOCUMENTARY · BBC · AL JAZEERA',
    gridColumn: '3 / 5',
  },
  {
    id: 'ai',
    label: 'AI',
    vimeoId: '1200432945',
    embedExtra: '',
    hud: 'AI · GENERATIVE · NIKE SPEC · NO CREW',
    gridColumn: '2 / 4',
  },
]

export default function Showreel() {
  return (
    <section id="showreel" style={{ padding: '0 40px 120px', maxWidth: 1200, margin: '0 auto' }}>
      <div className="showreel-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 20,
      }}>
        {REELS.map((reel, i) => (
          <ReelBox key={reel.id} reel={reel} index={i} />
        ))}
      </div>
    </section>
  )
}

function ReelBox({ reel, index }: { reel: typeof REELS[0]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [thumbError, setThumbError] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShouldLoad(true); io.disconnect() } },
      { rootMargin: '300px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1], delay: index * 0.1 }}
      style={{ gridColumn: reel.gridColumn }}
    >
      {/* Label */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        marginBottom: 12,
      }}>
        {reel.label}
      </p>

      {/* Double-bezel outer shell */}
      <div style={{
        padding: 5,
        borderRadius: 16,
        background: 'rgba(200,169,110,0.04)',
        border: '1px solid rgba(200,169,110,0.12)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(200,169,110,0.08)',
      }}>
        {/* Inner core */}
        <div style={{
          position: 'relative',
          aspectRatio: '16/9',
          borderRadius: 12,
          overflow: 'hidden',
          background: '#0a0a09',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.04)',
        }}>
          {/* Viewfinder corners */}
          {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
            <Corner key={pos} pos={pos} />
          ))}

          {/* Vimeo iframe — deferred until near viewport */}
          {shouldLoad ? (
            <iframe
              src={`https://player.vimeo.com/video/${reel.vimeoId}?color=c8a96e&title=0&byline=0&portrait=0${reel.embedExtra}`}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {/* Thumbnail — vumbnail fallback, or dark gradient if image fails */}
              {thumbError ? (
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #0d0c0a 0%, #070706 100%)',
                }} />
              ) : (
                <img
                  src={`https://vumbnail.com/${reel.vimeoId}.jpg`}
                  alt={reel.label}
                  loading="lazy"
                  onError={() => setThumbError(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}

              {/* Play affordance — always visible over thumbnail/fallback */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(7,7,6,0.25)',
                zIndex: 2,
                pointerEvents: 'none',
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: '1px solid rgba(200,169,110,0.5)',
                  background: 'rgba(7,7,6,0.55)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}>
                  <div style={{
                    width: 0,
                    height: 0,
                    borderTop: '7px solid transparent',
                    borderBottom: '7px solid transparent',
                    borderLeft: '11px solid rgba(200,169,110,0.8)',
                    marginLeft: 3,
                  }} />
                </div>
              </div>
            </>
          )}

          {/* HUD readout */}
          <div style={{
            position: 'absolute',
            bottom: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: 7,
            letterSpacing: '0.2em',
            color: 'rgba(232,226,213,0.25)',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            zIndex: 2,
            pointerEvents: 'none',
          }}>
            {reel.hud}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const base: React.CSSProperties = {
    position: 'absolute',
    width: 16,
    height: 16,
    opacity: 0.4,
    zIndex: 3,
    pointerEvents: 'none',
  }
  if (pos === 'tl') { base.top = 14; base.left = 14 }
  if (pos === 'tr') { base.top = 14; base.right = 14 }
  if (pos === 'bl') { base.bottom = 14; base.left = 14 }
  if (pos === 'br') { base.bottom = 14; base.right = 14 }

  return (
    <div style={base}>
      <div style={{
        width: '100%',
        height: '100%',
        borderTop: pos.includes('t') ? '1px solid var(--gold)' : undefined,
        borderBottom: pos.includes('b') ? '1px solid var(--gold)' : undefined,
        borderLeft: pos.includes('l') ? '1px solid var(--gold)' : undefined,
        borderRight: pos.includes('r') ? '1px solid var(--gold)' : undefined,
      }} />
    </div>
  )
}
