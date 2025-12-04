/**
 * Glassmorphism Antipatterns Compliance Tests
 *
 * Detects violations of glassmorphism best practices:
 * - Badge/Tooltip should NOT have glass effect
 * - Maximum 2-3 glass layers per view
 * - No glass on small elements (<24px)
 * - Glow effects should be reserved for focus/active states
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { GLASS_TOKENS, ANTIPATTERNS } from '../../utils/design-tokens';
import {
  hasGlassEffect,
  validateNoGlassOnElement,
  validateNoGlassOnSmallElements,
  countGlassLayers,
} from '../../utils/blur-validator';
import { ThemeTestWrapper, THEMES } from '../__setup__/theme-test-wrapper';

// Import components to test
import { BadgeGlass } from '@/components/glass/ui/badge-glass';
import { TooltipGlass } from '@/components/glass/ui/tooltip-glass';
import { GlassCard } from '@/components/glass/ui/glass-card';

describe('Glassmorphism Antipatterns Compliance Tests', () => {
  describe('Antipattern Definitions', () => {
    it('has layout antipatterns defined', () => {
      expect(ANTIPATTERNS.LAYOUT).toContain('spacing-not-on-grid');
      expect(ANTIPATTERNS.LAYOUT).toContain('spacing-too-tight');
    });

    it('has typography antipatterns defined', () => {
      expect(ANTIPATTERNS.TYPOGRAPHY).toContain('low-contrast-text');
      expect(ANTIPATTERNS.TYPOGRAPHY).toContain('thin-font-on-glass');
    });

    it('has color antipatterns defined', () => {
      expect(ANTIPATTERNS.COLOR).toContain('rainbow-interface');
      expect(ANTIPATTERNS.COLOR).toContain('pure-black-on-white');
    });

    it('has glassmorphism antipatterns defined', () => {
      expect(ANTIPATTERNS.GLASS).toContain('too-many-glass-layers');
      expect(ANTIPATTERNS.GLASS).toContain('glass-on-small-elements');
      expect(ANTIPATTERNS.GLASS).toContain('glow-effects-everywhere');
      expect(ANTIPATTERNS.GLASS).toContain('no-backdrop-filter-fallback');
    });

    it('has accessibility antipatterns defined', () => {
      expect(ANTIPATTERNS.ACCESSIBILITY).toContain('touch-target-too-small');
      expect(ANTIPATTERNS.ACCESSIBILITY).toContain('missing-focus-state');
    });
  });

  describe('Glass Effect Restrictions', () => {
    it('defines elements that should not have glass', () => {
      expect(GLASS_TOKENS.NO_GLASS_ELEMENTS).toContain('badge');
      expect(GLASS_TOKENS.NO_GLASS_ELEMENTS).toContain('chip');
      expect(GLASS_TOKENS.NO_GLASS_ELEMENTS).toContain('tag');
      expect(GLASS_TOKENS.NO_GLASS_ELEMENTS).toContain('tooltip');
    });

    it('defines minimum glass element size', () => {
      expect(GLASS_TOKENS.MIN_GLASS_SIZE).toBe(24);
    });

    it('defines maximum glass layers per view', () => {
      expect(GLASS_TOKENS.MAX_LAYERS_PER_VIEW).toBe(3);
    });
  });

  describe('Badge No-Glass Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('Badge should NOT have glass effect (solid background)', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge" variant="default">
              Badge
            </BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        const result = validateNoGlassOnElement(badge, 'badge');

        // Badge should pass no-glass validation
        expect(result.valid).toBe(true);

        // Badge should not have glass effect
        const hasGlass = hasGlassEffect(badge);
        expect(hasGlass).toBe(false);
      });

      it('Badge has solid or near-solid background', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <BadgeGlass data-testid="test-badge" variant="secondary">
              Badge
            </BadgeGlass>
          </ThemeTestWrapper>
        );

        const badge = screen.getByTestId('test-badge');
        const styles = window.getComputedStyle(badge);
        const bgColor = styles.backgroundColor;

        // Badge should have a solid background, not transparent glass
        // Can be rgba with high opacity or solid rgb
        expect(bgColor).not.toBe('transparent');
        expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
      });
    });
  });

  describe('Tooltip No-Glass Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('Tooltip trigger renders correctly', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <TooltipGlass content="Tooltip content">
              <button data-testid="tooltip-trigger">Hover me</button>
            </TooltipGlass>
          </ThemeTestWrapper>
        );

        const trigger = screen.getByTestId('tooltip-trigger');
        expect(trigger).toBeInTheDocument();
      });

      // Note: Actual tooltip element validation would require opening the tooltip
      // and checking its backdrop-filter property
    });
  });

  describe('Small Element Glass Restriction', () => {
    it('validates no glass on elements smaller than minimum size', () => {
      const smallElement = document.createElement('div');
      smallElement.style.width = '20px';
      smallElement.style.height = '20px';
      smallElement.style.backdropFilter = 'blur(16px)';
      document.body.appendChild(smallElement);

      const result = validateNoGlassOnSmallElements(smallElement);

      expect(result.valid).toBe(false);
      expect(result.violations.length).toBeGreaterThan(0);

      document.body.removeChild(smallElement);
    });

    it('allows glass on elements larger than minimum size', () => {
      const largeElement = document.createElement('div');
      largeElement.style.width = '100px';
      largeElement.style.height = '100px';
      largeElement.style.backdropFilter = 'blur(16px)';
      document.body.appendChild(largeElement);

      const result = validateNoGlassOnSmallElements(largeElement);

      expect(result.valid).toBe(true);

      document.body.removeChild(largeElement);
    });
  });

  describe('Glass Layer Count Compliance', () => {
    it('counts glass layers in container', () => {
      const container = document.createElement('div');
      container.style.backdropFilter = 'blur(16px)';

      const child1 = document.createElement('div');
      child1.style.backdropFilter = 'blur(8px)';
      container.appendChild(child1);

      const child2 = document.createElement('div');
      child2.style.backdropFilter = 'blur(12px)';
      container.appendChild(child2);

      document.body.appendChild(container);

      const result = countGlassLayers(container);

      expect(result.count).toBe(3);

      document.body.removeChild(container);
    });

    it('validates maximum glass layers per view', () => {
      const container = document.createElement('div');

      // Add 4 glass layers (exceeds max of 3)
      for (let i = 0; i < 4; i++) {
        const glassLayer = document.createElement('div');
        glassLayer.style.backdropFilter = 'blur(16px)';
        container.appendChild(glassLayer);
      }

      document.body.appendChild(container);

      const result = countGlassLayers(container);

      expect(result.valid).toBe(false);
      expect(result.count).toBe(4);
      expect(result.violations.length).toBeGreaterThan(0);

      document.body.removeChild(container);
    });

    it('accepts valid number of glass layers', () => {
      const container = document.createElement('div');

      // Add 2 glass layers (within limit)
      for (let i = 0; i < 2; i++) {
        const glassLayer = document.createElement('div');
        glassLayer.style.backdropFilter = 'blur(16px)';
        container.appendChild(glassLayer);
      }

      document.body.appendChild(container);

      const result = countGlassLayers(container);

      expect(result.valid).toBe(true);
      expect(result.count).toBe(2);

      document.body.removeChild(container);
    });
  });

  describe('GlassCard Layer Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('nested GlassCards do not exceed layer limit', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="outer-card">
              <GlassCard data-testid="inner-card">Nested content</GlassCard>
            </GlassCard>
          </ThemeTestWrapper>
        );

        const outerCard = screen.getByTestId('outer-card');
        const result = countGlassLayers(outerCard);

        // Nested cards should not exceed max layers
        expect(result.count).toBeLessThanOrEqual(GLASS_TOKENS.MAX_LAYERS_PER_VIEW);
      });
    });
  });

  describe('Glow Effect Restrictions', () => {
    it('defines that glow should be used sparingly', () => {
      // Glow effects should only be used for:
      // - Active/focused states
      // - Primary CTA emphasis
      // - Brand highlight moments
      // - Dark mode visibility enhancement

      // This is a design principle check
      expect(ANTIPATTERNS.GLASS).toContain('glow-effects-everywhere');
    });

    describe.each(THEMES)('Theme: %s', (theme) => {
      it('GlassCard does not have glow in default state', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="test-card">Content</GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('test-card');
        const styles = window.getComputedStyle(card);
        const boxShadow = styles.boxShadow;

        // Default state should not have strong glow
        // Subtle shadows are acceptable, but not glowing effect
        // Check that it doesn't have spread-heavy glow shadows
        const hasStrongGlow =
          boxShadow.includes('0 0 40px') || boxShadow.includes('0 0 80px');

        expect(hasStrongGlow).toBe(false);
      });
    });
  });

  describe('Animated Blur Restriction', () => {
    it('defines that blur values should not be animated', () => {
      expect(ANTIPATTERNS.GLASS).toContain('animated-blur');
    });

    // Note: Testing for animated blur would require
    // checking CSS animations and transitions,
    // which is complex in a unit test environment
  });

  describe('Backdrop Filter Fallback', () => {
    it('defines fallback requirement', () => {
      expect(ANTIPATTERNS.GLASS).toContain('no-backdrop-filter-fallback');
    });

    // Note: Testing @supports fallback requires
    // checking the raw CSS which is not available
    // in computed styles
  });
});
