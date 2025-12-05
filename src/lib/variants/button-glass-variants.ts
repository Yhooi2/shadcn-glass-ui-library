/**
 * ButtonGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type ButtonGlassVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'success'
  | 'text';

export type ButtonGlassSize = 'sm' | 'md' | 'lg' | 'xl' | 'icon';

export const buttonGlassVariants = cva(
  'relative overflow-hidden font-medium inline-flex items-center justify-center transition-all duration-300 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
        ghost: '',
        destructive: '',
        success: '',
        text: '',
      },
      size: {
        // All sizes include min-h for touch target compliance (Apple HIG: 44px minimum)
        // Border radius per UI_DIZINE.md: sm/md=8px, lg=12px
        sm: 'px-3 py-1.5 text-sm gap-1.5 min-h-[44px] rounded-md',     // 8px radius
        md: 'px-4 py-2.5 text-sm gap-2 min-h-[44px] rounded-md',       // 8px radius
        lg: 'px-6 py-3 text-base gap-2.5 min-h-[48px] rounded-lg',     // 12px radius
        xl: 'px-8 py-4 text-lg gap-3 min-h-[56px] rounded-xl',         // 16px radius (beyond spec)
        icon: 'p-2.5 min-h-[44px] min-w-[44px] rounded-md',            // 8px radius
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
