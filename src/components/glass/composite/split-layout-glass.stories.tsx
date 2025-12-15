import type { Meta, StoryObj } from '@storybook/react-vite';
import { SplitLayoutGlass } from './split-layout-glass';
import { BadgeGlass } from '@/components/glass/ui/badge-glass';
import { ProgressGlass } from '@/components/glass/specialized/progress-glass';
import { TrendingUp, Calendar, GitBranch, Star } from 'lucide-react';

const meta = {
  title: 'Components/Composite/SplitLayoutGlass',
  component: SplitLayoutGlass.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive two-column layout with sticky scroll behavior and glassmorphism styling. Perfect for documentation sites, dashboards, and analytics apps. Uses compound component API (SplitLayoutGlass.Root, SplitLayoutGlass.Sidebar, SplitLayoutGlass.Main, etc.).',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SplitLayoutGlass.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// STORY 1: Default
// ========================================

export const Default: Story = {
  render: () => (
    <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 2 }}>
      <SplitLayoutGlass.Sidebar>
        <SplitLayoutGlass.SidebarHeader>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Sidebar Header
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Navigate through sections
          </p>
        </SplitLayoutGlass.SidebarHeader>
        <SplitLayoutGlass.SidebarContent>
          <div className="space-y-2">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                style={{
                  background: i === 0 ? 'var(--semantic-primary-subtle)' : 'transparent',
                  color: 'var(--text-primary)',
                }}
              >
                Section {i + 1}
              </div>
            ))}
          </div>
        </SplitLayoutGlass.SidebarContent>
      </SplitLayoutGlass.Sidebar>
      <SplitLayoutGlass.Main>
        <SplitLayoutGlass.MainContent>
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Main Content Area
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
            This is the main content area with independent scrolling. When you scroll down, both
            panels will scroll together until they reach the sticky offset. After that, each panel
            scrolls independently.
          </p>
          {Array.from({ length: 20 }).map((_, i) => (
            <p
              key={i}
              className="text-base leading-relaxed mb-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. This is paragraph {i + 1}.
            </p>
          ))}
        </SplitLayoutGlass.MainContent>
      </SplitLayoutGlass.Main>
    </SplitLayoutGlass.Root>
  ),
};

// ========================================
// STORY 2: Intensity Variants
// ========================================

export const IntensityVariants: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Subtle Intensity (8px blur)
        </h3>
        <div style={{ height: '300px' }}>
          <SplitLayoutGlass.Provider intensity="subtle">
            <SplitLayoutGlass.Root>
              <SplitLayoutGlass.Sidebar>
                <SplitLayoutGlass.SidebarContent scrollable={false}>
                  <div style={{ color: 'var(--text-primary)' }}>Subtle blur sidebar</div>
                </SplitLayoutGlass.SidebarContent>
              </SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.Main>
                <SplitLayoutGlass.MainContent scrollable={false}>
                  <div style={{ color: 'var(--text-primary)' }}>Subtle blur main</div>
                </SplitLayoutGlass.MainContent>
              </SplitLayoutGlass.Main>
            </SplitLayoutGlass.Root>
          </SplitLayoutGlass.Provider>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Medium Intensity (16px blur) - Default
        </h3>
        <div style={{ height: '300px' }}>
          <SplitLayoutGlass.Provider intensity="medium">
            <SplitLayoutGlass.Root>
              <SplitLayoutGlass.Sidebar>
                <SplitLayoutGlass.SidebarContent scrollable={false}>
                  <div style={{ color: 'var(--text-primary)' }}>Medium blur sidebar</div>
                </SplitLayoutGlass.SidebarContent>
              </SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.Main>
                <SplitLayoutGlass.MainContent scrollable={false}>
                  <div style={{ color: 'var(--text-primary)' }}>Medium blur main</div>
                </SplitLayoutGlass.MainContent>
              </SplitLayoutGlass.Main>
            </SplitLayoutGlass.Root>
          </SplitLayoutGlass.Provider>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Strong Intensity (24px blur)
        </h3>
        <div style={{ height: '300px' }}>
          <SplitLayoutGlass.Provider intensity="strong">
            <SplitLayoutGlass.Root>
              <SplitLayoutGlass.Sidebar>
                <SplitLayoutGlass.SidebarContent scrollable={false}>
                  <div style={{ color: 'var(--text-primary)' }}>Strong blur sidebar</div>
                </SplitLayoutGlass.SidebarContent>
              </SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.Main>
                <SplitLayoutGlass.MainContent scrollable={false}>
                  <div style={{ color: 'var(--text-primary)' }}>Strong blur main</div>
                </SplitLayoutGlass.MainContent>
              </SplitLayoutGlass.Main>
            </SplitLayoutGlass.Root>
          </SplitLayoutGlass.Provider>
        </div>
      </div>
    </div>
  ),
};

