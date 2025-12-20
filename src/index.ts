// ========================================
// SHADCN GLASS UI - MAIN ENTRY POINT
// Modern glassmorphism UI component library
// v2.3.2 - Optimized package size (90% reduction)
// ========================================

// ========================================
// CORE UI COMPONENTS (Level 1 - 18 components)
// ========================================

// AlertGlass - Compound Components
export {
  AlertGlass,
  AlertGlassTitle,
  AlertGlassDescription,
} from './components/glass/ui/alert-glass';

// AvatarGlass - Compound Components + Simple Wrapper
export {
  AvatarGlass,
  AvatarGlassImage,
  AvatarGlassFallback,
  AvatarGlassSimple,
} from './components/glass/ui/avatar-glass';

export { BadgeGlass } from './components/glass/ui/badge-glass';
export { ButtonGlass } from './components/glass/ui/button-glass';
export { CheckboxGlass, Checkbox } from './components/glass/ui/checkbox-glass';
export type { CheckedState } from './components/glass/ui/checkbox-glass';
export { CircularProgressGlass } from './components/glass/ui/circular-progress-glass';
export { ComboBoxGlass } from './components/glass/ui/combobox-glass';

// DropdownGlass - Simple API + Compound Components
export { DropdownGlass } from './components/glass/ui/dropdown-glass';
export {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
  DropdownMenuGlassCheckboxItem,
  DropdownMenuGlassRadioItem,
  DropdownMenuGlassLabel,
  DropdownMenuGlassSeparator,
  DropdownMenuGlassShortcut,
  DropdownMenuGlassGroup,
  DropdownMenuGlassPortal,
  DropdownMenuGlassSub,
  DropdownMenuGlassSubContent,
  DropdownMenuGlassSubTrigger,
  DropdownMenuGlassRadioGroup,
} from './components/glass/ui/dropdown-menu-glass';

export { GlassCard } from './components/glass/ui/glass-card';

// CardGlass - Compound Component with shadcn/ui Card API compatibility
export {
  CardGlass,
  CardGlassRoot,
  CardGlassHeader,
  CardGlassTitle,
  CardGlassDescription,
  CardGlassAction,
  CardGlassContent,
  CardGlassFooter,
} from './components/glass/ui/card-glass';

export { InputGlass } from './components/glass/ui/input-glass';

// ModalGlass - Compound Components + shadcn/ui Dialog compatible aliases
export {
  ModalGlass,
  ModalRoot,
  ModalTrigger,
  ModalPortal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
  // shadcn/ui Dialog-compatible aliases
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './components/glass/ui/modal-glass';
export type { ModalRootProps, ModalContentProps } from './components/glass/ui/modal-glass';

export { NotificationGlass } from './components/glass/ui/notification-glass';

// SheetGlass - Compound Components + shadcn/ui Sheet compatible aliases
export {
  SheetGlass,
  SheetRoot,
  SheetTrigger,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
  // shadcn/ui Sheet-compatible alias
  Sheet,
} from './components/glass/ui/sheet-glass';
export type { SheetContentProps, SheetSide } from './components/glass/ui/sheet-glass';

// PopoverGlass - Compound Components + Legacy Wrapper
export {
  PopoverGlass,
  PopoverGlassTrigger,
  PopoverGlassContent,
  PopoverGlassAnchor,
  PopoverGlassLegacy,
} from './components/glass/ui/popover-glass';

export { SkeletonGlass } from './components/glass/ui/skeleton-glass';
export { SliderGlass } from './components/glass/ui/slider-glass';
export { StepperGlass } from './components/glass/ui/stepper-glass';
// TabsGlass - Compound Components + shadcn/ui compatible separate exports
export {
  TabsGlass,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './components/glass/ui/tabs-glass';
export type {
  TabsRootProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './components/glass/ui/tabs-glass';
export { ToggleGlass } from './components/glass/ui/toggle-glass';

// SidebarGlass - Compound Components (100% shadcn/ui Sidebar compatible)
export { SidebarGlass, useSidebar } from './components/glass/ui/sidebar-glass';

// TooltipGlass - Compound Components + Simple Wrapper
export {
  TooltipGlassProvider,
  TooltipGlass,
  TooltipGlassTrigger,
  TooltipGlassContent,
  TooltipGlassSimple,
} from './components/glass/ui/tooltip-glass';

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
// COMPOSITE COMPONENTS (Level 4 - 14 components)
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
export {
  SplitLayoutGlass,
  SplitLayoutAccordion,
  useSplitLayout,
  useSplitLayoutOptional,
} from './components/glass/composite/split-layout-glass';
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
  // AvatarGlass is now Radix-based compound component - no props
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
  // TooltipGlass is now Radix-based compound component - no props
  TabItem,
  SkeletonGlassProps,
  SkeletonVariant,
  SliderGlassProps,
} from './lib/types';

// CardGlass types
export type { CardGlassRootProps } from './components/glass/ui/card-glass';

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

export type {
  SplitLayoutContextValue,
  SplitLayoutProviderProps,
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
  SplitLayoutAccordionRootProps,
  SplitLayoutAccordionItemProps,
  Breakpoint as SplitLayoutBreakpoint,
  MobileMode as SplitLayoutMobileMode,
} from './components/glass/composite/split-layout-glass';

// SidebarGlass types
export type {
  SidebarContextValue,
  SidebarProviderProps,
  SidebarSide,
  SidebarVariant,
  SidebarCollapsible,
  SidebarRootProps,
  SidebarHeaderProps,
  SidebarContentProps,
  SidebarFooterProps,
  SidebarRailProps,
  SidebarInsetProps,
  SidebarTriggerProps,
  SidebarSeparatorProps,
  SidebarGroupProps,
  SidebarGroupLabelProps,
  SidebarGroupActionProps,
  SidebarGroupContentProps,
  SidebarMenuProps,
  SidebarMenuItemProps,
  SidebarMenuButtonProps,
  SidebarMenuButtonSize,
  SidebarMenuButtonVariant,
  SidebarMenuActionProps,
  SidebarMenuBadgeProps,
  SidebarMenuSkeletonProps,
  SidebarMenuSubProps,
  SidebarMenuSubItemProps,
  SidebarMenuSubButtonProps,
} from './components/glass/ui/sidebar-glass';

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
