/**
 * Real-World Use Case: User Profile Page
 *
 * Demonstrates a complete user profile with:
 * - Profile header with avatar, bio, stats
 * - Language proficiency bars
 * - Career timeline with expandable year cards
 * - Repository list with filtering and sorting
 * - Responsive layout with mobile-first design
 * - Theme support (glass/light/aurora)
 *
 * Components used:
 * - ProfileHeaderGlass
 * - CareerStatsGlass
 * - ProjectsListGlass
 * - LanguageBarGlass
 * - BadgeGlass
 * - TabsGlass
 * - ButtonGlass
 * - GlassCard
 *
 * Accessibility features:
 * - ARIA labels for all interactive elements
 * - Keyboard navigation (Tab, Enter, Space, Arrow keys)
 * - Screen reader announcements for dynamic content
 * - Focus management and visible focus indicators
 * - Semantic HTML structure
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useTheme, type ThemeName } from '@/lib/theme-context';
import { AnimatedBackground } from '@/components/glass/specialized/animated-background-glass';
import {
  ProfileHeaderGlass,
  CareerStatsGlass,
  ProjectsListGlass,
  LanguageBarGlass,
  BadgeGlass,
  TabsGlass,
  ButtonGlass,
  GlassCard,
  InputGlass,
} from '@/index';
import type { Repository } from '@/components/glass/sections/projects-list-glass';
import { Edit, Save, X, Sun, Moon, Palette } from 'lucide-react';

// ========================================
// META
// ========================================

const meta: Meta = {
  title: 'Examples/Use Cases/User Profile',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive user profile page showcasing developer stats, career timeline, language proficiency, and repository management.',
      },
    },
  },
  tags: ['use-case', 'profile', 'dashboard'],
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
// DEMO DATA
// ========================================

const demoRepositories: Repository[] = [
  {
    name: 'react-dashboard',
    flagType: 'green',
    stars: 234,
    commits: 456,
    contribution: 100,
    languages: 'TypeScript 78% · CSS 22%',
    issues: [],
    ownership: 'your',
  },
  {
    name: 'api-gateway',
    flagType: 'green',
    stars: 145,
    commits: 289,
    contribution: 100,
    languages: 'Go 92% · Dockerfile 8%',
    issues: [],
    ownership: 'your',
  },
  {
    name: 'ml-pipeline',
    flagType: 'yellow',
    stars: 89,
    commits: 167,
    contribution: 100,
    languages: 'Python 95% · Shell 5%',
    issues: ['Uneven activity pattern'],
    ownership: 'your',
  },
  {
    name: 'design-system',
    flagType: 'green',
    stars: 512,
    commits: 678,
    contribution: 85,
    languages: 'TypeScript 65% · CSS 35%',
    issues: [],
    ownership: 'contrib',
  },
  {
    name: 'mobile-app',
    flagType: 'red',
    stars: 23,
    commits: 45,
    contribution: 100,
    languages: 'Kotlin 88% · XML 12%',
    issues: ['Empty commits', 'Burst activity'],
    ownership: 'your',
  },
  {
    name: 'kubernetes-operator',
    flagType: 'green',
    stars: 178,
    commits: 234,
    contribution: 92,
    languages: 'Go 100%',
    issues: [],
    ownership: 'contrib',
  },
];

const demoLanguages = [
  { name: 'TypeScript', percent: 45 }, // Uses default --language-typescript
  { name: 'Python', percent: 25 }, // Uses default --language-python
  { name: 'Go', percent: 20 }, // Uses default --language-go
  { name: 'Rust', percent: 10 }, // Uses default --language-rust
];

// ========================================
// USER PROFILE COMPONENT
// ========================================

const UserProfile = () => {
  const { theme, cycleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(
    'Senior Software Engineer passionate about building scalable systems and elegant user experiences. Open source contributor and tech community advocate.'
  );
  const [editedBio, setEditedBio] = useState(bio);

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
  const NextIcon = themeConfig[nextTheme].icon;

  const handleSave = () => {
    setBio(editedBio);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedBio(bio);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen font-sans">
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <ButtonGlass variant="secondary" size="sm" icon={NextIcon} onClick={cycleTheme}>
            {themeConfig[nextTheme].label}
          </ButtonGlass>
        </div>

        {/* Profile Header */}
        <ProfileHeaderGlass
          name="Alex Developer"
          username="alexdev"
          joinDate="March 2020"
          stats={{
            repos: 42,
            followers: 1234,
            following: 567,
          }}
          languages={demoLanguages}
        />

        {/* Main Content Tabs */}
        <div className="mt-8">
          <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
            <TabsGlass.List aria-label="Profile sections">
              <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
              <TabsGlass.Trigger value="repositories">
                Repositories ({demoRepositories.length})
              </TabsGlass.Trigger>
              <TabsGlass.Trigger value="career">Career Timeline</TabsGlass.Trigger>
              <TabsGlass.Trigger value="about">About</TabsGlass.Trigger>
            </TabsGlass.List>

            {/* Overview Tab */}
            <TabsGlass.Content value="overview" className="mt-6 space-y-6">
              {/* Pinned Repositories */}
              <div>
                <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Pinned Repositories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {demoRepositories.slice(0, 4).map((repo) => (
                    <GlassCard key={repo.name} intensity="medium" className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {repo.name}
                        </h3>
                        <BadgeGlass
                          variant={
                            repo.flagType === 'green'
                              ? 'success'
                              : repo.flagType === 'yellow'
                                ? 'warning'
                                : 'destructive'
                          }
                        >
                          {repo.flagType}
                        </BadgeGlass>
                      </div>
                      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                        {repo.languages}
                      </p>
                      <div
                        className="flex items-center gap-4 text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <span>⭐ {repo.stars}</span>
                        <span>📝 {repo.commits} commits</span>
                        <span>{repo.contribution}%</span>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>

              {/* Activity Overview */}
              <div>
                <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Activity Overview
                </h2>
                <GlassCard intensity="medium" className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div
                        className="text-3xl font-bold mb-1"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        142
                      </div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Contributions this month
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-3xl font-bold mb-1"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        18
                      </div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Pull requests merged
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-3xl font-bold mb-1"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        5
                      </div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Active projects
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Language Proficiency */}
              <div>
                <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Language Proficiency
                </h2>
                <GlassCard intensity="medium" className="p-6">
                  <LanguageBarGlass languages={demoLanguages} />
                </GlassCard>
              </div>
            </TabsGlass.Content>

            {/* Repositories Tab */}
            <TabsGlass.Content value="repositories" className="mt-6">
              <ProjectsListGlass repositories={demoRepositories} />
            </TabsGlass.Content>

            {/* Career Timeline Tab */}
            <TabsGlass.Content value="career" className="mt-6">
              <CareerStatsGlass
                totalCommits={3715}
                totalPRs={156}
                totalRepos={45}
                years={[
                  {
                    year: '2024',
                    emoji: '🚀',
                    label: 'Breakthrough',
                    commits: '847',
                    progress: 85,
                    prs: 42,
                    repos: 12,
                  },
                  {
                    year: '2023',
                    emoji: '📈',
                    label: 'Growth',
                    commits: '1,234',
                    progress: 92,
                    prs: 56,
                    repos: 15,
                  },
                  {
                    year: '2022',
                    emoji: '🎯',
                    label: 'Focused',
                    commits: '956',
                    progress: 75,
                    prs: 38,
                    repos: 10,
                  },
                  {
                    year: '2021',
                    emoji: '🌱',
                    label: 'Starting',
                    commits: '678',
                    progress: 55,
                    prs: 20,
                    repos: 8,
                  },
                ]}
              />
            </TabsGlass.Content>

            {/* About Tab */}
            <TabsGlass.Content value="about" className="mt-6">
              <GlassCard intensity="medium" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    About
                  </h2>
                  {!isEditing ? (
                    <ButtonGlass
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      aria-label="Edit bio"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </ButtonGlass>
                  ) : (
                    <div className="flex gap-2">
                      <ButtonGlass
                        variant="success"
                        size="sm"
                        onClick={handleSave}
                        aria-label="Save changes"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </ButtonGlass>
                      <ButtonGlass
                        variant="ghost"
                        size="sm"
                        onClick={handleCancel}
                        aria-label="Cancel editing"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </ButtonGlass>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <InputGlass
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full"
                    aria-label="Edit bio"
                  />
                ) : (
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {bio}
                  </p>
                )}

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <BadgeGlass variant="info">Cloud Architecture</BadgeGlass>
                    <BadgeGlass variant="info">DevOps</BadgeGlass>
                    <BadgeGlass variant="info">Machine Learning</BadgeGlass>
                    <BadgeGlass variant="info">Open Source</BadgeGlass>
                    <BadgeGlass variant="info">Web Performance</BadgeGlass>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Achievements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <span className="text-2xl">🏆</span>
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                          Top Contributor
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Most contributions in 2023
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-2xl">⭐</span>
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                          1000+ Stars
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Across all repositories
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-2xl">🚀</span>
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                          Early Adopter
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Member since 2020
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TabsGlass.Content>
          </TabsGlass.Root>
        </div>
      </div>
    </div>
  );
};

