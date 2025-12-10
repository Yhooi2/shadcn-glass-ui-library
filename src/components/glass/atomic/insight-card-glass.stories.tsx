import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { InsightCardGlass } from './insight-card-glass';

const meta = {
  title: 'Glass UI/Atomic/InsightCardGlass',
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
  args: { text: 'Лучший месяц: Апрель', detail: '156 коммитов' },
};

export const Inline: Story = {
  args: { text: 'Лучший месяц: Апрель (156 коммитов)', inline: true },
};

export const Highlight: Story = {
  args: { variant: 'highlight', text: 'Достижение!', detail: 'Первые 1000 коммитов' },
};

export const Warning: Story = {
  args: { variant: 'warning', text: 'Активность снизилась', detail: '-23%' },
};

export const Growth: Story = {
  args: { variant: 'growth', text: 'Рост', detail: '+47%' },
};

export const Clickable: Story = {
  args: { text: 'Подробнее', onClick: action('clicked'), showArrow: true },
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
