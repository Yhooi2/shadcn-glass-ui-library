/**
 * SidebarGlass Core Components
 *
 * Layout components for building sidebars with glassmorphism effects.
 * 100% API compatible with shadcn/ui Sidebar.
 *
 * @module sidebar-glass
 */

import {
  forwardRef,
  type ReactNode,
  type CSSProperties,
  type ComponentPropsWithoutRef,
} from 'react';
import { PanelLeft } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import {
  useSidebar,
  type SidebarSide,
  type SidebarVariant,
  type SidebarCollapsible,
} from './sidebar-context';
import { ModalGlass } from '@/components/glass/ui/modal-glass';
import '@/glass-theme.css';

// ========================================
// SIDEBAR ROOT
// ========================================

export interface SidebarRootProps extends ComponentPropsWithoutRef<'aside'> {
  children: ReactNode;
  /** Override side from provider */
  side?: SidebarSide;
  /** Override variant from provider */
  variant?: SidebarVariant;
  /** Override collapsible from provider */
  collapsible?: SidebarCollapsible;
}

/**
 * SidebarGlass.Root - Main sidebar container
 *
 * @example
 * ```tsx
 * <SidebarGlass.Root>
 *   <SidebarGlass.Header />
 *   <SidebarGlass.Content>...</SidebarGlass.Content>
 *   <SidebarGlass.Footer />
 * </SidebarGlass.Root>
 * ```
 */
export const SidebarRoot = forwardRef<HTMLElement, SidebarRootProps>(
  (
    {
      children,
      side: sideProp,
      variant: variantProp,
      collapsible: collapsibleProp,
      className,
      ...props
    },
    ref
  ) => {
    const context = useSidebar();
    const side = sideProp ?? context.side;
    const variant = variantProp ?? context.variant;
    const collapsible = collapsibleProp ?? context.collapsible;
    const { state, open, openMobile, isMobile, setOpenMobile } = context;

    // Mobile: render as Sheet/Drawer
    if (isMobile) {
      return (
        <ModalGlass.Root open={openMobile} onOpenChange={setOpenMobile}>
          <ModalGlass.Overlay />
          <aside
            ref={ref}
            data-sidebar="sidebar"
            data-side={side}
            data-variant={variant}
            data-collapsible={collapsible}
            data-state="expanded"
            data-mobile="true"
            className={cn(
              'fixed inset-y-0 z-50 flex flex-col',
              'w-[var(--sidebar-width-mobile)]',
              side === 'left' ? 'left-0' : 'right-0',
              className
            )}
            style={
              {
                background: 'var(--sidebar-bg)',
                borderRight: side === 'left' ? '1px solid var(--sidebar-border)' : undefined,
                borderLeft: side === 'right' ? '1px solid var(--sidebar-border)' : undefined,
                backdropFilter: 'blur(var(--sidebar-backdrop-blur))',
                WebkitBackdropFilter: 'blur(var(--sidebar-backdrop-blur))',
                boxShadow: 'var(--sidebar-glow)',
              } as CSSProperties
            }
            {...props}
          >
            {children}
          </aside>
        </ModalGlass.Root>
      );
    }

    // Desktop: collapsible sidebar
    const isCollapsed = !open && collapsible !== 'none';
    const width =
      isCollapsed && collapsible === 'icon' ? 'var(--sidebar-width-icon)' : 'var(--sidebar-width)';

    return (
      <aside
        ref={ref}
        data-sidebar="sidebar"
        data-side={side}
        data-variant={variant}
        data-collapsible={collapsible}
        data-state={state}
        className={cn(
          'group/sidebar relative flex flex-col',
          'transition-[width] duration-300 ease-in-out',
          // Offcanvas: completely hidden when collapsed
          collapsible === 'offcanvas' && !open && 'w-0 overflow-hidden',
          // Variant-specific styles
          variant === 'floating' && 'rounded-xl m-2',
          variant === 'inset' && 'rounded-xl',
          className
        )}
        style={
          {
            width: collapsible === 'offcanvas' && !open ? 0 : width,
            background: 'var(--sidebar-bg)',
            borderRight:
              side === 'left' && variant !== 'floating'
                ? '1px solid var(--sidebar-border)'
                : undefined,
            borderLeft:
              side === 'right' && variant !== 'floating'
                ? '1px solid var(--sidebar-border)'
                : undefined,
            border: variant === 'floating' ? '1px solid var(--sidebar-border)' : undefined,
            backdropFilter: 'blur(var(--sidebar-backdrop-blur))',
            WebkitBackdropFilter: 'blur(var(--sidebar-backdrop-blur))',
            boxShadow: variant === 'floating' ? 'var(--sidebar-glow)' : undefined,
          } as CSSProperties
        }
        {...props}
      >
        {children}
      </aside>
    );
  }
);

SidebarRoot.displayName = 'SidebarGlass.Root';

// ========================================
// SIDEBAR HEADER
// ========================================

