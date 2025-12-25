// ========================================
// METRICS GRID GLASS - COMPOSITE COMPONENT
// Responsive grid of metric cards
// Level 3: Composite (extracted from TrustScoreCardGlass)
// ========================================

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { MetricCardGlass, type MetricVariant } from './metric-card-glass';
import '@/glass-theme.css';

/**
 * Metric data structure for MetricsGridGlass.
 *
 * Defines a single metric to be displayed in the grid.
 *
 * @example
 * ```tsx
 * const metric: MetricData = {
 *   title: 'Total Repositories',
 *   value: 42,
 *   variant: 'default',
 * };
 * ```
 */
export interface MetricData {
  /** Metric title/label */
  readonly title: string;
  /** Metric value (number or string) */
  readonly value: string | number;
  /** Visual variant (default, success, warning, destructive) */
  readonly variant: MetricVariant;
}

/**
 * Props for MetricsGridGlass component.
 *
 * Extends standard div attributes for maximum flexibility.
 * All props are readonly to ensure immutability.
 *
 * @example
 * ```tsx
 * const props: MetricsGridGlassProps = {
 *   metrics: [
 *     { title: 'Total Repos', value: 42, variant: 'default' },
 *     { title: 'Stars', value: '1.2k', variant: 'success' },
 *   ],
 *   columns: 4,
 *   gap: 'md',
 * };
 * ```
 */
export interface MetricsGridGlassProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Array of metrics to display in the grid.
   *
   * Each metric requires title, value, and variant.
   * Returns null if array is empty.
   *
   * @example
   * ```tsx
   * const metrics = [
   *   { title: 'Commits', value: 1234, variant: 'default' },
   *   { title: 'Stars', value: '2.5k', variant: 'success' },
   *   { title: 'Issues', value: 8, variant: 'warning' },
   *   { title: 'Forks', value: 156, variant: 'default' },
   * ];
   * <MetricsGridGlass metrics={metrics} />
   * ```
   */
  readonly metrics: readonly MetricData[];

  /**
   * Number of columns on desktop breakpoint (1-6).
   *
   * Automatically responsive:
   * - 1: Single column (all breakpoints)
   * - 2: 1 col mobile, 2 cols sm+
   * - 3: 1 col mobile, 2 cols sm+, 3 cols md+
   * - 4: 2 cols mobile, 3 cols sm+, 4 cols md+
   * - 5: 2 cols mobile, 3 cols sm+, 5 cols md+
   * - 6: 2 cols mobile, 3 cols sm+, 6 cols md+
   *
   * @default 4
   */
  readonly columns?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Gap size between metric cards.
   *
   * - `sm`: 0.5rem (8px)
   * - `md`: 1rem (16px)
   * - `lg`: 1.5rem (24px)
   *
   * @default 'md'
   */
  readonly gap?: 'sm' | 'md' | 'lg';
}

/**
 * MetricsGridGlass Component
 *
 * Responsive grid layout for displaying multiple MetricCardGlass components.
 * Extracted from TrustScoreCardGlass for reusable metric dashboard layouts.
 *
 * ## Features
 * - 6 responsive column configurations (1-6 columns)
 * - Automatic mobile/tablet/desktop breakpoints
 * - 3 gap size variants (sm, md, lg)
 * - Empty array handling (returns null)
 * - Automatic key generation from metric titles
 * - MetricCardGlass integration with variant support
 * - Flexible metric data structure (number or string values)
 * - Theme-aware styling via MetricCardGlass
 * - Customizable via className for grid modifications
 * - Type-safe metric data with readonly arrays
 *
 * ## Responsive Behavior
 * - **1-3 columns:** Start with 1 column on mobile
 * - **4-6 columns:** Start with 2 columns on mobile (more efficient)
 * - **sm breakpoint:** Increase to 2-3 columns
 * - **md breakpoint:** Full column count (1-6)
 *
 * ## CSS Variables
 * Inherits all MetricCardGlass CSS variables:
 * - `--metric-success-*` - Success variant colors
 * - `--metric-warning-*` - Warning variant colors
 * - `--metric-default-*` - Default variant colors
 * - `--metric-destructive-*` - Destructive variant colors
 *
 * @example
 * // Basic 4-column grid with default gap
 * <MetricsGridGlass
 *   metrics={[
 *     { title: 'Commits', value: 1234, variant: 'default' },
 *     { title: 'Stars', value: '2.5k', variant: 'success' },
 *     { title: 'Issues', value: 8, variant: 'warning' },
 *     { title: 'Forks', value: 156, variant: 'default' },
 *   ]}
 * />
 *
 * @example
 * // 3-column grid with large gaps
 * <MetricsGridGlass
 *   metrics={trustScoreMetrics}
 *   columns={3}
 *   gap="lg"
 * />
 *
 * @example
 * // Single column for mobile-only views
 * <MetricsGridGlass
 *   metrics={dashboardMetrics}
 *   columns={1}
 *   gap="sm"
 * />
 *
 * @example
 * // 6-column grid for wide dashboards
 * <MetricsGridGlass
 *   metrics={[
 *     { title: 'Metric 1', value: 100, variant: 'success' },
 *     { title: 'Metric 2', value: 200, variant: 'default' },
 *     { title: 'Metric 3', value: 50, variant: 'warning' },
 *     { title: 'Metric 4', value: 75, variant: 'default' },
 *     { title: 'Metric 5', value: 150, variant: 'success' },
 *     { title: 'Metric 6', value: 10, variant: 'destructive' },
 *   ]}
 *   columns={6}
 * />
 *
 * @accessibility
 * - Semantic HTML grid layout
 * - Inherits MetricCardGlass accessibility features
 * - Responsive breakpoints for mobile/tablet/desktop
 * - Sufficient spacing via gap variants
 * - Color-coded variants with semantic meaning
 * - Non-interactive display (no keyboard requirements)
 *
 * @since v1.0.0
 */
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
            key={metric.title}
            title={metric.title}
            value={metric.value}
            variant={metric.variant}
          />
        ))}
      </div>
    );
  }
);

MetricsGridGlass.displayName = 'MetricsGridGlass';
