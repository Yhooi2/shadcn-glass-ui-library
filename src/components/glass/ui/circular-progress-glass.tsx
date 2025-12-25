/**
 * CircularProgressGlass Component
 *
 * SVG-based circular progress indicator with gradient colors and glow effects.
 * Supports both determinate (0-100%) and indeterminate (spinner) variants.
 *
 * ## Features
 * - Determinate (0-100%) and indeterminate (spinner) variants
 * - 4 sizes: sm (64px), md (96px), lg (128px), xl (160px)
 * - 6 gradient colors: violet, blue, cyan, amber, emerald, rose
 * - Configurable stroke thickness and track width
 * - Optional center label (percentage or custom text)
 * - SVG glow filters with 3 intensity levels (low, medium, high)
 * - Smooth transitions with configurable animation duration
 * - Theme-aware styling via CSS variables
 * - Screen reader accessible with ARIA progressbar
 *
 * ## CSS Variables
 * Customize colors via theme CSS variables:
 * - `--progress-bg`: Progress bar background color
 * - `--progress-glow`: Default glow color
 * - `--progress-glow-violet`: Glow for violet gradient
 * - `--progress-glow-blue`: Glow for blue gradient
 * - `--progress-glow-cyan`: Glow for cyan gradient
 * - `--progress-glow-amber`: Glow for amber gradient
 * - `--progress-glow-emerald`: Glow for emerald gradient
 * - `--progress-glow-rose`: Glow for rose gradient
 *
 * @example Determinate progress with default settings
 * ```tsx
 * import { CircularProgressGlass } from 'shadcn-glass-ui'
 *
 * function UploadProgress() {
 *   const [progress, setProgress] = React.useState(0)
 *
 *   return (
 *     <CircularProgressGlass value={progress} color="violet" />
 *   )
 * }
 * ```
 *
 * @example Indeterminate spinner
 * ```tsx
 * <CircularProgressGlass variant="indeterminate" showLabel={false} />
 * ```
 *
 * @example With custom label and color
 * ```tsx
 * <CircularProgressGlass
 *   value={75}
 *   label="Loading..."
 *   color="emerald"
 *   showLabel={true}
 * />
 * ```
 *
 * @example Large size with high glow intensity
 * ```tsx
 * <CircularProgressGlass
 *   value={80}
 *   size="xl"
 *   color="cyan"
 *   glowIntensity="high"
 *   thickness={12}
 * />
 * ```
 *
 * @accessibility
 * - Uses ARIA `role="progressbar"` for screen reader support
 * - Provides `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for determinate variant
 * - Includes `aria-label` and `aria-valuetext` for context
 * - Visual indicator uses `aria-hidden="true"` (screen readers use hidden progressbar)
 * - Custom label text overrides default percentage announcement
 *
 * @since v1.0.0
 */

