// ========================================
// RAINBOW PROGRESS GLASS COMPONENT
// Animated rainbow gradient progress bar
// ========================================

import { forwardRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.css";

export type RainbowProgressSize = "sm" | "md" | "lg" | "xl";

export interface RainbowProgressGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly value: number;
  readonly size?: RainbowProgressSize;
  readonly showGlow?: boolean;
}

const sizeClasses: Record<RainbowProgressSize, string> = {
  sm: "h-2",
  md: "h-3",
  lg: "h-4",
  xl: "h-5",
};

export const RainbowProgressGlass = forwardRef<HTMLDivElement, RainbowProgressGlassProps>(
  ({ value, size = "lg", showGlow = true, className, ...props }, ref) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const isGlass = theme === "glass";

    const clampedValue = Math.min(100, Math.max(0, value));

    const fillStyles: CSSProperties = {
      width: `${clampedValue}%`,
      background:
        "linear-gradient(90deg, #f59e0b, #fbbf24, #84cc16, #22c55e, #14b8a6, #06b6d4, #3b82f6)",
      boxShadow: showGlow && isGlass ? "0 0 20px rgba(251,191,36,0.4)" : t.progressGlow,
      animation: showGlow && isGlass ? "rainbow-glow 4s ease-in-out infinite" : "none",
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-full overflow-hidden", sizeClasses[size], className)}
        style={{ background: t.progressBg }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={fillStyles}
        />
      </div>
    );
  }
);

RainbowProgressGlass.displayName = "RainbowProgressGlass";
