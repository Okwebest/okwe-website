import type { ReactNode } from 'react'

type FieldProps = {
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
  className?: string
}

/**
 * The design-system Field: a <label> that wraps its control, so no id wiring
 * is needed and the whole block is clickable.
 */
const Field = ({
  label,
  required = false,
  hint,
  children,
  className = '',
}: FieldProps) => (
  <label className={`flex min-w-0 flex-col gap-[var(--space-3)] ${className}`}>
    <span className="font-mono text-[length:var(--size-2xs)] leading-[1.2] font-semibold tracking-[var(--tracking-label)] text-text-secondary uppercase">
      {label}
      {required && <span className="text-text-accent"> *</span>}
    </span>
    {children}
    {hint && (
      <span className="font-sans text-[length:var(--size-xs)] leading-[var(--leading-body)] text-text-muted">
        {hint}
      </span>
    )}
  </label>
)

export default Field
