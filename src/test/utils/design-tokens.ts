/**
 * Design System Token Definitions
 *
 * Based on UI_DIZINE.md specifications for glassmorphism design system.
 * These tokens define the authoritative values for spacing, typography,
 * color, blur, opacity, and component-specific dimensions.
 */

// ============================================
// SPACING TOKENS (8px Base Grid)
// ============================================

export const SPACING_TOKENS = {
  /** Base unit for all spacing calculations */
  BASE_UNIT: 8,

  /** Half-grid increment for fine-tuning */
  HALF_UNIT: 4,

  /** Valid spacing values in the design system */
  VALID_VALUES: [0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 80, 96] as const,

  /** Glass cards require 25-50% more padding than standard */
  GLASS_CARD_PADDING: { min: 24, max: 32 },

  /** Standard card padding for comparison */
  STANDARD_PADDING: 16,

  /** Apple HIG minimum touch target */
  TOUCH_TARGET_APPLE: 44,

  /** Material Design minimum touch target */
  TOUCH_TARGET_MATERIAL: 48,

  /** Token scale mapping */
  SCALE: {
    0: 0,
    0.5: 2,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
  } as const,
} as const;

// ============================================
// TYPOGRAPHY TOKENS (1.25 Modular Scale)
// ============================================

export const TYPOGRAPHY_TOKENS = {
  /** Minimum body text size to prevent iOS auto-zoom */
  MIN_BODY_SIZE: 16,

  /** Minimum font weight on glass backgrounds for readability */
  MIN_WEIGHT_ON_GLASS: 500,

  /** Forbidden font weights (too thin for glass backgrounds) */
  FORBIDDEN_WEIGHTS: [100, 200, 300] as const,

  /** Modular scale ratio (Major Third) */
  MODULAR_SCALE: 1.25,

  /** Maximum line length for readability (characters) */
  MAX_LINE_LENGTH_CHARS: 75,

  /** Font size scale based on 16px base and 1.25 ratio */
  FONT_SIZES: {
    xs: { min: 12, max: 14 }, // clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)
    sm: { min: 14, max: 16 }, // clamp(0.875rem, 0.8rem + 0.375vw, 1rem)
    base: { min: 16, max: 18 }, // clamp(1rem, 0.95rem + 0.25vw, 1.125rem)
    lg: { min: 18, max: 20 }, // clamp(1.125rem, 1rem + 0.5vw, 1.25rem)
    xl: { min: 20, max: 24 }, // clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)
    '2xl': { min: 24, max: 32 }, // clamp(1.5rem, 1.25rem + 1.25vw, 2rem)
    '3xl': { min: 30, max: 40 }, // clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)
    '4xl': { min: 36, max: 48 }, // clamp(2.25rem, 1.75rem + 2.5vw, 3rem)
    '5xl': { min: 48, max: 72 }, // clamp(3rem, 2rem + 5vw, 4.5rem)
  } as const,

  /** Line heights for different contexts */
  LINE_HEIGHTS: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  } as const,

  /** Font weight scale */
  FONT_WEIGHTS: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  } as const,
} as const;

// ============================================
// COLOR & CONTRAST TOKENS
// ============================================

export const COLOR_CONTRAST_TOKENS = {
  /** WCAG AA minimum contrast for normal text (<18pt) */
  BODY_TEXT_RATIO: 4.5,

  /** WCAG AA minimum contrast for large text (>=18pt or 14pt bold) */
  LARGE_TEXT_RATIO: 3.0,

  /** WCAG AA minimum contrast for UI components */
  UI_COMPONENT_RATIO: 3.0,

  /** WCAG AAA enhanced contrast for normal text */
  AAA_BODY_TEXT_RATIO: 7.0,

  /** Pure black is forbidden - use these alternatives */
  FORBIDDEN_COLORS: ['#000000', 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 1)'] as const,

  /** Recommended dark base colors */
  RECOMMENDED_DARK: ['#121212', '#0a0a0f'] as const,

  /** Theme-specific color values */
  THEMES: {
    glass: {
      background: '#0a0a0f',
      surface: 'rgba(255,255,255,0.08)',
      border: 'rgba(255,255,255,0.12)',
      textPrimary: '#e0e0e0',
      glow: 'rgba(100,150,255,0.3)',
    },
    aurora: {
      background: '#050510',
      surface: 'rgba(100,80,200,0.08)',
      border: 'rgba(150,100,255,0.2)',
      textPrimary: '#f0f0ff',
      glow: 'rgba(150,100,255,0.4)',
    },
    light: {
      background: '#f8f9fa',
      surface: 'rgba(255,255,255,0.7)',
      border: 'rgba(0,0,0,0.08)',
      textPrimary: '#1a1a1a',
      glow: 'rgba(99,102,241,0.15)',
    },
  } as const,
} as const;