// ========================================
// STORY 3: Ratio Variants
// ========================================

export const RatioVariants: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Equal (1:1) - 50% : 50%
        </h3>
        <div style={{ height: '250px' }}>
          <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 1 }}>
            <SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.SidebarContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>50% width</div>
              </SplitLayoutGlass.SidebarContent>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <SplitLayoutGlass.MainContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>50% width</div>
              </SplitLayoutGlass.MainContent>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Default (1:2) - 33% : 67%
        </h3>
        <div style={{ height: '250px' }}>
          <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 2 }}>
            <SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.SidebarContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>33% width</div>
              </SplitLayoutGlass.SidebarContent>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <SplitLayoutGlass.MainContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>67% width</div>
              </SplitLayoutGlass.MainContent>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Wide Main (1:3) - 25% : 75%
        </h3>
        <div style={{ height: '250px' }}>
          <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 3 }}>
            <SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.SidebarContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>25% width</div>
              </SplitLayoutGlass.SidebarContent>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <SplitLayoutGlass.MainContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>75% width</div>
              </SplitLayoutGlass.MainContent>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Wide Sidebar (2:1) - 67% : 33%
        </h3>
        <div style={{ height: '250px' }}>
          <SplitLayoutGlass.Root ratio={{ sidebar: 2, main: 1 }}>
            <SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.SidebarContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>67% width</div>
              </SplitLayoutGlass.SidebarContent>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <SplitLayoutGlass.MainContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>33% width</div>
              </SplitLayoutGlass.MainContent>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </div>
      </div>
    </div>
  ),
};

// ========================================
// STORY 4: With Scrollable Content
// ========================================

export const WithScrollableContent: Story = {
  render: () => (
    <div style={{ height: '100vh', padding: '1rem' }}>
      <SplitLayoutGlass.Root>
        <SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.SidebarHeader>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Navigation
            </h3>
          </SplitLayoutGlass.SidebarHeader>
          <SplitLayoutGlass.SidebarContent>
            <div className="space-y-2">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="p-2 rounded hover:bg-muted transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <div className="font-medium">Item {i + 1}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Description for item {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </SplitLayoutGlass.SidebarContent>
        </SplitLayoutGlass.Sidebar>
        <SplitLayoutGlass.Main>
          <SplitLayoutGlass.MainContent>
            <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Independent Scrolling Demo
            </h1>
            <p className="text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
              Try scrolling in either panel. Each one scrolls independently after the sticky offset
              is reached. This is perfect for documentation sites where you want to keep both
              navigation and content visible.
            </p>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="mb-6">
                <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Section {i + 1}
                </h2>
                <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris.
                </p>
              </div>
            ))}
          </SplitLayoutGlass.MainContent>
        </SplitLayoutGlass.Main>
      </SplitLayoutGlass.Root>
    </div>
  ),
};

// ========================================
// STORY 5: Mobile Stack Layout
// ========================================

export const MobileStackLayout: Story = {
  render: () => (
    <SplitLayoutGlass.Root mobileLayout="stack">
      <SplitLayoutGlass.Sidebar>
        <SplitLayoutGlass.SidebarContent scrollable={false}>
          <h3 className="text-lg font-semibold mb-2">Sidebar</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            On mobile (&lt;768px), this appears above the main content
          </p>
        </SplitLayoutGlass.SidebarContent>
      </SplitLayoutGlass.Sidebar>
      <SplitLayoutGlass.Main>
        <SplitLayoutGlass.MainContent scrollable={false}>
          <h3 className="text-lg font-semibold mb-2">Main</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            On desktop (≥768px), this appears beside the sidebar
          </p>
        </SplitLayoutGlass.MainContent>
      </SplitLayoutGlass.Main>
    </SplitLayoutGlass.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'On mobile, sidebar stacks above main content. Resize the window to see the responsive behavior.',
      },
    },
  },
};

// ========================================
// STORY 6: Mobile Main Only
// ========================================

