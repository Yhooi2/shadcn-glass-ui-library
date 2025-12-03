/**
 * DropdownGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type DropdownAlign = 'left' | 'right';

export const dropdownAlign = cva('absolute mt-2 min-w-[160px] md:min-w-[200px] rounded-2xl py-1.5 md:py-2', {
  variants: {
    align: {
      left: 'left-0',
      right: 'right-0',
    },
  },
  defaultVariants: {
    align: 'left',
  },
});
