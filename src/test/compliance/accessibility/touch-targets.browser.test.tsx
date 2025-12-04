/**
 * Touch Target Compliance Tests
 *
 * Validates minimum touch target sizes:
 * - Apple HIG: 44x44px minimum
 * - Material Design: 48x48dp minimum
 *
 * Visual element can be smaller if the tap area meets requirements.
 */

import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { SPACING_TOKENS, ACCESSIBILITY_TOKENS } from '../../utils/design-tokens';
import { validateTouchTarget } from '../../utils/spacing-validator';
import { ThemeTestWrapper, THEMES } from '../__setup__/theme-test-wrapper';

import { ButtonGlass } from '@/components/glass/ui/button-glass';
import { CheckboxGlass } from '@/components/glass/ui/checkbox-glass';
import { ToggleGlass } from '@/components/glass/ui/toggle-glass';
import { InputGlass } from '@/components/glass/ui/input-glass';
import { SliderGlass } from '@/components/glass/ui/slider-glass';

/**
 * Helper to get element dimensions from computed styles + bounding rect
 * In browser mode, computed styles are more reliable than getBoundingClientRect alone
 */
async function getElementDimensions(element: HTMLElement): Promise<{ width: number; height: number }> {
  await waitFor(() => {
    const rect = element.getBoundingClientRect();
    expect(rect.width).toBeGreaterThan(0);
    expect(rect.height).toBeGreaterThan(0);
  }, { timeout: 3000 });

  const rect = element.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}

