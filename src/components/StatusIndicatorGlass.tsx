// ========================================
// STATUS INDICATOR GLASS COMPONENT
// Status dots with glow effect
// ========================================

import { forwardRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.css";

export type StatusType = "green" | "yellow" | "red";
export type StatusSize = "normal" | "large";

export interface StatusIndicatorGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly type?: StatusType;
  readonly size?: StatusSize;
}

const sizeClasses: Record<StatusSize, string> = {
  normal: "w-2.5 h-2.5",
  large: "w-4 h-4",
};

const statusSymbols: Record<StatusType, string> = {
  green: "✓",
  yellow: "!",
  red: "✕",
};

export const StatusIndicatorGlass = forwardRef<HTMLDivElement, StatusIndicatorGlassProps>(
  ({ type = "green", size = "normal", className, ...props }, ref) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const isGlass = theme === "glass";

    const getStatusColors = (statusType: StatusType): { bg: string; glow: string } => {
      const colors: Record<StatusType, { bg: string; glow: string }> = {
        green: {
          bg: t.statusGreen,
          glow: `0 0 8px ${t.statusGreen}99`,
        },
        yellow: {
          bg: t.statusYellow,
          glow: `0 0 8px ${t.statusYellow}99`,
        },
        red: {
          bg: t.statusRed,
          glow: `0 0 8px ${t.statusRed}99`,
        },
      };
      return colors[statusType];
    };

    const colors = getStatusColors(type);

    const indicatorStyles: CSSProperties = {
      backgroundColor: colors.bg,
      boxShadow: isGlass ? colors.glow : "none",
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
          <span className="text-white text-[10px] font-bold">
            {statusSymbols[type]}
          </span>
        )}
      </div>
    );
  }
);

StatusIndicatorGlass.displayName = "StatusIndicatorGlass";
