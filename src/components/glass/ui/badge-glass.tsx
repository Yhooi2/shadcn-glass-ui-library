/**
 * BadgeGlass Component
 *
 * Glass-themed badge with:
 * - Theme-aware styling via CSS variables (glass/light/aurora)
 * - shadcn/ui compatible variants (default, secondary, destructive, outline)
 * - Extended Glass UI variants (success, warning, info)
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
  // shadcn/ui compatible variants
  default: {
    bg: 'var(--badge-default-bg)',
    text: 'var(--badge-default-text)',
    border: 'var(--badge-default-border)',
  },
  secondary: {
    bg: 'var(--badge-secondary-bg)',
    text: 'var(--badge-secondary-text)',
    border: 'var(--badge-secondary-border)',
  },
  destructive: {
    bg: 'var(--badge-destructive-bg)',
    text: 'var(--badge-destructive-text)',
    border: 'var(--badge-destructive-border)',
  },
  outline: {
    bg: 'var(--badge-outline-bg)',
    text: 'var(--badge-outline-text)',
    border: 'var(--badge-outline-border)',
  },
  // Glass UI extended variants
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
  info: {
    bg: 'var(--badge-info-bg)',
    text: 'var(--badge-info-text)',
    border: 'var(--badge-info-border)',
  },
};

const getBadgeStyles = (variant: BadgeVariant): CSSProperties => {
  const v = variantStyles[variant] || variantStyles.default;
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
            className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full animate-pulse"
            style={{ background: v.text }}
          />
        )}
        {children}
      </span>
    );
  }
);

BadgeGlass.displayName = 'BadgeGlass';
