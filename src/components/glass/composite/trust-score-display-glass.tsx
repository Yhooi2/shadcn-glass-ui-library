/**
 * TrustScoreDisplayGlass Component
 *
 * Large animated trust score display with gradient text and pulsing animation.
 * Extracted from TrustScoreCardGlass for reusability across layouts.
 *
 * ## Features
 * - Large animated score number with gradient background
 * - 3 size variants (sm, md, lg) with responsive text scales
 * - Optional Target icon with accent color
 * - Score/maxScore ratio format (e.g., "85 / 100")
 * - Customizable title (default: "Overall Trust Score")
 * - Theme-aware text colors (primary, accent, muted)
 * - Pulsing animation (2s cycle, ease-in-out)
 * - Centered horizontal layout with space-between alignment
 *
 * ## CSS Variables
 * Uses theme text color variables (no component-specific variables):
 * - `--text-primary` - Title text color
 * - `--text-accent` - Target icon color
 * - `--text-muted` - Max score text color
 * - `--score-gradient` - Gradient background for score number
 *
 * @example Basic usage
 * ```tsx
 * import { TrustScoreDisplayGlass } from 'shadcn-glass-ui'
 *
 * function TrustDashboard() {
 *   return (
 *     <TrustScoreDisplayGlass score={85} />
 *   )
 * }
 * ```
 *
 * @example With custom title and max score
 * ```tsx
 * <TrustScoreDisplayGlass
 *   score={92}
 *   maxScore={100}
 *   title="Security Score"
 *   size="lg"
 * />
 * ```
 *
 * @example Small size without icon
 * ```tsx
 * <TrustScoreDisplayGlass
 *   score={78}
 *   size="sm"
 *   showIcon={false}
 * />
 * ```
 *
 * @example Large size with custom styling
 * ```tsx
 * <TrustScoreDisplayGlass
 *   score={95}
 *   maxScore={120}
 *   title="Performance Score"
 *   size="lg"
 *   className="mb-6"
 * />
 * ```
 *
 * @accessibility
 * - Score uses `bg-clip-text` with transparent text for gradient effect
 * - High contrast ratio maintained via CSS variable colors
 * - Target icon is decorative (no aria-label needed)
 * - Semantic `<h2>` element for title (adjust as needed for heading hierarchy)
 * - Animation respects system motion preferences when configured
 *
 * @since v1.0.0
 */

import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

/**
 * Props for TrustScoreDisplayGlass component.
 *
 * Extends standard div attributes with score display-specific props.
 *
 * @example
 * ```tsx
 * const props: TrustScoreDisplayGlassProps = {
 *   score: 85,
 *   maxScore: 100,
 *   title: 'Overall Trust Score',
 *   size: 'lg',
 *   showIcon: true,
 * };
 * ```
 */
export interface TrustScoreDisplayGlassProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Current score value.
   *
   * Typically in range 0-100, but can be any positive number.
   * Displayed with gradient background and pulsing animation.
   *
   * @example
   * ```tsx
   * <TrustScoreDisplayGlass score={85} />
   * <TrustScoreDisplayGlass score={92} maxScore={120} />
   * ```
   */
  readonly score: number;

  /**
   * Maximum possible score.
   *
   * Displayed after a slash (e.g., "85 / 100").
   * Used to provide context for the score value.
   *
   * @default 100
   *
   * @example
   * ```tsx
   * <TrustScoreDisplayGlass score={85} maxScore={100} />
   * <TrustScoreDisplayGlass score={450} maxScore={500} />
   * ```
   */
  readonly maxScore?: number;

  /**
   * Title text displayed next to the score.
   *
   * Uses semantic `<h2>` element. Adjust heading level as needed
   * for your document hierarchy.
   *
   * @default "Overall Trust Score"
   *
   * @example
   * ```tsx
   * <TrustScoreDisplayGlass score={92} title="Security Score" />
   * <TrustScoreDisplayGlass score={78} title="Code Quality" />
   * ```
   */
  readonly title?: string;

  /**
   * Whether to display the Target icon.
   *
   * Icon appears before the title with accent color.
   *
   * @default true
   *
   * @example
   * ```tsx
   * <TrustScoreDisplayGlass score={85} showIcon={true} />
   * <TrustScoreDisplayGlass score={85} showIcon={false} />
   * ```
   */
  readonly showIcon?: boolean;

  /**
   * Size variant for text scaling.
   *
   * Controls font sizes for title, score, and maxScore:
   * - `sm`: title (base), score (2xl), maxScore (lg), icon (w-4 h-4)
   * - `md`: title (lg), score (4xl), maxScore (xl), icon (w-5 h-5)
   * - `lg`: title (xl), score (5xl), maxScore (2xl), icon (w-6 h-6)
   *
   * @default "md"
   *
   * @example
   * ```tsx
   * <TrustScoreDisplayGlass score={85} size="sm" />
   * <TrustScoreDisplayGlass score={85} size="lg" />
   * ```
   */
  readonly size?: 'sm' | 'md' | 'lg';
}

export const TrustScoreDisplayGlass = forwardRef<HTMLDivElement, TrustScoreDisplayGlassProps>(
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
      <div ref={ref} className={cn('flex items-center justify-between', className)} {...props}>
        <h2
          className={cn('font-semibold flex items-center gap-2', sizes.title)}
          style={titleStyles}
        >
          {showIcon && <Target className={sizes.icon} style={accentStyles} />}
          {title}
        </h2>
        <div className="flex items-center gap-2 animate-[score-pulse_2s_ease-in-out_infinite]">
          <span
            className={cn(sizes.score, 'font-bold bg-clip-text text-transparent')}
            style={{ backgroundImage: 'var(--score-gradient)' }}
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
