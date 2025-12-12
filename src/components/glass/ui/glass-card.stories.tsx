import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { GlassCard } from './glass-card';

const meta = {
  title: 'Components/Core/GlassCard',
  component: GlassCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    intensity: {
      control: 'select',
      options: ['subtle', 'medium', 'strong'],
      description: 'Glass intensity level',
    },
    glow: {
      control: 'select',
      options: ['none', 'blue', 'violet', 'cyan'],
      description: 'Glow effect color',
    },
    hover: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
  },
  args: {
    children: 'Card Content',
    className: 'p-6 w-80',
  },
} satisfies Meta<typeof GlassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Glass Card
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          A beautiful glassmorphism card component.
        </p>
      </div>
    ),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const SubtleIntensity: Story = {
  args: {
    intensity: 'subtle',
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Subtle Glass
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Lighter glass effect.
        </p>
      </div>
    ),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const StrongIntensity: Story = {
  args: {
    intensity: 'strong',
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Strong Glass
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          More pronounced glass effect.
        </p>
      </div>
    ),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const BlueGlow: Story = {
  args: {
    glow: 'blue',
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Blue Glow
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Card with blue glow effect.
        </p>
      </div>
    ),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const VioletGlow: Story = {
  args: {
    glow: 'violet',
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Violet Glow
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Card with violet glow effect.
        </p>
      </div>
    ),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const CyanGlow: Story = {
  args: {
    glow: 'cyan',
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Cyan Glow
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Card with cyan glow effect.
        </p>
      </div>
    ),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithHover: Story = {
  args: {
    hover: true,
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Hover Effect
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Hover over this card for effect.
        </p>
      </div>
    ),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllGlows: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassCard glow={null} className="p-4 w-40">
        <p style={{ color: 'var(--text-primary)' }}>No Glow</p>
      </GlassCard>
      <GlassCard glow="blue" className="p-4 w-40">
        <p style={{ color: 'var(--text-primary)' }}>Blue</p>
      </GlassCard>
      <GlassCard glow="violet" className="p-4 w-40">
        <p style={{ color: 'var(--text-primary)' }}>Violet</p>
      </GlassCard>
      <GlassCard glow="cyan" className="p-4 w-40">
        <p style={{ color: 'var(--text-primary)' }}>Cyan</p>
      </GlassCard>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllIntensities: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassCard intensity="subtle" className="p-4 w-40">
        <p style={{ color: 'var(--text-primary)' }}>Subtle</p>
      </GlassCard>
      <GlassCard intensity="medium" className="p-4 w-40">
        <p style={{ color: 'var(--text-primary)' }}>Medium</p>
      </GlassCard>
      <GlassCard intensity="strong" className="p-4 w-40">
        <p style={{ color: 'var(--text-primary)' }}>Strong</p>
      </GlassCard>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// GLASS VARIANTS (CSS Classes)
// ========================================

export const GlassVariant: Story = {
  render: () => (
    <div className="glass p-6 w-80 rounded-2xl">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Standard Glass
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          blur: 16px, saturation: 180%
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          className="glass rounded-2xl"
        </p>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const FrostedVariant: Story = {
  render: () => (
    <div className="frosted p-6 w-80 rounded-2xl">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Frosted Glass
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          blur: 32px, saturation: 100% - Matte finish
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          className="frosted rounded-2xl"
        </p>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const FlutedVariant: Story = {
  render: () => (
    <div className="fluted p-6 w-80 rounded-2xl">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Fluted Glass
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          blur: 16px, saturation: 120% - Ribbed effect
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          className="fluted rounded-2xl"
        </p>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const CrystalVariant: Story = {
  render: () => (
    <div className="crystal p-6 w-80 rounded-2xl">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Crystal Glass
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          blur: 8px, saturation: 200% - Crystal-clear
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          className="crystal rounded-2xl"
        </p>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllGlassVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-6 rounded-xl">
          <div className="space-y-2">
            <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Glass
            </h4>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Standard glassmorphism
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              blur: 16px, sat: 180%
            </p>
          </div>
        </div>
        <div className="frosted p-6 rounded-xl">
          <div className="space-y-2">
            <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Frosted
            </h4>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Matte finish
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              blur: 32px, sat: 100%
            </p>
          </div>
        </div>
        <div className="fluted p-6 rounded-xl">
          <div className="space-y-2">
            <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Fluted
            </h4>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Ribbed effect
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              blur: 16px, sat: 120%
            </p>
          </div>
        </div>
        <div className="crystal p-6 rounded-xl">
          <div className="space-y-2">
            <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Crystal
            </h4>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Crystal-clear
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              blur: 8px, sat: 200%
            </p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Use CSS classes: .glass, .frosted, .fluted, .crystal (+ rounded-xl/2xl)
        </p>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
