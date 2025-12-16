import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    // Documentation MDX files (ordered)
    './Introduction.mdx',
    './docs/GettingStarted.mdx',
    './docs/DesignSystem.mdx',
    './docs/CoreComponents.mdx',
    './docs/AtomicComponents.mdx',
    './docs/CompositeComponents.mdx',
    './docs/SectionComponents.mdx',
    './docs/Blocks.mdx',
    // Component stories
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    // Component-specific MDX docs
    '../src/**/*.mdx',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],

  async viteFinal(config) {
    // Set base path for GitHub Pages deployment
    const baseUrl = process.env.NODE_ENV === 'production' ? '/shadcn-glass-ui-library/' : '/';

    return {
      ...config,
      base: baseUrl,
    };
  },
};
export default config;
