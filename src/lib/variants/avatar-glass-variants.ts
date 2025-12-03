/**
 * AvatarGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export const avatarSizes = cva(
  'rounded-full flex items-center justify-center font-semibold transition-all duration-300',
  {
    variants: {
      size: {
        sm: 'w-7 h-7 md:w-8 md:h-8 text-[10px] md:text-xs',
        md: 'w-9 h-9 md:w-10 md:h-10 text-xs md:text-sm',
        lg: 'w-10 h-10 md:w-12 md:h-12 text-sm md:text-base',
        xl: 'w-14 h-14 md:w-16 md:h-16 text-base md:text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const statusSizes = cva('absolute -bottom-0.5 -right-0.5 rounded-full', {
  variants: {
    size: {
      sm: 'w-2 h-2 md:w-2.5 md:h-2.5',
      md: 'w-2.5 h-2.5 md:w-3 md:h-3',
      lg: 'w-3 h-3 md:w-3.5 md:h-3.5',
      xl: 'w-3.5 h-3.5 md:w-4 md:h-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
