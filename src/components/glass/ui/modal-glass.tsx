/* eslint-disable react-refresh/only-export-components */
/**
 * ModalGlass Component (Radix UI Dialog-based)
 *
 * Glass-themed modal/dialog with full shadcn/ui Dialog API compatibility.
 * Built on @radix-ui/react-dialog for accessibility and state management.
 *
 * @example Uncontrolled with Trigger (shadcn/ui pattern)
 * ```tsx
 * <ModalGlass.Root>
 *   <ModalGlass.Trigger asChild>
 *     <ButtonGlass>Open Dialog</ButtonGlass>
 *   </ModalGlass.Trigger>
 *   <ModalGlass.Content>
 *     <ModalGlass.Header>
 *       <ModalGlass.Title>Dialog Title</ModalGlass.Title>
 *       <ModalGlass.Description>Dialog description</ModalGlass.Description>
 *     </ModalGlass.Header>
 *     <ModalGlass.Body>Content here</ModalGlass.Body>
 *     <ModalGlass.Footer>
 *       <ModalGlass.Close asChild>
 *         <ButtonGlass variant="ghost">Cancel</ButtonGlass>
 *       </ModalGlass.Close>
 *       <ButtonGlass>Confirm</ButtonGlass>
 *     </ModalGlass.Footer>
 *   </ModalGlass.Content>
 * </ModalGlass.Root>
 * ```
 *
 * @example Controlled mode (programmatic)
 * ```tsx
 * <ModalGlass.Root open={open} onOpenChange={setOpen}>
 *   <ModalGlass.Content>
 *     <ModalGlass.Header>
 *       <ModalGlass.Title>Confirm Action</ModalGlass.Title>
 *     </ModalGlass.Header>
 *     <ModalGlass.Body>Are you sure?</ModalGlass.Body>
 *     <ModalGlass.Footer>
 *       <ButtonGlass onClick={() => setOpen(false)}>Cancel</ButtonGlass>
 *     </ModalGlass.Footer>
 *   </ModalGlass.Content>
 * </ModalGlass.Root>
 * ```
 *
 * @accessibility
 * - Built on Radix UI Dialog with full WCAG 2.1 AA compliance
 * - Keyboard: Escape to close, Tab for focus trap
 * - Screen Readers: role="dialog", aria-modal, aria-labelledby, aria-describedby
 * - Focus Management: Auto-focus on open, return focus on close
 *
 * @since v2.0.0 - Migrated to Radix UI Dialog, added Trigger and Portal
 */

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { modalSizes, type ModalSize } from '@/lib/variants/modal-glass-variants';
import { ICON_SIZES } from '@/components/glass/primitives';
import '@/glass-theme.css';

// ========================================
// CONTEXT FOR SIZE (optional enhancement)
// ========================================

interface ModalContextValue {
  size: ModalSize;
}

const ModalContext = React.createContext<ModalContextValue>({ size: 'md' });

const useModalContext = () => React.useContext(ModalContext);

// ========================================
// COMPOUND COMPONENT: ROOT
// ========================================

interface ModalRootProps extends React.ComponentProps<typeof DialogPrimitive.Root> {
  /** Size variant for the modal */
  size?: ModalSize;
}

/**
 * ModalGlass.Root - Dialog root component
 *
 * Supports both controlled (open/onOpenChange) and uncontrolled (with Trigger) modes.
 */
function ModalRoot({ size = 'md', children, ...props }: ModalRootProps) {
  return (
    <ModalContext.Provider value={{ size }}>
      <DialogPrimitive.Root data-slot="dialog" {...props}>
        {children}
      </DialogPrimitive.Root>
    </ModalContext.Provider>
  );
}

// ========================================
// COMPOUND COMPONENT: TRIGGER
// ========================================

/**
 * ModalGlass.Trigger - Opens the modal when clicked
 *
 * Use `asChild` to render as the child element instead of a button.
 */
function ModalTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

// ========================================
// COMPOUND COMPONENT: PORTAL
// ========================================

/**
 * ModalGlass.Portal - Renders children into a portal
 */
function ModalPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

// ========================================
// COMPOUND COMPONENT: OVERLAY
// ========================================

/**
 * ModalGlass.Overlay - Backdrop with glass blur effect
 */
const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="dialog-overlay"
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
ModalOverlay.displayName = 'ModalOverlay';

// ========================================
// COMPOUND COMPONENT: CONTENT
// ========================================

interface ModalContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Show close button in top-right corner */
  showCloseButton?: boolean;
  /** Override size from Root */
  size?: ModalSize;
}

/**
 * ModalGlass.Content - Main modal container with glass styling
 *
 * Automatically renders Portal and Overlay.
 */
