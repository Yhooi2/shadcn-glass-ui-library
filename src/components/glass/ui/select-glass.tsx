/**
 * SelectGlass Component
 *
 * @deprecated Use ComboBoxGlass instead. SelectGlass will be removed in v4.0.
 *
 * **Migration Guide:**
 * ```tsx
 * // Before (SelectGlass)
 * <SelectGlass
 *   options={options}
 *   value={value}
 *   onChange={setValue}
 *   label="Country"
 *   error="Required"
 *   size="md"
 *   searchable
 * />
 *
 * // After (ComboBoxGlass)
 * <ComboBoxGlass
 *   options={options}
 *   value={value}
 *   onChange={setValue}
 *   label="Country"
 *   error="Required"
 *   size="md"
 *   searchable={true} // Opcion al: default true
 * />
 * ```
 *
 * **Why migrate:**
 * - ComboBoxGlass has better performance (uses shadcn Command)
 * - More features: trigger icons, option icons, better styling
 * - Active maintenance and updates
 * - SelectGlass will be removed in v4.0 (6+ months)
 *
 * ---
 *
 * Searchable glass-themed dropdown select with:
 * - Theme-aware styling (glass/light/aurora)
 * - Keyboard navigation (↑↓, Home, End, Enter, ESC)
 * - Type-ahead search filtering
 * - Icon support per option
 * - Error/success states like InputGlass
 * - Touch-friendly (44px minimum)
 * - Auto-scroll to selected option
 * - Accessible (WCAG 2.1 AA compliant)
 *
 * @example
 * ```tsx
 * const options = [
 *   { value: '1', label: 'Option 1' },
 *   { value: '2', label: 'Option 2', icon: CheckIcon },
 * ];
 *
 * <SelectGlass
 *   options={options}
 *   value="1"
 *   onChange={(value) => console.log(value)}
 *   placeholder="Select an option"
 *   searchable
 * />
 * ```
 */

import * as React from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFocus } from '@/lib/hooks/use-focus';
import { selectGlassVariants, type SelectGlassSize } from '@/lib/variants/select-glass-variants';
import { PopoverGlass } from './popover-glass';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
  readonly icon?: LucideIcon;
}

// ========================================
// PROPS INTERFACE
// ========================================

export interface SelectGlassProps {
  /** Array of options to display */
  readonly options: readonly SelectOption[];
  /** Currently selected value */
  readonly value?: string;
  /** Callback when selection changes */
  readonly onChange?: (value: string) => void;
  /** Placeholder text when no option is selected */
  readonly placeholder?: string;
  /** Label text displayed above the select */
  readonly label?: string;
  /** Error message displayed below the select */
  readonly error?: string;
  /** Success message displayed below the select */
  readonly success?: string;
  /** Whether the select is disabled */
  readonly disabled?: boolean;
  /** Whether to enable search/filter functionality */
  readonly searchable?: boolean;
  /** Size variant */
  readonly size?: SelectGlassSize;
  /** Additional class name */
  readonly className?: string;
}

// ========================================
// COMPONENT
// ========================================

