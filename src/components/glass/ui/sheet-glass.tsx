/* eslint-disable react-refresh/only-export-components */
/**
 * SheetGlass Component
 *
 * Glass-themed side panel drawer with:
 * - Theme-aware styling (glass/light/aurora)
 * - Four side positions (top, right, bottom, left)
 * - Smooth slide animations
 * - Backdrop blur overlay
 * - 100% shadcn/ui Sheet API compatible
 *
 * @accessibility
 * - Uses `role="dialog"` and `aria-modal="true"`
 * - Escape key closes the sheet
 * - Focus trapped within sheet when open
 * - Focus returns to trigger on close
 * - Body scroll locked when open
 *
 * @example
 * ```tsx
 * // Basic sheet (right side)
 * <SheetGlass.Root>
 *   <SheetGlass.Trigger asChild>
 *     <ButtonGlass>Open Menu</ButtonGlass>
 *   </SheetGlass.Trigger>
 *   <SheetGlass.Content>
 *     <SheetGlass.Header>
 *       <SheetGlass.Title>Menu</SheetGlass.Title>
 *       <SheetGlass.Description>Navigation options</SheetGlass.Description>
 *     </SheetGlass.Header>
 *     <div className="py-4">Content here</div>
 *     <SheetGlass.Footer>
 *       <SheetGlass.Close asChild>
 *         <ButtonGlass>Close</ButtonGlass>
 *       </SheetGlass.Close>
 *     </SheetGlass.Footer>
 *   </SheetGlass.Content>
 * </SheetGlass.Root>
 *
 * // Left side sheet
 * <SheetGlass.Root>
 *   <SheetGlass.Trigger>Open</SheetGlass.Trigger>
 *   <SheetGlass.Content side="left">...</SheetGlass.Content>
 * </SheetGlass.Root>
 * ```
 */

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// VARIANTS
// ========================================

const sheetVariants = cva(
  // Base styles
  [
    'fixed z-50 gap-4 p-6',
    // Glass styling
    'bg-[var(--sheet-bg,var(--modal-bg))]',
    'border-[var(--sheet-border,var(--modal-border))]',
    'backdrop-blur-lg',
    // Animation base
    'transition-all duration-300 ease-in-out',
    // Data state animations
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
  ],
  {
    variants: {
      side: {
        top: [
          'inset-x-0 top-0 border-b',
          'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        ],
        bottom: [
          'inset-x-0 bottom-0 border-t',
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        ],
        left: [
          'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        ],
        right: [
          'inset-y-0 right-0 h-full w-3/4 border-r sm:max-w-sm',
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
        ],
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

// ========================================
// ROOT COMPONENT
// ========================================

const SheetGlassRoot = DialogPrimitive.Root;

// ========================================
// TRIGGER COMPONENT
// ========================================

const SheetGlassTrigger = DialogPrimitive.Trigger;

// ========================================
// CLOSE COMPONENT
// ========================================

const SheetGlassClose = DialogPrimitive.Close;

// ========================================
// PORTAL COMPONENT
// ========================================

const SheetGlassPortal = DialogPrimitive.Portal;

// ========================================
// OVERLAY COMPONENT
// ========================================

export type SheetGlassOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

const SheetGlassOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  SheetGlassOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50',
      // Glass overlay
      'bg-[var(--sheet-overlay,var(--modal-overlay))]',
      'backdrop-blur-sm',
      // Animations
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));

SheetGlassOverlay.displayName = 'SheetGlassOverlay';

// ========================================
// CONTENT COMPONENT
// ========================================

export interface SheetGlassContentProps
  extends
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetGlassContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetGlassContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetGlassPortal>
    <SheetGlassOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className={cn(
          'absolute right-4 top-4 rounded-sm',
          'opacity-70 ring-offset-background',
          'transition-opacity hover:opacity-100',
          'focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2',
          'disabled:pointer-events-none',
          'data-[state=open]:bg-secondary'
        )}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetGlassPortal>
));

SheetGlassContent.displayName = 'SheetGlassContent';

// ========================================
// HEADER COMPONENT
// ========================================

export type SheetGlassHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const SheetGlassHeader = ({ className, ...props }: SheetGlassHeaderProps) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);

SheetGlassHeader.displayName = 'SheetGlassHeader';

// ========================================
// FOOTER COMPONENT
// ========================================

export type SheetGlassFooterProps = React.HTMLAttributes<HTMLDivElement>;

const SheetGlassFooter = ({ className, ...props }: SheetGlassFooterProps) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);

