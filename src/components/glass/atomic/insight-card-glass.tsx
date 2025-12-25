/**
 * InsightCardGlass Component
 *
 * Versatile insight display component with emoji icons, text, and optional interactivity.
 * Supports 7 semantic variants with distinct styling and multiple display modes for dashboards,
 * analytics, and feedback interfaces.
 *
 * ## Features
 * - **7 Semantic Variants:** default, tip, highlight, warning, stat, growth, decline
 * - **2 Display Modes:** card (default) with glass surface, or inline for text integration
 * - **Emoji Icons:** Default emojis per variant (customizable via `emoji` prop)
 * - **Clickable Mode:** Optional `onClick` handler with hover glow effect
 * - **Arrow Indicator:** Optional chevron icon for clickable insights
 * - **Fade-In Animation:** Optional entrance animation via `animated` prop
 * - **Detail Text:** Optional secondary text line for additional context
 * - **Keyboard Accessible:** Space/Enter key support when clickable
 * - **Theme-Aware:** Variant-specific border colors and glow effects
 * - **CVA Variants:** Type-safe variant system with automatic styling
 *
 * ## CSS Variables
 * Defined per variant in `insight-card-glass-variants.ts`:
 *
 * ### Shared Variables
 * - `--glass-bg-subtle` - Card background (non-inline mode)
 * - `--glass-bg` - Hover background for clickable cards
 * - `--text-primary` - Main text color
 * - `--text-secondary` - Inline text color
 * - `--text-muted` - Detail text and arrow icon color
 *
 * ### Variant-Specific Variables
 * Each variant has unique border and glow variables:
 *
 * - **default:** `--glass-border`, `--glow-primary`
 * - **tip:** `--alert-default-border`, `--glow-secondary`
 * - **highlight:** `--alert-success-border`, `--glow-success`
 * - **warning:** `--alert-warning-border`, `--glow-warning`
 * - **stat:** `--glass-border`, no glow
 * - **growth:** `--alert-success-border`, `--glow-success`
 * - **decline:** `--alert-destructive-border`, `--glow-error`
 *
 * @example Basic usage
 * ```tsx
 * import { InsightCardGlass } from 'shadcn-glass-ui'
 *
 * function Dashboard() {
 *   return (
 *     <InsightCardGlass
 *       variant="tip"
 *       text="Your code quality has improved this month"
 *       detail="Based on 45 merged PRs"
 *     />
 *   )
 * }
 * ```
 *
 * @example Clickable insight with arrow
 * ```tsx
 * <InsightCardGlass
 *   variant="highlight"
 *   text="New achievements unlocked!"
 *   detail="View all 3 achievements"
 *   onClick={() => navigate('/achievements')}
 *   showArrow={true}
 * />
 * ```
 *
 * @example Inline mode
 * ```tsx
 * <p>
 *   Your profile is complete{' '}
 *   <InsightCardGlass
 *     variant="growth"
 *     text="100% completion"
 *     inline={true}
 *   />
 * </p>
 * ```
 *
 * @example Custom emoji with animation
 * ```tsx
 * <InsightCardGlass
 *   variant="warning"
 *   emoji="🚨"
 *   text="Action required: Update your billing information"
 *   animated={true}
 * />
 * ```
 *
 * @example All 7 variants
 * ```tsx
 * <InsightCardGlass variant="default" text="General insight" />
 * <InsightCardGlass variant="tip" text="Pro tip for better results" />
 * <InsightCardGlass variant="highlight" text="Key achievement unlocked" />
 * <InsightCardGlass variant="warning" text="Potential issue detected" />
 * <InsightCardGlass variant="stat" text="Statistical observation" />
 * <InsightCardGlass variant="growth" text="Positive trend detected" />
 * <InsightCardGlass variant="decline" text="Metric decreased" />
 * ```
 *
 * @accessibility
 * - Uses `role="button"` when clickable with `tabIndex={0}`
 * - Keyboard support (Space/Enter) for clickable insights
 * - Emoji icons marked `aria-hidden="true"` (decorative)
 * - Arrow icon marked `aria-hidden="true"` (visual indicator only)
 * - Semantic `<div>` for card mode, `<span>` for inline mode
 * - Focus states automatically applied when clickable
 * - WCAG 2.1 AA compliant color contrast for all variants
 *
 * @since v1.0.0
 */

import { forwardRef, type CSSProperties, type KeyboardEvent } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  insightCardVariants,
  insightVariantConfig,
  type InsightVariant,
} from '@/lib/variants/insight-card-glass-variants';
import '@/glass-theme.css';

/**
 * Props for InsightCardGlass component.
 *
 * Extends standard div attributes (excluding `style` which is used internally for
 * variant-specific border and glow effects) and includes CVA variants.
 *
 * @example
 * ```tsx
 * const props: InsightCardGlassProps = {
 *   variant: 'tip',
 *   emoji: '💡',
 *   text: 'Pro tip for better results',
 *   detail: 'Based on best practices',
 *   inline: false,
 *   onClick: () => console.log('Clicked'),
 *   showArrow: true,
 *   animated: true,
 * }
 * ```
 */
