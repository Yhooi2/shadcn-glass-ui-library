/**
 * BadgeGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'violet';
export type BadgeSize = 'sm' | 'md' | 'lg';

export const badgeVariants = cva(
  'inline-flex items-center gap-1 md:gap-1.5 rounded-full font-medium',
  {
    variants: {
      size: {
        sm: 'px-1 py-0.5 md:px-1.5 text-[9px] md:text-[10px]',
        md: 'px-2 py-0.5 md:px-2.5 text-[10px] md:text-xs',
        lg: 'px-2.5 py-0.5 md:px-3 md:py-1 text-xs md:text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
