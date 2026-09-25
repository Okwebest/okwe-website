import { clamp01, ease, elementT, sceneProgress, toneStyle } from './scroll'

describe('clamp01 / ease', () => {
  it('clamps into 0..1', () => {
    expect(clamp01(-1)).toBe(0)
    expect(clamp01(2)).toBe(1)
    expect(clamp01(0.25)).toBe(0.25)
  })
  it('eases with smoothstep', () => {
    expect(ease(0)).toBe(0)
    expect(ease(1)).toBe(1)
    expect(ease(0.5)).toBe(0.5)
  })
})

describe('sceneProgress', () => {
  const vh = 1000
  it('sticky: 0 at the top, 1 when the last viewport is pinned', () => {
    expect(sceneProgress('sticky', { top: 0, height: 2500 }, vh)).toBe(0)
    expect(sceneProgress('sticky', { top: -1500, height: 2500 }, vh)).toBe(1)
    expect(
      sceneProgress('sticky', { top: -750, height: 2500 }, vh)
    ).toBeCloseTo(0.5)
  })
  it('sticky with no travel stays at 0', () => {
    expect(sceneProgress('sticky', { top: 0, height: 800 }, vh)).toBe(0)
  })
  it('pass: 0 when entering from below, 1 when fully passed', () => {
    expect(sceneProgress('pass', { top: 1000, height: 400 }, vh)).toBe(0)
    expect(sceneProgress('pass', { top: -400, height: 400 }, vh)).toBe(1)
  })
  it('reveal: completes at 85% of the viewport', () => {
    expect(sceneProgress('reveal', { top: 1000, height: 300 }, vh)).toBe(0)
    expect(sceneProgress(undefined, { top: 150, height: 300 }, vh)).toBe(1)
    expect(sceneProgress('reveal', { top: 575, height: 300 }, vh)).toBeCloseTo(
      0.5
    )
  })
})

describe('elementT', () => {
  it('is 0 before the window and 1 after it', () => {
    expect(elementT(0.1, '0.2 0.6')).toBe(0)
    expect(elementT(0.9, '0.2 0.6')).toBe(1)
  })
  it('eases through the window', () => {
    expect(elementT(0.4, '0.2 0.6')).toBeCloseTo(0.5)
  })
})

describe('toneStyle', () => {
  it('returns the masthead colours for a tone', () => {
    expect(toneStyle('move', 'light')).toMatchObject({
      bg: '#B3391F',
      theme: 'dark',
    })
    expect(toneStyle('bone', 'light')).toMatchObject({
      bg: '#F4F1EA',
      theme: '',
    })
  })
  it('renders bone as ink-800 in dark mode', () => {
    expect(toneStyle('bone', 'dark')).toMatchObject({
      bg: '#101A21',
      theme: 'dark',
    })
  })
  it('falls back to ink', () => {
    expect(toneStyle('unknown', 'light')).toEqual(toneStyle('ink', 'light'))
  })
})
