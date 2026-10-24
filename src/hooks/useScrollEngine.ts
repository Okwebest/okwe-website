import { useEffect, useRef } from 'react'

import { usePathname } from 'next/navigation'

import { ROUTES } from '@/lib/routes'
import { elementT, sceneProgress, toneStyle } from '@/lib/scroll'

import type { ColorMode } from './useColorMode'

type Options = {
  rootRef: React.RefObject<HTMLElement | null>
  mastRef: React.RefObject<HTMLElement | null>
  mode: ColorMode
  narrow: boolean
}

/**
 * The design's scroll `tick()`: one rAF-throttled pass on scroll/resize that
 * writes `--p` to every scene, `--t` to every animated element, the hero
 * readout, the masthead progress/tone/active nav. Everything is read from and
 * written to the DOM through data attributes, so sections stay plain markup.
 */
export function useScrollEngine({ rootRef, mastRef, mode, narrow }: Options) {
  const pathname = usePathname()
  const cache = useRef<{ tone: string | null; nav: string | null | undefined }>(
    {
      tone: null,
      nav: undefined,
    }
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    // A mode or breakpoint change keeps the same tone/nav names but changes
    // what they should paint, so forget what was last written.
    cache.current = { tone: null, nav: undefined }

    const tick = () => {
      const vh = window.innerHeight
      const progress = new Map<Element, number>()

      root.querySelectorAll<HTMLElement>('[data-scene]').forEach((el) => {
        const p = sceneProgress(
          el.dataset.scene,
          el.getBoundingClientRect(),
          vh
        )
        progress.set(el, p)
        el.style.setProperty('--p', p.toFixed(4))
      })

      root
        .querySelectorAll<HTMLElement | SVGElement>('[data-a]')
        .forEach((el) => {
          const scene = el.closest('[data-scene]')
          const p =
            scene && progress.has(scene) ? (progress.get(scene) as number) : 1
          const t = elementT(p, el.getAttribute('data-a') || '0 1')
          el.style.setProperty('--t', t.toFixed(4))
          if (el.hasAttribute('data-draw')) {
            el.style.strokeDashoffset = (1 - t).toFixed(4)
          }
        })

      const hero = root.querySelector('[data-scene="sticky"]')
      const readout = root.querySelector('[data-readout]')
      if (hero && readout) {
        const p = progress.get(hero) || 0
        let last: (typeof ROUTES)[number] | null = null
        ROUTES.forEach((r) => {
          if (p >= r.at) last = r
        })
        const text = last
          ? 'Route → ' + (last as (typeof ROUTES)[number]).label
          : 'Origin'
        if (readout.textContent !== text) readout.textContent = text
      }

      const mast = mastRef.current
      if (!mast) return
      const doc = document.documentElement
      mast.style.setProperty(
        '--pg',
        (window.scrollY / Math.max(1, doc.scrollHeight - vh)).toFixed(4)
      )

      let tone = 'ink'
      let nav: string | null = null
      root.querySelectorAll<HTMLElement>('[data-tone]').forEach((el) => {
        if (el === mast) return
        const r = el.getBoundingClientRect()
        if (r.top <= 30 && r.bottom > 30) tone = el.dataset.tone || 'ink'
      })
      root.querySelectorAll<HTMLElement>('[data-nav]').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top <= vh * 0.4 && r.bottom > vh * 0.4)
          nav = el.dataset.nav || null
      })

      if (tone !== cache.current.tone) {
        cache.current.tone = tone
        const style = toneStyle(tone, mode)
        mast.style.background = style.bg
        mast.style.color = style.fg
        mast.style.borderBottomColor = style.border
        if (style.theme) mast.setAttribute('data-theme', style.theme)
        else mast.removeAttribute('data-theme')
      }

      if (nav !== cache.current.nav) {
        cache.current.nav = nav
        mast.querySelectorAll<HTMLElement>('[data-navitem]').forEach((item) => {
          const on = item.dataset.navitem === nav
          item.style.opacity = on ? '1' : '.6'
          const dot = item.querySelector<HTMLElement>('i')
          if (dot) dot.style.background = on ? 'currentColor' : 'transparent'
        })
      }
    }

    let queued = 0
    const schedule = () => {
      if (!queued) {
        queued = window.requestAnimationFrame(() => {
          queued = 0
          tick()
        })
      }
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    // Pages are code-split, so their sections mount after this effect runs;
    // re-measure when nodes are added or removed and whenever the document
    // changes height (fonts, images, an accordion opening). Neither observer
    // reacts to the style attributes this tick writes.
    const mutations = new MutationObserver(schedule)
    mutations.observe(root, { childList: true, subtree: true })
    const resizes =
      typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : null
    resizes?.observe(root)

    tick()

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      mutations.disconnect()
      resizes?.disconnect()
      if (queued) window.cancelAnimationFrame(queued)
    }
  }, [rootRef, mastRef, mode, narrow, pathname])
}
