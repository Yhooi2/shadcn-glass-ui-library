/**
 * ToggleGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 *
 * shadcn/ui compatible:
 * - sizes: default (was 'md'), sm, lg
 * - variants: default, outline
 */

import { cva } from 'class-variance-authority';

/**
 * Toggle size types (shadcn/ui compatible)
 * - default: Standard size (was 'md')
 * - sm: Small
 * - lg: Large
 */
export type ToggleGlassSize = 'default' | 'sm' | 'lg';

/**
 * Toggle variant types (shadcn/ui compatible)
 * - default: Filled toggle with glass effect
 * - outline: Border only toggle
 */
export type ToggleGlassVariant = 'default' | 'outline';

export const toggleSizes = cva('relative rounded-full transition-all duration-300', {
  variants: {
    size: {
      sm: 'w-8 h-4',
      default: 'w-11 h-6',
      lg: 'w-14 h-7',
    },
    variant: {
      default: '',
      outline: 'border-2',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});
