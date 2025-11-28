// ========================================
// GLASS THEME CONFIGURATION
// Constants and shared configuration values
// ========================================

/**
 * Animation durations in milliseconds
 */
export const ANIMATION_DURATION = {
  fast: 200,
  base: 300,
  slow: 500,
} as const;

/**
 * Z-index layers
 */
export const Z_INDEX = {
  dropdown: 50,
  modal: 50,
  tooltip: 60,
  toast: 70,
} as const;

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
