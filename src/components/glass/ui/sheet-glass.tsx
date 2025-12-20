/* eslint-disable react-refresh/only-export-components */
/**
 * SheetGlass Component (Radix UI Dialog-based)
 *
 * Glass-themed sheet/drawer with full shadcn/ui Sheet API compatibility.
 * Built on @radix-ui/react-dialog for accessibility and state management.
 *
 * @example Basic usage
 * ```tsx
 * <SheetGlass.Root>
 *   <SheetGlass.Trigger asChild>
 *     <ButtonGlass>Open Sheet</ButtonGlass>
 *   </SheetGlass.Trigger>
 *   <SheetGlass.Content side="right">
 *     <SheetGlass.Header>
 *       <SheetGlass.Title>Sheet Title</SheetGlass.Title>
 *       <SheetGlass.Description>Description</SheetGlass.Description>
 *     </SheetGlass.Header>
 *     <p>Content here</p>
 *     <SheetGlass.Footer>
 *       <SheetGlass.Close asChild>
 *         <ButtonGlass variant="ghost">Cancel</ButtonGlass>
 *       </SheetGlass.Close>
 *     </SheetGlass.Footer>
 *   </SheetGlass.Content>
 * </SheetGlass.Root>
 * ```
 *
 * @example shadcn/ui compatible imports
 * ```tsx
 * import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from 'shadcn-glass-ui'
 *
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button>Open</Button>
 *   </SheetTrigger>
 *   <SheetContent side="left">
 *     <SheetHeader>
 *       <SheetTitle>Navigation</SheetTitle>
 *     </SheetHeader>
 *     <nav>...</nav>
 *   </SheetContent>
 * </Sheet>
 * ```
 *
 * @accessibility
 * - Built on Radix UI Dialog with full WCAG 2.1 AA compliance
 * - Keyboard: Escape to close, Tab for focus trap
 * - Screen Readers: role="dialog", aria-modal, aria-labelledby, aria-describedby
 * - Focus Management: Auto-focus on open, return focus on close
 *
 * @since v2.4.0 - Initial implementation for shadcn/ui API compatibility
 */

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sheetVariants, type SheetSide } from '@/lib/variants/sheet-glass-variants';
import { ICON_SIZES } from '@/components/glass/primitives';
import '@/glass-theme.css';

// ========================================
// COMPOUND COMPONENT: ROOT
// ========================================

/**
 * SheetGlass.Root - Sheet root component
 *
 * Supports both controlled (open/onOpenChange) and uncontrolled (with Trigger) modes.
 */
function SheetRoot({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />;
}

// ========================================
// COMPOUND COMPONENT: TRIGGER
// ========================================

/**
 * SheetGlass.Trigger - Opens the sheet when clicked
 *
 * Use `asChild` to render as the child element instead of a button.
 */
function SheetTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

// ========================================
// COMPOUND COMPONENT: PORTAL
// ========================================

/**
 * SheetGlass.Portal - Renders children into a portal
 */
function SheetPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

// ========================================
// COMPOUND COMPONENT: OVERLAY
// ========================================

/**
 * SheetGlass.Overlay - Backdrop with glass blur effect
 */
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="sheet-overlay"
    className={cn(
      'fixed inset-0 z-50',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    style={{
      background: 'var(--modal-overlay)',
      backdropFilter: 'blur(var(--blur-sm))',
      WebkitBackdropFilter: 'blur(var(--blur-sm))',
    }}
    {...props}
  />
));
SheetOverlay.displayName = 'SheetOverlay';

// ========================================
// COMPOUND COMPONENT: CONTENT
// ========================================

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Side from which the sheet slides in */
  side?: SheetSide;
  /** Show close button in top-right corner */
  showCloseButton?: boolean;
}

/**
 * SheetGlass.Content - Main sheet container with glass styling
 *
 * Automatically renders Portal and Overlay.
 *
 * @param side - Direction to slide in from: 'top' | 'right' | 'bottom' | 'left' (default: 'right')
 * @param showCloseButton - Show X button in corner (default: true)
 */
