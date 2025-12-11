import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { RepositoryCardGlass } from './glass/composite/repository-card-glass';

const meta = {
  title: 'Glass/Sections/RepositoryCardGlass',
  component: RepositoryCardGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Repository name',
    },
    languages: {
      control: 'text',
      description: 'Languages string',
    },
    commits: {
      control: 'number',
      description: 'Number of commits',
    },
    contribution: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Contribution percentage',
    },
    stars: {
      control: 'number',
      description: 'Star count',
    },
    flagType: {
      control: 'select',
      options: ['green', 'yellow', 'red'],
      description: 'Status flag',
    },
    expanded: {
      control: 'boolean',
      description: 'Expanded state',
    },
  },
} satisfies Meta<typeof RepositoryCardGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    name: 'portfolio',
    languages: 'TypeScript 78% · CSS 22%',
    commits: 134,
    contribution: 100,
    stars: 5,
    flagType: 'green',
    expanded: false,
  },
  render: (args) => (
    <div className="w-80">
      <RepositoryCardGlass {...args} />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Expanded: Story = {
  args: {
    name: 'portfolio',
    languages: 'TypeScript 78% · CSS 22%',
    commits: 134,
    contribution: 100,
    stars: 5,
    flagType: 'green',
    expanded: true,
  },
  render: (args) => (
    <div className="w-80">
      <RepositoryCardGlass {...args} />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithIssues: Story = {
  args: {
    name: 'bot-scripts',
    languages: 'Python 100%',
    commits: 89,
    contribution: 100,
    stars: 0,
    flagType: 'red',
    expanded: true,
    issues: ['Empty commits (avg 3 lines/commit)', 'Burst: 67 commits on Oct 15'],
  },
  render: (args) => (
    <div className="w-80">
      <RepositoryCardGlass {...args} />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WarningStatus: Story = {
  args: {
    name: 'api-service',
    languages: 'Go 85% · Docker 15%',
    commits: 256,
    contribution: 65,
    stars: 12,
    flagType: 'yellow',
    expanded: false,
  },
  render: (args) => (
    <div className="w-80">
      <RepositoryCardGlass {...args} />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Interactive: Story = {
  args: {
    name: 'interactive-repo',
    languages: 'TypeScript 90% · CSS 10%',
    commits: 200,
    contribution: 80,
  },
  render: function InteractiveRepo() {
    const [expanded, setExpanded] = useState(false);
    return (
      <div className="w-80">
        <RepositoryCardGlass
          name="interactive-repo"
          languages="TypeScript 90% · CSS 10%"
          commits={200}
          contribution={80}
          stars={25}
          flagType="green"
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
        />
      </div>
    );
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
