'use client'

import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow/Eyebrow'
import { coreIdea } from '@/content/site'
import { useNarrow } from '@/hooks/useNarrow'

/** Per-process colours: the word/link colour and the timeline dot colour. */
const tones = [
  { word: 'text-acc-k', dot: 'bg-acc-k' },
  { word: 'text-acc-c', dot: 'bg-acc-c2' },
  { word: 'text-acc-m', dot: 'bg-acc-m2' },
]

const gutter = 'clamp(20px,5vw,88px)'
/** Horizontal offsets of the three timeline stops. */
const stopLeft = [gutter, `calc(${gutter} + 31vw)`, `calc(${gutter} + 62vw)`]

const wordTransforms = [
  'translate(0, calc(var(--t,0) * 39vh)) scale(calc(1 - var(--t,0) * .62))',
  'translate(calc(var(--t,0) * 31vw), calc(var(--t,0) * 14vh)) scale(calc(1 - var(--t,0) * .62))',
  'translate(calc(var(--t,0) * 62vw), calc(var(--t,0) * -11vh)) scale(calc(1 - var(--t,0) * .62))',
]
const wordTop = ['16vh', '41vh', '66vh']
const dotWindows = ['0.58 0.64', '0.64 0.7', '0.7 0.76']
const captionWindows = ['0.68 0.84', '0.72 0.88', '0.76 0.92']

const linkClass =
  'self-start border-0 border-b border-current font-mono text-[11px] uppercase tracking-label hover:text-inherit'

const CoreIdeaWide = () => (
  <section
    data-scene="sticky"
    data-tone="bone"
    className="relative h-[290vh] bg-paper text-on-paper"
  >
    <div className="sticky top-0 h-screen overflow-hidden">
      <div
        data-a="0.28 0.5"
        className="absolute top-[16vh] right-gutter flex flex-col gap-[20px]"
        style={{
          width: 'min(30vw,440px)',
          transform:
            'translateX(calc(var(--t,0) * (min(30vw,440px) + 2 * clamp(20px,5vw,88px) - 100vw)))',
        }}
      >
        <Eyebrow dot="var(--acc-m2)" className="text-on-paper-3">
          {coreIdea.eyebrow}
        </Eyebrow>
        <h2
          className="m-0 font-display font-normal text-on-paper"
          style={{
            fontSize: 'clamp(30px,3.4vw,58px)',
            lineHeight: 1.04,
            letterSpacing: '-.025em',
          }}
        >
          {coreIdea.title}
        </h2>
        <p
          className="m-0 text-on-paper-2"
          style={{
            fontSize: 'clamp(15px,1.15vw,18px)',
            lineHeight: 1.55,
            opacity: 'calc(1 - var(--t,0) * 1.4)',
          }}
        >
          {coreIdea.lede}
        </p>
      </div>

      {coreIdea.processes.map((p, i) => (
        <div
          key={p.word}
          data-a="0.3 0.62"
          className={`absolute left-gutter origin-top-left font-display whitespace-nowrap italic ${tones[i].word}`}
          style={{
            top: wordTop[i],
            transform: wordTransforms[i],
            fontSize: '22vh',
            lineHeight: 1,
            letterSpacing: '-.04em',
          }}
        >
          {p.word}
        </div>
      ))}

      <div
        data-a="0.58 0.76"
        className="absolute top-[52vh] left-gutter h-px w-[62vw] origin-left bg-on-paper"
        style={{ transform: 'scaleX(var(--t,0))' }}
      />
      {coreIdea.processes.map((p, i) => (
        <div
          key={`dot-${p.word}`}
          data-a={dotWindows[i]}
          className={`absolute h-[10px] w-[10px] rounded-full ${tones[i].dot}`}
          style={{
            left: stopLeft[i],
            top: 'calc(52vh - 5px)',
            opacity: 'var(--t,0)',
          }}
        />
      ))}

      {coreIdea.processes.map((p, i) => (
        <div
          key={`cap-${p.word}`}
          data-a={captionWindows[i]}
          className="absolute top-[67vh] flex w-[25vw] flex-col gap-[10px]"
          style={{
            left: stopLeft[i],
            opacity: 'var(--t,0)',
            transform: 'translateY(calc((1 - var(--t,0)) * 16px))',
          }}
        >
          <span className="font-mono text-[11px] tracking-label text-on-paper-3">
            {p.n}
          </span>
          <p
            className="m-0 text-on-paper"
            style={{ fontSize: 'clamp(14px,1.1vw,17px)', lineHeight: 1.5 }}
          >
            {p.text}
          </p>
          <Link href={p.href} className={`${linkClass} ${tones[i].word}`}>
            {p.link}
          </Link>
        </div>
      ))}
    </div>
  </section>
)

const CoreIdeaNarrow = () => (
  <section
    data-tone="bone"
    className="flex flex-col gap-[40px] bg-paper px-[20px] pt-[14vh] pb-[12vh] text-on-paper"
  >
    <div data-scene="reveal" className="flex flex-col gap-[18px]">
      <Eyebrow dot="var(--acc-m2)" className="text-on-paper-3">
        {coreIdea.eyebrow}
      </Eyebrow>
      <h2
        data-a="0 0.5"
        className="m-0 font-display font-normal text-on-paper"
        style={{
          fontSize: 'clamp(34px,9vw,56px)',
          lineHeight: 1.02,
          letterSpacing: '-.03em',
          opacity: 'var(--t,1)',
        }}
      >
        {coreIdea.title}
      </h2>
      <p className="m-0 text-[16px] leading-[1.55] text-on-paper-2">
        {coreIdea.lede}
      </p>
    </div>
    <div className="flex flex-col border-t border-on-paper">
      {coreIdea.processes.map((p, i) => (
        <div key={p.word} data-scene="reveal" className="border-b border-rule">
          <div
            data-a="0 0.45"
            className="flex flex-col gap-[10px] py-[24px]"
            style={{
              opacity: 'var(--t,1)',
              transform: 'translateX(calc((1 - var(--t,1)) * -24px))',
            }}
          >
            <div className="flex items-baseline gap-[14px]">
              <span className="font-mono text-[11px] text-on-paper-3">
                {p.n}
              </span>
              <span
                className={`font-display italic ${tones[i].word}`}
                style={{
                  fontSize: '18vw',
                  lineHeight: 0.9,
                  letterSpacing: '-.04em',
                }}
              >
                {p.word}
              </span>
            </div>
            <p className="m-0 text-[16px] leading-[1.5] text-on-paper">
              {p.text}
            </p>
            <Link href={p.href} className={`${linkClass} ${tones[i].word}`}>
              {p.link}
            </Link>
          </div>
        </div>
      ))}
    </div>
  </section>
)

/** The Core Idea: Know / Connect / Move collapsing onto one timeline. */
const CoreIdeaSection = () => {
  const narrow = useNarrow()
  return narrow ? <CoreIdeaNarrow /> : <CoreIdeaWide />
}

export default CoreIdeaSection
