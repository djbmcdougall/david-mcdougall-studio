import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type VideoSource =
  | { type: 'youtube'; id: string }
  | { type: 'vimeo';   id: string; extraParams?: string }

interface Props {
  source: VideoSource | null
  onClose: () => void
}

function embedSrc(source: VideoSource): string {
  if (source.type === 'youtube') {
    return `https://www.youtube.com/embed/${source.id}?autoplay=1&rel=0&modestbranding=1`
  }
  const extra = source.extraParams ? `&${source.extraParams}` : ''
  return `https://player.vimeo.com/video/${source.id}?autoplay=1&color=c8a96e&title=0&byline=0&portrait=0${extra}`
}

export default function VideoLightbox({ source, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {source && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: 'min(960px, 92vw)',
              aspectRatio: '16/9',
              background: '#000',
              boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
            }}
          >
            <iframe
              src={embedSrc(source)}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: -44,
                right: 0,
                background: 'none',
                border: 'none',
                color: 'rgba(232,226,213,0.5)',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: '8px 0',
              }}
            >
              ESC · CLOSE
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
