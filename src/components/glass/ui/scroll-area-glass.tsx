/**
 * ScrollAreaGlass Component
 *
 * Glass-themed scroll area with:
 * - Theme-aware scrollbar styling (glass/light/aurora)
 * - Custom scrollbar with glass effects
 * - Horizontal and vertical scrolling support
 * - 100% shadcn/ui ScrollArea API compatible
 *
 * @accessibility
 * - Preserves native scrollbar keyboard navigation
 * - Uses semantic scrolling region
 * - Screen readers can navigate content normally
 *
 * @example
 * ```tsx
 * // Vertical scroll area
 * <ScrollAreaGlass className="h-72 w-48 rounded-md border">
 *   <div className="p-4">
 *     {items.map((item) => (
 *       <div key={item}>{item}</div>
 *     ))}
 *   </div>
 * </ScrollAreaGlass>
 *
 * // Horizontal scroll area
 * <ScrollAreaGlass className="w-96" orientation="horizontal">
 *   <div className="flex gap-4 p-4">
 *     {images.map((img) => (
 *       <img key={img} src={img} className="w-48" />
 *     ))}
 *   </div>
 * </ScrollAreaGlass>
 * ```
 */

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// SCROLL BAR COMPONENT
// ========================================

export interface ScrollBarGlassProps extends React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> {
  orientation?: 'horizontal' | 'vertical';
}

const ScrollBarGlass = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarGlassProps
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      // Glass styling for scrollbar track
      'bg-[var(--scrollbar-track,transparent)]',
      // Orientation-specific sizing
      orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        'relative flex-1 rounded-full',
        // Glass scrollbar thumb styling
        'bg-[var(--scrollbar-thumb,var(--glass-border))]',
        'hover:bg-[var(--scrollbar-thumb-hover,var(--glass-border-hover))]',
        'transition-colors'
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

ScrollBarGlass.displayName = 'ScrollBarGlass';

// ========================================
// SCROLL AREA COMPONENT
// ========================================

export interface ScrollAreaGlassProps extends React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
> {
  /**
   * Scrollbar orientation - controls which scrollbar to display
   * @default "vertical"
   */
  orientation?: 'horizontal' | 'vertical' | 'both';
}

/**
 * ScrollAreaGlass - A glass-themed scrollable container
 *
 * @example
 * ```tsx
 * // In a modal with long content
 * <ModalGlass.Root open={open} onOpenChange={setOpen}>
 *   <ModalGlass.Content>
 *     <ModalGlass.Header>
 *       <ModalGlass.Title>Terms of Service</ModalGlass.Title>
 *     </ModalGlass.Header>
 *     <ModalGlass.Body>
 *       <ScrollAreaGlass className="h-[400px]">
 *         <div className="pr-4">
 *           {longContent}
 *         </div>
 *       </ScrollAreaGlass>
 *     </ModalGlass.Body>
 *   </ModalGlass.Content>
 * </ModalGlass.Root>
 *
 * // Tags/chips horizontal scroll
 * <ScrollAreaGlass orientation="horizontal" className="w-full">
 *   <div className="flex gap-2 p-2">
 *     {tags.map((tag) => (
 *       <BadgeGlass key={tag}>{tag}</BadgeGlass>
 *     ))}
 *   </div>
 * </ScrollAreaGlass>
 * ```
 */
const ScrollAreaGlass = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaGlassProps
>(({ className, children, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    {(orientation === 'vertical' || orientation === 'both') && (
      <ScrollBarGlass orientation="vertical" />
    )}
    {(orientation === 'horizontal' || orientation === 'both') && (
      <ScrollBarGlass orientation="horizontal" />
    )}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));

ScrollAreaGlass.displayName = 'ScrollAreaGlass';

export { ScrollAreaGlass, ScrollBarGlass };
