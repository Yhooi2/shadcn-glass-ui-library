/**
 * CLI Output Formatting Utilities
 *
 * ANSI color codes and formatting helpers for CLI output.
 * Zero dependencies - uses built-in escape sequences.
 */

export const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',

  // Foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',

  // Bright foreground colors
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
} as const;

/**
 * Category emoji mapping
 */
export const CATEGORY_EMOJI: Record<string, string> = {
  primitives: '🧱',
  core: '⚙️',
  atomic: '🔹',
  specialized: '🎯',
  composite: '🧩',
  sections: '📄',
};

/**
 * Apply color to text
 */
export function color(text: string, colorCode: string): string {
  return `${colorCode}${text}${COLORS.reset}`;
}

/**
 * Bold text
 */
export function bold(text: string): string {
  return `${COLORS.bold}${text}${COLORS.reset}`;
}

/**
 * Dim text
 */
export function dim(text: string): string {
  return `${COLORS.dim}${text}${COLORS.reset}`;
}

/**
 * Create a horizontal line
 */
export function line(length: number = 50): string {
  return dim('─'.repeat(length));
}

/**
 * Success message with green checkmark
 */
export function success(text: string): string {
  return `${COLORS.green}✓${COLORS.reset} ${text}`;
}

/**
 * Error message with red X
 */
export function error(text: string): string {
  return `${COLORS.red}✗${COLORS.reset} ${text}`;
}

/**
 * Warning message with yellow triangle
 */
export function warning(text: string): string {
  return `${COLORS.yellow}⚠${COLORS.reset} ${text}`;
}

/**
 * Info message with blue circle
 */
export function info(text: string): string {
  return `${COLORS.cyan}ℹ${COLORS.reset} ${text}`;
}

/**
 * Bullet point
 */
export function bullet(text: string, colorCode: string = COLORS.cyan): string {
  return `  ${colorCode}•${COLORS.reset} ${text}`;
}

/**
 * Print a section header
 */
export function sectionHeader(title: string): string {
  return `\n${COLORS.bold}${title}:${COLORS.reset}`;
}

/**
 * Format key-value pair
 */
export function keyValue(key: string, value: string, keyWidth: number = 12): string {
  const paddedKey = key.padEnd(keyWidth);
  return `${COLORS.bold}${paddedKey}${COLORS.reset} ${value}`;
}
