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
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { progressSizes, type ProgressGradient } from '@/lib/variants/progress-glass-variants';
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

export interface ProgressGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>, VariantProps<typeof progressSizes> {
  readonly value: number;
  readonly gradient?: ProgressGradient;
  readonly showLabel?: boolean;
}

// ========================================
// COMPONENT
// ========================================

// Map gradient to existing metric color variables
const getGradientColor = (
  gradient: ProgressGradient = 'violet'
): { colorVar: string; glowVar: string } => {
  const gradients: Record<ProgressGradient, { colorVar: string; glowVar: string }> = {
    violet: { colorVar: '--metric-default-text', glowVar: '--progress-glow-violet' }, // Uses blue metric color
    blue: { colorVar: '--metric-default-text', glowVar: '--progress-glow-blue' },
    cyan: { colorVar: '--metric-secondary-text', glowVar: '--progress-glow-cyan' },
    amber: { colorVar: '--metric-warning-text', glowVar: '--progress-glow-amber' },
    emerald: { colorVar: '--metric-success-text', glowVar: '--progress-glow-emerald' },
    rose: { colorVar: '--metric-destructive-text', glowVar: '--progress-glow-rose' },
  };
  return gradients[gradient] || gradients.violet;
};

export const ProgressGlass = forwardRef<HTMLDivElement, ProgressGlassProps>(
  ({ className, size = 'md', value = 0, gradient = 'violet', showLabel, ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const { colorVar, glowVar } = getGradientColor(gradient);

    const trackStyles: CSSProperties = {
      background: 'var(--progress-bg)',
    };

    const fillStyles: CSSProperties = {
      width: `${clampedValue}%`,
      background: `var(${colorVar})`,
      boxShadow: `var(${glowVar})`,
    };

    return (
      <div ref={ref} data-slot="progress" className={cn('w-full', className)} {...props}>
        {showLabel && (
          <div className="flex justify-between mb-1 md:mb-1.5">
            <span className="text-(length:--font-size-2xs) md:text-xs text-(--text-muted)">
              Progress
            </span>
            <span className="text-(length:--font-size-2xs) md:text-xs font-medium text-(--text-secondary)">
              {clampedValue}%
            </span>
          </div>
        )}
        <div className={cn(progressSizes({ size }))} style={trackStyles}>
          <div
            data-slot="progress-indicator"
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={fillStyles}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progress: ${clampedValue}%`}
          />
        </div>
      </div>
    );
  }
);

ProgressGlass.displayName = 'ProgressGlass';
