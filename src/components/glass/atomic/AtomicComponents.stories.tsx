import type { Meta, StoryObj } from '@storybook/react';
import { Github, Search, FolderGit2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { IconButtonGlass } from './icon-button-glass';
import { ThemeToggleGlass } from './theme-toggle-glass';
import { SearchBoxGlass } from './search-box-glass';
import { StatItemGlass } from './stat-item-glass';
import { ExpandableHeaderGlass } from './expandable-header-glass';

const meta = {
  title: 'Glass/Atomic Components',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

// IconButtonGlass Stories
export const IconButtons: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Icon Button Variants</h3>
        <div className="flex items-center gap-4">
          <IconButtonGlass icon={Github} variant="gradient" aria-label="GitHub" />
          <IconButtonGlass icon={Search} variant="subtle" aria-label="Search" />
          <IconButtonGlass icon={AlertTriangle} variant="ghost" aria-label="Alert" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Icon Button Sizes</h3>
        <div className="flex items-center gap-4">
          <IconButtonGlass icon={Github} size="sm" aria-label="Small" />
          <IconButtonGlass icon={Github} size="md" aria-label="Medium" />
          <IconButtonGlass icon={Github} size="lg" aria-label="Large" />
          <IconButtonGlass icon={Github} size="touch" aria-label="Touch Target" />
        </div>
      </div>
    </div>
  ),
};

// ThemeToggleGlass Stories
export const ThemeToggles: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Theme Toggle Variants</h3>
        <div className="flex items-center gap-4">
          <ThemeToggleGlass />
          <ThemeToggleGlass iconOnly />
        </div>
      </div>
    </div>
  ),
};

// SearchBoxGlass Stories
const SearchBoxesComponent = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  return (
    <div className="flex flex-col gap-6 p-6 min-w-[400px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Search Box Variants</h3>
        <SearchBoxGlass
          value={value1}
          onChange={setValue1}
          onSubmit={(val) => console.log('Search:', val)}
          variant="default"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Compact Variant</h3>
        <SearchBoxGlass
          value={value2}
          onChange={setValue2}
          onSubmit={(val) => console.log('Search:', val)}
          variant="compact"
        />
      </div>
    </div>
  );
};

export const SearchBoxes: StoryObj = {
  render: () => <SearchBoxesComponent />,
};

// StatItemGlass Stories
export const StatItems: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Horizontal Layout</h3>
        <div className="flex items-center gap-4">
          <StatItemGlass icon={FolderGit2} value={11} label="repos" />
          <StatItemGlass icon={FolderGit2} value={1234} label="followers" abbreviated />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Vertical Layout</h3>
        <div className="flex items-center gap-4">
          <StatItemGlass icon={FolderGit2} value={11} label="repos" layout="vertical" />
          <StatItemGlass icon={FolderGit2} value={1234} label="followers" layout="vertical" abbreviated />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Sizes</h3>
        <div className="flex items-center gap-4">
          <StatItemGlass icon={FolderGit2} value={11} label="repos" size="sm" />
          <StatItemGlass icon={FolderGit2} value={11} label="repos" size="md" />
          <StatItemGlass icon={FolderGit2} value={11} label="repos" size="lg" />
        </div>
      </div>
    </div>
  ),
};

// ExpandableHeaderGlass Stories
const ExpandableHeadersComponent = () => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(true);

  return (
    <div className="flex flex-col gap-6 p-6 min-w-[400px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">With Icon</h3>
        <ExpandableHeaderGlass
          icon={AlertTriangle}
          iconColor="var(--status-yellow)"
          title="5 flags detected"
          expanded={expanded1}
          onToggle={() => setExpanded1(!expanded1)}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80">Without Icon</h3>
        <ExpandableHeaderGlass
          title="Expandable Section"
          expanded={expanded2}
          onToggle={() => setExpanded2(!expanded2)}
        />
      </div>
    </div>
  );
};

export const ExpandableHeaders: StoryObj = {
  render: () => <ExpandableHeadersComponent />,
};

// Combined Demo
const AllAtomicComponentsDemo = () => {
  const [searchValue, setSearchValue] = useState('');
  const [expandedStates, setExpandedStates] = useState({
    section1: false,
    section2: false,
  });

  return (
    <div className="flex flex-col gap-8 p-6 max-w-2xl">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Atomic Glass Components</h2>

        <div className="flex items-center gap-3">
          <IconButtonGlass icon={Github} variant="gradient" aria-label="GitHub" />
          <IconButtonGlass icon={Search} variant="subtle" aria-label="Search" />
          <ThemeToggleGlass />
        </div>

        <SearchBoxGlass
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={(val) => console.log('Search:', val)}
        />

        <div className="flex items-center gap-4 flex-wrap">
          <StatItemGlass icon={FolderGit2} value={11} label="repos" />
          <StatItemGlass icon={FolderGit2} value={1234} label="stars" abbreviated />
          <StatItemGlass icon={FolderGit2} value={5678} label="forks" abbreviated />
        </div>

        <div className="space-y-2">
          <ExpandableHeaderGlass
            icon={AlertTriangle}
            iconColor="var(--status-yellow)"
            title="Section 1"
            expanded={expandedStates.section1}
            onToggle={() =>
              setExpandedStates((prev) => ({ ...prev, section1: !prev.section1 }))
            }
          />
          {expandedStates.section1 && (
            <div className="p-4 text-sm text-white/60">
              Section 1 content goes here
            </div>
          )}

          <ExpandableHeaderGlass
            title="Section 2"
            expanded={expandedStates.section2}
            onToggle={() =>
              setExpandedStates((prev) => ({ ...prev, section2: !prev.section2 }))
            }
          />
          {expandedStates.section2 && (
            <div className="p-4 text-sm text-white/60">
              Section 2 content goes here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const AllAtomicComponents: StoryObj = {
  render: () => <AllAtomicComponentsDemo />,
};
