/* eslint-disable react-refresh/only-export-components */
/**
 * SidebarGlass Menu Components
 *
 * Menu components for building navigation within the sidebar.
 * 100% API compatible with shadcn/ui Sidebar menu components.
 *
 * @module sidebar-menu
 */

import {
  forwardRef,
  type ReactNode,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  createContext,
  useContext,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { useSidebar } from './sidebar-context';
import { TooltipGlassSimple } from '@/components/glass/ui/tooltip-glass';
import { SkeletonGlass } from '@/components/glass/ui/skeleton-glass';

// ========================================
// SIDEBAR GROUP
// ========================================

export interface SidebarGroupProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

/**
 * SidebarGlass.Group - Container for a group of menu items
 */
export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group"
        className={cn('flex flex-col gap-2 p-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarGroup.displayName = 'SidebarGlass.Group';

// ========================================
// SIDEBAR GROUP LABEL
// ========================================

export interface SidebarGroupLabelProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  /** Render as child element */
  asChild?: boolean;
}

/**
 * SidebarGlass.GroupLabel - Label for a group of menu items
 */
export const SidebarGroupLabel = forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ children, asChild = false, className, ...props }, ref) => {
    const { state } = useSidebar();
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        data-sidebar="group-label"
        data-state={state}
        className={cn(
          'flex h-8 shrink-0 items-center px-2',
          'text-xs font-medium text-[var(--sidebar-foreground)]/60',
          'transition-[margin,opacity] duration-200 ease-linear',
          // Collapsed state
          'group-data-[state=collapsed]/sidebar:h-0 group-data-[state=collapsed]/sidebar:overflow-hidden',
          'group-data-[state=collapsed]/sidebar:opacity-0',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

SidebarGroupLabel.displayName = 'SidebarGlass.GroupLabel';

// ========================================
// SIDEBAR GROUP ACTION
// ========================================

export interface SidebarGroupActionProps extends ComponentPropsWithoutRef<'button'> {
  /** Render as child element */
  asChild?: boolean;
}

/**
 * SidebarGlass.GroupAction - Action button in group header
 */
export const SidebarGroupAction = forwardRef<HTMLButtonElement, SidebarGroupActionProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        data-sidebar="group-action"
        className={cn(
          'absolute right-2 top-2.5',
          'flex aspect-square w-5 items-center justify-center',
          'rounded-md p-0 text-[var(--sidebar-foreground)]/60',
          'ring-[var(--sidebar-ring)]',
          'transition-transform hover:bg-[var(--sidebar-accent)]',
          'hover:text-[var(--sidebar-foreground)]',
          'focus-visible:outline-none focus-visible:ring-2',
          '[&>svg]:size-4 [&>svg]:shrink-0',
          // Hide when collapsed
          'group-data-[state=collapsed]/sidebar:hidden',
          // Show on hover
          'after:absolute after:-inset-2 after:md:hidden',
          className
        )}
        {...props}
      />
    );
  }
);

SidebarGroupAction.displayName = 'SidebarGlass.GroupAction';

// ========================================
// SIDEBAR GROUP CONTENT
// ========================================

export interface SidebarGroupContentProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

/**
 * SidebarGlass.GroupContent - Content wrapper for group items
 */
export const SidebarGroupContent = forwardRef<HTMLDivElement, SidebarGroupContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group-content"
        className={cn('flex flex-col gap-1', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarGroupContent.displayName = 'SidebarGlass.GroupContent';

// ========================================
// SIDEBAR MENU
// ========================================

export interface SidebarMenuProps extends ComponentPropsWithoutRef<'ul'> {
  children: ReactNode;
}

/**
 * SidebarGlass.Menu - Container for menu items
 */
export const SidebarMenu = forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        data-sidebar="menu"
        className={cn('flex w-full flex-col gap-1', className)}
        {...props}
      >
        {children}
      </ul>
    );
  }
);

SidebarMenu.displayName = 'SidebarGlass.Menu';

// ========================================
// SIDEBAR MENU ITEM
// ========================================

export interface SidebarMenuItemProps extends ComponentPropsWithoutRef<'li'> {
  children: ReactNode;
}

/**
 * SidebarGlass.MenuItem - Container for a single menu item
 */
export const SidebarMenuItem = forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        data-sidebar="menu-item"
        className={cn('group/menu-item relative text-[var(--sidebar-foreground)]/60', className)}
        {...props}
      >
        {children}
      </li>
    );
  }
);

SidebarMenuItem.displayName = 'SidebarGlass.MenuItem';

// ========================================
// SIDEBAR MENU BUTTON
// ========================================

export type SidebarMenuButtonSize = 'default' | 'sm' | 'lg';
export type SidebarMenuButtonVariant = 'default' | 'outline';

export interface SidebarMenuButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** Render as child element */
  asChild?: boolean;
  /** Whether this item is active */
  isActive?: boolean;
  /** Tooltip text when collapsed */
  tooltip?: string | ReactNode;
  /** Button size */
  size?: SidebarMenuButtonSize;
  /** Button variant */
  variant?: SidebarMenuButtonVariant;
}

