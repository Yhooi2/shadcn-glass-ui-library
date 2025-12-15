/* eslint-disable react-refresh/only-export-components */
/**
 * SplitLayoutGlass Component (Compound API only)
 *
 * A responsive two-column layout with sticky scroll behavior and glassmorphism styling.
 * Features independent scrolling in each panel after sticky positioning activates.
 *
 * @pattern MDN, GitHub Docs, Linear, shadcn Sidebar
 *
 * @example
 * ```tsx
 * <SplitLayoutGlass.Provider defaultSelectedKey="2024">
 *   <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 2 }}>
 *     <SplitLayoutGlass.Sidebar>
 *       <SplitLayoutGlass.SidebarHeader>Header</SplitLayoutGlass.SidebarHeader>
 *       <SplitLayoutGlass.SidebarContent>Content</SplitLayoutGlass.SidebarContent>
 *     </SplitLayoutGlass.Sidebar>
 *     <SplitLayoutGlass.Main>
 *       <SplitLayoutGlass.MainContent>Content</SplitLayoutGlass.MainContent>
 *     </SplitLayoutGlass.Main>
 *   </SplitLayoutGlass.Root>
 * </SplitLayoutGlass.Provider>
 * ```
 *
 * @since v2.2.0 - Legacy props API removed, Compound API only
 * @module split-layout-glass
 */

import { forwardRef, type CSSProperties, type ReactNode } from 'react';
import { Menu, X, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/glass/ui/glass-card';
import { ButtonGlass } from '@/components/glass/ui/button-glass';
import { ScrollArea } from '@/components/ui/scroll-area';

// Import context
import {
  SplitLayoutProvider,
  useSplitLayout,
  useSplitLayoutOptional,
  type SplitLayoutProviderProps,
  type SplitLayoutContextValue,
  type Breakpoint,
  type MobileMode,
} from './split-layout-context';

import '@/glass-theme.css';

// ========================================
// GRID STYLES HOOK
// ========================================

interface GridStylesConfig {
  ratio?: { sidebar: number; main: number };
  minSidebarWidth?: string;
  maxSidebarWidth?: string;
  gap?: number | { mobile?: number; desktop?: number };
  stickyOffset?: number;
}

function useGridStyles(config: GridStylesConfig) {
  const {
    ratio = { sidebar: 1, main: 2 },
    minSidebarWidth = '280px',
    maxSidebarWidth,
    gap = { mobile: 16, desktop: 24 },
    stickyOffset = 24,
  } = config;

  const gapMobile = typeof gap === 'number' ? gap : (gap.mobile ?? 16);
  const gapDesktop = typeof gap === 'number' ? gap : (gap.desktop ?? 24);

  const gridTemplate = maxSidebarWidth
    ? `minmax(${minSidebarWidth}, ${maxSidebarWidth}) ${ratio.main}fr`
    : `minmax(${minSidebarWidth}, ${ratio.sidebar}fr) ${ratio.main}fr`;

  const cssVars = {
    '--grid-template': gridTemplate,
    '--sticky-offset': `${stickyOffset}px`,
    '--sticky-max-height': `calc(100vh - calc(${stickyOffset}px * 2))`,
    '--gap-mobile': `${gapMobile}px`,
    '--gap-desktop': `${gapDesktop}px`,
  } as CSSProperties;

  return { cssVars };
}

// ========================================
// ROOT COMPONENT
// ========================================

/**
 * Props for SplitLayoutGlass.Root component
 */
export interface SplitLayoutRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /**
   * Sidebar to main ratio in fr units
   * @default { sidebar: 1, main: 2 } (33% / 67%)
   * @example { sidebar: 1, main: 3 } = 25% / 75%
   */
  ratio?: { sidebar: number; main: number };
  /**
   * Minimum sidebar width (CSS value)
   * Prevents sidebar from shrinking below this on tablet
   * @default "280px"
   */
  minSidebarWidth?: string;
  /**
   * Maximum sidebar width (CSS value)
   * @example "400px" - sidebar won't exceed 400px
   */
  maxSidebarWidth?: string;
  /**
   * Gap between panels
   * @default { mobile: 16, desktop: 24 }
   */
  gap?: number | { mobile?: number; desktop?: number };
  /**
   * Breakpoint for desktop layout (overrides Provider's breakpoint)
   * @default "md" (768px)
   */
  breakpoint?: Breakpoint;
  /**
   * Mobile layout mode (below breakpoint)
   * - "stack": sidebar above main
   * - "main-only": hide sidebar
   * - "sidebar-only": hide main
   * @default "stack"
   */
  mobileLayout?: 'stack' | 'main-only' | 'sidebar-only';
}

