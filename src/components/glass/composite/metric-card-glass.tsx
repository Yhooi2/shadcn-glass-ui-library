// ========================================
// METRIC CARD GLASS COMPONENT
// Metric display card with progress, sparkline, and trend
// Domain-specific composite component following shadcn/ui patterns
// ========================================

import { forwardRef, type CSSProperties, type ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
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
 * MetricCardGlass Props
 *
 * Follows shadcn/ui Card pattern with Glass UI extensions.
 * Compatible with AlertGlass, BadgeGlass, ButtonGlass variant system.
 *
 * @example Simple usage (shadcn/ui style)
 * ```tsx
 * <MetricCardGlass
 *   title="Total Revenue"
 *   value="$45,231"
 *   change="+12.5%"
 *   variant="success"
 *   icon={<DollarSign />}
 * />
 * ```
 *
 * @example With progress and sparkline (Glass UI extensions)
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
 */
export interface MetricCardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  // ========================================
  // CORE PROPS (shadcn/ui compatible)
  // ========================================

  /** Metric title (shadcn/ui Card: title) */
  readonly title: string;

  /** Display value (shadcn/ui Card: value) */
  readonly value: string | number;

  /** Optional description/subtitle (shadcn/ui Card: description) */
  readonly description?: string;

  /** Change indicator (shadcn/ui: change). Can be string "+12.5%" or detailed object */
  readonly change?: string | number | MetricChange;

  /** Semantic variant (follows AlertGlass, BadgeGlass pattern) */
  readonly variant?: MetricVariant;

  /** Icon to display */
  readonly icon?: ReactNode;

  // ========================================
  // GLASS UI EXTENSIONS
  // ========================================

  /** Data for sparkline visualization */
  readonly sparklineData?: readonly number[];

  /** Show sparkline chart */
  readonly showSparkline?: boolean;

  /** Show progress bar (requires progress prop) */
  readonly showProgress?: boolean;

  /** Progress percentage (0-100, separate from display value) */
  readonly progress?: number;

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

/** @deprecated Use variantToGradient instead */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colorToGradient: Record<MetricColor, ProgressGradient> = {
  emerald: 'emerald',
  amber: 'amber',
  blue: 'blue',
  red: 'rose',
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
    const displayValue =
      typeof value === 'number' && valueFormatter ? valueFormatter(value) : String(value);
    if (valueFormatter) {
      console.warn(
        '[MetricCardGlass] Deprecated prop `valueFormatter` used. Please format value before passing. Will be removed in v2.0'
      );
    }

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
          <span
            className="font-bold text-lg sm:text-xl md:text-2xl whitespace-nowrap"
            style={valueStyles}
          >
            {displayValue}
          </span>
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
