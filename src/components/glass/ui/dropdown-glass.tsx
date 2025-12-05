/**
 * DropdownGlass Component
 *
 * Glass-themed dropdown menu based on Radix UI with:
 * - Theme-aware styling (glass/light/aurora)
 * - Smooth animations
 * - Proper positioning and accessibility
 * - Optional item icons and dividers
 *
 * @example
 * Simple API (recommended for basic dropdowns):
 * ```tsx
 * import { DropdownGlass } from '@/components/glass/ui/dropdown-glass';
 * import { MoreVertical, Edit, Trash } from 'lucide-react';
 *
 * <DropdownGlass
 *   trigger={
 *     <button>
 *       <MoreVertical />
 *     </button>
 *   }
 *   items={[
 *     { label: 'Edit', icon: Edit, onClick: () => handleEdit() },
 *     { divider: true },
 *     { label: 'Delete', icon: Trash, onClick: () => handleDelete(), danger: true }
 *   ]}
 * />
 * ```
 *
 * @example
 * Advanced: Using Radix UI primitives directly (for complex dropdowns):
 * ```tsx
 * import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
 * import { getDropdownContentStyles, dropdownContentClasses } from '@/lib/variants/dropdown-content-styles';
 *
 * <DropdownMenuPrimitive.Root>
 *   <DropdownMenuPrimitive.Trigger asChild>
 *     <button>Open Menu</button>
 *   </DropdownMenuPrimitive.Trigger>
 *
 *   <DropdownMenuPrimitive.Portal>
 *     <DropdownMenuPrimitive.Content
 *       className={dropdownContentClasses}
 *       style={getDropdownContentStyles()}
 *       align="start"
 *       sideOffset={8}
 *     >
 *       <DropdownMenuPrimitive.Label className="px-3 py-1.5 text-xs font-medium">
 *         Actions
 *       </DropdownMenuPrimitive.Label>
 *
 *       <DropdownMenuPrimitive.Item
 *         className="px-3 py-2 cursor-pointer hover:bg-[var(--dropdown-item-hover)]"
 *         onSelect={() => handleAction()}
 *       >
 *         Action Item
 *       </DropdownMenuPrimitive.Item>
 *
 *       <DropdownMenuPrimitive.Separator className="h-px my-1 bg-[var(--dropdown-border)]" />
 *
 *       <DropdownMenuPrimitive.CheckboxItem
 *         checked={isChecked}
 *         onCheckedChange={setIsChecked}
 *       >
 *         <DropdownMenuPrimitive.ItemIndicator>
 *           <Check className="w-4 h-4" />
 *         </DropdownMenuPrimitive.ItemIndicator>
 *         Checkbox Item
 *       </DropdownMenuPrimitive.CheckboxItem>
 *
 *       <DropdownMenuPrimitive.Sub>
 *         <DropdownMenuPrimitive.SubTrigger>
 *           More Options
 *         </DropdownMenuPrimitive.SubTrigger>
 *         <DropdownMenuPrimitive.SubContent>
 *           <DropdownMenuPrimitive.Item>Sub Item 1</DropdownMenuPrimitive.Item>
 *           <DropdownMenuPrimitive.Item>Sub Item 2</DropdownMenuPrimitive.Item>
 *         </DropdownMenuPrimitive.SubContent>
 *       </DropdownMenuPrimitive.Sub>
 *     </DropdownMenuPrimitive.Content>
 *   </DropdownMenuPrimitive.Portal>
 * </DropdownMenuPrimitive.Root>
 * ```
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dropdown-menu Radix UI Dropdown Menu Documentation}
 *
 * Available Radix primitives:
 * - `DropdownMenuPrimitive.Root` - Root component
 * - `DropdownMenuPrimitive.Trigger` - Trigger button (use `asChild` for custom triggers)
 * - `DropdownMenuPrimitive.Content` - Dropdown content container
 * - `DropdownMenuPrimitive.Item` - Menu item
 * - `DropdownMenuPrimitive.CheckboxItem` - Checkbox menu item
 * - `DropdownMenuPrimitive.RadioGroup` + `RadioItem` - Radio group
 * - `DropdownMenuPrimitive.Label` - Section label
 * - `DropdownMenuPrimitive.Separator` - Visual separator
 * - `DropdownMenuPrimitive.Sub` + `SubTrigger` + `SubContent` - Nested menus
 * - `DropdownMenuPrimitive.Portal` - Portal for dropdown content
 *
 * Use `getDropdownContentStyles()` and `dropdownContentClasses` from
 * `@/lib/variants/dropdown-content-styles` for consistent glass styling.
 */

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ICON_SIZES } from '@/components/glass/primitives';
import { getDropdownContentStyles, dropdownContentClasses } from '@/lib/variants/dropdown-content-styles';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export interface DropdownItem {
  readonly label?: string;
  readonly icon?: LucideIcon;
  readonly onClick?: () => void;
  readonly danger?: boolean;
  readonly divider?: boolean;
}

// ========================================
// PROPS INTERFACE
// ========================================

export interface DropdownGlassProps {
  readonly trigger: React.ReactNode;
  readonly items: readonly DropdownItem[];
  readonly align?: 'left' | 'right';
  readonly className?: string;
}

// ========================================
// COMPONENT
// ========================================

export const DropdownGlass = React.forwardRef<
  HTMLDivElement,
  DropdownGlassProps
>(({ trigger, items, align = 'left', className }, ref) => {
  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          {trigger}
        </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align === 'left' ? 'start' : 'end'}
          sideOffset={8}
          className={dropdownContentClasses}
          style={getDropdownContentStyles()}
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item, idx) =>
            item.divider ? (
              <DropdownMenuPrimitive.Separator
                key={`divider-${idx}`}
                className="my-2 mx-3 h-px"
                style={{
                  borderTop: '1px solid var(--dropdown-divider)',
                }}
                role="separator"
              />
            ) : (
              <DropdownMenuPrimitive.Item
                key={`item-${idx}`}
                onClick={item.onClick}
                className={cn(
                  'group w-full px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm text-left flex items-center gap-2 md:gap-3',
                  'cursor-default select-none',
                  'transition-colors duration-200 ease-out',
                  'focus-visible:outline-none focus-visible:shadow-(--focus-glow)',
                  'data-[highlighted]:bg-[var(--dropdown-item-hover)]',
                  item.danger
                    ? 'text-[var(--alert-danger-text)] data-[highlighted]:text-[var(--alert-danger-text)]'
                    : 'text-[var(--dropdown-item-text)]'
                )}
                role="menuitem"
              >
                {item.icon && (
                  <item.icon
                    className={cn(
                      ICON_SIZES.md,
                      'transition-colors duration-200 ease-out shrink-0',
                      item.danger
                        ? 'text-[var(--alert-danger-text)]'
                        : 'text-[var(--dropdown-icon)] group-data-[highlighted]:text-[var(--dropdown-icon-hover)]'
                    )}
                  />
                )}
                <span className="font-medium">{item.label}</span>
              </DropdownMenuPrimitive.Item>
            )
          )}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
});

DropdownGlass.displayName = 'DropdownGlass';
