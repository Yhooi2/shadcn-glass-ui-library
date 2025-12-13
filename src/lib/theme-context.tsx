/**
 * Theme System for Glass UI Components
 *
 * Multi-theme support with CSS variables for glass, light, and aurora themes.
 * Provides ThemeProvider context and useTheme hook for theme management.
 *
 * @module theme-context
 *
 * @example
 * ```tsx
 * // Wrap your app with ThemeProvider
 * import { ThemeProvider } from 'shadcn-glass-ui';
 *
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme="glass">
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Use the theme hook in components
 * import { useTheme } from 'shadcn-glass-ui';
 *
 * function ThemeSwitcher() {
 *   const { theme, setTheme, cycleTheme } = useTheme();
 *
 *   return (
 *     <div>
 *       <p>Current theme: {theme}</p>
 *       <button onClick={cycleTheme}>Cycle Theme</button>
 *       <button onClick={() => setTheme('glass')}>Set Glass</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @see {@link docs/THEME_CREATION_GUIDE.md} for creating custom themes
 * @see {@link docs/TOKEN_ARCHITECTURE.md} for CSS variable system
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { Sun, Moon, Palette, type LucideIcon } from 'lucide-react';

// ========================================
// TYPES
// ========================================

/**
 * Available theme options for Glass UI components.
 * - `light` - Light theme with subtle glass effects
 * - `aurora` - Gradient theme with aurora/northern lights effects
 * - `glass` - Dark glassmorphism theme (default)
 */
export type Theme = 'light' | 'aurora' | 'glass';

/** @deprecated Use Theme instead */
export type ThemeName = Theme;

/**
 * Configuration for a single theme including display label and icon.
 */
export interface ThemeConfig {
  /** Human-readable theme name for UI display */
  readonly label: string;
  /** Lucide icon component for theme toggle buttons */
  readonly icon: LucideIcon;
}

/**
 * Context value returned by useTheme hook.
 */
export interface ThemeContextValue {
  /** Current active theme */
  readonly theme: Theme;
  /** Set a specific theme */
  readonly setTheme: (theme: Theme) => void;
  /** Cycle to next theme in order: light → aurora → glass → light */
  readonly cycleTheme: () => void;
}

// ========================================
// CONSTANTS
// ========================================

/** Array of all available themes in cycle order */
export const THEMES: readonly Theme[] = ['light', 'aurora', 'glass'] as const;

/**
 * Theme configuration map with labels and icons.
 * Used by ThemeToggleGlass and other theme switching components.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const THEME_CONFIG: Record<Theme, ThemeConfig> = {
  light: { label: 'Light', icon: Sun },
  aurora: { label: 'Aurora', icon: Moon },
  glass: { label: 'Glass', icon: Palette },
} as const;

const STORAGE_KEY = 'glass-ui-theme';
const DEFAULT_THEME: Theme = 'glass';

// ========================================
// CONTEXT
// ========================================

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ========================================
// PROVIDER
// ========================================

interface ThemeProviderProps {
  /** Child components to wrap with theme context */
  readonly children: ReactNode;
  /** Initial theme to use (default: "glass") */
  readonly defaultTheme?: Theme;
  /** localStorage key for persistence (default: "glass-ui-theme") */
  readonly storageKey?: string;
}

/**
 * Theme provider component that manages theme state and persistence.
 *
 * Wraps your application to provide theme context to all child components.
 * Theme is automatically persisted to localStorage and applied to document.
 *
 * @param props - Provider configuration
 * @param props.children - Child components to wrap
 * @param props.defaultTheme - Initial theme (default: "glass")
 * @param props.storageKey - localStorage key (default: "glass-ui-theme")
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="glass">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }

    const stored = localStorage.getItem(storageKey);
    if (stored && THEMES.includes(stored as Theme)) {
      return stored as Theme;
    }

    return defaultTheme;
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const setTheme = useCallback((newTheme: Theme) => {
    if (THEMES.includes(newTheme)) {
      setThemeState(newTheme);
    }
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((current) => {
      const currentIndex = THEMES.indexOf(current);
      const nextIndex = (currentIndex + 1) % THEMES.length;
      return THEMES[nextIndex];
    });
  }, []);

  const value: ThemeContextValue = {
    theme,
    setTheme,
    cycleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ========================================
// HOOK
// ========================================

/**
 * Hook to access theme context values.
 *
 * Must be used within a ThemeProvider. Returns the current theme,
 * a setter function, and a cycle function.
 *
 * @returns Theme context value with theme, setTheme, and cycleTheme
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, setTheme, cycleTheme } = useTheme();
 *
 *   return (
 *     <button onClick={cycleTheme}>
 *       Current: {theme}
 *     </button>
 *   );
 * }
 * ```
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

// ========================================
// UTILITIES
// ========================================

/**
 * Get the next theme in the cycle order.
 *
 * @param current - Current theme
 * @returns Next theme in cycle (light → aurora → glass → light)
 *
 * @example
 * ```tsx
 * const next = getNextTheme('glass'); // returns 'light'
 * ```
 */
// eslint-disable-next-line react-refresh/only-export-components
export function getNextTheme(current: Theme): Theme {
  const currentIndex = THEMES.indexOf(current);
  const nextIndex = (currentIndex + 1) % THEMES.length;
  return THEMES[nextIndex];
}

/**
 * Get configuration for a specific theme.
 *
 * @param theme - Theme to get configuration for
 * @returns Theme configuration with label and icon
 *
 * @example
 * ```tsx
 * const config = getThemeConfig('glass');
 * // { label: 'Glass', icon: Palette }
 * ```
 */
// eslint-disable-next-line react-refresh/only-export-components
export function getThemeConfig(theme: Theme): ThemeConfig {
  return THEME_CONFIG[theme];
}