export const MobileMainOnly: Story = {
  render: () => (
    <SplitLayoutGlass.Root mobileLayout="main-only">
      <SplitLayoutGlass.Sidebar>
        <SplitLayoutGlass.SidebarContent scrollable={false}>
          <h3 className="text-lg font-semibold mb-2">Complex Filters</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Hidden on mobile, visible on desktop
          </p>
        </SplitLayoutGlass.SidebarContent>
      </SplitLayoutGlass.Sidebar>
      <SplitLayoutGlass.Main>
        <SplitLayoutGlass.MainContent scrollable={false}>
          <h3 className="text-lg font-semibold mb-2">Product List</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Always visible on all screen sizes
          </p>
        </SplitLayoutGlass.MainContent>
      </SplitLayoutGlass.Main>
    </SplitLayoutGlass.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Sidebar is hidden on mobile, showing only the main content. Useful for e-commerce or dashboards where filters are desktop-only.',
      },
    },
  },
};

// ========================================
// STORY 7: Custom Gap
// ========================================

export const CustomGap: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Small Gap (8px)
        </h3>
        <div style={{ height: '200px' }}>
          <SplitLayoutGlass.Root gap={8}>
            <SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.SidebarContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>Sidebar</div>
              </SplitLayoutGlass.SidebarContent>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <SplitLayoutGlass.MainContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>Main</div>
              </SplitLayoutGlass.MainContent>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Large Gap (40px)
        </h3>
        <div style={{ height: '200px' }}>
          <SplitLayoutGlass.Root gap={40}>
            <SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.SidebarContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>Sidebar</div>
              </SplitLayoutGlass.SidebarContent>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <SplitLayoutGlass.MainContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>Main</div>
              </SplitLayoutGlass.MainContent>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Responsive Gap (12px mobile, 48px desktop)
        </h3>
        <div style={{ height: '200px' }}>
          <SplitLayoutGlass.Root gap={{ mobile: 12, desktop: 48 }}>
            <SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.SidebarContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>Sidebar</div>
              </SplitLayoutGlass.SidebarContent>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <SplitLayoutGlass.MainContent scrollable={false}>
                <div style={{ color: 'var(--text-primary)' }}>Main</div>
              </SplitLayoutGlass.MainContent>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </div>
      </div>
    </div>
  ),
};

// ========================================
// STORY 8: Different Breakpoint
// ========================================

export const DifferentBreakpoint: Story = {
  render: () => (
    <SplitLayoutGlass.Root breakpoint="lg">
      <SplitLayoutGlass.Sidebar>
        <SplitLayoutGlass.SidebarContent scrollable={false}>
          <h3 className="text-lg font-semibold mb-2">Sidebar</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Two-column layout activates at lg breakpoint (1024px) instead of default md (768px)
          </p>
        </SplitLayoutGlass.SidebarContent>
      </SplitLayoutGlass.Sidebar>
      <SplitLayoutGlass.Main>
        <SplitLayoutGlass.MainContent scrollable={false}>
          <h3 className="text-lg font-semibold mb-2">Main</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Resize the window to see the layout change at 1024px
          </p>
        </SplitLayoutGlass.MainContent>
      </SplitLayoutGlass.Main>
    </SplitLayoutGlass.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Uses lg breakpoint (1024px) instead of the default md (768px). Useful for content-heavy layouts that need more horizontal space earlier.',
      },
    },
  },
};

// ========================================
// STORY 9: Real-World Career Stats
// ========================================

