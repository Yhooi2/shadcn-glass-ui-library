// ========================================
// YEAR CARD GLASS COMPONENT
// Year card for career timeline
// ========================================

import { forwardRef, type CSSProperties } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BadgeGlass } from '../ui/badge-glass';
import { ProgressGlass } from '../specialized/progress-glass';
import { SparklineGlass } from '../specialized/sparkline-glass';
import { ButtonGlass } from '../ui/button-glass';
import { InteractiveCard } from '../primitives';
import { InsightCardGlass } from '../atomic/insight-card-glass';
import type { ProgressGradient } from '@/lib/variants/progress-glass-variants';
import '@/glass-theme.css';

export interface YearCardGlassInsight {
  readonly variant?: 'default' | 'tip' | 'highlight' | 'warning' | 'stat' | 'growth' | 'decline';
  readonly emoji?: string;
  readonly text: string;
  readonly detail?: string;
}

export interface YearCardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly year: string | number;
  readonly emoji: string;
  readonly label: string;
  readonly commits: string;
  readonly progress: number;
  readonly isExpanded?: boolean;
  readonly gradient?: ProgressGradient;
  readonly prs?: number;
  readonly repos?: number;
  readonly onShowYear?: () => void;
  readonly sparklineData?: number[];
  readonly insights?: YearCardGlassInsight[];
}

export const YearCardGlass = forwardRef<HTMLDivElement, YearCardGlassProps>(
  (
    {
      year,
      emoji,
      label,
      commits,
      progress,
      isExpanded = false,
      gradient = 'blue',
      prs = 0,
      repos = 0,
      onShowYear,
      sparklineData,
      insights,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const expandedStyles: CSSProperties = {
      background: 'var(--expanded-bg)',
      borderColor: 'var(--expanded-border)',
    };

    const metricCardStyles: CSSProperties = {
      background: 'var(--card-bg)',
      borderColor: 'var(--card-border)',
    };

    return (
      <InteractiveCard
        ref={ref}
        baseBg="var(--year-card-bg)"
        hoverBg="var(--card-hover-bg)"
        borderColor="var(--year-card-border)"
        hoverGlow="var(--year-card-hover-glow)"
        hoverLift
        rounded="rounded-xl"
        className={cn('p-2.5 md:p-3 cursor-pointer', className)}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        aria-expanded={isExpanded}
        aria-label={`${year} year: ${label}, ${commits} commits. ${isExpanded ? 'Collapse' : 'Expand'} details`}
        {...props}
      >
        <div className="flex items-center justify-between mb-1.5 md:mb-2">
          <div className="flex items-center gap-1.5 md:gap-2">
            <span
              className="font-semibold text-sm md:text-base"
              style={{ color: 'var(--text-primary)' }}
            >
              {year}
            </span>
            <BadgeGlass>
              {emoji} {label}
            </BadgeGlass>
          </div>
          <span
            className="text-xs md:text-sm flex items-center gap-0.5 md:gap-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            {commits}
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 md:w-4 md:h-4" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4" />
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <ProgressGlass value={progress} gradient={gradient} size="sm" />
          </div>
          {sparklineData && sparklineData.length > 0 && (
            <SparklineGlass
              data={sparklineData}
              height="sm"
              gap="sm"
              className="w-16 md:w-20"
              aria-label={`Activity trend for ${year}`}
            />
          )}
        </div>

        {/* Expanded Section */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t space-y-3" style={expandedStyles}>
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <div className="p-2 md:p-2.5 rounded-lg border text-center" style={metricCardStyles}>
                <div
                  className="text-base md:text-xl font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {commits}
                </div>
                <div className="text-[10px] md:text-xs" style={{ color: 'var(--text-muted)' }}>
                  Commits
                </div>
              </div>
              <div className="p-2 md:p-2.5 rounded-lg border text-center" style={metricCardStyles}>
                <div
                  className="text-base md:text-xl font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {prs}
                </div>
                <div className="text-[10px] md:text-xs" style={{ color: 'var(--text-muted)' }}>
                  PRs
                </div>
              </div>
              <div className="p-2 md:p-2.5 rounded-lg border text-center" style={metricCardStyles}>
                <div
                  className="text-base md:text-xl font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {repos}
                </div>
                <div className="text-[10px] md:text-xs" style={{ color: 'var(--text-muted)' }}>
                  Repos
                </div>
              </div>
            </div>

            {/* Insights */}
            {insights && insights.length > 0 && (
              <div className="space-y-2">
                {insights.map((insight, index) => (
                  <InsightCardGlass
                    key={index}
                    variant={insight.variant}
                    emoji={insight.emoji}
                    text={insight.text}
                    detail={insight.detail}
                    inline={false}
                  />
                ))}
              </div>
            )}

            {/* Show Year Button */}
            {onShowYear && (
              <ButtonGlass
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onShowYear();
                }}
                className="w-full"
              >
                Show repos from {year}
              </ButtonGlass>
            )}
          </div>
        )}
      </InteractiveCard>
    );
  }
);

YearCardGlass.displayName = 'YearCardGlass';
