/**
 * MetricCardGlass Component
 *
 * Rich metric display card with progress bars, sparklines, and trend indicators.
 * Follows shadcn/ui variant system with Glass UI extensions for data visualization.
 *
 * ## Features
 * - 5 semantic variants (default, secondary, success, warning, destructive)
 * - Trend indicators with directional arrows (up/down/neutral)
 * - Optional progress bar with gradient colors matched to variant
 * - Optional sparkline chart for trend visualization
 * - Flexible change display (string, number, or detailed MetricChange object)
 * - Score ratio display (e.g., "85/100") via maxScore prop
 * - Optional explain button with HelpCircle icon
 * - Hover lift effect via InteractiveCard primitive
 * - Responsive sizing (sm, md, lg text scales)
 * - Theme-aware with per-variant CSS variables
 *
 * ## CSS Variables
 * Per-variant variables (5 variants × 4 properties = 20 variables):
 * - `--metric-default-bg`, `--metric-default-text`, `--metric-default-border`, `--metric-default-glow`
 * - `--metric-secondary-bg`, `--metric-secondary-text`, `--metric-secondary-border`, `--metric-secondary-glow`
 * - `--metric-success-bg`, `--metric-success-text`, `--metric-success-border`, `--metric-success-glow`
 * - `--metric-warning-bg`, `--metric-warning-text`, `--metric-warning-border`, `--metric-warning-glow`
 * - `--metric-destructive-bg`, `--metric-destructive-text`, `--metric-destructive-border`, `--metric-destructive-glow`
 *
 * @example Basic metric card (shadcn/ui style)
 * ```tsx
 * import { MetricCardGlass } from 'shadcn-glass-ui'
 * import { DollarSign } from 'lucide-react'
 *
 * function Dashboard() {
 *   return (
 *     <MetricCardGlass
 *       title="Total Revenue"
 *       value="$45,231"
 *       change="+12.5%"
 *       variant="success"
 *       icon={<DollarSign className="w-4 h-4" />}
 *     />
 *   )
 * }
 * ```
 *
 * @example With progress bar and sparkline
 * ```tsx
 * <MetricCardGlass
 *   title="Completion Rate"
 *   value="85%"
 *   description="Project milestones"
 *   change={{ value: 5.2, direction: 'up', period: 'vs last month' }}
 *   variant="success"
 *   progress={85}
 *   sparklineData={[70, 75, 78, 80, 82, 84, 85]}
 *   showProgress
 *   showSparkline
 * />
 * ```
 *
 * @example Score ratio display
 * ```tsx
 * <MetricCardGlass
 *   title="Test Coverage"
 *   value={92}
 *   maxScore={100}
 *   description="Unit tests"
 *   variant="success"
 *   progress={92}
 *   showProgress
 * />
 * // Displays: "92/100"
 * ```
 *
 * @example With explain button
 * ```tsx
 * <MetricCardGlass
 *   title="Trust Score"
 *   value="85%"
 *   onExplain={() => setShowExplanationModal(true)}
 *   variant="default"
 * />
 * // Shows HelpCircle icon button next to value
 * ```
 *
 * @accessibility
 * - Trend icons include `aria-hidden="true"` (direction conveyed via text and color)
 * - Explain button has descriptive `aria-label`: "Explain {title} metric"
 * - Sparkline includes `aria-label` with metric title context
 * - High contrast text colors meet WCAG 2.1 AA (4.5:1 ratio)
 * - Trend colors use semantic alert CSS variables for consistency
 *
 * @since v1.0.0
 */

import { forwardRef, type CSSProperties, type ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProgressGlass } from '../specialized/progress-glass';
import { SparklineGlass } from '../specialized/sparkline-glass';
import { InteractiveCard } from '../primitives';
import '@/glass-theme.css';

import type { ProgressGradient } from '@/lib/variants/progress-glass-variants';

// ========================================
// TYPES
// ========================================

/**
 * Metric variant system (following AlertGlass, BadgeGlass pattern)
 * - default: Blue (primary metric)
 * - secondary: Gray (neutral metric)
 * - success: Green (positive metric)
 * - warning: Yellow (caution metric)
 * - destructive: Red (negative metric)
 */
export type MetricVariant =
  | 'default' // shadcn/ui base (blue)
  | 'secondary' // shadcn/ui base (gray)
  | 'success' // Glass UI extension (green)
  | 'warning' // Glass UI extension (yellow)
  | 'destructive'; // shadcn/ui base (red)

