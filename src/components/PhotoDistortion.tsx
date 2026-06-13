import { useEffect, useRef } from 'react'

// ── Vertex shader ──────────────────────────────────────────────────────────
const VERT = `
  attribute vec2 a_pos;
  attribute vec2 a_uv;
  varying vec2 v_uv;
  void main() {
    v_uv = a_uv;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`

// ── Fragment shader ────────────────────────────────────────────────────────
// RGB chromatic aberration matching the reference video:
//   - R and B channels split in opposite directions
//   - Aberration is radial (stronger towards edges)
//   - Mouse velocity amplifies the split
//   - Slow idle oscillation keeps it alive when mouse is still
const FRAG = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_tex;
  uniform float u_time;
  uniform vec2 u_velocity;   // mouse velocity, smoothed
  uniform float u_speed;     // scalar speed for easy tuning

  void main() {
    vec2 uv = v_uv;

    // Vector from centre — drives radial aberration
    vec2 dir    = uv - 0.5;
    float dist  = length(dir);

    // Idle breath: barely perceptible sine oscillation when mouse is still
    float idle  = sin(u_time * 0.9) * 0.0003;

    // Total aberration: very subtle radial base + mouse speed burst + idle
    float aberr = dist * 0.003 + u_speed * 0.022 + idle;

    // Aberration direction: radial when idle, follows velocity when moving
    vec2 aDir = length(u_velocity) > 0.001
      ? normalize(u_velocity)
      : normalize(dir + vec2(0.0001, 0.0001));

    // Red offset outward, Blue offset inward, Green stays
    float r = texture2D(u_tex, uv + aDir * aberr * 1.0).r;
    float g = texture2D(u_tex, uv                      ).g;
    float b = texture2D(u_tex, uv - aDir * aberr * 1.2).b;
    float a = texture2D(u_tex, uv                      ).a;

    gl_FragColor = vec4(r, g, b, a);
  }
`

// ── GL helpers ─────────────────────────────────────────────────────────────
function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

function makeProgram(gl: WebGLRenderingContext) {
  const p = gl.createProgram()!
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT))
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(p)
  return p
}

// ── Component ──────────────────────────────────────────────────────────────
interface Props {
  src: string
  alt?: string
  style?: React.CSSProperties
}

export default function PhotoDistortion({ src, alt, style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    if (!gl) return

    // ── Program + geometry ──
    const prog = makeProgram(gl)
    gl.useProgram(prog)

    // Full-screen quad: x, y, u, v
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 0, 1,
       1, -1, 1, 1,
      -1,  1, 0, 0,
       1,  1, 1, 0,
    ]), gl.STATIC_DRAW)

    const STRIDE = 16
    const aPos = gl.getAttribLocation(prog, 'a_pos')
    const aUV  = gl.getAttribLocation(prog, 'a_uv')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, STRIDE, 0)
    gl.enableVertexAttribArray(aUV)
    gl.vertexAttribPointer(aUV,  2, gl.FLOAT, false, STRIDE, 8)

    // ── Uniforms ──
    const uTime     = gl.getUniformLocation(prog, 'u_time')
    const uVelocity = gl.getUniformLocation(prog, 'u_velocity')
    const uSpeed    = gl.getUniformLocation(prog, 'u_speed')
    const uTex      = gl.getUniformLocation(prog, 'u_tex')
    gl.uniform1i(uTex, 0)

    // ── Texture ──
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,0,0]))
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
    }
    img.src = src

    // ── Resize ──
    const ro = new ResizeObserver(() => {
      const w = Math.round(canvas.clientWidth  * window.devicePixelRatio)
      const h = Math.round(canvas.clientHeight * window.devicePixelRatio)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    })
    ro.observe(canvas)

    // ── Mouse tracking with velocity ──
    let tx = 0, ty = 0           // raw mouse target
    let vx = 0, vy = 0           // smoothed velocity
    let prevX = 0, prevY = 0     // last frame position

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      tx = (e.clientX - r.left) / r.width  * 2 - 1
      ty = -((e.clientY - r.top) / r.height * 2 - 1)
    }
    const onLeave = () => { tx = 0; ty = 0 }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    // ── Render loop ──
    let raf: number
    const t0 = performance.now()

    const tick = () => {
      // Velocity = delta of smoothed mouse position
      const dx = tx - prevX
      const dy = ty - prevY
      vx += (dx - vx) * 0.18
      vy += (dy - vy) * 0.18
      prevX += (tx - prevX) * 0.12
      prevY += (ty - prevY) * 0.12

      const speed = Math.sqrt(vx * vx + vy * vy)

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

      gl.uniform1f(uTime,      (performance.now() - t0) / 1000)
      gl.uniform2f(uVelocity,  vx, vy)
      gl.uniform1f(uSpeed,     speed)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      gl.deleteProgram(prog)
      gl.deleteTexture(tex)
      gl.deleteBuffer(buf)
    }
  }, [src])

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      role="img"
      style={{
        width: '100%',
        aspectRatio: '1364/1428',
        display: 'block',
        filter: 'contrast(1.08) saturate(0.82)',
        ...style,
      }}
    />
  )
}
