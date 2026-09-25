import { Fragment } from 'react'

import Eyebrow from 'src/components/ui/Eyebrow/Eyebrow'
import { promise } from 'src/content/site'

/** The Okwe Promise on lagoon: the headline lands word by word. */
const PromiseSection = () => (
  <section
    data-tone="lagoon"
    data-theme="dark"
    className="bg-lagoon-600 px-gutter pb-[16vh] pt-[18vh] text-bone-50"
  >
    <div data-scene="reveal" className="flex flex-col gap-[5vh]">
      <Eyebrow dot="var(--bone-50)">{promise.eyebrow}</Eyebrow>
      <h2
        className="m-0 max-w-[17ch] font-display font-normal text-bone-50"
        style={{
          fontSize: 'clamp(40px,6.4vw,118px)',
          lineHeight: 1,
          letterSpacing: '-.035em',
        }}
      >
        {promise.words.map((word, i) => {
          const style = { opacity: 'calc(.22 + var(--t,1) * .78)' }
          return (
            <Fragment key={`${word.text}-${i}`}>
              {i > 0 && ' '}
              {word.em ? (
                <em data-a={word.a} className="text-brass-300" style={style}>
                  {word.text}
                </em>
              ) : (
                <span data-a={word.a} style={style}>
                  {word.text}
                </span>
              )}
            </Fragment>
          )
        })}
      </h2>
    </div>

    <div data-scene="reveal" className="mt-[12vh] border-t border-bone-50/[.3]">
      {promise.rows.map((row) => (
        <div
          key={row.n}
          data-a={row.a}
          className="grid items-baseline border-b border-bone-50/[.3] py-[4vh]"
          style={{
            gridTemplateColumns:
              '48px repeat(auto-fit,minmax(min(100%,220px),1fr))',
            gap: '8px 4vw',
            opacity: 'var(--t,1)',
            transform: 'translateY(calc((1 - var(--t,1)) * 16px))',
          }}
        >
          <span className="font-mono text-[12px] tracking-[.1em]">{row.n}</span>
          <span
            className="font-display"
            style={{
              fontSize: 'clamp(28px,3.2vw,56px)',
              lineHeight: 1,
              letterSpacing: '-.025em',
            }}
          >
            {row.word}
          </span>
          <p
            className="m-0 text-lagoon-100"
            style={{ fontSize: 'clamp(15px,1.2vw,19px)', lineHeight: 1.5 }}
          >
            {row.text}
          </p>
        </div>
      ))}
    </div>
  </section>
)

export default PromiseSection
