/**
 * InputGlass Component
 *
 * Glass-themed input with:
 * - Theme-aware styling (glass/light/aurora)
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
import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-context';
import { themeStyles } from '@/lib/themeStyles';
import { useFocus } from '@/lib/hooks/use-focus';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type InputGlassSize = 'sm' | 'md' | 'lg';

// ========================================
// SIZE VARIANTS (using CVA)
// ========================================

const inputSizes = cva('', {
  variants: {
    inputSize: {
      sm: 'px-3 py-2 text-xs rounded-lg',
      md: 'px-4 py-2.5 text-sm rounded-xl',
      lg: 'px-5 py-3 text-base rounded-xl',
    },
  },
  defaultVariants: {
    inputSize: 'md',
  },
});

// ========================================
// PROPS INTERFACE
// ========================================

export interface InputGlassProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputSizes> {
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
    const { theme } = useTheme();
    const t = themeStyles[theme];
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

    const getBorderColor = (): string => {
      if (error) return t.statusRed;
      if (success) return t.statusGreen;
      if (isFocused) return t.inputFocusBorder;
      return t.inputBorder;
    };

    const inputStyles: CSSProperties = {
      background: t.inputBg,
      border: `1px solid ${getBorderColor()}`,
      color: t.inputText,
      boxShadow: isFocused ? t.inputFocusGlow : 'none',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    };

    const hasIcon = Boolean(Icon);
    const paddingLeft = hasIcon && iconPosition === 'left' ? 'pl-10' : '';
    const paddingRight = hasIcon && iconPosition === 'right' ? 'pr-10' : '';

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label
            className="text-sm font-medium"
            style={{ color: t.textSecondary }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && iconPosition === 'left' && (
            <Icon
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300"
              style={{
                color: isFocused ? t.textAccent : t.textMuted,
              }}
            />
          )}
          <input
            ref={ref}
            className={cn(
              'w-full transition-all duration-300 outline-none',
              inputSizes({ inputSize }),
              paddingLeft,
              paddingRight,
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            style={inputStyles}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {Icon && iconPosition === 'right' && (
            <Icon
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300"
              style={{
                color: isFocused ? t.textAccent : t.textMuted,
              }}
            />
          )}
        </div>
        {error && (
          <span className="text-xs" style={{ color: t.alertDangerText }}>
            {error}
          </span>
        )}
        {success && (
          <span className="text-xs" style={{ color: t.alertSuccessText }}>
            {success}
          </span>
        )}
      </div>
    );
  }
);

InputGlass.displayName = 'InputGlass';

export { inputSizes as inputGlassVariants };
