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
import { useTheme, type ThemeName } from '@/lib/theme-context';
import { AnimatedBackground } from '@/components/demos/AnimatedBackground';
import {
  HeaderNavGlass,
  MetricCardGlass,
  CircularMetricGlass,
  GlassCard,
  BadgeGlass,
  ProgressGlass,
  ButtonGlass,
} from '@/index';
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  Star,
  Sun,
  Moon,
  Palette,
} from 'lucide-react';

// ========================================
// META
// ========================================

const meta: Meta = {
  title: 'Examples/Use Cases/Dashboard',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A complete analytics dashboard showcasing metrics, KPIs, and data visualization using Glass UI components.',
      },
    },
  },
  tags: ['use-case', 'dashboard', 'analytics'],
};

export default meta;
type Story = StoryObj;

// ========================================
// THEME CONFIG
// ========================================

const themes: ThemeName[] = ['light', 'aurora', 'glass'];

const themeConfig: Record<ThemeName, { label: string; icon: typeof Sun }> = {
  light: { label: 'Light', icon: Sun },
  aurora: { label: 'Aurora', icon: Moon },
  glass: { label: 'Glass', icon: Palette },
};

// ========================================
// DASHBOARD COMPONENT
// ========================================

const Dashboard = () => {
  const { theme, cycleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
  const NextIcon = themeConfig[nextTheme].icon;

  return (
    <div className="min-h-screen font-sans">
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Page Header with Theme Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Analytics Dashboard
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <ButtonGlass variant="secondary" icon={NextIcon} onClick={cycleTheme}>
            {themeConfig[nextTheme].label}
          </ButtonGlass>
        </div>

        {/* Header */}
        <HeaderNavGlass onSearch={(query) => setSearchQuery(query)} username="Admin User" />

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
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Performance Score
            </h3>
            <div className="flex justify-around items-center">
              <CircularMetricGlass value={85} label="Overall" size="md" />
              <CircularMetricGlass value={92} label="Speed" size="sm" />
              <CircularMetricGlass value={78} label="SEO" size="sm" />
            </div>
          </GlassCard>

          {/* Activity Overview */}
          <GlassCard intensity="medium" className="p-6">
            <h3
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <Activity className="w-5 h-5" />
              Activity Overview
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: 'var(--text-secondary)' }}>Page Views</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    45.2K
                  </span>
                </div>
                <ProgressGlass value={78} gradient="blue" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: 'var(--text-secondary)' }}>Sessions</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    12.8K
                  </span>
                </div>
                <ProgressGlass value={65} gradient="emerald" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: 'var(--text-secondary)' }}>Bounce Rate</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    32.4%
                  </span>
                </div>
                <ProgressGlass value={32} gradient="rose" />
              </div>
            </div>
          </GlassCard>

          {/* Top Products */}
          <GlassCard intensity="medium" className="p-6">
            <h3
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
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
                    <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                      {product.name}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {product.sales} sales
                    </div>
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
        <GlassCard intensity="medium" className="p-6 max-w-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Recent Activity
            </h3>
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
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    {activity.action}
                  </span>
                </div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Search Results */}
        {searchQuery && (
          <div className="mt-6">
            <GlassCard intensity="medium" className="p-6 max-w-6xl">
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Search Results for "{searchQuery}"
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                No results found. Try a different search term.
              </p>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
};

// ========================================
// STORIES
// ========================================

export const Default: Story = {
  render: () => <Dashboard />,
};

export const WithSearchQuery: Story = {
  render: () => {
    const DashboardWithSearch = () => {
      const { theme, cycleTheme } = useTheme();
      const [searchQuery, setSearchQuery] = useState('analytics');

      const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
      const NextIcon = themeConfig[nextTheme].icon;

      return (
        <div className="min-h-screen font-sans">
          <AnimatedBackground />

          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Analytics Dashboard
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>Search Results</p>
              </div>
              <ButtonGlass variant="secondary" icon={NextIcon} onClick={cycleTheme}>
                {themeConfig[nextTheme].label}
              </ButtonGlass>
            </div>

            <HeaderNavGlass onSearch={setSearchQuery} username="Admin User" />

            <div className="mt-6">
              <GlassCard intensity="medium" className="p-6 max-w-6xl">
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Search Results for "{searchQuery}"
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>Showing results for your query...</p>
              </GlassCard>
            </div>
          </div>
        </div>
      );
    };
    return <DashboardWithSearch />;
  },
};
