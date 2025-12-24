import type { Meta, StoryObj } from '@storybook/react';
import { GitCommit, GitPullRequest, FolderGit, Star, TrendingUp } from 'lucide-react';
import { YearCardGlass } from './year-card-glass';
import { BadgeGlass } from '../ui/badge-glass';

const meta = {
  title: 'Components/Composite/YearCardGlass',
  component: YearCardGlass,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof YearCardGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: 2024,
    emoji: '🚀',
    label: 'Breakthrough',
    commits: '1,234 commits',
    progress: 75,
    gradient: 'blue',
  },
};

export const WithSparkline: Story = {
  args: {
    year: 2024,
    emoji: '📈',
    label: 'Growth',
    commits: '1,567 commits',
    progress: 85,
    gradient: 'emerald',
    isExpanded: true,
    sparklineData: [120, 145, 167, 189, 201, 223, 245, 267, 289, 312, 334, 356],
  },
};

export const Expanded: Story = {
  args: {
    year: 2024,
    emoji: '🎯',
    label: 'Productive',
    commits: '2,345 commits',
    progress: 90,
    gradient: 'violet',
    isExpanded: true,
    prs: 156,
    repos: 12,
    onShowYear: () => console.log('Show year clicked'),
  },
};

export const ExpandedWithSparkline: Story = {
  args: {
    year: 2024,
    emoji: '⚡',
    label: 'Accelerating',
    commits: '1,890 commits',
    progress: 82,
    gradient: 'amber',
    isExpanded: true,
    prs: 234,
    repos: 18,
    sparklineData: [89, 112, 134, 156, 178, 201, 223, 245, 267, 289, 312, 334],
    onShowYear: () => console.log('Show year clicked'),
  },
};

export const WithInsights: Story = {
  args: {
    year: 2024,
    emoji: '🔥',
    label: 'Record Year',
    commits: '3,456 commits',
    progress: 95,
    gradient: 'amber',
    isExpanded: true,
    prs: 412,
    repos: 24,
    insights: [
      {
        variant: 'growth',
        text: 'Activity Growth',
        detail: '+47% from last year',
      },
      {
        variant: 'highlight',
        text: 'Best Month',
        detail: 'April: 456 commits',
      },
      {
        variant: 'stat',
        emoji: '⭐',
        text: 'New Record',
        detail: 'Most PRs in a year',
      },
    ],
    onShowYear: () => console.log('Show year clicked'),
  },
};

export const FullFeatured: Story = {
  args: {
    year: 2023,
    emoji: '🎉',
    label: 'Amazing',
    commits: '2,789 commits',
    progress: 88,
    gradient: 'rose',
    isExpanded: true,
    prs: 345,
    repos: 21,
    sparklineData: [112, 134, 156, 178, 201, 223, 245, 267, 289, 312, 334, 356],
    insights: [
      {
        variant: 'growth',
        emoji: '📈',
        text: 'Steady Growth',
        detail: '+12% each quarter',
      },
      {
        variant: 'tip',
        emoji: '💡',
        text: 'Tip',
        detail: 'Peak activity on Tuesdays',
      },
      {
        variant: 'warning',
        emoji: '⚠️',
        text: 'Notice',
        detail: 'Low activity in December',
      },
    ],
    onShowYear: () => console.log('Show year clicked'),
  },
};

export const LowProgress: Story = {
  args: {
    year: 2022,
    emoji: '🌱',
    label: 'Starting',
    commits: '456 commits',
    progress: 35,
    gradient: 'emerald',
  },
};

export const HighProgressExpanded: Story = {
  args: {
    year: 2024,
    emoji: '🏆',
    label: 'Champion',
    commits: '4,123 commits',
    progress: 98,
    gradient: 'amber',
    isExpanded: true,
    prs: 567,
    repos: 32,
    sparklineData: [234, 267, 301, 334, 367, 401, 434, 467, 501, 534, 567, 601],
    insights: [
      {
        variant: 'highlight',
        emoji: '🎯',
        text: 'Goal Achieved',
        detail: '98% of annual target',
      },
      {
        variant: 'growth',
        emoji: '🚀',
        text: 'Phenomenal Growth',
        detail: '+156% from last year',
      },
    ],
    onShowYear: () => console.log('Show year clicked'),
  },
};

