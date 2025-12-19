import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// Library build configuration
// Produces clean ESM bundles without CommonJS shims (following @radix-ui patterns)
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      include: ['src'],
      exclude: [
        'src/**/__tests__/**',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/*.spec.ts',
        'src/**/*.spec.tsx',
        'src/**/*.stories.ts',
        'src/**/*.stories.tsx',
        'src/**/__visual__/**',
        'src/test/**',
        'src/main.tsx',
        'src/App.tsx',
      ],
      // Disable rollupTypes to preserve full type structure
      // rollupTypes breaks on complex re-exports (export *, recharts re-export)
      rollupTypes: false,
      entryRoot: 'src',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        components: path.resolve(__dirname, 'src/components.ts'),
        hooks: path.resolve(__dirname, 'src/hooks.ts'),
        utils: path.resolve(__dirname, 'src/utils.ts'),
        themes: path.resolve(__dirname, 'src/themes.ts'),
        'cli/index': path.resolve(__dirname, 'src/cli/index.ts'),
      },
      // Note: formats and fileName are set per-output below for proper chunk extensions
    },
    rollupOptions: {
      // ALL runtime dependencies must be external to produce clean ESM
      // This prevents bundling CommonJS code into the ESM output
      external: [
        // React ecosystem
        'react',
        'react-dom',
        'react/jsx-runtime',
        // All Radix UI packages (use regex to catch all)
        /^@radix-ui\//,
        // Utility libraries
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        // Icon library
        'lucide-react',
        // Animation
        'framer-motion',
        // Chart library (contains lodash CommonJS code)
        'recharts',
        // Command menu
        'cmdk',
        // Toast notifications
        'sonner',
        // Theme management
        'next-themes',
        // Node.js built-ins for CLI
        'node:util',
        'node:fs',
        'node:path',
        'node:url',
      ],
      output: [
        // ESM output - all files use .mjs extension
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name]-[hash].mjs',
          exports: 'named',
        },
        // CommonJS output - all files use .cjs extension
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          chunkFileNames: '[name]-[hash].cjs',
          exports: 'named',
        },
      ],
    },
    sourcemap: true,
    minify: false,
    cssCodeSplit: false,
    // Target modern browsers that support ESM natively
    target: 'es2020',
  },
});
