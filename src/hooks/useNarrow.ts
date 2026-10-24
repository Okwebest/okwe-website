import { useMediaQuery } from './useMediaQuery'

/**
 * The design's single breakpoint: viewports under 860px are "narrow". The
 * server (and first client paint) assume wide; narrow devices re-render
 * right after hydration.
 */
export function useNarrow(): boolean {
  return useMediaQuery('(max-width: 859px)', false)
}
