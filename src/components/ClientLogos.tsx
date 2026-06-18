// forceBlack: true for logos whose PNG files have very sparse/transparent content
// that needs brightness(0) to render visibly on white background
const BROADCASTERS = [
  { name: 'BBC',                    src: '/logos/bbc.png',           forceBlack: true  },
  { name: 'Al Jazeera',             src: '/logos/aljazeera.png',     forceBlack: false },
  { name: 'Channel 4 News',         src: '/logos/channel4-news.png', forceBlack: false },
  { name: 'Qatar Television',       src: '/logos/qatar-tv.png',      forceBlack: true  },
  { name: 'PBS',                    src: '/logos/pbs.png',           forceBlack: true  },
  { name: 'Channel 5',              src: '/logos/channel5.png',      forceBlack: false },
  { name: 'GBH',                    src: '/logos/gbh.png',           forceBlack: false },
  { name: 'Qatar Media Corporation',src: '/logos/qatar-media.png',   forceBlack: false },
]

const BRANDS = [
  { name: 'Emirates',               src: '/logos/emirates.png',          forceBlack: false },
  { name: 'Qatar Airways',          src: '/logos/qatar-airways.png',     forceBlack: false },
  { name: 'Jumeirah',               src: '/logos/jumeirah.png',          forceBlack: false },
  { name: 'Savills',                src: '/logos/savills.png',           forceBlack: false },
  { name: 'Giorgio Armani',         src: '/logos/armani.png',            forceBlack: false },
  { name: 'Jotun',                  src: '/logos/jotun.png',             forceBlack: false },
  { name: 'Monocle',                src: '/logos/monocle.png',           forceBlack: true  },
  { name: 'Qatar Foundation',       src: '/logos/qatar-foundation.png',  forceBlack: false },
  { name: 'Qatar Rail',             src: '/logos/qatar-rail.png',        forceBlack: false },
  { name: 'Al-Ahli Hospital',       src: '/logos/al-ahli.png',          forceBlack: false },
  { name: 'Durham University',      src: '/logos/durham.png',            forceBlack: false },
]

const DIVIDER = { name: '', src: '', forceBlack: false }
const ALL = [...BROADCASTERS, DIVIDER, ...BRANDS, ...BROADCASTERS, DIVIDER, ...BRANDS]

export default function ClientLogos() {
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '0.5px solid var(--border)',
      borderBottom: '0.5px solid var(--border)',
      background: 'rgba(14,12,8,1)',
      position: 'relative',
      padding: '20px 0',
    }}>
      {/* Fade masks */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 100,
        background: 'linear-gradient(to right, rgba(14,12,8,1), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 100,
        background: 'linear-gradient(to left, rgba(14,12,8,1), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          animation: 'ticker-scroll 65s linear infinite',
          willChange: 'transform',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
        }}
      >
        {ALL.map((logo, i) =>
          logo.src === '' ? (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
              flexShrink: 0,
            }}>
              <div style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'var(--gold)',
                opacity: 0.5,
              }} />
            </div>
          ) : (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                margin: '0 12px',
                padding: '14px 28px',
                background: 'rgba(232,226,213,0.03)',
                border: '0.5px solid rgba(232,226,213,0.07)',
                borderRadius: 6,
                transition: 'border-color 0.25s, background 0.25s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = 'rgba(200,169,110,0.3)'
                el.style.background = 'rgba(200,169,110,0.05)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = 'rgba(232,226,213,0.07)'
                el.style.background = 'rgba(232,226,213,0.03)'
              }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                width={130}
                height={36}
                loading="lazy"
                style={{
                  height: 36,
                  width: 'auto',
                  maxWidth: 130,
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.5,
                  transition: 'opacity 0.25s',
                }}
              />
            </div>
          )
        )}
      </div>
    </div>
  )
}
