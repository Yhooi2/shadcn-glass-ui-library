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
 * - Form field wrapper support (label, error, success)
 * - Size variants (sm, md, lg, xl)
 * - Optional searchable mode
 * - Icon support for trigger and options
 */

'use client';

import { useState, useMemo, useCallback, forwardRef, useId } from 'react';
import { CheckIcon, ChevronsUpDownIcon, type LucideIcon } from 'lucide-react';
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
import { FormFieldWrapper } from '../primitives/form-field-wrapper';
import { inputVariants, type InputGlassSize } from '@/lib/variants/input-glass-variants';
import { getDropdownContentStyles } from '@/lib/variants/dropdown-content-styles';
import { ICON_SIZES } from '../primitives/style-utils';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type GlassVariant = 'glass' | 'frosted' | 'fluted' | 'crystal';

export interface ComboBoxOption<T = string> {
  readonly value: T;
  readonly label: string;
  readonly disabled?: boolean;
  /** Optional icon component for the option */
  readonly icon?: LucideIcon;
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

  // ========================================
  // NEW PROPS (Week 3 Enhancement)
  // ========================================

  /** Label text displayed above the field */
  readonly label?: string;
  /** Error message - displays in red below the field */
  readonly error?: string;
  /** Success message - displays in green if no error */
  readonly success?: string;
  /** Shows required asterisk (*) next to label */
  readonly required?: boolean;
  /** Size variant (affects trigger button height and padding) */
  readonly size?: InputGlassSize;
  /** Enable/disable search functionality */
  readonly searchable?: boolean;
  /** Optional icon for trigger button (displayed before text) */
  readonly icon?: LucideIcon;
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
    // NEW PROPS
    label,
    error,
    success,
    required = false,
    size = 'md',
    searchable = true,
    icon: TriggerIcon,
  }: ComboBoxGlassProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const fieldId = useId();

  // Find selected option
  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  );

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const searchLower = search.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(searchLower));
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

  // Render content
  const comboboxContent = (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonGlass
          ref={ref}
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={selectedOption?.label || placeholder}
          aria-describedby={error ? `${fieldId}-error` : success ? `${fieldId}-success` : undefined}
          disabled={disabled}
          className={cn(
            'w-full justify-between',
            // Apply size variant via inputVariants
            inputVariants({ size }),
            !selectedOption && 'text-muted-foreground',
            className
          )}
        >
          <span className="flex items-center gap-2 truncate">
            {TriggerIcon && <TriggerIcon className={ICON_SIZES.md} />}
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronsUpDownIcon className={cn(ICON_SIZES.md, 'shrink-0 opacity-50')} />
        </ButtonGlass>
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        className={cn(
          'w-[--radix-popover-trigger-width] p-0 rounded-2xl overflow-hidden border-0',
          getGlassClass(),
          popoverClassName
        )}
        style={getDropdownContentStyles()}
      >
        <Command
          shouldFilter={false}
          className={cn(
            'bg-transparent',
            // Hide default border, use subtle divider instead
            '[&_[data-slot=command-input-wrapper]]:border-b-0',
            // Fix search icon - use glass theme color with better visibility
            '[&_[data-slot=command-input-wrapper]_svg]:text-[var(--text-muted)]',
            '[&_[data-slot=command-input-wrapper]_svg]:opacity-80'
          )}
        >
          {searchable && (
            <CommandInput
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={setSearch}
              className="text-[var(--text-primary)] placeholder:text-[var(--text-muted)] h-10 font-medium"
            />
          )}
          <CommandList className="p-1.5 scrollbar-hide">
            <CommandEmpty className="text-[var(--text-muted)] py-4">{emptyText}</CommandEmpty>
            <CommandGroup className="text-[var(--text-primary)] p-0">
              {filteredOptions.map((option) => {
                const OptionIcon = option.icon;
                const isSelected = value === option.value;

                return (
                  <CommandItem
                    key={String(option.value)}
                    value={String(option.value)}
                    disabled={option.disabled}
                    onSelect={() => handleSelect(option.value)}
                    className={cn(
                      'w-full px-3 py-2.5 text-sm flex items-center gap-2 rounded-lg',
                      'cursor-pointer transition-colors duration-150',
                      'text-[var(--dropdown-item-text)]',
                      'data-[selected=true]:bg-[var(--dropdown-item-hover)]',
                      isSelected &&
                        'bg-[var(--select-item-selected-bg)] text-[var(--select-item-selected-text)]',
                      option.disabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    <CheckIcon
                      className={cn(
                        ICON_SIZES.md,
                        'shrink-0',
                        isSelected ? 'opacity-100 text-[var(--text-accent)]' : 'opacity-0'
                      )}
                    />
                    {OptionIcon && (
                      <OptionIcon
                        className={cn(ICON_SIZES.md, 'shrink-0 text-[var(--dropdown-icon)]')}
                      />
                    )}
                    <span className="truncate">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );

  // Wrap with FormFieldWrapper if label/error/success provided
  if (label || error || success) {
    return (
      <FormFieldWrapper
        label={label}
        error={error}
        success={success}
        required={required}
        htmlFor={fieldId}
      >
        {comboboxContent}
      </FormFieldWrapper>
    );
  }

  return comboboxContent;
}

// Export with generic type support
export const ComboBoxGlass = forwardRef(ComboBoxGlassInner) as <T = string>(
  props: ComboBoxGlassProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => ReturnType<typeof ComboBoxGlassInner>;

// Add display name for debugging
ComboBoxGlassInner.displayName = 'ComboBoxGlass';
