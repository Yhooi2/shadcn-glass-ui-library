#!/usr/bin/env node
/**
 * shadcn-glass-ui CLI
 *
 * Command-line interface for the shadcn-glass-ui component library.
 *
 * Commands:
 *   info <name>     Show detailed component information
 *   list            List all available components
 *
 * Usage:
 *   npx shadcn-glass-ui info ButtonGlass
 *   npx shadcn-glass-ui info button
 *   npx shadcn-glass-ui list
 *   npx shadcn-glass-ui list --category=core
 */

import { parseArgs, type ParseArgsConfig } from 'node:util';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { showComponentInfo } from './commands/info.js';
import { listComponents, printAvailableCategories } from './commands/list.js';
import { COLORS, bold, dim, color } from './utils/format.js';

// ========================================
// VERSION
// ========================================

/**
 * Get package version
 */
function getVersion(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Try to read package.json from various locations
  const paths = [
    resolve(__dirname, '../../package.json'), // From dist/cli/
    resolve(__dirname, '../../../package.json'), // From src/cli/
    resolve(process.cwd(), 'package.json'), // From cwd
    resolve(process.cwd(), 'node_modules/shadcn-glass-ui/package.json'), // From installed
  ];

  for (const path of paths) {
    try {
      const pkg = JSON.parse(readFileSync(path, 'utf-8'));
      if (pkg.name === 'shadcn-glass-ui') {
        return pkg.version;
      }
    } catch {
      continue;
    }
  }

  return 'unknown';
}

// ========================================
// HELP
// ========================================

/**
 * Print help message
 */
function printHelp(): void {
  console.log(`
${color(bold('shadcn-glass-ui'), COLORS.cyan)} - Glassmorphism UI Component Library

${bold('Usage:')}
  npx shadcn-glass-ui <command> [options]

${bold('Commands:')}
  info <name>    Show detailed component information
  list           List all available components

${bold('Options:')}
  --help, -h     Show this help message
  --version, -v  Show version number
  --category     Filter list by category (e.g., --category=core)
  --level        Filter list by level (e.g., --level=1)

${bold('Examples:')}
  ${dim('# Get info about a component (fuzzy search supported)')}
  npx shadcn-glass-ui info ButtonGlass
  npx shadcn-glass-ui info button
  npx shadcn-glass-ui info modal

  ${dim('# List all components')}
  npx shadcn-glass-ui list

  ${dim('# List components by category')}
  npx shadcn-glass-ui list --category=core
  npx shadcn-glass-ui list --category=composite

  ${dim('# List components by level')}
  npx shadcn-glass-ui list --level=1

${bold('Categories:')}
  primitives  (L0)  Foundation building blocks
  core        (L1)  Basic interactive components
  atomic      (L2)  Small specialized components
  specialized (L3)  Domain-specific components
  composite   (L4)  Multi-element widgets
  sections    (L5)  Full page sections

${bold('More info:')}
  Documentation: https://yhooi2.github.io/shadcn-glass-ui-library/
  Repository:    https://github.com/Yhooi2/shadcn-glass-ui-library
`);
}

// ========================================
// MAIN
// ========================================

/**
 * Parse command line arguments
 */
function parseCliArgs(): {
  command: string | undefined;
  args: string[];
  options: {
    help: boolean;
    version: boolean;
    category?: string;
    level?: string;
  };
} {
  const config: ParseArgsConfig = {
    allowPositionals: true,
    strict: false,
    options: {
      help: { type: 'boolean', short: 'h', default: false },
      version: { type: 'boolean', short: 'v', default: false },
      category: { type: 'string' },
      level: { type: 'string' },
    },
  };

  try {
    const { values, positionals } = parseArgs(config);
    const [command, ...args] = positionals;

    return {
      command,
      args,
      options: {
        help: values.help as boolean,
        version: values.version as boolean,
        category: values.category as string | undefined,
        level: values.level as string | undefined,
      },
    };
  } catch (error) {
    // Handle unknown options gracefully
    if (error instanceof Error && error.message.includes('Unknown option')) {
      console.error(`${color('Error:', COLORS.red)} ${error.message}`);
      console.log(dim('\nRun "npx shadcn-glass-ui --help" for usage information.'));
      process.exit(1);
    }
    throw error;
  }
}

/**
 * Main CLI entry point
 */
async function main(): Promise<void> {
  const { command, args, options } = parseCliArgs();

  // Handle global options
  if (options.version) {
    console.log(getVersion());
    process.exit(0);
  }

  if (options.help || !command) {
    printHelp();
    process.exit(0);
  }

  // Handle commands
  switch (command.toLowerCase()) {
    case 'info': {
      if (args.length === 0) {
        console.error(`${color('Error:', COLORS.red)} Component name required`);
        console.log(dim('\nUsage: npx shadcn-glass-ui info <ComponentName>'));
        console.log(dim('Example: npx shadcn-glass-ui info ButtonGlass'));
        process.exit(1);
      }
      await showComponentInfo(args[0]);
      break;
    }

    case 'list': {
      await listComponents({
        category: options.category,
        level: options.level,
      });
      break;
    }

    case 'categories': {
      printAvailableCategories();
      break;
    }

    default: {
      console.error(`${color('Error:', COLORS.red)} Unknown command "${command}"`);
      console.log(dim('\nAvailable commands: info, list'));
      console.log(dim('Run "npx shadcn-glass-ui --help" for usage information.'));
      process.exit(1);
    }
  }
}

// Run CLI
main().catch((error) => {
  console.error(`${color('Error:', COLORS.red)} ${error.message}`);
  if (process.env.DEBUG) {
    console.error(error.stack);
  }
  process.exit(1);
});
