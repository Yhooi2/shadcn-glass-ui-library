/**
 * BadgeGlass Component
 *
 * Glass-themed badge with:
 * - Theme-aware styling via CSS variables (glass/light/aurora)
 * - Multiple variants (default, success, warning, danger, info, violet)
 * - Size options
 * - Optional animated dot
 */

import { forwardRef, type ReactNode, type CSSProperties } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { badgeVariants, type BadgeVariant } from '@/lib/variants/badge-glass-variants';
import '@/glass-theme.css';

// ========================================
// CSS VARIABLE HELPERS
// ========================================

type BadgeStyleVars = { bg: string; text: string; border: string };

const variantStyles: Record<BadgeVariant, BadgeStyleVars> = {
  default: {
    bg: 'var(--badge-default-bg)',
    text: 'var(--badge-default-text)',
    border: 'var(--badge-default-border)',
  },
  success: {
    bg: 'var(--badge-success-bg)',
    text: 'var(--badge-success-text)',
    border: 'var(--badge-success-border)',
  },
  warning: {
    bg: 'var(--badge-warning-bg)',
    text: 'var(--badge-warning-text)',
    border: 'var(--badge-warning-border)',
  },
  danger: {
    bg: 'var(--badge-danger-bg)',
    text: 'var(--badge-danger-text)',
    border: 'var(--badge-danger-border)',
  },
  info: {
    bg: 'var(--badge-primary-bg)',
    text: 'var(--badge-primary-text)',
    border: 'var(--badge-primary-border)',
  },
  violet: {
    bg: 'var(--badge-violet-bg)',
    text: 'var(--badge-violet-text)',
    border: 'var(--badge-violet-border)',
  },
};

const getBadgeStyles = (variant: BadgeVariant): CSSProperties => {
  const v = variantStyles[variant];
  return {
    background: v.bg,
    color: v.text,
    border: `1px solid ${v.border}`,
  };
};

// ========================================
// PROPS INTERFACE
// ========================================

export interface BadgeGlassProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'>,
    VariantProps<typeof badgeVariants> {
  readonly children: ReactNode;
  readonly variant?: BadgeVariant;
  readonly dot?: boolean;
}

// ========================================
// COMPONENT
// ========================================

export const BadgeGlass = forwardRef<HTMLSpanElement, BadgeGlassProps>(
  (
    { children, className, variant = 'default', size = 'md', dot, ...props },
    ref
  ) => {
    const v = variantStyles[variant];

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ size }), className)}
        style={getBadgeStyles(variant)}
        {...props}
      >
        {dot && (
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: v.text }}
          />
        )}
        {children}
      </span>
    );
  }
);

BadgeGlass.displayName = 'BadgeGlass';
