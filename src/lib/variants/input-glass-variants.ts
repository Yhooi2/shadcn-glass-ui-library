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
        sm: 'px-2.5 py-1.5 md:px-3 md:py-2 text-[10px] md:text-xs rounded-lg',
        md: 'px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm rounded-xl',
        lg: 'px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-base rounded-xl',
      },
    },
    defaultVariants: {
      inputSize: 'md',
    },
  }
);
