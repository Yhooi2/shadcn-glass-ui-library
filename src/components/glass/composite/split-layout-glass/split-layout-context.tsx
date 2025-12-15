/* eslint-disable react-refresh/only-export-components */
/**
 * SplitLayoutGlass Context
 *
 * Provides state management for compound SplitLayoutGlass component.
 * Handles selection state, mobile detection, and toggle functionality.
 *
 * @module split-layout-context
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

import type { IntensityType } from '@/lib/variants/glass-card-variants';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type MobileMode = 'stack' | 'accordion' | 'drawer';

/**
 * Context value for SplitLayoutGlass compound components
 *
 * API is designed to be consistent with shadcn/ui Sidebar patterns.
 */
export interface SplitLayoutContextValue {
  // === STATE ===
  /** Currently selected key for master-detail pattern */
  selectedKey: string | null;
  /** Set selected key */
  setSelectedKey: (key: string | null) => void;

  /** Sidebar open state (desktop) */
  isOpen: boolean;
  /** Set sidebar open state */
  setIsOpen: (open: boolean) => void;

  /** Mobile drawer/accordion open state */
  isMobileOpen: boolean;
  /** Set mobile open state */
  setMobileOpen: (open: boolean) => void;

  // === SHADCN ALIASES ===
  /** Sidebar state: "expanded" | "collapsed" (shadcn pattern) */
  state: 'expanded' | 'collapsed';
  /** Alias for isOpen (shadcn naming) */
  open: boolean;
  /** Alias for setIsOpen (shadcn naming) */
  setOpen: (open: boolean) => void;
  /** Alias for isMobileOpen (shadcn naming) */
  openMobile: boolean;
  /** Alias for setMobileOpen (shadcn naming) */
  setOpenMobile: (open: boolean) => void;
  /** Alias for toggle (shadcn naming) */
  toggleSidebar: () => void;

  // === RESPONSIVE ===
  /** Current viewport is below breakpoint */
  isMobile: boolean;

  // === CONFIG ===
  /** Breakpoint for desktop layout */
  breakpoint: Breakpoint;
  /** Mobile layout mode */
  mobileMode: MobileMode;
  /** Glass intensity for panels */
  intensity: IntensityType;
  /** Sticky offset from viewport top */
  stickyOffset: number;

  // === ACTIONS ===
  /** Toggle sidebar (desktop) or drawer (mobile) */
  toggle: () => void;
}

// ========================================
// CONTEXT
// ========================================

const SplitLayoutContext = createContext<SplitLayoutContextValue | null>(null);

/**
 * Hook to access SplitLayout context
 *
 * @throws Error if used outside of SplitLayoutGlass.Provider
 *
 * @example
 * ```tsx
 * function YearCard({ year }) {
 *   const { selectedKey, setSelectedKey, isMobile } = useSplitLayout();
 *   const isSelected = selectedKey === year.id;
 *
 *   return (
 *     <button
 *       onClick={() => setSelectedKey(year.id)}
 *       className={cn('p-3', isSelected && 'bg-primary/10')}
 *     >
 *       {year.year}
 *     </button>
 *   );
 * }
 * ```
 */
export function useSplitLayout(): SplitLayoutContextValue {
  const context = useContext(SplitLayoutContext);
  if (!context) {
    throw new Error(
      'useSplitLayout must be used within SplitLayoutGlass.Provider. ' +
        'Wrap your component tree with <SplitLayoutGlass.Provider>.'
    );
  }
  return context;
}

/**
 * Optional hook that returns null if outside provider (doesn't throw)
 */
export function useSplitLayoutOptional(): SplitLayoutContextValue | null {
  return useContext(SplitLayoutContext);
}

// ========================================
// BREAKPOINT MAP
// ========================================

const BREAKPOINT_VALUES: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1440,
  '2xl': 1536,
};

// ========================================
// PROVIDER
// ========================================

/**
 * Props for SplitLayoutGlass.Provider
 */
export interface SplitLayoutProviderProps {
  children: ReactNode;

  // === SELECTION STATE ===
  /** Controlled selected key */
  selectedKey?: string | null;
  /** Callback when selected key changes */
  onSelectedKeyChange?: (key: string | null) => void;
  /** Default selected key (uncontrolled) */
  defaultSelectedKey?: string | null;

  // === OPEN STATE ===
  /** Controlled open state (desktop) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state */
  defaultOpen?: boolean;

  // === CONFIG ===
  /** Breakpoint for mobile/desktop switch @default "md" */
  breakpoint?: Breakpoint;
  /** Mobile layout mode @default "stack" */
  mobileMode?: MobileMode;
  /** Glass intensity for panels @default "medium" */
  intensity?: IntensityType;
  /** Sticky offset from viewport top @default 24 */
  stickyOffset?: number;

