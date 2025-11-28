// ========================================
// TOGGLE GLASS COMPONENT
// Toggle switch with glow effect
// ========================================

import { forwardRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.css";

export type ToggleGlassSize = "sm" | "md" | "lg";

const sizesConfig = {
  sm: { track: "w-8 h-4", knob: "w-3 h-3", translate: "translate-x-4" },
  md: { track: "w-11 h-6", knob: "w-5 h-5", translate: "translate-x-5" },
  lg: { track: "w-14 h-7", knob: "w-6 h-6", translate: "translate-x-7" },
} as const;

export interface ToggleGlassProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  readonly checked: boolean;
  readonly onChange?: (checked: boolean) => void;
  readonly label?: string;
  readonly size?: ToggleGlassSize;
}

export const ToggleGlass = forwardRef<HTMLButtonElement, ToggleGlassProps>(
  (
    {
      className,
      size = "md",
      checked,
      onChange,
      disabled,
      label,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const s = sizesConfig[size];

    const trackStyles: CSSProperties = {
      background: checked ? t.toggleActiveBg : t.toggleBg,
      boxShadow: checked ? t.toggleGlow : "none",
    };

    const knobStyles: CSSProperties = {
      background: t.toggleKnob,
    };

    const toggle = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={cn(
          "relative rounded-full transition-all duration-300",
          s.track,
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          !label && className
        )}
        style={trackStyles}
        onClick={() => !disabled && onChange?.(!checked)}
        {...props}
      >
        <div
          className={cn(
            "absolute top-0.5 left-0.5 rounded-full shadow-md transition-all duration-300",
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
            "inline-flex items-center gap-2",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            className
          )}
        >
          {toggle}
          <span className="text-sm" style={{ color: t.textSecondary }}>
            {label}
          </span>
        </label>
      );
    }

    return toggle;
  }
);

ToggleGlass.displayName = "ToggleGlass";
