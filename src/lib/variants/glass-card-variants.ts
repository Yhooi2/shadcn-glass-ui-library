/**
 * GlassCard CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type GlowType = 'blue' | 'violet' | 'cyan' | null;
export type IntensityType = 'subtle' | 'medium' | 'strong';

export type PaddingType = 'none' | 'compact' | 'default' | 'featured';

export const cardIntensity = cva('border transition-all duration-300', {
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
    // Padding variants per UI_DESIGN.md (24-32px for glass cards)
    // Border radius per UI_DESIGN.md: compact=12px, default=16px, featured=20px
    padding: {
      none: '',
      compact: 'p-4 md:p-5 rounded-lg',      // 16px → 20px padding, 12px radius
      default: 'p-6 rounded-xl',             // 24px padding, 16px radius
      featured: 'p-8 rounded-[20px]',        // 32px padding, 20px radius (custom)
    },
  },
  defaultVariants: {
    intensity: 'medium',
    hover: true,
    padding: 'default',
  },
});
