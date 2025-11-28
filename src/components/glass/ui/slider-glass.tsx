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
import { useTheme } from '@/lib/theme-context';
import { themeStyles } from '@/lib/themeStyles';
import { useHover } from '@/lib/hooks/use-hover';
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
      disabled,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const { isHovered, hoverProps } = useHover();
    const [isDragging, setIsDragging] = useState(false);

    const isGlass = theme === 'glass';
    const percentage = ((value - min) / (max - min)) * 100;

    const trackStyles: CSSProperties = {
      background: t.sliderTrack,
    };

    const fillStyles: CSSProperties = {
      width: `${percentage}%`,
      background: isGlass
        ? `linear-gradient(90deg, #8b5cf6, ${t.sliderFill})`
        : t.sliderFill,
      boxShadow:
        isGlass && (isHovered || isDragging)
          ? `0 0 12px ${t.sliderFill}80`
          : undefined,
    };

    const thumbStyles: CSSProperties = {
      left: `calc(${percentage}% - 10px)`,
      background: t.sliderThumb,
      border: `2px solid ${t.sliderThumbBorder}`,
      boxShadow:
        isHovered || isDragging
          ? t.sliderThumbGlow
          : isGlass
            ? `0 2px 8px rgba(0,0,0,0.3)`
            : `0 2px 4px rgba(0,0,0,0.1)`,
      transform: isDragging
        ? 'scale(1.15)'
        : isHovered
          ? 'scale(1.05)'
          : 'scale(1)',
    };

    return (
      <div className={cn('w-full', className)}>
        {(label || showValue) && (
          <div className="flex justify-between mb-2">
            {label && (
              <label
                className="text-sm font-medium"
                style={{ color: t.textSecondary }}
              >
                {label}
              </label>
            )}
            {showValue && (
              <span
                className="text-sm font-medium tabular-nums"
                style={{ color: t.textSecondary }}
              >
                {value}
              </span>
            )}
          </div>
        )}
        <div
          className="relative w-full h-6 flex items-center"
          onMouseEnter={hoverProps.onMouseEnter}
          onMouseLeave={hoverProps.onMouseLeave}
        >
          {/* Track */}
          <div
            className="absolute w-full h-2 rounded-full"
            style={trackStyles}
          />
          {/* Fill */}
          <div
            className="absolute h-2 rounded-full transition-all duration-150"
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
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className="absolute w-full h-6 opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            {...props}
          />
          {/* Thumb */}
          <div
            className="absolute w-5 h-5 rounded-full transition-all duration-150 pointer-events-none"
            style={thumbStyles}
          />
        </div>
      </div>
    );
  }
);

SliderGlass.displayName = 'SliderGlass';
