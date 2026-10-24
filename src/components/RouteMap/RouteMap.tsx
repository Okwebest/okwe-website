'use client'

import { useEffect, useRef } from 'react'

import { siteConfig } from '@/content/site'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { GRID_H, GRID_V, ORIGIN, ROUTES } from '@/lib/routes'

type RouteMapProps = {
  /** `hero` draws routes out from Lagos; `converge` draws them back in. */
  variant: 'hero' | 'converge'
}

const monoLabel = { fontFamily: 'var(--font-mono)' } as const
const ox = ORIGIN[0].toFixed(1)
const oy = ORIGIN[1].toFixed(1)

/**
 * The trade-route map behind the hero and the closing CTA. Paths carry
 * `data-a` + `data-draw` so the scroll engine draws them; the origin pulse
 * is the one ambient animation, run here.
 */
const RouteMap = ({ variant }: RouteMapProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const svg = svgRef.current
    const pulse = svg?.querySelector<SVGCircleElement>('[data-pulse]')
    if (!svg || !pulse) return
    const ambient = siteConfig.ambientMotion && !reducedMotion
    const paint = (f: number) => {
      pulse.setAttribute('r', (6 + f * 22).toFixed(2))
      pulse.style.opacity = (1 - f).toFixed(3)
    }
    if (!ambient) {
      paint(0.3)
      return
    }
    let raf = 0
    const frame = (ts: number) => {
      raf = window.requestAnimationFrame(frame)
      const r = svg.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return
      paint((ts / 1000 / 2.4) % 1)
    }
    raf = window.requestAnimationFrame(frame)
    return () => window.cancelAnimationFrame(raf)
  }, [reducedMotion])

  if (variant === 'converge') {
    return (
      <svg
        ref={svgRef}
        viewBox="0 0 1560 660"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[.55]"
      >
        {ROUTES.map((r) => (
          <path
            key={r.name}
            d={r.din}
            data-a={r.ain}
            data-draw=""
            pathLength={1}
            fill="none"
            stroke="#FBFAF6"
            strokeOpacity=".6"
            strokeWidth="1"
            strokeDasharray="1"
            vectorEffect="non-scaling-stroke"
            style={{ strokeDashoffset: 1 }}
          />
        ))}
        {ROUTES.map((r) => (
          <circle
            key={r.name}
            cx={r.x}
            cy={r.y}
            r="3"
            fill="#FBFAF6"
            fillOpacity=".7"
          />
        ))}
        <circle cx={ox} cy={oy} r="6" fill="#DE6A4F" />
      </svg>
    )
  }

  const showLabels = siteConfig.mapLabels

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1560 660"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      style={{
        opacity: 'calc(.45 + var(--p,0) * .55)',
        transform: 'scale(calc(1.08 - var(--p,0) * .08))',
        transformOrigin: '44% 53%',
      }}
    >
      {GRID_V.map((g) => (
        <line
          key={`v${g.x}`}
          x1={g.x}
          y1="0"
          x2={g.x}
          y2="660"
          stroke="#FBFAF6"
          strokeOpacity={g.o}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {GRID_H.map((g) => (
        <line
          key={`h${g.y}`}
          x1="0"
          y1={g.y}
          x2="1560"
          y2={g.y}
          stroke="#FBFAF6"
          strokeOpacity={g.o}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {showLabels &&
        GRID_H.map((g) => (
          <text
            key={`l${g.y}`}
            x={g.lx}
            y={g.ly}
            fill="#FBFAF6"
            fillOpacity=".38"
            style={{ ...monoLabel, fontSize: '9px', letterSpacing: '.08em' }}
          >
            {g.label}
          </text>
        ))}
      {ROUTES.map((r) => (
        <path
          key={`p${r.name}`}
          d={r.d}
          data-a={r.a}
          data-draw=""
          pathLength={1}
          fill="none"
          stroke={r.c}
          strokeWidth="1.4"
          strokeDasharray="1"
          vectorEffect="non-scaling-stroke"
          style={{ strokeDashoffset: 1 }}
        />
      ))}
      {ROUTES.map((r) => (
        <g key={`c${r.name}`} data-a={r.ca} style={{ opacity: 'var(--t,1)' }}>
          <circle
            cx={r.x}
            cy={r.y}
            r="3.5"
            fill="#0A1014"
            stroke="#FBFAF6"
            strokeWidth="1.2"
          />
          {showLabels && (
            <>
              <text
                x={r.lx}
                y={r.ly}
                fill="#FBFAF6"
                style={{
                  ...monoLabel,
                  fontSize: '10px',
                  letterSpacing: '.12em',
                }}
              >
                {r.name}
              </text>
              <text
                x={r.lx}
                y={r.ly2}
                fill="#FBFAF6"
                fillOpacity=".5"
                style={{
                  ...monoLabel,
                  fontSize: '8.5px',
                  letterSpacing: '.06em',
                }}
              >
                {r.coord}
              </text>
            </>
          )}
        </g>
      ))}
      <circle
        data-pulse=""
        cx={ox}
        cy={oy}
        r="8"
        fill="none"
        stroke="#DE6A4F"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={ox} cy={oy} r="5" fill="#DE6A4F" />
    </svg>
  )
}

export default RouteMap
