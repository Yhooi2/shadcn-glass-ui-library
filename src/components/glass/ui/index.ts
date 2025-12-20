/**
 * Glass UI Components - Barrel Exports
 *
 * Level 1: UI Components (24 components)
 * Base glassmorphism components with theme-aware styling
 * Note: ProgressGlass moved to specialized/
 * Note: SelectGlass removed in v1.0.0 (replaced by ComboBoxGlass)
 */

// UI Components
export { AlertGlass, AlertGlassTitle, AlertGlassDescription } from './alert-glass';
export type {
  AlertGlassProps,
  AlertGlassTitleProps,
  AlertGlassDescriptionProps,
} from './alert-glass';

export {
  AvatarGlass,
  AvatarGlassImage,
  AvatarGlassFallback,
  AvatarGlassSimple,
} from './avatar-glass';
export type { AvatarStatus, AvatarSize } from './avatar-glass';

export { BadgeGlass } from './badge-glass';
export type { BadgeGlassProps } from './badge-glass';

export { ButtonGlass } from './button-glass';
export type { ButtonGlassProps } from './button-glass';

export { CheckboxGlass } from './checkbox-glass';
export type { CheckboxGlassProps } from './checkbox-glass';

export { CircularProgressGlass } from './circular-progress-glass';
export type { CircularProgressGlassProps } from './circular-progress-glass';

export { ComboBoxGlass } from './combobox-glass';
export type { ComboBoxGlassProps } from './combobox-glass';

export { DropdownGlass } from './dropdown-glass';
export type { DropdownGlassProps } from './dropdown-glass';

export { GlassCard } from './glass-card';
export type { GlassCardProps } from './glass-card';

// CardGlass - Compound component with shadcn/ui Card API compatibility
export {
  CardGlass,
  CardGlassRoot,
  CardGlassHeader,
  CardGlassTitle,
  CardGlassDescription,
  CardGlassAction,
  CardGlassContent,
  CardGlassFooter,
} from './card-glass';
export type { CardGlassRootProps } from './card-glass';

export { InputGlass } from './input-glass';
export type { InputGlassProps } from './input-glass';

export { ModalGlass } from './modal-glass';

export { NotificationGlass } from './notification-glass';
export type { NotificationGlassProps } from './notification-glass';

export {
  PopoverGlass,
  PopoverGlassTrigger,
  PopoverGlassContent,
  PopoverGlassAnchor,
  PopoverGlassLegacy,
} from './popover-glass';
export type { PopoverGlassLegacyProps } from './popover-glass';

export { SkeletonGlass } from './skeleton-glass';
export type { SkeletonGlassProps } from './skeleton-glass';

export { SliderGlass } from './slider-glass';
export type { SliderGlassProps } from './slider-glass';

export { TabsGlass } from './tabs-glass';

export { ToggleGlass } from './toggle-glass';
export type { ToggleGlassProps } from './toggle-glass';

export {
  TooltipGlass,
  TooltipGlassProvider,
  TooltipGlassTrigger,
  TooltipGlassContent,
  TooltipGlassSimple,
} from './tooltip-glass';

// DropdownMenuGlass - Compound component with shadcn/ui DropdownMenu API compatibility
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
} from './dropdown-menu-glass';
export type { DropdownMenuGlassItemProps } from './dropdown-menu-glass';

// StepperGlass - Compound component for step-by-step navigation
export {
  StepperGlass,
  StepperRoot,
  StepperList,
  StepperStep,
  StepperContent,
} from './stepper-glass';
export type {
  StepperRootProps,
  StepperListProps,
  StepperStepProps,
  StepperContentProps,
  StepperOrientation,
  StepperVariant,
  StepperSize,
  StepStatus,
} from './stepper-glass';

// SidebarGlass - Compound component with 100% shadcn/ui Sidebar API compatibility
export {
  SidebarGlass,
  SidebarProvider,
  useSidebar,
  SidebarRoot,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from './sidebar-glass';
export type {
  SidebarContextValue,
  SidebarProviderProps,
  SidebarSide,
  SidebarVariant,
  SidebarCollapsible,
  SidebarRootProps,
} from './sidebar-glass';
