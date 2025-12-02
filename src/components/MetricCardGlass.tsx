// ========================================
// METRIC CARD GLASS COMPONENT
// Metric display card with progress
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
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

// CSS variable maps for metric colors
const metricVarMap: Record<MetricColor, { bg: string; text: string; border: string; glow: string }> = {
  emerald: {
    bg: "var(--metric-emerald-bg)",
    text: "var(--metric-emerald-text)",
    border: "var(--metric-emerald-border)",
    glow: "var(--metric-emerald-glow)",
  },
  amber: {
    bg: "var(--metric-amber-bg)",
    text: "var(--metric-amber-text)",
    border: "var(--metric-amber-border)",
    glow: "var(--metric-amber-glow)",
  },
  blue: {
    bg: "var(--metric-blue-bg)",
    text: "var(--metric-blue-text)",
    border: "var(--metric-blue-border)",
    glow: "var(--metric-blue-glow)",
  },
  red: {
    bg: "var(--metric-red-bg)",
    text: "var(--metric-red-text)",
    border: "var(--metric-red-border)",
    glow: "var(--metric-red-glow)",
  },
};

export const MetricCardGlass = forwardRef<HTMLDivElement, MetricCardGlassProps>(
  ({ label, value, color = "blue", className, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const colorVars = metricVarMap[color];

    const cardStyles: CSSProperties = {
      backgroundColor: colorVars.bg,
      borderColor: colorVars.border,
      boxShadow: isHovered ? colorVars.glow : "none",
      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      backdropFilter: "blur(8px)",
    };

    const valueStyles: CSSProperties = {
      color: colorVars.text,
      textShadow: colorVars.glow,
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
            style={{ color: "var(--text-secondary)" }}
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
