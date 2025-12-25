/**
 * SearchBoxGlass Component
 *
 * Search input with glassmorphism styling and integrated submit button.
 * Provides a cohesive search experience with visual feedback and keyboard support.
 *
 * ## Features
 * - Search input with glass theme styling
 * - Built-in search icon (magnifying glass) on left side
 * - Submit button with Search icon and optional text label
 * - Compact variant (icon-only button) for mobile layouts
 * - Focus glow effect for visual feedback
 * - Enter key submission for keyboard users
 * - Controlled or uncontrolled component modes
 * - Customizable input width via Tailwind classes
 * - Responsive design (adapts button label on small screens)
 * - Accessible with proper ARIA labels
 *
 * ## CSS Variables
 * Uses InputGlass CSS variables:
 * - `--search-bg` - Input background color
 * - `--search-border` - Input border color
 * - `--search-btn-bg` - Submit button background
 * - `--search-btn-text` - Submit button text color
 * - `--text-primary` - Input text color
 * - `--focus-glow` - Focus ring glow effect
 *
 * @example Basic search box
 * ```tsx
 * import { SearchBoxGlass } from 'shadcn-glass-ui'
 *
 * function SearchBar() {
 *   const handleSearch = (query: string) => {
 *     console.log('Searching for:', query)
 *   }
 *
 *   return (
 *     <SearchBoxGlass
 *       onSubmit={handleSearch}
 *       placeholder="Search repositories..."
 *     />
 *   )
 * }
 * ```
 *
 * @example Controlled search box
 * ```tsx
 * function ControlledSearch() {
 *   const [query, setQuery] = useState('')
 *
 *   return (
 *     <SearchBoxGlass
 *       value={query}
 *       onChange={setQuery}
 *       onSubmit={(q) => console.log('Submitted:', q)}
 *     />
 *   )
 * }
 * ```
 *
 * @example Compact variant for mobile
 * ```tsx
 * <SearchBoxGlass
 *   variant="compact"
 *   placeholder="Search..."
 *   onSubmit={handleSearch}
 * />
 * ```
 *
 * @example Custom width
 * ```tsx
 * <SearchBoxGlass
 *   inputWidth="w-64 md:w-96"
 *   placeholder="Search users..."
 *   onSubmit={handleSearch}
 * />
 * ```
 *
 * @accessibility
 * - Input has aria-label matching placeholder text
 * - Submit button has aria-label "Search"
 * - Keyboard accessible (Tab to navigate, Enter to submit)
 * - Focus ring visible via --focus-glow CSS variable
 * - Search icon provides visual affordance
 *
 * @since v1.0.0
 */

import { forwardRef, useState, type InputHTMLAttributes, type CSSProperties } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

/**
 * Props for SearchBoxGlass component.
 *
 * Extends standard input attributes with search-specific props.
 * Omits `onSubmit` and `onChange` from HTMLInputElement to provide custom signatures.
 *
 * @example
 * ```tsx
 * const props: SearchBoxGlassProps = {
 *   placeholder: 'Search users...',
 *   defaultValue: 'john',
 *   onSubmit: (query) => searchUsers(query),
 *   variant: 'compact',
 * };
 * ```
 */
