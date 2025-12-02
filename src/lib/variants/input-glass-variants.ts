/**
 * InputGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type InputGlassSize = 'sm' | 'md' | 'lg';

export const inputVariants = cva(
  'w-full transition-all duration-300 outline-none backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      inputSize: {
        sm: 'px-3 py-2 text-xs rounded-lg',
        md: 'px-4 py-2.5 text-sm rounded-xl',
        lg: 'px-5 py-3 text-base rounded-xl',
      },
    },
    defaultVariants: {
      inputSize: 'md',
    },
  }
);
