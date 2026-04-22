import { useEffect, useRef } from 'react'

const HOVERABLES = 'a, button, .pillar, .work-tile, .reel-frame, .tool-tag'

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const hovered = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVERABLES)) {
        hovered.current = true
      }
    }

    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVERABLES)) {
        hovered.current = false
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      const dot = dotRef.current
      const ring = ringRef.current
      if (dot && ring) {
        dot.style.transform = `translate(${pos.current.x - 2}px, ${pos.current.y - 2}px)`

        ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.18)
        ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.18)

        const size = hovered.current ? 60 : 36
        const half = size / 2
        const radius = hovered.current ? '6px' : '50%'
        ring.style.transform = `translate(${ringPos.current.x - half}px, ${ringPos.current.y - half}px)`
        ring.style.width = `${size}px`
        ring.style.height = `${size}px`
        ring.style.borderRadius = radius
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          border: '1px solid var(--gold-dim)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s ease, height 0.2s ease, border-radius 0.2s ease',
          willChange: 'transform',
        }}
      >
        {/* Crosshair lines */}
        <span style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 16,
          height: 1,
          background: 'var(--gold-dim)',
          transform: 'translate(-50%, -50%)',
        }} />
        <span style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 1,
          height: 16,
          background: 'var(--gold-dim)',
          transform: 'translate(-50%, -50%)',
        }} />
      </div>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          background: 'var(--gold)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
    </>
  )
}
