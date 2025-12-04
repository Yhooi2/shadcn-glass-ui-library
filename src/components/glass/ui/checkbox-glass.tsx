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
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

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

    const checkboxStyles: CSSProperties = {
      background: checked ? 'var(--checkbox-checked-bg)' : 'var(--checkbox-bg)',
      border: `2px solid ${checked ? 'var(--checkbox-checked-bg)' : 'var(--checkbox-border)'}`,
      boxShadow: isHovered && !disabled ? 'var(--checkbox-glow)' : 'none',
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
