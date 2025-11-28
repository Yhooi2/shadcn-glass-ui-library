import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { GlassCard } from "./GlassCard";

const meta = {
  title: "Components/GlassCard",
  component: GlassCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    intensity: {
      control: "select",
      options: ["subtle", "medium", "strong"],
      description: "Glass intensity level",
    },
    glow: {
      control: "select",
      options: ["none", "blue", "violet", "cyan"],
      description: "Glow effect color",
    },
    hover: {
      control: "boolean",
      description: "Enable hover effects",
    },
  },
  args: {
    children: "Card Content",
    className: "p-6 w-80",
  },
} satisfies Meta<typeof GlassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Glass Card
        </h3>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
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
    intensity: "subtle",
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Subtle Glass
        </h3>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
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
    intensity: "strong",
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Strong Glass
        </h3>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
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
    glow: "blue",
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Blue Glow
        </h3>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
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
    glow: "violet",
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Violet Glow
        </h3>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
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
    glow: "cyan",
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Cyan Glow
        </h3>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
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
        <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Hover Effect
        </h3>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
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
      <GlassCard glow="none" className="p-4 w-40">
        <p style={{ color: "var(--text-primary)" }}>No Glow</p>
      </GlassCard>
      <GlassCard glow="blue" className="p-4 w-40">
        <p style={{ color: "var(--text-primary)" }}>Blue</p>
      </GlassCard>
      <GlassCard glow="violet" className="p-4 w-40">
        <p style={{ color: "var(--text-primary)" }}>Violet</p>
      </GlassCard>
      <GlassCard glow="cyan" className="p-4 w-40">
        <p style={{ color: "var(--text-primary)" }}>Cyan</p>
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
        <p style={{ color: "var(--text-primary)" }}>Subtle</p>
      </GlassCard>
      <GlassCard intensity="medium" className="p-4 w-40">
        <p style={{ color: "var(--text-primary)" }}>Medium</p>
      </GlassCard>
      <GlassCard intensity="strong" className="p-4 w-40">
        <p style={{ color: "var(--text-primary)" }}>Strong</p>
      </GlassCard>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
