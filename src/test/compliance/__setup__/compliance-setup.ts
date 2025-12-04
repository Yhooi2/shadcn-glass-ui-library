/**
 * Compliance Test Setup
 *
 * Additional setup for design system compliance tests.
 * Extends the base test setup with compliance-specific utilities.
 */

import { expect } from 'vitest';
import '@testing-library/jest-dom';

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock CSS.supports for backdrop-filter testing
Object.defineProperty(window.CSS, 'supports', {
  writable: true,
  value: (property: string, value?: string) => {
    // Simulate modern browser support
    if (property === 'backdrop-filter' || property === '-webkit-backdrop-filter') {
      return true;
    }
    if (value !== undefined) {
      return true;
    }
    return CSS.supports(property);
  },
});

// Add custom matchers for compliance testing
expect.extend({
  /**
   * Check if a value is on the 8px grid
   */
  toBeOnGrid(received: number, gridSize: number = 4) {
    const pass = received === 0 || received % gridSize === 0;
    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received} not to be on ${gridSize}px grid`
          : `Expected ${received} to be on ${gridSize}px grid (remainder: ${received % gridSize})`,
    };
  },

  /**
   * Check if a contrast ratio meets WCAG AA requirements
   */
  toMeetContrastAA(received: number, isLargeText: boolean = false) {
    const threshold = isLargeText ? 3.0 : 4.5;
    const pass = received >= threshold;
    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received}:1 not to meet WCAG AA (threshold: ${threshold}:1)`
          : `Expected ${received}:1 to meet WCAG AA (threshold: ${threshold}:1)`,
    };
  },

  /**
   * Check if touch target meets minimum size
   */
  toMeetTouchTarget(received: { width: number; height: number }, minSize: number = 44) {
    const pass = received.width >= minSize && received.height >= minSize;
    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received.width}x${received.height} not to meet touch target minimum ${minSize}px`
          : `Expected ${received.width}x${received.height} to meet touch target minimum ${minSize}px`,
    };
  },

  /**
   * Check if blur value is a valid token
   */
  toBeValidBlurToken(received: number | null) {
    const validBlurs = [8, 16, 24, 32];
    const pass = received === null || validBlurs.includes(received);
    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received}px not to be a valid blur token`
          : `Expected ${received}px to be a valid blur token (${validBlurs.join(', ')}px)`,
    };
  },
});

// Extend Vitest's expect types
declare module 'vitest' {
  interface Assertion<T> {
    toBeOnGrid(gridSize?: number): void;
    toMeetContrastAA(isLargeText?: boolean): void;
    toMeetTouchTarget(minSize?: number): void;
    toBeValidBlurToken(): void;
  }
  interface AsymmetricMatchersContaining {
    toBeOnGrid(gridSize?: number): void;
    toMeetContrastAA(isLargeText?: boolean): void;
    toMeetTouchTarget(minSize?: number): void;
    toBeValidBlurToken(): void;
  }
}

export {};
