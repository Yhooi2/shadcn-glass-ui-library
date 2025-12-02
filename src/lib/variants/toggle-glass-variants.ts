/**
 * ToggleGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type ToggleGlassSize = 'sm' | 'md' | 'lg';

export const toggleSizes = cva('relative rounded-full transition-all duration-300', {
  variants: {
    size: {
      sm: 'w-8 h-4',
      md: 'w-11 h-6',
      lg: 'w-14 h-7',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
