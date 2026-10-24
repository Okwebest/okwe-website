import { useCallback, useEffect, useSyncExternalStore } from 'react'

export type ColorMode = 'light' | 'dark'

const COLOR_MODE_STORAGE_KEY = 'okwe-mode'

/** What /theme-init.js decided before paint, or the stored/system preference. */
function readInitialMode(): ColorMode {
  if (typeof document === 'undefined') return 'light'
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    return 'dark'
  }
  try {
    const stored = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY)
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

/*
 * One store for the whole page: the mode is a property of the document, not
 * of any component, and useSyncExternalStore lets the server render 'light'
 * while the client adopts the real value without a mismatch.
 */
let currentMode: ColorMode | null = null
const listeners = new Set<() => void>()

const getSnapshot = (): ColorMode => {
  if (currentMode === null) currentMode = readInitialMode()
  return currentMode
}
const getServerSnapshot = (): ColorMode => 'light'
const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function applyToDocument(mode: ColorMode) {
  const root = document.documentElement
  if (mode === 'dark') root.setAttribute('data-theme', 'dark')
  else root.removeAttribute('data-theme')
}

/**
 * The visitor's colour mode. Written to <html data-theme="dark"> so the
 * design-system tokens and the site's paper variables flip together; this and
 * public/theme-init.js (which runs before paint) are the only places that
 * attribute is set on the root element.
 */
export function useColorMode(): { mode: ColorMode; toggle: () => void } {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // Keep the document in step with the store (covers the case where the
  // pre-paint script did not run, e.g. it was blocked).
  useEffect(() => {
    applyToDocument(mode)
  }, [mode])

  const toggle = useCallback(() => {
    const next: ColorMode = getSnapshot() === 'dark' ? 'light' : 'dark'
    try {
      window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, next)
    } catch {
      // storage unavailable — the choice lasts for this page only
    }
    currentMode = next
    applyToDocument(next)
    listeners.forEach((listener) => listener())
  }, [])

  return { mode, toggle }
}
