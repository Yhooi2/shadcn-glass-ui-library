/**
 * SliderGlass Component
 *
 * Glass-themed range slider built on Radix UI with shadcn/ui compatible API:
 * - Theme-aware styling (glass/light/aurora)
 * - Glow effect on hover/drag
 * - Gradient fill (glass theme)
 * - Range slider support (multiple thumbs)
 * - Optional label and value display
 *
 * **shadcn/ui compatible props:**
 * - `value` / `defaultValue` - Array of values (supports range)
 * - `onValueChange` - Callback when values change
 * - `onValueCommit` - Callback when interaction ends
 *
 * @example
 * ```tsx
 * // Single value (controlled)
 * <SliderGlass value={[50]} onValueChange={setValue} />
 *
 * // Range slider
 * <SliderGlass defaultValue={[25, 75]} />
 *
 * // With label and value display
 * <SliderGlass value={[50]} onValueChange={setValue} label="Volume" showValue />
 * ```
 */

import { forwardRef, type CSSProperties, type ComponentPropsWithoutRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';
import { FormFieldWrapper } from '@/components/glass/primitives';
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

export interface SliderGlassProps extends Omit<
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  'value' | 'defaultValue' | 'onValueChange'
> {
  /**
   * Controlled value (shadcn/ui compatible - array for range support)
   */
  readonly value?: number[];
  /**
   * Default value for uncontrolled usage (array for range support)
   */
  readonly defaultValue?: number[];
  /**
   * Callback when value changes (shadcn/ui compatible)
   */
  readonly onValueChange?: (value: number[]) => void;
  /**
   * Callback when interaction ends (mouse up / touch end)
   */
  readonly onValueCommit?: (value: number[]) => void;
  /**
   * Show current value(s) next to label
   */
  readonly showValue?: boolean;
  /**
   * Optional label text
   */
  readonly label?: string;
  /**
   * Error message to display
   */
  readonly error?: string;
  /**
   * Success message to display
   */
  readonly success?: string;
}

// ========================================
// COMPONENT
// ========================================

export const SliderGlass = forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderGlassProps
>(
  (
    {
      className,
      value,
      defaultValue,
      onValueChange,
      onValueCommit,
      min = 0,
      max = 100,
      step = 1,
      showValue,
      label,
      error,
      success,
      disabled,
      orientation = 'horizontal',
      ...props
    },
    ref
  ) => {
    // Determine current values for rendering thumbs and display
    const currentValue = value ?? defaultValue ?? [min];

    // Format value display
    const formatValueDisplay = (values: number[]) => {
      if (values.length === 1) {
        return `${values[0]}`;
      }
      return `${values[0]} - ${values[values.length - 1]}`;
    };

    // Track styles via CSS variables
    const trackStyles: CSSProperties = {
      background: 'var(--slider-track)',
    };

    // Range (fill) styles via CSS variables
    const rangeStyles: CSSProperties = {
      background: 'var(--slider-fill)',
    };

    // Thumb styles via CSS variables
    const thumbStyles: CSSProperties = {
      background: 'var(--slider-thumb)',
      border: '2px solid var(--slider-thumb-border)',
    };

    // Custom label with value display - only used when showValue is true
    const customLabel =
      (label && showValue) || (!label && showValue) ? (
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
            {formatValueDisplay(currentValue)}
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
        <SliderPrimitive.Root
          ref={ref}
          data-slot="slider"
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          onValueCommit={onValueCommit}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          orientation={orientation}
          className={cn(
            'relative flex touch-none select-none',
            orientation === 'horizontal'
              ? 'w-full h-8 md:h-6 items-center'
              : 'flex-col h-full w-8 md:w-6 justify-center',
            disabled && 'opacity-50 cursor-not-allowed',
            'group'
          )}
          {...props}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className={cn(
              'relative grow rounded-full',
              orientation === 'horizontal' ? 'h-2.5 md:h-2 w-full' : 'w-2.5 md:w-2 h-full'
            )}
            style={trackStyles}
          >
            <SliderPrimitive.Range
              data-slot="slider-range"
              className={cn(
                'absolute rounded-full transition-shadow duration-150',
                orientation === 'horizontal' ? 'h-full' : 'w-full',
                'group-hover:shadow-(--slider-fill-glow)',
                'group-active:shadow-(--slider-fill-glow)'
              )}
              style={rangeStyles}
            />
          </SliderPrimitive.Track>
          {currentValue.map((_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              data-slot="slider-thumb"
              className={cn(
                'block rounded-full shadow-md transition-all duration-150',
                'w-6 h-6 md:w-5 md:h-5',
                'hover:scale-105',
                'focus-visible:outline-none focus-visible:shadow-(--focus-glow)',
                'active:scale-110',
                disabled && 'pointer-events-none'
              )}
              style={thumbStyles}
              aria-label={
                label
                  ? currentValue.length > 1
                    ? `${label} thumb ${index + 1}`
                    : label
                  : `Slider thumb ${index + 1}`
              }
            />
          ))}
        </SliderPrimitive.Root>
      </FormFieldWrapper>
    );
  }
);

SliderGlass.displayName = 'SliderGlass';
