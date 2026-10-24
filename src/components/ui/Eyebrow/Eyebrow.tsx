import type { ReactNode } from 'react'

type EyebrowProps = {
  /** CSS colour for the 7px dot. */
  dot: string
  className?: string
  children: ReactNode
}

/** Mono section label with the round marker dot, as used above every heading. */
const Eyebrow = ({ dot, className = '', children }: EyebrowProps) => (
  <p
    className={`m-0 flex items-center gap-[10px] font-mono text-[12px] tracking-eyebrow uppercase ${className}`}
  >
    <span
      className="h-[7px] w-[7px] rounded-full"
      style={{ background: dot }}
    />
    {children}
  </p>
)

export default Eyebrow
