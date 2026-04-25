import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import CursorTrail from './CursorTrail'

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
  const charsRef    = useRef<(HTMLSpanElement | null)[]>([])
  const positions   = useRef<{ x: number; y: number; vx: number; vy: number }[]>([])
  const mouse       = useRef({ x: -9999, y: -9999 })
  const rafRef      = useRef<number>(0)
  const sectionRef  = useRef<HTMLElement>(null)
  const [heroInView, setHeroInView] = useState(false)

  // ── Bounds cache ──────────────────────────────────────────────
  const updateBounds = useCallback(() => {
    // Pre-warm by touching each rect (no-op but ensures layout flush)
    charsRef.current.forEach((el) => el?.getBoundingClientRect())
  }, [])

  // Init positions
  useEffect(() => {
    positions.current = NAME.split('').map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }))
  }, [])

  // Fix 3a: Double rAF after boot — ensures DOM has fully painted
  useEffect(() => {
    if (!booted) return
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updateBounds()
      })
    })
  }, [booted, updateBounds])

  // Fix 3b: Recalculate when fonts finish loading
  useEffect(() => {
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => updateBounds())
    })
  }, [updateBounds])

  // Fix 3c: Debounced resize — 150ms
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(updateBounds, 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', onResize)
    }
  }, [updateBounds])

  // ── Mouse tracking ────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // ── IntersectionObserver for cursor trail ─────────────────────
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // ── Magnetic name physics ─────────────────────────────────────
  useEffect(() => {
    const RADIUS    = 140
    const MAX_FORCE = 60
    const K         = 0.08
    const DAMP      = 0.72

    const animate = () => {
      charsRef.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top  + rect.height / 2

        const dx = mouse.current.x - cx
        const dy = mouse.current.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        const pos = positions.current[i]

        if (dist < RADIUS) {
          const force = (1 - dist / RADIUS) * MAX_FORCE
          const angle = Math.atan2(dy, dx)
          pos.vx += (-Math.cos(angle) * force - pos.x) * K
          pos.vy += (-Math.sin(angle) * force - pos.y) * K
        } else {
          pos.vx += (0 - pos.x) * K
          pos.vy += (0 - pos.y) * K
        }

        pos.vx *= DAMP
        pos.vy *= DAMP
        pos.x  += pos.vx
        pos.y  += pos.vy

        const disp  = Math.sqrt(pos.x * pos.x + pos.y * pos.y)
        const t     = Math.min(disp / MAX_FORCE, 1)
        const scale = 1 + t * 0.18

        const r = Math.round(240 + (200 - 240) * t)
        const g = Math.round(235 + (169 - 235) * t)
        const b = Math.round(224 + (110 - 224) * t)

        el.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`
        el.style.color      = `rgb(${r},${g},${b})`
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
      transition: {
        delay: i * 0.06,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  }

  return (
    <>
      <CursorTrail active={heroInView} />

      <section
        id="hero"
        ref={sectionRef}
        style={{
          padding: '80px 40px 72px',
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: 40,
          alignItems: 'end',
        }}
      >
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
            Filmmaker &amp; Creative Director
          </motion.p>

          {/* Magnetic name */}
          <h1
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

        </div>

        {/* RIGHT */}
        <div>
          <motion.p
            custom={1}
            initial="hidden"
            animate={booted ? 'show' : 'hidden'}
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              fontSize: 15,
              lineHeight: 1.7,
              color: 'var(--fg-dim)',
              marginBottom: 32,
            }}
          >
            I spent two decades directing blue-chip documentaries and global commercials with crews of 50+. Now, I operate entirely as a one-man studio, utilising bleeding-edge AI synthesis to conceptualise, storyboard, edit, and grade at the speed of thought.
            <br /><br />
            What previously required a village and a month, I now architect in days. You get agency-level fidelity and creative depth without the bloated overhead — directly interfacing with the director from brief to final delivery.
          </motion.p>

          {/* Tool tags */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={booted ? 'show' : 'hidden'}
            variants={fadeUp}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}
          >
            {TOOLS.map((tool) => (
              <ToolTag key={tool} label={tool} />
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={3}
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
    </>
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
