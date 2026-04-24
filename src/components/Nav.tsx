import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = ['Work', 'Showreel', 'About', 'Writing', 'Contact']

const SPRING = { type: 'spring' as const, stiffness: 400, damping: 30 }

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating pill nav */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 24px 0',
        pointerEvents: 'none',
      }}>
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          padding: '0 20px',
          height: 44,
          borderRadius: 999,
          background: 'rgba(7,7,6,0.85)',
          border: '1px solid rgba(232,226,213,0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          pointerEvents: 'auto',
          boxShadow: '0 0 0 1px rgba(232,226,213,0.04), 0 8px 32px rgba(0,0,0,0.4)',
        }}>
          {/* Wordmark */}
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(232,226,213,0.4)',
            whiteSpace: 'nowrap',
          }}>
            DM
          </span>

          {/* REC indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--red)',
              animation: 'blink 1.3s ease-in-out infinite',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: 'var(--red)',
              letterSpacing: '0.2em',
            }}>
              REC
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 16, background: 'var(--border)', flexShrink: 0 }} />

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: 20 }}>
            {LINKS.map((label) => (
              <NavLink key={label} label={label} />
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              padding: '4px 8px',
              gap: 4,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            aria-label="Open menu"
          >
            <span style={{ display: 'block', width: 18, height: 1, background: 'var(--fg-dim)' }} />
            <span style={{ display: 'block', width: 18, height: 1, background: 'var(--fg-dim)' }} />
          </button>
        </nav>
      </div>

      {/* Mobile overlay — full screen */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              background: 'rgba(7,7,6,0.92)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '0 40px',
            }}
          >
            {/* Close (X morph) */}
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                width: 40,
                height: 40,
                background: 'rgba(232,226,213,0.06)',
                border: '1px solid var(--border)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 0,
              }}
              aria-label="Close menu"
            >
              <motion.span
                animate={{ rotate: 45, y: 1 }}
                style={{ display: 'block', width: 14, height: 1, background: 'var(--fg-dim)', transformOrigin: 'center' }}
              />
              <motion.span
                animate={{ rotate: -45, y: -1 }}
                style={{ display: 'block', width: 14, height: 1, background: 'var(--fg-dim)', transformOrigin: 'center' }}
              />
            </button>

            {/* Staggered links */}
            {LINKS.map((label, i) => (
              <motion.a
                key={label}
                href={`#${label.toLowerCase()}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ ...SPRING, delay: 0.05 + i * 0.06 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 6vw, 64px)',
                  color: 'var(--fg)',
                  letterSpacing: '0.02em',
                  lineHeight: 1.15,
                  marginBottom: 8,
                  display: 'block',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg)')}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ label }: { label: string }) {
  return (
    <motion.a
      href={`#${label.toLowerCase()}`}
      whileHover={{ opacity: 1 }}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(232,226,213,0.5)',
        transition: 'color 0.25s cubic-bezier(0.32,0.72,0,1)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,226,213,0.5)')}
    >
      {label}
    </motion.a>
  )
}
