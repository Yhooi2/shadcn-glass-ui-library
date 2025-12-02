// ========================================
// SEARCH BOX GLASS - ATOMIC COMPONENT
// Search input with submit button
// Level 2: Atomic (extracted from HeaderNavGlass)
// ========================================

import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type CSSProperties,
} from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

export interface SearchBoxGlassProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
  /** Callback when search is submitted (Enter key or button click) */
  readonly onSubmit?: (value: string) => void;
  /** Initial search value */
  readonly defaultValue?: string;
  /** Controlled value */
  readonly value?: string;
  /** Controlled change handler */
  readonly onChange?: (value: string) => void;
  /** Compact variant for mobile (icon only button) */
  readonly variant?: 'default' | 'compact';
  /** Input width class (default: w-48) */
  readonly inputWidth?: string;
}

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
      boxShadow: isFocused ? 'var(--search-focus-glow)' : 'none',
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
        className={cn('flex rounded-xl overflow-hidden', className)}
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
