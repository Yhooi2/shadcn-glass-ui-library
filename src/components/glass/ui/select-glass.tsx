/**
 * SelectGlass Component
 *
 * Glass-themed select dropdown with compound component API for flexible composition.
 * Built on @radix-ui/react-select for accessibility, keyboard navigation, and robust selection behavior.
 *
 * ## Features
 * - Compound API with 9 sub-components for maximum flexibility
 * - Full shadcn/ui API compatibility (drop-in replacement)
 * - Keyboard navigation (Arrow keys, Enter, Escape, Home/End)
 * - Grouped options with labels and separators
 * - Custom scroll buttons for long lists
 * - Glass morphism styling with theme-aware CSS variables
 * - Accessible ARIA attributes and focus management
 * - Type-safe value handling with TypeScript generics
 *
 * ## CSS Variables
 * - `--input-bg` - Trigger button background
 * - `--input-border` - Trigger button border color
 * - `--input-text` - Trigger button text color
 * - `--dropdown-bg` - Content background
 * - `--dropdown-border` - Content border color
 * - `--dropdown-item-hover` - Item hover background
 * - `--dropdown-item-text` - Item text color
 * - `--dropdown-glow` - Content box shadow
 * - `--text-secondary` - Scroll button icon color
 *
 * @example Basic usage
 * ```tsx
 * import { SelectGlass, SelectGlassTrigger, SelectGlassValue, SelectGlassContent, SelectGlassItem } from 'shadcn-glass-ui'
 *
 * <SelectGlass>
 *   <SelectGlassTrigger className="w-[180px]">
 *     <SelectGlassValue placeholder="Select a fruit" />
 *   </SelectGlassTrigger>
 *   <SelectGlassContent>
 *     <SelectGlassItem value="apple">Apple</SelectGlassItem>
 *     <SelectGlassItem value="banana">Banana</SelectGlassItem>
 *     <SelectGlassItem value="orange">Orange</SelectGlassItem>
 *   </SelectGlassContent>
 * </SelectGlass>
 * ```
 *
 * @example With groups and labels
 * ```tsx
 * <SelectGlass>
 *   <SelectGlassTrigger className="w-[200px]">
 *     <SelectGlassValue placeholder="Select a framework" />
 *   </SelectGlassTrigger>
 *   <SelectGlassContent>
 *     <SelectGlassGroup>
 *       <SelectGlassLabel>Frontend</SelectGlassLabel>
 *       <SelectGlassItem value="react">React</SelectGlassItem>
 *       <SelectGlassItem value="vue">Vue</SelectGlassItem>
 *     </SelectGlassGroup>
 *     <SelectGlassSeparator />
 *     <SelectGlassGroup>
 *       <SelectGlassLabel>Backend</SelectGlassLabel>
 *       <SelectGlassItem value="node">Node.js</SelectGlassItem>
 *       <SelectGlassItem value="python">Python</SelectGlassItem>
 *     </SelectGlassGroup>
 *   </SelectGlassContent>
 * </SelectGlass>
 * ```
 *
 * @example Controlled state
 * ```tsx
 * const [value, setValue] = useState('react')
 *
 * <SelectGlass value={value} onValueChange={setValue}>
 *   <SelectGlassTrigger className="w-[200px]">
 *     <SelectGlassValue />
 *   </SelectGlassTrigger>
 *   <SelectGlassContent>
 *     <SelectGlassItem value="react">React</SelectGlassItem>
 *     <SelectGlassItem value="vue">Vue</SelectGlassItem>
 *   </SelectGlassContent>
 * </SelectGlass>
 * ```
 *
 * @example shadcn/ui compatible aliases
 * ```tsx
 * import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from 'shadcn-glass-ui'
 *
 * <Select>
 *   <SelectTrigger className="w-[180px]">
 *     <SelectValue placeholder="Theme" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="light">Light</SelectItem>
 *     <SelectItem value="dark">Dark</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * @accessibility
 * - WCAG 2.1 AA compliant via Radix UI primitives
 * - Full keyboard navigation support (Arrow keys, Enter, Space, Escape)
 * - Proper ARIA roles: `combobox`, `listbox`, `option`
 * - Screen reader announcements for selection changes
 * - Focus management with visible focus indicators
 * - Disabled state properly communicated to assistive technologies
 *
 * @since v1.0.0
 * @see https://www.radix-ui.com/primitives/docs/components/select
 */

