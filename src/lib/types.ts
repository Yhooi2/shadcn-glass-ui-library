// ========================================
// GLASS THEME - RE-EXPORTS
// Component types from components, variant types from lib/variants
// ========================================

// Theme types
export type {
  Theme,
  ThemeConfig,
  ThemeContextValue,
} from "@/lib/theme-context";

export {
  THEMES,
  THEME_CONFIG,
  ThemeProvider,
  useTheme,
  getNextTheme,
  getThemeConfig,
} from "@/lib/theme-context";

// Component types
export type { ButtonGlassProps } from "@/components/glass/ui/button-glass";

export type { NotificationGlassProps } from "@/components/glass/ui/notification-glass";
export type { NotificationType } from "@/lib/variants/notification-glass-variants";

export type {
  AvatarGlassProps,
  AvatarStatus,
} from "@/components/glass/ui/avatar-glass";
export type { AvatarSize } from "@/lib/variants/avatar-glass-variants";

export type {
  DropdownGlassProps,
  DropdownItem,
} from "@/components/glass/ui/dropdown-glass";

export type { ModalGlassProps } from "@/components/glass/ui/modal-glass";
export type { ModalSize } from "@/lib/variants/modal-glass-variants";

export type { GlassCardProps } from "@/components/glass/composite/glass-card";
export type { GlowType, IntensityType } from "@/lib/variants/glass-card-variants";

export type { InputGlassProps } from "@/components/glass/ui/input-glass";

export type { ProgressGlassProps } from "@/components/glass/specialized/progress-glass";
export type { ProgressGradient } from "@/lib/variants/progress-glass-variants";

export type { BadgeGlassProps } from "@/components/glass/ui/badge-glass";
export type { BadgeVariant } from "@/lib/variants/badge-glass-variants";

export type { AlertGlassProps } from "@/components/glass/ui/alert-glass";
export type { AlertType } from "@/lib/variants/alert-glass-variants";

export type { ToggleGlassProps } from "@/components/glass/ui/toggle-glass";

export type { CheckboxGlassProps } from "@/components/glass/ui/checkbox-glass";

export type { TooltipGlassProps } from "@/components/glass/ui/tooltip-glass";
export type { TooltipPosition } from "@/lib/variants/tooltip-glass-variants";

export type {
  TabsGlassProps,
  TabItem,
} from "@/components/glass/ui/tabs-glass";

export type { SkeletonGlassProps } from "@/components/glass/ui/skeleton-glass";
export type { SkeletonVariant } from "@/lib/variants/skeleton-glass-variants";

export type { SliderGlassProps } from "@/components/glass/ui/slider-glass";
