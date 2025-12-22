/**
 * ScrollAreaGlass Component
 *
 * A glass-themed ScrollArea component for custom scrollable containers.
 * Based on @radix-ui/react-scroll-area with glassmorphism styling.
 *
 * Issue #26: Feature request for ScrollAreaGlass
 *
 * @example
 * ```tsx
 * // Simple usage
 * <ScrollAreaGlass className="h-[400px]">
 *   <div className="space-y-2">
 *     {items.map(item => <Item key={item.id} {...item} />)}
 *   </div>
 * </ScrollAreaGlass>
 *
 * // With horizontal scrolling
 * <ScrollAreaGlass className="w-96" orientation="horizontal">
 *   <div className="flex space-x-4">
 *     {items.map(item => <Card key={item.id} {...item} />)}
 *   </div>
 * </ScrollAreaGlass>
 *
 * // Both directions
 * <ScrollAreaGlass className="h-[400px] w-full" orientation="both">
 *   <LargeContent />
 * </ScrollAreaGlass>
 * ```
 */

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export interface ScrollAreaGlassProps extends React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
> {
  /**
   * Which scrollbars to show
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal' | 'both';
}

export interface ScrollBarGlassProps extends React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> {
  /**
   * Scrollbar orientation
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
}

// ========================================
// STYLES
// ========================================

/** Generate inline styles for scrollbar thumb */
function getThumbStyles(): React.CSSProperties {
  return {
    background: 'var(--scroll-thumb-bg)',
    border: '1px solid var(--scroll-thumb-border)',
  };
}

// ========================================
// COMPONENTS
// ========================================

/**
 * ScrollBarGlass - Glass-themed scrollbar
 */
const ScrollBarGlass = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarGlassProps
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    data-slot="scroll-area-scrollbar-glass"
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',

      // Vertical scrollbar
      orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[2px]',

      // Horizontal scrollbar
      orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[2px]',

      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      data-slot="scroll-area-thumb-glass"
      className={cn(
        'relative flex-1 rounded-full',
        'transition-colors duration-150',
        'hover:bg-[var(--scroll-thumb-hover-bg)]'
      )}
      style={getThumbStyles()}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

ScrollBarGlass.displayName = 'ScrollBarGlass';

/**
 * ScrollAreaGlass - Glass-themed scroll container
 *
 * Provides a customizable scrollable area with glass-themed scrollbars.
 * Supports vertical, horizontal, or both scroll directions.
 *
 * @example
 * ```tsx
 * <ScrollAreaGlass className="h-[300px]">
 *   {longContent}
 * </ScrollAreaGlass>
 * ```
 */
const ScrollAreaGlass = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaGlassProps
>(({ className, children, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    data-slot="scroll-area-glass"
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport-glass"
      className={cn(
        'size-full rounded-[inherit]',
        'focus-visible:ring-[var(--focus-ring)] focus-visible:ring-2 focus-visible:outline-none'
      )}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>

    {/* Vertical scrollbar */}
    {(orientation === 'vertical' || orientation === 'both') && (
      <ScrollBarGlass orientation="vertical" />
    )}

    {/* Horizontal scrollbar */}
    {(orientation === 'horizontal' || orientation === 'both') && (
      <ScrollBarGlass orientation="horizontal" />
    )}

    <ScrollAreaPrimitive.Corner
      data-slot="scroll-area-corner-glass"
      style={{ background: 'var(--scroll-track-bg)' }}
    />
  </ScrollAreaPrimitive.Root>
));

ScrollAreaGlass.displayName = 'ScrollAreaGlass';

// ========================================
// VIEWPORT EXPORT (for compound pattern)
// ========================================

const ScrollAreaGlassViewport = ScrollAreaPrimitive.Viewport;
ScrollAreaGlassViewport.displayName = 'ScrollAreaGlassViewport';

// ========================================
// EXPORTS
// ========================================

export { ScrollAreaGlass, ScrollBarGlass, ScrollAreaGlassViewport };

// shadcn/ui compatible aliases
export { ScrollAreaGlass as ScrollArea, ScrollBarGlass as ScrollBar };