'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
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

const SelectGlass = SelectPrimitive.Root;

// ========================================
// GROUP
// ========================================

const SelectGlassGroup = SelectPrimitive.Group;

// ========================================
// VALUE
// ========================================

const SelectGlassValue = SelectPrimitive.Value;

// ========================================
// TRIGGER
// ========================================

const SelectGlassTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    data-slot="select-trigger"
    className={cn(
      // Layout
      'flex h-10 w-full items-center justify-between gap-2',
      'rounded-lg border px-3 py-2 text-sm',
      // Transitions
      'transition-all duration-300',
      // Focus state
      'focus:outline-none',
      // Disabled state
      'disabled:cursor-not-allowed disabled:opacity-50',
      // Text overflow
      '[&>span]:line-clamp-1',
      className
    )}
    style={{
      background: 'var(--input-bg)',
      borderColor: 'var(--input-border)',
      color: 'var(--input-text)',
    }}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectGlassTrigger.displayName = 'SelectGlassTrigger';

// ========================================
// SCROLL UP BUTTON
// ========================================

const SelectGlassScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    data-slot="select-scroll-up-button"
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    style={{ color: 'var(--text-secondary)' }}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectGlassScrollUpButton.displayName = 'SelectGlassScrollUpButton';

// ========================================
// SCROLL DOWN BUTTON
// ========================================

const SelectGlassScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    data-slot="select-scroll-down-button"
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    style={{ color: 'var(--text-secondary)' }}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectGlassScrollDownButton.displayName = 'SelectGlassScrollDownButton';

// ========================================
// CONTENT
// ========================================

const SelectGlassContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      data-slot="select-content"
      position={position}
      className={cn(
        dropdownContentClasses,
        'p-1',
        // Position-specific styles
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1',
        className
      )}
      style={getDropdownContentStyles()}
      {...props}
    >
      <SelectGlassScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectGlassScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectGlassContent.displayName = 'SelectGlassContent';

// ========================================
// LABEL
// ========================================

const SelectGlassLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    data-slot="select-label"
    className={cn(dropdownLabelClasses, className)}
    {...props}
  />
));
SelectGlassLabel.displayName = 'SelectGlassLabel';

// ========================================
// ITEM
// ========================================

const SelectGlassItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    data-slot="select-item"
    className={cn(getDropdownItemClasses(), 'relative pl-8 pr-2', className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectGlassItem.displayName = 'SelectGlassItem';

// ========================================
// SEPARATOR
// ========================================

const SelectGlassSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    data-slot="select-separator"
    className={cn(dropdownSeparatorClasses, '-mx-1 my-1', className)}
    {...props}
  />
));
SelectGlassSeparator.displayName = 'SelectGlassSeparator';

// ========================================
// EXPORTS
// ========================================

export {
  SelectGlass,
  SelectGlassGroup,
  SelectGlassValue,
  SelectGlassTrigger,
  SelectGlassScrollUpButton,
  SelectGlassScrollDownButton,
  SelectGlassContent,
  SelectGlassLabel,
  SelectGlassItem,
  SelectGlassSeparator,
};

// ========================================
// SHADCN/UI COMPATIBLE ALIASES
// ========================================

/**
 * shadcn/ui compatible aliases for SelectGlass components
 *
 * @example
 * ```tsx
 * import {
 *   Select,
 *   SelectTrigger,
 *   SelectValue,
 *   SelectContent,
 *   SelectItem,
 * } from 'shadcn-glass-ui'
 *
 * <Select>
 *   <SelectTrigger className="w-[180px]">
 *     <SelectValue placeholder="Theme" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="light">Light</SelectItem>
 *     <SelectItem value="dark">Dark</SelectItem>
 *     <SelectItem value="system">System</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 * @since v2.5.0
 */
export const Select = SelectGlass;
export const SelectGroup = SelectGlassGroup;
export const SelectValue = SelectGlassValue;
export const SelectTrigger = SelectGlassTrigger;
export const SelectScrollUpButton = SelectGlassScrollUpButton;
export const SelectScrollDownButton = SelectGlassScrollDownButton;
export const SelectContent = SelectGlassContent;
export const SelectLabel = SelectGlassLabel;
export const SelectItem = SelectGlassItem;
export const SelectSeparator = SelectGlassSeparator;
