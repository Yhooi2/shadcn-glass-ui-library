/**
 * Visual Regression Tests for MobileShowcase Demo Page
 * Tests the mobile GitHub Analytics demo page across all 3 themes (glass, light, aurora)
 *
 * Run: npm run test:visual
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from '@vitest/browser/context';

import { MobileShowcase } from '../demos/MobileShowcase';
import { ThemeProvider } from '@/lib/theme-context';
import type { Theme } from '@/lib/theme-context';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];

// Helper to render showcase with theme
function renderShowcase(theme: Theme) {
  return render(
    <ThemeProvider defaultTheme={theme}>
      <div data-testid="showcase-root" data-theme={theme}>
        <MobileShowcase />
      </div>
    </ThemeProvider>
  );
}

// Wait for animations to settle
async function waitForStability(ms = 300) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

describe('MobileShowcase Visual Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // NOTE: Full page and profile tests disabled due to animate-pulse causing non-deterministic screenshots
  // The background blur animations never complete, causing pixel differences on each render

  // ==========================================
  // Section-by-Section Tests (Static Sections Only)
  // ==========================================

  describe.each(THEMES)('Showcase Sections - Theme: %s', (theme) => {
    test(`Header section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-header');
      await expect(section).toMatchScreenshot(`mobileshowcase-header-${theme}`);
    });

    test(`AI Summary section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-ai-summary');
      await expect(section).toMatchScreenshot(`mobileshowcase-ai-summary-${theme}`);
    });

    test(`Trust Score section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-trust-score');
      await expect(section).toMatchScreenshot(`mobileshowcase-trust-score-${theme}`);
    });

    test(`Flags section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-flags');
      await expect(section).toMatchScreenshot(`mobileshowcase-flags-${theme}`);
    });

    test(`Career Stats section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-career-stats');
      await expect(section).toMatchScreenshot(`mobileshowcase-career-stats-${theme}`);
    });

    test(`Projects section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-projects');
      await expect(section).toMatchScreenshot(`mobileshowcase-projects-${theme}`);
    });
  });

  // ==========================================
  // Interactive Component Tests
  // ==========================================

  describe.each(THEMES)('Interactive Components - Theme: %s', (theme) => {
    test(`Flags expanded - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Click to expand flags
      const flagsButton = page.getByRole('button', { name: /flags detected/i });
      await flagsButton.click();
      await waitForStability(300);

      // Screenshot flags section expanded
      const section = page.getByTestId('section-flags');
      await expect(section).toMatchScreenshot(`mobileshowcase-flags-expanded-${theme}`);
    });

    test(`Repository card expanded - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find first repository card and click to expand
      const repoCards = page.getByRole('button', { name: /Wildhaven-website/i });
      await repoCards.click();
      await waitForStability(300);

      // Screenshot projects section with expanded card
      const section = page.getByTestId('section-projects');
      await expect(section).toMatchScreenshot(`mobileshowcase-repo-expanded-${theme}`);
    });

    test(`Repository with issues expanded - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find repository with issues and expand
      const repoCard = page.getByRole('button', { name: /bot-scripts/i });
      await repoCard.click();
      await waitForStability(300);

      // Screenshot projects section with issues visible
      const section = page.getByTestId('section-projects');
      await expect(section).toMatchScreenshot(`mobileshowcase-repo-issues-${theme}`);
    });

    test(`Year card expanded - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find and click a year card (2024)
      const yearCard = page.getByRole('button', { name: /2024/i });
      await yearCard.click();
      await waitForStability(300);

      // Screenshot career stats section
      const section = page.getByTestId('section-career-stats');
      await expect(section).toMatchScreenshot(`mobileshowcase-year-expanded-${theme}`);
    });

    test(`Filter badges visible - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Click to expand flags (which activates flagged filter)
      const flagsButton = page.getByRole('button', { name: /flags detected/i });
      await flagsButton.click();
      await waitForStability(300);

      // Check if filter badges section appears
      const filtersSection = page.getByTestId('section-filters');
      await expect(filtersSection).toMatchScreenshot(`mobileshowcase-filters-${theme}`);
    });
  });

  // ==========================================
  // Theme Switching Tests
  // ==========================================

  describe('Theme Switching', () => {
    test('Theme cycles correctly: Glass -> Light -> Aurora -> Glass', async () => {
      // Start with Glass theme
      renderShowcase('glass');
      await waitForStability();

      // Screenshot initial Glass theme
      const root = page.getByTestId('showcase-root');
      await expect(root).toMatchScreenshot('mobileshowcase-theme-cycle-1-glass');

      // Click theme switcher (should show "Light" as next theme)
      const themeSwitcher = page.getByRole('button', { name: /Light/i });
      await themeSwitcher.click();
      await waitForStability(500);

      // Screenshot after switching to Light
      await expect(root).toMatchScreenshot('mobileshowcase-theme-cycle-2-light');

      // Click again (should show "Aurora" as next theme)
      const auroraButton = page.getByRole('button', { name: /Aurora/i });
      await auroraButton.click();
      await waitForStability(500);

      // Screenshot after switching to Aurora
      await expect(root).toMatchScreenshot('mobileshowcase-theme-cycle-3-aurora');

      // Click again (should show "Glass" as next theme)
      const glassButton = page.getByRole('button', { name: /Glass/i });
      await glassButton.click();
      await waitForStability(500);

      // Screenshot after switching back to Glass
      await expect(root).toMatchScreenshot('mobileshowcase-theme-cycle-4-glass');
    });
  });

  // ==========================================
  // Empty State Tests
  // ==========================================

  describe.each(THEMES)('Empty State - Theme: %s', (theme) => {
    test(`Projects empty state with filters - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // First expand flags to activate filter
      const flagsButton = page.getByRole('button', { name: /flags detected/i });
      await flagsButton.click();
      await waitForStability(300);

      // The empty state should appear if we filter and no results
      // Note: This test may need adjustment based on actual data filtering
      const section = page.getByTestId('section-projects');
      await expect(section).toMatchScreenshot(`mobileshowcase-projects-filtered-${theme}`);
    });
  });
});
