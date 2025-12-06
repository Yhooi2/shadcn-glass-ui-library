/**
 * Visual Regression Tests for Glass Variants
 * Tests the 4 glass effect variants (glass, frosted, fluted, crystal)
 * across all 3 themes (glass, light, aurora)
 *
 * Run: npm run test:visual
 * Update baselines: npm run test:visual:update
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';

// Theme context
import { ThemeProvider } from '@/lib/theme-context';
import type { Theme } from '@/lib/theme-context';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];
const VARIANTS = ['glass', 'frosted', 'fluted', 'crystal'] as const;

// Helper to render component with theme
function renderWithTheme(component: React.ReactNode, theme: Theme) {
  return render(
    <ThemeProvider defaultTheme={theme}>
      <div data-testid="visual-test-container" data-theme={theme}>
        {component}
      </div>
    </ThemeProvider>
  );
}

// Wait for animations to settle
async function waitForStable() {
  await new Promise(resolve => setTimeout(resolve, 300));
}

afterEach(() => {
  cleanup();
});

describe('Glass Variants Visual Tests', () => {
  // Individual variant tests
  VARIANTS.forEach((variant) => {
    THEMES.forEach((theme) => {
      test(`${variant} variant - ${theme} theme`, async () => {
        renderWithTheme(
          <div className={`${variant} p-8 rounded-2xl w-80`}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Glass variant test content
              </p>
            </div>
          </div>,
          theme
        );

        await waitForStable();
        await expect(page.locator('[data-testid="visual-test-container"]')).toMatchScreenshot(
          `glass-variant-${variant}-${theme}.png`
        );
      });
    });
  });

  // Comparison grid test
  THEMES.forEach((theme) => {
    test(`all variants comparison - ${theme} theme`, async () => {
      renderWithTheme(
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="glass p-6 rounded-xl">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Glass</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Standard</p>
          </div>
          <div className="frosted p-6 rounded-xl">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Frosted</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Matte</p>
          </div>
          <div className="fluted p-6 rounded-xl">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Fluted</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Ribbed</p>
          </div>
          <div className="crystal p-6 rounded-xl">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Crystal</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Clear</p>
          </div>
        </div>,
        theme
      );

      await waitForStable();
      await expect(page.locator('[data-testid="visual-test-container"]')).toMatchScreenshot(
        `glass-variants-comparison-${theme}.png`
      );
    });
  });

  // Intensity modifiers test
  THEMES.forEach((theme) => {
    test(`intensity modifiers - ${theme} theme`, async () => {
      renderWithTheme(
        <div className="flex gap-4 p-4">
          <div className="glass-subtle p-6 rounded-xl w-40">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Subtle</p>
          </div>
          <div className="glass p-6 rounded-xl w-40">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Default</p>
          </div>
          <div className="glass-strong p-6 rounded-xl w-40">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Strong</p>
          </div>
        </div>,
        theme
      );

      await waitForStable();
      await expect(page.locator('[data-testid="visual-test-container"]')).toMatchScreenshot(
        `glass-intensity-modifiers-${theme}.png`
      );
    });
  });

  // Color tints test
  THEMES.forEach((theme) => {
    test(`color tints - ${theme} theme`, async () => {
      renderWithTheme(
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="glass-tint-primary p-6 rounded-xl">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Primary</p>
          </div>
          <div className="glass-tint-success p-6 rounded-xl">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Success</p>
          </div>
          <div className="glass-tint-warning p-6 rounded-xl">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Warning</p>
          </div>
          <div className="glass-tint-error p-6 rounded-xl">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Error</p>
          </div>
        </div>,
        theme
      );

      await waitForStable();
      await expect(page.locator('[data-testid="visual-test-container"]')).toMatchScreenshot(
        `glass-color-tints-${theme}.png`
      );
    });
  });

  // Combined modifiers test
  THEMES.forEach((theme) => {
    test(`combined modifiers - ${theme} theme`, async () => {
      renderWithTheme(
        <div className="flex gap-4 p-4">
          <div className="frosted-subtle p-6 rounded-xl w-40">
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Frosted Subtle</p>
          </div>
          <div className="crystal-strong p-6 rounded-xl w-40">
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Crystal Strong</p>
          </div>
          <div className="fluted-tint-primary p-6 rounded-xl w-40">
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Fluted Primary</p>
          </div>
        </div>,
        theme
      );

      await waitForStable();
      await expect(page.locator('[data-testid="visual-test-container"]')).toMatchScreenshot(
        `glass-combined-modifiers-${theme}.png`
      );
    });
  });
});
