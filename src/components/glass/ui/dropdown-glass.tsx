/**
 * DropdownGlass Component
 *
 * Glass-themed dropdown menu with simple and compound APIs for maximum flexibility.
 * Wrapper around DropdownMenuGlass for quick menu creation.
 *
 * ## Features
 * - Two APIs: Simple (items prop) and Compound (DropdownMenuGlass.*)
 * - Theme-aware glassmorphism styling (glass/light/aurora)
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Focus management and trap
 * - Icon support for menu items
 * - Danger/destructive item variant
 * - Left/right alignment options
 * - Dividers for visual grouping
 * - Uses `--dropdown-*` CSS variables
 *
 * ## APIs
 * **1. Simple API (items prop)** - Quick setup for basic dropdowns
 * **2. Compound API (DropdownMenuGlass.*)** - Full shadcn/ui pattern for complex menus
 *
 * ## CSS Variables
 * Inherits from DropdownMenuGlass:
 * - `--dropdown-bg` - Background color (glass theme: `rgba(255,255,255,0.08)`)
 * - `--dropdown-border` - Border color (glass theme: `rgba(255,255,255,0.15)`)
 * - `--dropdown-item-hover` - Item hover background
 * - `--dropdown-item-text` - Item text color
 * - `--dropdown-icon` - Icon color
 * - `--dropdown-icon-hover` - Icon color on hover
 * - `--dropdown-divider` - Divider background
 * - `--dropdown-glow` - Box shadow with glow effect
 *
 * @example Simple API (recommended for basic dropdowns)
 * ```tsx
 * import { DropdownGlass } from 'shadcn-glass-ui'
 *
 * <DropdownGlass
 *   trigger={<ButtonGlass><MoreVertical /></ButtonGlass>}
 *   items={[
 *     { label: 'Edit', icon: Edit, onClick: handleEdit },
 *     { divider: true },
 *     { label: 'Delete', icon: Trash, onClick: handleDelete, danger: true }
 *   ]}
 * />
 * ```
 *
 * @example Compound API (for complex dropdowns)
 * ```tsx
 * import {
 *   DropdownMenuGlass,
 *   DropdownMenuGlassTrigger,
 *   DropdownMenuGlassContent,
 *   DropdownMenuGlassItem,
 *   DropdownMenuGlassSeparator,
 * } from 'shadcn-glass-ui'
 *
 * <DropdownMenuGlass>
 *   <DropdownMenuGlassTrigger asChild>
 *     <ButtonGlass>Open Menu</ButtonGlass>
 *   </DropdownMenuGlassTrigger>
 *   <DropdownMenuGlassContent>
 *     <DropdownMenuGlassItem>Edit</DropdownMenuGlassItem>
 *     <DropdownMenuGlassSeparator />
 *     <DropdownMenuGlassItem variant="destructive">Delete</DropdownMenuGlassItem>
 *   </DropdownMenuGlassContent>
 * </DropdownMenuGlass>
 * ```
 *
 * @example With alignment
 * ```tsx
 * <DropdownGlass
 *   trigger={<ButtonGlass>Menu</ButtonGlass>}
 *   items={items}
 *   align="right"
 * />
 * ```
 *
 * @example Text-only items (no icons)
 * ```tsx
 * <DropdownGlass
 *   trigger={<ButtonGlass>Options</ButtonGlass>}
 *   items={[
 *     { label: 'Option 1', onClick: () => {} },
 *     { label: 'Option 2', onClick: () => {} },
 *     { label: 'Option 3', onClick: () => {} },
 *   ]}
 * />
 * ```
 *
 * @accessibility
 * - **Keyboard Navigation:** Arrow keys navigate, Enter/Space activates, Escape closes (WCAG 2.1.1)
 * - **Focus Management:** Focus trapped within menu when open (WCAG 2.4.3)
 * - **Screen Readers:** Uses `role="menu"` and `role="menuitem"` (WCAG 4.1.3)
 * - **Touch Targets:** All items meet minimum 44x44px (WCAG 2.5.5)
 *
 * @since v1.0.0
 * @see ./dropdown-menu-glass.tsx for compound component exports
 */

'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ICON_SIZES } from '@/components/glass/primitives';
import {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
  DropdownMenuGlassSeparator,
} from './dropdown-menu-glass';
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

/**
 * Props for the DropdownGlass component (Simple API).
 *
 * @example
 * ```tsx
 * const props: DropdownGlassProps = {
 *   trigger: <ButtonGlass>Menu</ButtonGlass>,
 *   items: [
 *     { label: 'Edit', icon: Edit, onClick: handleEdit },
 *     { divider: true },
 *     { label: 'Delete', icon: Trash, onClick: handleDelete, danger: true }
 *   ],
 *   align: 'left',
 * };
 * ```
 */
export interface DropdownGlassProps {
  /** Trigger element (button, etc.) */
  readonly trigger: React.ReactNode;
  /** Menu items array */
  readonly items: readonly DropdownItem[];
  /**
   * Dropdown alignment.
   *
   * @default "left"
   */
  readonly align?: 'left' | 'right';
  /** Additional className */
  readonly className?: string;
}

// ========================================
// COMPONENT
// ========================================

/**
 * DropdownGlass - Simple API wrapper
 *
 * For complex dropdowns with checkboxes, radio groups, sub-menus, etc.,
 * use the compound components from dropdown-menu-glass.tsx directly.
 */
export const DropdownGlass = React.forwardRef<HTMLDivElement, DropdownGlassProps>(
  ({ trigger, items, align = 'left', className }, ref) => {
    return (
      <div ref={ref} data-slot="dropdown" className={cn('relative inline-block', className)}>
        <DropdownMenuGlass>
          <DropdownMenuGlassTrigger asChild>{trigger}</DropdownMenuGlassTrigger>

          <DropdownMenuGlassContent align={align === 'left' ? 'start' : 'end'}>
            {items.map((item, idx) =>
              item.divider ? (
                <DropdownMenuGlassSeparator key={`divider-${idx}`} />
              ) : (
                <DropdownMenuGlassItem
                  key={`item-${idx}`}
                  variant={item.danger ? 'destructive' : 'default'}
                  onSelect={item.onClick}
                >
                  {item.icon && (
                    <item.icon
                      className={cn(
                        ICON_SIZES.md,
                        'shrink-0',
                        item.danger
                          ? 'text-(--alert-danger-text)'
                          : 'text-(--dropdown-icon) group-data-highlighted:text-(--dropdown-icon-hover)'
                      )}
                    />
                  )}
                  <span className="font-medium">{item.label}</span>
                </DropdownMenuGlassItem>
              )
            )}
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>
      </div>
    );
  }
);

DropdownGlass.displayName = 'DropdownGlass';

// ========================================
// RE-EXPORTS (for convenience)
// ========================================

export {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
  DropdownMenuGlassSeparator,
} from './dropdown-menu-glass';
