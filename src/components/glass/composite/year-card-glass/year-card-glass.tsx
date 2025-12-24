/* eslint-disable react-refresh/only-export-components */
// ========================================
// YEAR CARD GLASS COMPONENT
// Year card with compound API for career timeline
// Issue #15: shadcn/ui compatible compound component
// ========================================

import { forwardRef, type CSSProperties, type ReactNode, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BadgeGlass } from '../../ui/badge-glass';
import { ProgressGlass } from '../../specialized/progress-glass';
import { SparklineGlass } from '../../specialized/sparkline-glass';
import { ButtonGlass } from '../../ui/button-glass';
import { InteractiveCard } from '../../primitives';
import { InsightCardGlass } from '../../atomic/insight-card-glass';
import { YearCardContext, useYearCard, type YearCardContextValue } from './year-card-context';
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

/** Props for YearCardGlass.Root */
export interface YearCardRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Whether the card is selected */
  isSelected?: boolean;
  /** Whether the card is expanded */
  isExpanded?: boolean;
  /** Callback when selection is triggered */
  onSelect?: () => void;
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  children: ReactNode;
}

/** Props for YearCardGlass.Header */
export interface YearCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Props for YearCardGlass.Year */
export interface YearCardYearProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

/** Props for YearCardGlass.Badge */
export interface YearCardBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  emoji?: string;
  label: string;
}

/** Props for YearCardGlass.Value */
export interface YearCardValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

/** Props for YearCardGlass.Progress */
export interface YearCardProgressProps {
  value: number;
  gradient?: ProgressGradient;
  className?: string;
}

/** Props for YearCardGlass.Sparkline */
export interface YearCardSparklineProps {
  data: readonly number[];
  labels?: readonly string[];
  showLabels?: boolean;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

/** Props for YearCardGlass.ExpandedContent */
export interface YearCardExpandedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Props for YearCardGlass.Stats */
export interface YearCardStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Number of columns (auto-calculated from children if not provided) */
  columns?: number;
}

/** Props for YearCardGlass.StatItem */
export interface YearCardStatItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

/** Props for YearCardGlass.Insights */
export interface YearCardInsightsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Props for YearCardGlass.InsightItem */
export interface YearCardInsightItemProps {
  variant?: 'default' | 'tip' | 'highlight' | 'warning' | 'stat' | 'growth' | 'decline';
  emoji?: string;
  text: string;
  detail?: string;
  className?: string;
}

/** Props for YearCardGlass.Action */
export interface YearCardActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Legacy props for backward compatibility */
export interface YearCardGlassLegacyProps extends React.HTMLAttributes<HTMLDivElement> {
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
  readonly sparklineData?: readonly number[];
  readonly sparklineLabels?: readonly string[];
  readonly insights?: readonly YearCardGlassInsight[];
  readonly stats?: readonly YearCardGlassStat[];
  readonly actionLabel?: string;
  /**
   * @deprecated This prop is no longer used. Sparkline is now only shown in expanded view.
   */
  readonly showSparklineCollapsed?: boolean;
  readonly valueFormatter?: (commits: string) => string;
  readonly children?: ReactNode;
}

// ========================================
// COMPOUND COMPONENTS
// ========================================

