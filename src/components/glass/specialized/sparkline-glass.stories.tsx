import type { Meta, StoryObj } from '@storybook/react';
import { SparklineGlass, type SparklineConfig } from './sparkline-glass';

const sampleData = [10, 25, 45, 80, 60, 30, 40, 55, 70, 50, 35, 20];
const monthLabels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const meta = {
  title: 'Components/Visualization/SparklineGlass',
  component: SparklineGlass,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'select', options: ['sm', 'md', 'lg'] },
    gap: { control: 'select', options: ['none', 'sm', 'md'] },
    highlightMax: { control: 'boolean' },
    showLabels: { control: 'boolean' },
    animated: { control: 'boolean' },
    showTooltip: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="w-64 p-4 bg-[var(--glass-bg)] rounded-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SparklineGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { data: sampleData } };

export const WithLabels: Story = {
  args: { data: sampleData, labels: monthLabels, showLabels: true },
};

export const HighlightMax: Story = {
  args: { data: sampleData, highlightMax: true },
};

export const Animated: Story = {
  args: { data: sampleData, animated: true },
};

export const CustomColors: Story = {
  args: {
    data: sampleData,
    barColor: 'var(--alert-warning-text)',
    maxBarColor: 'var(--alert-destructive-text)',
    highlightMax: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div className="text-xs text-[var(--text-muted)] mb-1">Small (16px)</div>
      <SparklineGlass data={sampleData} height="sm" />
      <div className="text-xs text-[var(--text-muted)] mb-1">Medium (24px)</div>
      <SparklineGlass data={sampleData} height="md" />
      <div className="text-xs text-[var(--text-muted)] mb-1">Large (32px)</div>
      <SparklineGlass data={sampleData} height="lg" />
    </div>
  ),
};

// NEW: Recharts-based features
export const WithTooltip: Story = {
  args: {
    data: sampleData,
    labels: monthLabels,
    showTooltip: true,
    valueFormatter: (value, index) => `${monthLabels[index]}: ${value} commits`,
  },
};

export const WithClickHandler: Story = {
  args: {
    data: sampleData,
    labels: monthLabels,
    onBarClick: (value, index) => alert(`Clicked: ${monthLabels[index]} = ${value}`),
  },
};

export const WithChartConfig: Story = {
  args: {
    data: sampleData,
    highlightMax: true,
    config: {
      value: {
        label: 'Activity',
        color: 'oklch(70% 0.2 250)',
      },
      max: {
        label: 'Peak',
        color: 'oklch(70% 0.25 142)',
      },
    } satisfies SparklineConfig,
  },
};

export const FullFeatured: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="text-sm font-medium text-[var(--text-primary)] mb-2">
        Monthly Activity 2024
      </div>
      <SparklineGlass
        data={sampleData}
        labels={monthLabels}
        showLabels
        highlightMax
        animated
        height="lg"
        showTooltip
        valueFormatter={(value) => `${value} commits`}
      />
      <div className="text-xs text-[var(--text-muted)]">Peak: April (80 commits)</div>
    </div>
  ),
};

export const EmptyData: Story = { args: { data: [] } };
export const SingleValue: Story = { args: { data: [100] } };
export const AllZeros: Story = { args: { data: [0, 0, 0, 0, 0] } };
