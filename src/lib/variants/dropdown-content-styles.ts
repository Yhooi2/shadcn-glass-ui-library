/**
 * Dropdown Content Styles
 *
 * Unified styling utilities for all dropdown-style components:
 * - DropdownGlass
 * - ComboBoxGlass
 * - SelectGlass
 * - SortDropdownGlass
 *
 * Eliminates ~50 lines of duplicated dropdown styling code.
 */

import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// DROPDOWN CONTENT STYLES
// ============================================

/**
 * Generate consistent dropdown content styles with glassmorphism.
 *
 * Provides standard glass surface with backdrop blur for all dropdown menus.
 *
 * @returns React CSSProperties object
 *
 * @example
 * ```tsx
 * <div style={getDropdownContentStyles()}>
 *   <DropdownItem />
 * </div>
 * ```
 */
export function getDropdownContentStyles(): CSSProperties {
  return {
    background: 'var(--dropdown-bg)',
    border: '1px solid var(--dropdown-border)',
    boxShadow: 'var(--dropdown-glow)',
    backdropFilter: 'blur(var(--blur-md))',
    WebkitBackdropFilter: 'blur(var(--blur-md))',
  };
}

// ============================================
// DROPDOWN CONTENT CLASSES
// ============================================

/**
 * Standard Tailwind classes for dropdown content containers.
 *
 * Includes sizing, border radius, z-index, and Radix UI animations.
 *
 * @example
 * ```tsx
 * <DropdownMenuContent className={dropdownContentClasses}>
 *   ...
 * </DropdownMenuContent>
 * ```
 */
export const dropdownContentClasses = cn(
  // Sizing
  'min-w-40 md:min-w-[200px]',

  // Shape
  'rounded-2xl overflow-hidden',

  // Layering
  'z-[50002]',

  // Animations (Radix UI data attributes)
  'animate-in fade-in-0 zoom-in-95',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=top]:slide-in-from-bottom-2'
);

// ============================================
// DROPDOWN ITEM CLASSES
// ============================================

/**
 * Options for dropdown item styling
 */
export interface DropdownItemClassesOptions {
  /** Apply danger/destructive styling */
  danger?: boolean;
  /** Item is currently selected */
  selected?: boolean;
  /** Item is highlighted (keyboard navigation) */
  highlighted?: boolean;
}

/**
 * Generate classes for dropdown menu items.
 *
 * Supports different states: normal, highlighted, selected, danger.
 *
 * @param options - Styling options
 * @returns className string
 *
 * @example
 * ```tsx
 * // Normal item
 * <div className={getDropdownItemClasses()}>Edit</div>
 *
 * // Danger item
 * <div className={getDropdownItemClasses({ danger: true })}>Delete</div>
 *
 * // Selected item
 * <div className={getDropdownItemClasses({ selected: true })}>Active</div>
 * ```
 */
export function getDropdownItemClasses(
  options?: DropdownItemClassesOptions
): string {
  const { danger, selected, highlighted } = options ?? {};

  return cn(
    // Base layout
    'w-full px-3 py-2 md:px-4 md:py-2.5',
    'text-xs md:text-sm text-left',
    'flex items-center gap-2 md:gap-3',

    // Interaction
    'outline-none cursor-default select-none',
    'transition-colors duration-200 ease-out',

    // Hover/highlight state
    highlighted && 'bg-[var(--dropdown-item-hover)]',
    'data-[highlighted]:bg-[var(--dropdown-item-hover)]',

    // Selected state
    selected &&
      'bg-[var(--select-item-selected-bg)] text-[var(--select-item-selected-text)]',

    // Danger state
    danger
      ? 'text-[var(--alert-danger-text)] data-[highlighted]:text-[var(--alert-danger-text)]'
      : 'text-[var(--dropdown-item-text)]'
  );
}

// ============================================
// DROPDOWN ICON CLASSES
// ============================================

/**
 * Options for dropdown icon styling
 */
export interface DropdownIconClassesOptions {
  /** Apply danger/destructive styling */
  danger?: boolean;
}

/**
 * Generate classes for icons within dropdown items.
 *
 * @param options - Styling options
 * @returns className string
 *
 * @example
 * ```tsx
 * <Edit className={getDropdownIconClasses()} />
 * <Trash className={getDropdownIconClasses({ danger: true })} />
 * ```
 */
export function getDropdownIconClasses(
  options?: DropdownIconClassesOptions
): string {
  return cn(
    // Size
    'w-3.5 h-3.5 md:w-4 md:h-4',

    // Behavior
    'transition-colors duration-200 ease-out shrink-0',

    // Color
    options?.danger
      ? 'text-[var(--alert-danger-text)]'
      : 'text-[var(--dropdown-icon)] group-data-[highlighted]:text-[var(--dropdown-icon-hover)]'
  );
}

// ============================================
// DROPDOWN SEPARATOR CLASSES
// ============================================

/**
 * Standard classes for dropdown separators.
 *
 * @example
 * ```tsx
 * <DropdownMenuSeparator className={dropdownSeparatorClasses} />
 * ```
 */
export const dropdownSeparatorClasses = cn(
  'h-px my-1',
  'bg-[var(--dropdown-border)]'
);

// ============================================
// DROPDOWN LABEL CLASSES
// ============================================

/**
 * Standard classes for dropdown section labels.
 *
 * @example
 * ```tsx
 * <DropdownMenuLabel className={dropdownLabelClasses}>
 *   Actions
 * </DropdownMenuLabel>
 * ```
 */
export const dropdownLabelClasses = cn(
  'px-3 py-1.5 md:px-4 md:py-2',
  'text-xs font-medium',
  'text-[var(--text-muted)]'
);
