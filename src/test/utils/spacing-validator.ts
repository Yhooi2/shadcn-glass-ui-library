/**
 * Spacing Validator
 *
 * Validates that spacing values conform to the 8px base grid system.
 * All spacing should be on 4px increments (half-grid allowed for fine-tuning).
 */

import { SPACING_TOKENS } from './design-tokens';

export interface SpacingViolation {
  property: string;
  value: number;
  message: string;
}

export interface SpacingValidationResult {
  valid: boolean;
  violations: SpacingViolation[];
}

/**
 * Parse a CSS pixel value string to a number
 * @param cssValue - CSS value like "16px" or "1.5rem"
 * @returns Pixel value as number, or null if not parseable
 */
export function parsePixelValue(cssValue: string): number | null {
  if (!cssValue || cssValue === 'auto' || cssValue === 'none') {
    return null;
  }

  // Handle pixel values
  const pxMatch = cssValue.match(/^([\d.]+)px$/);
  if (pxMatch) {
    return parseFloat(pxMatch[1]);
  }

  // Handle rem values (assume 16px base)
  const remMatch = cssValue.match(/^([\d.]+)rem$/);
  if (remMatch) {
    return parseFloat(remMatch[1]) * 16;
  }

  // Handle em values (assume 16px base for simplicity)
  const emMatch = cssValue.match(/^([\d.]+)em$/);
  if (emMatch) {
    return parseFloat(emMatch[1]) * 16;
  }

  return null;
}

/**
 * Check if a spacing value is on the 8px grid (4px increments allowed)
 * Also allows 2px as a special hairline border value
 * @param value - Spacing value in pixels
 * @returns True if value is on the grid
 */
export function isOnGrid(value: number): boolean {
  // 0 is always valid
  if (value === 0) return true;

  // Allow 2px as a special hairline value for micro-adjustments
  if (value === 2) return true;

  // Allow 4px increments (half-grid for fine-tuning)
  return value % SPACING_TOKENS.HALF_UNIT === 0;
}

/**
 * Check if a spacing value is exactly on the 8px base unit
 * @param value - Spacing value in pixels
 * @returns True if value is on the 8px base
 */
export function isOnBaseGrid(value: number): boolean {
  if (value === 0) return true;
  return value % SPACING_TOKENS.BASE_UNIT === 0;
}

/**
 * Check if a spacing value is in the valid token scale
 * @param value - Spacing value in pixels
 * @returns True if value is a valid token
 */
export function isValidSpacingToken(value: number): boolean {
  return SPACING_TOKENS.VALID_VALUES.includes(value as (typeof SPACING_TOKENS.VALID_VALUES)[number]);
}

/**
 * Get the nearest valid spacing value
 * @param value - Current spacing value
 * @returns Nearest valid spacing value
 */
export function getNearestValidSpacing(value: number): number {
  if (value <= 0) return 0;

  let nearest: number = SPACING_TOKENS.VALID_VALUES[0];
  let minDiff = Math.abs(value - nearest);

  for (const validValue of SPACING_TOKENS.VALID_VALUES) {
    const diff = Math.abs(value - validValue);
    // Round up on tie (prefer larger spacing for better touch targets/readability)
    if (diff < minDiff || (diff === minDiff && validValue > nearest)) {
      minDiff = diff;
      nearest = validValue;
    }
  }

  return nearest;
}

/**
 * Validate spacing properties of an element
 * @param element - DOM element to validate
 * @returns Validation result with any violations
 */
