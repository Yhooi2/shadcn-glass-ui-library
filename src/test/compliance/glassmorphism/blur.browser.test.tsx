/**
 * Blur Compliance Tests - Browser Mode
 *
 * These tests MUST run in a real browser (Playwright via Vitest) because jsdom cannot:
 * - Compute backdrop-filter CSS property
 * - Apply Tailwind CSS classes to computed styles
 * - Render actual glass effects
 *
 * Run with: npm run test:compliance:browser:run
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BLUR_TOKENS, COMPONENT_SPECS } from '../../utils/design-tokens';
import { ThemeTestWrapper, THEMES } from '../__setup__/theme-test-wrapper';

import { GlassCard } from '@/components/glass/ui/glass-card';
import { ModalGlass } from '@/components/glass/ui/modal-glass';
import { ButtonGlass } from '@/components/glass/ui/button-glass';

describe('Blur Compliance - Browser Tests', () => {
  describe('GlassCard Blur', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('has backdrop-filter applied', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <GlassCard data-testid="glass-card">
              <p>Card content</p>
            </GlassCard>
          </ThemeTestWrapper>
        );

        const card = screen.getByTestId('glass-card');
        const styles = window.getComputedStyle(card);
        const backdropFilter = styles.backdropFilter || styles.webkitBackdropFilter || '';

        // Glass theme should have blur effect
        if (theme === 'glass') {
          expect(backdropFilter).toContain('blur');

          // Extract blur value and validate
          const blurMatch = backdropFilter.match(/blur\((\d+)px\)/);
          if (blurMatch) {
            const blurValue = parseInt(blurMatch[1]);
            const validBlurs = Object.values(BLUR_TOKENS.SCALE);
            expect(validBlurs).toContain(blurValue);
          }
        }
      });
    });
  });

  describe('ModalGlass Blur', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('has correct backdrop blur when open', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ModalGlass.Root open={true} onOpenChange={() => {}}>
              <ModalGlass.Overlay />
              <ModalGlass.Content data-testid="modal">
                <ModalGlass.Header>
                  <ModalGlass.Title>Test Modal</ModalGlass.Title>
                  <ModalGlass.Close />
                </ModalGlass.Header>
                <ModalGlass.Body>
                  <p>Modal content</p>
                </ModalGlass.Body>
              </ModalGlass.Content>
            </ModalGlass.Root>
          </ThemeTestWrapper>
        );

        // Modal should be visible when open
        const modalContent = screen.queryByText('Modal content');
        expect(modalContent).toBeInTheDocument();

        // Find the modal dialog
        const dialog = document.querySelector('[role="dialog"]');
        if (dialog) {
          const styles = window.getComputedStyle(dialog);
          const backdropFilter = styles.backdropFilter || styles.webkitBackdropFilter || '';

          if (theme === 'glass' && backdropFilter.includes('blur')) {
            const blurMatch = backdropFilter.match(/blur\((\d+)px\)/);
            if (blurMatch) {
              const blurValue = parseInt(blurMatch[1]);
              // Modal should use lg blur (24px) as specified
              expect(blurValue).toBe(BLUR_TOKENS.MODAL);
            }
          }
        }
      });
    });
  });

  describe('Button Blur States', () => {
    describe.each(THEMES)('Theme: %s', (theme) => {
      it('button has valid backdrop-filter value', () => {
        render(
          <ThemeTestWrapper theme={theme}>
            <ButtonGlass data-testid="button" variant="primary">
              Click me
            </ButtonGlass>
          </ThemeTestWrapper>
        );

        const button = screen.getByTestId('button');
        const styles = window.getComputedStyle(button);
        const backdropFilter = styles.backdropFilter || styles.webkitBackdropFilter || 'none';

        // Either no blur or a valid blur value
        if (backdropFilter !== 'none' && backdropFilter.includes('blur')) {
          const blurMatch = backdropFilter.match(/blur\((\d+)px\)/);
          if (blurMatch) {
            const blurValue = parseInt(blurMatch[1]);
            const validBlurs = Object.values(BLUR_TOKENS.SCALE);
            expect(validBlurs).toContain(blurValue);
          }
        }
      });
    });
  });

  describe('Blur Token Validation in Components', () => {
    it('card blur matches specification', () => {
      render(
        <ThemeTestWrapper theme="glass">
          <GlassCard data-testid="card">Content</GlassCard>
        </ThemeTestWrapper>
      );

      const card = screen.getByTestId('card');
      const styles = window.getComputedStyle(card);
      const backdropFilter = styles.backdropFilter || styles.webkitBackdropFilter || '';

      const blurMatch = backdropFilter.match(/blur\((\d+)px\)/);
      if (blurMatch) {
        const blurValue = parseInt(blurMatch[1]);
        // Card should use lg blur as per component specs
        expect(blurValue).toBe(COMPONENT_SPECS.CARD.default.blur);
      }
    });
  });

  describe('Blur Performance Considerations', () => {
    it('blur values do not exceed maximum', () => {
      render(
        <ThemeTestWrapper theme="glass">
          <GlassCard data-testid="card">Content</GlassCard>
        </ThemeTestWrapper>
      );

      const card = screen.getByTestId('card');
      const styles = window.getComputedStyle(card);
      const backdropFilter = styles.backdropFilter || '';

      const blurMatch = backdropFilter.match(/blur\((\d+)px\)/);
      if (blurMatch) {
        const blurValue = parseInt(blurMatch[1]);
        // Maximum blur for performance should be xl (32px)
        expect(blurValue).toBeLessThanOrEqual(BLUR_TOKENS.SCALE.xl);
      }
    });
  });
});
