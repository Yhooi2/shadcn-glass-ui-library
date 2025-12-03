/**
 * Visual Regression Tests for New Glass Components
 * Tests: CircularProgressGlass, ComboBoxGlass, Glass Variants
 *
 * Run: npm run test:visual
 * Update baselines: npm run test:visual:update
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';
import type { ReactNode } from 'react';

// New components
import { CircularProgressGlass } from '../glass/ui/circular-progress-glass';
import { ComboBoxGlass, type ComboBoxOption } from '../glass/ui/combobox-glass';
import { ButtonGlass } from '../glass/ui/button-glass';

// Theme context
import { ThemeProvider } from '@/lib/theme-context';
import type { Theme } from '@/lib/theme-context';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];

// Sample data for ComboBox tests
const frameworks: ComboBoxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
];

// Helper to render component with theme
function renderWithTheme(component: ReactNode, theme: Theme) {
  return render(
    <ThemeProvider defaultTheme={theme}>
      <div data-testid="visual-test-container" data-theme={theme}>
        {component}
      </div>
    </ThemeProvider>
  );
}

// Wait for animations to settle
async function waitForStability(ms = 100) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

describe('New Components Visual Regression Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // ========================================
  // CircularProgressGlass Tests
  // ========================================

  describe.each(THEMES)('CircularProgressGlass - Theme: %s', (theme) => {
    test(`CircularProgressGlass default - ${theme}`, async () => {
      renderWithTheme(
        <CircularProgressGlass value={65} data-testid="circular-progress" />,
        theme
      );
      await waitForStability(200); // Extra time for SVG rendering
      const progress = page.getByTestId('circular-progress');
      await expect(progress).toMatchScreenshot(`circular-progress-default-${theme}`);
    });

    test(`CircularProgressGlass sm size - ${theme}`, async () => {
      renderWithTheme(
        <CircularProgressGlass value={75} size="sm" data-testid="circular-progress-sm" />,
        theme
      );
      await waitForStability(200);
      const progress = page.getByTestId('circular-progress-sm');
      await expect(progress).toMatchScreenshot(`circular-progress-sm-${theme}`);
    });

    test(`CircularProgressGlass lg size - ${theme}`, async () => {
      renderWithTheme(
        <CircularProgressGlass value={75} size="lg" data-testid="circular-progress-lg" />,
        theme
      );
      await waitForStability(200);
      const progress = page.getByTestId('circular-progress-lg');
      await expect(progress).toMatchScreenshot(`circular-progress-lg-${theme}`);
    });

    test(`CircularProgressGlass violet gradient - ${theme}`, async () => {
      renderWithTheme(
        <CircularProgressGlass value={80} color="violet" data-testid="circular-progress-violet" />,
        theme
      );
      await waitForStability(200);
      const progress = page.getByTestId('circular-progress-violet');
      await expect(progress).toMatchScreenshot(`circular-progress-violet-${theme}`);
    });

    test(`CircularProgressGlass blue gradient - ${theme}`, async () => {
      renderWithTheme(
        <CircularProgressGlass value={80} color="blue" data-testid="circular-progress-blue" />,
        theme
      );
      await waitForStability(200);
      const progress = page.getByTestId('circular-progress-blue');
      await expect(progress).toMatchScreenshot(`circular-progress-blue-${theme}`);
    });

    test(`CircularProgressGlass emerald gradient - ${theme}`, async () => {
      renderWithTheme(
        <CircularProgressGlass value={80} color="emerald" data-testid="circular-progress-emerald" />,
        theme
      );
      await waitForStability(200);
      const progress = page.getByTestId('circular-progress-emerald');
      await expect(progress).toMatchScreenshot(`circular-progress-emerald-${theme}`);
    });

    test(`CircularProgressGlass with label - ${theme}`, async () => {
      renderWithTheme(
        <CircularProgressGlass value={90} showLabel data-testid="circular-progress-label" />,
        theme
      );
      await waitForStability(200);
      const progress = page.getByTestId('circular-progress-label');
      await expect(progress).toMatchScreenshot(`circular-progress-label-${theme}`);
    });

    test(`CircularProgressGlass no glow - ${theme}`, async () => {
      renderWithTheme(
        <CircularProgressGlass value={70} showGlow={false} data-testid="circular-progress-no-glow" />,
        theme
      );
      await waitForStability(200);
      const progress = page.getByTestId('circular-progress-no-glow');
      await expect(progress).toMatchScreenshot(`circular-progress-no-glow-${theme}`);
    });

    test(`CircularProgressGlass high glow - ${theme}`, async () => {
      renderWithTheme(
        <CircularProgressGlass
          value={70}
          glowIntensity="high"
          data-testid="circular-progress-high-glow"
        />,
        theme
      );
      await waitForStability(200);
      const progress = page.getByTestId('circular-progress-high-glow');
      await expect(progress).toMatchScreenshot(`circular-progress-high-glow-${theme}`);
    });

    test(`CircularProgressGlass thick stroke - ${theme}`, async () => {
      renderWithTheme(
        <CircularProgressGlass
          value={60}
          thickness={16}
          trackWidth={16}
          data-testid="circular-progress-thick"
        />,
        theme
      );
      await waitForStability(200);
      const progress = page.getByTestId('circular-progress-thick');
      await expect(progress).toMatchScreenshot(`circular-progress-thick-${theme}`);
    });
  });

  // ========================================
  // ComboBoxGlass Tests
  // ========================================

  describe.each(THEMES)('ComboBoxGlass - Theme: %s', (theme) => {
    test(`ComboBoxGlass default closed - ${theme}`, async () => {
      renderWithTheme(
        <div style={{ width: '320px' }}>
          <ComboBoxGlass
            options={frameworks}
            placeholder="Select framework..."
            data-testid="combobox"
          />
        </div>,
        theme
      );
      await waitForStability();
      const combobox = page.getByRole('combobox');
      await expect(combobox).toMatchScreenshot(`combobox-closed-${theme}`);
    });

    test(`ComboBoxGlass with value - ${theme}`, async () => {
      renderWithTheme(
        <div style={{ width: '320px' }}>
          <ComboBoxGlass
            options={frameworks}
            value="react"
            placeholder="Select framework..."
            data-testid="combobox-value"
          />
        </div>,
        theme
      );
      await waitForStability();
      const combobox = page.getByRole('combobox');
      await expect(combobox).toMatchScreenshot(`combobox-value-${theme}`);
    });

    test(`ComboBoxGlass disabled - ${theme}`, async () => {
      renderWithTheme(
        <div style={{ width: '320px' }}>
          <ComboBoxGlass
            options={frameworks}
            value="react"
            placeholder="Select framework..."
            disabled
            data-testid="combobox-disabled"
          />
        </div>,
        theme
      );
      await waitForStability();
      const combobox = page.getByRole('combobox');
      await expect(combobox).toMatchScreenshot(`combobox-disabled-${theme}`);
    });
  });

  // ========================================
  // Glass Variants Tests
  // ========================================

  describe.each(THEMES)('Glass Variants - Theme: %s', (theme) => {
    test(`Glass variant card - ${theme}`, async () => {
      renderWithTheme(
        <div
          className="glass p-6 rounded-xl"
          data-testid="glass-variant"
          style={{ width: '320px', height: '120px' }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Glass Variant
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Standard glassmorphism effect
          </p>
        </div>,
        theme
      );
      await waitForStability();
      const card = page.getByTestId('glass-variant');
      await expect(card).toMatchScreenshot(`glass-variant-${theme}`);
    });

    test(`Frosted variant card - ${theme}`, async () => {
      renderWithTheme(
        <div
          className="frosted p-6 rounded-xl"
          data-testid="frosted-variant"
          style={{ width: '320px', height: '120px' }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Frosted Variant
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Matte finish with maximum blur
          </p>
        </div>,
        theme
      );
      await waitForStability();
      const card = page.getByTestId('frosted-variant');
      await expect(card).toMatchScreenshot(`frosted-variant-${theme}`);
    });

    test(`Fluted variant card - ${theme}`, async () => {
      renderWithTheme(
        <div
          className="fluted p-6 rounded-xl"
          data-testid="fluted-variant"
          style={{ width: '320px', height: '120px' }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Fluted Variant
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Ribbed effect with vertical stripes
          </p>
        </div>,
        theme
      );
      await waitForStability();
      const card = page.getByTestId('fluted-variant');
      await expect(card).toMatchScreenshot(`fluted-variant-${theme}`);
    });

    test(`Crystal variant card - ${theme}`, async () => {
      renderWithTheme(
        <div
          className="crystal p-6 rounded-xl"
          data-testid="crystal-variant"
          style={{ width: '320px', height: '120px' }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Crystal Variant
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Crystal-clear with minimal blur
          </p>
        </div>,
        theme
      );
      await waitForStability();
      const card = page.getByTestId('crystal-variant');
      await expect(card).toMatchScreenshot(`crystal-variant-${theme}`);
    });

    test(`All glass variants comparison - ${theme}`, async () => {
      renderWithTheme(
        <div className="flex flex-col gap-4" data-testid="all-variants" style={{ width: '320px' }}>
          <div className="glass p-4 rounded-lg">
            <span style={{ color: 'var(--text-primary)' }}>Glass</span>
          </div>
          <div className="frosted p-4 rounded-lg">
            <span style={{ color: 'var(--text-primary)' }}>Frosted</span>
          </div>
          <div className="fluted p-4 rounded-lg">
            <span style={{ color: 'var(--text-primary)' }}>Fluted</span>
          </div>
          <div className="crystal p-4 rounded-lg">
            <span style={{ color: 'var(--text-primary)' }}>Crystal</span>
          </div>
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('all-variants');
      await expect(container).toMatchScreenshot(`all-variants-${theme}`);
    });
  });

  // ========================================
  // Integration Tests (Combined)
  // ========================================

  describe.each(THEMES)('Integration Tests - Theme: %s', (theme) => {
    test(`CircularProgressGlass all sizes - ${theme}`, async () => {
      renderWithTheme(
        <div className="flex gap-6 items-center" data-testid="all-sizes">
          <CircularProgressGlass value={65} size="sm" />
          <CircularProgressGlass value={65} size="md" />
          <CircularProgressGlass value={65} size="lg" />
        </div>,
        theme
      );
      await waitForStability(200);
      const container = page.getByTestId('all-sizes');
      await expect(container).toMatchScreenshot(`circular-progress-all-sizes-${theme}`);
    });

    test(`CircularProgressGlass all colors - ${theme}`, async () => {
      renderWithTheme(
        <div className="flex gap-4 items-center flex-wrap" data-testid="all-colors" style={{ maxWidth: '600px' }}>
          <CircularProgressGlass value={75} color="violet" size="sm" />
          <CircularProgressGlass value={75} color="blue" size="sm" />
          <CircularProgressGlass value={75} color="cyan" size="sm" />
          <CircularProgressGlass value={75} color="amber" size="sm" />
          <CircularProgressGlass value={75} color="emerald" size="sm" />
          <CircularProgressGlass value={75} color="rose" size="sm" />
        </div>,
        theme
      );
      await waitForStability(200);
      const container = page.getByTestId('all-colors');
      await expect(container).toMatchScreenshot(`circular-progress-all-colors-${theme}`);
    });

    test(`Glass variants with button - ${theme}`, async () => {
      renderWithTheme(
        <div className="flex flex-col gap-4" data-testid="variants-with-button" style={{ width: '320px' }}>
          <div className="glass p-4 rounded-lg">
            <ButtonGlass variant="primary" className="w-full">Glass Button</ButtonGlass>
          </div>
          <div className="frosted p-4 rounded-lg">
            <ButtonGlass variant="primary" className="w-full">Frosted Button</ButtonGlass>
          </div>
          <div className="crystal p-4 rounded-lg">
            <ButtonGlass variant="primary" className="w-full">Crystal Button</ButtonGlass>
          </div>
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('variants-with-button');
      await expect(container).toMatchScreenshot(`variants-with-button-${theme}`);
    });
  });
});
