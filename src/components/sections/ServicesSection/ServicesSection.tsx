import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow/Eyebrow'
import { services } from '@/content/site'

const rows = [
  {
    window: '0.1 0.5',
    accent: 'text-lagoon-300',
    hover: 'hover:text-lagoon-300',
  },
  {
    window: '0.18 0.58',
    accent: 'text-brass-300',
    hover: 'hover:text-brass-300',
  },
  {
    window: '0.26 0.66',
    accent: 'text-persimmon-400',
    hover: 'hover:text-persimmon-400',
  },
]

/** What Okwe Does: the three process rows linking into their chapters. */
const ServicesSection = () => (
  <section
    id="services"
    data-scene="reveal"
    data-tone="ink"
    data-theme="dark"
    className="grid items-end bg-ink-900 px-gutter pt-[18vh] pb-[14vh] text-bone-50"
    style={{
      scrollMarginTop: 60,
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
      gap: '48px 6vw',
    }}
  >
    <div
      data-a="0 0.5"
      className="flex flex-col gap-[20px]"
      style={{
        opacity: 'var(--t,1)',
        transform: 'translateY(calc((1 - var(--t,1)) * 16px))',
      }}
    >
      <Eyebrow dot="var(--persimmon-400)" className="text-ink-200">
        {services.eyebrow}
      </Eyebrow>
      <h2
        className="m-0 font-display font-normal text-bone-50"
        style={{
          fontSize: 'clamp(40px,5.6vw,96px)',
          lineHeight: 0.98,
          letterSpacing: '-.035em',
        }}
      >
        {services.titleLines[0]}
        <br />
        {services.titleLines[1]}
      </h2>
      <p
        className="m-0 font-light text-ink-200"
        style={{ fontSize: 'clamp(17px,1.4vw,20px)' }}
      >
        {services.lede}
      </p>
    </div>

    <div className="flex flex-col border-t border-bone-50/[.2]">
      {services.rows.map((row, i) => (
        <Link
          key={row.href}
          href={row.href}
          data-a={rows[i].window}
          className={`grid items-baseline gap-[16px] border-0 border-b border-bone-50/[.2] py-[28px] text-bone-50 hover:pl-[16px] ${rows[i].hover}`}
          style={{
            gridTemplateColumns: '48px minmax(0,1fr) auto',
            opacity: 'var(--t,1)',
            transition: 'padding 260ms cubic-bezier(.2,0,.2,1),color 180ms',
          }}
        >
          <span className={`font-mono text-[12px] ${rows[i].accent}`}>
            {row.n}
          </span>
          <span className="flex flex-col gap-[4px]">
            <span
              className="font-display"
              style={{
                fontSize: 'clamp(28px,3vw,48px)',
                lineHeight: 1,
                letterSpacing: '-.02em',
              }}
            >
              {row.title}
            </span>
            <span className="text-[14px] text-ink-300">{row.sub}</span>
          </span>
          <span className="font-mono text-[18px]">→</span>
        </Link>
      ))}
    </div>
  </section>
)

export default ServicesSection
