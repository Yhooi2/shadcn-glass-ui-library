/**
 * Visual Regression Tests for ProjectsListGlass and SortDropdownGlass
 * Phase 2.9 Enhancement
 *
 * Run: npm run test:visual
 * Update baselines: npm run test:visual:update
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from '@vitest/browser/context';
import { useState } from 'react';

// Components
import { SortDropdownGlass, type SortField, type SortOrder } from '../glass/atomic/sort-dropdown-glass';
import {
  ProjectsListGlass,
  type Repository,
  type OwnershipFilter,
} from '../glass/sections/projects-list-glass';

// Theme context
import { ThemeProvider } from '@/lib/theme-context';
import type { Theme } from '@/lib/theme-context';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];

// Demo repositories
const demoRepos: Repository[] = [
  {
    name: 'Wildhaven-website',
    flagType: 'green',
    stars: 1,
    commits: 240,
    contribution: 75,
    languages: 'JS 88% · Shell 11%',
    issues: [],
    ownership: 'your',
  },
  {
    name: 'study',
    flagType: 'yellow',
    stars: 2,
    commits: 177,
    contribution: 100,
    languages: 'Python 92% · C 5%',
    issues: ['Uneven activity pattern'],
    ownership: 'your',
  },
  {
    name: 'bot-scripts',
    flagType: 'red',
    stars: 0,
    commits: 89,
    contribution: 100,
    languages: 'Python 100%',
    issues: ['Empty commits', 'Burst activity'],
    ownership: 'your',
  },
  {
    name: 'portfolio',
    flagType: 'green',
    stars: 5,
    commits: 134,
    contribution: 100,
    languages: 'TypeScript 78% · CSS 22%',
    issues: [],
    ownership: 'contrib',
  },
];

// Helper to render component with theme
function renderWithTheme(component: React.ReactNode, theme: Theme) {
  return render(
    <ThemeProvider defaultTheme={theme}>
      <div
        data-testid="visual-test-container"
        data-theme={theme}
        style={{
          background: 'var(--bg-gradient)',
          padding: '24px',
          minHeight: '400px',
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

describe('ProjectsListGlass Visual Regression Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // ========================================
  // SORT DROPDOWN GLASS
  // ========================================

  describe.each(THEMES)('SortDropdownGlass - Theme: %s', (theme) => {
    test(`SortDropdownGlass default - ${theme}`, async () => {
      renderWithTheme(
        <SortDropdownGlass
          data-testid="sort-dropdown"
          sortBy="commits"
          sortOrder="desc"
          onSortChange={() => {}}
        />,
        theme
      );
      await waitForStability();
      const element = page.getByTestId('sort-dropdown');
      await expect(element).toMatchScreenshot(`sort-dropdown-default-${theme}`);
    });

    test(`SortDropdownGlass ascending - ${theme}`, async () => {
      renderWithTheme(
        <SortDropdownGlass
          data-testid="sort-dropdown-asc"
          sortBy="stars"
          sortOrder="asc"
          onSortChange={() => {}}
        />,
        theme
      );
      await waitForStability();
      const element = page.getByTestId('sort-dropdown-asc');
      await expect(element).toMatchScreenshot(`sort-dropdown-ascending-${theme}`);
    });

    test(`SortDropdownGlass compact - ${theme}`, async () => {
      renderWithTheme(
        <SortDropdownGlass
          data-testid="sort-dropdown-compact"
          sortBy="commits"
          sortOrder="desc"
          onSortChange={() => {}}
          compact
        />,
        theme
      );
      await waitForStability();
      const element = page.getByTestId('sort-dropdown-compact');
      await expect(element).toMatchScreenshot(`sort-dropdown-compact-${theme}`);
    });
  });

  // ========================================
  // PROJECTS LIST GLASS
  // ========================================

  describe.each(THEMES)('ProjectsListGlass - Theme: %s', (theme) => {
    test(`ProjectsListGlass default - ${theme}`, async () => {
      renderWithTheme(
        <div style={{ maxWidth: '600px' }}>
          <ProjectsListGlass data-testid="projects-list" repositories={demoRepos} />
        </div>,
        theme
      );
      await waitForStability();
      const element = page.getByTestId('projects-list');
      await expect(element).toMatchScreenshot(`projects-list-default-${theme}`);
    });

    test(`ProjectsListGlass with controls - ${theme}`, async () => {
      // Wrapper to provide controlled state
      function ControlledProjectsList() {
        const [ownership, setOwnership] = useState<OwnershipFilter>('your');
        const [sortBy, setSortBy] = useState<SortField>('commits');
        const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

        return (
          <ProjectsListGlass
            data-testid="projects-list-controls"
            repositories={demoRepos}
            ownershipFilter={ownership}
            onOwnershipChange={setOwnership}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={(f, o) => {
              setSortBy(f);
              setSortOrder(o);
            }}
          />
        );
      }

      renderWithTheme(
        <div style={{ maxWidth: '600px' }}>
          <ControlledProjectsList />
        </div>,
        theme
      );
      await waitForStability();
      const element = page.getByTestId('projects-list-controls');
      await expect(element).toMatchScreenshot(`projects-list-controls-${theme}`);
    });

    test(`ProjectsListGlass filtered your - ${theme}`, async () => {
      renderWithTheme(
        <div style={{ maxWidth: '600px' }}>
          <ProjectsListGlass
            data-testid="projects-list-your"
            repositories={demoRepos}
            ownershipFilter="your"
            onOwnershipChange={() => {}}
          />
        </div>,
        theme
      );
      await waitForStability();
      const element = page.getByTestId('projects-list-your');
      await expect(element).toMatchScreenshot(`projects-list-filter-your-${theme}`);
    });

    test(`ProjectsListGlass filtered contrib - ${theme}`, async () => {
      renderWithTheme(
        <div style={{ maxWidth: '600px' }}>
          <ProjectsListGlass
            data-testid="projects-list-contrib"
            repositories={demoRepos}
            ownershipFilter="contrib"
            onOwnershipChange={() => {}}
          />
        </div>,
        theme
      );
      await waitForStability();
      const element = page.getByTestId('projects-list-contrib');
      await expect(element).toMatchScreenshot(`projects-list-filter-contrib-${theme}`);
    });

    test(`ProjectsListGlass sorted by stars - ${theme}`, async () => {
      renderWithTheme(
        <div style={{ maxWidth: '600px' }}>
          <ProjectsListGlass
            data-testid="projects-list-stars"
            repositories={demoRepos}
            sortBy="stars"
            sortOrder="desc"
            onSortChange={() => {}}
          />
        </div>,
        theme
      );
      await waitForStability();
      const element = page.getByTestId('projects-list-stars');
      await expect(element).toMatchScreenshot(`projects-list-sort-stars-${theme}`);
    });

    test(`ProjectsListGlass flagged only - ${theme}`, async () => {
      renderWithTheme(
        <div style={{ maxWidth: '600px' }}>
          <ProjectsListGlass
            data-testid="projects-list-flagged"
            repositories={demoRepos}
            showFlaggedOnly
          />
        </div>,
        theme
      );
      await waitForStability();
      const element = page.getByTestId('projects-list-flagged');
      await expect(element).toMatchScreenshot(`projects-list-flagged-${theme}`);
    });

    test(`ProjectsListGlass empty state - ${theme}`, async () => {
      renderWithTheme(
        <div style={{ maxWidth: '600px' }}>
          <ProjectsListGlass
            data-testid="projects-list-empty"
            repositories={[]}
            onClearFilters={() => {}}
          />
        </div>,
        theme
      );
      await waitForStability();
      const element = page.getByTestId('projects-list-empty');
      await expect(element).toMatchScreenshot(`projects-list-empty-${theme}`);
    });

    test(`ProjectsListGlass custom title - ${theme}`, async () => {
      renderWithTheme(
        <div style={{ maxWidth: '600px' }}>
          <ProjectsListGlass
            data-testid="projects-list-title"
            repositories={demoRepos.slice(0, 2)}
            title="My Repositories"
          />
        </div>,
        theme
      );
      await waitForStability();
      const element = page.getByTestId('projects-list-title');
      await expect(element).toMatchScreenshot(`projects-list-custom-title-${theme}`);
    });
  });
});
