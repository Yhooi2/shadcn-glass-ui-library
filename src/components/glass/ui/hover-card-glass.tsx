/**
 * HoverCardGlass Component
 *
 * Hover-triggered floating glass-themed container for rich content previews.
 * Unlike PopoverGlass (click-triggered), HoverCardGlass opens on hover after a configurable delay.
 *
 * ## Features
 * - Hover-triggered (vs click for PopoverGlass)
 * - Configurable delays: openDelay (200ms) and closeDelay (100ms)
 * - Arrow pointer with glass styling (shown by default)
 * - 12 positioning options: 4 sides × 3 alignments
 * - Fade animations with slide-in effects
 * - Portal rendering (always in document.body)
 * - Compound component API (recommended)
 * - Legacy API for backward compatibility
 * - Theme-aware glass styling via CSS variables
 * - 100% shadcn/ui compatible API
 *
 * ## Sub-Components
 * - **HoverCardGlass / HoverCard**: Root component with delay configuration
 * - **HoverCardGlassTrigger / HoverCardTrigger**: Element that triggers hover (supports asChild)
 * - **HoverCardGlassContent / HoverCardContent**: Content container with glass styling and arrow
 *
 * ## CSS Variables
 * Customize appearance via theme CSS variables:
 * - `--hovercard-bg`: Card background color (glass effect)
 * - `--hovercard-border`: Card border color
 * - `--hovercard-shadow`: Card shadow/glow effect
 * - `--hovercard-arrow-bg`: Arrow pointer background color
 *
 * @example User preview card
 * ```tsx
 * import { HoverCardGlass, HoverCardGlassTrigger, HoverCardGlassContent } from 'shadcn-glass-ui'
 *
 * function UserPreview() {
 *   return (
 *     <HoverCardGlass openDelay={200} closeDelay={100}>
 *       <HoverCardGlassTrigger asChild>
 *         <span className="underline">@shadcn</span>
 *       </HoverCardGlassTrigger>
 *       <HoverCardGlassContent side="bottom" align="start">
 *         <div className="flex gap-4">
 *           <Avatar src="..." />
 *           <div>
 *             <h4>shadcn</h4>
 *             <p>Creator of shadcn/ui</p>
 *           </div>
 *         </div>
 *       </HoverCardGlassContent>
 *     </HoverCardGlass>
 *   )
 * }
 * ```
 *
 * @example Link preview with metadata
 * ```tsx
 * <HoverCardGlass>
 *   <HoverCardGlassTrigger asChild>
 *     <a href="https://github.com">GitHub</a>
 *   </HoverCardGlassTrigger>
 *   <HoverCardGlassContent>
 *     <h4>GitHub</h4>
 *     <p>Where developers shape the future of software</p>
 *   </HoverCardGlassContent>
 * </HoverCardGlass>
 * ```
 *
 * @example Rich tooltip with image
 * ```tsx
 * <HoverCardGlass openDelay={300}>
 *   <HoverCardGlassTrigger asChild>
 *     <button>View Details</button>
 *   </HoverCardGlassTrigger>
 *   <HoverCardGlassContent side="right" className="w-96">
 *     <img src="..." alt="Preview" />
 *     <h3>Product Details</h3>
 *     <p>Full description here...</p>
 *   </HoverCardGlassContent>
 * </HoverCardGlass>
 * ```
 *
 * @example Custom delays configuration
 * ```tsx
 * <HoverCardGlass openDelay={500} closeDelay={50}>
 *   <HoverCardGlassTrigger asChild>
 *     <span>Slow to open, fast to close</span>
 *   </HoverCardGlassTrigger>
 *   <HoverCardGlassContent>
 *     <p>Content with custom timing</p>
 *   </HoverCardGlassContent>
 * </HoverCardGlass>
 * ```
 *
 * @accessibility
 * - Built on Radix UI HoverCard with full WCAG 2.1 AA compliance
 * - Keyboard: Not keyboard-navigable (hover-only), use TooltipGlass or PopoverGlass for keyboard access
 * - Screen Readers: Content announced when hovered
 * - Focus Management: Does not steal focus from trigger element
 * - Motion: Respects prefers-reduced-motion when configured
 *
 * @since v1.0.0
 */

'use client';

import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// COMPOUND COMPONENT: ROOT
// ========================================

