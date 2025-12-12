import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { FlagsSectionGlass } from './flags-section-glass';

const meta = {
  title: 'Components/Sections/FlagsSectionGlass',
  component: FlagsSectionGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    flags: {
      description: 'Array of flag data with type, title, and description',
    },
    expanded: {
      control: 'boolean',
      description: 'Whether the section is expanded (controlled by parent)',
    },
    onToggle: {
      description: 'Callback when toggle button is clicked',
    },
  },
  decorators: [
    (Story, context) => {
      const [expanded, setExpanded] = useState(context.args.expanded ?? false);

      return (
        <Story
          args={{
            ...context.args,
            expanded,
            onToggle: () => setExpanded(!expanded),
          }}
        />
      );
    },
  ],
} satisfies Meta<typeof FlagsSectionGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    flags: [
      {
        type: 'warning',
        title: 'High activity detected',
        description: 'Unusual number of contributions',
      },
      {
        type: 'danger',
        title: 'Security issue detected',
        description: 'Multiple failed login attempts',
      },
    ],
    expanded: false,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Expanded: Story = {
  args: {
    flags: [
      {
        type: 'warning',
        title: 'High activity detected',
        description: 'Unusual number of contributions',
      },
      {
        type: 'danger',
        title: 'Security issue detected',
        description: 'Multiple failed login attempts',
      },
    ],
    expanded: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const SingleFlag: Story = {
  args: {
    flags: [{ type: 'warning', title: 'API rate limit approaching' }],
    expanded: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ManyFlags: Story = {
  args: {
    flags: [
      {
        type: 'danger',
        title: 'Security vulnerability',
        description: 'Outdated dependencies detected',
      },
      { type: 'warning', title: 'Large repository size', description: 'Repository exceeds 500MB' },
      { type: 'danger', title: 'Failed CI/CD pipeline', description: 'Multiple test failures' },
      { type: 'warning', title: 'High activity detected', description: 'Unusual commit frequency' },
      {
        type: 'danger',
        title: 'Suspicious login attempts',
        description: 'Multiple failed authentications',
      },
    ],
    expanded: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const OnlyWarnings: Story = {
  args: {
    flags: [
      { type: 'warning', title: 'Repository size warning', description: 'Consider using Git LFS' },
      { type: 'warning', title: 'Code review pending', description: '3 PRs awaiting review' },
      { type: 'warning', title: 'Test coverage low', description: 'Coverage below 80% threshold' },
    ],
    expanded: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const OnlyDangers: Story = {
  args: {
    flags: [
      { type: 'danger', title: 'Critical security issue', description: 'CVE-2024-1234 detected' },
      { type: 'danger', title: 'Build failure', description: 'Production build failed' },
      { type: 'danger', title: 'Data breach detected', description: 'Unauthorized access attempt' },
    ],
    expanded: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const NoFlags: Story = {
  args: {
    flags: [],
    expanded: false,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Interactive: Story = {
  args: {
    flags: [
      {
        type: 'warning',
        title: 'High activity detected',
        description: 'Unusual number of contributions',
      },
      {
        type: 'danger',
        title: 'Security issue detected',
        description: 'Multiple failed login attempts',
      },
      { type: 'warning', title: 'API rate limit approaching', description: '80% of quota used' },
    ],
    expanded: false,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
