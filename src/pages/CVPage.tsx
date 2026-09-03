import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

const B = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>{children}</strong>
)

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: [0.32, 0.72, 0, 1] as const },
  }),
}

const JOBS: { title: string; company: string; location: string; dates: string; bullets: React.ReactNode[] }[] = [
  {
    title: 'Founder & AI Creative Producer',
    company: 'Murmur Labs Ltd',
    location: 'Richmond, North Yorkshire',
    dates: 'Mar 2023 – Present',
    bullets: [
      <>Runs a one-person AI-native production studio using <B>Sora</B>, <B>Runway</B>, <B>Kling</B>, <B>Higgsfield</B>, <B>ElevenLabs</B> and <B>Udio</B> to compress broadcast-quality production timelines by 60–80%.</>,
      'Applies two decades of editorial judgement to frontier generative-video and voice-AI tooling — current, hands-on evidence of how AI can accelerate multiplatform newsroom output.',
    ],
  },
  {
    title: 'Executive Producer / Series Director',
    company: 'The Wired Agency',
    location: 'Doha, Qatar',
    dates: 'Sep 2013 – Feb 2023',
    bullets: [
      <>Series-directed <em>The Journey</em> — a 15-part bilingual (Arabic/English) travel documentary for <B>Al Jazeera</B>, reaching 50M+ viewers across MENA.</>,
      'Nine years building and mentoring multi-disciplinary international crews and producers across complex, cross-border productions, with full editorial oversight from development through delivery.',
      <>Delivered premium branded content and documentary work for <B>Qatar Foundation</B>, <B>Harrods</B>, <B>Land Rover</B>, <B>Qatar Airways</B>, <B>Emirates Airlines</B>, Jumeirah, <B>Total</B>, Hamad International Airport and <B>Armani</B>, coordinating storytelling across linear, digital and social platforms.</>,
    ],
  },
  {
    title: 'Senior Producer',
    company: 'Qatar Media Corporation (State Broadcaster)',
    location: 'Doha, Qatar',
    dates: 'Sep 2018 – Feb 2020',
    bullets: [
      <>Designed and launched a new English-language multiplatform broadcast channel for a national state broadcaster — TV programming, promotional campaigns and digital content, development through daily production operations. (Embedded secondment from The Wired Agency.)</>,
    ],
  },
  {
    title: 'Content Director',
    company: 'Freelance',
    location: 'Europe, Middle East & South East Asia',
    dates: 'Jun 2009 – Sep 2013',
    bullets: [
      <>Produced and directed branded content and investigative documentaries across Myanmar, Thailand, Hong Kong, Philippines, Bahrain, and the UK for the <B>Daily Telegraph</B>, Monocle Magazine, and the University of Durham.</>,
    ],
  },
  {
    title: 'Producer / Director',
    company: 'Alchemy Films',
    location: 'Dubai, UAE',
    dates: 'Jul 2007 – Jul 2009',
    bullets: [
      <>Delivered branded content, TVCs, and documentaries for <B>Armani</B>, <B>Ferragamo</B>, <B>Emirates Airlines</B>, <B>McKinsey</B>, <B>Bloomberg</B>, and <B>CNN</B> — via agencies TBWA, Leo Burnett, Ogilvy, and Grey.</>,
    ],
  },
  {
    title: 'Development Producer · Associate Producer · Production Manager',
    company: 'BBC · Discovery · National Geographic · Channel 4 · PBS',
    location: 'London',
    dates: 'Apr 2004 – Jun 2007',
    bullets: [
      <>Credits include <B>BBC</B> Horizon, <B>BBC</B> Storyville, <B>Channel 4</B> News, <B>PBS</B>, <B>Discovery</B>, and <B>National Geographic</B>.</>,
    ],
  },
  {
    title: 'Development Producer / Associate Producer',
    company: 'Paladin Invision Productions (Multi Emmy-winning)',
    location: 'London',
    dates: 'Mar 2003 – Apr 2004',
    bullets: [],
  },
  {
    title: 'Associate Producer / Head of Development',
    company: 'Atlantic Celtic Films',
    location: 'Windsor, UK',
    dates: 'Sep 2001 – Apr 2003',
    bullets: [
      'Investigations and current affairs documentary production.',
      <>Co-produced the multi-award-winning investigative documentary <em>Afghan Massacre: The Convoy of Death</em>, broadcast on <B>Channel 5</B>, <B>CBC</B> and <B>ZDF</B>.</>,
    ],
  },
]

const COMPETENCIES = [
  {
    title: 'Broadcast & Editorial',
    body: 'Live & multiplatform broadcast production · Editorial leadership & mentoring · Investigative & long-form documentary · Digital news & social content · Executive producing',
  },
  {
    title: 'Global & Operational',
    body: 'International newsroom leadership (MENA/Doha) · Cross-border crew management · Multi-language/multi-market localisation · Linear + digital + social content strategy · Post-production & delivery oversight',
  },
  {
    title: 'Innovation',
    body: 'Generative AI video & audio production · Voice AI (ElevenLabs, Vapi) · AI-assisted production workflows · Prompt engineering · Rapid-turnaround multiplatform delivery',
  },
]

