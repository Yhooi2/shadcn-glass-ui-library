import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

/**
 * Glass UI тема для Storybook Manager (sidebar, toolbar)
 * Использует хардкод значения, т.к. Manager не поддерживает CSS переменные
 */
const glassTheme = create({
  base: 'dark',

  // Branding
  brandTitle: 'Glass UI',
  brandUrl: 'https://github.com/Yhooi2/shadcn-glass-ui-library',
  brandTarget: '_self',

  // Typography
  fontBase: '"Inter", system-ui, -apple-system, sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", monospace',

  // Colors
  colorPrimary: '#a855f7', // purple-500
  colorSecondary: '#8b5cf6', // violet-500

  // UI
  appBg: '#0f0f23', // bg-from из glass.css
  appContentBg: '#1a1a2e',
  appPreviewBg: 'transparent',
  appBorderColor: 'rgba(255, 255, 255, 0.1)',
  appBorderRadius: 8,

  // Text colors
  textColor: '#e2e8f0', // text-primary
  textInverseColor: '#0f172a',
  textMutedColor: 'rgba(255, 255, 255, 0.6)',

  // Toolbar
  barTextColor: 'rgba(255, 255, 255, 0.7)',
  barSelectedColor: '#a855f7',
  barHoverColor: '#c084fc',
  barBg: '#1a1a2e',

  // Form colors
  inputBg: 'rgba(255, 255, 255, 0.08)',
  inputBorder: 'rgba(255, 255, 255, 0.15)',
  inputTextColor: '#e2e8f0',
  inputBorderRadius: 6,

  // Buttons
  buttonBg: 'rgba(168, 85, 247, 0.2)',
  buttonBorder: 'rgba(168, 85, 247, 0.3)',
});

addons.setConfig({
  theme: glassTheme,
  sidebar: {
    showRoots: true,
  },
});
