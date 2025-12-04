import { cva } from 'class-variance-authority';

/**
 * SelectGlass Size Variants
 */
export type SelectGlassSize = 'sm' | 'md' | 'lg';

/**
 * SelectGlass CVA Variants
 * Defines size-based styling for the select trigger
 */
export const selectGlassVariants = cva(
  // Base styles - applied to all variants
  'relative w-full rounded-xl font-medium inline-flex items-center justify-between transition-all duration-300 cursor-pointer outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'px-3 py-2 text-xs gap-2 min-h-[36px]',
        md: 'px-4 py-2.5 text-sm gap-2 min-h-[44px]', // Touch target: 44px
        lg: 'px-5 py-3 text-base gap-3 min-h-[48px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
