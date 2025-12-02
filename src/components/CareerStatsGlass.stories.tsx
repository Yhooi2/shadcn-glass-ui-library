import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { CareerStatsGlass } from "./CareerStatsGlass";

const meta = {
  title: "Glass/Composite/CareerStatsGlass",
  component: CareerStatsGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    totalCommits: {
      control: "number",
      description: "Total number of commits",
    },
    totalPRs: {
      control: "number",
      description: "Total number of pull requests",
    },
    totalRepos: {
      control: "number",
      description: "Total number of repositories",
    },
    years: {
      description: "Array of year data with progress",
    },
  },
} satisfies Meta<typeof CareerStatsGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalCommits: 2242,
    totalPRs: 47,
    totalRepos: 11,
    years: [
      { year: "2024", emoji: "🚀", label: "Peak Year", commits: "1,234 commits", progress: 95 },
      { year: "2023", emoji: "🔥", label: "High Activity", commits: "867 commits", progress: 75 },
      { year: "2022", emoji: "💼", label: "Steady Growth", commits: "141 commits", progress: 30 },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const SingleYear: Story = {
  args: {
    totalCommits: 345,
    totalPRs: 12,
    totalRepos: 3,
    years: [
      { year: "2024", emoji: "🌱", label: "Getting Started", commits: "345 commits", progress: 45 },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const LongCareer: Story = {
  args: {
    totalCommits: 8567,
    totalPRs: 234,
    totalRepos: 45,
    years: [
      { year: "2024", emoji: "🚀", label: "Peak Year", commits: "2,134 commits", progress: 95 },
      { year: "2023", emoji: "🔥", label: "High Activity", commits: "1,867 commits", progress: 85 },
      { year: "2022", emoji: "💼", label: "Steady Growth", commits: "1,456 commits", progress: 70 },
      { year: "2021", emoji: "📈", label: "Growth Phase", commits: "1,245 commits", progress: 60 },
      { year: "2020", emoji: "🌟", label: "Breakthrough", commits: "987 commits", progress: 45 },
      { year: "2019", emoji: "🌱", label: "Early Days", commits: "878 commits", progress: 35 },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithoutYears: Story = {
  args: {
    totalCommits: 2242,
    totalPRs: 47,
    totalRepos: 11,
    years: [],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const HighActivity: Story = {
  args: {
    totalCommits: 15234,
    totalPRs: 567,
    totalRepos: 89,
    years: [
      { year: "2024", emoji: "🔥", label: "Record Year", commits: "5,234 commits", progress: 100 },
      { year: "2023", emoji: "🚀", label: "Peak Performance", commits: "4,567 commits", progress: 92 },
      { year: "2022", emoji: "💪", label: "Strong Year", commits: "3,456 commits", progress: 78 },
      { year: "2021", emoji: "📊", label: "Consistent", commits: "1,977 commits", progress: 55 },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const LowActivity: Story = {
  args: {
    totalCommits: 234,
    totalPRs: 8,
    totalRepos: 2,
    years: [
      { year: "2024", emoji: "🌱", label: "Starting Out", commits: "134 commits", progress: 25 },
      { year: "2023", emoji: "📚", label: "Learning", commits: "100 commits", progress: 18 },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const TwoYears: Story = {
  args: {
    totalCommits: 1456,
    totalPRs: 34,
    totalRepos: 8,
    years: [
      { year: "2024", emoji: "🚀", label: "Accelerating", commits: "987 commits", progress: 68 },
      { year: "2023", emoji: "🌱", label: "Foundation", commits: "469 commits", progress: 32 },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
