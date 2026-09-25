import { useState } from 'react'

import Button from 'src/components/ui/Button/Button'
import Eyebrow from 'src/components/ui/Eyebrow/Eyebrow'
import { faq } from 'src/content/site'

/** FAQ: five questions, one open at a time. */
const FaqSection = () => {
  const [open, setOpen] = useState(-1)

  return (
    <section
      id="faq"
      data-tone="bone"
      data-nav="faq"
      data-scene="reveal"
      className="flex flex-wrap items-start bg-paper px-gutter py-[16vh] text-on-paper"
      style={{ scrollMarginTop: 60, gap: '48px 6vw' }}
    >
      <div
        data-a="0 0.4"
        className="flex flex-col gap-[20px]"
        style={{ flex: '1 1 300px', opacity: 'var(--t,1)' }}
      >
        <Eyebrow dot="var(--acc-m2)" className="text-on-paper-3">
          {faq.eyebrow}
        </Eyebrow>
        <h2
          className="m-0 font-display font-normal text-on-paper"
          style={{
            fontSize: 'clamp(34px,3.6vw,62px)',
            lineHeight: 1.02,
            letterSpacing: '-.03em',
          }}
        >
          {faq.title}
        </h2>
        <p className="m-0 text-[17px] leading-[1.55] text-on-paper-2">
          {faq.lede}
        </p>
        <Button variant="link" href="/#contact" className="self-start">
          {faq.cta}
        </Button>
      </div>

      <div
        className="min-w-0 border-t-2 border-on-paper"
        style={{ flex: '2 1 520px' }}
      >
        {faq.items.map((item, k) => {
          const isOpen = open === k
          return (
            <div key={item.code} className="border-b border-rule">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : k)}
                aria-expanded={isOpen}
                className="grid w-full cursor-pointer items-center gap-[12px] border-0 bg-transparent px-0 py-[26px] text-left font-sans text-on-paper"
                style={{ gridTemplateColumns: '44px minmax(0,1fr) 28px' }}
              >
                <span className="font-mono text-[11px] tracking-[.1em] text-on-paper-3">
                  {item.code}
                </span>
                <span
                  className="font-display"
                  style={{
                    fontSize: 'clamp(20px,1.7vw,28px)',
                    lineHeight: 1.2,
                    letterSpacing: '-.01em',
                  }}
                >
                  {item.q}
                </span>
                <span
                  className="text-center font-mono text-[22px] leading-none"
                  style={{
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 260ms cubic-bezier(.2,0,.2,1)',
                  }}
                >
                  +
                </span>
              </button>
              <div
                className="grid"
                style={{
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition:
                    'grid-template-rows 260ms cubic-bezier(.2,0,.2,1)',
                }}
              >
                <div className="overflow-hidden">
                  <p
                    className="m-0 max-w-[70ch] text-[17px] leading-[1.6] text-on-paper-2"
                    style={{ padding: '0 40px 28px 56px' }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FaqSection