export interface SearchBoxGlassProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onSubmit' | 'onChange'
> {
  /**
   * Callback when search is submitted.
   *
   * Triggered by Enter key press or submit button click.
   * Receives current input value as parameter.
   *
   * @example
   * ```tsx
   * <SearchBoxGlass
   *   onSubmit={(query) => {
   *     console.log('Searching:', query)
   *     fetchResults(query)
   *   }}
   * />
   * ```
   */
  readonly onSubmit?: (value: string) => void;

  /**
   * Initial search value (uncontrolled).
   *
   * Use for uncontrolled component with default value.
   * For controlled component, use `value` + `onChange` instead.
   *
   * @default ""
   * @example
   * ```tsx
   * <SearchBoxGlass defaultValue="react" onSubmit={handleSearch} />
   * ```
   */
  readonly defaultValue?: string;

  /**
   * Controlled value.
   *
   * Use with `onChange` for controlled component mode.
   * Component is controlled if this prop is provided.
   *
   * @example
   * ```tsx
   * const [query, setQuery] = useState('')
   *
   * <SearchBoxGlass
   *   value={query}
   *   onChange={setQuery}
   *   onSubmit={handleSearch}
   * />
   * ```
   */
  readonly value?: string;

  /**
   * Controlled change handler.
   *
   * Receives new input value (not event) on every change.
   * Use with `value` prop for controlled component mode.
   *
   * @example
   * ```tsx
   * <SearchBoxGlass
   *   value={query}
   *   onChange={(newQuery) => setQuery(newQuery.toLowerCase())}
   * />
   * ```
   */
  readonly onChange?: (value: string) => void;

  /**
   * Visual variant of the search button.
   *
   * - `default`: Shows "Search" text label (hidden on mobile)
   * - `compact`: Icon-only button on all screen sizes
   *
   * @default "default"
   * @example
   * ```tsx
   * // Full button with label (responsive)
   * <SearchBoxGlass variant="default" />
   *
   * // Icon-only button (compact)
   * <SearchBoxGlass variant="compact" />
   * ```
   */
  readonly variant?: 'default' | 'compact';

  /**
   * Input width class (Tailwind CSS).
   *
   * Controls the width of the search input field.
   * Use responsive classes for adaptive sizing.
   *
   * @default "w-32 sm:w-40 md:w-48"
   * @example
   * ```tsx
   * // Small search box
   * <SearchBoxGlass inputWidth="w-32" />
   *
   * // Large responsive search box
   * <SearchBoxGlass inputWidth="w-48 md:w-64 lg:w-96" />
   * ```
   */
  readonly inputWidth?: string;
}

// ========================================
// COMPONENT
// ========================================

export const SearchBoxGlass = forwardRef<HTMLInputElement, SearchBoxGlassProps>(
  (
    {
      onSubmit,
      defaultValue = '',
      value: controlledValue,
      onChange: controlledOnChange,
      variant = 'default',
      inputWidth = 'w-32 sm:w-40 md:w-48',
      placeholder = 'Search username...',
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (isControlled) {
        controlledOnChange?.(newValue);
      } else {
        setInternalValue(newValue);
      }
    };

    const handleSubmit = () => {
      onSubmit?.(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };

    const containerStyles: CSSProperties = {
      boxShadow: isFocused ? 'var(--focus-glow)' : 'none',
    };

    const inputStyles: CSSProperties = {
      background: 'var(--search-bg)',
      color: 'var(--text-primary)',
      border: '1px solid var(--search-border)',
      borderRight: 'none',
      borderTopLeftRadius: '0.75rem',
      borderBottomLeftRadius: '0.75rem',
    };

    const buttonStyles: CSSProperties = {
      background: 'var(--search-btn-bg)',
      color: 'var(--search-btn-text)',
      borderTopRightRadius: '0.75rem',
      borderBottomRightRadius: '0.75rem',
    };

    return (
      <div
        className={cn('flex w-fit rounded-xl overflow-hidden', className)}
        style={containerStyles}
      >
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          className={cn('px-4 py-2 text-sm outline-none transition-all', inputWidth)}
          style={inputStyles}
          {...props}
        />
        <button
          onClick={handleSubmit}
          type="button"
          className={cn(
            'px-5 py-2 text-sm font-medium flex items-center gap-2 hover:scale-[1.02] transition-transform',
            variant === 'compact' && 'px-3'
          )}
          style={buttonStyles}
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
          {variant === 'default' && <span className="hidden sm:inline">Search</span>}
        </button>
      </div>
    );
  }
);

SearchBoxGlass.displayName = 'SearchBoxGlass';