export interface InsightCardGlassProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
    VariantProps<typeof insightCardVariants> {
  /**
   * Emoji icon for the insight.
   *
   * Overrides the default emoji for the variant. Each variant has a default:
   * - default: 💡, tip: 💡, highlight: ✨, warning: ⚠️
   * - stat: 📊, growth: 📈, decline: 📉
   *
   * @example
   * ```tsx
   * <InsightCardGlass emoji="🚨" text="Alert" variant="warning" />
   * <InsightCardGlass emoji="🎉" text="Success" variant="highlight" />
   * ```
   */
  readonly emoji?: string;

  /**
   * Main insight text.
   *
   * Primary message displayed in the insight. Use clear, concise language for
   * maximum impact.
   *
   * @example
   * ```tsx
   * <InsightCardGlass text="Your code quality has improved this month" />
   * ```
   */
  readonly text: string;

  /**
   * Additional details.
   *
   * Optional secondary text line for context or metrics. Displayed in smaller,
   * muted text below the main text.
   *
   * @example
   * ```tsx
   * <InsightCardGlass
   *   text="Your code quality has improved"
   *   detail="Based on 45 merged PRs"
   * />
   * ```
   */
  readonly detail?: string;

  /**
   * Insight type variant.
   *
   * One of 7 semantic variants with distinct styling:
   * - `default`: General insights (blue glow)
   * - `tip`: Helpful tips (secondary glow)
   * - `highlight`: Achievements, success (green glow)
   * - `warning`: Alerts, cautions (orange/yellow glow)
   * - `stat`: Statistical observations (no glow)
   * - `growth`: Positive trends (green glow)
   * - `decline`: Negative trends (red glow)
   *
   * @default 'default'
   *
   * @example
   * ```tsx
   * <InsightCardGlass variant="tip" text="Enable 2FA for security" />
   * <InsightCardGlass variant="growth" text="Traffic up 25%" />
   * ```
   */
  readonly variant?: InsightVariant;

  /**
   * Inline display mode.
   *
   * - `true`: Renders as `<span>` for inline text integration (no glass surface)
   * - `false`: Renders as `<div>` card with glass background and border
   *
   * @default false
   *
   * @example
   * ```tsx
   * <p>
   *   Status: <InsightCardGlass inline text="Active" variant="growth" />
   * </p>
   * ```
   */
  readonly inline?: boolean;

  /**
   * Click handler (makes the insight clickable).
   *
   * When provided, the insight becomes interactive with:
   * - Hover glow effect (variant-specific)
   * - Cursor pointer
   * - Keyboard support (Space/Enter)
   * - `role="button"` and `tabIndex={0}`
   *
   * @example
   * ```tsx
   * <InsightCardGlass
   *   text="View details"
   *   onClick={() => navigate('/details')}
   *   showArrow
   * />
   * ```
   */
  readonly onClick?: () => void;

  /**
   * Show arrow indicator.
   *
   * Displays ChevronRight icon on the right side of the card. Useful for
   * indicating clickable insights that navigate to another view.
   *
   * @default false
   *
   * @example
   * ```tsx
   * <InsightCardGlass
   *   text="See all achievements"
   *   onClick={handleClick}
   *   showArrow={true}
   * />
   * ```
   */
  readonly showArrow?: boolean;

  /**
   * Fade-in animation.
   *
   * Applies `animate-insight-fade-in` CSS animation for entrance effect.
   * Useful for insights that appear dynamically (e.g., after data load).
   *
   * @default false
   *
   * @example
   * ```tsx
   * <InsightCardGlass
   *   text="New data available"
   *   animated={dataJustLoaded}
   * />
   * ```
   */
  readonly animated?: boolean;
}

export const InsightCardGlass = forwardRef<HTMLDivElement, InsightCardGlassProps>(
  (
    {
      emoji,
      text,
      detail,
      variant = 'default',
      inline = false,
      onClick,
      showArrow = false,
      animated = false,
      className,
      ...props
    },
    ref
  ) => {
    const config = insightVariantConfig[variant];
    const displayEmoji = emoji ?? config.defaultEmoji;
    const isClickable = !!onClick;

    const handleClick = () => onClick?.();

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.();
      }
    };

    const borderStyle: CSSProperties = !inline
      ? {
          borderColor: `var(${config.borderVar})`,
        }
      : {};

    const glowStyle: CSSProperties =
      isClickable && config.glowVar
        ? ({
            '--hover-glow': `var(${config.glowVar})`,
          } as CSSProperties)
        : {};

    // Inline variant
    if (inline) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn(
            'inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)]',
            className
          )}
          {...props}
        >
          <span aria-hidden="true">{displayEmoji}</span>
          <span>{text}</span>
          {detail && <span className="text-[var(--text-muted)]">({detail})</span>}
        </span>
      );
    }

    // Card variant
    return (
      <div
        ref={ref}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={isClickable ? handleClick : undefined}
        onKeyDown={isClickable ? handleKeyDown : undefined}
        className={cn(
          insightCardVariants({ inline, clickable: isClickable }),
          isClickable && config.glowVar && 'hover:shadow-[0_0_12px_var(--hover-glow)]',
          animated && 'animate-insight-fade-in',
          className
        )}
        style={{ ...borderStyle, ...glowStyle }}
        {...props}
      >
        <div className="flex items-start gap-2">
          <span className="text-lg flex-shrink-0" aria-hidden="true">
            {displayEmoji}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[var(--text-primary)]">{text}</p>
            {detail && <p className="text-xs text-[var(--text-muted)] mt-0.5">{detail}</p>}
          </div>
          {showArrow && (
            <ChevronRight
              className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    );
  }
);

InsightCardGlass.displayName = 'InsightCardGlass';
