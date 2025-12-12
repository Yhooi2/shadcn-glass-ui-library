// ========================================
// LANGUAGE BAR GLASS COMPONENT
// Language/skill proficiency bar with legend
// ========================================

import { forwardRef, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

export interface LanguageData {
  readonly name: string;
  readonly percent: number;
  readonly color?: string;
}

export interface LanguageBarGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly languages: readonly LanguageData[];
  readonly showLegend?: boolean;
}

// CSS variable names for language colors (defined in themes)
const defaultLangColors: Record<string, string> = {
  TypeScript: 'var(--language-typescript)',
  JavaScript: 'var(--language-javascript)',
  Python: 'var(--language-python)',
  HTML: 'var(--language-html)',
  CSS: 'var(--language-css)',
  Java: 'var(--language-java)',
  Go: 'var(--language-go)',
  Rust: 'var(--language-rust)',
  Ruby: 'var(--language-ruby)',
  PHP: 'var(--language-php)',
};

export const LanguageBarGlass = forwardRef<HTMLDivElement, LanguageBarGlassProps>(
  ({ languages = [], showLegend = true, className, ...props }, ref) => {
    const [hoveredLang, setHoveredLang] = useState<number | null>(null);

    const barStyles: CSSProperties = {
      boxShadow: 'var(--rainbow-glow)',
    };

    // Early return if no languages provided
    if (!languages || languages.length === 0) {
      return null;
    }

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {/* Progress bar */}
        <div
          className="flex h-2 md:h-2.5 rounded-full overflow-hidden"
          style={barStyles}
          role="group"
          aria-label="Language distribution"
        >
          {languages.map((lang, i) => {
            const bgColor = lang.color ?? defaultLangColors[lang.name] ?? 'var(--oklch-slate-400)';
            const segmentStyles: CSSProperties = {
              width: `${lang.percent}%`,
              backgroundColor: bgColor,
              opacity: hoveredLang !== null && hoveredLang !== i ? 0.5 : 1,
              transition: 'all 0.3s',
            };

            return (
              <div
                key={`bar-${lang.name}-${i}`}
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
          <div className="flex items-center gap-3 md:gap-4 mt-1.5 md:mt-2 text-(length:--font-size-2xs) md:text-xs flex-wrap text-(--text-secondary)">
            {languages.map((lang, i) => {
              const bgColor =
                lang.color ?? defaultLangColors[lang.name] ?? 'var(--oklch-slate-400)';

              return (
                <span
                  key={`legend-${lang.name}-${i}`}
                  className="flex items-center gap-1 md:gap-1.5 cursor-pointer"
                  onMouseEnter={() => setHoveredLang(i)}
                  onMouseLeave={() => setHoveredLang(null)}
                >
                  <span
                    className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
                    style={{ backgroundColor: bgColor }}
                  />
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

LanguageBarGlass.displayName = 'LanguageBarGlass';
