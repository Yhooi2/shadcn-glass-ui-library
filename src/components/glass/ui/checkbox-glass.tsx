/**
 * CheckboxGlass Component
 *
 * Glass-themed checkbox with:
 * - Theme-aware styling (glass/light/aurora)
 * - Glow effect on hover
 * - Optional label
 */

import * as React from 'react';
import { forwardRef, type CSSProperties } from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import { useFocus } from '@/lib/hooks/use-focus';
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

/**
 * Checked state type compatible with shadcn/ui (Radix UI)
 */
export type CheckedState = boolean | 'indeterminate';

/**
 * Props for the CheckboxGlass component
 *
 * A glass-themed checkbox with accessible keyboard navigation, focus management,
 * and touch-friendly targets. Features glow effects and theme-aware styling.
 *
 * **shadcn/ui Compatibility (v2.3.0+):**
 * - Supports `onCheckedChange` callback (shadcn/ui pattern)
 * - Supports `'indeterminate'` state for tri-state checkboxes
 * - Backwards compatible with `onChange` prop
 *
 * @accessibility
 * - **Keyboard Navigation:** Full keyboard support with Enter/Space to toggle, Tab to focus (WCAG 2.1.1)
 * - **Focus Management:** Visible focus ring using `--focus-glow` CSS variable (WCAG 2.4.7)
 * - **Screen Readers:** Dual implementation with native `<input type="checkbox">` (hidden) + visual `<div role="checkbox">`
 * - **ARIA Attributes:** Uses `role="checkbox"` and `aria-checked` for proper state announcement (including 'mixed' for indeterminate)
 * - **Label Association:** Visual label automatically associated with checkbox via `<label>` wrapper
 * - **Touch Targets:** 44x44px minimum touch area per Apple HIG (WCAG 2.5.5 compliance)
 * - **Color Contrast:** Check mark and backgrounds meet WCAG AA contrast ratio 4.5:1
 * - **Motion:** Transitions respect `prefers-reduced-motion` settings
 *
 * @example
 * ```tsx
 * // shadcn/ui compatible API
 * <CheckboxGlass
 *   checked={isChecked}
 *   onCheckedChange={(checked) => setIsChecked(checked === true)}
 * />
 *
 * // Indeterminate state (tri-state checkbox)
 * <CheckboxGlass
 *   checked={allSelected ? true : someSelected ? 'indeterminate' : false}
 *   onCheckedChange={(checked) => {
 *     if (checked === true) selectAll();
 *     else deselectAll();
 *   }}
 *   label="Select all"
 * />
 *
 * // Legacy API (still supported)
 * <CheckboxGlass checked={agreed} onChange={setAgreed} label="I agree to terms" />
 *
 * // Form integration with validation
 * <form onSubmit={handleSubmit}>
 *   <CheckboxGlass
 *     checked={newsletter}
 *     onCheckedChange={setNewsletter}
 *     label="Subscribe to newsletter"
 *     aria-describedby="newsletter-help"
 *   />
 *   <p id="newsletter-help">Receive weekly updates</p>
 * </form>
 *
 * // Disabled checkbox
 * <CheckboxGlass
 *   checked={true}
 *   onCheckedChange={() => {}}
 *   label="This option is locked"
 *   disabled
 * />
 * ```
 *
 * @since v2.3.0 - Added shadcn/ui compatible `onCheckedChange` and `indeterminate` support
 */
export interface CheckboxGlassProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'checked' | 'defaultChecked'
> {
  /** Checked state: true, false, or 'indeterminate' (shadcn/ui compatible) */
  readonly checked?: CheckedState;
  /** Default checked state for uncontrolled usage */
  readonly defaultChecked?: CheckedState;
  /**
   * Callback when checked state changes (shadcn/ui compatible)
   * @param checked - New checked state
   */
  readonly onCheckedChange?: (checked: CheckedState) => void;
  /**
   * @deprecated Use `onCheckedChange` instead. Will be removed in v4.0.
   * Legacy callback for backwards compatibility.
   */
  readonly onChange?: (checked: boolean) => void;
  /** Optional label text */
  readonly label?: string;
}

// ========================================
// COMPONENT
// ========================================

export const CheckboxGlass = forwardRef<HTMLInputElement, CheckboxGlassProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked,
      onCheckedChange,
      onChange,
      label,
      disabled,
      ...props
    },
    ref
  ) => {
    const { isHovered, hoverProps } = useHover();
    const { isFocusVisible, focusProps } = useFocus({ focusVisible: true });

    // Support both controlled and uncontrolled modes
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<CheckedState>(
      defaultChecked ?? false
    );
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    // Determine visual states
    const isChecked = checked === true;
    const isIndeterminate = checked === 'indeterminate';
    const showIndicator = isChecked || isIndeterminate;

    // Handle state change
    const handleChange = (newChecked: CheckedState) => {
      if (disabled) return;

      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }

      // Call shadcn/ui compatible callback
      onCheckedChange?.(newChecked);

      // Call legacy callback (deprecated)
      if (onChange && typeof newChecked === 'boolean') {
        onChange(newChecked);
      }
    };

    // Toggle to next state (indeterminate -> true, true -> false, false -> true)
    const toggleChecked = () => {
      if (isIndeterminate) {
        handleChange(true);
      } else {
        handleChange(!isChecked);
      }
    };

    const checkboxStyles: CSSProperties = {
      background: showIndicator ? 'var(--checkbox-checked-bg)' : 'var(--checkbox-bg)',
      border: `2px solid ${showIndicator ? 'var(--checkbox-checked-bg)' : 'var(--checkbox-border)'}`,
      boxShadow:
        isFocusVisible && !disabled
          ? 'var(--focus-glow)'
          : isHovered && !disabled
            ? 'var(--checkbox-glow)'
            : 'none',
    };

    // ARIA checked value for screen readers
    const ariaChecked = isIndeterminate ? 'mixed' : isChecked;

    return (
      <label
        className={cn(
          'inline-flex items-center gap-2 md:gap-2.5',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          className
        )}
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        {/* Touch area wrapper - 44px minimum for Apple HIG compliance */}
        <span className="inline-flex items-center justify-center min-w-11 min-h-11">
          {/* Visual checkbox - smaller but within 44px touch area */}
          <div
            onClick={toggleChecked}
            onFocus={focusProps.onFocus}
            onBlur={focusProps.onBlur}
            className="relative w-6 h-6 md:w-5 md:h-5 rounded-md flex items-center justify-center transition-all duration-300"
            style={checkboxStyles}
            role="checkbox"
            aria-checked={ariaChecked}
            aria-label={label || 'Checkbox'}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                toggleChecked();
              }
            }}
          >
            {isChecked && (
              <Check
                className="w-3.5 h-3.5 md:w-3 md:h-3"
                style={{ color: 'var(--text-inverse)' }}
              />
            )}
            {isIndeterminate && (
              <Minus
                className="w-3.5 h-3.5 md:w-3 md:h-3"
                style={{ color: 'var(--text-inverse)' }}
              />
            )}
          </div>
        </span>
        {label && (
          <span className="text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

CheckboxGlass.displayName = 'CheckboxGlass';

/**
 * Checkbox - shadcn/ui compatible alias for CheckboxGlass
 *
 * @example
 * ```tsx
 * import { Checkbox } from 'shadcn-glass-ui'
 *
 * <Checkbox
 *   checked={isChecked}
 *   onCheckedChange={(checked) => setIsChecked(checked === true)}
 * />
 * ```
 *
 * @since v2.3.0
 */
export const Checkbox = CheckboxGlass;
