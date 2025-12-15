import type { Meta, StoryObj } from '@storybook/react';
import { CircularMetricGlass } from './circular-metric-glass';

const meta = {
  title: 'Components/Composite/CircularMetricGlass',
  component: CircularMetricGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Metric label',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    color: {
      control: 'select',
      options: ['emerald', 'amber', 'blue', 'red'],
      description: 'Metric color',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size variant',
    },
  },
} satisfies Meta<typeof CircularMetricGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: 'Reg',
    value: 84,
    color: 'emerald',
  },
};

// All colors
export const AllColors: Story = {
  args: {
    label: 'Metric',
    value: 84,
  },
  render: () => (
    <div className="flex gap-6">
      <CircularMetricGlass label="Reg" value={84} color="emerald" />
      <CircularMetricGlass label="Imp" value={45} color="amber" />
      <CircularMetricGlass label="Div" value={78} color="blue" />
      <CircularMetricGlass label="Collab" value={12} color="red" />
    </div>
  ),
};

// Mobile Grid (2x2 layout at 390px)
export const MobileGrid: Story = {
  args: {
    label: 'Metric',
    value: 84,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4" style={{ width: '358px' }}>
      <CircularMetricGlass label="Reg" value={84} color="emerald" />
      <CircularMetricGlass label="Imp" value={45} color="amber" />
      <CircularMetricGlass label="Div" value={78} color="blue" />
      <CircularMetricGlass label="Collab" value={12} color="red" />
    </div>
  ),
};

// Size comparison
export const Sizes: Story = {
  args: {
    label: 'Metric',
    value: 75,
    size: 'sm',
  },
  render: () => (
    <div className="flex gap-8 items-end">
      <div className="text-center">
        <CircularMetricGlass label="Small" value={75} color="blue" size="sm" />
        <p className="text-xs text-white/60 mt-2">sm (80px)</p>
      </div>
      <div className="text-center">
        <CircularMetricGlass label="Medium" value={75} color="blue" size="md" />
        <p className="text-xs text-white/60 mt-2">md (112px)</p>
      </div>
    </div>
  ),
};

// Progress values
export const ProgressValues: Story = {
  args: {
    label: 'Metric',
    value: 15,
  },
  render: () => (
    <div className="flex gap-6">
      <CircularMetricGlass label="Low" value={15} color="red" />
      <CircularMetricGlass label="Med" value={50} color="amber" />
      <CircularMetricGlass label="High" value={85} color="emerald" />
      <CircularMetricGlass label="Full" value={100} color="blue" />
    </div>
  ),
};
