/**
 * GlassCard Component
 *
 * Glass-themed container with backdrop blur, glow effects, and hover animations.
 * Provides a foundational card component for glassmorphism UIs.
 *
 * ## Features
 * - Theme-aware styling (glass/light/aurora) via CSS variables
 * - Configurable blur intensity (subtle 8px, medium 16px, strong 24px)
 * - Optional glow effects (blue, violet, cyan)
 * - Hover animations with scale and glow effects
 * - Polymorphic rendering via `asChild` (Radix UI Slot pattern)
 * - Padding variants (none, compact, default, featured)
 * - Touch-friendly interactions (minimum 44x44px for interactive use)
 *
 * ## CSS Variables
 * Customize styling via theme CSS variables:
 * - `--card-subtle-bg`, `--card-medium-bg`, `--card-strong-bg` - Background colors
 * - `--card-subtle-border`, `--card-medium-border`, `--card-strong-border` - Border colors
 * - `--card-hover-bg`, `--card-hover-border`, `--card-hover-glow` - Hover states
 * - `--glow-blue`, `--glow-violet`, `--glow-cyan`, `--glow-neutral` - Glow effects
 * - `--blur-sm` (8px), `--blur-md` (16px), `--blur-lg` (24px) - Backdrop blur
 *
 * @example Basic card with medium intensity
 * ```tsx
 * import { GlassCard } from 'shadcn-glass-ui'
 *
 * function MyCard() {
 *   return (
 *     <GlassCard intensity="medium" className="p-6">
 *       <h3>Card Title</h3>
 *       <p>Card content goes here</p>
 *     </GlassCard>
 *   )
 * }
 * ```
 *
 * @example With glow effects
 * ```tsx
 * <GlassCard glow="blue" intensity="strong">
 *   <h3>Highlighted Card</h3>
 *   <p>This card has a blue glow effect</p>
 * </GlassCard>
 *
 * <GlassCard glow="violet" hover={true}>
 *   <h3>Interactive Card</h3>
 *   <p>Hover over this card for effects</p>
 * </GlassCard>
 * ```
 *
 * @example As clickable link (asChild pattern)
 * ```tsx
 * <GlassCard asChild intensity="medium" hover={true}>
 *   <a href="/product/123" aria-label="View product details">
 *     <img src="/product.jpg" alt="Product" />
 *     <h3>Product Name</h3>
 *     <p>$99.99</p>
 *   </a>
 * </GlassCard>
 *
 * // With Next.js Link
 * <GlassCard asChild>
 *   <Link href="/dashboard">
 *     <Dashboard className="w-6 h-6" />
 *     <span>Go to Dashboard</span>
 *   </Link>
 * </GlassCard>
 * ```
 *
 * @example Different intensity levels
 * ```tsx
 * <div className="grid grid-cols-3 gap-4">
 *   <GlassCard intensity="subtle">
 *     Subtle blur (8px)
 *   </GlassCard>
 *   <GlassCard intensity="medium">
 *     Medium blur (16px)
 *   </GlassCard>
 *   <GlassCard intensity="strong">
 *     Strong blur (24px)
 *   </GlassCard>
 * </div>
 * ```
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
 * @since v1.0.0
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
 * @example Basic usage
 * ```tsx
 * const props: GlassCardProps = {
 *   intensity: 'medium',
 *   glow: 'blue',
 *   hover: true,
 *   padding: 'default',
 *   children: <p>Content</p>,
 * };
 * ```
 */
export interface GlassCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>, VariantProps<typeof cardIntensity> {
  /**
   * Render as child element instead of div (polymorphic rendering).
   * Useful for making cards clickable links or custom interactive elements.
   *
   * @default false
   * @example
   * ```tsx
   * <GlassCard asChild>
   *   <a href="/article">Article Content</a>
   * </GlassCard>
   * ```
   */
  readonly asChild?: boolean;

  /**
   * Card content to display.
   */
  readonly children: ReactNode;

  /**
   * Glow effect color applied to card shadow.
   *
   * @default null (neutral glow)
   */
  readonly glow?: GlowType;

  /**
   * Padding size variant.
   *
   * @default "default"
   */
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
