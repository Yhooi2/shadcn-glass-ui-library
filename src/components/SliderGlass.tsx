// ========================================
// SLIDER GLASS COMPONENT
// Range slider with glow effect
// ========================================

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

export interface SliderGlassProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly showValue?: boolean;
  readonly label?: string;
}

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
    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <div className={cn("w-full", className)}>
        {(label || showValue) && (
          <div className="flex justify-between mb-2">
            {label && (
              <label
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                {label}
              </label>
            )}
            {showValue && (
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                {value}
              </span>
            )}
          </div>
        )}
        <div className="relative w-full h-6 flex items-center">
          {/* Track */}
          <div
            className="glass-slider__track absolute w-full h-2 rounded-full"
          />
          {/* Fill */}
          <div
            className="glass-slider__fill absolute h-2 rounded-full transition-all duration-150"
            style={{ width: `${percentage}%` }}
          />
          {/* Hidden input for accessibility */}
          <input
            ref={ref}
            type="range"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className="absolute w-full h-6 opacity-0 cursor-pointer disabled:cursor-not-allowed"
            {...props}
          />
          {/* Thumb */}
          <div
            className="glass-slider__thumb absolute w-5 h-5 rounded-full shadow-lg transition-all duration-150 pointer-events-none"
            style={{ left: `calc(${percentage}% - 10px)` }}
          />
        </div>
      </div>
    );
  }
);

SliderGlass.displayName = "SliderGlass";
