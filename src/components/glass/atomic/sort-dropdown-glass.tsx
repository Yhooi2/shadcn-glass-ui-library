/**
 * SortDropdownGlass Component
 *
 * Atomic sorting control built on DropdownMenuGlass primitives for data table and list sorting.
 * Provides intuitive sort field selection with visual indicators for active sort and direction.
 *
 * ## Features
 * - **4 Sort Fields:** commits, stars, name, contribution (configurable via `options` prop)
 * - **2 Sort Orders:** ascending (asc) and descending (desc) with arrow indicators
 * - **Responsive Design:** Compact mode for mobile, full mode for desktop
 * - **Visual Indicators:** Check icon for selected field, arrow icons for sort direction
 * - **Theme-Aware:** Unified glass styling via DropdownMenuGlass
 * - **Smart Toggle:** Click same field to toggle order, click different field to switch
 * - **Accessible:** ARIA menu pattern with keyboard navigation
 * - **Compound API:** Built on shadcn/ui DropdownMenuGlass pattern
 * - **Customizable Options:** Filter available sort fields via `options` prop
 *
 * ## CSS Variables
 * Uses DropdownMenuGlass CSS variables (defined in `dropdown-content-styles.ts`):
 * - `--dropdown-bg` - Dropdown trigger and content background
 * - `--dropdown-border` - Dropdown border color
 * - `--dropdown-glow` - Hover glow effect
 * - `--dropdown-item-text` - Menu item text color
 * - `--select-item-selected-bg` - Selected item background
 * - `--text-accent` - Arrow icon color
 * - `--text-muted` - Chevron icon color
 *
 * @example Basic usage
 * ```tsx
 * import { SortDropdownGlass } from 'shadcn-glass-ui'
 *
 * function DataTable() {
 *   const [sortBy, setSortBy] = useState<SortField>('commits')
 *   const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
 *
 *   return (
 *     <SortDropdownGlass
 *       sortBy={sortBy}
 *       sortOrder={sortOrder}
 *       onSortChange={(field, order) => {
 *         setSortBy(field)
 *         setSortOrder(order)
 *       }}
 *     />
 *   )
 * }
 * ```
 *
 * @example Compact mode for mobile
 * ```tsx
 * <SortDropdownGlass
 *   sortBy="stars"
 *   sortOrder="asc"
 *   onSortChange={handleSortChange}
 *   compact={true}
 * />
 * ```
 *
 * @example Limited sort options
 * ```tsx
 * <SortDropdownGlass
 *   sortBy="name"
 *   sortOrder="asc"
 *   onSortChange={handleSortChange}
 *   options={['name', 'stars']}
 * />
 * ```
 *
 * @example With custom styling
 * ```tsx
 * <SortDropdownGlass
 *   sortBy="contribution"
 *   sortOrder="desc"
 *   onSortChange={handleSortChange}
 *   className="md:ml-auto"
 * />
 * ```
 *
 * @accessibility
 * - Uses ARIA `menu` role with `aria-haspopup` and `aria-label`
 * - Keyboard navigation via DropdownMenuGlass (Space, Enter, Arrow keys, Escape)
 * - Visual and semantic indication of selected state
 * - Focus management handled by Radix UI DropdownMenu
 * - Sort direction communicated via both icon and ARIA state
 * - WCAG 2.1 AA compliant color contrast
 *
 * @since v1.0.0
 */

'use client';

import * as React from 'react';
import { ChevronDown, ArrowUp, ArrowDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
} from '@/components/glass/ui/dropdown-menu-glass';
import { ICON_SIZES } from '../primitives/style-utils';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type SortField = 'commits' | 'stars' | 'name' | 'contribution';
export type SortOrder = 'asc' | 'desc';

// ========================================
// FIELD LABELS
// ========================================

const fieldLabels: Record<SortField, string> = {
  commits: 'Commits',
  stars: 'Stars',
  name: 'Name',
  contribution: 'Contribution',
};

// ========================================
// PROPS INTERFACE
// ========================================

/**
 * Props for SortDropdownGlass component.
 *
 * Extends standard div attributes (excluding `onChange`) to avoid conflicts with
 * the component's `onSortChange` callback.
 *
 * @example
 * ```tsx
 * const props: SortDropdownGlassProps = {
 *   sortBy: 'commits',
 *   sortOrder: 'desc',
 *   onSortChange: (field, order) => {
 *     console.log(`Sorting by ${field} in ${order} order`)
 *   },
 *   options: ['commits', 'stars'],
 *   compact: false,
 * }
 * ```
 */
