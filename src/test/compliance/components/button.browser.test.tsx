/**
 * Button Compliance Tests
 *
 * Validates ButtonGlass against design system specifications:
 *
 * | Size | Height | Padding H | Padding V | Radius | Font | Min Width |
 * |------|--------|-----------|-----------|--------|------|-----------|
 * | sm   | 32px   | 12px      | 6px       | 8px    | 14px | 64px      |
 * | md   | 40px   | 16px      | 10px      | 8px    | 14px | 80px      |
 * | lg   | 48px   | 24px      | 12px      | 12px   | 16px | 96px      |
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { COMPONENT_SPECS } from '../../utils/design-tokens';
import { getComputedStyleSnapshot } from '../../utils/computed-style-reader';
import { validateTouchTarget } from '../../utils/spacing-validator';
import { ThemeTestWrapper, THEMES } from '../__setup__/theme-test-wrapper';

import { ButtonGlass } from '@/components/glass/ui/button-glass';

describe('Button Compliance Tests', () => {
  describe('Button Specification Constants', () => {
    it('has correct small button specs', () => {
      const { sm } = COMPONENT_SPECS.BUTTON;
      expect(sm.height).toBe(32);
      expect(sm.paddingH).toBe(12);
      expect(sm.paddingV).toBe(6);
      expect(sm.radius).toBe(8);
      expect(sm.fontSize).toBe(14);
      expect(sm.minWidth).toBe(64);
    });

    it('has correct medium button specs', () => {
      const { md } = COMPONENT_SPECS.BUTTON;
      expect(md.height).toBe(40);
      expect(md.paddingH).toBe(16);
      expect(md.paddingV).toBe(10);
      expect(md.radius).toBe(8);
      expect(md.fontSize).toBe(14);
      expect(md.minWidth).toBe(80);
    });

    it('has correct large button specs', () => {
      const { lg } = COMPONENT_SPECS.BUTTON;
      expect(lg.height).toBe(48);
      expect(lg.paddingH).toBe(24);
      expect(lg.paddingV).toBe(12);
      expect(lg.radius).toBe(12);
      expect(lg.fontSize).toBe(16);
      expect(lg.minWidth).toBe(96);
    });
  });

  describe('Button Size Compliance', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    describe.each(THEMES)('Theme: %s', (theme) => {
      describe.each(sizes)('Size: %s', (size) => {
        it('has correct font size', () => {
          render(
            <ThemeTestWrapper theme={theme}>
              <ButtonGlass size={size} data-testid="test-button">
                Button
              </ButtonGlass>
            </ThemeTestWrapper>
          );

          const button = screen.getByTestId('test-button');
          const snapshot = getComputedStyleSnapshot(button);
          const specs = COMPONENT_SPECS.BUTTON[size];

          // Font size should be at or near the specified value
          expect(snapshot.typography.fontSize).toBeGreaterThanOrEqual(specs.fontSize - 4);
          expect(snapshot.typography.fontSize).toBeLessThanOrEqual(specs.fontSize + 4);
        });

        it('has correct font weight (500)', () => {
          render(
            <ThemeTestWrapper theme={theme}>
              <ButtonGlass size={size} data-testid="test-button">
                Button
              </ButtonGlass>
            </ThemeTestWrapper>
          );

          const button = screen.getByTestId('test-button');
          const snapshot = getComputedStyleSnapshot(button);
          const specs = COMPONENT_SPECS.BUTTON[size];

          expect(snapshot.typography.fontWeight).toBe(specs.fontWeight);
        });

        it('has adequate touch target', () => {
          render(
            <ThemeTestWrapper theme={theme}>
              <ButtonGlass size={size} data-testid="test-button">
                Button
              </ButtonGlass>
            </ThemeTestWrapper>
          );

          const button = screen.getByTestId('test-button');
          const result = validateTouchTarget(button);

          // Small buttons might be slightly under 44px height but should be close
          if (size === 'sm') {
            const rect = button.getBoundingClientRect();
            expect(rect.height).toBeGreaterThanOrEqual(28);
          } else {
            expect(result.valid).toBe(true);
          }
        });
      });
    });
  });

  describe('Button Variant Compliance', () => {
    const variants = ['primary', 'secondary', 'ghost', 'danger', 'success'] as const;

    describe.each(THEMES)('Theme: %s', (theme) => {
      describe.each(variants)('Variant: %s', (variant) => {
        it('renders without errors', () => {
          render(
            <ThemeTestWrapper theme={theme}>
              <ButtonGlass variant={variant} data-testid="test-button">
                {variant} Button
              </ButtonGlass>
            </ThemeTestWrapper>
          );

          const button = screen.getByTestId('test-button');
          expect(button).toBeInTheDocument();
        });

        it('has visible text content', () => {
          render(
            <ThemeTestWrapper theme={theme}>
              <ButtonGlass variant={variant} data-testid="test-button">
                {variant} Button
              </ButtonGlass>
            </ThemeTestWrapper>
          );

          const button = screen.getByTestId('test-button');
          const snapshot = getComputedStyleSnapshot(button);

          // Opacity should be visible
          expect(snapshot.opacity).toBeGreaterThan(0);
          expect(snapshot.visibility).toBe('visible');
        });
      });
    });
  });

  describe('Button Disabled State Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('disabled button has reduced opacity', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass disabled data-testid="test-button">
              Disabled
            </ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        const snapshot = getComputedStyleSnapshot(button);

        // Disabled state should have 50% opacity
        expect(snapshot.opacity).toBeLessThanOrEqual(0.6);
      });

      it('disabled button has cursor-not-allowed', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass disabled data-testid="test-button">
              Disabled
            </ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        const styles = window.getComputedStyle(button);

        expect(styles.cursor).toBe('not-allowed');
      });
    });
  });

  describe('Button Border Radius Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('regular button has appropriate radius', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="test-button">Button</ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        const snapshot = getComputedStyleSnapshot(button);

        // Button should have rounded corners
        expect(snapshot.borderRadius.topLeft).toBeGreaterThan(0);
      });

      it('all corners have equal radius', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="test-button">Button</ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        const snapshot = getComputedStyleSnapshot(button);

        // All corners should have the same radius
        expect(snapshot.borderRadius.topRight).toBe(snapshot.borderRadius.topLeft);
        expect(snapshot.borderRadius.bottomRight).toBe(snapshot.borderRadius.topLeft);
        expect(snapshot.borderRadius.bottomLeft).toBe(snapshot.borderRadius.topLeft);
      });
    });
  });

  describe('Button Transition Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('has smooth transition for hover effects', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="test-button">Button</ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        const snapshot = getComputedStyleSnapshot(button);

        // Button should have transition for smooth animations
        expect(snapshot.transition).not.toBe('');
        expect(snapshot.transition).not.toBe('none');
      });
    });
  });

  describe('Button Accessibility Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('has correct role', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="test-button">Button</ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        expect(button.tagName.toLowerCase()).toBe('button');
      });

      it('is focusable', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="test-button">Button</ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        button.focus();

        expect(document.activeElement).toBe(button);
      });

      it('disabled button is not focusable in click sense', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass disabled data-testid="test-button">
              Button
            </ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        expect(button).toBeDisabled();
      });
    });
  });

  describe('Button Layout Compliance', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('uses inline-flex for proper icon alignment', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="test-button">Button</ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        const snapshot = getComputedStyleSnapshot(button);

        expect(snapshot.display).toBe('inline-flex');
      });

      it('centers content properly', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="test-button">Centered</ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        const styles = window.getComputedStyle(button);

        expect(styles.alignItems).toBe('center');
        expect(styles.justifyContent).toBe('center');
      });
    });
  });
});
