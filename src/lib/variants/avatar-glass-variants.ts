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
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
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
      sm: 'w-2.5 h-2.5',
      md: 'w-3 h-3',
      lg: 'w-3.5 h-3.5',
      xl: 'w-4 h-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
