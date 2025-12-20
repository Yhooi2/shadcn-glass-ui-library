/**
 * Visual Regression Tests for SheetGlass
 * Tests component across all 3 themes (glass, light, aurora) and 4 sides
 *
 * Run: npx vitest --project=visual sheet
 * Update baselines: gh workflow run update-screenshots.yml
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';
import { SheetGlass } from '@/components/glass/ui/sheet-glass';
import { ButtonGlass } from '@/components/glass/ui/button-glass';
import { InputGlass } from '@/components/glass/ui/input-glass';
import { ThemeProvider, type Theme } from '@/lib/theme-context';
import { TooltipGlassProvider } from '@/components/glass/ui/tooltip-glass';
import type { SheetSide } from '@/lib/variants/sheet-glass-variants';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];
const SIDES: SheetSide[] = ['right', 'left', 'top', 'bottom'];

// Helper to render component with theme
function renderWithTheme(component: React.ReactNode, theme: Theme) {
  return render(
    <ThemeProvider defaultTheme={theme}>
      <TooltipGlassProvider>
        <div
          data-testid="visual-test-container"
          data-theme={theme}
          style={{
            width: '1200px',
            height: '800px',
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
      </TooltipGlassProvider>
    </ThemeProvider>
  );
}

// Wait for animations to settle
async function waitForStability(ms = 300) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

describe('SheetGlass Visual Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // ==================== TEST 1: SIDE VARIANTS ====================

  describe.each(THEMES)('Side Variants - Theme: %s', (theme) => {
    test.each(SIDES)(`sheet-side-%s-${theme}`, async (side) => {
      renderWithTheme(
        <SheetGlass.Root open={true}>
          <SheetGlass.Content side={side} data-testid="sheet">
            <SheetGlass.Header>
              <SheetGlass.Title className="capitalize">{side} Sheet</SheetGlass.Title>
              <SheetGlass.Description>Sheet sliding from the {side} edge.</SheetGlass.Description>
            </SheetGlass.Header>
            <div className="py-4" style={{ color: 'var(--text-secondary)' }}>
              <p>This is a {side} sheet with glass styling.</p>
            </div>
            <SheetGlass.Footer>
              <ButtonGlass variant="ghost">Cancel</ButtonGlass>
              <ButtonGlass>Save</ButtonGlass>
            </SheetGlass.Footer>
          </SheetGlass.Content>
        </SheetGlass.Root>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`sheet-side-${side}-${theme}.png`);
    });
  });

  // ==================== TEST 2: WITH FORM CONTENT ====================

  describe.each(THEMES)('With Form Content - Theme: %s', (theme) => {
    test(`sheet-form-${theme}`, async () => {
      renderWithTheme(
        <SheetGlass.Root open={true}>
          <SheetGlass.Content side="right">
            <SheetGlass.Header>
              <SheetGlass.Title>Edit Profile</SheetGlass.Title>
              <SheetGlass.Description>
                Make changes to your profile settings.
              </SheetGlass.Description>
            </SheetGlass.Header>
            <div className="flex-1 py-4 space-y-4">
              <InputGlass label="Name" placeholder="John Doe" defaultValue="Jane Smith" />
              <InputGlass
                label="Email"
                type="email"
                placeholder="john@example.com"
                defaultValue="jane@example.com"
              />
              <InputGlass label="Username" placeholder="@username" defaultValue="@janesmith" />
            </div>
            <SheetGlass.Footer>
              <ButtonGlass variant="ghost">Cancel</ButtonGlass>
              <ButtonGlass>Save changes</ButtonGlass>
            </SheetGlass.Footer>
          </SheetGlass.Content>
        </SheetGlass.Root>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`sheet-form-${theme}.png`);
    });
  });

  // ==================== TEST 3: NAVIGATION MENU ====================

  describe.each(THEMES)('Navigation Menu - Theme: %s', (theme) => {
    test(`sheet-navigation-${theme}`, async () => {
      renderWithTheme(
        <SheetGlass.Root open={true}>
          <SheetGlass.Content side="left">
            <SheetGlass.Header>
              <SheetGlass.Title>Navigation</SheetGlass.Title>
              <SheetGlass.Description>Browse the main menu</SheetGlass.Description>
            </SheetGlass.Header>
            <nav className="flex-1 py-4 space-y-1">
              {['Dashboard', 'Projects', 'Team', 'Settings', 'Help', 'Logout'].map(
                (item, index) => (
                  <a
                    key={item}
                    href="#"
                    className="block p-3 rounded-lg transition-colors"
                    style={{
                      background: index === 0 ? 'var(--semantic-primary-subtle)' : 'transparent',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {item}
                  </a>
                )
              )}
            </nav>
          </SheetGlass.Content>
        </SheetGlass.Root>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`sheet-navigation-${theme}.png`);
    });
  });

  // ==================== TEST 4: ACTION MENU (BOTTOM) ====================

  describe.each(THEMES)('Action Menu - Theme: %s', (theme) => {
    test(`sheet-actions-${theme}`, async () => {
      renderWithTheme(
        <SheetGlass.Root open={true}>
          <SheetGlass.Content side="bottom">
            <SheetGlass.Header>
              <SheetGlass.Title>Actions</SheetGlass.Title>
              <SheetGlass.Description>Choose an action for this item</SheetGlass.Description>
            </SheetGlass.Header>
            <div className="py-4 space-y-2">
              <ButtonGlass className="w-full justify-start" variant="ghost">
                Share
              </ButtonGlass>
              <ButtonGlass className="w-full justify-start" variant="ghost">
                Copy Link
              </ButtonGlass>
              <ButtonGlass className="w-full justify-start" variant="ghost">
                Download
              </ButtonGlass>
              <ButtonGlass className="w-full justify-start" variant="destructive">
                Delete
              </ButtonGlass>
            </div>
          </SheetGlass.Content>
        </SheetGlass.Root>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`sheet-actions-${theme}.png`);
    });
  });

  // ==================== TEST 5: WITHOUT CLOSE BUTTON ====================

  describe.each(THEMES)('Without Close Button - Theme: %s', (theme) => {
    test(`sheet-no-close-btn-${theme}`, async () => {
      renderWithTheme(
        <SheetGlass.Root open={true}>
          <SheetGlass.Content side="right" showCloseButton={false}>
            <SheetGlass.Header>
              <SheetGlass.Title>No Close Button</SheetGlass.Title>
              <SheetGlass.Description>
                Use footer buttons to close this sheet.
              </SheetGlass.Description>
            </SheetGlass.Header>
            <div className="flex-1 py-4" style={{ color: 'var(--text-secondary)' }}>
              <p>This sheet doesn&apos;t have an X button.</p>
              <p className="mt-2">Press Escape or use the footer button to close.</p>
            </div>
            <SheetGlass.Footer>
              <ButtonGlass>Close</ButtonGlass>
            </SheetGlass.Footer>
          </SheetGlass.Content>
        </SheetGlass.Root>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`sheet-no-close-btn-${theme}.png`);
    });
  });

  // ==================== TEST 6: SEARCH (TOP) ====================

  describe.each(THEMES)('Search Sheet - Theme: %s', (theme) => {
    test(`sheet-search-${theme}`, async () => {
      renderWithTheme(
        <SheetGlass.Root open={true}>
          <SheetGlass.Content side="top">
            <SheetGlass.Header>
              <SheetGlass.Title>Search</SheetGlass.Title>
              <SheetGlass.Description>Find anything in your workspace</SheetGlass.Description>
            </SheetGlass.Header>
            <div className="py-4">
              <InputGlass placeholder="Type to search..." className="w-full" />
            </div>
          </SheetGlass.Content>
        </SheetGlass.Root>,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`sheet-search-${theme}.png`);
    });
  });
});
