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
        // All sizes use text-base (16px) minimum to prevent iOS auto-zoom on focus
        sm: 'px-3 py-2 text-base rounded-lg min-h-[40px]',
        md: 'px-4 py-2.5 text-base rounded-xl min-h-[44px]',
        lg: 'px-5 py-3 text-base md:text-lg rounded-xl min-h-[48px]',
      },
    },
    defaultVariants: {
      inputSize: 'md',
    },
  }
);