const SplitLayoutRoot = forwardRef<HTMLDivElement, SplitLayoutRootProps>(
  (
    {
      children,
      ratio = { sidebar: 1, main: 2 },
      minSidebarWidth = '300px',
      maxSidebarWidth,
      gap = { mobile: 16, desktop: 24 },
      breakpoint: breakpointProp,
      mobileLayout = 'stack',
      className,
      ...props
    },
    ref
  ) => {
    const context = useSplitLayoutOptional();
    const breakpoint = breakpointProp ?? context?.breakpoint ?? 'md';
    const stickyOffset = context?.stickyOffset ?? 24;

    const { cssVars } = useGridStyles({
      ratio,
      minSidebarWidth,
      maxSidebarWidth,
      gap,
      stickyOffset,
    });

    const bp = breakpoint;

    // Build gap classes based on breakpoint
    const gapClasses = {
      sm: 'gap-[var(--gap-mobile)] sm:gap-[var(--gap-desktop)]',
      md: 'gap-[var(--gap-mobile)] md:gap-[var(--gap-desktop)]',
      lg: 'gap-[var(--gap-mobile)] lg:gap-[var(--gap-desktop)]',
      xl: 'gap-[var(--gap-mobile)] xl:gap-[var(--gap-desktop)]',
      '2xl': 'gap-[var(--gap-mobile)] 2xl:gap-[var(--gap-desktop)]',
    };

    const gridClasses = {
      sm: 'sm:grid-cols-(--grid-template)',
      md: 'md:grid-cols-(--grid-template)',
      lg: 'lg:grid-cols-(--grid-template)',
      xl: 'xl:grid-cols-(--grid-template)',
      '2xl': '2xl:grid-cols-(--grid-template)',
    };

    return (
      <div
        ref={ref}
        data-split-layout-root=""
        data-state={context?.state ?? 'expanded'}
        className={cn(
          'grid',
          mobileLayout === 'stack' && 'grid-cols-1',
          mobileLayout === 'main-only' && 'grid-cols-1 *:data-split-sidebar:hidden',
          mobileLayout === 'sidebar-only' && 'grid-cols-1 *:data-split-main:hidden',
          gridClasses[bp],
          gapClasses[bp],
          className
        )}
        style={cssVars}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SplitLayoutRoot.displayName = 'SplitLayoutGlass.Root';

// ========================================
// SIDEBAR COMPONENTS
// ========================================

/**
 * Props for SplitLayoutGlass.Sidebar component
 */
export interface SplitLayoutSidebarProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /**
   * ARIA label for accessibility
   * @default "Sidebar navigation"
   */
  label?: string;
}

const SplitLayoutSidebar = forwardRef<HTMLElement, SplitLayoutSidebarProps>(
  ({ children, label = 'Sidebar navigation', className, ...props }, ref) => {
    const context = useSplitLayoutOptional();
    const breakpoint = context?.breakpoint ?? 'md';
    const intensity = context?.intensity ?? 'medium';
    const bp = breakpoint;

    return (
      <GlassCard
        asChild
        intensity={intensity}
        padding="none"
        className={cn(
          'overflow-hidden rounded-xl',
          `${bp}:sticky`,
          `${bp}:top-[var(--sticky-offset)]`,
          `${bp}:max-h-[var(--sticky-max-height)]`,
          `${bp}:flex`,
          `${bp}:flex-col`,
          className
        )}
      >
        <aside ref={ref} data-split-sidebar="" aria-label={label} {...props}>
          {children}
        </aside>
      </GlassCard>
    );
  }
);

SplitLayoutSidebar.displayName = 'SplitLayoutGlass.Sidebar';

/**
 * Props for SplitLayoutGlass.SidebarHeader component
 * Header stays pinned at top when sidebar content scrolls
 */
export interface SplitLayoutSidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const SplitLayoutSidebarHeader = forwardRef<HTMLDivElement, SplitLayoutSidebarHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      data-split-sidebar-header=""
      className={cn('shrink-0 p-4 border-b border-white/10', className)}
      {...props}
    >
      {children}
    </div>
  )
);

