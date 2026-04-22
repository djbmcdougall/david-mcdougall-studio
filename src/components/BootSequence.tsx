import { useEffect, useState } from 'react'

interface BootSequenceProps {
  onComplete: () => void
}

const LINES = [
  <>DAVID_MCDOUGALL.STUDIO — <span style={{ color: 'var(--gold)' }}>INITIALISING</span></>,
  <>FILMMAKER_OS <span style={{ color: 'var(--gold)' }}>v20.0</span> · ONE-MAN STUDIO MODE</>,
  <>LOADING: <span style={{ color: 'var(--gold)' }}>HIGGSFIELD · SORA · RUNWAY · ELEVENLABS · UDIO</span></>,
  <>BBC <span style={{ color: 'var(--gold)' }}>✓</span> · AL JAZEERA <span style={{ color: 'var(--gold)' }}>✓</span> · AWARD STATUS <span style={{ color: 'var(--gold)' }}>✓</span></>,
  <>I BUILD WHAT STUDIOS CAN'T AFFORD TO IMAGINE — <span style={{ color: 'var(--gold)' }}>READY</span></>,
]

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('booted')) {
      onComplete()
      return
    }

    const totalDuration = LINES.length * 280 + 500
    const startTime = Date.now()

    const lineTimers = LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), i * 280)
    )

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      setProgress(Math.min((elapsed / totalDuration) * 100, 100))
    }, 16)

    const exitTimer = setTimeout(() => {
      setExiting(true)
      setTimeout(() => {
        sessionStorage.setItem('booted', '1')
        onComplete()
      }, 600)
    }, totalDuration)

    return () => {
      lineTimers.forEach(clearTimeout)
      clearInterval(progressInterval)
      clearTimeout(exitTimer)
    }
  }, [onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5000,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 10vw',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      <div style={{ marginBottom: 48 }}>
        {LINES.map((line, i) => (
          <p
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              letterSpacing: '0.1em',
              color: 'var(--fg)',
              opacity: visibleLines > i ? 1 : 0,
              transform: visibleLines > i ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              marginBottom: 10,
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: 'var(--fg-dim)', marginRight: 8 }}>{'>'}</span>
            {line}
          </p>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{
        width: '100%',
        maxWidth: 480,
        height: 1,
        background: 'var(--fg-faint)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--gold)',
          transformOrigin: 'left',
          transform: `scaleX(${progress / 100})`,
          transition: 'transform 0.1s linear',
        }} />
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--fg-dim)',
        marginTop: 12,
        letterSpacing: '0.15em',
      }}>
        {Math.round(progress)}%
      </p>
    </div>
  )
}
