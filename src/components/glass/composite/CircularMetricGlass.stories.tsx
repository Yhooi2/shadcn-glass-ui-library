import type { Meta, StoryObj } from '@storybook/react';
import { CircularMetricGlass } from './circular-metric-glass';

const meta = {
  title: 'Components/Composite/CircularMetricGlass',
  component: CircularMetricGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Compact circular progress metric display optimized for mobile layouts.

## Features
- **Mobile-Optimized Design:** 80px-112px diameter for space-efficient display
- **4 Color Variants:** Semantic colors (emerald/amber/blue/red) for metric status
- **Percentage Display:** Value shown inside circular progress ring
- **Glow Effects:** Medium intensity glow on progress ring
- **2 Size Variants:** sm (80px) for mobile, md (112px) for tablet/desktop
- **Grid-Friendly:** Perfect for 2x2 mobile metric grids

## Use Cases
- Mobile dashboard metrics (2x2 grid layouts)
- KPI scorecard displays
- Compact metric visualizations
- Space-constrained metric cards
- Trust score breakdowns

## CSS Variables
Inherits color variables from semantic token system:
- \`--metric-success-text\` (emerald)
- \`--metric-warning-text\` (amber)
- \`--metric-default-text\` (blue)
- \`--metric-destructive-text\` (red)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description:
        'Metric label displayed below the circular progress. Typically 2-6 characters (e.g., "Reg", "Imp").',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Metric value as percentage (0-100). Controls progress fill and center text.',
      table: {
        category: 'Content',
        type: { summary: 'number' },
      },
    },
    color: {
      control: 'select',
      options: ['emerald', 'amber', 'blue', 'red'],
      description:
        'Color theme: emerald (success), amber (warning), blue (default), red (destructive).',
      table: {
        category: 'Appearance',
        type: { summary: 'CircularMetricColor' },
        defaultValue: { summary: 'blue' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size variant: sm (80px, 6px thickness) or md (112px, 8px thickness).',
      table: {
        category: 'Layout',
        type: { summary: 'sm | md' },
        defaultValue: { summary: 'sm' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
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
