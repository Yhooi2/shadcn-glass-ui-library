// ========================================
// DESKTOP SHOWCASE DEMO PAGE
// Complete GitHub Analytics UI showcase
// ========================================

import { useState } from 'react';
import { Sun, Moon, Palette, ChevronDown, User, Settings, Folder, LogOut } from 'lucide-react';
import { useTheme, type ThemeName } from '@/lib/theme-context';
import { AnimatedBackground } from '@/components/AnimatedBackground';

// Blocks
import {
  ButtonsBlock,
  FormElementsBlock,
  ProgressBlock,
  AvatarGalleryBlock,
  BadgesBlock,
  NotificationsBlock,
} from '@/components/blocks';

// Import glass components (only for demos not covered by blocks)
import { GlassCard } from './glass/ui/glass-card';
import { ButtonGlass } from './glass/ui/button-glass';
import { TabsGlass } from './glass/ui/tabs-glass';
import { TooltipGlass } from './glass/ui/tooltip-glass';
import { ModalGlass } from './glass/ui/modal-glass';
import { DropdownGlass } from './glass/ui/dropdown-glass';

// Import section components
import { LanguageBarGlass, type LanguageData } from './glass/specialized/language-bar-glass';
import { HeaderNavGlass } from './glass/sections/header-nav-glass';
import { TrustScoreCardGlass, type MetricData } from './glass/sections/trust-score-card-glass';
import { ProfileHeaderGlass } from './glass/sections/profile-header-glass';
import { CareerStatsGlass, type YearData } from './glass/sections/career-stats-glass';
import { FlagsSectionGlass, type FlagData } from './glass/sections/flags-section-glass';
import {
  ProjectsListGlass,
  type Repository,
  type OwnershipFilter,
  type SortField,
  type SortOrder,
} from './glass/sections/projects-list-glass';

import '@/glass-theme.css';

const themes: ThemeName[] = ['light', 'aurora', 'glass'];

const themeConfig: Record<ThemeName, { label: string; icon: typeof Sun }> = {
  light: { label: 'Light', icon: Sun },
  aurora: { label: 'Aurora', icon: Moon },
  glass: { label: 'Glass', icon: Palette },
};

// Demo data
const languages: LanguageData[] = [
  { name: 'TypeScript', percent: 56, color: 'bg-blue-500' },
  { name: 'HTML', percent: 22, color: 'bg-orange-500' },
  { name: 'JavaScript', percent: 13, color: 'bg-yellow-400' },
  { name: 'Python', percent: 9, color: 'bg-emerald-500' },
];

const metrics: MetricData[] = [
  { title: 'Regularity', value: 84, variant: 'success' },
  { title: 'Impact', value: 45, variant: 'warning' },
  { title: 'Diversity', value: 78, variant: 'default' },
  { title: 'Collaboration', value: 12, variant: 'destructive' },
];

const years: YearData[] = [
  { year: 2025, emoji: '🔥', label: 'Peak', commits: '629', progress: 70, prs: 43, repos: 5 },
  { year: 2024, emoji: '📈', label: 'Growth', commits: '901', progress: 100, prs: 0, repos: 3 },
  { year: 2023, emoji: '🌱', label: 'Start', commits: '712', progress: 79, prs: 4, repos: 5 },
];

const flags: FlagData[] = [
  {
    type: 'danger',
    title: 'No collaboration',
    description: '0 PRs to external repos · 0 code reviews',
  },
  {
    type: 'warning',
    title: 'Burst activity pattern',
    description: '3 days with 50+ commits · Uneven distribution',
  },
];