import { forwardRef, useMemo, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// VARIANTS
// ========================================

const circularProgressVariants = cva('relative inline-flex items-center justify-center p-4', {
  variants: {
    size: {
      sm: 'w-20 h-20',
      md: 'w-28 h-28',
      lg: 'w-36 h-36',
      xl: 'w-44 h-44',
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

/**
 * Props for CircularProgressGlass component.
 *
 * Extends standard div attributes (excluding `children`) with progress-specific props.
 *
 * @example
 * ```tsx
 * const props: CircularProgressGlassProps = {
 *   value: 75,
 *   variant: 'determinate',
 *   size: 'lg',
 *   color: 'violet',
 *   showLabel: true,
 *   glowIntensity: 'medium',
 * };
 * ```
 */
export interface CircularProgressGlassProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof circularProgressVariants> {
  /**
   * Progress value (0-100) for determinate variant.
   * Values outside this range are clamped automatically.
   *
   * @default 0
   * @example
   * ```tsx
   * <CircularProgressGlass value={65} />
   * ```
   */
  readonly value?: number;

  /**
   * Variant type.
   * - `determinate`: Shows specific progress from 0-100%
   * - `indeterminate`: Spinning animation for unknown duration
   *
   * @default 'determinate'
   * @example
   * ```tsx
   * <CircularProgressGlass variant="indeterminate" />
   * ```
   */
  readonly variant?: 'determinate' | 'indeterminate';

  /**
   * Stroke width in pixels for the progress circle.
   *
   * @default 8
   * @example
   * ```tsx
   * <CircularProgressGlass thickness={12} />
   * ```
   */
  readonly thickness?: number;

  /**
   * Background track width in pixels.
   *
   * @default 8
   * @example
   * ```tsx
   * <CircularProgressGlass trackWidth={10} />
   * ```
   */
  readonly trackWidth?: number;

  /**
   * Progress color gradient.
   *
   * @default 'violet'
   * @example
   * ```tsx
   * <CircularProgressGlass color="emerald" />
   * ```
   */
  readonly color?: CircularProgressGradient;

  /**
   * Track color (background circle).
   *
   * @default 'oklch(100% 0 0 / 0.1)'
   * @example
   * ```tsx
   * <CircularProgressGlass trackColor="oklch(0% 0 0 / 0.2)" />
   * ```
   */
  readonly trackColor?: string;

  /**
   * Show percentage label in center.
   *
   * @default true
   * @example
   * ```tsx
   * <CircularProgressGlass showLabel={false} />
   * ```
   */
  readonly showLabel?: boolean;

  /**
   * Custom label text (overrides percentage).
   *
   * @default undefined (shows percentage if showLabel is true)
   * @example
   * ```tsx
   * <CircularProgressGlass label="Loading..." />
   * ```
   */
  readonly label?: string;

  /**
   * Custom color for the center label text.
   *
   * @default undefined (uses gradient 'to' color)
   * @example
   * ```tsx
   * <CircularProgressGlass labelColor="oklch(100% 0 0)" />
   * ```
   */
  readonly labelColor?: string;

  /**
   * Show glow effect using SVG filters.
   *
   * @default true
   * @example
   * ```tsx
   * <CircularProgressGlass showGlow={false} />
   * ```
   */
  readonly showGlow?: boolean;

  /**
   * Glow intensity level.
   *
   * @default 'medium'
   * @example
   * ```tsx
   * <CircularProgressGlass glowIntensity="high" />
   * ```
   */
  readonly glowIntensity?: 'low' | 'medium' | 'high';

  /**
   * Stroke linecap style.
   *
   * @default 'round'
   * @example
   * ```tsx
   * <CircularProgressGlass strokeLinecap="butt" />
   * ```
   */
  readonly strokeLinecap?: 'round' | 'butt' | 'square';

  /**
   * Animation duration in seconds for value transitions.
   *
   * @default 1
   * @example
   * ```tsx
   * <CircularProgressGlass animationDuration={0.5} />
   * ```
   */
  readonly animationDuration?: number;
}

// ========================================
// HELPERS
// ========================================

const getGradientColors = (gradient: CircularProgressGradient) => {
  const gradients: Record<CircularProgressGradient, { from: string; to: string; glowVar: string }> =
    {
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
      trackColor = 'oklch(100% 0 0 / 0.1)',
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
      <div
        ref={ref}
        data-slot="circular-progress"
        className={cn(circularProgressVariants({ size }), className)}
        {...props}
      >
        <svg
          width={svgSize}
          height={svgSize}
          className="transform -rotate-90 overflow-visible"
          aria-hidden="true"
          style={{ overflow: 'visible' }}
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
                <feGaussianBlur
                  stdDeviation={getGlowStdDeviation(glowIntensity)}
                  result="coloredBlur"
                />
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
              style={{ color: labelColor || gradientColors.to }}
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
          aria-label={
            label || (variant === 'determinate' ? `Progress: ${clampedValue}%` : 'Loading progress')
          }
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
