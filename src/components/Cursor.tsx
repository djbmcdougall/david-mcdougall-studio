import { useEffect, useRef } from 'react'

const HOVERABLES = [
  'a', 'button',
  '.pillar', '.w-tile', '.reel-frame', '.tool-tag',
  '.portfolio-tab', '.carousel-card', '.testimonial-card', '.writing-card',
].join(', ')

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const tlRef    = useRef<HTMLDivElement>(null)
  const trRef    = useRef<HTMLDivElement>(null)
  const blRef    = useRef<HTMLDivElement>(null)
  const brRef    = useRef<HTMLDivElement>(null)

  const raw      = useRef({ x: -200, y: -200 })
  const ringPos  = useRef({ x: -200, y: -200 })
  const bOffset  = useRef(22)   // current lerped bracket offset
  const ringSize = useRef(36)   // current lerped ring size
  const hovered  = useRef(false)
  const rafRef   = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => { raw.current = { x: e.clientX, y: e.clientY } }
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVERABLES)) hovered.current = true
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVERABLES)) hovered.current = false
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      const { x, y } = raw.current
      const h = hovered.current

      // Dot — instant, centred on pointer
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 2}px, ${y - 2}px)`
      }

      // Ring — lerp position + size
      ringPos.current.x = lerp(ringPos.current.x, x, 0.18)
      ringPos.current.y = lerp(ringPos.current.y, y, 0.18)
      const targetRingSize = h ? 64 : 36
      ringSize.current = lerp(ringSize.current, targetRingSize, 0.18)
      const half = ringSize.current / 2
      const rounding = h ? Math.min((ringSize.current - 36) / 28 * 6, 6) : 0
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - half}px, ${ringPos.current.y - half}px)`
        ringRef.current.style.width    = `${ringSize.current}px`
        ringRef.current.style.height   = `${ringSize.current}px`
        ringRef.current.style.borderRadius = ringSize.current > 38 ? `${rounding}px` : '50%'
      }

      // Brackets — lerp offset, raw position
      const targetOffset = h ? 40 : 22
      bOffset.current = lerp(bOffset.current, targetOffset, 0.2)
      const bo = bOffset.current

      const corners = [
        { ref: tlRef, dx: -bo, dy: -bo },
        { ref: trRef, dx:  bo, dy: -bo },
        { ref: blRef, dx: -bo, dy:  bo },
        { ref: brRef, dx:  bo, dy:  bo },
      ]
      corners.forEach(({ ref, dx, dy }) => {
        if (ref.current) {
          ref.current.style.transform = `translate(${x + dx - 6}px, ${y + dy - 6}px)`
        }
      })

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

  const bracketBase: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 12,
    height: 12,
    pointerEvents: 'none',
    zIndex: 9999,
    willChange: 'transform',
  }

  return (
    <>
      {/* Gold dot — instant */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 4, height: 4,
        background: 'var(--gold)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }} />

      {/* Lagging ring */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 36, height: 36,
        border: '1px solid var(--gold-dim)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }} />

      {/* Corner brackets */}
      <div ref={tlRef} style={{ ...bracketBase, borderTop: '1px solid var(--gold-dim)', borderLeft: '1px solid var(--gold-dim)' }} />
      <div ref={trRef} style={{ ...bracketBase, borderTop: '1px solid var(--gold-dim)', borderRight: '1px solid var(--gold-dim)' }} />
      <div ref={blRef} style={{ ...bracketBase, borderBottom: '1px solid var(--gold-dim)', borderLeft: '1px solid var(--gold-dim)' }} />
      <div ref={brRef} style={{ ...bracketBase, borderBottom: '1px solid var(--gold-dim)', borderRight: '1px solid var(--gold-dim)' }} />
    </>
  )
}