export interface SortDropdownGlassProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  /**
   * Current sort field.
   *
   * Must be one of the available sort fields: 'commits', 'stars', 'name', 'contribution'.
   *
   * @example
   * ```tsx
   * <SortDropdownGlass sortBy="commits" ... />
   * ```
   */
  readonly sortBy: SortField;

  /**
   * Current sort order.
   *
   * - `'asc'`: Ascending (A-Z, 0-9, oldest-newest)
   * - `'desc'`: Descending (Z-A, 9-0, newest-oldest)
   *
   * @example
   * ```tsx
   * <SortDropdownGlass sortOrder="desc" ... />
   * ```
   */
  readonly sortOrder: SortOrder;

  /**
   * Callback when sort changes.
   *
   * Called when user selects a field or toggles order. Receives both the new
   * field and order. If user clicks the same field, order is toggled. If user
   * clicks a different field, order defaults to 'desc'.
   *
   * @example
   * ```tsx
   * <SortDropdownGlass
   *   onSortChange={(field, order) => {
   *     setSortBy(field)
   *     setSortOrder(order)
   *     refetchData({ sortBy: field, sortOrder: order })
   *   }}
   * />
   * ```
   */
  readonly onSortChange: (field: SortField, order: SortOrder) => void;

  /**
   * Available sort options.
   *
   * Filter which fields appear in the dropdown. Useful for limiting sort
   * options based on data type or user permissions.
   *
   * @default ['commits', 'stars', 'name', 'contribution']
   *
   * @example
   * ```tsx
   * <SortDropdownGlass options={['name', 'stars']} ... />
   * ```
   */
  readonly options?: readonly SortField[];

  /**
   * Compact mode for mobile.
   *
   * - `true`: Shows "Sort" label with arrow icon only
   * - `false`: Shows "Sort: [Field]" with arrow and chevron icons
   *
   * Recommended for mobile viewports to save space.
   *
   * @default false
   *
   * @example
   * ```tsx
   * <SortDropdownGlass compact={isMobile} ... />
   * ```
   */
  readonly compact?: boolean;
}

// ========================================
// COMPONENT
// ========================================

export const SortDropdownGlass = React.forwardRef<HTMLDivElement, SortDropdownGlassProps>(
  (
    {
      sortBy,
      sortOrder,
      onSortChange,
      options = ['commits', 'stars', 'name', 'contribution'],
      compact = false,
      className,
      ...props
    },
    ref
  ) => {
    const handleFieldSelect = React.useCallback(
      (field: SortField) => {
        if (field === sortBy) {
          // Toggle order if same field
          onSortChange(field, sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          // New field, default to desc
          onSortChange(field, 'desc');
        }
      },
      [sortBy, sortOrder, onSortChange]
    );

    const SortIcon = sortOrder === 'asc' ? ArrowUp : ArrowDown;

    return (
      <div ref={ref} className={cn('relative inline-block', className)} {...props}>
        <DropdownMenuGlass>
          <DropdownMenuGlassTrigger asChild>
            <button
              type="button"
              className={cn(
                // Layout
                'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium',
                'sm:gap-2 sm:px-4 sm:py-2 sm:text-sm',
                // Glass surface
                'bg-(--dropdown-bg) border border-(--dropdown-border)',
                'backdrop-blur-md',
                // Transitions
                'transition-all duration-200',
                // Hover
                'hover:opacity-90 hover:shadow-(--dropdown-glow)',
                // Focus
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'focus-visible:ring-(--text-accent)',
                // Text color
                'text-(--dropdown-item-text)'
              )}
              aria-haspopup="menu"
            >
              {compact ? (
                <>
                  <span>Sort</span>
                  <SortIcon className={cn(ICON_SIZES.sm, 'text-(--text-accent)')} />
                </>
              ) : (
                <>
                  <span className="hidden sm:inline text-(--text-muted)">Sort:</span>
                  <span>{fieldLabels[sortBy]}</span>
                  <SortIcon className={cn(ICON_SIZES.sm, 'text-(--text-accent)')} />
                  <ChevronDown
                    className={cn(
                      ICON_SIZES.sm,
                      'text-(--text-muted)',
                      'transition-transform duration-200',
                      'group-data-[state=open]:rotate-180'
                    )}
                  />
                </>
              )}
            </button>
          </DropdownMenuGlassTrigger>

          <DropdownMenuGlassContent align="start" aria-label="Sort options">
            {options.map((field) => {
              const isSelected = field === sortBy;
              return (
                <DropdownMenuGlassItem
                  key={field}
                  onSelect={() => handleFieldSelect(field)}
                  className={cn('justify-between', isSelected && 'bg-(--select-item-selected-bg)')}
                >
                  <span className="font-medium">{fieldLabels[field]}</span>
                  {isSelected && (
                    <div className="flex items-center gap-1 text-(--text-accent)">
                      {sortOrder === 'asc' ? (
                        <ArrowUp className={ICON_SIZES.sm} />
                      ) : (
                        <ArrowDown className={ICON_SIZES.sm} />
                      )}
                      <Check className={ICON_SIZES.sm} />
                    </div>
                  )}
                </DropdownMenuGlassItem>
              );
            })}
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>
      </div>
    );
  }
);

SortDropdownGlass.displayName = 'SortDropdownGlass';
