// ========================================
// CIRCULAR METRIC GLASS COMPONENT
// Compact circular metric display for mobile
// ========================================

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import {
  CircularProgressGlass,
  type CircularProgressGradient,
} from '../ui/circular-progress-glass';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type CircularMetricColor = 'emerald' | 'amber' | 'blue' | 'red';

export interface CircularMetricGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Metric label (e.g., "Reg", "Imp") */
  readonly label: string;
  /** Metric value (0-100) */
  readonly value: number;
  /** Metric color */
  readonly color?: CircularMetricColor;
  /** Size variant */
  readonly size?: 'sm' | 'md';
}

// ========================================
// HELPERS
// ========================================

// Map CircularMetricColor to CircularProgressGlass gradient and CSS variable
const colorMap: Record<
  CircularMetricColor,
  { gradient: CircularProgressGradient; textVar: string }
> = {
  emerald: { gradient: 'emerald', textVar: 'var(--metric-success-text)' },
  amber: { gradient: 'amber', textVar: 'var(--metric-warning-text)' },
  blue: { gradient: 'blue', textVar: 'var(--metric-default-text)' },
  red: { gradient: 'rose', textVar: 'var(--metric-destructive-text)' },
};

// ========================================
// COMPONENT
// ========================================

/**
 * CircularMetricGlass - Compact circular progress metric display
 *
 * Designed for mobile layouts where rectangular MetricCardGlass is too wide.
 * Shows a circular progress indicator with percentage inside and label below.
 *
 * @example
 * ```tsx
 * <CircularMetricGlass label="Reg" value={84} color="emerald" />
 * ```
 */
export const CircularMetricGlass = forwardRef<HTMLDivElement, CircularMetricGlassProps>(
  ({ label, value, color = 'blue', size = 'sm', className, ...props }, ref) => {
    const { gradient, textVar } = colorMap[color];

    return (
      <div ref={ref} className={cn('flex flex-col items-center gap-1', className)} {...props}>
        <CircularProgressGlass
          value={value}
          size={size}
          color={gradient}
          labelColor={textVar}
          thickness={size === 'sm' ? 6 : 8}
          showGlow
          glowIntensity="medium"
        />
        <span className="text-xs font-medium" style={{ color: textVar }}>
          {label}
        </span>
      </div>
    );
  }
);

CircularMetricGlass.displayName = 'CircularMetricGlass';
