// ========================================
// METRIC CARD GLASS COMPONENT
// Metric display card with progress
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import { ProgressGlass } from "./ProgressGlass";
import "@/glass-theme.css";

import type { ProgressGradient } from "./ProgressGlass";

export type MetricColor = "emerald" | "amber" | "blue" | "red";

export interface MetricCardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly label: string;
  readonly value: number;
  readonly color?: MetricColor;
}

// Map MetricColor to ProgressGradient
const colorToGradient: Record<MetricColor, ProgressGradient> = {
  emerald: "emerald",
  amber: "amber",
  blue: "blue",
  red: "rose",
};

const colorGlows: Record<MetricColor, string> = {
  emerald: "0 0 12px rgba(52,211,153,0.4)",
  amber: "0 0 12px rgba(251,191,36,0.4)",
  blue: "0 0 12px rgba(96,165,250,0.4)",
  red: "0 0 12px rgba(251,113,133,0.4)",
};

export const MetricCardGlass = forwardRef<HTMLDivElement, MetricCardGlassProps>(
  ({ label, value, color = "blue", className, ...props }, ref) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const isGlass = theme === "glass";
    const [isHovered, setIsHovered] = useState(false);

    const getColorStyles = (c: MetricColor): { bg: string; text: string; border: string } => {
      const colorMap: Record<MetricColor, { bg: string; text: string; border: string }> = {
        emerald: {
          bg: isGlass ? "transparent" : t.metricEmeraldBg,
          text: t.metricEmeraldText,
          border: isGlass ? "transparent" : t.metricEmeraldBorder,
        },
        amber: {
          bg: isGlass ? "transparent" : t.metricAmberBg,
          text: t.metricAmberText,
          border: isGlass ? "transparent" : t.metricAmberBorder,
        },
        blue: {
          bg: isGlass ? "transparent" : t.metricBlueBg,
          text: t.metricBlueText,
          border: isGlass ? "transparent" : t.metricBlueBorder,
        },
        red: {
          bg: isGlass ? "transparent" : t.metricRedBg,
          text: t.metricRedText,
          border: isGlass ? "transparent" : t.metricRedBorder,
        },
      };
      return colorMap[c];
    };

    const colorStyles = getColorStyles(color);

    const cardStyles: CSSProperties = {
      backgroundColor: colorStyles.bg,
      borderColor: colorStyles.border || "transparent",
      boxShadow: isGlass && isHovered ? colorGlows[color] : "none",
      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      backdropFilter: "blur(8px)",
    };

    const valueStyles: CSSProperties = {
      color: colorStyles.text,
      textShadow: isGlass ? colorGlows[color] : "none",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "p-4 rounded-xl border transition-all duration-300",
          className
        )}
        style={cardStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div className="flex justify-between items-center mb-3">
          <span
            className="text-sm font-medium"
            style={{ color: t.textSecondary }}
          >
            {label}
          </span>
          <span className="font-bold text-xl" style={valueStyles}>
            {value}%
          </span>
        </div>
        <ProgressGlass
          value={value}
          gradient={colorToGradient[color]}
          size="sm"
        />
      </div>
    );
  }
);

MetricCardGlass.displayName = "MetricCardGlass";
