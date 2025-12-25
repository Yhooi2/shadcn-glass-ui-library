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

/**
 * Props for CircularMetricGlass component.
 *
 * Extends standard div attributes for maximum flexibility.
 * All props are readonly to ensure immutability.
 *
 * @example
 * ```tsx
 * const props: CircularMetricGlassProps = {
 *   label: 'Reg',
 *   value: 84,
 *   color: 'emerald',
 *   size: 'sm',
 * };
 * ```
 */
export interface CircularMetricGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Metric label displayed below the circular progress indicator.
   *
   * Typically a short abbreviation (2-6 characters) for mobile-friendly display.
   * Examples: "Reg" (Regression), "Imp" (Impact), "Div" (Diversity), "Collab" (Collaboration).
   */
  readonly label: string;

  /**
   * Metric value as a percentage (0-100).
   *
   * Controls the circular progress fill amount.
   * Displayed as percentage text inside the circle.
   *
   * @example
   * ```tsx
   * <CircularMetricGlass value={84} /> // Shows "84%" at center
   * ```
   */
  readonly value: number;

  /**
   * Color theme for the metric.
   *
   * Maps to semantic color variants:
   * - `emerald`: Success/positive metrics (--metric-success-*)
   * - `amber`: Warning/moderate metrics (--metric-warning-*)
   * - `blue`: Default/neutral metrics (--metric-default-*)
   * - `red`: Destructive/negative metrics (--metric-destructive-*)
   *
   * @default 'blue'
   */
  readonly color?: CircularMetricColor;

  /**
   * Size variant of the circular progress indicator.
   *
   * - `sm`: 80px diameter, 6px thickness (mobile-optimized)
   * - `md`: 112px diameter, 8px thickness (desktop/tablet)
   *
   * @default 'sm'
   */
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
 * CircularMetricGlass Component
 *
 * Compact circular progress metric display optimized for mobile layouts.
 * Combines CircularProgressGlass with a label for space-efficient metric visualization.
 *
 * ## Features
 * - Mobile-optimized circular design (80px-112px diameter)
 * - 4 semantic color variants (emerald, amber, blue, red)
 * - Percentage display inside circular progress ring
 * - Label positioned below for clear identification
 * - Glow effects on progress ring (medium intensity)
 * - 2 size variants (sm: 80px, md: 112px)
 * - Grid-friendly layout (2x2 mobile grids)
 * - Automatic color mapping to semantic CSS variables
 * - Customizable via className for additional styling
 * - Full accessibility support via CircularProgressGlass
 *
 * ## CSS Variables
 * Inherits color variables from semantic token system:
 * - `--metric-success-text` - Emerald variant text color
 * - `--metric-warning-text` - Amber variant text color
 * - `--metric-default-text` - Blue variant text color
 * - `--metric-destructive-text` - Red variant text color
 *
 * @example
 * // Basic usage with default settings
 * <CircularMetricGlass label="Reg" value={84} color="emerald" />
 *
 * @example
 * // Larger size for desktop/tablet
 * <CircularMetricGlass
 *   label="Impact"
 *   value={65}
 *   color="amber"
 *   size="md"
 * />
 *
 * @example
 * // Mobile grid layout (2x2)
 * <div className="grid grid-cols-2 gap-4">
 *   <CircularMetricGlass label="Reg" value={84} color="emerald" />
 *   <CircularMetricGlass label="Imp" value={45} color="amber" />
 *   <CircularMetricGlass label="Div" value={78} color="blue" />
 *   <CircularMetricGlass label="Collab" value={12} color="red" />
 * </div>
 *
 * @example
 * // Custom styling with className
 * <CircularMetricGlass
 *   label="Score"
 *   value={92}
 *   color="blue"
 *   className="opacity-90 hover:scale-105 transition-transform"
 * />
 *
 * @accessibility
 * - Inherits CircularProgressGlass accessibility features (aria-valuenow, aria-valuemin, aria-valuemax)
 * - Label text uses semantic color variables for sufficient contrast
 * - Small text size (12px) with medium font weight for readability
 * - Non-interactive display (no keyboard/focus requirements)
 * - Respects user color preferences via CSS variables
 *
 * @since v1.0.0
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
