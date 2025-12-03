/**
 * InputGlass Component
 *
 * Glass-themed input with:
 * - Theme-aware styling via CSS variables (glass/light/aurora)
 * - Focus glow effects
 * - Error/success states
 * - Icon support (left/right position)
 * - Backdrop blur effect
 */

import {
  forwardRef,
  useCallback,
  type InputHTMLAttributes,
  type CSSProperties,
  type FocusEvent,
} from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFocus } from '@/lib/hooks/use-focus';
import { inputVariants } from '@/lib/variants/input-glass-variants';
import '@/glass-theme.css';

// ========================================
// CSS VARIABLE HELPERS
// ========================================

const getInputStyles = (
  isFocused: boolean,
  error?: string,
  success?: string
): CSSProperties => {
  // Determine border color based on state
  let borderColor = 'var(--input-border)';
  if (error) {
    borderColor = 'var(--alert-danger-text)';
  } else if (success) {
    borderColor = 'var(--alert-success-text)';
  } else if (isFocused) {
    borderColor = 'var(--input-focus-border)';
  }

  return {
    background: 'var(--input-bg)',
    border: `1px solid ${borderColor}`,
    color: 'var(--input-text)',
    boxShadow: isFocused ? 'var(--input-focus-glow)' : 'none',
  };
};

// ========================================
// PROPS INTERFACE
// ========================================

export interface InputGlassProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  readonly label?: string;
  readonly error?: string;
  readonly success?: string;
  readonly icon?: LucideIcon;
  readonly iconPosition?: 'left' | 'right';
}

// ========================================
// COMPONENT
// ========================================

export const InputGlass = forwardRef<HTMLInputElement, InputGlassProps>(
  (
    {
      className,
      inputSize = 'md',
      label,
      error,
      success,
      icon: Icon,
      iconPosition = 'left',
      disabled,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const { isFocused, focusProps } = useFocus();

    // Wrap focus handlers to call both internal and external callbacks
    const handleFocus = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        focusProps.onFocus(e);
        onFocus?.(e);
      },
      [focusProps, onFocus]
    );

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        focusProps.onBlur(e);
        onBlur?.(e);
      },
      [focusProps, onBlur]
    );

    const hasIcon = Boolean(Icon);
    const paddingLeft = hasIcon && iconPosition === 'left' ? 'pl-10' : '';
    const paddingRight = hasIcon && iconPosition === 'right' ? 'pr-10' : '';

    return (
      <div className={cn('flex flex-col gap-1 md:gap-1.5', className)}>
        {label && (
          <label
            className="text-xs md:text-sm font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && iconPosition === 'left' && (
            <Icon
              className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-300"
              style={{
                color: isFocused ? 'var(--text-accent)' : 'var(--text-muted)',
              }}
            />
          )}
          <input
            ref={ref}
            className={cn(
              inputVariants({ inputSize }),
              paddingLeft,
              paddingRight
            )}
            style={getInputStyles(isFocused, error, success)}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {Icon && iconPosition === 'right' && (
            <Icon
              className="absolute right-2.5 md:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-300"
              style={{
                color: isFocused ? 'var(--text-accent)' : 'var(--text-muted)',
              }}
            />
          )}
        </div>
        {error && (
          <span
            className="text-xs"
            style={{ color: 'var(--alert-danger-text)' }}
          >
            {error}
          </span>
        )}
        {success && (
          <span
            className="text-xs"
            style={{ color: 'var(--alert-success-text)' }}
          >
            {success}
          </span>
        )}
      </div>
    );
  }
);

InputGlass.displayName = 'InputGlass';
