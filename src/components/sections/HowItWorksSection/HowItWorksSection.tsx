'use client'

import Eyebrow from '@/components/ui/Eyebrow/Eyebrow'
import { how } from '@/content/site'
import type { StepTag } from '@/content/site'
import { useNarrow } from '@/hooks/useNarrow'

const tagColor: Record<StepTag, string> = {
  Knows: 'text-lagoon-300',
  Coms: 'text-brass-300',
  Move: 'text-persimmon-400',
}

const rowWindows = [
  '0 0.04',
  '0.18 0.23',
  '0.38 0.43',
  '0.58 0.63',
  '0.78 0.83',
]

const TagRow = ({ n, tag }: { n: string; tag: StepTag }) => (
  <span className="flex items-center gap-[12px] font-mono text-[11px] tracking-label uppercase">
    <span className="text-ink-300">{n}</span>
    <span
      className={`rounded-[2px] border border-current px-[6px] py-[2px] ${tagColor[tag]}`}
    >
      {tag}
    </span>
  </span>
)

const Intro = ({ narrow }: { narrow: boolean }) => (
  <>
    <Eyebrow dot="var(--persimmon-400)" className="text-ink-200">
      {how.eyebrow}
    </Eyebrow>
    {narrow ? (
      <h2
        data-a="0 0.5"
        className="m-0 font-display font-normal text-bone-50"
        style={{
          fontSize: 'clamp(34px,9vw,56px)',
          lineHeight: 1.02,
          letterSpacing: '-.03em',
          opacity: 'var(--t,1)',
        }}
      >
        {how.title}
      </h2>
    ) : (
      <h2
        className="m-0 font-display font-normal text-bone-50"
        style={{
          fontSize: 'clamp(30px,3.4vw,58px)',
          lineHeight: 1.04,
          letterSpacing: '-.025em',
        }}
      >
        {how.title}
      </h2>
    )}
    <p
      className="m-0 text-ink-200"
      style={
        narrow
          ? { fontSize: 16, lineHeight: 1.55 }
          : { fontSize: 'clamp(15px,1.15vw,18px)', lineHeight: 1.55 }
      }
    >
      {how.lede}
    </p>
  </>
)

const HowWide = () => (
  <section
    id="how"
    data-scene="sticky"
    data-tone="ink"
    data-nav="how"
    data-theme="dark"
    className="relative h-[300vh] bg-ink-900 text-bone-50"
    style={{ scrollMarginTop: 60 }}
  >
    <div className="sticky top-0 h-screen overflow-hidden">
      <div
        className="absolute top-[18vh] left-gutter flex flex-col gap-[20px]"
        style={{ width: 'min(30vw,420px)' }}
      >
        <Intro narrow={false} />
      </div>
      <div
        className="absolute top-[14vh] left-[40vw] h-[75vh] w-px"
        style={{ background: 'rgba(251,250,246,.18)' }}
      />
      <div
        className="absolute top-[14vh] left-[40vw] w-px bg-bone-50"
        style={{ height: 'calc(var(--p,0) * 75vh)' }}
      />
      <div
        className="absolute left-[40vw] h-[13px] w-[13px] rounded-full bg-persimmon-400"
        style={{
          top: 'calc(14vh + var(--p,0) * 75vh)',
          transform: 'translate(-6px,-6px)',
        }}
      />
      <div
        className="absolute top-[14vh] right-gutter left-[43vw] grid h-[75vh]"
        style={{ gridTemplateRows: 'repeat(5,1fr)' }}
      >
        {how.steps.map((step, i) => (
          <div
            key={step.n}
            data-a={rowWindows[i]}
            className="grid items-center gap-[24px]"
            style={{
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,22vw)',
              opacity: 'calc(.16 + var(--t,1) * .84)',
              // The design gives only the first row a colour transition.
              transition: i === 0 ? 'opacity 180ms' : undefined,
            }}
          >
            <div className="flex flex-col gap-[6px]">
              <TagRow n={step.n} tag={step.tag} />
              <span
                className="font-display"
                style={{
                  fontSize: 'clamp(34px,8vh,96px)',
                  lineHeight: 1,
                  letterSpacing: '-.03em',
                }}
              >
                {step.word}
              </span>
            </div>
            <p
              className="m-0 text-ink-100"
              style={{ fontSize: 'clamp(14px,1.1vw,17px)', lineHeight: 1.5 }}
            >
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const HowNarrow = () => (
  <section
    id="how"
    data-tone="ink"
    data-nav="how"
    data-theme="dark"
    className="flex flex-col gap-[40px] bg-ink-900 px-[20px] pt-[14vh] pb-[12vh] text-bone-50"
    style={{ scrollMarginTop: 60 }}
  >
    <div data-scene="reveal" className="flex flex-col gap-[18px]">
      <Intro narrow />
    </div>
    <div
      className="flex flex-col gap-[32px] pl-[20px]"
      style={{ borderLeft: '1px solid rgba(251,250,246,.25)' }}
    >
      {how.steps.map((step) => (
        <div key={step.n} data-scene="reveal">
          <div
            data-a="0.2 0.5"
            className="flex flex-col gap-[8px]"
            style={{ opacity: 'calc(.2 + var(--t,1) * .8)' }}
          >
            <TagRow n={step.n} tag={step.tag} />
            <span
              className="font-display"
              style={{
                fontSize: '14vw',
                lineHeight: 1,
                letterSpacing: '-.03em',
              }}
            >
              {step.word}
            </span>
            <p className="m-0 text-[16px] leading-[1.5] text-ink-100">
              {step.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
)

/** How It Works: five steps on one line from opportunity to destination. */
const HowItWorksSection = () => {
  const narrow = useNarrow()
  return narrow ? <HowNarrow /> : <HowWide />
}

export default HowItWorksSection
