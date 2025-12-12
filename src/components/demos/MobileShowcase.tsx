// ========================================
// MOBILE SHOWCASE DEMO PAGE
// GitHub Analytics Mobile UI showcase
// ========================================

import { useState, type CSSProperties } from 'react';
import {
  Sun,
  Moon,
  Palette,
  Github,
  Search,
  ExternalLink,
  FolderGit2,
  Users,
  Sparkles,
  Clock,
  X,
} from 'lucide-react';
import { useTheme, type ThemeName } from '@/lib/theme-context';

// Import glass components
import { GlassCard } from '@/components/glass/ui/glass-card';
import { ButtonGlass } from '@/components/glass/ui/button-glass';
import { BadgeGlass } from '@/components/glass/ui/badge-glass';
import { ProfileAvatarGlass } from '@/components/glass/specialized/profile-avatar-glass';
import {
  LanguageBarGlass,
  type LanguageData,
} from '@/components/glass/specialized/language-bar-glass';
import {
  TrustScoreCardGlass,
  type MetricData,
} from '@/components/glass/sections/trust-score-card-glass';
import { FlagsSectionGlass, type FlagData } from '@/components/glass/sections/flags-section-glass';
import { CareerStatsGlass, type YearData } from '@/components/glass/sections/career-stats-glass';
import {
  ProjectsListGlass,
  type Repository,
} from '@/components/glass/sections/projects-list-glass';

import '@/glass-theme.css';

const themes: ThemeName[] = ['light', 'aurora', 'glass'];

const themeConfig: Record<ThemeName, { label: string; icon: typeof Sun }> = {
  light: { label: 'Light', icon: Sun },
  aurora: { label: 'Aurora', icon: Moon },
  glass: { label: 'Glass', icon: Palette },
};

// Demo data
const languages: LanguageData[] = [
  { name: 'TypeScript', percent: 56 }, // Uses default --language-typescript
  { name: 'HTML', percent: 22 }, // Uses default --language-html
  { name: 'JavaScript', percent: 13 }, // Uses default --language-javascript
  { name: 'Python', percent: 9 }, // Uses default --language-python
];

const metrics: MetricData[] = [
  { title: 'Reg', value: 84, variant: 'success' },
  { title: 'Imp', value: 45, variant: 'warning' },
  { title: 'Div', value: 78, variant: 'default' },
  { title: 'Collab', value: 12, variant: 'destructive' },
];

const years: YearData[] = [
  { year: 2025, emoji: '🔥', label: 'Peak', commits: '629', progress: 70 },
  { year: 2024, emoji: '📈', label: 'Growth', commits: '901', progress: 100 },
  { year: 2023, emoji: '🌱', label: 'Start', commits: '712', progress: 79 },
];

const flags: FlagData[] = [
  {
    type: 'danger',
    title: 'No collaboration',
    description: '0 PRs to external repos',
  },
  {
    type: 'warning',
    title: 'Burst activity',
    description: '3 days with 50+ commits',
  },
];

const repositories: Repository[] = [
  {
    name: 'Wildhaven-website',
    languages: 'JS 88% · Shell 11%',
    commits: 240,
    contribution: 75,
    stars: 1,
    flagType: 'green',
    issues: [],
    createdYear: 2024,
  },
  {
    name: 'study',
    languages: 'Python 92% · C 5%',
    commits: 177,
    contribution: 100,
    stars: 2,
    flagType: 'yellow',
    issues: ['Uneven activity (3 burst days)'],
    createdYear: 2023,
  },
  {
    name: 'bot-scripts',
    languages: 'Python 100%',
    commits: 89,
    contribution: 100,
    stars: 0,
    flagType: 'red',
    issues: ['Empty commits (avg 3 lines)', 'Burst: 67 commits on Oct 15'],
    createdYear: 2023,
  },
  {
    name: 'portfolio',
    languages: 'TypeScript 78% · CSS 22%',
    commits: 134,
    contribution: 100,
    stars: 0,
    flagType: 'green',
    issues: [],
    createdYear: 2025,
  },
  {
    name: 'git-course',
    languages: 'C++ 100%',
    commits: 150,
    contribution: 100,
    stars: 2,
    flagType: 'green',
    issues: [],
    createdYear: 2024,
  },
  {
    name: 'nextjs-app',
    languages: 'TypeScript 95%',
    commits: 56,
    contribution: 100,
    stars: 0,
    flagType: 'green',
    issues: [],
    createdYear: 2025,
  },
];

