/**
 * SkeletonGlass Component
 *
 * Glass-themed loading skeleton with:
 * - Theme-aware styling (glass/light/aurora)
 * - Shimmer animation
 * - Variant presets (text, title, avatar, thumbnail, card)
 */

import { forwardRef, type CSSProperties } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-context';
import { themeStyles } from '@/lib/themeStyles';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type SkeletonVariant = 'text' | 'title' | 'avatar' | 'thumbnail' | 'card';

// ========================================
// VARIANT CLASSES (using CVA)
// ========================================

const skeletonVariants = cva('overflow-hidden', {
  variants: {
    variant: {
      text: 'h-4 rounded',
      title: 'h-6 rounded',
      avatar: 'w-12 h-12 rounded-full',
      thumbnail: 'w-full h-32 rounded-xl',
      card: 'w-full h-48 rounded-2xl',
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});

// ========================================
// PROPS INTERFACE
// ========================================

export interface SkeletonGlassProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  readonly width?: string | number;
  readonly height?: string | number;
}

// ========================================
// COMPONENT
// ========================================

export const SkeletonGlass = forwardRef<HTMLDivElement, SkeletonGlassProps>(
  (
    {
      className,
      variant = 'text',
      width,
      height,
      style,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];

    const skeletonStyles: CSSProperties = {
      width,
      height,
      background: `linear-gradient(90deg, ${t.skeletonBg} 25%, ${t.skeletonShine} 50%, ${t.skeletonBg} 75%)`,
      backgroundSize: '200% 100%',
      animation: 'skeleton-loading 1.5s infinite',
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        style={skeletonStyles}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

SkeletonGlass.displayName = 'SkeletonGlass';

export { skeletonVariants as skeletonGlassVariants };