/** @deprecated Use MetricVariant instead */
export type MetricColor = 'emerald' | 'amber' | 'blue' | 'red';

export type TrendDirection = 'up' | 'down' | 'neutral';

/**
 * Detailed change object with trend information
 */
export interface MetricChange {
  /** Change value (e.g., 12.5 for +12.5%) */
  readonly value: number;
  /** Trend direction (auto-detected from value if not provided) */
  readonly direction?: TrendDirection;
  /** Optional period label (e.g., "vs last month") */
  readonly period?: string;
}

/** @deprecated Use MetricChange instead */
export interface MetricTrend {
  readonly value: number;
  readonly direction: TrendDirection;
  readonly label?: string;
}

/**
 * Props for MetricCardGlass component.
 *
 * Extends standard div attributes with metric-specific props.
 * Follows shadcn/ui Card pattern with Glass UI extensions for data visualization.
 *
 * @example
 * ```tsx
 * const props: MetricCardGlassProps = {
 *   title: "Active Users",
 *   value: "12,345",
 *   change: { value: 8.2, direction: 'up', period: 'vs last week' },
 *   variant: "success",
 *   progress: 75,
 *   showProgress: true,
 * };
 * ```
 */
export interface MetricCardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  // ========================================
  // CORE PROPS (shadcn/ui compatible)
  // ========================================

  /**
   * Metric title displayed above the value.
   *
   * @example
   * ```tsx
   * <MetricCardGlass title="Total Revenue" value="$45,231" />
   * ```
   */
  readonly title: string;

  /**
   * Primary display value for the metric.
   *
   * Can be a string (e.g., "$45,231") or number (e.g., 85).
   * If `maxScore` is provided, formats as ratio (e.g., "85/100").
   *
   * @example
   * ```tsx
   * <MetricCardGlass title="Revenue" value="$45,231" />
   * <MetricCardGlass title="Score" value={85} maxScore={100} />
   * // Second example displays: "85/100"
   * ```
   */
  readonly value: string | number;

  /**
   * Optional description or subtitle displayed below the title.
   *
   * @example
   * ```tsx
   * <MetricCardGlass
   *   title="Completion Rate"
   *   value="85%"
   *   description="Project milestones"
   * />
   * ```
   */
  readonly description?: string;

  /**
   * Change indicator showing metric trend.
   *
   * Accepts three formats:
   * - String: "+12.5%", "-5.3", etc.
   * - Number: 12.5, -5.3, etc.
   * - MetricChange object: `{ value: 12.5, direction: 'up', period: 'vs last month' }`
   *
   * Direction is auto-detected from value if not explicitly set.
   *
   * @example
   * ```tsx
   * <MetricCardGlass title="Revenue" value="$1M" change="+12.5%" />
   * <MetricCardGlass title="Sales" value="500" change={-5} />
   * <MetricCardGlass
   *   title="Users"
   *   value="1,234"
   *   change={{ value: 8.2, direction: 'up', period: 'vs last week' }}
   * />
   * ```
   */
  readonly change?: string | number | MetricChange;

  /**
   * Semantic variant defining color scheme.
   *
   * Follows shadcn/ui + Glass UI variant system:
   * - `default`: Blue (primary metrics)
   * - `secondary`: Gray (neutral metrics)
   * - `success`: Green (positive metrics)
   * - `warning`: Yellow (caution metrics)
   * - `destructive`: Red (negative metrics)
   *
   * @default "default"
   *
   * @example
   * ```tsx
   * <MetricCardGlass title="Revenue" value="$1M" variant="success" />
   * <MetricCardGlass title="Errors" value="23" variant="destructive" />
   * ```
   */
  readonly variant?: MetricVariant;

  /**
   * Icon displayed next to the title.
   *
   * @example
   * ```tsx
   * import { DollarSign } from 'lucide-react'
   *
   * <MetricCardGlass
   *   title="Revenue"
   *   value="$1M"
   *   icon={<DollarSign className="w-4 h-4" />}
   * />
   * ```
   */
  readonly icon?: ReactNode;

  // ========================================
  // GLASS UI EXTENSIONS
  // ========================================

  /**
   * Data points for sparkline visualization.
   *
   * Array of numeric values rendered as a mini bar chart.
   * Automatically highlights the maximum value.
   *
   * @example
   * ```tsx
   * <MetricCardGlass
   *   title="Daily Sales"
   *   value="$12,345"
   *   sparklineData={[100, 120, 115, 130, 125, 140, 135]}
   *   showSparkline
   * />
   * ```
   */
  readonly sparklineData?: readonly number[];

  /**
   * Whether to display the sparkline chart.
   *
   * Requires `sparklineData` prop to be provided.
   *
   * @default true
   *
   * @example
   * ```tsx
   * <MetricCardGlass
   *   title="Revenue"
   *   value="$1M"
   *   sparklineData={[70, 75, 80, 85, 90]}
   *   showSparkline
   * />
   * ```
   */
  readonly showSparkline?: boolean;

  /**
   * Whether to display the progress bar.
   *
   * Requires `progress` prop to be provided.
   * Progress bar uses gradient colors matched to the variant.
   *
   * @default true
   *
   * @example
   * ```tsx
   * <MetricCardGlass
   *   title="Goal Progress"
   *   value="75%"
   *   progress={75}
   *   showProgress
   *   variant="success"
   * />
   * ```
   */
  readonly showProgress?: boolean;

  /**
   * Progress percentage for the progress bar.
   *
   * Value between 0 and 100. If not provided, the component attempts
   * to infer from `value` prop if it's a number in range 0-100.
   *
   * @example
   * ```tsx
   * <MetricCardGlass
   *   title="Completion"
   *   value="85%"
   *   progress={85}
   *   showProgress
   * />
   * ```
   */
  readonly progress?: number;

  // ========================================
  // SCORE DISPLAY (Issue #15)
  // ========================================

  /**
   * Max score for ratio display
   *
   * When provided, formats the value as a ratio (e.g., "85/100").
   * Useful for displaying scores, completion rates, or progress out of a maximum value.
   *
   * @example
   * ```tsx
   * <MetricCardGlass
   *   title="Test Score"
   *   value={85}
   *   maxScore={100}
   * />
   * // Displays: "85/100"
   * ```
   */
  readonly maxScore?: number;

  /**
   * Callback when explain button is clicked
   *
   * Enables an interactive "explain" button (HelpCircle icon) next to the metric value.
   * Use to show tooltips, modals, or contextual help about the metric's meaning.
   * The button includes an accessible aria-label: "Explain {title} metric"
   *
   * @example
   * ```tsx
   * <MetricCardGlass
   *   title="Trust Score"
   *   value="85%"
   *   onExplain={() => setShowExplanationModal(true)}
   * />
   * ```
   */
  readonly onExplain?: () => void;

  /**
   * Control explain button visibility
   *
   * Defaults to `true` if `onExplain` is provided. Set to `false` to hide the button
   * even when `onExplain` callback exists.
   *
   * @default true (when onExplain is provided)
   *
   * @example
   * ```tsx
   * // Conditionally show explain button
   * <MetricCardGlass
   *   title="Metric"
   *   value="50%"
   *   onExplain={handleExplain}
   *   showExplain={userHasPermission}
   * />
   * ```
   */
  readonly showExplain?: boolean;

  // ========================================
  // DEPRECATED (backward compatibility)
  // ========================================

  /** @deprecated Use `title` instead. Will be removed in v2.0 */
  readonly label?: string;

  /** @deprecated Use `variant` instead. Mapping: emerald→success, amber→warning, blue→default, red→destructive. Will be removed in v2.0 */
  readonly color?: MetricColor;

  /** @deprecated Format value before passing. Use `value` prop directly. Will be removed in v2.0 */
  readonly valueFormatter?: (value: number) => string;

  /** @deprecated Use `description` instead. Will be removed in v2.0 */
  readonly valueSuffix?: string;

  /** @deprecated Use `change` instead. Will be removed in v2.0 */
  readonly trend?: MetricTrend;
}