/** Root container with context provider */
const YearCardRoot = forwardRef<HTMLDivElement, YearCardRootProps>(
  (
    {
      isSelected = false,
      isExpanded = false,
      onSelect,
      onExpandedChange,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const contextValue = useMemo<YearCardContextValue>(
      () => ({ isSelected, isExpanded, onSelect, onExpandedChange }),
      [isSelected, isExpanded, onSelect, onExpandedChange]
    );

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onExpandedChange?.(!isExpanded);
      props.onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onExpandedChange?.(!isExpanded);
      }
      props.onKeyDown?.(e);
    };

    return (
      <YearCardContext.Provider value={contextValue}>
        <InteractiveCard
          ref={ref}
          baseBg="var(--year-card-bg)"
          hoverBg="var(--card-hover-bg)"
          borderColor={isSelected ? 'var(--year-card-selected-border)' : 'var(--year-card-border)'}
          hoverGlow="var(--year-card-hover-glow)"
          hoverLift
          rounded="rounded-xl"
          className={cn(
            'w-full max-w-2xl p-2.5 md:p-3 cursor-pointer',
            isSelected && 'ring-2 ring-(--year-card-selected-ring)',
            className
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-expanded={isExpanded}
          aria-selected={isSelected}
          {...props}
        >
          {children}
        </InteractiveCard>
      </YearCardContext.Provider>
    );
  }
);
YearCardRoot.displayName = 'YearCardGlass.Root';

/** Header section */
const YearCardHeader = forwardRef<HTMLDivElement, YearCardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const { isExpanded } = useYearCard();

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between mb-1.5 md:mb-2', className)}
        {...props}
      >
        <div className="flex items-center gap-1.5 md:gap-2">{children}</div>
        <div className="flex items-center gap-0.5 md:gap-1">
          {isExpanded ? (
            <ChevronUp
              className="w-3.5 h-3.5 md:w-4 md:h-4 text-(--text-muted)"
              aria-hidden="true"
            />
          ) : (
            <ChevronDown
              className="w-3.5 h-3.5 md:w-4 md:h-4 text-(--text-muted)"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    );
  }
);
YearCardHeader.displayName = 'YearCardGlass.Header';

/** Year display */
const YearCardYear = forwardRef<HTMLSpanElement, YearCardYearProps>(
  ({ children, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('font-semibold text-sm md:text-base text-(--text-primary)', className)}
      {...props}
    >
      {children}
    </span>
  )
);
YearCardYear.displayName = 'YearCardGlass.Year';

/** Badge wrapper */
const YearCardBadge = forwardRef<HTMLSpanElement, YearCardBadgeProps>(
  ({ emoji, label, className, ...props }, ref) => (
    <span ref={ref} className={className} {...props}>
      <BadgeGlass>
        {emoji && `${emoji} `}
        {label}
      </BadgeGlass>
    </span>
  )
);
YearCardBadge.displayName = 'YearCardGlass.Badge';

/** Value display (commits, etc.) */
const YearCardValue = forwardRef<HTMLSpanElement, YearCardValueProps>(
  ({ children, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('text-xs md:text-sm text-(--text-secondary)', className)}
      {...props}
    >
      {children}
    </span>
  )
);
YearCardValue.displayName = 'YearCardGlass.Value';

/** Progress bar wrapper */
const YearCardProgress = forwardRef<HTMLDivElement, YearCardProgressProps>(
  ({ value, gradient = 'blue', className }, ref) => (
    <div ref={ref} className={cn('flex-1', className)}>
      <ProgressGlass value={value} gradient={gradient} size="sm" />
    </div>
  )
);
YearCardProgress.displayName = 'YearCardGlass.Progress';

/** Sparkline wrapper */
const YearCardSparkline = forwardRef<HTMLDivElement, YearCardSparklineProps>(
  ({ data, labels, showLabels, height = 'sm', className }, ref) => {
    if (!data || data.length === 0) return null;

    return (
      <div ref={ref} className={className}>
        <SparklineGlass
          data={data}
          labels={labels}
          showLabels={showLabels}
          height={height}
          gap="sm"
        />
      </div>
    );
  }
);
YearCardSparkline.displayName = 'YearCardGlass.Sparkline';

