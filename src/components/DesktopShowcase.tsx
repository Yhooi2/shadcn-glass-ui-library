// ========================================
// DESKTOP SHOWCASE DEMO PAGE
// Complete GitHub Analytics UI showcase
// ========================================

import { useState, type CSSProperties } from "react";
import {
  Sun,
  Moon,
  Palette,
  ChevronDown,
  User,
  Settings,
  Folder,
  LogOut,
  Sparkles,
  Eye,
  Trash2,
  Check,
  Mail,
  Lock,
} from "lucide-react";
import { useTheme, type ThemeName } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";

// Import all glass components
import { GlassCard } from "./GlassCard";
import { ButtonGlass } from "./ButtonGlass";
import { InputGlass } from "./InputGlass";
import { BadgeGlass } from "./BadgeGlass";
import { AlertGlass } from "./AlertGlass";
import { ProgressGlass } from "./ProgressGlass";
import { ToggleGlass } from "./ToggleGlass";
import { CheckboxGlass } from "./CheckboxGlass";
import { TabsGlass } from "./TabsGlass";
import { TooltipGlass } from "./TooltipGlass";
import { SliderGlass } from "./SliderGlass";
import { SkeletonGlass } from "./SkeletonGlass";
import { ModalGlass } from "./ModalGlass";
import { DropdownGlass } from "./DropdownGlass";
import { AvatarGlass } from "./AvatarGlass";
import { NotificationGlass } from "./NotificationGlass";

// Import new components
import { StatusIndicatorGlass } from "./StatusIndicatorGlass";
import { SegmentedControlGlass } from "./SegmentedControlGlass";
import { RainbowProgressGlass } from "./RainbowProgressGlass";
import { LanguageBarGlass, type LanguageData } from "./LanguageBarGlass";
import { HeaderNavGlass } from "./HeaderNavGlass";
import { TrustScoreCardGlass, type MetricData } from "./TrustScoreCardGlass";
import { ProfileHeaderGlass } from "./ProfileHeaderGlass";
import { CareerStatsGlass, type YearData } from "./CareerStatsGlass";
import { FlagsSectionGlass, type FlagData } from "./FlagsSectionGlass";
import { RepoCardGlass, type RepoLanguage, type RepoStatus } from "./RepoCardGlass";

import "@/glass-theme.css";

const themes: ThemeName[] = ["light", "aurora", "glass"];

const themeConfig: Record<ThemeName, { label: string; icon: typeof Sun }> = {
  light: { label: "Light", icon: Sun },
  aurora: { label: "Aurora", icon: Moon },
  glass: { label: "Glass", icon: Palette },
};

// Demo data
const languages: LanguageData[] = [
  { name: "TypeScript", percent: 56, color: "bg-blue-500" },
  { name: "HTML", percent: 22, color: "bg-orange-500" },
  { name: "JavaScript", percent: 13, color: "bg-yellow-400" },
  { name: "Python", percent: 9, color: "bg-emerald-500" },
];

const metrics: MetricData[] = [
  { label: "Regularity", value: 84, color: "emerald" },
  { label: "Impact", value: 45, color: "amber" },
  { label: "Diversity", value: 78, color: "blue" },
  { label: "Collaboration", value: 12, color: "red" },
];

const years: YearData[] = [
  { year: 2025, emoji: "🔥", label: "Peak", commits: "629", progress: 70 },
  { year: 2024, emoji: "📈", label: "Growth", commits: "901", progress: 100 },
  { year: 2023, emoji: "🌱", label: "Start", commits: "712", progress: 79 },
];

const flags: FlagData[] = [
  {
    type: "danger",
    title: "No collaboration",
    description: "0 PRs to external repos · 0 code reviews",
  },
  {
    type: "warning",
    title: "Burst activity pattern",
    description: "3 days with 50+ commits · Uneven distribution",
  },
];

interface RepoData {
  name: string;
  status: RepoStatus;
  stars: number;
  commits: string;
  contribution: number;
  languages: RepoLanguage[];
  issues: string[];
}

const repos: RepoData[] = [
  {
    name: "bot-scripts",
    status: "danger",
    stars: 0,
    commits: "89",
    contribution: 100,
    languages: [{ name: "Python", percent: 100, color: "bg-emerald-500" }],
    issues: ["Empty commits (avg 3 lines/commit)", "Burst: 67 commits on Oct 15"],
  },
  {
    name: "portfolio",
    status: "good",
    stars: 5,
    commits: "134",
    contribution: 100,
    languages: [
      { name: "TypeScript", percent: 78, color: "bg-blue-500" },
      { name: "CSS", percent: 22, color: "bg-purple-500" },
    ],
    issues: [],
  },
];

