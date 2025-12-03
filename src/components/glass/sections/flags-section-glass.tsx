// ========================================
// FLAGS SECTION GLASS COMPONENT
// Expandable flags/warnings section
// ========================================

import { forwardRef } from "react";
import { AlertTriangle, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
          className="w-full p-3 md:p-4 flex items-center justify-between rounded-2xl"
          style={{ color: "var(--text-primary)" }}
          type="button"
          aria-expanded={expanded}
        >
          <div className="flex items-center gap-1.5 md:gap-2">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" style={{ color: "var(--status-yellow)" }} />
            <span className="font-medium text-sm md:text-base">{flags.length} flags detected</span>
          </div>
          {expanded ? (
            <ChevronUp className="w-4 h-4 md:w-5 md:h-5" style={{ color: "var(--text-muted)" }} />
          ) : (
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5" style={{ color: "var(--text-muted)" }} />
          )}
        </button>
        {expanded && (
          <div className="px-3 pb-3 md:px-4 md:pb-4 space-y-1.5 md:space-y-2">
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