export function MobileShowcase() {
  const { theme, cycleTheme } = useTheme();
  const isGlass = theme === 'glass';

  // State
  const [flagsExpanded, setFlagsExpanded] = useState(false);
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
  const NextIcon = themeConfig[nextTheme].icon;

  const clearFilters = (): void => {
    setSelectedYear(null);
    setShowFlaggedOnly(false);
    setFlagsExpanded(false);
  };

  const handleFlagsToggle = (): void => {
    setFlagsExpanded(!flagsExpanded);
    if (!flagsExpanded) {
      setShowFlaggedOnly(true);
    } else {
      setShowFlaggedOnly(false);
    }
  };

  const bgStyles: CSSProperties = {
    background: 'linear-gradient(to bottom right, var(--bg-from), var(--bg-via), var(--bg-to))',
  };

  const orbStyles = {
    orb1: { background: 'var(--orb-1)' },
    orb2: { background: 'var(--orb-2)' },
    orb3: { background: 'var(--orb-3)' },
    orb4: { background: 'var(--orb-4)' },
    orb5: { background: 'var(--orb-5)' },
  };

  const headerStyles: CSSProperties = {
    background: 'var(--header-bg)',
    borderColor: 'var(--header-border)',
  };

  const iconBtnStyles: CSSProperties = {
    background: 'linear-gradient(to bottom right, var(--icon-btn-from), var(--icon-btn-to))',
    boxShadow: 'var(--icon-btn-shadow)',
  };

  const searchStyles: CSSProperties = {
    background: 'var(--search-bg)',
    borderColor: 'var(--search-border)',
  };

  const toggleBtnStyles: CSSProperties = {
    background: 'var(--search-bg)',
    borderColor: 'var(--search-border)',
    color: 'var(--text-secondary)',
  };

  return (
    <div
      className="min-h-screen font-['Inter',system-ui,sans-serif] relative overflow-hidden"
      data-testid="mobile-showcase"
    >
      {/* Background */}
      <div className="fixed inset-0 transition-all duration-500" style={bgStyles}>
        {/* Orbs */}
        {isGlass ? (
          <>
            <div
              className="absolute top-20 -left-20 w-72 h-72 rounded-full blur-3xl animate-pulse"
              style={orbStyles.orb1}
            />
            <div
              className="absolute top-1/3 -right-20 w-96 h-96 rounded-full blur-3xl"
              style={orbStyles.orb2}
            />
            <div
              className="absolute bottom-20 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse"
              style={{ ...orbStyles.orb3, animationDelay: '1s' }}
            />
            <div
              className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl"
              style={orbStyles.orb4}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
              style={orbStyles.orb5}
            />
          </>
        ) : (
          <>
            <div
              className="absolute top-10 -left-32 w-96 h-96 rounded-full blur-3xl transition-all duration-500"
              style={orbStyles.orb1}
            />
            <div
              className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-3xl transition-all duration-500"
              style={orbStyles.orb2}
            />
            <div
              className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full blur-3xl transition-all duration-500"
              style={orbStyles.orb3}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl transition-all duration-500"
              style={orbStyles.orb4}
            />
          </>
        )}

        {/* Grid */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: 'var(--grid-opacity)',
            backgroundImage:
              'linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div
          className="sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300"
          style={headerStyles}
          data-testid="section-header"
        >
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                style={iconBtnStyles}
              >
                <Github className="w-5 h-5" style={{ color: 'var(--icon-btn-text)' }} />
              </div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {isGlass ? 'Analytics' : 'User Analytics'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="flex items-center backdrop-blur-sm rounded-xl px-3 py-1.5 border transition-all duration-300"
                style={searchStyles}
              >
                <Search className="w-3.5 h-3.5 mr-2" style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Yhooi2
                </span>
              </div>
              <button
                onClick={cycleTheme}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 border"
                style={toggleBtnStyles}
                title={`Switch to ${themeConfig[nextTheme].label}`}
              >
                <NextIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Profile Card */}
          <GlassCard intensity="strong" glow="violet" className="p-5" data-testid="section-profile">
            <div className="flex items-start gap-4">
              <ProfileAvatarGlass initials="AS" size="lg" status="online" />
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                  Artem Safronov
                </h1>
                <div
                  className="flex items-center gap-1.5 text-sm mt-0.5"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span style={{ color: 'var(--text-accent)' }}>@Yhooi2</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  Joined January 2023
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mt-4 text-sm">
              <span
                className="flex items-center gap-1.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                <FolderGit2 className="w-4 h-4" style={{ color: '#a78bfa' }} />
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  11
                </span>{' '}
                repos
              </span>
              <span
                className="flex items-center gap-1.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Users className="w-4 h-4" style={{ color: '#60a5fa' }} />
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  1
                </span>{' '}
                follower
              </span>
              <span
                className="flex items-center gap-1.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Users className="w-4 h-4" style={{ color: '#22d3ee' }} />
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  5
                </span>{' '}
                following
              </span>
            </div>

            {/* Language Bar */}
            <div className="mt-4">
              <LanguageBarGlass languages={languages} />
            </div>
          </GlassCard>

          {/* AI Summary CTA */}
          <GlassCard
            intensity="medium"
            glow="blue"
            className={`p-4 ${isGlass ? 'bg-gradient-to-r from-violet-500/20 to-indigo-500/20' : ''}`}
            data-testid="section-ai-summary"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center"
                  style={{ boxShadow: '0 0 16px rgba(147,51,234,0.5)' }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold block" style={{ color: 'var(--text-primary)' }}>
                    AI Summary
                  </span>
                  <span
                    className="text-xs flex items-center gap-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <Clock className="w-3 h-3" /> ~30 sec
                  </span>
                </div>
              </div>
              <ButtonGlass variant="primary" size="sm" icon={Sparkles}>
                Generate
              </ButtonGlass>
            </div>
          </GlassCard>

          {/* Trust Score */}
          <div data-testid="section-trust-score">
            <TrustScoreCardGlass score={72} metrics={metrics} />
          </div>

          {/* Active Filters */}
          {(selectedYear || showFlaggedOnly) && (
            <div className="flex items-center gap-2 flex-wrap" data-testid="section-filters">
              {selectedYear && (
                <BadgeGlass variant="info">
                  Year: {selectedYear}
                  <button onClick={() => setSelectedYear(null)} className="ml-1.5">
                    <X className="w-3 h-3" />
                  </button>
                </BadgeGlass>
              )}
              {showFlaggedOnly && (
                <BadgeGlass variant="warning">
                  Flagged only
                  <button
                    onClick={() => {
                      setShowFlaggedOnly(false);
                      setFlagsExpanded(false);
                    }}
                    className="ml-1.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </BadgeGlass>
              )}
              <button
                onClick={clearFilters}
                className="text-xs underline"
                style={{ color: 'var(--text-muted)' }}
              >
                Clear all
              </button>
            </div>
          )}

          {/* Flags Section */}
          <div data-testid="section-flags">
            <FlagsSectionGlass
              flags={flags}
              expanded={flagsExpanded}
              onToggle={handleFlagsToggle}
            />
          </div>

          {/* Career Stats */}
          <div data-testid="section-career-stats">
            <CareerStatsGlass totalCommits={2242} totalPRs={47} totalRepos={11} years={years} />
          </div>

          {/* Projects List */}
          <div data-testid="section-projects">
            <ProjectsListGlass
              repositories={repositories}
              showFlaggedOnly={showFlaggedOnly}
              selectedYear={selectedYear}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Footer */}
          <div className="text-center text-xs py-6" style={{ color: 'var(--footer-text)' }}>
            GitHub Analytics · {themeConfig[theme].label} Theme
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileShowcase;
