/**
 * DropdownGlass Component
 *
 * Glass-themed dropdown menu based on Radix UI with:
 * - Theme-aware styling (glass/light/aurora)
 * - Smooth animations
 * - Proper positioning and accessibility
 * - Optional item icons and dividers
 */

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  const dropdownStyles: React.CSSProperties = {
    background: 'var(--dropdown-bg)',
    border: '1px solid var(--dropdown-border)',
    boxShadow: 'var(--dropdown-glow)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  };

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
          className="min-w-40 md:min-w-[200px] rounded-2xl py-1.5 md:py-2 z-[50002] animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
          style={dropdownStyles}
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
                  'w-full px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm text-left flex items-center gap-2 md:gap-3',
                  'outline-hidden cursor-default select-none rounded-lg',
                  'transition-colors duration-200 ease-out',
                  'data-[highlighted]:bg-[var(--dropdown-item-hover)]',
                  item.danger
                    ? 'text-[var(--alert-danger-text)] data-[highlighted]:text-[var(--alert-danger-text)]'
                    : 'text-[var(--dropdown-item-text)] data-[highlighted]:text-[var(--dropdown-icon-hover)]'
                )}
                role="menuitem"
              >
                {item.icon && (
                  <item.icon
                    className={cn(
                      'w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-200 ease-out shrink-0',
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