SheetGlassFooter.displayName = 'SheetGlassFooter';

// ========================================
// TITLE COMPONENT
// ========================================

export type SheetGlassTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

const SheetGlassTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  SheetGlassTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold',
      'text-[var(--sheet-title,var(--text-primary))]',
      className
    )}
    {...props}
  />
));

SheetGlassTitle.displayName = 'SheetGlassTitle';

// ========================================
// DESCRIPTION COMPONENT
// ========================================

export type SheetGlassDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;

const SheetGlassDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  SheetGlassDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm', 'text-[var(--sheet-description,var(--text-muted))]', className)}
    {...props}
  />
));

SheetGlassDescription.displayName = 'SheetGlassDescription';

// ========================================
// COMPOUND EXPORT
// ========================================

/**
 * SheetGlass - A glass-themed side panel drawer
 *
 * @example
 * ```tsx
 * // Mobile navigation menu
 * <SheetGlass.Root>
 *   <SheetGlass.Trigger asChild>
 *     <ButtonGlass variant="ghost" size="icon">
 *       <Menu className="h-5 w-5" />
 *     </ButtonGlass>
 *   </SheetGlass.Trigger>
 *   <SheetGlass.Content side="left">
 *     <SheetGlass.Header>
 *       <SheetGlass.Title>Navigation</SheetGlass.Title>
 *     </SheetGlass.Header>
 *     <nav className="flex flex-col gap-4 py-4">
 *       <a href="/">Home</a>
 *       <a href="/about">About</a>
 *       <a href="/contact">Contact</a>
 *     </nav>
 *   </SheetGlass.Content>
 * </SheetGlass.Root>
 *
 * // Filter panel
 * <SheetGlass.Root>
 *   <SheetGlass.Trigger asChild>
 *     <ButtonGlass variant="outline">
 *       <Filter className="h-4 w-4 mr-2" />
 *       Filters
 *     </ButtonGlass>
 *   </SheetGlass.Trigger>
 *   <SheetGlass.Content>
 *     <SheetGlass.Header>
 *       <SheetGlass.Title>Filters</SheetGlass.Title>
 *       <SheetGlass.Description>
 *         Narrow down your search results
 *       </SheetGlass.Description>
 *     </SheetGlass.Header>
 *     <div className="py-4 space-y-4">
 *       <CheckboxGlass label="In Stock" />
 *       <CheckboxGlass label="On Sale" />
 *       <SliderGlass label="Price Range" />
 *     </div>
 *     <SheetGlass.Footer>
 *       <SheetGlass.Close asChild>
 *         <ButtonGlass variant="ghost">Reset</ButtonGlass>
 *       </SheetGlass.Close>
 *       <ButtonGlass>Apply Filters</ButtonGlass>
 *     </SheetGlass.Footer>
 *   </SheetGlass.Content>
 * </SheetGlass.Root>
 *
 * // Bottom sheet for mobile
 * <SheetGlass.Root>
 *   <SheetGlass.Trigger>Share</SheetGlass.Trigger>
 *   <SheetGlass.Content side="bottom">
 *     <SheetGlass.Header>
 *       <SheetGlass.Title>Share</SheetGlass.Title>
 *     </SheetGlass.Header>
 *     <div className="grid grid-cols-4 gap-4 py-4">
 *       {shareOptions.map((option) => (
 *         <button key={option.name} className="flex flex-col items-center gap-2">
 *           <option.icon className="h-8 w-8" />
 *           <span className="text-xs">{option.name}</span>
 *         </button>
 *       ))}
 *     </div>
 *   </SheetGlass.Content>
 * </SheetGlass.Root>
 * ```
 */
export const SheetGlass = {
  Root: SheetGlassRoot,
  Trigger: SheetGlassTrigger,
  Close: SheetGlassClose,
  Portal: SheetGlassPortal,
  Overlay: SheetGlassOverlay,
  Content: SheetGlassContent,
  Header: SheetGlassHeader,
  Footer: SheetGlassFooter,
  Title: SheetGlassTitle,
  Description: SheetGlassDescription,
};

// Named exports for direct imports
export {
  SheetGlassRoot,
  SheetGlassTrigger,
  SheetGlassClose,
  SheetGlassPortal,
  SheetGlassOverlay,
  SheetGlassContent,
  SheetGlassHeader,
  SheetGlassFooter,
  SheetGlassTitle,
  SheetGlassDescription,
};
