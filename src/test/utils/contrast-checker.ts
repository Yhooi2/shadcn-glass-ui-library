/**
 * Contrast Checker
 *
 * Validates color contrast ratios according to WCAG 2.1 guidelines.
 * Provides utilities for checking text readability on glass backgrounds.
 */

import { COLOR_CONTRAST_TOKENS } from './design-tokens';

export interface ContrastResult {
  ratio: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  level: 'fail' | 'AA' | 'AAA';
}

export interface ColorParseResult {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Parse a color string to RGB(A) values
 * Supports: hex (#RGB, #RRGGBB, #RRGGBBAA), rgb(), rgba()
 */
export function parseColor(color: string): ColorParseResult | null {
  if (!color || color === 'transparent') {
    return null;
  }

  // Handle hex colors
  if (color.startsWith('#')) {
    return parseHexColor(color);
  }

  // Handle rgb/rgba
  if (color.startsWith('rgb')) {
    return parseRgbColor(color);
  }

  return null;
}

/**
 * Parse hex color to RGBA
 */
function parseHexColor(hex: string): ColorParseResult | null {
  const cleaned = hex.replace('#', '');

  let r: number, g: number, b: number, a: number = 1;

  if (cleaned.length === 3) {
    // #RGB
    r = parseInt(cleaned[0] + cleaned[0], 16);
    g = parseInt(cleaned[1] + cleaned[1], 16);
    b = parseInt(cleaned[2] + cleaned[2], 16);
  } else if (cleaned.length === 6) {
    // #RRGGBB
    r = parseInt(cleaned.slice(0, 2), 16);
    g = parseInt(cleaned.slice(2, 4), 16);
    b = parseInt(cleaned.slice(4, 6), 16);
  } else if (cleaned.length === 8) {
    // #RRGGBBAA
    r = parseInt(cleaned.slice(0, 2), 16);
    g = parseInt(cleaned.slice(2, 4), 16);
    b = parseInt(cleaned.slice(4, 6), 16);
    a = parseInt(cleaned.slice(6, 8), 16) / 255;
  } else {
    return null;
  }

  if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
    return null;
  }

  return { r, g, b, a };
}

/**
 * Parse rgb/rgba color string
 */
function parseRgbColor(rgb: string): ColorParseResult | null {
  const match = rgb.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/);

  if (!match) {
    // Try modern space-separated syntax
    const modernMatch = rgb.match(
      /rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+%?)\s*)?\)/
    );
    if (!modernMatch) {
      return null;
    }

    const r = parseFloat(modernMatch[1]);
    const g = parseFloat(modernMatch[2]);
    const b = parseFloat(modernMatch[3]);
    let a = 1;

    if (modernMatch[4]) {
      a = modernMatch[4].endsWith('%')
        ? parseFloat(modernMatch[4]) / 100
        : parseFloat(modernMatch[4]);
    }

    return { r, g, b, a };
  }

  const r = parseFloat(match[1]);
  const g = parseFloat(match[2]);
  const b = parseFloat(match[3]);
  const a = match[4] ? parseFloat(match[4]) : 1;

  return { r, g, b, a };
}

/**
 * Calculate relative luminance of a color per WCAG 2.1
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function getRelativeLuminance(color: ColorParseResult): number {
  const [r, g, b] = [color.r, color.g, color.b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 * @see https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function getContrastRatio(color1: ColorParseResult, color2: ColorParseResult): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast meets WCAG requirements
 * @param textColor - Foreground color
 * @param bgColor - Background color
 * @param isLargeText - Whether text is large (>=18pt or >=14pt bold)
 */
export function checkContrast(
  textColor: string,
  bgColor: string,
  isLargeText: boolean = false
): ContrastResult {
  const text = parseColor(textColor);
  const bg = parseColor(bgColor);

  if (!text || !bg) {
    return {
      ratio: 0,
      meetsAA: false,
      meetsAAA: false,
      level: 'fail',
    };
  }

  const ratio = getContrastRatio(text, bg);
  const aaThreshold = isLargeText
    ? COLOR_CONTRAST_TOKENS.LARGE_TEXT_RATIO
    : COLOR_CONTRAST_TOKENS.BODY_TEXT_RATIO;
  const aaaThreshold = isLargeText
    ? COLOR_CONTRAST_TOKENS.BODY_TEXT_RATIO
    : COLOR_CONTRAST_TOKENS.AAA_BODY_TEXT_RATIO;

  const meetsAA = ratio >= aaThreshold;
  const meetsAAA = ratio >= aaaThreshold;

  return {
    ratio: Math.round(ratio * 100) / 100,
    meetsAA,
    meetsAAA,
    level: meetsAAA ? 'AAA' : meetsAA ? 'AA' : 'fail',
  };
}

