type ImageSlotProps = {
  id: string
  placeholder: string
  src?: string
  alt?: string
}

/**
 * A photograph well. Fills the box it is placed in. Without `src` it shows
 * the design's labelled empty state: a faint frame, a dashed ring and the
 * caption, all drawn in the surrounding text colour.
 */
const ImageSlot = ({ id, placeholder, src, alt = '' }: ImageSlotProps) => (
  <div
    data-image-slot={id}
    className="relative block h-full w-full"
    style={{ aspectRatio: '3 / 2' }}
  >
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: 'rgba(127,127,127,.08)' }}
    >
      {src && (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      )}
    </div>
    {!src && (
      <>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border-[1.5px] border-dashed border-current opacity-35"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-[12px] text-center">
          <span className="max-w-[90%] font-sans text-[13px] font-medium leading-[1.3] tracking-[.01em] opacity-75">
            {placeholder}
          </span>
        </div>
      </>
    )}
  </div>
)

export default ImageSlot
