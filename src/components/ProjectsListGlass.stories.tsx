import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ProjectsListGlass,
  type Repository,
  type OwnershipFilter,
  type SortField,
  type SortOrder,
} from './ProjectsListGlass';
import { ThemeProvider } from '@/lib/theme-context';
import '@/glass-theme.css';

const meta: Meta<typeof ProjectsListGlass> = {
  title: 'Glass/Sections/ProjectsListGlass',
  component: ProjectsListGlass,
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'glass';
      return (
        <ThemeProvider initialTheme={theme}>
          <div
            className="p-4 min-h-[400px]"
            style={{ background: 'var(--bg-gradient)' }}
          >
            <div className="max-w-2xl mx-auto">
              <Story />
            </div>
          </div>
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    showFlaggedOnly: {
      control: 'boolean',
      description: 'Show only flagged repositories',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showControls: {
      control: 'boolean',
      description: 'Show header controls (sort, filter)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true (when callbacks provided)' },
      },
    },
    title: {
      control: 'text',
      description: 'Custom title (overrides auto-generated)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Demo data
const demoRepos: Repository[] = [
  {
    name: 'Wildhaven-website',
    flagType: 'green',
    stars: 1,
    commits: 240,
    contribution: 75,
    languages: 'JS 88% · Shell 11%',
    issues: [],
    ownership: 'your',
  },
  {
    name: 'study',
    flagType: 'yellow',
    stars: 2,
    commits: 177,
    contribution: 100,
    languages: 'Python 92% · C 5%',
    issues: ['Uneven activity pattern'],
    ownership: 'your',
  },
  {
    name: 'bot-scripts',
    flagType: 'red',
    stars: 0,
    commits: 89,
    contribution: 100,
    languages: 'Python 100%',
    issues: ['Empty commits', 'Burst activity'],
    ownership: 'your',
  },
  {
    name: 'portfolio',
    flagType: 'green',
    stars: 5,
    commits: 134,
    contribution: 100,
    languages: 'TypeScript 78% · CSS 22%',
    issues: [],
    ownership: 'your',
  },
  {
    name: 'git-course',
    flagType: 'green',
    stars: 2,
    commits: 150,
    contribution: 100,
    languages: 'C++ 100%',
    issues: [],
    ownership: 'contrib',
  },
];

// Interactive wrapper with full controls
function InteractiveProjectsList({
  repositories = demoRepos,
  ...props
}: Partial<React.ComponentProps<typeof ProjectsListGlass>>) {
  const [ownershipFilter, setOwnershipFilter] = useState<OwnershipFilter>('your');
  const [sortBy, setSortBy] = useState<SortField>('commits');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  return (
    <ProjectsListGlass
      repositories={repositories}
      ownershipFilter={ownershipFilter}
      onOwnershipChange={setOwnershipFilter}
      sortBy={sortBy}
      sortOrder={sortOrder}
      onSortChange={(field, order) => {
        setSortBy(field);
        setSortOrder(order);
      }}
      {...props}
    />
  );
}

/**
 * Default display without controls - simple list
 */
export const Default: Story = {
  args: {
    repositories: demoRepos,
  },
};

/**
 * Full-featured with sorting and ownership filter controls
 */
export const WithControls: Story = {
  render: () => <InteractiveProjectsList />,
};

/**
 * With ownership filter - toggles between Your and Contrib
 */
export const WithOwnershipFilter: Story = {
  render: () => (
    <InteractiveProjectsList />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Click "Your" or "Contrib" to filter repositories by ownership.',
      },
    },
  },
};

/**
 * Sorted by stars instead of commits
 */
export const SortedByStars: Story = {
  render: () => {
    const [ownershipFilter, setOwnershipFilter] = useState<OwnershipFilter>('your');
    const [sortBy, setSortBy] = useState<SortField>('stars');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    return (
      <ProjectsListGlass
        repositories={demoRepos}
        ownershipFilter={ownershipFilter}
        onOwnershipChange={setOwnershipFilter}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={(field, order) => {
          setSortBy(field);
          setSortOrder(order);
        }}
      />
    );
  },
};

/**
 * Show only flagged (non-green) repositories
 */
export const FlaggedOnly: Story = {
  args: {
    repositories: demoRepos,
    showFlaggedOnly: true,
  },
};

/**
 * Empty state when no repositories match filters
 */
export const EmptyState: Story = {
  render: () => {
    const [ownershipFilter, setOwnershipFilter] = useState<OwnershipFilter>('contrib');
    const emptyRepos: Repository[] = demoRepos.filter(r => r.ownership === 'your');

    return (
      <ProjectsListGlass
        repositories={emptyRepos}
        ownershipFilter={ownershipFilter}
        onOwnershipChange={setOwnershipFilter}
        onClearFilters={() => setOwnershipFilter('your')}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'When filters result in no matches, an empty state with "Clear filters" is shown.',
      },
    },
  },
};

/**
 * Custom title overriding the auto-generated one
 */
export const CustomTitle: Story = {
  args: {
    repositories: demoRepos,
    title: 'My Repositories',
  },
};

/**
 * Responsive layout - controls stack on mobile
 */
export const Responsive: Story = {
  render: () => <InteractiveProjectsList />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'On mobile, controls stack vertically below the title.',
      },
    },
  },
};

/**
 * Many repositories to test scrolling
 */
export const ManyRepositories: Story = {
  render: () => {
    const manyRepos: Repository[] = [
      ...demoRepos,
      ...demoRepos.map((r, i) => ({ ...r, name: `${r.name}-copy-${i + 1}` })),
      ...demoRepos.map((r, i) => ({ ...r, name: `${r.name}-copy-${i + 6}` })),
    ];
    return <InteractiveProjectsList repositories={manyRepos} />;
  },
};
