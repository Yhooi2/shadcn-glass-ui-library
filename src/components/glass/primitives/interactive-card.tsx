/**
 * InteractiveCard Component
 *
 * Unified wrapper for card components with hover animations and glass effects.
 * Eliminates hover state duplication in MetricCardGlass, YearCardGlass,
 * AICardGlass, RepositoryCardGlass, and other card components.
 *
 * Features:
 * - Hover lift animation (translateY -2px)
 * - Optional glow effects
 * - Glass surface with backdrop blur
 * - Configurable backgrounds and borders
 */

import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';

/**
 * Props for the InteractiveCard component
 */
export interface InteractiveCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Enable hover lift effect (translateY -2px)
   * @default true
   */
  hoverLift?: boolean;

  /**
   * CSS variable for hover glow effect
   * @example 'var(--glow-primary)'
   */
  hoverGlow?: string;

  /**
   * CSS variable for hover background
   * @example 'var(--card-hover-bg)'
   */
  hoverBg?: string;

  /**
   * CSS variable for base background
   * @default 'var(--card-bg)'
   */
  baseBg?: string;

  /**
   * CSS variable for border color
   * @default 'var(--card-border)'
   */
  borderColor?: string;

  /**
   * CSS variable for hover border color
   */
  hoverBorderColor?: string;

  /**
   * Blur level for glass effect
   * @default 'sm'
   */
  blur?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Disable all hover interactions
   * @default false
   */
  disabled?: boolean;

  /**
   * Border radius class
   * @default 'rounded-2xl'
   */
  rounded?: 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl';

  /**
   * Transition speed
   * @default 'var(--transition-slow)'
   */
  transition?: string;
}

/**
 * InteractiveCard component
 *
 * Provides consistent hover animations and glass effects for card components.
 * Replaces ~80 lines of duplicated hover state management across 4+ components.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <InteractiveCard>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </InteractiveCard>
 *
 * // With hover effects
 * <InteractiveCard
 *   hoverLift
 *   hoverGlow="var(--glow-primary)"
 *   hoverBg="var(--card-hover-bg)"
 *   hoverBorderColor="var(--card-hover-border)"
 * >
 *   <MetricContent />
 * </InteractiveCard>
 *
 * // Custom blur and rounding
 * <InteractiveCard
 *   blur="md"
 *   rounded="rounded-3xl"
 *   baseBg="var(--metric-success-bg)"
 * >
 *   <StatusCard />
 * </InteractiveCard>
 * ```
 */
export const InteractiveCard = forwardRef<HTMLDivElement, InteractiveCardProps>(
  (
    {
      hoverLift = true,
      hoverGlow,
      hoverBg,
      baseBg = 'var(--card-bg)',
      borderColor = 'var(--card-border)',
      hoverBorderColor,
      blur = 'sm',
      disabled = false,
      rounded = 'rounded-2xl',
      transition = 'var(--transition-slow)',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { isHovered, hoverProps } = useHover({ includeFocus: !disabled });

    const cardStyles: CSSProperties = {
      // Background
      background: isHovered && hoverBg ? hoverBg : baseBg,

      // Border
      border: `1px solid ${isHovered && hoverBorderColor ? hoverBorderColor : borderColor}`,

      // Glassmorphism
      backdropFilter: `blur(var(--blur-${blur}))`,
      WebkitBackdropFilter: `blur(var(--blur-${blur}))`,

      // Hover transform
      transform: hoverLift && isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',

      // Glow effect
      boxShadow: isHovered && hoverGlow && !disabled ? hoverGlow : 'none',

      // Transition
      transition: `all ${transition}`,

      // User styles override
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(rounded, className)}
        style={cardStyles}
        {...(disabled ? {} : hoverProps)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InteractiveCard.displayName = 'InteractiveCard';
