import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { YearCardGlass } from "./glass/composite/year-card-glass";

const meta = {
  title: "Glass/Composite/YearCardGlass",
  component: YearCardGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    year: {
      control: "text",
      description: "Year to display",
    },
    emoji: {
      control: "text",
      description: "Emoji icon",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    commits: {
      control: "text",
      description: "Commit count text",
    },
    progress: {
      control: { type: "range", min: 0, max: 100 },
      description: "Progress value (0-100)",
    },
    isExpanded: {
      control: "boolean",
      description: "Whether the card is expanded",
    },
    gradient: {
      control: "select",
      options: ["blue", "emerald", "violet", "rose", "amber"],
      description: "Progress bar gradient color",
    },
  },
} satisfies Meta<typeof YearCardGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: "2024",
    emoji: "🚀",
    label: "Peak Year",
    commits: "1,234 commits",
    progress: 85,
    isExpanded: false,
    gradient: "blue",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Expanded: Story = {
  args: {
    year: "2024",
    emoji: "🚀",
    label: "Peak Year",
    commits: "1,234",
    progress: 85,
    isExpanded: true,
    gradient: "blue",
    prs: 43,
    repos: 8,
    onShowYear: () => console.log("Filter repos for 2024"),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const HighActivity: Story = {
  args: {
    year: "2023",
    emoji: "🔥",
    label: "High Activity",
    commits: "2,567 commits",
    progress: 95,
    isExpanded: false,
    gradient: "emerald",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ModerateActivity: Story = {
  args: {
    year: "2022",
    emoji: "💼",
    label: "Steady Growth",
    commits: "845 commits",
    progress: 55,
    isExpanded: false,
    gradient: "violet",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const LowActivity: Story = {
  args: {
    year: "2021",
    emoji: "🌱",
    label: "Getting Started",
    commits: "234 commits",
    progress: 25,
    isExpanded: false,
    gradient: "amber",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Interactive: Story = {
  args: {
    year: "2024",
    emoji: "🚀",
    label: "Peak Year",
    commits: "1,234 commits",
    progress: 85,
    gradient: "blue",
  },
  render: function InteractiveYearCard() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <div className="flex flex-col gap-4 items-center">
        <YearCardGlass
          year="2024"
          emoji="🚀"
          label="Peak Year"
          commits="1,234"
          progress={85}
          gradient="blue"
          prs={43}
          repos={8}
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          onShowYear={() => console.log("Filter repos for 2024")}
        />
        <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>
          Click to {isExpanded ? "collapse" : "expand"}
        </span>
      </div>
    );
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Timeline: Story = {
  args: {
    year: "2024",
    emoji: "🚀",
    label: "Peak Year",
    commits: "1,234 commits",
    progress: 95,
  },
  render: () => (
    <div className="flex flex-col gap-3 w-80">
      <YearCardGlass
        year="2024"
        emoji="🚀"
        label="Peak Year"
        commits="1,234 commits"
        progress={95}
        gradient="emerald"
      />
      <YearCardGlass
        year="2023"
        emoji="🔥"
        label="High Activity"
        commits="2,567 commits"
        progress={85}
        gradient="blue"
      />
      <YearCardGlass
        year="2022"
        emoji="💼"
        label="Steady Growth"
        commits="845 commits"
        progress={55}
        gradient="violet"
      />
      <YearCardGlass
        year="2021"
        emoji="🌱"
        label="Getting Started"
        commits="234 commits"
        progress={25}
        gradient="amber"
      />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
