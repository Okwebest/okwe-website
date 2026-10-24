import { CHORDS, NODES } from '@/lib/routes'

type HubDiagramProps = {
  /** Index 0–5 of the hovered coverage label, or -1. */
  active: number
}

const spokeWindows = [
  '0.1 0.35',
  '0.14 0.39',
  '0.18 0.43',
  '0.22 0.47',
  '0.26 0.51',
  '0.3 0.55',
]

/**
 * The Coms chapter's hub-and-spoke diagram: six nodes around Okwe Coms,
 * spokes drawn on scroll, and every chord between nodes lit when either end
 * is hovered.
 */
const HubDiagram = ({ active }: HubDiagramProps) => (
  <svg
    viewBox="0 0 600 600"
    className="absolute inset-0 h-full w-full overflow-visible"
  >
    <circle
      cx="300"
      cy="300"
      r="220"
      fill="none"
      stroke="var(--on-paper,#0A1014)"
      strokeOpacity=".1"
      strokeDasharray="2 6"
    />
    {CHORDS.map(([i, j]) => (
      <line
        key={`${i}-${j}`}
        x1={NODES[i][0]}
        y1={NODES[i][1]}
        x2={NODES[j][0]}
        y2={NODES[j][1]}
        stroke="var(--acc-c2,#A87C1F)"
        strokeWidth="1.2"
        style={{
          opacity: active === i || active === j ? 1 : 0,
          transition: 'opacity 260ms cubic-bezier(.2,0,.2,1)',
        }}
      />
    ))}
    {NODES.map(([x, y], k) => (
      <line
        key={`spoke${k}`}
        data-a={spokeWindows[k]}
        data-draw=""
        pathLength={1}
        strokeDasharray="1"
        x1="300"
        y1="300"
        x2={x}
        y2={y}
        stroke="var(--on-paper,#0A1014)"
        strokeWidth="1"
        style={{ strokeDashoffset: 1 }}
      />
    ))}
    {NODES.map(([x, y], k) => (
      <circle
        key={`node${k}`}
        cx={x}
        cy={y}
        r="8"
        fill={active === k ? 'var(--brass-500)' : 'var(--paper-hi,#FBFAF6)'}
        stroke="var(--on-paper,#0A1014)"
        strokeWidth="1.2"
        style={{ transition: 'fill 180ms' }}
      />
    ))}
    <circle cx="300" cy="300" r="34" fill="var(--on-paper,#0A1014)" />
  </svg>
)

export default HubDiagram
