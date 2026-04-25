import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
      style={{
        padding: '0 40px 120px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Eyebrow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 40,
      }}>
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
          About
        </span>
        <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
      </div>

      {/* Two-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'start',
      }}>

        {/* LEFT — Photo */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
          style={{
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Double-bezel outer */}
          <div style={{
            padding: 5,
            borderRadius: 4,
            background: 'rgba(232,226,213,0.02)',
            border: '1px solid var(--border)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }}>
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 2,
            }}>
              <img
                src="/david-about.jpg"
                alt="David McDougall directing on location"
                style={{
                  width: '100%',
                  display: 'block',
                  aspectRatio: '4/5',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  filter: 'contrast(1.08) saturate(0.82)',
                }}
              />
              {/* Subtle bottom gradient to blend into dark bg */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '30%',
                background: 'linear-gradient(to top, rgba(7,7,6,0.5) 0%, transparent 100%)',
                pointerEvents: 'none',
              }} />
              {/* Location caption */}
              <div style={{
                position: 'absolute',
                bottom: 14,
                left: 14,
                fontFamily: 'var(--font-mono)',
                fontSize: 8,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(232,226,213,0.5)',
              }}>
                On location · Middle East
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — Text */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
          style={{ paddingTop: 8 }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4vw, 56px)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            color: 'var(--fg)',
            marginBottom: 32,
          }}>
            DIRECTOR.<br />
            <span style={{ color: 'var(--gold)' }}>FIELD.</span><br />
            STUDIO.
          </h2>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 1.75,
            color: 'var(--fg-dim)',
            marginBottom: 24,
          }}>
            I spent two decades directing blue-chip documentaries and global commercials with crews of 50+. BBC. Al Jazeera. Hostile environments, hostile subjects, real stories.
          </p>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 1.75,
            color: 'var(--fg-dim)',
            marginBottom: 40,
          }}>
            Now, I operate entirely as a one-man studio — utilising bleeding-edge AI synthesis to conceptualise, storyboard, edit, and grade at the speed of thought. What previously required a village and a month, I now architect in days.
          </p>

          {/* Credential lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { label: 'Broadcaster', value: 'BBC · Al Jazeera' },
              { label: 'Experience', value: '20+ years directing' },
              { label: 'Countries', value: '40+ on location' },
              { label: 'Current mode', value: 'AI-augmented solo studio' },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '12px 0',
                  borderBottom: '0.5px solid var(--border)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(232,226,213,0.3)',
                }}>
                  {label}
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  fontSize: 13,
                  color: 'var(--fg)',
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