const repos: Repository[] = [
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
    issues: ['Empty commits (avg 3 lines/commit)', 'Burst: 67 commits on Oct 15'],
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

export function DesktopShowcase() {
  const { theme, cycleTheme } = useTheme();

  // State
  const [flagsExpanded, setFlagsExpanded] = useState(true);
  const [activeNavTab, setActiveNavTab] = useState('overview');

  // ProjectsList state
  const [ownershipFilter, setOwnershipFilter] = useState<OwnershipFilter>('your');
  const [sortBy, setSortBy] = useState<SortField>('commits');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [modalOpen, setModalOpen] = useState(false);

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
  const NextIcon = themeConfig[nextTheme].icon;

  const dropdownItems = [
    { icon: User, label: 'Profile', onClick: () => {} },
    { icon: Settings, label: 'Settings', onClick: () => {} },
    { icon: Folder, label: 'Projects', onClick: () => {} },
    { divider: true },
    { icon: LogOut, label: 'Sign out', danger: true, onClick: () => {} },
  ];

  return (
    <div className="min-h-screen font-sans" data-testid="desktop-showcase">
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 lg:space-y-10">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Desktop Demo
              </h1>
              <p className="text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                GitHub Analytics UI · {themeConfig[theme].label} theme
              </p>
            </div>
            <ButtonGlass variant="secondary" icon={NextIcon} onClick={cycleTheme}>
              {themeConfig[nextTheme].label}
            </ButtonGlass>
          </div>

          {/* Header Navigation */}
          <div data-testid="section-header-nav">
            <HeaderNavGlass username="Yhooi2" onThemeToggle={cycleTheme} />
          </div>

          {/* Profile Header */}
          <div data-testid="section-profile-header">
            <ProfileHeaderGlass
              name="Artem Safronov"
              username="Yhooi2"
              joinDate="Jan 2023"
              stats={{ repos: 11, followers: 1, following: 5 }}
              languages={languages}
            />
          </div>

          {/* Trust Score */}
          <div data-testid="section-trust-score">
            <TrustScoreCardGlass score={72} metrics={metrics} />
          </div>

          {/* Two Column Layout: Left (33%) - Flags + Career Stats, Right (67%) - Projects */}
          {/* Mobile: Stack vertically */}
          <div className="grid md:grid-cols-[33%_67%] gap-6 md:gap-8">
            {/* Left Column: Flags + Career Stats (33%) */}
            <div className="space-y-6 md:space-y-8">
              {/* Flags Section */}
              <div data-testid="section-flags">
                <FlagsSectionGlass
                  flags={flags}
                  expanded={false}
                  onToggle={() => setFlagsExpanded(!flagsExpanded)}
                />
              </div>

              {/* Career Stats */}
              <div data-testid="section-career-stats">
                <CareerStatsGlass totalCommits={2242} totalPRs={47} totalRepos={11} years={years} />
              </div>
            </div>

            {/* Right Column: Repository Cards (67%) */}
            <div data-testid="section-repos">
              <ProjectsListGlass
                repositories={repos}
                ownershipFilter={ownershipFilter}
                onOwnershipChange={setOwnershipFilter}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={(field, order) => {
                  setSortBy(field);
                  setSortOrder(order);
                }}
              />
            </div>
          </div>

          {/* Tabs, Dropdown & Modal */}
          <GlassCard
            className="p-6 md:p-8"
            intensity="strong"
            hover={false}
            data-testid="section-tabs-dropdown"
          >
            <h2
              className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 md:mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Tabs, Dropdown & Modal
            </h2>
            <div className="space-y-4">
              <TabsGlass.Root value={activeNavTab} onValueChange={setActiveNavTab}>
                <TabsGlass.List>
                  <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
                  <TabsGlass.Trigger value="repos">Repositories</TabsGlass.Trigger>
                  <TabsGlass.Trigger value="activity">Activity</TabsGlass.Trigger>
                </TabsGlass.List>
              </TabsGlass.Root>
              <div className="flex items-center gap-4 flex-wrap">
                <DropdownGlass
                  trigger={
                    <ButtonGlass variant="secondary" icon={ChevronDown} iconPosition="right">
                      Menu
                    </ButtonGlass>
                  }
                  items={dropdownItems}
                />
                <ButtonGlass variant="ghost" onClick={() => setModalOpen(true)}>
                  Open Modal
                </ButtonGlass>
                <TooltipGlass content="This is a tooltip!" position="top">
                  <ButtonGlass variant="ghost" size="sm">
                    Hover me (top)
                  </ButtonGlass>
                </TooltipGlass>
                <TooltipGlass content="Bottom tooltip" position="bottom">
                  <ButtonGlass variant="ghost" size="sm">
                    Hover me (bottom)
                  </ButtonGlass>
                </TooltipGlass>
              </div>
            </div>
          </GlassCard>

          {/* Buttons */}
          <ButtonsBlock data-testid="section-buttons" />

          {/* Form Elements */}
          <FormElementsBlock data-testid="section-forms" />

          {/* Notifications & Alerts */}
          <NotificationsBlock data-testid="section-notifications" />

          {/* Badges & Status */}
          <BadgesBlock data-testid="section-badges" />

          {/* Progress & Loading */}
          <ProgressBlock data-testid="section-progress" />

          {/* Avatars with Status */}
          <AvatarGalleryBlock data-testid="section-avatars" />

          {/* Language Bar */}
          <GlassCard
            className="p-6 md:p-8"
            intensity="strong"
            hover={false}
            data-testid="section-language-bar"
          >
            <h2
              className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 md:mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Language Bar
            </h2>
            <LanguageBarGlass languages={languages} />
          </GlassCard>

          {/* Footer */}
          <footer className="text-center py-6 text-xs" style={{ color: 'var(--footer-text)' }}>
            GitHub Analytics Desktop Demo · {themeConfig[theme].label} Theme
          </footer>
        </div>
      </div>

      {/* Modal */}
      <ModalGlass.Root open={modalOpen} onOpenChange={setModalOpen} size="sm">
        <ModalGlass.Overlay />
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Modal Title</ModalGlass.Title>
            <ModalGlass.Close />
          </ModalGlass.Header>
          <ModalGlass.Body>
            <p className="mb-4">
              This is a modal dialog with glassmorphism styling. It includes a backdrop blur effect
              and smooth animations.
            </p>
            <div className="flex gap-3 justify-end">
              <ButtonGlass variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </ButtonGlass>
              <ButtonGlass variant="primary" onClick={() => setModalOpen(false)}>
                Confirm
              </ButtonGlass>
            </div>
          </ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Root>
    </div>
  );
}

export default DesktopShowcase;
