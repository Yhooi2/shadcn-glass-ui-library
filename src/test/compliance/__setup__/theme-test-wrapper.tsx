/**
 * Theme Test Wrapper
 *
 * Provides ThemeProvider context for compliance tests.
 * Wraps components with the appropriate theme for testing.
 */

import React from 'react';
import { ThemeProvider, type Theme } from '@/lib/theme-context';

interface ThemeTestWrapperProps {
  children: React.ReactNode;
  theme?: Theme;
}

/**
 * Wrapper component that provides theme context for testing
 */
export function ThemeTestWrapper({
  children,
  theme = 'glass',
}: ThemeTestWrapperProps) {
  return (
    <ThemeProvider defaultTheme={theme}>
      <div data-testid="theme-wrapper" className="min-h-screen">
        {children}
      </div>
    </ThemeProvider>
  );
}

/**
 * Create a custom render function with theme
 */
export function createThemedRender(theme: Theme) {
  return function ThemedWrapper({ children }: { children: React.ReactNode }) {
    return <ThemeTestWrapper theme={theme}>{children}</ThemeTestWrapper>;
  };
}

/**
 * All available themes for testing
 */
export const THEMES: Theme[] = ['glass', 'light', 'aurora'];

/**
 * Test ID helpers
 */
export const TEST_IDS = {
  wrapper: 'theme-wrapper',
  component: 'compliance-test-component',
} as const;
