/**
 * FormFieldWrapper Component
 *
 * Unified wrapper for form controls with label, validation states, and messages.
 * Eliminates code duplication across InputGlass, SliderGlass, ComboBoxGlass, etc.
 *
 * Handles:
 * - Label with optional required indicator
 * - Error messages (highest priority, red)
 * - Success messages (green, shown if no error)
 * - Consistent spacing and typography
 */

import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the FormFieldWrapper component
 */
export interface FormFieldWrapperProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Label text displayed above the field
   */
  label?: string;

  /**
   * Error message - takes priority over success
   * Displays in red below the field
   */
  error?: string;

  /**
   * Success message - displays in green if no error
   * Displays below the field
   */
  success?: string;

  /**
   * ID to link label with input via htmlFor
   * Should match the input's id attribute
   */
  htmlFor?: string;

  /**
   * Shows red asterisk (*) next to label
   * @default false
   */
  required?: boolean;

  /**
   * The form control element(s) to wrap
   */
  children: ReactNode;
}

/**
 * FormFieldWrapper component
 *
 * Provides consistent structure for form fields with labels and validation messages.
 * Used by InputGlass, SliderGlass, and other form components.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <FormFieldWrapper label="Email" htmlFor="email-input">
 *   <input id="email-input" type="email" />
 * </FormFieldWrapper>
 *
 * // With validation
 * <FormFieldWrapper
 *   label="Username"
 *   error="Username is required"
 *   required
 *   htmlFor="username"
 * >
 *   <input id="username" />
 * </FormFieldWrapper>
 *
 * // Success state
 * <FormFieldWrapper
 *   label="Password"
 *   success="Strong password"
 *   htmlFor="password"
 * >
 *   <input id="password" type="password" />
 * </FormFieldWrapper>
 * ```
 */
export const FormFieldWrapper = forwardRef<HTMLDivElement, FormFieldWrapperProps>(
  (
    {
      label,
      error,
      success,
      htmlFor,
      required,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-1 md:gap-1.5', className)}
        {...props}
      >
        {label && (
          <label
            htmlFor={htmlFor}
            className="text-xs md:text-sm font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            {label}
            {required && (
              <span className="text-[var(--alert-danger-text)] ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {children}

        {error && (
          <p
            className="text-xs"
            style={{ color: 'var(--alert-danger-text)' }}
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        {success && !error && (
          <p
            className="text-xs"
            style={{ color: 'var(--alert-success-text)' }}
            aria-live="polite"
          >
            {success}
          </p>
        )}
      </div>
    );
  }
);

FormFieldWrapper.displayName = 'FormFieldWrapper';
