import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { RainbowProgressGlass } from './rainbow-progress-glass';

const meta = {
  title: 'Components/Feedback/RainbowProgressGlass',
  component: RainbowProgressGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Progress value (0-100)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Progress bar size',
    },
    showGlow: {
      control: 'boolean',
      description: 'Enable glow effect',
    },
  },
} satisfies Meta<typeof RainbowProgressGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 72,
    size: 'lg',
    showGlow: true,
  },
  render: (args) => (
    <div className="w-64">
      <RainbowProgressGlass {...args} />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const SmallSize: Story = {
  args: {
    value: 50,
    size: 'sm',
  },
  render: (args) => (
    <div className="w-64">
      <RainbowProgressGlass {...args} />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ExtraLarge: Story = {
  args: {
    value: 85,
    size: 'xl',
  },
  render: (args) => (
    <div className="w-64">
      <RainbowProgressGlass {...args} />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const NoGlow: Story = {
  args: {
    value: 60,
    size: 'lg',
    showGlow: false,
  },
  render: (args) => (
    <div className="w-64">
      <RainbowProgressGlass {...args} />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllSizes: Story = {
  args: {
    value: 72,
  },
  render: () => (
    <div className="w-64 space-y-4">
      <div>
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Small</span>
        <RainbowProgressGlass value={72} size="sm" />
      </div>
      <div>
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Medium</span>
        <RainbowProgressGlass value={72} size="default" />
      </div>
      <div>
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Large</span>
        <RainbowProgressGlass value={72} size="lg" />
      </div>
      <div>
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Extra Large</span>
        <RainbowProgressGlass value={72} size="xl" />
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
