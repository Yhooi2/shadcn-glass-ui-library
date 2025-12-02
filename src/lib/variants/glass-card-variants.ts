/**
 * GlassCard CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type GlowType = 'blue' | 'violet' | 'cyan' | null;
export type IntensityType = 'subtle' | 'medium' | 'strong';

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
  },
  defaultVariants: {
    intensity: 'medium',
    hover: true,
  },
});
