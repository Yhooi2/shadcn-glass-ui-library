import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SortDropdownGlass, type SortField, type SortOrder } from './sort-dropdown-glass';
import { ThemeProvider } from '@/lib/theme-context';
import '@/glass-theme.css';

const meta: Meta<typeof SortDropdownGlass> = {
  title: 'Glass/Atomic/SortDropdownGlass',
  component: SortDropdownGlass,
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'glass';
      return (
        <ThemeProvider defaultTheme={theme}>
          <div
            className="p-8 min-h-[200px]"
            style={{ background: 'var(--bg-gradient)' }}
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    sortBy: {
      control: 'select',
      options: ['commits', 'stars', 'name', 'contribution'],
      description: 'Current sort field',
      table: {
        type: { summary: 'SortField' },
        defaultValue: { summary: 'commits' },
      },
    },
    sortOrder: {
      control: 'radio',
      options: ['asc', 'desc'],
      description: 'Sort order (ascending/descending)',
      table: {
        type: { summary: 'SortOrder' },
        defaultValue: { summary: 'desc' },
      },
    },
    compact: {
      control: 'boolean',
      description: 'Compact mode for mobile',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper
function InteractiveSortDropdown({
  initialSortBy = 'commits',
  initialSortOrder = 'desc',
  ...props
}: {
  initialSortBy?: SortField;
  initialSortOrder?: SortOrder;
  compact?: boolean;
  options?: readonly SortField[];
}) {
  const [sortBy, setSortBy] = useState<SortField>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);

  return (
    <SortDropdownGlass
      sortBy={sortBy}
      sortOrder={sortOrder}
      onSortChange={(field, order) => {
        setSortBy(field);
        setSortOrder(order);
      }}
      {...props}
    />
  );
}

/**
 * Default sort dropdown showing "Sort: Commits" with descending order
 */
export const Default: Story = {
  render: () => <InteractiveSortDropdown />,
};

/**
 * Sort by stars with ascending order
 */
export const SortByStars: Story = {
  render: () => <InteractiveSortDropdown initialSortBy="stars" />,
};

/**
 * Ascending order indicated by up arrow
 */
export const Ascending: Story = {
  render: () => <InteractiveSortDropdown initialSortOrder="asc" />,
};

/**
 * Compact mode for mobile displays
 */
export const Compact: Story = {
  render: () => <InteractiveSortDropdown compact />,
};

/**
 * Limited options - only commits and stars available
 */
export const LimitedOptions: Story = {
  render: () => (
    <InteractiveSortDropdown options={['commits', 'stars']} />
  ),
};

/**
 * All sort fields displayed
 */
export const AllOptions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span style={{ color: 'var(--text-muted)' }}>Commits:</span>
        <InteractiveSortDropdown initialSortBy="commits" />
      </div>
      <div className="flex items-center gap-2">
        <span style={{ color: 'var(--text-muted)' }}>Stars:</span>
        <InteractiveSortDropdown initialSortBy="stars" />
      </div>
      <div className="flex items-center gap-2">
        <span style={{ color: 'var(--text-muted)' }}>Name:</span>
        <InteractiveSortDropdown initialSortBy="name" />
      </div>
      <div className="flex items-center gap-2">
        <span style={{ color: 'var(--text-muted)' }}>Contribution:</span>
        <InteractiveSortDropdown initialSortBy="contribution" />
      </div>
    </div>
  ),
};
