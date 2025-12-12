/**
 * SortDropdownGlass Component
 *
 * Atomic component for sorting controls built on DropdownMenuGlass primitives.
 *
 * Features:
 * - Theme-aware glass styling (unified with DropdownMenuGlass)
 * - Responsive design (compact/full mode)
 * - Sort field selection (commits, stars, name, contribution)
 * - Sort order toggle (asc/desc)
 * - Built on shadcn/ui compound component pattern
 *
 * @example
 * ```tsx
 * <SortDropdownGlass
 *   sortBy="commits"
 *   sortOrder="desc"
 *   onSortChange={(field, order) => console.log(field, order)}
 * />
 * ```
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

export interface SortDropdownGlassProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  /** Current sort field */
  readonly sortBy: SortField;
  /** Current sort order */
  readonly sortOrder: SortOrder;
  /** Callback when sort changes */
  readonly onSortChange: (field: SortField, order: SortOrder) => void;
  /** Available sort options (default: all) */
  readonly options?: readonly SortField[];
  /** Compact mode for mobile */
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