const HIGHLIGHTS: React.ReactNode[] = [
  <>20+ years directing for <B>BBC</B>, <B>Al Jazeera</B>, <B>Channel 4</B>, <B>PBS</B>, <B>Discovery</B>, and <B>National Geographic</B>.</>,
  <>Co-produced the multi-award-winning investigative documentary <em>Afghan Massacre: The Convoy of Death</em>, broadcast on <B>Channel 5</B>, <B>CBC</B> and <B>ZDF</B>.</>,
  <>Series-directed <em>The Journey</em>, a 15-part bilingual travel documentary for <B>Al Jazeera</B>, reaching 50M+ viewers across MENA.</>,
  <>Senior Producer (embedded secondment, <B>Qatar Media Corporation</B>): designed and launched a new English-language multiplatform broadcast channel for a national state broadcaster — TV programming, promotional campaigns and digital content, development through daily production operations.</>,
]

const SKILLS = [
  { label: 'AI Video',    val: 'Runway ML · Kling · Luma Dream Machine · Sora · Midjourney · Pika' },
  { label: 'Voice AI',   val: 'ElevenLabs (Deep Voice Design, API Deployment, Multilingual Generation) · Vapi · Whisper · TTS/STT pipelines · Agentic voice orchestration' },
  { label: 'LLMs',       val: 'Claude (Claude Code) · GPT-4o · Gemini · Prompt engineering · MCP · Agent-native development' },
  { label: 'Dev Stack',  val: 'React · TypeScript · Tailwind CSS · Node.js · Vercel (AI-assisted full-stack development)' },
  { label: 'Production', val: 'Adobe Premiere · DaVinci Resolve · Final Cut Pro · After Effects · Avid' },
]

const RULE: React.CSSProperties = {
  borderTop: '0.5px solid var(--border)',
  margin: '36px 0 0',
}

const RULE_GOLD: React.CSSProperties = {
  borderTop: '1px solid rgba(200,169,110,0.3)',
  margin: '8px 0 0',
}

const LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 9,
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: 'var(--gold)',
  margin: '28px 0 12px',
}

