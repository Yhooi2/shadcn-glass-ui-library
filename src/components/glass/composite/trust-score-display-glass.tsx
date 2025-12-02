// ========================================
// TRUST SCORE DISPLAY GLASS - COMPOSITE COMPONENT
// Large animated trust score number with title
// Level 3: Composite (extracted from TrustScoreCardGlass)
// ========================================

import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

export interface TrustScoreDisplayGlassProps extends HTMLAttributes<HTMLDivElement> {
  /** Score value (0-100) */
  readonly score: number;
  /** Maximum score (default: 100) */
  readonly maxScore?: number;
  /** Title text */
  readonly title?: string;
  /** Show icon */
  readonly showIcon?: boolean;
  /** Size variant */
  readonly size?: 'sm' | 'md' | 'lg';
}

export const TrustScoreDisplayGlass = forwardRef<
  HTMLDivElement,
  TrustScoreDisplayGlassProps
>(
  (
    {
      score,
      maxScore = 100,
      title = 'Overall Trust Score',
      showIcon = true,
      size = 'md',
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

    const mutedStyles: CSSProperties = {
      color: 'var(--text-muted)',
    };

    const sizeClasses = {
      sm: { title: 'text-base', score: 'text-2xl', max: 'text-lg', icon: 'w-4 h-4' },
      md: { title: 'text-lg', score: 'text-4xl', max: 'text-xl', icon: 'w-5 h-5' },
      lg: { title: 'text-xl', score: 'text-5xl', max: 'text-2xl', icon: 'w-6 h-6' },
    };

    const sizes = sizeClasses[size];

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between', className)}
        {...props}
      >
        <h2
          className={cn('font-semibold flex items-center gap-2', sizes.title)}
          style={titleStyles}
        >
          {showIcon && <Target className={sizes.icon} style={accentStyles} />}
          {title}
        </h2>
        <div className="flex items-center gap-2 animate-[score-pulse_2s_ease-in-out_infinite]">
          <span
            className={cn(
              sizes.score,
              'font-bold bg-linear-to-r from-amber-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent'
            )}
          >
            {score}
          </span>
          <span className={sizes.max} style={mutedStyles}>
            / {maxScore}
          </span>
        </div>
      </div>
    );
  }
);

TrustScoreDisplayGlass.displayName = 'TrustScoreDisplayGlass';
