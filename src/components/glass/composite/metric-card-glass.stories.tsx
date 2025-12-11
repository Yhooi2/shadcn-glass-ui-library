/**
 * MetricCardGlass Component
 *
 * A metric display card with optional progress bar, sparkline chart, and trend indicator.
 * Follows shadcn/ui Card pattern with Glass UI extensions.
 *
 * ## New API (v1.x)
 * - `title` instead of `label`
 * - `variant` instead of `color` (default, secondary, success, warning, destructive)
 * - `change` instead of `trend` (supports string "+12.5%" or detailed object)
 * - `description` instead of `valueSuffix`
 * - `value` accepts string or number (format before passing, no `valueFormatter`)
 * - `progress` separate from display value
 *
 * ## Backward Compatibility
 * Old props (`label`, `color`, `trend`, etc.) still work but show deprecation warnings in console.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Activity, TrendingUp, AlertTriangle, DollarSign, Users } from 'lucide-react';
import { MetricCardGlass } from './metric-card-glass';

const meta = {
  title: 'Glass UI/Composite/MetricCardGlass',
  component: MetricCardGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A metric display card following shadcn/ui patterns with Glass UI extensions for progress, sparkline, and trends.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'destructive'],
      description: 'Semantic variant (shadcn/ui compatible)',
    },
    // Legacy prop for backward compatibility
    color: {
      control: 'select',
      options: ['emerald', 'amber', 'blue', 'red'],
      description: '⚠️ DEPRECATED: Use `variant` instead',
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

// ========================================
// NEW API EXAMPLES (v1.x)
// ========================================

/** Simple metric with new API */
export const SimpleMetric: Story = {
  args: {
    title: 'Total Revenue',
    value: '$45,231',
    variant: 'success',
    icon: <DollarSign className="w-4 h-4" />,
  },
};

/** Metric with string change indicator */
export const WithStringChange: Story = {
  args: {
    title: 'Active Users',
    value: '8,459',
    change: '+12.5%',
    variant: 'default',
    icon: <Users className="w-4 h-4" />,
  },
};

/** Metric with detailed change object */
export const WithDetailedChange: Story = {
  args: {
    title: 'Conversion Rate',
    value: '3.24%',
    description: 'Goal: 3.5%',
    change: {
      value: 12.5,
      direction: 'up',
      period: 'vs last month',
    },
    variant: 'success',
    icon: <TrendingUp className="w-4 h-4" />,
  },
};

/** Metric with progress bar */
export const WithProgress: Story = {
  args: {
    title: 'Project Progress',
    value: '85%',
    description: '17 of 20 tasks',
    progress: 85,
    variant: 'success',
    showProgress: true,
  },
};

/** Metric with sparkline chart */
export const WithSparkline: Story = {
  args: {
    title: 'Performance',
    value: '92',
    description: 'Weekly average',
    variant: 'default',
    sparklineData: [70, 75, 78, 82, 86, 90, 92],
    showSparkline: true,
  },
};

/** Full-featured metric card */
export const FullFeatured: Story = {
  args: {
    title: 'Activity Index',
    value: '94%',
    description: 'Excellent performance',
    change: { value: 15.2, direction: 'up', period: 'vs last month' },
    variant: 'success',
    icon: <Activity className="w-4 h-4" />,
    sparklineData: [70, 75, 80, 85, 88, 90, 94],
    progress: 94,
    showProgress: true,
    showSparkline: true,
  },
};

/** All variant types showcase */
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-auto p-4">
      <MetricCardGlass
        title="Default"
        value="$12,345"
        change="+8.2%"
        variant="default"
        icon={<DollarSign className="w-4 h-4" />}
        sparklineData={[60, 65, 70, 75, 80, 85, 90]}
        progress={75}
      />
      <MetricCardGlass
        title="Secondary"
        value="2,458"
        change="+3.1%"
        variant="secondary"
        icon={<Users className="w-4 h-4" />}
        sparklineData={[50, 55, 58, 62, 65, 68, 70]}
        progress={68}
      />
      <MetricCardGlass
        title="Success"
        value="98.5%"
        change={{ value: 12, direction: 'up' }}
        variant="success"
        icon={<TrendingUp className="w-4 h-4" />}
        sparklineData={[85, 88, 90, 92, 94, 96, 98]}
        progress={98}
      />
      <MetricCardGlass
        title="Warning"
        value="67%"
        change={{ value: 5, direction: 'down' }}
        variant="warning"
        icon={<AlertTriangle className="w-4 h-4" />}
        sparklineData={[80, 77, 74, 71, 69, 68, 67]}
        progress={67}
      />
      <MetricCardGlass
        title="Destructive"
        value="23%"
        change={{ value: 18, direction: 'down', period: 'critical' }}
        variant="destructive"
        icon={<AlertTriangle className="w-4 h-4" />}
        sparklineData={[45, 40, 35, 30, 28, 25, 23]}
        progress={23}
      />
    </div>
  ),
};

// ========================================
// LEGACY API EXAMPLES (Backward Compatibility)
// These examples use deprecated props and will show console warnings
// ========================================

export const LegacyDefault: Story = {
  args: {
    label: 'Completion',
    value: 75,
    color: 'blue',
  },
};

/** @deprecated Use new API examples above */
export const LegacyWithSparkline: Story = {
  name: '🔴 Legacy: With Sparkline',
  args: {
    label: 'Performance',
    value: 82,
    color: 'emerald',
    sparklineData: [65, 68, 72, 75, 78, 80, 82],
  },
};
