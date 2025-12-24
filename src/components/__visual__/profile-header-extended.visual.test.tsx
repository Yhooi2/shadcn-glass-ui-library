/**
 * Visual Regression Tests for ProfileHeaderExtendedGlass
 * Tests component across all 3 themes (glass, light, aurora)
 *
 * Run: npx vitest --project=visual profile-header-extended
 * Update baselines: gh workflow run update-screenshots.yml
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';
import { ProfileHeaderExtendedGlass } from '@/components/glass/sections/profile-header-extended-glass';
import { ThemeProvider, type Theme } from '@/lib/theme-context';
import { TooltipGlassProvider } from '@/components/glass/ui/tooltip-glass';
import { ButtonGlass } from '@/components/glass/ui/button-glass';

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
            width: '800px',
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

// Mock user data
const mockUsers = {
  full: {
    name: 'The Octocat',
    login: 'octocat',
    avatar: 'https://avatars.githubusercontent.com/u/583231?v=4',
    url: 'https://github.com/octocat',
    createdAt: '2011-01-25T18:44:36Z',
    bio: 'GitHub mascot and friend to all developers',
    location: 'San Francisco, CA',
    stats: {
      repos: 8,
      followers: 9847,
      following: 9,
      gists: 8,
    },
    languages: [
      { name: 'Ruby', percent: 35, color: '#701516' },
      { name: 'JavaScript', percent: 30, color: '#f7df1e' },
      { name: 'Shell', percent: 20, color: '#89e051' },
      { name: 'HTML', percent: 15, color: '#e34c26' },
    ],
  },
  minimal: {
    name: null,
    login: 'minimaluser',
    avatar: '',
    url: 'https://github.com/minimaluser',
    createdAt: '2022-07-15',
  },
  noBio: {
    name: 'Jane Developer',
    login: 'janedev',
    avatar: 'https://i.pravatar.cc/150?u=janedev',
    url: 'https://github.com/janedev',
    createdAt: '2020-03-15T10:30:00Z',
    bio: null,
    location: 'New York, USA',
    stats: {
      repos: 42,
      followers: 156,
      following: 89,
      gists: 5,
    },
  },
  popular: {
    name: 'Dan Abramov',
    login: 'gaearon',
    avatar: 'https://avatars.githubusercontent.com/u/810438?v=4',
    url: 'https://github.com/gaearon',
    createdAt: '2011-05-25T18:18:31Z',
    bio: 'Working on React. Co-author of Redux and Create React App.',
    location: 'London, UK',
    stats: {
      repos: 262,
      followers: 82300,
      following: 171,
      gists: 92,
    },
    languages: [
      { name: 'JavaScript', percent: 60, color: '#f7df1e' },
      { name: 'TypeScript', percent: 25, color: '#3178c6' },
      { name: 'HTML', percent: 10, color: '#e34c26' },
      { name: 'CSS', percent: 5, color: '#563d7c' },
    ],
  },
};

describe('ProfileHeaderExtendedGlass Visual Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // ==================== TEST 1: FULL PROFILE ====================

  describe.each(THEMES)('Full Profile - Theme: %s', (theme) => {
    test(`profile-extended-full-${theme}`, async () => {
      renderWithTheme(<ProfileHeaderExtendedGlass user={mockUsers.full} />, theme);

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`profile-extended-full-${theme}.png`);
    });
  });

  // ==================== TEST 2: MINIMAL PROFILE ====================

  describe.each(THEMES)('Minimal Profile - Theme: %s', (theme) => {
    test(`profile-extended-minimal-${theme}`, async () => {
      renderWithTheme(
        <ProfileHeaderExtendedGlass user={mockUsers.minimal} showStatus={true} status="online" />,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`profile-extended-minimal-${theme}.png`);
    });
  });

  // ==================== TEST 3: NO BIO PROFILE ====================

  describe.each(THEMES)('No Bio Profile - Theme: %s', (theme) => {
    test(`profile-extended-no-bio-${theme}`, async () => {
      renderWithTheme(<ProfileHeaderExtendedGlass user={mockUsers.noBio} />, theme);

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`profile-extended-no-bio-${theme}.png`);
    });
  });

  // ==================== TEST 4: POPULAR USER ====================

  describe.each(THEMES)('Popular User - Theme: %s', (theme) => {
    test(`profile-extended-popular-${theme}`, async () => {
      renderWithTheme(<ProfileHeaderExtendedGlass user={mockUsers.popular} />, theme);

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`profile-extended-popular-${theme}.png`);
    });
  });

  // ==================== TEST 5: WITH ACTIONS ====================

  describe.each(THEMES)('With Actions - Theme: %s', (theme) => {
    test(`profile-extended-with-actions-${theme}`, async () => {
      renderWithTheme(
        <ProfileHeaderExtendedGlass
          user={mockUsers.full}
          actions={
            <ButtonGlass variant="default" size="sm">
              Follow
            </ButtonGlass>
          }
        />,
        theme
      );

      await waitForStability();
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`profile-extended-with-actions-${theme}.png`);
    });
  });
});
