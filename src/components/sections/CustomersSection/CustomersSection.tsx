import Eyebrow from '@/components/ui/Eyebrow/Eyebrow'
import ImageSlot from '@/components/ui/ImageSlot/ImageSlot'
import { customers } from '@/content/site'

/** Who We Serve: a wide photograph and the customer tags. */
const CustomersSection = () => (
  <section
    id="customers"
    data-tone="bone"
    data-nav="customers"
    className="bg-paper text-on-paper"
    style={{ scrollMarginTop: 60 }}
  >
    <div data-scene="reveal" className="relative h-[74vh]">
      <div
        data-a="0 0.9"
        className="absolute inset-0"
        style={{
          clipPath:
            'inset(calc((1 - var(--t,1)) * 10%) calc((1 - var(--t,1)) * 22%))',
        }}
      >
        <ImageSlot
          id="okwe-serve"
          placeholder={customers.imagePlaceholder}
          image={customers.image}
          sizes="100vw"
        />
      </div>
    </div>

    <div
      data-scene="reveal"
      className="grid items-start px-gutter pt-[14vh] pb-[18vh]"
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
        <Eyebrow dot="var(--acc-m2)" className="text-on-paper-3">
          {customers.eyebrow}
        </Eyebrow>
        <h2
          className="m-0 font-display font-normal text-on-paper"
          style={{
            fontSize: 'clamp(36px,4.6vw,80px)',
            lineHeight: 1,
            letterSpacing: '-.03em',
          }}
        >
          {customers.title}
        </h2>
        <p
          className="m-0 max-w-[46ch] text-on-paper-2"
          style={{ fontSize: 'clamp(15px,1.15vw,18px)', lineHeight: 1.55 }}
        >
          {customers.lede}
        </p>
      </div>
      <div
        data-a="0.1 0.6"
        className="flex flex-wrap gap-[10px]"
        style={{ opacity: 'var(--t,1)' }}
      >
        {customers.tags.map((tag) => (
          <span
            key={tag}
            data-hover=""
            className="cursor-default rounded-[3px] border border-rule bg-paper-hi font-display hover:border-on-paper hover:bg-on-paper hover:text-paper-hi"
            style={{
              fontSize: 'clamp(22px,2.4vw,40px)',
              lineHeight: 1,
              letterSpacing: '-.015em',
              padding: '.28em .45em .32em',
              transition: 'background 120ms,color 120ms,border-color 120ms',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </section>
)

export default CustomersSection
