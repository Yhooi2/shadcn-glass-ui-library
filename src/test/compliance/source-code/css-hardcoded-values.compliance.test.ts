/**
 * CSS File Hardcoded Value Detection
 *
 * Scans CSS files for design system violations:
 * - Hardcoded backdrop-filter blur values
 * - Hardcoded border-radius values
 * - Theme overrides that don't match primitives.css
 *
 * Run with: npm run test:compliance:source
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { BLUR_TOKENS, RADIUS_TOKENS } from '../../utils/design-tokens';

interface CSSViolation {
  file: string;
  line: number;
  selector: string;
  property: string;
  value: string;
  expected: string;
}

function scanCSSFile(filePath: string): CSSViolation[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const violations: CSSViolation[] = [];

  let currentSelector = '';

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Track current selector (class, id, or element)
    const selectorMatch = line.match(/^([.#]?[\w-]+(?:\s+[.#]?[\w-]+)*)\s*\{?/);
    if (selectorMatch && !line.includes(':') && !line.includes('/*')) {
      currentSelector = selectorMatch[1].trim();
    }

    // Check backdrop-filter blur values
    const blurMatch = line.match(/backdrop-filter:\s*blur\((\d+)px\)/);
    if (blurMatch) {
      const blurValue = parseInt(blurMatch[1], 10);
      const validBlurs = Object.values(BLUR_TOKENS.SCALE);

      if (!validBlurs.includes(blurValue)) {
        violations.push({
          file: filePath,
          line: lineNum,
          selector: currentSelector,
          property: 'backdrop-filter',
          value: `blur(${blurValue}px)`,
          expected: suggestBlurCSSVar(blurValue),
        });
      }
    }

    // Check -webkit-backdrop-filter blur values
    const webkitBlurMatch = line.match(/-webkit-backdrop-filter:\s*blur\((\d+)px\)/);
    if (webkitBlurMatch) {
      const blurValue = parseInt(webkitBlurMatch[1], 10);
      const validBlurs = Object.values(BLUR_TOKENS.SCALE);

      if (!validBlurs.includes(blurValue)) {
        violations.push({
          file: filePath,
          line: lineNum,
          selector: currentSelector,
          property: '-webkit-backdrop-filter',
          value: `blur(${blurValue}px)`,
          expected: suggestBlurCSSVar(blurValue),
        });
      }
    }

    // Check border-radius values
    const radiusMatch = line.match(/border-radius:\s*(\d+(?:\.\d+)?)(px|rem)/);
    if (radiusMatch) {
      const radiusValue = parseFloat(radiusMatch[1]);
      const unit = radiusMatch[2];
      const pixelValue = unit === 'rem' ? radiusValue * 16 : radiusValue;
      const validRadii = Object.values(RADIUS_TOKENS.SCALE).filter(v => v !== 9999);

      if (!validRadii.includes(pixelValue)) {
        violations.push({
          file: filePath,
          line: lineNum,
          selector: currentSelector,
          property: 'border-radius',
          value: `${radiusValue}${unit}`,
          expected: suggestRadiusCSSVar(pixelValue),
        });
      }
    }
  });

  return violations;
}

function suggestBlurCSSVar(value: number): string {
  const validBlurs = Object.values(BLUR_TOKENS.SCALE);
  const closest = validBlurs.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
  const tokenName = Object.entries(BLUR_TOKENS.SCALE).find(
    ([, v]) => v === closest
  )?.[0];
  return `blur(var(--blur-${tokenName})) /* ${closest}px, was ${value}px */`;
}

function suggestRadiusCSSVar(value: number): string {
  const validRadii = Object.values(RADIUS_TOKENS.SCALE).filter(v => v !== 9999);
  const closest = validRadii.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
  const tokenName = Object.entries(RADIUS_TOKENS.SCALE).find(
    ([, v]) => v === closest
  )?.[0];
  return `var(--radius-${tokenName}) /* ${closest}px, was ${value}px */`;
}

describe('CSS File Hardcoded Value Detection', () => {
  describe('glass-variants.css', () => {
    const filePath = path.join(__dirname, '../../../styles/utilities/glass-variants.css');

    it('should not have hardcoded blur values', () => {
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  File not found: ${filePath}`);
        return;
      }

      const violations = scanCSSFile(filePath);
      const blurViolations = violations.filter(v =>
        v.property === 'backdrop-filter' || v.property === '-webkit-backdrop-filter'
      );

      if (blurViolations.length > 0) {
        console.log('\n=== CSS BLUR VIOLATIONS in glass-variants.css ===');
        blurViolations.forEach(v => {
          console.log(
            `\nLine ${v.line} (${v.selector}):\n` +
            `  Property: ${v.property}\n` +
            `  Found: ${v.value}\n` +
            `  Expected: ${v.expected}`
          );
        });
        console.log(`\nTotal blur violations: ${blurViolations.length}\n`);
      }

      expect(blurViolations).toEqual([]);
    });

    it('should not have hardcoded radius values', () => {
      if (!fs.existsSync(filePath)) {
        return;
      }

      const violations = scanCSSFile(filePath);
      const radiusViolations = violations.filter(v => v.property === 'border-radius');

      if (radiusViolations.length > 0) {
        console.log('\n=== CSS RADIUS VIOLATIONS in glass-variants.css ===');
        radiusViolations.forEach(v => {
          console.log(
            `\nLine ${v.line} (${v.selector}):\n` +
            `  Found: ${v.value}\n` +
            `  Expected: ${v.expected}`
          );
        });
        console.log(`\nTotal radius violations: ${radiusViolations.length}\n`);
      }

      expect(radiusViolations).toEqual([]);
    });
  });

  describe('Theme files - token overrides', () => {
    it('glass.css should have correct --blur-md override (16px)', () => {
      const filePath = path.join(__dirname, '../../../styles/themes/glass.css');

      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  File not found: ${filePath}`);
        return;
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      // Check for --blur-md override
      const blurMdLines = lines.filter(line => line.includes('--blur-md'));

      if (blurMdLines.length > 0) {
        blurMdLines.forEach((line) => {
          const match = line.match(/--blur-md:\s*(\d+)px/);
          if (match) {
            const value = parseInt(match[1], 10);
            const lineNum = lines.indexOf(line) + 1;

            if (value !== BLUR_TOKENS.SCALE.md) {
              console.log(
                `\n=== THEME OVERRIDE VIOLATION in glass.css ===\n` +
                `Line ${lineNum}:\n` +
                `  Found: --blur-md: ${value}px\n` +
                `  Expected: --blur-md: ${BLUR_TOKENS.SCALE.md}px (or remove override)\n`
              );

              expect(value).toBe(BLUR_TOKENS.SCALE.md);
            }
          }
        });
      }
    });

    it('aurora.css should not override blur tokens incorrectly', () => {
      const filePath = path.join(__dirname, '../../../styles/themes/aurora.css');

      if (!fs.existsSync(filePath)) {
        return;
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      // Check all blur token overrides
      const blurOverrides = ['--blur-sm', '--blur-md', '--blur-lg', '--blur-xl'];
      const violations: string[] = [];

      blurOverrides.forEach(tokenName => {
        const tokenKey = tokenName.replace('--blur-', '') as keyof typeof BLUR_TOKENS.SCALE;
        const expectedValue = BLUR_TOKENS.SCALE[tokenKey];

        lines.forEach((line, idx) => {
          const match = line.match(new RegExp(`${tokenName}:\\s*(\\d+)px`));
          if (match) {
            const value = parseInt(match[1], 10);
            if (value !== expectedValue) {
              violations.push(
                `Line ${idx + 1}: ${tokenName}: ${value}px (expected ${expectedValue}px)`
              );
            }
          }
        });
      });

      if (violations.length > 0) {
        console.log('\n=== THEME OVERRIDE VIOLATIONS in aurora.css ===');
        violations.forEach(v => console.log(`  ${v}`));
        console.log('');
      }

      expect(violations).toEqual([]);
    });
  });

  describe('Summary', () => {
    it('reports all CSS file violations', () => {
      const cssFiles = [
        path.join(__dirname, '../../../styles/utilities/glass-variants.css'),
        path.join(__dirname, '../../../styles/themes/glass.css'),
      ];

      const allViolations: CSSViolation[] = [];

      cssFiles.forEach(file => {
        if (fs.existsSync(file)) {
          const violations = scanCSSFile(file);
          allViolations.push(...violations);
        }
      });

      if (allViolations.length > 0) {
        console.log('\n=== CSS FILES SUMMARY ===');
        console.log(`Total violations: ${allViolations.length}`);
        console.log(`  - Blur: ${allViolations.filter(v => v.property.includes('backdrop-filter')).length}`);
        console.log(`  - Radius: ${allViolations.filter(v => v.property === 'border-radius').length}`);
        console.log('\nFix these CSS files to use design token variables.\n');
      } else {
        console.log('\n✅ No hardcoded CSS values found! All CSS files use design tokens.\n');
      }

      expect(allViolations).toEqual([]);
    });
  });
});
