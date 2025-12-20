/**
 * SheetGlass CVA Variants
 * Side positioning variants for sheet/drawer component
 *
 * Provides slide-in animations from all 4 directions with glass styling.
 * Uses Tailwind CSS animations and transitions.
 */

import { cva } from 'class-variance-authority';

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

/**
 * Sheet content variants with side-specific positioning and animations
 *
 * Features:
 * - Fixed positioning at screen edge
 * - Slide-in/slide-out animations via data-state
 * - Responsive width for left/right (w-3/4 mobile, sm:max-w-sm desktop)
 * - Glass-style rounded corners on inner edge
 */
export const sheetVariants = cva(
  [
    // Base positioning and layout
    'fixed z-50 flex flex-col gap-4 p-6',
    // Animation timing
    'transition-transform ease-in-out duration-300',
    // Radix UI data-state animations
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:duration-300 data-[state=open]:duration-500',
  ].join(' '),
  {
    variants: {
      side: {
        top: [
          'inset-x-0 top-0',
          'data-[state=closed]:slide-out-to-top',
          'data-[state=open]:slide-in-from-top',
          'rounded-b-2xl',
        ].join(' '),
        bottom: [
          'inset-x-0 bottom-0',
          'data-[state=closed]:slide-out-to-bottom',
          'data-[state=open]:slide-in-from-bottom',
          'rounded-t-2xl',
        ].join(' '),
        left: [
          'inset-y-0 left-0 h-full w-3/4 sm:max-w-sm',
          'data-[state=closed]:slide-out-to-left',
          'data-[state=open]:slide-in-from-left',
          'rounded-r-2xl',
        ].join(' '),
        right: [
          'inset-y-0 right-0 h-full w-3/4 sm:max-w-sm',
          'data-[state=closed]:slide-out-to-right',
          'data-[state=open]:slide-in-from-right',
          'rounded-l-2xl',
        ].join(' '),
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);
