import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { fn } from "storybook/test";
import { ProfileHeaderGlass } from "./glass/sections/profile-header-glass";

const meta = {
  title: "Glass/Composite/ProfileHeaderGlass",
  component: ProfileHeaderGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "User's full name",
    },
    username: {
      control: "text",
      description: "GitHub username",
    },
    joinDate: {
      control: "text",
      description: "Join date text",
    },
    stats: {
      description: "Profile statistics (repos, followers, following)",
    },
    languages: {
      description: "Array of language data",
    },
    onAIGenerate: {
      description: "Callback when AI generate button is clicked",
    },
  },
} satisfies Meta<typeof ProfileHeaderGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Artem Safronov",
    username: "Yhooi2",
    joinDate: "Jan 2023",
    stats: {
      repos: 11,
      followers: 1,
      following: 5,
    },
    languages: [
      { name: "TypeScript", percent: 45 },
      { name: "JavaScript", percent: 25 },
      { name: "Python", percent: 15 },
      { name: "HTML", percent: 10 },
      { name: "CSS", percent: 5 },
    ],
    onAIGenerate: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithoutLanguages: Story = {
  args: {
    name: "John Doe",
    username: "johndoe",
    joinDate: "Mar 2024",
    stats: {
      repos: 5,
      followers: 10,
      following: 8,
    },
    languages: [],
    onAIGenerate: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const PopularUser: Story = {
  args: {
    name: "Jane Smith",
    username: "janesmith",
    joinDate: "May 2020",
    stats: {
      repos: 234,
      followers: 1523,
      following: 89,
    },
    languages: [
      { name: "TypeScript", percent: 60 },
      { name: "JavaScript", percent: 25 },
      { name: "Go", percent: 10 },
      { name: "Rust", percent: 5 },
    ],
    onAIGenerate: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const NewUser: Story = {
  args: {
    name: "Alex Johnson",
    username: "alexj",
    joinDate: "Dec 2024",
    stats: {
      repos: 2,
      followers: 0,
      following: 3,
    },
    languages: [
      { name: "JavaScript", percent: 100 },
    ],
    onAIGenerate: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const PolyglotDeveloper: Story = {
  args: {
    name: "Maria Garcia",
    username: "mariadev",
    joinDate: "Feb 2019",
    stats: {
      repos: 87,
      followers: 456,
      following: 123,
    },
    languages: [
      { name: "TypeScript", percent: 20 },
      { name: "Python", percent: 18 },
      { name: "Java", percent: 15 },
      { name: "Go", percent: 12 },
      { name: "Rust", percent: 10 },
      { name: "Ruby", percent: 8 },
      { name: "PHP", percent: 7 },
      { name: "JavaScript", percent: 10 },
    ],
    onAIGenerate: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const MinimalStats: Story = {
  args: {
    name: "Bob Wilson",
    username: "bobw",
    joinDate: "Aug 2023",
    stats: {
      repos: 0,
      followers: 0,
      following: 0,
    },
    languages: [],
    onAIGenerate: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
