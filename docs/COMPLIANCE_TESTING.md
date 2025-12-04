# Compliance Testing Guide

This guide explains how to use the Design System Compliance Testing framework to validate components against the glassmorphism design system specifications.

---

## Quick Start

### jsdom Mode (Fast, ~73% pass rate)

```bash
# Run all compliance tests in jsdom
npm run test:compliance

# Single run (CI mode)
npm run test:compliance:run

# Run specific test file
npm run test:compliance -- spacing
```

### Browser Mode (Accurate, ~95-100% pass rate)

```bash
# Run all compliance tests in real browser (Playwright)
npm run test:compliance:browser

# Single run (CI mode)
npm run test:compliance:browser:run

# Run specific browser test
npm run test:compliance:browser -- blur.browser
```

### Which Mode to Use?

| Scenario | Mode | Command |
|----------|------|---------|
| **Pre-commit** | jsdom | `npm run test:compliance:run` |
| **CI/CD** | jsdom | `npm run test:compliance:run` |
| **Pre-release** | browser | `npm run test:compliance:browser:run` |
| **Debugging blur issues** | browser | `npm run test:compliance:browser` |
| **Local development** | jsdom | `npm run test:compliance` |

---

## Test Structure

### Directory Layout

```
src/test/
  compliance/
    __setup__/
      compliance-setup.ts      # Custom matchers and mocks
      theme-test-wrapper.tsx   # ThemeProvider wrapper
    tokens/
      spacing.compliance.test.tsx      # 8px grid validation
      typography.compliance.test.tsx   # Font size, weight, line-height
      border-radius.compliance.test.tsx # Radius scale validation
    glassmorphism/
      blur.compliance.test.tsx         # Blur value validation
      opacity.compliance.test.tsx      # Surface opacity ranges
      antipatterns.compliance.test.tsx # Detect violations
    components/
      button.compliance.test.tsx       # Button-specific rules
      card.compliance.test.tsx         # Card-specific rules
      modal.compliance.test.tsx        # Modal-specific rules
      tooltip.compliance.test.tsx      # Tooltip-specific rules
      badge.compliance.test.tsx        # Badge-specific rules
    accessibility/
      contrast.compliance.test.tsx     # WCAG contrast ratios
      touch-targets.compliance.test.tsx # 44x44px minimum
      focus-states.compliance.test.tsx  # Double-outline technique
  utils/
    design-tokens.ts           # Token definitions from UI_DIZINE.md
    spacing-validator.ts       # 8px grid checker
    contrast-checker.ts        # WCAG contrast calculator
    blur-validator.ts          # Glassmorphism property parser
    computed-style-reader.ts   # CSS computed value extractor
```

---

## Running Tests

### All Compliance Tests

```bash
npm run test:compliance
```

### Specific Categories

```bash
# Token tests only
npm run test:compliance -- tokens

# Glassmorphism tests only
npm run test:compliance -- glassmorphism

# Component tests only
npm run test:compliance -- components

# Accessibility tests only
npm run test:compliance -- accessibility
```

### Single File

```bash
npm run test:compliance -- button.compliance
```

### Watch Mode

```bash
npm run test:compliance -- --watch
```

---

## Understanding Test Output

### Passing Tests

```
 PASS  compliance  src/test/compliance/tokens/spacing.compliance.test.tsx
   Spacing Compliance Tests
     8px Grid System
       ✓ validates that 0 is on grid
       ✓ validates 4px half-grid increments
```

### Failing Tests

```
 FAIL  compliance  src/test/compliance/tokens/typography.compliance.test.tsx
   Typography Compliance Tests
     Font Weight Compliance
       ✗ Button text has medium weight (500+)
         expected 400 to be greater than or equal to 500
```

This indicates the Button component has `font-weight: 400` but should have `font-weight: 500` per the design system.

---

## Custom Matchers

The compliance setup adds custom Vitest matchers:

### toBeOnGrid

Checks if a value is on the 8px grid (4px increments):

```typescript
expect(16).toBeOnGrid(); // passes
expect(8).toBeOnGrid();  // passes
expect(15).toBeOnGrid(); // fails
```

### toMeetContrastAA

Checks WCAG AA contrast requirements:

```typescript
expect(4.5).toMeetContrastAA(); // passes (normal text)
expect(3.0).toMeetContrastAA(true); // passes (large text)
expect(2.0).toMeetContrastAA(); // fails
```

### toMeetTouchTarget

Checks minimum touch target size:

```typescript
expect({ width: 48, height: 48 }).toMeetTouchTarget(); // passes
expect({ width: 30, height: 30 }).toMeetTouchTarget(); // fails
```

### toBeValidBlurToken

Checks if blur is a valid token:

```typescript
expect(16).toBeValidBlurToken(); // passes (md)
expect(24).toBeValidBlurToken(); // passes (lg)
expect(15).toBeValidBlurToken(); // fails
```

---

## Test Utilities

### Design Tokens

Import token values for assertions:

```typescript
import {
  SPACING_TOKENS,
  TYPOGRAPHY_TOKENS,
  BLUR_TOKENS,
  COMPONENT_SPECS
} from '@/test/utils/design-tokens';

// Use in tests
expect(buttonHeight).toBe(COMPONENT_SPECS.BUTTON.md.height);
```

### Spacing Validator

