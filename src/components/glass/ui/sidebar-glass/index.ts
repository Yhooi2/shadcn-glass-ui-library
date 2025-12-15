/**
 * SidebarGlass Component
 *
 * A glassmorphism sidebar component with 100% shadcn/ui Sidebar API compatibility.
 * Supports collapsible modes (offcanvas/icon/none), variants (sidebar/floating/inset),
 * mobile drawer, keyboard shortcuts, and cookie persistence.
 *
 * @example
 * ```tsx
 * import { SidebarGlass, useSidebar } from '@/components/glass/ui/sidebar-glass';
 *
 * function App() {
 *   return (
 *     <SidebarGlass.Provider>
 *       <SidebarGlass.Root>
 *         <SidebarGlass.Header>
 *           <Logo />
 *         </SidebarGlass.Header>
 *         <SidebarGlass.Content>
 *           <SidebarGlass.Group>
 *             <SidebarGlass.GroupLabel>Navigation</SidebarGlass.GroupLabel>
 *             <SidebarGlass.GroupContent>
 *               <SidebarGlass.Menu>
 *                 <SidebarGlass.MenuItem>
 *                   <SidebarGlass.MenuButton isActive>
 *                     <Home /> Dashboard
 *                   </SidebarGlass.MenuButton>
 *                 </SidebarGlass.MenuItem>
 *               </SidebarGlass.Menu>
 *             </SidebarGlass.GroupContent>
 *           </SidebarGlass.Group>
 *         </SidebarGlass.Content>
 *         <SidebarGlass.Footer>
 *           <UserMenu />
 *         </SidebarGlass.Footer>
 *         <SidebarGlass.Rail />
 *       </SidebarGlass.Root>
 *       <SidebarGlass.Inset>
 *         <main>Content</main>
 *       </SidebarGlass.Inset>
 *     </SidebarGlass.Provider>
 *   );
 * }
 * ```
 *
 * @module sidebar-glass
 */

// Context exports
export {
  SidebarProvider,
  useSidebar,
  type SidebarContextValue,
  type SidebarProviderProps,
  type SidebarSide,
  type SidebarVariant,
  type SidebarCollapsible,
} from './sidebar-context';

// Core component exports
export {
  SidebarRoot,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
  type SidebarRootProps,
  type SidebarHeaderProps,
  type SidebarContentProps,
  type SidebarFooterProps,
  type SidebarRailProps,
  type SidebarInsetProps,
  type SidebarTriggerProps,
  type SidebarSeparatorProps,
} from './sidebar-glass';

// Menu component exports
export {
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
  useSidebarMenuSub,
  type SidebarGroupProps,
  type SidebarGroupLabelProps,
  type SidebarGroupActionProps,
  type SidebarGroupContentProps,
  type SidebarMenuProps,
  type SidebarMenuItemProps,
  type SidebarMenuButtonProps,
  type SidebarMenuButtonSize,
  type SidebarMenuButtonVariant,
  type SidebarMenuActionProps,
  type SidebarMenuBadgeProps,
  type SidebarMenuSkeletonProps,
  type SidebarMenuSubProps,
  type SidebarMenuSubItemProps,
  type SidebarMenuSubButtonProps,
} from './sidebar-menu';

// Import all components for compound export
import { SidebarProvider } from './sidebar-context';
import {
  SidebarRoot,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
} from './sidebar-glass';
import {
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
} from './sidebar-menu';

/**
 * SidebarGlass compound component
 *
 * 100% API compatible with shadcn/ui Sidebar.
 *
 * @example
 * ```tsx
 * <SidebarGlass.Provider>
 *   <SidebarGlass.Root>
 *     <SidebarGlass.Header />
 *     <SidebarGlass.Content>
 *       <SidebarGlass.Menu>
 *         <SidebarGlass.MenuItem>
 *           <SidebarGlass.MenuButton>Item</SidebarGlass.MenuButton>
 *         </SidebarGlass.MenuItem>
 *       </SidebarGlass.Menu>
 *     </SidebarGlass.Content>
 *     <SidebarGlass.Footer />
 *   </SidebarGlass.Root>
 *   <SidebarGlass.Inset>
 *     <main>Content</main>
 *   </SidebarGlass.Inset>
 * </SidebarGlass.Provider>
 * ```
 */
export const SidebarGlass = {
  // Context
  Provider: SidebarProvider,

  // Layout
  Root: SidebarRoot,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Rail: SidebarRail,
  Inset: SidebarInset,
  Trigger: SidebarTrigger,
  Separator: SidebarSeparator,

  // Groups
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  GroupAction: SidebarGroupAction,
  GroupContent: SidebarGroupContent,

  // Menu
  Menu: SidebarMenu,
  MenuItem: SidebarMenuItem,
  MenuButton: SidebarMenuButton,
  MenuAction: SidebarMenuAction,
  MenuBadge: SidebarMenuBadge,
  MenuSkeleton: SidebarMenuSkeleton,

  // Submenu
  MenuSub: SidebarMenuSub,
  MenuSubItem: SidebarMenuSubItem,
  MenuSubButton: SidebarMenuSubButton,
};
