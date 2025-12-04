/**
 * Source Code Hardcoded Value Detection
 *
 * Scans .tsx/.ts files for design system violations:
 * - Hardcoded blur values (e.g., blur(12px) instead of var(--blur-md))
 * - Hardcoded radius values (e.g., borderRadius: '10px')
 * - Hardcoded spacing (e.g., padding: '20px' not on grid)
 * - Pure black (#000000) usage
 *
 * Run with: npm run test:compliance:source
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// Token scales from design-tokens.ts
import {
  BLUR_TOKENS,
  RADIUS_TOKENS,
  SPACING_TOKENS
} from '../../utils/design-tokens';

interface Violation {
  file: string;
  line: number;
  column: number;
  value: string;
  type: 'blur' | 'radius' | 'spacing' | 'color';
  expected: string;
  snippet: string;
}

// Regex patterns for detecting hardcoded values
const PATTERNS = {
  // backdropFilter: 'blur(12px)' or backdropFilter: `blur(${value}px)`
  INLINE_BLUR: /backdropFilter:\s*["'`](blur\((\d+)px\))/g,

  // -webkit-backdrop-filter (for completeness)
  WEBKIT_BLUR: /WebkitBackdropFilter:\s*["'`](blur\((\d+)px\))/g,

  // borderRadius: '10px' or '1.5rem'
  INLINE_RADIUS: /(borderRadius|border-radius):\s*["'`](\d+(?:\.\d+)?)(px|rem)["'`]/g,

  // padding: '20px', margin: '15px', gap: '10px'
  INLINE_SPACING: /(padding|margin|gap):\s*["'`](\d+(?:\.\d+)?)(px|rem)["'`]/g,

  // Pure black: #000000 or rgb(0,0,0)
  PURE_BLACK: /#000000|rgb\(0,\s*0,\s*0\)|rgba\(0,\s*0,\s*0,\s*1\)/g,
};

const VALID_BLUR_VALUES = Object.values(BLUR_TOKENS.SCALE);
const VALID_RADIUS_VALUES = Object.values(RADIUS_TOKENS.SCALE).filter(v => v !== 9999);
const VALID_SPACING_VALUES = SPACING_TOKENS.VALID_VALUES;

function scanFile(filePath: string): Violation[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const violations: Violation[] = [];

  // Scan for inline blur values (backdropFilter)
  let match;
  const blurPattern = new RegExp(PATTERNS.INLINE_BLUR.source, 'g');
  while ((match = blurPattern.exec(content)) !== null) {
    const blurValue = parseInt(match[2], 10);
    if (!VALID_BLUR_VALUES.includes(blurValue)) {
      const position = getLineColumn(content, match.index);
      violations.push({
        file: filePath,
        line: position.line,
        column: position.column,
        value: match[1],
        type: 'blur',
        expected: suggestBlurToken(blurValue),
        snippet: lines[position.line - 1].trim(),
      });
    }
  }

  // Scan for -webkit-backdrop-filter blur values
  const webkitBlurPattern = new RegExp(PATTERNS.WEBKIT_BLUR.source, 'g');
  while ((match = webkitBlurPattern.exec(content)) !== null) {
    const blurValue = parseInt(match[2], 10);
    if (!VALID_BLUR_VALUES.includes(blurValue)) {
      const position = getLineColumn(content, match.index);
      violations.push({
        file: filePath,
        line: position.line,
        column: position.column,
        value: match[1],
        type: 'blur',
        expected: suggestBlurToken(blurValue),
        snippet: lines[position.line - 1].trim(),
      });
    }
  }

  // Scan for inline radius values
  const radiusPattern = new RegExp(PATTERNS.INLINE_RADIUS.source, 'g');
  while ((match = radiusPattern.exec(content)) !== null) {
    const radiusValue = parseFloat(match[2]);
    const unit = match[3];
    const pixelValue = unit === 'rem' ? radiusValue * 16 : radiusValue;

    if (!VALID_RADIUS_VALUES.includes(pixelValue)) {
      const position = getLineColumn(content, match.index);
      violations.push({
        file: filePath,
        line: position.line,
        column: position.column,
        value: `${radiusValue}${unit}`,
        type: 'radius',
        expected: suggestRadiusToken(pixelValue),
        snippet: lines[position.line - 1].trim(),
      });
    }
  }

  // Scan for inline spacing values
  const spacingPattern = new RegExp(PATTERNS.INLINE_SPACING.source, 'g');
  while ((match = spacingPattern.exec(content)) !== null) {
    const property = match[1];
    const spacingValue = parseFloat(match[2]);
    const unit = match[3];
    const pixelValue = unit === 'rem' ? spacingValue * 16 : spacingValue;

    // Skip if it's a valid token value
    if (!VALID_SPACING_VALUES.includes(pixelValue)) {
      const position = getLineColumn(content, match.index);
      violations.push({
        file: filePath,
        line: position.line,
        column: position.column,
        value: `${property}: ${spacingValue}${unit}`,
        type: 'spacing',
        expected: suggestSpacingToken(pixelValue),
        snippet: lines[position.line - 1].trim(),
      });
    }
  }

  // Scan for pure black
  const pureBlackPattern = new RegExp(PATTERNS.PURE_BLACK.source, 'g');
  while ((match = pureBlackPattern.exec(content)) !== null) {
    const position = getLineColumn(content, match.index);
    violations.push({
      file: filePath,
      line: position.line,
      column: position.column,
      value: match[0],
      type: 'color',
      expected: 'Use #0a0a0f or #121212 instead of pure black',
      snippet: lines[position.line - 1].trim(),
    });
  }

  return violations;
}

function getLineColumn(content: string, index: number): { line: number; column: number } {
  const before = content.substring(0, index);
  const lines = before.split('\n');
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}

function suggestBlurToken(value: number): string {
  const closest = VALID_BLUR_VALUES.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
  const tokenName = Object.entries(BLUR_TOKENS.SCALE).find(
    ([, v]) => v === closest
  )?.[0];
  return `blur(var(--blur-${tokenName})) /* ${closest}px */`;
}

function suggestRadiusToken(value: number): string {
  const closest = VALID_RADIUS_VALUES.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
  const tokenName = Object.entries(RADIUS_TOKENS.SCALE).find(
    ([, v]) => v === closest
  )?.[0];
  return `var(--radius-${tokenName}) /* ${closest}px */`;
}

function suggestSpacingToken(value: number): string {
  const closest = VALID_SPACING_VALUES.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
  return `Use spacing token for ${closest}px (found ${value}px not on grid)`;
}

describe('Source Code Hardcoded Value Detection', () => {
  const componentsDir = path.join(__dirname, '../../../components/glass');
  let allViolations: Violation[] = [];

  it('scans all component files for hardcoded values', async () => {
    const files = await glob('**/*.tsx', {
      cwd: componentsDir,
      absolute: true,
      ignore: ['**/*.test.tsx', '**/*.stories.tsx', '**/*.visual.test.tsx']
    });

    console.log(`\nScanning ${files.length} component files...`);

    for (const file of files) {
      const violations = scanFile(file);
      allViolations.push(...violations);
    }
  });

  it('reports all blur violations', () => {
    const blurViolations = allViolations.filter(v => v.type === 'blur');

    if (blurViolations.length > 0) {
      console.log('\n=== BLUR VIOLATIONS ===');
      blurViolations.forEach(v => {
        const relativePath = path.relative(componentsDir, v.file);
        console.log(
          `\n${relativePath}:${v.line}:${v.column}\n` +
          `  Found: ${v.value}\n` +
          `  Expected: ${v.expected}\n` +
          `  Code: ${v.snippet}`
        );
      });
      console.log(`\nTotal blur violations: ${blurViolations.length}\n`);
    }

    expect(blurViolations).toEqual([]);
  });

  it('reports all radius violations', () => {
    const radiusViolations = allViolations.filter(v => v.type === 'radius');

    if (radiusViolations.length > 0) {
      console.log('\n=== RADIUS VIOLATIONS ===');
      radiusViolations.forEach(v => {
        const relativePath = path.relative(componentsDir, v.file);
        console.log(
          `\n${relativePath}:${v.line}:${v.column}\n` +
          `  Found: ${v.value}\n` +
          `  Expected: ${v.expected}\n` +
          `  Code: ${v.snippet}`
        );
      });
      console.log(`\nTotal radius violations: ${radiusViolations.length}\n`);
    }

    expect(radiusViolations).toEqual([]);
  });

  it('reports all spacing violations', () => {
    const spacingViolations = allViolations.filter(v => v.type === 'spacing');

    if (spacingViolations.length > 0) {
      console.log('\n=== SPACING VIOLATIONS ===');
      spacingViolations.forEach(v => {
        const relativePath = path.relative(componentsDir, v.file);
        console.log(
          `\n${relativePath}:${v.line}:${v.column}\n` +
          `  Found: ${v.value}\n` +
          `  Expected: ${v.expected}\n` +
          `  Code: ${v.snippet}`
        );
      });
      console.log(`\nTotal spacing violations: ${spacingViolations.length}\n`);
    }

    expect(spacingViolations).toEqual([]);
  });

  it('reports all pure black color violations', () => {
    const colorViolations = allViolations.filter(v => v.type === 'color');

    if (colorViolations.length > 0) {
      console.log('\n=== COLOR VIOLATIONS (Pure Black) ===');
      colorViolations.forEach(v => {
        const relativePath = path.relative(componentsDir, v.file);
        console.log(
          `\n${relativePath}:${v.line}:${v.column}\n` +
          `  Found: ${v.value}\n` +
          `  Expected: ${v.expected}\n` +
          `  Code: ${v.snippet}`
        );
      });
      console.log(`\nTotal pure black violations: ${colorViolations.length}\n`);
    }

    expect(colorViolations).toEqual([]);
  });

  it('summary: reports total violations found', () => {
    if (allViolations.length > 0) {
      console.log('\n=== SUMMARY ===');
      console.log(`Total violations: ${allViolations.length}`);
      console.log(`  - Blur: ${allViolations.filter(v => v.type === 'blur').length}`);
      console.log(`  - Radius: ${allViolations.filter(v => v.type === 'radius').length}`);
      console.log(`  - Spacing: ${allViolations.filter(v => v.type === 'spacing').length}`);
      console.log(`  - Color: ${allViolations.filter(v => v.type === 'color').length}`);
      console.log('\nFix these violations to comply with design system tokens.\n');
    } else {
      console.log('\n✅ No hardcoded values found! All components use design tokens.\n');
    }

    expect(allViolations).toEqual([]);
  });
});
