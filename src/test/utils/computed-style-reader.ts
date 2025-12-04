/**
 * Computed Style Reader
 *
 * Utilities for extracting and parsing computed CSS values from elements.
 * Provides structured access to all relevant style properties for compliance testing.
 */

import { parsePixelValue } from './spacing-validator';
import { parseBlurValue, parseSaturateValue, parseBackgroundOpacity } from './blur-validator';
import { parseColor, type ColorParseResult } from './contrast-checker';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface BoxSpacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface BorderRadius {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

export interface Dimensions {
  width: number;
  height: number;
  minWidth: number | null;
  maxWidth: number | null;
  minHeight: number | null;
  maxHeight: number | null;
}

export interface Typography {
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number | null;
  fontFamily: string;
}

export interface GlassEffect {
  blur: number | null;
  saturate: number | null;
  backgroundOpacity: number | null;
  hasBackdropFilter: boolean;
}

export interface ColorValues {
  color: ColorParseResult | null;
  backgroundColor: ColorParseResult | null;
  borderColor: ColorParseResult | null;
  rawColor: string;
  rawBackgroundColor: string;
  rawBorderColor: string;
}

export interface ShadowInfo {
  boxShadow: string;
  textShadow: string;
  hasBoxShadow: boolean;
  hasTextShadow: boolean;
}

export interface ComputedStyleSnapshot {
  // Spacing
  padding: BoxSpacing;
  margin: BoxSpacing;
  gap: number | null;
  rowGap: number | null;
  columnGap: number | null;

  // Dimensions
  dimensions: Dimensions;
  boundingRect: DOMRect;

  // Border
  borderRadius: BorderRadius;
  borderWidth: BoxSpacing;

  // Typography
  typography: Typography;

  // Colors
  colors: ColorValues;

  // Glass effects
  glass: GlassEffect;

  // Shadows
  shadows: ShadowInfo;

  // Display
  display: string;
  position: string;
  visibility: string;
  opacity: number;

  // Transitions/Animations
  transition: string;
  animation: string;

  // Raw computed styles reference
  raw: CSSStyleDeclaration;
}

// ============================================
// PARSING HELPERS
// ============================================

/**
 * Parse a box property (padding, margin, border-width) into structured values
 */
function parseBoxProperty(
  styles: CSSStyleDeclaration,
  prefix: string
): BoxSpacing {
  return {
    top: parsePixelValue(styles.getPropertyValue(`${prefix}-top`)) ?? 0,
    right: parsePixelValue(styles.getPropertyValue(`${prefix}-right`)) ?? 0,
    bottom: parsePixelValue(styles.getPropertyValue(`${prefix}-bottom`)) ?? 0,
    left: parsePixelValue(styles.getPropertyValue(`${prefix}-left`)) ?? 0,
  };
}

/**
 * Parse border-radius into structured values
 */
function parseBorderRadius(styles: CSSStyleDeclaration): BorderRadius {
  return {
    topLeft: parsePixelValue(styles.borderTopLeftRadius) ?? 0,
    topRight: parsePixelValue(styles.borderTopRightRadius) ?? 0,
    bottomRight: parsePixelValue(styles.borderBottomRightRadius) ?? 0,
    bottomLeft: parsePixelValue(styles.borderBottomLeftRadius) ?? 0,
  };
}

/**
 * Parse dimension properties
 */
function parseDimensions(styles: CSSStyleDeclaration, rect: DOMRect): Dimensions {
  return {
    width: rect.width,
    height: rect.height,
    minWidth: parsePixelValue(styles.minWidth),
    maxWidth: parsePixelValue(styles.maxWidth),
    minHeight: parsePixelValue(styles.minHeight),
    maxHeight: parsePixelValue(styles.maxHeight),
  };
}

/**
 * Parse typography properties
 */
function parseTypography(styles: CSSStyleDeclaration): Typography {
  const fontSize = parseFloat(styles.fontSize) || 16;
  const lineHeightValue = styles.lineHeight;

  // Line height can be a number, px, or 'normal'
  let lineHeight: number;
  if (lineHeightValue === 'normal') {
    lineHeight = 1.2;
  } else if (lineHeightValue.endsWith('px')) {
    lineHeight = parseFloat(lineHeightValue) / fontSize;
  } else {
    lineHeight = parseFloat(lineHeightValue) || 1.5;
  }

  return {
    fontSize,
    fontWeight: parseInt(styles.fontWeight, 10) || 400,
    lineHeight,
    letterSpacing: parsePixelValue(styles.letterSpacing),
    fontFamily: styles.fontFamily,
  };
}

/**
 * Parse glass effect properties
 */
function parseGlassEffect(styles: CSSStyleDeclaration, element: HTMLElement): GlassEffect {
  const backdropFilter =
    styles.backdropFilter ||
    (styles as unknown as Record<string, string>).webkitBackdropFilter ||
    'none';

  return {
    blur: parseBlurValue(backdropFilter),
    saturate: parseSaturateValue(backdropFilter),
    backgroundOpacity: parseBackgroundOpacity(element),
    hasBackdropFilter: backdropFilter !== 'none',
  };
}

/**
 * Parse color values
 */
function parseColors(styles: CSSStyleDeclaration): ColorValues {
  const rawColor = styles.color;
  const rawBackgroundColor = styles.backgroundColor;
  const rawBorderColor = styles.borderColor;

  return {
    color: parseColor(rawColor),
    backgroundColor: parseColor(rawBackgroundColor),
    borderColor: parseColor(rawBorderColor),
    rawColor,
    rawBackgroundColor,
    rawBorderColor,
  };
}

/**
 * Parse shadow properties
 */
function parseShadows(styles: CSSStyleDeclaration): ShadowInfo {
  const boxShadow = styles.boxShadow;
  const textShadow = styles.textShadow;

  return {
    boxShadow,
    textShadow,
    hasBoxShadow: boxShadow !== 'none' && boxShadow !== '',
    hasTextShadow: textShadow !== 'none' && textShadow !== '',
  };
}

// ============================================
// MAIN FUNCTIONS
// ============================================

/**
 * Get a complete snapshot of an element's computed styles
 */
export function getComputedStyleSnapshot(element: HTMLElement): ComputedStyleSnapshot {
  const styles = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  return {
    padding: parseBoxProperty(styles, 'padding'),
    margin: parseBoxProperty(styles, 'margin'),
    gap: parsePixelValue(styles.gap),
    rowGap: parsePixelValue(styles.rowGap),
    columnGap: parsePixelValue(styles.columnGap),

    dimensions: parseDimensions(styles, rect),
    boundingRect: rect,

    borderRadius: parseBorderRadius(styles),
    borderWidth: parseBoxProperty(styles, 'border'),

    typography: parseTypography(styles),
    colors: parseColors(styles),
    glass: parseGlassEffect(styles, element),
    shadows: parseShadows(styles),

    display: styles.display,
    position: styles.position,
    visibility: styles.visibility,
    opacity: parseFloat(styles.opacity) || 1,

    transition: styles.transition,
    animation: styles.animation,

    raw: styles,
  };
}

/**
 * Get specific style value with fallback
 */
export function getStyleValue<T>(
  element: HTMLElement,
  property: keyof CSSStyleDeclaration,
  parser: (value: string) => T | null,
  fallback: T
): T {
  const styles = window.getComputedStyle(element);
  const value = styles[property];

  if (typeof value !== 'string') {
    return fallback;
  }

  const parsed = parser(value);
  return parsed !== null ? parsed : fallback;
}

/**
 * Compare computed padding against expected values
 */
export function comparePadding(
  element: HTMLElement,
  expected: Partial<BoxSpacing>
): { matches: boolean; differences: string[] } {
  const snapshot = getComputedStyleSnapshot(element);
  const differences: string[] = [];

  if (expected.top !== undefined && snapshot.padding.top !== expected.top) {
    differences.push(`padding-top: expected ${expected.top}px, got ${snapshot.padding.top}px`);
  }
  if (expected.right !== undefined && snapshot.padding.right !== expected.right) {
    differences.push(
      `padding-right: expected ${expected.right}px, got ${snapshot.padding.right}px`
    );
  }
  if (expected.bottom !== undefined && snapshot.padding.bottom !== expected.bottom) {
    differences.push(
      `padding-bottom: expected ${expected.bottom}px, got ${snapshot.padding.bottom}px`
    );
  }
  if (expected.left !== undefined && snapshot.padding.left !== expected.left) {
    differences.push(`padding-left: expected ${expected.left}px, got ${snapshot.padding.left}px`);
  }

  return {
    matches: differences.length === 0,
    differences,
  };
}

/**
 * Compare computed dimensions against expected values with tolerance
 */
export function compareDimensions(
  element: HTMLElement,
  expected: Partial<{ width: number; height: number }>,
  tolerance: number = 2
): { matches: boolean; differences: string[] } {
  const snapshot = getComputedStyleSnapshot(element);
  const differences: string[] = [];

  if (expected.width !== undefined) {
    const diff = Math.abs(snapshot.dimensions.width - expected.width);
    if (diff > tolerance) {
      differences.push(
        `width: expected ${expected.width}px, got ${snapshot.dimensions.width}px (diff: ${diff}px)`
      );
    }
  }

  if (expected.height !== undefined) {
    const diff = Math.abs(snapshot.dimensions.height - expected.height);
    if (diff > tolerance) {
      differences.push(
        `height: expected ${expected.height}px, got ${snapshot.dimensions.height}px (diff: ${diff}px)`
      );
    }
  }

  return {
    matches: differences.length === 0,
    differences,
  };
}

/**
 * Compare border radius against expected values
 */
export function compareBorderRadius(
  element: HTMLElement,
  expected: number | Partial<BorderRadius>
): { matches: boolean; differences: string[] } {
  const snapshot = getComputedStyleSnapshot(element);
  const differences: string[] = [];

  if (typeof expected === 'number') {
    // Single value - all corners should match
    const corners = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'] as const;
    for (const corner of corners) {
      if (snapshot.borderRadius[corner] !== expected) {
        differences.push(
          `border-radius-${corner}: expected ${expected}px, got ${snapshot.borderRadius[corner]}px`
        );
      }
    }
  } else {
    // Partial comparison
    if (expected.topLeft !== undefined && snapshot.borderRadius.topLeft !== expected.topLeft) {
      differences.push(
        `border-top-left-radius: expected ${expected.topLeft}px, got ${snapshot.borderRadius.topLeft}px`
      );
    }
    if (expected.topRight !== undefined && snapshot.borderRadius.topRight !== expected.topRight) {
      differences.push(
        `border-top-right-radius: expected ${expected.topRight}px, got ${snapshot.borderRadius.topRight}px`
      );
    }
    if (
      expected.bottomRight !== undefined &&
      snapshot.borderRadius.bottomRight !== expected.bottomRight
    ) {
      differences.push(
        `border-bottom-right-radius: expected ${expected.bottomRight}px, got ${snapshot.borderRadius.bottomRight}px`
      );
    }
    if (
      expected.bottomLeft !== undefined &&
      snapshot.borderRadius.bottomLeft !== expected.bottomLeft
    ) {
      differences.push(
        `border-bottom-left-radius: expected ${expected.bottomLeft}px, got ${snapshot.borderRadius.bottomLeft}px`
      );
    }
  }

  return {
    matches: differences.length === 0,
    differences,
  };
}

/**
 * Get font information formatted for logging
 */
export function getTypographyInfo(element: HTMLElement): string {
  const snapshot = getComputedStyleSnapshot(element);
  const { typography } = snapshot;

  return (
    `font-size: ${typography.fontSize}px, ` +
    `font-weight: ${typography.fontWeight}, ` +
    `line-height: ${typography.lineHeight.toFixed(2)}`
  );
}

/**
 * Get glass effect information formatted for logging
 */
export function getGlassInfo(element: HTMLElement): string {
  const snapshot = getComputedStyleSnapshot(element);
  const { glass } = snapshot;

  if (!glass.hasBackdropFilter) {
    return 'No glass effect';
  }

  return (
    `blur: ${glass.blur ?? 0}px, ` +
    `saturate: ${glass.saturate ?? 1}, ` +
    `bg-opacity: ${((glass.backgroundOpacity ?? 0) * 100).toFixed(0)}%`
  );
}
