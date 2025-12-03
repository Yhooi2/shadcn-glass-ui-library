/**
 * AlertGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export const alertVariants = cva(
  'flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-xl transition-all duration-300 backdrop-blur-sm',
  {
    variants: {
      type: {
        info: '',
        success: '',
        warning: '',
        error: '',
      },
    },
    defaultVariants: {
      type: 'info',
    },
  }
);
