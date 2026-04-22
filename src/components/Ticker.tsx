const ITEMS = [
  { text: 'HIGH-FIDELITY STORYTELLING FOR GLOBAL BRANDS', gold: true },
  { text: 'AI CONTENT PRODUCTION · BRAND DESIGN · BROADCAST DOCUMENTARY', gold: false },
  { text: "I BUILD WHAT STUDIOS CAN'T AFFORD TO IMAGINE", gold: true },
  { text: 'HIGGSFIELD · SORA · RUNWAY · UDIO · ELEVENLABS', gold: false },
]

const ALL_ITEMS = [...ITEMS, ...ITEMS]

export default function Ticker() {
  return (
    <div style={{
      overflow: 'hidden',
      borderBottom: '1px solid var(--border)',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg)',
      position: 'relative',
      zIndex: 50,
    }}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'ticker-scroll 20s linear infinite',
        willChange: 'transform',
      }}>
        {ALL_ITEMS.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              letterSpacing: '0.28em',
              padding: '10px 32px',
              whiteSpace: 'nowrap',
              color: item.gold ? 'var(--gold)' : 'var(--fg-dim)',
            }}
          >
            {item.text}
            <span style={{ color: 'var(--fg-faint)', margin: '0 16px' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