// With Month Labels
export const WithSparklineLabels: Story = {
  args: {
    year: 2024,
    emoji: '📊',
    label: 'Analytics',
    commits: '1,890 commits',
    progress: 78,
    gradient: 'blue',
    isExpanded: true,
    prs: 156,
    repos: 12,
    sparklineData: [89, 112, 134, 156, 178, 201, 223, 245, 267, 289, 312, 334],
    sparklineLabels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    onShowYear: () => console.log('Show year clicked'),
  },
};

// NEW: With Custom Stats
export const WithCustomStats: Story = {
  args: {
    year: 2024,
    emoji: '⭐',
    label: 'Star Year',
    commits: '2,567 commits',
    progress: 85,
    gradient: 'violet',
    isExpanded: true,
    sparklineData: [112, 134, 156, 178, 201, 223, 245, 267, 289, 312, 334, 356],
    stats: [
      { label: 'Commits', value: '2,567', icon: <GitCommit className="w-4 h-4" /> },
      { label: 'PRs Merged', value: 234, icon: <GitPullRequest className="w-4 h-4" /> },
      { label: 'Repos', value: 18, icon: <FolderGit className="w-4 h-4" /> },
      { label: 'Stars', value: '1.2k', icon: <Star className="w-4 h-4" /> },
    ],
    onShowYear: () => console.log('Show year clicked'),
  },
};

// NEW: With Custom Action Label
export const WithCustomActionLabel: Story = {
  args: {
    year: 2023,
    emoji: '🔍',
    label: 'Explore',
    commits: '1,456 commits',
    progress: 72,
    gradient: 'emerald',
    isExpanded: true,
    prs: 189,
    repos: 15,
    actionLabel: 'View detailed analytics',
    onShowYear: () => console.log('View analytics clicked'),
  },
};

// NEW: With Value Formatter
export const WithValueFormatter: Story = {
  args: {
    year: 2024,
    emoji: '💹',
    label: 'Metrics',
    commits: '3456',
    progress: 92,
    gradient: 'emerald',
    valueFormatter: (commits) =>
      `${(parseInt(commits.replace(/,/g, '')) / 1000).toFixed(1)}k commits`,
  },
};

// NEW: With Children Content
export const WithChildrenContent: Story = {
  args: {
    year: 2024,
    emoji: '🎨',
    label: 'Creative',
    commits: '1,789 commits',
    progress: 80,
    gradient: 'rose',
    isExpanded: true,
    prs: 167,
    repos: 14,
    sparklineData: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320],
    children: (
      <div className="flex flex-wrap gap-2 mt-2">
        <BadgeGlass variant="success">TypeScript</BadgeGlass>
        <BadgeGlass variant="info">React</BadgeGlass>
        <BadgeGlass variant="warning">Python</BadgeGlass>
        <BadgeGlass>Go</BadgeGlass>
      </div>
    ),
    onShowYear: () => console.log('Show year clicked'),
  },
};

// Sparkline only shown when expanded (default behavior)
export const SparklineInExpandedOnly: Story = {
  args: {
    year: 2024,
    emoji: '📈',
    label: 'Trending',
    commits: '2,123 commits',
    progress: 83,
    gradient: 'blue',
    isExpanded: true,
    sparklineData: [134, 156, 178, 201, 223, 245, 267, 289, 312, 334, 356, 378],
    sparklineLabels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  },
};

