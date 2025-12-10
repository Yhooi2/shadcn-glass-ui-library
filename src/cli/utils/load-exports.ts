/**
 * Load EXPORTS_MAP.json Utility
 *
 * Loads the machine-readable component registry from docs/EXPORTS_MAP.json.
 * Handles multiple paths for development vs published package scenarios.
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ========================================
// TYPES
// ========================================

export interface ComponentExport {
  name: string;
  path: string;
  type: string;
  description: string;
  props?: string;
  variants?: string[];
  sizes?: string[];
  statuses?: string[];
  category?: string;
  keywords?: string[];
  shadcnCompatible?: boolean;
  compoundAPI?: boolean;
  subComponents?: string[];
  supportsAsChild?: boolean;
  contains?: string[];
}

export interface CategoryData {
  level?: number;
  description: string;
  exports: ComponentExport[];
}

export interface ExportsMap {
  $schema: string;
  title: string;
  description: string;
  version: string;
  library: string;
  repository: string;
  lastUpdated: string;
  components: Record<string, CategoryData>;
  utilities: {
    exports: Array<{
      name: string;
      path: string;
      type: string;
      description: string;
      signature?: string;
    }>;
  };
  theme: {
    exports: Array<{
      name: string;
      path: string;
      type: string;
      description: string;
    }>;
  };
  hooks: {
    exports: Array<{
      name: string;
      path: string;
      type: string;
      description: string;
      signature?: string;
    }>;
  };
  types: {
    exports: Array<{
      name: string;
      path: string;
      type: string;
      description: string;
    }>;
  };
  variants: {
    exports: Array<{
      name: string;
      path: string;
      type: string;
      description: string;
    }>;
  };
  statistics: {
    totalComponents: number;
    byLevel: Record<string, number>;
  };
  compatibility: {
    shadcnUI: {
      version: string;
      compatibleComponents: string[];
    };
    breakingChanges: Array<{
      version: string;
      changes: string[];
    }>;
  };
  usage: {
    mostCommon: string[];
    useCases: Record<string, string[]>;
  };
}

// ========================================
// LOADER
// ========================================

let cachedExportsMap: ExportsMap | null = null;

/**
 * Load EXPORTS_MAP.json from various possible locations
 */
export function loadExportsMap(): ExportsMap {
  if (cachedExportsMap) {
    return cachedExportsMap;
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Possible paths to EXPORTS_MAP.json
  // Order: development paths first, then published package paths
  const paths = [
    // Development: running from src/cli/utils/
    resolve(__dirname, '../../../docs/EXPORTS_MAP.json'),
    // Development: running from dist/cli/utils/
    resolve(__dirname, '../../../docs/EXPORTS_MAP.json'),
    // Published package: when installed in node_modules
    resolve(process.cwd(), 'node_modules/shadcn-glass-ui/docs/EXPORTS_MAP.json'),
    // Fallback: relative to cwd
    resolve(process.cwd(), 'docs/EXPORTS_MAP.json'),
  ];

  for (const path of paths) {
    try {
      const content = readFileSync(path, 'utf-8');
      cachedExportsMap = JSON.parse(content) as ExportsMap;
      return cachedExportsMap;
    } catch {
      // Try next path
      continue;
    }
  }

  throw new Error(
    'EXPORTS_MAP.json not found. Please ensure:\n' +
      '  - You are running from the project root, or\n' +
      '  - The shadcn-glass-ui package is installed correctly'
  );
}

/**
 * Get all components as a flat array
 */
export function getAllComponents(): Array<{
  name: string;
  path: string;
  category: string;
  level: number;
}> {
  const exportsMap = loadExportsMap();
  const components: Array<{
    name: string;
    path: string;
    category: string;
    level: number;
  }> = [];

  for (const [categoryKey, categoryData] of Object.entries(exportsMap.components)) {
    if (categoryData.exports) {
      for (const exp of categoryData.exports) {
        components.push({
          name: exp.name,
          path: exp.path,
          category: categoryKey,
          level: categoryData.level ?? 0,
        });
      }
    }
  }

  return components;
}

/**
 * Find component details by name
 */
export function findComponentByName(name: string): {
  component: ComponentExport;
  category: string;
  level: number;
} | null {
  const exportsMap = loadExportsMap();

  for (const [categoryKey, categoryData] of Object.entries(exportsMap.components)) {
    if (categoryData.exports) {
      const found = categoryData.exports.find((exp) => exp.name === name);
      if (found) {
        return {
          component: found,
          category: categoryKey,
          level: categoryData.level ?? 0,
        };
      }
    }
  }

  return null;
}

/**
 * Get components by category
 */
export function getComponentsByCategory(category: string): ComponentExport[] {
  const exportsMap = loadExportsMap();
  const categoryData = exportsMap.components[category];

  if (!categoryData || !categoryData.exports) {
    return [];
  }

  return categoryData.exports;
}

/**
 * Get all categories with metadata
 */
export function getCategories(): Array<{
  key: string;
  level: number;
  description: string;
  count: number;
}> {
  const exportsMap = loadExportsMap();
  const categories: Array<{
    key: string;
    level: number;
    description: string;
    count: number;
  }> = [];

  for (const [key, data] of Object.entries(exportsMap.components)) {
    categories.push({
      key,
      level: data.level ?? 0,
      description: data.description,
      count: data.exports?.length ?? 0,
    });
  }

  return categories.sort((a, b) => a.level - b.level);
}

/**
 * Get library statistics
 */
export function getStatistics(): {
  totalComponents: number;
  byLevel: Record<string, number>;
  version: string;
} {
  const exportsMap = loadExportsMap();

  return {
    totalComponents: exportsMap.statistics.totalComponents,
    byLevel: exportsMap.statistics.byLevel,
    version: exportsMap.version,
  };
}
