/**
 * SeparatorGlass Component
 *
 * Glass-themed separator with:
 * - Theme-aware styling (glass/light/aurora)
 * - Horizontal and vertical orientations
 * - Decorative or semantic separation
 * - 100% shadcn/ui Separator API compatible
 *
 * @accessibility
 * - Uses `role="separator"` for semantic meaning
 * - `aria-orientation` communicates direction to screen readers
 * - When decorative=true, uses `role="none"` to hide from assistive tech
 *
 * @example
 * ```tsx
 * // Horizontal separator (default)
 * <SeparatorGlass />
 *
 * // Vertical separator
 * <SeparatorGlass orientation="vertical" className="h-4" />
 *
 * // Decorative (no semantic meaning)
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
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Whether the separator is purely decorative (no semantic meaning).
   * When true, uses role="none" instead of role="separator".
   * @default true
   */
  decorative?: boolean;
}

// ========================================
// COMPONENT
// ========================================

/**
 * SeparatorGlass - A glass-themed visual divider
 *
 * @example
 * ```tsx
 * // In a card with sections
 * <GlassCard>
 *   <GlassCardHeader>
 *     <GlassCardTitle>Settings</GlassCardTitle>
 *   </GlassCardHeader>
 *   <GlassCardContent>
 *     <div>Section 1</div>
 *     <SeparatorGlass className="my-4" />
 *     <div>Section 2</div>
 *   </GlassCardContent>
 * </GlassCard>
 *
 * // Vertical separator in a toolbar
 * <div className="flex items-center gap-4">
 *   <ButtonGlass>Cut</ButtonGlass>
 *   <ButtonGlass>Copy</ButtonGlass>
 *   <SeparatorGlass orientation="vertical" className="h-6" />
 *   <ButtonGlass>Paste</ButtonGlass>
 * </div>
 * ```
 */
const SeparatorGlass = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorGlassProps
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0',
      // Glass styling with CSS variables
      'bg-[var(--separator-bg,var(--glass-border))]',
      // Orientation-specific sizing
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      className
    )}
    {...props}
  />
));

SeparatorGlass.displayName = 'SeparatorGlass';

export { SeparatorGlass };
