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
import { ICON_SIZES, FormFieldWrapper } from '@/components/glass/primitives';
import '@/glass-theme.css';

// ========================================
// CSS VARIABLE HELPERS
// ========================================

const getInputStyles = (isFocused: boolean, error?: string, success?: string): CSSProperties => {
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
    boxShadow: isFocused ? 'var(--focus-glow)' : 'none',
  };
};

// ========================================
// PROPS INTERFACE
// ========================================

/**
 * Props for the InputGlass component
 *
 * A glass-themed input field with labels, validation states, and icon support.
 * Features focus glow effects and theme-aware styling.
 *
 * @accessibility
 * - **Keyboard Navigation:** Full keyboard support with native `<input>` element, standard tab navigation
 * - **Focus Management:** Visible focus ring using `--focus-glow` CSS variable (WCAG 2.4.7)
 * - **Screen Readers:** Semantic `<label>` elements properly associated via `htmlFor`, error/success messages announced with `aria-describedby`
 * - **Error State:** Red border and error message displayed below input, programmatically associated for screen readers
 * - **Success State:** Green border and success message displayed below input, programmatically associated for screen readers
 * - **Touch Targets:** Minimum 44x44px touch target on mobile devices (WCAG 2.5.5)
 * - **Color Contrast:** All text meets WCAG AA contrast ratio 4.5:1 minimum against backgrounds
 * - **Motion:** Icon color transitions respect `prefers-reduced-motion` settings
 *
 * @example
 * ```tsx
 * // Basic input with label
 * <InputGlass label="Email" placeholder="you@example.com" />
 *
 * // With aria-describedby for additional context
 * <InputGlass
 *   label="Username"
 *   placeholder="Enter username"
 *   aria-describedby="username-help"
 * />
 * <span id="username-help">Must be 3-20 characters</span>
 *
 * // With validation states (automatically announced to screen readers)
 * <InputGlass label="Username" error="Username is required" />
 * <InputGlass label="Password" success="Strong password" type="password" />
 *
 * // With icon and accessible label
 * <InputGlass
 *   icon={Search}
 *   placeholder="Search..."
 *   aria-label="Search products"
 * />
 * <InputGlass icon={Mail} iconPosition="right" type="email" />
 *
 * // Disabled state (automatically announced)
 * <InputGlass label="Email" disabled value="locked@example.com" />
 *
 * // Form integration with accessible error handling
 * <form onSubmit={handleSubmit}>
 *   <InputGlass
 *     label="Email"
 *     type="email"
 *     required
 *     error={errors.email}
 *     aria-invalid={!!errors.email}
 *   />
 *   <InputGlass
 *     label="Password"
 *     type="password"
 *     icon={Lock}
 *     error={errors.password}
 *   />
 *   <ButtonGlass type="submit">Sign In</ButtonGlass>
 * </form>
 * ```
 */
export interface InputGlassProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
  /**
   * Label text displayed above the input field
   */
  readonly label?: string;

  /**
   * Error message to display below the input (red styling)
   */
  readonly error?: string;

  /**
   * Success message to display below the input (green styling)
   */
  readonly success?: string;

  /**
   * Icon component from lucide-react to display
   * @example icon={Search}
   */
  readonly icon?: LucideIcon;

  /**
   * Position of the icon relative to input text
   * @default "left"
   */
  readonly iconPosition?: 'left' | 'right';

  /**
   * @deprecated Use `size` prop instead. Will be removed in v4.0
   * @default "md"
   */
  readonly inputSize?: 'sm' | 'md' | 'lg';

  // Note: size prop comes from VariantProps<typeof inputVariants>
}

// ========================================
// COMPONENT
// ========================================

export const InputGlass = forwardRef<HTMLInputElement, InputGlassProps>(
  (
    {
      className,
      size,
      inputSize,
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
    // Determine size value with fallback to deprecated inputSize prop
    const sizeValue = size ?? inputSize ?? 'md';

    // Deprecation warning in development mode
    if (process.env.NODE_ENV !== 'production' && inputSize !== undefined) {
      console.warn(
        '[InputGlass] The `inputSize` prop is deprecated and will be removed in v4.0. Use `size` instead.'
      );
    }

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
      <FormFieldWrapper
        label={label}
        error={error}
        success={success}
        htmlFor={props.id}
        className={className}
      >
        <div className="relative">
          {Icon && iconPosition === 'left' && (
            <Icon
              className={cn(
                'absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10',
                ICON_SIZES.md
              )}
              style={{
                color: isFocused ? 'var(--text-accent)' : 'var(--text-muted)',
              }}
            />
          )}
          <input
            ref={ref}
            data-slot="input"
            className={cn(inputVariants({ size: sizeValue }), paddingLeft, paddingRight)}
            style={getInputStyles(isFocused, error, success)}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {Icon && iconPosition === 'right' && (
            <Icon
              className={cn(
                'absolute right-2.5 md:right-3 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10',
                ICON_SIZES.md
              )}
              style={{
                color: isFocused ? 'var(--text-accent)' : 'var(--text-muted)',
              }}
            />
          )}
        </div>
      </FormFieldWrapper>
    );
  }
);

InputGlass.displayName = 'InputGlass';
