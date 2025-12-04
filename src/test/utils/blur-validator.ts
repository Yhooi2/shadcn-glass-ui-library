/**
 * Blur Validator
 *
 * Validates glassmorphism-specific properties including blur values,
 * opacity ranges, and glass layer counts.
 */

import { BLUR_TOKENS, OPACITY_TOKENS, GLASS_TOKENS } from './design-tokens';

export interface BlurValidationResult {
  valid: boolean;
  value: number | null;
  violations: string[];
}

export interface OpacityValidationResult {
  valid: boolean;
  value: number | null;
  context: 'decorative' | 'standard' | 'text' | 'navigation' | 'unknown';
  violations: string[];
}

export interface GlassLayerResult {
  count: number;
  valid: boolean;
  violations: string[];
}

/**
 * Parse blur value from backdrop-filter or filter CSS property
 * @param filterValue - CSS filter value like "blur(16px)"
 */
export function parseBlurValue(filterValue: string): number | null {
  if (!filterValue || filterValue === 'none') {
    return null;
  }

  const match = filterValue.match(/blur\(([\d.]+)px\)/);
  return match ? parseFloat(match[1]) : null;
}

/**
 * Parse saturate value from backdrop-filter
 */
export function parseSaturateValue(filterValue: string): number | null {
  if (!filterValue || filterValue === 'none') {
    return null;
  }

  // Match both "saturate(180%)" and "saturate(1.8)"
  const percentMatch = filterValue.match(/saturate\(([\d.]+)%\)/);
  if (percentMatch) {
    return parseFloat(percentMatch[1]) / 100;
  }

  const decimalMatch = filterValue.match(/saturate\(([\d.]+)\)/);
  if (decimalMatch) {
    return parseFloat(decimalMatch[1]);
  }

  return null;
}

/**
 * Check if an element has a glass effect (backdrop-filter with blur)
 */
export function hasGlassEffect(element: HTMLElement): boolean {
  const styles = window.getComputedStyle(element);
  const backdropFilter =
    styles.backdropFilter || (styles as unknown as Record<string, string>).webkitBackdropFilter;

  if (!backdropFilter || backdropFilter === 'none') {
    return false;
  }

  const blur = parseBlurValue(backdropFilter);
  return blur !== null && blur > 0;
}

/**
 * Get the backdrop-filter value from an element
 */
export function getBackdropFilter(element: HTMLElement): string {
  const styles = window.getComputedStyle(element);
  return (
    styles.backdropFilter ||
    (styles as unknown as Record<string, string>).webkitBackdropFilter ||
    'none'
  );
}

/**
 * Validate blur value against design tokens
 */
export function validateBlurValue(element: HTMLElement): BlurValidationResult {
  const backdropFilter = getBackdropFilter(element);
  const blur = parseBlurValue(backdropFilter);
  const violations: string[] = [];

  if (blur === null) {
    return { valid: true, value: null, violations };
  }

  // Check if blur is a valid token value
  const validBlurs = Object.values(BLUR_TOKENS.SCALE) as number[];
  if (!validBlurs.includes(blur)) {
    violations.push(
      `Blur value ${blur}px is not a valid token. Valid values: ${validBlurs.join(', ')}px`
    );
  }

  // Check for excessive blur
  if (blur > BLUR_TOKENS.HEAVY) {
    violations.push(`Blur value ${blur}px exceeds maximum ${BLUR_TOKENS.HEAVY}px`);
  }

  return {
    valid: violations.length === 0,
    value: blur,
    violations,
  };
}

/**
 * Validate modal blur (should be exactly 24px)
 */
export function validateModalBlur(element: HTMLElement): BlurValidationResult {
  const backdropFilter = getBackdropFilter(element);
  const blur = parseBlurValue(backdropFilter);
  const violations: string[] = [];

  if (blur === null) {
    violations.push('Modal should have backdrop-filter blur');
    return { valid: false, value: null, violations };
  }

  if (blur !== BLUR_TOKENS.MODAL) {
    violations.push(`Modal blur should be ${BLUR_TOKENS.MODAL}px, got ${blur}px`);
  }

  return {
    valid: violations.length === 0,
    value: blur,
    violations,
  };
}

/**
 * Parse opacity from background-color RGBA
 */
export function parseBackgroundOpacity(element: HTMLElement): number | null {
  const styles = window.getComputedStyle(element);
  const bgColor = styles.backgroundColor;

  if (!bgColor || bgColor === 'transparent') {
    return 0;
  }

  // Parse rgba(r, g, b, a)
  const match = bgColor.match(/rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*(?:,\s*([\d.]+)\s*)?\)/);
  if (match) {
    return match[1] ? parseFloat(match[1]) : 1;
  }

  // Opaque color (no alpha)
  if (bgColor.startsWith('rgb(')) {
    return 1;
  }

  return null;
}

/**
 * Determine opacity context based on element role
 */