export function validateElementSpacing(element: HTMLElement): SpacingValidationResult {
  const styles = window.getComputedStyle(element);
  const violations: SpacingViolation[] = [];

  const spacingProperties = [
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'gap',
    'rowGap',
    'columnGap',
  ] as const;

  for (const prop of spacingProperties) {
    const rawValue = styles[prop as keyof CSSStyleDeclaration] as string;
    const value = parsePixelValue(rawValue);

    if (value !== null && value !== 0 && !isOnGrid(value)) {
      violations.push({
        property: prop,
        value,
        message: `${prop}: ${value}px is not on 4px grid. Nearest valid: ${getNearestValidSpacing(value)}px`,
      });
    }
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

/**
 * Validate that glass card has appropriate padding (25-50% more than standard)
 * @param element - Glass card element
 * @returns Validation result
 */
export function validateGlassCardPadding(element: HTMLElement): SpacingValidationResult {
  const styles = window.getComputedStyle(element);
  const violations: SpacingViolation[] = [];

  const paddingProps = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'] as const;

  for (const prop of paddingProps) {
    const value = parsePixelValue(styles[prop as keyof CSSStyleDeclaration] as string);

    if (value !== null) {
      const { min, max } = SPACING_TOKENS.GLASS_CARD_PADDING;

      if (value < min) {
        violations.push({
          property: prop,
          value,
          message: `${prop}: ${value}px is too small for glass card. Minimum: ${min}px (25% more than standard ${SPACING_TOKENS.STANDARD_PADDING}px)`,
        });
      } else if (value > max) {
        violations.push({
          property: prop,
          value,
          message: `${prop}: ${value}px exceeds glass card maximum. Maximum: ${max}px`,
        });
      }
    }
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

/**
 * Validate touch target size
 * @param element - Interactive element
 * @returns Validation result
 */
export function validateTouchTarget(element: HTMLElement): SpacingValidationResult {
  const rect = element.getBoundingClientRect();
  const violations: SpacingViolation[] = [];
  const minSize = SPACING_TOKENS.TOUCH_TARGET_APPLE;

  if (rect.width < minSize) {
    violations.push({
      property: 'width',
      value: rect.width,
      message: `Touch target width ${rect.width}px is below minimum ${minSize}px (Apple HIG)`,
    });
  }

  if (rect.height < minSize) {
    violations.push({
      property: 'height',
      value: rect.height,
      message: `Touch target height ${rect.height}px is below minimum ${minSize}px (Apple HIG)`,
    });
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

/**
 * Validate modal padding according to specs
 * @param modalElement - Modal container element
 * @param headerElement - Modal header element (optional)
 * @param footerElement - Modal footer element (optional)
 * @returns Validation result
 */
export function validateModalPadding(
  modalElement: HTMLElement,
  headerElement?: HTMLElement | null,
  footerElement?: HTMLElement | null
): SpacingValidationResult {
  const violations: SpacingViolation[] = [];

  // Body padding should be 24px
  const bodyStyles = window.getComputedStyle(modalElement);
  const bodyPadding = parsePixelValue(bodyStyles.padding);

  if (bodyPadding !== null && bodyPadding !== 24) {
    violations.push({
      property: 'padding (body)',
      value: bodyPadding,
      message: `Modal body padding ${bodyPadding}px should be 24px`,
    });
  }

  // Header padding should be 20px
  if (headerElement) {
    const headerStyles = window.getComputedStyle(headerElement);
    const headerPadding = parsePixelValue(headerStyles.padding);

    if (headerPadding !== null && headerPadding !== 20) {
      violations.push({
        property: 'padding (header)',
        value: headerPadding,
        message: `Modal header padding ${headerPadding}px should be 20px`,
      });
    }
  }

  // Footer padding should be 20px
  if (footerElement) {
    const footerStyles = window.getComputedStyle(footerElement);
    const footerPadding = parsePixelValue(footerStyles.padding);

    if (footerPadding !== null && footerPadding !== 20) {
      violations.push({
        property: 'padding (footer)',
        value: footerPadding,
        message: `Modal footer padding ${footerPadding}px should be 20px`,
      });
    }
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

/**
 * Get all spacing values from an element as a map
 * @param element - DOM element
 * @returns Map of property names to pixel values
 */
export function getSpacingValues(element: HTMLElement): Map<string, number> {
  const styles = window.getComputedStyle(element);
  const values = new Map<string, number>();

  const properties = [
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'gap',
    'rowGap',
    'columnGap',
    'top',
    'right',
    'bottom',
    'left',
  ];

  for (const prop of properties) {
    const value = parsePixelValue(styles[prop as keyof CSSStyleDeclaration] as string);
    if (value !== null) {
      values.set(prop, value);
    }
  }

  return values;
}
