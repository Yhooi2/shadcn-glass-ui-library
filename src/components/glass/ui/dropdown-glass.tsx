/**
 * DropdownGlass Component
 *
 * Glass-themed dropdown menu with two APIs:
 *
 * 1. **Simple API** (items prop) - Quick setup for basic menus
 * 2. **Compound API** (DropdownMenuGlass.*) - Full shadcn/ui pattern for complex menus
 *
 * @example Simple API (recommended for basic dropdowns)
 * ```tsx
 * import { DropdownGlass } from '@/components/glass/ui/dropdown-glass';
 *
 * <DropdownGlass
 *   trigger={<button><MoreVertical /></button>}
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
 * } from '@/components/glass/ui/dropdown-menu-glass';
 *
 * <DropdownMenuGlass>
 *   <DropdownMenuGlassTrigger asChild>
 *     <Button>Open Menu</Button>
 *   </DropdownMenuGlassTrigger>
 *   <DropdownMenuGlassContent>
 *     <DropdownMenuGlassItem>Edit</DropdownMenuGlassItem>
 *     <DropdownMenuGlassSeparator />
 *     <DropdownMenuGlassItem variant="destructive">Delete</DropdownMenuGlassItem>
 *   </DropdownMenuGlassContent>
 * </DropdownMenuGlass>
 * ```
 *
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
 * Props for the DropdownGlass component (Simple API)
 *
 * @accessibility
 * - **Keyboard Navigation:** Arrow keys navigate, Enter/Space activates, Escape closes
 * - **Focus Management:** Focus trapped within menu when open
 * - **Screen Readers:** Uses role="menu" and role="menuitem"
 * - **Touch Targets:** All items meet minimum 44x44px
 */
export interface DropdownGlassProps {
  /** Trigger element (button, etc.) */
  readonly trigger: React.ReactNode;
  /** Menu items array */
  readonly items: readonly DropdownItem[];
  /** Dropdown alignment */
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
