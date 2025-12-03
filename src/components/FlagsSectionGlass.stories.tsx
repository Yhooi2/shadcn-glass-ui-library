import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { fn } from "storybook/test";
import { FlagsSectionGlass } from "./glass/sections/flags-section-glass";

const meta = {
  title: "Glass/Composite/FlagsSectionGlass",
  component: FlagsSectionGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    flags: {
      description: "Array of flag data with type, title, and description",
    },
    expanded: {
      control: "boolean",
      description: "Whether the section is expanded",
    },
    onToggle: {
      description: "Callback when toggle button is clicked",
    },
  },
} satisfies Meta<typeof FlagsSectionGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    flags: [
      { type: "warning", title: "High activity detected", description: "Unusual number of contributions" },
      { type: "danger", title: "Security issue detected", description: "Multiple failed login attempts" },
    ],
    expanded: false,
    onToggle: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Expanded: Story = {
  args: {
    flags: [
      { type: "warning", title: "High activity detected", description: "Unusual number of contributions" },
      { type: "danger", title: "Security issue detected", description: "Multiple failed login attempts" },
    ],
    expanded: true,
    onToggle: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const SingleFlag: Story = {
  args: {
    flags: [
      { type: "warning", title: "API rate limit approaching" },
    ],
    expanded: true,
    onToggle: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ManyFlags: Story = {
  args: {
    flags: [
      { type: "danger", title: "Security vulnerability", description: "Outdated dependencies detected" },
      { type: "warning", title: "Large repository size", description: "Repository exceeds 500MB" },
      { type: "danger", title: "Failed CI/CD pipeline", description: "Multiple test failures" },
      { type: "warning", title: "High activity detected", description: "Unusual commit frequency" },
      { type: "danger", title: "Suspicious login attempts", description: "Multiple failed authentications" },
    ],
    expanded: true,
    onToggle: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const OnlyWarnings: Story = {
  args: {
    flags: [
      { type: "warning", title: "Repository size warning", description: "Consider using Git LFS" },
      { type: "warning", title: "Code review pending", description: "3 PRs awaiting review" },
      { type: "warning", title: "Test coverage low", description: "Coverage below 80% threshold" },
    ],
    expanded: true,
    onToggle: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const OnlyDangers: Story = {
  args: {
    flags: [
      { type: "danger", title: "Critical security issue", description: "CVE-2024-1234 detected" },
      { type: "danger", title: "Build failure", description: "Production build failed" },
      { type: "danger", title: "Data breach detected", description: "Unauthorized access attempt" },
    ],
    expanded: true,
    onToggle: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const NoFlags: Story = {
  args: {
    flags: [],
    expanded: false,
    onToggle: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Interactive: Story = {
  args: {
    flags: [
      { type: "warning", title: "High activity detected", description: "Unusual number of contributions" },
      { type: "danger", title: "Security issue detected", description: "Multiple failed login attempts" },
      { type: "warning", title: "API rate limit approaching", description: "80% of quota used" },
    ],
  },
  render: function InteractiveFlagsSection() {
    const [expanded, setExpanded] = useState(false);
    return (
      <div className="flex flex-col gap-4 w-96">
        <FlagsSectionGlass
          flags={[
            { type: "warning", title: "High activity detected", description: "Unusual number of contributions" },
            { type: "danger", title: "Security issue detected", description: "Multiple failed login attempts" },
            { type: "warning", title: "API rate limit approaching", description: "80% of quota used" },
          ]}
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
        />
        <span style={{ color: "var(--text-muted)", fontSize: "12px", textAlign: "center" }}>
          Click to {expanded ? "collapse" : "expand"}
        </span>
      </div>
    );
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
