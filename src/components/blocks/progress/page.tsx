// ========================================
// PROGRESS BLOCK
// Demo showcase of progress indicators
// Level 5: Block (shadcn/ui pattern)
// ========================================

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/GlassCard';
import { ProgressGlass } from '@/components/ProgressGlass';
import { RainbowProgressGlass } from '@/components/RainbowProgressGlass';
import { SkeletonGlass } from '@/components/SkeletonGlass';
import '@/glass-theme.css';

export interface ProgressBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** Show section title */
  readonly showTitle?: boolean;
}

export const ProgressBlock = forwardRef<HTMLDivElement, ProgressBlockProps>(
  ({ showTitle = true, className, ...props }, ref) => {
    return (
      <GlassCard
        ref={ref}
        className={cn('p-6', className)}
        intensity="medium"
        hover={false}
        {...props}
      >
        {showTitle && (
          <h2
            className="text-xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Progress Indicators
          </h2>
        )}

        <div className="space-y-6">
          {/* Standard Progress */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium flex items-center justify-between"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span>Standard Progress</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                75%
              </span>
            </label>
            <ProgressGlass value={75} gradient="violet" />
          </div>

          {/* Rainbow Progress */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium flex items-center justify-between"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span>Rainbow Progress</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                85%
              </span>
            </label>
            <RainbowProgressGlass value={85} size="md" />
          </div>

          {/* Loading Skeleton */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Loading Skeleton
            </label>
            <div className="space-y-2">
              <SkeletonGlass className="h-4 w-full" />
              <SkeletonGlass className="h-4 w-3/4" />
              <SkeletonGlass className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </GlassCard>
    );
  }
);

ProgressBlock.displayName = 'ProgressBlock';