export const SelectGlass = React.forwardRef<HTMLDivElement, SelectGlassProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select an option',
      label,
      error,
      success,
      disabled = false,
      searchable = false,
      size = 'md',
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [highlightedIndex, setHighlightedIndex] = React.useState(0);
    const { isFocused, focusProps } = useFocus();
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);

    // Deprecation warning in development
    React.useEffect(() => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          '[SelectGlass] This component is deprecated and will be removed in v4.0. ' +
          'Please migrate to ComboBoxGlass for better performance and features. ' +
          'See JSDoc for migration guide.'
        );
      }
    }, []);

    // Find selected option
    const selectedOption = React.useMemo(
      () => options.find((opt) => opt.value === value),
      [options, value]
    );

    // Filter options based on search query
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return options;
      const query = searchQuery.toLowerCase();
      return options.filter((opt) =>
        opt.label.toLowerCase().includes(query)
      );
    }, [options, searchQuery]);

    // Reset search and highlighted index when opening/closing
    React.useEffect(() => {
      if (open) {
        setSearchQuery('');
        // Set highlighted index to selected option or 0
        const selectedIndex = filteredOptions.findIndex((opt) => opt.value === value);
        setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);

        // Focus search input if searchable
        if (searchable) {
          setTimeout(() => searchInputRef.current?.focus(), 0);
        }
      }
    }, [open, value, filteredOptions, searchable]);

    // Auto-scroll to highlighted option
    React.useEffect(() => {
      if (open && listRef.current) {
        const highlightedElement = listRef.current.querySelector(
          `[data-index="${highlightedIndex}"]`
        ) as HTMLElement;
        if (highlightedElement) {
          highlightedElement.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [highlightedIndex, open]);

    // Keyboard navigation
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            if (!open) {
              setOpen(true);
            } else {
              setHighlightedIndex((prev) =>
                prev < filteredOptions.length - 1 ? prev + 1 : prev
              );
            }
            break;
          case 'ArrowUp':
            e.preventDefault();
            if (open) {
              setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
            }
            break;
          case 'Home':
            if (open) {
              e.preventDefault();
              setHighlightedIndex(0);
            }
            break;
          case 'End':
            if (open) {
              e.preventDefault();
              setHighlightedIndex(filteredOptions.length - 1);
            }
            break;
          case 'Enter':
            e.preventDefault();
            if (open && filteredOptions[highlightedIndex]) {
              const option = filteredOptions[highlightedIndex];
              if (!option.disabled) {
                onChange?.(option.value);
                setOpen(false);
              }
            } else {
              setOpen(true);
            }
            break;
          case 'Escape':
            e.preventDefault();
            setOpen(false);
            break;
        }
      },
      [open, highlightedIndex, filteredOptions, onChange, disabled]
    );

    // Select option handler
    const handleSelectOption = React.useCallback(
      (option: SelectOption) => {
        if (option.disabled) return;
        onChange?.(option.value);
        setOpen(false);
      },
      [onChange]
    );

    // Clear selection
    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.('');
      },
      [onChange]
    );

    // Trigger styles with CSS variables
    const getTriggerStyles = (): React.CSSProperties => {
      let borderColor = 'var(--select-trigger-border)';
      let glowEffect = 'none';

      if (error) {
        borderColor = 'var(--alert-danger-text)';
        glowEffect = '0 0 0 3px rgba(251, 113, 133, 0.15)';
      } else if (success) {
        borderColor = 'var(--alert-success-text)';
        glowEffect = '0 0 0 3px rgba(52, 211, 153, 0.15)';
      } else if (isFocused || open) {
        borderColor = 'var(--input-focus-border)';
        glowEffect = 'var(--select-trigger-focus-glow)';
      }

      return {
        background: 'var(--select-trigger-bg)',
        border: `1px solid ${borderColor}`,
        color: 'var(--select-trigger-text)',
        boxShadow: glowEffect,
      };
    };

    // Content (dropdown) styles
    const contentStyles: React.CSSProperties = {
      background: 'var(--select-content-bg)',
      border: '1px solid var(--select-content-border)',
      boxShadow: 'var(--dropdown-glow)',
      backdropFilter: 'blur(var(--blur-md))',
      WebkitBackdropFilter: 'blur(var(--blur-md))',
    };

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium mb-2 text-white/90">
            {label}
          </label>
        )}

        {/* Select Trigger */}
        <PopoverGlass
          trigger={
            <button
              type="button"
              className={cn(selectGlassVariants({ size }))}
              style={getTriggerStyles()}
              disabled={disabled}
              onKeyDown={handleKeyDown}
              {...focusProps}
              role="combobox"
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-controls="select-listbox"
              aria-label={label || placeholder}
            >
              <span className="flex-1 text-left truncate">
                {selectedOption ? (
                  <span className="flex items-center gap-2">
                    {selectedOption.icon && (
                      <selectedOption.icon className="w-4 h-4 shrink-0" />
                    )}
                    {selectedOption.label}
                  </span>
                ) : (
                  <span className="text-white/50">{placeholder}</span>
                )}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                {selectedOption && !disabled && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 rounded hover:bg-white/10 transition-colors"
                    aria-label="Clear selection"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    open && 'rotate-180'
                  )}
                />
              </div>
            </button>
          }
          open={open}
          onOpenChange={setOpen}
          side="bottom"
          align="start"
          sideOffset={4}
          showArrow={false}
        >
          <div
            className="w-full min-w-[200px] max-h-[300px] rounded-xl p-1"
            style={contentStyles}
          >
            {/* Search Input */}
            {searchable && (
              <div className="p-2 border-b border-white/10 mb-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="w-full pl-10 pr-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none text-white placeholder:text-white/40"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div
              ref={listRef}
              className="overflow-y-auto max-h-[250px]"
              id="select-listbox"
              role="listbox"
            >
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-6 text-center text-sm text-white/50">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <button
                    key={option.value}
                    type="button"
                    data-index={index}
                    className={cn(
                      'w-full px-3 py-2.5 text-sm text-left flex items-center gap-2 rounded-lg transition-colors duration-150',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      option.value === value &&
                        'bg-[var(--select-item-selected-bg)] text-[var(--select-item-selected-text)]',
                      highlightedIndex === index && 'bg-[var(--select-item-hover-bg)]',
                      option.value !== value && 'text-white/80 hover:text-white'
                    )}
                    onClick={() => handleSelectOption(option)}
                    disabled={option.disabled}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    role="option"
                    aria-selected={option.value === value}
                  >
                    {option.icon && (
                      <option.icon className="w-4 h-4 shrink-0" />
                    )}
                    <span className="truncate">{option.label}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </PopoverGlass>

        {/* Error/Success Messages */}
        {error && (
          <p className="mt-2 text-xs text-[var(--alert-danger-text)]">{error}</p>
        )}
        {success && !error && (
          <p className="mt-2 text-xs text-[var(--alert-success-text)]">{success}</p>
        )}
      </div>
    );
  }
);

SelectGlass.displayName = 'SelectGlass';
