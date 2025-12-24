import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ProfileHeaderExtendedGlass } from './profile-header-extended-glass';
import { ButtonGlass } from '../ui/button-glass';

const meta = {
  title: 'Components/Sections/ProfileHeaderExtendedGlass',
  component: ProfileHeaderExtendedGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    user: {
      description: 'User profile data object',
    },
    showStatus: {
      control: 'boolean',
      description: 'Show avatar status indicator (when no avatar URL)',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Avatar status when showStatus is true',
    },
    actions: {
      description: 'Custom action slot (React node)',
    },
  },
} satisfies Meta<typeof ProfileHeaderExtendedGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      name: 'The Octocat',
      login: 'octocat',
      avatar: 'https://avatars.githubusercontent.com/u/583231?v=4',
      url: 'https://github.com/octocat',
      createdAt: '2011-01-25T18:44:36Z',
      bio: 'GitHub mascot and friend to all developers',
      location: 'San Francisco, CA',
      stats: {
        repos: 8,
        followers: 9847,
        following: 9,
        gists: 8,
      },
      languages: [
        { name: 'Ruby', percent: 35, color: '#701516' },
        { name: 'JavaScript', percent: 30, color: '#f7df1e' },
        { name: 'Shell', percent: 20, color: '#89e051' },
        { name: 'HTML', percent: 15, color: '#e34c26' },
      ],
    },
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const GitHubUser: Story = {
  args: {
    user: {
      name: 'Evan You',
      login: 'yyx990803',
      avatar: 'https://avatars.githubusercontent.com/u/499550?v=4',
      url: 'https://github.com/yyx990803',
      createdAt: '2011-11-29T08:07:38Z',
      bio: 'Creator of Vue.js & Vite',
      location: 'Singapore',
      stats: {
        repos: 156,
        followers: 92500,
        following: 0,
        gists: 43,
      },
      languages: [
        { name: 'TypeScript', percent: 55, color: '#3178c6' },
        { name: 'JavaScript', percent: 30, color: '#f7df1e' },
        { name: 'Vue', percent: 10, color: '#42b883' },
        { name: 'HTML', percent: 5, color: '#e34c26' },
      ],
    },
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithoutBio: Story = {
  args: {
    user: {
      name: 'Jane Developer',
      login: 'janedev',
      avatar: 'https://i.pravatar.cc/150?u=janedev',
      url: 'https://github.com/janedev',
      createdAt: '2020-03-15T10:30:00Z',
      bio: null,
      location: 'New York, USA',
      stats: {
        repos: 42,
        followers: 156,
        following: 89,
        gists: 5,
      },
    },
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithoutLocation: Story = {
  args: {
    user: {
      name: 'Remote Developer',
      login: 'remotedev',
      avatar: 'https://i.pravatar.cc/150?u=remotedev',
      url: 'https://github.com/remotedev',
      createdAt: '2019-06-20T14:22:00Z',
      bio: 'Working from everywhere',
      location: null,
      stats: {
        repos: 28,
        followers: 340,
        following: 45,
        gists: 12,
      },
    },
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const NoNameJustLogin: Story = {
  args: {
    user: {
      name: null,
      login: 'anonymousdev',
      avatar: 'https://i.pravatar.cc/150?u=anon',
      url: 'https://github.com/anonymousdev',
      createdAt: '2023-01-10T09:00:00Z',
      stats: {
        repos: 3,
        followers: 12,
        following: 8,
        gists: 0,
      },
    },
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithActions: Story = {
  args: {
    user: {
      name: 'Sarah Connor',
      login: 'sarahconnor',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      url: 'https://github.com/sarahconnor',
      createdAt: '2018-08-29T16:45:00Z',
      bio: 'Building the future, one commit at a time',
      location: 'Los Angeles, CA',
      stats: {
        repos: 67,
        followers: 892,
        following: 234,
        gists: 18,
      },
      languages: [
        { name: 'Python', percent: 40, color: '#3572A5' },
        { name: 'TypeScript', percent: 35, color: '#3178c6' },
        { name: 'Go', percent: 15, color: '#00ADD8' },
        { name: 'Rust', percent: 10, color: '#dea584' },
      ],
    },
    actions: (
      <ButtonGlass variant="default" size="sm">
        Follow
      </ButtonGlass>
    ),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const PopularUser: Story = {
  args: {
    user: {
      name: 'Dan Abramov',
      login: 'gaearon',
      avatar: 'https://avatars.githubusercontent.com/u/810438?v=4',
      url: 'https://github.com/gaearon',
      createdAt: '2011-05-25T18:18:31Z',
      bio: 'Working on React. Co-author of Redux and Create React App.',
      location: 'London, UK',
      stats: {
        repos: 262,
        followers: 82300,
        following: 171,
        gists: 92,
      },
      languages: [
        { name: 'JavaScript', percent: 60, color: '#f7df1e' },
        { name: 'TypeScript', percent: 25, color: '#3178c6' },
        { name: 'HTML', percent: 10, color: '#e34c26' },
        { name: 'CSS', percent: 5, color: '#563d7c' },
      ],
    },
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const NewUser: Story = {
  args: {
    user: {
      name: 'New Developer',
      login: 'newdev2024',
      avatar: 'https://i.pravatar.cc/150?u=newdev',
      url: 'https://github.com/newdev2024',
      createdAt: '2024-11-01T08:00:00Z',
      bio: 'Just started my coding journey!',
      stats: {
        repos: 1,
        followers: 0,
        following: 5,
        gists: 0,
      },
      languages: [{ name: 'JavaScript', percent: 100, color: '#f7df1e' }],
    },
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const MinimalData: Story = {
  args: {
    user: {
      name: null,
      login: 'minimaluser',
      avatar: '',
      url: 'https://github.com/minimaluser',
      createdAt: '2022-07-15',
    },
    showStatus: true,
    status: 'online',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const LongBio: Story = {
  args: {
    user: {
      name: 'Verbose Developer',
      login: 'verbosedev',
      avatar: 'https://i.pravatar.cc/150?u=verbose',
      url: 'https://github.com/verbosedev',
      createdAt: '2017-03-22T11:30:00Z',
      bio: 'I am a passionate full-stack developer with over 10 years of experience in building scalable web applications. I love open source and contributing to the community. Currently focused on TypeScript, React, and cloud-native technologies.',
      location: 'Berlin, Germany',
      stats: {
        repos: 145,
        followers: 2340,
        following: 567,
        gists: 34,
      },
    },
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
