import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { fn } from "storybook/test";
import { AICardGlass } from "./AICardGlass";

const meta = {
  title: "Glass/Composite/AICardGlass",
  component: AICardGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onGenerate: {
      description: "Callback when generate button is clicked",
    },
    features: {
      description: "Array of feature strings to display",
    },
    estimatedTime: {
      control: "text",
      description: "Estimated generation time",
    },
  },
} satisfies Meta<typeof AICardGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onGenerate: fn(),
    features: [
      "Code quality assessment",
      "Architecture patterns",
      "Best practices",
    ],
    estimatedTime: "~30 seconds",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ShortFeatureList: Story = {
  args: {
    onGenerate: fn(),
    features: [
      "Code analysis",
      "Security audit",
    ],
    estimatedTime: "~15 seconds",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ExtendedFeatureList: Story = {
  args: {
    onGenerate: fn(),
    features: [
      "Code quality assessment",
      "Architecture patterns",
      "Best practices",
      "Performance optimization",
      "Security vulnerabilities",
      "Test coverage analysis",
    ],
    estimatedTime: "~60 seconds",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const FastAnalysis: Story = {
  args: {
    onGenerate: fn(),
    features: [
      "Quick scan",
      "Basic metrics",
    ],
    estimatedTime: "~5 seconds",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const DeepAnalysis: Story = {
  args: {
    onGenerate: fn(),
    features: [
      "Comprehensive code review",
      "Detailed architecture analysis",
      "Advanced security scanning",
      "Performance profiling",
      "Dependency audit",
      "Technical debt assessment",
    ],
    estimatedTime: "~2 minutes",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithoutCallback: Story = {
  args: {
    features: [
      "Code quality assessment",
      "Architecture patterns",
      "Best practices",
    ],
    estimatedTime: "~30 seconds",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
