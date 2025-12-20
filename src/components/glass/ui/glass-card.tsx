/**
 * GlassCard Component
 *
 * Glass-themed container with:
 * - Theme-aware styling (glass/light/aurora)
 * - Configurable blur intensity
 * - Optional glow effects
 * - Hover animations
 */

import { forwardRef, type ReactNode, type CSSProperties } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import { cardIntensity } from '@/lib/variants/glass-card-variants';
import '@/glass-theme.css';

import type { GlowType, IntensityType, PaddingType } from '@/lib/variants/glass-card-variants';

// ========================================
// BLUR MAP
// ========================================
// Per UI_DESIGN.md design tokens:
// - subtle: 8px (--glass-blur-sm) - light glass effect
// - medium: 16px (--glass-blur-md) - standard cards (was 12px - breaking change)
// - strong: 24px (--glass-blur-lg) - featured cards (was 16px - breaking change)

const blurMap: Record<IntensityType, string> = {
  subtle: 'var(--blur-sm)', // 8px
  medium: 'var(--blur-md)', // 16px (BREAKING: was 12px)
  strong: 'var(--blur-lg)', // 24px (BREAKING: was 16px)
};

// ========================================
// PROPS INTERFACE
// ========================================

/**
 * Props for the GlassCard component
 *
 * A glass-themed container with configurable blur, glow effects, and hover animations.
 * Features polymorphic rendering via `asChild` for semantic HTML flexibility.
 *
 * @accessibility
 * - **Keyboard Navigation:** When used with `asChild` as a link/button, inherits native keyboard support (Enter/Space activation)
 * - **Focus Management:** Focus ring applied to child element when using `asChild` pattern with interactive elements
 * - **Screen Readers:** Semantic HTML preserved via `asChild` - use appropriate elements (`<a>`, `<button>`, `<article>`)
 * - **Hover State:** Hover effects are purely visual and do not affect functionality (progressive enhancement)
 * - **Touch Targets:** When interactive, ensure child element meets minimum 44x44px touch target (WCAG 2.5.5)
 * - **Color Contrast:** Card border and background meet WCAG AA contrast requirements, content contrast is consumer's responsibility
 * - **Motion:** Hover scale animation respects `prefers-reduced-motion` settings via CSS transitions
 *
 * @example
 * ```tsx
 * // Basic card
 * <GlassCard intensity="medium">Content</GlassCard>
 *
 * // As a clickable link with accessible name
 * <GlassCard asChild intensity="medium">
 *   <a href="/details" aria-label="View product details">
 *     <h3>Product Title</h3>
 *     <p>Description</p>
 *   </a>
 * </GlassCard>
 *
 * // Different intensity levels
 * <GlassCard intensity="subtle">Subtle blur</GlassCard>
 * <GlassCard intensity="medium">Standard blur</GlassCard>
 * <GlassCard intensity="strong">Heavy blur</GlassCard>
 *
 * // With glow effects
 * <GlassCard glow="blue">Blue glow card</GlassCard>
 * <GlassCard glow="violet">Violet glow card</GlassCard>
 * <GlassCard glow="cyan">Cyan glow card</GlassCard>
 *
 * // As a button (interactive) with role
 * <GlassCard asChild hover intensity="medium">
 *   <button onClick={handleClick} aria-label="Open settings">
 *     <Settings className="w-6 h-6" />
 *     <span>Settings</span>
 *   </button>
 * </GlassCard>
 *
 * // Article card with semantic HTML
 * <GlassCard asChild intensity="medium" padding="lg">
 *   <article>
 *     <header><h2>Article Title</h2></header>
 *     <p>Article content...</p>
 *     <footer>Published: Jan 1, 2025</footer>
 *   </article>
 * </GlassCard>
 * ```
 */
export interface GlassCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>, VariantProps<typeof cardIntensity> {
  /**
   * Render as child element instead of div (polymorphic rendering).
   * Useful for making cards clickable links or custom interactive elements.
   * @default false
   * @example
   * ```tsx
   * <GlassCard asChild>
   *   <a href="/article">Article Content</a>
   * </GlassCard>
   * ```
   */
  readonly asChild?: boolean;

  readonly children: ReactNode;
  readonly glow?: GlowType;
  readonly padding?: PaddingType;
}

// ========================================
// COMPONENT
// ========================================

// CSS variable maps for intensity
const bgVarMap: Record<IntensityType, string> = {
  subtle: 'var(--card-subtle-bg)',
  medium: 'var(--card-medium-bg)',
  strong: 'var(--card-strong-bg)',
};

const borderVarMap: Record<IntensityType, string> = {
  subtle: 'var(--card-subtle-border)',
  medium: 'var(--card-medium-border)',
  strong: 'var(--card-strong-border)',
};

const glowVarMap: Record<string, string> = {
  blue: 'var(--glow-blue)',
  violet: 'var(--glow-violet)',
  purple: 'var(--glow-violet)',
  cyan: 'var(--glow-cyan)',
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      asChild = false,
      children,
      className,
      intensity = 'medium',
      glow = null,
      hover = true,
      padding = 'default',
      ...props
    },
    ref
  ) => {
    const { isHovered, hoverProps } = useHover();
    const intensityVal = intensity ?? 'medium';

    const cardStyles: CSSProperties = {
      background: isHovered && hover ? 'var(--card-hover-bg)' : bgVarMap[intensityVal],
      borderColor: isHovered && hover ? 'var(--card-hover-border)' : borderVarMap[intensityVal],
      backdropFilter: `blur(${blurMap[intensityVal]})`,
      WebkitBackdropFilter: `blur(${blurMap[intensityVal]})`,
      boxShadow: glow
        ? glowVarMap[glow]
        : isHovered && hover
          ? 'var(--card-hover-glow)'
          : 'var(--glow-neutral)',
    };

    // Polymorphic component - render as Slot when asChild is true
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        data-slot="card"
        className={cn(cardIntensity({ intensity, hover, padding }), className)}
        style={cardStyles}
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

GlassCard.displayName = 'GlassCard';
