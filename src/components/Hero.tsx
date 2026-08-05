import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, type Variants } from 'framer-motion'

interface HeroProps {
  booted: boolean
}

const STATS = [
  { value: '20+', label: 'Years filmmaking experience' },
  { value: '10',  label: 'Major broadcasters' },
  { value: '50+', label: 'Countries filmed' },
  { value: '∞',   label: 'Possibilities with AI' },
]

const NAME = 'DAVID McDOUGALL'

export default function Hero({ booted }: HeroProps) {
  const charsRef    = useRef<(HTMLSpanElement | null)[]>([])
  const positions   = useRef<{ x: number; y: number; vx: number; vy: number }[]>([])
  const mouse       = useRef({ x: -9999, y: -9999 })
  const rafRef      = useRef<number>(0)
  const sectionRef  = useRef<HTMLElement>(null)

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
      <section
        id="hero"
        ref={sectionRef}
        className="hero-grid"
        style={{
          padding: '80px 40px 72px',
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) min(420px, 40%)',
          gap: 40,
          alignItems: 'start',
        }}
      >
        {/* LEFT */}
        <div>
          {/* On-location photo */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={booted ? 'show' : 'hidden'}
            variants={fadeUp}
            style={{ marginBottom: 28 }}
          >
            <FlipCard />
          </motion.div>

          <motion.p
            custom={1}
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
            Filmmaker &amp; AI Creative Director
          </motion.p>

          {/* Magnetic name */}
          <h1
            aria-label="David McDougall"
            className="hero-name"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 8vw, 96px)',
              lineHeight: 0.95,
              letterSpacing: '0.01em',
              marginBottom: 28,
              userSelect: 'none',
              whiteSpace: 'nowrap',
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

          {/* Stats — under name */}
          <motion.div
            custom={2}
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
                  fontFamily: stat.value === '∞' ? 'var(--font-sans)' : 'var(--font-display)',
                  fontSize: stat.value === '∞' ? 36 : 28,
                  fontWeight: stat.value === '∞' ? 300 : undefined,
                  color: 'var(--gold)',
                  letterSpacing: stat.value === '∞' ? '0' : '0.04em',
                  lineHeight: 1,
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(232,226,213,0.75)',
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>

        {/* RIGHT — full bio */}
        <div>
          <motion.div
            custom={2}
            initial="hidden"
            animate={booted ? 'show' : 'hidden'}
            variants={fadeUp}
            style={{ marginBottom: 32 }}
          >
            {[
              <>I've sat across the table from heads of state and on the ground with refugees who had lost everything.</>,
              <>Twenty years shooting, directing, and producing for BBC, Al Jazeera, Channel 4, PBS, Discovery, and National Geographic taught me what no film school can: how to find the real story under pressure, deliver on budget, and hit deadlines that matter.</>,
              <>My <a href="https://en.wikipedia.org/wiki/Afghan_Massacre:_The_Convoy_of_Death" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '0.5px solid rgba(200,169,110,0.4)', paddingBottom: 1 }}>first broadcast film</a> exposed a major military incident in Afghanistan, won multiple awards, and aired on CBC, Channel 5 and ZDF. The Journey, my 15-part dual-language series for Al Jazeera, reached over 50 million viewers worldwide.</>,
              <>After nine years building The Wired Agency — creating premium content for clients including Qatar Foundation, Harrods, Land Rover, and Qatar Airlines — I closed it in 2023 to go solo.</>,
              <>Today I run a one-man cinematic studio at the forefront of AI-native production. Using Kling, Sora, Runway, ElevenLabs and a host of other generative AI platforms, I deliver broadcast-ready video.</>,
              <>Real craft, frontier tools. Story is still story.</>,
              <>I also founded <a href="https://www.murmurlabs.co/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '0.5px solid rgba(200,169,110,0.4)', paddingBottom: 1 }}>Murmur Labs</a>, building voice-first verification infrastructure. Our flagship product, <a href="https://murmur.guide/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '0.5px solid rgba(200,169,110,0.4)', paddingBottom: 1 }}>Murmur.Guide</a>, uses the human voice as its core trust layer.</>,
              <>One director. Clear brief. Fast, exceptional delivery.</>,
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: 'rgba(232,226,213,0.72)',
                  marginBottom: 14,
                }}
              >
                {para}
              </p>
            ))}
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.16em',
              color: 'rgba(232,226,213,0.35)',
              marginTop: 6,
            }}>
              Richmond, North Yorkshire, UK.
            </p>
          </motion.div>

        </div>
      </section>
    </>
  )
}

function FlipCard() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{
        width: '100%',
        aspectRatio: '1364/1428',
        perspective: 1200,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.7s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* Front — photo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <picture>
            <source srcSet="/david-about.avif" type="image/avif" />
            <source srcSet="/david-about.webp" type="image/webp" />
            <img
              src="/david-about.jpg"
              alt="David McDougall directing on location"
              width={1364}
              height={1428}
              loading="eager"
              fetchPriority="high"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'contrast(1.08) saturate(0.82)',
              }}
            />
          </picture>
        </div>

        {/* Back — Vimeo interview */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#000',
          }}
        >
          {flipped && (
            <iframe
              src="https://player.vimeo.com/video/366344643?autoplay=1&color=c8a96e&title=0&byline=0&portrait=0"
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
          {/* Label */}
          <div style={{
            position: 'absolute',
            bottom: 14,
            left: 16,
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(200,169,110,0.6)',
            pointerEvents: 'none',
            zIndex: 2,
          }}>
            Interview
          </div>
        </div>
      </div>
    </div>
  )
}
