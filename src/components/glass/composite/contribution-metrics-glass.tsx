// ========================================
// CONTRIBUTION METRICS GLASS - COMPOSITE COMPONENT
// Repository contribution metrics grid
// Level 3: Composite (extracted from RepositoryCardGlass)
// ========================================

import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

/**
 * Props for ContributionMetricsGlass component.
 *
 * Extends standard div attributes for maximum flexibility.
 * All props are readonly to ensure immutability.
 *
 * @example
 * ```tsx
 * const props: ContributionMetricsGlassProps = {
 *   userCommits: 1234,
 *   userContribution: 45,
 *   totalProjectCommits: 2744,
 *   estimatedLines: 14808,
 *   columns: 2,
 * };
 * ```
 */
export interface ContributionMetricsGlassProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Number of commits made by the user.
   *
   * Displayed in the first card as "Your Contribution" with thousand separators.
   *
   * @example
   * ```tsx
   * <ContributionMetricsGlass userCommits={1234} /> // Shows "1,234 commits"
   * ```
   */
  readonly userCommits: number;

  /**
   * User's contribution percentage (0-100).
   *
   * Used to calculate total project commits if not provided.
   * Displayed below user commits.
   *
   * @example
   * ```tsx
   * <ContributionMetricsGlass userContribution={45} /> // Shows "45%"
   * ```
   */
  readonly userContribution: number;

  /**
   * Total project commits across all contributors.
   *
   * If not provided, automatically calculated from userCommits and userContribution.
   * Calculation: `userCommits / (userContribution / 100)`
   *
   * @default Calculated from userCommits and userContribution
   *
   * @example
   * ```tsx
   * // Manual total
   * <ContributionMetricsGlass totalProjectCommits={5000} />
   *
   * // Auto-calculated: 1000 / (50 / 100) = 2000
   * <ContributionMetricsGlass userCommits={1000} userContribution={50} />
   * ```
   */
  readonly totalProjectCommits?: number;

  /**
   * Estimated lines of code in the project.
   *
   * If not provided, automatically calculated as `userCommits * 12`.
   * Displayed with thousand separators (e.g., "14,808 lines").
   *
   * @default userCommits * 12
   *
   * @example
   * ```tsx
   * // Manual lines
   * <ContributionMetricsGlass estimatedLines={25000} />
   *
   * // Auto-calculated: 1000 * 12 = 12000
   * <ContributionMetricsGlass userCommits={1000} />
   * ```
   */
  readonly estimatedLines?: number;

  /**
   * Grid layout column configuration.
   *
   * - `1`: Single column (cards stack vertically)
   * - `2`: Two columns on sm+ screens, single column on mobile
   *
   * @default 2
   */
  readonly columns?: 1 | 2;
}

/**
 * ContributionMetricsGlass Component
 *
 * Repository contribution metrics grid displaying user and project statistics.
 * Extracted from RepositoryCardGlass for reusable contribution displays.
 *
 * ## Features
 * - 2-card layout (user contribution + full project)
 * - Automatic calculation of total commits from percentage
 * - Automatic estimation of lines of code (commits × 12)
 * - Thousand separator formatting for large numbers
 * - Responsive grid (1 or 2 columns)
 * - Glass card styling with border and background
 * - Semantic color variables for theme consistency
 * - Three-tier information hierarchy (label, value, details)
 * - Compact padding (2.5rem) for dense layouts
 * - Optional manual override for calculations
 *
 * ## CSS Variables
 * - `--card-bg` - Card background color
 * - `--card-border` - Card border color
 * - `--text-muted` - Muted text color for labels
 * - `--text-primary` - Primary text color for values
 *
 * @example
 * // Basic usage with auto-calculation
 * <ContributionMetricsGlass
 *   userCommits={1234}
 *   userContribution={45}
 * />
 *
 * @example
 * // With manual total and lines
 * <ContributionMetricsGlass
 *   userCommits={1234}
 *   userContribution={45}
 *   totalProjectCommits={2744}
 *   estimatedLines={14808}
 * />
 *
 * @example
 * // Single column layout
 * <ContributionMetricsGlass
 *   userCommits={500}
 *   userContribution={25}
 *   columns={1}
 * />
 *
 * @example
 * // With custom styling
 * <ContributionMetricsGlass
 *   userCommits={2000}
 *   userContribution={60}
 *   className="gap-4"
 * />
 *
 * @accessibility
 * - Semantic HTML structure with proper text hierarchy
 * - Sufficient color contrast via CSS variables
 * - Thousand separators for number readability (toLocaleString)
 * - Clear label-value relationships
 * - Non-interactive display (no keyboard requirements)
 * - Responsive text sizes for readability
 *
 * @since v1.0.0
 */
export const ContributionMetricsGlass = forwardRef<HTMLDivElement, ContributionMetricsGlassProps>(
  (
    {
      userCommits,
      userContribution,
      totalProjectCommits: providedTotal,
      estimatedLines: providedLines,
      columns = 2,
      className,
      ...props
    },
    ref
  ) => {
    // Calculate total project commits from contribution percentage
    const totalProjectCommits =
      providedTotal ??
      (userContribution > 0 ? Math.round(userCommits / (userContribution / 100)) : userCommits);

    const estimatedLines = providedLines ?? Math.round(userCommits * 12);

    const cardStyles: CSSProperties = {
      background: 'var(--card-bg)',
      borderColor: 'var(--card-border)',
    };

    const mutedStyles: CSSProperties = {
      color: 'var(--text-muted)',
    };

    const primaryStyles: CSSProperties = {
      color: 'var(--text-primary)',
    };

    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
    };

    return (
      <div ref={ref} className={cn('grid gap-2', columnClasses[columns], className)} {...props}>
        <div className="p-2.5 rounded-lg border" style={cardStyles}>
          <div className="text-xs" style={mutedStyles}>
            Your Contribution
          </div>
          <div className="font-semibold" style={primaryStyles}>
            {userCommits.toLocaleString()} commits
          </div>
          <div className="text-xs" style={mutedStyles}>
            {userContribution}%
          </div>
        </div>
        <div className="p-2.5 rounded-lg border" style={cardStyles}>
          <div className="text-xs" style={mutedStyles}>
            Full Project
          </div>
          <div className="font-semibold" style={primaryStyles}>
            {totalProjectCommits.toLocaleString()} commits
          </div>
          <div className="text-xs" style={mutedStyles}>
            ~{estimatedLines.toLocaleString()} lines
          </div>
        </div>
      </div>
    );
  }
);

ContributionMetricsGlass.displayName = 'ContributionMetricsGlass';
