import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type Size = 'sm' | 'md' | 'lg'

type BaseProps = {
  size?: Size
  invalid?: boolean
  className?: string
}

type SingleLineProps = BaseProps & { multiline?: false } & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'className'
  >
type MultiLineProps = BaseProps & { multiline: true; rows?: number } & Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'className'
  >

export type InputProps = SingleLineProps | MultiLineProps

const heights: Record<Size, string> = {
  sm: 'h-[var(--control-height-sm)]',
  md: 'h-[var(--control-height-md)]',
  lg: 'h-[var(--control-height-lg)]',
}

const shell =
  'w-full min-w-0 rounded-[var(--radius-sm)] border bg-surface-card font-sans text-text-body [transition:var(--transition-control)]'

const shellClasses = (size: Size, invalid: boolean) =>
  [
    shell,
    invalid ? 'border-status-danger' : 'border-border-hairline',
    size === 'sm'
      ? 'text-[length:var(--size-sm)]'
      : 'text-[length:var(--size-md)]',
  ].join(' ')

const MultiLine = ({
  size = 'md',
  invalid = false,
  className = '',
  rows = 4,
  ...rest
}: Omit<MultiLineProps, 'multiline'>) => (
  <textarea
    rows={rows}
    {...rest}
    className={`${shellClasses(size, invalid)} resize-y p-[var(--space-4)] leading-[var(--leading-body)] ${className}`}
  />
)

const SingleLine = ({
  size = 'md',
  invalid = false,
  className = '',
  ...rest
}: Omit<SingleLineProps, 'multiline'>) => (
  <input
    {...rest}
    className={`${shellClasses(size, invalid)} ${heights[size]} px-[var(--space-4)] leading-normal ${className}`}
  />
)

/** The design-system Input, single-line or multi-line. */
const Input = (props: InputProps) => {
  if (props.multiline === true) {
    const { multiline, ...rest } = props
    void multiline
    return <MultiLine {...rest} />
  }
  const { multiline, ...rest } = props as SingleLineProps
  void multiline
  return <SingleLine {...rest} />
}

export default Input
