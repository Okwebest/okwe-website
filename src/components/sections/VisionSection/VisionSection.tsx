import Eyebrow from '@/components/ui/Eyebrow/Eyebrow'
import { vision } from '@/content/site'

/** Long-Term Vision: the passing marquee and the four-stage ecosystem. */
const VisionSection = () => (
  <section
    data-tone="ink"
    data-theme="dark"
    className="overflow-hidden bg-ink-900 text-bone-50"
  >
    <div
      data-scene="pass"
      className="border-b border-bone-50/[.14] pt-[16vh] pb-[8vh]"
    >
      <div
        className="font-display whitespace-nowrap text-ink-600 italic"
        style={{
          fontSize: '11vw',
          lineHeight: 1,
          letterSpacing: '-.04em',
          transform: 'translateX(calc(10vw - var(--p,0) * 95vw))',
        }}
      >
        {vision.marquee}
      </div>
    </div>

    <div
      data-scene="reveal"
      className="grid items-start px-gutter pt-[12vh] pb-[18vh]"
      style={{
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
        <Eyebrow dot="var(--persimmon-400)" className="text-persimmon-400">
          {vision.eyebrow}
        </Eyebrow>
        <h2
          className="m-0 font-display font-normal text-bone-50"
          style={{
            fontSize: 'clamp(36px,4.6vw,80px)',
            lineHeight: 1,
            letterSpacing: '-.03em',
          }}
        >
          {vision.title}
        </h2>
        <p
          className="m-0 max-w-[46ch] text-ink-200"
          style={{ fontSize: 'clamp(15px,1.15vw,18px)', lineHeight: 1.55 }}
        >
          {vision.lede}
        </p>
      </div>

      <div
        data-a="0.1 0.6"
        className="flex flex-col border-t border-bone-50/[.22]"
        style={{ opacity: 'var(--t,1)' }}
      >
        {vision.rows.map((row) => (
          <div
            key={row.n}
            data-hover=""
            className="grid items-center gap-[16px] border-b border-bone-50/[.14] px-[8px] py-[24px] hover:bg-bone-50/[.05]"
            style={{
              gridTemplateColumns: '44px minmax(0,1fr) auto',
              transition: 'background 120ms',
            }}
          >
            <span className="font-mono text-[12px] text-persimmon-400">
              {row.n}
            </span>
            <span className="flex flex-col gap-[4px]">
              <span
                className="font-display"
                style={{ fontSize: 'clamp(22px,1.9vw,32px)', lineHeight: 1.1 }}
              >
                {row.word}
              </span>
              <span className="text-[15px] text-ink-300">{row.text}</span>
            </span>
            <span className="font-mono text-ink-300">↗</span>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default VisionSection
