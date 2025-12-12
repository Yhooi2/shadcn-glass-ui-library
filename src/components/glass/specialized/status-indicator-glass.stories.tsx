import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { StatusIndicatorGlass } from './status-indicator-glass';

const meta = {
  title: 'Components/Composite/StatusIndicatorGlass',
  component: StatusIndicatorGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['green', 'yellow', 'red'],
      description: 'Status type (color)',
    },
    size: {
      control: 'select',
      options: ['normal', 'large'],
      description: 'Indicator size',
    },
  },
} satisfies Meta<typeof StatusIndicatorGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Green: Story = {
  args: {
    type: 'green',
    size: 'normal',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Yellow: Story = {
  args: {
    type: 'yellow',
    size: 'normal',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Red: Story = {
  args: {
    type: 'red',
    size: 'normal',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const LargeGreen: Story = {
  args: {
    type: 'green',
    size: 'large',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const LargeYellow: Story = {
  args: {
    type: 'yellow',
    size: 'large',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const LargeRed: Story = {
  args: {
    type: 'red',
    size: 'large',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col items-center gap-2">
        <StatusIndicatorGlass type="green" size="normal" />
        <StatusIndicatorGlass type="green" size="large" />
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <StatusIndicatorGlass type="yellow" size="normal" />
        <StatusIndicatorGlass type="yellow" size="large" />
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Yellow</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <StatusIndicatorGlass type="red" size="normal" />
        <StatusIndicatorGlass type="red" size="large" />
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Red</span>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
