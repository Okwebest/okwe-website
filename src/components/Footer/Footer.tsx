import Link from 'next/link'

import OkweRow from '@/components/ui/OkweRow/OkweRow'
import { brand, contact, footer } from '@/content/site'

const columnLabel =
  'mb-[6px] font-mono text-[11px] tracking-label text-bone-50 uppercase'
const quietLink = 'border-0 text-ink-200 hover:text-bone-50'

const Footer = () => (
  <footer
    data-tone="ink"
    data-theme="dark"
    className="overflow-hidden bg-ink-900 px-gutter pt-[12vh] pb-[40px] text-ink-200"
  >
    <div
      className="grid"
      style={{
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,150px),1fr))',
        gap: '40px 4vw',
      }}
    >
      <div className="col-span-full flex min-w-0 flex-col gap-[18px]">
        <span className="flex items-center gap-[12px] text-bone-50">
          <OkweRow />
          <span className="text-[18px] font-bold tracking-[.05em]">
            {brand.wordmark}
          </span>
        </span>
        <p className="m-0 max-w-[36ch] text-[15px] leading-[1.55] text-ink-300">
          {footer.blurb}
        </p>
      </div>

      <div className="flex flex-col gap-[12px] text-[14px]">
        <span className={columnLabel}>{footer.services.label}</span>
        {footer.services.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`border-0 text-ink-200 ${link.hover}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-[12px] text-[14px]">
        <span className={columnLabel}>{footer.company.label}</span>
        {footer.company.links.map((link) => (
          <Link key={link.href} href={link.href} className={quietLink}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-[12px] text-[14px]">
        <span className={columnLabel}>{footer.legal.label}</span>
        {footer.legal.links.map((link) => (
          <Link key={link.href} href={link.href} className={quietLink}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-[12px] text-[14px]">
        <span className={columnLabel}>{footer.contactLabel}</span>
        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={quietLink}
        >
          {contact.whatsappLabel} {contact.whatsapp}
        </a>
        <a href={contact.phoneHref} className={quietLink}>
          {contact.phone}
        </a>
        <a href={`mailto:${contact.email}`} className={quietLink}>
          {contact.email}
        </a>
        <span>{contact.location}</span>
      </div>
    </div>

    <div className="mt-[10vh] font-display text-[17vw] leading-[.8] tracking-[-.05em] whitespace-nowrap text-ink-700">
      {footer.watermark}
    </div>

    <div className="mt-[32px] flex flex-wrap justify-between gap-[12px] border-t border-bone-50/[.18] pt-[24px] font-mono text-[11px] tracking-[.08em] text-ink-300">
      <span>
        © {new Date().getFullYear()} {footer.rights}
      </span>
      <span className="tracking-label text-persimmon-400 uppercase">
        {footer.tagline}
      </span>
    </div>
  </footer>
)

export default Footer
