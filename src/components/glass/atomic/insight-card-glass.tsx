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

export interface InsightCardGlassProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
    VariantProps<typeof insightCardVariants> {
  /** Emoji icon for the insight */
  readonly emoji?: string;
  /** Main insight text */
  readonly text: string;
  /** Additional details */
  readonly detail?: string;
  /** Insight type variant */
  readonly variant?: InsightVariant;
  /** Inline display mode */
  readonly inline?: boolean;
  /** Click handler (makes the insight clickable) */
  readonly onClick?: () => void;
  /** Show arrow indicator */
  readonly showArrow?: boolean;
  /** Fade-in animation */
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
