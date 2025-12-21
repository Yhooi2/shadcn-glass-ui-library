// ========================================
// SHADCN GLASS UI - MAIN ENTRY POINT
// Modern glassmorphism UI component library
// v2.3.2 - Optimized package size (90% reduction)
// ========================================

// ========================================
// CORE UI COMPONENTS (Level 1 - 18 components)
// ========================================

// AlertGlass - Compound Components + shadcn/ui aliases
export {
  AlertGlass,
  AlertGlassTitle,
  AlertGlassDescription,
  // shadcn/ui compatible aliases
  Alert,
  AlertTitle,
  AlertDescription,
} from './components/glass/ui/alert-glass';

// AvatarGlass - Compound Components + Simple Wrapper + shadcn/ui aliases
export {
  AvatarGlass,
  AvatarGlassImage,
  AvatarGlassFallback,
  AvatarGlassSimple,
  // shadcn/ui compatible aliases
  Avatar,
  AvatarImage,
  AvatarFallback,
} from './components/glass/ui/avatar-glass';

export { BadgeGlass, Badge } from './components/glass/ui/badge-glass';
export { ButtonGlass, Button } from './components/glass/ui/button-glass';
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
  // shadcn/ui compatible aliases
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
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
  // shadcn/ui compatible aliases
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components/glass/ui/card-glass';

// InputGlass - Full form field + simple Input alias
export { InputGlass, Input } from './components/glass/ui/input-glass';

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

export { SkeletonGlass, Skeleton } from './components/glass/ui/skeleton-glass';
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
export { ToggleGlass, Toggle } from './components/glass/ui/toggle-glass';

// SwitchGlass - Radix Switch based + shadcn/ui alias
export { SwitchGlass, Switch } from './components/glass/ui/switch-glass';

// SelectGlass - Compound Components + shadcn/ui aliases
export {
  SelectGlass,
  SelectGlassGroup,
  SelectGlassValue,
  SelectGlassTrigger,
  SelectGlassScrollUpButton,
  SelectGlassScrollDownButton,
  SelectGlassContent,
  SelectGlassLabel,
  SelectGlassItem,
  SelectGlassSeparator,
  // shadcn/ui compatible aliases
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from './components/glass/ui/select-glass';

// SidebarGlass - Compound Components (100% shadcn/ui Sidebar compatible)
export { SidebarGlass, useSidebar } from './components/glass/ui/sidebar-glass';

// TooltipGlass - Compound Components + Simple Wrapper + shadcn/ui aliases
export {
  TooltipGlassProvider,
  TooltipGlass,
  TooltipGlassTrigger,
  TooltipGlassContent,
  TooltipGlassSimple,
  // shadcn/ui compatible aliases
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
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
export { ProgressGlass, Progress } from './components/glass/specialized/progress-glass';
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

// RepositoryCardGlass - Compound Components (Issue #15)
export {
  RepositoryCardGlass,
  RepositoryCardRoot,
  RepositoryCardHeader,
  RepositoryCardName,
  RepositoryCardStatus,
  RepositoryCardStars,
  RepositoryCardMeta,
  RepositoryCardLanguages,
  RepositoryCardStatsLine,
  RepositoryCardExpandedContent,
  RepositoryCardIssues,
  RepositoryCardMetrics,
  RepositoryCardMetricItem,
  RepositoryCardActions,
  useRepositoryCard,
  useRepositoryCardOptional,
} from './components/glass/composite/repository-card-glass';

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

// YearCardGlass - Compound Components (Issue #15)
export {
  YearCardGlass,
  YearCardRoot,
  YearCardHeader,
  YearCardYear,
  YearCardBadge,
  YearCardValue,
  YearCardProgress,
  YearCardSparkline,
  YearCardExpandedContent,
  YearCardStats,
  YearCardStatItem,
  YearCardInsights,
  YearCardInsightItem,
  YearCardAction,
  useYearCard,
  useYearCardOptional,
} from './components/glass/composite/year-card-glass';

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

// SwitchGlass types
export type { SwitchGlassProps } from './components/glass/ui/switch-glass';

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

// YearCardGlass types (Issue #15)
export type {
  YearCardGlassProps,
  YearCardGlassInsight,
  YearCardGlassStat,
  YearCardRootProps,
  YearCardHeaderProps,
  YearCardYearProps,
  YearCardBadgeProps,
  YearCardValueProps,
  YearCardProgressProps,
  YearCardSparklineProps,
  YearCardExpandedContentProps,
  YearCardStatsProps,
  YearCardStatItemProps,
  YearCardInsightsProps,
  YearCardInsightItemProps,
  YearCardActionProps,
} from './components/glass/composite/year-card-glass';

// RepositoryCardGlass types (Issue #15)
export type {
  RepositoryCardGlassLegacyProps as RepositoryCardGlassProps,
  RepositoryCardRootProps,
  RepositoryCardHeaderProps,
  RepositoryCardNameProps,
  RepositoryCardStatusProps,
  RepositoryCardStarsProps,
  RepositoryCardMetaProps,
  RepositoryCardLanguagesProps,
  RepositoryCardStatsProps,
  RepositoryCardExpandedContentProps,
  RepositoryCardIssuesProps,
  RepositoryCardMetricsProps,
  RepositoryCardMetricItemProps,
  RepositoryCardActionsProps,
  RepositoryFlagType,
} from './components/glass/composite/repository-card-glass';

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
