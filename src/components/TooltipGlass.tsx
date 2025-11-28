// ========================================
// TOOLTIP GLASS COMPONENT
// Tooltip with glassmorphism styling
// ========================================

import { forwardRef, useState, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.scss";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

const POSITION_CLASSES: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export interface TooltipGlassProps {
  readonly children: ReactNode;
  readonly content: string;
  readonly position?: TooltipPosition;
  readonly className?: string;
}

export const TooltipGlass = forwardRef<HTMLDivElement, TooltipGlassProps>(
  (
    {
      children,
      content,
      position = "top",
      className,
    },
    ref
  ) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const [isVisible, setIsVisible] = useState(false);

    const tooltipStyles: CSSProperties = {
      background: t.tooltipBg,
      color: t.tooltipText,
      border: `1px solid ${t.tooltipBorder}`,
      boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        {isVisible && (
          <div
            className={cn(
              "absolute z-50 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap",
              "transition-all duration-200 animate-float",
              POSITION_CLASSES[position]
            )}
            style={tooltipStyles}
            role="tooltip"
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

TooltipGlass.displayName = "TooltipGlass";
