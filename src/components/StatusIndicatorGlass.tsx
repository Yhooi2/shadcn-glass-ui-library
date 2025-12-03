// ========================================
// STATUS INDICATOR GLASS COMPONENT
// Status dots with glow effect
// ========================================

import { forwardRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import "@/glass-theme.css";

export type StatusType = "green" | "yellow" | "red";
export type StatusSize = "normal" | "large";

export interface StatusIndicatorGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly type?: StatusType;
  readonly size?: StatusSize;
}

const sizeClasses: Record<StatusSize, string> = {
  normal: "w-2 h-2 md:w-2.5 md:h-2.5",
  large: "w-3.5 h-3.5 md:w-4 md:h-4",
};

const statusSymbols: Record<StatusType, string> = {
  green: "✓",
  yellow: "!",
  red: "✕",
};

// CSS variable maps for status colors
const statusVarMap: Record<StatusType, { bg: string; glow: string }> = {
  green: { bg: "var(--status-green)", glow: "var(--status-green-glow)" },
  yellow: { bg: "var(--status-yellow)", glow: "var(--status-yellow-glow)" },
  red: { bg: "var(--status-red)", glow: "var(--status-red-glow)" },
};

export const StatusIndicatorGlass = forwardRef<HTMLDivElement, StatusIndicatorGlassProps>(
  ({ type = "green", size = "normal", className, ...props }, ref) => {
    const colors = statusVarMap[type];

    const indicatorStyles: CSSProperties = {
      backgroundColor: colors.bg,
      boxShadow: colors.glow,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full flex items-center justify-center",
          sizeClasses[size],
          className
        )}
        style={indicatorStyles}
        role="status"
        aria-label={`Status: ${type}`}
        {...props}
      >
        {size === "large" && (
          <span className="text-white text-[8px] md:text-[10px] font-bold">
            {statusSymbols[type]}
          </span>
        )}
      </div>
    );
  }
);

StatusIndicatorGlass.displayName = "StatusIndicatorGlass";
