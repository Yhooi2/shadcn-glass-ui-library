/**
 * DropdownMenuGlass - Compound Component
 *
 * Glass-themed dropdown menu following shadcn/ui compound component pattern.
 * Built on Radix UI primitives with unified glass styling and full keyboard navigation.
 *
 * ## Features
 * - **Compound Component API** - Root, Trigger, Content, Item, and more sub-components
 * - **Radix UI Primitives** - Built on @radix-ui/react-dropdown-menu for robust accessibility
 * - **Glassmorphism Styling** - Backdrop blur, glow effects, CSS variables
 * - **Theme Support** - Works with all 3 themes (glass, light, aurora)
 * - **shadcn/ui Compatible** - 100% API compatibility with shadcn/ui DropdownMenu
 * - **Rich Features** - Checkboxes, radio groups, sub-menus, labels, separators, shortcuts
 * - **Keyboard Accessible** - Full keyboard navigation (Tab, Arrow keys, Enter, Escape)
 * - **Variant Support** - Default and destructive item variants
 *
 * ## Sub-Components
 * - `DropdownMenuGlass` - Root context provider
 * - `DropdownMenuGlassTrigger` - Opens menu when clicked (supports asChild)
 * - `DropdownMenuGlassContent` - Main menu container with glass styling
 * - `DropdownMenuGlassItem` - Individual menu item (supports variant prop)
 * - `DropdownMenuGlassCheckboxItem` - Checkbox menu item with checked state
 * - `DropdownMenuGlassRadioItem` - Radio button menu item
 * - `DropdownMenuGlassRadioGroup` - Container for radio items
 * - `DropdownMenuGlassLabel` - Label for menu sections
 * - `DropdownMenuGlassSeparator` - Visual divider
 * - `DropdownMenuGlassGroup` - Groups related items
 * - `DropdownMenuGlassSub` - Sub-menu context
 * - `DropdownMenuGlassSubTrigger` - Opens sub-menu
 * - `DropdownMenuGlassSubContent` - Sub-menu content
 * - `DropdownMenuGlassShortcut` - Keyboard shortcut display
 *
 * ## CSS Variables
 * Customize styling via theme CSS variables:
 * - `--dropdown-bg` - Menu background color
 * - `--dropdown-border` - Menu border color
 * - `--dropdown-glow` - Menu box shadow
 * - `--dropdown-item-hover` - Item hover background
 * - `--dropdown-item-danger` - Destructive item color
 * - `--dropdown-item-danger-hover` - Destructive item hover background
 * - `--text-primary`, `--text-secondary`, `--text-muted` - Text colors
 * - `--blur-md` (16px) - Backdrop blur for menu
 *
 * @example Basic usage
 * ```tsx
 * import { DropdownMenuGlass, DropdownMenuGlassTrigger, DropdownMenuGlassContent, DropdownMenuGlassItem } from 'shadcn-glass-ui'
 *
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
 * @example With keyboard shortcuts
 * ```tsx
 * <DropdownMenuGlassContent>
 *   <DropdownMenuGlassItem>
 *     <Copy className="mr-2 h-4 w-4" />
 *     Copy
 *     <DropdownMenuGlassShortcut>⌘C</DropdownMenuGlassShortcut>
 *   </DropdownMenuGlassItem>
 *   <DropdownMenuGlassItem>
 *     <Paste className="mr-2 h-4 w-4" />
 *     Paste
 *     <DropdownMenuGlassShortcut>⌘V</DropdownMenuGlassShortcut>
 *   </DropdownMenuGlassItem>
 * </DropdownMenuGlassContent>
 * ```
 *
 * @example With checkboxes
 * ```tsx
 * const [showStatusBar, setShowStatusBar] = useState(true)
 *
 * <DropdownMenuGlassContent>
 *   <DropdownMenuGlassCheckboxItem
 *     checked={showStatusBar}
 *     onCheckedChange={setShowStatusBar}
 *   >
 *     Status Bar
 *   </DropdownMenuGlassCheckboxItem>
 * </DropdownMenuGlassContent>
 * ```
 *
 * @accessibility
 * - **Keyboard Navigation:** Full keyboard support with Tab, Arrow keys, Enter to select, Escape to close
 * - **Focus Management:** Auto-focus on open, returns focus to trigger on close
 * - **Screen Readers:** Proper ARIA attributes (role="menu", aria-haspopup, aria-expanded)
 * - **Item Variants:** Destructive items have appropriate visual styling for dangerous actions
 * - **Checkboxes/Radio:** Proper indicator icons and checked state announcements
 * - **Sub-menus:** Arrow icon indicator and keyboard navigation support
 * - **Touch Targets:** All items meet minimum 44x44px touch target (WCAG 2.5.5)
 * - **Color Contrast:** All text meets WCAG AA contrast ratio 4.5:1 minimum
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu
 * @since v1.0.0
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

// Note: DropdownMenuPrimitive.Root is a context provider and doesn't render DOM,
// so data-slot is applied to Content instead. This matches shadcn/ui pattern.
const DropdownMenuGlassRoot = (
  props: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>
) => <DropdownMenuPrimitive.Root {...props} />;
DropdownMenuGlassRoot.displayName = 'DropdownMenuGlass';

const DropdownMenuGlass = DropdownMenuGlassRoot;

// ========================================
// TRIGGER
// ========================================

const DropdownMenuGlassTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>((props, ref) => (
  <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" ref={ref} {...props} />
));
DropdownMenuGlassTrigger.displayName = 'DropdownMenuGlassTrigger';

// ========================================
// GROUP
// ========================================

const DropdownMenuGlassGroup = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>
>((props, ref) => (
  <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" ref={ref} {...props} />
));
DropdownMenuGlassGroup.displayName = 'DropdownMenuGlassGroup';

// ========================================
// PORTAL
// ========================================

const DropdownMenuGlassPortal = DropdownMenuPrimitive.Portal;

// ========================================
// SUB
// ========================================

// Note: DropdownMenuPrimitive.Sub is a context provider and doesn't render DOM,
// so data-slot is applied to SubContent instead. This matches shadcn/ui pattern.
const DropdownMenuGlassSub = (
  props: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub>
) => <DropdownMenuPrimitive.Sub {...props} />;
DropdownMenuGlassSub.displayName = 'DropdownMenuGlassSub';

// ========================================
// RADIO GROUP
// ========================================

const DropdownMenuGlassRadioGroup = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioGroup>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>
>((props, ref) => (
  <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" ref={ref} {...props} />
));
DropdownMenuGlassRadioGroup.displayName = 'DropdownMenuGlassRadioGroup';

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
    data-slot="dropdown-menu-sub-trigger"
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
    data-slot="dropdown-menu-sub-content"
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
      data-slot="dropdown-menu-content"
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

/**
 * Props for DropdownMenuGlassItem component.
 *
 * Individual menu item with support for icons, variants, and keyboard shortcuts.
 *
 * @example
 * ```tsx
 * const props: DropdownMenuGlassItemProps = {
 *   variant: 'destructive',
 *   onSelect: () => handleDelete(),
 *   children: (
 *     <>
 *       <Trash className="mr-2 h-4 w-4" />
 *       Delete
 *     </>
 *   ),
 * };
 * ```
 */
