/**
 * SkeletonGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type SkeletonVariant = 'text' | 'title' | 'avatar' | 'thumbnail' | 'card';

export const skeletonVariants = cva('overflow-hidden', {
  variants: {
    variant: {
      text: 'h-3 md:h-4 rounded',
      title: 'h-5 md:h-6 rounded',
      avatar: 'w-10 h-10 md:w-12 md:h-12 rounded-full',
      thumbnail: 'w-full h-24 md:h-32 rounded-xl',
      card: 'w-full h-36 md:h-48 rounded-2xl',
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});
