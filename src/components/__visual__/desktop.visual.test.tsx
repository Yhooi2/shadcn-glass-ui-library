/**
 * Visual Regression Tests for DesktopShowcase Demo Page
 * Tests the full desktop demo page across all 3 themes (glass, light, aurora)
 *
 * Run: npm run test:visual
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';

import { DesktopShowcase } from '../DesktopShowcase';
import { ThemeProvider } from '@/lib/theme-context';
import type { Theme } from '@/lib/themeStyles';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];

// Helper to render showcase with theme
function renderShowcase(theme: Theme) {
  return render(
    <ThemeProvider defaultTheme={theme}>
      <div data-testid="desktop-root" data-theme={theme}>
        <DesktopShowcase />
      </div>
    </ThemeProvider>
  );
}

// Wait for animations to settle
async function waitForStability(ms = 300) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

describe('DesktopShowcase Visual Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // ==========================================
  // Full Page Screenshots for Each Theme
  // ==========================================

  describe.each(THEMES)('Full Demo Page - Theme: %s', (theme) => {
    test(`DesktopShowcase full page - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability(500);

      const root = page.getByTestId('desktop-root');
      await expect(root).toMatchScreenshot(`desktop-full-${theme}`);
    });
  });

  // ==========================================
  // Section-by-Section Tests
  // ==========================================

  describe.each(THEMES)('Desktop Sections - Theme: %s', (theme) => {
    test(`Header Navigation section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-header-nav');
      await expect(section).toMatchScreenshot(`desktop-header-nav-${theme}`);
    });

    test(`Trust Score section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-trust-score');
      await expect(section).toMatchScreenshot(`desktop-trust-score-${theme}`);
    });

    test(`Profile Header section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-profile-header');
      await expect(section).toMatchScreenshot(`desktop-profile-header-${theme}`);
    });

    test(`Flags section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-flags');
      await expect(section).toMatchScreenshot(`desktop-flags-${theme}`);
    });

    test(`Career Stats section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-career-stats');
      await expect(section).toMatchScreenshot(`desktop-career-stats-${theme}`);
    });

    test(`Repository Cards section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-repos');
      await expect(section).toMatchScreenshot(`desktop-repos-${theme}`);
    });

    test(`Tabs Dropdown Modal section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-tabs-dropdown');
      await expect(section).toMatchScreenshot(`desktop-tabs-dropdown-${theme}`);
    });

    test(`Buttons section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-buttons');
      await expect(section).toMatchScreenshot(`desktop-buttons-${theme}`);
    });

    test(`Forms section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-forms');
      await expect(section).toMatchScreenshot(`desktop-forms-${theme}`);
    });

    test(`Alerts section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-alerts');
      await expect(section).toMatchScreenshot(`desktop-alerts-${theme}`);
    });

    test(`Badges section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-badges');
      await expect(section).toMatchScreenshot(`desktop-badges-${theme}`);
    });

    test(`Progress section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-progress');
      await expect(section).toMatchScreenshot(`desktop-progress-${theme}`);
    });

    test(`Avatars section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-avatars');
      await expect(section).toMatchScreenshot(`desktop-avatars-${theme}`);
    });

    test(`Language Bar section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-language-bar');
      await expect(section).toMatchScreenshot(`desktop-language-bar-${theme}`);
    });
  });

  // ==========================================
  // Interactive Component Tests
  // ==========================================

  describe.each(THEMES)('Desktop Interactive Components - Theme: %s', (theme) => {
    test(`Modal opened - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Click "Open Modal" button
      const openModalBtn = page.getByRole('button', { name: 'Open Modal' });
      await openModalBtn.click();
      await waitForStability(400);

      // Screenshot the modal
      const modal = page.getByRole('dialog');
      await expect(modal).toMatchScreenshot(`desktop-modal-open-${theme}`);
    });

    test(`Dropdown opened - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Click the Dropdown trigger - it's the button that says "Menu"
      const dropdownBtn = page.getByRole('button', { name: 'Menu' });
      await dropdownBtn.click();
      await waitForStability(300);

      // Screenshot should include dropdown menu
      const menu = page.getByRole('menu');
      await expect(menu).toMatchScreenshot(`desktop-dropdown-open-${theme}`);
    });

    test(`Tab switching - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Click on "Repositories" tab
      const reposTab = page.getByRole('tab', { name: 'Repositories' });
      await reposTab.click();
      await waitForStability(200);

      // Screenshot tabs with Repositories selected
      const tablist = page.getByRole('tablist');
      await expect(tablist).toMatchScreenshot(`desktop-tabs-repos-${theme}`);
    });

    test(`Segmented control interaction - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Click on "Contrib" segment
      const contribBtn = page.getByRole('button', { name: 'Contrib' });
      await contribBtn.click();
      await waitForStability(200);

      // Screenshot the repo section with Contrib selected
      const section = page.getByTestId('section-repos');
      await expect(section).toMatchScreenshot(`desktop-segmented-contrib-${theme}`);
    });

    test(`Repo card expanded - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // The first repo should already be expanded, get its content
      const section = page.getByTestId('section-repos');
      await expect(section).toMatchScreenshot(`desktop-repo-expanded-${theme}`);
    });

    test(`Flags collapsed - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Click to collapse flags section
      const flagsBtn = page.getByRole('button', { name: /flags detected/ });
      await flagsBtn.click();
      await waitForStability(200);

      const section = page.getByTestId('section-flags');
      await expect(section).toMatchScreenshot(`desktop-flags-collapsed-${theme}`);
    });

    test(`Toggle interaction - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find toggle in forms section
      const toggles = page.getByRole('switch');
      const toggle = toggles.nth(0);

      // Take screenshot before click
      await expect(toggle).toMatchScreenshot(`desktop-toggle-on-${theme}`);

      // Click to toggle off
      await toggle.click();
      await waitForStability(200);

      // Take screenshot after click
      await expect(toggle).toMatchScreenshot(`desktop-toggle-off-${theme}`);
    });

    test(`Checkbox interaction - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find checkbox
      const checkbox = page.getByRole('checkbox');

      // Take screenshot in checked state
      await expect(checkbox).toMatchScreenshot(`desktop-checkbox-checked-${theme}`);

      // Click to uncheck
      await checkbox.click();
      await waitForStability(200);

      // Take screenshot in unchecked state
      await expect(checkbox).toMatchScreenshot(`desktop-checkbox-unchecked-${theme}`);
    });

    test(`Tooltip on hover - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find tooltip trigger button
      const tooltipTrigger = page.getByRole('button', { name: 'Hover me (top)' });

      // Hover over it
      await tooltipTrigger.hover();
      await waitForStability(300);

      // Screenshot with tooltip visible
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip).toMatchScreenshot(`desktop-tooltip-visible-${theme}`);
    });

    test(`Input focus state - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find inputs
      const inputs = page.getByRole('textbox');
      const emailInput = inputs.nth(0);

      // Click to focus the input
      await emailInput.click();
      await waitForStability(200);

      // Screenshot focused state
      await expect(emailInput).toMatchScreenshot(`desktop-input-focused-${theme}`);
    });
  });

  // ==========================================
  // New Component Visual Tests
  // ==========================================

  describe.each(THEMES)('New Components Visual - Theme: %s', (theme) => {
    test(`Status indicators - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-badges');
      await expect(section).toMatchScreenshot(`desktop-status-indicators-${theme}`);
    });

    test(`Rainbow progress bar - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-progress');
      await expect(section).toMatchScreenshot(`desktop-rainbow-progress-${theme}`);
    });

    test(`Metric cards - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-trust-score');
      await expect(section).toMatchScreenshot(`desktop-metric-cards-${theme}`);
    });

    test(`Profile avatar with glow - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-profile-header');
      await expect(section).toMatchScreenshot(`desktop-profile-avatar-${theme}`);
    });

    test(`AI Card - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // AI Card is inside profile header section
      const section = page.getByTestId('section-profile-header');
      await expect(section).toMatchScreenshot(`desktop-ai-card-${theme}`);
    });

    test(`Year cards - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-career-stats');
      await expect(section).toMatchScreenshot(`desktop-year-cards-${theme}`);
    });

    test(`Flag alerts - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-flags');
      await expect(section).toMatchScreenshot(`desktop-flag-alerts-${theme}`);
    });
  });

  // ==========================================
  // Theme Switching Tests
  // ==========================================

  describe('Theme Switching', () => {
    test('Theme cycles correctly via header: Glass -> Light -> Aurora -> Glass', async () => {
      // Start with Glass theme
      renderShowcase('glass');
      await waitForStability();

      // Screenshot initial Glass theme
      const root = page.getByTestId('desktop-root');
      await expect(root).toMatchScreenshot('desktop-theme-cycle-1-glass');

      // Click theme switcher button (next to "Sign in with GitHub")
      const themeSwitcher = page.getByRole('button', { name: /Light/ }).first();
      await themeSwitcher.click();
      await waitForStability(500);

      // Screenshot after switching to Light
      await expect(root).toMatchScreenshot('desktop-theme-cycle-2-light');

      // Click again (should show "Aurora" as next theme)
      const auroraButton = page.getByRole('button', { name: /Aurora/ }).first();
      await auroraButton.click();
      await waitForStability(500);

      // Screenshot after switching to Aurora
      await expect(root).toMatchScreenshot('desktop-theme-cycle-3-aurora');

      // Click again (should show "Glass" as next theme)
      const glassButton = page.getByRole('button', { name: /Glass/ }).first();
      await glassButton.click();
      await waitForStability(500);

      // Screenshot after switching back to Glass
      await expect(root).toMatchScreenshot('desktop-theme-cycle-4-glass');
    });
  });
});
