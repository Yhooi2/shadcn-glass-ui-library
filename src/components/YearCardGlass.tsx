// ========================================
// YEAR CARD GLASS COMPONENT
// Year card for career timeline
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import { BadgeGlass } from "./BadgeGlass";
import { ProgressGlass, type ProgressGradient } from "./ProgressGlass";
import "@/glass-theme.css";

export interface YearCardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly year: string | number;
  readonly emoji: string;
  readonly label: string;
  readonly commits: string;
  readonly progress: number;
  readonly isExpanded?: boolean;
  readonly gradient?: ProgressGradient;
}

export const YearCardGlass = forwardRef<HTMLDivElement, YearCardGlassProps>(
  (
    { year, emoji, label, commits, progress, isExpanded = false, gradient = "blue", className, onClick, ...props },
    ref
  ) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const isGlass = theme === "glass";
    const [isHovered, setIsHovered] = useState(false);

    const cardStyles: CSSProperties = {
      background: isHovered ? t.cardHoverBg : t.yearCardBg,
      borderColor: t.yearCardBorder,
      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      boxShadow: isHovered && isGlass ? "0 8px 32px rgba(168,85,247,0.20)" : "none",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "p-3 rounded-xl border transition-all duration-300 cursor-pointer",
          className
        )}
        style={cardStyles}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        aria-expanded={isExpanded}
        {...props}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold" style={{ color: t.textPrimary }}>
              {year}
            </span>
            <BadgeGlass>
              {emoji} {label}
            </BadgeGlass>
          </div>
          <span
            className="text-sm flex items-center gap-1"
            style={{ color: t.textSecondary }}
          >
            {commits}
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </span>
        </div>
        <ProgressGlass
          value={progress}
          gradient={gradient}
          size="sm"
        />
      </div>
    );
  }
);

YearCardGlass.displayName = "YearCardGlass";
