import type { ResponsiveImage } from '@/content/images'

type ImageSlotProps = {
  id: string
  placeholder: string
  image?: ResponsiveImage
  /**
   * The `sizes` attribute: how wide this slot renders, so the browser picks
   * the smallest derivative that still looks sharp. Defaults to full width.
   */
  sizes?: string
  /** The first photo the visitor reaches may load eagerly; the rest are lazy. */
  priority?: boolean
}

const srcSet = (sources: { src: string; width: number }[]) =>
  sources.map((s) => `${s.src} ${s.width}w`).join(', ')

/**
 * A photograph well. Fills the box it is placed in. Without `image` it shows
 * the design's labelled empty state: a faint frame, a dashed ring and the
 * caption, all drawn in the surrounding text colour.
 *
 * Photos come from the generated manifest (src/content/images.ts): AVIF and
 * WebP sources with a progressive JPEG fallback, each at several widths, named
 * by content hash so nginx can cache them for a year. The site is a static
 * export with Next image optimisation disabled, so <picture> is the right tool.
 */
const ImageSlot = ({
  id,
  placeholder,
  image,
  sizes = '100vw',
  priority = false,
}: ImageSlotProps) => (
  <div
    data-image-slot={id}
    className="relative block h-full w-full"
    style={{ aspectRatio: '3 / 2' }}
  >
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: 'rgba(127,127,127,.08)' }}
    >
      {image && (
        <picture>
          <source
            type="image/avif"
            srcSet={srcSet(image.sources.avif)}
            sizes={sizes}
          />
          <source
            type="image/webp"
            srcSet={srcSet(image.sources.webp)}
            sizes={sizes}
          />
          <img
            src={image.fallback.src}
            srcSet={srcSet(image.sources.jpeg)}
            sizes={sizes}
            width={image.width}
            height={image.height}
            alt={image.alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      )}
    </div>
    {!image && (
      <>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border-[1.5px] border-dashed border-current opacity-35"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-[12px] text-center">
          <span className="max-w-[90%] font-sans text-[13px] leading-[1.3] font-medium tracking-[.01em] opacity-75">
            {placeholder}
          </span>
        </div>
      </>
    )}
  </div>
)

export default ImageSlot
