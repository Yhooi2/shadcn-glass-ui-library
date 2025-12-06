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
 * @example
 * ```tsx
 * <PopoverGlass
 *   trigger={<ButtonGlass>Open</ButtonGlass>}
 *   side="top"
 *   align="center"
 * >
 *   <div className="p-4">Popover content</div>
 * </PopoverGlass>
 * ```
 */

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

export interface PopoverGlassProps {
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

// ========================================
// COMPONENT
// ========================================

export const PopoverGlass = React.forwardRef<
  HTMLDivElement,
  PopoverGlassProps
>(
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
    // Popover content styles with CSS variables
    const popoverStyles: React.CSSProperties = {
      background: 'var(--popover-bg)',
      border: '1px solid var(--popover-border)',
      boxShadow: 'var(--popover-shadow)',
      backdropFilter: 'blur(var(--blur-md))', // 16px - standard popover blur
      WebkitBackdropFilter: 'blur(var(--blur-md))',
    };

    // Arrow styles
    const arrowStyles: React.CSSProperties = {
      fill: 'var(--popover-arrow-bg)',
    };

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            ref={ref}
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={cn(
              'z-[50003] rounded-2xl p-4',
              'animate-in fade-in-0 zoom-in-95 duration-200',
              'data-[side=bottom]:slide-in-from-top-2',
              'data-[side=top]:slide-in-from-bottom-2',
              'data-[side=right]:slide-in-from-left-2',
              'data-[side=left]:slide-in-from-right-2',
              'outline-none',
              className
            )}
            style={popoverStyles}
            role="dialog"
            aria-modal="false"
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
      </PopoverPrimitive.Root>
    );
  }
);

PopoverGlass.displayName = 'PopoverGlass';
