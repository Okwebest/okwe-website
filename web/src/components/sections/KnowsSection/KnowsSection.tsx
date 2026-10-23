import { useState } from 'react'

import DotField from 'src/components/DotField/DotField'
import ImageSlot from 'src/components/ui/ImageSlot/ImageSlot'
import { knows } from 'src/content/site'

/** Chapter 01 — Okwe Knows. */
const KnowsSection = () => {
  const [active, setActive] = useState(-1)

  return (
    <section
      id="knows"
      data-tone="ink"
      data-nav="know"
      data-theme="dark"
      className="bg-ink-900 text-bone-50"
      style={{ scrollMarginTop: 60 }}
    >
      <div
        data-scene="reveal"
        className="relative overflow-hidden border-t border-bone-50/[.14]"
        style={{ height: 'max(92vh,620px)' }}
      >
        <div className="absolute left-gutter right-gutter top-[32px] flex justify-between gap-[16px] font-mono text-[11px] uppercase tracking-label text-ink-300">
          <span>{knows.counter}</span>
          <span className="text-lagoon-300">{knows.category}</span>
        </div>
        <div
          data-a="0.05 0.75"
          className="absolute right-gutter"
          style={{
            top: 'calc(13vh + var(--nw,0) * 17vh)',
            width:
              'calc(40vw + var(--nw,0) * (60vw - 2 * clamp(20px,5vw,88px)))',
            height: 'calc(62vh - var(--nw,0) * 20vh)',
            clipPath: 'inset(calc((1 - var(--t,1)) * 100%) 0 0 0)',
          }}
        >
          <ImageSlot
            id="okwe-know"
            placeholder={knows.imagePlaceholder}
            src={knows.image}
            alt={knows.imageAlt}
          />
        </div>
        <div
          data-a="0 0.6"
          className="absolute left-gutter top-[20vh] font-display italic"
          style={{
            fontSize: 'clamp(32px,4.4vw,76px)',
            lineHeight: 1,
            opacity: 'var(--t,1)',
          }}
        >
          Okwe
        </div>
        <div
          data-a="0 0.8"
          className="pointer-events-none absolute bottom-[-3.6vw] left-[3.4vw] whitespace-nowrap font-display text-lagoon-300"
          style={{
            fontSize: '25vw',
            lineHeight: 1,
            letterSpacing: '-.055em',
            transform: 'translateX(calc((1 - var(--t,1)) * -8vw))',
          }}
        >
          Knows
        </div>
      </div>

      <div
        data-scene="reveal"
        className="grid px-gutter pb-[18vh] pt-[12vh]"
        style={{
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap: '56px 6vw',
        }}
      >
        <div
          data-a="0 0.5"
          className="flex flex-col gap-[40px]"
          style={{
            opacity: 'var(--t,1)',
            transform: 'translateY(calc((1 - var(--t,1)) * 16px))',
          }}
        >
          <p
            className="m-0 font-display text-bone-50"
            style={{
              fontSize: 'clamp(24px,2.3vw,38px)',
              lineHeight: 1.22,
              letterSpacing: '-.015em',
            }}
          >
            {knows.statement}
          </p>
          <div className="flex max-w-[44ch] flex-col gap-[10px] border-t-2 border-lagoon-300 pt-[18px]">
            <span className="font-mono text-[11px] uppercase tracking-label text-lagoon-300">
              {knows.purposeLabel}
            </span>
            <p className="m-0 text-[17px] leading-[1.55] text-ink-100">
              {knows.purpose}
            </p>
          </div>
        </div>

        <div
          data-a="0.1 0.6"
          className="flex flex-col"
          style={{ opacity: 'var(--t,1)' }}
        >
          <div className="relative h-[220px] border border-b-0 border-bone-50/[.14]">
            <DotField active={active} />
            <span className="absolute left-[14px] top-[12px] font-mono text-[10px] uppercase tracking-label text-lagoon-300">
              {knows.coversLabel}
            </span>
            <span className="absolute right-[14px] top-[12px] font-mono text-[10px] tracking-label text-ink-300">
              {knows.coversCode}
            </span>
          </div>
          <div className="flex flex-col border-t border-bone-50/[.2]">
            {knows.items.map((item, k) => (
              <div
                key={item.code}
                data-hover=""
                onMouseEnter={() => setActive(k)}
                onMouseLeave={() => setActive(-1)}
                className="grid gap-[12px] border-b border-bone-50/[.14] py-[16px] text-[16px] text-ink-100 hover:pl-[10px] hover:text-lagoon-300"
                style={{
                  gridTemplateColumns: '56px minmax(0,1fr)',
                  transition:
                    'color 120ms,padding 180ms cubic-bezier(.2,0,.2,1)',
                }}
              >
                <span className="pt-[3px] font-mono text-[11px] tracking-[.1em] text-ink-400">
                  {item.code}
                </span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default KnowsSection
