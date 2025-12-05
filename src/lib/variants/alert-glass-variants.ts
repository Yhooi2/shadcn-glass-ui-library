/**
 * AlertGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

// shadcn/ui compatible
export type AlertVariant =
  // shadcn/ui compatible variants
  | 'default'
  | 'destructive'
  // Glass UI extended variants
  | 'success'
  | 'warning'
  // Backward compatibility aliases
  | 'info' // alias for 'default'
  | 'error'; // alias for 'destructive'

// Deprecated: use AlertVariant instead
export type AlertType = AlertVariant;

export const alertVariants = cva(
  'flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-xl transition-all duration-300 backdrop-blur-sm min-w-96 max-w-2xl',
  {
    variants: {
      variant: {
        default: '',
        destructive: '',
        success: '',
        warning: '',
        info: '', // alias for default
        error: '', // alias for destructive
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