// ============================================
// BORDER RADIUS TOKENS
// ============================================

export const RADIUS_TOKENS = {
  /** Exponential progression scale */
  SCALE: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  } as const,

  /** Component-specific radius mappings */
  COMPONENTS: {
    badge: 4, // sm
    button: 8, // md
    buttonLarge: 12, // lg
    input: 8, // md
    tooltip: 6,
    card: 16, // xl
    cardCompact: 12, // lg
    cardFeatured: 20,
    modal: 20,
    dropdown: 12, // lg
  } as const,
} as const;

// ============================================
// BLUR & GLASSMORPHISM TOKENS
// ============================================

export const BLUR_TOKENS = {
  /** Blur value scale */
  SCALE: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  } as const,

  /** Maximum blur on mobile for performance */
  MAX_MOBILE: 8,

  /** Standard blur for cards/panels */
  STANDARD: 16,

  /** Modal/overlay blur */
  MODAL: 24,

  /** Maximum recommended blur */
  MAX_DESKTOP: 24,

  /** Heavy blur - use sparingly */
  HEAVY: 32,
} as const;

export const OPACITY_TOKENS = {
  /** Decorative glass - subtle effect, requires strong blur */
  DECORATIVE: { min: 0.05, max: 0.1 },

  /** Standard cards - sweet spot for balance */
  STANDARD_CARDS: { min: 0.15, max: 0.25 },

  /** Text containers - higher opacity for readability */
  TEXT_CONTAINERS: { min: 0.3, max: 0.5 },

  /** Navigation/overlays - maximum legibility */
  NAVIGATION: { min: 0.4, max: 0.75 },

  /** Surface opacity values */
  SURFACE: {
    subtle: 0.03,
    light: 0.05,
    medium: 0.08,
    strong: 0.15,
    solid: 0.25,
  } as const,
} as const;

export const GLASS_TOKENS = {
  /** Maximum glass elements per view */
  MAX_LAYERS_PER_VIEW: 3,

  /** Border specifications */
  BORDER: {
    width: 1,
    opacity: 0.18,
    highlightOpacity: 0.35, // Top edge only
  } as const,

  /** Saturation boost for glass effect */
  SATURATION: 1.8,

  /** Elements that should NOT have glass effect */
  NO_GLASS_ELEMENTS: ['badge', 'chip', 'tag', 'tooltip'] as const,

  /** Minimum element size for glass effect (px) */
  MIN_GLASS_SIZE: 24,
} as const;

// ============================================
// COMPONENT-SPECIFIC SPECIFICATIONS
// ============================================

export const COMPONENT_SPECS = {
  BUTTON: {
    sm: {
      height: 32,
      paddingH: 12,
      paddingV: 6,
      radius: 8,
      fontSize: 14,
      fontWeight: 500,
      minWidth: 64,
    },
    md: {
      height: 40,
      paddingH: 16,
      paddingV: 10,
      radius: 8,
      fontSize: 14,
      fontWeight: 500,
      minWidth: 80,
    },
    lg: {
      height: 48,
      paddingH: 24,
      paddingV: 12,
      radius: 12,
      fontSize: 16,
      fontWeight: 500,
      minWidth: 96,
    },
  } as const,

  CARD: {
    compact: {
      padding: 16,
      radius: 12,
      opacity: 0.15,
      blur: 12,
    },
    default: {
      padding: 24,
      radius: 16,
      opacity: 0.2,
      blur: 16,
    },
    featured: {
      padding: 32,
      radius: 20,
      opacity: 0.2,
      blur: 16,
    },
  } as const,

  MODAL: {
    bodyPadding: 24,
    headerPadding: 20,
    footerPadding: 20,
    radius: 20,
    bgOpacity: 0.25,
    blur: 24,
    scrimOpacity: 0.5,
    maxWidth: {
      sm: 480,
      md: 640,
      lg: 800,
    },
  } as const,

  DROPDOWN: {
    containerPadding: 8,
    itemPaddingH: 16,
    itemPaddingV: 10,
    radius: 12,
    bgOpacity: 0.2,
    blur: 16,
    minWidth: 180,
  } as const,

  TOOLTIP: {
    paddingH: 12,
    paddingV: 8,
    radius: 6,
    fontSize: { min: 12, max: 14 },
    maxWidth: 240,
    /** CRITICAL: Tooltips must use SOLID backgrounds, not glass */
    solidBg: true,
  } as const,

  BADGE: {
    height: { min: 20, max: 24 },
    paddingH: 8,
    paddingV: 2,
    radius: 4,
    radiusPill: 9999,
    fontSize: 12,
    fontWeight: 500,
    /** CRITICAL: Badges must NOT have glass effect */
    glassAllowed: false,
  } as const,

  INPUT: {
    height: 40,
    heightMobile: 44,
    paddingH: 16,
    paddingV: 12,
    radius: 8,
    fontSize: 16, // Prevents iOS zoom
  } as const,

  AVATAR: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
    radius: 9999, // full
  } as const,
} as const;

