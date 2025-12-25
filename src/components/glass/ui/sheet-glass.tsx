/* eslint-disable react-refresh/only-export-components */
/**
 * SheetGlass Component
 *
 * Glass-themed sheet/drawer component with full shadcn/ui Sheet API compatibility.
 * Slides in from top, right, bottom, or left edges with backdrop overlay and blur effects.
 *
 * ## Features
 * - 4 slide directions: top, right, bottom, left
 * - Backdrop overlay with blur effect and click-to-close
 * - Auto close button in corner (optional via showCloseButton)
 * - ESC key and click-outside to dismiss
 * - Focus trap and keyboard navigation
 * - Portal rendering (always in document.body)
 * - Controlled and uncontrolled modes
 * - 100% shadcn/ui compatible API
 * - Theme-aware glass styling via CSS variables
 *
 * ## Sub-Components
 * - **SheetGlass.Root / Sheet**: Sheet root with open/onOpenChange state
 * - **SheetGlass.Trigger / SheetTrigger**: Opens sheet when clicked (supports asChild)
 * - **SheetGlass.Portal / SheetPortal**: Renders children into portal
 * - **SheetGlass.Overlay / SheetOverlay**: Backdrop with glass blur effect
 * - **SheetGlass.Content / SheetContent**: Main container with side prop and glass styling
 * - **SheetGlass.Header / SheetHeader**: Header section with flex layout
 * - **SheetGlass.Title / SheetTitle**: Sheet title with accessibility
 * - **SheetGlass.Description / SheetDescription**: Sheet description text
 * - **SheetGlass.Footer / SheetFooter**: Footer with action buttons layout
 * - **SheetGlass.Close / SheetClose**: Closes sheet when clicked (supports asChild)
 *
 * ## CSS Variables
 * Uses ModalGlass CSS variables for consistent styling:
 * - `--modal-bg`: Sheet background color (glass effect)
 * - `--modal-border`: Sheet border color
 * - `--modal-glow`: Sheet shadow/glow effect
 * - `--modal-glow-effect`: Inner glow layer
 * - `--modal-overlay`: Backdrop overlay color
 * - `--modal-close-btn-bg`: Close button background
 * - `--modal-close-btn-border`: Close button border
 *
 * @example Navigation drawer (left side)
 * ```tsx
 * import { SheetGlass, ButtonGlass } from 'shadcn-glass-ui'
 *
 * function Navigation() {
 *   return (
 *     <SheetGlass.Root>
 *       <SheetGlass.Trigger asChild>
 *         <ButtonGlass>Menu</ButtonGlass>
 *       </SheetGlass.Trigger>
 *       <SheetGlass.Content side="left">
 *         <SheetGlass.Header>
 *           <SheetGlass.Title>Navigation</SheetGlass.Title>
 *         </SheetGlass.Header>
 *         <nav>...</nav>
 *       </SheetGlass.Content>
 *     </SheetGlass.Root>
 *   )
 * }
 * ```
 *
 * @example Filters panel (right side)
 * ```tsx
 * <SheetGlass.Root>
 *   <SheetGlass.Trigger asChild>
 *     <ButtonGlass variant="outline">Filters</ButtonGlass>
 *   </SheetGlass.Trigger>
 *   <SheetGlass.Content side="right">
 *     <SheetGlass.Header>
 *       <SheetGlass.Title>Filter Options</SheetGlass.Title>
 *     </SheetGlass.Header>
 *     <div>Filter controls...</div>
 *     <SheetGlass.Footer>
 *       <SheetGlass.Close asChild>
 *         <ButtonGlass variant="ghost">Cancel</ButtonGlass>
 *       </SheetGlass.Close>
 *       <ButtonGlass>Apply Filters</ButtonGlass>
 *     </SheetGlass.Footer>
 *   </SheetGlass.Content>
 * </SheetGlass.Root>
 * ```
 *
 * @example Notifications panel (top)
 * ```tsx
 * <SheetGlass.Root>
 *   <SheetGlass.Trigger asChild>
 *     <ButtonGlass>Notifications</ButtonGlass>
 *   </SheetGlass.Trigger>
 *   <SheetGlass.Content side="top">
 *     <SheetGlass.Header>
 *       <SheetGlass.Title>Recent Activity</SheetGlass.Title>
 *     </SheetGlass.Header>
 *     <div>Notifications list...</div>
 *   </SheetGlass.Content>
 * </SheetGlass.Root>
 * ```
 *
 * @example Mobile actions menu (bottom)
 * ```tsx
 * <SheetGlass.Root>
 *   <SheetGlass.Trigger asChild>
 *     <ButtonGlass>Actions</ButtonGlass>
 *   </SheetGlass.Trigger>
 *   <SheetGlass.Content side="bottom">
 *     <SheetGlass.Header>
 *       <SheetGlass.Title>Choose an action</SheetGlass.Title>
 *     </SheetGlass.Header>
 *     <div>Action buttons...</div>
 *   </SheetGlass.Content>
 * </SheetGlass.Root>
 * ```
 *
 * @accessibility
 * - Built on Radix UI Dialog with full WCAG 2.1 AA compliance
 * - Keyboard: Escape to close, Tab/Shift+Tab for focus navigation
 * - Screen Readers: role="dialog", aria-modal="true", aria-labelledby, aria-describedby
 * - Focus Management: Auto-focus first focusable element, return focus on close
 * - Focus Trap: Prevents tabbing outside sheet while open
 * - Close Button: Always includes accessible "Close" label for screen readers
 *
 * @since v2.4.0
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

/**
 * Props for SheetContent component.
 *
 * @example
 * ```tsx
 * const props: SheetContentProps = {
 *   side: 'right',
 *   showCloseButton: true,
 * };
 * ```
 */
interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /**
   * Side from which the sheet slides in.
   *
   * @default 'right'
   * @example
   * ```tsx
   * <SheetGlass.Content side="left">...</SheetGlass.Content>
   * ```
   */
  side?: SheetSide;

  /**
   * Show close button (X) in top-right corner.
   *
   * @default true
   * @example
   * ```tsx
   * <SheetGlass.Content showCloseButton={false}>...</SheetGlass.Content>
   * ```
   */
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
