// ========================================
// REPOSITORY METADATA GLASS - COMPOSITE COMPONENT
// Repository languages, commits, and contribution info
// Level 3: Composite (extracted from RepositoryCardGlass)
// ========================================

import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

export interface RepositoryMetadataGlassProps extends HTMLAttributes<HTMLDivElement> {
  /** Programming languages used */
  readonly languages: string;
  /** Number of commits */
  readonly commits: number;
  /** Contribution percentage */
  readonly contribution: number;
  /** Stacked layout for mobile */
  readonly stacked?: boolean;
}

export const RepositoryMetadataGlass = forwardRef<
  HTMLDivElement,
  RepositoryMetadataGlassProps
>(
  (
    {
      languages,
      commits,
      contribution,
      stacked = false,
      className,
      ...props
    },
    ref
  ) => {
    const mutedStyles: CSSProperties = {
      color: 'var(--text-muted)',
    };

    const secondaryStyles: CSSProperties = {
      color: 'var(--text-secondary)',
    };

    return (
      <div
        ref={ref}
        className={cn(stacked ? 'space-y-0.5' : 'space-y-1', className)}
        {...props}
      >
        <div className="text-xs" style={mutedStyles}>
          {languages}
        </div>
        <div className="text-xs" style={secondaryStyles}>
          {commits.toLocaleString()} commits · {contribution}%
        </div>
      </div>
    );
  }
);

RepositoryMetadataGlass.displayName = 'RepositoryMetadataGlass';
