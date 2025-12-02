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
export type { ButtonGlassProps } from "@/components/ButtonGlass";

export type { NotificationGlassProps } from "@/components/NotificationGlass";
export type { NotificationType } from "@/lib/variants/notification-glass-variants";

export type {
  AvatarGlassProps,
  AvatarStatus,
} from "@/components/AvatarGlass";
export type { AvatarSize } from "@/lib/variants/avatar-glass-variants";

export type {
  DropdownGlassProps,
  DropdownItem,
} from "@/components/DropdownGlass";

export type { ModalGlassProps } from "@/components/ModalGlass";
export type { ModalSize } from "@/lib/variants/modal-glass-variants";

export type { GlassCardProps } from "@/components/GlassCard";
export type { GlowType, IntensityType } from "@/lib/variants/glass-card-variants";

export type { InputGlassProps } from "@/components/InputGlass";

export type { ProgressGlassProps } from "@/components/ProgressGlass";
export type { ProgressGradient } from "@/lib/variants/progress-glass-variants";

export type { BadgeGlassProps } from "@/components/BadgeGlass";
export type { BadgeVariant } from "@/lib/variants/badge-glass-variants";

export type { AlertGlassProps } from "@/components/AlertGlass";
export type { AlertType } from "@/lib/variants/alert-glass-variants";

export type { ToggleGlassProps } from "@/components/ToggleGlass";

export type { CheckboxGlassProps } from "@/components/CheckboxGlass";

export type { TooltipGlassProps } from "@/components/TooltipGlass";
export type { TooltipPosition } from "@/lib/variants/tooltip-glass-variants";

export type {
  TabsGlassProps,
  TabItem,
} from "@/components/TabsGlass";

export type { SkeletonGlassProps } from "@/components/SkeletonGlass";
export type { SkeletonVariant } from "@/lib/variants/skeleton-glass-variants";

export type { SliderGlassProps } from "@/components/SliderGlass";
