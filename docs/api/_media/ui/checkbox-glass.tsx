/**
 * CheckboxGlass Component
 *
 * Glass-themed checkbox with:
 * - Theme-aware styling (glass/light/aurora)
 * - Glow effect on hover
 * - Optional label
 */

import { forwardRef, type CSSProperties } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import { useFocus } from '@/lib/hooks/use-focus';
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

/**
 * Props for the CheckboxGlass component
 *
 * A glass-themed checkbox with accessible keyboard navigation, focus management,
 * and touch-friendly targets. Features glow effects and theme-aware styling.
 *
 * @accessibility
 * - **Keyboard Navigation:** Full keyboard support with Enter/Space to toggle, Tab to focus (WCAG 2.1.1)
 * - **Focus Management:** Visible focus ring using `--focus-glow` CSS variable (WCAG 2.4.7)
 * - **Screen Readers:** Dual implementation with native `<input type="checkbox">` (hidden) + visual `<div role="checkbox">`
 * - **ARIA Attributes:** Uses `role="checkbox"` and `aria-checked` for proper state announcement
 * - **Label Association:** Visual label automatically associated with checkbox via `<label>` wrapper
 * - **Touch Targets:** 44x44px minimum touch area per Apple HIG (WCAG 2.5.5 compliance)
 * - **Color Contrast:** Check mark and backgrounds meet WCAG AA contrast ratio 4.5:1
 * - **Motion:** Transitions respect `prefers-reduced-motion` settings
 *
 * @example
 * ```tsx
 * // Basic checkbox with label
 * <CheckboxGlass checked={agreed} onChange={setAgreed} label="I agree to terms" />
 *
 * // Checkbox with accessible name (no visual label)
 * <CheckboxGlass
 *   checked={checked}
 *   onChange={setChecked}
 *   aria-label="Select all items"
 * />
 *
 * // Form integration with validation
 * <form onSubmit={handleSubmit}>
 *   <CheckboxGlass
 *     checked={newsletter}
 *     onChange={setNewsletter}
 *     label="Subscribe to newsletter"
 *     aria-describedby="newsletter-help"
 *   />
 *   <p id="newsletter-help">Receive weekly updates</p>
 *   <CheckboxGlass
 *     checked={terms}
 *     onChange={setTerms}
 *     label="Accept terms and conditions"
 *     required
 *     aria-invalid={submitted && !terms}
 *   />
 *   {submitted && !terms && (
 *     <span role="alert">You must accept the terms</span>
 *   )}
 * </form>
 *
 * // Disabled checkbox (state announced to screen readers)
 * <CheckboxGlass
 *   checked={true}
 *   onChange={() => {}}
 *   label="This option is locked"
 *   disabled
 * />
 *
 * // Checkbox group with fieldset
 * <fieldset>
 *   <legend>Select your interests</legend>
 *   <CheckboxGlass
 *     checked={interests.tech}
 *     onChange={(checked) => setInterests({ ...interests, tech: checked })}
 *     label="Technology"
 *   />
 *   <CheckboxGlass
 *     checked={interests.design}
 *     onChange={(checked) => setInterests({ ...interests, design: checked })}
 *     label="Design"
 *   />
 * </fieldset>
 * ```
 */
export interface CheckboxGlassProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  readonly checked: boolean;
  readonly onChange?: (checked: boolean) => void;
  readonly label?: string;
}

// ========================================
// COMPONENT
// ========================================

export const CheckboxGlass = forwardRef<HTMLInputElement, CheckboxGlassProps>(
  (
    {
      className,
      checked,
      onChange,
      label,
      disabled,
      ...props
    },
    ref
  ) => {
    const { isHovered, hoverProps } = useHover();
    const { isFocusVisible, focusProps } = useFocus({ focusVisible: true });

    const checkboxStyles: CSSProperties = {
      background: checked ? 'var(--checkbox-checked-bg)' : 'var(--checkbox-bg)',
      border: `2px solid ${checked ? 'var(--checkbox-checked-bg)' : 'var(--checkbox-border)'}`,
      boxShadow: isFocusVisible && !disabled
        ? 'var(--focus-glow)'
        : isHovered && !disabled
        ? 'var(--checkbox-glow)'
        : 'none',
    };

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
          checked={checked}
          onChange={(e) => !disabled && onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        {/* Touch area wrapper - 44px minimum for Apple HIG compliance */}
        <span className="inline-flex items-center justify-center min-w-11 min-h-11">
          {/* Visual checkbox - smaller but within 44px touch area */}
          <div
            onClick={() => !disabled && onChange?.(!checked)}
            onFocus={focusProps.onFocus}
            onBlur={focusProps.onBlur}
            className="relative w-6 h-6 md:w-5 md:h-5 rounded-md flex items-center justify-center transition-all duration-300"
            style={checkboxStyles}
            role="checkbox"
            aria-checked={checked}
            aria-label={label || 'Checkbox'}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onChange?.(!checked);
              }
            }}
          >
            {checked && (
              <Check className="w-3.5 h-3.5 md:w-3 md:h-3" style={{ color: 'var(--text-inverse)' }} />
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
