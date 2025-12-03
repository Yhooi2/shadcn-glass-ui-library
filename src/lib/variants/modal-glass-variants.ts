/**
 * ModalGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export const modalSizes = cva('relative w-full rounded-3xl p-4 md:p-6 transition-all duration-300', {
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-4xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
