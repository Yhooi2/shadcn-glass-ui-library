/**
 * useGlassStyles Hook
 *
 * Provides theme-aware glass styling with proper memoization.
 * Replaces the repeated pattern of computing styles on every render:
 *
 * ```tsx
 * // BEFORE (duplicated, recalculates every render)
 * const { theme } = useTheme();
 * const t = themeStyles[theme];
 * const isGlass = theme === "glass";
 * const bg = isGlass ? "rgba(255,255,255,0.10)" : t.glassSubtleBg;
 *
 * // AFTER (memoized, consistent API)
 * const { styles, isGlass } = useGlassStyles();
 * const bg = styles.glass.bg.medium;
 * ```
 */

import { useMemo, type CSSProperties } from 'react';
import { useTheme } from '@/lib/theme-context';
import { themeStyles, type Theme } from '@/lib/themeStyles';
import { glass, shadow, gradient, animation, blur, rgba } from '@/lib/theme/tokens';

// ========================================
// TYPES
// ========================================

export interface GlassStylesReturn {
  /** Current theme */
  theme: Theme;
  /** Raw theme styles from themeStyles */
  t: (typeof themeStyles)[Theme];
  /** Theme checks */
  isGlass: boolean;
  isLight: boolean;
  isAurora: boolean;
  /** Pre-computed common styles */
  styles: GlassComputedStyles;
  /** Helper to get CSS properties for glass surface */
  getGlassSurface: (options?: GlassSurfaceOptions) => CSSProperties;
  /** Helper to get CSS properties for glass card */
  getGlassCard: (options?: GlassCardOptions) => CSSProperties;
  /** Helper to get CSS properties for glow effect */
  getGlow: (color?: GlowColor, intensity?: GlowIntensity) => CSSProperties;
}

export interface GlassComputedStyles {
  glass: {
    bg: {
      subtle: string;
      medium: string;
      strong: string;
    };
    border: {
      subtle: string;
      medium: string;
      strong: string;
    };
    blur: {
      sm: string;
      md: string;
      lg: string;
    };
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
  };
  glow: {
    violet: string;
    blue: string;
    cyan: string;
    neutral: string;
  };
  transition: {
    all: string;
    colors: string;
    transform: string;
  };
}

export interface GlassSurfaceOptions {
  /** Background intensity */
  intensity?: 'subtle' | 'medium' | 'strong';
  /** Blur level */
  blur?: 'sm' | 'md' | 'lg';
  /** Border intensity */
  border?: 'subtle' | 'medium' | 'strong' | 'none';
  /** Border radius */
  borderRadius?: string;
}

export interface GlassCardOptions extends GlassSurfaceOptions {
  /** Add hover glow */
  hoverGlow?: boolean;
  /** Padding */
  padding?: string;
}

export type GlowColor = 'violet' | 'blue' | 'cyan' | 'emerald' | 'amber' | 'red' | 'neutral';
export type GlowIntensity = 'subtle' | 'medium' | 'strong';

// ========================================
// HOOK IMPLEMENTATION
// ========================================

/**
 * Hook for computing theme-aware glass styles with memoization.
 *
 * @example Basic usage
 * ```tsx
 * const { styles, isGlass, t } = useGlassStyles();
 *
 * return (
 *   <div style={{
 *     background: styles.glass.bg.medium,
 *     color: styles.text.primary,
 *   }}>
 *     Content
 *   </div>
 * );
 * ```
 *
 * @example Using helpers
 * ```tsx
 * const { getGlassSurface, getGlow } = useGlassStyles();
 *
 * return (
 *   <div style={{
 *     ...getGlassSurface({ intensity: 'strong', blur: 'lg' }),
 *     ...getGlow('violet', 'medium'),
 *   }}>
 *     Glowing glass card
 *   </div>
 * );
 * ```
 */
