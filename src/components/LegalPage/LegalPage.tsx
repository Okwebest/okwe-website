'use client'

import Link from 'next/link'

import Button from '@/components/ui/Button/Button'
import Eyebrow from '@/components/ui/Eyebrow/Eyebrow'
import type { LegalDoc, LegalSection } from '@/content/legal'
import { legalDocs, legalPage } from '@/content/legal'
import { useNarrow } from '@/hooks/useNarrow'

const label = 'font-mono text-[11px] uppercase tracking-label text-on-paper-3'

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

const anchorId = (doc: LegalDoc, s: LegalSection) =>
  `${doc.slug}-${s.code.slice(2)}`

const ContentsLinks = ({ doc }: { doc: LegalDoc }) => (
  <>
    {doc.sections.map((s) => (
      <a
        key={s.code}
        href={`#${anchorId(doc, s)}`}
        className="grid gap-[12px] border-0 py-[2px] text-[14px] leading-[1.4] text-on-paper-2 hover:text-on-paper"
        style={{ gridTemplateColumns: '40px minmax(0,1fr)' }}
      >
        <span className="font-mono text-[11px] tracking-[.1em] text-on-paper-3">
          {s.code}
        </span>
        {s.heading}
      </a>
    ))}
  </>
)

type LegalPageProps = {
  doc: LegalDoc
}

/**
 * A legal document in the site's editorial voice: the contact chapter's header,
 * then a contents list beside numbered sections ruled like the FAQ. On wide
 * screens the contents stick beside the text; on phones they collapse into a
 * disclosure above it (a sticky block there would slide over the article).
 * Everything is set in the paper tokens so dark mode needs no extra rules.
 */
const LegalPage = ({ doc }: LegalPageProps) => {
  const narrow = useNarrow()
  const others = legalDocs.filter((d) => d.slug !== doc.slug)

  return (
    <section
      id={doc.slug}
      data-tone="bone"
      className="bg-paper px-gutter pt-[16vh] pb-[14vh] text-on-paper"
      style={{ scrollMarginTop: 60 }}
    >
      <header className="flex max-w-[1000px] flex-col gap-[24px] border-b-2 border-on-paper pb-[8vh]">
        <Eyebrow dot="var(--acc-m2)" className="text-on-paper-3">
          {doc.eyebrow}
        </Eyebrow>
        <h1
          className="m-0 font-display font-normal text-on-paper"
          style={{
            fontSize: 'clamp(34px,9vw,96px)',
            lineHeight: 0.98,
            letterSpacing: '-.035em',
            overflowWrap: 'anywhere',
          }}
        >
          {doc.title}
        </h1>
        <p
          className="m-0 max-w-[52ch] font-light text-on-paper-2"
          style={{ fontSize: 'clamp(17px,1.4vw,21px)', lineHeight: 1.5 }}
        >
          {doc.summary}
        </p>
      </header>

      <div className="flex flex-wrap pt-[8vh]" style={{ gap: '40px 6vw' }}>
        <aside
          className="flex min-w-0 flex-col gap-[28px] self-start wide:sticky wide:top-[84px]"
          style={{ flex: '1 1 260px' }}
        >
          <div
            className="grid gap-[20px]"
            style={{
              gridTemplateColumns:
                'repeat(auto-fit,minmax(min(100%,160px),1fr))',
            }}
          >
            <div className="flex flex-col gap-[6px]">
              <span className={label}>{legalPage.effectiveLabel}</span>
              <span className="font-display text-[22px]">
                {formatDate(doc.effectiveDate)}
              </span>
            </div>
            <div className="flex flex-col gap-[6px]">
              <span className={label}>{legalPage.appliesLabel}</span>
              <span className="text-[15px] leading-[1.5] text-on-paper-2">
                {doc.appliesTo}
              </span>
            </div>
          </div>
          {narrow ? (
            <details className="border-t border-b border-rule">
              <summary
                className={`${label} flex cursor-pointer list-none items-center justify-between py-[14px] text-on-paper`}
              >
                {legalPage.contentsLabel}
                <span aria-hidden="true" className="font-mono text-[16px]">
                  +
                </span>
              </summary>
              <nav
                aria-label={legalPage.contentsLabel}
                className="flex flex-col gap-[8px] pb-[16px]"
              >
                <ContentsLinks doc={doc} />
              </nav>
            </details>
          ) : (
            <nav
              aria-label={legalPage.contentsLabel}
              className="flex flex-col gap-[10px] border-t border-rule pt-[20px]"
            >
              <span className={label}>{legalPage.contentsLabel}</span>
              <ContentsLinks doc={doc} />
            </nav>
          )}
        </aside>

        <article
          className="min-w-0 border-t-2 border-on-paper"
          style={{ flex: '2 1 480px' }}
        >
          {doc.sections.map((s) => (
            <section
              key={s.code}
              id={anchorId(doc, s)}
              className="grid gap-[10px] border-b border-rule py-[28px] wide:gap-[12px] wide:py-[32px]"
              style={{
                gridTemplateColumns: narrow
                  ? 'minmax(0,1fr)'
                  : '44px minmax(0,1fr)',
                scrollMarginTop: 84,
              }}
            >
              <span className="font-mono text-[11px] tracking-[.1em] text-on-paper-3 wide:pt-[8px]">
                {s.code}
              </span>
              <div className="flex max-w-[70ch] min-w-0 flex-col gap-[16px]">
                <h2
                  className="m-0 font-display font-normal text-on-paper"
                  style={{
                    fontSize: 'clamp(22px,5.6vw,32px)',
                    lineHeight: 1.2,
                    letterSpacing: '-.01em',
                  }}
                >
                  {s.heading}
                </h2>
                {s.paragraphs.map((p) => (
                  <p
                    key={p}
                    className="m-0 text-[16px] leading-[1.6] text-on-paper-2 wide:text-[17px]"
                  >
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="grid gap-[14px] text-[15px] leading-[1.55] text-on-paper-2 wide:text-[16px]"
                        style={{ gridTemplateColumns: '14px minmax(0,1fr)' }}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[12px] h-px w-[14px] bg-acc-m2"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {s.after?.map((p) => (
                  <p
                    key={p}
                    className="m-0 text-[16px] leading-[1.6] text-on-paper-2 wide:text-[17px]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div
            className="grid gap-[24px] pt-[40px]"
            style={{
              gridTemplateColumns:
                'repeat(auto-fit,minmax(min(100%,260px),1fr))',
            }}
          >
            <div className="flex flex-col gap-[12px]">
              <h2 className="m-0 font-sans text-[20px] font-semibold text-on-paper">
                {legalPage.questionsTitle}
              </h2>
              <p className="m-0 text-[16px] leading-[1.55] text-on-paper-2">
                {legalPage.questionsText}
              </p>
              <Button variant="link" href="/contact" className="self-start">
                {legalPage.questionsCta}
              </Button>
            </div>
            <div className="flex flex-col gap-[10px]">
              <span className={label}>{legalPage.otherLabel}</span>
              {others.map((d) => (
                <Link
                  key={d.slug}
                  href={`/legal/${d.slug}`}
                  className="self-start border-0 border-b border-rule font-display text-[20px] text-on-paper hover:border-on-paper hover:text-on-paper"
                >
                  {d.title}
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default LegalPage
