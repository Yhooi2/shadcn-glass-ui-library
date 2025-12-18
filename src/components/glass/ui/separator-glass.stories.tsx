import type { Meta, StoryObj } from '@storybook/react';
import { SeparatorGlass } from './separator-glass';

const meta: Meta<typeof SeparatorGlass> = {
  title: 'Components/Core/SeparatorGlass',
  component: SeparatorGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[400px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <SeparatorGlass className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <SeparatorGlass orientation="vertical" />
        <div>Docs</div>
        <SeparatorGlass orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center space-x-4">
      <span>Item 1</span>
      <SeparatorGlass orientation="vertical" />
      <span>Item 2</span>
      <SeparatorGlass orientation="vertical" />
      <span>Item 3</span>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 w-[350px]">
      <h3 className="font-semibold">Settings</h3>
      <p className="text-sm text-muted-foreground mt-1">Manage your preferences</p>
      <SeparatorGlass className="my-4" />
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm">Notifications</span>
          <span className="text-sm text-muted-foreground">Enabled</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Dark Mode</span>
          <span className="text-sm text-muted-foreground">Auto</span>
        </div>
      </div>
    </div>
  ),
};