SplitLayoutSidebarHeader.displayName = 'SplitLayoutGlass.SidebarHeader';

/**
 * Props for SplitLayoutGlass.SidebarContent component
 * Scrollable area for sidebar items
 */
export interface SplitLayoutSidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /**
   * Auto-wrap in ScrollArea for independent scrolling
   * @default true
   */
  scrollable?: boolean;
}

const SplitLayoutSidebarContent = forwardRef<HTMLDivElement, SplitLayoutSidebarContentProps>(
  ({ children, scrollable = true, className, ...props }, ref) => {
    if (scrollable) {
      // Extract only div-compatible props (ScrollArea doesn't accept all HTML div props)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { dir, ...divProps } = props;
      return (
        <ScrollArea
          ref={ref as React.Ref<HTMLDivElement>}
          data-split-sidebar-content=""
          className={cn('flex-1 min-h-0', className)}
          {...divProps}
        >
          <div className="p-4">{children}</div>
        </ScrollArea>
      );
    }

    return (
      <div
        ref={ref}
        data-split-sidebar-content=""
        className={cn('flex-1 min-h-0 overflow-auto p-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SplitLayoutSidebarContent.displayName = 'SplitLayoutGlass.SidebarContent';

/**
 * Props for SplitLayoutGlass.SidebarFooter component
 * Footer stays pinned at bottom when sidebar content scrolls
 */
export interface SplitLayoutSidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const SplitLayoutSidebarFooter = forwardRef<HTMLDivElement, SplitLayoutSidebarFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      data-split-sidebar-footer=""
      className={cn('shrink-0 p-4 border-t border-white/10', className)}
      {...props}
    >
      {children}
    </div>
  )
);

SplitLayoutSidebarFooter.displayName = 'SplitLayoutGlass.SidebarFooter';

// ========================================
// MAIN COMPONENTS
// ========================================

/**
 * Props for SplitLayoutGlass.Main component
 */
export interface SplitLayoutMainProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /**
   * ARIA label for accessibility
   * @default "Main content"
   */
  label?: string;
}

const SplitLayoutMain = forwardRef<HTMLElement, SplitLayoutMainProps>(
  ({ children, label = 'Main content', className, ...props }, ref) => {
    const context = useSplitLayoutOptional();
    const breakpoint = context?.breakpoint ?? 'md';
    const intensity = context?.intensity ?? 'medium';
    const bp = breakpoint;

    return (
      <GlassCard
        asChild
        intensity={intensity}
        padding="none"
        className={cn(
          'overflow-hidden rounded-xl',
          `${bp}:sticky`,
          `${bp}:top-[var(--sticky-offset)]`,
          `${bp}:max-h-[var(--sticky-max-height)]`,
          `${bp}:flex`,
          `${bp}:flex-col`,
          className
        )}
      >
        <main ref={ref} data-split-main="" aria-label={label} {...props}>
          {children}
        </main>
      </GlassCard>
    );
  }
);

SplitLayoutMain.displayName = 'SplitLayoutGlass.Main';

/**
 * Props for SplitLayoutGlass.MainHeader component
 * Header stays pinned at top when main content scrolls
 */
export interface SplitLayoutMainHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const SplitLayoutMainHeader = forwardRef<HTMLDivElement, SplitLayoutMainHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      data-split-main-header=""
      className={cn('shrink-0 p-6 border-b border-white/10', className)}
      {...props}
    >
      {children}
    </div>
  )
);

SplitLayoutMainHeader.displayName = 'SplitLayoutGlass.MainHeader';

/**
 * Props for SplitLayoutGlass.MainContent component
 * Scrollable area for main content
 */
export interface SplitLayoutMainContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /**
   * Auto-wrap in ScrollArea for independent scrolling
   * @default true
   */
  scrollable?: boolean;
}

