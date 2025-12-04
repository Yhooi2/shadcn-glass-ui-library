/**
 * Unit tests for style-utils.ts
 *
 * Tests centralized style utilities for consistency and correctness.
 */

import { describe, it, expect } from 'vitest';
import {
  ICON_SIZES,
  BLUR_VALUES,
  TRANSITIONS,
  getGlassSurfaceStyles,
  getHoverTransformStyles,
  getStateBorderColor,
  type IconSize,
  type BlurLevel,
  type TransitionSpeed,
} from '../style-utils';

describe('style-utils', () => {
  describe('ICON_SIZES', () => {
    it('should export all size constants', () => {
      expect(ICON_SIZES).toBeDefined();
      expect(ICON_SIZES.xs).toBe('w-2.5 h-2.5 md:w-3 md:h-3');
      expect(ICON_SIZES.sm).toBe('w-3 h-3 md:w-3.5 md:h-3.5');
      expect(ICON_SIZES.md).toBe('w-3.5 h-3.5 md:w-4 md:h-4');
      expect(ICON_SIZES.lg).toBe('w-4 h-4 md:w-5 md:h-5');
      expect(ICON_SIZES.xl).toBe('w-5 h-5 md:w-6 md:h-6');
    });

    it('should have correct type safety', () => {
      const size: IconSize = 'md';
      expect(ICON_SIZES[size]).toBe('w-3.5 h-3.5 md:w-4 md:h-4');
    });

    it('should contain responsive classes', () => {
      Object.values(ICON_SIZES).forEach((sizeClass) => {
        expect(sizeClass).toMatch(/w-\d+(\.\d+)?/); // width class
        expect(sizeClass).toMatch(/h-\d+(\.\d+)?/); // height class
        expect(sizeClass).toMatch(/md:w-\d+(\.\d+)?/); // responsive width
        expect(sizeClass).toMatch(/md:h-\d+(\.\d+)?/); // responsive height
      });
    });
  });

  describe('BLUR_VALUES', () => {
    it('should export all blur constants', () => {
      expect(BLUR_VALUES).toBeDefined();
      expect(BLUR_VALUES.sm).toBe('var(--blur-sm)');
      expect(BLUR_VALUES.md).toBe('var(--blur-md)');
      expect(BLUR_VALUES.lg).toBe('var(--blur-lg)');
      expect(BLUR_VALUES.xl).toBe('var(--blur-xl)');
    });

    it('should have correct type safety', () => {
      const blur: BlurLevel = 'md';
      expect(BLUR_VALUES[blur]).toBe('var(--blur-md)');
    });

    it('should use CSS custom properties', () => {
      Object.values(BLUR_VALUES).forEach((value) => {
        expect(value).toMatch(/^var\(--blur-\w+\)$/);
      });
    });
  });

  describe('TRANSITIONS', () => {
    it('should export all transition constants', () => {
      expect(TRANSITIONS).toBeDefined();
      expect(TRANSITIONS.fast).toBe('var(--transition-fast)');
      expect(TRANSITIONS.base).toBe('var(--transition-base)');
      expect(TRANSITIONS.slow).toBe('var(--transition-slow)');
    });

    it('should have correct type safety', () => {
      const speed: TransitionSpeed = 'base';
      expect(TRANSITIONS[speed]).toBe('var(--transition-base)');
    });

    it('should use CSS custom properties', () => {
      Object.values(TRANSITIONS).forEach((value) => {
        expect(value).toMatch(/^var\(--transition-\w+\)$/);
      });
    });
  });

  describe('getGlassSurfaceStyles', () => {
    it('should generate basic glass surface styles', () => {
      const styles = getGlassSurfaceStyles({
        bg: 'var(--card-bg)',
        border: 'var(--card-border)',
      });

      expect(styles.background).toBe('var(--card-bg)');
      expect(styles.border).toBe('1px solid var(--card-border)');
      expect(styles.backdropFilter).toBe('blur(var(--blur-md))');
      expect(styles.WebkitBackdropFilter).toBe('blur(var(--blur-md))');
      expect(styles.boxShadow).toBe('none');
    });

    it('should apply custom blur level', () => {
      const styles = getGlassSurfaceStyles({
        bg: 'var(--card-bg)',
        border: 'var(--card-border)',
        blur: 'xl',
      });

      expect(styles.backdropFilter).toBe('blur(var(--blur-xl))');
      expect(styles.WebkitBackdropFilter).toBe('blur(var(--blur-xl))');
    });

    it('should apply shadow when provided', () => {
      const styles = getGlassSurfaceStyles({
        bg: 'var(--card-bg)',
        border: 'var(--card-border)',
        shadow: 'var(--glow-primary)',
      });

      expect(styles.boxShadow).toBe('var(--glow-primary)');
    });

    it('should default to md blur when not specified', () => {
      const styles = getGlassSurfaceStyles({
        bg: 'var(--card-bg)',
        border: 'var(--card-border)',
      });

      expect(styles.backdropFilter).toBe('blur(var(--blur-md))');
    });

    it('should support all blur levels', () => {
      const blurLevels: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

      blurLevels.forEach((blur) => {
        const styles = getGlassSurfaceStyles({
          bg: 'var(--card-bg)',
          border: 'var(--card-border)',
          blur,
        });

        expect(styles.backdropFilter).toBe(`blur(var(--blur-${blur}))`);
      });
    });
  });

  describe('getHoverTransformStyles', () => {
    it('should apply lift transform when hovered', () => {
      const styles = getHoverTransformStyles(true, { lift: true });

      expect(styles.transform).toBe('translateY(-2px)');
      expect(styles.transition).toBe('transform var(--transition-base)');
    });

    it('should reset lift transform when not hovered', () => {
      const styles = getHoverTransformStyles(false, { lift: true });

      expect(styles.transform).toBe('translateY(0)');
      expect(styles.transition).toBe('transform var(--transition-base)');
    });

    it('should apply scale transform when hovered', () => {
      const styles = getHoverTransformStyles(true, { scale: 1.02 });

      expect(styles.transform).toContain('scale(1.02)');
    });

    it('should not apply scale when not hovered', () => {
      const styles = getHoverTransformStyles(false, { scale: 1.02 });

      expect(styles.transform).not.toContain('scale');
    });

    it('should combine lift and scale transforms', () => {
      const styles = getHoverTransformStyles(true, { lift: true, scale: 1.05 });

      expect(styles.transform).toBe('translateY(-2px) scale(1.05)');
    });

    it('should default to lift enabled', () => {
      const styles = getHoverTransformStyles(true);

      expect(styles.transform).toBe('translateY(-2px)');
    });

    it('should return none when lift disabled and not hovered', () => {
      const styles = getHoverTransformStyles(false, { lift: false });

      expect(styles.transform).toBe('none');
    });

    it('should handle empty options', () => {
      const stylesHovered = getHoverTransformStyles(true, {});
      const stylesNotHovered = getHoverTransformStyles(false, {});

      expect(stylesHovered.transform).toBe('translateY(-2px)');
      expect(stylesNotHovered.transform).toBe('translateY(0)');
    });
  });

  describe('getStateBorderColor', () => {
    it('should prioritize error state', () => {
      const color = getStateBorderColor({
        error: 'Username is required',
        success: 'Looks good',
        isFocused: true,
        defaultColor: 'var(--input-border)',
      });

      expect(color).toBe('var(--alert-danger-text)');
    });

    it('should prioritize success over focus', () => {
      const color = getStateBorderColor({
        success: 'Looks good',
        isFocused: true,
        defaultColor: 'var(--input-border)',
      });

      expect(color).toBe('var(--alert-success-text)');
    });

    it('should prioritize focus over default', () => {
      const color = getStateBorderColor({
        isFocused: true,
        defaultColor: 'var(--input-border)',
      });

      expect(color).toBe('var(--input-focus-border)');
    });

    it('should return default when no state is active', () => {
      const color = getStateBorderColor({
        defaultColor: 'var(--input-border)',
      });

      expect(color).toBe('var(--input-border)');
    });

    it('should fallback to default border when defaultColor not provided', () => {
      const color = getStateBorderColor({});

      expect(color).toBe('var(--input-border)');
    });

    it('should treat empty error string as no error', () => {
      const color = getStateBorderColor({
        error: '',
        success: 'Looks good',
      });

      expect(color).not.toBe('var(--alert-danger-text)');
    });

    it('should treat empty success string as no success', () => {
      const color = getStateBorderColor({
        success: '',
        isFocused: true,
      });

      expect(color).toBe('var(--input-focus-border)');
    });

    it('should follow priority: error > success > focus > default', () => {
      // Error wins
      expect(
        getStateBorderColor({
          error: 'Error',
          success: 'Success',
          isFocused: true,
        })
      ).toBe('var(--alert-danger-text)');

      // Success wins
      expect(
        getStateBorderColor({
          success: 'Success',
          isFocused: true,
        })
      ).toBe('var(--alert-success-text)');

      // Focus wins
      expect(
        getStateBorderColor({
          isFocused: true,
        })
      ).toBe('var(--input-focus-border)');

      // Default wins
      expect(getStateBorderColor({})).toBe('var(--input-border)');
    });
  });
});