export interface SidebarHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

/**
 * SidebarGlass.Header - Sticky header section
 */
export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="header"
        className={cn('flex shrink-0 flex-col gap-2 p-4', 'border-b', className)}
        style={{
          borderColor: 'var(--sidebar-border)',
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarHeader.displayName = 'SidebarGlass.Header';

// ========================================
// SIDEBAR CONTENT
// ========================================

export interface SidebarContentProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

/**
 * SidebarGlass.Content - Scrollable content area
 */
export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="content"
        className={cn(
          'flex flex-1 flex-col gap-4 overflow-auto p-4',
          // Hide scrollbar but allow scrolling
          '[&::-webkit-scrollbar]:w-1.5',
          '[&::-webkit-scrollbar-track]:bg-transparent',
          '[&::-webkit-scrollbar-thumb]:rounded-full',
          '[&::-webkit-scrollbar-thumb]:bg-white/10',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarContent.displayName = 'SidebarGlass.Content';

// ========================================
// SIDEBAR FOOTER
// ========================================

export interface SidebarFooterProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

/**
 * SidebarGlass.Footer - Sticky footer section
 */
export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="footer"
        className={cn('flex shrink-0 flex-col gap-2 p-4', 'border-t', className)}
        style={{
          borderColor: 'var(--sidebar-border)',
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarFooter.displayName = 'SidebarGlass.Footer';

// ========================================
// SIDEBAR RAIL
// ========================================

export type SidebarRailProps = ComponentPropsWithoutRef<'button'>;

/**
 * SidebarGlass.Rail - Interactive rail for toggling sidebar
 *
 * Shows on hover and allows click to toggle collapsed/expanded state.
 */
export const SidebarRail = forwardRef<HTMLButtonElement, SidebarRailProps>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar, side } = useSidebar();

    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        className={cn(
          'absolute inset-y-0 z-20 w-4',
          'hidden group-hover/sidebar:block',
          '-translate-x-1/2 transition-all ease-linear',
          'after:absolute after:inset-y-0 after:left-1/2 after:w-[2px]',
          'hover:after:bg-[var(--sidebar-border)]',
          'cursor-col-resize',
          side === 'left' ? '-right-2' : '-left-2',
          className
        )}
        {...props}
      />
    );
  }
);

SidebarRail.displayName = 'SidebarGlass.Rail';

// ========================================
// SIDEBAR INSET
// ========================================

export interface SidebarInsetProps extends ComponentPropsWithoutRef<'main'> {
  children: ReactNode;
}

/**
 * SidebarGlass.Inset - Main content area next to sidebar
 *
 * Use this for the main content that sits beside the sidebar.
 */
export const SidebarInset = forwardRef<HTMLElement, SidebarInsetProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <main
        ref={ref}
        data-sidebar="inset"
        className={cn('flex flex-1 flex-col', 'min-h-screen', className)}
        {...props}
      >
        {children}
      </main>
    );
  }
);

SidebarInset.displayName = 'SidebarGlass.Inset';

// ========================================
// SIDEBAR TRIGGER
// ========================================

export interface SidebarTriggerProps extends ComponentPropsWithoutRef<'button'> {
  /** Render as child element */
  asChild?: boolean;
}

/**
 * SidebarGlass.Trigger - Toggle button for sidebar
 *
 * @example
 * ```tsx
 * // Default button
 * <SidebarGlass.Trigger />
 *
 * // Custom trigger
 * <SidebarGlass.Trigger asChild>
 *   <ButtonGlass variant="ghost" size="icon">
 *     <Menu />
 *   </ButtonGlass>
 * </SidebarGlass.Trigger>
 * ```
 */
export const SidebarTrigger = forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        data-sidebar="trigger"
        onClick={toggleSidebar}
        className={cn(
          'inline-flex items-center justify-center',
          'h-9 w-9 rounded-lg',
          'text-sm font-medium',
          'transition-colors',
          'text-[var(--sidebar-foreground)]/60',
          'hover:bg-[var(--sidebar-accent)]',
          'hover:text-[var(--sidebar-accent-foreground)]',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-[var(--sidebar-ring)]',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children ?? <PanelLeft className="h-6 w-6" />}
        {!children && <span className="sr-only">Toggle Sidebar</span>}
      </Comp>
    );
  }
);

SidebarTrigger.displayName = 'SidebarGlass.Trigger';

// ========================================
// SIDEBAR SEPARATOR
// ========================================

export type SidebarSeparatorProps = ComponentPropsWithoutRef<'hr'>;

/**
 * SidebarGlass.Separator - Visual divider
 */
export const SidebarSeparator = forwardRef<HTMLHRElement, SidebarSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        data-sidebar="separator"
        className={cn('mx-4 my-2 h-px border-0', className)}
        style={{
          background: 'var(--sidebar-border)',
        }}
        {...props}
      />
    );
  }
);

SidebarSeparator.displayName = 'SidebarGlass.Separator';