// ========================================
// VARIANT SYSTEM (following AlertGlass, BadgeGlass pattern)
// ========================================

type VariantStyle = { bg: string; text: string; border: string; glow: string };

// New variant-based system (shadcn/ui compatible)
const variantStyles: Record<MetricVariant, VariantStyle> = {
  default: {
    bg: 'var(--metric-default-bg)',
    text: 'var(--metric-default-text)',
    border: 'var(--metric-default-border)',
    glow: 'var(--metric-default-glow)',
  },
  secondary: {
    bg: 'var(--metric-secondary-bg)',
    text: 'var(--metric-secondary-text)',
    border: 'var(--metric-secondary-border)',
    glow: 'var(--metric-secondary-glow)',
  },
  success: {
    bg: 'var(--metric-success-bg)',
    text: 'var(--metric-success-text)',
    border: 'var(--metric-success-border)',
    glow: 'var(--metric-success-glow)',
  },
  warning: {
    bg: 'var(--metric-warning-bg)',
    text: 'var(--metric-warning-text)',
    border: 'var(--metric-warning-border)',
    glow: 'var(--metric-warning-glow)',
  },
  destructive: {
    bg: 'var(--metric-destructive-bg)',
    text: 'var(--metric-destructive-text)',
    border: 'var(--metric-destructive-border)',
    glow: 'var(--metric-destructive-glow)',
  },
};

