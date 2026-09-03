import { useEffect } from 'react'
import { motion } from 'framer-motion'
import FAQ from '../components/FAQ'

const PROCESS = [
  {
    num: '01',
    title: 'Brief & Creative Direction',
    body: 'One call. You describe the story, the audience, and the outcome. I handle concept, scripting, and shot design from there.',
  },
  {
    num: '02',
    title: 'AI Generation',
    body: 'Cinematic footage generated using Sora, Runway, Kling, and Higgsfield — selected and directed frame by frame. No random outputs. Every clip is chosen.',
  },
  {
    num: '03',
    title: 'Voice, Sound & Music',
    body: 'Synthetic narration via ElevenLabs, original music composition via Udio, and full sound design — all matched to picture with broadcast-grade precision.',
  },
  {
    num: '04',
    title: 'Edit, Grade & Delivery',
    body: 'Full post production in DaVinci Resolve. Colour grade, titles, delivery to spec. Broadcast quality. In days, not months.',
  },
]

const CREDENTIALS = [
  { label: 'Broadcasters', value: 'BBC · Al Jazeera · Channel 4 · PBS · Discovery · National Geographic' },
  { label: 'AI tools', value: 'Sora · Runway · Kling · Higgsfield · ElevenLabs · Udio' },
  { label: 'Delivery', value: 'Days, not months' },
  { label: 'Experience', value: '20+ years broadcast craft' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
  }),
}