const menuButtonSizeClasses: Record<SidebarMenuButtonSize, string> = {
  default: 'h-8 text-sm',
  sm: 'h-7 text-xs',
  lg: 'h-10 text-sm group-data-[state=collapsed]/sidebar:!p-0',
};

/**
 * SidebarGlass.MenuButton - Interactive menu button
 */
export const SidebarMenuButton = forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  (
    {
      asChild = false,
      isActive = false,
      tooltip,
      size = 'default',
      variant = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { state, isMobile } = useSidebar();
    const Comp = asChild ? Slot : 'button';

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-active={isActive}
        data-size={size}
        className={cn(
          'peer/menu-button flex w-full items-center gap-2',
          'overflow-hidden rounded-md px-2',
          'ring-[var(--sidebar-ring)]',
          'transition-[width,height,padding] duration-200 ease-linear',
          'focus-visible:outline-none focus-visible:ring-2',
          'active:bg-[var(--sidebar-accent)] active:text-[var(--sidebar-accent-foreground)]',
          'disabled:pointer-events-none disabled:opacity-50',
          'aria-disabled:pointer-events-none aria-disabled:opacity-50',
          '[&>span:last-child]:truncate',
          '[&>svg]:size-4 [&>svg]:shrink-0',
          // Size variants
          menuButtonSizeClasses[size],
          // Variant styles
          variant === 'default' && [
            'hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]',
          ],
          variant === 'outline' && [
            'bg-transparent shadow-none',
            'hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]',
            'hover:shadow-[0_0_0_1px_var(--sidebar-border)]',
          ],
          // Active state
          isActive && [
            'bg-[var(--sidebar-primary)] text-[var(--sidebar-primary-foreground)]',
            'hover:bg-[var(--sidebar-primary)] hover:text-[var(--sidebar-primary-foreground)]',
          ],
          // Collapsed state - icon only
          'group-data-[state=collapsed]/sidebar:w-8 group-data-[state=collapsed]/sidebar:!px-0',
          'group-data-[state=collapsed]/sidebar:justify-center',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );

    // No tooltip on mobile or expanded state
    if (!tooltip || isMobile || state === 'expanded') {
      return button;
    }

    return (
      <TooltipGlassSimple
        content={typeof tooltip === 'string' ? tooltip : String(tooltip)}
        side="right"
      >
        {button}
      </TooltipGlassSimple>
    );
  }
);

SidebarMenuButton.displayName = 'SidebarGlass.MenuButton';

// ========================================
// SIDEBAR MENU ACTION
// ========================================

export interface SidebarMenuActionProps extends ComponentPropsWithoutRef<'button'> {
  /** Render as child element */
  asChild?: boolean;
  /** Only show on hover */
  showOnHover?: boolean;
}

/**
 * SidebarGlass.MenuAction - Action button within menu item
 */
export const SidebarMenuAction = forwardRef<HTMLButtonElement, SidebarMenuActionProps>(
  ({ asChild = false, showOnHover = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        data-sidebar="menu-action"
        className={cn(
          'absolute right-1 top-1.5',
          'flex aspect-square w-5 items-center justify-center',
          'rounded-md p-0 text-[var(--sidebar-foreground)]/60',
          'ring-[var(--sidebar-ring)]',
          'transition-transform hover:bg-[var(--sidebar-accent)]',
          'hover:text-[var(--sidebar-foreground)]',
          'focus-visible:outline-none focus-visible:ring-2',
          '[&>svg]:size-4 [&>svg]:shrink-0',
          // Hide when collapsed
          'group-data-[state=collapsed]/sidebar:hidden',
          // Show on hover
          showOnHover &&
            'peer-hover/menu-button:opacity-100 group-focus-within/menu-item:opacity-100',
          showOnHover && 'data-[state=open]:opacity-100 md:opacity-0',
          // Tap area for touch
          'after:absolute after:-inset-2 after:md:hidden',
          className
        )}
        {...props}
      />
    );
  }
);

SidebarMenuAction.displayName = 'SidebarGlass.MenuAction';

// ========================================
// SIDEBAR MENU BADGE
// ========================================

export interface SidebarMenuBadgeProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

/**
 * SidebarGlass.MenuBadge - Badge within menu item
 */
export const SidebarMenuBadge = forwardRef<HTMLDivElement, SidebarMenuBadgeProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="menu-badge"
        className={cn(
          'pointer-events-none absolute right-1 flex h-5 min-w-5',
          'select-none items-center justify-center',
          'rounded-md px-1 text-xs font-medium tabular-nums',
          'text-[var(--sidebar-foreground)]/60',
          // Hide when collapsed
          'group-data-[state=collapsed]/sidebar:hidden',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarMenuBadge.displayName = 'SidebarGlass.MenuBadge';

// ========================================
// SIDEBAR MENU SKELETON
// ========================================

export interface SidebarMenuSkeletonProps extends ComponentPropsWithoutRef<'div'> {
  /** Show icon placeholder */
  showIcon?: boolean;
}

/**
 * SidebarGlass.MenuSkeleton - Loading skeleton for menu items
 */
export const SidebarMenuSkeleton = forwardRef<HTMLDivElement, SidebarMenuSkeletonProps>(
  ({ showIcon = false, className, ...props }, ref) => {
    // Fixed width for consistent appearance (avoids Math.random during render)
    const width = '70%';

    return (
      <div
        ref={ref}
        data-sidebar="menu-skeleton"
        className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
        {...props}
      >
        {showIcon && <SkeletonGlass className="size-4 rounded-md" />}
        <SkeletonGlass
          className="h-4 max-w-[var(--skeleton-width)] flex-1"
          style={{ '--skeleton-width': width } as CSSProperties}
        />
      </div>
    );
  }
);

SidebarMenuSkeleton.displayName = 'SidebarGlass.MenuSkeleton';

// ========================================
// SIDEBAR MENU SUB (SUBMENU CONTAINER)
// ========================================

// Context for submenu state
interface SidebarMenuSubContextValue {
  open: boolean;
}

const SidebarMenuSubContext = createContext<SidebarMenuSubContextValue | null>(null);

export interface SidebarMenuSubProps extends ComponentPropsWithoutRef<'ul'> {
  children: ReactNode;
}

/**
 * SidebarGlass.MenuSub - Container for submenu items
 */
export const SidebarMenuSub = forwardRef<HTMLUListElement, SidebarMenuSubProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SidebarMenuSubContext.Provider value={{ open: true }}>
        <ul
          ref={ref}
          data-sidebar="menu-sub"
          className={cn(
            'flex min-w-0 flex-col gap-1',
            'mx-3.5 border-l border-[var(--sidebar-border)] px-2.5 py-0.5',
            // Hide when collapsed
            'group-data-[state=collapsed]/sidebar:hidden',
            className
          )}
          {...props}
        >
          {children}
        </ul>
      </SidebarMenuSubContext.Provider>
    );
  }
);

