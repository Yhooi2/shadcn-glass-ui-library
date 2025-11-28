/**
 * Custom Hooks for Glass UI Library
 *
 * These hooks replace repeated patterns across components,
 * reducing code duplication and ensuring consistency.
 */

export { useHover, type UseHoverOptions, type UseHoverReturn } from './use-hover';
export { useFocus, type UseFocusOptions, type UseFocusReturn } from './use-focus';
export {
  useGlassStyles,
  type GlassStylesReturn,
  type GlassComputedStyles,
  type GlassSurfaceOptions,
  type GlassCardOptions,
  type GlowColor,
  type GlowIntensity,
} from './use-glass-styles';