/**
 * Check if a color is pure black (forbidden in the design system)
 */
export function isPureBlack(color: string): boolean {
  const normalizedColor = color.toLowerCase().trim();
  return COLOR_CONTRAST_TOKENS.FORBIDDEN_COLORS.some(
    (forbidden) => forbidden.toLowerCase() === normalizedColor
  );
}

/**
 * Check if a color is a recommended dark color
 */
export function isRecommendedDark(color: string): boolean {
  const normalizedColor = color.toLowerCase().trim();
  return COLOR_CONTRAST_TOKENS.RECOMMENDED_DARK.some(
    (recommended) => recommended.toLowerCase() === normalizedColor
  );
}

/**
 * Blend a semi-transparent color with a background
 * Used for testing glass surfaces against backgrounds
 */
export function blendColors(
  foreground: ColorParseResult,
  background: ColorParseResult
): ColorParseResult {
  const alpha = foreground.a;

  return {
    r: Math.round(foreground.r * alpha + background.r * (1 - alpha)),
    g: Math.round(foreground.g * alpha + background.g * (1 - alpha)),
    b: Math.round(foreground.b * alpha + background.b * (1 - alpha)),
    a: 1,
  };
}

/**
 * Get the effective background color considering glass transparency
 * @param glassColor - Glass surface color with opacity
 * @param worstCaseBg - Worst-case background (darkest or lightest)
 */
export function getEffectiveGlassBackground(
  glassColor: string,
  worstCaseBg: string
): ColorParseResult | null {
  const glass = parseColor(glassColor);
  const bg = parseColor(worstCaseBg);

  if (!glass || !bg) return null;

  return blendColors(glass, bg);
}

/**
 * Validate text contrast on a glass surface
 * Tests against worst-case background scenario
 */
export function validateGlassTextContrast(
  textColor: string,
  glassSurfaceColor: string,
  worstCaseBackground: string,
  isLargeText: boolean = false
): ContrastResult {
  const effectiveBg = getEffectiveGlassBackground(glassSurfaceColor, worstCaseBackground);

  if (!effectiveBg) {
    return {
      ratio: 0,
      meetsAA: false,
      meetsAAA: false,
      level: 'fail',
    };
  }

  const text = parseColor(textColor);
  if (!text) {
    return {
      ratio: 0,
      meetsAA: false,
      meetsAAA: false,
      level: 'fail',
    };
  }

  const ratio = getContrastRatio(text, effectiveBg);
  const aaThreshold = isLargeText
    ? COLOR_CONTRAST_TOKENS.LARGE_TEXT_RATIO
    : COLOR_CONTRAST_TOKENS.BODY_TEXT_RATIO;
  const aaaThreshold = isLargeText
    ? COLOR_CONTRAST_TOKENS.BODY_TEXT_RATIO
    : COLOR_CONTRAST_TOKENS.AAA_BODY_TEXT_RATIO;

  return {
    ratio: Math.round(ratio * 100) / 100,
    meetsAA: ratio >= aaThreshold,
    meetsAAA: ratio >= aaaThreshold,
    level: ratio >= aaaThreshold ? 'AAA' : ratio >= aaThreshold ? 'AA' : 'fail',
  };
}

/**
 * Get computed colors from an element
 */
export function getElementColors(element: HTMLElement): {
  color: string;
  backgroundColor: string;
} {
  const styles = window.getComputedStyle(element);
  return {
    color: styles.color,
    backgroundColor: styles.backgroundColor,
  };
}

/**
 * Validate contrast of an element's text against its background
 */
export function validateElementContrast(
  element: HTMLElement,
  isLargeText: boolean = false
): ContrastResult {
  const { color, backgroundColor } = getElementColors(element);
  return checkContrast(color, backgroundColor, isLargeText);
}

/**
 * Check if font size qualifies as "large text" per WCAG
 * Large text: >= 18pt (24px) or >= 14pt (18.67px) bold
 */
export function isLargeText(element: HTMLElement): boolean {
  const styles = window.getComputedStyle(element);
  const fontSize = parseFloat(styles.fontSize); // Already in px
  const fontWeight = parseInt(styles.fontWeight, 10);

  // 18pt = 24px
  if (fontSize >= 24) return true;

  // 14pt bold = 18.67px with weight >= 700
  if (fontSize >= 18.67 && fontWeight >= 700) return true;

  return false;
}
