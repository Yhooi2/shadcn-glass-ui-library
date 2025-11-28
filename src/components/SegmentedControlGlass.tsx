// ========================================
// SEGMENTED CONTROL GLASS COMPONENT
// ========================================

import { forwardRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.css";

export interface SegmentOption {
  readonly value: string;
  readonly label: string;
}

export interface SegmentedControlGlassProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  readonly options: readonly SegmentOption[];
  readonly value: string;
  readonly onChange?: (value: string) => void;
}

export const SegmentedControlGlass = forwardRef<HTMLDivElement, SegmentedControlGlassProps>(
  ({ options, value, onChange, className, ...props }, ref) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const isGlass = theme === "glass";

    // Background colors based on theme
    const activeBg = isGlass
      ? "rgba(255,255,255,0.20)"
      : theme === "aurora"
        ? "rgba(15,23,42,0.80)"
        : "#1e293b";

    const activeText = isGlass
      ? "rgba(255,255,255,0.95)"
      : theme === "aurora"
        ? "#e2e8f0"
        : "#ffffff";

    const inactiveText = isGlass
      ? "rgba(255,255,255,0.50)"
      : theme === "aurora"
        ? "#94a3b8"
        : "#64748b";

    const containerStyles: CSSProperties = {
      border: `1px solid ${t.glassSubtleBorder}`,
      background: isGlass ? "rgba(255,255,255,0.05)" : t.glassSubtleBg,
    };

    return (
      <div
        ref={ref}
        className={cn("flex rounded-xl overflow-hidden", className)}
        style={containerStyles}
        role="tablist"
        {...props}
      >
        {options.map((opt) => {
          const isActive = value === opt.value;
          const buttonStyles: CSSProperties = {
            background: isActive ? activeBg : "transparent",
            color: isActive ? activeText : inactiveText,
          };

          return (
            <button
              key={opt.value}
              onClick={() => onChange?.(opt.value)}
              className="px-4 py-2 text-sm font-medium transition-all duration-300"
              style={buttonStyles}
              type="button"
              role="tab"
              aria-selected={isActive}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  }
);

SegmentedControlGlass.displayName = "SegmentedControlGlass";
