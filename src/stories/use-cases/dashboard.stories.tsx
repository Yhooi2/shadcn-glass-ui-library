/**
 * Real-World Use Case: Dashboard Application
 *
 * Demonstrates a complete analytics dashboard with:
 * - Metric cards with progress indicators
 * - Circular metrics for KPIs
 * - Responsive grid layout
 * - Theme support (glass/light/aurora)
 * - Interactive elements
 *
 * Components used:
 * - HeaderNavGlass
 * - MetricCardGlass
 * - CircularMetricGlass
 * - MetricsGridGlass
 * - GlassCard
 * - BadgeGlass
 * - ProgressGlass
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProvider, type Theme } from '@/lib/theme-context';
import {
  HeaderNavGlass,
  MetricCardGlass,
  CircularMetricGlass,
  GlassCard,
  BadgeGlass,
  ProgressGlass,
  ButtonGlass,
} from '@/index';
import { TrendingUp, Users, DollarSign, ShoppingCart, Activity, Star } from 'lucide-react';

// ========================================
// META
// ========================================

// Extend story args to include theme
type StoryArgs = {
  theme: Theme;
};

const meta: Meta<StoryArgs> = {
  title: 'Use Cases/Dashboard Application',
  decorators: [
    (Story, context) => (
      <ThemeProvider defaultTheme={context.args.theme || 'glass'}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A complete analytics dashboard showcasing metrics, KPIs, and data visualization using Glass UI components.',
      },
    },
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['glass', 'light', 'aurora'],
      description: 'Theme variant for the dashboard',
      table: {
        type: { summary: 'ThemeName' },
        defaultValue: { summary: 'glass' },
      },
    },
  },
  tags: ['use-case', 'dashboard', 'analytics'],
};

export default meta;
type Story = StoryObj<StoryArgs>;

// ========================================
// DASHBOARD COMPONENT
// ========================================

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <HeaderNavGlass onSearch={(query) => setSearchQuery(query)} userName="Admin User" />

      {/* Page Title */}
      <div className="mt-8 mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-white/70">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Primary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCardGlass
          title="Total Revenue"
          value="$45,231"
          description="Monthly revenue"
          change={{ value: 12.5, direction: 'up', period: 'vs last month' }}
          variant="success"
          icon={<DollarSign className="w-4 h-4" />}
          sparklineData={[60, 65, 68, 70, 72, 73, 75]}
          progress={75}
          showProgress
          showSparkline
        />
        <MetricCardGlass
          title="Active Users"
          value="8,459"
          description="Total users"
          change={{ value: 5.2, direction: 'up', period: 'vs last month' }}
          variant="default"
          icon={<Users className="w-4 h-4" />}
          sparklineData={[70, 73, 76, 78, 79, 81, 82]}
          progress={82}
          showProgress
          showSparkline
        />
        <MetricCardGlass
          title="Total Orders"
          value="1,234"
          description="This month"
          change={{ value: 18.3, direction: 'up', period: 'vs last month' }}
          variant="default"
          icon={<ShoppingCart className="w-4 h-4" />}
          sparklineData={[50, 55, 58, 62, 65, 67, 68]}
          progress={68}
          showProgress
          showSparkline
        />
        <MetricCardGlass
          title="Conversion Rate"
          value="3.24%"
          description="Goal: 3.5%"
          change={{ value: 2.1, direction: 'up', period: 'vs last month' }}
          variant="success"
          icon={<TrendingUp className="w-4 h-4" />}
          sparklineData={[80, 83, 85, 87, 89, 90, 91]}
          progress={91}
          showProgress
          showSparkline
        />
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Circular Metrics */}
        <GlassCard intensity="medium" className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Performance Score</h3>
          <div className="flex justify-around items-center">
            <CircularMetricGlass value={85} label="Overall" size="lg" />
            <CircularMetricGlass value={92} label="Speed" size="md" />
            <CircularMetricGlass value={78} label="SEO" size="md" />
          </div>
        </GlassCard>

        {/* Activity Overview */}
        <GlassCard intensity="medium" className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Activity Overview
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/80">Page Views</span>
                <span className="text-white font-medium">45.2K</span>
              </div>
              <ProgressGlass value={78} gradient="blue" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/80">Sessions</span>
                <span className="text-white font-medium">12.8K</span>
              </div>
              <ProgressGlass value={65} gradient="emerald" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/80">Bounce Rate</span>
                <span className="text-white font-medium">32.4%</span>
              </div>
              <ProgressGlass value={32} gradient="rose" />
            </div>
          </div>
        </GlassCard>

        {/* Top Products */}
        <GlassCard intensity="medium" className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Top Products
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Premium Plan', sales: 523, badge: 'hot' },
              { name: 'Starter Pack', sales: 412, badge: 'new' },
              { name: 'Pro Bundle', sales: 387, badge: 'trending' },
            ].map((product, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{product.name}</div>
                  <div className="text-white/60 text-xs">{product.sales} sales</div>
                </div>
                <BadgeGlass
                  variant={
                    product.badge === 'hot'
                      ? 'destructive'
                      : product.badge === 'new'
                        ? 'success'
                        : 'info'
                  }
                >
                  {product.badge}
                </BadgeGlass>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent Activity Section */}
      <GlassCard intensity="medium" className="p-6 max-w-6xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <ButtonGlass variant="ghost" size="sm">
            View All
          </ButtonGlass>
        </div>
        <div className="space-y-3">
          {[
            {
              action: 'New user registered',
              time: '2 minutes ago',
              type: 'success',
            },
            {
              action: 'Order #1234 completed',
              time: '15 minutes ago',
              type: 'info',
            },
            {
              action: 'Payment failed for order #1235',
              time: '1 hour ago',
              type: 'warning',
            },
            {
              action: 'Server maintenance scheduled',
              time: '2 hours ago',
              type: 'default',
            },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === 'success'
                      ? 'bg-green-400'
                      : activity.type === 'warning'
                        ? 'bg-yellow-400'
                        : activity.type === 'info'
                          ? 'bg-blue-400'
                          : 'bg-gray-400'
                  }`}
                />
                <span className="text-white text-sm">{activity.action}</span>
              </div>
              <span className="text-white/60 text-xs">{activity.time}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Search Results */}
      {searchQuery && (
        <div className="mt-6">
          <GlassCard intensity="medium" className="p-6 max-w-6xl">
            <h3 className="text-lg font-semibold text-white mb-2">
              Search Results for "{searchQuery}"
            </h3>
            <p className="text-white/70 text-sm">No results found. Try a different search term.</p>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

// ========================================
// STORIES
// ========================================

export const Default: Story = {
  args: {
    theme: 'glass',
  },
  render: () => <Dashboard />,
};

export const WithSearchQuery: Story = {
  args: {
    theme: 'glass',
  },
  render: () => {
    const DashboardWithSearch = () => {
      const [searchQuery, setSearchQuery] = useState('analytics');
      return (
        <div className="min-h-screen p-6">
          <HeaderNavGlass onSearch={setSearchQuery} userName="Admin User" />
          <div className="mt-6">
            <GlassCard intensity="medium" className="p-6 max-w-6xl">
              <h3 className="text-lg font-semibold text-white mb-2">
                Search Results for "{searchQuery}"
              </h3>
              <p className="text-white/70 text-sm">Showing results for your query...</p>
            </GlassCard>
          </div>
        </div>
      );
    };
    return <DashboardWithSearch />;
  },
};

export const LightTheme: Story = {
  args: {
    theme: 'light',
  },
  render: () => <Dashboard />,
};

export const AuroraTheme: Story = {
  args: {
    theme: 'aurora',
  },
  render: () => <Dashboard />,
};
