// ========================================
// GLASS THEME - RE-EXPORTS
// All types are exported from components
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

export type {
  NotificationGlassProps,
  NotificationType,
} from "@/components/NotificationGlass";

export type {
  AvatarGlassProps,
  AvatarSize,
  AvatarStatus,
} from "@/components/AvatarGlass";

export type {
  DropdownGlassProps,
  DropdownItem,
} from "@/components/DropdownGlass";

export type {
  ModalGlassProps,
  ModalSize,
} from "@/components/ModalGlass";

export type {
  GlassCardProps,
  GlowType,
  IntensityType,
} from "@/components/GlassCard";

export type { InputGlassProps } from "@/components/InputGlass";

export type {
  ProgressGlassProps,
  ProgressGradient,
} from "@/components/ProgressGlass";

export type {
  BadgeGlassProps,
  BadgeVariant,
} from "@/components/BadgeGlass";

export type {
  AlertGlassProps,
  AlertType,
} from "@/components/AlertGlass";

export type { ToggleGlassProps } from "@/components/ToggleGlass";

export type { CheckboxGlassProps } from "@/components/CheckboxGlass";

export type {
  TooltipGlassProps,
  TooltipPosition,
} from "@/components/TooltipGlass";

export type {
  TabsGlassProps,
  TabItem,
} from "@/components/TabsGlass";

export type {
  SkeletonGlassProps,
  SkeletonVariant,
} from "@/components/SkeletonGlass";

export type { SliderGlassProps } from "@/components/SliderGlass";
