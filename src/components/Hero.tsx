import { useEffect, useRef, useCallback } from 'react'
import { motion, type Variants } from 'framer-motion'

interface HeroProps {
  booted: boolean
}

const TOOLS = ['Higgsfield', 'Sora', 'Runway', 'ElevenLabs', 'Udio', 'Midjourney', 'After Effects', 'DaVinci']

const STATS = [
  { value: '20+', label: 'Years directing' },
  { value: '2',   label: 'Major broadcasters' },
  { value: '1',   label: 'Director. Full studio.' },
  { value: '∞',   label: 'Stories left to tell' },
]

const NAME = 'DAVID McDOUGALL'

export default function Hero({ booted }: HeroProps) {
  const charsRef = useRef<(HTMLSpanElement | null)[]>([])
  const positions = useRef<{ x: number; y: number; vx: number; vy: number }[]>([])
  const mouse = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const containerRef = useRef<HTMLHeadingElement>(null)

  const initPositions = useCallback(() => {
    positions.current = NAME.split('').map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }))
  }, [])

  const cacheRects = useCallback(() => {
    charsRef.current.forEach((el) => el?.getBoundingClientRect())
  }, [])

  useEffect(() => {
    initPositions()
  }, [initPositions])

  useEffect(() => {
    if (booted) {
      setTimeout(cacheRects, 100)
    }
  }, [booted, cacheRects])

  useEffect(() => {
    const onResize = () => cacheRects()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [cacheRects])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const RADIUS = 140
    const MAX_FORCE = 60
    const K = 0.08
    const DAMP = 0.72

    const animate = () => {
      charsRef.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2

        const dx = mouse.current.x - cx
        const dy = mouse.current.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        const pos = positions.current[i]

        if (dist < RADIUS) {
          const force = (1 - dist / RADIUS) * MAX_FORCE
          const angle = Math.atan2(dy, dx)
          const tx = -Math.cos(angle) * force
          const ty = -Math.sin(angle) * force
          pos.vx += (tx - pos.x) * K
          pos.vy += (ty - pos.y) * K
        } else {
          pos.vx += (0 - pos.x) * K
          pos.vy += (0 - pos.y) * K
        }

        pos.vx *= DAMP
        pos.vy *= DAMP
        pos.x += pos.vx
        pos.y += pos.vy

        const displacement = Math.sqrt(pos.x * pos.x + pos.y * pos.y)
        const t = Math.min(displacement / MAX_FORCE, 1)
        const scale = 1 + t * 0.18

        const r1 = [240, 235, 224]
        const r2 = [200, 169, 110]
        const r = Math.round(r1[0] + (r2[0] - r1[0]) * t)
        const g = Math.round(r1[1] + (r2[1] - r1[1]) * t)
        const b = Math.round(r1[2] + (r2[2] - r1[2]) * t)

        el.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`
        el.style.color = `rgb(${r},${g},${b})`
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  }

  return (
    <section id="hero" style={{
      padding: '80px 40px 72px',
      maxWidth: 1200,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 420px',
      gap: 40,
      alignItems: 'end',
    }}>
      {/* LEFT */}
      <div>
        <motion.p
          custom={0}
          initial="hidden"
          animate={booted ? 'show' : 'hidden'}
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 24,
          }}
        >
          Filmmaker & Creative Director
        </motion.p>

        {/* Magnetic name */}
        <h1
          ref={containerRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 8vw, 96px)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            marginBottom: 28,
            userSelect: 'none',
          }}
        >
          {NAME.split('').map((char, i) => (
            <span
              key={i}
              ref={(el) => { charsRef.current[i] = el }}
              style={{
                display: 'inline-block',
                color: '#f0ebe0',
                willChange: 'transform',
                whiteSpace: char === ' ' ? 'pre' : undefined,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <motion.p
          custom={1}
          initial="hidden"
          animate={booted ? 'show' : 'hidden'}
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 22,
            color: 'var(--gold)',
            maxWidth: 480,
          }}
        >
          High-fidelity storytelling for global brands.
        </motion.p>
      </div>

      {/* RIGHT */}
      <div>
        <motion.p
          custom={2}
          initial="hidden"
          animate={booted ? 'show' : 'hidden'}
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            lineHeight: 1.8,
            color: 'var(--fg-dim)',
            marginBottom: 32,
          }}
        >
          I build what studios can't afford to imagine. Twenty years directing for BBC and Al Jazeera gave me the instincts. Every AI tool ever made gives me the arsenal. The result: one director who does it all — concept, production, music, post — at a speed and cost that rewrites what's possible.
        </motion.p>

        {/* Tool tags */}
        <motion.div
          custom={3}
          initial="hidden"
          animate={booted ? 'show' : 'hidden'}
          variants={fadeUp}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 32,
          }}
        >
          {TOOLS.map((tool) => (
            <ToolTag key={tool} label={tool} />
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={4}
          initial="hidden"
          animate={booted ? 'show' : 'hidden'}
          variants={fadeUp}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '10px 0',
                borderBottom: '0.5px solid var(--border)',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                color: 'var(--gold)',
                letterSpacing: '0.04em',
              }}>
                {stat.value}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--fg-dim)',
              }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ToolTag({ label }: { label: string }) {
  return (
    <motion.span
      className="tool-tag"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '5px 10px',
        border: '1px solid var(--border)',
        color: 'var(--fg-dim)',
        transition: 'border-color 0.2s, color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--gold)'
        e.currentTarget.style.color = 'var(--fg)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.color = 'var(--fg-dim)'
      }}
    >
      {label}
    </motion.span>
  )
}
