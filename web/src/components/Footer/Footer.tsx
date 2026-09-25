import OkweRow from 'src/components/ui/OkweRow/OkweRow'
import { brand, contact, footer } from 'src/content/site'

const Footer = () => (
  <footer
    data-tone="ink"
    data-theme="dark"
    className="overflow-hidden bg-ink-900 px-gutter pb-[40px] pt-[12vh] text-ink-200"
  >
    <div
      className="grid"
      style={{
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))',
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
        <span className="mb-[6px] font-mono text-[11px] uppercase tracking-label text-bone-50">
          {footer.services.label}
        </span>
        {footer.services.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`border-0 text-ink-200 ${link.hover}`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-[12px] text-[14px]">
        <span className="mb-[6px] font-mono text-[11px] uppercase tracking-label text-bone-50">
          {footer.company.label}
        </span>
        {footer.company.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="border-0 text-ink-200 hover:text-bone-50"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-[12px] text-[14px]">
        <span className="mb-[6px] font-mono text-[11px] uppercase tracking-label text-bone-50">
          {footer.contactLabel}
        </span>
        <span>{contact.email}</span>
        <span>{contact.phone}</span>
        <span>{contact.location}</span>
      </div>
    </div>

    <div className="mt-[10vh] whitespace-nowrap font-display text-[17vw] leading-[.8] tracking-[-.05em] text-ink-700">
      {footer.watermark}
    </div>

    <div className="mt-[32px] flex flex-wrap justify-between gap-[12px] border-t border-bone-50/[.18] pt-[24px] font-mono text-[11px] tracking-[.08em] text-ink-300">
      <span>
        © {new Date().getFullYear()} {footer.rights}
      </span>
      <span className="uppercase tracking-label text-persimmon-400">
        {footer.tagline}
      </span>
    </div>
  </footer>
)

export default Footer
