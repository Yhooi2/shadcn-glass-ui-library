import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { ProgressGlass } from "./glass/specialized/progress-glass";

const meta = {
  title: "Components/ProgressGlass",
  component: ProgressGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "Progress value (0-100)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    gradient: {
      control: "select",
      options: ["violet", "blue", "cyan", "amber", "emerald", "rose"],
      description: "Gradient color",
      table: {
        type: { summary: "'violet' | 'blue' | 'cyan' | 'amber' | 'emerald' | 'rose'" },
        defaultValue: { summary: "violet" },
      },
    },
    showLabel: {
      control: "boolean",
      description: "Show percentage label",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Progress bar height",
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "md" },
      },
    },
  },
  args: {
    className: "w-80",
  },
} satisfies Meta<typeof ProgressGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const VioletGradient: Story = {
  args: {
    value: 70,
    gradient: "violet",
    showLabel: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const BlueGradient: Story = {
  args: {
    value: 70,
    gradient: "blue",
    showLabel: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const CyanGradient: Story = {
  args: {
    value: 70,
    gradient: "cyan",
    showLabel: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AmberGradient: Story = {
  args: {
    value: 70,
    gradient: "amber",
    showLabel: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const EmeraldGradient: Story = {
  args: {
    value: 70,
    gradient: "emerald",
    showLabel: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const RoseGradient: Story = {
  args: {
    value: 70,
    gradient: "rose",
    showLabel: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllGradients: Story = {
  args: {
    value: 60,
  },
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Violet</span>
        <ProgressGlass value={80} gradient="violet" />
      </div>
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Blue</span>
        <ProgressGlass value={70} gradient="blue" />
      </div>
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Cyan</span>
        <ProgressGlass value={60} gradient="cyan" />
      </div>
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Amber</span>
        <ProgressGlass value={50} gradient="amber" />
      </div>
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Emerald</span>
        <ProgressGlass value={90} gradient="emerald" />
      </div>
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Rose</span>
        <ProgressGlass value={40} gradient="rose" />
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ProgressSteps: Story = {
  args: {
    value: 50,
  },
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>0%</span>
        <ProgressGlass value={0} />
      </div>
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>25%</span>
        <ProgressGlass value={25} />
      </div>
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>50%</span>
        <ProgressGlass value={50} />
      </div>
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>75%</span>
        <ProgressGlass value={75} />
      </div>
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>100%</span>
        <ProgressGlass value={100} />
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllSizes: Story = {
  args: {
    value: 70,
  },
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Small</span>
        <ProgressGlass value={70} size="sm" />
      </div>
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Medium</span>
        <ProgressGlass value={70} size="md" />
      </div>
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Large</span>
        <ProgressGlass value={70} size="lg" />
      </div>
      <div>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>XL</span>
        <ProgressGlass value={70} size="xl" />
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
