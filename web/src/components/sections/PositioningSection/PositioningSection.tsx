import Eyebrow from 'src/components/ui/Eyebrow/Eyebrow'
import OkweRow from 'src/components/ui/OkweRow/OkweRow'
import { brand, positioning } from 'src/content/site'
import { useNarrow } from 'src/hooks/useNarrow'

const wordColor = ['text-acc-k', 'text-acc-c', 'text-on-paper', 'text-acc-m']

/**
 * Each quadrant's placement, direction of travel and reveal window
 * (design lines 497–516). Quadrants 01/03 sit left of the cross and read
 * right-aligned; 03/04 put their number after the paragraph.
 */
const quadrants = [
  {
    window: '0.12 0.6',
    style: { right: 'calc(50% + 3vw)', bottom: 'calc(50% + 4vh)' },
    travel:
      'translate(calc((1 - var(--t,1)) * -12vw), calc((1 - var(--t,1)) * -14vh))',
    align: 'items-end text-right',
    numberFirst: true,
  },
  {
    window: '0.18 0.66',
    style: { left: 'calc(50% + 3vw)', bottom: 'calc(50% + 4vh)' },
    travel:
      'translate(calc((1 - var(--t,1)) * 12vw), calc((1 - var(--t,1)) * -14vh))',
    align: '',
    numberFirst: true,
  },
  {
    window: '0.24 0.72',
    style: { right: 'calc(50% + 3vw)', top: 'calc(50% + 4vh)' },
    travel:
      'translate(calc((1 - var(--t,1)) * -12vw), calc((1 - var(--t,1)) * 14vh))',
    align: 'items-end text-right',
    numberFirst: false,
  },
  {
    window: '0.3 0.78',
    style: { left: 'calc(50% + 3vw)', top: 'calc(50% + 4vh)' },
    travel:
      'translate(calc((1 - var(--t,1)) * 12vw), calc((1 - var(--t,1)) * 14vh))',
    align: '',
    numberFirst: false,
  },
]

const PositioningWide = () => (
  <div data-scene="sticky" className="relative h-[210vh]">
    <div className="sticky top-0 h-screen overflow-hidden">
      <div
        data-a="0.02 0.4"
        className="absolute bottom-[8vh] left-1/2 top-[8vh] w-px bg-on-paper"
        style={{ transform: 'scaleY(var(--t,1))' }}
      />
      <div
        data-a="0.02 0.4"
        className="absolute left-gutter right-gutter top-1/2 h-px bg-on-paper"
        style={{ transform: 'scaleX(var(--t,1))' }}
      />
      <div
        data-a="0.3 0.5"
        className="absolute left-1/2 top-1/2 flex flex-col items-center gap-[10px] bg-paper-lo px-[18px] py-[14px]"
        style={{ transform: 'translate(-50%,-50%)', opacity: 'var(--t,1)' }}
      >
        <OkweRow />
        <span className="font-sans text-[14px] font-bold tracking-[.08em]">
          {brand.wordmark}
        </span>
      </div>

      {positioning.quadrants.map((q, i) => {
        const cfg = quadrants[i]
        const number = (
          <span className="font-mono text-[11px] tracking-label text-on-paper-3">
            {q.n}
          </span>
        )
        return (
          <div
            key={q.n}
            data-a={cfg.window}
            className={`absolute flex max-w-[34vw] flex-col gap-[12px] ${cfg.align}`}
            style={{
              ...cfg.style,
              opacity: 'var(--t,1)',
              transform: cfg.travel,
            }}
          >
            {cfg.numberFirst && number}
            <span
              className={`font-display ${wordColor[i]}`}
              style={{
                fontSize: 'clamp(34px,5.4vw,96px)',
                lineHeight: 0.95,
                letterSpacing: '-.035em',
              }}
            >
              {q.word}
            </span>
            <p
              className="m-0 max-w-[30ch] text-on-paper-2"
              style={{ fontSize: 'clamp(14px,1.05vw,16px)', lineHeight: 1.5 }}
            >
              {q.text}
            </p>
            {!cfg.numberFirst && number}
          </div>
        )
      })}
    </div>
  </div>
)

const PositioningNarrow = () => (
  <div className="flex flex-col px-[20px] pb-[14vh] pt-[6vh]">
    {positioning.quadrants.map((q, i) => (
      <div
        key={q.n}
        data-scene="reveal"
        className={`border-t border-on-paper ${
          i === positioning.quadrants.length - 1 ? 'border-b' : ''
        }`}
      >
        <div
          data-a="0.1 0.5"
          className="flex flex-col gap-[8px] py-[24px]"
          style={{
            opacity: 'var(--t,1)',
            transform: 'translateY(calc((1 - var(--t,1)) * 16px))',
          }}
        >
          <span className="font-mono text-[11px] text-on-paper-3">{q.n}</span>
          <span
            className={`font-display ${wordColor[i]}`}
            style={{
              fontSize: '13vw',
              lineHeight: 0.95,
              letterSpacing: '-.035em',
            }}
          >
            {q.word}
          </span>
          <p className="m-0 text-[16px] text-on-paper-2">{q.text}</p>
        </div>
      </div>
    ))}
  </div>
)

/** Positioning: the four things Okwe combines, meeting at one intersection. */
const PositioningSection = () => {
  const narrow = useNarrow()
  return (
    <section data-tone="bone" className="bg-paper-lo text-on-paper">
      <div
        data-scene="reveal"
        className="grid items-end px-gutter pt-[16vh]"
        style={{
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
          gap: '24px 6vw',
        }}
      >
        <div
          data-a="0 0.5"
          className="flex flex-col gap-[20px]"
          style={{ opacity: 'var(--t,1)' }}
        >
          <Eyebrow dot="var(--acc-m2)" className="text-on-paper-3">
            {positioning.eyebrow}
          </Eyebrow>
          <h2
            className="m-0 font-display font-normal text-on-paper"
            style={{
              fontSize: 'clamp(36px,4.6vw,80px)',
              lineHeight: 1,
              letterSpacing: '-.03em',
            }}
          >
            {positioning.title}
          </h2>
        </div>
        <p
          data-a="0.1 0.6"
          className="m-0 max-w-[44ch] text-on-paper-2"
          style={{
            fontSize: 'clamp(15px,1.15vw,18px)',
            lineHeight: 1.55,
            opacity: 'var(--t,1)',
          }}
        >
          {positioning.lede}
        </p>
      </div>
      {narrow ? <PositioningNarrow /> : <PositioningWide />}
    </section>
  )
}

export default PositioningSection
