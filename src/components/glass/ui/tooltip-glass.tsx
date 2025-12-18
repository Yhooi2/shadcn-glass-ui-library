/**
 * TooltipGlass Component
 *
 * Glass-themed tooltip with:
 * - Unified dark design (consistent UX across themes)
 * - Position variants (top/bottom/left/right)
 * - Smooth animation
 * - Built on Radix UI primitives
 *
 * @example Compound API (recommended)
 * ```tsx
 * <TooltipGlassProvider>
 *   <TooltipGlass>
 *     <TooltipGlassTrigger asChild>
 *       <Button>Hover</Button>
 *     </TooltipGlassTrigger>
 *     <TooltipGlassContent>
 *       <p>Add to library</p>
 *     </TooltipGlassContent>
 *   </TooltipGlass>
 * </TooltipGlassProvider>
 * ```
 *
 * @example Simple wrapper
 * ```tsx
 * <TooltipGlassProvider>
 *   <TooltipGlassSimple content="Click to edit">
 *     <button>Edit</button>
 *   </TooltipGlassSimple>
 * </TooltipGlassProvider>
 * ```
 */

'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// COMPOUND COMPONENT: PROVIDER
// ========================================

type TooltipGlassProviderProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>;

/**
 * TooltipGlassProvider - Context provider for all tooltips
 * Must wrap TooltipGlass components at the app level.
 */
const TooltipGlassProvider: React.FC<TooltipGlassProviderProps> = ({
  delayDuration = 0,
  ...props
}) => {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
};

TooltipGlassProvider.displayName = 'TooltipGlassProvider';

// ========================================
// COMPOUND COMPONENT: ROOT
// ========================================

/**
 * TooltipGlassRoot - Individual tooltip instance
 * Wraps Radix TooltipPrimitive.Root
 */
const TooltipGlassRoot = TooltipPrimitive.Root;

// ========================================
// COMPOUND COMPONENT: TRIGGER
// ========================================

/**
 * TooltipGlassTrigger - Element that triggers the tooltip
 * Supports asChild pattern for custom trigger elements.
 */
const TooltipGlassTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ ...props }, ref) => (
  <TooltipPrimitive.Trigger ref={ref} data-slot="tooltip-trigger" {...props} />
));

TooltipGlassTrigger.displayName = 'TooltipGlassTrigger';

// ========================================
// COMPOUND COMPONENT: CONTENT
// ========================================

type TooltipGlassContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;

/**
 * TooltipGlassContent - Tooltip content with glass styling
 * Rendered in a portal for proper z-index handling.
 */
const TooltipGlassContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipGlassContentProps
>(({ className, sideOffset = 4, ...props }, ref) => {
  const tooltipStyles: React.CSSProperties = {
    background: 'var(--tooltip-bg)',
    color: 'var(--tooltip-text)',
    border: '1px solid var(--tooltip-border)',
    boxShadow: 'var(--tooltip-shadow)',
    backdropFilter: 'blur(var(--blur-xl))',
    WebkitBackdropFilter: 'blur(var(--blur-xl))',
  };

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        data-slot="tooltip-content"
        className={cn(
          'z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs text-balance',
          'animate-in fade-in-0 zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        style={tooltipStyles}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});

TooltipGlassContent.displayName = 'TooltipGlassContent';

// ========================================
// SIMPLE WRAPPER (convenience)
// ========================================

interface TooltipGlassSimpleProps {
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

const TooltipGlassSimple: React.FC<TooltipGlassSimpleProps> = ({
  content,
  children,
  side = 'top',
  className,
}) => {
  return (
    <TooltipGlassRoot>
      <TooltipGlassTrigger asChild>{children}</TooltipGlassTrigger>
      <TooltipGlassContent side={side} className={className}>
        {content}
      </TooltipGlassContent>
    </TooltipGlassRoot>
  );
};

// ========================================
// EXPORTS
// ========================================

// Compound API (shadcn/ui pattern)
export const TooltipGlass = TooltipGlassRoot;
export { TooltipGlassProvider, TooltipGlassTrigger, TooltipGlassContent, TooltipGlassSimple };