// ========================================
// STORIES
// ========================================

/**
 * Default profile view showing the overview tab with pinned repositories,
 * activity stats, and language proficiency.
 */
export const Default: Story = {
  render: () => <UserProfile />,
};

/**
 * Profile in edit mode, allowing users to modify their bio and personal information.
 * Demonstrates form editing with save/cancel actions.
 */
export const EditMode: Story = {
  render: () => {
    const EditModeProfile = () => {
      const { theme, cycleTheme } = useTheme();
      const [activeTab, setActiveTab] = useState('about');
      const [bio, setBio] = useState(
        'Senior Software Engineer passionate about building scalable systems and elegant user experiences.'
      );

      const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
      const NextIcon = themeConfig[nextTheme].icon;

      return (
        <div className="min-h-screen font-sans">
          <AnimatedBackground />
          <div className="relative z-10 p-6">
            {/* Theme Toggle */}
            <div className="flex justify-end mb-6">
              <ButtonGlass variant="secondary" size="sm" icon={NextIcon} onClick={cycleTheme}>
                {themeConfig[nextTheme].label}
              </ButtonGlass>
            </div>
            <ProfileHeaderGlass
              name="Alex Developer"
              username="alexdev"
              joinDate="March 2020"
              stats={{
                repos: 42,
                followers: 1234,
                following: 567,
              }}
              languages={demoLanguages}
            />
            <div className="mt-8">
              <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
                <TabsGlass.List>
                  <TabsGlass.Trigger value="about">About</TabsGlass.Trigger>
                </TabsGlass.List>
                <TabsGlass.Content value="about" className="mt-6">
                  <GlassCard intensity="medium" className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2
                        className="text-xl font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        About
                      </h2>
                      <div className="flex gap-2">
                        <ButtonGlass variant="success" size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </ButtonGlass>
                        <ButtonGlass variant="ghost" size="sm">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </ButtonGlass>
                      </div>
                    </div>
                    <InputGlass
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="w-full"
                    />
                  </GlassCard>
                </TabsGlass.Content>
              </TabsGlass.Root>
            </div>
          </div>
        </div>
      );
    };
    return <EditModeProfile />;
  },
};

