/**
 * GlassCard Component
 *
 * Glass-themed container with:
 * - Theme-aware styling (glass/light/aurora)
 * - Configurable blur intensity
 * - Optional glow effects
 * - Hover animations
 */

import {
  forwardRef,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-context';
import { themeStyles } from '@/lib/themeStyles';
import { useHover } from '@/lib/hooks/use-hover';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type GlowType = 'blue' | 'violet' | 'cyan' | null;
export type IntensityType = 'subtle' | 'medium' | 'strong';

// ========================================
// INTENSITY VARIANTS (using CVA)
// ========================================

const cardIntensity = cva('border rounded-2xl transition-all duration-300', {
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

// ========================================
// BLUR MAP
// ========================================

const blurMap: Record<IntensityType, string> = {
  subtle: '8px',
  medium: '12px',
  strong: '16px',
};

// ========================================
// PROPS INTERFACE
// ========================================

export interface GlassCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
    VariantProps<typeof cardIntensity> {
  readonly children: ReactNode;
  readonly glow?: GlowType;
}

// ========================================
// COMPONENT
// ========================================

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className,
      intensity = 'medium',
      glow = null,
      hover = true,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const { isHovered, hoverProps } = useHover();

    const bgMap: Record<IntensityType, string> = {
      subtle: t.glassSubtleBg,
      medium: t.glassMediumBg,
      strong: t.glassStrongBg,
    };

    const borderMap: Record<IntensityType, string> = {
      subtle: t.glassSubtleBorder,
      medium: t.glassMediumBorder,
      strong: t.glassStrongBorder,
    };

    const glowMap: Record<string, string> = {
      blue: t.glowBlue,
      violet: t.glowViolet,
      purple: t.glowViolet,
      cyan: t.glowCyan,
    };

    const intensityVal = intensity ?? 'medium';

    const cardStyles: CSSProperties = {
      background: isHovered && hover ? t.cardHoverBg : bgMap[intensityVal],
      borderColor:
        isHovered && hover
          ? t.cardHoverBorder || borderMap[intensityVal]
          : borderMap[intensityVal],
      backdropFilter: `blur(${blurMap[intensityVal]})`,
      WebkitBackdropFilter: `blur(${blurMap[intensityVal]})`,
      boxShadow: glow
        ? glowMap[glow]
        : isHovered && hover
          ? t.cardHoverGlow
          : t.glowNeutral,
    };

    return (
      <div
        ref={ref}
        className={cn(cardIntensity({ intensity, hover }), className)}
        style={cardStyles}
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { cardIntensity as glassCardVariants };
