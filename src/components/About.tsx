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
              <picture>
                <source srcSet="/david-about.avif" type="image/avif" />
                <source srcSet="/david-about.webp" type="image/webp" />
                <img
                  src="/david-about.jpg"
                  alt="David McDougall directing on location"
                  width={1364}
                  height={1428}
                  loading="lazy"
                  style={{
                    width: '100%',
                    display: 'block',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    filter: 'contrast(1.08) saturate(0.82)',
                  }}
                />
              </picture>
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

          {[
            <>I've sat across the table from heads of state and on the ground with refugees who had lost everything.</>,
            <>Twenty years shooting, directing, and producing for BBC, Al Jazeera, Channel 4, PBS, Discovery, and National Geographic taught me what no film school can: how to find the real story under pressure, deliver on budget, and hit deadlines that matter.</>,
            <>My <a href="https://en.wikipedia.org/wiki/Afghan_Massacre:_The_Convoy_of_Death" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '0.5px solid rgba(200,169,110,0.4)', paddingBottom: 1 }}>first broadcast film</a> exposed a major military incident in Afghanistan, won multiple awards, and aired on CBC, Channel 5 and ZDF. The Journey, my 15-part dual-language series for Al Jazeera, reached over 50 million viewers worldwide.</>,
            <>After nine years building The Wired Agency — creating premium content for clients including Qatar Foundation, Harrods, Land Rover, and Qatar Airlines — I closed it in 2023 to go solo.</>,
            <>Today I run a one-man cinematic studio at the forefront of AI-native production. Using Kling, Sora, Runway, ElevenLabs and a host of other generative AI platforms, I deliver broadcast-ready video.</>,
            <>Real craft, frontier tools. Story is still story.</>,
            <>I also founded <a href="https://www.murmurlabs.co/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '0.5px solid rgba(200,169,110,0.4)', paddingBottom: 1 }}>Murmur Labs</a>, building voice-first verification infrastructure. Our flagship product, <a href="https://murmur.guide/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '0.5px solid rgba(200,169,110,0.4)', paddingBottom: 1 }}>Murmur.Guide</a>, uses the human voice as its core trust layer.</>,
            <>One director. Clear brief. Fast, exceptional delivery.</>,
          ].map((para, i, arr) => (
            <p key={i} style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--fg-dim)',
              marginBottom: i === arr.length - 1 ? 16 : 24,
            }}>
              {para}
            </p>
          ))}

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(232,226,213,0.3)',
            marginBottom: 40,
          }}>
            Richmond, North Yorkshire, UK.
          </p>

          {/* Credential lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { label: 'Broadcaster', value: 'BBC · Al Jazeera · Channel 4 · PBS' },
              { label: 'Experience', value: '20+ years directing' },
              { label: 'Countries', value: '50+ on location' },
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
