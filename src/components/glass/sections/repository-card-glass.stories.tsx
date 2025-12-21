import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { RepositoryCardGlass } from '../composite/repository-card-glass';

const meta = {
  title: 'Components/Sections/RepositoryCardGlass',
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

// ========================================
// COMPOUND API STORIES
// ========================================

/**
 * Type for compound API stories (doesn't require legacy props)
 */
type CompoundStory = StoryObj<Meta<typeof RepositoryCardGlass.Root>>;

// Helper component: Basic repository card
function CompoundAPIBasicDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-80">
      <RepositoryCardGlass.Root expanded={expanded} onToggle={() => setExpanded(!expanded)}>
        <RepositoryCardGlass.Header>
          <RepositoryCardGlass.Name>portfolio</RepositoryCardGlass.Name>
          <RepositoryCardGlass.Status type="green" />
          <RepositoryCardGlass.Stars count={5} />
        </RepositoryCardGlass.Header>

        <RepositoryCardGlass.Meta>
          <RepositoryCardGlass.Languages>TypeScript 78% · CSS 22%</RepositoryCardGlass.Languages>
          <RepositoryCardGlass.Stats>134 commits · 100%</RepositoryCardGlass.Stats>
        </RepositoryCardGlass.Meta>

        <RepositoryCardGlass.ExpandedContent>
          <RepositoryCardGlass.Metrics>
            <RepositoryCardGlass.MetricItem
              label="Your Contribution"
              value="134 commits"
              subtitle="100%"
            />
            <RepositoryCardGlass.MetricItem
              label="Full Project"
              value="134 commits"
              subtitle="~1,608 lines"
            />
          </RepositoryCardGlass.Metrics>
        </RepositoryCardGlass.ExpandedContent>
      </RepositoryCardGlass.Root>
    </div>
  );
}

/**
 * Basic compound API usage demonstrating the minimum required structure.
 *
 * Shows how to use RepositoryCardGlass.Root with Header, Meta, and ExpandedContent
 * to create a simple repository card.
 */
export const CompoundAPIBasic: CompoundStory = {
  render: () => <CompoundAPIBasicDemo />,
  parameters: {
    docs: {
      description: {
        story: `
Basic compound API usage showing the minimum required components:
- Root: Container with expand/collapse state
- Header: Repository name, status, and stars
- Meta: Languages and stats
- ExpandedContent: Metrics grid
        `,
      },
    },
  },
};

// Helper component: Repository with metadata
function CompoundAPIWithMetadataDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-80">
      <RepositoryCardGlass.Root expanded={expanded} onToggle={() => setExpanded(!expanded)}>
        <RepositoryCardGlass.Header>
          <RepositoryCardGlass.Name>api-service</RepositoryCardGlass.Name>
          <RepositoryCardGlass.Status type="yellow" />
          <RepositoryCardGlass.Stars count={12} />
        </RepositoryCardGlass.Header>

        <RepositoryCardGlass.Meta>
          <RepositoryCardGlass.Languages>Go 85% · Docker 15%</RepositoryCardGlass.Languages>
          <RepositoryCardGlass.Stats>256 commits · 65%</RepositoryCardGlass.Stats>
        </RepositoryCardGlass.Meta>

        <RepositoryCardGlass.ExpandedContent>
          <RepositoryCardGlass.Metrics>
            <RepositoryCardGlass.MetricItem
              label="Your Contribution"
              value="256 commits"
              subtitle="65%"
            />
            <RepositoryCardGlass.MetricItem
              label="Full Project"
              value="394 commits"
              subtitle="~3,072 lines"
            />
          </RepositoryCardGlass.Metrics>
        </RepositoryCardGlass.ExpandedContent>
      </RepositoryCardGlass.Root>
    </div>
  );
}

/**
 * Repository card with comprehensive metadata including language breakdown and statistics.
 *
 * Demonstrates how to display detailed repository information with proper status indicators.
 */
export const CompoundAPIWithMetadata: CompoundStory = {
  render: () => <CompoundAPIWithMetadataDemo />,
  parameters: {
    docs: {
      description: {
        story: `
Repository card with comprehensive metadata:
- Status indicator (yellow for warnings)
- Star count display
- Language breakdown
- Commit statistics
- Contribution percentage
        `,
      },
    },
  },
};

