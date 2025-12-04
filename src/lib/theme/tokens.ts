/**
 * Design Tokens for Glass UI Library
 *
 * Single source of truth for all design values.
 * Replaces hardcoded rgba/hex values throughout components.
 */

// ========================================
// BLUR VALUES
// ========================================

export const blur = {
  xs: '4px',
  sm: '8px',
  md: '16px',  // per UI_DIZINE.md (was 20px)
  lg: '24px',
  xl: '32px',
} as const;

// ========================================
// TRANSITION DURATIONS
// ========================================

export const duration = {
  fast: 150,
  base: 200,
  slow: 300,
  slower: 400,
  slowest: 500,
} as const;

// ========================================
// EASING FUNCTIONS
// ========================================

export const easing = {
  default: 'ease-out',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

// ========================================
// SPACING (follows 4px grid)
// ========================================

export const spacing = {
  0: '0',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',  // per UI_DIZINE.md
  24: '96px',  // per UI_DIZINE.md
} as const;

// ========================================
// BORDER RADIUS
// ========================================

export const radius = {
  none: '0',
  sm: '0.375rem',  // 6px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// ========================================
// FONT SIZES
// ========================================

export const fontSize = {
  xs: '0.75rem',   // 12px
  sm: '0.875rem',  // 14px
  base: '1rem',    // 16px
  lg: '1.125rem',  // 18px
  xl: '1.25rem',   // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px - per UI_DIZINE.md
} as const;

// ========================================
// LINE HEIGHTS
// ========================================

export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

// ========================================
// FONT WEIGHTS
// ========================================

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// ========================================
// Z-INDEX LAYERS
// ========================================

export const zIndex = {
  behind: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

// ========================================
// OPACITY VALUES
// ========================================

export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  15: '0.15',
  20: '0.2',
  25: '0.25',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  80: '0.8',
  90: '0.9',
  95: '0.95',
  100: '1',
} as const;

// ========================================
// RAW COLOR PALETTE (used for rgba construction)
// ========================================

export const palette = {
  // Primary violet family
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },

  // Purple accent
  purple: {
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
  },

  // Blue accent
  blue: {
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
  },

  // Cyan accent
  cyan: {
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
  },

  // Pink accent
  pink: {
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
  },

  // Status: Success (emerald/green)
  emerald: {
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
  },

  // Status: Warning (amber/yellow)
  amber: {
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },

  // Status: Error (red/rose)
  red: {
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#ef4444',
    700: '#dc2626',
    800: '#b91c1c',
  },

  // Neutral slate
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  white: '#ffffff',
  black: '#000000',
} as const;

// ========================================
// RGBA COLOR HELPERS
// ========================================

/**
 * Create rgba color from hex
 */
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/**
 * Common rgba values used throughout the library
 */
export const rgba = {
  white: (alpha: number) => `rgba(255,255,255,${alpha})`,
  black: (alpha: number) => `rgba(0,0,0,${alpha})`,
  violet: (alpha: number) => `rgba(124,58,237,${alpha})`,
  purple: (alpha: number) => `rgba(168,85,247,${alpha})`,
  blue: (alpha: number) => `rgba(59,130,246,${alpha})`,
  cyan: (alpha: number) => `rgba(6,182,212,${alpha})`,
  pink: (alpha: number) => `rgba(236,72,153,${alpha})`,
  emerald: (alpha: number) => `rgba(16,185,129,${alpha})`,
  amber: (alpha: number) => `rgba(245,158,11,${alpha})`,
  red: (alpha: number) => `rgba(239,68,68,${alpha})`,
  slate: {
    700: (alpha: number) => `rgba(51,65,85,${alpha})`,
    800: (alpha: number) => `rgba(30,41,59,${alpha})`,
    900: (alpha: number) => `rgba(15,23,42,${alpha})`,
  },
} as const;

// ========================================
// GLASS EFFECT TOKENS
// ========================================

export const glass = {
  // Glass background intensities
  bg: {
    subtle: rgba.white(0.05),
    light: rgba.white(0.08),
    medium: rgba.white(0.10),
    strong: rgba.white(0.15),
    intense: rgba.white(0.25),
  },

  // Glass border intensities
  border: {
    subtle: rgba.white(0.05),
    light: rgba.white(0.10),
    medium: rgba.white(0.15),
    strong: rgba.white(0.20),
    intense: rgba.white(0.30),
  },

  // Blur values for glass effect
  blur: {
    subtle: blur.sm,
    medium: blur.md,
    strong: blur.lg,
    intense: blur.xl,
  },
} as const;

// ========================================
// SHADOW TOKENS
// ========================================

export const shadow = {
  // Standard shadows
  sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
  base: '0 4px 6px -1px rgba(0,0,0,0.1)',
  md: '0 10px 15px -3px rgba(0,0,0,0.1)',
  lg: '0 20px 25px -5px rgba(0,0,0,0.1)',
  xl: '0 25px 50px -12px rgba(0,0,0,0.25)',

  // Glow shadows
  glow: {
    violet: `0 0 30px ${rgba.purple(0.6)}, 0 0 60px ${rgba.purple(0.3)}`,
    violetSubtle: `0 8px 32px ${rgba.violet(0.3)}`,
    blue: `0 8px 32px ${rgba.blue(0.3)}`,
    cyan: `0 8px 32px ${rgba.cyan(0.25)}`,
    emerald: `0 0 20px ${rgba.emerald(0.4)}`,
    amber: `0 0 20px ${rgba.amber(0.4)}`,
    red: `0 0 20px ${rgba.red(0.4)}`,
  },

  // Button shadows
  button: {
    primary: `0 4px 15px ${rgba.violet(0.25)}`,
    primaryHover: `0 0 30px ${rgba.purple(0.6)}, 0 0 60px ${rgba.purple(0.3)}`,
    secondary: '0 4px 20px rgba(0,0,0,0.08)',
    danger: `0 0 20px ${rgba.red(0.4)}`,
    success: `0 0 20px ${rgba.emerald(0.4)}`,
  },

  // Input focus shadow
  focus: {
    violet: `0 0 0 3px ${rgba.violet(0.25)}, 0 0 20px ${rgba.purple(0.2)}`,
    neutral: '0 0 0 3px rgba(0,0,0,0.05)',
  },

  // Card shadows
  card: {
    default: '0 8px 32px rgba(0,0,0,0.12)',
    hover: `0 8px 32px ${rgba.violet(0.3)}`,
  },

  // Modal/dropdown shadows
  overlay: {
    modal: `0 25px 80px ${rgba.purple(0.3)}`,
    dropdown: `0 15px 50px ${rgba.purple(0.25)}`,
  },
} as const;

// ========================================
// GRADIENT TOKENS
// ========================================

export const gradient = {
  // Button gradients
  primary: `linear-gradient(135deg, ${palette.purple[500]}, ${palette.violet[500]})`,
  primaryHover: `linear-gradient(135deg, ${palette.purple[400]}, ${palette.purple[500]})`,
  danger: `linear-gradient(135deg, ${palette.red[500]}, ${palette.red[400]})`,
  success: `linear-gradient(135deg, ${palette.emerald[500]}, ${palette.emerald[400]})`,

  // Background gradients
  background: {
    glass: `linear-gradient(135deg, ${palette.slate[900]}, #581c87, ${palette.slate[900]})`,
    aurora: `linear-gradient(135deg, ${palette.slate[950]}, ${palette.slate[900]}, ${palette.slate[950]})`,
    light: `linear-gradient(135deg, ${palette.slate[100]}, #eff6ff, #f5f3ff)`,
  },

  // Text gradients
  text: {
    violet: `linear-gradient(135deg, ${palette.violet[400]}, ${palette.blue[400]})`,
  },

  // Rainbow for progress bars
  rainbow: {
    default: `linear-gradient(90deg,
      ${palette.emerald[400]},
      ${palette.cyan[400]},
      ${palette.blue[400]},
      ${palette.violet[400]},
      ${palette.purple[400]},
      ${palette.pink[400]}
    )`,
  },

  // Progress bar
  progress: {
    violet: `linear-gradient(90deg, ${palette.violet[500]}, ${palette.purple[500]})`,
  },
} as const;

// ========================================
// ANIMATION TOKENS
// ========================================

export const animation = {
  // Timing functions
  timing: {
    fadeIn: `${duration.fast}ms ${easing.default}`,
    slideIn: `${duration.base}ms ${easing.default}`,
    scaleIn: `${duration.base}ms ${easing.default}`,
    hover: `${duration.slow}ms ${easing.smooth}`,
    button: `${duration.slow}ms ${easing.default}`,
    modal: `${duration.slow}ms ${easing.smooth}`,
    dropdown: `${duration.base}ms ${easing.smooth}`,
  },

  // CSS transition strings
  transition: {
    all: `all ${duration.slow}ms ${easing.smooth}`,
    colors: `color ${duration.base}ms ${easing.default}, background-color ${duration.base}ms ${easing.default}, border-color ${duration.base}ms ${easing.default}`,
    transform: `transform ${duration.base}ms ${easing.smooth}`,
    opacity: `opacity ${duration.fast}ms ${easing.default}`,
    shadow: `box-shadow ${duration.slow}ms ${easing.smooth}`,
  },
} as const;

// ========================================
// COMPONENT-SPECIFIC TOKENS
// ========================================

export const component = {
  button: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
    padding: {
      sm: `${spacing[2]} ${spacing[3]}`,
      md: `${spacing[2.5]} ${spacing[4]}`,
      lg: `${spacing[3]} ${spacing[6]}`,
    },
    fontSize: {
      sm: fontSize.xs,
      md: fontSize.sm,
      lg: fontSize.base,
    },
    iconSize: {
      sm: '14px',
      md: '16px',
      lg: '18px',
    },
  },

  input: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
    padding: {
      sm: `${spacing[2]} ${spacing[3]}`,
      md: `${spacing[2.5]} ${spacing[4]}`,
      lg: `${spacing[3]} ${spacing[5]}`,
    },
    fontSize: {
      sm: fontSize.sm,
      md: fontSize.sm,
      lg: fontSize.base,
    },
  },

  badge: {
    height: {
      sm: '18px',
      md: '22px',
      lg: '26px',
    },
    padding: {
      sm: `${spacing[0.5]} ${spacing[2]}`,
      md: `${spacing[1]} ${spacing[2.5]}`,
      lg: `${spacing[1.5]} ${spacing[3]}`,
    },
    fontSize: {
      sm: '10px',
      md: fontSize.xs,
      lg: fontSize.sm,
    },
  },

  avatar: {
    size: {
      xs: '24px',
      sm: '32px',
      md: '40px',
      lg: '56px',
      xl: '72px',
      '2xl': '96px',
    },
    fontSize: {
      xs: '10px',
      sm: fontSize.xs,
      md: fontSize.sm,
      lg: fontSize.lg,
      xl: fontSize.xl,
      '2xl': fontSize['2xl'],
    },
  },

  modal: {
    width: {
      sm: '400px',
      md: '500px',
      lg: '640px',
      xl: '800px',
    },
    padding: spacing[6],
    borderRadius: radius.xl,
  },

  card: {
    padding: {
      sm: spacing[3],
      md: spacing[4],
      lg: spacing[6],
    },
    borderRadius: radius.xl,
  },

  tooltip: {
    padding: `${spacing[1.5]} ${spacing[3]}`,
    fontSize: fontSize.sm,
    borderRadius: radius.md,
    maxWidth: '250px',
  },

  dropdown: {
    minWidth: '160px',
    maxWidth: '320px',
    padding: spacing[1],
    itemPadding: `${spacing[2]} ${spacing[3]}`,
    borderRadius: radius.lg,
  },

  toggle: {
    width: '44px',
    height: '24px',
    thumbSize: '18px',
    borderRadius: radius.full,
  },

  checkbox: {
    size: '20px',
    borderRadius: radius.sm,
  },

  slider: {
    trackHeight: '6px',
    thumbSize: '18px',
    borderRadius: radius.full,
  },

  progress: {
    height: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    borderRadius: radius.full,
  },
} as const;

// ========================================
// TYPE EXPORTS
// ========================================

export type BlurToken = keyof typeof blur;
export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
export type FontSizeToken = keyof typeof fontSize;
export type FontWeightToken = keyof typeof fontWeight;
export type ZIndexToken = keyof typeof zIndex;
export type OpacityToken = keyof typeof opacity;
