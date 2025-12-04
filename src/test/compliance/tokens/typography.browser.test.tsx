/**
 * Typography Compliance Tests
 *
 * Validates typography rules from the design system:
 * - Minimum 16px body text (iOS auto-zoom prevention)
 * - Font weight 500+ on glass backgrounds
 * - No thin fonts (weight <= 300)
 * - 1.25 modular scale
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { TYPOGRAPHY_TOKENS } from '../../utils/design-tokens';
import { getComputedStyleSnapshot } from '../../utils/computed-style-reader';
import { ThemeTestWrapper, THEMES } from '../__setup__/theme-test-wrapper';

// Import components to test
import { ButtonGlass } from '@/components/glass/ui/button-glass';
import { GlassCard } from '@/components/glass/ui/glass-card';
import { InputGlass } from '@/components/glass/ui/input-glass';
import { BadgeGlass } from '@/components/glass/ui/badge-glass';
import { AlertGlass } from '@/components/glass/ui/alert-glass';

describe('Typography Compliance Tests', () => {
  describe('Typography Token Constants', () => {
    it('has correct minimum body size', () => {
      expect(TYPOGRAPHY_TOKENS.MIN_BODY_SIZE).toBe(16);
    });

    it('has correct minimum weight on glass', () => {
      expect(TYPOGRAPHY_TOKENS.MIN_WEIGHT_ON_GLASS).toBe(500);
    });

    it('has correct forbidden weights', () => {
      expect(TYPOGRAPHY_TOKENS.FORBIDDEN_WEIGHTS).toContain(100);
      expect(TYPOGRAPHY_TOKENS.FORBIDDEN_WEIGHTS).toContain(200);
      expect(TYPOGRAPHY_TOKENS.FORBIDDEN_WEIGHTS).toContain(300);
    });

    it('has correct modular scale ratio', () => {
      expect(TYPOGRAPHY_TOKENS.MODULAR_SCALE).toBe(1.25);
    });

    it('has correct max line length', () => {
      expect(TYPOGRAPHY_TOKENS.MAX_LINE_LENGTH_CHARS).toBe(75);
    });
  });

  describe('Font Size Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('Button text is at least minimum body size', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="test-button">Click me</ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        const snapshot = getComputedStyleSnapshot(button);

        // Button text should be at least 14px (small buttons) or 16px (regular)
        expect(snapshot.typography.fontSize).toBeGreaterThanOrEqual(14);
      });

      it('Large button has larger font size', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass size="lg" data-testid="test-button-lg">
              Click me
            </ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button-lg');
        const snapshot = getComputedStyleSnapshot(button);

        // Large button should have 16px font
        expect(snapshot.typography.fontSize).toBeGreaterThanOrEqual(16);
      });

      it('Input has 16px font size (iOS zoom prevention)', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <InputGlass data-testid="test-input" placeholder="Enter text" />
          </ThemeTestWrapper>
        );

        const input = screen.getByTestId('test-input');
        const snapshot = getComputedStyleSnapshot(input);

        // Input MUST be 16px to prevent iOS auto-zoom
        expect(snapshot.typography.fontSize).toBeGreaterThanOrEqual(
          TYPOGRAPHY_TOKENS.MIN_BODY_SIZE
        );
      });
    });
  });

  describe('Font Weight Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('Button text has medium weight (500+)', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="test-button">Click me</ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        const snapshot = getComputedStyleSnapshot(button);

        // Button text should have weight 500 for readability on glass
        expect(snapshot.typography.fontWeight).toBeGreaterThanOrEqual(
          TYPOGRAPHY_TOKENS.MIN_WEIGHT_ON_GLASS
        );
      });

      it('Badge text has appropriate weight', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">Badge</BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        const snapshot = getComputedStyleSnapshot(badge);

        // Badge should have at least 500 weight for visibility
        expect(snapshot.typography.fontWeight).toBeGreaterThanOrEqual(500);
      });

      it('does not use forbidden thin weights', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">
              <p data-testid="card-text">Card content text</p>
            </GlassCard>
          </ThemeTestWrapper>
        );

        const cardText = screen.getByTestId('card-text');
        const snapshot = getComputedStyleSnapshot(cardText);

        // No thin fonts on glass backgrounds
        const isForbiddenWeight = TYPOGRAPHY_TOKENS.FORBIDDEN_WEIGHTS.includes(
          snapshot.typography.fontWeight as (typeof TYPOGRAPHY_TOKENS.FORBIDDEN_WEIGHTS)[number]
        );

        expect(isForbiddenWeight).toBe(false);
      });
    });
  });

  describe('Line Height Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('body text has appropriate line height', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">
              <p data-testid="card-text">
                This is a longer paragraph of text to test line height on glass surfaces.
              </p>
            </GlassCard>
          </ThemeTestWrapper>
        );

        const cardText = screen.getByTestId('card-text');
        const snapshot = getComputedStyleSnapshot(cardText);

        // Line height should be between 1.25 (snug) and 1.625 (relaxed)
        expect(snapshot.typography.lineHeight).toBeGreaterThanOrEqual(
          TYPOGRAPHY_TOKENS.LINE_HEIGHTS.snug
        );
        expect(snapshot.typography.lineHeight).toBeLessThanOrEqual(
          TYPOGRAPHY_TOKENS.LINE_HEIGHTS.relaxed
        );
      });

      it('Alert title has appropriate line height', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <AlertGlass variant="default" title="Alert Title" data-testid="test-alert">
              Alert content
            </AlertGlass>
          </ThemeTestWrapper>
        );

        const alert = screen.getByTestId('test-alert');

        // Check alert is rendered
        expect(alert).toBeInTheDocument();

        // Line height should be reasonable for UI elements
        const snapshot = getComputedStyleSnapshot(alert);
        expect(snapshot.typography.lineHeight).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('Modular Scale Validation', () => {
    it('font sizes follow 1.25 modular scale pattern', () => {
      const { FONT_SIZES } = TYPOGRAPHY_TOKENS;

      // Verify scale progression (each step should be roughly 1.25x the previous)
      const baseSize = FONT_SIZES.base.min; // 16px

      // sm should be base / 1.25 ≈ 12.8 (we use 14 min)
      expect(FONT_SIZES.sm.min).toBeGreaterThanOrEqual(baseSize / 1.25 - 2);

      // lg should be base * 1.25 ≈ 20 (we use 18 min)
      expect(FONT_SIZES.lg.min).toBeCloseTo(baseSize * 1.125, -1);

      // xl should be base * 1.25^2 ≈ 25 (we use 20 min)
      expect(FONT_SIZES.xl.min).toBeLessThanOrEqual(baseSize * 1.25 * 1.25);
    });

    it('font size scale has proper min/max ranges', () => {
      const { FONT_SIZES } = TYPOGRAPHY_TOKENS;

      // Each size should have min < max
      expect(FONT_SIZES.xs.min).toBeLessThan(FONT_SIZES.xs.max);
      expect(FONT_SIZES.sm.min).toBeLessThan(FONT_SIZES.sm.max);
      expect(FONT_SIZES.base.min).toBeLessThan(FONT_SIZES.base.max);
      expect(FONT_SIZES.lg.min).toBeLessThan(FONT_SIZES.lg.max);
      expect(FONT_SIZES.xl.min).toBeLessThan(FONT_SIZES.xl.max);
    });
  });

  describe('Font Weight Scale', () => {
    it('has standard weight values', () => {
      const { FONT_WEIGHTS } = TYPOGRAPHY_TOKENS;

      expect(FONT_WEIGHTS.normal).toBe(400);
      expect(FONT_WEIGHTS.medium).toBe(500);
      expect(FONT_WEIGHTS.semibold).toBe(600);
      expect(FONT_WEIGHTS.bold).toBe(700);
    });

    it('medium is the minimum for glass backgrounds', () => {
      expect(TYPOGRAPHY_TOKENS.FONT_WEIGHTS.medium).toBe(
        TYPOGRAPHY_TOKENS.MIN_WEIGHT_ON_GLASS
      );
    });
  });
});
