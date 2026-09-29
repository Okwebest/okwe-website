import ImageSlot from 'src/components/ui/ImageSlot/ImageSlot'
import { move, siteConfig } from 'src/content/site'
import { useNarrow } from 'src/hooks/useNarrow'

const stopLeft = ['130vw', '158vw', '186vw', '214vw', '242vw', '270vw']
const stopWindows = [
  '0.29 0.31',
  '0.4 0.42',
  '0.51 0.53',
  '0.62 0.64',
  '0.73 0.75',
  '0.84 0.86',
]

const monoLabel = 'font-mono text-[11px] uppercase tracking-label'

/* The dashed route line advances 18 dash units/s (1400 per cycle) and 90/s
   while the pinned stage is hovered — see @keyframes okwe-flow. */
const flowAnimation = siteConfig.ambientMotion
  ? '[animation:okwe-flow_77.8s_linear_infinite] group-hover:[animation-duration:15.6s] motion-reduce:[animation:none]'
  : ''

const MoveWide = () => (
  <section
    id="move"
    data-scene="sticky"
    data-tone="move"
    data-nav="move"
    data-theme="dark"
    className="relative h-[360vh] bg-persimmon-600 text-bone-50"
    style={{ scrollMarginTop: 60 }}
  >
    <div className="group sticky top-0 h-screen overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full w-[360vw] will-change-transform"
        style={{ transform: 'translateX(calc(var(--p,0) * -260vw))' }}
      >
        <div
          className={`absolute left-gutter top-[92px] flex justify-between ${monoLabel}`}
          style={{ right: 'calc(260vw + clamp(20px,5vw,88px))' }}
        >
          <span>{move.counter}</span>
          <span>{move.category}</span>
        </div>
        <div
          className="absolute left-gutter top-[20vh] font-display italic"
          style={{ fontSize: 'clamp(32px,4.4vw,76px)', lineHeight: 1 }}
        >
          Okwe
        </div>
        <div
          className="absolute bottom-[-3.4vw] left-[3.4vw] whitespace-nowrap font-display"
          style={{ fontSize: '24vw', lineHeight: 1, letterSpacing: '-.055em' }}
        >
          Move
        </div>
        <div className="absolute left-[62vw] top-[20vh] flex w-[31vw] flex-col gap-[32px]">
          <p
            className="m-0 font-display"
            style={{
              fontSize: 'clamp(22px,2.1vw,36px)',
              lineHeight: 1.22,
              letterSpacing: '-.015em',
            }}
          >
            {move.statement}
          </p>
          <div className="flex flex-col gap-[10px] border-t-2 border-bone-50 pt-[18px]">
            <span className={monoLabel}>{move.purposeLabel}</span>
            <p className="m-0 text-[17px] leading-[1.55]">{move.purpose}</p>
          </div>
          <span className={`${monoLabel} opacity-80`}>{move.scrollHint}</span>
        </div>

        <svg
          className="absolute left-[110vw] h-[2px] w-[182vw] overflow-visible"
          style={{ top: 'calc(58vh - 1px)' }}
          viewBox="0 0 1000 2"
          preserveAspectRatio="none"
        >
          <line
            data-flow=""
            x1="0"
            y1="1"
            x2="1000"
            y2="1"
            stroke="#FBFAF6"
            strokeOpacity=".55"
            strokeWidth="1"
            strokeDasharray="6 8"
            vectorEffect="non-scaling-stroke"
            className={flowAnimation}
          />
        </svg>
        <div
          className="absolute left-[110vw] h-[2px] bg-bone-50"
          style={{
            top: 'calc(58vh - 1px)',
            width: 'clamp(0vw, calc(var(--p,0) * 260vw - 60vw), 182vw)',
          }}
        />

        <div className="absolute left-[110vw] top-[58vh] h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 bg-bone-50" />
        <div
          className={`absolute left-[110vw] -translate-x-1/2 ${monoLabel}`}
          style={{ top: 'calc(58vh - 52px)' }}
        >
          {move.origin}
        </div>

        {move.stops.map((stop, i) => (
          <div
            key={stop.code}
            data-a={stopWindows[i]}
            className="absolute top-[58vh] w-[22vw]"
            style={{ left: stopLeft[i], transform: 'translateY(-7px)' }}
          >
            <div
              className="grid h-[14px] w-[14px] -translate-x-[7px] place-items-center rounded-full"
              style={{ boxShadow: 'inset 0 0 0 1.5px var(--bone-50)' }}
            >
              <i
                className="block h-[14px] w-[14px] rounded-full bg-bone-50"
                style={{ opacity: 'var(--t,0)' }}
              />
            </div>
            <span className="absolute left-[-7px] top-[-40px] font-mono text-[11px] tracking-label">
              {stop.code}
            </span>
            <p
              className="font-display"
              style={{
                margin: '28px 0 0 -7px',
                fontSize: 'clamp(20px,2.2vw,38px)',
                lineHeight: 1.1,
                letterSpacing: '-.015em',
                opacity: 'calc(.55 + var(--t,0) * .45)',
              }}
            >
              {stop.text}
            </p>
          </div>
        ))}

        <div className="absolute left-[292vw] top-[58vh] h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 bg-bone-50" />
        <div
          className={`absolute left-[292vw] -translate-x-1/2 ${monoLabel}`}
          style={{ top: 'calc(58vh - 52px)' }}
        >
          {move.destination}
        </div>

        <div className="absolute left-[300vw] top-0 h-full w-[60vw]">
          <ImageSlot
            id="okwe-move"
            placeholder={move.imagePlaceholderWide}
            src={move.image}
            alt={move.imageAlt}
          />
        </div>
      </div>

      <div
        data-a="0.2 0.24"
        className="pointer-events-none absolute left-[50vw] top-[58vh]"
        style={{ opacity: 'var(--t,0)' }}
      >
        <div
          data-a="0.925 0.95"
          style={{
            opacity: 'calc(1 - var(--t,0))',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <div
            className="h-[22px] w-[22px] bg-ink-900"
            style={{
              boxShadow:
                '0 0 0 4px var(--persimmon-600),0 0 0 5px var(--bone-50)',
            }}
          />
        </div>
      </div>
    </div>
  </section>
)

const MoveNarrow = () => (
  <section
    id="move"
    data-tone="move"
    data-nav="move"
    data-theme="dark"
    className="overflow-hidden bg-persimmon-600 text-bone-50"
    style={{ scrollMarginTop: 60 }}
  >
    <div
      data-scene="reveal"
      className="relative flex flex-col gap-[12px] px-[20px] pt-[12vh]"
    >
      <div className={`flex justify-between ${monoLabel}`}>
        <span>{move.counter}</span>
        <span>{move.category}</span>
      </div>
      <div
        data-a="0 0.6"
        className="mt-[4vh] font-display text-[40px] italic leading-none"
        style={{ opacity: 'var(--t,1)' }}
      >
        Okwe
      </div>
      <div
        data-a="0 0.8"
        className="font-display"
        style={{
          fontSize: '38vw',
          lineHeight: 0.82,
          letterSpacing: '-.055em',
          marginLeft: '-1.5vw',
          transform: 'translateX(calc((1 - var(--t,1)) * -10vw))',
        }}
      >
        Move
      </div>
    </div>

    <div
      data-scene="reveal"
      className="flex flex-col gap-[28px] px-[20px] pb-[4vh] pt-[6vh]"
    >
      <p
        data-a="0 0.5"
        className="m-0 font-display text-[24px]"
        style={{ lineHeight: 1.25, opacity: 'var(--t,1)' }}
      >
        {move.statement}
      </p>
      <div className="flex flex-col gap-[8px] border-t-2 border-bone-50 pt-[16px]">
        <span className={monoLabel}>{move.purposeLabel}</span>
        <p className="m-0 text-[16px] leading-[1.55]">{move.purpose}</p>
      </div>
    </div>

    <div className="relative mx-[20px] mb-[8vh] mt-[4vh] pl-[36px]">
      <div
        className="absolute bottom-[8px] left-[6px] top-[8px] w-px"
        style={{ background: 'rgba(251,250,246,.45)' }}
      />
      <div className="flex flex-col gap-[6px] pb-[28px]">
        <span className="absolute left-0 h-[13px] w-[13px] bg-bone-50" />
        <span className={monoLabel}>{move.origin}</span>
      </div>
      {move.stops.map((stop) => (
        <div key={stop.code} data-scene="reveal" className="relative pb-[28px]">
          <div data-a="0.3 0.6" className="flex flex-col gap-[6px]">
            <span
              className="absolute left-[-36px] top-[2px] h-[13px] w-[13px] rounded-full"
              style={{
                boxShadow: 'inset 0 0 0 1.5px var(--bone-50)',
                background: 'rgba(251,250,246,var(--t,1))',
              }}
            />
            <span className="font-mono text-[11px] tracking-label">
              {stop.code}
            </span>
            <span
              className="font-display text-[26px]"
              style={{ lineHeight: 1.15 }}
            >
              {stop.text}
            </span>
          </div>
        </div>
      ))}
      <div className="relative flex flex-col gap-[6px]">
        <span className="absolute left-[-36px] top-0 h-[13px] w-[13px] bg-bone-50" />
        <span className={monoLabel}>{move.destination}</span>
      </div>
    </div>

    <div data-scene="reveal" className="relative h-[60vh]">
      <div
        data-a="0 0.8"
        className="absolute inset-0"
        style={{ clipPath: 'inset(calc((1 - var(--t,1)) * 100%) 0 0 0)' }}
      >
        <ImageSlot
          id="okwe-move"
          placeholder={move.imagePlaceholderNarrow}
          src={move.image}
          alt={move.imageAlt}
        />
      </div>
    </div>
  </section>
)

/** Chapter 03 — Okwe Move: the route that runs sideways. */
const MoveSection = () => {
  const narrow = useNarrow()
  return narrow ? <MoveNarrow /> : <MoveWide />
}

export default MoveSection