// Full Featured (All Props)
export const CompleteExample: Story = {
  args: {
    year: 2024,
    emoji: '🏅',
    label: 'Best Year',
    commits: '4567',
    progress: 95,
    gradient: 'amber',
    isExpanded: true,
    sparklineData: [250, 280, 310, 340, 370, 400, 430, 460, 490, 520, 550, 580],
    sparklineLabels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    valueFormatter: (commits) => `${(parseInt(commits) / 1000).toFixed(1)}k`,
    stats: [
      { label: 'Commits', value: '4.6k', icon: <GitCommit className="w-4 h-4" /> },
      { label: 'PRs', value: 456, icon: <GitPullRequest className="w-4 h-4" /> },
      { label: 'Repos', value: 28, icon: <FolderGit className="w-4 h-4" /> },
      { label: 'Growth', value: '+47%', icon: <TrendingUp className="w-4 h-4" /> },
    ],
    insights: [
      {
        variant: 'growth',
        emoji: '🚀',
        text: 'Record Breaking',
        detail: 'Most productive year ever',
      },
      {
        variant: 'highlight',
        emoji: '⭐',
        text: 'Top Contributor',
        detail: 'Ranked #1 in your team',
      },
    ],
    actionLabel: 'Explore 2024 in detail',
    children: (
      <div className="flex flex-wrap gap-2 mt-2">
        <BadgeGlass variant="success">Top Languages</BadgeGlass>
        <BadgeGlass>TypeScript 65%</BadgeGlass>
        <BadgeGlass>Python 20%</BadgeGlass>
        <BadgeGlass>Go 15%</BadgeGlass>
      </div>
    ),
    onShowYear: () => console.log('Explore 2024'),
  },
};

// ========================================
// COMPOUND API EXAMPLES
// ========================================

import { useState } from 'react';

// Type for compound API stories (doesn't require legacy props)
type CompoundStory = StoryObj<Meta<typeof YearCardGlass.Root>>;

// Helper components for compound API demos (declared as proper React components)
function CompoundAPIBasicDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <YearCardGlass.Root isExpanded={expanded} onExpandedChange={setExpanded}>
      <YearCardGlass.Header>
        <YearCardGlass.Year>2024</YearCardGlass.Year>
        <YearCardGlass.Badge emoji="🚀" label="Breakthrough" />
        <YearCardGlass.Value>1,234 commits</YearCardGlass.Value>
      </YearCardGlass.Header>
      <YearCardGlass.Progress value={75} gradient="blue" />
    </YearCardGlass.Root>
  );
}

function CompoundAPITimelineDemo() {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const years = [
    {
      year: 2024,
      emoji: '🏆',
      label: 'Champion',
      commits: '4,123',
      progress: 95,
      gradient: 'amber' as const,
    },
    {
      year: 2023,
      emoji: '🚀',
      label: 'Breakthrough',
      commits: '2,567',
      progress: 78,
      gradient: 'violet' as const,
    },
    {
      year: 2022,
      emoji: '🌱',
      label: 'Growing',
      commits: '1,234',
      progress: 55,
      gradient: 'emerald' as const,
    },
  ];

  return (
    <div className="space-y-3 w-80">
      {years.map(({ year, emoji, label, commits, progress, gradient }) => (
        <YearCardGlass.Root
          key={year}
          isExpanded={expandedYear === year}
          onExpandedChange={(expanded) => setExpandedYear(expanded ? year : null)}
          isSelected={expandedYear === year}
        >
          <YearCardGlass.Header>
            <YearCardGlass.Year>{year}</YearCardGlass.Year>
            <YearCardGlass.Badge emoji={emoji} label={label} />
            <YearCardGlass.Value>{commits}</YearCardGlass.Value>
          </YearCardGlass.Header>
          <YearCardGlass.Progress value={progress} gradient={gradient} />
          <YearCardGlass.ExpandedContent>
            <YearCardGlass.Stats>
              <YearCardGlass.StatItem
                label="Commits"
                value={commits}
                icon={<GitCommit className="w-4 h-4" />}
              />
              <YearCardGlass.StatItem
                label="PRs"
                value={Math.floor(progress * 2)}
                icon={<GitPullRequest className="w-4 h-4" />}
              />
            </YearCardGlass.Stats>
          </YearCardGlass.ExpandedContent>
        </YearCardGlass.Root>
      ))}
    </div>
  );
}