// Map MetricVariant to ProgressGradient
const variantToGradient: Record<MetricVariant, ProgressGradient> = {
  default: 'blue',
  secondary: 'cyan',
  success: 'emerald',
  warning: 'amber',
  destructive: 'rose',
};

// ========================================
// DEPRECATED: Old color system (backward compatibility)
// ========================================

/** @deprecated Use variantStyles instead */
const colorToVariant: Record<MetricColor, MetricVariant> = {
  emerald: 'success',
  amber: 'warning',
  blue: 'default',
  red: 'destructive',
};

// Trend direction colors - using existing alert CSS variables
const trendColors: Record<TrendDirection, string> = {
  up: 'text-[var(--alert-success-text)]',
  down: 'text-[var(--alert-destructive-text)]',
  neutral: 'text-[var(--text-muted)]',
};

// Trend icons
const TrendIcons: Record<TrendDirection, typeof TrendingUp> = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

// ========================================
// COMPONENT
// ========================================

export const MetricCardGlass = forwardRef<HTMLDivElement, MetricCardGlassProps>(
  (
    {
      // New API
      title,
      value,
      description,
      change,
      variant,
      progress,
      // Deprecated API (backward compatibility)
      label,
      color,
      valueFormatter,
      valueSuffix,
      trend,
      // Score display (Issue #15)
      maxScore,
      onExplain,
      showExplain,
      // Common props
      icon,
      sparklineData,
      showSparkline = true,
      showProgress = true,
      className,
      ...props
    },
    ref
  ) => {
    // ========================================
    // BACKWARD COMPATIBILITY LAYER
    // ========================================

    // Support old `label` prop
    const actualTitle = title || label;
    if (!actualTitle) {
      console.warn('[MetricCardGlass] Missing required prop: `title` (or deprecated `label`)');
    }
    if (label && !title) {
      console.warn(
        '[MetricCardGlass] Deprecated prop `label` used. Please use `title` instead. Will be removed in v2.0'
      );
    }

    // Support old `color` prop → `variant`
    const actualVariant: MetricVariant = variant || (color ? colorToVariant[color] : 'default');
    if (color && !variant) {
      console.warn(
        `[MetricCardGlass] Deprecated prop \`color="${color}"\` used. Please use \`variant="${colorToVariant[color]}"\` instead. Will be removed in v2.0`
      );
    }

    // Support old `valueSuffix` → `description`
    const actualDescription = description || valueSuffix;
    if (valueSuffix && !description) {
      console.warn(
        '[MetricCardGlass] Deprecated prop `valueSuffix` used. Please use `description` instead. Will be removed in v2.0'
      );
    }

    // Support old `trend` → `change`
    const actualChange =
      change ||
      (trend
        ? {
            value: trend.value,
            direction: trend.direction,
            period: trend.label,
          }
        : undefined);
    if (trend && !change) {
      console.warn(
        '[MetricCardGlass] Deprecated prop `trend` used. Please use `change` instead. Will be removed in v2.0'
      );
    }

    // Support old `valueFormatter`
    let displayValue =
      typeof value === 'number' && valueFormatter ? valueFormatter(value) : String(value);
    if (valueFormatter) {
      console.warn(
        '[MetricCardGlass] Deprecated prop `valueFormatter` used. Please format value before passing. Will be removed in v2.0'
      );
    }

    // Format as ratio if maxScore is provided (e.g., "85/100")
    if (maxScore !== undefined) {
      displayValue = `${displayValue}/${maxScore}`;
    }

    // Determine if explain button should be shown
    const shouldShowExplain = showExplain ?? onExplain !== undefined;

    // Get actual progress value (use prop or infer from value if it's 0-100)
    const actualProgress =
      progress ?? (typeof value === 'number' && value >= 0 && value <= 100 ? value : undefined);

    // ========================================
    // COMPONENT LOGIC
    // ========================================

    const variantVars = variantStyles[actualVariant];
    const hasSparkline = showSparkline && sparklineData && sparklineData.length > 0;

    const valueStyles: CSSProperties = {
      color: variantVars.text,
      textShadow: variantVars.glow,
    };

    // Parse and render change indicator
    const renderChange = () => {
      if (!actualChange) return null;

      // Handle simple string or number
      if (typeof actualChange === 'string' || typeof actualChange === 'number') {
        const changeStr = String(actualChange);
        const isPositive =
          changeStr.startsWith('+') || (!changeStr.startsWith('-') && parseFloat(changeStr) > 0);
        const isNegative = changeStr.startsWith('-') || parseFloat(changeStr) < 0;
        const direction: TrendDirection = isPositive ? 'up' : isNegative ? 'down' : 'neutral';
        const TrendIcon = TrendIcons[direction];

        return (
          <div className={cn('flex items-center gap-1 text-xs', trendColors[direction])}>
            <TrendIcon className="w-3 h-3" aria-hidden="true" />
            <span className="font-medium">{changeStr}</span>
          </div>
        );
      }

      // Handle detailed MetricChange object
      const changeValue = actualChange.value;
      const direction =
        actualChange.direction || (changeValue > 0 ? 'up' : changeValue < 0 ? 'down' : 'neutral');
      const TrendIcon = TrendIcons[direction];
      const displayChange = direction === 'down' ? `-${Math.abs(changeValue)}` : `+${changeValue}`;

      return (
        <div className={cn('flex items-center gap-1 text-xs', trendColors[direction])}>
          <TrendIcon className="w-3 h-3" aria-hidden="true" />
          <span className="font-medium">{displayChange}%</span>
          {actualChange.period && (
            <span className="text-[var(--text-muted)] ml-0.5">{actualChange.period}</span>
          )}
        </div>
      );
    };

    return (
      <InteractiveCard
        ref={ref}
        baseBg={variantVars.bg}
        borderColor={variantVars.border}
        hoverGlow={variantVars.glow}
        hoverLift
        blur="sm"
        rounded="rounded-xl"
        className={cn('p-3 md:p-4', className)}
        {...props}
      >
        {/* Header with icon and change indicator */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {icon && (
              <div className="text-(--text-muted)" aria-hidden="true">
                {icon}
              </div>
            )}
            <span className="text-(length:--font-size-2xs) sm:text-xs md:text-sm font-medium truncate text-(--text-secondary)">
              {actualTitle}
            </span>
          </div>
          {renderChange()}
        </div>

        {/* Value display */}
        <div className="flex flex-col items-center mb-2 md:mb-3 gap-1">
          <div className="flex items-center gap-2">
            <span
              className="font-bold text-lg sm:text-xl md:text-2xl whitespace-nowrap"
              style={valueStyles}
            >
              {displayValue}
            </span>
            {shouldShowExplain && onExplain && (
              <button
                type="button"
                onClick={onExplain}
                className="p-1 rounded-md text-(--text-muted) hover:text-(--text-secondary) hover:bg-(--glass-bg-hover) transition-colors"
                aria-label={`Explain ${actualTitle} metric`}
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            )}
          </div>
          {actualDescription && (
            <span className="text-(length:--font-size-2xs) text-(--text-muted)">
              {actualDescription}
            </span>
          )}
        </div>

        {/* Progress and Sparkline */}
        {hasSparkline ? (
          <div className="space-y-2">
            {showProgress && actualProgress !== undefined && (
              <ProgressGlass
                value={actualProgress}
                gradient={variantToGradient[actualVariant]}
                size="sm"
              />
            )}
            <SparklineGlass
              data={sparklineData}
              height="sm"
              gap="sm"
              className="w-full"
              barColor={variantVars.text}
              highlightMax
              aria-label={`${actualTitle} trend`}
            />
          </div>
        ) : showProgress && actualProgress !== undefined ? (
          <ProgressGlass
            value={actualProgress}
            gradient={variantToGradient[actualVariant]}
            size="sm"
          />
        ) : null}
      </InteractiveCard>
    );
  }
);

MetricCardGlass.displayName = 'MetricCardGlass';
