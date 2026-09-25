import RouteMap from 'src/components/RouteMap/RouteMap'
import Button from 'src/components/ui/Button/Button'
import Eyebrow from 'src/components/ui/Eyebrow/Eyebrow'
import { brand, hero } from 'src/content/site'
import { useClock } from 'src/hooks/useClock'
import { useNarrow } from 'src/hooks/useNarrow'

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
          <div className="absolute right-gutter top-[92px] flex flex-col gap-[6px] text-right font-mono text-[11px] uppercase tracking-label text-ink-200">
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
          className="absolute bottom-[64px] left-gutter right-gutter top-0 flex flex-col justify-center pt-[60px]"
          style={{
            transform: 'translateY(calc(var(--p,0) * -14vh))',
            opacity: 'calc(1 - var(--p,0) * 1.15)',
          }}
        >
          <Eyebrow dot="var(--persimmon-400)" className="mb-[4vh] text-ink-200">
            {hero.eyebrow}
          </Eyebrow>
          <h1
            className="m-0 flex flex-col font-display font-normal text-bone-50"
            style={{
              fontSize: 'clamp(44px,7vw,138px)',
              lineHeight: 0.98,
              letterSpacing: '-.035em',
              gap: '.04em',
            }}
          >
            {hero.lines.map((line, i) => (
              <span key={line.em} className={indents[i]}>
                <em className={emColors[i]}>{line.em}</em>
                {line.rest}
              </span>
            ))}
          </h1>
          <div
            className="mt-[5vh] flex flex-wrap items-end"
            style={{ gap: '24px 48px' }}
          >
            <p
              className="m-0 max-w-[34ch] font-light text-ink-100"
              style={{ fontSize: 'clamp(17px,1.5vw,22px)', lineHeight: 1.5 }}
            >
              {hero.lede}
            </p>
            <div className="flex flex-wrap gap-[12px]">
              <Button variant="accent" size="lg" href="/#contact">
                {hero.primary}
              </Button>
              <Button variant="secondary" size="lg" href="/#how">
                {hero.secondary}
              </Button>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 flex h-[64px] flex-wrap items-center overflow-hidden px-gutter font-mono text-[11px] uppercase tracking-label"
          style={{
            borderTop: '1px solid rgba(251,250,246,.2)',
            gap: '12px 32px',
          }}
        >
          <span className="text-ink-300">{hero.trustedLabel}</span>
          {hero.trusted.map((name) => (
            <span key={name}>{name}</span>
          ))}
          <span className="ml-auto text-ink-300">{hero.scrollHint}</span>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
