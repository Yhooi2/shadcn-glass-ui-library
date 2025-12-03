/**
 * TooltipGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export const tooltipPositions = cva(
  'absolute z-50 px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-[10px] md:text-xs font-medium whitespace-nowrap transition-opacity duration-200',
  {
    variants: {
      position: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      },
    },
    defaultVariants: {
      position: 'top',
    },
  }
);
