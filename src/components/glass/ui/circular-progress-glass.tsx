/**
 * CircularProgressGlass Component
 *
 * SVG-based circular progress indicator with:
 * - Determinate and indeterminate variants
 * - Configurable size and thickness
 * - Glow effect with SVG filters
 * - Theme-aware styling
 * - Optional label in center
 * - Gradient colors support
 */

import { forwardRef, useMemo, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// VARIANTS
// ========================================

const circularProgressVariants = cva('relative inline-flex items-center justify-center', {
  variants: {
    size: {
      sm: 'w-16 h-16',
      md: 'w-24 h-24',
      lg: 'w-32 h-32',
      xl: 'w-40 h-40',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ========================================
// TYPES
// ========================================

export type CircularProgressGradient = 'violet' | 'blue' | 'cyan' | 'amber' | 'emerald' | 'rose';

export interface CircularProgressGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof circularProgressVariants> {
  /** Progress value (0-100) for determinate variant */
  readonly value?: number;
  /** Variant type */
  readonly variant?: 'determinate' | 'indeterminate';
  /** Stroke width in pixels */
  readonly thickness?: number;
  /** Background track width in pixels */
  readonly trackWidth?: number;
  /** Progress color gradient */
  readonly color?: CircularProgressGradient;
  /** Track color (background circle) */
  readonly trackColor?: string;
  /** Show percentage label in center */
  readonly showLabel?: boolean;
  /** Custom label text (overrides percentage) */
  readonly label?: string;
  /** Custom color for the center label text */
  readonly labelColor?: string;
  /** Show glow effect */
  readonly showGlow?: boolean;
  /** Glow intensity */
  readonly glowIntensity?: 'low' | 'medium' | 'high';
  /** Stroke linecap style */
  readonly strokeLinecap?: 'round' | 'butt' | 'square';
  /** Animation duration in seconds */
  readonly animationDuration?: number;
}

// ========================================
// HELPERS
// ========================================

const getGradientColors = (gradient: CircularProgressGradient) => {
  const gradients: Record<CircularProgressGradient, { from: string; to: string; glowVar: string }> = {
    violet: { from: '#8b5cf6', to: '#a855f7', glowVar: '--progress-glow-violet' },
    blue: { from: '#3b82f6', to: '#60a5fa', glowVar: '--progress-glow-blue' },
    cyan: { from: '#06b6d4', to: '#22d3ee', glowVar: '--progress-glow-cyan' },
    amber: { from: '#f59e0b', to: '#fbbf24', glowVar: '--progress-glow-amber' },
    emerald: { from: '#10b981', to: '#34d399', glowVar: '--progress-glow-emerald' },
    rose: { from: '#f43f5e', to: '#fb7185', glowVar: '--progress-glow-rose' },
  };
  return gradients[gradient];
};

const getGlowStdDeviation = (intensity: 'low' | 'medium' | 'high'): number => {
  const intensities = { low: 2, medium: 4, high: 6 };
  return intensities[intensity];
};

// ========================================
// COMPONENT
// ========================================

export const CircularProgressGlass = forwardRef<HTMLDivElement, CircularProgressGlassProps>(
  (
    {
      className,
      size = 'md',
      value = 0,
      variant = 'determinate',
      thickness = 8,
      trackWidth = 8,
      color = 'violet',
      trackColor = 'rgba(255, 255, 255, 0.1)',
      showLabel = true,
      label,
      labelColor,
      showGlow = true,
      glowIntensity = 'medium',
      strokeLinecap = 'round',
      animationDuration = 1,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const gradientColors = getGradientColors(color);

    // SVG dimensions
    const sizeMap = { sm: 64, md: 96, lg: 128, xl: 160 };
    const svgSize = sizeMap[size || 'md'];
    const radius = (svgSize - Math.max(thickness, trackWidth)) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = svgSize / 2;

    // Calculate stroke dash offset for determinate progress
    const dashOffset = useMemo(() => {
      if (variant === 'indeterminate') return circumference * 0.75;
      return circumference * ((100 - clampedValue) / 100);
    }, [variant, clampedValue, circumference]);

    // Generate unique IDs for SVG elements (using useId for stable IDs)
    const uniqueId = useId();
    const gradientId = `circular-gradient-${uniqueId}`;
    const glowId = `circular-glow-${uniqueId}`;

    return (
      <div ref={ref} className={cn(circularProgressVariants({ size }), className)} {...props}>
        <svg
          width={svgSize}
          height={svgSize}
          className="transform -rotate-90"
          aria-hidden="true"
        >
          <defs>
            {/* Gradient definition */}
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientColors.from} />
              <stop offset="100%" stopColor={gradientColors.to} />
            </linearGradient>

            {/* Glow filter */}
            {showGlow && (
              <filter id={glowId}>
                <feGaussianBlur stdDeviation={getGlowStdDeviation(glowIntensity)} result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            )}
          </defs>

          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={trackWidth}
          />

          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={thickness}
            strokeLinecap={strokeLinecap}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            filter={showGlow ? `url(#${glowId})` : undefined}
            className={cn(
              'transition-all',
              variant === 'indeterminate' && 'animate-circular-progress-spin'
            )}
            style={{
              transitionDuration: `${animationDuration}s`,
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </svg>

        {/* Center label */}
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-sm font-semibold tabular-nums"
              style={{ color: labelColor || 'var(--text-primary)' }}
            >
              {label || (variant === 'determinate' ? `${clampedValue}%` : '')}
            </span>
          </div>
        )}

        {/* Accessibility */}
        <div
          role="progressbar"
          aria-valuenow={variant === 'determinate' ? clampedValue : undefined}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label || (variant === 'determinate' ? `Progress: ${clampedValue}%` : 'Loading progress')}
          aria-valuetext={label || (variant === 'determinate' ? `${clampedValue}%` : 'Loading...')}
          className="sr-only"
        >
          {label || (variant === 'determinate' ? `${clampedValue}%` : 'Loading...')}
        </div>
      </div>
    );
  }
);

CircularProgressGlass.displayName = 'CircularProgressGlass';