describe('Touch Target Compliance Tests', () => {
  describe('Touch Target Constants', () => {
    it('has correct Apple HIG minimum', () => {
      expect(SPACING_TOKENS.TOUCH_TARGET_APPLE).toBe(44);
    });

    it('has correct Material Design minimum', () => {
      expect(SPACING_TOKENS.TOUCH_TARGET_MATERIAL).toBe(48);
    });

    it('has correct accessibility minimum', () => {
      expect(ACCESSIBILITY_TOKENS.TOUCH_TARGET_MIN).toBe(44);
    });
  });

  describe('Button Touch Targets', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('default button meets touch target', async () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="test-button">Click</ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        await getElementDimensions(button); // Wait for render
        const result = validateTouchTarget(button);

        expect(result.valid).toBe(true);
      });

      it('large button exceeds touch target', async () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass size="lg" data-testid="test-button">
              Click
            </ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        const { height } = await getElementDimensions(button);

        expect(height).toBeGreaterThanOrEqual(SPACING_TOKENS.TOUCH_TARGET_APPLE);
      });

      it('small button has reasonable touch area', async () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass size="sm" data-testid="test-button">
              Click
            </ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        const { width, height } = await getElementDimensions(button);

        // Small buttons may be under 44px but should still be usable
        expect(height).toBeGreaterThanOrEqual(28);
        expect(width).toBeGreaterThanOrEqual(40);
      });
    });
  });

  describe('Checkbox Touch Targets', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('checkbox has adequate touch area via wrapper', async () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <CheckboxGlass id="test-checkbox" data-testid="test-checkbox" checked={false} />
          </ThemeTestWrapper>
        );

        // data-testid is on the hidden input (sr-only), find the label wrapper
        const checkboxInput = screen.getByTestId('test-checkbox');
        const wrapper = checkboxInput.closest('label');

        expect(wrapper).not.toBeNull();
        const { width, height } = await getElementDimensions(wrapper as HTMLElement);

        // Touch area wrapper should be at least 44px (Apple HIG)
        expect(width).toBeGreaterThanOrEqual(44);
        expect(height).toBeGreaterThanOrEqual(44);
      });

      it('checkbox with label has better touch area', async () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <CheckboxGlass id="test-checkbox" checked={false} label="Label text" />
          </ThemeTestWrapper>
        );

        // Find the label element which contains the checkbox
        const label = screen.getByText('Label text').closest('label');
        expect(label).not.toBeNull();
        const { width, height } = await getElementDimensions(label as HTMLElement);

        // With label, the touch area should be larger than 44px
        expect(width).toBeGreaterThan(44);
        expect(height).toBeGreaterThanOrEqual(44);
      });
    });
  });

  describe('Toggle Touch Targets', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('toggle switch meets touch target via wrapper', async () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ToggleGlass data-testid="test-toggle" checked={false} />
          </ThemeTestWrapper>
        );

        // data-testid is on the button, find the touch area wrapper (span)
        const toggleButton = screen.getByTestId('test-toggle');
        const wrapper = toggleButton.closest('span');

        expect(wrapper).not.toBeNull();
        await getElementDimensions(wrapper as HTMLElement); // Wait for render
        const result = validateTouchTarget(wrapper as HTMLElement);

        // Toggle wrapper should have adequate touch area (min 44px height)
        if (!result.valid) {
          console.log(`Toggle touch target violations (${theme}):`, result.violations);
        }

        expect(result.valid).toBe(true);
      });
    });
  });

  describe('Input Touch Targets', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('input meets minimum height', async () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <InputGlass data-testid="test-input" />
          </ThemeTestWrapper>
        );

        const input = screen.getByTestId('test-input');
        const { height } = await getElementDimensions(input);

        // Input should be at least 40px tall
        expect(height).toBeGreaterThanOrEqual(40);
      });

      it('input has full width touch area', async () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <div style={{ width: '200px' }}>
              <InputGlass data-testid="test-input" />
            </div>
          </ThemeTestWrapper>
        );

        const input = screen.getByTestId('test-input');
        const { width } = await getElementDimensions(input);

        // Input should fill available width
        expect(width).toBeGreaterThanOrEqual(100);
      });
    });
  });

  describe('Slider Touch Targets', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('slider thumb has adequate touch area', async () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <SliderGlass value={50} onChange={() => {}} data-testid="test-slider" />
          </ThemeTestWrapper>
        );

        // Slider should be rendered
        const slider = screen.getByTestId('test-slider');
        expect(slider).toBeInTheDocument();

        // The slider track should be tall enough to touch
        const { height } = await getElementDimensions(slider);
        expect(height).toBeGreaterThanOrEqual(20);
      });
    });
  });

  describe('Touch Target Validation Function', () => {
    it('passes for elements meeting minimum size', () => {
      const element = document.createElement('button');
      element.style.width = '48px';
      element.style.height = '48px';
      document.body.appendChild(element);

      const result = validateTouchTarget(element);
      expect(result.valid).toBe(true);

      document.body.removeChild(element);
    });

    it('fails for elements below minimum size', () => {
      const element = document.createElement('button');
      element.style.width = '30px';
      element.style.height = '30px';
      document.body.appendChild(element);

      const result = validateTouchTarget(element);
      expect(result.valid).toBe(false);
      expect(result.violations.length).toBeGreaterThan(0);

      document.body.removeChild(element);
    });

    it('fails for too-narrow elements', () => {
      const element = document.createElement('button');
      element.style.width = '20px';
      element.style.height = '48px';
      document.body.appendChild(element);

      const result = validateTouchTarget(element);
      expect(result.valid).toBe(false);

      document.body.removeChild(element);
    });

    it('fails for too-short elements', () => {
      const element = document.createElement('button');
      element.style.width = '48px';
      element.style.height = '20px';
      document.body.appendChild(element);

      const result = validateTouchTarget(element);
      expect(result.valid).toBe(false);

      document.body.removeChild(element);
    });
  });

  describe('Interactive Element Accessibility', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('all buttons are focusable', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="btn1">One</ButtonGlass>
            <ButtonGlass data-testid="btn2">Two</ButtonGlass>
          </ThemeTestWrapper>
        );

        const btn1 = screen.getByTestId('btn1');
        const btn2 = screen.getByTestId('btn2');

        btn1.focus();
        expect(document.activeElement).toBe(btn1);

        btn2.focus();
        expect(document.activeElement).toBe(btn2);
      });

      it('disabled buttons are not interactive', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass disabled data-testid="disabled-btn">
              Disabled
            </ButtonGlass>
          </ThemeTestWrapper>
        );

        const btn = screen.getByTestId('disabled-btn');
        expect(btn).toBeDisabled();
      });
    });
  });
});