SidebarMenuSub.displayName = 'SidebarGlass.MenuSub';

// ========================================
// SIDEBAR MENU SUB ITEM
// ========================================

export interface SidebarMenuSubItemProps extends ComponentPropsWithoutRef<'li'> {
  children: ReactNode;
}

/**
 * SidebarGlass.MenuSubItem - Container for a submenu item
 */
export const SidebarMenuSubItem = forwardRef<HTMLLIElement, SidebarMenuSubItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <li ref={ref} data-sidebar="menu-sub-item" className={cn(className)} {...props}>
        {children}
      </li>
    );
  }
);

SidebarMenuSubItem.displayName = 'SidebarGlass.MenuSubItem';

// ========================================
// SIDEBAR MENU SUB BUTTON
// ========================================

export interface SidebarMenuSubButtonProps extends ComponentPropsWithoutRef<'a'> {
  /** Render as child element */
  asChild?: boolean;
  /** Whether this item is active */
  isActive?: boolean;
  /** Button size */
  size?: 'sm' | 'md';
}

/**
 * SidebarGlass.MenuSubButton - Interactive submenu button
 */
export const SidebarMenuSubButton = forwardRef<HTMLAnchorElement, SidebarMenuSubButtonProps>(
  ({ asChild = false, isActive = false, size = 'md', className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';

    return (
      <Comp
        ref={ref}
        data-sidebar="menu-sub-button"
        data-active={isActive}
        data-size={size}
        className={cn(
          'flex min-w-0 items-center gap-2',
          '-ml-px rounded-md border-l border-transparent',
          'text-[var(--sidebar-foreground)]/60',
          'ring-[var(--sidebar-ring)]',
          'transition-colors',
          'hover:border-[var(--sidebar-border)]',
          'hover:bg-[var(--sidebar-accent)]',
          'hover:text-[var(--sidebar-accent-foreground)]',
          'focus-visible:outline-none focus-visible:ring-2',
          'active:bg-[var(--sidebar-accent)] active:text-[var(--sidebar-accent-foreground)]',
          'disabled:pointer-events-none disabled:opacity-50',
          '[&>span:last-child]:truncate',
          '[&>svg]:size-4 [&>svg]:shrink-0',
          // Size variants
          size === 'sm' && 'h-7 px-2 text-xs',
          size === 'md' && 'h-8 px-2 text-sm',
          // Active state
          isActive && ['border-[var(--sidebar-primary)]', 'text-[var(--sidebar-foreground)]'],
          className
        )}
        {...props}
      />
    );
  }
);

SidebarMenuSubButton.displayName = 'SidebarGlass.MenuSubButton';

// Export hook for submenu context (optional use)
export function useSidebarMenuSub() {
  const context = useContext(SidebarMenuSubContext);
  return context;
}
