import { motion } from 'framer-motion'

export default function Tagline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
      style={{
        padding: '100px 40px 72px',
        textAlign: 'center',
      }}
    >
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 'clamp(28px, 4vw, 58px)',
        color: 'var(--fg)',
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        margin: '0 auto',
        maxWidth: 900,
      }}>
        High-fidelity storytelling for global brands.
      </p>
    </motion.div>
  )
}
