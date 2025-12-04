/**
 * Badge Compliance Tests
 *
 * Validates BadgeGlass against design system specifications:
 *
 * | Property    | Value              |
 * |-------------|-------------------|
 * | Height      | 20-24px           |
 * | Padding H   | 8px               |
 * | Padding V   | 2px               |
 * | Radius      | 4px (pill: 9999px)|
 * | Font Size   | 12px              |
 * | Font Weight | 500               |
 * | Glass       | NOT ALLOWED       |
 *
 * CRITICAL: Badge must NOT have glass effect.
 * Glass effects don't work on small elements.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { COMPONENT_SPECS, GLASS_TOKENS } from '../../utils/design-tokens';
import { getComputedStyleSnapshot } from '../../utils/computed-style-reader';
import { hasGlassEffect, validateNoGlassOnElement } from '../../utils/blur-validator';
import { ThemeTestWrapper, THEMES } from '../__setup__/theme-test-wrapper';

import { BadgeGlass } from '@/components/glass/ui/badge-glass';

describe('Badge Compliance Tests', () => {
  describe('Badge Specification Constants', () => {
    it('has correct height range', () => {
      expect(COMPONENT_SPECS.BADGE.height.min).toBe(20);
      expect(COMPONENT_SPECS.BADGE.height.max).toBe(24);
    });

    it('has correct horizontal padding', () => {
      expect(COMPONENT_SPECS.BADGE.paddingH).toBe(8);
    });

    it('has correct vertical padding', () => {
      expect(COMPONENT_SPECS.BADGE.paddingV).toBe(2);
    });

    it('has correct default radius', () => {
      expect(COMPONENT_SPECS.BADGE.radius).toBe(4);
    });

    it('has correct pill radius', () => {
      expect(COMPONENT_SPECS.BADGE.radiusPill).toBe(9999);
    });

    it('has correct font size', () => {
      expect(COMPONENT_SPECS.BADGE.fontSize).toBe(12);
    });

    it('has correct font weight', () => {
      expect(COMPONENT_SPECS.BADGE.fontWeight).toBe(500);
    });

    it('glass is NOT allowed', () => {
      expect(COMPONENT_SPECS.BADGE.glassAllowed).toBe(false);
    });
  });

  describe('Badge No-Glass Requirement', () => {
    it('badge is in the list of elements without glass', () => {
      expect(GLASS_TOKENS.NO_GLASS_ELEMENTS).toContain('badge');
    });

    describe.each(THEMES)('Theme: %s', (theme) => {
      it('Badge has NO glass effect', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">Badge</BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        expect(hasGlassEffect(badge)).toBe(false);
      });

      it('Badge passes no-glass validation', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">Badge</BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        const result = validateNoGlassOnElement(badge, 'badge');

        expect(result.valid).toBe(true);
      });

      it('Badge has solid background', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">Badge</BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        const styles = window.getComputedStyle(badge);

        // Should have visible background
        expect(styles.backgroundColor).not.toBe('transparent');
        expect(styles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      });
    });
  });

  describe('Badge Variant Compliance', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'] as const;

    describe.each(THEMES)('Theme: %s', (theme) => {
      describe.each(variants)('Variant: %s', (variant) => {
        it('renders correctly', () => {
          render(
            <ThemeTestWrapper theme={theme}>
              <BadgeGlass variant={variant} data-testid="test-badge">
                {variant}
              </BadgeGlass>
            </ThemeTestWrapper>
          );

          const badge = screen.getByTestId('test-badge');
          expect(badge).toBeInTheDocument();
        });

        it('has visible text', () => {
          render(
            <ThemeTestWrapper theme={theme}>
              <BadgeGlass variant={variant} data-testid="test-badge">
                {variant}
              </BadgeGlass>
            </ThemeTestWrapper>
          );

          const badge = screen.getByTestId('test-badge');
          const snapshot = getComputedStyleSnapshot(badge);

          expect(snapshot.visibility).toBe('visible');
          expect(snapshot.opacity).toBe(1);
        });

        it('does not have glass effect', () => {
          render(
            <ThemeTestWrapper theme={theme}>
              <BadgeGlass variant={variant} data-testid="test-badge">
                {variant}
              </BadgeGlass>
            </ThemeTestWrapper>
          );

          const badge = screen.getByTestId('test-badge');
          expect(hasGlassEffect(badge)).toBe(false);
        });
      });
    });
  });

  describe('Badge Typography Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('has correct font size', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">Badge</BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        const snapshot = getComputedStyleSnapshot(badge);

        // Font size should be around 12px
        expect(snapshot.typography.fontSize).toBeGreaterThanOrEqual(10);
        expect(snapshot.typography.fontSize).toBeLessThanOrEqual(14);
      });

      it('has correct font weight', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">Badge</BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        const snapshot = getComputedStyleSnapshot(badge);

        // Font weight should be 500 (medium)
        expect(snapshot.typography.fontWeight).toBeGreaterThanOrEqual(500);
      });
    });
  });

  describe('Badge Size Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('has compact dimensions', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">Badge</BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        const rect = badge.getBoundingClientRect();

        // Badge should be compact
        expect(rect.height).toBeLessThanOrEqual(30);
      });

      it('has rounded corners', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">Badge</BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        const snapshot = getComputedStyleSnapshot(badge);

        // Should have some border radius
        expect(snapshot.borderRadius.topLeft).toBeGreaterThan(0);
      });
    });
  });

  describe('Badge Content Rendering', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('renders text content', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">Status Text</BadgeGlass>
          </ThemeTestWrapper>
        );

        expect(screen.getByText('Status Text')).toBeInTheDocument();
      });

      it('renders numbers', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">42</BadgeGlass>
          </ThemeTestWrapper>
        );

        expect(screen.getByText('42')).toBeInTheDocument();
      });

      it('handles empty content gracefully', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">{''}</BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        expect(badge).toBeInTheDocument();
      });
    });
  });

  describe('Badge Layout Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('uses inline layout', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">Badge</BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        const snapshot = getComputedStyleSnapshot(badge);

        // Badge should be inline or inline-flex
        expect(['inline', 'inline-flex', 'inline-block']).toContain(snapshot.display);
      });

      it('centers content', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge">Badge</BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        const styles = window.getComputedStyle(badge);

        // Content should be centered or start-aligned for compact display
        expect(['center', 'flex-start', 'start']).toContain(styles.alignItems);
      });
    });
  });
});