export default function AIProductionPage() {
  useEffect(() => {
    document.title = 'AI Content Production for Brands | David McDougall'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Broadcast-quality AI video, synthetic voice, and original music for brands. One director, full-stack AI pipeline. Brief to delivery in days. David McDougall — 20 years producing for BBC, Al Jazeera, and Channel 4.')
    return () => {
      document.title = 'David McDougall — Executive Producer & Series Director | Broadcast, Digital & Multiplatform News'
      if (meta) meta.setAttribute('content', 'Executive producer and series director. 20+ years for BBC, Al Jazeera, Channel 4, Discovery and PBS. Broadcast, digital and multiplatform production.')
    }
  }, [])

  return (
    <main style={{ paddingTop: 84 }}>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section style={{ padding: '80px 40px 72px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.p
          custom={0} initial="hidden" animate="show" variants={fadeUp}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 24,
          }}
        >
          AI Content Production
        </motion.p>

        <motion.h1
          custom={1} initial="hidden" animate="show" variants={fadeUp}
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            lineHeight: 1.12,
            color: 'var(--fg)',
            maxWidth: 820,
            marginBottom: 32,
            letterSpacing: '-0.01em',
          }}
        >
          Broadcast-quality AI film for brands.
        </motion.h1>

        <motion.p
          custom={2} initial="hidden" animate="show" variants={fadeUp}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            lineHeight: 1.7,
            color: 'rgba(232,226,213,0.65)',
            maxWidth: 560,
            marginBottom: 40,
          }}
        >
          Cinematic video, synthetic voice, original music — using Sora, Runway, Kling, ElevenLabs and Udio — with twenty years of broadcast craft behind every decision. One director, full pipeline. Brief to delivery in days.
        </motion.p>

        <motion.div
          custom={3} initial="hidden" animate="show" variants={fadeUp}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
        >
          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              border: '1px solid rgba(200,169,110,0.5)',
              padding: '12px 24px',
              borderRadius: 999,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200,169,110,0.08)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            Commission a film →
          </a>
          <a
            href="/blessed-are-the-pacemakers.html"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(232,226,213,0.5)',
              border: '1px solid rgba(232,226,213,0.12)',
              padding: '12px 24px',
              borderRadius: 999,
              textDecoration: 'none',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.borderColor = 'rgba(232,226,213,0.3)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(232,226,213,0.5)'; e.currentTarget.style.borderColor = 'rgba(232,226,213,0.12)' }}
          >
            View AI case study
          </a>
        </motion.div>
      </section>

      {/* ── Credential strip ──────────────────────────────── */}
      <div style={{
        borderTop: '0.5px solid var(--border)',
        borderBottom: '0.5px solid var(--border)',
        padding: '24px 40px',
        overflowX: 'auto',
      }}>
        <div style={{
          display: 'flex',
          gap: 40,
          maxWidth: 1200,
          margin: '0 auto',
          minWidth: 'max-content',
        }}>
          {CREDENTIALS.map(({ label, value }) => (
            <div key={label}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 8,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 4,
                opacity: 0.7,
              }}>
                {label}
              </p>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.08em',
                color: 'rgba(232,226,213,0.6)',
                whiteSpace: 'nowrap',
              }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Process ──────────────────────────────────────── */}
      <section id="process" style={{ padding: '80px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            padding: '4px 10px',
            border: '1px solid rgba(200,169,110,0.25)',
            borderRadius: 999,
          }}>
            Process
          </span>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
        </div>

        <div className="process-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'var(--border)',
          border: '0.5px solid var(--border)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              style={{
                background: 'var(--bg)',
                padding: '36px 28px',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.2em',
                color: 'rgba(200,169,110,0.4)',
                marginBottom: 20,
              }}>
                {step.num}
              </p>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 17,
                fontWeight: 400,
                color: 'var(--fg)',
                marginBottom: 12,
                lineHeight: 1.3,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                lineHeight: 1.7,
                color: 'rgba(232,226,213,0.5)',
              }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Case study proof ─────────────────────────────── */}
      <section id="work" style={{
        padding: '0 40px 80px',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            padding: '4px 10px',
            border: '1px solid rgba(200,169,110,0.25)',
            borderRadius: 999,
          }}>
            Case Study
          </span>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
        </div>

        <motion.a
          href="/blessed-are-the-pacemakers.html"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            alignItems: 'center',
            padding: '40px',
            background: 'rgba(232,226,213,0.02)',
            border: '0.5px solid var(--border)',
            borderRadius: 16,
            textDecoration: 'none',
            color: 'inherit',
            transition: 'border-color 0.3s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.25)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,226,213,0.08)' }}
        >
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 8,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              opacity: 0.6,
              marginBottom: 16,
            }}>
              Nike · Spec Film · 2026
            </p>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(22px, 2.8vw, 36px)',
              lineHeight: 1.2,
              color: 'var(--fg)',
              marginBottom: 16,
            }}>
              Blessed Are The Pacemakers
            </h3>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              lineHeight: 1.65,
              color: 'rgba(232,226,213,0.55)',
              marginBottom: 24,
            }}>
              60 seconds. No crew. No shooting days. No budget. Every frame AI-generated. Full broadcast-quality production from one director using Sora, Higgsfield, ElevenLabs, and Udio.
            </p>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              View case study →
            </span>
          </div>
          <div style={{
            aspectRatio: '16/9',
            borderRadius: 10,
            overflow: 'hidden',
            background: '#0a0a09',
          }}>
            <img
              src="https://vumbnail.com/1200432945.jpg"
              alt="Blessed Are The Pacemakers — AI film still"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.85 }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
          </div>
        </motion.a>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <FAQ />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section id="contact" style={{
        padding: '0 40px 120px',
        maxWidth: 1200,
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <div style={{
          padding: '64px 40px',
          border: '0.5px solid var(--border)',
          borderRadius: 20,
          background: 'rgba(232,226,213,0.02)',
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(28px, 4vw, 52px)',
            lineHeight: 1.2,
            color: 'var(--fg)',
            marginBottom: 16,
          }}>
            Ready to commission?
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            lineHeight: 1.6,
            color: 'rgba(232,226,213,0.55)',
            marginBottom: 40,
            maxWidth: 480,
            margin: '0 auto 40px',
          }}>
            One director. Clear brief. Broadcast-quality delivery in days.
          </p>
          <a
            href="mailto:davidmcdougall@proton.me"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              border: '1px solid rgba(200,169,110,0.5)',
              padding: '14px 32px',
              borderRadius: 999,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200,169,110,0.08)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            Get in touch →
          </a>
        </div>
      </section>

    </main>
  )
}
