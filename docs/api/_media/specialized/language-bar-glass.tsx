// ========================================
// LANGUAGE BAR GLASS COMPONENT
// Language/skill proficiency bar with legend
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import "@/glass-theme.css";

export interface LanguageData {
  readonly name: string;
  readonly percent: number;
  readonly color?: string;
}

export interface LanguageBarGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly languages: readonly LanguageData[];
  readonly showLegend?: boolean;
}

const defaultLangColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-emerald-500",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Java: "bg-red-500",
  Go: "bg-cyan-500",
  Rust: "bg-orange-600",
  Ruby: "bg-red-600",
  PHP: "bg-indigo-500",
};

export const LanguageBarGlass = forwardRef<HTMLDivElement, LanguageBarGlassProps>(
  ({ languages, showLegend = true, className, ...props }, ref) => {
    const [hoveredLang, setHoveredLang] = useState<number | null>(null);

    const barStyles: CSSProperties = {
      boxShadow: "var(--rainbow-glow)",
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {/* Progress bar */}
        <div
          className="flex h-2 md:h-2.5 rounded-full overflow-hidden"
          style={barStyles}
          role="group"
          aria-label="Language distribution"
        >
          {languages.map((lang, i) => {
            const colorClass = lang.color ?? defaultLangColors[lang.name] ?? "bg-slate-400";
            const segmentStyles: CSSProperties = {
              width: `${lang.percent}%`,
              opacity: hoveredLang !== null && hoveredLang !== i ? 0.5 : 1,
              transition: "all 0.3s",
            };

            return (
              <div
                key={`bar-${lang.name}-${i}`}
                className={cn(colorClass)}
                style={segmentStyles}
                role="progressbar"
                aria-label={`${lang.name}: ${lang.percent}%`}
                aria-valuenow={lang.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                onMouseEnter={() => setHoveredLang(i)}
                onMouseLeave={() => setHoveredLang(null)}
              />
            );
          })}
        </div>

        {/* Legend */}
        {showLegend && (
          <div
            className="flex items-center gap-3 md:gap-4 mt-1.5 md:mt-2 text-[10px] md:text-xs flex-wrap"
            style={{ color: "var(--text-secondary)" }}
          >
            {languages.map((lang, i) => {
              const colorClass = lang.color ?? defaultLangColors[lang.name] ?? "bg-slate-400";

              return (
                <span
                  key={`legend-${lang.name}-${i}`}
                  className="flex items-center gap-1 md:gap-1.5 cursor-pointer"
                  onMouseEnter={() => setHoveredLang(i)}
                  onMouseLeave={() => setHoveredLang(null)}
                >
                  <span className={cn("w-2 h-2 md:w-2.5 md:h-2.5 rounded-full", colorClass)} />
                  {lang.name} {lang.percent}%
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

LanguageBarGlass.displayName = "LanguageBarGlass";
