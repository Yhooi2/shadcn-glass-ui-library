/**
 * SkeletonGlass Component
 *
 * Glass-themed loading skeleton with:
 * - Theme-aware styling (glass/light/aurora)
 * - Shimmer animation
 * - Variant presets (text, title, avatar, thumbnail, card)
 */

import { forwardRef, type CSSProperties } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { skeletonVariants } from '@/lib/variants/skeleton-glass-variants';
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

export interface SkeletonGlassProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
  readonly width?: string | number;
  readonly height?: string | number;
}

// ========================================
// COMPONENT
// ========================================

export const SkeletonGlass = forwardRef<HTMLDivElement, SkeletonGlassProps>(
  ({ className, variant = 'text', width, height, style, ...props }, ref) => {
    const skeletonStyles: CSSProperties = {
      width,
      height,
      background:
        'linear-gradient(90deg, var(--skeleton-bg) 25%, var(--skeleton-shine) 50%, var(--skeleton-bg) 75%)',
      backgroundSize: '200% 100%',
      animation: 'skeleton-loading 1.5s infinite',
      ...style,
    };

    return (
      <div
        ref={ref}
        data-slot="skeleton"
        className={cn(skeletonVariants({ variant }), className)}
        style={skeletonStyles}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

SkeletonGlass.displayName = 'SkeletonGlass';

// ========================================
// SHADCN/UI COMPATIBLE ALIAS
// ========================================

/**
 * Skeleton - shadcn/ui compatible alias for SkeletonGlass
 *
 * @example
 * ```tsx
 * import { Skeleton } from 'shadcn-glass-ui'
 *
 * <Skeleton className="h-4 w-[200px]" />
 * <Skeleton className="h-12 w-12 rounded-full" />
 * ```
 * @since v2.5.0
 */
export const Skeleton = SkeletonGlass;
