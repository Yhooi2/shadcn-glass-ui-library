import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { InsightCardGlass } from './insight-card-glass';

const meta = {
  title: 'Components/Atomic/InsightCardGlass',
  component: InsightCardGlass,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'tip', 'highlight', 'warning', 'stat', 'growth', 'decline'],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InsightCardGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: 'Best month: April', detail: '156 commits' },
};

export const Inline: Story = {
  args: { text: 'Best month: April (156 commits)', inline: true },
};

export const Highlight: Story = {
  args: { variant: 'highlight', text: 'Achievement!', detail: 'First 1000 commits' },
};

export const Warning: Story = {
  args: { variant: 'warning', text: 'Activity decreased', detail: '-23%' },
};

export const Growth: Story = {
  args: { variant: 'growth', text: 'Growth', detail: '+47%' },
};

export const Clickable: Story = {
  args: { text: 'Learn more', onClick: fn(), showArrow: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3 w-80">
      <InsightCardGlass variant="default" text="Default" />
      <InsightCardGlass variant="tip" text="Tip" />
      <InsightCardGlass variant="highlight" text="Highlight" />
      <InsightCardGlass variant="warning" text="Warning" />
      <InsightCardGlass variant="stat" text="Stat" />
      <InsightCardGlass variant="growth" text="Growth" />
      <InsightCardGlass variant="decline" text="Decline" />
    </div>
  ),
};
