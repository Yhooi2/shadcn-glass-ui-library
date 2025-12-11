// ========================================
// SHADCN GLASS UI - MAIN ENTRY POINT
// Modern glassmorphism UI component library
// ========================================

// ========================================
// CORE UI COMPONENTS (Level 1 - 18 components)
// ========================================
export { AlertGlass } from './components/glass/ui/alert-glass';
export { AvatarGlass } from './components/glass/ui/avatar-glass';
export { BadgeGlass } from './components/glass/ui/badge-glass';
export { ButtonGlass } from './components/glass/ui/button-glass';
export { CheckboxGlass } from './components/glass/ui/checkbox-glass';
export { CircularProgressGlass } from './components/glass/ui/circular-progress-glass';
export { ComboBoxGlass } from './components/glass/ui/combobox-glass';
export { DropdownGlass } from './components/glass/ui/dropdown-glass';
export { GlassCard } from './components/glass/ui/glass-card';
export { InputGlass } from './components/glass/ui/input-glass';
export { ModalGlass } from './components/glass/ui/modal-glass';
export { NotificationGlass } from './components/glass/ui/notification-glass';
export { PopoverGlass } from './components/glass/ui/popover-glass';
export { SkeletonGlass } from './components/glass/ui/skeleton-glass';
export { SliderGlass } from './components/glass/ui/slider-glass';
export { StepperGlass } from './components/glass/ui/stepper-glass';
export { TabsGlass } from './components/glass/ui/tabs-glass';
export { ToggleGlass } from './components/glass/ui/toggle-glass';
export { TooltipGlass } from './components/glass/ui/tooltip-glass';

// ========================================
// ATOMIC COMPONENTS (Level 2 - 7 components)
// ========================================
export { ExpandableHeaderGlass } from './components/glass/atomic/expandable-header-glass';
export { IconButtonGlass } from './components/glass/atomic/icon-button-glass';
export { InsightCardGlass } from './components/glass/atomic/insight-card-glass';
export { SearchBoxGlass } from './components/glass/atomic/search-box-glass';
export { SortDropdownGlass } from './components/glass/atomic/sort-dropdown-glass';
export { StatItemGlass } from './components/glass/atomic/stat-item-glass';
export { ThemeToggleGlass } from './components/glass/atomic/theme-toggle-glass';

// ========================================
// SPECIALIZED COMPONENTS (Level 3 - 9 components)
// ========================================
export { BaseProgressGlass } from './components/glass/specialized/base-progress-glass';
export { FlagAlertGlass } from './components/glass/specialized/flag-alert-glass';
export { LanguageBarGlass } from './components/glass/specialized/language-bar-glass';
export { ProfileAvatarGlass } from './components/glass/specialized/profile-avatar-glass';
export { ProgressGlass } from './components/glass/specialized/progress-glass';
export { RainbowProgressGlass } from './components/glass/specialized/rainbow-progress-glass';
export { SegmentedControlGlass } from './components/glass/specialized/segmented-control-glass';
export { SparklineGlass } from './components/glass/specialized/sparkline-glass';
export { StatusIndicatorGlass } from './components/glass/specialized/status-indicator-glass';

// ========================================
// COMPOSITE COMPONENTS (Level 4 - 13 components)
// ========================================
export { AICardGlass } from './components/glass/composite/ai-card-glass';
export { CareerStatsHeaderGlass } from './components/glass/composite/career-stats-header-glass';
export { CircularMetricGlass } from './components/glass/composite/circular-metric-glass';
export { ContributionMetricsGlass } from './components/glass/composite/contribution-metrics-glass';
export { MetricCardGlass } from './components/glass/composite/metric-card-glass';
export { MetricsGridGlass } from './components/glass/composite/metrics-grid-glass';
export { RepositoryCardGlass } from './components/glass/composite/repository-card-glass';
export { RepositoryHeaderGlass } from './components/glass/composite/repository-header-glass';
export { RepositoryMetadataGlass } from './components/glass/composite/repository-metadata-glass';
export { TrustScoreDisplayGlass } from './components/glass/composite/trust-score-display-glass';
export { UserInfoGlass } from './components/glass/composite/user-info-glass';
export { UserStatsLineGlass } from './components/glass/composite/user-stats-line-glass';
export { YearCardGlass } from './components/glass/composite/year-card-glass';

// ========================================
// SECTION COMPONENTS (Level 5 - 7 components)
// ========================================
export { CareerStatsGlass } from './components/glass/sections/career-stats-glass';
export { FlagsSectionGlass } from './components/glass/sections/flags-section-glass';
export { HeaderBrandingGlass } from './components/glass/sections/header-branding-glass';
export { HeaderNavGlass } from './components/glass/sections/header-nav-glass';
export { ProfileHeaderGlass } from './components/glass/sections/profile-header-glass';
export { ProjectsListGlass } from './components/glass/sections/projects-list-glass';
export { TrustScoreCardGlass } from './components/glass/sections/trust-score-card-glass';

// ========================================
// PRIMITIVES (Level 0 - 3 components)
// ========================================
export { FormFieldWrapper } from './components/glass/primitives/form-field-wrapper';
export { InteractiveCard } from './components/glass/primitives/interactive-card';
export { TouchTarget } from './components/glass/primitives/touch-target';

// ========================================
// UTILITIES
// ========================================
export { cn } from './lib/utils';

// Theme system
export {
  ThemeProvider,
  useTheme,
  THEMES,
  THEME_CONFIG,
  getNextTheme,
  getThemeConfig,
  type Theme,
  type ThemeConfig,
  type ThemeContextValue,
} from './lib/theme-context';

// ========================================
// HOOKS
// ========================================
export { useFocus } from './lib/hooks/use-focus';
export { useHover } from './lib/hooks/use-hover';
export { useResponsive } from './lib/hooks/use-responsive';
export { useWallpaperTint } from './lib/hooks/use-wallpaper-tint';

// ========================================
// TYPES
// ========================================

// Re-export all component types from lib/types.ts
export type {
  ButtonGlassProps,
  NotificationGlassProps,
  NotificationType,
  AvatarGlassProps,
  AvatarStatus,
  AvatarSize,
  DropdownGlassProps,
  DropdownItem,
  ModalSize,
  GlassCardProps,
  GlowType,
  IntensityType,
  InputGlassProps,
  ProgressGlassProps,
  ProgressGradient,
  BadgeGlassProps,
  BadgeVariant,
  AlertGlassProps,
  AlertType,
  ToggleGlassProps,
  CheckboxGlassProps,
  TooltipGlassProps,
  TooltipPosition,
  TabItem,
  SkeletonGlassProps,
  SkeletonVariant,
  SliderGlassProps,
} from './lib/types';

// Atomic component types
export type { InsightCardGlassProps } from './components/glass/atomic/insight-card-glass';

// Specialized component types
export type {
  SparklineGlassProps,
  SparklineConfig,
} from './components/glass/specialized/sparkline-glass';

// Composite component types
export type {
  MetricCardGlassProps,
  MetricColor,
  MetricTrend,
  TrendDirection,
} from './components/glass/composite/metric-card-glass';

export type {
  YearCardGlassProps,
  YearCardGlassInsight,
  YearCardGlassStat,
} from './components/glass/composite/year-card-glass';

// ========================================
// CHART UTILITIES (shadcn/ui pattern)
// ========================================
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  useChart,
} from './components/ui/chart';

export type { ChartConfig } from './components/ui/chart';

// Re-export Recharts for direct access (unwrapped pattern)
export { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts';

// ========================================
// VARIANTS (CVA)
// ========================================
// Export all CVA variant functions for advanced usage
export * from './lib/variants';
