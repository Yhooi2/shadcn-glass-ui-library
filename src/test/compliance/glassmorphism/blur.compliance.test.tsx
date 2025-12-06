/**
 * Blur Compliance Tests - JSDOM Safe
 *
 * These tests validate blur token constants and parsing utilities.
 * They work in jsdom because they don't depend on computed CSS.
 *
 * For browser-dependent tests (actual backdrop-filter values),
 * see blur.browser.test.tsx
 */

import { describe, it, expect } from 'vitest';

import { BLUR_TOKENS, COMPONENT_SPECS } from '../../utils/design-tokens';
import { parseBlurValue } from '../../utils/blur-validator';

describe('Blur Compliance Tests - JSDOM Safe', () => {
  describe('Blur Token Constants', () => {
    it('has correct blur scale values', () => {
      expect(BLUR_TOKENS.SCALE.sm).toBe(8);
      expect(BLUR_TOKENS.SCALE.md).toBe(16);
      expect(BLUR_TOKENS.SCALE.lg).toBe(24);
      expect(BLUR_TOKENS.SCALE.xl).toBe(32);
    });

    it('has correct modal blur value', () => {
      expect(BLUR_TOKENS.MODAL).toBe(24);
    });

    it('has correct mobile max blur', () => {
      expect(BLUR_TOKENS.MAX_MOBILE).toBe(8);
    });

    it('has correct desktop max blur', () => {
      expect(BLUR_TOKENS.MAX_DESKTOP).toBe(24);
    });

    it('component specs match UI_DESIGN.md', () => {
      // Card default blur should be md (16px)
      expect(COMPONENT_SPECS.CARD.default.blur).toBe(16);

      // Modal blur should be lg (24px)
      expect(COMPONENT_SPECS.MODAL.blur).toBe(24);
    });
  });

  describe('Blur Value Parsing', () => {
    it('parses blur values from backdrop-filter', () => {
      expect(parseBlurValue('blur(16px)')).toBe(16);
      expect(parseBlurValue('blur(8px)')).toBe(8);
      expect(parseBlurValue('blur(24px)')).toBe(24);
    });

    it('parses blur from complex backdrop-filter', () => {
      expect(parseBlurValue('blur(16px) saturate(180%)')).toBe(16);
      expect(parseBlurValue('saturate(1.8) blur(12px)')).toBe(12);
    });

    it('returns null for no blur', () => {
      expect(parseBlurValue('none')).toBe(null);
      expect(parseBlurValue('')).toBe(null);
      expect(parseBlurValue('saturate(180%)')).toBe(null);
    });

    it('handles edge cases', () => {
      expect(parseBlurValue(null as unknown as string)).toBe(null);
      expect(parseBlurValue(undefined as unknown as string)).toBe(null);
    });
  });

  describe('Blur Token Validation Logic', () => {
    it('valid blur tokens are 8, 16, 24, 32', () => {
      const validBlurs = Object.values(BLUR_TOKENS.SCALE);
      expect(validBlurs).toContain(8);
      expect(validBlurs).toContain(16);
      expect(validBlurs).toContain(24);
      expect(validBlurs).toContain(32);
    });

    it('invalid blur values are not in scale', () => {
      const validBlurs = Object.values(BLUR_TOKENS.SCALE);
      expect(validBlurs).not.toContain(5);
      expect(validBlurs).not.toContain(10);
      expect(validBlurs).not.toContain(15);
      expect(validBlurs).not.toContain(20);
      expect(validBlurs).not.toContain(30);
    });

    it('blur scale follows correct progression', () => {
      // Each step should be a reasonable increment
      expect(BLUR_TOKENS.SCALE.md - BLUR_TOKENS.SCALE.sm).toBe(8);
      expect(BLUR_TOKENS.SCALE.lg - BLUR_TOKENS.SCALE.md).toBe(8);
      expect(BLUR_TOKENS.SCALE.xl - BLUR_TOKENS.SCALE.lg).toBe(8);
    });
  });
});
