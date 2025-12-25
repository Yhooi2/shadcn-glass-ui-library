import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { fn } from 'storybook/test';
import { ProfileHeaderGlass } from './profile-header-glass';

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

The profile section blends with the background while the AI card stands out.`,
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
    stats: {
      description: 'Profile statistics object `{ repos, followers, following }`',
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
