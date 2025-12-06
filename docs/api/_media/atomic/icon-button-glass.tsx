// ========================================
// ICON BUTTON GLASS - ATOMIC COMPONENT
// Glassmorphism icon button with responsive touch targets
// Level 2: Atomic (extracted from HeaderNavGlass)
// ========================================

import { forwardRef, type ButtonHTMLAttributes, type CSSProperties } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

const iconButtonVariants = cva(
  'rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        // Touch target: 44px minimum for mobile (WCAG 2.1 AA)
        touch: 'w-11 h-11 md:w-10 md:h-10',
      },
      variant: {
        gradient: '',
        subtle: '',
        ghost: 'bg-transparent hover:bg-white/10',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'gradient',
    },
  }
);

export interface IconButtonGlassProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Lucide icon component */
  readonly icon: LucideIcon;
  /** Icon size in pixels (default: 20) */
  readonly iconSize?: number;
  /** Accessible label for screen readers */
  readonly 'aria-label': string;
}

export const IconButtonGlass = forwardRef<HTMLButtonElement, IconButtonGlassProps>(
  (
    {
      icon: Icon,
      iconSize = 20,
      size,
      variant,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const gradientStyles: CSSProperties | undefined =
      variant === 'gradient'
        ? {
            background:
              'linear-gradient(135deg, var(--icon-btn-from), var(--icon-btn-to))',
            boxShadow: 'var(--icon-btn-shadow)',
          }
        : undefined;

    const subtleStyles: CSSProperties | undefined =
      variant === 'subtle'
        ? {
            background: 'var(--card-subtle-bg)',
            border: '1px solid var(--card-subtle-border)',
          }
        : undefined;

    const iconStyles: CSSProperties = {
      color: 'var(--icon-btn-text)',
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        className={cn(iconButtonVariants({ size, variant }), className)}
        style={gradientStyles ?? subtleStyles}
        {...props}
      >
        <Icon size={iconSize} style={iconStyles} />
      </button>
    );
  }
);

IconButtonGlass.displayName = 'IconButtonGlass';
