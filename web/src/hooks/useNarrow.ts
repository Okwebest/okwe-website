import { useMediaQuery } from './useMediaQuery'

/** The design's single breakpoint: viewports under 860px are "narrow". */
export function useNarrow(): boolean {
  const initial =
    typeof window !== 'undefined' ? window.innerWidth < 860 : false
  return useMediaQuery('(max-width: 859px)', initial)
}
