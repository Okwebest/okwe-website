'use client'

import RouteMap from '@/components/RouteMap/RouteMap'
import Button from '@/components/ui/Button/Button'
import Eyebrow from '@/components/ui/Eyebrow/Eyebrow'
import { brand, hero } from '@/content/site'
import { useClock } from '@/hooks/useClock'
import { useNarrow } from '@/hooks/useNarrow'

const emColors = ['text-lagoon-300', 'text-brass-300', 'text-persimmon-400']
const indents = ['', 'pl-[.9em]', 'pl-[1.8em]']

/** Hero: a pinned 250vh scene over the trade-route map. */
const HeroSection = () => {
  const narrow = useNarrow()
  const clock = useClock()

  return (
    <section
      data-scene="sticky"
      data-tone="ink"
      data-theme="dark"
      className="relative h-[250vh] bg-ink-900 text-bone-50"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <RouteMap variant="hero" />

        {!narrow && (
          <div className="absolute top-[92px] right-gutter flex flex-col gap-[6px] text-right font-mono text-[11px] tracking-label text-ink-200 uppercase">
            <span className="text-bone-50">
              {brand.location} · {brand.coordinates}
            </span>
            <span>
              {brand.timezone} <span data-clock="">{clock}</span>
            </span>
            <span data-readout="" className="text-persimmon-400">
              {hero.readoutOrigin}
            </span>
          </div>
        )}

        <div
          className="absolute top-0 right-gutter bottom-[64px] left-gutter flex flex-col justify-center overflow-hidden pt-[60px]"
          style={{
            transform: 'translateY(calc(var(--p,0) * -14vh))',
            opacity: 'calc(1 - var(--p,0) * 1.15)',
          }}
        >
          <Eyebrow
            dot="var(--persimmon-400)"
            className={`${narrow ? 'mb-[16px]' : 'mb-[4vh]'} text-ink-200`}
          >
            {hero.eyebrow}
          </Eyebrow>
          <h1
            className="m-0 flex flex-col font-display font-normal text-bone-50"
            style={{
              // Phones: no stair indents and a size that keeps each line whole.
              fontSize: narrow
                ? 'clamp(30px,10vw,44px)'
                : 'clamp(44px,7vw,138px)',
              lineHeight: 0.98,
              letterSpacing: '-.035em',
              gap: '.04em',
            }}
          >
            {hero.lines.map((line, i) => (
              <span key={line.em} className={narrow ? '' : indents[i]}>
                <em className={emColors[i]}>{line.em}</em>
                {line.rest}
              </span>
            ))}
          </h1>
          <div
            className={`flex flex-wrap ${narrow ? 'mt-[16px] flex-col items-stretch' : 'mt-[5vh] items-end'}`}
            style={{ gap: narrow ? '16px' : '24px 48px' }}
          >
            <p
              className="m-0 max-w-[34ch] font-light text-ink-100"
              style={{
                fontSize: narrow ? 15 : 'clamp(17px,1.5vw,22px)',
                lineHeight: 1.5,
              }}
            >
              {hero.lede}
            </p>
            <div
              className={`flex gap-[10px] ${narrow ? 'flex-col' : 'flex-wrap'}`}
            >
              <Button
                variant="accent"
                size={narrow ? 'md' : 'lg'}
                href="/#contact"
                fullWidth={narrow}
              >
                {hero.primary}
              </Button>
              <Button
                variant="secondary"
                size={narrow ? 'md' : 'lg'}
                href="/#how"
                fullWidth={narrow}
              >
                {hero.secondary}
              </Button>
            </div>
          </div>
        </div>

        <div
          className="absolute right-0 bottom-0 left-0 flex h-[64px] flex-wrap items-center overflow-hidden px-gutter font-mono text-[11px] tracking-label uppercase"
          style={{
            borderTop: '1px solid rgba(251,250,246,.2)',
            gap: '12px 32px',
          }}
        >
          {/* On phones the audience list reappears in the Customers chapter. */}
          {!narrow && (
            <>
              <span className="text-ink-300">{hero.trustedLabel}</span>
              {hero.trusted.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </>
          )}
          <span className="ml-auto text-ink-300">{hero.scrollHint}</span>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
