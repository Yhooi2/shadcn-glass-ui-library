/* eslint-disable react-refresh/only-export-components */
/**
 * CardGlass Compound Component
 *
 * A glass-themed card with compound sub-components matching shadcn/ui Card API.
 * Provides structure (Header, Content, Footer) with glass visual effects.
 *
 * @example
 * ```tsx
 * // Object pattern (recommended)
 * <CardGlass.Root intensity="medium" glow="blue">
 *   <CardGlass.Header>
 *     <CardGlass.Title>Card Title</CardGlass.Title>
 *     <CardGlass.Description>Card description</CardGlass.Description>
 *     <CardGlass.Action>
 *       <ButtonGlass size="sm">Action</ButtonGlass>
 *     </CardGlass.Action>
 *   </CardGlass.Header>
 *   <CardGlass.Content>
 *     <p>Main content goes here</p>
 *   </CardGlass.Content>
 *   <CardGlass.Footer>
 *     <ButtonGlass variant="ghost">Cancel</ButtonGlass>
 *     <ButtonGlass>Save</ButtonGlass>
 *   </CardGlass.Footer>
 * </CardGlass.Root>
 *
 * // Named exports (shadcn/ui compatible)
 * import { CardGlassRoot, CardGlassHeader, CardGlassTitle } from '@/components/glass/ui';
 * ```
 *
 * @see GlassCard - Simple glass container without structure
 * @see Card (shadcn/ui) - Reference implementation
 */

import * as React from 'react';
import { type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import type { GlowType, IntensityType } from '@/lib/variants/glass-card-variants';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export interface CardGlassRootProps extends React.ComponentProps<'div'> {
  /**
   * Glass blur intensity
   * @default 'medium'
   */
  intensity?: IntensityType;
  /**
   * Glow effect color
   * @default null
   */
  glow?: GlowType;
  /**
   * Enable hover effects
   * @default false
   */
  hover?: boolean;
}

// ========================================
// STYLE MAPS (CSS Variables)
// ========================================

const blurMap: Record<IntensityType, string> = {
  subtle: 'var(--blur-sm)', // 8px
  medium: 'var(--blur-md)', // 16px
  strong: 'var(--blur-lg)', // 24px
};

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
  cyan: 'var(--glow-cyan)',
};

// ========================================
// COMPOUND COMPONENT: ROOT
// ========================================

/**
 * CardGlass Root - Glass-themed card container
 *
 * @accessibility
 * - Uses semantic div element
 * - Color contrast meets WCAG AA
 * - Hover effects are decorative only
 */
function CardGlassRoot({
  className,
  intensity = 'medium',
  glow = null,
  hover = false,
  style,
  ...props
}: CardGlassRootProps) {
  const cardStyles: CSSProperties = {
    background: bgVarMap[intensity],
    borderColor: borderVarMap[intensity],
    backdropFilter: `blur(${blurMap[intensity]})`,
    WebkitBackdropFilter: `blur(${blurMap[intensity]})`,
    boxShadow: glow ? glowVarMap[glow] : 'var(--glow-neutral)',
    ...style,
  };

  return (
    <div
      data-slot="card"
      className={cn(
        'flex flex-col gap-6 rounded-xl border py-6 transition-all duration-300',
        'text-[var(--text-primary)]',
        hover && 'hover:shadow-lg hover:border-[var(--card-hover-border)] cursor-pointer',
        className
      )}
      style={cardStyles}
      {...props}
    />
  );
}

// ========================================
// COMPOUND COMPONENT: HEADER
// ========================================

/**
 * CardGlass Header - Container for title, description, and action
 *
 * Uses CSS Grid for layout with automatic action positioning.
 */
function CardGlassHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6',
        'has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        '[.border-b]:pb-6',
        className
      )}
      {...props}
    />
  );
}

// ========================================
// COMPOUND COMPONENT: TITLE
// ========================================

/**
 * CardGlass Title - Card title text
 */
function CardGlassTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold text-[var(--text-primary)]', className)}
      {...props}
    />
  );
}

// ========================================
// COMPOUND COMPONENT: DESCRIPTION
// ========================================

/**
 * CardGlass Description - Card description/subtitle text
 */
function CardGlassDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm text-[var(--text-muted)]', className)}
      {...props}
    />
  );
}

// ========================================
// COMPOUND COMPONENT: ACTION
// ========================================

/**
 * CardGlass Action - Positioned action slot in header
 *
 * Automatically positioned to the right of title/description.
 */
function CardGlassAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

// ========================================
// COMPOUND COMPONENT: CONTENT
// ========================================

/**
 * CardGlass Content - Main content area
 */
function CardGlassContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-6', className)} {...props} />;
}

// ========================================
// COMPOUND COMPONENT: FOOTER
// ========================================

/**
 * CardGlass Footer - Footer area with flex layout
 */
function CardGlassFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center gap-2 px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

// ========================================
// EXPORTS: OBJECT PATTERN
// ========================================

/**
 * CardGlass - Compound Component API
 *
 * @example
 * ```tsx
 * <CardGlass.Root intensity="medium">
 *   <CardGlass.Header>
 *     <CardGlass.Title>Title</CardGlass.Title>
 *     <CardGlass.Description>Description</CardGlass.Description>
 *   </CardGlass.Header>
 *   <CardGlass.Content>Content</CardGlass.Content>
 *   <CardGlass.Footer>Footer</CardGlass.Footer>
 * </CardGlass.Root>
 * ```
 */
export const CardGlass = {
  Root: CardGlassRoot,
  Header: CardGlassHeader,
  Title: CardGlassTitle,
  Description: CardGlassDescription,
  Action: CardGlassAction,
  Content: CardGlassContent,
  Footer: CardGlassFooter,
};

// ========================================
// EXPORTS: NAMED (shadcn/ui compatible)
// ========================================

export {
  CardGlassRoot,
  CardGlassHeader,
  CardGlassTitle,
  CardGlassDescription,
  CardGlassAction,
  CardGlassContent,
  CardGlassFooter,
};

export type { CardGlassRootProps };