export function determineOpacityContext(
  element: HTMLElement
): 'decorative' | 'standard' | 'text' | 'navigation' | 'unknown' {
  const tagName = element.tagName.toLowerCase();
  const role = element.getAttribute('role');
  const className = element.className;

  // Navigation elements
  if (
    tagName === 'nav' ||
    role === 'navigation' ||
    className.includes('nav') ||
    className.includes('header')
  ) {
    return 'navigation';
  }

  // Standard cards (check before content-based detection)
  if (className.includes('card') || className.includes('panel') || className.includes('glass')) {
    return 'standard';
  }

  // Text containers
  if (
    className.includes('text-container') ||
    className.includes('content') ||
    element.textContent?.trim().length &&
      (element.textContent?.trim().length ?? 0) > 50
  ) {
    return 'text';
  }

  // Decorative (empty elements or explicit decorative classes)
  if (
    className.includes('decorative') ||
    className.includes('background') ||
    !element.textContent?.trim()
  ) {
    return 'decorative';
  }

  return 'unknown';
}

/**
 * Validate glass surface opacity
 */
export function validateGlassOpacity(element: HTMLElement): OpacityValidationResult {
  const opacity = parseBackgroundOpacity(element);
  const context = determineOpacityContext(element);
  const violations: string[] = [];

  if (opacity === null) {
    return { valid: true, value: null, context, violations };
  }

  let validRange: { min: number; max: number };

  switch (context) {
    case 'decorative':
      validRange = OPACITY_TOKENS.DECORATIVE;
      break;
    case 'standard':
      validRange = OPACITY_TOKENS.STANDARD_CARDS;
      break;
    case 'text':
      validRange = OPACITY_TOKENS.TEXT_CONTAINERS;
      break;
    case 'navigation':
      validRange = OPACITY_TOKENS.NAVIGATION;
      break;
    default:
      validRange = OPACITY_TOKENS.STANDARD_CARDS;
  }

  if (opacity < validRange.min || opacity > validRange.max) {
    violations.push(
      `${context} glass opacity ${(opacity * 100).toFixed(0)}% is outside valid range ` +
        `${(validRange.min * 100).toFixed(0)}-${(validRange.max * 100).toFixed(0)}%`
    );
  }

  return {
    valid: violations.length === 0,
    value: opacity,
    context,
    violations,
  };
}

/**
 * Count glass layers in a container
 * Returns count and validation against max layers
 */
export function countGlassLayers(container: HTMLElement): GlassLayerResult {
  let count = 0;
  const violations: string[] = [];

  // Check the container itself
  if (hasGlassEffect(container)) {
    count++;
  }

  // Check all descendants
  const descendants = container.querySelectorAll('*');
  for (const el of descendants) {
    if (hasGlassEffect(el as HTMLElement)) {
      count++;
    }
  }

  if (count > GLASS_TOKENS.MAX_LAYERS_PER_VIEW) {
    violations.push(
      `Found ${count} glass layers, exceeds maximum ${GLASS_TOKENS.MAX_LAYERS_PER_VIEW} per view`
    );
  }

  return {
    count,
    valid: violations.length === 0,
    violations,
  };
}

/**
 * Validate that small elements don't have glass effect
 * Glass effects don't work on small elements
 */
export function validateNoGlassOnSmallElements(element: HTMLElement): BlurValidationResult {
  const rect = element.getBoundingClientRect();
  const violations: string[] = [];
  const blur = parseBlurValue(getBackdropFilter(element));

  // Check element dimensions
  const minDimension = Math.min(rect.width, rect.height);

  if (blur !== null && blur > 0 && minDimension < GLASS_TOKENS.MIN_GLASS_SIZE) {
    violations.push(
      `Element is too small (${minDimension}px) for glass effect. ` +
        `Minimum size: ${GLASS_TOKENS.MIN_GLASS_SIZE}px`
    );
  }

  return {
    valid: violations.length === 0,
    value: blur,
    violations,
  };
}

/**
 * Validate that certain element types don't have glass effect
 */
export function validateNoGlassOnElement(
  element: HTMLElement,
  elementType: string
): BlurValidationResult {
  const violations: string[] = [];
  const blur = parseBlurValue(getBackdropFilter(element));

  const noGlassTypes = GLASS_TOKENS.NO_GLASS_ELEMENTS as readonly string[];

  if (noGlassTypes.includes(elementType.toLowerCase()) && blur !== null && blur > 0) {
    violations.push(
      `${elementType} elements should not have glass effect (blur: ${blur}px). ` +
        `Use solid or near-solid backgrounds instead.`
    );
  }

  return {
    valid: violations.length === 0,
    value: blur,
    violations,
  };
}

/**
 * Check if element has @supports fallback for backdrop-filter
 * This checks if the element has a solid background fallback
 */
export function hasBackdropFilterFallback(element: HTMLElement): boolean {
  // If backdrop-filter is not supported, background should be semi-opaque or solid
  if (!CSS.supports('backdrop-filter', 'blur(10px)')) {
    const opacity = parseBackgroundOpacity(element);
    return opacity !== null && opacity >= 0.5;
  }

  // Can't reliably check @supports in computed styles,
  // so this is a best-effort check
  return true;
}

/**
 * Get all glass-related properties from an element
 */
export function getGlassProperties(element: HTMLElement): {
  blur: number | null;
  saturate: number | null;
  opacity: number | null;
  hasGlass: boolean;
} {
  const backdropFilter = getBackdropFilter(element);

  return {
    blur: parseBlurValue(backdropFilter),
    saturate: parseSaturateValue(backdropFilter),
    opacity: parseBackgroundOpacity(element),
    hasGlass: hasGlassEffect(element),
  };
}
