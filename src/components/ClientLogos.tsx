import { motion } from 'framer-motion'

// TODO: David — replace with real SVG/PNG logo files in /public/logos/
const LOGOS = [
  { name: 'BBC',             src: '/logos/bbc.svg' },
  { name: 'Channel 4',       src: '/logos/channel4.svg' },
  { name: 'PBS',             src: '/logos/pbs.svg' },
  { name: 'Jumeirah',        src: '/logos/jumeirah.svg' },
  { name: 'Emirates',        src: '/logos/emirates.svg' },
  { name: 'Qatar Airways',   src: '/logos/qatar.svg' },
  { name: 'Al Jazeera',      src: '/logos/aljazeera.svg' },
  { name: 'Brand Client',    src: null },
  { name: 'Brand Client',    src: null },
]

// Duplicate for seamless loop
const ALL = [...LOGOS, ...LOGOS]

export default function ClientLogos() {
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '0.5px solid var(--border)',
      borderBottom: '0.5px solid var(--border)',
      background: 'var(--bg)',
      padding: '14px 0',
      position: 'relative',
      zIndex: 50,
    }}>
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'ticker-scroll 35s linear infinite',
          willChange: 'transform',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
        }}
      >
        {ALL.map((logo, i) => (
          <motion.div
            key={i}
            whileHover={{ opacity: 0.75 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 40px',
              opacity: 0.3,
              flexShrink: 0,
            }}
          >
            {logo.src ? (
              <img
                src={logo.src}
                alt={logo.name}
                style={{
                  height: 28,
                  width: 'auto',
                  filter: 'brightness(0) invert(1)',
                  display: 'block',
                }}
                onError={(e) => {
                  // Fallback to text if logo file missing
                  const el = e.currentTarget
                  const parent = el.parentElement
                  if (parent) {
                    parent.innerHTML = `<span style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.18em;color:var(--fg-dim);white-space:nowrap;">${logo.name.toUpperCase()}</span>`
                  }
                }}
              />
            ) : (
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.18em',
                color: 'var(--fg-dim)',
                whiteSpace: 'nowrap',
              }}>
                {logo.name.toUpperCase()}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