const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, children, showCloseButton = true, size: sizeProp, ...props }, ref) => {
  const { size: contextSize } = useModalContext();
  const size = sizeProp ?? contextSize;

  return (
    <ModalPortal>
      <ModalOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content"
        className={cn(
          modalSizes({ size }),
          'fixed top-[50%] left-[50%] z-50',
          'translate-x-[-50%] translate-y-[-50%]',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          'duration-200',
          className
        )}
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
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ background: 'var(--modal-glow-effect)' }}
          aria-hidden="true"
        />
        {/* Content */}
        <div className="relative">{children}</div>
        {/* Close button */}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
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
    </ModalPortal>
  );
});
ModalContent.displayName = 'ModalContent';

// ========================================
// COMPOUND COMPONENT: HEADER
// ========================================

/**
 * ModalGlass.Header - Header section with flex layout
 */
function ModalHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left mb-4', className)}
      {...props}
    />
  );
}

// ========================================
// COMPOUND COMPONENT: BODY
// ========================================

/**
 * ModalGlass.Body - Main content area
 *
 * Note: shadcn/ui Dialog doesn't have DialogBody, but we keep it for convenience.
 */
function ModalBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-body"
      className={cn('relative', className)}
      style={{ color: 'var(--text-secondary)' }}
      {...props}
    />
  );
}

// ========================================
// COMPOUND COMPONENT: FOOTER
// ========================================

/**
 * ModalGlass.Footer - Footer section with flex layout for actions
 */
function ModalFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-4', className)}
      {...props}
    />
  );
}

// ========================================
// COMPOUND COMPONENT: TITLE
// ========================================

/**
 * ModalGlass.Title - Modal title with proper accessibility
 */
const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="dialog-title"
    className={cn('text-lg md:text-xl font-semibold leading-none tracking-tight', className)}
    style={{ color: 'var(--text-primary)' }}
    {...props}
  />
));
ModalTitle.displayName = 'ModalTitle';

// ========================================
// COMPOUND COMPONENT: DESCRIPTION
// ========================================

/**
 * ModalGlass.Description - Modal description text
 */
const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="dialog-description"
    className={cn('text-sm', className)}
    style={{ color: 'var(--text-muted)' }}
    {...props}
  />
));
ModalDescription.displayName = 'ModalDescription';

// ========================================
// COMPOUND COMPONENT: CLOSE
// ========================================

/**
 * ModalGlass.Close - Closes the modal when clicked
 *
 * Use `asChild` to render as the child element.
 *
 * @example
 * ```tsx
 * <ModalGlass.Close asChild>
 *   <ButtonGlass variant="ghost">Cancel</ButtonGlass>
 * </ModalGlass.Close>
 * ```
 */
function ModalClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

// ========================================
// EXPORT COMPOUND COMPONENT
// ========================================

/**
 * ModalGlass - Glass-themed Dialog with shadcn/ui API compatibility
 *
 * Built on @radix-ui/react-dialog for full accessibility support.
 *
 * @example Uncontrolled (with Trigger)
 * ```tsx
 * <ModalGlass.Root>
 *   <ModalGlass.Trigger asChild>
 *     <ButtonGlass>Open</ButtonGlass>
 *   </ModalGlass.Trigger>
 *   <ModalGlass.Content>
 *     <ModalGlass.Header>
 *       <ModalGlass.Title>Title</ModalGlass.Title>
 *     </ModalGlass.Header>
 *     <ModalGlass.Body>Content</ModalGlass.Body>
 *     <ModalGlass.Footer>
 *       <ModalGlass.Close asChild>
 *         <ButtonGlass>Close</ButtonGlass>
 *       </ModalGlass.Close>
 *     </ModalGlass.Footer>
 *   </ModalGlass.Content>
 * </ModalGlass.Root>
 * ```
 *
 * @example Controlled
 * ```tsx
 * <ModalGlass.Root open={open} onOpenChange={setOpen}>
 *   <ModalGlass.Content showCloseButton={false}>
 *     <ModalGlass.Header>
 *       <ModalGlass.Title>Confirm</ModalGlass.Title>
 *     </ModalGlass.Header>
 *     <ModalGlass.Footer>
 *       <ButtonGlass onClick={() => setOpen(false)}>OK</ButtonGlass>
 *     </ModalGlass.Footer>
 *   </ModalGlass.Content>
 * </ModalGlass.Root>
 * ```
 */
export const ModalGlass = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Portal: ModalPortal,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
};

// Named exports for direct imports
export {
  ModalRoot,
  ModalTrigger,
  ModalPortal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
};

export type { ModalRootProps, ModalContentProps };
