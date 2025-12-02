/**
 * ProgressGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type ProgressSize = 'sm' | 'md' | 'lg' | 'xl';
export type ProgressGradient = 'violet' | 'blue' | 'cyan' | 'amber' | 'emerald' | 'rose';

export const progressSizes = cva('rounded-full overflow-hidden', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
      xl: 'h-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
