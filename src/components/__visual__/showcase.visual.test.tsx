/**
 * Visual Regression Tests for ComponentShowcase Demo Page
 * Tests the full demo page across all 3 themes (glass, light, aurora)
 *
 * Run: npm run test:visual
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';

import { ComponentShowcase } from '../ComponentShowcase';
import { ThemeProvider } from '@/lib/theme-context';
import type { Theme } from '@/lib/themeStyles';

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
  await new Promise(resolve => setTimeout(resolve, ms));
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
      await expect(root).toMatchScreenshot(`showcase-full-${theme}`);
    });
  });

  // ==========================================
  // Section-by-Section Tests
  // ==========================================

  describe.each(THEMES)('Showcase Sections - Theme: %s', (theme) => {
    test(`Buttons section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const buttonsHeading = page.getByRole('heading', { name: 'Buttons with Glow & Pulse' });
      await expect(buttonsHeading).toMatchScreenshot(`showcase-buttons-heading-${theme}`);
    });

    test(`Inputs section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const inputsHeading = page.getByRole('heading', { name: 'Inputs & Forms' });
      await expect(inputsHeading).toMatchScreenshot(`showcase-inputs-heading-${theme}`);
    });

    test(`Toggles section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const togglesHeading = page.getByRole('heading', { name: 'Toggles & Selection' });
      await expect(togglesHeading).toMatchScreenshot(`showcase-toggles-heading-${theme}`);
    });

    test(`Progress section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const progressHeading = page.getByRole('heading', { name: 'Progress Bars' });
      await expect(progressHeading).toMatchScreenshot(`showcase-progress-heading-${theme}`);
    });

    test(`Badges section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const badgesHeading = page.getByRole('heading', { name: 'Badges & Status' });
      await expect(badgesHeading).toMatchScreenshot(`showcase-badges-heading-${theme}`);
    });

    test(`Avatars section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const avatarsHeading = page.getByRole('heading', { name: 'Avatars' });
      await expect(avatarsHeading).toMatchScreenshot(`showcase-avatars-heading-${theme}`);
    });

    test(`Alerts section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const alertsHeading = page.getByRole('heading', { name: 'Alerts' });
      await expect(alertsHeading).toMatchScreenshot(`showcase-alerts-heading-${theme}`);
    });

    test(`Notifications section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const notificationsHeading = page.getByRole('heading', { name: 'Notifications' });
      await expect(notificationsHeading).toMatchScreenshot(`showcase-notifications-heading-${theme}`);
    });

    test(`Skeletons section - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      const skeletonsHeading = page.getByRole('heading', { name: 'Skeletons' });
      await expect(skeletonsHeading).toMatchScreenshot(`showcase-skeletons-heading-${theme}`);
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
      await expect(modal).toMatchScreenshot(`showcase-modal-open-${theme}`);
    });

    test(`Dropdown opened - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Click the Dropdown trigger - it's the first button with Dropdown text
      const dropdownBtn = page.getByRole('button', { name: 'Dropdown' }).first();
      await dropdownBtn.click();
      await waitForStability(300);

      // Screenshot should include dropdown menu
      const menu = page.getByRole('menu');
      await expect(menu).toMatchScreenshot(`showcase-dropdown-open-${theme}`);
    });

    test(`Tab switching - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Click on "Analytics" tab
      const analyticsTab = page.getByRole('tab', { name: 'Analytics' });
      await analyticsTab.click();
      await waitForStability(200);

      // Screenshot tabs with Analytics selected
      const tablist = page.getByRole('tablist');
      await expect(tablist).toMatchScreenshot(`showcase-tabs-analytics-${theme}`);
    });

    test(`Toggle interaction - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find all toggles (role="switch")
      const toggles = page.getByRole('switch');
      const firstToggle = toggles.nth(0);

      // Take screenshot before click
      await expect(firstToggle).toMatchScreenshot(`showcase-toggle-off-${theme}`);

      // Click to toggle
      await firstToggle.click();
      await waitForStability(200);

      // Take screenshot after click (now on)
      await expect(firstToggle).toMatchScreenshot(`showcase-toggle-on-${theme}`);
    });

    test(`Checkbox interaction - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find the checkbox label "Accept terms" - clicking it will toggle checkbox
      const checkboxLabel = page.getByText('Accept terms');

      // Take screenshot in checked state (checkbox + label)
      await expect(checkboxLabel).toMatchScreenshot(`showcase-checkbox-checked-${theme}`);

      // Click the label to toggle the checkbox
      await checkboxLabel.click();
      await waitForStability(200);

      // Take screenshot in unchecked state
      await expect(checkboxLabel).toMatchScreenshot(`showcase-checkbox-unchecked-${theme}`);
    });

    test(`Slider interaction - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find slider by label text "Slider"
      const sliderLabel = page.getByText('Slider', { exact: true });

      // Take screenshot at default value (50) - screenshot the slider section
      await expect(sliderLabel).toMatchScreenshot(`showcase-slider-label-${theme}`);
    });

    test(`Input focus state - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find email input using textbox role
      const inputs = page.getByRole('textbox');
      const emailInput = inputs.nth(0);

      // Click to focus the input
      await emailInput.click();
      await waitForStability(200);

      // Screenshot focused state
      await expect(emailInput).toMatchScreenshot(`showcase-input-focused-${theme}`);
    });

    test(`Tooltip on hover - ${theme}`, async () => {
      renderShowcase(theme);
      await waitForStability();

      // Find tooltip trigger button
      const tooltipTrigger = page.getByRole('button', { name: 'Hover (top)' });

      // Hover over it
      await tooltipTrigger.hover();
      await waitForStability(300);

      // Screenshot with tooltip visible
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip).toMatchScreenshot(`showcase-tooltip-visible-${theme}`);
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
      await expect(root).toMatchScreenshot('showcase-theme-cycle-1-glass');

      // Click theme switcher (should show "Light" as next theme)
      const themeSwitcher = page.getByRole('button', { name: /Light/ });
      await themeSwitcher.click();
      await waitForStability(500);

      // Screenshot after switching to Light
      await expect(root).toMatchScreenshot('showcase-theme-cycle-2-light');

      // Click again (should show "Aurora" as next theme)
      const auroraButton = page.getByRole('button', { name: /Aurora/ });
      await auroraButton.click();
      await waitForStability(500);

      // Screenshot after switching to Aurora
      await expect(root).toMatchScreenshot('showcase-theme-cycle-3-aurora');

      // Click again (should show "Glass" as next theme)
      const glassButton = page.getByRole('button', { name: /Glass/ });
      await glassButton.click();
      await waitForStability(500);

      // Screenshot after switching back to Glass
      await expect(root).toMatchScreenshot('showcase-theme-cycle-4-glass');
    });
  });
});
