/**
 * Visual Regression Tests for ComponentShowcase Demo Page
 * Tests the full component library demo page across all 3 themes (glass, light, aurora)
 *
 * Run: npm run test:visual
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from '@vitest/browser/context';

import { ComponentShowcase } from '../demos/ComponentShowcase';
import { ThemeProvider } from '@/lib/theme-context';
import type { Theme } from '@/lib/theme-context';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];

// Helper to render showcase with theme
function renderShowcase(theme: Theme) {
  return render(
    <ThemeProvider defaultTheme={theme}>
      <div data-testid="showcase-root" data-theme={theme}>
        <ComponentShowcase />
      </div>
    </ThemeProvider>
  );
}

// Wait for animations to settle
async function waitForStability(ms = 300) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

describe('ComponentShowcase Visual Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // ==========================================
  // Full Page Screenshots for Each Theme
  // ==========================================

  describe.each(THEMES)('Full Demo Page - Theme: %s', (theme) => {
    test(`ComponentShowcase full page - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability(500);

      const root = page.getByTestId('showcase-root');
      await expect(root).toMatchScreenshot(`componentshowcase-full-${theme}`);
    });
  });

  // ==========================================
  // Section-by-Section Tests
  // ==========================================

  describe.each(THEMES)('Showcase Sections - Theme: %s', (theme) => {
    test(`Buttons section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-buttons');
      await expect(section).toMatchScreenshot(`componentshowcase-buttons-${theme}`);
    });

    test(`Inputs section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-inputs');
      await expect(section).toMatchScreenshot(`componentshowcase-inputs-${theme}`);
    });

    test(`Progress section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-progress');
      await expect(section).toMatchScreenshot(`componentshowcase-progress-${theme}`);
    });

    test(`Tabs section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-tabs');
      await expect(section).toMatchScreenshot(`componentshowcase-tabs-${theme}`);
    });

    test(`Badges section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-badges');
      await expect(section).toMatchScreenshot(`componentshowcase-badges-${theme}`);
    });

    test(`Avatars section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-avatars');
      await expect(section).toMatchScreenshot(`componentshowcase-avatars-${theme}`);
    });

    test(`Notifications section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const section = page.getByTestId('section-notifications');
      await expect(section).toMatchScreenshot(`componentshowcase-notifications-${theme}`);
    });
  });

  // ==========================================
  // Interactive Component Tests
  // ==========================================

  describe.each(THEMES)('Interactive Components - Theme: %s', (theme) => {
    test(`Modal opened - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Click "Open Modal" button
      const openModalBtn = page.getByRole('button', { name: 'Open Modal' });
      await openModalBtn.click();
      await waitForStability(400);

      // Screenshot the modal
      const modal = page.getByRole('dialog');
      await expect(modal).toMatchScreenshot(`componentshowcase-modal-open-${theme}`);
    });

    test(`Dropdown opened - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Click the Dropdown trigger
      const dropdownBtn = page.getByRole('button', { name: 'Dropdown' }).first();
      await dropdownBtn.click();
      await waitForStability(300);

      // Screenshot should include dropdown menu
      const menu = page.getByRole('menu');
      await expect(menu).toMatchScreenshot(`componentshowcase-dropdown-open-${theme}`);
    });

    test(`Tab switching - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Click on "Analytics" tab
      const analyticsTab = page.getByRole('tab', { name: 'Analytics' });
      await analyticsTab.click();
      await waitForStability(200);

      // Screenshot tabs with Analytics selected
      const tablist = page.getByRole('tablist').first();
      await expect(tablist).toMatchScreenshot(`componentshowcase-tabs-analytics-${theme}`);
    });

    test(`Toggle interaction - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find first toggle (role="switch")
      const toggles = page.getByRole('switch');
      const firstToggle = toggles.nth(0);

      // Take screenshot before click
      await expect(firstToggle).toMatchScreenshot(`componentshowcase-toggle-initial-${theme}`);

      // Click to toggle
      await firstToggle.click();
      await waitForStability(200);

      // Take screenshot after click
      await expect(firstToggle).toMatchScreenshot(`componentshowcase-toggle-toggled-${theme}`);
    });

    test(`Checkbox interaction - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find the checkbox label "Accept terms and conditions" (updated text in FormElementsBlock)
      const checkboxLabel = page.getByText('Accept terms and conditions');

      // Take screenshot in unchecked state (default is unchecked in FormElementsBlock)
      await expect(checkboxLabel).toMatchScreenshot(
        `componentshowcase-checkbox-unchecked-${theme}`
      );

      // Click the label to toggle
      await checkboxLabel.click();
      await waitForStability(200);

      // Take screenshot in checked state
      await expect(checkboxLabel).toMatchScreenshot(`componentshowcase-checkbox-checked-${theme}`);
    });

    // Tooltip test removed - tooltip is now in BadgesBlock demo

    test(`Input focus state - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find email input
      const inputs = page.getByRole('textbox');
      const emailInput = inputs.nth(0);

      // Click to focus
      await emailInput.click();
      await waitForStability(200);

      // Screenshot focused state
      await expect(emailInput).toMatchScreenshot(`componentshowcase-input-focused-${theme}`);
    });

    test(`Slider interaction - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find slider
      const slider = page.getByRole('slider');

      // Take screenshot at default value
      await expect(slider).toMatchScreenshot(`componentshowcase-slider-${theme}`);
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
      await expect(root).toMatchScreenshot('componentshowcase-theme-cycle-1-glass');

      // Click theme switcher (should show "Light" as next theme)
      const themeSwitcher = page.getByRole('button', { name: /Light/ });
      await themeSwitcher.click();
      await waitForStability(500);

      // Screenshot after switching to Light
      await expect(root).toMatchScreenshot('componentshowcase-theme-cycle-2-light');

      // Click again (should show "Aurora" as next theme)
      const auroraButton = page.getByRole('button', { name: /Aurora/ });
      await auroraButton.click();
      await waitForStability(500);

      // Screenshot after switching to Aurora
      await expect(root).toMatchScreenshot('componentshowcase-theme-cycle-3-aurora');

      // Click again (should show "Glass" as next theme)
      const glassButton = page.getByRole('button', { name: /Glass/ });
      await glassButton.click();
      await waitForStability(500);

      // Screenshot after switching back to Glass
      await expect(root).toMatchScreenshot('componentshowcase-theme-cycle-4-glass');
    });
  });
});
