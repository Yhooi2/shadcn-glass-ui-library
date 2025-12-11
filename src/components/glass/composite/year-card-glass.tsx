// ========================================
// YEAR CARD GLASS COMPONENT
// Year card for career timeline / analytics
// Domain-specific composite component following shadcn/ui patterns
// ========================================

import { forwardRef, type CSSProperties, type ReactNode } from 'react';
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

// ========================================
// TYPES
// ========================================

export interface YearCardGlassInsight {
  readonly variant?: 'default' | 'tip' | 'highlight' | 'warning' | 'stat' | 'growth' | 'decline';
  readonly emoji?: string;
  readonly text: string;
  readonly detail?: string;
}

export interface YearCardGlassStat {
  readonly label: string;
  readonly value: string | number;
  readonly icon?: ReactNode;
}

export interface YearCardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Year to display (string or number) */
  readonly year: string | number;
  /** Emoji for the badge */
  readonly emoji: string;
  /** Label for the badge (e.g., "Peak Year") */
  readonly label: string;
  /** Primary metric value (e.g., "629 commits") */
  readonly commits: string;
  /** Progress percentage (0-100) */
  readonly progress: number;
  /** Whether the card is expanded to show details */
  readonly isExpanded?: boolean;
  /** Progress bar gradient color */
  readonly gradient?: ProgressGradient;
  /** Number of PRs (shown in expanded view) */
  readonly prs?: number;
  /** Number of repos (shown in expanded view) */
  readonly repos?: number;
  /** Callback when "Show repos" button is clicked */
  readonly onShowYear?: () => void;
  /** Monthly activity data for sparkline */
  readonly sparklineData?: readonly number[];
  /** Labels for sparkline (e.g., month names) */
  readonly sparklineLabels?: readonly string[];
  /** Insights to display in expanded view */
  readonly insights?: readonly YearCardGlassInsight[];
  /** Custom stats for expanded view (replaces default commits/prs/repos grid) */
  readonly stats?: readonly YearCardGlassStat[];
  /** Custom action button text */
  readonly actionLabel?: string;
  /** Show sparkline in collapsed view */
  readonly showSparklineCollapsed?: boolean;
  /** Custom value formatter for commits display */
  readonly valueFormatter?: (commits: string) => string;
  /** Additional content for expanded section */
  readonly children?: ReactNode;
}

// ========================================
// COMPONENT
// ========================================

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
      sparklineLabels,
      insights,
      stats,
      actionLabel,
      showSparklineCollapsed = true,
      valueFormatter,
      children,
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

    // Format commits display
    const displayCommits = valueFormatter ? valueFormatter(commits) : commits;

    // Default stats if none provided
    const displayStats = stats || [
      { label: 'Commits', value: commits },
      { label: 'PRs', value: prs },
      { label: 'Repos', value: repos },
    ];

    // Default action label
    const buttonLabel = actionLabel || `Show repos from ${year}`;

    return (
      <InteractiveCard
        ref={ref}
        baseBg="var(--year-card-bg)"
        hoverBg="var(--card-hover-bg)"
        borderColor="var(--year-card-border)"
        hoverGlow="var(--year-card-hover-glow)"
        hoverLift
        rounded="rounded-xl"
        className={cn('w-full max-w-2xl p-2.5 md:p-3 cursor-pointer', className)}
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
        {/* Header */}
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
            {displayCommits}
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true" />
            )}
          </span>
        </div>

        {/* Progress + Sparkline (collapsed view) */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <ProgressGlass value={progress} gradient={gradient} size="sm" />
          </div>
          {showSparklineCollapsed && sparklineData && sparklineData.length > 0 && (
            <SparklineGlass
              data={sparklineData}
              labels={sparklineLabels}
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
            <div
              className="grid gap-2 md:gap-3"
              style={{ gridTemplateColumns: `repeat(${Math.min(displayStats.length, 4)}, 1fr)` }}
            >
              {displayStats.map((stat, index) => (
                <div
                  key={index}
                  className="p-2 md:p-2.5 rounded-lg border text-center"
                  style={metricCardStyles}
                >
                  {stat.icon && (
                    <div className="mb-1 flex justify-center text-[var(--text-muted)]">
                      {stat.icon}
                    </div>
                  )}
                  <div
                    className="text-base md:text-xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-(length:--font-size-2xs) md:text-xs text-(--text-muted)">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Expanded Sparkline with labels (if not shown in collapsed) */}
            {!showSparklineCollapsed && sparklineData && sparklineData.length > 0 && (
              <SparklineGlass
                data={sparklineData}
                labels={sparklineLabels}
                showLabels={!!sparklineLabels}
                height="md"
                gap="sm"
                highlightMax
                className="w-full"
                aria-label={`Monthly activity for ${year}`}
              />
            )}

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

            {/* Custom children content */}
            {children}

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
                {buttonLabel}
              </ButtonGlass>
            )}
          </div>
        )}
      </InteractiveCard>
    );
  }
);

YearCardGlass.displayName = 'YearCardGlass';
