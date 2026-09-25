import {
  CHORDS,
  GRID_H,
  GRID_V,
  NODES,
  ORIGIN,
  ROUTES,
  coord,
  project,
} from './routes'

describe('routes geometry', () => {
  it('projects Lagos into the viewBox', () => {
    expect(ORIGIN[0]).toBeCloseTo((3.384 + 110) * 6)
    expect(ORIGIN[1]).toBeCloseTo((65 - 6.455) * 6)
    expect(project(0, 0)).toEqual([660, 390])
  })

  it('formats coordinates as DMS with padded degrees', () => {
    expect(coord(6.455, 3.384)).toBe('06°27′N 003°23′E')
    expect(coord(-23.55, -46.633)).toBe('23°33′S 046°38′W')
  })

  it('builds one route per city with staggered windows', () => {
    expect(ROUTES).toHaveLength(11)
    expect(ROUTES[0].name).toBe('ACCRA')
    expect(ROUTES[0].a).toBe('0.060 0.260')
    expect(ROUTES[0].ca).toBe('0.210 0.260')
    expect(ROUTES[0].ain).toBe('0.050 0.400')
    expect(ROUTES[0].at).toBeCloseTo(0.26)
    expect(ROUTES[1].c).toBe('#E0BE72')
    expect(ROUTES[0].d.startsWith('M')).toBe(true)
    expect(
      ROUTES[0].din.endsWith(`${ORIGIN[0].toFixed(1)} ${ORIGIN[1].toFixed(1)}`)
    ).toBe(true)
  })

  it('lays out the graticule', () => {
    expect(GRID_V).toHaveLength(18)
    expect(GRID_H).toHaveLength(8)
    expect(GRID_H.find((g) => g.label === '0° EQUATOR')?.o).toBe(0.18)
  })

  it('has six hub nodes and fifteen chords', () => {
    expect(NODES).toHaveLength(6)
    expect(CHORDS).toHaveLength(15)
  })
})