// ============================================
// ACCESSIBILITY SPECIFICATIONS
// ============================================

export const ACCESSIBILITY_TOKENS = {
  /** Minimum touch target size */
  TOUCH_TARGET_MIN: 44,

  /** Focus ring specifications */
  FOCUS: {
    innerRingWidth: 2,
    outerRingWidth: 4,
    innerRingColor: 'rgba(255, 255, 255, 0.9)',
    outerRingColor: 'rgba(0, 0, 0, 0.8)',
  } as const,

  /** Animation constraints */
  MOTION: {
    /** Only animate these properties (GPU-accelerated) */
    safeProperties: ['transform', 'opacity'] as const,
    /** Never exceed this flash rate (seizure prevention) */
    maxFlashesPerSecond: 3,
  } as const,
} as const;

// ============================================
// SHADOW & GLOW TOKENS
// ============================================

export const SHADOW_TOKENS = {
  /** Standard shadows (layered for realism) */
  STANDARD: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  } as const,

  /** Glass-specific shadows */
  GLASS: {
    default: '0 8px 32px rgba(0, 0, 0, 0.12)',
    lg: '0 16px 48px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)',
    inner: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    highlight: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
  } as const,

  /** Accent glows */
  GLOW: {
    primary: '0 0 40px rgba(99, 102, 241, 0.4), 0 0 80px rgba(99, 102, 241, 0.2)',
    secondary: '0 0 40px rgba(168, 85, 247, 0.35), 0 0 80px rgba(168, 85, 247, 0.15)',
  } as const,

  /** Text shadow for glass backgrounds */
  TEXT_GLASS: '0 1px 2px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2)',
} as const;

// ============================================
// ANTIPATTERN DEFINITIONS
// ============================================

export const ANTIPATTERNS = {
  /** Layout mistakes to detect */
  LAYOUT: [
    'spacing-not-on-grid',
    'spacing-too-tight',
    'breaking-grid-alignment',
    'ignoring-vertical-rhythm',
  ] as const,

  /** Typography mistakes to detect */
  TYPOGRAPHY: [
    'too-many-font-sizes',
    'low-contrast-text',
    'centered-long-text',
    'line-too-long',
    'thin-font-on-glass',
  ] as const,

  /** Color mistakes to detect */
  COLOR: [
    'rainbow-interface',
    'color-only-information',
    'pure-black-on-white',
    'insufficient-glass-contrast',
  ] as const,

  /** Glassmorphism-specific mistakes */
  GLASS: [
    'too-many-glass-layers',
    'glass-on-glass-on-glass',
    'glow-effects-everywhere',
    'glass-on-small-elements',
    'no-backdrop-filter-fallback',
    'blur-over-24px-mobile',
    'text-without-shadow-on-glass',
    'inconsistent-blur-values',
    'animated-blur',
  ] as const,

  /** Accessibility mistakes */
  ACCESSIBILITY: [
    'touch-target-too-small',
    'missing-focus-state',
    'auto-playing-animation',
    'no-high-contrast-fallback',
    'no-reduced-motion-support',
  ] as const,
} as const;

// ============================================
// TYPE EXPORTS
// ============================================

export type Theme = 'glass' | 'light' | 'aurora';
export type ButtonSize = keyof typeof COMPONENT_SPECS.BUTTON;
export type CardVariant = keyof typeof COMPONENT_SPECS.CARD;
export type AvatarSize = keyof typeof COMPONENT_SPECS.AVATAR;
export type BlurSize = keyof typeof BLUR_TOKENS.SCALE;
export type RadiusSize = keyof typeof RADIUS_TOKENS.SCALE;
export type SpacingScale = keyof typeof SPACING_TOKENS.SCALE;
