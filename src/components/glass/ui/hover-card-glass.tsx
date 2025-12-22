/**
 * HoverCardGlass Component
 *
 * Hover-triggered floating glass-themed container for rich content previews with:
 * - Theme-aware styling (glass/light/aurora)
 * - Configurable open/close delays
 * - Smooth animations with fade-in effect
 * - Arrow pointer with glass styling (shown by default)
 * - All position/alignment options
 *
 * Unlike PopoverGlass (click-triggered), HoverCardGlass opens on hover.
 *
 * Issues #24 & #25: Feature request for HoverCardGlass
 *
 * @example Compound API (recommended)
 * ```tsx
 * <HoverCardGlass openDelay={300} closeDelay={100}>
 *   <HoverCardGlassTrigger asChild>
 *     <span className="underline">Hover me</span>
 *   </HoverCardGlassTrigger>
 *   <HoverCardGlassContent side="right">
 *     <div className="p-4">
 *       <h3 style={{ color: 'var(--text-primary)' }}>Preview</h3>
 *       <p style={{ color: 'var(--text-secondary)' }}>Rich content here</p>
 *     </div>
 *   </HoverCardGlassContent>
 * </HoverCardGlass>
 * ```
 *
 * @example Legacy API (backward compatible)
 * ```tsx
 * <HoverCardGlassLegacy
 *   trigger={<span>Hover me</span>}
 *   side="right"
 *   openDelay={300}
 * >
 *   <div className="p-4">Content</div>
 * </HoverCardGlassLegacy>
 * ```
 */

'use client';

import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// COMPOUND COMPONENT: ROOT
// ========================================

interface HoverCardGlassRootProps extends React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Root
> {
  /**
   * Delay in milliseconds before the hover card opens.
   * @default 200
   */
  openDelay?: number;
  /**
   * Delay in milliseconds before the hover card closes.
   * @default 100
   */
  closeDelay?: number;
}

const HoverCardGlassRoot = ({
  openDelay = 200,
  closeDelay = 100,
  ...props
}: HoverCardGlassRootProps) => (
  <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay} {...props} />
);
HoverCardGlassRoot.displayName = 'HoverCardGlass';

// ========================================
// COMPOUND COMPONENT: TRIGGER
// ========================================

const HoverCardGlassTrigger = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>
>((props, ref) => (
  <HoverCardPrimitive.Trigger data-slot="hovercard-trigger" ref={ref} {...props} />
));
HoverCardGlassTrigger.displayName = 'HoverCardGlassTrigger';

// ========================================
// COMPOUND COMPONENT: CONTENT
// ========================================

interface HoverCardGlassContentProps extends React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Content
> {
  /**
   * Whether to show the arrow pointer.
   * @default true
   */
  showArrow?: boolean;
}

/**
 * HoverCardGlassContent - Content container for HoverCardGlass
 *
 * Defaults (matches shadcn/ui):
 * - `p-4` (16px padding)
 * - `w-80` (320px width)
 * - Both can be overridden via className prop
 *
 * @example
 * <HoverCardGlassContent className="w-96 p-6">
 *   <p>Content</p>
 * </HoverCardGlassContent>
 */
const HoverCardGlassContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardGlassContentProps
>(({ className, align = 'center', sideOffset = 8, showArrow = true, children, ...props }, ref) => {
  // HoverCard content styles with CSS variables
  const hoverCardStyles: React.CSSProperties = {
    background: 'var(--hovercard-bg)',
    border: '1px solid var(--hovercard-border)',
    boxShadow: 'var(--hovercard-shadow)',
    backdropFilter: 'blur(var(--blur-md))',
    WebkitBackdropFilter: 'blur(var(--blur-md))',
  };

  // Arrow styles
  const arrowStyles: React.CSSProperties = {
    fill: 'var(--hovercard-arrow-bg)',
  };

  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        data-slot="hovercard-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50003 w-80 rounded-2xl p-4',
          'animate-in fade-in-0 zoom-in-95 duration-200',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'outline-none',
          className
        )}
        style={hoverCardStyles}
        {...props}
      >
        {children}

        {showArrow && (
          <HoverCardPrimitive.Arrow
            className="fill-current"
            style={arrowStyles}
            width={16}
            height={8}
          />
        )}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
});

HoverCardGlassContent.displayName = 'HoverCardGlassContent';

// ========================================
// LEGACY API (backward compatible)
// ========================================

export interface HoverCardGlassLegacyProps {
  /** The trigger element that opens the hover card on hover */
  readonly trigger: React.ReactNode;
  /** The content to display inside the hover card */
  readonly children: React.ReactNode;
  /** The preferred side of the trigger to render against */
  readonly side?: 'top' | 'right' | 'bottom' | 'left';
  /** The preferred alignment against the trigger */
  readonly align?: 'start' | 'center' | 'end';
  /** The distance in pixels from the trigger */
  readonly sideOffset?: number;
  /** Delay in milliseconds before opening */
  readonly openDelay?: number;
  /** Delay in milliseconds before closing */
  readonly closeDelay?: number;
  /** Controlled open state */
  readonly open?: boolean;
  /** Callback when open state changes */
  readonly onOpenChange?: (open: boolean) => void;
  /** Whether to show the arrow pointer */
  readonly showArrow?: boolean;
  /** Additional class name for the content wrapper */
  readonly className?: string;
}

const HoverCardGlassLegacy = React.forwardRef<HTMLDivElement, HoverCardGlassLegacyProps>(
  (
    {
      trigger,
      children,
      side = 'bottom',
      align = 'center',
      sideOffset = 8,
      openDelay = 200,
      closeDelay = 100,
      open,
      onOpenChange,
      showArrow = true,
      className,
    },
    ref
  ) => {
    return (
      <HoverCardGlassRoot
        openDelay={openDelay}
        closeDelay={closeDelay}
        open={open}
        onOpenChange={onOpenChange}
      >
        <HoverCardGlassTrigger asChild>{trigger}</HoverCardGlassTrigger>
        <HoverCardGlassContent
          ref={ref}
          side={side}
          align={align}
          sideOffset={sideOffset}
          showArrow={showArrow}
          className={className}
        >
          {children}
        </HoverCardGlassContent>
      </HoverCardGlassRoot>
    );
  }
);

HoverCardGlassLegacy.displayName = 'HoverCardGlassLegacy';

// ========================================
// EXPORTS
// ========================================

// Compound API (shadcn/ui pattern)
export const HoverCardGlass = HoverCardGlassRoot;
export { HoverCardGlassTrigger, HoverCardGlassContent };

// Legacy API (backward compatible)
export { HoverCardGlassLegacy };

// shadcn/ui compatible aliases
export {
  HoverCardGlassRoot as HoverCard,
  HoverCardGlassTrigger as HoverCardTrigger,
  HoverCardGlassContent as HoverCardContent,
};

// Type exports
export type { HoverCardGlassRootProps, HoverCardGlassContentProps };