const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, children, side = 'right', showCloseButton = true, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="sheet-content"
      data-side={side}
      className={cn(sheetVariants({ side }), className)}
      style={{
        background: 'var(--modal-bg)',
        border: '1px solid var(--modal-border)',
        boxShadow: 'var(--modal-glow)',
        backdropFilter: 'blur(var(--blur-lg))',
        WebkitBackdropFilter: 'blur(var(--blur-lg))',
      }}
      {...props}
    >
      {/* Glow effect layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'var(--modal-glow-effect)',
          borderRadius: 'inherit',
        }}
        aria-hidden="true"
      />
      {/* Content */}
      <div className="relative flex-1 flex flex-col overflow-auto">{children}</div>
      {/* Close button */}
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="sheet-close"
          className={cn(
            'absolute top-4 right-4',
            'p-1.5 md:p-2 rounded-xl',
            'transition-all duration-300',
            'ring-offset-background',
            'focus:outline-none focus:ring-2 focus:ring-(--semantic-primary) focus:ring-offset-2',
            'hover:opacity-100 opacity-70',
            'disabled:pointer-events-none'
          )}
          style={{
            background: 'var(--modal-close-btn-bg)',
            border: 'var(--modal-close-btn-border)',
            color: 'var(--text-muted)',
          }}
        >
          <X className={ICON_SIZES.md} />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = 'SheetContent';

// ========================================
// COMPOUND COMPONENT: HEADER
// ========================================

/**
 * SheetGlass.Header - Header section with flex layout
 */
function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

// ========================================
// COMPOUND COMPONENT: FOOTER
// ========================================

/**
 * SheetGlass.Footer - Footer section with flex layout for actions
 */
function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-auto pt-4',
        className
      )}
      {...props}
    />
  );
}

// ========================================
// COMPOUND COMPONENT: TITLE
// ========================================

/**
 * SheetGlass.Title - Sheet title with proper accessibility
 */
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="sheet-title"
    className={cn('text-lg md:text-xl font-semibold leading-none tracking-tight', className)}
    style={{ color: 'var(--text-primary)' }}
    {...props}
  />
));
SheetTitle.displayName = 'SheetTitle';

// ========================================
// COMPOUND COMPONENT: DESCRIPTION
// ========================================

/**
 * SheetGlass.Description - Sheet description text
 */
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="sheet-description"
    className={cn('text-sm', className)}
    style={{ color: 'var(--text-muted)' }}
    {...props}
  />
));
SheetDescription.displayName = 'SheetDescription';

// ========================================
// COMPOUND COMPONENT: CLOSE
// ========================================

/**
 * SheetGlass.Close - Closes the sheet when clicked
 *
 * Use `asChild` to render as the child element.
 *
 * @example
 * ```tsx
 * <SheetGlass.Close asChild>
 *   <ButtonGlass variant="ghost">Cancel</ButtonGlass>
 * </SheetGlass.Close>
 * ```
 */
function SheetClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="sheet-close" {...props} />;
}

// ========================================
// EXPORT COMPOUND COMPONENT
// ========================================

/**
 * SheetGlass - Glass-themed Sheet with shadcn/ui API compatibility
 *
 * Built on @radix-ui/react-dialog for full accessibility support.
 *
 * @example Compound component pattern
 * ```tsx
 * <SheetGlass.Root>
 *   <SheetGlass.Trigger asChild>
 *     <ButtonGlass>Open</ButtonGlass>
 *   </SheetGlass.Trigger>
 *   <SheetGlass.Content side="right">
 *     <SheetGlass.Header>
 *       <SheetGlass.Title>Title</SheetGlass.Title>
 *     </SheetGlass.Header>
 *     <p>Content</p>
 *     <SheetGlass.Footer>
 *       <SheetGlass.Close asChild>
 *         <ButtonGlass>Close</ButtonGlass>
 *       </SheetGlass.Close>
 *     </SheetGlass.Footer>
 *   </SheetGlass.Content>
 * </SheetGlass.Root>
 * ```
 */
export const SheetGlass = {
  Root: SheetRoot,
  Trigger: SheetTrigger,
  Portal: SheetPortal,
  Overlay: SheetOverlay,
  Content: SheetContent,
  Header: SheetHeader,
  Footer: SheetFooter,
  Title: SheetTitle,
  Description: SheetDescription,
  Close: SheetClose,
};

// Named exports for direct imports
export {
  SheetRoot,
  SheetTrigger,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
};

// ========================================
// SHADCN/UI COMPATIBLE ALIASES
// ========================================

/**
 * Sheet - shadcn/ui compatible alias for SheetGlass.Root
 */
export const Sheet = SheetRoot;

export type { SheetContentProps, SheetSide };
