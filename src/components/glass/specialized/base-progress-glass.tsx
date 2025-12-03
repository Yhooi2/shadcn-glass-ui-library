/**
 * BaseProgressGlass Component
 *
 * Base progress bar component used as foundation for:
 * - ProgressGlass (standard progress bar)
 * - RainbowProgressGlass (gradient progress bar)
 *
 * Features:
 * - Theme-aware styling
 * - Percentage calculation
 * - Accessible (ARIA progressbar)
 * - Customizable through children render prop
 */

import { forwardRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

export interface BaseProgressGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  readonly value?: number;
  readonly max?: number;
  readonly children?: ReactNode | ((percentage: number) => ReactNode);
}

// ========================================
// COMPONENT
// ========================================

export const BaseProgressGlass = forwardRef<HTMLDivElement, BaseProgressGlassProps>(
  ({ value = 0, max = 100, className, children, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div
        ref={ref}
        className={cn(
          'relative h-2 w-full overflow-hidden rounded-full',
          'bg-white/5 backdrop-blur-sm',
          className
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuetext={`${Math.round(percentage)}%`}
        {...props}
      >
        {typeof children === 'function'
          ? children(percentage)
          : children || (
              <div
                className="h-full transition-all duration-300 ease-out"
                style={{
                  width: `${percentage}%`,
                  background: 'var(--progress-bar-bg, linear-gradient(90deg, #a855f7, #ec4899))',
                }}
              />
            )}
      </div>
    );
  }
);

BaseProgressGlass.displayName = 'BaseProgressGlass';
