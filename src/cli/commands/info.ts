/**
 * Info Command
 *
 * Shows detailed information about a specific component.
 *
 * Usage:
 *   npx shadcn-glass-ui info ButtonGlass
 *   npx shadcn-glass-ui info button
 *   npx shadcn-glass-ui info btn
 */

import {
  getAllComponents,
  findComponentByName,
  type ComponentExport,
} from '../utils/load-exports.js';
import { fuzzyMatch, type ComponentMatch } from '../utils/fuzzy-search.js';
import {
  COLORS,
  bold,
  dim,
  line,
  success,
  bullet,
  sectionHeader,
  keyValue,
  color,
} from '../utils/format.js';

// ========================================
// USAGE EXAMPLE GENERATOR
// ========================================

/**
 * Generate a usage example for a component
 */
function generateUsageExample(comp: ComponentExport): string {
  const name = comp.name;

  // Compound component API
  if (comp.compoundAPI && comp.subComponents && comp.subComponents.length > 0) {
    const subComps = comp.subComponents;
    const contentComp = subComps.find((s) => s.includes('Content')) || subComps[1] || subComps[0];

    return `<${name}.Root>
  <${name}.${contentComp}>
    {/* Content here */}
  </${name}.${contentComp}>
</${name}.Root>`;
  }

  // Regular component with props
  const props: string[] = [];

  if (comp.variants && comp.variants.length > 0) {
    props.push(`variant="${comp.variants[0]}"`);
  }

  if (comp.sizes && comp.sizes.length > 0) {
    props.push(`size="${comp.sizes[0]}"`);
  }

  const propsStr = props.length > 0 ? ' ' + props.join(' ') : '';

  // Self-closing for certain component types
  const selfClosing = [
    'Avatar',
    'Progress',
    'Skeleton',
    'Slider',
    'Checkbox',
    'Toggle',
    'Input',
  ].some((type) => name.includes(type));

  if (selfClosing) {
    return `<${name}${propsStr} />`;
  }

  return `<${name}${propsStr}>
  {/* Content here */}
</${name}>`;
}

// ========================================
// INFO PRINTER
// ========================================

/**
 * Print detailed component information
 */
function printComponentInfo(
  comp: ComponentExport,
  category: string,
  level: number,
  alternativeMatches: ComponentMatch[]
): void {
  // Header
  console.log(`\n${color(bold(comp.name), COLORS.cyan)}`);
  console.log(line(50));

  // Show alternative matches if there are multiple
  if (alternativeMatches.length > 1) {
    console.log(dim(`Found ${alternativeMatches.length} matches. Showing best match.`));
    if (alternativeMatches.length <= 5) {
      const others = alternativeMatches
        .slice(1)
        .map((m) => m.name)
        .join(', ');
      console.log(dim(`Other matches: ${others}`));
    }
    console.log('');
  }

  // Description
  console.log(sectionHeader('Description'));
  console.log(`  ${comp.description}`);
  console.log('');

  // Metadata
  console.log(keyValue('Category:', category));
  console.log(keyValue('Level:', `L${level}`));
  console.log(keyValue('Type:', comp.type));
  console.log(keyValue('Path:', comp.path));

  if (comp.props) {
    console.log(keyValue('Props:', comp.props));
  }

  // Variants
  if (comp.variants && comp.variants.length > 0) {
    console.log(sectionHeader('Variants'));
    comp.variants.forEach((v) => {
      console.log(bullet(v, COLORS.green));
    });
  }

  // Sizes
  if (comp.sizes && comp.sizes.length > 0) {
    console.log(sectionHeader('Sizes'));
    comp.sizes.forEach((s) => {
      console.log(bullet(s, COLORS.yellow));
    });
  }

  // Statuses (for Avatar, etc.)
  if (comp.statuses && comp.statuses.length > 0) {
    console.log(sectionHeader('Statuses'));
    comp.statuses.forEach((s) => {
      console.log(bullet(s, COLORS.blue));
    });
  }

  // Features
  console.log('');
  if (comp.shadcnCompatible) {
    console.log(success('shadcn/ui compatible'));
  }
  if (comp.compoundAPI) {
    console.log(success('Compound component API'));
    if (comp.subComponents && comp.subComponents.length > 0) {
      console.log(dim(`  Sub-components: ${comp.subComponents.join(', ')}`));
    }
  }
  if (comp.supportsAsChild) {
    console.log(success('Supports asChild pattern'));
  }

  // Usage Example
  console.log(sectionHeader('Usage Example'));
  console.log(line(21));
  console.log('');
  console.log(color(`import { ${comp.name} } from 'shadcn-glass-ui';`, COLORS.cyan));
  console.log('');
  console.log(generateUsageExample(comp));

  // Keywords
  if (comp.keywords && comp.keywords.length > 0) {
    console.log('');
    console.log(dim(`Keywords: ${comp.keywords.join(', ')}`));
  }

  console.log('');
}

// ========================================
// MAIN COMMAND
// ========================================

/**
 * Execute the info command
 */
export async function showComponentInfo(query: string): Promise<void> {
  // Load all components
  const allComponents = getAllComponents();

  // Fuzzy search
  const matches = fuzzyMatch(query, allComponents);

  if (matches.length === 0) {
    console.log(`\n${color('No component found matching', COLORS.red)} "${query}"`);
    console.log(dim('\nTry one of these:'));
    console.log(dim('  npx shadcn-glass-ui list'));
    console.log(dim('  npx shadcn-glass-ui info button'));
    console.log(dim('  npx shadcn-glass-ui info modal'));
    console.log('');
    process.exit(1);
  }

  // Get best match details
  const bestMatch = matches[0];
  const details = findComponentByName(bestMatch.name);

  if (!details) {
    console.log(`\n${color('Component details not found for', COLORS.red)} "${bestMatch.name}"`);
    process.exit(1);
  }

  // Print info
  printComponentInfo(details.component, details.category, details.level, matches);
}
