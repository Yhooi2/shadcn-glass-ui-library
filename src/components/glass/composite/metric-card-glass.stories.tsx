import type { Meta, StoryObj } from '@storybook/react';
import { Activity, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
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

// NEW: With Icon
export const WithIcon: Story = {
  args: {
    label: 'Activity Score',
    value: 85,
    color: 'blue',
    icon: <Activity className="w-4 h-4" />,
    sparklineData: [70, 75, 78, 80, 82, 84, 85],
  },
};

// NEW: With Trend Up
export const WithTrendUp: Story = {
  args: {
    label: 'Growth Rate',
    value: 94,
    color: 'emerald',
    icon: <TrendingUp className="w-4 h-4" />,
    trend: {
      value: 12,
      direction: 'up',
      label: 'vs last month',
    },
    sparklineData: [75, 80, 84, 88, 90, 92, 94],
  },
};

// NEW: With Trend Down
export const WithTrendDown: Story = {
  args: {
    label: 'Error Rate',
    value: 23,
    color: 'red',
    icon: <AlertTriangle className="w-4 h-4" />,
    trend: {
      value: 8,
      direction: 'down',
      label: 'vs last week',
    },
    sparklineData: [45, 40, 35, 30, 28, 25, 23],
  },
};

// NEW: With Custom Formatter
export const WithValueFormatter: Story = {
  args: {
    label: 'Performance',
    value: 8750,
    color: 'blue',
    valueFormatter: (v) => `${(v / 1000).toFixed(1)}k`,
    valueSuffix: 'requests/sec',
    showProgress: false,
  },
};

// NEW: With Value Suffix
export const WithValueSuffix: Story = {
  args: {
    label: 'Trust Score',
    value: 85,
    color: 'emerald',
    icon: <Zap className="w-4 h-4" />,
    valueSuffix: 'of 100',
    sparklineData: [75, 78, 80, 82, 83, 84, 85],
  },
};

// NEW: Full Featured
export const FullFeatured: Story = {
  args: {
    label: 'Activity Index',
    value: 92,
    color: 'emerald',
    icon: <Activity className="w-4 h-4" />,
    trend: {
      value: 15,
      direction: 'up',
    },
    sparklineData: [70, 75, 80, 85, 88, 90, 92],
  },
};

// NEW: Without Progress Bar
export const WithoutProgress: Story = {
  args: {
    label: 'Simple Display',
    value: 42,
    color: 'blue',
    showProgress: false,
    valueFormatter: (v) => String(v),
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
        icon={<Activity className="w-4 h-4" />}
        trend={{ value: 12, direction: 'up' }}
        sparklineData={[70, 75, 78, 80, 82, 84, 85]}
      />
      <MetricCardGlass
        label="Amber"
        value={65}
        color="amber"
        icon={<AlertTriangle className="w-4 h-4" />}
        trend={{ value: 5, direction: 'down' }}
        sparklineData={[72, 70, 68, 66, 65, 65, 65]}
      />
      <MetricCardGlass
        label="Blue"
        value={78}
        color="blue"
        icon={<Zap className="w-4 h-4" />}
        trend={{ value: 3, direction: 'neutral' }}
        sparklineData={[60, 65, 70, 73, 75, 77, 78]}
      />
      <MetricCardGlass
        label="Red"
        value={28}
        color="red"
        icon={<TrendingUp className="w-4 h-4" />}
        trend={{ value: 18, direction: 'down' }}
        sparklineData={[45, 40, 37, 33, 30, 29, 28]}
      />
    </div>
  ),
};
