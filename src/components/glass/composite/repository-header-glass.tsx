// ========================================
// REPOSITORY HEADER GLASS - COMPOSITE COMPONENT
// Repository name with status indicator and stars
// Level 3: Composite (extracted from RepositoryCardGlass)
// ========================================

import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusIndicatorGlass } from '../specialized/status-indicator-glass';
import '@/glass-theme.css';

export type RepositoryFlagType = 'green' | 'yellow' | 'red';

export interface RepositoryHeaderGlassProps extends HTMLAttributes<HTMLDivElement> {
  /** Repository name */
  readonly name: string;
  /** Flag/status type */
  readonly flagType?: RepositoryFlagType;
  /** Star count */
  readonly stars?: number;
  /** Is expanded state */
  readonly expanded?: boolean;
  /** Abbreviated star count for mobile (1.2k instead of 1234) */
  readonly abbreviatedStars?: boolean;
}

export const RepositoryHeaderGlass = forwardRef<
  HTMLDivElement,
  RepositoryHeaderGlassProps
>(
  (
    {
      name,
      flagType = 'green',
      stars = 0,
      expanded = false,
      abbreviatedStars = false,
      className,
      ...props
    },
    ref
  ) => {
    const titleStyles: CSSProperties = {
      color: 'var(--text-primary)',
    };

    const starStyles: CSSProperties = {
      color: 'var(--status-away)',
    };

    const mutedStyles: CSSProperties = {
      color: 'var(--text-muted)',
    };

    const formatStars = (count: number): string => {
      if (!abbreviatedStars) return String(count);
      if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
      if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
      return String(count);
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between', className)}
        {...props}
      >
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-sm" style={titleStyles}>
            {name}
          </span>
          <StatusIndicatorGlass type={flagType} />
        </div>
        <div className="flex items-center gap-2">
          {stars > 0 && (
            <span className="flex items-center gap-1 text-xs" style={starStyles}>
              <Star className="w-3 h-3" />
              {formatStars(stars)}
            </span>
          )}
          {expanded ? (
            <ChevronUp className="w-4 h-4" style={mutedStyles} />
          ) : (
            <ChevronDown className="w-4 h-4" style={mutedStyles} />
          )}
        </div>
      </div>
    );
  }
);

RepositoryHeaderGlass.displayName = 'RepositoryHeaderGlass';
