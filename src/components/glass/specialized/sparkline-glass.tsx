// ========================================
// SPARKLINE GLASS COMPONENT
// Recharts-based sparkline following shadcn/ui Charts pattern
// ========================================

import { forwardRef, useMemo } from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { sparklineContainerVariants } from '@/lib/variants/sparkline-glass-variants';
import { type ChartConfig } from '@/components/ui/chart';
import '@/glass-theme.css';

// ========================================
// SPARKLINE CONFIG TYPE
// ========================================

export type SparklineConfig = ChartConfig;

// ========================================
// DEFAULT CONFIG
// ========================================

const defaultSparklineConfig = {
  value: {
    label: 'Value',
    // Use existing chart-1 color with fallback to primary accent
    color: 'var(--sparkline-bar-fill, hsl(var(--chart-1-base)))',
  },
  max: {
    label: 'Maximum',
    // Use existing success color with fallback
    color: 'var(--sparkline-bar-max, var(--alert-success-text))',
  },
} satisfies SparklineConfig;

// ========================================
// SPARKLINE PROPS
// ========================================

export interface SparklineGlassProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
    VariantProps<typeof sparklineContainerVariants> {
  /** Array of numeric values to display */
  readonly data: readonly number[];
  /** Labels for each bar (shown in tooltip) */
  readonly labels?: readonly string[];
  /** Show labels below bars */
  readonly showLabels?: boolean;
  /** Highlight the maximum value with different color */
  readonly highlightMax?: boolean;
  /** Color for regular bars (CSS variable or color) */
  readonly barColor?: string;
  /** Color for maximum bar */
  readonly maxBarColor?: string;
  /** Tooltips for each bar */
  readonly tooltips?: readonly string[];
  /** Enable animation */
  readonly animated?: boolean;
  /** Minimum bar height as percentage */
  readonly minBarHeightPercent?: number;
  /** Chart configuration (shadcn/ui pattern) */
  readonly config?: SparklineConfig;
  /** Value formatter for tooltip */
  readonly valueFormatter?: (value: number, index: number) => string;
  /** Callback when bar is clicked */
  readonly onBarClick?: (value: number, index: number) => void;
  /** Show tooltip on hover */
  readonly showTooltip?: boolean;
}

// ========================================
// HEIGHT MAP
// ========================================

const heightMap = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

// ========================================
// CUSTOM TOOLTIP
// ========================================

interface SparklineTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: { index: number; label?: string; value: number };
  }>;
  valueFormatter?: (value: number, index: number) => string;
}

const SparklineTooltip = ({ active, payload, valueFormatter }: SparklineTooltipProps) => {
  if (!active || !payload?.length) {
    return null;
  }

  const data = payload[0];
  const value = data.value;
  const index = data.payload.index;
  const label = data.payload.label;

  const displayValue = valueFormatter ? valueFormatter(value, index) : value.toLocaleString();

  return (
    <div className="rounded-md border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2 py-1 text-xs shadow-lg backdrop-blur-md">
      {label && <div className="font-medium text-[var(--text-primary)]">{label}</div>}
      <div className="text-[var(--text-secondary)]">{displayValue}</div>
    </div>
  );
};

// ========================================
// SPARKLINE COMPONENT
// ========================================

export const SparklineGlass = forwardRef<HTMLDivElement, SparklineGlassProps>(
  (
    {
      data,
      labels,
      showLabels = false,
      highlightMax = false,
      barColor,
      maxBarColor,
      tooltips,
      height = 'md',
      gap = 'sm',
      animated = false,
      minBarHeightPercent = 4,
      config = defaultSparklineConfig,
      valueFormatter,
      onBarClick,
      showTooltip = true,
      className,
      ...props
    },
    ref
  ) => {
    // Transform data for Recharts
    const chartData = useMemo(() => {
      const maxValue = Math.max(...data, 0);
      const maxIndex = data.indexOf(maxValue);

      return data.map((value, index) => ({
        index,
        value,
        label: labels?.[index] || tooltips?.[index],
        isMax: highlightMax && index === maxIndex && value > 0,
        // Ensure minimum bar height
        displayValue:
          maxValue > 0
            ? Math.max(value, maxValue * (minBarHeightPercent / 100))
            : minBarHeightPercent,
      }));
    }, [data, labels, tooltips, highlightMax, minBarHeightPercent]);

    const { maxValue, maxIndex } = useMemo(() => {
      const max = Math.max(...data, 0);
      return { maxValue: max, maxIndex: data.indexOf(max) };
    }, [data]);

    const ariaLabel = useMemo(() => {
      if (data.length === 0) return 'Empty sparkline chart';
      return `Sparkline chart with ${data.length} data points, maximum value ${maxValue}${
        labels ? ` at ${labels[maxIndex] || `position ${maxIndex + 1}`}` : ''
      }`;
    }, [data.length, maxValue, maxIndex, labels]);

    // Resolve colors
    const resolvedBarColor = barColor || config.value?.color || 'var(--sparkline-bar-fill)';
    const resolvedMaxColor = maxBarColor || config.max?.color || 'var(--sparkline-bar-max)';

    // Gap map for bar spacing
    const gapMap = { none: 0, sm: 1, md: 2 };
    const barGap = gapMap[gap || 'sm'];

    const chartHeight = heightMap[height || 'md'];

    const handleClick = (dataPoint: (typeof chartData)[0]) => {
      if (onBarClick) {
        onBarClick(dataPoint.value, dataPoint.index);
      }
    };

    return (
      <div
        ref={ref}
        role="img"
        aria-label={ariaLabel}
        className={cn('flex flex-col', className)}
        {...props}
      >
        {/* Chart Container - following shadcn/ui pattern */}
        <div
          className={cn(sparklineContainerVariants({ height, gap }))}
          data-chart="sparkline"
          style={
            {
              '--color-value': resolvedBarColor,
              '--color-max': resolvedMaxColor,
            } as React.CSSProperties
          }
        >
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              barGap={barGap}
            >
              {showTooltip && (
                <Tooltip
                  content={<SparklineTooltip valueFormatter={valueFormatter} />}
                  cursor={false}
                  isAnimationActive={false}
                />
              )}
              <Bar
                dataKey="displayValue"
                radius={[2, 2, 0, 0]}
                isAnimationActive={animated}
                animationDuration={500}
                animationEasing="ease-out"
                onClick={(_, index) => handleClick(chartData[index])}
                style={{ cursor: onBarClick ? 'pointer' : 'default' }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isMax ? resolvedMaxColor : resolvedBarColor}
                    className="transition-colors duration-200 hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Labels */}
        {showLabels && labels && labels.length > 0 && (
          <div className="flex mt-1" aria-hidden="true">
            {labels.map((label, index) => (
              <span
                key={index}
                className={cn(
                  'flex-1 text-center leading-none truncate text-xs',
                  'text-(--text-muted)'
                )}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SparklineGlass.displayName = 'SparklineGlass';

// ========================================
// RE-EXPORT RECHARTS FOR DIRECT ACCESS
// ========================================

export { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts';