function CompoundAPIWithSparklineDemo() {
  const [expanded, setExpanded] = useState(true);
  const monthlyData = [89, 112, 134, 156, 178, 201, 223, 245, 267, 289, 312, 334];
  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <YearCardGlass.Root isExpanded={expanded} onExpandedChange={setExpanded}>
      <YearCardGlass.Header>
        <YearCardGlass.Year>2024</YearCardGlass.Year>
        <YearCardGlass.Badge emoji="📊" label="Analytics" />
        <YearCardGlass.Value>2,345 commits</YearCardGlass.Value>
      </YearCardGlass.Header>

      <YearCardGlass.Progress value={85} gradient="blue" />

      <YearCardGlass.ExpandedContent>
        <YearCardGlass.Sparkline
          data={monthlyData}
          labels={monthLabels}
          showLabels
          height="md"
          className="w-full"
        />

        <YearCardGlass.Stats columns={4}>
          <YearCardGlass.StatItem
            label="Commits"
            value="2,345"
            icon={<GitCommit className="w-4 h-4" />}
          />
          <YearCardGlass.StatItem
            label="PRs"
            value="189"
            icon={<GitPullRequest className="w-4 h-4" />}
          />
          <YearCardGlass.StatItem
            label="Repos"
            value="15"
            icon={<FolderGit className="w-4 h-4" />}
          />
          <YearCardGlass.StatItem label="Stars" value="1.2k" icon={<Star className="w-4 h-4" />} />
        </YearCardGlass.Stats>

        <YearCardGlass.Action onClick={() => console.log('View details')}>
          View detailed analytics
        </YearCardGlass.Action>
      </YearCardGlass.ExpandedContent>
    </YearCardGlass.Root>
  );
}

function CompoundAPIWithInsightsDemo() {
  const [expanded, setExpanded] = useState(true);

  return (
    <YearCardGlass.Root isExpanded={expanded} onExpandedChange={setExpanded}>
      <YearCardGlass.Header>
        <YearCardGlass.Year>2024</YearCardGlass.Year>
        <YearCardGlass.Badge emoji="🔥" label="Record Year" />
        <YearCardGlass.Value>3,456 commits</YearCardGlass.Value>
      </YearCardGlass.Header>
      <YearCardGlass.Progress value={95} gradient="amber" />

      <YearCardGlass.ExpandedContent>
        <YearCardGlass.Stats columns={3}>
          <YearCardGlass.StatItem label="Commits" value="3,456" />
          <YearCardGlass.StatItem label="PRs" value="412" />
          <YearCardGlass.StatItem label="Repos" value="24" />
        </YearCardGlass.Stats>

        <YearCardGlass.Insights>
          <YearCardGlass.InsightItem
            variant="growth"
            emoji="📈"
            text="Activity Growth"
            detail="+47% from last year"
          />
          <YearCardGlass.InsightItem
            variant="highlight"
            emoji="🎯"
            text="Best Month"
            detail="April: 456 commits"
          />
          <YearCardGlass.InsightItem
            variant="warning"
            emoji="⚠️"
            text="Notice"
            detail="Low activity in December"
          />
        </YearCardGlass.Insights>

        <YearCardGlass.Action onClick={() => console.log('Show repos')}>
          Show repos from 2024
        </YearCardGlass.Action>
      </YearCardGlass.ExpandedContent>
    </YearCardGlass.Root>
  );
}

