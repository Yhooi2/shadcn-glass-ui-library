import type { Meta, StoryObj } from '@storybook/react';
import { UserInfoGlass } from './user-info-glass';
import { UserStatsLineGlass } from './user-stats-line-glass';
import { TrustScoreDisplayGlass } from './trust-score-display-glass';
import { MetricsGridGlass, type MetricData } from './metrics-grid-glass';
import { CareerStatsHeaderGlass } from './career-stats-header-glass';
import { RepositoryHeaderGlass } from './repository-header-glass';
import { RepositoryMetadataGlass } from './repository-metadata-glass';
import { ContributionMetricsGlass } from './contribution-metrics-glass';

const meta = {
  title: 'Glass UI/Composite Components',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

const sampleMetrics: MetricData[] = [
  { label: 'Security', value: 85, color: 'red' },
  { label: 'Quality', value: 92, color: 'blue' },
  { label: 'Activity', value: 78, color: 'emerald' },
  { label: 'Community', value: 88, color: 'amber' },
];

// UserInfoGlass Stories
export const UserInfo: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 min-w-[500px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Vertical Layout</h3>
        <UserInfoGlass
          name="Artem Safronov"
          username="Yhooi2"
          joinDate="Jan 2023"
          layout="vertical"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Horizontal Layout</h3>
        <UserInfoGlass
          name="Artem Safronov"
          username="Yhooi2"
          joinDate="Jan 2023"
          layout="horizontal"
        />
      </div>
    </div>
  ),
};

// UserStatsLineGlass Stories
export const UserStatsLine: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 min-w-[500px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Default</h3>
        <UserStatsLineGlass repos={11} followers={1} following={5} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Abbreviated</h3>
        <UserStatsLineGlass repos={1234} followers={5678} following={910} abbreviated />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">No Wrap</h3>
        <UserStatsLineGlass repos={11} followers={1} following={5} wrap={false} />
      </div>
    </div>
  ),
};

// TrustScoreDisplayGlass Stories
export const TrustScoreDisplay: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 min-w-[600px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Default</h3>
        <TrustScoreDisplayGlass score={72} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Small</h3>
        <TrustScoreDisplayGlass score={85} size="sm" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Large</h3>
        <TrustScoreDisplayGlass score={95} size="lg" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Custom Title</h3>
        <TrustScoreDisplayGlass score={88} title="Performance Score" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Without Icon</h3>
        <TrustScoreDisplayGlass score={76} showIcon={false} />
      </div>
    </div>
  ),
};

// MetricsGridGlass Stories
export const MetricsGrid: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 min-w-[700px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">4 Columns</h3>
        <MetricsGridGlass metrics={sampleMetrics} columns={4} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">3 Columns</h3>
        <MetricsGridGlass metrics={sampleMetrics} columns={3} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">2 Columns</h3>
        <MetricsGridGlass metrics={sampleMetrics.slice(0, 2)} columns={2} />
      </div>
    </div>
  ),
};

// CareerStatsHeaderGlass Stories
export const CareerStatsHeader: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 min-w-[600px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Default</h3>
        <CareerStatsHeaderGlass totalCommits={2242} totalPRs={47} totalRepos={11} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Custom Title</h3>
        <CareerStatsHeaderGlass
          totalCommits={5000}
          totalPRs={120}
          totalRepos={25}
          title="Lifetime Statistics"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">No Wrap</h3>
        <CareerStatsHeaderGlass
          totalCommits={2242}
          totalPRs={47}
          totalRepos={11}
          wrapStats={false}
        />
      </div>
    </div>
  ),
};

// RepositoryHeaderGlass Stories
export const RepositoryHeader: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 min-w-[500px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Green Flag</h3>
        <RepositoryHeaderGlass name="my-awesome-project" flagType="green" stars={123} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Yellow Flag</h3>
        <RepositoryHeaderGlass name="legacy-project" flagType="yellow" stars={45} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Red Flag</h3>
        <RepositoryHeaderGlass name="deprecated-project" flagType="red" stars={8} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Expanded</h3>
        <RepositoryHeaderGlass
          name="my-project"
          flagType="green"
          stars={1234}
          expanded={true}
          abbreviatedStars
        />
      </div>
    </div>
  ),
};

// RepositoryMetadataGlass Stories
export const RepositoryMetadata: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 min-w-[400px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Default</h3>
        <RepositoryMetadataGlass
          languages="TypeScript, React, CSS"
          commits={156}
          contribution={85}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Stacked</h3>
        <RepositoryMetadataGlass
          languages="Python, FastAPI"
          commits={42}
          contribution={100}
          stacked
        />
      </div>
    </div>
  ),
};

// ContributionMetricsGlass Stories
export const ContributionMetrics: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 min-w-[600px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">2 Columns</h3>
        <ContributionMetricsGlass userCommits={156} userContribution={85} columns={2} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">1 Column</h3>
        <ContributionMetricsGlass userCommits={42} userContribution={100} columns={1} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Custom Values</h3>
        <ContributionMetricsGlass
          userCommits={500}
          userContribution={25}
          totalProjectCommits={2000}
          estimatedLines={10000}
        />
      </div>
    </div>
  ),
};

// Combined Demo
export const AllCompositeComponents: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-8 p-6 max-w-3xl">
      <h2 className="text-xl font-bold text-white">Composite Glass Components</h2>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white/90">User Profile</h3>
        <UserInfoGlass
          name="Artem Safronov"
          username="Yhooi2"
          joinDate="Jan 2023"
          layout="vertical"
        />
        <UserStatsLineGlass repos={11} followers={1234} following={567} abbreviated />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white/90">Trust Score</h3>
        <TrustScoreDisplayGlass score={85} />
        <MetricsGridGlass metrics={sampleMetrics} columns={4} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white/90">Career Stats</h3>
        <CareerStatsHeaderGlass totalCommits={2242} totalPRs={47} totalRepos={11} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white/90">Repository</h3>
        <RepositoryHeaderGlass
          name="shadcn-glass-ui"
          flagType="green"
          stars={1234}
          abbreviatedStars
        />
        <RepositoryMetadataGlass
          languages="TypeScript, React, Tailwind CSS"
          commits={500}
          contribution={85}
        />
        <ContributionMetricsGlass userCommits={500} userContribution={85} />
      </div>
    </div>
  ),
};
