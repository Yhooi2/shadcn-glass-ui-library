/* eslint-disable react-refresh/only-export-components */
/**
 * SidebarGlass Context
 *
 * Provides state management for SidebarGlass compound component.
 * 100% compatible with shadcn/ui Sidebar API.
 *
 * @module sidebar-context
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type FC,
  type ReactNode,
} from 'react';

// ========================================
// TYPES
// ========================================

export type SidebarSide = 'left' | 'right';
export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';

/**
 * Context value for SidebarGlass compound components
 * 100% compatible with shadcn/ui useSidebar() hook
 */
export interface SidebarContextValue {
  /** Sidebar state: "expanded" | "collapsed" */
  state: 'expanded' | 'collapsed';
  /** Whether sidebar is open (desktop) */
  open: boolean;
  /** Set sidebar open state */
  setOpen: (open: boolean) => void;
  /** Whether mobile drawer is open */
  openMobile: boolean;
  /** Set mobile drawer open state */
  setOpenMobile: (open: boolean) => void;
  /** Whether viewport is mobile */
  isMobile: boolean;
  /** Toggle sidebar open/close */
  toggleSidebar: () => void;

  // === CONFIG ===
  /** Which side the sidebar is on */
  side: SidebarSide;
  /** Sidebar variant */
  variant: SidebarVariant;
  /** Collapsible mode */
  collapsible: SidebarCollapsible;
}

// ========================================
// CONSTANTS
// ========================================

const MOBILE_BREAKPOINT = 768;
const SIDEBAR_COOKIE_NAME = 'sidebar:state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// ========================================
// CONTEXT
// ========================================

const SidebarContext = createContext<SidebarContextValue | null>(null);

/**
 * Hook to access Sidebar context (100% shadcn compatible)
 *
 * @throws Error if used outside of SidebarGlass.Provider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { state, open, toggleSidebar, isMobile } = useSidebar();
 *
 *   return (
 *     <button onClick={toggleSidebar}>
 *       {state === 'expanded' ? 'Collapse' : 'Expand'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      'useSidebar must be used within SidebarGlass.Provider. ' +
        'Wrap your component tree with <SidebarGlass.Provider>.'
    );
  }
  return context;
}

/**
 * Optional hook that returns null if outside provider (doesn't throw)
 */
export function useSidebarOptional(): SidebarContextValue | null {
  return useContext(SidebarContext);
}

// ========================================
// PROVIDER
// ========================================

/**
 * Props for SidebarGlass.Provider (100% shadcn compatible)
 */
export interface SidebarProviderProps {
  children: ReactNode;

  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state (uncontrolled) @default true */
  defaultOpen?: boolean;

  /** Which side the sidebar is on @default "left" */
  side?: SidebarSide;
  /** Sidebar variant @default "sidebar" */
  variant?: SidebarVariant;
  /** Collapsible mode @default "offcanvas" */
  collapsible?: SidebarCollapsible;

  /** Cookie name for persistence @default "sidebar:state" */
  cookieName?: string;
  /** Keyboard shortcut key (Cmd/Ctrl + key) @default "b" */
  keyboardShortcut?: string | false;
}

/**
 * Provider component for SidebarGlass compound components
 *
 * @example
 * ```tsx
 * <SidebarGlass.Provider defaultOpen>
 *   <SidebarGlass.Root>
 *     <SidebarGlass.Header />
 *     <SidebarGlass.Content>
 *       <SidebarGlass.Menu>...</SidebarGlass.Menu>
 *     </SidebarGlass.Content>
 *     <SidebarGlass.Footer />
 *   </SidebarGlass.Root>
 *   <SidebarGlass.Inset>
 *     <main>Main content</main>
 *   </SidebarGlass.Inset>
 * </SidebarGlass.Provider>
 * ```
 */
export const SidebarProvider: FC<SidebarProviderProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = true,
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  cookieName = SIDEBAR_COOKIE_NAME,
  keyboardShortcut = 'b',
}) => {
  // === OPEN STATE (controlled/uncontrolled with cookie persistence) ===
  const [internalOpen, setInternalOpen] = useState(() => {
    // Try to read from cookie
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');
      const sidebarCookie = cookies.find((c) => c.trim().startsWith(`${cookieName}=`));
      if (sidebarCookie) {
        return sidebarCookie.split('=')[1] === 'true';
      }
    }
    return defaultOpen;
  });

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);

      // Persist to cookie
      if (typeof document !== 'undefined') {
        document.cookie = `${cookieName}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      }
    },
    [isControlled, onOpenChange, cookieName]
  );

  // === MOBILE STATE ===
  const [openMobile, setOpenMobile] = useState(false);

  // === RESPONSIVE DETECTION ===
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      // Close mobile drawer when switching to desktop (in same callback)
      if (!mobile) {
        setOpenMobile(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // === TOGGLE ACTION ===
  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev);
    } else {
      setOpen(!open);
    }
  }, [isMobile, open, setOpen]);

  // === KEYBOARD NAVIGATION ===
  useEffect(() => {
    if (!keyboardShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + key - toggle sidebar
      if (e.key === keyboardShortcut && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSidebar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyboardShortcut, toggleSidebar]);

  // === CONTEXT VALUE ===
  const value = useMemo<SidebarContextValue>(
    () => ({
      state: open ? 'expanded' : 'collapsed',
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
      side,
      variant,
      collapsible,
    }),
    [open, setOpen, openMobile, isMobile, toggleSidebar, side, variant, collapsible]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

SidebarProvider.displayName = 'SidebarGlass.Provider';
