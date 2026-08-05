import { useEffect, useRef } from 'react'

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      // A zero-width canvas makes createImageData throw, which unmounts the
      // whole tree. Viewports briefly report 0 during orientation changes and
      // when the page is restored from bfcache.
      canvas.width = Math.max(1, window.innerWidth)
      canvas.height = Math.max(1, window.innerHeight)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      if (document.hidden) return
      const w = canvas.width
      const h = canvas.height
      if (w < 1 || h < 1) return
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
    }

    // Regenerating a full-viewport noise field is expensive; halve the rate on
    // touch devices, where it competes with scrolling and drains battery.
    const coarse = window.matchMedia('(pointer: coarse)').matches
    draw()
    const interval = setInterval(draw, coarse ? 160 : 80)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
        pointerEvents: 'none',
        opacity: 0.04,
      }}
    />
  )
}
