/**
 * ButtonGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type ButtonGlassVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'text';

export type ButtonGlassSize = 'sm' | 'md' | 'lg' | 'xl' | 'icon';

export const buttonGlassVariants = cva(
  'relative overflow-hidden rounded-xl font-medium inline-flex items-center justify-center transition-all duration-300 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
        ghost: '',
        danger: '',
        success: '',
        text: '',
      },
      size: {
        sm: 'px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs gap-1 md:gap-1.5',
        md: 'px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm gap-1.5 md:gap-2',
        lg: 'px-4 py-2 md:px-6 md:py-3 text-sm md:text-base gap-2 md:gap-2.5',
        xl: 'px-6 py-3 md:px-8 md:py-4 text-base md:text-lg gap-2.5 md:gap-3',
        icon: 'p-2 md:p-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