export function useGlassStyles(): GlassStylesReturn {
  const { theme } = useTheme();
  const t = themeStyles[theme];

  const isGlass = theme === 'glass';
  const isLight = theme === 'light';
  const isAurora = theme === 'aurora';

  // Memoize computed styles
  const styles = useMemo<GlassComputedStyles>(() => {
    if (isGlass) {
      return {
        glass: {
          bg: {
            subtle: glass.bg.subtle,
            medium: glass.bg.medium,
            strong: glass.bg.strong,
          },
          border: {
            subtle: glass.border.subtle,
            medium: glass.border.medium,
            strong: glass.border.strong,
          },
          blur: {
            sm: blur.sm,
            md: blur.md,
            lg: blur.lg,
          },
        },
        text: {
          primary: rgba.white(0.9),
          secondary: rgba.white(0.6),
          muted: rgba.white(0.4),
          accent: '#c4b5fd',
        },
        glow: {
          violet: shadow.glow.violetSubtle,
          blue: shadow.glow.blue,
          cyan: shadow.glow.cyan,
          neutral: '0 8px 32px rgba(0,0,0,0.12)',
        },
        transition: {
          all: animation.transition.all,
          colors: animation.transition.colors,
          transform: animation.transition.transform,
        },
      };
    }

    // For light and aurora themes, use theme styles
    return {
      glass: {
        bg: {
          subtle: t.glassSubtleBg,
          medium: t.glassMediumBg,
          strong: t.glassStrongBg,
        },
        border: {
          subtle: t.glassSubtleBorder,
          medium: t.glassMediumBorder,
          strong: t.glassStrongBorder,
        },
        blur: {
          sm: blur.sm,
          md: blur.md,
          lg: blur.lg,
        },
      },
      text: {
        primary: t.textPrimary,
        secondary: t.textSecondary,
        muted: t.textMuted,
        accent: t.textAccent,
      },
      glow: {
        violet: t.glowViolet,
        blue: t.glowBlue,
        cyan: t.glowCyan,
        neutral: t.glowNeutral,
      },
      transition: {
        all: animation.transition.all,
        colors: animation.transition.colors,
        transform: animation.transition.transform,
      },
    };
  }, [theme, t, isGlass]);

  // Helper to generate glass surface styles
  const getGlassSurface = useMemo(() => {
    return (options: GlassSurfaceOptions = {}): CSSProperties => {
      const {
        intensity = 'medium',
        blur: blurLevel = 'md',
        border = 'medium',
        borderRadius = '12px',
      } = options;

      const blurValue = styles.glass.blur[blurLevel];

      return {
        background: styles.glass.bg[intensity],
        backdropFilter: `blur(${blurValue})`,
        WebkitBackdropFilter: `blur(${blurValue})`,
        ...(border !== 'none' && {
          border: `1px solid ${styles.glass.border[border]}`,
        }),
        borderRadius,
      };
    };
  }, [styles]);

  // Helper to generate glass card styles
  const getGlassCard = useMemo(() => {
    return (options: GlassCardOptions = {}): CSSProperties => {
      const { hoverGlow, padding, ...surfaceOptions } = options;

      return {
        ...getGlassSurface(surfaceOptions),
        ...(padding && { padding }),
        ...(hoverGlow && {
          transition: animation.transition.all,
        }),
      };
    };
  }, [getGlassSurface]);

  // Helper to generate glow styles
  const getGlow = useMemo(() => {
    return (color: GlowColor = 'violet', intensity: GlowIntensity = 'medium'): CSSProperties => {
      const glowMap: Record<GlowColor, Record<GlowIntensity, string>> = {
        violet: {
          subtle: `0 4px 20px ${rgba.purple(0.2)}`,
          medium: shadow.glow.violetSubtle,
          strong: shadow.glow.violet,
        },
        blue: {
          subtle: `0 4px 20px ${rgba.blue(0.15)}`,
          medium: shadow.glow.blue,
          strong: `0 8px 40px ${rgba.blue(0.4)}`,
        },
        cyan: {
          subtle: `0 4px 20px ${rgba.cyan(0.15)}`,
          medium: shadow.glow.cyan,
          strong: `0 8px 40px ${rgba.cyan(0.35)}`,
        },
        emerald: {
          subtle: `0 4px 15px ${rgba.emerald(0.2)}`,
          medium: shadow.glow.emerald,
          strong: `0 8px 30px ${rgba.emerald(0.5)}`,
        },
        amber: {
          subtle: `0 4px 15px ${rgba.amber(0.2)}`,
          medium: shadow.glow.amber,
          strong: `0 8px 30px ${rgba.amber(0.5)}`,
        },
        red: {
          subtle: `0 4px 15px ${rgba.red(0.2)}`,
          medium: shadow.glow.red,
          strong: `0 8px 30px ${rgba.red(0.5)}`,
        },
        neutral: {
          subtle: '0 4px 15px rgba(0,0,0,0.08)',
          medium: '0 8px 32px rgba(0,0,0,0.12)',
          strong: '0 12px 40px rgba(0,0,0,0.20)',
        },
      };

      return {
        boxShadow: glowMap[color][intensity],
      };
    };
  }, []);

  return {
    theme,
    t,
    isGlass,
    isLight,
    isAurora,
    styles,
    getGlassSurface,
    getGlassCard,
    getGlow,
  };
}

export default useGlassStyles;
