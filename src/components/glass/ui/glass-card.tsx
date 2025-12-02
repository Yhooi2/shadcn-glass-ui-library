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

// CSS variable maps for intensity
const bgVarMap: Record<IntensityType, string> = {
  subtle: 'var(--card-subtle-bg)',
  medium: 'var(--card-medium-bg)',
  strong: 'var(--card-strong-bg)',
};

const borderVarMap: Record<IntensityType, string> = {
  subtle: 'var(--card-subtle-border)',
  medium: 'var(--card-medium-border)',
  strong: 'var(--card-strong-border)',
};

const glowVarMap: Record<string, string> = {
  blue: 'var(--glow-blue)',
  violet: 'var(--glow-violet)',
  purple: 'var(--glow-violet)',
  cyan: 'var(--glow-cyan)',
};

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
    const { isHovered, hoverProps } = useHover();
    const intensityVal = intensity ?? 'medium';

    const cardStyles: CSSProperties = {
      background: isHovered && hover ? 'var(--card-hover-bg)' : bgVarMap[intensityVal],
      borderColor: isHovered && hover ? 'var(--card-hover-border)' : borderVarMap[intensityVal],
      backdropFilter: `blur(${blurMap[intensityVal]})`,
      WebkitBackdropFilter: `blur(${blurMap[intensityVal]})`,
      boxShadow: glow
        ? glowVarMap[glow]
        : isHovered && hover
          ? 'var(--card-hover-glow)'
          : 'var(--glow-neutral)',
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
