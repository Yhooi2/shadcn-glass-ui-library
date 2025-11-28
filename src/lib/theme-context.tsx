// ========================================
// THEME SYSTEM
// Multi-theme support with CSS variables
// ========================================

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { Sun, Moon, Palette, type LucideIcon } from "lucide-react";

// ========================================
// TYPES
// ========================================

export type Theme = "light" | "aurora" | "glass";

export interface ThemeConfig {
  readonly label: string;
  readonly icon: LucideIcon;
}

export interface ThemeContextValue {
  readonly theme: Theme;
  readonly setTheme: (theme: Theme) => void;
  readonly cycleTheme: () => void;
}

// ========================================
// CONSTANTS
// ========================================

export const THEMES: readonly Theme[] = ["light", "aurora", "glass"] as const;

// eslint-disable-next-line react-refresh/only-export-components
export const THEME_CONFIG: Record<Theme, ThemeConfig> = {
  light: { label: "Light", icon: Sun },
  aurora: { label: "Aurora", icon: Moon },
  glass: { label: "Glass", icon: Palette },
} as const;

const STORAGE_KEY = "glass-ui-theme";
const DEFAULT_THEME: Theme = "glass";

// ========================================
// CONTEXT
// ========================================

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ========================================
// PROVIDER
// ========================================

interface ThemeProviderProps {
  readonly children: ReactNode;
  readonly defaultTheme?: Theme;
  readonly storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") {
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
    root.setAttribute("data-theme", theme);
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

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ========================================
// HOOK
// ========================================

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

// ========================================
// UTILITIES
// ========================================

// eslint-disable-next-line react-refresh/only-export-components
export function getNextTheme(current: Theme): Theme {
  const currentIndex = THEMES.indexOf(current);
  const nextIndex = (currentIndex + 1) % THEMES.length;
  return THEMES[nextIndex];
}

// eslint-disable-next-line react-refresh/only-export-components
export function getThemeConfig(theme: Theme): ThemeConfig {
  return THEME_CONFIG[theme];
}
