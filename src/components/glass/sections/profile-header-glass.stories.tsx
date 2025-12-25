import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { fn } from 'storybook/test';
import { ProfileHeaderGlass, type ExtendedProfileUser } from './profile-header-glass';

const meta = {
  title: 'Components/Sections/ProfileHeaderGlass',
  component: ProfileHeaderGlass,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `**Composite component** combining:
- **ProfileHeaderExtendedGlass** (transparent, no glass) - user info, stats, languages
- **AICardGlass** (with glass effect) - AI summary card

The profile section blends with the background while the AI card stands out.

## Compound Component API (Issue #31)

For maximum flexibility, use the compound component pattern:

\`\`\`tsx
<ProfileHeaderGlass.Root layout="horizontal">
  <ProfileHeaderGlass.Profile user={user} showStatus status="online" />
  <ProfileHeaderGlass.AI
    onGenerate={handleGenerate}
    features={['Custom feature 1', 'Custom feature 2']}
    estimatedTime="~1 minute"
  />
</ProfileHeaderGlass.Root>
\`\`\`

This allows:
- Custom AICardGlass props (features, estimatedTime, className)
- Replacing AICardGlass with a custom component entirely
- Fine-grained control over layout and styling`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: "User's display name",
    },
    username: {
      control: 'text',
      description: 'GitHub/GitLab username',
    },
    joinDate: {
      control: 'text',
      description: 'Account creation date (ISO or formatted string)',
    },
    bio: {
      control: 'text',
      description: 'User biography/description (Issue #30)',
    },
    location: {
      control: 'text',
      description: 'User location (Issue #30)',
    },
    avatar: {
      control: 'text',
      description: 'Avatar URL (Issue #30)',
    },
    url: {
      control: 'text',
      description: 'Profile URL (Issue #30)',
    },
    stats: {
      description: 'Profile statistics object `{ repos, followers, following, gists? }`',
    },
    languages: {
      description: 'Programming languages array `[{ name, percent, color? }]`',
    },
    onAIGenerate: {
      action: 'onAIGenerate',
      description: 'Callback when "Generate Report" button is clicked',
    },
  },
} satisfies Meta<typeof ProfileHeaderGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default example - Vue.js creator profile.
 * Notice: profile info is transparent, AICardGlass has glass effect.
 */
