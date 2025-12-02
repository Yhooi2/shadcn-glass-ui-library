import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { LanguageBarGlass } from "./LanguageBarGlass";

const meta = {
  title: "Glass/Composite/LanguageBarGlass",
  component: LanguageBarGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    languages: {
      description: "Array of language data with name, percentage, and optional color",
    },
    showLegend: {
      control: "boolean",
      description: "Show language legend below the bar",
    },
  },
} satisfies Meta<typeof LanguageBarGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleLanguage: Story = {
  args: {
    languages: [{ name: "TypeScript", percent: 100 }],
    showLegend: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const TwoLanguages: Story = {
  args: {
    languages: [
      { name: "TypeScript", percent: 68 },
      { name: "JavaScript", percent: 32 },
    ],
    showLegend: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const MultipleLanguages: Story = {
  args: {
    languages: [
      { name: "TypeScript", percent: 45 },
      { name: "JavaScript", percent: 25 },
      { name: "Python", percent: 15 },
      { name: "HTML", percent: 10 },
      { name: "CSS", percent: 5 },
    ],
    showLegend: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithoutLegend: Story = {
  args: {
    languages: [
      { name: "TypeScript", percent: 60 },
      { name: "JavaScript", percent: 25 },
      { name: "Python", percent: 15 },
    ],
    showLegend: false,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const CustomColors: Story = {
  args: {
    languages: [
      { name: "Rust", percent: 40, color: "bg-orange-600" },
      { name: "Go", percent: 35, color: "bg-cyan-500" },
      { name: "Ruby", percent: 25, color: "bg-red-600" },
    ],
    showLegend: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ManyLanguages: Story = {
  args: {
    languages: [
      { name: "TypeScript", percent: 30 },
      { name: "JavaScript", percent: 20 },
      { name: "Python", percent: 15 },
      { name: "Java", percent: 12 },
      { name: "Go", percent: 10 },
      { name: "Rust", percent: 8 },
      { name: "Ruby", percent: 5 },
    ],
    showLegend: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
