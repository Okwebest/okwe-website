import type { SelectHTMLAttributes } from 'react'

type Size = 'sm' | 'md' | 'lg'

export type SelectOption = { label: string; value: string }

type SelectProps = {
  /** Plain strings are used as both label and value. */
  options: (string | SelectOption)[]
  size?: Size
  invalid?: boolean
  className?: string
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'className'>

const heights: Record<Size, string> = {
  sm: 'h-[var(--control-height-sm)]',
  md: 'h-[var(--control-height-md)]',
  lg: 'h-[var(--control-height-lg)]',
}

const normalise = (option: string | SelectOption): SelectOption =>
  typeof option === 'string' ? { label: option, value: option } : option

/** The design-system Select with its two-gradient chevron. */
const Select = ({
  options,
  size = 'md',
  invalid = false,
  className = '',
  ...rest
}: SelectProps) => (
  <select
    {...rest}
    className={`w-full min-w-0 cursor-pointer appearance-none rounded-[var(--radius-sm)] border bg-surface-card pr-[var(--space-7)] pl-[var(--space-4)] font-sans text-[length:var(--size-md)] text-text-body ${
      invalid ? 'border-status-danger' : 'border-border-hairline'
    } ${heights[size]} ${className}`}
    style={{
      backgroundImage:
        'linear-gradient(45deg,transparent 50%,var(--text-muted) 50%),linear-gradient(135deg,var(--text-muted) 50%,transparent 50%)',
      backgroundPosition: 'calc(100% - 16px) 50%,calc(100% - 11px) 50%',
      backgroundSize: '5px 5px,5px 5px',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {options.map(normalise).map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
)

export default Select