export const Default: Story = {
  args: {
    name: 'Evan You',
    username: 'yyx990803',
    joinDate: '2011-11-29',
    stats: {
      repos: 156,
      followers: 92500,
      following: 0,
    },
    languages: [
      { name: 'TypeScript', percent: 55, color: '#3178c6' },
      { name: 'JavaScript', percent: 30, color: '#f7df1e' },
      { name: 'Vue', percent: 10, color: '#42b883' },
      { name: 'HTML', percent: 5, color: '#e34c26' },
    ],
    onAIGenerate: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * React maintainer profile example
 */
export const GitHubUser: Story = {
  args: {
    name: 'Dan Abramov',
    username: 'gaearon',
    joinDate: '2011-05-25',
    stats: {
      repos: 262,
      followers: 82300,
      following: 171,
    },
    languages: [
      { name: 'JavaScript', percent: 60, color: '#f7df1e' },
      { name: 'TypeScript', percent: 25, color: '#3178c6' },
      { name: 'HTML', percent: 10, color: '#e34c26' },
      { name: 'CSS', percent: 5, color: '#563d7c' },
    ],
    onAIGenerate: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * New user with minimal activity
 */
export const NewUser: Story = {
  args: {
    name: 'Alex Johnson',
    username: 'alexj',
    joinDate: 'Dec 2024',
    stats: {
      repos: 2,
      followers: 0,
      following: 3,
    },
    languages: [{ name: 'JavaScript', percent: 100, color: '#f7df1e' }],
    onAIGenerate: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Profile without programming languages
 */
export const WithoutLanguages: Story = {
  args: {
    name: 'John Doe',
    username: 'johndoe',
    joinDate: 'Mar 2024',
    stats: {
      repos: 5,
      followers: 10,
      following: 8,
    },
    languages: [],
    onAIGenerate: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Developer using many programming languages
 */
export const PolyglotDeveloper: Story = {
  args: {
    name: 'Maria Garcia',
    username: 'mariadev',
    joinDate: 'Feb 2019',
    stats: {
      repos: 87,
      followers: 456,
      following: 123,
    },
    languages: [
      { name: 'TypeScript', percent: 20, color: '#3178c6' },
      { name: 'Python', percent: 18, color: '#3572A5' },
      { name: 'Java', percent: 15, color: '#b07219' },
      { name: 'Go', percent: 12, color: '#00ADD8' },
      { name: 'Rust', percent: 10, color: '#dea584' },
      { name: 'Ruby', percent: 8, color: '#701516' },
      { name: 'PHP', percent: 7, color: '#4F5D95' },
      { name: 'JavaScript', percent: 10, color: '#f7df1e' },
    ],
    onAIGenerate: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Issue #30: Full profile with extended fields
 * Demonstrates bio, location, avatar, url, and gists support
 */
export const WithExtendedFields: Story = {
  args: {
    name: 'The Octocat',
    username: 'octocat',
    avatar: 'https://avatars.githubusercontent.com/u/583231?v=4',
    bio: 'GitHub mascot and cat enthusiast. Lover of open source and collaborative coding.',
    location: 'San Francisco, CA',
    url: 'https://github.com/octocat',
    joinDate: '2011-01-25T18:44:36Z',
    stats: {
      repos: 42,
      followers: 12500,
      following: 50,
      gists: 25,
    },
    languages: [
      { name: 'TypeScript', percent: 35, color: '#3178c6' },
      { name: 'JavaScript', percent: 28, color: '#f7df1e' },
      { name: 'Ruby', percent: 20, color: '#701516' },
      { name: 'Go', percent: 12, color: '#00ADD8' },
      { name: 'Shell', percent: 5, color: '#89e051' },
    ],
    onAIGenerate: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// COMPOUND COMPONENT API STORIES (Issue #31)
// ========================================

const compoundUser: ExtendedProfileUser = {
  name: 'Sarah Chen',
  login: 'sarahchen',
  avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4',
  url: 'https://github.com/sarahchen',
  createdAt: '2020-03-15',
  bio: 'Full-stack developer passionate about TypeScript and React. Building tools for developers.',
  location: 'Seattle, WA',
  stats: {
    repos: 68,
    followers: 2450,
    following: 180,
    gists: 12,
  },
  languages: [
    { name: 'TypeScript', percent: 45, color: '#3178c6' },
    { name: 'JavaScript', percent: 25, color: '#f7df1e' },
    { name: 'Python', percent: 20, color: '#3572A5' },
    { name: 'Go', percent: 10, color: '#00ADD8' },
  ],
};

/**
 * Compound Component API with custom AI features.
 * Use `ProfileHeaderGlass.Root`, `.Profile`, and `.AI` for full control.
 */
export const CompoundAPICustomFeatures: Story = {
  render: () => (
    <ProfileHeaderGlass.Root layout="horizontal">
      <ProfileHeaderGlass.Profile user={compoundUser} showStatus status="online" />
      <ProfileHeaderGlass.AI
        onGenerate={() => console.log('Generate custom report')}
        features={['Code quality assessment', 'Security vulnerabilities', 'Performance insights']}
        estimatedTime="~45 seconds"
      />
    </ProfileHeaderGlass.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: `Demonstrates the **Compound Component API** with custom AI features.

\`\`\`tsx
<ProfileHeaderGlass.Root layout="horizontal">
  <ProfileHeaderGlass.Profile user={user} showStatus status="online" />
  <ProfileHeaderGlass.AI
    features={['Custom feature 1', 'Custom feature 2']}
    estimatedTime="~45 seconds"
  />
</ProfileHeaderGlass.Root>
\`\`\``,
      },
    },
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Compound API with stacked layout - vertical arrangement on all breakpoints
 */
export const CompoundAPIStackedLayout: Story = {
  render: () => (
    <ProfileHeaderGlass.Root layout="stacked">
      <ProfileHeaderGlass.Profile user={compoundUser} showStatus status="away" />
      <ProfileHeaderGlass.AI
        onGenerate={() => console.log('Generate report')}
        features={['Architecture analysis', 'Dependency audit', 'Best practices review']}
        estimatedTime="~1 minute"
      />
    </ProfileHeaderGlass.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: `Stacked layout - profile and AI card arranged vertically on all breakpoints.`,
      },
    },
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Compound API with custom component replacing AICardGlass entirely
 */
export const CompoundAPICustomComponent: Story = {
  render: () => (
    <ProfileHeaderGlass.Root layout="horizontal">
      <ProfileHeaderGlass.Profile user={compoundUser} showStatus status="online" />
      <div className="lg:w-1/2 lg:flex lg:items-center lg:justify-center">
        <div className="w-full sm:w-56 md:w-64 p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-purple-300 mb-2">Custom Analytics</h3>
          <p className="text-xs text-gray-400 mb-3">
            Replace the default AI card with your own component.
          </p>
          <button className="w-full px-3 py-2 text-xs font-medium bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 rounded-lg text-purple-200 transition-colors">
            View Custom Analytics
          </button>
        </div>
      </div>
    </ProfileHeaderGlass.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: `Demonstrates replacing AICardGlass entirely with a custom component.

The compound API allows you to use any component in place of ProfileHeaderGlass.AI.`,
      },
    },
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
