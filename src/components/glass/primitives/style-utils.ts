/**
 * Style Utilities for Glass Components
 *
 * Centralized style constants and helper functions to reduce code duplication
 * and ensure consistency across all glass components.
 */

import type { CSSProperties } from 'react';

// ============================================
// ICON SIZES
// ============================================

/**
 * Standard icon size constants used across all glass components.
 * Provides consistent sizing with responsive variants.
 *
 * @example
 * ```tsx
 * <Icon className={ICON_SIZES.md} />
 * ```
 */
export const ICON_SIZES = {
  xs: 'w-2.5 h-2.5 md:w-3 md:h-3',
  sm: 'w-3 h-3 md:w-3.5 md:h-3.5',
  md: 'w-3.5 h-3.5 md:w-4 md:h-4', // Most common - default
  lg: 'w-4 h-4 md:w-5 md:h-5',
  xl: 'w-5 h-5 md:w-6 md:h-6',
} as const;

/**
 * Type representing available icon sizes
 */
export type IconSize = keyof typeof ICON_SIZES;

// ============================================
// GLASS SURFACE STYLES
// ============================================

/**
 * Options for generating glass surface styles
 */
export interface GlassSurfaceOptions {
  /** CSS variable for background, e.g. 'var(--card-bg)' */
  bg: string;
  /** CSS variable for border color */
  border: string;
  /** Blur intensity level */
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  /** CSS variable for glow/shadow effect */
  shadow?: string;
}

/**
 * Generate consistent glass surface styles with backdrop blur.
 *
 * Applies glassmorphism effect with configurable blur, background,
 * border, and optional glow shadow.
 *
 * @param options - Surface styling options
 * @returns React CSSProperties object
 *
 * @example
 * ```tsx
 * const styles = getGlassSurfaceStyles({
 *   bg: 'var(--card-bg)',
 *   border: 'var(--card-border)',
 *   blur: 'md',
 *   shadow: 'var(--glow-primary)'
 * });
 * ```
 */
export function getGlassSurfaceStyles(
  options: GlassSurfaceOptions
): CSSProperties {
  const blurValue = options.blur ?? 'md';
  return {
    background: options.bg,
    border: `1px solid ${options.border}`,
    backdropFilter: `blur(var(--blur-${blurValue}))`,
    WebkitBackdropFilter: `blur(var(--blur-${blurValue}))`,
    boxShadow: options.shadow ?? 'none',
  };
}

// ============================================
// HOVER TRANSFORM STYLES
// ============================================

/**
 * Options for hover transform effects
 */
export interface HoverTransformOptions {
  /** Enable vertical lift effect (translateY) */
  lift?: boolean;
  /** Scale factor on hover (e.g., 1.02) */
  scale?: number;
}

/**
 * Generate hover transform styles with smooth transitions.
 *
 * Provides consistent hover animations across interactive elements.
 * Supports lift (translateY) and scale effects.
 *
 * @param isHovered - Current hover state
 * @param options - Transform options
 * @returns React CSSProperties object
 *
 * @example
 * ```tsx
 * const styles = getHoverTransformStyles(isHovered, {
 *   lift: true,
 *   scale: 1.02
 * });
 * ```
 */
export function getHoverTransformStyles(
  isHovered: boolean,
  options?: HoverTransformOptions
): CSSProperties {
  const { lift = true, scale } = options ?? {};

  const transforms: string[] = [];

  if (lift) {
    transforms.push(isHovered ? 'translateY(-2px)' : 'translateY(0)');
  }

  if (scale && isHovered) {
    transforms.push(`scale(${scale})`);
  }

  return {
    transform: transforms.join(' ') || 'none',
    transition: 'transform var(--transition-base)',
  };
}

// ============================================
// FORM FIELD BORDER COLOR
// ============================================

/**
 * Options for determining form field border color
 */
export interface StateBorderColorOptions {
  /** Error message (highest priority) */
  error?: string;
  /** Success message */
  success?: string;
  /** Focus state */
  isFocused?: boolean;
  /** Default border color when no state is active */
  defaultColor?: string;
}

/**
 * Determine border color based on form field state.
 *
 * Priority order: error > success > focus > default
 *
 * @param options - State and color options
 * @returns CSS variable string for border color
 *
 * @example
 * ```tsx
 * const borderColor = getStateBorderColor({
 *   error: 'Username is required',
 *   isFocused: true,
 *   defaultColor: 'var(--input-border)'
 * });
 * // Returns: 'var(--alert-danger-text)' due to error priority
 * ```
 */
export function getStateBorderColor(
  options: StateBorderColorOptions
): string {
  if (options.error) return 'var(--alert-danger-text)';
  if (options.success) return 'var(--alert-success-text)';
  if (options.isFocused) return 'var(--input-focus-border)';
  return options.defaultColor ?? 'var(--input-border)';
}

// ============================================
// BLUR VALUES
// ============================================

/**
 * Standard blur values from design system (UI_DIZINE.md)
 *
 * - sm: 8px (subtle effects, close to surface)
 * - md: 16px (standard glassmorphism)
 * - lg: 24px (prominent glass layers)
 * - xl: 32px (heavy blur for modals/overlays)
 */
export const BLUR_VALUES = {
  sm: 'var(--blur-sm)', // 8px
  md: 'var(--blur-md)', // 16px
  lg: 'var(--blur-lg)', // 24px
  xl: 'var(--blur-xl)', // 32px
} as const;

/**
 * Type representing available blur levels
 */
export type BlurLevel = keyof typeof BLUR_VALUES;

// ============================================
// TRANSITION DURATIONS
// ============================================

/**
 * Standard transition duration constants
 *
 * Matches design system animation tokens
 */
export const TRANSITIONS = {
  fast: 'var(--transition-fast)', // 150ms
  base: 'var(--transition-base)', // 200ms
  slow: 'var(--transition-slow)', // 300ms
} as const;

/**
 * Type representing available transition speeds
 */
export type TransitionSpeed = keyof typeof TRANSITIONS;
