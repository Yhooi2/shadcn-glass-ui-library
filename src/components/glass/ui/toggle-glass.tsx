/**
 * ToggleGlass Component
 *
 * Glass-themed toggle switch with shadcn/ui compatible API:
 * - Theme-aware styling (glass/light/aurora)
 * - Glow effect when active
 * - Size variants (default, sm, lg)
 * - Variant styles (default, outline)
 * - Optional label
 *
 * **shadcn/ui compatible props:**
 * - `pressed` / `defaultPressed` - Control pressed state
 * - `onPressedChange` - Callback when state changes
 * - `variant` - 'default' | 'outline'
 * - `size` - 'default' | 'sm' | 'lg'
 *
 * @example
 * ```tsx
 * // Controlled
 * <ToggleGlass pressed={isOn} onPressedChange={setIsOn} />
 *
 * // Uncontrolled
 * <ToggleGlass defaultPressed={true} />
 *
 * // With variant
 * <ToggleGlass variant="outline" pressed={isOn} onPressedChange={setIsOn} />
 * ```
 */

import { forwardRef, useState, type CSSProperties } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useFocus } from '@/lib/hooks/use-focus';
import { toggleSizes, type ToggleGlassVariant } from '@/lib/variants/toggle-glass-variants';
import '@/glass-theme.css';

// ========================================
// SIZE CONFIG
// ========================================

const sizesConfig = {
  sm: { track: 'w-8 h-4', knob: 'w-3 h-3', translate: 'translate-x-4' },
  default: { track: 'w-11 h-6', knob: 'w-5 h-5', translate: 'translate-x-5' },
  lg: { track: 'w-14 h-7', knob: 'w-6 h-6', translate: 'translate-x-7' },
} as const;

// ========================================
// PROPS INTERFACE
// ========================================

export interface ToggleGlassProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'defaultValue'>,
    VariantProps<typeof toggleSizes> {
  /**
   * Controlled pressed state (shadcn/ui compatible)
   */
  readonly pressed?: boolean;
  /**
   * Default pressed state for uncontrolled usage
   */
  readonly defaultPressed?: boolean;
  /**
   * Callback when pressed state changes (shadcn/ui compatible)
   */
  readonly onPressedChange?: (pressed: boolean) => void;
  /**
   * Visual variant (shadcn/ui compatible)
   * @default "default"
   */
  readonly variant?: ToggleGlassVariant;
  /**
   * Optional label text
   */
  readonly label?: string;
  /**
   * className for the wrapper label element (when label is provided).
   * Use this for spacing, layout, or wrapper-specific styling.
   * Note: `className` always applies to the toggle button (shadcn/ui pattern).
   * @since v2.6.0
   */
  readonly wrapperClassName?: string;
}

// ========================================
// COMPONENT
// ========================================

export const ToggleGlass = forwardRef<HTMLButtonElement, ToggleGlassProps>(
  (
    {
      className,
      wrapperClassName,
      size = 'default',
      variant = 'default',
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      disabled,
      label,
      ...props
    },
    ref
  ) => {
    // Support both controlled and uncontrolled modes
    const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed);
    const isControlled = controlledPressed !== undefined;
    const isPressed = isControlled ? controlledPressed : uncontrolledPressed;

    const { isFocusVisible, focusProps } = useFocus({ focusVisible: true });
    const s = sizesConfig[size ?? 'default'];

    const handleToggle = () => {
      if (disabled) return;
      const newValue = !isPressed;
      if (!isControlled) {
        setUncontrolledPressed(newValue);
      }
      onPressedChange?.(newValue);
    };

    const getTrackStyles = (): CSSProperties => {
      if (variant === 'outline') {
        return {
          background: isPressed ? 'var(--toggle-outline-active-bg)' : 'transparent',
          borderColor: isPressed
            ? 'var(--toggle-outline-active-border)'
            : 'var(--toggle-outline-border)',
          boxShadow: isFocusVisible && !disabled ? 'var(--focus-glow)' : 'none',
        };
      }
      return {
        background: isPressed ? 'var(--toggle-active-bg)' : 'var(--toggle-bg)',
        boxShadow:
          isFocusVisible && !disabled
            ? 'var(--focus-glow)'
            : isPressed
              ? 'var(--toggle-glow)'
              : 'none',
      };
    };

    const knobStyles: CSSProperties = {
      background: 'var(--toggle-knob)',
    };

    // Touch area wrapper ensures 44px minimum touch target (Apple HIG)
    const toggle = (
      <span className="inline-flex items-center justify-center min-h-11">
        <button
          ref={ref}
          data-slot="toggle"
          type="button"
          role="switch"
          aria-pressed={isPressed}
          aria-label={label || 'Toggle switch'}
          disabled={disabled}
          className={cn(
            toggleSizes({ size, variant }),
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            className
          )}
          style={getTrackStyles()}
          onClick={handleToggle}
          onFocus={focusProps.onFocus}
          onBlur={focusProps.onBlur}
          {...props}
        >
          <div
            className={cn(
              'absolute top-0.5 left-0.5 rounded-full shadow-md transition-all duration-300',
              s.knob,
              isPressed && s.translate
            )}
            style={knobStyles}
          />
        </button>
      </span>
    );

    if (label) {
      return (
        <label
          className={cn(
            'inline-flex items-center gap-2 md:gap-2.5',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            wrapperClassName
          )}
        >
          {toggle}
          <span className="text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>
            {label}
          </span>
        </label>
      );
    }

    return toggle;
  }
);

ToggleGlass.displayName = 'ToggleGlass';

// ========================================
// SHADCN/UI COMPATIBLE ALIAS
// ========================================

/**
 * Toggle - shadcn/ui compatible alias for ToggleGlass
 *
 * @example
 * ```tsx
 * import { Toggle } from 'shadcn-glass-ui'
 *
 * // Controlled
 * <Toggle pressed={isOn} onPressedChange={setIsOn}>
 *   <Bold className="h-4 w-4" />
 * </Toggle>
 *
 * // Uncontrolled
 * <Toggle defaultPressed>
 *   <Italic className="h-4 w-4" />
 * </Toggle>
 * ```
 * @since v2.5.0
 */
export const Toggle = ToggleGlass;
