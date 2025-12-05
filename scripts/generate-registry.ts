/**
 * Registry Generator for shadcn-glass-ui
 *
 * Generates shadcn/ui v4 compatible registry files for all Glass UI components.
 *
 * Output: public/r/ directory with:
 * - registry.json (main index)
 * - Individual component JSON files
 *
 * Usage: npm run generate:registry
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// ========================================
// TYPES (shadcn/ui v4 schema)
// ========================================

interface RegistryItem {
  $schema: string;
  name: string;
  type: 'registry:ui' | 'registry:block' | 'registry:lib' | 'registry:hook' | 'registry:component';
  title?: string;
  description: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: Array<{
    path: string;
    type: 'registry:component' | 'registry:ui' | 'registry:lib' | 'registry:hook' | 'registry:file';
    content?: string;
    target?: string;
  }>;
  tailwind?: {
    config?: {
      plugins?: string[];
      theme?: Record<string, unknown>;
    };
  };
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  docs?: string;
  categories?: string[];
}

interface RegistryIndex {
  $schema: string;
  name: string;
  homepage: string;
  items: Array<{
    name: string;
    type: string;
    title?: string;
    description: string;
  }>;
}

// ========================================
// CONSTANTS
// ========================================

const SCHEMA_REGISTRY = 'https://ui.shadcn.com/schema/registry.json';
const SCHEMA_ITEM = 'https://ui.shadcn.com/schema/registry-item.json';
const OUTPUT_DIR = 'public/r';
const REPO_URL = 'https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main';

// Component categories mapping
const CATEGORY_MAP: Record<string, { type: RegistryItem['type']; category: string }> = {
  '/ui/': { type: 'registry:ui', category: 'ui' },
  '/atomic/': { type: 'registry:component', category: 'atomic' },
  '/specialized/': { type: 'registry:component', category: 'specialized' },
  '/composite/': { type: 'registry:block', category: 'composite' },
  '/sections/': { type: 'registry:block', category: 'sections' },
  '/primitives/': { type: 'registry:lib', category: 'primitives' },
};

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Extract npm dependencies from import statements
 */
function parseDependencies(content: string): string[] {
  const deps = new Set<string>();

  // Match: import ... from 'package-name'
  const importRegex = /import\s+.*\s+from\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];

    // Skip relative imports and @/ aliases
    if (importPath.startsWith('.') || importPath.startsWith('@/')) {
      continue;
    }

    // Handle scoped packages (@radix-ui/react-slot)
    if (importPath.startsWith('@')) {
      deps.add(importPath);
    } else {
      // Extract base package name (lucide-react/icons -> lucide-react)
      const basePkg = importPath.split('/')[0];
      deps.add(basePkg);
    }
  }

  return Array.from(deps).sort();
}

/**
 * Extract registry dependencies (other components from this registry)
 */
