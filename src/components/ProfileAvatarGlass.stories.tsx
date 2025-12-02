import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { ProfileAvatarGlass } from "./ProfileAvatarGlass";

const meta = {
  title: "Glass/Composite/ProfileAvatarGlass",
  component: ProfileAvatarGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    initials: {
      control: "text",
      description: "User initials to display",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Avatar size",
    },
    status: {
      control: "select",
      options: ["online", "offline", "busy", "away"],
      description: "User status indicator",
    },
    glowing: {
      control: "boolean",
      description: "Enable glow pulse animation",
    },
  },
} satisfies Meta<typeof ProfileAvatarGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initials: "JD",
    size: "lg",
    status: "online",
    glowing: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: {
    initials: "AB",
    size: "sm",
    status: "online",
    glowing: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Medium: Story = {
  args: {
    initials: "CD",
    size: "md",
    status: "away",
    glowing: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ExtraLarge: Story = {
  args: {
    initials: "XL",
    size: "xl",
    status: "online",
    glowing: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const OnlineStatus: Story = {
  args: {
    initials: "OK",
    size: "lg",
    status: "online",
    glowing: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const OfflineStatus: Story = {
  args: {
    initials: "OF",
    size: "lg",
    status: "offline",
    glowing: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const BusyStatus: Story = {
  args: {
    initials: "BS",
    size: "lg",
    status: "busy",
    glowing: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AwayStatus: Story = {
  args: {
    initials: "AW",
    size: "lg",
    status: "away",
    glowing: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithoutGlow: Story = {
  args: {
    initials: "NG",
    size: "lg",
    status: "online",
    glowing: false,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithoutStatus: Story = {
  args: {
    initials: "NS",
    size: "lg",
    glowing: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllSizes: Story = {
  args: {
    initials: "SZ",
  },
  render: () => (
    <div className="flex items-center gap-6">
      <ProfileAvatarGlass initials="SM" size="sm" status="online" />
      <ProfileAvatarGlass initials="MD" size="md" status="away" />
      <ProfileAvatarGlass initials="LG" size="lg" status="busy" />
      <ProfileAvatarGlass initials="XL" size="xl" status="online" />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllStatuses: Story = {
  args: {
    initials: "ST",
  },
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <ProfileAvatarGlass initials="ON" size="lg" status="online" />
        <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Online</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ProfileAvatarGlass initials="OF" size="lg" status="offline" />
        <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Offline</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ProfileAvatarGlass initials="BS" size="lg" status="busy" />
        <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Busy</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ProfileAvatarGlass initials="AW" size="lg" status="away" />
        <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Away</span>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
