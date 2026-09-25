import { forwardRef, Fragment } from 'react'

import Button from 'src/components/ui/Button/Button'
import OkweRow from 'src/components/ui/OkweRow/OkweRow'
import { brand, nav } from 'src/content/site'
import type { ColorMode } from 'src/hooks/useColorMode'

type MastheadProps = {
  mode: ColorMode
  onToggleMode: () => void
  narrow: boolean
}

/**
 * The fixed masthead. Its background, text colour, border colour, `data-theme`
 * and active nav item are painted by the scroll engine per section tone; the
 * ink values here are the resting state.
 */
const Masthead = forwardRef<HTMLElement, MastheadProps>(
  ({ mode, onToggleMode, narrow }, ref) => (
    <header
      ref={ref}
      data-theme="dark"
      className="fixed left-0 right-0 top-0 z-50 flex h-[60px] items-center bg-ink-900 px-gutter text-bone-50"
      style={{
        gap: 'clamp(12px,2.5vw,32px)',
        borderBottom: '1px solid rgba(251,250,246,.14)',
        transition:
          'background 420ms cubic-bezier(.2,0,.2,1),color 420ms cubic-bezier(.2,0,.2,1),border-color 420ms cubic-bezier(.2,0,.2,1)',
      }}
    >
      <a
        href="/#top"
        aria-label="Okwe home"
        className="flex flex-none items-center gap-[12px] border-0 text-inherit hover:text-inherit"
      >
        <OkweRow />
        <span className="font-sans text-[18px] font-bold tracking-[.05em]">
          {brand.wordmark}
        </span>
      </a>

      <nav
        className="flex h-[20px] min-w-0 flex-1 flex-wrap items-center justify-center overflow-hidden"
        style={{ gap: '0 14px' }}
      >
        {nav.map((item, i) => (
          <Fragment key={item.key}>
            {i > 0 && <span className="h-px w-[18px] bg-current opacity-30" />}
            <a
              href={item.href}
              data-navitem={item.key}
              className="flex h-[20px] items-center gap-[8px] border-0 font-mono text-[11px] uppercase tracking-label text-inherit opacity-60 hover:text-inherit"
              style={{ transition: 'opacity 180ms' }}
            >
              <i
                className="block h-[7px] w-[7px] rounded-full"
                style={{
                  boxShadow: 'inset 0 0 0 1px currentColor',
                  transition: 'background 180ms',
                }}
              />
              {item.label}
            </a>
          </Fragment>
        ))}
      </nav>

      <button
        type="button"
        onClick={onToggleMode}
        aria-label="Switch between light and dark mode"
        className="flex h-[32px] flex-none cursor-pointer items-center gap-[8px] rounded-[2px] border border-current bg-transparent px-[10px] font-mono text-[11px] uppercase tracking-label text-inherit"
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

      {!narrow && (
        <Button variant="primary" size="sm" href="/#contact">
          {brand.requestQuote}
        </Button>
      )}

      <span
        className="absolute bottom-[-1px] left-0 h-[2px] bg-current opacity-90"
        style={{ width: 'calc(var(--pg,0) * 100%)' }}
      />
    </header>
  )
)

Masthead.displayName = 'Masthead'

export default Masthead
