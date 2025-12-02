// ========================================
// METRICS GRID GLASS - COMPOSITE COMPONENT
// Responsive grid of metric cards
// Level 3: Composite (extracted from TrustScoreCardGlass)
// ========================================

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { MetricCardGlass, type MetricColor } from '@/components/MetricCardGlass';
import '@/glass-theme.css';

export interface MetricData {
  readonly label: string;
  readonly value: number;
  readonly color: MetricColor;
}

export interface MetricsGridGlassProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of metrics to display */
  readonly metrics: readonly MetricData[];
  /** Number of columns on desktop (1-6) */
  readonly columns?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Gap size */
  readonly gap?: 'sm' | 'md' | 'lg';
}

export const MetricsGridGlass = forwardRef<HTMLDivElement, MetricsGridGlassProps>(
  ({ metrics, columns = 4, gap = 'md', className, ...props }, ref) => {
    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    };

    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
      4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
      5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
      6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6',
    };

    if (metrics.length === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn('grid', columnClasses[columns], gapClasses[gap], className)}
        {...props}
      >
        {metrics.map((metric) => (
          <MetricCardGlass
            key={metric.label}
            label={metric.label}
            value={metric.value}
            color={metric.color}
          />
        ))}
      </div>
    );
  }
);

MetricsGridGlass.displayName = 'MetricsGridGlass';
