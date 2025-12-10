import type { Meta, StoryObj } from '@storybook/react';
import { SparklineGlass } from './sparkline-glass';

const sampleData = [10, 25, 45, 80, 60, 30, 40, 55, 70, 50, 35, 20];
const monthLabels = ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'];

const meta = {
  title: 'Glass UI/Visualization/SparklineGlass',
  component: SparklineGlass,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'select', options: ['sm', 'md', 'lg'] },
    gap: { control: 'select', options: ['none', 'sm', 'md'] },
    highlightMax: { control: 'boolean' },
    showLabels: { control: 'boolean' },
    animated: { control: 'boolean' },
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
    barColor: 'var(--glass-accent-warning)',
    maxBarColor: 'var(--glass-accent-danger)',
    highlightMax: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <SparklineGlass data={sampleData} height="sm" />
      <SparklineGlass data={sampleData} height="md" />
      <SparklineGlass data={sampleData} height="lg" />
    </div>
  ),
};

export const EmptyData: Story = { args: { data: [] } };
export const SingleValue: Story = { args: { data: [100] } };
export const AllZeros: Story = { args: { data: [0, 0, 0, 0, 0] } };
