/**
 * SeparatorGlass Component
 *
 * A glass-themed separator/divider component for visual content separation.
 * Based on @radix-ui/react-separator with glassmorphism styling.
 *
 * Issue #27: Feature request for standalone SeparatorGlass
 *
 * @example
 * ```tsx
 * // Horizontal separator (default)
 * <SeparatorGlass />
 *
 * // Vertical separator
 * <SeparatorGlass orientation="vertical" className="h-4" />
 *
 * // With glow effect
 * <SeparatorGlass glow />
 *
 * // Decorative (hidden from screen readers)
 * <SeparatorGlass decorative />
 * ```
 */

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export interface SeparatorGlassProps extends React.ComponentPropsWithoutRef<
  typeof SeparatorPrimitive.Root
> {
  /**
   * The orientation of the separator.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * When true, signifies that it is purely visual and not a semantic separator.
   * @default true
   */
  decorative?: boolean;

  /**
   * Enable glow effect for the separator.
   * @default false
   */
  glow?: boolean;
}

// ========================================
// STYLES
// ========================================

/** Generate inline styles for separator */
function getSeparatorStyles(glow: boolean): React.CSSProperties {
  return {
    background: 'var(--separator-bg)',
    ...(glow && { boxShadow: 'var(--separator-glow)' }),
  };
}

// ========================================
// COMPONENT
// ========================================

/**
 * SeparatorGlass - A glass-themed visual separator
 *
 * Renders a horizontal or vertical line to separate content sections.
 * Supports glassmorphism styling with optional glow effect.
 *
 * @example
 * ```tsx
 * <div className="space-y-4">
 *   <p>Section 1</p>
 *   <SeparatorGlass />
 *   <p>Section 2</p>
 * </div>
 * ```
 */
const SeparatorGlass = React.forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  SeparatorGlassProps
>(({ className, orientation = 'horizontal', decorative = true, glow = false, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    data-slot="separator-glass"
    decorative={decorative}
    orientation={orientation}
    className={cn(
      // Base styles
      'shrink-0',

      // Orientation-specific sizing
      'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
      'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',

      // Transition for glow
      'transition-shadow duration-200',

      className
    )}
    style={getSeparatorStyles(glow)}
    {...props}
  />
));

SeparatorGlass.displayName = 'SeparatorGlass';

// ========================================
// EXPORTS
// ========================================

export { SeparatorGlass };

// shadcn/ui compatible alias
export { SeparatorGlass as Separator };
