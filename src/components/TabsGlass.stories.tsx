import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { useState } from "react";
import { TabsGlass } from "./TabsGlass";
import { GlassCard } from "./GlassCard";

const meta = {
  title: "Components/TabsGlass",
  component: TabsGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    activeTab: {
      control: "text",
      description: "Active tab ID",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof TabsGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs = [
  { id: "tab1", label: "Overview" },
  { id: "tab2", label: "Features" },
  { id: "tab3", label: "Settings" },
];

export const Default: Story = {
  args: {
    tabs: defaultTabs,
    activeTab: "tab1",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const SecondTabActive: Story = {
  args: {
    tabs: defaultTabs,
    activeTab: "tab2",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: [
      { id: "home", label: "Home" },
      { id: "profile", label: "Profile" },
      { id: "settings", label: "Settings" },
      { id: "notifications", label: "Notifications" },
      { id: "security", label: "Security" },
    ],
    activeTab: "home",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const TwoTabs: Story = {
  args: {
    tabs: [
      { id: "login", label: "Login" },
      { id: "register", label: "Register" },
    ],
    activeTab: "login",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const InteractiveTabsDemo = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "analytics", label: "Analytics" },
    { id: "reports", label: "Reports" },
    { id: "settings", label: "Settings" },
  ];

  const content: Record<string, string> = {
    overview: "This is the overview panel. Here you can see a summary of all your data.",
    analytics: "Analytics data and charts would be displayed here.",
    reports: "Generate and view reports from this panel.",
    settings: "Configure your preferences and account settings.",
  };

  return (
    <div className="w-[500px]">
      <TabsGlass tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <GlassCard className="mt-4 p-4">
        <p style={{ color: "var(--text-secondary)" }}>{content[activeTab]}</p>
      </GlassCard>
    </div>
  );
};

export const Interactive: Story = {
  args: {
    tabs: defaultTabs,
    activeTab: "tab1",
  },
  render: () => <InteractiveTabsDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const TabsWithContentDemo = () => {
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    { id: "account", label: "Account" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team" },
  ];

  return (
    <div className="w-[400px]">
      <TabsGlass tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <GlassCard className="mt-4 p-6">
        {activeTab === "account" && (
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Account Settings
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Manage your account information and preferences.
            </p>
          </div>
        )}
        {activeTab === "password" && (
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Password Settings
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Update your password and security options.
            </p>
          </div>
        )}
        {activeTab === "team" && (
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Team Settings
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Manage team members and permissions.
            </p>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export const WithContent: Story = {
  args: {
    tabs: defaultTabs,
    activeTab: "tab1",
  },
  render: () => <TabsWithContentDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
