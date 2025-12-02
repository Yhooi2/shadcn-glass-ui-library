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
        sm: 'px-3 py-1.5 text-xs gap-1.5',
        md: 'px-4 py-2 text-sm gap-2',
        lg: 'px-6 py-3 text-base gap-2.5',
        xl: 'px-8 py-4 text-lg gap-3',
        icon: 'p-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
