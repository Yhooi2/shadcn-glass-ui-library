/**
 * PopoverGlass Component
 *
 * Floating glass-themed container for tooltips, dropdowns, and overlays with:
 * - Theme-aware styling (glass/light/aurora)
 * - Smooth animations with fade-in effect
 * - Arrow pointer with glass styling
 * - ESC key and click-outside to close
 * - Focus trap for accessibility
 * - All position/alignment options (top/right/bottom/left × start/center/end)
 *
 * @example Compound API (recommended)
 * ```tsx
 * <PopoverGlass>
 *   <PopoverGlassTrigger asChild>
 *     <ButtonGlass>Open</ButtonGlass>
 *   </PopoverGlassTrigger>
 *   <PopoverGlassContent side="top">
 *     <div className="p-4">
 *       <h3 style={{ color: 'var(--text-primary)' }}>Title</h3>
 *       <p style={{ color: 'var(--text-secondary)' }}>Content</p>
 *     </div>
 *   </PopoverGlassContent>
 * </PopoverGlass>
 * ```
 *
 * @example Legacy API (backward compatible)
 * ```tsx
 * <PopoverGlassLegacy
 *   trigger={<ButtonGlass>Open</ButtonGlass>}
 *   side="top"
 * >
 *   <div className="p-4">Content</div>
 * </PopoverGlassLegacy>
 * ```
 */

'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// COMPOUND COMPONENT: ROOT
// ========================================

const PopoverGlassRoot = PopoverPrimitive.Root;

// ========================================
// COMPOUND COMPONENT: TRIGGER
// ========================================

const PopoverGlassTrigger = PopoverPrimitive.Trigger;

// ========================================
// COMPOUND COMPONENT: ANCHOR
// ========================================

const PopoverGlassAnchor = PopoverPrimitive.Anchor;

// ========================================
// COMPOUND COMPONENT: CONTENT
// ========================================

interface PopoverGlassContentProps extends React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> {
  /** Whether to show the arrow pointer */
  showArrow?: boolean;
}

const PopoverGlassContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverGlassContentProps
>(({ className, align = 'center', sideOffset = 8, showArrow = true, children, ...props }, ref) => {
  // Popover content styles with CSS variables
  const popoverStyles: React.CSSProperties = {
    background: 'var(--popover-bg)',
    border: '1px solid var(--popover-border)',
    boxShadow: 'var(--popover-shadow)',
    backdropFilter: 'blur(var(--blur-md))',
    WebkitBackdropFilter: 'blur(var(--blur-md))',
  };

  // Arrow styles
  const arrowStyles: React.CSSProperties = {
    fill: 'var(--popover-arrow-bg)',
  };

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50003 rounded-2xl',
          'animate-in fade-in-0 zoom-in-95 duration-200',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=left]:slide-in-from-right-2',
          'outline-none',
          className
        )}
        style={popoverStyles}
        {...props}
      >
        {children}

        {showArrow && (
          <PopoverPrimitive.Arrow
            className="fill-current"
            style={arrowStyles}
            width={16}
            height={8}
          />
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

PopoverGlassContent.displayName = 'PopoverGlassContent';

// ========================================
// LEGACY API (backward compatible)
// ========================================

export interface PopoverGlassLegacyProps {
  /** The trigger element that opens the popover */
  readonly trigger: React.ReactNode;
  /** The content to display inside the popover */
  readonly children: React.ReactNode;
  /** The preferred side of the trigger to render against */
  readonly side?: 'top' | 'right' | 'bottom' | 'left';
  /** The preferred alignment against the trigger */
  readonly align?: 'start' | 'center' | 'end';
  /** The distance in pixels from the trigger */
  readonly sideOffset?: number;
  /** Controlled open state */
  readonly open?: boolean;
  /** Callback when open state changes */
  readonly onOpenChange?: (open: boolean) => void;
  /** Whether to show the arrow pointer */
  readonly showArrow?: boolean;
  /** Additional class name for the content wrapper */
  readonly className?: string;
}

const PopoverGlassLegacy = React.forwardRef<HTMLDivElement, PopoverGlassLegacyProps>(
  (
    {
      trigger,
      children,
      side = 'bottom',
      align = 'center',
      sideOffset = 8,
      open,
      onOpenChange,
      showArrow = true,
      className,
    },
    ref
  ) => {
    return (
      <PopoverGlassRoot open={open} onOpenChange={onOpenChange}>
        <PopoverGlassTrigger asChild>{trigger}</PopoverGlassTrigger>
        <PopoverGlassContent
          ref={ref}
          side={side}
          align={align}
          sideOffset={sideOffset}
          showArrow={showArrow}
          className={className}
        >
          {children}
        </PopoverGlassContent>
      </PopoverGlassRoot>
    );
  }
);

PopoverGlassLegacy.displayName = 'PopoverGlassLegacy';

// ========================================
// EXPORTS
// ========================================

// Compound API (shadcn/ui pattern)
export const PopoverGlass = PopoverGlassRoot;
export { PopoverGlassTrigger, PopoverGlassContent, PopoverGlassAnchor };

// Legacy API (backward compatible)
export { PopoverGlassLegacy };

// For backward compatibility, also export as default
export { PopoverGlassLegacy as default };
