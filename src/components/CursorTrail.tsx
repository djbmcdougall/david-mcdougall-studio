import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const BUFFER_SIZE = 24
const BASE_RADIUS = 3
const MAX_RADIUS = 10

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
       window.innerWidth / 2,
       window.innerHeight / 2,
      -window.innerHeight / 2,
      0.1,
      1000,
    )
    camera.position.z = 100

    // Position buffer (screen coords, will be converted)
    const positions: THREE.Vector3[] = Array.from({ length: BUFFER_SIZE }, () =>
      new THREE.Vector3(-9999, -9999, 0),
    )
    const smoothed: THREE.Vector3[] = positions.map((p) => p.clone())

    let mouse = new THREE.Vector2(-9999, -9999)
    let prevMouse = new THREE.Vector2(-9999, -9999)
    let velocity = 0

    const toScene = (x: number, y: number) =>
      new THREE.Vector3(
        x - window.innerWidth / 2,
        -(y - window.innerHeight / 2),
        0,
      )

    const onMove = (e: MouseEvent) => {
      prevMouse.copy(mouse)
      mouse.set(e.clientX, e.clientY)
      velocity = Math.min(mouse.distanceTo(prevMouse), 40)
      // Push to front, drop last
      positions.unshift(toScene(e.clientX, e.clientY))
      positions.pop()
    }
    window.addEventListener('mousemove', onMove)

    // Create 3 tube meshes for R/G/B chromatic split
    const OFFSETS = [
      { color: 0xff2040, ox: -1.5, oy: 0.5 },
      { color: 0x00ffcc, ox: 0,    oy: 0 },
      { color: 0x4040ff, ox: 1.5,  oy: -0.5 },
    ]

    const tubes: THREE.Mesh[] = []

    for (const def of OFFSETS) {
      const mat = new THREE.MeshBasicMaterial({
        color: def.color,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      })
      const mesh = new THREE.Mesh(new THREE.BufferGeometry(), mat)
      scene.add(mesh)
      tubes.push(mesh)
    }

    let rafId = 0
    let stopped = false

    const buildTube = (pts: THREE.Vector3[], radius: number): THREE.BufferGeometry => {
      if (pts.length < 2) return new THREE.BufferGeometry()
      try {
        const curve = new THREE.CatmullRomCurve3(pts)
        const geo = new THREE.TubeGeometry(curve, pts.length * 2, radius, 6, false)

        // Taper UV-based: scale alpha via vertex color (opacity taper handled in shader-less way via per-mesh opacity)
        return geo
      } catch {
        return new THREE.BufferGeometry()
      }
    }

    const tick = () => {
      if (stopped) return
      rafId = requestAnimationFrame(tick)

      // Smooth all positions
      for (let i = 0; i < BUFFER_SIZE; i++) {
        smoothed[i].lerp(positions[i], 0.22)
      }

      // Velocity decays
      velocity = lerp(velocity, 0, 0.08)

      const radius = lerp(BASE_RADIUS, MAX_RADIUS, Math.min(velocity / 40, 1))

      // Filter out unset positions
      const valid = smoothed.filter(
        (p) => p.x > -window.innerWidth && p.y > -window.innerHeight,
      )
      if (valid.length < 4) {
        renderer.render(scene, camera)
        return
      }

      // Taper: progressively reduce radius from head to tail
      const pts = valid.map((p, i) => p.clone())

      OFFSETS.forEach((def, idx) => {
        const offsetPts = pts.map((p, i) => {
          const t = i / (pts.length - 1)
          const r = lerp(radius, 0, t)
          return new THREE.Vector3(
            p.x + def.ox,
            p.y + def.oy,
            p.z + idx * 0.1,
          )
        })

        if (offsetPts.length >= 2) {
          const geo = buildTube(offsetPts, radius * lerp(1, 0.05, 0))

          // Dispose old geometry
          tubes[idx].geometry.dispose()
          tubes[idx].geometry = geo
        }
      })

      renderer.render(scene, camera)
    }

    // IntersectionObserver — only run trail when hero is visible
    const hero = document.getElementById('hero')
    const observer = new IntersectionObserver(
      (entries) => {
        activeRef.current = entries[0].isIntersecting
        for (const tube of tubes) {
          tube.visible = activeRef.current
        }
      },
      { threshold: 0 },
    )
    if (hero) observer.observe(hero)

    tick()

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.left = -window.innerWidth / 2
      camera.right = window.innerWidth / 2
      camera.top = window.innerHeight / 2
      camera.bottom = -window.innerHeight / 2
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      stopped = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      if (hero) observer.unobserve(hero)
      renderer.dispose()
      for (const tube of tubes) {
        tube.geometry.dispose()
        ;(tube.material as THREE.Material).dispose()
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    />
  )
}
