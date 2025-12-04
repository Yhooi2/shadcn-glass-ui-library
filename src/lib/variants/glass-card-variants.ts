/**
 * GlassCard CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type GlowType = 'blue' | 'violet' | 'cyan' | null;
export type IntensityType = 'subtle' | 'medium' | 'strong';

export type PaddingType = 'none' | 'compact' | 'default' | 'featured';

export const cardIntensity = cva('border rounded-2xl transition-all duration-300', {
  variants: {
    intensity: {
      subtle: '',
      medium: '',
      strong: '',
    },
    hover: {
      true: 'hover-glow cursor-pointer',
      false: '',
    },
    // Padding variants per UI_DIZINE.md (24-32px for glass cards)
    padding: {
      none: '',
      compact: 'p-4 md:p-5',     // 16px → 20px (compact exception)
      default: 'p-6',            // 24px (standard glass card)
      featured: 'p-8',           // 32px (featured/hero cards)
    },
  },
  defaultVariants: {
    intensity: 'medium',
    hover: true,
    padding: 'default',
  },
});
