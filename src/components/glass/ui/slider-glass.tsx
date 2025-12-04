/**
 * SliderGlass Component
 *
 * Glass-themed range slider with:
 * - Theme-aware styling (glass/light/aurora)
 * - Glow effect on hover/drag
 * - Gradient fill (glass theme)
 * - Optional label and value display
 */

import { forwardRef, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import { useFocus } from '@/lib/hooks/use-focus';
import { FormFieldWrapper } from '@/components/glass/primitives';
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

export interface SliderGlassProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly showValue?: boolean;
  readonly label?: string;
  readonly error?: string;
  readonly success?: string;
}

// ========================================
// COMPONENT
// ========================================

export const SliderGlass = forwardRef<HTMLInputElement, SliderGlassProps>(
  (
    {
      className,
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      showValue,
      label,
      error,
      success,
      disabled,
      ...props
    },
    ref
  ) => {
    const { isHovered, hoverProps } = useHover();
    const { isFocusVisible, focusProps } = useFocus({ focusVisible: true });
    const [isDragging, setIsDragging] = useState(false);

    const percentage = ((value - min) / (max - min)) * 100;

    const trackStyles: CSSProperties = {
      background: 'var(--slider-track)',
    };

    const fillStyles: CSSProperties = {
      width: `${percentage}%`,
      background: 'var(--slider-fill)',
      boxShadow:
        isHovered || isDragging
          ? 'var(--slider-fill-glow)'
          : undefined,
    };

    const thumbStyles: CSSProperties = {
      left: `calc(${percentage}% - 10px)`,
      background: 'var(--slider-thumb)',
      border: '2px solid var(--slider-thumb-border)',
      boxShadow: isFocusVisible
        ? 'var(--slider-focus-glow)'
        : isHovered || isDragging
          ? 'var(--slider-thumb-glow)'
          : 'var(--slider-thumb-shadow)',
      transform: isDragging
        ? 'scale(1.15)'
        : isHovered
          ? 'scale(1.05)'
          : 'scale(1)',
    };

    // Custom label with value display - only used when showValue is true
    // Otherwise, let FormFieldWrapper handle the label
    const customLabel = (label && showValue) || (!label && showValue) ? (
      <div className="flex justify-between mb-1.5 md:mb-2">
        {label && (
          <label
            className="text-xs md:text-sm font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            {label}
          </label>
        )}
        <span
          className="text-xs md:text-sm font-medium tabular-nums"
          style={{ color: 'var(--text-secondary)' }}
        >
          {value}
        </span>
      </div>
    ) : undefined;

    return (
      <FormFieldWrapper
        label={showValue ? undefined : label}
        error={error}
        success={success}
        className={cn('w-full', className)}
      >
        {customLabel}
        <div
          className="relative w-full h-8 md:h-6 flex items-center"
          onMouseEnter={hoverProps.onMouseEnter}
          onMouseLeave={hoverProps.onMouseLeave}
        >
          {/* Track */}
          <div
            className="absolute w-full h-2.5 md:h-2 rounded-full"
            style={trackStyles}
          />
          {/* Fill */}
          <div
            className="absolute h-2.5 md:h-2 rounded-full transition-all duration-150"
            style={fillStyles}
          />
          {/* Hidden input for accessibility */}
          <input
            ref={ref}
            type="range"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onFocus={focusProps.onFocus}
            onBlur={focusProps.onBlur}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            aria-label={label || `Slider: ${value} (${min}-${max})`}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={`${value}`}
            className="absolute w-full h-8 md:h-6 opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            style={{ outline: 'none' }}
            {...props}
          />
          {/* Thumb - larger on mobile for touch */}
          <div
            className="absolute w-6 h-6 md:w-5 md:h-5 rounded-full transition-all duration-150 pointer-events-none"
            style={thumbStyles}
          />
        </div>
      </FormFieldWrapper>
    );
  }
);

SliderGlass.displayName = 'SliderGlass';
