// ========================================
// METRIC CARD GLASS COMPONENT
// Metric display card with progress, sparkline, and trend
// Domain-specific composite component following shadcn/ui patterns
// ========================================

import { forwardRef, type CSSProperties, type ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProgressGlass } from '../specialized/progress-glass';
import { SparklineGlass } from '../specialized/sparkline-glass';
import { InteractiveCard } from '../primitives';
import '@/glass-theme.css';

import type { ProgressGradient } from '@/lib/variants/progress-glass-variants';

// ========================================
// TYPES
// ========================================

export type MetricColor = 'emerald' | 'amber' | 'blue' | 'red';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface MetricTrend {
  /** Percentage change value */
  readonly value: number;
  /** Direction of the trend */
  readonly direction: TrendDirection;
  /** Optional label (e.g., "vs last month") */
  readonly label?: string;
}

export interface MetricCardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Metric label/title */
  readonly label: string;
  /** Numeric value (typically 0-100 for percentage) */
  readonly value: number;
  /** Semantic color for the metric */
  readonly color?: MetricColor;
  /** Data for sparkline visualization */
  readonly sparklineData?: readonly number[];
  /** Show sparkline chart */
  readonly showSparkline?: boolean;
  /** Icon to display (React node or Lucide icon) */
  readonly icon?: ReactNode;
  /** Trend indicator with direction and value */
  readonly trend?: MetricTrend;
  /** Custom value formatter (e.g., (v) => `${v}%`) */
  readonly valueFormatter?: (value: number) => string;
  /** Optional suffix for the value (e.g., "of 100") */
  readonly valueSuffix?: string;
  /** Show progress bar */
  readonly showProgress?: boolean;
}

// ========================================
// COLOR MAPPINGS
// ========================================

// Map MetricColor to ProgressGradient
const colorToGradient: Record<MetricColor, ProgressGradient> = {
  emerald: 'emerald',
  amber: 'amber',
  blue: 'blue',
  red: 'rose',
};

// CSS variable maps for metric colors
const metricVarMap: Record<
  MetricColor,
  { bg: string; text: string; border: string; glow: string }
> = {
  emerald: {
    bg: 'var(--metric-emerald-bg)',
    text: 'var(--metric-emerald-text)',
    border: 'var(--metric-emerald-border)',
    glow: 'var(--metric-emerald-glow)',
  },
  amber: {
    bg: 'var(--metric-amber-bg)',
    text: 'var(--metric-amber-text)',
    border: 'var(--metric-amber-border)',
    glow: 'var(--metric-amber-glow)',
  },
  blue: {
    bg: 'var(--metric-blue-bg)',
    text: 'var(--metric-blue-text)',
    border: 'var(--metric-blue-border)',
    glow: 'var(--metric-blue-glow)',
  },
  red: {
    bg: 'var(--metric-red-bg)',
    text: 'var(--metric-red-text)',
    border: 'var(--metric-red-border)',
    glow: 'var(--metric-red-glow)',
  },
};

// Trend direction colors - using existing alert CSS variables
const trendColors: Record<TrendDirection, string> = {
  up: 'text-[var(--alert-success-text)]',
  down: 'text-[var(--alert-destructive-text)]',
  neutral: 'text-[var(--text-muted)]',
};

// Trend icons
const TrendIcons: Record<TrendDirection, typeof TrendingUp> = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

// ========================================
// COMPONENT
// ========================================

export const MetricCardGlass = forwardRef<HTMLDivElement, MetricCardGlassProps>(
  (
    {
      label,
      value,
      color = 'blue',
      sparklineData,
      showSparkline = true,
      icon,
      trend,
      valueFormatter,
      valueSuffix,
      showProgress = true,
      className,
      ...props
    },
    ref
  ) => {
    const colorVars = metricVarMap[color];
    const hasSparkline = showSparkline && sparklineData && sparklineData.length > 0;

    const valueStyles: CSSProperties = {
      color: colorVars.text,
      textShadow: colorVars.glow,
    };

    // Format the display value
    const displayValue = valueFormatter ? valueFormatter(value) : `${value}%`;

    // Render trend indicator
    const renderTrend = () => {
      if (!trend) return null;

      const TrendIcon = TrendIcons[trend.direction];
      const trendValue =
        trend.direction === 'down' ? `-${Math.abs(trend.value)}` : `+${trend.value}`;

      return (
        <div className={cn('flex items-center gap-1 text-xs', trendColors[trend.direction])}>
          <TrendIcon className="w-3 h-3" aria-hidden="true" />
          <span className="font-medium">{trendValue}%</span>
          {trend.label && <span className="text-[var(--text-muted)] ml-0.5">{trend.label}</span>}
        </div>
      );
    };

    return (
      <InteractiveCard
        ref={ref}
        baseBg={colorVars.bg}
        borderColor={colorVars.border}
        hoverGlow={colorVars.glow}
        hoverLift
        blur="sm"
        rounded="rounded-xl"
        className={cn('p-3 md:p-4', className)}
        {...props}
      >
        {/* Header with icon and trend */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {icon && (
              <div className="text-[var(--text-muted)]" aria-hidden="true">
                {icon}
              </div>
            )}
            <span className="text-(length:--font-size-2xs) sm:text-xs md:text-sm font-medium truncate text-(--text-secondary)">
              {label}
            </span>
          </div>
          {renderTrend()}
        </div>

        {/* Value display */}
        <div className="flex flex-col items-center mb-2 md:mb-3 gap-1">
          <span
            className="font-bold text-lg sm:text-xl md:text-2xl whitespace-nowrap"
            style={valueStyles}
          >
            {displayValue}
          </span>
          {valueSuffix && (
            <span className="text-(length:--font-size-2xs) text-(--text-muted)">{valueSuffix}</span>
          )}
        </div>

        {/* Progress and Sparkline */}
        {hasSparkline ? (
          <div className="space-y-2">
            {showProgress && (
              <ProgressGlass value={value} gradient={colorToGradient[color]} size="sm" />
            )}
            <SparklineGlass
              data={sparklineData}
              height="sm"
              gap="sm"
              className="w-full"
              barColor={colorVars.text}
              highlightMax
              aria-label={`${label} trend`}
            />
          </div>
        ) : showProgress ? (
          <ProgressGlass value={value} gradient={colorToGradient[color]} size="sm" />
        ) : null}
      </InteractiveCard>
    );
  }
);

MetricCardGlass.displayName = 'MetricCardGlass';
