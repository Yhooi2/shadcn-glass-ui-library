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
        // All sizes include min-h for touch target compliance (Apple HIG: 44px minimum)
        sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[32px]',
        md: 'px-4 py-2.5 text-sm gap-2 min-h-[44px]',
        lg: 'px-6 py-3 text-base gap-2.5 min-h-[48px]',
        xl: 'px-8 py-4 text-lg gap-3 min-h-[56px]',
        icon: 'p-2.5 min-h-[44px] min-w-[44px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