const navTabs = [
  { id: "overview", label: "Overview" },
  { id: "repos", label: "Repositories" },
  { id: "activity", label: "Activity" },
];

export function DesktopShowcase(): JSX.Element {
  const { theme, cycleTheme } = useTheme();
  const t = themeStyles[theme];

  // State
  const [flagsExpanded, setFlagsExpanded] = useState(true);
  const [expandedRepo, setExpandedRepo] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState("your");
  const [activeNavTab, setActiveNavTab] = useState("overview");
  const [toggle1, setToggle1] = useState(true);
  const [checkbox1, setCheckbox1] = useState(true);
  const [sliderValue, setSliderValue] = useState(50);
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
  const NextIcon = themeConfig[nextTheme].icon;

  const dropdownItems = [
    { icon: User, label: "Profile", onClick: () => {} },
    { icon: Settings, label: "Settings", onClick: () => {} },
    { icon: Folder, label: "Projects", onClick: () => {} },
    { divider: true },
    { icon: LogOut, label: "Sign out", danger: true, onClick: () => {} },
  ];

  const bgStyles: CSSProperties = {
    background: `linear-gradient(135deg, ${t.bgFrom}, ${t.bgVia}, ${t.bgTo})`,
  };

  const orbStyles = {
    orb1: { background: t.orb1, animation: "orb-float 8s ease-in-out infinite" },
    orb2: { background: t.orb2, animation: "orb-float 8s ease-in-out infinite 2s" },
    orb3: { background: t.orb3, animation: "orb-float 8s ease-in-out infinite 4s" },
  };

  return (
    <div className="min-h-screen font-sans" data-testid="desktop-showcase">
      {/* Background */}
      <div className="fixed inset-0 transition-all duration-500" style={bgStyles}>
        <div
          className="absolute top-20 -left-20 w-80 h-80 rounded-full blur-3xl"
          style={orbStyles.orb1}
        />
        <div
          className="absolute top-1/3 -right-20 w-96 h-96 rounded-full blur-3xl"
          style={orbStyles.orb2}
        />
        <div
          className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full blur-3xl"
          style={orbStyles.orb3}
        />
        {theme === "glass" && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{ background: t.orb5 ?? "rgba(139,92,246,0.10)" }}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: t.textPrimary }}
              >
                Desktop Demo
              </h1>
              <p className="text-sm" style={{ color: t.textSecondary }}>
                GitHub Analytics UI · {themeConfig[theme].label} theme
              </p>
            </div>
            <ButtonGlass variant="secondary" icon={NextIcon} onClick={cycleTheme}>
              {themeConfig[nextTheme].label}
            </ButtonGlass>
          </div>

          {/* Header Navigation */}
          <div data-testid="section-header-nav">
            <h2 className="text-lg font-semibold mb-3" style={{ color: t.textPrimary }}>
              Header Navigation
            </h2>
            <HeaderNavGlass username="Yhooi2" onThemeToggle={cycleTheme} />
          </div>

          {/* Trust Score */}
          <div data-testid="section-trust-score">
            <h2 className="text-lg font-semibold mb-3" style={{ color: t.textPrimary }}>
              Trust Score
            </h2>
            <TrustScoreCardGlass score={72} metrics={metrics} />
          </div>

          {/* Profile Header */}
          <div data-testid="section-profile-header">
            <h2 className="text-lg font-semibold mb-3" style={{ color: t.textPrimary }}>
              Profile Header
            </h2>
            <ProfileHeaderGlass
              name="Artem Safronov"
              username="Yhooi2"
              joinDate="Jan 2023"
              stats={{ repos: 11, followers: 1, following: 5 }}
              languages={languages}
            />
          </div>

          {/* Two Column: Flags + Career Stats */}
          <div className="grid md:grid-cols-2 gap-6">
            <div data-testid="section-flags">
              <h2 className="text-lg font-semibold mb-3" style={{ color: t.textPrimary }}>
                Flags Section
              </h2>
              <FlagsSectionGlass
                flags={flags}
                expanded={flagsExpanded}
                onToggle={() => setFlagsExpanded(!flagsExpanded)}
              />
            </div>
            <div data-testid="section-career-stats">
              <h2 className="text-lg font-semibold mb-3" style={{ color: t.textPrimary }}>
                Career Stats
              </h2>
              <CareerStatsGlass
                totalCommits={2242}
                totalPRs={47}
                totalRepos={11}
                years={years}
              />
            </div>
          </div>

          {/* Repository Cards */}
          <div data-testid="section-repos">
            <h2 className="text-lg font-semibold mb-3" style={{ color: t.textPrimary }}>
              Repository Cards
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <SegmentedControlGlass
                options={[
                  { value: "your", label: "Your" },
                  { value: "contrib", label: "Contrib" },
                ]}
                value={activeTab}
                onChange={setActiveTab}
              />
              <BadgeGlass variant="violet">{repos.length} repos</BadgeGlass>
            </div>
            <div className="space-y-3">
              {repos.map((repo, idx) => (
                <RepoCardGlass
                  key={repo.name}
                  name={repo.name}
                  status={repo.status}
                  stars={repo.stars}
                  commits={repo.commits}
                  contribution={repo.contribution}
                  languages={repo.languages}
                  issues={repo.issues}
                  expanded={expandedRepo === idx}
                  onToggle={() => setExpandedRepo(expandedRepo === idx ? null : idx)}
                />
              ))}
            </div>
          </div>

          {/* Tabs, Dropdown & Modal */}
          <GlassCard
            className="p-6"
            intensity="strong"
            hover={false}
            data-testid="section-tabs-dropdown"
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: t.textPrimary }}>
              Tabs, Dropdown & Modal
            </h2>
            <div className="space-y-4">
              <TabsGlass
                tabs={navTabs}
                activeTab={activeNavTab}
                onChange={setActiveNavTab}
              />
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
          <GlassCard
            className="p-6"
            intensity="strong"
            hover={false}
            data-testid="section-buttons"
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: t.textPrimary }}>
              Buttons
            </h2>
            <div className="flex flex-wrap gap-3 mb-4">
              <ButtonGlass variant="primary" icon={Sparkles}>
                Primary
              </ButtonGlass>
              <ButtonGlass variant="secondary" icon={Settings}>
                Secondary
              </ButtonGlass>
              <ButtonGlass variant="ghost" icon={Eye}>
                Ghost
              </ButtonGlass>
              <ButtonGlass variant="danger" icon={Trash2}>
                Danger
              </ButtonGlass>
              <ButtonGlass variant="success" icon={Check}>
                Success
              </ButtonGlass>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonGlass size="sm">Small</ButtonGlass>
              <ButtonGlass size="md">Medium</ButtonGlass>
              <ButtonGlass size="lg">Large</ButtonGlass>
              <ButtonGlass loading>Loading</ButtonGlass>
              <ButtonGlass disabled>Disabled</ButtonGlass>
            </div>
          </GlassCard>

          {/* Form Elements */}
          <GlassCard
            className="p-6"
            intensity="strong"
            hover={false}
            data-testid="section-forms"
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: t.textPrimary }}>
              Form Elements
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <InputGlass
                label="Email"
                placeholder="Enter your email"
                icon={Mail}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <InputGlass
                label="Password"
                type="password"
                placeholder="Enter password"
                icon={Lock}
                iconPosition="right"
              />
              <div>
                <label
                  className="text-sm font-medium mb-2 block"
                  style={{ color: t.textSecondary }}
                >
                  Slider: {sliderValue}
                </label>
                <SliderGlass value={sliderValue} onChange={setSliderValue} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ToggleGlass checked={toggle1} onChange={setToggle1} />
                  <span className="text-sm" style={{ color: t.textSecondary }}>
                    Toggle
                  </span>
                </div>
                <CheckboxGlass
                  checked={checkbox1}
                  onChange={setCheckbox1}
                  label="Checkbox"
                />
              </div>
            </div>
          </GlassCard>

          {/* Alerts & Notifications */}
          <GlassCard
            className="p-6"
            intensity="strong"
            hover={false}
            data-testid="section-alerts"
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: t.textPrimary }}>
              Alerts & Notifications
            </h2>
            <div className="space-y-3 mb-6">
              <AlertGlass type="info" title="Information">
                This is an informational message.
              </AlertGlass>
              <AlertGlass type="success" title="Success!" dismissible>
                Your changes have been saved.
              </AlertGlass>
              <AlertGlass type="warning" title="Warning">
                Please review your settings.
              </AlertGlass>
              <AlertGlass type="error" title="Error">
                Something went wrong.
              </AlertGlass>
            </div>
            <div className="space-y-3">
              <NotificationGlass
                type="info"
                title="New update available"
                message="Version 2.0 is ready"
                onClose={() => {}}
              />
              <NotificationGlass
                type="success"
                title="Payment successful"
                message="Your payment has been processed"
                onClose={() => {}}
              />
            </div>
          </GlassCard>

          {/* Badges & Status */}
          <GlassCard
            className="p-6"
            intensity="strong"
            hover={false}
            data-testid="section-badges"
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: t.textPrimary }}>
              Badges & Status
            </h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <BadgeGlass>Default</BadgeGlass>
              <BadgeGlass variant="success">Success</BadgeGlass>
              <BadgeGlass variant="warning">Warning</BadgeGlass>
              <BadgeGlass variant="danger">Danger</BadgeGlass>
              <BadgeGlass variant="info">Info</BadgeGlass>
              <BadgeGlass variant="violet">Violet</BadgeGlass>
              <BadgeGlass variant="success" dot>
                With Dot
              </BadgeGlass>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <StatusIndicatorGlass type="green" size="large" />
                <span className="text-sm" style={{ color: t.textSecondary }}>
                  Good
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StatusIndicatorGlass type="yellow" size="large" />
                <span className="text-sm" style={{ color: t.textSecondary }}>
                  Warning
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StatusIndicatorGlass type="red" size="large" />
                <span className="text-sm" style={{ color: t.textSecondary }}>
                  Critical
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Progress & Loading */}
          <GlassCard
            className="p-6"
            intensity="strong"
            hover={false}
            data-testid="section-progress"
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: t.textPrimary }}>
              Progress & Loading
            </h2>
            <div className="space-y-4 mb-6">
              <ProgressGlass value={25} size="sm" gradient="cyan" />
              <ProgressGlass value={50} size="md" gradient="violet" />
              <ProgressGlass
                value={75}
                size="lg"
                gradient="amber"
                showLabel
              />
              <RainbowProgressGlass value={72} size="lg" />
            </div>
            <h3 className="text-sm font-medium mb-3" style={{ color: t.textSecondary }}>
              Skeleton Loading
            </h3>
            <div className="flex items-start gap-4">
              <SkeletonGlass variant="avatar" />
              <div className="flex-1 space-y-2">
                <SkeletonGlass variant="title" width="60%" />
                <SkeletonGlass variant="text" />
                <SkeletonGlass variant="text" width="80%" />
              </div>
            </div>
          </GlassCard>

          {/* Avatars with Status */}
          <GlassCard
            className="p-6"
            intensity="strong"
            hover={false}
            data-testid="section-avatars"
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: t.textPrimary }}>
              Avatars with Status
            </h2>
            <div className="flex items-center gap-4">
              <AvatarGlass name="John Doe" size="sm" />
              <AvatarGlass name="Jane Smith" size="md" status="online" />
              <AvatarGlass name="Bob Johnson" size="lg" status="busy" />
              <AvatarGlass name="Alice Brown" size="xl" status="away" />
            </div>
          </GlassCard>

          {/* Language Bar */}
          <GlassCard
            className="p-6"
            intensity="strong"
            hover={false}
            data-testid="section-language-bar"
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: t.textPrimary }}>
              Language Bar
            </h2>
            <LanguageBarGlass languages={languages} />
          </GlassCard>

          {/* Footer */}
          <footer className="text-center py-6 text-xs" style={{ color: t.footerText }}>
            GitHub Analytics Desktop Demo · {themeConfig[theme].label} Theme
          </footer>
        </div>
      </div>

      {/* Modal */}
      <ModalGlass
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Modal Title"
        size="md"
      >
        <p className="mb-4">
          This is a modal dialog with glassmorphism styling. It includes a backdrop blur
          effect and smooth animations.
        </p>
        <div className="flex gap-3 justify-end">
          <ButtonGlass variant="ghost" onClick={() => setModalOpen(false)}>
            Cancel
          </ButtonGlass>
          <ButtonGlass variant="primary" onClick={() => setModalOpen(false)}>
            Confirm
          </ButtonGlass>
        </div>
      </ModalGlass>
    </div>
  );
}

export default DesktopShowcase;