function extractRegistryDeps(content: string): string[] {
  const deps = new Set<string>();

  // Match: import ... from '@/lib/utils' -> cn
  // Match: import ... from '@/lib/hooks/...' -> use-hover, use-focus
  // Match: import ... from '@/components/glass/primitives' -> touch-target, form-field-wrapper

  const patterns = [
    { regex: /from\s+['"]@\/lib\/utils['"]/, dep: 'cn' },
    { regex: /from\s+['"]@\/lib\/hooks\/use-hover['"]/, dep: 'use-hover' },
    { regex: /from\s+['"]@\/lib\/hooks\/use-focus['"]/, dep: 'use-focus' },
    { regex: /from\s+['"]@\/lib\/hooks\/use-responsive['"]/, dep: 'use-responsive' },
    { regex: /from\s+['"]@\/lib\/hooks\/use-wallpaper-tint['"]/, dep: 'use-wallpaper-tint' },
    { regex: /from\s+['"]@\/lib\/theme-context['"]/, dep: 'theme-provider' },
    { regex: /from\s+['"]@\/components\/glass\/primitives['"]/, dep: 'primitives' },
    { regex: /from\s+['"]@\/lib\/variants\//, dep: 'variants' },
  ];

  for (const pattern of patterns) {
    if (pattern.regex.test(content)) {
      deps.add(pattern.dep);
    }
  }

  return Array.from(deps).sort();
}

/**
 * Extract description from JSDoc comment
 */
function extractDescription(content: string): string {
  // Match: /** * ComponentName * Description text */
  const match = content.match(/\/\*\*\s*\n\s*\*\s*\w+\s+Component\s*\n\s*\*\s*\n\s*\*\s*(.+?)(?:\n\s*\*\s*-|\n\s*\*\/)/s);

  if (match) {
    return match[1].trim();
  }

  // Fallback: first line of file comment
  const fallbackMatch = content.match(/\/\*\*\s*\n\s*\*\s*(.+?)\n/);
  return fallbackMatch ? fallbackMatch[1].trim() : '';
}

/**
 * Extract title from component name
 */
function extractTitle(name: string): string {
  // button-glass -> Button Glass
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Determine component category and type
 */
function getCategoryInfo(componentPath: string): { type: RegistryItem['type']; category: string } {
  for (const [pathPattern, info] of Object.entries(CATEGORY_MAP)) {
    if (componentPath.includes(pathPattern)) {
      return info;
    }
  }

  // Default to component
  return { type: 'registry:component', category: 'misc' };
}

// ========================================
// MAIN GENERATOR
// ========================================

async function generateRegistry() {
  console.log('🔨 Generating shadcn-glass-ui registry...\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Find all component files
  const componentFiles = await glob('src/components/glass/**/*.tsx', {
    ignore: [
      '**/*.test.tsx',
      '**/*.stories.tsx',
      '**/__tests__/**',
      '**/__visual__/**',
      '**/ComponentShowcase.tsx',
      '**/DesktopShowcase.tsx',
      '**/MobileShowcase.tsx',
    ],
  });

  console.log(`📦 Found ${componentFiles.length} components\n`);

  const registryItems: RegistryItem[] = [];

  // Generate individual component registry files
  for (const componentPath of componentFiles) {
    const content = fs.readFileSync(componentPath, 'utf-8');
    const fileName = path.basename(componentPath, '.tsx');
    const { type, category } = getCategoryInfo(componentPath);

    // Parse metadata
    const dependencies = parseDependencies(content);
    const registryDependencies = extractRegistryDeps(content);
    const description = extractDescription(content) || `${extractTitle(fileName)} component with glass effects`;
    const title = extractTitle(fileName);

    // Create registry item
    const item: RegistryItem = {
      $schema: SCHEMA_ITEM,
      name: fileName,
      type,
      title,
      description,
      dependencies,
      registryDependencies,
      files: [
        {
          path: `components/glass/${category}/${fileName}.tsx`,
          type: type === 'registry:lib' ? 'registry:lib' : 'registry:component',
          content: content, // Plain text content (shadcn CLI handles encoding)
        },
      ],
      categories: [category],
    };

    // Add CSS vars for UI components
    if (type === 'registry:ui' || category === 'ui') {
      item.cssVars = {
        light: {
          '--glass-bg': 'rgba(255, 255, 255, 0.1)',
          '--glass-border': 'rgba(255, 255, 255, 0.2)',
          '--blur-sm': '8px',
          '--blur-md': '16px',
          '--blur-lg': '24px',
        },
        dark: {
          '--glass-bg': 'rgba(255, 255, 255, 0.05)',
          '--glass-border': 'rgba(255, 255, 255, 0.1)',
          '--blur-sm': '8px',
          '--blur-md': '16px',
          '--blur-lg': '24px',
        },
      };
    }

    registryItems.push(item);

    // Write individual JSON file
    const outputPath = path.join(OUTPUT_DIR, `${fileName}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(item, null, 2));

    console.log(`✅ ${fileName}.json (${type}, ${dependencies.length} deps)`);
  }

  // Generate main registry index
  const registryIndex: RegistryIndex = {
    $schema: SCHEMA_REGISTRY,
    name: 'shadcn-glass-ui',
    homepage: 'https://yhooi2.github.io/shadcn-glass-ui-library/',
    items: registryItems.map(item => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
    })),
  };

  const indexPath = path.join(OUTPUT_DIR, 'registry.json');
  fs.writeFileSync(indexPath, JSON.stringify(registryIndex, null, 2));

  console.log(`\n✅ registry.json (${registryItems.length} items)`);
  console.log(`\n🎉 Registry generated successfully in ${OUTPUT_DIR}/`);
  console.log(`\n📝 Registry URL: ${REPO_URL}/public/r/registry.json`);
}

// ========================================
// RUN
// ========================================

generateRegistry().catch((error) => {
  console.error('❌ Error generating registry:', error);
  process.exit(1);
});
