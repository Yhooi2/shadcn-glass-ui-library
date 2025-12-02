/**
 * SkeletonGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type SkeletonVariant = 'text' | 'title' | 'avatar' | 'thumbnail' | 'card';

export const skeletonVariants = cva('overflow-hidden', {
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
