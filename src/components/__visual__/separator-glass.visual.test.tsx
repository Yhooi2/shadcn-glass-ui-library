/**
 * Visual Regression Tests for SeparatorGlass
 * Tests component across all 3 themes (glass, light, aurora)
 *
 * Run: npx vitest --project=visual separator
 * Update baselines: gh workflow run update-screenshots.yml
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';
import { SeparatorGlass } from '@/components/glass/ui/separator-glass';
import { ThemeProvider, type Theme } from '@/lib/theme-context';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];

// Helper to render component with theme
function renderWithTheme(component: React.ReactNode, theme: Theme) {
  return render(
    <ThemeProvider defaultTheme={theme}>
      <div
        data-testid="visual-test-container"
        data-theme={theme}
        style={{
          width: '400px',
          height: '300px',
          padding: '24px',
          background:
            theme === 'glass'
              ? 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #1e1b4b 100%)'
              : theme === 'aurora'
                ? 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #2d1b4e 100%)'
                : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        }}
      >
        {component}
      </div>
    </ThemeProvider>
  );
}

// Wait for animations to settle
async function waitForStability(ms = 100) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

describe('SeparatorGlass Visual Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // ==================== TEST 1: HORIZONTAL SEPARATOR ====================

  describe.each(THEMES)('Horizontal Separator - Theme: %s', (theme) => {
    test(`separator-horizontal-${theme}`, async () => {
      renderWithTheme(
        <div className="space-y-4">
          <p style={{ color: 'var(--text-primary)' }}>Content above separator</p>
          <SeparatorGlass />
          <p style={{ color: 'var(--text-primary)' }}>Content below separator</p>
        </div>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`separator-horizontal-${theme}.png`);
    });
  });

  // ==================== TEST 2: VERTICAL SEPARATOR ====================

  describe.each(THEMES)('Vertical Separator - Theme: %s', (theme) => {
    test(`separator-vertical-${theme}`, async () => {
      renderWithTheme(
        <div className="flex h-8 items-center space-x-4">
          <span style={{ color: 'var(--text-primary)' }}>Blog</span>
          <SeparatorGlass orientation="vertical" />
          <span style={{ color: 'var(--text-primary)' }}>Docs</span>
          <SeparatorGlass orientation="vertical" />
          <span style={{ color: 'var(--text-primary)' }}>Source</span>
        </div>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`separator-vertical-${theme}.png`);
    });
  });

  // ==================== TEST 3: WITH GLOW EFFECT ====================

  describe.each(THEMES)('With Glow Effect - Theme: %s', (theme) => {
    test(`separator-glow-${theme}`, async () => {
      renderWithTheme(
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Default (no glow)
            </p>
            <SeparatorGlass />
          </div>
          <div className="space-y-2">
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              With glow
            </p>
            <SeparatorGlass glow />
          </div>
        </div>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`separator-glow-${theme}.png`);
    });
  });

  // ==================== TEST 4: ALL VARIANTS ====================

  describe.each(THEMES)('All Variants - Theme: %s', (theme) => {
    test(`separator-all-variants-${theme}`, async () => {
      renderWithTheme(
        <div className="space-y-8">
          {/* Horizontal variants */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Horizontal
            </h3>
            <SeparatorGlass />
            <SeparatorGlass glow />
          </div>

          {/* Vertical variants */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Vertical
            </h3>
            <div className="flex h-6 items-center space-x-4">
              <span style={{ color: 'var(--text-primary)' }}>A</span>
              <SeparatorGlass orientation="vertical" />
              <span style={{ color: 'var(--text-primary)' }}>B</span>
              <SeparatorGlass orientation="vertical" glow />
              <span style={{ color: 'var(--text-primary)' }}>C</span>
            </div>
          </div>
        </div>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`separator-all-variants-${theme}.png`);
    });
  });

  // ==================== TEST 5: IN CARD CONTEXT ====================

  describe.each(THEMES)('In Card Context - Theme: %s', (theme) => {
    test(`separator-in-card-${theme}`, async () => {
      renderWithTheme(
        <div
          className="rounded-lg p-4"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
          }}
        >
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Card Title
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Card description text.
          </p>

          <SeparatorGlass className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span style={{ color: 'var(--text-secondary)' }}>Label</span>
              <span style={{ color: 'var(--text-primary)' }}>Value</span>
            </div>
          </div>

          <SeparatorGlass className="my-4" glow />

          <div className="flex justify-end">
            <button
              className="rounded px-3 py-1 text-sm"
              style={{
                background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-text)',
              }}
            >
              Action
            </button>
          </div>
        </div>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`separator-in-card-${theme}.png`);
    });
  });
});
