/**
 * Glass Primitives - Barrel Export
 *
 * Centralized export for all primitive components and utilities.
 * These primitives eliminate code duplication and provide consistent
 * building blocks for all glass components.
 */

// ============================================
// STYLE UTILITIES
// ============================================

export {
  ICON_SIZES,
  type IconSize,
  getGlassSurfaceStyles,
  type GlassSurfaceOptions,
  getHoverTransformStyles,
  type HoverTransformOptions,
  getStateBorderColor,
  type StateBorderColorOptions,
  BLUR_VALUES,
  type BlurLevel,
  TRANSITIONS,
  type TransitionSpeed,
} from './style-utils';

// ============================================
// TOUCH TARGET
// ============================================

export { TouchTarget, type TouchTargetProps } from './touch-target';

// ============================================
// FORM FIELD WRAPPER
// ============================================

export {
  FormFieldWrapper,
  type FormFieldWrapperProps,
} from './form-field-wrapper';

// ============================================
// INTERACTIVE CARD
// ============================================

export {
  InteractiveCard,
  type InteractiveCardProps,
} from './interactive-card';
