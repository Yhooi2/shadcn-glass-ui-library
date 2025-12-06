// ========================================
// CAREER STATS HEADER GLASS - COMPOSITE COMPONENT
// Career statistics header with total counts
// Level 3: Composite (extracted from CareerStatsGlass)
// ========================================

import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { TrendingUp, Code, GitPullRequest, FolderGit2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

export interface CareerStatsHeaderGlassProps extends HTMLAttributes<HTMLDivElement> {
  /** Total commits count */
  readonly totalCommits: number;
  /** Total pull requests count */
  readonly totalPRs: number;
  /** Total repositories count */
  readonly totalRepos: number;
  /** Header title */
  readonly title?: string;
  /** Stats wrap on mobile */
  readonly wrapStats?: boolean;
}

export const CareerStatsHeaderGlass = forwardRef<
  HTMLDivElement,
  CareerStatsHeaderGlassProps
>(
  (
    {
      totalCommits,
      totalPRs,
      totalRepos,
      title = 'Career Stats',
      wrapStats = true,
      className,
      ...props
    },
    ref
  ) => {
    const titleStyles: CSSProperties = {
      color: 'var(--text-primary)',
    };

    const accentStyles: CSSProperties = {
      color: 'var(--text-accent)',
    };

    const statsStyles: CSSProperties = {
      color: 'var(--text-secondary)',
    };

    return (
      <div ref={ref} className={cn('mb-4', className)} {...props}>
        <h3
          className="font-semibold flex items-center gap-2 mb-1"
          style={titleStyles}
        >
          <TrendingUp className="w-5 h-5" style={accentStyles} />
          {title}
        </h3>
        <p
          className={cn(
            'text-sm flex items-center gap-2',
            wrapStats && 'flex-wrap'
          )}
          style={statsStyles}
        >
          <span className="flex items-center gap-1">
            <Code className="w-4 h-4" />
            {totalCommits.toLocaleString()} commits
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <GitPullRequest className="w-4 h-4" />
            {totalPRs} PRs
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <FolderGit2 className="w-4 h-4" />
            {totalRepos} repos
          </span>
        </p>
      </div>
    );
  }
);

CareerStatsHeaderGlass.displayName = 'CareerStatsHeaderGlass';
