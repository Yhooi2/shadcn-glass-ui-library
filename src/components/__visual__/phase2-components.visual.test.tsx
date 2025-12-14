/**
 * Visual Regression Tests for Phase 2 Glass Components
 * Tests: Atomic (5), Composite (8), Blocks (5) = 18 components
 *
 * Run: npm run test:visual
 * Update baselines: npm run test:visual:update
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';
import type { ReactNode } from 'react';
import { Github, Search, AlertTriangle, Flag, FolderGit2, Users } from 'lucide-react';

// Atomic components
import { IconButtonGlass } from '../glass/atomic/icon-button-glass';
import { StatItemGlass } from '../glass/atomic/stat-item-glass';
import { SearchBoxGlass } from '../glass/atomic/search-box-glass';
import { ThemeToggleGlass } from '../glass/atomic/theme-toggle-glass';
import { ExpandableHeaderGlass } from '../glass/atomic/expandable-header-glass';

// Composite components
import { UserInfoGlass } from '../glass/composite/user-info-glass';
import { UserStatsLineGlass } from '../glass/composite/user-stats-line-glass';
import { TrustScoreDisplayGlass } from '../glass/composite/trust-score-display-glass';
import { MetricsGridGlass } from '../glass/composite/metrics-grid-glass';
import { CareerStatsHeaderGlass } from '../glass/composite/career-stats-header-glass';
import { RepositoryHeaderGlass } from '../glass/composite/repository-header-glass';
import { RepositoryMetadataGlass } from '../glass/composite/repository-metadata-glass';
import { ContributionMetricsGlass } from '../glass/composite/contribution-metrics-glass';

// Blocks
import { FormElementsBlock } from '../blocks/form-elements';
import { ProgressBlock } from '../blocks/progress';
import { AvatarGalleryBlock } from '../blocks/avatar-gallery';
import { BadgesBlock } from '../blocks/badges';
import { NotificationsBlock } from '../blocks/notifications';

// Theme context
import { ThemeProvider } from '@/lib/theme-context';
import type { Theme } from '@/lib/theme-context';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];

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
  await new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Phase 2 Components Visual Regression Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // ========================================
  // ATOMIC COMPONENTS
  // ========================================

  describe.each(THEMES)('Atomic Components - Theme: %s', (theme) => {
    // IconButtonGlass tests
    test(`IconButtonGlass sizes - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="icon-button-sizes" className="flex items-center gap-4 p-4">
          <IconButtonGlass icon={Github} size="sm" variant="gradient" aria-label="Small" />
          <IconButtonGlass icon={Github} size="default" variant="gradient" aria-label="Medium" />
          <IconButtonGlass icon={Github} size="lg" variant="gradient" aria-label="Large" />
          <IconButtonGlass icon={Github} size="touch" variant="gradient" aria-label="Touch" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('icon-button-sizes');
      await expect(container).toMatchScreenshot(`icon-button-sizes-${theme}`);
    });

    test(`IconButtonGlass variants - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="icon-button-variants" className="flex items-center gap-4 p-4">
          <IconButtonGlass icon={Github} variant="gradient" aria-label="Gradient" />
          <IconButtonGlass icon={Search} variant="subtle" aria-label="Subtle" />
          <IconButtonGlass icon={AlertTriangle} variant="ghost" aria-label="Ghost" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('icon-button-variants');
      await expect(container).toMatchScreenshot(`icon-button-variants-${theme}`);
    });

    // StatItemGlass tests
    test(`StatItemGlass sizes - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="stat-item-sizes" className="flex flex-col gap-4 p-4">
          <StatItemGlass icon={FolderGit2} value={42} label="repos" size="sm" />
          <StatItemGlass icon={FolderGit2} value={42} label="repos" size="default" />
          <StatItemGlass icon={FolderGit2} value={42} label="repos" size="lg" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('stat-item-sizes');
      await expect(container).toMatchScreenshot(`stat-item-sizes-${theme}`);
    });

    test(`StatItemGlass layouts - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="stat-item-layouts" className="flex flex-col gap-4 p-4">
          <StatItemGlass icon={Users} value={1234} label="followers" layout="horizontal" />
          <StatItemGlass icon={Users} value={1234} label="followers" layout="vertical" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('stat-item-layouts');
      await expect(container).toMatchScreenshot(`stat-item-layouts-${theme}`);
    });

    test(`StatItemGlass abbreviated - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="stat-item-abbreviated" className="flex flex-col gap-4 p-4">
          <StatItemGlass icon={Users} value={1234567} label="followers" abbreviated={false} />
          <StatItemGlass icon={Users} value={1234567} label="followers" abbreviated={true} />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('stat-item-abbreviated');
      await expect(container).toMatchScreenshot(`stat-item-abbreviated-${theme}`);
    });

    // SearchBoxGlass tests
    test(`SearchBoxGlass default - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="search-box-default" className="p-4">
          <SearchBoxGlass placeholder="Search username..." />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('search-box-default');
      await expect(container).toMatchScreenshot(`search-box-default-${theme}`);
    });

    test(`SearchBoxGlass compact - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="search-box-compact" className="p-4">
          <SearchBoxGlass variant="compact" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('search-box-compact');
      await expect(container).toMatchScreenshot(`search-box-compact-${theme}`);
    });

    test(`SearchBoxGlass all variants - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="search-box-variants" className="flex flex-col gap-4 p-4">
          <SearchBoxGlass variant="default" placeholder="Default variant" />
          <SearchBoxGlass variant="compact" placeholder="Compact" />
          <SearchBoxGlass variant="default" value="with value" onChange={() => {}} />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('search-box-variants');
      await expect(container).toMatchScreenshot(`search-box-variants-${theme}`);
    });

    // ThemeToggleGlass tests
    test(`ThemeToggleGlass icon only - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="theme-toggle-icon" className="p-4">
          <ThemeToggleGlass iconOnly onToggle={() => {}} />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('theme-toggle-icon');
      await expect(container).toMatchScreenshot(`theme-toggle-icon-only-${theme}`);
    });

    test(`ThemeToggleGlass with label - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="theme-toggle-label" className="p-4">
          <ThemeToggleGlass iconOnly={false} onToggle={() => {}} />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('theme-toggle-label');
      await expect(container).toMatchScreenshot(`theme-toggle-with-label-${theme}`);
    });

    // ExpandableHeaderGlass tests
    test(`ExpandableHeaderGlass collapsed - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="expandable-collapsed" className="p-4" style={{ width: '300px' }}>
          <ExpandableHeaderGlass
            title="Collapsed Header"
            expanded={false}
            icon={Flag}
            iconColor="var(--status-warning)"
          />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('expandable-collapsed');
      await expect(container).toMatchScreenshot(`expandable-header-collapsed-${theme}`);
    });

    test(`ExpandableHeaderGlass expanded - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="expandable-expanded" className="p-4" style={{ width: '300px' }}>
          <ExpandableHeaderGlass
            title="Expanded Header"
            expanded={true}
            icon={Flag}
            iconColor="var(--status-warning)"
          />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('expandable-expanded');
      await expect(container).toMatchScreenshot(`expandable-header-expanded-${theme}`);
    });

    test(`ExpandableHeaderGlass states - ${theme}`, async () => {
      renderWithTheme(
        <div
          data-testid="expandable-states"
          className="flex flex-col gap-2 p-4"
          style={{ width: '300px' }}
        >
          <ExpandableHeaderGlass title="With Icon Collapsed" expanded={false} icon={Flag} />
          <ExpandableHeaderGlass title="With Icon Expanded" expanded={true} icon={Flag} />
          <ExpandableHeaderGlass title="Without Icon" expanded={false} />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('expandable-states');
      await expect(container).toMatchScreenshot(`expandable-header-states-${theme}`);
    });
  });

  // ========================================
  // COMPOSITE COMPONENTS
  // ========================================

  describe.each(THEMES)('Composite Components - Theme: %s', (theme) => {
    // UserInfoGlass tests
    test(`UserInfoGlass vertical - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="user-info-vertical" className="p-4">
          <UserInfoGlass name="John Doe" username="johndoe" joinDate="Jan 2020" layout="vertical" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('user-info-vertical');
      await expect(container).toMatchScreenshot(`user-info-vertical-${theme}`);
    });

    test(`UserInfoGlass horizontal - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="user-info-horizontal" className="p-4">
          <UserInfoGlass
            name="John Doe"
            username="johndoe"
            joinDate="Jan 2020"
            layout="horizontal"
          />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('user-info-horizontal');
      await expect(container).toMatchScreenshot(`user-info-horizontal-${theme}`);
    });

    // UserStatsLineGlass tests
    test(`UserStatsLineGlass default - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="user-stats-default" className="p-4">
          <UserStatsLineGlass repos={42} followers={1500} following={200} />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('user-stats-default');
      await expect(container).toMatchScreenshot(`user-stats-line-default-${theme}`);
    });

    test(`UserStatsLineGlass abbreviated - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="user-stats-abbreviated" className="p-4">
          <UserStatsLineGlass repos={42} followers={150000} following={20000} abbreviated />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('user-stats-abbreviated');
      await expect(container).toMatchScreenshot(`user-stats-line-abbreviated-${theme}`);
    });

    test(`UserStatsLineGlass wrapped - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="user-stats-wrapped" className="p-4" style={{ width: '200px' }}>
          <UserStatsLineGlass repos={42} followers={1500} following={200} wrap />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('user-stats-wrapped');
      await expect(container).toMatchScreenshot(`user-stats-line-wrapped-${theme}`);
    });

    // TrustScoreDisplayGlass tests
    test(`TrustScoreDisplayGlass sizes - ${theme}`, async () => {
      renderWithTheme(
        <div
          data-testid="trust-score-sizes"
          className="flex flex-col gap-4 p-4"
          style={{ width: '400px' }}
        >
          <TrustScoreDisplayGlass score={85} size="sm" />
          <TrustScoreDisplayGlass score={85} size="default" />
          <TrustScoreDisplayGlass score={85} size="lg" />
        </div>,
        theme
      );
      await waitForStability(200); // Extra time for pulse animation
      const container = page.getByTestId('trust-score-sizes');
      await expect(container).toMatchScreenshot(`trust-score-sizes-${theme}`);
    });

    test(`TrustScoreDisplayGlass values - ${theme}`, async () => {
      renderWithTheme(
        <div
          data-testid="trust-score-values"
          className="flex flex-col gap-4 p-4"
          style={{ width: '400px' }}
        >
          <TrustScoreDisplayGlass score={0} title="Low Score" />
          <TrustScoreDisplayGlass score={50} title="Medium Score" />
          <TrustScoreDisplayGlass score={100} title="High Score" />
        </div>,
        theme
      );
      await waitForStability(200);
      const container = page.getByTestId('trust-score-values');
      await expect(container).toMatchScreenshot(`trust-score-values-${theme}`);
    });

    // MetricsGridGlass tests
    test(`MetricsGridGlass 4 columns - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="metrics-grid-4col" className="p-4" style={{ width: '600px' }}>
          <MetricsGridGlass
            columns={4}
            metrics={[
              { label: 'Commits', value: 85, color: 'red' },
              { label: 'PRs', value: 72, color: 'blue' },
              { label: 'Issues', value: 90, color: 'emerald' },
              { label: 'Reviews', value: 68, color: 'amber' },
            ]}
          />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('metrics-grid-4col');
      await expect(container).toMatchScreenshot(`metrics-grid-4col-${theme}`);
    });

    test(`MetricsGridGlass 2 columns - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="metrics-grid-2col" className="p-4" style={{ width: '400px' }}>
          <MetricsGridGlass
            columns={2}
            metrics={[
              { label: 'Commits', value: 85, color: 'red' },
              { label: 'PRs', value: 72, color: 'blue' },
            ]}
          />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('metrics-grid-2col');
      await expect(container).toMatchScreenshot(`metrics-grid-2col-${theme}`);
    });

    // CareerStatsHeaderGlass tests
    test(`CareerStatsHeaderGlass default - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="career-stats-header" className="p-4" style={{ width: '500px' }}>
          <CareerStatsHeaderGlass totalCommits={15420} totalPRs={342} totalRepos={87} />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('career-stats-header');
      await expect(container).toMatchScreenshot(`career-stats-header-default-${theme}`);
    });

    test(`CareerStatsHeaderGlass wrapped - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="career-stats-wrapped" className="p-4" style={{ width: '250px' }}>
          <CareerStatsHeaderGlass totalCommits={15420} totalPRs={342} totalRepos={87} wrapStats />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('career-stats-wrapped');
      await expect(container).toMatchScreenshot(`career-stats-header-wrapped-${theme}`);
    });

    // RepositoryHeaderGlass tests
    test(`RepositoryHeaderGlass states - ${theme}`, async () => {
      renderWithTheme(
        <div
          data-testid="repo-header-states"
          className="flex flex-col gap-2 p-4"
          style={{ width: '350px' }}
        >
          <RepositoryHeaderGlass
            name="awesome-project"
            flagType="green"
            stars={1234}
            expanded={false}
          />
          <RepositoryHeaderGlass
            name="needs-review"
            flagType="yellow"
            stars={567}
            expanded={false}
          />
          <RepositoryHeaderGlass name="critical-issues" flagType="red" stars={89} expanded={true} />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('repo-header-states');
      await expect(container).toMatchScreenshot(`repo-header-states-${theme}`);
    });

    // RepositoryMetadataGlass tests
    test(`RepositoryMetadataGlass default - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="repo-metadata-default" className="p-4" style={{ width: '400px' }}>
          <RepositoryMetadataGlass
            languages="TypeScript, JavaScript, CSS"
            commits={342}
            contribution={28}
          />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('repo-metadata-default');
      await expect(container).toMatchScreenshot(`repo-metadata-default-${theme}`);
    });

    test(`RepositoryMetadataGlass stacked - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="repo-metadata-stacked" className="p-4" style={{ width: '200px' }}>
          <RepositoryMetadataGlass
            languages="TypeScript, JavaScript"
            commits={342}
            contribution={28}
            stacked
          />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('repo-metadata-stacked');
      await expect(container).toMatchScreenshot(`repo-metadata-stacked-${theme}`);
    });

    // ContributionMetricsGlass tests
    test(`ContributionMetricsGlass 2 columns - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="contribution-2col" className="p-4" style={{ width: '400px' }}>
          <ContributionMetricsGlass userCommits={156} userContribution={28} columns={2} />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('contribution-2col');
      await expect(container).toMatchScreenshot(`contribution-metrics-2col-${theme}`);
    });

    test(`ContributionMetricsGlass 1 column - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="contribution-1col" className="p-4" style={{ width: '200px' }}>
          <ContributionMetricsGlass userCommits={156} userContribution={28} columns={1} />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('contribution-1col');
      await expect(container).toMatchScreenshot(`contribution-metrics-1col-${theme}`);
    });
  });

  // ========================================
  // BLOCKS
  // ========================================

  describe.each(THEMES)('Blocks - Theme: %s', (theme) => {
    // FormElementsBlock tests
    test(`FormElementsBlock default - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="form-block-default" style={{ width: '400px' }}>
          <FormElementsBlock showTitle />
        </div>,
        theme
      );
      await waitForStability(200);
      const container = page.getByTestId('form-block-default');
      await expect(container).toMatchScreenshot(`form-elements-block-default-${theme}`);
    });

    test(`FormElementsBlock no title - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="form-block-no-title" style={{ width: '400px' }}>
          <FormElementsBlock showTitle={false} />
        </div>,
        theme
      );
      await waitForStability(200);
      const container = page.getByTestId('form-block-no-title');
      await expect(container).toMatchScreenshot(`form-elements-block-no-title-${theme}`);
    });

    // ProgressBlock tests
    test(`ProgressBlock default - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="progress-block-default" style={{ width: '400px' }}>
          <ProgressBlock showTitle />
        </div>,
        theme
      );
      await waitForStability(200);
      const container = page.getByTestId('progress-block-default');
      await expect(container).toMatchScreenshot(`progress-block-default-${theme}`);
    });

    test(`ProgressBlock no title - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="progress-block-no-title" style={{ width: '400px' }}>
          <ProgressBlock showTitle={false} />
        </div>,
        theme
      );
      await waitForStability(200);
      const container = page.getByTestId('progress-block-no-title');
      await expect(container).toMatchScreenshot(`progress-block-no-title-${theme}`);
    });

    // AvatarGalleryBlock tests
    test(`AvatarGalleryBlock default - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="avatar-block-default" style={{ width: '400px' }}>
          <AvatarGalleryBlock showTitle />
        </div>,
        theme
      );
      await waitForStability(200);
      const container = page.getByTestId('avatar-block-default');
      await expect(container).toMatchScreenshot(`avatar-gallery-block-default-${theme}`);
    });

    test(`AvatarGalleryBlock no title - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="avatar-block-no-title" style={{ width: '400px' }}>
          <AvatarGalleryBlock showTitle={false} />
        </div>,
        theme
      );
      await waitForStability(200);
      const container = page.getByTestId('avatar-block-no-title');
      await expect(container).toMatchScreenshot(`avatar-gallery-block-no-title-${theme}`);
    });

    // BadgesBlock tests
    test(`BadgesBlock default - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="badges-block-default" style={{ width: '400px' }}>
          <BadgesBlock showTitle />
        </div>,
        theme
      );
      await waitForStability(200);
      const container = page.getByTestId('badges-block-default');
      await expect(container).toMatchScreenshot(`badges-block-default-${theme}`);
    });

    test(`BadgesBlock no title - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="badges-block-no-title" style={{ width: '400px' }}>
          <BadgesBlock showTitle={false} />
        </div>,
        theme
      );
      await waitForStability(200);
      const container = page.getByTestId('badges-block-no-title');
      await expect(container).toMatchScreenshot(`badges-block-no-title-${theme}`);
    });

    // NotificationsBlock tests
    test(`NotificationsBlock default - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="notifications-block-default" style={{ width: '400px' }}>
          <NotificationsBlock showTitle />
        </div>,
        theme
      );
      await waitForStability(200);
      const container = page.getByTestId('notifications-block-default');
      await expect(container).toMatchScreenshot(`notifications-block-default-${theme}`);
    });

    test(`NotificationsBlock no title - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="notifications-block-no-title" style={{ width: '400px' }}>
          <NotificationsBlock showTitle={false} />
        </div>,
        theme
      );
      await waitForStability(200);
      const container = page.getByTestId('notifications-block-no-title');
      await expect(container).toMatchScreenshot(`notifications-block-no-title-${theme}`);
    });
  });
});