export const RealWorldCareerStats: Story = {
  render: () => {
    const years = [
      { year: 2024, commits: 1247, prs: 89, contributions: 1336 },
      { year: 2023, commits: 2134, prs: 156, contributions: 2290 },
      { year: 2022, commits: 1876, prs: 134, contributions: 2010 },
      { year: 2021, commits: 1456, prs: 98, contributions: 1554 },
      { year: 2020, commits: 1123, prs: 67, contributions: 1190 },
    ];

    return (
      <div style={{ height: '100vh', padding: '1rem' }}>
        <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 2 }}>
          <SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.SidebarHeader>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Career Summary
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <BadgeGlass variant="success">Active</BadgeGlass>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  5 years
                </span>
              </div>
            </SplitLayoutGlass.SidebarHeader>
            <SplitLayoutGlass.SidebarContent>
              <div className="space-y-2">
                {years.map((y) => (
                  <div
                    key={y.year}
                    className="p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted"
                    style={{
                      background:
                        y.year === 2024 ? 'var(--semantic-primary-subtle)' : 'transparent',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {y.year}
                      </span>
                      <BadgeGlass variant="default" size="sm">
                        {y.contributions}
                      </BadgeGlass>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <GitBranch className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                        <span style={{ color: 'var(--text-secondary)' }}>{y.commits} commits</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Star className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                        <span style={{ color: 'var(--text-secondary)' }}>{y.prs} PRs</span>
                      </div>
                    </div>
                    <ProgressGlass
                      value={(y.contributions / years[0].contributions) * 100}
                      size="sm"
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>
            </SplitLayoutGlass.SidebarContent>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <SplitLayoutGlass.MainContent>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  2024 Contribution Details
                </h1>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" style={{ color: 'var(--semantic-success)' }} />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: 'var(--semantic-success)' }}
                  >
                    +18.2%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: 'var(--card-subtle-bg)',
                    borderColor: 'var(--card-subtle-border)',
                  }}
                >
                  <div className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                    Total Commits
                  </div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    1,247
                  </div>
                </div>
                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: 'var(--card-subtle-bg)',
                    borderColor: 'var(--card-subtle-border)',
                  }}
                >
                  <div className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                    Pull Requests
                  </div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    89
                  </div>
                </div>
                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: 'var(--card-subtle-bg)',
                    borderColor: 'var(--card-subtle-border)',
                  }}
                >
                  <div className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                    Contributors
                  </div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    1,336
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Monthly Breakdown
              </h2>
              <div className="space-y-4">
                {Array.from({ length: 12 }).map((_, i) => {
                  const month = new Date(2024, i).toLocaleDateString('en-US', {
                    month: 'long',
                  });
                  const commits = Math.floor(Math.random() * 150) + 50;
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <Calendar className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                      <span
                        className="w-24 text-sm font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {month}
                      </span>
                      <ProgressGlass value={(commits / 200) * 100} className="flex-1" />
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {commits} commits
                      </span>
                    </div>
                  );
                })}
              </div>
            </SplitLayoutGlass.MainContent>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Real-world example inspired by GitHub Analytics. Shows career stats with a sidebar for year navigation and main panel for detailed breakdown.',
      },
    },
  },
};

// ========================================
// STORY 10: Complete Showcase
// ========================================

export const CompleteShowcase: Story = {
  render: () => (
    <div className="p-8 space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Default Configuration
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Ratio 1:2 (33%/67%), medium intensity, 300px min sidebar width
        </p>
        <div style={{ height: '400px' }}>
          <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 2 }}>
            <SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.SidebarHeader>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Navigation
                </h3>
              </SplitLayoutGlass.SidebarHeader>
              <SplitLayoutGlass.SidebarContent>
                <div className="space-y-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-2 rounded hover:bg-muted"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Section {i + 1}
                    </div>
                  ))}
                </div>
              </SplitLayoutGlass.SidebarContent>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <SplitLayoutGlass.MainContent>
                <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Content Area
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Independent scrolling with sticky behavior
                </p>
              </SplitLayoutGlass.MainContent>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Narrow Sidebar (1:3 ratio, 250px-350px width)
        </h2>
        <div style={{ height: '300px' }}>
          <SplitLayoutGlass.Provider intensity="strong">
            <SplitLayoutGlass.Root
              ratio={{ sidebar: 1, main: 3 }}
              minSidebarWidth="250px"
              maxSidebarWidth="350px"
            >
              <SplitLayoutGlass.Sidebar>
                <SplitLayoutGlass.SidebarContent scrollable={false}>
                  <div style={{ color: 'var(--text-primary)' }}>
                    Narrow sidebar (25% width, max 350px)
                  </div>
                </SplitLayoutGlass.SidebarContent>
              </SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.Main>
                <SplitLayoutGlass.MainContent scrollable={false}>
                  <div style={{ color: 'var(--text-primary)' }}>Wide main area (75% width)</div>
                </SplitLayoutGlass.MainContent>
              </SplitLayoutGlass.Main>
            </SplitLayoutGlass.Root>
          </SplitLayoutGlass.Provider>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Custom Styling
        </h2>
        <div style={{ height: '300px' }}>
          <SplitLayoutGlass.Provider intensity="subtle" stickyOffset={16}>
            <SplitLayoutGlass.Root gap={{ mobile: 8, desktop: 32 }}>
              <SplitLayoutGlass.Sidebar className="border-2 border-primary">
                <SplitLayoutGlass.SidebarContent scrollable={false}>
                  <div style={{ color: 'var(--text-primary)' }}>Sidebar with custom border</div>
                </SplitLayoutGlass.SidebarContent>
              </SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.Main className="border-2 border-success">
                <SplitLayoutGlass.MainContent scrollable={false}>
                  <div style={{ color: 'var(--text-primary)' }}>Main with custom border</div>
                </SplitLayoutGlass.MainContent>
              </SplitLayoutGlass.Main>
            </SplitLayoutGlass.Root>
          </SplitLayoutGlass.Provider>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive showcase of all features: default config, custom ratios, width constraints, intensity variants, and custom styling.',
      },
    },
  },
};
