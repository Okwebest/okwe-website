import { useEffect } from 'react'

import { useLocation } from '@redwoodjs/router'

/**
 * Honour `#anchor` on arrival. Pages are code-split, so when the browser
 * performs its own anchor jump on load the target section usually does not
 * exist yet; this waits for it to mount, then scrolls once.
 */
export function useHashScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    const jump = () => {
      const target = document.getElementById(id)
      if (!target) return false
      target.scrollIntoView()
      return true
    }
    if (jump()) return

    const observer = new MutationObserver(() => {
      if (jump()) observer.disconnect()
    })
    observer.observe(document.body, { childList: true, subtree: true })
    const giveUp = window.setTimeout(() => observer.disconnect(), 5000)
    return () => {
      observer.disconnect()
      window.clearTimeout(giveUp)
    }
  }, [pathname, hash])
}
