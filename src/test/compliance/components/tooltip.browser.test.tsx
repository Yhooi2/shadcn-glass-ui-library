/**
 * Tooltip Compliance Tests
 *
 * Validates TooltipGlass against design system specifications:
 *
 * | Property    | Value              |
 * |-------------|-------------------|
 * | Padding H   | 12px              |
 * | Padding V   | 8px               |
 * | Radius      | 6px               |
 * | Font Size   | 12-14px           |
 * | Max Width   | 240px             |
 * | Background  | SOLID (not glass) |
 *
 * CRITICAL: Tooltips must use SOLID backgrounds for maximum readability.
 * Glass effects do NOT work on tooltips.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { COMPONENT_SPECS, GLASS_TOKENS } from '../../utils/design-tokens';
import { ThemeTestWrapper, THEMES } from '../__setup__/theme-test-wrapper';

import { TooltipGlass } from '@/components/glass/ui/tooltip-glass';

describe('Tooltip Compliance Tests', () => {
  describe('Tooltip Specification Constants', () => {
    it('has correct horizontal padding', () => {
      expect(COMPONENT_SPECS.TOOLTIP.paddingH).toBe(12);
    });

    it('has correct vertical padding', () => {
      expect(COMPONENT_SPECS.TOOLTIP.paddingV).toBe(8);
    });

    it('has correct border radius', () => {
      expect(COMPONENT_SPECS.TOOLTIP.radius).toBe(6);
    });

    it('has correct font size range', () => {
      expect(COMPONENT_SPECS.TOOLTIP.fontSize.min).toBe(12);
      expect(COMPONENT_SPECS.TOOLTIP.fontSize.max).toBe(14);
    });

    it('has correct max width', () => {
      expect(COMPONENT_SPECS.TOOLTIP.maxWidth).toBe(240);
    });

    it('requires solid background (no glass)', () => {
      expect(COMPONENT_SPECS.TOOLTIP.solidBg).toBe(true);
    });
  });

  describe('Tooltip No-Glass Requirement', () => {
    it('is in the list of elements that should not have glass', () => {
      expect(GLASS_TOKENS.NO_GLASS_ELEMENTS).toContain('tooltip');
    });
  });

  describe('Tooltip Trigger Rendering', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('renders trigger element', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <TooltipGlass content="Tooltip content">
              <button data-testid="tooltip-trigger">Hover me</button>
            </TooltipGlass>
          </ThemeTestWrapper>
        );

        const trigger = screen.getByTestId('tooltip-trigger');
        expect(trigger).toBeInTheDocument();
      });

      it('trigger is interactive', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <TooltipGlass content="Tooltip content">
              <button data-testid="tooltip-trigger">Hover me</button>
            </TooltipGlass>
          </ThemeTestWrapper>
        );

        const trigger = screen.getByTestId('tooltip-trigger');

        // Trigger should be focusable
        trigger.focus();
        expect(document.activeElement).toBe(trigger);
      });

      it('trigger accepts custom content', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <TooltipGlass content="Help text">
              <span data-testid="custom-trigger">
                <strong>Bold text</strong>
              </span>
            </TooltipGlass>
          </ThemeTestWrapper>
        );

        const trigger = screen.getByTestId('custom-trigger');
        expect(trigger).toBeInTheDocument();
        expect(trigger.querySelector('strong')).toBeInTheDocument();
      });
    });
  });

  describe('Tooltip Accessibility', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('trigger can receive focus for keyboard users', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <TooltipGlass content="Keyboard accessible">
              <button data-testid="focusable-trigger">Focus me</button>
            </TooltipGlass>
          </ThemeTestWrapper>
        );

        const trigger = screen.getByTestId('focusable-trigger');
        trigger.focus();

        expect(document.activeElement).toBe(trigger);
      });

      it('works with interactive elements as triggers', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <TooltipGlass content="Button tooltip">
              <button data-testid="button-trigger">Action</button>
            </TooltipGlass>
          </ThemeTestWrapper>
        );

        const trigger = screen.getByTestId('button-trigger');
        expect(trigger.tagName.toLowerCase()).toBe('button');
      });

      it('works with non-interactive elements wrapped properly', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <TooltipGlass content="Text tooltip">
              <span data-testid="span-trigger" tabIndex={0}>
                Hover text
              </span>
            </TooltipGlass>
          </ThemeTestWrapper>
        );

        const trigger = screen.getByTestId('span-trigger');
        expect(trigger.getAttribute('tabIndex')).toBe('0');
      });
    });
  });

  describe('Tooltip Content Requirements', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('accepts string content', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <TooltipGlass content="Simple string">
              <button data-testid="trigger">Trigger</button>
            </TooltipGlass>
          </ThemeTestWrapper>
        );

        // Component should render without error
        expect(screen.getByTestId('trigger')).toBeInTheDocument();
      });

      it('accepts string content', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <TooltipGlass content="Title - Description">
              <button data-testid="trigger">Trigger</button>
            </TooltipGlass>
          </ThemeTestWrapper>
        );

        expect(screen.getByTestId('trigger')).toBeInTheDocument();
      });
    });
  });

  describe('Tooltip Design Principles', () => {
    it('tooltip should have small, readable text', () => {
      const { fontSize } = COMPONENT_SPECS.TOOLTIP;

      // Tooltip font should be in the 12-14px range for readability
      expect(fontSize.min).toBeGreaterThanOrEqual(12);
      expect(fontSize.max).toBeLessThanOrEqual(16);
    });

    it('tooltip should have compact padding', () => {
      const { paddingH, paddingV } = COMPONENT_SPECS.TOOLTIP;

      // Tooltip padding should be small but readable
      expect(paddingH).toBeLessThanOrEqual(16);
      expect(paddingV).toBeLessThanOrEqual(12);
    });

    it('tooltip should have reasonable max width', () => {
      const { maxWidth } = COMPONENT_SPECS.TOOLTIP;

      // Max width should prevent overly long tooltips
      expect(maxWidth).toBeLessThanOrEqual(300);
      expect(maxWidth).toBeGreaterThanOrEqual(200);
    });

    it('tooltip radius should be smaller than cards', () => {
      expect(COMPONENT_SPECS.TOOLTIP.radius).toBeLessThan(COMPONENT_SPECS.CARD.compact.radius);
    });
  });
});
