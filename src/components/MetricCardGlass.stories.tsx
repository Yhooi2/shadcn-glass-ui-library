/**
 * MetricCardGlass - Legacy Stories File
 *
 * ⚠️ DEPRECATED: This file is kept for backward compatibility only.
 * Please use the new stories at: src/components/glass/composite/metric-card-glass.stories.tsx
 *
 * This file demonstrates the old API (label, color) which still works but shows deprecation warnings.
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { MetricCardGlass } from './glass/composite/metric-card-glass';

const meta = {
  title: 'Glass/Composite/MetricCardGlass (Legacy)',
  component: MetricCardGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '⚠️ **DEPRECATED API**: This story uses the old API (`label`, `color`). See "Glass UI/Composite/MetricCardGlass" for the new API (`title`, `variant`).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '⚠️ DEPRECATED: Use `title` instead',
    },
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Metric value (0-100)',
    },
    color: {
      control: 'select',
      options: ['emerald', 'amber', 'blue', 'red'],
      description:
        '⚠️ DEPRECATED: Use `variant` instead (emerald→success, amber→warning, blue→default, red→destructive)',
    },
  },
} satisfies Meta<typeof MetricCardGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

/** @deprecated Use new API with `variant="success"` */
export const Emerald: Story = {
  args: {
    label: 'Regularity',
    value: 84,
    color: 'emerald',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/** @deprecated Use new API with `variant="warning"` */
export const Amber: Story = {
  args: {
    label: 'Impact',
    value: 45,
    color: 'amber',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/** @deprecated Use new API with `variant="default"` */
export const Blue: Story = {
  args: {
    label: 'Diversity',
    value: 78,
    color: 'blue',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/** @deprecated Use new API with `variant="destructive"` */
export const Red: Story = {
  args: {
    label: 'Collaboration',
    value: 12,
    color: 'red',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/** @deprecated Use new API examples in "Glass UI/Composite/MetricCardGlass" stories */
export const AllColors: Story = {
  args: {
    label: 'Example',
    value: 50,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-80">
      <MetricCardGlass label="Regularity" value={84} color="emerald" />
      <MetricCardGlass label="Impact" value={45} color="amber" />
      <MetricCardGlass label="Diversity" value={78} color="blue" />
      <MetricCardGlass label="Collaboration" value={12} color="red" />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
