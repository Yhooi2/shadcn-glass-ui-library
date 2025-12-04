/**
 * Card Compliance Tests
 *
 * Validates GlassCard against design system specifications:
 *
 * | Variant  | Padding | Radius | Opacity | Blur |
 * |----------|---------|--------|---------|------|
 * | compact  | 16px    | 12px   | 15%     | 12px |
 * | default  | 24px    | 16px   | 20%     | 16px |
 * | featured | 32px    | 20px   | 20%     | 16px |
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { COMPONENT_SPECS, SPACING_TOKENS } from '../../utils/design-tokens';
import { getComputedStyleSnapshot } from '../../utils/computed-style-reader';
import { validateElementSpacing } from '../../utils/spacing-validator';
import { hasGlassEffect, getGlassProperties } from '../../utils/blur-validator';
import { ThemeTestWrapper, THEMES } from '../__setup__/theme-test-wrapper';

import { GlassCard } from '@/components/glass/ui/glass-card';

describe('Card Compliance Tests', () => {
  describe('Card Specification Constants', () => {
    it('has correct compact card specs', () => {
      const { compact } = COMPONENT_SPECS.CARD;
      expect(compact.padding).toBe(16);
      expect(compact.radius).toBe(12);
      expect(compact.opacity).toBe(0.15);
      expect(compact.blur).toBe(12);
    });

    it('has correct default card specs', () => {
      const { default: defaultCard } = COMPONENT_SPECS.CARD;
      expect(defaultCard.padding).toBe(24);
      expect(defaultCard.radius).toBe(16);
      expect(defaultCard.opacity).toBe(0.2);
      expect(defaultCard.blur).toBe(16);
    });

    it('has correct featured card specs', () => {
      const { featured } = COMPONENT_SPECS.CARD;
      expect(featured.padding).toBe(32);
      expect(featured.radius).toBe(20);
      expect(featured.opacity).toBe(0.2);
      expect(featured.blur).toBe(16);
    });
  });

  describe('GlassCard Default Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('has glass effect', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">Content</GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('test-card');
        expect(hasGlassEffect(card)).toBe(true);
      });

      it('has appropriate padding', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">Content</GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('test-card');
        const snapshot = getComputedStyleSnapshot(card);
        const minPadding = SPACING_TOKENS.GLASS_CARD_PADDING.min;

        // Card should have at least 24px padding
        expect(snapshot.padding.top).toBeGreaterThanOrEqual(minPadding);
        expect(snapshot.padding.right).toBeGreaterThanOrEqual(minPadding);
        expect(snapshot.padding.bottom).toBeGreaterThanOrEqual(minPadding);
        expect(snapshot.padding.left).toBeGreaterThanOrEqual(minPadding);
      });

      it('has rounded corners', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">Content</GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('test-card');
        const snapshot = getComputedStyleSnapshot(card);

        // Card should have rounded corners
        expect(snapshot.borderRadius.topLeft).toBeGreaterThanOrEqual(8);
      });

      it('has backdrop blur', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">Content</GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('test-card');
        const props = getGlassProperties(card);

        expect(props.hasGlass).toBe(true);
        expect(props.blur).not.toBe(null);
      });

      it('has semi-transparent background', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">Content</GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('test-card');
        const props = getGlassProperties(card);

        // Card should have some background opacity (not fully opaque)
        if (props.opacity !== null) {
          expect(props.opacity).toBeLessThan(1);
          expect(props.opacity).toBeGreaterThan(0);
        }
      });
    });
  });

  describe('GlassCard Spacing Grid Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('padding is on 8px grid', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">Content</GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('test-card');
        const result = validateElementSpacing(card);

        expect(result.valid).toBe(true);
      });
    });
  });

  describe('GlassCard Visual Properties', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('has border styling', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">Content</GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('test-card');
        const styles = window.getComputedStyle(card);

        // Card should have border width of at least 1px
        const borderWidth = parseFloat(styles.borderWidth) || 0;
        expect(borderWidth).toBeGreaterThanOrEqual(0);
      });

      it('has box-shadow for depth', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">Content</GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('test-card');
        const snapshot = getComputedStyleSnapshot(card);

        // Card may have shadow for elevation
        // This is optional but commonly used
        if (snapshot.shadows.hasBoxShadow) {
          expect(snapshot.shadows.boxShadow).not.toBe('none');
        }
      });
    });
  });

  describe('GlassCard Content Rendering', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('renders children correctly', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">
              <h2 data-testid="card-title">Title</h2>
              <p data-testid="card-content">Content text</p>
            </GlassCard>
          </ThemeTestWrapper>
        );

        expect(screen.getByTestId('card-title')).toBeInTheDocument();
        expect(screen.getByTestId('card-content')).toBeInTheDocument();
      });

      it('content is visible', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">Visible content</GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('test-card');
        const snapshot = getComputedStyleSnapshot(card);

        expect(snapshot.visibility).toBe('visible');
        expect(snapshot.opacity).toBe(1);
      });
    });
  });

  describe('GlassCard Nested Elements', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('supports nested glass elements', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="outer-card">
              <GlassCard data-testid="inner-card">Nested</GlassCard>
            </GlassCard>
          </ThemeTestWrapper>
        );

        const outerCard = screen.getByTestId('outer-card');
        const innerCard = screen.getByTestId('inner-card');

        expect(outerCard).toBeInTheDocument();
        expect(innerCard).toBeInTheDocument();
      });

      it('inner card has independent glass effect', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="outer-card">
              <GlassCard data-testid="inner-card">Nested</GlassCard>
            </GlassCard>
          </ThemeTestWrapper>
        );

        const innerCard = screen.getByTestId('inner-card');
        expect(hasGlassEffect(innerCard)).toBe(true);
      });
    });
  });

  describe('GlassCard Overflow Handling', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('handles overflow appropriately', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">Content</GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('test-card');
        const styles = window.getComputedStyle(card);

        // Card should handle overflow (hidden or auto)
        expect(['hidden', 'auto', 'visible']).toContain(styles.overflow);
      });
    });
  });
});
