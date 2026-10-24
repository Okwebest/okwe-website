/**
 * Pure scroll-scene maths, ported from the design's `tick()`.
 *
 * A scene (`[data-scene]`) exposes its progress 0..1 as `--p`; an animated
 * element inside it (`[data-a="a b"]`) maps that progress through its own
 * window and an ease into `--t`.
 */

export type SceneMode = 'sticky' | 'pass' | 'reveal'

export const clamp01 = (v: number): number => (v <= 0 ? 0 : v >= 1 ? 1 : v)

/** Smoothstep. */
export const ease = (t: number): number => t * t * (3 - 2 * t)

export type Rect = { top: number; height: number }

export function sceneProgress(
  mode: string | undefined,
  rect: Rect,
  vh: number
): number {
  let p: number
  if (mode === 'sticky') {
    const total = rect.height - vh
    p = total > 0 ? -rect.top / total : 0
  } else if (mode === 'pass') {
    p = (vh - rect.top) / (vh + rect.height)
  } else {
    p = (vh - rect.top) / (vh * 0.85)
  }
  return clamp01(p)
}

/** `window` is the `data-a` value: two numbers "a b" in scene progress. */
export function elementT(p: number, window: string): number {
  const [a, b] = window.split(' ').map(Number)
  return ease(clamp01((p - a) / (b - a)))
}

export type Tone = 'ink' | 'bone' | 'move' | 'lagoon'

export type ToneStyle = {
  bg: string
  fg: string
  border: string
  theme: 'dark' | ''
}

const TONES: Record<Tone, ToneStyle> = {
  ink: {
    bg: '#0A1014',
    fg: '#FBFAF6',
    border: 'rgba(251,250,246,.14)',
    theme: 'dark',
  },
  bone: { bg: '#F4F1EA', fg: '#0A1014', border: '#D9D2C4', theme: '' },
  move: {
    bg: '#B3391F',
    fg: '#FBFAF6',
    border: 'rgba(251,250,246,.3)',
    theme: 'dark',
  },
  lagoon: {
    bg: '#125B58',
    fg: '#FBFAF6',
    border: 'rgba(251,250,246,.3)',
    theme: 'dark',
  },
}

const BONE_IN_DARK_MODE: ToneStyle = {
  bg: '#101A21',
  fg: '#FBFAF6',
  border: 'rgba(251,250,246,.14)',
  theme: 'dark',
}

/** Masthead colours for the tone currently under it. Unknown tones read as ink. */
export function toneStyle(tone: string, mode: 'light' | 'dark'): ToneStyle {
  if (tone === 'bone' && mode === 'dark') return BONE_IN_DARK_MODE
  return TONES[tone as Tone] ?? TONES.ink
}
