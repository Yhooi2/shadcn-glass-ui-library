// ========================================
// FLAGS SECTION GLASS COMPONENT
// Expandable flags/warnings section
// ========================================

import { forwardRef } from "react";
import { AlertTriangle, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import { GlassCard } from "./GlassCard";
import { FlagAlertGlass, type FlagType } from "./FlagAlertGlass";
import "@/glass-theme.css";

export interface FlagData {
  readonly type: FlagType;
  readonly title: string;
  readonly description?: string;
}

export interface FlagsSectionGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly flags?: readonly FlagData[];
  readonly expanded?: boolean;
  readonly onToggle?: () => void;
}

export const FlagsSectionGlass = forwardRef<HTMLDivElement, FlagsSectionGlassProps>(
  ({ flags = [], expanded = false, onToggle, className, ...props }, ref) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];

    return (
      <GlassCard
        ref={ref}
        className={cn(className)}
        intensity="medium"
        hover={false}
        {...props}
      >
        <button
          onClick={onToggle}
          className="w-full p-4 flex items-center justify-between rounded-2xl"
          style={{ color: t.textPrimary }}
          type="button"
          aria-expanded={expanded}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" style={{ color: t.statusYellow }} />
            <span className="font-medium">{flags.length} flags detected</span>
          </div>
          {expanded ? (
            <ChevronUp className="w-5 h-5" style={{ color: t.textMuted }} />
          ) : (
            <ChevronDown className="w-5 h-5" style={{ color: t.textMuted }} />
          )}
        </button>
        {expanded && (
          <div className="px-4 pb-4 space-y-2">
            {flags.map((flag, i) => (
              <FlagAlertGlass
                key={`flag-${i}`}
                type={flag.type}
                title={flag.title}
                description={flag.description}
              />
            ))}
          </div>
        )}
      </GlassCard>
    );
  }
);

FlagsSectionGlass.displayName = "FlagsSectionGlass";
