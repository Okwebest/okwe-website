import { useState } from 'react'

import HubDiagram from 'src/components/HubDiagram/HubDiagram'
import ImageSlot from 'src/components/ui/ImageSlot/ImageSlot'
import { coms } from 'src/content/site'

/** Where each coverage label sits around the hub (design lines 282–287). */
const labelPlacement: React.CSSProperties[] = [
  {
    left: '50%',
    top: '13.3%',
    transform: 'translate(-50%,calc(-100% - 16px))',
    maxWidth: '40%',
    textAlign: 'center',
  },
  {
    left: 'calc(81.75% + 18px)',
    top: '31.67%',
    transform: 'translateY(-50%)',
    maxWidth: '30%',
  },
  {
    left: 'calc(81.75% + 18px)',
    top: '68.33%',
    transform: 'translateY(-50%)',
    maxWidth: '30%',
  },
  {
    left: '50%',
    top: '86.67%',
    transform: 'translate(-50%,16px)',
    maxWidth: '40%',
    textAlign: 'center',
  },
  {
    right: 'calc(81.75% + 18px)',
    top: '68.33%',
    transform: 'translateY(-50%)',
    maxWidth: '30%',
    textAlign: 'right',
  },
  {
    right: 'calc(81.75% + 18px)',
    top: '31.67%',
    transform: 'translateY(-50%)',
    maxWidth: '30%',
    textAlign: 'right',
  },
]

/** Chapter 02 — Okwe Coms. */
const ComsSection = () => {
  const [active, setActive] = useState(-1)

  return (
    <section
      id="coms"
      data-tone="bone"
      data-nav="coms"
      className="bg-paper-hi text-on-paper"
      style={{ scrollMarginTop: 60 }}
    >
      <div
        data-scene="reveal"
        className="relative overflow-hidden"
        style={{ height: 'max(92vh,620px)' }}
      >
        <div className="absolute left-gutter right-gutter top-[32px] flex justify-between gap-[16px] font-mono text-[11px] uppercase tracking-label text-on-paper-3">
          <span className="text-acc-c">{coms.category}</span>
          <span>{coms.counter}</span>
        </div>
        <div
          data-a="0.05 0.75"
          className="absolute left-gutter"
          style={{
            top: 'calc(13vh + var(--nw,0) * 17vh)',
            width:
              'calc(38vw + var(--nw,0) * (62vw - 2 * clamp(20px,5vw,88px)))',
            height: 'calc(62vh - var(--nw,0) * 20vh)',
            clipPath: 'inset(0 calc((1 - var(--t,1)) * 100%) 0 0)',
          }}
        >
          <ImageSlot id="okwe-coms" placeholder={coms.imagePlaceholder} />
        </div>
        <div
          data-a="0 0.6"
          className="absolute right-gutter top-[20vh] font-display italic"
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
          className="pointer-events-none absolute bottom-[-3.6vw] right-[3vw] whitespace-nowrap font-display text-acc-c"
          style={{
            fontSize: '25vw',
            lineHeight: 1,
            letterSpacing: '-.055em',
            transform: 'translateX(calc((1 - var(--t,1)) * 8vw))',
          }}
        >
          Coms
        </div>
      </div>

      <div
        data-scene="reveal"
        className="grid items-center px-gutter pb-[18vh] pt-[10vh]"
        style={{
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap: '56px 6vw',
        }}
      >
        <div
          className="relative w-full max-w-[600px] justify-self-center"
          style={{ aspectRatio: '1' }}
        >
          <HubDiagram active={active} />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-mono text-[10px] uppercase tracking-label text-paper-hi"
            style={{ lineHeight: 1.3 }}
          >
            {coms.hubLabel[0]}
            <br />
            {coms.hubLabel[1]}
          </span>
          {coms.items.map((item, k) => (
            <span
              key={item}
              data-hover=""
              onMouseEnter={() => setActive(k)}
              onMouseLeave={() => setActive(-1)}
              className="absolute w-max cursor-default rounded-[2px] px-[6px] py-[4px] font-semibold text-on-paper hover:bg-hl"
              style={{
                ...labelPlacement[k],
                fontSize: 'clamp(12px,1.05vw,15px)',
                lineHeight: 1.3,
                transition: 'background 120ms',
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <div
          data-a="0.05 0.5"
          className="flex flex-col gap-[40px]"
          style={{
            opacity: 'var(--t,1)',
            transform: 'translateY(calc((1 - var(--t,1)) * 16px))',
          }}
        >
          <p
            className="m-0 font-display font-light italic text-on-paper"
            style={{
              fontSize: 'clamp(26px,2.6vw,44px)',
              lineHeight: 1.18,
              letterSpacing: '-.015em',
            }}
          >
            {coms.statement}
          </p>
          <div className="flex max-w-[44ch] flex-col gap-[10px] border-t-2 border-acc-c2 pt-[18px]">
            <span className="font-mono text-[11px] uppercase tracking-label text-acc-c">
              {coms.purposeLabel}
            </span>
            <p className="m-0 text-[17px] leading-[1.55] text-on-paper-2">
              {coms.purpose}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComsSection
