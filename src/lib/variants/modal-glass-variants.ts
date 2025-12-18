/**
 * ModalGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

// Modal body padding: 24px per UI_DESIGN.md
// Border radius: 20px per UI_DESIGN.md (using rounded-2xl/24px as closest token)
// Max widths: 480/640/800px per UI_DESIGN.md
// Mobile: max-w-[calc(100%-2rem)] for edge padding (shadcn/ui pattern)
export const modalSizes = cva(
  'relative w-full max-w-[calc(100%-2rem)] rounded-2xl p-6 transition-all duration-300',
  {
    variants: {
      size: {
        sm: 'sm:max-w-[480px]', // UI_DESIGN.md: 480px (was 384px)
        md: 'sm:max-w-[640px]', // UI_DESIGN.md: 640px (was 448px)
        lg: 'sm:max-w-[800px]', // UI_DESIGN.md: 800px (was 512px)
        xl: 'sm:max-w-xl',
        full: 'sm:max-w-4xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
