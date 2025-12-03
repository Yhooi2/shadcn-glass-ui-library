/**
 * ToggleGlass Component
 *
 * Glass-themed toggle switch with:
 * - Theme-aware styling (glass/light/aurora)
 * - Glow effect when active
 * - Size variants
 * - Optional label
 */

import { forwardRef, type CSSProperties } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { toggleSizes } from '@/lib/variants/toggle-glass-variants';
import '@/glass-theme.css';

// ========================================
// SIZE CONFIG
// ========================================

const sizesConfig = {
  sm: { track: 'w-8 h-4', knob: 'w-3 h-3', translate: 'translate-x-4' },
  md: { track: 'w-11 h-6', knob: 'w-5 h-5', translate: 'translate-x-5' },
  lg: { track: 'w-14 h-7', knob: 'w-6 h-6', translate: 'translate-x-7' },
} as const;

// ========================================
// PROPS INTERFACE
// ========================================

export interface ToggleGlassProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof toggleSizes> {
  readonly checked: boolean;
  readonly onChange?: (checked: boolean) => void;
  readonly label?: string;
}

// ========================================
// COMPONENT
// ========================================

export const ToggleGlass = forwardRef<HTMLButtonElement, ToggleGlassProps>(
  (
    {
      className,
      size = 'md',
      checked,
      onChange,
      disabled,
      label,
      ...props
    },
    ref
  ) => {
    const s = sizesConfig[size ?? 'md'];

    const trackStyles: CSSProperties = {
      background: checked ? 'var(--toggle-active-bg)' : 'var(--toggle-bg)',
      boxShadow: checked ? 'var(--toggle-glow)' : 'none',
    };

    const knobStyles: CSSProperties = {
      background: 'var(--toggle-knob)',
    };

    const toggle = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={cn(
          toggleSizes({ size }),
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          !label && className
        )}
        style={trackStyles}
        onClick={() => !disabled && onChange?.(!checked)}
        {...props}
      >
        <div
          className={cn(
            'absolute top-0.5 left-0.5 rounded-full shadow-md transition-all duration-300',
            s.knob,
            checked && s.translate
          )}
          style={knobStyles}
        />
      </button>
    );

    if (label) {
      return (
        <label
          className={cn(
            'inline-flex items-center gap-2 md:gap-2.5',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            className
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
