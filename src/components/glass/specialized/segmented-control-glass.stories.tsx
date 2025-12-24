import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect } from 'storybook/test';
import { SegmentedControlGlass } from './segmented-control-glass';

const meta = {
  title: 'Components/Navigation/SegmentedControlGlass',
  component: SegmentedControlGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Array of segment options',
      control: 'object',
    },
    value: {
      description: 'Currently selected value',
      control: 'text',
    },
    onChange: {
      description: 'Callback when selection changes',
      action: 'changed',
    },
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<{ value: string }>();
    return (
      <SegmentedControlGlass
        {...args}
        value={value}
        onChange={(newValue) => updateArgs({ value: newValue })}
      />
    );
  },
} satisfies Meta<typeof SegmentedControlGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoSegments: Story = {
  args: {
    options: [
      { value: 'left', label: 'Left' },
      { value: 'right', label: 'Right' },
    ],
    value: 'left',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ThreeSegments: Story = {
  args: {
    options: [
      { value: 'overview', label: 'Overview' },
      { value: 'repos', label: 'Repositories' },
      { value: 'activity', label: 'Activity' },
    ],
    value: 'overview',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const FourSegments: Story = {
  args: {
    options: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending' },
      { value: 'completed', label: 'Completed' },
    ],
    value: 'all',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithLongLabels: Story = {
  args: {
    options: [
      { value: 'short', label: 'A' },
      { value: 'medium', label: 'Medium' },
      { value: 'long', label: 'Very Long Label' },
    ],
    value: 'short',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
