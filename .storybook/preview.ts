import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import { ThemeProvider, type Theme } from '../src/lib/theme-context';
import '../src/index.css';
import '../src/glass-theme.css';
import './storybook.css';

// Theme backgrounds for Storybook
const THEME_BACKGROUNDS = {
  glass: {
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
    orb1: 'rgba(168, 85, 247, 0.3)',
    orb2: 'rgba(59, 130, 246, 0.2)',
  },
  light: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
    orb1: 'rgba(96, 165, 250, 0.2)',
    orb2: 'rgba(167, 139, 250, 0.15)',
  },
  aurora: {
    background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)',
    orb1: 'rgba(37, 99, 235, 0.1)',
    orb2: 'rgba(124, 58, 237, 0.08)',
  },
} as const;

// Theme decorator component
function ThemeDecorator({
  children,
  theme,
  isFullscreen,
}: {
  children: React.ReactNode;
  theme: Theme;
  isFullscreen: boolean;
}) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, [theme]);

  const themeConfig = THEME_BACKGROUNDS[theme] || THEME_BACKGROUNDS.glass;
  const containerClass = isFullscreen ? 'glass-story-fullscreen' : 'glass-story-container';

  return React.createElement(
    ThemeProvider,
    { defaultTheme: theme },
    React.createElement(
      'div',
      {
        className: containerClass,
        'data-theme': theme,
        style: {
          '--story-bg': themeConfig.background,
          '--story-orb-1': themeConfig.orb1,
          '--story-orb-2': themeConfig.orb2,
        } as React.CSSProperties,
      },
      children
    )
  );
}

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'warn', // Changed from 'todo' - shows violations in addon panel
    },
    // Visual regression testing - disable animations for stable screenshots
    testingLibrary: {
      asyncUtilTimeout: 3000,
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'glass',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'glass', title: 'Glass (Dark)', icon: 'circle' },
          { value: 'light', title: 'Light', icon: 'circlehollow' },
          { value: 'aurora', title: 'Aurora', icon: 'star' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme || 'glass') as Theme;
      const isFullscreen = context.parameters?.layout === 'fullscreen';

      return React.createElement(ThemeDecorator, { theme, isFullscreen }, React.createElement(Story));
    },
  ],
};

export default preview;
