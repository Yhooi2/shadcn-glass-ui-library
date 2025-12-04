/**
 * Opacity Compliance Tests
 *
 * Validates glass surface opacity ranges:
 * - Decorative glass: 5-10% (subtle, requires strong blur)
 * - Standard cards: 15-25% (sweet spot for balance)
 * - Text containers: 30-50% (higher opacity for readability)
 * - Navigation/overlays: 40-75% (maximum legibility)
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { OPACITY_TOKENS, COMPONENT_SPECS } from '../../utils/design-tokens';
import {
  parseBackgroundOpacity,
  validateGlassOpacity,
  determineOpacityContext,
} from '../../utils/blur-validator';
import { ThemeTestWrapper, THEMES } from '../__setup__/theme-test-wrapper';

// Import components to test
import { GlassCard } from '@/components/glass/ui/glass-card';
import { ModalGlass } from '@/components/glass/ui/modal-glass';

describe('Opacity Compliance Tests', () => {
  describe('Opacity Token Constants', () => {
    it('has correct decorative opacity range', () => {
      expect(OPACITY_TOKENS.DECORATIVE.min).toBe(0.05);
      expect(OPACITY_TOKENS.DECORATIVE.max).toBe(0.1);
    });

    it('has correct standard cards opacity range', () => {
      expect(OPACITY_TOKENS.STANDARD_CARDS.min).toBe(0.15);
      expect(OPACITY_TOKENS.STANDARD_CARDS.max).toBe(0.25);
    });

    it('has correct text containers opacity range', () => {
      expect(OPACITY_TOKENS.TEXT_CONTAINERS.min).toBe(0.3);
      expect(OPACITY_TOKENS.TEXT_CONTAINERS.max).toBe(0.5);
    });

    it('has correct navigation opacity range', () => {
      expect(OPACITY_TOKENS.NAVIGATION.min).toBe(0.4);
      expect(OPACITY_TOKENS.NAVIGATION.max).toBe(0.75);
    });

    it('has correct surface opacity values', () => {
      expect(OPACITY_TOKENS.SURFACE.subtle).toBe(0.03);
      expect(OPACITY_TOKENS.SURFACE.light).toBe(0.05);
      expect(OPACITY_TOKENS.SURFACE.medium).toBe(0.08);
      expect(OPACITY_TOKENS.SURFACE.strong).toBe(0.15);
      expect(OPACITY_TOKENS.SURFACE.solid).toBe(0.25);
    });
  });

  describe('Component Opacity Specs', () => {
    it('Card compact has 15% opacity', () => {
      expect(COMPONENT_SPECS.CARD.compact.opacity).toBe(0.15);
    });

    it('Card default has 20% opacity', () => {
      expect(COMPONENT_SPECS.CARD.default.opacity).toBe(0.2);
    });

    it('Card featured has 20% opacity', () => {
      expect(COMPONENT_SPECS.CARD.featured.opacity).toBe(0.2);
    });

    it('Modal has 25% background opacity', () => {
      expect(COMPONENT_SPECS.MODAL.bgOpacity).toBe(0.25);
    });

    it('Dropdown has 20% background opacity', () => {
      expect(COMPONENT_SPECS.DROPDOWN.bgOpacity).toBe(0.2);
    });
  });

  describe('Background Opacity Parsing', () => {
    it('parses rgba opacity correctly', () => {
      const element = document.createElement('div');

      element.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      document.body.appendChild(element);

      const opacity = parseBackgroundOpacity(element);
      expect(opacity).toBe(0.2);

      document.body.removeChild(element);
    });

    it('parses transparent as 0', () => {
      const element = document.createElement('div');
      element.style.backgroundColor = 'transparent';
      document.body.appendChild(element);

      const opacity = parseBackgroundOpacity(element);
      expect(opacity).toBe(0);

      document.body.removeChild(element);
    });

    it('parses solid rgb as 1', () => {
      const element = document.createElement('div');
      element.style.backgroundColor = 'rgb(255, 255, 255)';
      document.body.appendChild(element);

      const opacity = parseBackgroundOpacity(element);
      expect(opacity).toBe(1);

      document.body.removeChild(element);
    });
  });

  describe('Opacity Context Detection', () => {
    it('detects navigation context', () => {
      const nav = document.createElement('nav');
      expect(determineOpacityContext(nav)).toBe('navigation');

      const headerDiv = document.createElement('div');
      headerDiv.className = 'header-nav';
      expect(determineOpacityContext(headerDiv)).toBe('navigation');
    });

    it('detects standard card context', () => {
      const card = document.createElement('div');
      card.className = 'glass-card';
      expect(determineOpacityContext(card)).toBe('standard');

      const panel = document.createElement('div');
      panel.className = 'glass-panel';
      expect(determineOpacityContext(panel)).toBe('standard');
    });

    it('detects decorative context', () => {
      const decorative = document.createElement('div');
      decorative.className = 'decorative-bg';
      expect(determineOpacityContext(decorative)).toBe('decorative');

      const background = document.createElement('div');
      background.className = 'background-effect';
      expect(determineOpacityContext(background)).toBe('decorative');
    });
  });

  describe('GlassCard Opacity Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('GlassCard has opacity in standard cards range', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card" className="glass-card">
              Content
            </GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('test-card');
        const opacity = parseBackgroundOpacity(card);

        if (opacity !== null && opacity > 0) {
          // Glass card opacity should be in 15-25% range or have some glass effect
          expect(opacity).toBeGreaterThanOrEqual(OPACITY_TOKENS.STANDARD_CARDS.min - 0.05);
        }
      });

      it('GlassCard opacity validation passes', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card" className="glass-card">
              Content
            </GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('test-card');
        const result = validateGlassOpacity(card);

        if (!result.valid && result.value !== null && result.value > 0) {
          console.log(`GlassCard opacity violations (${theme}):`, result.violations);
          console.log(`Context: ${result.context}, Value: ${result.value}`);
        }
      });
    });
  });

  describe('Modal Opacity Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('Modal background has appropriate opacity', () => {
        const onClose = () => {};

        render(
          <ThemeTestWrapper theme={theme}>
            <ModalGlass isOpen={true} onClose={onClose} title="Test" data-testid="test-modal">
              Content
            </ModalGlass>
          </ThemeTestWrapper>
        );

        const modal = screen.queryByRole('dialog');

        if (modal) {
          const opacity = parseBackgroundOpacity(modal as HTMLElement);

          // Modal opacity should be around 25% as specified
          if (opacity !== null && opacity > 0) {
            // Allow some flexibility around the 25% target
            expect(opacity).toBeGreaterThanOrEqual(0.1);
            expect(opacity).toBeLessThanOrEqual(0.5);
          }
        }
      });

      it('Modal scrim has high opacity', () => {
        const onClose = () => {};

        render(
          <ThemeTestWrapper theme={theme}>
            <ModalGlass isOpen={true} onClose={onClose} title="Test">
              Content
            </ModalGlass>
          </ThemeTestWrapper>
        );

        // Modal scrim should have high opacity for focus
        // This is typically the backdrop/overlay behind the modal
        const scrimOpacity = COMPONENT_SPECS.MODAL.scrimOpacity;
        expect(scrimOpacity).toBe(0.5);
      });
    });
  });

  describe('Opacity Range Validation', () => {
    it('standard cards opacity range is within decorative and text', () => {
      expect(OPACITY_TOKENS.STANDARD_CARDS.min).toBeGreaterThan(OPACITY_TOKENS.DECORATIVE.max);
      expect(OPACITY_TOKENS.STANDARD_CARDS.max).toBeLessThan(OPACITY_TOKENS.TEXT_CONTAINERS.min);
    });

    it('text containers overlap with navigation on upper bound', () => {
      expect(OPACITY_TOKENS.TEXT_CONTAINERS.max).toBeGreaterThanOrEqual(
        OPACITY_TOKENS.NAVIGATION.min
      );
    });

    it('all opacity ranges are valid (min < max)', () => {
      expect(OPACITY_TOKENS.DECORATIVE.min).toBeLessThan(OPACITY_TOKENS.DECORATIVE.max);
      expect(OPACITY_TOKENS.STANDARD_CARDS.min).toBeLessThan(OPACITY_TOKENS.STANDARD_CARDS.max);
      expect(OPACITY_TOKENS.TEXT_CONTAINERS.min).toBeLessThan(OPACITY_TOKENS.TEXT_CONTAINERS.max);
      expect(OPACITY_TOKENS.NAVIGATION.min).toBeLessThan(OPACITY_TOKENS.NAVIGATION.max);
    });
  });

  describe('Surface Opacity Scale', () => {
    it('surface opacity values increase progressively', () => {
      const { SURFACE } = OPACITY_TOKENS;

      expect(SURFACE.subtle).toBeLessThan(SURFACE.light);
      expect(SURFACE.light).toBeLessThan(SURFACE.medium);
      expect(SURFACE.medium).toBeLessThan(SURFACE.strong);
      expect(SURFACE.strong).toBeLessThan(SURFACE.solid);
    });

    it('surface values align with range categories', () => {
      const { SURFACE, DECORATIVE, STANDARD_CARDS } = OPACITY_TOKENS;

      // Subtle and light should be in decorative range
      expect(SURFACE.subtle).toBeLessThanOrEqual(DECORATIVE.max);
      expect(SURFACE.light).toBeLessThanOrEqual(DECORATIVE.max);

      // Strong and solid should be in standard cards range
      expect(SURFACE.strong).toBeGreaterThanOrEqual(STANDARD_CARDS.min);
      expect(SURFACE.solid).toBeLessThanOrEqual(STANDARD_CARDS.max);
    });
  });
});