/**
 * Public view of the profile without edit capabilities.
 * Shows what other users see when viewing this profile.
 */
export const PublicView: Story = {
  render: () => {
    const PublicProfile = () => {
      const { theme, cycleTheme } = useTheme();
      const [activeTab, setActiveTab] = useState('overview');

      const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
      const NextIcon = themeConfig[nextTheme].icon;

      return (
        <div className="min-h-screen font-sans">
          <AnimatedBackground />
          <div className="relative z-10 p-6">
            {/* Theme Toggle */}
            <div className="flex justify-end mb-6">
              <ButtonGlass variant="secondary" size="sm" icon={NextIcon} onClick={cycleTheme}>
                {themeConfig[nextTheme].label}
              </ButtonGlass>
            </div>
            <ProfileHeaderGlass
              name="Alex Developer"
              username="alexdev"
              joinDate="March 2020"
              stats={{
                repos: 42,
                followers: 1234,
                following: 567,
              }}
              languages={demoLanguages}
            />
            <div className="mt-8">
              <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
                <TabsGlass.List>
                  <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
                  <TabsGlass.Trigger value="repositories">Repositories</TabsGlass.Trigger>
                </TabsGlass.List>
                <TabsGlass.Content value="overview" className="mt-6">
                  <GlassCard intensity="medium" className="p-6 text-center">
                    <p style={{ color: 'var(--text-secondary)' }}>
                      Public view - Edit controls hidden
                    </p>
                  </GlassCard>
                </TabsGlass.Content>
                <TabsGlass.Content value="repositories" className="mt-6">
                  <ProjectsListGlass repositories={demoRepositories} />
                </TabsGlass.Content>
              </TabsGlass.Root>
            </div>
          </div>
        </div>
      );
    };
    return <PublicProfile />;
  },
};

/**
 * Mobile-optimized view of the profile with responsive layout adjustments.
 * Tabs stack vertically, cards are full-width.
 */
export const MobileView: Story = {
  render: () => <UserProfile />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'Mobile layout with stacked tabs, full-width cards, and optimized spacing for smaller screens.',
      },
    },
  },
};
