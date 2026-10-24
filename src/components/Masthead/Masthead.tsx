'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef, Fragment, useEffect, useState } from 'react'

import Button from '@/components/ui/Button/Button'
import OkweRow from '@/components/ui/OkweRow/OkweRow'
import { brand, nav } from '@/content/site'
import type { ColorMode } from '@/hooks/useColorMode'

type MastheadProps = {
  mode: ColorMode
  onToggleMode: () => void
  narrow: boolean
}

const control =
  'flex h-[32px] flex-none cursor-pointer items-center gap-[8px] rounded-[2px] border border-current bg-transparent px-[10px] font-mono text-[11px] tracking-label text-inherit uppercase'

/**
 * The fixed masthead. Its background, text colour, border colour, `data-theme`
 * and active nav item are painted by the scroll engine per section tone; the
 * ink values here are the resting state.
 *
 * On narrow screens the inline nav (which would clip) becomes a Menu button
 * and a panel under the bar. The panel is "open" only for the path it was
 * opened on, so navigating closes it without an effect.
 */
const Masthead = forwardRef<HTMLElement, MastheadProps>(
  ({ mode, onToggleMode, narrow }, ref) => {
    const pathname = usePathname()
    const [openOn, setOpenOn] = useState<string | null>(null)
    const open = narrow && openOn === pathname

    useEffect(() => {
      if (!open) return
      const onKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') setOpenOn(null)
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }, [open])

    const navLink = (item: (typeof nav)[number], className: string) => (
      <Link
        key={item.key}
        href={item.href}
        data-navitem={item.key}
        onClick={() => setOpenOn(null)}
        className={className}
        style={{ transition: 'opacity 180ms' }}
      >
        <i
          className="block h-[7px] w-[7px] flex-none rounded-full"
          style={{
            boxShadow: 'inset 0 0 0 1px currentColor',
            transition: 'background 180ms',
          }}
        />
        {item.label}
      </Link>
    )

    return (
      <header
        ref={ref}
        data-theme="dark"
        className="fixed top-0 right-0 left-0 z-50 flex h-[60px] items-center bg-ink-900 px-gutter text-bone-50"
        style={{
          gap: 'clamp(12px,2.5vw,32px)',
          borderBottom: '1px solid rgba(251,250,246,.14)',
          transition:
            'background 420ms cubic-bezier(.2,0,.2,1),color 420ms cubic-bezier(.2,0,.2,1),border-color 420ms cubic-bezier(.2,0,.2,1)',
        }}
      >
        <Link
          href="/#top"
          aria-label="Okwe home"
          onClick={() => setOpenOn(null)}
          className="flex flex-none items-center gap-[12px] border-0 text-inherit hover:text-inherit"
        >
          <OkweRow />
          <span className="font-sans text-[18px] font-bold tracking-[.05em]">
            {brand.wordmark}
          </span>
        </Link>

        {narrow ? (
          <span className="flex-1" />
        ) : (
          <nav
            className="flex h-[20px] min-w-0 flex-1 flex-wrap items-center justify-center overflow-hidden"
            style={{ gap: '0 14px' }}
          >
            {nav.map((item, i) => (
              <Fragment key={item.key}>
                {i > 0 && (
                  <span className="h-px w-[18px] bg-current opacity-30" />
                )}
                {navLink(
                  item,
                  'flex h-[20px] items-center gap-[8px] border-0 font-mono text-[11px] tracking-label text-inherit uppercase opacity-60 hover:text-inherit'
                )}
              </Fragment>
            ))}
          </nav>
        )}

        <button
          type="button"
          onClick={onToggleMode}
          aria-label="Switch between light and dark mode"
          className={control}
        >
          <i
            className="block h-[10px] w-[10px] rounded-full"
            style={{
              boxShadow: 'inset 0 0 0 1px currentColor',
              background: mode === 'dark' ? 'currentColor' : 'transparent',
            }}
          />
          {mode === 'dark' ? 'Dark' : 'Light'}
        </button>

        {narrow ? (
          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="okwe-menu"
            className={control}
          >
            <span
              aria-hidden="true"
              className="flex w-[14px] flex-col gap-[3px]"
            >
              <i className="block h-px w-full bg-current" />
              <i className="block h-px w-full bg-current" />
              <i className="block h-px w-full bg-current" />
            </span>
            {open ? 'Close' : 'Menu'}
          </button>
        ) : (
          <Button variant="primary" size="sm" href="/#contact">
            {brand.requestQuote}
          </Button>
        )}

        {open && (
          <nav
            id="okwe-menu"
            aria-label="Site menu"
            className="absolute top-full right-0 left-0 flex flex-col gap-[4px] px-gutter pt-[12px] pb-[20px]"
            style={{
              background: 'inherit',
              color: 'inherit',
              borderBottom: '1px solid rgba(127,127,127,.35)',
              boxShadow: '0 24px 40px -24px rgba(0,0,0,.45)',
            }}
          >
            {nav.map((item) =>
              navLink(
                item,
                'flex min-h-[44px] items-center gap-[12px] border-0 border-b border-current/15 font-mono text-[12px] tracking-label text-inherit uppercase opacity-70 hover:text-inherit'
              )
            )}
            <Button
              variant="primary"
              size="md"
              href="/#contact"
              fullWidth
              className="mt-[14px]"
              onClick={() => setOpenOn(null)}
            >
              {brand.requestQuote}
            </Button>
          </nav>
        )}

        <span
          className="absolute bottom-[-1px] left-0 h-[2px] bg-current opacity-90"
          style={{ width: 'calc(var(--pg,0) * 100%)' }}
        />
      </header>
    )
  }
)

Masthead.displayName = 'Masthead'

export default Masthead
