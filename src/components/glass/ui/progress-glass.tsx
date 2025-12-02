/**
 * ProgressGlass Component
 *
 * Glass-themed progress bar with:
 * - Theme-aware styling (glass/light/aurora)
 * - Gradient fill with glow
 * - Size variants
 * - Optional label
 */

import { forwardRef, type CSSProperties } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type ProgressSize = 'sm' | 'md' | 'lg' | 'xl';
export type ProgressGradient = 'violet' | 'blue' | 'cyan' | 'amber' | 'emerald' | 'rose';

// ========================================
// SIZE VARIANTS (using CVA)
// ========================================

const progressSizes = cva('rounded-full overflow-hidden', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
      xl: 'h-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ========================================
// PROPS INTERFACE
// ========================================

export interface ProgressGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
    VariantProps<typeof progressSizes> {
  readonly value: number;
  readonly gradient?: ProgressGradient;
  readonly showLabel?: boolean;
}

// ========================================
// COMPONENT
// ========================================

// Gradient colors for the fill - CSS variable based
const getGradientColors = (gradient: ProgressGradient): { from: string; to: string; glowVar: string } => {
  const gradients: Record<ProgressGradient, { from: string; to: string; glowVar: string }> = {
    violet: { from: '#8b5cf6', to: '#a855f7', glowVar: '--progress-glow-violet' },
    blue: { from: '#3b82f6', to: '#60a5fa', glowVar: '--progress-glow-blue' },
    cyan: { from: '#06b6d4', to: '#22d3ee', glowVar: '--progress-glow-cyan' },
    amber: { from: '#f59e0b', to: '#fbbf24', glowVar: '--progress-glow-amber' },
    emerald: { from: '#10b981', to: '#34d399', glowVar: '--progress-glow-emerald' },
    rose: { from: '#f43f5e', to: '#fb7185', glowVar: '--progress-glow-rose' },
  };
  return gradients[gradient];
};

export const ProgressGlass = forwardRef<HTMLDivElement, ProgressGlassProps>(
  (
    {
      className,
      size = 'md',
      value,
      gradient = 'violet',
      showLabel,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const gradientColors = getGradientColors(gradient);

    const trackStyles: CSSProperties = {
      background: 'var(--progress-bg)',
    };

    const fillStyles: CSSProperties = {
      width: `${clampedValue}%`,
      background: `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.to})`,
      boxShadow: `var(${gradientColors.glowVar})`,
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {showLabel && (
          <div className="flex justify-between mb-1">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Progress
            </span>
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              {clampedValue}%
            </span>
          </div>
        )}
        <div className={cn(progressSizes({ size }))} style={trackStyles}>
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={fillStyles}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    );
  }
);

ProgressGlass.displayName = 'ProgressGlass';

export { progressSizes as progressGlassVariants };
