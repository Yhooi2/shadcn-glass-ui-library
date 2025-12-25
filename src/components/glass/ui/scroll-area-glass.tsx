/**
 * ScrollAreaGlass Component
 *
 * Custom scrollable container with glass-themed scrollbars.
 * Built on @radix-ui/react-scroll-area for cross-browser consistency.
 *
 * ## Features
 * - Custom glass-styled scrollbars with theme-aware colors
 * - Horizontal, vertical, or bidirectional scrolling support
 * - Auto-hide scrollbars with smooth fade transitions
 * - Cross-browser consistent scrollbar behavior via Radix UI
 * - Theme-aware styling with CSS variables
 * - Focus-visible states for keyboard navigation
 * - Compound component API for advanced use cases
 * - WCAG 2.1 AA compliant keyboard and screen reader support
 *
 * ## Sub-Components
 * - `ScrollAreaGlass` - Main scroll container (Root + Viewport)
 * - `ScrollBarGlass` - Individual scrollbar component
 * - `ScrollAreaGlassViewport` - Inner viewport for manual composition
 *
 * ## CSS Variables
 * Customize scrollbar appearance via theme CSS variables:
 * - `--scroll-thumb-bg` - Scrollbar thumb background color
 * - `--scroll-thumb-hover-bg` - Scrollbar thumb hover background color
 * - `--scroll-thumb-border` - Scrollbar thumb border color
 * - `--scroll-track-bg` - Scrollbar track/corner background color
 *
 * @example Vertical scrolling (default)
 * ```tsx
 * import { ScrollAreaGlass } from 'shadcn-glass-ui'
 *
 * function VerticalList() {
 *   return (
 *     <ScrollAreaGlass className="h-[400px] w-64">
 *       <div className="space-y-2 p-4">
 *         {items.map(item => (
 *           <div key={item.id} className="p-2 rounded bg-[var(--card-bg)]">
 *             {item.name}
 *           </div>
 *         ))}
 *       </div>
 *     </ScrollAreaGlass>
 *   )
 * }
 * ```
 *
 * @example Horizontal scrolling
 * ```tsx
 * <ScrollAreaGlass className="w-96" orientation="horizontal">
 *   <div className="flex space-x-4 p-4">
 *     {cards.map(card => (
 *       <div key={card.id} className="shrink-0 w-[200px]">
 *         <Card {...card} />
 *       </div>
 *     ))}
 *   </div>
 * </ScrollAreaGlass>
 * ```
 *
 * @example Both directions (2D scrolling)
 * ```tsx
 * <ScrollAreaGlass
 *   className="h-[400px] w-full"
 *   orientation="both"
 * >
 *   <div className="min-w-[800px] p-4">
 *     <LargeDataTable />
 *   </div>
 * </ScrollAreaGlass>
 * ```
 *
 * @example Inside a card with header and footer
 * ```tsx
 * function ActivityCard() {
 *   return (
 *     <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
 *       <div className="p-4 border-b border-[var(--card-border)]">
 *         <h3>Recent Activity</h3>
 *       </div>
 *       <ScrollAreaGlass className="h-[300px]">
 *         <div className="p-4 space-y-2">
 *           {activities.map(activity => (
 *             <ActivityItem key={activity.id} {...activity} />
 *           ))}
 *         </div>
 *       </ScrollAreaGlass>
 *       <div className="p-4 border-t border-[var(--card-border)]">
 *         <button>View All</button>
 *       </div>
 *     </div>
 *   )
 * }
 * ```
 *
 * @accessibility
 * - Viewport is keyboard focusable with visible focus ring
 * - Scrollbars automatically hidden from screen readers (managed by Radix UI)
 * - Supports arrow keys, Page Up/Down, Home/End for keyboard scrolling
 * - Maintains semantic HTML structure for assistive technologies
 * - Smooth scrolling respects user's motion preferences
 *
 * @since v1.0.0
 */

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

/**
 * Props for ScrollAreaGlass component.
 *
 * Extends Radix UI ScrollArea.Root props with custom orientation support.
 *
 * @example
 * ```tsx
 * const props: ScrollAreaGlassProps = {
 *   orientation: 'both',
 *   className: 'h-[400px] w-full',
 *   children: <LargeContent />,
 * };
 * ```
 */
export interface ScrollAreaGlassProps extends React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
> {
  /**
   * Which scrollbars to display.
   *
   * - `vertical`: Show only vertical scrollbar (default)
   * - `horizontal`: Show only horizontal scrollbar
   * - `both`: Show both vertical and horizontal scrollbars
   *
   * @default 'vertical'
   * @example
   * ```tsx
   * // Vertical scrolling for long lists
   * <ScrollAreaGlass orientation="vertical" className="h-96" />
   *
   * // Horizontal scrolling for wide content
   * <ScrollAreaGlass orientation="horizontal" className="w-96" />
   *
   * // Both directions for large tables
   * <ScrollAreaGlass orientation="both" className="h-96 w-full" />
   * ```
   */
  orientation?: 'vertical' | 'horizontal' | 'both';
}

/**
 * Props for ScrollBarGlass component.
 *
 * Extends Radix UI ScrollAreaScrollbar props with orientation support.
 * Typically used for manual composition with compound pattern.
 *
 * @example
 * ```tsx
 * const props: ScrollBarGlassProps = {
 *   orientation: 'vertical',
 *   className: 'custom-scrollbar',
 * };
 * ```
 */
export interface ScrollBarGlassProps extends React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> {
  /**
   * Scrollbar orientation.
   *
   * - `vertical`: Vertical scrollbar on the right edge
   * - `horizontal`: Horizontal scrollbar on the bottom edge
   *
   * @default 'vertical'
   * @example
   * ```tsx
   * <ScrollBarGlass orientation="vertical" />
   * <ScrollBarGlass orientation="horizontal" />
   * ```
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
 * ScrollBarGlass - Glass-themed scrollbar component
 *
 * Individual scrollbar element with glass styling and smooth transitions.
 * Used internally by ScrollAreaGlass or manually for compound patterns.
 *
 * @example
 * ```tsx
 * // Manual composition (advanced usage)
 * <ScrollAreaPrimitive.Root>
 *   <ScrollAreaPrimitive.Viewport>
 *     {content}
 *   </ScrollAreaPrimitive.Viewport>
 *   <ScrollBarGlass orientation="vertical" />
 * </ScrollAreaPrimitive.Root>
 * ```
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
 * ScrollAreaGlass - Main glass-themed scroll container
 *
 * Complete scrollable area with auto-hide glass scrollbars.
 * Combines Root, Viewport, Scrollbars, and Corner into a single component.
 *
 * @example Basic vertical scrolling
 * ```tsx
 * <ScrollAreaGlass className="h-[300px]">
 *   <div className="p-4 space-y-2">
 *     {items.map(item => <Item key={item.id} {...item} />)}
 *   </div>
 * </ScrollAreaGlass>
 * ```
 *
 * @example Horizontal gallery
 * ```tsx
 * <ScrollAreaGlass orientation="horizontal" className="w-96">
 *   <div className="flex space-x-4 p-4">
 *     {images.map(img => <Image key={img.id} {...img} />)}
 *   </div>
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
