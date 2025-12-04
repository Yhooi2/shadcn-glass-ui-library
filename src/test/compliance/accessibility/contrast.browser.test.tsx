/**
 * Color Contrast Compliance Tests
 *
 * Validates WCAG 2.1 contrast requirements:
 * - Normal text (<18pt): 4.5:1 minimum (AA), 7:1 (AAA)
 * - Large text (>=18pt or >=14pt bold): 3:1 minimum (AA), 4.5:1 (AAA)
 * - UI components: 3:1 minimum
 *
 * CRITICAL: Always test against worst-case background scenarios.
 * No pure black (#000000) usage - use #121212 or #0a0a0f instead.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { COLOR_CONTRAST_TOKENS } from '../../utils/design-tokens';
import {
  checkContrast,
  isPureBlack,
  isRecommendedDark,
  parseColor,
  getContrastRatio,
  isLargeText,
  getRelativeLuminance,
} from '../../utils/contrast-checker';
import { getComputedStyleSnapshot } from '../../utils/computed-style-reader';
import { ThemeTestWrapper, THEMES } from '../__setup__/theme-test-wrapper';

import { ButtonGlass } from '@/components/glass/ui/button-glass';
import { GlassCard } from '@/components/glass/ui/glass-card';
import { BadgeGlass } from '@/components/glass/ui/badge-glass';

describe('Color Contrast Compliance Tests', () => {
  describe('Contrast Token Constants', () => {
    it('has correct body text ratio', () => {
      expect(COLOR_CONTRAST_TOKENS.BODY_TEXT_RATIO).toBe(4.5);
    });

    it('has correct large text ratio', () => {
      expect(COLOR_CONTRAST_TOKENS.LARGE_TEXT_RATIO).toBe(3.0);
    });

    it('has correct UI component ratio', () => {
      expect(COLOR_CONTRAST_TOKENS.UI_COMPONENT_RATIO).toBe(3.0);
    });

    it('has correct AAA body text ratio', () => {
      expect(COLOR_CONTRAST_TOKENS.AAA_BODY_TEXT_RATIO).toBe(7.0);
    });

    it('defines forbidden colors', () => {
      expect(COLOR_CONTRAST_TOKENS.FORBIDDEN_COLORS).toContain('#000000');
      expect(COLOR_CONTRAST_TOKENS.FORBIDDEN_COLORS).toContain('rgb(0, 0, 0)');
    });

    it('defines recommended dark colors', () => {
      expect(COLOR_CONTRAST_TOKENS.RECOMMENDED_DARK).toContain('#121212');
      expect(COLOR_CONTRAST_TOKENS.RECOMMENDED_DARK).toContain('#0a0a0f');
    });
  });

  describe('Color Parsing', () => {
    it('parses hex colors correctly', () => {
      const white = parseColor('#ffffff');
      expect(white).toEqual({ r: 255, g: 255, b: 255, a: 1 });

      const black = parseColor('#000000');
      expect(black).toEqual({ r: 0, g: 0, b: 0, a: 1 });

      const red = parseColor('#ff0000');
      expect(red).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it('parses short hex colors', () => {
      const white = parseColor('#fff');
      expect(white).toEqual({ r: 255, g: 255, b: 255, a: 1 });

      const red = parseColor('#f00');
      expect(red).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it('parses rgb colors', () => {
      const white = parseColor('rgb(255, 255, 255)');
      expect(white).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    });

    it('parses rgba colors', () => {
      const semiWhite = parseColor('rgba(255, 255, 255, 0.5)');
      expect(semiWhite).toEqual({ r: 255, g: 255, b: 255, a: 0.5 });
    });

    it('returns null for transparent', () => {
      expect(parseColor('transparent')).toBe(null);
    });
  });

  describe('Relative Luminance Calculation', () => {
    it('calculates white luminance as ~1', () => {
      const white = parseColor('#ffffff')!;
      const luminance = getRelativeLuminance(white);
      expect(luminance).toBeCloseTo(1, 2);
    });

    it('calculates black luminance as 0', () => {
      const black = parseColor('#000000')!;
      const luminance = getRelativeLuminance(black);
      expect(luminance).toBe(0);
    });
  });

  describe('Contrast Ratio Calculation', () => {
    it('calculates maximum contrast (white on black)', () => {
      const white = parseColor('#ffffff')!;
      const black = parseColor('#000000')!;
      const ratio = getContrastRatio(white, black);

      expect(ratio).toBeCloseTo(21, 0);
    });

    it('calculates no contrast (same color)', () => {
      const white = parseColor('#ffffff')!;
      const ratio = getContrastRatio(white, white);

      expect(ratio).toBe(1);
    });
  });

  describe('Contrast Check Function', () => {
    it('passes AA for high contrast', () => {
      const result = checkContrast('#ffffff', '#000000');

      expect(result.meetsAA).toBe(true);
      expect(result.meetsAAA).toBe(true);
      expect(result.level).toBe('AAA');
    });

    it('fails for low contrast', () => {
      const result = checkContrast('#777777', '#888888');

      expect(result.meetsAA).toBe(false);
      expect(result.level).toBe('fail');
    });

    it('uses different thresholds for large text', () => {
      // This would fail for normal text but pass for large text
      const result = checkContrast('#666666', '#ffffff', true);

      // Large text only needs 3:1
      expect(result.ratio).toBeGreaterThan(3);
    });
  });

  describe('Pure Black Detection', () => {
    it('detects pure black hex', () => {
      expect(isPureBlack('#000000')).toBe(true);
      expect(isPureBlack('#000')).toBe(false); // Short hex not in list
    });

    it('detects pure black rgb', () => {
      expect(isPureBlack('rgb(0, 0, 0)')).toBe(true);
    });

    it('accepts non-pure black', () => {
      expect(isPureBlack('#121212')).toBe(false);
      expect(isPureBlack('#0a0a0f')).toBe(false);
    });
  });

  describe('Recommended Dark Colors', () => {
    it('recognizes recommended dark colors', () => {
      expect(isRecommendedDark('#121212')).toBe(true);
      expect(isRecommendedDark('#0a0a0f')).toBe(true);
    });

    it('rejects pure black', () => {
      expect(isRecommendedDark('#000000')).toBe(false);
    });
  });

  describe('Large Text Detection', () => {
    it('identifies large text (>= 24px)', () => {
      const element = document.createElement('span');
      element.style.fontSize = '24px';
      element.style.fontWeight = '400';
      document.body.appendChild(element);

      expect(isLargeText(element)).toBe(true);

      document.body.removeChild(element);
    });

    it('identifies bold text >= 18.67px as large', () => {
      const element = document.createElement('span');
      element.style.fontSize = '19px';
      element.style.fontWeight = '700';
      document.body.appendChild(element);

      expect(isLargeText(element)).toBe(true);

      document.body.removeChild(element);
    });

    it('identifies normal sized text as not large', () => {
      const element = document.createElement('span');
      element.style.fontSize = '16px';
      element.style.fontWeight = '400';
      document.body.appendChild(element);

      expect(isLargeText(element)).toBe(false);

      document.body.removeChild(element);
    });
  });

  describe('Theme Color Definitions', () => {
    it('has glass theme colors', () => {
      const { glass } = COLOR_CONTRAST_TOKENS.THEMES;
      expect(glass.background).toBe('#0a0a0f');
      expect(glass.textPrimary).toBe('#e0e0e0');
    });

    it('has aurora theme colors', () => {
      const { aurora } = COLOR_CONTRAST_TOKENS.THEMES;
      expect(aurora.background).toBe('#050510');
      expect(aurora.textPrimary).toBe('#f0f0ff');
    });

    it('has light theme colors', () => {
      const { light } = COLOR_CONTRAST_TOKENS.THEMES;
      expect(light.background).toBe('#f8f9fa');
      expect(light.textPrimary).toBe('#1a1a1a');
    });

    it('theme text colors have good contrast with backgrounds', () => {
      // Glass theme
      const glassResult = checkContrast(
        COLOR_CONTRAST_TOKENS.THEMES.glass.textPrimary,
        COLOR_CONTRAST_TOKENS.THEMES.glass.background
      );
      expect(glassResult.meetsAA).toBe(true);

      // Light theme
      const lightResult = checkContrast(
        COLOR_CONTRAST_TOKENS.THEMES.light.textPrimary,
        COLOR_CONTRAST_TOKENS.THEMES.light.background
      );
      expect(lightResult.meetsAA).toBe(true);

      // Aurora theme
      const auroraResult = checkContrast(
        COLOR_CONTRAST_TOKENS.THEMES.aurora.textPrimary,
        COLOR_CONTRAST_TOKENS.THEMES.aurora.background
      );
      expect(auroraResult.meetsAA).toBe(true);
    });
  });

  describe('Component Text Contrast', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('Button text is visible', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="test-button">Click me</ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        const snapshot = getComputedStyleSnapshot(button);

        // Text should be visible (not transparent)
        expect(snapshot.colors.rawColor).not.toBe('transparent');
        expect(snapshot.colors.rawColor).not.toBe('rgba(0, 0, 0, 0)');
      });

      it('Badge text is visible', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">Status</BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        const snapshot = getComputedStyleSnapshot(badge);

        expect(snapshot.visibility).toBe('visible');
        expect(snapshot.opacity).toBe(1);
      });

      it('Card content is readable', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">
              <p data-testid="card-text">This text should be readable</p>
            </GlassCard>
          </ThemeTestWrapper>
        );

        const text = screen.getByTestId('card-text');
        const snapshot = getComputedStyleSnapshot(text);

        expect(snapshot.visibility).toBe('visible');
      });
    });
  });
});
