/**
 * InputGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type InputGlassSize = 'sm' | 'md' | 'lg';

export const inputVariants = cva(
  'w-full transition-all duration-300 outline-none backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        // All sizes use text-base (16px) minimum to prevent iOS auto-zoom on focus
        // Border radius: 8px per UI_DESIGN.md (rounded-md)
        // Touch targets: 44-48px minimum (Apple HIG)
        sm: 'px-3 py-2 text-base rounded-md min-h-[44px]',     // UI_DESIGN: 8px radius, 44px mobile
        md: 'px-4 py-2.5 text-base rounded-md min-h-[44px]',   // UI_DESIGN: 8px radius
        lg: 'px-5 py-3 text-base md:text-lg rounded-md min-h-[48px]',  // UI_DESIGN: 8px radius
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
