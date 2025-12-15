/**
 * Composite Glass Components (Level 3)
 *
 * Composed UI elements built from atomic components and primitives
 * for better reusability and consistency.
 */

export { UserInfoGlass, type UserInfoGlassProps } from './user-info-glass';

export { UserStatsLineGlass, type UserStatsLineGlassProps } from './user-stats-line-glass';

export {
  TrustScoreDisplayGlass,
  type TrustScoreDisplayGlassProps,
} from './trust-score-display-glass';

export {
  MetricsGridGlass,
  type MetricsGridGlassProps,
  type MetricData,
} from './metrics-grid-glass';

export {
  CareerStatsHeaderGlass,
  type CareerStatsHeaderGlassProps,
} from './career-stats-header-glass';

export {
  RepositoryHeaderGlass,
  type RepositoryHeaderGlassProps,
  type RepositoryFlagType,
} from './repository-header-glass';

export {
  RepositoryMetadataGlass,
  type RepositoryMetadataGlassProps,
} from './repository-metadata-glass';

export {
  ContributionMetricsGlass,
  type ContributionMetricsGlassProps,
} from './contribution-metrics-glass';

// GlassCard moved to ui/ - import from '@/components/glass/ui/glass-card'

export { MetricCardGlass, type MetricCardGlassProps } from './metric-card-glass';

export {
  CircularMetricGlass,
  type CircularMetricGlassProps,
  type CircularMetricColor,
} from './circular-metric-glass';

export { YearCardGlass, type YearCardGlassProps } from './year-card-glass';

export { AICardGlass, type AICardGlassProps } from './ai-card-glass';

export { RepositoryCardGlass, type RepositoryCardGlassProps } from './repository-card-glass';

// SplitLayoutGlass - Compound Components API only (like ModalGlass)
export {
  SplitLayoutGlass,
  SplitLayoutAccordion,
  useSplitLayout,
  useSplitLayoutOptional,
} from './split-layout-glass';

export type {
  SplitLayoutProviderProps,
  SplitLayoutContextValue,
  SplitLayoutRootProps,
  SplitLayoutSidebarProps,
  SplitLayoutSidebarHeaderProps,
  SplitLayoutSidebarContentProps,
  SplitLayoutSidebarFooterProps,
  SplitLayoutMainProps,
  SplitLayoutMainHeaderProps,
  SplitLayoutMainContentProps,
  SplitLayoutMainFooterProps,
  SplitLayoutTriggerProps,
  Breakpoint as SplitLayoutBreakpoint,
  MobileMode as SplitLayoutMobileMode,
  SplitLayoutAccordionRootProps,
  SplitLayoutAccordionItemProps,
} from './split-layout-glass';
