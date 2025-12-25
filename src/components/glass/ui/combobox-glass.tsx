/**
 * ComboBoxGlass Component
 *
 * Glass-themed combobox (searchable select) combining autocomplete and dropdown functionality.
 * Built on Radix UI Popover and cmdk for robust keyboard navigation and filtering.
 *
 * ## Features
 * - Search/filter functionality with real-time results
 * - Keyboard navigation (Arrow keys, Enter, Escape, Tab)
 * - Optional FormFieldWrapper integration (label, error, success states)
 * - Size variants (sm, md, lg, xl) via InputGlass variants
 * - Icon support for both trigger button and individual options
 * - Glass variant styles (glass, frosted, fluted, crystal)
 * - Clearable selection (click selected item to deselect)
 * - Customizable empty state and search placeholder
 * - Disabled state with visual feedback
 * - Popover positioning (side, align) configuration
 *
 * ## CSS Variables
 * - `--input-bg` - Trigger button background
 * - `--input-border` - Trigger button border
 * - `--input-text` - Trigger button text
 * - `--dropdown-bg` - Content background
 * - `--dropdown-border` - Content border
 * - `--dropdown-item-hover` - Item hover background
 * - `--dropdown-item-text` - Item text color
 * - `--dropdown-icon` - Option icon color
 * - `--dropdown-glow` - Content box shadow
 * - `--text-accent` - Check icon color when selected
 * - `--text-muted` - Search icon and empty state text
 *
 * @example Basic usage
 * ```tsx
 * import { ComboBoxGlass, type ComboBoxOption } from 'shadcn-glass-ui'
 * import { useState } from 'react'
 *
 * const options: ComboBoxOption[] = [
 *   { value: 'react', label: 'React' },
 *   { value: 'vue', label: 'Vue' },
 *   { value: 'angular', label: 'Angular' },
 * ]
 *
 * function FrameworkSelector() {
 *   const [value, setValue] = useState<string>()
 *   return (
 *     <ComboBoxGlass
 *       options={options}
 *       value={value}
 *       onValueChange={setValue}
 *       placeholder="Select framework..."
 *     />
 *   )
 * }
 * ```
 *
 * @example With form field wrapper
 * ```tsx
 * <ComboBoxGlass
 *   options={countries}
 *   value={country}
 *   onValueChange={setCountry}
 *   label="Country"
 *   error="Please select a country"
 *   required
 *   placeholder="Select country..."
 * />
 * ```
 *
 * @example With icons
 * ```tsx
 * import { MapPin, Building } from 'lucide-react'
 *
 * const options: ComboBoxOption[] = [
 *   { value: 'us', label: 'United States', icon: MapPin },
 *   { value: 'uk', label: 'United Kingdom', icon: MapPin },
 * ]
 *
 * <ComboBoxGlass
 *   options={options}
 *   value={value}
 *   onValueChange={setValue}
 *   icon={Building} // Trigger icon
 *   label="Location"
 * />
 * ```
 *
 * @example Size variants
 * ```tsx
 * <ComboBoxGlass options={options} size="sm" label="Small" />
 * <ComboBoxGlass options={options} size="md" label="Medium" />
 * <ComboBoxGlass options={options} size="lg" label="Large" />
 * ```
 *
 * @accessibility
 * - WCAG 2.1 AA compliant via Radix UI and cmdk primitives
 * - Full keyboard navigation: Arrow keys, Enter, Escape, Tab
 * - Proper ARIA roles: `combobox`, `listbox`, `option`
 * - Screen reader announcements for search results and selection
 * - Focus management with visible indicators
 * - Error and success states announced to screen readers
 * - Disabled state properly communicated
 *
 * @since v1.0.0
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
import {
  getDropdownContentStyles,
  dropdownContentClasses,
  getDropdownItemClasses,
} from '@/lib/variants/dropdown-content-styles';
import { ICON_SIZES } from '../primitives/style-utils';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

/**
 * Glass variant style options for the combobox content.
 */
export type GlassVariant = 'glass' | 'frosted' | 'fluted' | 'crystal';

/**
 * Option item for ComboBoxGlass.
 *
 * @template T - Value type (defaults to string)
 *
 * @example
 * ```tsx
 * const option: ComboBoxOption = {
 *   value: 'react',
 *   label: 'React',
 *   icon: Code,
 *   disabled: false,
 * };
 * ```
 */
export interface ComboBoxOption<T = string> {
  /** Unique value for the option */
  readonly value: T;
  /** Display label for the option */
  readonly label: string;
  /** Whether the option is disabled */
  readonly disabled?: boolean;
  /** Optional icon component displayed before the label */
  readonly icon?: LucideIcon;
}

/**
 * Props for ComboBoxGlass component.
 *
 * @template T - Value type (defaults to string)
 *
 * @example
 * ```tsx
 * const props: ComboBoxGlassProps = {
 *   options: [
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *   ],
 *   value: 'us',
 *   onValueChange: (val) => setValue(val),
 *   label: 'Country',
 *   size: 'md',
 *   searchable: true,
 * };
 * ```
 */
export interface ComboBoxGlassProps<T = string> {
  /** Available options to display in the dropdown */
  readonly options: readonly ComboBoxOption<T>[];

  /** Currently selected value (controlled mode) */
  readonly value?: T;

  /** Callback when value changes
   * @param value - New selected value (undefined if cleared)
   */
  readonly onValueChange?: (value: T | undefined) => void;

  /** Placeholder text for trigger button when no value selected
   * @default "Select option..."
   */
  readonly placeholder?: string;

  /** Text shown when search yields no results
   * @default "No results found."
   */
  readonly emptyText?: string;

  /** Placeholder for search input
   * @default "Search..."
   */
  readonly searchPlaceholder?: string;

  /** Glass variant style for dropdown content
   * @default "glass"
   */
  readonly glassVariant?: GlassVariant;

  /** Disabled state
   * @default false
   */
  readonly disabled?: boolean;

  /** Custom className for trigger button container */
  readonly className?: string;

  /** Custom className for popover content */
  readonly popoverClassName?: string;

  /** Allow clearing selection by clicking selected item
   * @default false
   */
  readonly clearable?: boolean;

  /** Popover placement side
   * @default "bottom"
   */
  readonly side?: 'top' | 'right' | 'bottom' | 'left';

  /** Popover alignment
   * @default "start"
   */
  readonly align?: 'start' | 'center' | 'end';

  // ========================================
  // FORM FIELD INTEGRATION
  // ========================================

  /** Label text displayed above the field (enables FormFieldWrapper) */
  readonly label?: string;

  /** Error message - displays in red below the field */
  readonly error?: string;

  /** Success message - displays in green if no error */
  readonly success?: string;

  /** Shows required asterisk (*) next to label
   * @default false
   */
  readonly required?: boolean;

  /** Size variant (affects trigger button height and padding)
   * @default "md"
   */
  readonly size?: InputGlassSize;

  /** Enable/disable search functionality
   * @default true
   */
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
    onValueChange,
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
        onValueChange?.(undefined);
      } else {
        onValueChange?.(optionValue);
      }
      setOpen(false);
      setSearch('');
    },
    [value, onValueChange, clearable]
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
          dropdownContentClasses,
          'w-[--radix-popover-trigger-width] p-0 border-0',
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
                      getDropdownItemClasses({ selected: isSelected }),
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