export default function CVPage() {
  useEffect(() => {
    document.title = 'David McDougall — Executive Producer · Supervising Producer | Broadcast, Digital & Multiplatform News'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Broadcast executive producer and editorial leader with 20+ years for BBC, Al Jazeera, Channel 4, Discovery, National Geographic and PBS, including nine years leading multiplatform production in Doha, Qatar.')
    return () => {
      document.title = 'David McDougall — Executive Producer & Series Director | Broadcast, Digital & Multiplatform News'
      if (meta) meta.setAttribute('content', 'Executive producer and series director. 20+ years for BBC, Al Jazeera, Channel 4, Discovery and PBS. Broadcast, digital and multiplatform production.')
    }
  }, [])

  return (
    <main style={{ paddingTop: 84, minHeight: '100vh' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 40px 100px' }}>

        {/* ── Back link ───────────────────────────────────────────────── */}
        <a
          href="/"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--fg-dim)',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: 48,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-dim)')}
        >
          ← davidmcdougall.studio
        </a>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.h1
            variants={fadeUp} custom={0}
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(36px, 6vw, 56px)',
              lineHeight: 1,
              color: 'var(--fg)',
              marginBottom: 10,
            }}
          >
            David McDougall
          </motion.h1>

          <motion.p
            variants={fadeUp} custom={1}
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 17,
              color: 'var(--gold)',
              marginBottom: 14,
            }}
          >
            Executive Producer · Supervising Producer — Broadcast, Digital &amp; Multiplatform News
          </motion.p>

          <motion.p
            variants={fadeUp} custom={2}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--fg-dim)',
              marginBottom: 14,
            }}
          >
            AI-Native Production Innovator
          </motion.p>

          <motion.div
            variants={fadeUp} custom={3}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.14em',
              color: 'var(--fg-dim)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px 20px',
              marginBottom: 4,
            }}
          >
            <span>Richmond, North Yorkshire</span>
            <a
              href="mailto:davidmcdougall@proton.me"
              style={{ color: 'var(--gold)', textDecoration: 'none' }}
            >
              davidmcdougall@proton.me
            </a>
            <span>+44 7943 590 816</span>
            <a
              href="https://mcdougall.studio"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--gold)', textDecoration: 'none' }}
            >
              mcdougall.studio
            </a>
          </motion.div>

          {/* Gold rule under header */}
          <motion.div variants={fadeUp} custom={4} style={RULE_GOLD} />

          {/* ── Download CTA ─────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp} custom={5}
            style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24 }}
          >
            <a
              href="/david_mcdougall_cv.docx"
              download
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--bg)',
                background: 'var(--gold)',
                padding: '10px 20px',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              ↓ Download CV (.docx)
            </a>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--fg-dim)', letterSpacing: '0.12em' }}>
              Microsoft Word format
            </span>
          </motion.div>
        </motion.div>

        {/* ── Profile ─────────────────────────────────────────────────── */}
        <div style={RULE} />
        <p style={LABEL}>Profile</p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            lineHeight: 1.8,
            color: 'var(--fg-dim)',
            maxWidth: '72ch',
          }}
        >
          Broadcast executive producer and editorial leader with 20+ years
          directing and producing for BBC, Al Jazeera, Channel 4, Discovery,
          National Geographic and PBS, including nine years based in Doha, Qatar
          leading multiplatform production for regional and international
          broadcasters and brands. Series-directed <em>The Journey</em>, a 15-part
          bilingual (Arabic/English) travel documentary for Al Jazeera reaching
          50M+ viewers, and co-produced the multi-award-winning investigative
          documentary <em>Afghan Massacre: The Convoy of Death</em> (Channel 5,
          CBC, ZDF). On secondment as Senior Producer to Qatar Media Corporation,
          designed and launched TV programming and digital content for a new
          English-language broadcast channel. Brings this editorial and production
          leadership together with hands-on fluency in AI-native production
          pipelines — a rare ability to modernise multiplatform news workflows
          without compromising editorial rigour.
        </motion.p>

        {/* ── Career Highlights ───────────────────────────────────────── */}
        <div style={RULE} />
        <p style={LABEL}>Career Highlights</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {HIGHLIGHTS.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                lineHeight: 1.7,
                color: 'var(--fg-dim)',
                paddingLeft: 18,
                position: 'relative',
                marginBottom: 8,
                maxWidth: '72ch',
              }}
            >
              <span style={{
                position: 'absolute',
                left: 0,
                color: 'var(--gold)',
                fontSize: 10,
                top: 4,
              }}>
                ▸
              </span>
              {h}
            </motion.li>
          ))}
        </ul>

        {/* ── Core Competencies ───────────────────────────────────────── */}
        <div style={RULE} />
        <p style={LABEL}>Core Competencies</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {COMPETENCIES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              style={{
                padding: '16px 18px',
                background: 'rgba(232,226,213,0.03)',
                border: '1px solid var(--border)',
                borderLeft: '2px solid var(--gold)',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--fg)',
                marginBottom: 8,
              }}>
                {c.title}
              </p>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                lineHeight: 1.65,
                color: 'var(--fg-dim)',
              }}>
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Experience ──────────────────────────────────────────────── */}
        <div style={RULE} />
        <p style={LABEL}>Experience</p>
        <div>
          {JOBS.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              style={{
                marginTop: i === 0 ? 0 : 28,
                paddingTop: i === 0 ? 0 : 28,
                borderTop: i === 0 ? 'none' : '0.5px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  fontSize: 17,
                  color: 'var(--fg)',
                }}>
                  {job.title}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'rgba(232,226,213,0.4)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  {job.dates}
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.1em',
                color: 'var(--gold)',
                margin: '4px 0 10px',
              }}>
                {job.company}
                {job.location && (
                  <span style={{ color: 'rgba(232,226,213,0.35)', marginLeft: 10 }}>
                    · {job.location}
                  </span>
                )}
              </p>
              {job.bullets.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {job.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: 'var(--fg-dim)',
                        paddingLeft: 18,
                        position: 'relative',
                        marginBottom: 4,
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: 'var(--gold)',
                        fontSize: 10,
                        top: 4,
                      }}>
                        ▸
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── AI Tools & Technology ───────────────────────────────────── */}
        <div style={RULE} />
        <p style={LABEL}>AI Tools & Technology</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 24px', alignItems: 'baseline' }}>
          {SKILLS.map((s) => (
            <React.Fragment key={s.label}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  color: 'var(--fg)',
                  whiteSpace: 'nowrap',
                }}
              >
                {s.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  color: 'var(--fg-dim)',
                  lineHeight: 1.6,
                }}
              >
                {s.val}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* ── Education ───────────────────────────────────────────────── */}
        <div style={RULE} />
        <p style={LABEL}>Education</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--fg)', marginBottom: 2 }}>
              BSc (Econ) Agricultural Economics
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.1em' }}>
              University of Reading
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.1em' }}>
              Ampleforth College
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-dim)', marginTop: 3 }}>
              4 A Levels · 10 GCSEs
            </p>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <div style={{ ...RULE, marginTop: 48 }} />
        <div style={{
          marginTop: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.14em',
            color: 'rgba(232,226,213,0.3)',
          }}>
            Portfolio & Showreel:{' '}
            <a
              href="https://mcdougall.studio"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--gold)', textDecoration: 'none' }}
            >
              mcdougall.studio
            </a>
            {' '}· AI Case Study:{' '}
            <a
              href="https://mcdougall.studio/blessed-are-the-pacemakers.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--gold)', textDecoration: 'none' }}
            >
              Blessed Are the Pacemakers
            </a>
          </p>
          <a
            href="/david_mcdougall_cv.docx"
            download
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(232,226,213,0.4)',
              textDecoration: 'none',
              border: '1px solid rgba(232,226,213,0.12)',
              padding: '8px 14px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--gold)'
              e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(232,226,213,0.4)'
              e.currentTarget.style.borderColor = 'rgba(232,226,213,0.12)'
            }}
          >
            ↓ Download CV
          </a>
        </div>

      </div>
    </main>
  )
}
