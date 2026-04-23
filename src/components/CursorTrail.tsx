import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  age: number
}

export default function CursorTrail({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let points: Point[] = []
    let mouse = { x: -999, y: -999 }
    let prevMouse = { x: -999, y: -999 }
    let animId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      prevMouse = { ...mouse }
      mouse = { x: e.clientX, y: e.clientY }
      const vx = mouse.x - prevMouse.x
      const vy = mouse.y - prevMouse.y
      points.unshift({ x: mouse.x, y: mouse.y, vx, vy, age: 0 })
      if (points.length > 28) points = points.slice(0, 28)
    }
    window.addEventListener('mousemove', onMove)

    const COLORS = [
      { r: 255, g: 20,  b: 60  },
      { r: 0,   g: 255, b: 200 },
      { r: 80,  g: 80,  b: 255 },
    ]
    const OFFSETS = [
      { x: -3, y: -2 },
      { x:  3, y:  2 },
      { x:  0, y:  0 },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      points.forEach((p) => { p.age += 0.04 })
      points = points.filter((p) => p.age < 1)

      if (points.length < 2) {
        animId = requestAnimationFrame(draw)
        return
      }

      COLORS.forEach((col, ci) => {
        ctx.beginPath()
        ctx.globalCompositeOperation = 'lighter'

        const ox = OFFSETS[ci].x
        const oy = OFFSETS[ci].y

        ctx.moveTo(points[0].x + ox, points[0].y + oy)

        for (let i = 1; i < points.length - 1; i++) {
          const mx = (points[i].x + points[i + 1].x) / 2 + ox
          const my = (points[i].y + points[i + 1].y) / 2 + oy
          ctx.quadraticCurveTo(
            points[i].x + ox,
            points[i].y + oy,
            mx, my,
          )
        }

        const grad = ctx.createLinearGradient(
          points[0].x, points[0].y,
          points[points.length - 1].x, points[points.length - 1].y,
        )
        grad.addColorStop(0,   `rgba(${col.r},${col.g},${col.b},0.9)`)
        grad.addColorStop(0.4, `rgba(${col.r},${col.g},${col.b},0.4)`)
        grad.addColorStop(1,   `rgba(${col.r},${col.g},${col.b},0)`)
        ctx.strokeStyle = grad

        const spd = Math.sqrt(points[0].vx ** 2 + points[0].vy ** 2)
        ctx.lineWidth = Math.min(2 + spd * 0.18, 9)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
      })

      ctx.globalCompositeOperation = 'source-over'
      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      // Clear canvas on unmount
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9995,
        mixBlendMode: 'screen',
      }}
    />
  )
}
