/**
 * GlassCard Component
 *
 * Glass-themed container with:
 * - Theme-aware styling (glass/light/aurora)
 * - Configurable blur intensity
 * - Optional glow effects
 * - Hover animations
 */

import * as React from 'react';
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

// ========================================
// COMPOUND COMPONENTS (shadcn/ui Card compatible)
// ========================================

/**
 * GlassCardHeader - Header section of a GlassCard
 *
 * @example
 * ```tsx
 * <GlassCard>
 *   <GlassCardHeader>
 *     <GlassCardTitle>Card Title</GlassCardTitle>
 *     <GlassCardDescription>Card description</GlassCardDescription>
 *   </GlassCardHeader>
 * </GlassCard>
 * ```
 */
export const GlassCardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  )
);
GlassCardHeader.displayName = 'GlassCardHeader';

/**
 * GlassCardTitle - Title element for GlassCard
 *
 * @example
 * ```tsx
 * <GlassCardHeader>
 *   <GlassCardTitle>My Card Title</GlassCardTitle>
 * </GlassCardHeader>
 * ```
 */
export const GlassCardTitle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn('leading-none font-semibold tracking-tight', className)}
      {...props}
    />
  )
);
GlassCardTitle.displayName = 'GlassCardTitle';

/**
 * GlassCardDescription - Description text for GlassCard
 *
 * @example
 * ```tsx
 * <GlassCardHeader>
 *   <GlassCardTitle>Title</GlassCardTitle>
 *   <GlassCardDescription>A brief description of the card content.</GlassCardDescription>
 * </GlassCardHeader>
 * ```
 */
export const GlassCardDescription = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-description"
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
));
GlassCardDescription.displayName = 'GlassCardDescription';

/**
 * GlassCardAction - Action button area in card header
 *
 * @example
 * ```tsx
 * <GlassCardHeader>
 *   <GlassCardTitle>Title</GlassCardTitle>
 *   <GlassCardAction>
 *     <ButtonGlass size="sm">Edit</ButtonGlass>
 *   </GlassCardAction>
 * </GlassCardHeader>
 * ```
 */
export const GlassCardAction = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
);
GlassCardAction.displayName = 'GlassCardAction';

/**
 * GlassCardContent - Main content area of a GlassCard
 *
 * @example
 * ```tsx
 * <GlassCard>
 *   <GlassCardHeader>...</GlassCardHeader>
 *   <GlassCardContent>
 *     <p>This is the main content of the card.</p>
 *   </GlassCardContent>
 * </GlassCard>
 * ```
 */
export const GlassCardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-content" className={cn('px-6', className)} {...props} />
  )
);
GlassCardContent.displayName = 'GlassCardContent';

/**
 * GlassCardFooter - Footer section of a GlassCard
 *
 * @example
 * ```tsx
 * <GlassCard>
 *   <GlassCardContent>...</GlassCardContent>
 *   <GlassCardFooter>
 *     <ButtonGlass>Cancel</ButtonGlass>
 *     <ButtonGlass variant="default">Save</ButtonGlass>
 *   </GlassCardFooter>
 * </GlassCard>
 * ```
 */
export const GlassCardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
);
GlassCardFooter.displayName = 'GlassCardFooter';
