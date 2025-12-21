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

/**
 * Props for the BadgeGlass component
 *
 * A glass-themed badge with semantic variants and optional animated status dot.
 * Features shadcn/ui compatible variants plus extended Glass UI variants.
 *
 * @accessibility
 * - **Keyboard Navigation:** Badges are non-interactive by default (display-only)
 * - **Focus Management:** N/A - badges do not receive focus unless wrapped in interactive elements
 * - **Screen Readers:** Semantic `<span>` element, content announced naturally
 * - **Status Indicators:** Use `aria-label` to provide context for status badges (e.g., "Status: Active")
 * - **Animated Dot:** Pulse animation respects `prefers-reduced-motion` settings
 * - **Touch Targets:** N/A for display badges, ensure 44x44px if wrapping in button/link (WCAG 2.5.5)
 * - **Color Contrast:** All variant text meets WCAG AA contrast ratio 4.5:1 against badge background
 * - **Motion:** Dot pulse animation can be disabled for users with motion sensitivity
 *
 * @example
 * ```tsx
 * // Basic badge with variant
 * <BadgeGlass variant="default">New</BadgeGlass>
 *
 * // Status badge with aria-label for screen readers
 * <BadgeGlass variant="success" aria-label="Status: Active">
 *   Active
 * </BadgeGlass>
 *
 * // Different variants (shadcn/ui compatible)
 * <BadgeGlass variant="default">Default</BadgeGlass>
 * <BadgeGlass variant="secondary">Secondary</BadgeGlass>
 * <BadgeGlass variant="destructive">Error</BadgeGlass>
 * <BadgeGlass variant="outline">Outline</BadgeGlass>
 *
 * // Extended Glass UI variants
 * <BadgeGlass variant="success">Success</BadgeGlass>
 * <BadgeGlass variant="warning">Warning</BadgeGlass>
 * <BadgeGlass variant="info">Info</BadgeGlass>
 *
 * // With animated status dot
 * <BadgeGlass variant="success" dot aria-label="Status: Online">
 *   Online
 * </BadgeGlass>
 * <BadgeGlass variant="destructive" dot aria-label="Status: Offline">
 *   Offline
 * </BadgeGlass>
 *
 * // Size variants
 * <BadgeGlass size="sm">Small</BadgeGlass>
 * <BadgeGlass size="default">Medium</BadgeGlass>
 * <BadgeGlass size="lg">Large</BadgeGlass>
 *
 * // Inside interactive elements (ensure accessible labels)
 * <button aria-label="Filter by active status">
 *   Filter: <BadgeGlass variant="success">Active</BadgeGlass>
 * </button>
 *
 * // Count badge with semantic meaning
 * <div>
 *   <span>Notifications</span>
 *   <BadgeGlass variant="destructive" aria-label="3 unread notifications">
 *     3
 *   </BadgeGlass>
 * </div>
 * ```
 */
export interface BadgeGlassProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'>, VariantProps<typeof badgeVariants> {
  readonly children: ReactNode;
  readonly variant?: BadgeVariant;
  readonly dot?: boolean;
}

// ========================================
// COMPONENT
// ========================================

export const BadgeGlass = forwardRef<HTMLSpanElement, BadgeGlassProps>(
  ({ children, className, variant = 'default', size = 'md', dot, ...props }, ref) => {
    const v = variantStyles[variant];

    return (
      <span
        ref={ref}
        data-slot="badge"
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

/**
 * Badge - shadcn/ui compatible alias for BadgeGlass
 *
 * @example
 * ```tsx
 * import { Badge } from 'shadcn-glass-ui'
 *
 * <Badge variant="default">Default</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="success">Success</Badge>
 * ```
 *
 * @since v2.6.0
 */
export const Badge = BadgeGlass;
