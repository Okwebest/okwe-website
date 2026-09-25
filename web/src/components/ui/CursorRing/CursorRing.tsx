import { useEffect, useRef } from 'react'

import { siteConfig } from 'src/content/site'
import { useReducedMotion } from 'src/hooks/useReducedMotion'

const HOVER_TARGETS = 'a,button,[data-hover],input,select,textarea,label'

/**
 * The design's custom cursor: a 28px difference-blend ring that lerps after
 * the pointer and grows to 52px over interactive elements. Fine pointers only.
 */
const CursorRing = () => {
  const ringRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!siteConfig.customCursor) return
    if (typeof window.matchMedia !== 'function') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const ring = ringRef.current
    if (!ring) return

    let mx = -100
    let my = -100
    let rx = -100
    let ry = -100
    let moved = false
    let hovering = false
    let size = 0
    let raf = 0

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      moved = true
      const target = e.target as Element | null
      hovering = !!(target && target.closest && target.closest(HOVER_TARGETS))
    }

    const frame = () => {
      raf = window.requestAnimationFrame(frame)
      if (!moved) {
        ring.style.opacity = '0'
        return
      }
      const k = reducedMotion ? 1 : 0.2
      rx += (mx - rx) * k
      ry += (my - ry) * k
      ring.style.opacity = '1'
      ring.style.transform = `translate(${rx.toFixed(1)}px, ${ry.toFixed(1)}px)`
      const next = hovering ? 52 : 28
      if (size !== next) {
        size = next
        ring.style.width = ring.style.height = `${size}px`
        ring.style.margin = `${-size / 2}px 0 0 ${-size / 2}px`
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = window.requestAnimationFrame(frame)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  if (!siteConfig.customCursor) return null

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] h-[28px] w-[28px] rounded-full border border-solid border-[#FBFAF6] opacity-0"
      style={{
        margin: '-14px 0 0 -14px',
        mixBlendMode: 'difference',
        transition:
          'width 180ms cubic-bezier(.2,0,.2,1),height 180ms cubic-bezier(.2,0,.2,1),margin 180ms cubic-bezier(.2,0,.2,1),opacity 180ms',
      }}
    />
  )
}

export default CursorRing
