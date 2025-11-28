// ========================================
// TOOLTIP GLASS COMPONENT
// Tooltip with glassmorphism styling
// ========================================

import { forwardRef, useState, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import "@/glass-theme.css";

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
    useTheme(); // Theme context for potential future use
    const [isVisible, setIsVisible] = useState(false);

    // Unified dark tooltip design for all themes (consistent UX)
    const tooltipStyles: CSSProperties = {
      background: "#1e293b",
      color: "#f8fafc",
      border: "none",
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
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
