// ========================================
// PROGRESS GLASS COMPONENT
// Progress bar with gradient and glow
// ========================================

import { forwardRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.scss";

export type ProgressSize = "sm" | "md" | "lg" | "xl";
export type ProgressGradient = "violet" | "blue" | "cyan" | "amber" | "emerald" | "rose";

const sizeClasses: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
  xl: "h-4",
};

export interface ProgressGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly value: number;
  readonly size?: ProgressSize;
  readonly gradient?: ProgressGradient;
  readonly showLabel?: boolean;
}

export const ProgressGlass = forwardRef<HTMLDivElement, ProgressGlassProps>(
  (
    {
      className,
      size = "md",
      value,
      gradient = "violet",
      showLabel,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];

    const isGlass = theme === "glass";
    const clampedValue = Math.min(100, Math.max(0, value));

    // Gradient colors for the fill
    const getGradientColors = (): { from: string; to: string; glow: string } => {
      const gradients: Record<ProgressGradient, { from: string; to: string; glow: string }> = {
        violet: {
          from: "#8b5cf6",
          to: "#a855f7",
          glow: isGlass ? "0 0 16px rgba(139,92,246,0.5)" : t.progressGlow,
        },
        blue: {
          from: "#3b82f6",
          to: "#60a5fa",
          glow: isGlass ? "0 0 16px rgba(59,130,246,0.5)" : "0 0 8px rgba(59,130,246,0.3)",
        },
        cyan: {
          from: "#06b6d4",
          to: "#22d3ee",
          glow: isGlass ? "0 0 16px rgba(6,182,212,0.5)" : "0 0 8px rgba(6,182,212,0.3)",
        },
        amber: {
          from: "#f59e0b",
          to: "#fbbf24",
          glow: isGlass ? "0 0 16px rgba(245,158,11,0.5)" : "0 0 8px rgba(245,158,11,0.3)",
        },
        emerald: {
          from: "#10b981",
          to: "#34d399",
          glow: isGlass ? "0 0 16px rgba(16,185,129,0.5)" : "0 0 8px rgba(16,185,129,0.3)",
        },
        rose: {
          from: "#f43f5e",
          to: "#fb7185",
          glow: isGlass ? "0 0 16px rgba(244,63,94,0.5)" : "0 0 8px rgba(244,63,94,0.3)",
        },
      };
      return gradients[gradient];
    };

    const gradientColors = getGradientColors();

    const trackStyles: CSSProperties = {
      background: t.progressBg,
    };

    const fillStyles: CSSProperties = {
      width: `${clampedValue}%`,
      background: `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.to})`,
      boxShadow: gradientColors.glow,
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {showLabel && (
          <div className="flex justify-between mb-1">
            <span className="text-xs" style={{ color: t.textMuted }}>
              Progress
            </span>
            <span className="text-xs font-medium" style={{ color: t.textSecondary }}>
              {clampedValue}%
            </span>
          </div>
        )}
        <div
          className={cn("rounded-full overflow-hidden", sizeClasses[size])}
          style={trackStyles}
        >
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={fillStyles}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    );
  }
);

ProgressGlass.displayName = "ProgressGlass";
