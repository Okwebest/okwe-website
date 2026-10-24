'use client'

import Eyebrow from '@/components/ui/Eyebrow/Eyebrow'
import { brand, contact } from '@/content/site'
import { useClock } from '@/hooks/useClock'

import EnquiryForm from './EnquiryForm'

const label = 'font-mono text-[11px] uppercase tracking-label text-on-paper-3'
const channel =
  'self-start border-0 border-b border-acc-m2 font-display text-[26px] text-on-paper hover:text-on-paper'

/** Contact: the final chapter, also served standalone at /contact. */
const ContactSection = () => {
  const clock = useClock()

  return (
    <section
      id="contact"
      data-tone="bone"
      data-nav="contact"
      className="bg-paper px-gutter pt-[16vh] pb-[14vh] text-on-paper"
      style={{ scrollMarginTop: 60 }}
    >
      <div className="flex max-w-[1000px] flex-col gap-[24px] border-b-2 border-on-paper pb-[8vh]">
        <Eyebrow dot="var(--acc-m2)" className="text-on-paper-3">
          {contact.eyebrow}
        </Eyebrow>
        <h2
          className="m-0 font-display font-normal text-on-paper"
          style={{
            fontSize: 'clamp(40px,5.4vw,96px)',
            lineHeight: 0.98,
            letterSpacing: '-.035em',
          }}
        >
          {contact.title}
        </h2>
        <p
          className="m-0 max-w-[52ch] font-light text-on-paper-2"
          style={{ fontSize: 'clamp(17px,1.4vw,21px)', lineHeight: 1.5 }}
        >
          {contact.lede}
        </p>
      </div>

      <div className="flex flex-wrap pt-[8vh]" style={{ gap: '56px 6vw' }}>
        <div
          className="flex min-w-0 flex-col gap-[32px]"
          style={{ flex: '1 1 280px' }}
        >
          <h3 className="m-0 font-sans text-[20px] font-semibold text-on-paper">
            {contact.getInTouch}
          </h3>
          <div className="flex flex-col gap-[6px]">
            <span className={label}>
              {contact.whatsappLabel}
              <span className="ml-[10px] text-acc-m2">
                · {contact.whatsappHint}
              </span>
            </span>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={channel}
            >
              {contact.whatsapp}
            </a>
          </div>
          <div className="flex flex-col gap-[6px]">
            <span className={label}>{contact.phoneLabel}</span>
            <a href={contact.phoneHref} className={channel}>
              {contact.phone}
            </a>
          </div>
          <div className="flex flex-col gap-[6px]">
            <span className={label}>{contact.emailLabel}</span>
            <a href={`mailto:${contact.email}`} className={channel}>
              {contact.email}
            </a>
          </div>
          <div className="flex flex-col gap-[6px]">
            <span className={label}>{contact.locationLabel}</span>
            <span className="font-display text-[26px]">{contact.location}</span>
            <span className="font-mono text-[11px] tracking-[.08em] text-on-paper-3">
              {brand.coordinates} · {brand.timezone}{' '}
              <span data-clock="">{clock}</span>
            </span>
          </div>
          <div className="flex flex-col gap-[10px] border-t border-rule pt-[24px]">
            <span className={label}>{contact.promiseLabel}</span>
            <p className="m-0 text-[16px] leading-[1.55] text-on-paper-2">
              {contact.promise}
            </p>
          </div>
        </div>

        <div className="relative min-w-0" style={{ flex: '2 1 480px' }}>
          <EnquiryForm />
        </div>
      </div>
    </section>
  )
}

export default ContactSection