function CompoundAPIInteractiveDemo() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [expandedYear, setExpandedYear] = useState<number | null>(2024);

  const years = [
    { year: 2024, emoji: '🏆', label: 'Best', commits: '4,123', progress: 95 },
    { year: 2023, emoji: '🚀', label: 'Growth', commits: '2,567', progress: 78 },
    { year: 2022, emoji: '🌱', label: 'Start', commits: '1,234', progress: 55 },
    { year: 2021, emoji: '📚', label: 'Learn', commits: '456', progress: 30 },
  ];

  return (
    <div className="space-y-3 w-80">
      <div className="text-sm text-(--text-muted) mb-2">
        Selected: <span className="font-semibold text-(--text-primary)">{selectedYear}</span>
      </div>

      {years.map(({ year, emoji, label, commits, progress }) => (
        <YearCardGlass.Root
          key={year}
          isSelected={selectedYear === year}
          onSelect={() => setSelectedYear(year)}
          isExpanded={expandedYear === year}
          onExpandedChange={(expanded) => setExpandedYear(expanded ? year : null)}
        >
          <YearCardGlass.Header>
            <YearCardGlass.Year>{year}</YearCardGlass.Year>
            <YearCardGlass.Badge emoji={emoji} label={label} />
            <YearCardGlass.Value>{commits}</YearCardGlass.Value>
          </YearCardGlass.Header>
          <YearCardGlass.Progress
            value={progress}
            gradient={selectedYear === year ? 'amber' : 'blue'}
          />
          <YearCardGlass.ExpandedContent>
            <YearCardGlass.Stats columns={2}>
              <YearCardGlass.StatItem label="Commits" value={commits} />
              <YearCardGlass.StatItem label="Progress" value={`${progress}%`} />
            </YearCardGlass.Stats>
            <YearCardGlass.Action onClick={() => console.log(`View ${year}`)}>
              View {year} in detail
            </YearCardGlass.Action>
          </YearCardGlass.ExpandedContent>
        </YearCardGlass.Root>
      ))}
    </div>
  );
}

/**
 * Compound API - Basic Usage
 * Demonstrates the compound component pattern for full control
 */
export const CompoundAPIBasic: CompoundStory = {
  render: () => <CompoundAPIBasicDemo />,
  parameters: {
    docs: {
      description: {
        story: `
Basic compound API usage showing the minimum required components.

\`\`\`tsx
<YearCardGlass.Root isExpanded={expanded} onExpandedChange={setExpanded}>
  <YearCardGlass.Header>
    <YearCardGlass.Year>2024</YearCardGlass.Year>
    <YearCardGlass.Badge emoji="🚀" label="Breakthrough" />
    <YearCardGlass.Value>1,234 commits</YearCardGlass.Value>
  </YearCardGlass.Header>
  <YearCardGlass.Progress value={75} gradient="blue" />
</YearCardGlass.Root>
\`\`\`
        `,
      },
    },
  },
};

/**
 * Compound API - Timeline Layout
 * Multiple year cards arranged vertically for career timeline
 */
export const CompoundAPITimeline: CompoundStory = {
  render: () => <CompoundAPITimelineDemo />,
  parameters: {
    docs: {
      description: {
        story: `
Timeline layout with multiple year cards. Only one card can be expanded at a time (accordion pattern).

Uses \`isSelected\` prop to highlight the active year and \`onExpandedChange\` to track which year is expanded.
        `,
      },
    },
  },
};

/**
 * Compound API - With Sparkline and Stats
 * Full featured card with sparkline visualization and detailed stats
 */
export const CompoundAPIWithSparkline: CompoundStory = {
  render: () => <CompoundAPIWithSparklineDemo />,
  parameters: {
    docs: {
      description: {
        story: `
Full-featured card with sparkline in expanded state only.

- **Collapsed**: Shows only progress bar
- **Expanded**: Shows full sparkline with month labels and detailed stats
        `,
      },
    },
  },
};

/**
 * Compound API - With Insights
 * Card with insight items for detailed analysis
 */
export const CompoundAPIWithInsights: CompoundStory = {
  render: () => <CompoundAPIWithInsightsDemo />,
  parameters: {
    docs: {
      description: {
        story: `
Card with InsightItem components for detailed analysis.

Insight variants: \`default\`, \`tip\`, \`highlight\`, \`warning\`, \`stat\`, \`growth\`, \`decline\`
        `,
      },
    },
  },
};

/**
 * Compound API - Interactive Selection
 * Year selector with controlled selection state
 */
export const CompoundAPIInteractive: CompoundStory = {
  render: () => <CompoundAPIInteractiveDemo />,
  parameters: {
    docs: {
      description: {
        story: `
Interactive year selector with controlled \`isSelected\` and \`isExpanded\` states.

- Click on a card to expand it
- Selection is tracked separately from expansion
- Uses \`onSelect\` callback to track selection
        `,
      },
    },
  },
};
