import type { Meta, StoryObj } from '@storybook/react';
import { MetricCardGlass } from './metric-card-glass';

const meta = {
  title: 'Glass UI/Composite/MetricCardGlass',
  component: MetricCardGlass,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['emerald', 'amber', 'blue', 'red'],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-48 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MetricCardGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Completion',
    value: 75,
    color: 'blue',
  },
};

export const WithSparkline: Story = {
  args: {
    label: 'Performance',
    value: 82,
    color: 'emerald',
    sparklineData: [65, 68, 72, 75, 78, 80, 82],
  },
};

export const EmeraldWithTrend: Story = {
  args: {
    label: 'Success Rate',
    value: 94,
    color: 'emerald',
    sparklineData: [85, 87, 89, 90, 91, 93, 94],
  },
};

export const AmberWarning: Story = {
  args: {
    label: 'Warning Level',
    value: 67,
    color: 'amber',
    sparklineData: [72, 70, 68, 67, 66, 66, 67],
  },
};

export const RedAlert: Story = {
  args: {
    label: 'Critical',
    value: 23,
    color: 'red',
    sparklineData: [45, 40, 35, 30, 28, 25, 23],
  },
};

export const BlueProgress: Story = {
  args: {
    label: 'Progress',
    value: 58,
    color: 'blue',
    sparklineData: [30, 35, 40, 45, 50, 54, 58],
  },
};

export const WithoutSparkline: Story = {
  args: {
    label: 'Simple Metric',
    value: 88,
    color: 'emerald',
    showSparkline: false,
  },
};

export const SparklineDisabled: Story = {
  args: {
    label: 'No Trend',
    value: 45,
    color: 'amber',
    sparklineData: [40, 42, 44, 45, 46, 45, 45],
    showSparkline: false,
  },
};

export const HighValue: Story = {
  args: {
    label: 'Excellence',
    value: 98,
    color: 'emerald',
    sparklineData: [92, 93, 94, 95, 96, 97, 98],
  },
};

export const LowValue: Story = {
  args: {
    label: 'Needs Attention',
    value: 12,
    color: 'red',
    sparklineData: [25, 22, 20, 18, 15, 13, 12],
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-auto p-4">
      <MetricCardGlass
        label="Emerald"
        value={85}
        color="emerald"
        sparklineData={[70, 75, 78, 80, 82, 84, 85]}
      />
      <MetricCardGlass
        label="Amber"
        value={65}
        color="amber"
        sparklineData={[72, 70, 68, 66, 65, 65, 65]}
      />
      <MetricCardGlass
        label="Blue"
        value={78}
        color="blue"
        sparklineData={[60, 65, 70, 73, 75, 77, 78]}
      />
      <MetricCardGlass
        label="Red"
        value={28}
        color="red"
        sparklineData={[45, 40, 37, 33, 30, 29, 28]}
      />
    </div>
  ),
};
