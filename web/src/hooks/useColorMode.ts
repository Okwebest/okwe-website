import { useCallback, useEffect, useState } from 'react'

export type ColorMode = 'light' | 'dark'

const STORAGE_KEY = 'okwe-mode'

function readInitialMode(): ColorMode {
  if (typeof window === 'undefined') return 'light'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // storage unavailable — fall through to the system preference
  }
  if (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }
  return 'light'
}

/**
 * The visitor's colour mode. Written to <html data-theme="dark"> so the
 * design-system tokens and the site's paper variables flip together; this is
 * the only place that attribute is set on the root element.
 */
export function useColorMode(): { mode: ColorMode; toggle: () => void } {
  const [mode, setMode] = useState<ColorMode>(readInitialMode)

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'dark') root.setAttribute('data-theme', 'dark')
    else root.removeAttribute('data-theme')
  }, [mode])

  const toggle = useCallback(() => {
    setMode((current) => {
      const next: ColorMode = current === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // storage unavailable — the choice lasts for this session only
      }
      return next
    })
  }, [])

  return { mode, toggle }
}