/**
 * Props for HoverCardGlass root component.
 *
 * @example
 * ```tsx
 * const props: HoverCardGlassRootProps = {
 *   openDelay: 300,
 *   closeDelay: 100,
 *   open: true,
 *   onOpenChange: (open) => console.log(open),
 * };
 * ```
 */
interface HoverCardGlassRootProps extends React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Root
> {
  /**
   * Delay in milliseconds before the hover card opens.
   *
   * @default 200
   * @example
   * ```tsx
   * <HoverCardGlass openDelay={500}>...</HoverCardGlass>
   * ```
   */
  openDelay?: number;

  /**
   * Delay in milliseconds before the hover card closes.
   *
   * @default 100
   * @example
   * ```tsx
   * <HoverCardGlass closeDelay={50}>...</HoverCardGlass>
   * ```
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

/**
 * Props for HoverCardGlassContent component.
 *
 * @example
 * ```tsx
 * const props: HoverCardGlassContentProps = {
 *   side: 'bottom',
 *   align: 'start',
 *   sideOffset: 8,
 *   showArrow: true,
 * };
 * ```
 */
interface HoverCardGlassContentProps extends React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Content
> {
  /**
   * Whether to show the arrow pointer.
   *
   * @default true
   * @example
   * ```tsx
   * <HoverCardGlassContent showArrow={false}>...</HoverCardGlassContent>
   * ```
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

/**
 * Props for HoverCardGlassLegacy component (backward compatible API).
 *
 * @example
 * ```tsx
 * const props: HoverCardGlassLegacyProps = {
 *   trigger: <span>Hover me</span>,
 *   children: <div>Content</div>,
 *   side: 'bottom',
 *   align: 'center',
 *   openDelay: 200,
 * };
 * ```
 */
export interface HoverCardGlassLegacyProps {
  /**
   * The trigger element that opens the hover card on hover.
   *
   * @example
   * ```tsx
   * <HoverCardGlassLegacy trigger={<span>Hover</span>}>...</HoverCardGlassLegacy>
   * ```
   */
  readonly trigger: React.ReactNode;

  /**
   * The content to display inside the hover card.
   */
  readonly children: React.ReactNode;

  /**
   * The preferred side of the trigger to render against.
   *
   * @default 'bottom'
   * @example
   * ```tsx
   * <HoverCardGlassLegacy side="right">...</HoverCardGlassLegacy>
   * ```
   */
  readonly side?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * The preferred alignment against the trigger.
   *
   * @default 'center'
   * @example
   * ```tsx
   * <HoverCardGlassLegacy align="start">...</HoverCardGlassLegacy>
   * ```
   */
  readonly align?: 'start' | 'center' | 'end';

  /**
   * The distance in pixels from the trigger.
   *
   * @default 8
   * @example
   * ```tsx
   * <HoverCardGlassLegacy sideOffset={12}>...</HoverCardGlassLegacy>
   * ```
   */
  readonly sideOffset?: number;

  /**
   * Delay in milliseconds before opening.
   *
   * @default 200
   * @example
   * ```tsx
   * <HoverCardGlassLegacy openDelay={500}>...</HoverCardGlassLegacy>
   * ```
   */
  readonly openDelay?: number;

  /**
   * Delay in milliseconds before closing.
   *
   * @default 100
   * @example
   * ```tsx
   * <HoverCardGlassLegacy closeDelay={50}>...</HoverCardGlassLegacy>
   * ```
   */
  readonly closeDelay?: number;

  /**
   * Controlled open state.
   *
   * @default undefined
   * @example
   * ```tsx
   * <HoverCardGlassLegacy open={isOpen} onOpenChange={setIsOpen}>...</HoverCardGlassLegacy>
   * ```
   */
  readonly open?: boolean;

  /**
   * Callback when open state changes.
   *
   * @example
   * ```tsx
   * <HoverCardGlassLegacy onOpenChange={(open) => console.log(open)}>...</HoverCardGlassLegacy>
   * ```
   */
  readonly onOpenChange?: (open: boolean) => void;

  /**
   * Whether to show the arrow pointer.
   *
   * @default true
   * @example
   * ```tsx
   * <HoverCardGlassLegacy showArrow={false}>...</HoverCardGlassLegacy>
   * ```
   */
  readonly showArrow?: boolean;

  /**
   * Additional class name for the content wrapper.
   *
   * @example
   * ```tsx
   * <HoverCardGlassLegacy className="w-96">...</HoverCardGlassLegacy>
   * ```
   */
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
