/**
 * ComboBoxGlass Component
 *
 * Glass-themed combobox (searchable select) with:
 * - Keyboard navigation support
 * - Search/filter functionality
 * - Custom rendering options
 * - Async data loading support
 * - Glass styling with theme support
 * - Accessibility features
 */

'use client';

import { useState, useMemo, useCallback, forwardRef } from 'react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonGlass } from './button-glass';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type GlassVariant = 'glass' | 'frosted' | 'fluted' | 'crystal';

export interface ComboBoxOption<T = string> {
  readonly value: T;
  readonly label: string;
  readonly disabled?: boolean;
}

export interface ComboBoxGlassProps<T = string> {
  /** Available options */
  readonly options: readonly ComboBoxOption<T>[];
  /** Currently selected value */
  readonly value?: T;
  /** Callback when value changes */
  readonly onChange?: (value: T | undefined) => void;
  /** Placeholder text for trigger button */
  readonly placeholder?: string;
  /** Text shown when no results found */
  readonly emptyText?: string;
  /** Placeholder for search input */
  readonly searchPlaceholder?: string;
  /** Glass variant style */
  readonly glassVariant?: GlassVariant;
  /** Disabled state */
  readonly disabled?: boolean;
  /** Custom className for container */
  readonly className?: string;
  /** Custom className for popover content */
  readonly popoverClassName?: string;
  /** Allow clearing selection */
  readonly clearable?: boolean;
  /** Popover side */
  readonly side?: 'top' | 'right' | 'bottom' | 'left';
  /** Popover alignment */
  readonly align?: 'start' | 'center' | 'end';
}

// ========================================
// COMPONENT
// ========================================

function ComboBoxGlassInner<T = string>(
  {
    options,
    value,
    onChange,
    placeholder = 'Select option...',
    emptyText = 'No results found.',
    searchPlaceholder = 'Search...',
    glassVariant = 'glass',
    disabled = false,
    className,
    popoverClassName,
    clearable = false,
    side = 'bottom',
    align = 'start',
  }: ComboBoxGlassProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Find selected option
  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  );

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const searchLower = search.toLowerCase();
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchLower)
    );
  }, [options, search]);

  // Handle option selection
  const handleSelect = useCallback(
    (optionValue: T) => {
      if (clearable && value === optionValue) {
        onChange?.(undefined);
      } else {
        onChange?.(optionValue);
      }
      setOpen(false);
      setSearch('');
    },
    [value, onChange, clearable]
  );

  // Get glass variant class
  const getGlassClass = () => {
    const variants: Record<GlassVariant, string> = {
      glass: 'glass',
      frosted: 'frosted',
      fluted: 'fluted',
      crystal: 'crystal',
    };
    return variants[glassVariant];
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonGlass
          ref={ref}
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={selectedOption?.label || placeholder}
          disabled={disabled}
          className={cn(
            'w-full justify-between',
            !selectedOption && 'text-muted-foreground',
            className
          )}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </ButtonGlass>
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        className={cn(
          'w-[--radix-popover-trigger-width] p-0',
          getGlassClass(),
          popoverClassName
        )}
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          borderColor: 'var(--glass-border)',
        }}
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={String(option.value)}
                  value={String(option.value)}
                  disabled={option.disabled}
                  onSelect={() => handleSelect(option.value)}
                  className={cn(
                    'cursor-pointer',
                    option.disabled && 'cursor-not-allowed opacity-50'
                  )}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <span className="truncate">{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Export with generic type support
export const ComboBoxGlass = forwardRef(ComboBoxGlassInner) as <T = string>(
  props: ComboBoxGlassProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => ReturnType<typeof ComboBoxGlassInner>;

// Add display name for debugging
(ComboBoxGlass as typeof ComboBoxGlassInner).displayName = 'ComboBoxGlass';