// Helper component: Expandable repository with issues
function CompoundAPIExpandableDemo() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="w-80">
      <RepositoryCardGlass.Root expanded={expanded} onToggle={() => setExpanded(!expanded)}>
        <RepositoryCardGlass.Header>
          <RepositoryCardGlass.Name>bot-scripts</RepositoryCardGlass.Name>
          <RepositoryCardGlass.Status type="red" />
        </RepositoryCardGlass.Header>

        <RepositoryCardGlass.Meta>
          <RepositoryCardGlass.Languages>Python 100%</RepositoryCardGlass.Languages>
          <RepositoryCardGlass.Stats>89 commits · 100%</RepositoryCardGlass.Stats>
        </RepositoryCardGlass.Meta>

        <RepositoryCardGlass.ExpandedContent>
          <RepositoryCardGlass.Issues
            issues={['Empty commits (avg 3 lines/commit)', 'Burst: 67 commits on Oct 15']}
          />

          <RepositoryCardGlass.Metrics>
            <RepositoryCardGlass.MetricItem
              label="Your Contribution"
              value="89 commits"
              subtitle="100%"
            />
            <RepositoryCardGlass.MetricItem
              label="Full Project"
              value="89 commits"
              subtitle="~1,068 lines"
            />
          </RepositoryCardGlass.Metrics>
        </RepositoryCardGlass.ExpandedContent>
      </RepositoryCardGlass.Root>
    </div>
  );
}

/**
 * Expandable repository card with issues alert displayed in the expanded section.
 *
 * Shows how to use the Issues component to display warnings and problems.
 */
export const CompoundAPIExpandable: CompoundStory = {
  render: () => <CompoundAPIExpandableDemo />,
  parameters: {
    docs: {
      description: {
        story: `
Expandable repository card with issues:
- Red status indicator for critical issues
- Issues component with alert styling
- Metrics displayed alongside issues
- Starts expanded to show issues immediately
        `,
      },
    },
  },
};

// Helper component: Gallery of repositories
function CompoundAPIGalleryDemo() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const repos = [
    {
      id: 'portfolio',
      name: 'portfolio',
      status: 'green' as const,
      stars: 5,
      languages: 'TypeScript 78% · CSS 22%',
      commits: 134,
      contribution: 100,
    },
    {
      id: 'api-service',
      name: 'api-service',
      status: 'yellow' as const,
      stars: 12,
      languages: 'Go 85% · Docker 15%',
      commits: 256,
      contribution: 65,
    },
    {
      id: 'bot-scripts',
      name: 'bot-scripts',
      status: 'red' as const,
      stars: 0,
      languages: 'Python 100%',
      commits: 89,
      contribution: 100,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 w-[640px]">
      {repos.map((repo) => (
        <RepositoryCardGlass.Root
          key={repo.id}
          expanded={expandedId === repo.id}
          onToggle={() => setExpandedId(expandedId === repo.id ? null : repo.id)}
        >
          <RepositoryCardGlass.Header>
            <RepositoryCardGlass.Name>{repo.name}</RepositoryCardGlass.Name>
            <RepositoryCardGlass.Status type={repo.status} />
            <RepositoryCardGlass.Stars count={repo.stars} />
          </RepositoryCardGlass.Header>

          <RepositoryCardGlass.Meta>
            <RepositoryCardGlass.Languages>{repo.languages}</RepositoryCardGlass.Languages>
            <RepositoryCardGlass.Stats>
              {repo.commits} commits · {repo.contribution}%
            </RepositoryCardGlass.Stats>
          </RepositoryCardGlass.Meta>

          <RepositoryCardGlass.ExpandedContent>
            <RepositoryCardGlass.Metrics>
              <RepositoryCardGlass.MetricItem
                label="Your Contribution"
                value={`${repo.commits} commits`}
                subtitle={`${repo.contribution}%`}
              />
              <RepositoryCardGlass.MetricItem
                label="Full Project"
                value={`${Math.round(repo.commits / (repo.contribution / 100))} commits`}
                subtitle={`~${Math.round(repo.commits * 12)} lines`}
              />
            </RepositoryCardGlass.Metrics>
          </RepositoryCardGlass.ExpandedContent>
        </RepositoryCardGlass.Root>
      ))}
    </div>
  );
}

/**
 * Gallery of repository cards demonstrating dynamic state management.
 *
 * Shows how to manage multiple repository cards with coordinated expand/collapse behavior
 * where only one card can be expanded at a time.
 */
export const CompoundAPIGallery: CompoundStory = {
  render: () => <CompoundAPIGalleryDemo />,
  parameters: {
    docs: {
      description: {
        story: `
Gallery of repository cards:
- Multiple repository cards in a grid layout
- Coordinated state management (accordion pattern)
- Only one card expanded at a time
- Different status indicators (green, yellow, red)
- Varying star counts and contribution percentages
        `,
      },
    },
  },
};
