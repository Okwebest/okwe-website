import { useEffect, useRef } from 'react'

import { siteConfig } from 'src/content/site'
import { useReducedMotion } from 'src/hooks/useReducedMotion'

type DotFieldProps = {
  /** Index 0–5 of the hovered "What it covers" row, or -1. Lights an 8-column block. */
  active: number
}

const COLS = 48
const ROWS = 12

/**
 * The Knows chapter's data field: a 48×12 grid of dots with a slow sweep and
 * a few brighter "signal" dots. Hovering a coverage row lights its columns.
 */
const DotField = ({ active }: DotFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeRef = useRef(active)
  activeRef.current = active
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let ctx: CanvasRenderingContext2D | null = null
    try {
      ctx = canvas.getContext('2d')
    } catch {
      ctx = null
    }
    if (!ctx) return
    const g = ctx
    const ambient = siteConfig.ambientMotion && !reducedMotion

    let raf = 0
    const frame = (ts: number) => {
      raf = window.requestAnimationFrame(frame)
      const r = canvas.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight || r.width === 0) return

      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const W = Math.round(r.width * dpr)
      const H = Math.round(r.height * dpr)
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W
        canvas.height = H
      }
      g.clearRect(0, 0, W, H)

      const t = ambient ? ts / 1000 : 0
      const sx = W / COLS
      const oy = 30 * dpr
      const sy = (H - oy) / ROWS
      const sweep = ambient ? (((t * 0.1) % 1.3) - 0.15) * COLS : -99
      const hk = activeRef.current

      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const n = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453
          const h = n - Math.floor(n)
          const d = i - sweep
          let a = 0.1 + 0.45 * Math.exp((-d * d) / 5)
          const signal = h > 0.92
          if (signal) a += 0.3 * (0.5 + 0.5 * Math.sin(t * 1.6 + h * 40))
          let lit = false
          if (hk >= 0) {
            if (i >= hk * 8 && i < hk * 8 + 8) {
              a =
                0.35 +
                0.65 * (signal ? 1 : 0.55 + 0.45 * Math.sin(t * 3 + j + i))
              lit = true
            } else {
              a *= 0.45
            }
          }
          g.fillStyle = lit
            ? `rgba(111,176,171,${Math.min(1, a).toFixed(3)})`
            : `rgba(251,250,246,${Math.min(1, a * 0.75).toFixed(3)})`
          const s = (lit || signal ? 2.4 : 1.5) * dpr
          g.fillRect((i + 0.5) * sx - s / 2, oy + (j + 0.5) * sy - s / 2, s, s)
        }
      }
    }
    raf = window.requestAnimationFrame(frame)
    return () => window.cancelAnimationFrame(raf)
  }, [reducedMotion])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
  )
}

export default DotField
