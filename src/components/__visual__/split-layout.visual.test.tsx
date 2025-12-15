/**
 * Visual Regression Tests for SplitLayoutGlass
 * Tests component across all 3 themes (glass, light, aurora)
 *
 * Run: npx vitest --project=visual split-layout
 * Update baselines: gh workflow run update-screenshots.yml
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';
import { SplitLayoutGlass } from '@/components/glass/composite/split-layout-glass';
import { ThemeProvider, type Theme } from '@/lib/theme-context';
import { TooltipGlassProvider } from '@/components/glass/ui/tooltip-glass';
import { BadgeGlass } from '@/components/glass/ui/badge-glass';
import { ProgressGlass } from '@/components/glass/specialized/progress-glass';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];

// Helper to render component with theme
function renderWithTheme(component: React.ReactNode, theme: Theme) {
  return render(
    <ThemeProvider defaultTheme={theme}>
      <TooltipGlassProvider>
        <div
          data-testid="visual-test-container"
          data-theme={theme}
          style={{
            width: '1400px',
            height: '800px',
            padding: '1rem',
          }}
        >
          {component}
        </div>
      </TooltipGlassProvider>
    </ThemeProvider>
  );
}

// Wait for animations to settle
async function waitForStability(ms = 150) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

describe('SplitLayoutGlass Visual Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // ==================== TEST 1: DEFAULT LAYOUT ====================

  describe.each(THEMES)('Default Layout - Theme: %s', (theme) => {
    test(`split-layout-default-${theme}`, async () => {
      renderWithTheme(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.SidebarHeader>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Sidebar Header
              </h3>
            </SplitLayoutGlass.SidebarHeader>
            <SplitLayoutGlass.SidebarContent>
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg mb-2"
                  style={{
                    background: i === 0 ? 'var(--semantic-primary-subtle)' : 'transparent',
                    color: 'var(--text-primary)',
                  }}
                >
                  Section {i + 1}
                </div>
              ))}
            </SplitLayoutGlass.SidebarContent>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <SplitLayoutGlass.MainContent>
              <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Main Content
              </h1>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Independent scrolling demo with sticky behavior
              </p>
              {Array.from({ length: 8 }).map((_, i) => (
                <p key={i} className="mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Paragraph {i + 1}: Lorem ipsum dolor sit amet consectetur.
                </p>
              ))}
            </SplitLayoutGlass.MainContent>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`split-layout-default-${theme}.png`);
    });
  });

  // ==================== TEST 2: INTENSITY VARIANTS ====================

  describe.each(THEMES)('Intensity Variants - Theme: %s', (theme) => {
    test(`split-layout-intensity-subtle-${theme}`, async () => {
      renderWithTheme(
        <SplitLayoutGlass.Provider intensity="subtle">
          <SplitLayoutGlass.Root>
            <SplitLayoutGlass.Sidebar>
              <div className="p-4" style={{ color: 'var(--text-primary)' }}>
                <h3 className="font-semibold mb-2">Subtle Blur (8px)</h3>
                <p className="text-sm">Minimal glass effect</p>
              </div>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <div className="p-4" style={{ color: 'var(--text-primary)' }}>
                <h2 className="text-xl font-bold mb-2">Main Content</h2>
                <p className="text-sm">Subtle intensity demo</p>
              </div>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </SplitLayoutGlass.Provider>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`split-layout-intensity-subtle-${theme}.png`);
    });

    test(`split-layout-intensity-medium-${theme}`, async () => {
      renderWithTheme(
        <SplitLayoutGlass.Provider intensity="medium">
          <SplitLayoutGlass.Root>
            <SplitLayoutGlass.Sidebar>
              <div className="p-4" style={{ color: 'var(--text-primary)' }}>
                <h3 className="font-semibold mb-2">Medium Blur (16px)</h3>
                <p className="text-sm">Standard glass effect</p>
              </div>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <div className="p-4" style={{ color: 'var(--text-primary)' }}>
                <h2 className="text-xl font-bold mb-2">Main Content</h2>
                <p className="text-sm">Medium intensity demo (default)</p>
              </div>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </SplitLayoutGlass.Provider>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`split-layout-intensity-medium-${theme}.png`);
    });

    test(`split-layout-intensity-strong-${theme}`, async () => {
      renderWithTheme(
        <SplitLayoutGlass.Provider intensity="strong">
          <SplitLayoutGlass.Root>
            <SplitLayoutGlass.Sidebar>
              <div className="p-4" style={{ color: 'var(--text-primary)' }}>
                <h3 className="font-semibold mb-2">Strong Blur (24px)</h3>
                <p className="text-sm">Maximum glass effect</p>
              </div>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <div className="p-4" style={{ color: 'var(--text-primary)' }}>
                <h2 className="text-xl font-bold mb-2">Main Content</h2>
                <p className="text-sm">Strong intensity demo</p>
              </div>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </SplitLayoutGlass.Provider>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`split-layout-intensity-strong-${theme}.png`);
    });
  });

  // ==================== TEST 3: RATIO VARIANTS ====================

  describe.each(THEMES)('Ratio Variants - Theme: %s', (theme) => {
    test(`split-layout-ratio-equal-${theme}`, async () => {
      renderWithTheme(
        <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 1 }}>
          <SplitLayoutGlass.Sidebar>
            <div className="p-4" style={{ color: 'var(--text-primary)' }}>
              <h3 className="font-semibold mb-2">Sidebar (50%)</h3>
              <p className="text-sm">Equal width layout</p>
            </div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div className="p-4" style={{ color: 'var(--text-primary)' }}>
              <h2 className="text-xl font-bold mb-2">Main (50%)</h2>
              <p className="text-sm">Equal width layout</p>
            </div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`split-layout-ratio-equal-${theme}.png`);
    });

    test(`split-layout-ratio-1-3-${theme}`, async () => {
      renderWithTheme(
        <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 3 }}>
          <SplitLayoutGlass.Sidebar>
            <div className="p-4" style={{ color: 'var(--text-primary)' }}>
              <h3 className="font-semibold mb-2">Sidebar (25%)</h3>
              <p className="text-sm">Narrow sidebar layout</p>
            </div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div className="p-4" style={{ color: 'var(--text-primary)' }}>
              <h2 className="text-xl font-bold mb-2">Main (75%)</h2>
              <p className="text-sm">Wide main area</p>
            </div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`split-layout-ratio-1-3-${theme}.png`);
    });
  });

  // ==================== TEST 4: WITH SCROLLABLE CONTENT ====================

  describe.each(THEMES)('With Scrollable Content - Theme: %s', (theme) => {
    test(`split-layout-scrollable-${theme}`, async () => {
      renderWithTheme(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.SidebarHeader>
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Navigation
              </h3>
            </SplitLayoutGlass.SidebarHeader>
            <SplitLayoutGlass.SidebarContent>
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="p-2 rounded mb-2"
                  style={{
                    background: i === 2 ? 'var(--semantic-primary-subtle)' : 'transparent',
                    color: 'var(--text-primary)',
                  }}
                >
                  Item {i + 1}
                </div>
              ))}
            </SplitLayoutGlass.SidebarContent>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <SplitLayoutGlass.MainContent>
              <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Scrollable Content Demo
              </h1>
              {Array.from({ length: 12 }).map((_, i) => (
                <p key={i} className="mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              ))}
            </SplitLayoutGlass.MainContent>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`split-layout-scrollable-${theme}.png`);
    });
  });

  // ==================== TEST 5: MOBILE STACK LAYOUT ====================

  describe.each(THEMES)('Mobile Stack Layout - Theme: %s', (theme) => {
    test(`split-layout-mobile-stack-${theme}`, async () => {
      // Render in mobile viewport
      renderWithTheme(
        <div style={{ width: '375px', height: '600px' }}>
          <SplitLayoutGlass.Root mobileLayout="stack">
            <SplitLayoutGlass.Sidebar>
              <div className="p-4" style={{ color: 'var(--text-primary)' }}>
                <h3 className="font-semibold mb-2">Sidebar</h3>
                <p className="text-sm">Appears above on mobile</p>
              </div>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <div className="p-4" style={{ color: 'var(--text-primary)' }}>
                <h2 className="text-lg font-bold mb-2">Main</h2>
                <p className="text-sm">Appears below on mobile</p>
              </div>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </div>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`split-layout-mobile-stack-${theme}.png`);
    });
  });

  // ==================== TEST 6: REAL-WORLD EXAMPLE ====================

  describe.each(THEMES)('Real-World Example - Theme: %s', (theme) => {
    test(`split-layout-real-world-${theme}`, async () => {
      const years = [
        { year: 2024, commits: 1247, progress: 100 },
        { year: 2023, commits: 2134, progress: 85 },
        { year: 2022, commits: 1876, progress: 70 },
      ];

      renderWithTheme(
        <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 2 }}>
          <SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.SidebarHeader>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Career Summary
              </h3>
              <div className="mt-2">
                <BadgeGlass variant="success">Active</BadgeGlass>
              </div>
            </SplitLayoutGlass.SidebarHeader>
            <SplitLayoutGlass.SidebarContent>
              {years.map((y) => (
                <div
                  key={y.year}
                  className="p-3 rounded-lg mb-2"
                  style={{
                    background: y.year === 2024 ? 'var(--semantic-primary-subtle)' : 'transparent',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {y.year}
                    </span>
                    <BadgeGlass variant="default" size="sm">
                      {y.commits}
                    </BadgeGlass>
                  </div>
                  <ProgressGlass value={y.progress} size="sm" />
                </div>
              ))}
            </SplitLayoutGlass.SidebarContent>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <SplitLayoutGlass.MainContent>
              <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                2024 Contribution Details
              </h1>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {['Commits', 'Pull Requests', 'Issues'].map((label) => (
                  <div
                    key={label}
                    className="p-3 rounded-lg"
                    style={{
                      background: 'var(--card-subtle-bg)',
                      borderColor: 'var(--card-subtle-border)',
                    }}
                  >
                    <div className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                      {label}
                    </div>
                    <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {Math.floor(Math.random() * 1000)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span
                      className="w-20 text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Month {i + 1}
                    </span>
                    <ProgressGlass value={Math.random() * 100} className="flex-1" />
                  </div>
                ))}
              </div>
            </SplitLayoutGlass.MainContent>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`split-layout-real-world-${theme}.png`);
    });
  });
});