/** Expanded content container - only renders when expanded */
const YearCardExpandedContent = forwardRef<HTMLDivElement, YearCardExpandedContentProps>(
  ({ children, className, ...props }, ref) => {
    const { isExpanded } = useYearCard();

    if (!isExpanded) return null;

    const expandedStyles: CSSProperties = {
      background: 'var(--expanded-bg)',
      borderColor: 'var(--expanded-border)',
    };

    return (
      <div
        ref={ref}
        className={cn('mt-3 pt-3 border-t space-y-3', className)}
        style={expandedStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);
YearCardExpandedContent.displayName = 'YearCardGlass.ExpandedContent';

/** Stats grid container */
const YearCardStats = forwardRef<HTMLDivElement, YearCardStatsProps>(
  ({ children, columns, className, ...props }, ref) => {
    // Count children for auto columns
    const childCount = Array.isArray(children) ? children.length : 1;
    const cols = columns ?? Math.min(childCount, 4);

    return (
      <div
        ref={ref}
        className={cn('grid gap-2 md:gap-3', className)}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
YearCardStats.displayName = 'YearCardGlass.Stats';

/** Single stat item */
const YearCardStatItem = forwardRef<HTMLDivElement, YearCardStatItemProps>(
  ({ label, value, icon, className, ...props }, ref) => {
    const metricCardStyles: CSSProperties = {
      background: 'var(--card-bg)',
      borderColor: 'var(--card-border)',
    };

    return (
      <div
        ref={ref}
        className={cn('p-2 md:p-2.5 rounded-lg border text-center', className)}
        style={metricCardStyles}
        {...props}
      >
        {icon && <div className="mb-1 flex justify-center text-(--text-muted)">{icon}</div>}
        <div className="text-base md:text-xl font-bold text-(--text-primary)">{value}</div>
        <div className="text-(length:--font-size-2xs) md:text-xs text-(--text-muted)">{label}</div>
      </div>
    );
  }
);
YearCardStatItem.displayName = 'YearCardGlass.StatItem';

/** Insights container */
const YearCardInsights = forwardRef<HTMLDivElement, YearCardInsightsProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
      {children}
    </div>
  )
);
YearCardInsights.displayName = 'YearCardGlass.Insights';

/** Single insight item */
const YearCardInsightItem = forwardRef<HTMLDivElement, YearCardInsightItemProps>(
  ({ variant, emoji, text, detail, className }, ref) => (
    <div ref={ref} className={className}>
      <InsightCardGlass
        variant={variant}
        emoji={emoji}
        text={text}
        detail={detail}
        inline={false}
      />
    </div>
  )
);
YearCardInsightItem.displayName = 'YearCardGlass.InsightItem';

/** Action button */
const YearCardAction = forwardRef<HTMLButtonElement, YearCardActionProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onClick?.(e);
    };

    return (
      <ButtonGlass
        ref={ref}
        variant="default"
        size="sm"
        onClick={handleClick}
        className={cn('w-full', className)}
        {...props}
      >
        {children}
      </ButtonGlass>
    );
  }
);
YearCardAction.displayName = 'YearCardGlass.Action';

// ========================================
// LEGACY COMPONENT (backward compatibility)
// ========================================

const YearCardGlassLegacy = forwardRef<HTMLDivElement, YearCardGlassLegacyProps>(
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
      // @deprecated - showSparklineCollapsed is no longer used, sparkline only shows in expanded view
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      showSparklineCollapsed: _showSparklineCollapsed,
      valueFormatter,
      children,
      className,
      onClick,
      // Exclude onSelect from props spread to avoid type conflict
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSelect: _onSelect,
      ...props
    },
    ref
  ) => {
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

    // Handle expand toggle via onClick
    const handleExpandedChange = () => {
      // Legacy API uses onClick for toggle
    };

    return (
      <YearCardRoot
        ref={ref}
        isExpanded={isExpanded}
        onExpandedChange={handleExpandedChange}
        className={className}
        onClick={onClick}
        {...props}
      >
        <YearCardHeader>
          <YearCardYear>{year}</YearCardYear>
          <YearCardBadge emoji={emoji} label={label} />
          <YearCardValue>{displayCommits}</YearCardValue>
        </YearCardHeader>

        {/* Progress bar */}
        <YearCardProgress value={progress} gradient={gradient} />

        <YearCardExpandedContent>
          {/* Stats Grid */}
          <YearCardStats>
            {displayStats.map((stat, index) => (
              <YearCardStatItem
                key={index}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
          </YearCardStats>

          {/* Sparkline with labels (only in expanded view) */}
          {sparklineData && sparklineData.length > 0 && (
            <YearCardSparkline
              data={sparklineData}
              labels={sparklineLabels}
              showLabels={!!sparklineLabels}
              height="md"
              className="w-full"
            />
          )}

          {/* Insights */}
          {insights && insights.length > 0 && (
            <YearCardInsights>
              {insights.map((insight, index) => (
                <YearCardInsightItem
                  key={index}
                  variant={insight.variant}
                  emoji={insight.emoji}
                  text={insight.text}
                  detail={insight.detail}
                />
              ))}
            </YearCardInsights>
          )}

          {/* Custom children content */}
          {children}

          {/* Show Year Button */}
          {onShowYear && <YearCardAction onClick={onShowYear}>{buttonLabel}</YearCardAction>}
        </YearCardExpandedContent>
      </YearCardRoot>
    );
  }
);
YearCardGlassLegacy.displayName = 'YearCardGlass';

// ========================================
// EXPORTS
// ========================================

/**
 * YearCardGlass - Year card with compound API for career timeline
 *
 * @example Legacy API (backward compatible)
 * ```tsx
 * <YearCardGlass
 *   year={2024}
 *   emoji="🚀"
 *   label="Breakthrough"
 *   commits="1,234"
 *   progress={75}
 *   isExpanded={expanded}
 *   onClick={() => setExpanded(!expanded)}
 * />
 * ```
 *
 * @example Compound API (flexible)
 * ```tsx
 * <YearCardGlass.Root
 *   isSelected={selected === '2024'}
 *   onSelect={() => setSelected('2024')}
 *   isExpanded={expanded}
 *   onExpandedChange={setExpanded}
 * >
 *   <YearCardGlass.Header>
 *     <YearCardGlass.Year>2024</YearCardGlass.Year>
 *     <YearCardGlass.Badge emoji="🚀" label="Breakthrough" />
 *     <YearCardGlass.Value>1,234 commits</YearCardGlass.Value>
 *   </YearCardGlass.Header>
 *   <YearCardGlass.Progress value={75} gradient="blue" />
 *   <YearCardGlass.ExpandedContent>
 *     <YearCardGlass.Stats>
 *       <YearCardGlass.StatItem label="Commits" value="1,234" />
 *       <YearCardGlass.StatItem label="PRs" value="56" />
 *     </YearCardGlass.Stats>
 *     <YearCardGlass.Action onClick={onShowYear}>Show repos</YearCardGlass.Action>
 *   </YearCardGlass.ExpandedContent>
 * </YearCardGlass.Root>
 * ```
 */
export const YearCardGlass = Object.assign(YearCardGlassLegacy, {
  Root: YearCardRoot,
  Header: YearCardHeader,
  Year: YearCardYear,
  Badge: YearCardBadge,
  Value: YearCardValue,
  Progress: YearCardProgress,
  Sparkline: YearCardSparkline,
  ExpandedContent: YearCardExpandedContent,
  Stats: YearCardStats,
  StatItem: YearCardStatItem,
  Insights: YearCardInsights,
  InsightItem: YearCardInsightItem,
  Action: YearCardAction,
});

// Named exports for direct imports
export {
  YearCardRoot,
  YearCardHeader,
  YearCardYear,
  YearCardBadge,
  YearCardValue,
  YearCardProgress,
  YearCardSparkline,
  YearCardExpandedContent,
  YearCardStats,
  YearCardStatItem,
  YearCardInsights,
  YearCardInsightItem,
  YearCardAction,
};

// Re-export types and hooks
export { useYearCard, useYearCardOptional } from './year-card-context';
