import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export const FAQ_ITEMS = [
  {
    q: 'What is AI content production?',
    a: 'Directing and producing finished film — cinematic video, synthetic voice, sound design, and original music — using generative tools like Sora, Runway, Kling, ElevenLabs and Udio, with twenty years of broadcast craft behind every decision.',
  },
  {
    q: 'How is this different from a production company?',
    a: 'You interface directly with the director from brief to final delivery. No account managers, no inflated overhead — one person who owns research, scripting, shoot and post.',
  },
  {
    q: 'How fast can you deliver?',
    a: 'Broadcast-quality output in days rather than weeks or months, because the entire pipeline runs through one director using AI-native tools and documented workflows.',
  },
  {
    q: 'Is the quality actually broadcast standard?',
    a: "Yes. Twenty years directing for BBC, Al Jazeera, Channel 4, PBS, Discovery and National Geographic set the bar — the AI tools are how it's produced, not a lowering of the standard.",
  },
  {
    q: 'What do you need from me to start?',
    a: 'A clear brief: the story, the audience, and the outcome. From there I handle direction, generation, and delivery end to end.',
  },
]

interface FAQProps {
  /** Show the section eyebrow label and h2 heading */
  showHeading?: boolean
}

export default function FAQ({ showHeading = true }: FAQProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      style={{ padding: '0 40px 100px', maxWidth: 1200, margin: '0 auto' }}
    >
      {showHeading && (
        <>
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
              FAQ
            </span>
            <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
          </div>
          <h2 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
            Frequently Asked Questions
          </h2>
        </>
      )}

      <div>
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openSet.has(i)
          return (
            <div key={i} style={{ borderTop: '0.5px solid var(--border)' }}>
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 24,
                  padding: '28px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(20px, 2.4vw, 30px)',
                  color: 'var(--fg)',
                  lineHeight: 1.25,
                  flex: 1,
                }}>
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    flexShrink: 0,
                    marginTop: 4,
                    borderRadius: '50%',
                    border: '1px solid rgba(232,226,213,0.15)',
                    color: isOpen ? 'var(--gold)' : 'rgba(232,226,213,0.4)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 14,
                    lineHeight: 1,
                    transition: 'border-color 0.25s, color 0.25s',
                  }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 13,
                      lineHeight: 1.8,
                      color: 'rgba(232,226,213,0.65)',
                      paddingBottom: 32,
                      maxWidth: 760,
                    }}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
        <div style={{ borderTop: '0.5px solid var(--border)' }} />
      </div>
    </motion.section>
  )
}
