import type { Meta, StoryObj } from '@storybook/react';
import { YearCardGlass } from './year-card-glass';

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
