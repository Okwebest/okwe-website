import { useCallback, useSyncExternalStore } from 'react'

const noop = () => {}

/**
 * Tracks a media query. Server-safe: the server render and the first client
 * render both use `initial`, then the real value applies after hydration.
 * Safe in jsdom (no matchMedia) — it then keeps the initial value.
 */
export function useMediaQuery(query: string, initial: boolean): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (
        typeof window === 'undefined' ||
        typeof window.matchMedia !== 'function'
      ) {
        return noop
      }
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    [query]
  )

  const getSnapshot = useCallback(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return initial
    }
    return window.matchMedia(query).matches
  }, [query, initial])

  const getServerSnapshot = useCallback(() => initial, [initial])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
