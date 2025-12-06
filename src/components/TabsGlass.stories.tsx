/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { useState } from "react";
import { TabsGlass } from "./glass/ui/tabs-glass";
import { GlassCard } from "./glass/ui/glass-card";

const meta = {
  title: "Components/TabsGlass",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultDemo = () => {
  const [value, setValue] = useState("tab1");
  return (
    <TabsGlass.Root value={value} onValueChange={setValue}>
      <TabsGlass.List>
        <TabsGlass.Trigger value="tab1">Overview</TabsGlass.Trigger>
        <TabsGlass.Trigger value="tab2">Features</TabsGlass.Trigger>
        <TabsGlass.Trigger value="tab3">Settings</TabsGlass.Trigger>
      </TabsGlass.List>
    </TabsGlass.Root>
  );
};

export const Default: Story = {
  render: () => <DefaultDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const SecondTabActiveDemo = () => {
  const [value, setValue] = useState("tab2");
  return (
    <TabsGlass.Root value={value} onValueChange={setValue}>
      <TabsGlass.List>
        <TabsGlass.Trigger value="tab1">Overview</TabsGlass.Trigger>
        <TabsGlass.Trigger value="tab2">Features</TabsGlass.Trigger>
        <TabsGlass.Trigger value="tab3">Settings</TabsGlass.Trigger>
      </TabsGlass.List>
    </TabsGlass.Root>
  );
};

export const SecondTabActive: Story = {
  render: () => <SecondTabActiveDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const ManyTabsDemo = () => {
  const [value, setValue] = useState("home");
  return (
    <TabsGlass.Root value={value} onValueChange={setValue}>
      <TabsGlass.List>
        <TabsGlass.Trigger value="home">Home</TabsGlass.Trigger>
        <TabsGlass.Trigger value="profile">Profile</TabsGlass.Trigger>
        <TabsGlass.Trigger value="settings">Settings</TabsGlass.Trigger>
        <TabsGlass.Trigger value="notifications">Notifications</TabsGlass.Trigger>
        <TabsGlass.Trigger value="security">Security</TabsGlass.Trigger>
      </TabsGlass.List>
    </TabsGlass.Root>
  );
};

export const ManyTabs: Story = {
  render: () => <ManyTabsDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const TwoTabsDemo = () => {
  const [value, setValue] = useState("login");
  return (
    <TabsGlass.Root value={value} onValueChange={setValue}>
      <TabsGlass.List>
        <TabsGlass.Trigger value="login">Login</TabsGlass.Trigger>
        <TabsGlass.Trigger value="register">Register</TabsGlass.Trigger>
      </TabsGlass.List>
    </TabsGlass.Root>
  );
};

export const TwoTabs: Story = {
  render: () => <TwoTabsDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const InteractiveTabsDemo = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const content: Record<string, string> = {
    overview: "This is the overview panel. Here you can see a summary of all your data.",
    analytics: "Analytics data and charts would be displayed here.",
    reports: "Generate and view reports from this panel.",
    settings: "Configure your preferences and account settings.",
  };

  return (
    <div className="w-[500px]">
      <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
        <TabsGlass.List>
          <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
          <TabsGlass.Trigger value="analytics">Analytics</TabsGlass.Trigger>
          <TabsGlass.Trigger value="reports">Reports</TabsGlass.Trigger>
          <TabsGlass.Trigger value="settings">Settings</TabsGlass.Trigger>
        </TabsGlass.List>
      </TabsGlass.Root>
      <GlassCard className="mt-4 p-4">
        <p style={{ color: "var(--text-secondary)" }}>{content[activeTab]}</p>
      </GlassCard>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTabsDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const TabsWithContentDemo = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="w-[400px]">
      <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
        <TabsGlass.List>
          <TabsGlass.Trigger value="account">Account</TabsGlass.Trigger>
          <TabsGlass.Trigger value="password">Password</TabsGlass.Trigger>
          <TabsGlass.Trigger value="team">Team</TabsGlass.Trigger>
        </TabsGlass.List>
      </TabsGlass.Root>
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
  render: () => <TabsWithContentDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// COMPOUND COMPONENT API (Week 4)
// New composition pattern for advanced use cases
// ========================================

export const CompoundBasic: Story = {
  name: "Compound API - Basic",
  args: {},
  render: () => {
    const [activeTab, setActiveTab] = useState("overview");

    return (
      <div className="max-w-2xl mx-auto p-8">
        <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
          <TabsGlass.List>
            <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
            <TabsGlass.Trigger value="analytics">Analytics</TabsGlass.Trigger>
            <TabsGlass.Trigger value="settings">Settings</TabsGlass.Trigger>
          </TabsGlass.List>

          <TabsGlass.Content value="overview">
            <GlassCard className="p-6 mt-4">
              <h3 className="font-semibold mb-2">Overview</h3>
              <p className="text-sm text-white/60">
                Welcome to the overview panel. This demonstrates the new compound component API
                for TabsGlass with granular control over structure and styling.
              </p>
            </GlassCard>
          </TabsGlass.Content>

          <TabsGlass.Content value="analytics">
            <GlassCard className="p-6 mt-4">
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-white/60">
                View detailed analytics and metrics here.
              </p>
            </GlassCard>
          </TabsGlass.Content>

          <TabsGlass.Content value="settings">
            <GlassCard className="p-6 mt-4">
              <h3 className="font-semibold mb-2">Settings</h3>
              <p className="text-sm text-white/60">
                Configure your preferences and options.
              </p>
            </GlassCard>
          </TabsGlass.Content>
        </TabsGlass.Root>
      </div>
    );
  },
};

export const CompoundVerticalLayout: Story = {
  name: "Compound API - Vertical Layout",
  args: {},
  render: () => {
    const [activeTab, setActiveTab] = useState("profile");

    return (
      <div className="max-w-4xl mx-auto p-8">
        <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
          <div className="grid grid-cols-4 gap-6">
            {/* Vertical tab list */}
            <TabsGlass.List className="flex-col items-stretch gap-2">
              <TabsGlass.Trigger value="profile" className="justify-start">
                Profile
              </TabsGlass.Trigger>
              <TabsGlass.Trigger value="account" className="justify-start">
                Account
              </TabsGlass.Trigger>
              <TabsGlass.Trigger value="notifications" className="justify-start">
                Notifications
              </TabsGlass.Trigger>
              <TabsGlass.Trigger value="security" className="justify-start">
                Security
              </TabsGlass.Trigger>
            </TabsGlass.List>

            {/* Content area */}
            <div className="col-span-3">
              <TabsGlass.Content value="profile">
                <GlassCard className="p-6">
                  <h3 className="font-semibold mb-2">Profile Settings</h3>
                  <p className="text-sm text-white/60">
                    Update your personal information and profile picture.
                  </p>
                </GlassCard>
              </TabsGlass.Content>

              <TabsGlass.Content value="account">
                <GlassCard className="p-6">
                  <h3 className="font-semibold mb-2">Account Settings</h3>
                  <p className="text-sm text-white/60">
                    Manage your account preferences and subscription.
                  </p>
                </GlassCard>
              </TabsGlass.Content>

              <TabsGlass.Content value="notifications">
                <GlassCard className="p-6">
                  <h3 className="font-semibold mb-2">Notification Settings</h3>
                  <p className="text-sm text-white/60">
                    Configure how and when you receive notifications.
                  </p>
                </GlassCard>
              </TabsGlass.Content>

              <TabsGlass.Content value="security">
                <GlassCard className="p-6">
                  <h3 className="font-semibold mb-2">Security Settings</h3>
                  <p className="text-sm text-white/60">
                    Manage your password, two-factor authentication, and security preferences.
                  </p>
                </GlassCard>
              </TabsGlass.Content>
            </div>
          </div>
        </TabsGlass.Root>
      </div>
    );
  },
};

export const CompoundWithIcons: Story = {
  name: "Compound API - With Icons",
  args: {},
  render: () => {
    const [activeTab, setActiveTab] = useState("home");

    return (
      <div className="max-w-2xl mx-auto p-8">
        <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
          <TabsGlass.List>
            <TabsGlass.Trigger value="home">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </TabsGlass.Trigger>
            <TabsGlass.Trigger value="dashboard">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Dashboard
            </TabsGlass.Trigger>
            <TabsGlass.Trigger value="messages">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Messages
            </TabsGlass.Trigger>
          </TabsGlass.List>

          <TabsGlass.Content value="home">
            <GlassCard className="p-6 mt-4">
              <p className="text-sm text-white/60">
                Tabs with custom icon content demonstrating the flexibility of the compound API.
              </p>
            </GlassCard>
          </TabsGlass.Content>

          <TabsGlass.Content value="dashboard">
            <GlassCard className="p-6 mt-4">
              <p className="text-sm text-white/60">
                Dashboard content with analytics and metrics.
              </p>
            </GlassCard>
          </TabsGlass.Content>

          <TabsGlass.Content value="messages">
            <GlassCard className="p-6 mt-4">
              <p className="text-sm text-white/60">
                Your message inbox and conversations.
              </p>
            </GlassCard>
          </TabsGlass.Content>
        </TabsGlass.Root>
      </div>
    );
  },
};

export const CompoundDisabledTabs: Story = {
  name: "Compound API - Disabled Tabs",
  args: {},
  render: () => {
    const [activeTab, setActiveTab] = useState("overview");

    return (
      <div className="max-w-2xl mx-auto p-8">
        <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
          <TabsGlass.List>
            <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
            <TabsGlass.Trigger value="premium" disabled>
              Premium (Locked)
            </TabsGlass.Trigger>
            <TabsGlass.Trigger value="settings">Settings</TabsGlass.Trigger>
          </TabsGlass.List>

          <TabsGlass.Content value="overview">
            <GlassCard className="p-6 mt-4">
              <h3 className="font-semibold mb-2">Overview</h3>
              <p className="text-sm text-white/60">
                Free tier content is available. Upgrade to access Premium features.
              </p>
            </GlassCard>
          </TabsGlass.Content>

          <TabsGlass.Content value="premium">
            <GlassCard className="p-6 mt-4">
              <h3 className="font-semibold mb-2">Premium Features</h3>
              <p className="text-sm text-white/60">
                This tab is disabled. Upgrade your plan to access.
              </p>
            </GlassCard>
          </TabsGlass.Content>

          <TabsGlass.Content value="settings">
            <GlassCard className="p-6 mt-4">
              <h3 className="font-semibold mb-2">Settings</h3>
              <p className="text-sm text-white/60">
                Configure your account preferences.
              </p>
            </GlassCard>
          </TabsGlass.Content>
        </TabsGlass.Root>
      </div>
    );
  },
};
