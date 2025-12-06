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
import { ThemeProvider, type Theme } from '@/lib/theme-context';
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
import { Edit, Save, X } from 'lucide-react';

// ========================================
// META
// ========================================

// Extend story args to include theme
type StoryArgs = {
  theme: Theme;
};

const meta: Meta<StoryArgs> = {
  title: 'Use Cases/User Profile Page',
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
          'A comprehensive user profile page showcasing developer stats, career timeline, language proficiency, and repository management.',
      },
    },
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['glass', 'light', 'aurora'],
      description: 'Theme variant for the user profile',
      table: {
        type: { summary: 'ThemeName' },
        defaultValue: { summary: 'glass' },
      },
    },
  },
  tags: ['use-case', 'profile', 'dashboard'],
};

export default meta;
type Story = StoryObj<StoryArgs>;

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
  { name: 'TypeScript', percentage: 45, color: '#3178c6' },
  { name: 'Python', percentage: 25, color: '#3776ab' },
  { name: 'Go', percentage: 20, color: '#00add8' },
  { name: 'Rust', percentage: 10, color: '#dea584' },
];

// ========================================
// USER PROFILE COMPONENT
// ========================================

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(
    'Senior Software Engineer passionate about building scalable systems and elegant user experiences. Open source contributor and tech community advocate.'
  );
  const [editedBio, setEditedBio] = useState(bio);

  const handleSave = () => {
    setBio(editedBio);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedBio(bio);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
        {/* Profile Header */}
        <ProfileHeaderGlass
          username="alexdev"
          bio={bio}
          avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
          joinDate="Joined March 2020"
          stats={{
            repositories: 42,
            contributions: 2847,
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
                <h2 className="text-xl font-semibold text-white mb-4">
                  Pinned Repositories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {demoRepositories.slice(0, 4).map((repo) => (
                    <GlassCard key={repo.name} intensity="medium" className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-semibold">{repo.name}</h3>
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
                      <p className="text-white/70 text-sm mb-3">{repo.languages}</p>
                      <div className="flex items-center gap-4 text-white/60 text-sm">
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
                <h2 className="text-xl font-semibold text-white mb-4">
                  Activity Overview
                </h2>
                <GlassCard intensity="medium" className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">142</div>
                      <div className="text-white/60 text-sm">Contributions this month</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">18</div>
                      <div className="text-white/60 text-sm">Pull requests merged</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">5</div>
                      <div className="text-white/60 text-sm">Active projects</div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Language Proficiency */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Language Proficiency
                </h2>
                <GlassCard intensity="medium" className="p-6">
                  <div className="space-y-4">
                    {demoLanguages.map((lang) => (
                      <LanguageBarGlass
                        key={lang.name}
                        language={lang.name}
                        percentage={lang.percentage}
                        color={lang.color}
                      />
                    ))}
                  </div>
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
                totalExperience="8 years 6 months"
                years={[
                  {
                    year: '2024',
                    contributions: 847,
                    repositories: 12,
                    issues: ['Consistent activity', 'High quality commits'],
                  },
                  {
                    year: '2023',
                    contributions: 1234,
                    repositories: 15,
                    issues: [],
                  },
                  {
                    year: '2022',
                    contributions: 956,
                    repositories: 10,
                    issues: ['Uneven activity in Q3'],
                  },
                  {
                    year: '2021',
                    contributions: 678,
                    repositories: 8,
                    issues: [],
                  },
                ]}
              />
            </TabsGlass.Content>

            {/* About Tab */}
            <TabsGlass.Content value="about" className="mt-6">
              <GlassCard intensity="medium" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">About</h2>
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
                  <p className="text-white/80 leading-relaxed">{bio}</p>
                )}

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    <BadgeGlass variant="info">Cloud Architecture</BadgeGlass>
                    <BadgeGlass variant="info">DevOps</BadgeGlass>
                    <BadgeGlass variant="info">Machine Learning</BadgeGlass>
                    <BadgeGlass variant="info">Open Source</BadgeGlass>
                    <BadgeGlass variant="info">Web Performance</BadgeGlass>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Achievements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <span className="text-2xl">🏆</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Top Contributor</div>
                        <div className="text-white/60 text-sm">
                          Most contributions in 2023
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-2xl">⭐</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">1000+ Stars</div>
                        <div className="text-white/60 text-sm">
                          Across all repositories
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-2xl">🚀</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Early Adopter</div>
                        <div className="text-white/60 text-sm">
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
  args: {
    theme: 'glass',
  },
  render: () => <UserProfile />,
};

/**
 * Profile in edit mode, allowing users to modify their bio and personal information.
 * Demonstrates form editing with save/cancel actions.
 */
export const EditMode: Story = {
  args: {
    theme: 'glass',
  },
  render: () => {
    const EditModeProfile = () => {
      const [activeTab, setActiveTab] = useState('about');
      const [bio, setBio] = useState(
        'Senior Software Engineer passionate about building scalable systems and elegant user experiences.'
      );

      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
          <ProfileHeaderGlass
            username="alexdev"
            bio={bio}
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
            joinDate="Joined March 2020"
            stats={{
              repositories: 42,
              contributions: 2847,
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
                    <h2 className="text-xl font-semibold text-white">About</h2>
                    <div className="flex gap-2">
                      <ButtonGlass variant="success" size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </ButtonGlass>
                      <ButtonGlass
                        variant="ghost"
                        size="sm"
                      >
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
  args: {
    theme: 'glass',
  },
  render: () => {
    const PublicProfile = () => {
      const [activeTab, setActiveTab] = useState('overview');

      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
          <ProfileHeaderGlass
            username="alexdev"
            bio="Senior Software Engineer passionate about building scalable systems and elegant user experiences. Open source contributor and tech community advocate."
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
            joinDate="Joined March 2020"
            stats={{
              repositories: 42,
              contributions: 2847,
              followers: 1234,
              following: 567,
            }}
            languages={demoLanguages}
          />
          <div className="mt-8">
            <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
              <TabsGlass.List>
                <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
                <TabsGlass.Trigger value="repositories">
                  Repositories
                </TabsGlass.Trigger>
              </TabsGlass.List>
              <TabsGlass.Content value="overview" className="mt-6">
                <GlassCard intensity="medium" className="p-6 text-center">
                  <p className="text-white/70">
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
  args: {
    theme: 'glass',
  },
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

/**
 * Light theme variant of the user profile.
 */
export const LightTheme: Story = {
  args: {
    theme: 'light',
  },
  render: () => <UserProfile />,
};

/**
 * Aurora theme variant with gradient effects.
 */
export const AuroraTheme: Story = {
  args: {
    theme: 'aurora',
  },
  render: () => <UserProfile />,
};