export interface DropdownMenuGlassItemProps extends React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> {
  /**
   * Adds left padding to align with items that have icons.
   *
   * @default false
   */
  inset?: boolean;

  /**
   * Visual variant of the menu item.
   * - `default` - Standard menu item styling
   * - `destructive` - Red styling for dangerous actions
   *
   * @default "default"
   */
  variant?: 'default' | 'destructive';
}

const DropdownMenuGlassItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuGlassItemProps
>(({ className, inset, variant = 'default', ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    data-slot="dropdown-menu-item"
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
    data-slot="dropdown-menu-checkbox-item"
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
    data-slot="dropdown-menu-radio-item"
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
    data-slot="dropdown-menu-label"
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
    data-slot="dropdown-menu-separator"
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
      data-slot="dropdown-menu-shortcut"
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

// ========================================
// SHADCN/UI COMPATIBLE ALIASES
// ========================================

/**
 * shadcn/ui compatible aliases for DropdownMenuGlass components
 *
 * @example
 * ```tsx
 * import {
 *   DropdownMenu,
 *   DropdownMenuTrigger,
 *   DropdownMenuContent,
 *   DropdownMenuItem,
 * } from 'shadcn-glass-ui'
 *
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Profile</DropdownMenuItem>
 *     <DropdownMenuItem>Settings</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 * @since v2.5.0
 */
export const DropdownMenu = DropdownMenuGlass;
export const DropdownMenuTrigger = DropdownMenuGlassTrigger;
export const DropdownMenuContent = DropdownMenuGlassContent;
export const DropdownMenuItem = DropdownMenuGlassItem;
export const DropdownMenuCheckboxItem = DropdownMenuGlassCheckboxItem;
export const DropdownMenuRadioItem = DropdownMenuGlassRadioItem;
export const DropdownMenuLabel = DropdownMenuGlassLabel;
export const DropdownMenuSeparator = DropdownMenuGlassSeparator;
export const DropdownMenuShortcut = DropdownMenuGlassShortcut;
export const DropdownMenuGroup = DropdownMenuGlassGroup;
export const DropdownMenuPortal = DropdownMenuGlassPortal;
export const DropdownMenuSub = DropdownMenuGlassSub;
export const DropdownMenuSubContent = DropdownMenuGlassSubContent;
export const DropdownMenuSubTrigger = DropdownMenuGlassSubTrigger;
export const DropdownMenuRadioGroup = DropdownMenuGlassRadioGroup;
