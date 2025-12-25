/**
 * StatItemGlass Component
 *
 * Compact statistic display component with icon, value, and label for profile cards and dashboards.
 * Designed for inline metrics with automatic value formatting and flexible layouts.
 *
 * ## Features
 * - **Icon + Value + Label:** Clean three-part layout with Lucide icon support
 * - **3 Size Variants:** sm (12px), md (14px), lg (16px) text sizes
 * - **2 Layout Modes:** horizontal (default) and vertical layouts
 * - **Value Formatting:** Automatic number abbreviation (1.2k, 2.5M) in abbreviated mode
 * - **Flexible Values:** Supports both numbers and pre-formatted strings
 * - **Theme-Aware Colors:** Uses CSS variables for icon accent and text
 * - **Customizable Icon Size:** Configurable icon dimensions via `iconSize` prop
 * - **Compact Design:** Minimal spacing optimized for inline use
 * - **Atomic Component:** Extracted from ProfileHeaderGlass for reusability
 *
 * ## CSS Variables
 * Uses inline theme CSS variables (no component-specific variables):
 * - `--text-secondary` - Stat value and label text color
 * - `--text-accent` - Icon color
 *
 * @example Basic usage
 * ```tsx
 * import { StatItemGlass } from 'shadcn-glass-ui'
 * import { Star } from 'lucide-react'
 *
 * function UserProfile() {
 *   return (
 *     <StatItemGlass
 *       icon={Star}
 *       value={1234}
 *       label="stars"
 *     />
 *   )
 * }
 * ```
 *
 * @example With abbreviated values
 * ```tsx
 * import { GitCommit } from 'lucide-react'
 *
 * <StatItemGlass
 *   icon={GitCommit}
 *   value={15678}
 *   label="commits"
 *   abbreviated={true}
 * />
 * // Renders: "15.7k commits"
 * ```
 *
 * @example Vertical layout with large size
 * ```tsx
 * import { Users } from 'lucide-react'
 *
 * <StatItemGlass
 *   icon={Users}
 *   value={250}
 *   label="followers"
 *   size="lg"
 *   layout="vertical"
 *   iconSize={20}
 * />
 * ```
 *
 * @example With pre-formatted string value
 * ```tsx
 * import { Calendar } from 'lucide-react'
 *
 * <StatItemGlass
 *   icon={Calendar}
 *   value="2 years"
 *   label="active"
 *   size="sm"
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic `<span>` element for inline display
 * - Icon has proper color contrast via `--text-accent`
 * - Font weight (`font-medium`) improves readability
 * - Supports custom `aria-label` via spread props
 * - No interactive elements, purely informational
 * - WCAG 2.1 AA compliant color contrast
 *
 * @since v1.0.0
 */

// ========================================
// STAT ITEM GLASS - ATOMIC COMPONENT
// Compact stat display with icon and label
// Level 2: Atomic (extracted from ProfileHeaderGlass)
// ========================================

import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

const statItemVariants = cva('flex items-center gap-1', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    layout: {
      horizontal: 'flex-row',
      vertical: 'flex-col items-start gap-0.5',
    },
  },
  defaultVariants: {
    size: 'md',
    layout: 'horizontal',
  },
});

/**
 * Props for StatItemGlass component.
 *
 * Extends standard span attributes and includes CVA variants for size and layout.
 *
 * @example
 * ```tsx
 * import { Star } from 'lucide-react'
 *
 * const props: StatItemGlassProps = {
 *   icon: Star,
 *   value: 1234,
 *   label: 'stars',
 *   size: 'md',
 *   layout: 'horizontal',
 *   abbreviated: false,
 * }
 * ```
 */
export interface StatItemGlassProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof statItemVariants> {
  /**
   * Lucide icon component.
   *
   * Must be a valid Lucide React icon component. Icon receives `size` and
   * `style` props for consistent theming.
   *
   * @example
   * ```tsx
   * import { Star, GitCommit, Users } from 'lucide-react'
   *
   * <StatItemGlass icon={Star} value={123} label="stars" />
   * <StatItemGlass icon={GitCommit} value={456} label="commits" />
   * ```
   */
  readonly icon: LucideIcon;

  /**
   * Stat value (number or formatted string).
   *
   * - **Number:** Automatically formatted when `abbreviated={true}` (e.g., 1234 → "1.2k")
   * - **String:** Displayed as-is (e.g., "2 years", "100%")
   *
   * @example
   * ```tsx
   * <StatItemGlass icon={Star} value={1234} label="stars" />
   * <StatItemGlass icon={Calendar} value="2 years" label="active" />
   * ```
   */
  readonly value: number | string;

  /**
   * Stat label.
   *
   * Displayed after the value. Use lowercase singular/plural forms for
   * readability (e.g., "star", "commits", "followers").
   *
   * @example
   * ```tsx
   * <StatItemGlass icon={Star} value={1} label="star" />
   * <StatItemGlass icon={Users} value={250} label="followers" />
   * ```
   */
  readonly label: string;

  /**
   * Icon size in pixels.
   *
   * Overrides default icon size. Useful for visual hierarchy or dense layouts.
   *
   * @default 16
   *
   * @example
   * ```tsx
   * <StatItemGlass icon={Star} value={123} label="stars" iconSize={20} />
   * ```
   */
  readonly iconSize?: number;

  /**
   * Abbreviated format for mobile (1.2k instead of 1234).
   *
   * Only applies to numeric values. Uses K (thousands) and M (millions) suffixes.
   *
   * - `1234` → `"1.2k"`
   * - `1500000` → `"1.5M"`
   * - `"2 years"` → `"2 years"` (unchanged for strings)
   *
   * @default false
   *
   * @example
   * ```tsx
   * <StatItemGlass
   *   icon={GitCommit}
   *   value={15678}
   *   label="commits"
   *   abbreviated={true}
   * />
   * // Renders: "15.7k commits"
   * ```
   */
  readonly abbreviated?: boolean;
}

export const StatItemGlass = forwardRef<HTMLSpanElement, StatItemGlassProps>(
  (
    {
      icon: Icon,
      value,
      label,
      iconSize = 16,
      abbreviated = false,
      size,
      layout,
      className,
      ...props
    },
    ref
  ) => {
    const textStyles: CSSProperties = {
      color: 'var(--text-secondary)',
    };

    const iconStyles: CSSProperties = {
      color: 'var(--text-accent)',
    };

    const formatValue = (val: number | string): string => {
      if (!abbreviated || typeof val !== 'number') return String(val);

      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
      return String(val);
    };

    return (
      <span
        ref={ref}
        className={cn(statItemVariants({ size, layout }), className)}
        style={textStyles}
        {...props}
      >
        <Icon size={iconSize} style={iconStyles} />
        <span className="font-medium">
          {formatValue(value)} {label}
        </span>
      </span>
    );
  }
);

StatItemGlass.displayName = 'StatItemGlass';
