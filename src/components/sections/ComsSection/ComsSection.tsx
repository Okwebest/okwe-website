'use client'

import { useState } from 'react'

import HubDiagram from '@/components/HubDiagram/HubDiagram'
import ImageSlot from '@/components/ui/ImageSlot/ImageSlot'
import { coms } from '@/content/site'
import { useNarrow } from '@/hooks/useNarrow'

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
  const narrow = useNarrow()

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
        <div className="absolute top-[32px] right-gutter left-gutter flex justify-between gap-[16px] font-mono text-[11px] tracking-label text-on-paper-3 uppercase">
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
          <ImageSlot
            id="okwe-coms"
            placeholder={coms.imagePlaceholder}
            image={coms.image}
            sizes="(max-width: 859px) 100vw, 38vw"
          />
        </div>
        <div
          data-a="0 0.6"
          className="absolute top-[20vh] right-gutter font-display italic"
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
          className="pointer-events-none absolute right-[3vw] bottom-[-3.6vw] font-display whitespace-nowrap text-acc-c"
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
        className="grid items-center px-gutter pt-[10vh] pb-[18vh]"
        style={{
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap: '56px 6vw',
        }}
      >
        <div className="flex min-w-0 flex-col gap-[28px]">
          <div
            className={`relative w-full self-center ${
              narrow ? 'max-w-[320px]' : 'max-w-[600px]'
            }`}
            style={{ aspectRatio: '1' }}
          >
            <HubDiagram active={active} />
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-mono text-[10px] tracking-label text-paper-hi uppercase"
              style={{ lineHeight: 1.3 }}
            >
              {coms.hubLabel[0]}
              <br />
              {coms.hubLabel[1]}
            </span>
            {!narrow &&
              coms.items.map((item, k) => (
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

          {/* Phones: the six labels would run off the screen around the hub,
              so they become a ruled list that lights up the same chords. */}
          {narrow && (
            <div className="flex flex-col border-t border-on-paper">
              {coms.items.map((item, k) => (
                <div
                  key={item}
                  data-hover=""
                  onMouseEnter={() => setActive(k)}
                  onMouseLeave={() => setActive(-1)}
                  className="grid gap-[12px] border-b border-rule py-[14px] text-[16px] text-on-paper"
                  style={{ gridTemplateColumns: '48px minmax(0,1fr)' }}
                >
                  <span className="pt-[3px] font-mono text-[11px] tracking-[.1em] text-acc-c">
                    C·0{k + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          )}
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
            className="m-0 font-display font-light text-on-paper italic"
            style={{
              fontSize: 'clamp(26px,2.6vw,44px)',
              lineHeight: 1.18,
              letterSpacing: '-.015em',
            }}
          >
            {coms.statement}
          </p>
          <div className="flex max-w-[44ch] flex-col gap-[10px] border-t-2 border-acc-c2 pt-[18px]">
            <span className="font-mono text-[11px] tracking-label text-acc-c uppercase">
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
