/**
 * ProgressGlass Component
 *
 * Glass-themed progress bar with 100% shadcn/ui Progress API compatibility.
 *
 * ## shadcn/ui Compatibility
 *
 * This component is **fully compatible** with shadcn/ui Progress API:
 * - `value` prop works identically
 * - `max` prop supported (default: 100)
 * - Extra props (`size`, `gradient`, `showLabel`) have sensible defaults
 * - Drop-in replacement: `<Progress value={50} />` → `<ProgressGlass value={50} />`
 *
 * @example Drop-in replacement from shadcn/ui
 * ```tsx
 * // shadcn/ui
 * <Progress value={50} />
 * <Progress value={50} max={200} />
 *
 * // ProgressGlass (identical behavior)
 * <ProgressGlass value={50} />
 * <ProgressGlass value={50} max={200} />
 * ```
 *
 * @example Enhanced features (not in shadcn/ui)
 * ```tsx
 * <ProgressGlass
 *   value={75}
 *   max={100}           // Custom max value (default: 100)
 *   size="lg"           // 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
 *   gradient="emerald"  // 'violet' | 'blue' | 'cyan' | 'amber' | 'emerald' | 'rose' (default: 'violet')
 *   showLabel           // Show percentage label (default: false)
 * />
 * ```
 *
 * ## Features
 * - Theme-aware styling (glass/light/aurora)
 * - Gradient fill with glow effects
 * - Responsive size variants
 * - Optional percentage label
 *
 * @accessibility
 * - role="progressbar" with aria-valuenow, aria-valuemin, aria-valuemax
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
  readonly max?: number;
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
  (
    { className, size = 'md', value = 0, max = 100, gradient = 'violet', showLabel, ...props },
    ref
  ) => {
    // Calculate percentage based on max value
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const { colorVar, glowVar } = getGradientColor(gradient);

    const trackStyles: CSSProperties = {
      background: 'var(--progress-bg)',
    };

    const fillStyles: CSSProperties = {
      width: `${percentage}%`,
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
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        <div className={cn(progressSizes({ size }))} style={trackStyles}>
          <div
            data-slot="progress-indicator"
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={fillStyles}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={`Progress: ${value} of ${max}`}
          />
        </div>
      </div>
    );
  }
);

ProgressGlass.displayName = 'ProgressGlass';

// ========================================
// SHADCN/UI COMPATIBLE ALIAS
// ========================================

/**
 * Progress - shadcn/ui compatible alias for ProgressGlass
 *
 * @example Drop-in replacement for shadcn/ui Progress
 * ```tsx
 * import { Progress } from 'shadcn-glass-ui'
 *
 * <Progress value={50} />
 * <Progress value={50} max={200} />
 * ```
 */
export const Progress = ProgressGlass;
