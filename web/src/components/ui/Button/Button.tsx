import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg'

type Common = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  children?: ReactNode
}

type AnchorProps = Common & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'className' | 'children'
  >
type NativeButtonProps = Common & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'children'
  >

export type ButtonProps = AnchorProps | NativeButtonProps

const base =
  'inline-flex cursor-pointer items-center justify-center gap-[var(--space-3)] whitespace-nowrap rounded-[var(--radius-sm)] border border-transparent font-sans font-semibold no-underline [transition:var(--transition-control)]'

const sizes: Record<ButtonSize, string> = {
  sm: 'h-[var(--control-height-sm)] px-[var(--space-4)] text-[length:var(--size-2xs)] tracking-[0.02em]',
  md: 'h-[var(--control-height-md)] px-[var(--space-6)] text-[length:var(--size-sm)]',
  lg: 'h-[var(--control-height-lg)] px-[var(--space-7)] text-[length:var(--size-md)]',
}

/* Hover colours are repeated for text so the design-system `a:hover` rule
   never wins over the variant colour. */
const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-interactive-bg text-interactive-fg hover:bg-interactive-bg-hover hover:text-interactive-fg',
  accent:
    'bg-interactive-accent text-interactive-fg hover:bg-interactive-accent-hover hover:text-interactive-fg',
  secondary:
    'border-border-strong bg-transparent text-text-display hover:bg-interactive-quiet-hover hover:text-text-display',
  link: 'h-auto rounded-none border-0 border-b border-current bg-transparent p-0 text-text-link hover:text-text-link-hover',
}

/** The design-system Button. Renders an anchor when `href` is given. */
const Button = (props: ButtonProps) => {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    children,
    ...rest
  } = props
  const classes = [
    base,
    variant === 'link' ? '' : sizes[size],
    variants[variant],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if ('href' in rest && typeof rest.href === 'string') {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    )
  }
  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  )
}

export default Button