  // === PERSISTENCE ===
  /** URL param name for selectedKey persistence */
  urlParamName?: string;

  // === KEYBOARD ===
  /** Keyboard shortcut key for toggle (Cmd/Ctrl + key) @default "b" */
  keyboardShortcut?: string | false;
}

/**
 * Provider component for SplitLayoutGlass compound components
 *
 * @example
 * ```tsx
 * <SplitLayoutGlass.Provider
 *   defaultSelectedKey="2024"
 *   mobileMode="accordion"
 *   onSelectedKeyChange={(key) => console.log('Selected:', key)}
 * >
 *   <SplitLayoutGlass.Root>
 *     ...
 *   </SplitLayoutGlass.Root>
 * </SplitLayoutGlass.Provider>
 * ```
 */
export const SplitLayoutProvider: FC<SplitLayoutProviderProps> = ({
  children,
  selectedKey: controlledSelectedKey,
  onSelectedKeyChange,
  defaultSelectedKey = null,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = true,
  breakpoint = 'md',
  mobileMode = 'stack',
  intensity = 'medium',
  stickyOffset = 24,
  urlParamName,
  keyboardShortcut = 'b',
}) => {
  // === SELECTION STATE (controlled/uncontrolled) ===
  const [internalSelectedKey, setInternalSelectedKey] = useState<string | null>(() => {
    // Try to read from URL if urlParamName is provided
    if (urlParamName && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlValue = params.get(urlParamName);
      if (urlValue) return urlValue;
    }
    return defaultSelectedKey;
  });

  const isSelectedKeyControlled = controlledSelectedKey !== undefined;
  const selectedKey = isSelectedKeyControlled ? controlledSelectedKey : internalSelectedKey;

  const setSelectedKey = useCallback(
    (key: string | null) => {
      if (!isSelectedKeyControlled) {
        setInternalSelectedKey(key);
      }
      onSelectedKeyChange?.(key);

      // Update URL if urlParamName is provided
      if (urlParamName && typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (key) {
          url.searchParams.set(urlParamName, key);
        } else {
          url.searchParams.delete(urlParamName);
        }
        window.history.replaceState({}, '', url.toString());
      }
    },
    [isSelectedKeyControlled, onSelectedKeyChange, urlParamName]
  );

  // === OPEN STATE (controlled/uncontrolled) ===
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpenControlled = controlledOpen !== undefined;
  const isOpen = isOpenControlled ? controlledOpen : internalOpen;

  const setIsOpen = useCallback(
    (open: boolean) => {
      if (!isOpenControlled) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    },
    [isOpenControlled, onOpenChange]
  );

  // === MOBILE OPEN STATE ===
  const [isMobileOpen, setMobileOpen] = useState(false);

  // === RESPONSIVE DETECTION ===
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < BREAKPOINT_VALUES[breakpoint];
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINT_VALUES[breakpoint]);
    };

    // Check on mount
    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  // === TOGGLE ACTION ===
  const toggle = useCallback(() => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setIsOpen(!isOpen);
    }
  }, [isMobile, isOpen, setIsOpen]);

  // === KEYBOARD NAVIGATION ===
  useEffect(() => {
    if (!keyboardShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape - close mobile drawer/accordion
      if (e.key === 'Escape' && isMobile && isMobileOpen) {
        e.preventDefault();
        setMobileOpen(false);
        return;
      }

      // Cmd/Ctrl + key - toggle sidebar
      if (e.key === keyboardShortcut && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyboardShortcut, isMobile, isMobileOpen, toggle]);

  // === CONTEXT VALUE ===
  const value = useMemo<SplitLayoutContextValue>(
    () => ({
      // Original API
      selectedKey,
      setSelectedKey,
      isOpen,
      setIsOpen,
      isMobileOpen,
      setMobileOpen,
      isMobile,
      breakpoint,
      mobileMode,
      intensity,
      stickyOffset,
      toggle,

      // shadcn aliases
      state: isOpen ? 'expanded' : 'collapsed',
      open: isOpen,
      setOpen: setIsOpen,
      openMobile: isMobileOpen,
      setOpenMobile: setMobileOpen,
      toggleSidebar: toggle,
    }),
    [
      selectedKey,
      setSelectedKey,
      isOpen,
      setIsOpen,
      isMobileOpen,
      isMobile,
      breakpoint,
      mobileMode,
      intensity,
      stickyOffset,
      toggle,
    ]
  );

  return <SplitLayoutContext.Provider value={value}>{children}</SplitLayoutContext.Provider>;
};

SplitLayoutProvider.displayName = 'SplitLayoutGlass.Provider';
