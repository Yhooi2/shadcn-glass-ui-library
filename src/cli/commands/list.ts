/**
 * List Command
 *
 * Lists all available components, optionally filtered by category.
 *
 * Usage:
 *   npx shadcn-glass-ui list
 *   npx shadcn-glass-ui list --category=core
 *   npx shadcn-glass-ui list --level=1
 */

import {
  loadExportsMap,
  getCategories,
  getStatistics,
  type ComponentExport,
} from '../utils/load-exports.js';
import { COLORS, CATEGORY_EMOJI, bold, dim, line, color } from '../utils/format.js';

// ========================================
// COMPONENT PRINTER
// ========================================

/**
 * Print a single component entry
 */
function printComponent(comp: ComponentExport): void {
  const flags: string[] = [];

  if (comp.shadcnCompatible) {
    flags.push(color('shadcn', COLORS.green));
  }
  if (comp.compoundAPI) {
    flags.push(color('compound', COLORS.yellow));
  }
  if (comp.supportsAsChild) {
    flags.push(color('asChild', COLORS.magenta));
  }

  const flagStr = flags.length > 0 ? ` [${flags.join(', ')}]` : '';

  console.log(`   ${color('•', COLORS.cyan)} ${comp.name}${flagStr}`);
}

/**
 * Print a category section
 */
function printCategory(
  key: string,
  level: number,
  description: string,
  components: ComponentExport[]
): void {
  const emoji = CATEGORY_EMOJI[key] || '📦';
  const levelStr = `L${level}`;

  console.log(`${emoji} ${bold(key.toUpperCase())} ${dim(`(${levelStr})`)}`);
  console.log(`   ${dim(description)}`);
  console.log('');

  for (const comp of components) {
    printComponent(comp);
  }

  console.log('');
}

// ========================================
// MAIN COMMAND
// ========================================

export interface ListOptions {
  category?: string;
  level?: string;
}

/**
 * Execute the list command
 */
export async function listComponents(options: ListOptions = {}): Promise<void> {
  const exportsMap = loadExportsMap();
  const categories = getCategories();
  const stats = getStatistics();

  // Header
  console.log(`\n${color(bold('shadcn-glass-ui Components'), COLORS.cyan)}`);
  console.log(`${dim(`Version ${stats.version}`)}`);
  console.log(line(50));
  console.log('');

  let totalCount = 0;
  let filteredCount = 0;

  // Filter options
  const categoryFilter = options.category?.toLowerCase();
  const levelFilter = options.level !== undefined ? parseInt(options.level, 10) : undefined;

  for (const cat of categories) {
    const categoryData = exportsMap.components[cat.key];

    if (!categoryData || !categoryData.exports || categoryData.exports.length === 0) {
      continue;
    }

    // Apply category filter
    if (categoryFilter && cat.key.toLowerCase() !== categoryFilter) {
      totalCount += categoryData.exports.length;
      continue;
    }

    // Apply level filter
    if (levelFilter !== undefined && cat.level !== levelFilter) {
      totalCount += categoryData.exports.length;
      continue;
    }

    printCategory(cat.key, cat.level, cat.description, categoryData.exports);

    totalCount += categoryData.exports.length;
    filteredCount += categoryData.exports.length;
  }

  // Footer
  console.log(line(21));

  if (categoryFilter || levelFilter !== undefined) {
    console.log(`${bold(`Showing: ${filteredCount}`)} ${dim(`of ${totalCount} total components`)}`);
  } else {
    console.log(`${bold(`Total: ${totalCount} components`)}`);
  }

  // Help hints
  console.log('');
  if (!categoryFilter && levelFilter === undefined) {
    console.log(dim('Filter by category: npx shadcn-glass-ui list --category=core'));
    console.log(dim('Filter by level:    npx shadcn-glass-ui list --level=1'));
  }
  console.log(dim('Get component info: npx shadcn-glass-ui info <name>'));
  console.log('');
}

/**
 * Print available categories for help
 */
export function printAvailableCategories(): void {
  const categories = getCategories();

  console.log('\nAvailable categories:');
  for (const cat of categories) {
    const emoji = CATEGORY_EMOJI[cat.key] || '📦';
    console.log(`  ${emoji} ${cat.key} (L${cat.level}) - ${cat.count} components`);
  }
  console.log('');
}
