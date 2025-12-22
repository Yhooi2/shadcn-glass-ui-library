/**
 * Visual Regression Tests for ScrollAreaGlass
 * Tests component across all 3 themes (glass, light, aurora)
 *
 * Run: npx vitest --project=visual scroll-area
 * Update baselines: gh workflow run update-screenshots.yml
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';
import { ScrollAreaGlass } from '@/components/glass/ui/scroll-area-glass';
import { SeparatorGlass } from '@/components/glass/ui/separator-glass';
import { ThemeProvider, type Theme } from '@/lib/theme-context';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];

// Sample data
const tags = Array.from({ length: 30 }).map((_, i) => `v1.${30 - i}.0`);

// Helper to render component with theme
function renderWithTheme(component: React.ReactNode, theme: Theme) {
  return render(
    <ThemeProvider defaultTheme={theme}>
      <div
        data-testid="visual-test-container"
        data-theme={theme}
        style={{
          width: '500px',
          height: '450px',
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
async function waitForStability(ms = 150) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

describe('ScrollAreaGlass Visual Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // ==================== TEST 1: VERTICAL SCROLL ====================

  describe.each(THEMES)('Vertical Scroll - Theme: %s', (theme) => {
    test(`scroll-area-vertical-${theme}`, async () => {
      renderWithTheme(
        <ScrollAreaGlass className="h-72 w-48 rounded-md border border-[var(--card-border)]">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Version Tags
            </h4>
            {tags.map((tag) => (
              <div key={tag}>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {tag}
                </div>
                <SeparatorGlass className="my-2" />
              </div>
            ))}
          </div>
        </ScrollAreaGlass>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`scroll-area-vertical-${theme}.png`);
    });
  });

  // ==================== TEST 2: HORIZONTAL SCROLL ====================

  describe.each(THEMES)('Horizontal Scroll - Theme: %s', (theme) => {
    test(`scroll-area-horizontal-${theme}`, async () => {
      renderWithTheme(
        <ScrollAreaGlass
          className="w-80 whitespace-nowrap rounded-md border border-[var(--card-border)]"
          orientation="horizontal"
        >
          <div className="flex w-max space-x-4 p-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 rounded-md w-[100px] h-[80px] flex items-center justify-center"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                }}
              >
                <span style={{ color: 'var(--text-primary)' }}>Card {i + 1}</span>
              </div>
            ))}
          </div>
        </ScrollAreaGlass>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`scroll-area-horizontal-${theme}.png`);
    });
  });

  // ==================== TEST 3: BOTH DIRECTIONS ====================

  describe.each(THEMES)('Both Directions - Theme: %s', (theme) => {
    test(`scroll-area-both-${theme}`, async () => {
      renderWithTheme(
        <ScrollAreaGlass
          className="h-[250px] w-[350px] rounded-md border border-[var(--card-border)]"
          orientation="both"
        >
          <div className="p-4" style={{ width: '600px' }}>
            <h4 className="mb-4 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Large Content Area
            </h4>
            <div className="space-y-3">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span className="w-16 shrink-0">Row {i + 1}</span>
                  <div
                    className="h-6 flex-1 rounded"
                    style={{ background: 'var(--card-bg)', minWidth: '400px' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollAreaGlass>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`scroll-area-both-${theme}.png`);
    });
  });

  // ==================== TEST 4: IN CARD CONTEXT ====================

  describe.each(THEMES)('In Card Context - Theme: %s', (theme) => {
    test(`scroll-area-in-card-${theme}`, async () => {
      renderWithTheme(
        <div
          className="w-[280px] rounded-xl p-4"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
          }}
        >
          <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Activity Feed
          </h3>
          <SeparatorGlass className="mb-3" />
          <ScrollAreaGlass className="h-[180px]">
            <div className="space-y-2 pr-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg p-2"
                  style={{ background: 'var(--glass-surface)' }}
                >
                  <div
                    className="h-6 w-6 rounded-full shrink-0"
                    style={{ background: 'var(--btn-primary-bg)' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs truncate" style={{ color: 'var(--text-primary)' }}>
                      Activity #{i + 1}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {i + 1}m ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAreaGlass>
        </div>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`scroll-area-in-card-${theme}.png`);
    });
  });
});
