/// <reference types="vitest/config" />
// @ts-nocheck
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.stories.{ts,tsx}',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.visual.test.{ts,tsx}',
        'src/**/__visual__/**',
        'src/main.tsx',
        'src/vite-env.d.ts',
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
    projects: [
      // Unit tests (with coverage support)
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['src/**/*.visual.test.{ts,tsx}', 'src/**/*.browser.test.{ts,tsx}'],
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./src/test/setup.ts'],
        },
      },
      // Storybook component tests
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
      // Visual regression tests
      {
        extends: true,
        test: {
          name: 'visual',
          include: ['src/**/*.visual.test.{ts,tsx}'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({
              args: ['--force-prefers-reduced-motion'],
            }),
            instances: [
              {
                browser: 'chromium',
              },
            ],
            expect: {
              toMatchScreenshot: {
                comparatorName: 'pixelmatch',
                comparatorOptions: {
                  threshold: 0.05, // Allow slight color differences between macOS/Linux
                  allowedMismatchedPixelRatio: 0.08, // Allow up to 8% pixel mismatch for cross-platform
                },
                // Cross-platform screenshot naming (no -darwin/-linux suffix)
                resolveScreenshotPath: ({
                  arg,
                  browserName,
                  ext,
                  testFileDirectory,
                  testFileName,
                }: {
                  arg: string;
                  browserName: string;
                  ext: string;
                  testFileDirectory: string;
                  testFileName: string;
                  platform?: string; // ignored to remove platform suffix
                }) =>
                  `${testFileDirectory}/__screenshots__/${testFileName}/${arg}-${browserName}${ext}`,
              },
            },
          },
        },
      },
      // Design System Compliance tests (jsdom)
      {
        extends: true,
        test: {
          name: 'compliance',
          include: ['src/test/compliance/**/*.compliance.test.{ts,tsx}'],
          exclude: ['src/test/compliance/**/*.browser.test.{ts,tsx}'],
          environment: 'jsdom',
          globals: true,
          setupFiles: [
            './src/test/setup.ts',
            './src/test/compliance/__setup__/compliance-setup.ts',
          ],
        },
      },
      // Design System Compliance tests (browser)
      {
        extends: true,
        test: {
          name: 'compliance-browser',
          include: ['src/test/compliance/**/*.browser.test.{ts,tsx}'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['./src/test/setup.ts'],
        },
      },
    ],
  },
});
