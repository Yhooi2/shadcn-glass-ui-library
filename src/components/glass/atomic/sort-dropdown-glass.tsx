/**
 * SortDropdownGlass Component
 *
 * Atomic component for sorting controls with:
 * - Theme-aware glass styling
 * - Responsive design (compact/full mode)
 * - Sort field selection (commits, stars, name, contribution)
 * - Sort order toggle (asc/desc)
 */

import { forwardRef, useState, useRef, useEffect, useCallback, useMemo, type CSSProperties } from 'react';
import { ChevronDown, ArrowUp, ArrowDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
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

export interface SortDropdownGlassProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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

export const SortDropdownGlass = forwardRef<HTMLDivElement, SortDropdownGlassProps>(
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
    const [isOpen, setIsOpen] = useState(false);
    const internalRef = useRef<HTMLDivElement>(null);

    // Close on click outside or escape
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent): void => {
        if (internalRef.current && !internalRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen]);

    const handleToggle = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    const handleFieldSelect = useCallback((field: SortField) => {
      if (field === sortBy) {
        // Toggle order if same field
        onSortChange(field, sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        // New field, default to desc
        onSortChange(field, 'desc');
      }
      setIsOpen(false);
    }, [sortBy, sortOrder, onSortChange]);

    const handleKeyDown = (e: React.KeyboardEvent): void => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    };

    // Styles
    const buttonStyles: CSSProperties = useMemo(() => ({
      background: 'var(--segmented-container-bg)',
      border: '1px solid var(--segmented-container-border)',
      color: 'var(--text-primary)',
    }), []);

    const dropdownStyles: CSSProperties = useMemo(() => ({
      background: 'var(--dropdown-bg)',
      border: '1px solid var(--dropdown-border)',
      boxShadow: 'var(--dropdown-glow)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      animation: 'dropdownFadeIn 0.2s ease-out',
    }), []);

    const SortIcon = sortOrder === 'asc' ? ArrowUp : ArrowDown;

    return (
      <div
        ref={(node) => {
          // Handle both refs
          (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        className={cn('relative inline-block', className)}
        style={{ zIndex: isOpen ? 50000 : 'auto' }}
        {...props}
      >
        {/* Trigger Button */}
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200',
            'hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'sm:gap-2 sm:px-4 sm:py-2 sm:text-sm'
          )}
          style={buttonStyles}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {compact ? (
            <>
              <span>Sort</span>
              <SortIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: 'var(--text-accent)' }} />
            </>
          ) : (
            <>
              <span className="hidden sm:inline" style={{ color: 'var(--text-muted)' }}>Sort:</span>
              <span>{fieldLabels[sortBy]}</span>
              <SortIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: 'var(--text-accent)' }} />
              <ChevronDown
                className={cn(
                  'w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
                style={{ color: 'var(--text-muted)' }}
              />
            </>
          )}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0"
              style={{ zIndex: 50001 }}
              onClick={() => setIsOpen(false)}
            />
            {/* Menu */}
            <div
              className="absolute left-0 mt-2 min-w-[140px] py-1.5 rounded-xl overflow-hidden"
              style={{ ...dropdownStyles, zIndex: 50002 }}
              role="listbox"
              aria-label="Sort options"
            >
              {options.map((field) => {
                const isSelected = field === sortBy;
                return (
                  <button
                    key={field}
                    type="button"
                    onClick={() => handleFieldSelect(field)}
                    className={cn(
                      'w-full px-3 py-2 text-xs sm:text-sm text-left flex items-center justify-between gap-2',
                      'transition-colors duration-150 hover:bg-white/5'
                    )}
                    style={{
                      color: isSelected ? 'var(--text-accent)' : 'var(--text-primary)',
                      background: isSelected ? 'var(--dropdown-item-hover)' : 'transparent',
                    }}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="font-medium">{fieldLabels[field]}</span>
                    {isSelected && (
                      <div className="flex items-center gap-1">
                        {sortOrder === 'asc' ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
);

SortDropdownGlass.displayName = 'SortDropdownGlass';
