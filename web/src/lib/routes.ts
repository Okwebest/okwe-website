/**
 * Geometry for the hero and CTA route maps and the Coms hub diagram,
 * ported from the design's script (CITIES, P, ROUTES, GRID_V, GRID_H,
 * NODES, CHORDS). Coordinates live in a 1560×660 SVG viewBox.
 */

export const CITIES: [string, number, number][] = [
  ['Accra', 5.603, -0.187],
  ['Dakar', 14.716, -17.467],
  ['Casablanca', 33.573, -7.589],
  ['Rotterdam', 51.924, 4.477],
  ['Nairobi', -1.286, 36.817],
  ['Johannesburg', -26.204, 28.047],
  ['Dubai', 25.204, 55.27],
  ['Mumbai', 19.076, 72.877],
  ['Guangzhou', 23.129, 113.264],
  ['São Paulo', -23.55, -46.633],
  ['New York', 40.713, -74.006],
]

/** Equirectangular projection into the map viewBox. */
export const project = (lat: number, lon: number): [number, number] => [
  (lon + 110) * 6,
  (65 - lat) * 6,
]

const dms = (v: number, pos: string, neg: string, pad: number): string => {
  const a = Math.abs(v)
  const d = Math.floor(a)
  const m = Math.round((a - d) * 60)
  return (
    String(d).padStart(pad, '0') +
    '°' +
    String(m).padStart(2, '0') +
    '′' +
    (v >= 0 ? pos : neg)
  )
}

export const coord = (lat: number, lon: number): string =>
  dms(lat, 'N', 'S', 2) + ' ' + dms(lon, 'E', 'W', 3)

/** Lagos, the origin of every route. */
export const ORIGIN = project(6.455, 3.384)

export const ROUTE_COLORS = ['#6FB0AB', '#E0BE72', '#DE6A4F']

export type Route = {
  name: string
  coord: string
  x: string
  y: string
  lx: string
  ly: string
  ly2: string
  /** Path from the origin out to the city (hero). */
  d: string
  /** Path from the city back into the origin (CTA). */
  din: string
  /** Draw window for the hero path. */
  a: string
  /** Reveal window for the hero city marker. */
  ca: string
  /** Draw window for the CTA path. */
  ain: string
  c: string
  /** Progress at which this route has finished drawing (hero readout). */
  at: number
  label: string
}

const f = (n: number) => n.toFixed(1)

export const ROUTES: Route[] = CITIES.map(([name, lat, lon], k) => {
  const [x, y] = project(lat, lon)
  const mx = (ORIGIN[0] + x) / 2
  const my = (ORIGIN[1] + y) / 2
  const dx = x - ORIGIN[0]
  const dy = y - ORIGIN[1]
  const L = Math.hypot(dx, dy)
  let nx = -dy / L
  let ny = dx / L
  if (ny > 0) {
    nx = -nx
    ny = -ny
  }
  const cx = mx + nx * L * 0.22
  const cy = my + ny * L * 0.22
  const a = 0.06 + k * 0.045
  const right = x < 1400
  return {
    name: name.toUpperCase(),
    coord: coord(lat, lon),
    x: f(x),
    y: f(y),
    lx: f(right ? x + 9 : x - 90),
    ly: f(y - 8),
    ly2: f(y + 4),
    d: `M${f(ORIGIN[0])} ${f(ORIGIN[1])} Q${f(cx)} ${f(cy)} ${f(x)} ${f(y)}`,
    din: `M${f(x)} ${f(y)} Q${f(cx)} ${f(cy)} ${f(ORIGIN[0])} ${f(ORIGIN[1])}`,
    a: `${a.toFixed(3)} ${(a + 0.2).toFixed(3)}`,
    ca: `${(a + 0.15).toFixed(3)} ${(a + 0.2).toFixed(3)}`,
    ain: `${(0.05 + k * 0.03).toFixed(3)} ${(0.4 + k * 0.03).toFixed(3)}`,
    c: ROUTE_COLORS[k % 3],
    at: a + 0.2,
    label: name + ' · ' + coord(lat, lon),
  }
})

export type GridLineV = { x: string; o: number }
export type GridLineH = {
  y: string
  o: number
  lx: string
  ly: string
  label: string
}

export const GRID_V: GridLineV[] = []
for (let lon = -105; lon <= 150; lon += 15) {
  GRID_V.push({ x: ((lon + 110) * 6).toFixed(1), o: lon === 0 ? 0.16 : 0.07 })
}

export const GRID_H: GridLineH[] = []
for (let lat = 60; lat >= -45; lat -= 15) {
  GRID_H.push({
    y: ((65 - lat) * 6).toFixed(1),
    o: lat === 0 ? 0.18 : 0.07,
    lx: '8',
    ly: ((65 - lat) * 6 - 5).toFixed(1),
    label:
      lat === 0 ? '0° EQUATOR' : Math.abs(lat) + '°' + (lat > 0 ? 'N' : 'S'),
  })
}

/** Coms hub: six nodes on a 600×600 canvas, radius 220 around (300,300). */
export const NODES: [number, number][] = [
  [300, 80],
  [490.5, 190],
  [490.5, 410],
  [300, 520],
  [109.5, 410],
  [109.5, 190],
]

/** Every pair of nodes; a chord lights up when either end is hovered. */
export const CHORDS: [number, number][] = []
for (let i = 0; i < 6; i++) {
  for (let j = i + 1; j < 6; j++) CHORDS.push([i, j])
}
