import RouteMap from 'src/components/RouteMap/RouteMap'
import Button from 'src/components/ui/Button/Button'
import Eyebrow from 'src/components/ui/Eyebrow/Eyebrow'
import { cta } from 'src/content/site'

/** Closing call to action: every route converges back on Lagos. */
const CtaSection = () => (
  <section
    data-scene="reveal"
    data-tone="ink"
    data-theme="dark"
    className="relative flex min-h-screen flex-col justify-center overflow-hidden border-t-2 border-persimmon-500 bg-ink-900 px-gutter py-[16vh] text-bone-50"
  >
    <RouteMap variant="converge" />
    <div
      data-a="0.1 0.6"
      className="relative flex max-w-[1100px] flex-col gap-[4vh]"
      style={{
        opacity: 'var(--t,1)',
        transform: 'translateY(calc((1 - var(--t,1)) * 16px))',
      }}
    >
      <Eyebrow dot="var(--persimmon-400)" className="text-persimmon-400">
        {cta.eyebrow}
      </Eyebrow>
      <h2
        className="m-0 font-display font-normal text-bone-50"
        style={{
          fontSize: 'clamp(44px,7.6vw,140px)',
          lineHeight: 0.96,
          letterSpacing: '-.04em',
        }}
      >
        {cta.title}
      </h2>
      <p
        className="m-0 max-w-[40ch] font-light text-ink-100"
        style={{ fontSize: 'clamp(17px,1.5vw,22px)', lineHeight: 1.5 }}
      >
        {cta.lede}
      </p>
      <div className="flex flex-wrap gap-[12px]">
        <Button variant="accent" size="lg" href="/#contact">
          {cta.primary}
        </Button>
        <Button variant="secondary" size="lg" href="/#services">
          {cta.secondary}
        </Button>
      </div>
    </div>
  </section>
)

export default CtaSection
