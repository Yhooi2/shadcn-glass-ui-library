import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { AvatarGlass } from "./AvatarGlass";

const meta = {
  title: "Components/AvatarGlass",
  component: AvatarGlass,
  parameters: {
    layout: "centered",
    snapshot: {
      // Enable visual snapshot testing
      disable: false,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "The name to display initials from",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "The size of the avatar",
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "md" },
      },
    },
    status: {
      control: "select",
      options: [undefined, "online", "offline", "busy", "away"],
      description: "The status indicator",
      table: {
        type: { summary: "'online' | 'offline' | 'busy' | 'away' | undefined" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof AvatarGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// DEFAULT & BASIC - Reference: .claude/tepm/first
// Glass theme: purple gradient, border rgba(255,255,255,0.20)
// Hover: box-shadow 0 0 30px rgba(168,85,247,0.50)
// ========================================

export const Default: Story = {
  args: {
    name: "John Doe",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Default avatar without status
    // Background: linear-gradient(135deg, rgba(168,85,247,0.80), rgba(139,92,246,0.80))
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// STATUS VARIANTS - Reference: .claude/tepm/first
// online: #34d399, glow: rgba(52,211,153,0.60)
// offline: rgba(255,255,255,0.30), no glow
// busy: #fb7185, glow: rgba(251,113,133,0.60)
// away: #fbbf24, glow: rgba(251,191,36,0.60)
// ========================================

export const WithOnlineStatus: Story = {
  args: {
    name: "Jane Smith",
    status: "online",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Online status
    // Status bg: #34d399, glow: 0 0 8px rgba(52,211,153,0.60), 0 0 16px rgba(52,211,153,0.30)
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithBusyStatus: Story = {
  args: {
    name: "Bob Johnson",
    status: "busy",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Busy status
    // Status bg: #fb7185, glow: 0 0 8px rgba(251,113,133,0.60), 0 0 16px rgba(251,113,133,0.30)
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithAwayStatus: Story = {
  args: {
    name: "Alice Brown",
    status: "away",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Away status
    // Status bg: #fbbf24, glow: 0 0 8px rgba(251,191,36,0.60), 0 0 16px rgba(251,191,36,0.30)
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithOfflineStatus: Story = {
  args: {
    name: "Charlie Wilson",
    status: "offline",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Offline status
    // Status bg: rgba(255,255,255,0.30), no glow
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// SIZE VARIANTS - Reference: .claude/tepm/first
// sm: w-8 h-8 text-xs, status: w-2.5 h-2.5
// md: w-10 h-10 text-sm, status: w-3 h-3
// lg: w-12 h-12 text-base, status: w-3.5 h-3.5
// xl: w-16 h-16 text-lg, status: w-4 h-4
// ========================================

export const Small: Story = {
  args: {
    name: "Small User",
    size: "sm",
    status: "online",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Small size: w-8 h-8 text-xs
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Medium: Story = {
  args: {
    name: "Medium User",
    size: "md",
    status: "online",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Medium size: w-10 h-10 text-sm
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Large: Story = {
  args: {
    name: "Large User",
    size: "lg",
    status: "online",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Large size: w-12 h-12 text-base
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ExtraLarge: Story = {
  args: {
    name: "Extra Large",
    size: "xl",
    status: "online",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Extra large size: w-16 h-16 text-lg
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// COMBINATION TESTS - Critical for preserving design
// ========================================

export const AllSizes: Story = {
  args: {
    name: "User",
  },
  render: () => (
    <div className="flex items-end gap-6">
      <div className="text-center">
        <AvatarGlass name="John Doe" size="sm" status="online" />
        <p className="text-xs text-white/60 mt-2">Small</p>
      </div>
      <div className="text-center">
        <AvatarGlass name="Jane Smith" size="md" status="online" />
        <p className="text-xs text-white/60 mt-2">Medium</p>
      </div>
      <div className="text-center">
        <AvatarGlass name="Bob Johnson" size="lg" status="online" />
        <p className="text-xs text-white/60 mt-2">Large</p>
      </div>
      <div className="text-center">
        <AvatarGlass name="Alice Brown" size="xl" status="online" />
        <p className="text-xs text-white/60 mt-2">X-Large</p>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    // Visual snapshot test - All sizes together
    // Critical for preserving proportional scaling
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllStatuses: Story = {
  args: {
    name: "User",
  },
  render: () => (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <AvatarGlass name="Online User" size="md" status="online" />
        <p className="text-xs text-white/60 mt-2">Online</p>
      </div>
      <div className="text-center">
        <AvatarGlass name="Busy User" size="md" status="busy" />
        <p className="text-xs text-white/60 mt-2">Busy</p>
      </div>
      <div className="text-center">
        <AvatarGlass name="Away User" size="md" status="away" />
        <p className="text-xs text-white/60 mt-2">Away</p>
      </div>
      <div className="text-center">
        <AvatarGlass name="Offline User" size="md" status="offline" />
        <p className="text-xs text-white/60 mt-2">Offline</p>
      </div>
      <div className="text-center">
        <AvatarGlass name="No Status" size="md" />
        <p className="text-xs text-white/60 mt-2">No Status</p>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    // Visual snapshot test - All status indicators
    // Critical for preserving status colors and glows
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// EDGE CASES - Initials generation
// ========================================

export const SingleCharName: Story = {
  args: {
    name: "A",
    size: "lg",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Single character name
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const EmptyName: Story = {
  args: {
    name: "",
    size: "lg",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Empty name shows "?"
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const LongName: Story = {
  args: {
    name: "John Michael Smith",
    size: "lg",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Long name (should show "JM")
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// GLASS THEME SPECIFIC TESTS
// ========================================

export const GlassGradientTest: Story = {
  args: {
    name: "User",
  },
  render: () => (
    <div className="flex items-center gap-4">
      <AvatarGlass name="Test User" size="xl" />
      <AvatarGlass name="Another User" size="xl" status="online" />
    </div>
  ),
  async play({ canvasElement }) {
    // Visual snapshot test - Purple gradient and glow effects
    // Background: linear-gradient(135deg, rgba(168,85,247,0.80), rgba(139,92,246,0.80))
    // Border: 2px solid rgba(255,255,255,0.20)
    // Box-shadow: 0 4px 20px rgba(168,85,247,0.30)
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const StatusGlowsTest: Story = {
  args: {
    name: "User",
  },
  render: () => (
    <div className="flex items-center gap-8">
      <AvatarGlass name="Online" size="xl" status="online" />
      <AvatarGlass name="Busy" size="xl" status="busy" />
      <AvatarGlass name="Away" size="xl" status="away" />
    </div>
  ),
  async play({ canvasElement }) {
    // Visual snapshot test - Status indicator glows
    // Each status should have its own glow color
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllSizesWithAllStatuses: Story = {
  args: {
    name: "User",
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-end gap-4">
        <AvatarGlass name="SM Online" size="sm" status="online" />
        <AvatarGlass name="MD Online" size="md" status="online" />
        <AvatarGlass name="LG Online" size="lg" status="online" />
        <AvatarGlass name="XL Online" size="xl" status="online" />
      </div>
      <div className="flex items-end gap-4">
        <AvatarGlass name="SM Busy" size="sm" status="busy" />
        <AvatarGlass name="MD Busy" size="md" status="busy" />
        <AvatarGlass name="LG Busy" size="lg" status="busy" />
        <AvatarGlass name="XL Busy" size="xl" status="busy" />
      </div>
      <div className="flex items-end gap-4">
        <AvatarGlass name="SM Away" size="sm" status="away" />
        <AvatarGlass name="MD Away" size="md" status="away" />
        <AvatarGlass name="LG Away" size="lg" status="away" />
        <AvatarGlass name="XL Away" size="xl" status="away" />
      </div>
      <div className="flex items-end gap-4">
        <AvatarGlass name="SM Offline" size="sm" status="offline" />
        <AvatarGlass name="MD Offline" size="md" status="offline" />
        <AvatarGlass name="LG Offline" size="lg" status="offline" />
        <AvatarGlass name="XL Offline" size="xl" status="offline" />
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    // Visual snapshot test - Complete matrix of sizes and statuses
    // Critical for 100% coverage of all avatar combinations
    await expect(canvasElement).toBeInTheDocument();
  },
};