```typescript
import {
  isOnGrid,
  validateElementSpacing,
  validateTouchTarget
} from '@/test/utils/spacing-validator';

// Check if value is on grid
expect(isOnGrid(16)).toBe(true);

// Validate element spacing
const result = validateElementSpacing(element);
expect(result.valid).toBe(true);

// Check touch target
const touchResult = validateTouchTarget(element);
expect(touchResult.valid).toBe(true);
```

### Contrast Checker

```typescript
import {
  checkContrast,
  isPureBlack,
  validateElementContrast
} from '@/test/utils/contrast-checker';

// Check contrast between colors
const result = checkContrast('#ffffff', '#000000');
expect(result.meetsAA).toBe(true);
expect(result.ratio).toBeCloseTo(21, 0);

// Check for forbidden pure black
expect(isPureBlack('#000000')).toBe(true);
expect(isPureBlack('#0a0a0f')).toBe(false);
```

### Blur Validator

```typescript
import {
  hasGlassEffect,
  validateBlurValue,
  validateModalBlur,
  countGlassLayers
} from '@/test/utils/blur-validator';

// Check for glass effect
expect(hasGlassEffect(element)).toBe(true);

// Validate blur value
const result = validateBlurValue(element);
expect(result.valid).toBe(true);
expect(result.value).toBe(16);

// Check modal blur
const modalResult = validateModalBlur(element);
expect(modalResult.value).toBe(24);

// Count glass layers
const layers = countGlassLayers(container);
expect(layers.count).toBeLessThanOrEqual(3);
```

### Computed Style Reader

```typescript
import {
  getComputedStyleSnapshot,
  comparePadding,
  compareDimensions
} from '@/test/utils/computed-style-reader';

// Get full style snapshot
const snapshot = getComputedStyleSnapshot(element);
expect(snapshot.typography.fontSize).toBe(16);
expect(snapshot.borderRadius.topLeft).toBe(8);

// Compare padding
const paddingResult = comparePadding(element, { top: 24, bottom: 24 });
expect(paddingResult.matches).toBe(true);
```

---

## Theme Wrapper

Use `ThemeTestWrapper` to test components in theme context:

```typescript
import { ThemeTestWrapper, THEMES } from '@/test/compliance/__setup__/theme-test-wrapper';

// Test in all themes
describe.each(THEMES)('Theme: %s', (theme) => {
  it('renders correctly', () => {
    render(
      <ThemeTestWrapper theme={theme}>
        <ButtonGlass>Click me</ButtonGlass>
      </ThemeTestWrapper>
    );
    // assertions
  });
});
```

---

## Writing New Compliance Tests

### Template

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { COMPONENT_SPECS } from '@/test/utils/design-tokens';
import { getComputedStyleSnapshot } from '@/test/utils/computed-style-reader';
import { ThemeTestWrapper, THEMES } from '@/test/compliance/__setup__/theme-test-wrapper';

import { MyComponent } from '@/components/glass/ui/my-component';

describe('MyComponent Compliance Tests', () => {
  describe('Specification Constants', () => {
    it('has correct default specs', () => {
      expect(COMPONENT_SPECS.MY_COMPONENT.padding).toBe(16);
    });
  });

  describe('Visual Properties', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('has correct padding', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <MyComponent data-testid="test-component">
              Content
            </MyComponent>
          </ThemeTestWrapper>
        );

        const element = screen.getByTestId('test-component');
        const snapshot = getComputedStyleSnapshot(element);

        expect(snapshot.padding.top).toBe(COMPONENT_SPECS.MY_COMPONENT.padding);
      });
    });
  });
});
```

---

## Interpreting Violations

### Common Violations and Fixes

#### "Value not on 8px grid"

**Cause**: Spacing value like 15px or 22px used.
**Fix**: Use values from spacing scale (4, 8, 12, 16, 20, 24, 32, etc.)

#### "Font weight below 500"

**Cause**: Using `font-weight: 400` (normal) on glass background.
**Fix**: Add `font-weight: 500` or use `font-medium` Tailwind class.

#### "Touch target too small"

**Cause**: Button or input height below 44px.
**Fix**: Increase padding or set minimum height.

#### "Glass effect on badge"

**Cause**: Badge has `backdrop-filter: blur()`.
**Fix**: Remove blur, use solid background color.

#### "Blur not a valid token"

**Cause**: Using non-standard blur like `blur(15px)`.
**Fix**: Use token values: 8px, 16px, 24px, or 32px.

#### "Too many glass layers"

**Cause**: More than 3 elements with backdrop-filter in view.
**Fix**: Reduce glass usage or use solid backgrounds for some elements.

---

## Known Limitations

### jsdom Limitations

jsdom doesn't support real layout, so `getBoundingClientRect()` returns 0 for all dimensions. Tests that check actual pixel sizes may fail in jsdom.

**Workaround**: These tests pass in browser environment (Storybook/Playwright tests).

### CSS Custom Properties

Computed styles in jsdom don't resolve CSS variables the same as browsers.

**Workaround**: Test the raw class names or use browser-based tests for full validation.

---

## CI Integration

The compliance tests run as part of the test suite:

```yaml
# In GitHub Actions
- name: Run Compliance Tests
  run: npm run test:compliance:run
```

---

## Adding to Existing Components

1. Check component against COMPLIANCE_CHECKLIST.md
2. Add compliance test file in appropriate directory
3. Run tests to identify violations
4. Fix component to meet specifications
5. Commit with passing tests
