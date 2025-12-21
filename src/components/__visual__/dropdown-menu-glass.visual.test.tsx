/**
 * Visual Regression Tests for DropdownMenuGlass
 * Tests dropdown menu across all 3 themes (glass, light, aurora)
 *
 * Run: npm run test:visual
 * Update baselines: npm run test:visual:update
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';
import { User, Settings, LogOut, Edit, Copy, Trash, Plus } from 'lucide-react';

// Components
import {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
  DropdownMenuGlassCheckboxItem,
  DropdownMenuGlassRadioItem,
  DropdownMenuGlassLabel,
  DropdownMenuGlassSeparator,
  DropdownMenuGlassShortcut,
  DropdownMenuGlassGroup,
  DropdownMenuGlassRadioGroup,
} from '../glass/ui/dropdown-menu-glass';
import { ButtonGlass } from '../glass/ui/button-glass';

// Theme context
import { ThemeProvider } from '@/lib/theme-context';
import type { Theme } from '@/lib/theme-context';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];

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
async function waitForStability(ms = 200) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

describe('DropdownMenuGlass Visual Tests', () => {
  afterEach(() => {
    cleanup();
  });

  describe.each(THEMES)('Theme: %s', (theme) => {
    test(`Basic menu - closed - ${theme}`, async () => {
      renderWithTheme(
        <DropdownMenuGlass>
          <DropdownMenuGlassTrigger asChild>
            <ButtonGlass data-testid="trigger">Open Menu</ButtonGlass>
          </DropdownMenuGlassTrigger>
          <DropdownMenuGlassContent>
            <DropdownMenuGlassItem>Profile</DropdownMenuGlassItem>
            <DropdownMenuGlassItem>Settings</DropdownMenuGlassItem>
            <DropdownMenuGlassSeparator />
            <DropdownMenuGlassItem variant="destructive">Log out</DropdownMenuGlassItem>
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>,
        theme
      );
      await waitForStability();
      const trigger = page.getByTestId('trigger');
      await expect(trigger).toMatchScreenshot(`dropdown-menu-basic-closed-${theme}`);
    });

    test(`Basic menu - open - ${theme}`, async () => {
      renderWithTheme(
        <DropdownMenuGlass defaultOpen>
          <DropdownMenuGlassTrigger asChild>
            <ButtonGlass data-testid="trigger">Open Menu</ButtonGlass>
          </DropdownMenuGlassTrigger>
          <DropdownMenuGlassContent data-testid="content">
            <DropdownMenuGlassItem>Profile</DropdownMenuGlassItem>
            <DropdownMenuGlassItem>Settings</DropdownMenuGlassItem>
            <DropdownMenuGlassSeparator />
            <DropdownMenuGlassItem variant="destructive">Log out</DropdownMenuGlassItem>
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>,
        theme
      );
      await waitForStability(300);
      const content = page.getByTestId('content');
      await expect(content).toMatchScreenshot(`dropdown-menu-basic-open-${theme}`);
    });

    test(`With icons - ${theme}`, async () => {
      renderWithTheme(
        <DropdownMenuGlass defaultOpen>
          <DropdownMenuGlassTrigger asChild>
            <ButtonGlass variant="outline">Account</ButtonGlass>
          </DropdownMenuGlassTrigger>
          <DropdownMenuGlassContent data-testid="content">
            <DropdownMenuGlassItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuGlassItem>
            <DropdownMenuGlassItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuGlassItem>
            <DropdownMenuGlassSeparator />
            <DropdownMenuGlassItem variant="destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuGlassItem>
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>,
        theme
      );
      await waitForStability(300);
      const content = page.getByTestId('content');
      await expect(content).toMatchScreenshot(`dropdown-menu-with-icons-${theme}`);
    });

    test(`With shortcuts - ${theme}`, async () => {
      renderWithTheme(
        <DropdownMenuGlass defaultOpen>
          <DropdownMenuGlassTrigger asChild>
            <ButtonGlass variant="outline">Actions</ButtonGlass>
          </DropdownMenuGlassTrigger>
          <DropdownMenuGlassContent className="w-56" data-testid="content">
            <DropdownMenuGlassItem>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
              <DropdownMenuGlassShortcut>⌘E</DropdownMenuGlassShortcut>
            </DropdownMenuGlassItem>
            <DropdownMenuGlassItem>
              <Copy className="mr-2 h-4 w-4" />
              <span>Copy</span>
              <DropdownMenuGlassShortcut>⌘C</DropdownMenuGlassShortcut>
            </DropdownMenuGlassItem>
            <DropdownMenuGlassSeparator />
            <DropdownMenuGlassItem variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
              <DropdownMenuGlassShortcut>⌘⌫</DropdownMenuGlassShortcut>
            </DropdownMenuGlassItem>
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>,
        theme
      );
      await waitForStability(300);
      const content = page.getByTestId('content');
      await expect(content).toMatchScreenshot(`dropdown-menu-with-shortcuts-${theme}`);
    });

    test(`With labels and groups - ${theme}`, async () => {
      renderWithTheme(
        <DropdownMenuGlass defaultOpen>
          <DropdownMenuGlassTrigger asChild>
            <ButtonGlass>Options</ButtonGlass>
          </DropdownMenuGlassTrigger>
          <DropdownMenuGlassContent className="w-56" data-testid="content">
            <DropdownMenuGlassLabel>My Account</DropdownMenuGlassLabel>
            <DropdownMenuGlassGroup>
              <DropdownMenuGlassItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuGlassItem>
              <DropdownMenuGlassItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuGlassItem>
            </DropdownMenuGlassGroup>
            <DropdownMenuGlassSeparator />
            <DropdownMenuGlassLabel>Actions</DropdownMenuGlassLabel>
            <DropdownMenuGlassGroup>
              <DropdownMenuGlassItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>New Item</span>
              </DropdownMenuGlassItem>
            </DropdownMenuGlassGroup>
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>,
        theme
      );
      await waitForStability(300);
      const content = page.getByTestId('content');
      await expect(content).toMatchScreenshot(`dropdown-menu-with-labels-${theme}`);
    });

    test(`With checkboxes - ${theme}`, async () => {
      renderWithTheme(
        <DropdownMenuGlass defaultOpen>
          <DropdownMenuGlassTrigger asChild>
            <ButtonGlass variant="outline">View</ButtonGlass>
          </DropdownMenuGlassTrigger>
          <DropdownMenuGlassContent className="w-56" data-testid="content">
            <DropdownMenuGlassLabel>Appearance</DropdownMenuGlassLabel>
            <DropdownMenuGlassSeparator />
            <DropdownMenuGlassCheckboxItem checked={true}>Status Bar</DropdownMenuGlassCheckboxItem>
            <DropdownMenuGlassCheckboxItem checked={false}>
              Activity Bar
            </DropdownMenuGlassCheckboxItem>
            <DropdownMenuGlassCheckboxItem checked={false}>Panel</DropdownMenuGlassCheckboxItem>
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>,
        theme
      );
      await waitForStability(300);
      const content = page.getByTestId('content');
      await expect(content).toMatchScreenshot(`dropdown-menu-with-checkboxes-${theme}`);
    });

    test(`With radio group - ${theme}`, async () => {
      renderWithTheme(
        <DropdownMenuGlass defaultOpen>
          <DropdownMenuGlassTrigger asChild>
            <ButtonGlass variant="outline">Position</ButtonGlass>
          </DropdownMenuGlassTrigger>
          <DropdownMenuGlassContent className="w-56" data-testid="content">
            <DropdownMenuGlassLabel>Panel Position</DropdownMenuGlassLabel>
            <DropdownMenuGlassSeparator />
            <DropdownMenuGlassRadioGroup value="bottom">
              <DropdownMenuGlassRadioItem value="top">Top</DropdownMenuGlassRadioItem>
              <DropdownMenuGlassRadioItem value="bottom">Bottom</DropdownMenuGlassRadioItem>
              <DropdownMenuGlassRadioItem value="right">Right</DropdownMenuGlassRadioItem>
            </DropdownMenuGlassRadioGroup>
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>,
        theme
      );
      await waitForStability(300);
      const content = page.getByTestId('content');
      await expect(content).toMatchScreenshot(`dropdown-menu-with-radio-${theme}`);
    });

    test(`User menu layout - ${theme}`, async () => {
      renderWithTheme(
        <DropdownMenuGlass defaultOpen>
          <DropdownMenuGlassTrigger asChild>
            <ButtonGlass variant="ghost" className="relative h-10 w-10 rounded-full">
              <User className="h-5 w-5" />
            </ButtonGlass>
          </DropdownMenuGlassTrigger>
          <DropdownMenuGlassContent className="w-56" align="end" data-testid="content">
            <DropdownMenuGlassLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-[var(--text-muted)]">john@example.com</p>
              </div>
            </DropdownMenuGlassLabel>
            <DropdownMenuGlassSeparator />
            <DropdownMenuGlassGroup>
              <DropdownMenuGlassItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuGlassShortcut>⇧⌘P</DropdownMenuGlassShortcut>
              </DropdownMenuGlassItem>
              <DropdownMenuGlassItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuGlassShortcut>⌘,</DropdownMenuGlassShortcut>
              </DropdownMenuGlassItem>
            </DropdownMenuGlassGroup>
            <DropdownMenuGlassSeparator />
            <DropdownMenuGlassItem variant="destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuGlassShortcut>⇧⌘Q</DropdownMenuGlassShortcut>
            </DropdownMenuGlassItem>
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>,
        theme
      );
      await waitForStability(300);
      const content = page.getByTestId('content');
      await expect(content).toMatchScreenshot(`dropdown-menu-user-menu-${theme}`);
    });
  });
});
