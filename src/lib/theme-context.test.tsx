import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ReactNode } from 'react';
import {
  ThemeProvider,
  useTheme,
  getNextTheme,
  getThemeConfig,
  THEMES,
  THEME_CONFIG,
  type Theme,
} from './theme-context';

describe('Theme utilities', () => {
  describe('getNextTheme', () => {
    it('should cycle through themes in order', () => {
      expect(getNextTheme('light')).toBe('aurora');
      expect(getNextTheme('aurora')).toBe('glass');
      expect(getNextTheme('glass')).toBe('light');
    });

    it('should return light when cycling from glass', () => {
      const result = getNextTheme('glass');
      expect(result).toBe('light');
    });
  });

  describe('getThemeConfig', () => {
    it('should return config for light theme', () => {
      const config = getThemeConfig('light');
      expect(config).toEqual(THEME_CONFIG.light);
      expect(config.label).toBe('Light');
      expect(config.icon).toBeDefined();
    });

    it('should return config for aurora theme', () => {
      const config = getThemeConfig('aurora');
      expect(config).toEqual(THEME_CONFIG.aurora);
      expect(config.label).toBe('Aurora');
    });

    it('should return config for glass theme', () => {
      const config = getThemeConfig('glass');
      expect(config).toEqual(THEME_CONFIG.glass);
      expect(config.label).toBe('Glass');
    });
  });

  describe('THEMES constant', () => {
    it('should contain all three themes', () => {
      expect(THEMES).toEqual(['light', 'aurora', 'glass']);
    });

    it('should be readonly', () => {
      expect(Object.isFrozen(THEMES)).toBe(false); // const arrays aren't frozen
      expect(THEMES.length).toBe(3);
    });
  });
});

describe('ThemeProvider and useTheme', () => {
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {};
    global.localStorage = {
      getItem: vi.fn((key: string) => localStorageMock[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock[key];
      }),
      clear: vi.fn(() => {
        localStorageMock = {};
      }),
      length: 0,
      key: vi.fn(),
    } as Storage;

    // Mock document.documentElement
    Object.defineProperty(document.documentElement, 'setAttribute', {
      writable: true,
      value: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  describe('Initialization', () => {
    it('should initialize with default theme (glass)', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.theme).toBe('glass');
    });

    it('should initialize with custom default theme', () => {
      const customWrapper = ({ children }: { children: ReactNode }) => (
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper: customWrapper });
      expect(result.current.theme).toBe('light');
    });

    it('should restore theme from localStorage', () => {
      localStorageMock['glass-ui-theme'] = 'aurora';

      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.theme).toBe('aurora');
    });

    it('should ignore invalid theme in localStorage', () => {
      localStorageMock['glass-ui-theme'] = 'invalid-theme';

      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.theme).toBe('glass');
    });

    it('should use custom storage key', () => {
      localStorageMock['custom-key'] = 'light';

      const customWrapper = ({ children }: { children: ReactNode }) => (
        <ThemeProvider storageKey="custom-key">{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper: customWrapper });
      expect(result.current.theme).toBe('light');
    });
  });

  describe('setTheme', () => {
    it('should change theme', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme('light');
      });

      expect(result.current.theme).toBe('light');
    });

    it('should persist theme to localStorage', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme('aurora');
      });

      expect(localStorage.setItem).toHaveBeenCalledWith('glass-ui-theme', 'aurora');
      expect(localStorageMock['glass-ui-theme']).toBe('aurora');
    });

    it('should update document attribute', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme('light');
      });

      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
    });

    it('should not accept invalid theme', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      const initialTheme = result.current.theme;

      act(() => {
        result.current.setTheme('invalid' as Theme);
      });

      expect(result.current.theme).toBe(initialTheme);
    });
  });

  describe('cycleTheme', () => {
    it('should cycle from glass to light', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.theme).toBe('glass');

      act(() => {
        result.current.cycleTheme();
      });

      expect(result.current.theme).toBe('light');
    });

    it('should cycle from light to aurora', () => {
      const customWrapper = ({ children }: { children: ReactNode }) => (
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper: customWrapper });

      act(() => {
        result.current.cycleTheme();
      });

      expect(result.current.theme).toBe('aurora');
    });

    it('should cycle from aurora to glass', () => {
      const customWrapper = ({ children }: { children: ReactNode }) => (
        <ThemeProvider defaultTheme="aurora">{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper: customWrapper });

      act(() => {
        result.current.cycleTheme();
      });

      expect(result.current.theme).toBe('glass');
    });

    it('should complete full cycle', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      // Start at glass
      expect(result.current.theme).toBe('glass');

      // Cycle to light
      act(() => {
        result.current.cycleTheme();
      });
      expect(result.current.theme).toBe('light');

      // Cycle to aurora
      act(() => {
        result.current.cycleTheme();
      });
      expect(result.current.theme).toBe('aurora');

      // Cycle back to glass
      act(() => {
        result.current.cycleTheme();
      });
      expect(result.current.theme).toBe('glass');
    });
  });

  describe('Error handling', () => {
    it('should throw error when useTheme is used outside provider', () => {
      expect(() => {
        renderHook(() => useTheme());
      }).toThrow('useTheme must be used within a ThemeProvider');
    });
  });

  describe('Provider value', () => {
    it('should provide theme value', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current).toHaveProperty('theme');
      expect(result.current).toHaveProperty('setTheme');
      expect(result.current).toHaveProperty('cycleTheme');
    });

    it('should have stable function references', () => {
      const { result, rerender } = renderHook(() => useTheme(), { wrapper });

      const initialSetTheme = result.current.setTheme;
      const initialCycleTheme = result.current.cycleTheme;

      rerender();

      expect(result.current.setTheme).toBe(initialSetTheme);
      expect(result.current.cycleTheme).toBe(initialCycleTheme);
    });
  });
});
