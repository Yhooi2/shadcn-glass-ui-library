import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { CircularProgressGlass } from './circular-progress-glass';

const meta = {
  title: 'Glass/UI/CircularProgressGlass',
  component: CircularProgressGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Progress value (0-100)',
    },
    variant: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
      description: 'Progress variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Circle size',
    },
    color: {
      control: 'select',
      options: ['violet', 'blue', 'cyan', 'amber', 'emerald', 'rose'],
      description: 'Gradient color',
    },
    thickness: {
      control: { type: 'range', min: 2, max: 20 },
      description: 'Stroke width in pixels',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show percentage label',
    },
    showGlow: {
      control: 'boolean',
      description: 'Show glow effect',
    },
    glowIntensity: {
      control: 'select',
      options: ['low', 'medium', 'high'],
      description: 'Glow intensity',
    },
    strokeLinecap: {
      control: 'select',
      options: ['round', 'butt', 'square'],
      description: 'Stroke line cap style',
    },
  },
} satisfies Meta<typeof CircularProgressGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 65,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Indeterminate: Story = {
  args: {
    variant: 'indeterminate',
    showLabel: false,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithCustomLabel: Story = {
  args: {
    value: 75,
    label: 'Loading...',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const NoGlow: Story = {
  args: {
    value: 60,
    showGlow: false,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const HighGlowIntensity: Story = {
  args: {
    value: 80,
    glowIntensity: 'high',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ThickStroke: Story = {
  args: {
    value: 50,
    thickness: 16,
    trackWidth: 16,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={65} size="sm" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Small
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={65} size="md" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Medium
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={65} size="lg" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Large
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={65} size="xl" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          XL
        </span>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="flex gap-6 items-center flex-wrap">
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} color="violet" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Violet
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} color="blue" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Blue
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} color="cyan" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Cyan
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} color="amber" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Amber
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} color="emerald" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Emerald
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} color="rose" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Rose
        </span>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ProgressSteps: Story = {
  render: () => (
    <div className="flex gap-6 items-center flex-wrap">
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={0} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          0%
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={25} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          25%
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={50} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          50%
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          75%
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={100} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          100%
        </span>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const StrokeLinecaps: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={70} strokeLinecap="round" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Round
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={70} strokeLinecap="butt" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Butt
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={70} strokeLinecap="square" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Square
        </span>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
