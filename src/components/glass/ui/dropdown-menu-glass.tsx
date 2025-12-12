/**
 * DropdownMenuGlass - Compound Component
 *
 * Glass-themed dropdown menu following shadcn/ui compound component pattern.
 * Built on Radix UI primitives with unified glass styling.
 *
 * @example Basic usage
 * ```tsx
 * <DropdownMenuGlass>
 *   <DropdownMenuGlassTrigger asChild>
 *     <Button>Open Menu</Button>
 *   </DropdownMenuGlassTrigger>
 *   <DropdownMenuGlassContent>
 *     <DropdownMenuGlassItem onSelect={() => console.log('Edit')}>
 *       <Edit className="mr-2 h-4 w-4" />
 *       Edit
 *     </DropdownMenuGlassItem>
 *     <DropdownMenuGlassSeparator />
 *     <DropdownMenuGlassItem variant="destructive">
 *       <Trash className="mr-2 h-4 w-4" />
 *       Delete
 *     </DropdownMenuGlassItem>
 *   </DropdownMenuGlassContent>
 * </DropdownMenuGlass>
 * ```
 *
 * @example With labels and groups
 * ```tsx
 * <DropdownMenuGlass>
 *   <DropdownMenuGlassTrigger asChild>
 *     <Button variant="outline">Options</Button>
 *   </DropdownMenuGlassTrigger>
 *   <DropdownMenuGlassContent>
 *     <DropdownMenuGlassLabel>Actions</DropdownMenuGlassLabel>
 *     <DropdownMenuGlassGroup>
 *       <DropdownMenuGlassItem>Copy</DropdownMenuGlassItem>
 *       <DropdownMenuGlassItem>Paste</DropdownMenuGlassItem>
 *     </DropdownMenuGlassGroup>
 *     <DropdownMenuGlassSeparator />
 *     <DropdownMenuGlassLabel>Danger Zone</DropdownMenuGlassLabel>
 *     <DropdownMenuGlassItem variant="destructive">Delete</DropdownMenuGlassItem>
 *   </DropdownMenuGlassContent>
 * </DropdownMenuGlass>
 * ```
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu
 */

'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getDropdownContentStyles,
  dropdownContentClasses,
  getDropdownItemClasses,
  dropdownSeparatorClasses,
  dropdownLabelClasses,
} from '@/lib/variants/dropdown-content-styles';
import '@/glass-theme.css';

// ========================================
// ROOT
// ========================================

const DropdownMenuGlass = DropdownMenuPrimitive.Root;

// ========================================
// TRIGGER
// ========================================

const DropdownMenuGlassTrigger = DropdownMenuPrimitive.Trigger;

// ========================================
// GROUP
// ========================================

const DropdownMenuGlassGroup = DropdownMenuPrimitive.Group;

// ========================================
// PORTAL
// ========================================

const DropdownMenuGlassPortal = DropdownMenuPrimitive.Portal;

// ========================================
// SUB
// ========================================

const DropdownMenuGlassSub = DropdownMenuPrimitive.Sub;

// ========================================
// RADIO GROUP
// ========================================

const DropdownMenuGlassRadioGroup = DropdownMenuPrimitive.RadioGroup;

// ========================================
// SUB TRIGGER
// ========================================

const DropdownMenuGlassSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      getDropdownItemClasses(),
      'data-[state=open]:bg-[var(--dropdown-item-hover)]',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuGlassSubTrigger.displayName = 'DropdownMenuGlassSubTrigger';

// ========================================
// SUB CONTENT
// ========================================

const DropdownMenuGlassSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(dropdownContentClasses, 'p-1.5', className)}
    style={getDropdownContentStyles()}
    {...props}
  />
));
DropdownMenuGlassSubContent.displayName = 'DropdownMenuGlassSubContent';

// ========================================
// CONTENT
// ========================================

const DropdownMenuGlassContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(dropdownContentClasses, 'p-1.5', className)}
      style={getDropdownContentStyles()}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuGlassContent.displayName = 'DropdownMenuGlassContent';

// ========================================
// ITEM
// ========================================

export interface DropdownMenuGlassItemProps extends React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}

const DropdownMenuGlassItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuGlassItemProps
>(({ className, inset, variant = 'default', ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      getDropdownItemClasses({ danger: variant === 'destructive' }),
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuGlassItem.displayName = 'DropdownMenuGlassItem';

// ========================================
// CHECKBOX ITEM
// ========================================

const DropdownMenuGlassCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(getDropdownItemClasses(), 'pl-8 pr-2', className)}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuGlassCheckboxItem.displayName = 'DropdownMenuGlassCheckboxItem';

// ========================================
// RADIO ITEM
// ========================================

const DropdownMenuGlassRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(getDropdownItemClasses(), 'pl-8 pr-2', className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CircleIcon className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuGlassRadioItem.displayName = 'DropdownMenuGlassRadioItem';

// ========================================
// LABEL
// ========================================

const DropdownMenuGlassLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(dropdownLabelClasses, inset && 'pl-8', className)}
    {...props}
  />
));
DropdownMenuGlassLabel.displayName = 'DropdownMenuGlassLabel';

// ========================================
// SEPARATOR
// ========================================

const DropdownMenuGlassSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(dropdownSeparatorClasses, '-mx-1 my-1', className)}
    {...props}
  />
));
DropdownMenuGlassSeparator.displayName = 'DropdownMenuGlassSeparator';

// ========================================
// SHORTCUT
// ========================================

const DropdownMenuGlassShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-(--text-muted)', className)}
      {...props}
    />
  );
};
DropdownMenuGlassShortcut.displayName = 'DropdownMenuGlassShortcut';

// ========================================
// EXPORTS
// ========================================

export {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
  DropdownMenuGlassCheckboxItem,
  DropdownMenuGlassRadioItem,
  DropdownMenuGlassLabel,
  DropdownMenuGlassSeparator,
  DropdownMenuGlassShortcut,
  DropdownMenuGlassGroup,
  DropdownMenuGlassPortal,
  DropdownMenuGlassSub,
  DropdownMenuGlassSubContent,
  DropdownMenuGlassSubTrigger,
  DropdownMenuGlassRadioGroup,
};
