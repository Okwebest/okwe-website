import { useEffect, useState } from 'react'

/**
 * Tracks a media query. Safe in jsdom (no matchMedia) — it then keeps the
 * initial value.
 */
export function useMediaQuery(query: string, initial: boolean): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return initial
    }
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])

  return matches
}
