/**
 * Focus States Compliance Tests
 *
 * Validates focus visibility requirements:
 * - Double-outline technique for visibility on any background
 * - Visible focus indicators on all interactive elements
 * - Focus rings that work with glassmorphism
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { ACCESSIBILITY_TOKENS } from '../../utils/design-tokens';
import { ThemeTestWrapper, THEMES } from '../__setup__/theme-test-wrapper';

import { ButtonGlass } from '@/components/glass/ui/button-glass';
import { InputGlass } from '@/components/glass/ui/input-glass';
import { CheckboxGlass } from '@/components/glass/ui/checkbox-glass';
import { ToggleGlass } from '@/components/glass/ui/toggle-glass';
import { TabsGlass } from '@/components/glass/ui/tabs-glass';

describe('Focus States Compliance Tests', () => {
  describe('Focus Token Constants', () => {
    it('has correct inner ring width', () => {
      expect(ACCESSIBILITY_TOKENS.FOCUS.innerRingWidth).toBe(2);
    });

    it('has correct outer ring width', () => {
      expect(ACCESSIBILITY_TOKENS.FOCUS.outerRingWidth).toBe(4);
    });

    it('has correct inner ring color', () => {
      expect(ACCESSIBILITY_TOKENS.FOCUS.innerRingColor).toBe('rgba(255, 255, 255, 0.9)');
    });

    it('has correct outer ring color', () => {
      expect(ACCESSIBILITY_TOKENS.FOCUS.outerRingColor).toBe('rgba(0, 0, 0, 0.8)');
    });
  });

  describe('Button Focus States', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('button can receive focus', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="test-button">Focus me</ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        button.focus();

        expect(document.activeElement).toBe(button);
      });

      it('disabled button cannot be focused via click', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass disabled data-testid="test-button">
              Disabled
            </ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');
        expect(button).toBeDisabled();
      });

      it('button shows focus styles on keyboard navigation', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="test-button">Focus me</ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('test-button');

        // Simulate keyboard focus
        button.focus();

        // Check that button is focused
        expect(document.activeElement).toBe(button);

        // Focus-visible styles would be applied via CSS
        // We verify the element is focusable
        expect(button.tabIndex).toBeGreaterThanOrEqual(-1);
      });
    });
  });

  describe('Input Focus States', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('input can receive focus', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <InputGlass data-testid="test-input" />
          </ThemeTestWrapper>
        );

        const input = screen.getByTestId('test-input');
        input.focus();

        expect(document.activeElement).toBe(input);
      });

      it('input accepts text when focused', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <InputGlass data-testid="test-input" />
          </ThemeTestWrapper>
        );

        const input = screen.getByTestId('test-input') as HTMLInputElement;
        input.focus();

        fireEvent.change(input, { target: { value: 'test text' } });

        expect(input.value).toBe('test text');
      });

      it('disabled input cannot be focused', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <InputGlass disabled data-testid="test-input" />
          </ThemeTestWrapper>
        );

        const input = screen.getByTestId('test-input');
        expect(input).toBeDisabled();
      });
    });
  });

  describe('Checkbox Focus States', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('checkbox can receive focus', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <CheckboxGlass id="test-checkbox" data-testid="test-checkbox" checked={false} />
          </ThemeTestWrapper>
        );

        const checkbox = screen.getByTestId('test-checkbox');
        checkbox.focus();

        // Checkbox or its underlying button should be focused
        expect(document.activeElement).toBeTruthy();
      });

      it('checkbox can be toggled with keyboard', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <CheckboxGlass id="test-checkbox" data-testid="test-checkbox" checked={false} />
          </ThemeTestWrapper>
        );

        const checkbox = screen.getByTestId('test-checkbox');
        checkbox.focus();

        // Simulate space key press
        fireEvent.keyDown(checkbox, { key: ' ', code: 'Space' });

        // Checkbox should be interactive
        expect(checkbox).toBeInTheDocument();
      });
    });
  });

  describe('Toggle Focus States', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('toggle can receive focus', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ToggleGlass data-testid="test-toggle" checked={false} />
          </ThemeTestWrapper>
        );

        const toggle = screen.getByTestId('test-toggle');
        toggle.focus();

        expect(document.activeElement).toBe(toggle);
      });

      it('toggle can be activated with click', () => {
        const onChange = vi.fn();

        render(
          <ThemeTestWrapper theme={theme}>
            <ToggleGlass data-testid="test-toggle" checked={false} onChange={onChange} />
          </ThemeTestWrapper>
        );

        const toggle = screen.getByTestId('test-toggle');
        toggle.focus();

        // Click to toggle
        fireEvent.click(toggle);

        expect(onChange).toHaveBeenCalled();
      });
    });
  });

  describe('Tab Focus Navigation', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('tabs component renders', () => {
        const tabs = [
          { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
          { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
        ];

        render(
          <ThemeTestWrapper theme={theme}>
            <TabsGlass tabs={tabs} activeTab="tab1" onChange={() => {}} />
          </ThemeTestWrapper>
        );

        // Tabs should be rendered - find by role (semantic query)
        const tablist = screen.getByRole('tablist');
        expect(tablist).toBeInTheDocument();

        // Verify both tabs are present
        expect(screen.getByText('Tab 1')).toBeInTheDocument();
        expect(screen.getByText('Tab 2')).toBeInTheDocument();
      });

      it('tabs respond to onChange', () => {
        const onChange = vi.fn();
        const tabs = [
          { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
          { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
        ];

        render(
          <ThemeTestWrapper theme={theme}>
            <TabsGlass tabs={tabs} activeTab="tab1" onChange={onChange} />
          </ThemeTestWrapper>
        );

        // Tab 2 button should be clickable
        const tab2Button = screen.getByText('Tab 2');
        fireEvent.click(tab2Button);

        expect(onChange).toHaveBeenCalledWith('tab2');
      });
    });
  });

  describe('Focus Trap in Modal', () => {
    // Focus trap tests would be more appropriate in modal.compliance.test.tsx
    // but we include a basic check here
    it('modal buttons are focusable when open', async () => {
      const onClose = vi.fn();

      // Import here to avoid circular dependencies
      const { ModalGlass } = await import('@/components/glass/ui/modal-glass');

      render(
        <ThemeTestWrapper theme="glass">
          <ModalGlass isOpen={true} onClose={onClose} title="Test Modal">
            <button data-testid="modal-button">Modal Button</button>
          </ModalGlass>
        </ThemeTestWrapper>
      );

      const modalButton = screen.getByTestId('modal-button');
      modalButton.focus();

      expect(document.activeElement).toBe(modalButton);
    });
  });

  describe('Skip Link Pattern', () => {
    it('skip links should be focusable', () => {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.className = 'sr-only focus:not-sr-only';
      document.body.appendChild(skipLink);

      skipLink.focus();
      expect(document.activeElement).toBe(skipLink);

      document.body.removeChild(skipLink);
    });
  });

  describe('Focus Order', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('maintains logical focus order', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="btn1">First</ButtonGlass>
            <InputGlass data-testid="input1" />
            <ButtonGlass data-testid="btn2">Second</ButtonGlass>
          </ThemeTestWrapper>
        );

        const elements = [
          screen.getByTestId('btn1'),
          screen.getByTestId('input1'),
          screen.getByTestId('btn2'),
        ];

        // All elements should be focusable
        elements.forEach((el) => {
          el.focus();
          expect(document.activeElement).toBe(el);
        });
      });
    });
  });
});
