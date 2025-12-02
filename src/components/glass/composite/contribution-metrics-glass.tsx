// ========================================
// CONTRIBUTION METRICS GLASS - COMPOSITE COMPONENT
// Repository contribution metrics grid
// Level 3: Composite (extracted from RepositoryCardGlass)
// ========================================

import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

export interface ContributionMetricsGlassProps extends HTMLAttributes<HTMLDivElement> {
  /** User's commit count */
  readonly userCommits: number;
  /** User's contribution percentage */
  readonly userContribution: number;
  /** Total project commits (calculated if not provided) */
  readonly totalProjectCommits?: number;
  /** Estimated lines of code */
  readonly estimatedLines?: number;
  /** Grid layout (1 or 2 columns) */
  readonly columns?: 1 | 2;
}

export const ContributionMetricsGlass = forwardRef<
  HTMLDivElement,
  ContributionMetricsGlassProps
>(
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
      (userContribution > 0
        ? Math.round(userCommits / (userContribution / 100))
        : userCommits);

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
      <div
        ref={ref}
        className={cn('grid gap-2', columnClasses[columns], className)}
        {...props}
      >
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