const SplitLayoutMainContent = forwardRef<HTMLDivElement, SplitLayoutMainContentProps>(
  ({ children, scrollable = true, className, ...props }, ref) => {
    if (scrollable) {
      // Extract only div-compatible props (ScrollArea doesn't accept all HTML div props)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { dir, ...divProps } = props;
      return (
        <ScrollArea
          ref={ref as React.Ref<HTMLDivElement>}
          data-split-main-content=""
          className={cn('flex-1 min-h-0', className)}
          {...divProps}
        >
          <div className="p-6">{children}</div>
        </ScrollArea>
      );
    }

    return (
      <div
        ref={ref}
        data-split-main-content=""
        className={cn('flex-1 min-h-0 overflow-auto p-6', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SplitLayoutMainContent.displayName = 'SplitLayoutGlass.MainContent';

/**
 * Props for SplitLayoutGlass.MainFooter component
 * Footer stays pinned at bottom when main content scrolls
 */
export interface SplitLayoutMainFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const SplitLayoutMainFooter = forwardRef<HTMLDivElement, SplitLayoutMainFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      data-split-main-footer=""
      className={cn('shrink-0 p-6 border-t border-white/10', className)}
      {...props}
    >
      {children}
    </div>
  )
);

SplitLayoutMainFooter.displayName = 'SplitLayoutGlass.MainFooter';

// ========================================
// TRIGGER COMPONENT
// ========================================

/**
 * Props for SplitLayoutGlass.Trigger component
 * Toggle button for sidebar collapse/expand
 */
export interface SplitLayoutTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Use Radix Slot for custom trigger elements
   * @default false
   */
  asChild?: boolean;
  /**
   * Show on desktop (hidden by default)
   * @default false
   */
  showOnDesktop?: boolean;
  /**
   * Icon variant
   * - "menu": hamburger/X icons
   * - "panel": panel collapse/expand icons
   * @default "menu"
   */
  variant?: 'menu' | 'panel';
}

const SplitLayoutTrigger = forwardRef<HTMLButtonElement, SplitLayoutTriggerProps>(
  (
    { asChild = false, showOnDesktop = false, variant = 'menu', className, children, ...props },
    ref
  ) => {
    const { toggle, isOpen, isMobileOpen, isMobile, breakpoint } = useSplitLayout();

    const currentOpen = isMobile ? isMobileOpen : isOpen;

    const Icon =
      variant === 'menu' ? (currentOpen ? X : Menu) : currentOpen ? PanelLeftClose : PanelLeftOpen;

    const bp = breakpoint;
    const visibilityClass = showOnDesktop ? '' : `${bp}:hidden`;

    if (asChild) {
      return (
        <Slot
          ref={ref}
          onClick={toggle}
          aria-label={currentOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={currentOpen}
          data-state={currentOpen ? 'open' : 'closed'}
          className={cn(visibilityClass, className)}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <ButtonGlass
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={toggle}
        aria-label={currentOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={currentOpen}
        data-state={currentOpen ? 'open' : 'closed'}
        className={cn(visibilityClass, className)}
        {...props}
      >
        {children ?? <Icon className="h-5 w-5" />}
      </ButtonGlass>
    );
  }
);

SplitLayoutTrigger.displayName = 'SplitLayoutGlass.Trigger';

// ========================================
// COMPOUND COMPONENT EXPORT
// ========================================

/**
 * SplitLayoutGlass compound component
 *
 * @example
 * ```tsx
 * <SplitLayoutGlass.Provider>
 *   <SplitLayoutGlass.Root>
 *     <SplitLayoutGlass.Sidebar>...</SplitLayoutGlass.Sidebar>
 *     <SplitLayoutGlass.Main>...</SplitLayoutGlass.Main>
 *   </SplitLayoutGlass.Root>
 * </SplitLayoutGlass.Provider>
 * ```
 */
export const SplitLayoutGlass = {
  Provider: SplitLayoutProvider,
  Root: SplitLayoutRoot,
  Sidebar: SplitLayoutSidebar,
  SidebarHeader: SplitLayoutSidebarHeader,
  SidebarContent: SplitLayoutSidebarContent,
  SidebarFooter: SplitLayoutSidebarFooter,
  Main: SplitLayoutMain,
  MainHeader: SplitLayoutMainHeader,
  MainContent: SplitLayoutMainContent,
  MainFooter: SplitLayoutMainFooter,
  Trigger: SplitLayoutTrigger,
};

// ========================================
// ACCORDION EXPORT (re-export from separate file)
// ========================================

export { SplitLayoutAccordion } from './split-layout-accordion';
export type {
  SplitLayoutAccordionRootProps,
  SplitLayoutAccordionItemProps,
} from './split-layout-accordion';

// ========================================
// TYPE EXPORTS
// ========================================

export type { SplitLayoutProviderProps, SplitLayoutContextValue, Breakpoint, MobileMode };

export { useSplitLayout, useSplitLayoutOptional };
