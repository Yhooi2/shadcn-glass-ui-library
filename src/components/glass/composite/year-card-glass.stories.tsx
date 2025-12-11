import type { Meta, StoryObj } from '@storybook/react';
import { GitCommit, GitPullRequest, FolderGit, Star, TrendingUp } from 'lucide-react';
import { YearCardGlass } from './year-card-glass';
import { BadgeGlass } from '../ui/badge-glass';

const meta = {
  title: 'Glass UI/Composite/YearCardGlass',
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
    gradient: 'green',
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
    gradient: 'purple',
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
    gradient: 'yellow',
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
    gradient: 'orange',
    isExpanded: true,
    prs: 412,
    repos: 24,
    insights: [
      {
        variant: 'growth',
        text: 'Рост активности',
        detail: '+47% к прошлому году',
      },
      {
        variant: 'highlight',
        text: 'Лучший месяц',
        detail: 'Апрель: 456 коммитов',
      },
      {
        variant: 'stat',
        emoji: '⭐',
        text: 'Новый рекорд',
        detail: 'Больше всего PR за год',
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
    gradient: 'pink',
    isExpanded: true,
    prs: 345,
    repos: 21,
    sparklineData: [112, 134, 156, 178, 201, 223, 245, 267, 289, 312, 334, 356],
    insights: [
      {
        variant: 'growth',
        emoji: '📈',
        text: 'Постоянный рост',
        detail: '+12% каждый квартал',
      },
      {
        variant: 'tip',
        emoji: '💡',
        text: 'Совет',
        detail: 'Пик активности по вторникам',
      },
      {
        variant: 'warning',
        emoji: '⚠️',
        text: 'Внимание',
        detail: 'Низкая активность в декабре',
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
    gradient: 'green',
    sparklineData: [12, 23, 34, 45, 56, 67, 78, 89, 101, 112, 123, 134],
  },
};

export const HighProgressExpanded: Story = {
  args: {
    year: 2024,
    emoji: '🏆',
    label: 'Champion',
    commits: '4,123 commits',
    progress: 98,
    gradient: 'gold',
    isExpanded: true,
    prs: 567,
    repos: 32,
    sparklineData: [234, 267, 301, 334, 367, 401, 434, 467, 501, 534, 567, 601],
    insights: [
      {
        variant: 'highlight',
        emoji: '🎯',
        text: 'Цель достигнута',
        detail: '98% от годового плана',
      },
      {
        variant: 'growth',
        emoji: '🚀',
        text: 'Феноменальный рост',
        detail: '+156% к прошлому году',
      },
    ],
    onShowYear: () => console.log('Show year clicked'),
  },
};

// NEW: With Month Labels
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
    showSparklineCollapsed: false,
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
    gradient: 'purple',
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
    gradient: 'green',
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
    sparklineData: [200, 234, 267, 301, 334, 367, 401, 434, 467, 501, 534, 567],
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
    gradient: 'pink',
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

// NEW: Sparkline in Collapsed Only
export const SparklineInExpandedOnly: Story = {
  args: {
    year: 2024,
    emoji: '📈',
    label: 'Trending',
    commits: '2,123 commits',
    progress: 83,
    gradient: 'blue',
    isExpanded: false,
    showSparklineCollapsed: false,
    sparklineData: [134, 156, 178, 201, 223, 245, 267, 289, 312, 334, 356, 378],
    sparklineLabels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  },
};

// NEW: Full Featured (All New Props)
export const CompleteExample: Story = {
  args: {
    year: 2024,
    emoji: '🏅',
    label: 'Best Year',
    commits: '4567',
    progress: 95,
    gradient: 'gold',
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
    showSparklineCollapsed: false,
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
