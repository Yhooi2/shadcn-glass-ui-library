/**
 * CheckboxGlass Component
 *
 * Glass-themed checkbox built on Radix UI primitives with:
 * - 100% shadcn/ui type compatibility
 * - Theme-aware styling (glass/light/aurora)
 * - Glow effect on hover/focus
 * - Optional label
 *
 * @since v2.2.6 - Migrated to Radix UI primitives for full type compatibility
 */

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

/**
 * Checked state type compatible with shadcn/ui (Radix UI)
 */
export type CheckedState = boolean | 'indeterminate';

/**
 * Props for the CheckboxGlass component
 *
 * Extends Radix UI Checkbox.Root props for 100% shadcn/ui compatibility.
 * All Radix props are supported including: checked, defaultChecked, onCheckedChange,
 * disabled, required, name, value, etc.
 *
 * **Type Compatibility (v2.3.1+):**
 * - Extends `React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>`
 * - No more `as unknown as` type assertions needed
 * - Full IntelliSense for all Radix props
 *
 * @accessibility
 * - **Keyboard Navigation:** Space to toggle (WCAG 2.1.1)
 * - **Focus Management:** Visible focus ring using `--focus-glow` CSS variable (WCAG 2.4.7)
 * - **Screen Readers:** Radix UI handles ARIA attributes automatically
 * - **Touch Targets:** 44x44px minimum touch area per Apple HIG (WCAG 2.5.5)
 * - **Color Contrast:** Check mark and backgrounds meet WCAG AA contrast ratio 4.5:1
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
 * ```
 *
 * @since v2.3.0 - Added shadcn/ui compatible `onCheckedChange` and `indeterminate` support
 * @since v2.2.6 - Migrated to Radix UI primitives for full type compatibility
 */
export interface CheckboxGlassProps extends Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'onChange'
> {
  /**
   * @deprecated Use `onCheckedChange` instead. Will be removed in v4.0.
   * Legacy callback for backwards compatibility.
   */
  readonly onChange?: (checked: boolean) => void;
  /** Optional label text (Glass UI extension) */
  readonly label?: string;
  /**
   * className for the wrapper label element.
   * Use this for spacing, layout, or wrapper-specific styling.
   * Note: `className` applies to the checkbox root element (shadcn/ui pattern).
   * @since v2.6.0
   */
  readonly wrapperClassName?: string;
}

// ========================================
// COMPONENT
// ========================================

export const CheckboxGlass = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxGlassProps
>(
  (
    { className, label, wrapperClassName, onChange, onCheckedChange, disabled, checked, ...props },
    ref
  ) => {
    // Wrapper for legacy onChange callback
    const handleCheckedChange = React.useCallback(
      (newChecked: CheckedState) => {
        onCheckedChange?.(newChecked);
        // Legacy support (deprecated)
        if (onChange && typeof newChecked === 'boolean') {
          onChange(newChecked);
        }
      },
      [onCheckedChange, onChange]
    );

    // Determine visual states
    const isIndeterminate = checked === 'indeterminate';
    const isChecked = checked === true;
    const showIndicator = isChecked || isIndeterminate;

    // Inline styles for CSS variables (matches original implementation)
    const checkboxStyles: React.CSSProperties = {
      background: showIndicator ? 'var(--checkbox-checked-bg)' : 'var(--checkbox-bg)',
      borderColor: showIndicator ? 'var(--checkbox-checked-bg)' : 'var(--checkbox-border)',
    };

    return (
      <label
        className={cn(
          'inline-flex items-center gap-2 md:gap-2.5',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          wrapperClassName
        )}
      >
        {/* Touch area wrapper - 44px minimum for Apple HIG compliance */}
        <span className="inline-flex items-center justify-center min-w-11 min-h-11">
          <CheckboxPrimitive.Root
            ref={ref}
            data-slot="checkbox"
            checked={checked}
            onCheckedChange={handleCheckedChange}
            disabled={disabled}
            className={cn(
              'peer relative w-6 h-6 md:w-5 md:h-5 shrink-0',
              'rounded-md border-2 transition-all duration-300',
              'flex items-center justify-center',
              // Focus state
              'focus-visible:outline-none focus-visible:shadow-(--focus-glow)',
              // Hover state
              'hover:shadow-(--checkbox-glow)',
              // Disabled state
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none',
              className
            )}
            style={checkboxStyles}
            {...props}
          >
            <CheckboxPrimitive.Indicator
              data-slot="checkbox-indicator"
              className="flex items-center justify-center text-current"
            >
              {isIndeterminate ? (
                <Minus
                  className="w-3.5 h-3.5 md:w-3 md:h-3"
                  style={{ color: 'var(--text-inverse)' }}
                />
              ) : (
                <Check
                  className="w-3.5 h-3.5 md:w-3 md:h-3"
                  style={{ color: 'var(--text-inverse)' }}
                />
              )}
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
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
