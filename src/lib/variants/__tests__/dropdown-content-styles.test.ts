/**
 * Unit tests for dropdown-content-styles.ts
 *
 * Tests unified dropdown styling utilities.
 */

import { describe, it, expect } from 'vitest';
import {
  getDropdownContentStyles,
  dropdownContentClasses,
  getDropdownItemClasses,
  getDropdownIconClasses,
  dropdownSeparatorClasses,
  dropdownLabelClasses,
} from '../dropdown-content-styles';

describe('dropdown-content-styles', () => {
  describe('getDropdownContentStyles', () => {
    it('should return glassmorphism dropdown styles', () => {
      const styles = getDropdownContentStyles();

      expect(styles.background).toBe('var(--dropdown-bg)');
      expect(styles.border).toBe('1px solid var(--dropdown-border)');
      expect(styles.boxShadow).toBe('var(--dropdown-glow)');
      expect(styles.backdropFilter).toBe('blur(var(--blur-md))');
      expect(styles.WebkitBackdropFilter).toBe('blur(var(--blur-md))');
    });

    it('should use CSS custom properties', () => {
      const styles = getDropdownContentStyles();

      expect(styles.background).toMatch(/^var\(--/);
      expect(styles.border).toContain('var(--');
      expect(styles.boxShadow).toMatch(/^var\(--/);
    });

    it('should include webkit backdrop filter for Safari', () => {
      const styles = getDropdownContentStyles();

      expect(styles.WebkitBackdropFilter).toBe('blur(var(--blur-md))');
    });
  });

  describe('dropdownContentClasses', () => {
    it('should include minimum width classes', () => {
      expect(dropdownContentClasses).toContain('min-w-40');
      expect(dropdownContentClasses).toContain('md:min-w-[200px]');
    });

    it('should include shape classes', () => {
      expect(dropdownContentClasses).toContain('rounded-2xl');
      expect(dropdownContentClasses).toContain('overflow-hidden');
    });

    it('should include high z-index for layering', () => {
      expect(dropdownContentClasses).toContain('z-[50002]');
    });

    it('should include animation classes', () => {
      expect(dropdownContentClasses).toContain('animate-in');
      expect(dropdownContentClasses).toContain('fade-in-0');
      expect(dropdownContentClasses).toContain('zoom-in-95');
    });

    it('should include Radix UI slide animations', () => {
      expect(dropdownContentClasses).toContain('data-[side=bottom]:slide-in-from-top-2');
      expect(dropdownContentClasses).toContain('data-[side=top]:slide-in-from-bottom-2');
    });
  });

  describe('getDropdownItemClasses', () => {
    it('should return base item classes', () => {
      const classes = getDropdownItemClasses();

      expect(classes).toContain('w-full');
      expect(classes).toContain('px-3');
      expect(classes).toContain('py-2.5');
      expect(classes).toContain('text-sm');
      expect(classes).toContain('flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('gap-2');
    });

    it('should include interaction classes', () => {
      const classes = getDropdownItemClasses();

      expect(classes).toContain('outline-none');
      expect(classes).toContain('cursor-pointer');
      expect(classes).toContain('select-none');
      expect(classes).toContain('transition-colors');
    });

    it('should apply danger styling when danger is true', () => {
      const classes = getDropdownItemClasses({ danger: true });

      // Tailwind v4 syntax: text-(--variable)
      expect(classes).toContain('text-(--alert-danger-text)');
    });

    it('should apply normal text color when danger is false', () => {
      const classes = getDropdownItemClasses({ danger: false });

      // Tailwind v4 syntax: text-(--variable)
      expect(classes).toContain('text-(--dropdown-item-text)');
    });

    it('should apply highlighted background', () => {
      const classes = getDropdownItemClasses({ highlighted: true });

      // Tailwind v4 syntax: bg-(--variable)
      expect(classes).toContain('bg-(--dropdown-item-hover)');
    });

    it('should apply selected styling', () => {
      const classes = getDropdownItemClasses({ selected: true });

      // Selected state applies background (Tailwind v4 syntax)
      expect(classes).toContain('bg-(--select-item-selected-bg)');

      // Note: text color is overridden by danger/normal state (known behavior)
      expect(classes).toContain('text-(--dropdown-item-text)');
    });

    it('should include Radix data-highlighted state', () => {
      const classes = getDropdownItemClasses();

      // Tailwind v4 syntax with data attribute
      expect(classes).toContain('data-[highlighted]:bg-(--dropdown-item-hover)');
    });

    it('should handle multiple states simultaneously', () => {
      const classes = getDropdownItemClasses({
        danger: true,
        highlighted: true,
        selected: true,
      });

      // Tailwind v4 syntax
      expect(classes).toContain('text-(--alert-danger-text)');
      expect(classes).toContain('bg-(--dropdown-item-hover)');
      expect(classes).toContain('bg-(--select-item-selected-bg)');
    });

    it('should work with empty options', () => {
      const classes = getDropdownItemClasses({});

      expect(classes).toContain('w-full');
      expect(classes).toContain('text-(--dropdown-item-text)');
    });

    it('should work with undefined options', () => {
      const classes = getDropdownItemClasses(undefined);

      expect(classes).toContain('w-full');
      expect(classes).toContain('text-(--dropdown-item-text)');
    });
  });

  describe('getDropdownIconClasses', () => {
    it('should return base icon classes', () => {
      const classes = getDropdownIconClasses();

      expect(classes).toContain('w-3.5');
      expect(classes).toContain('h-3.5');
      expect(classes).toContain('transition-colors');
      expect(classes).toContain('shrink-0');
    });

    it('should apply danger icon color when danger is true', () => {
      const classes = getDropdownIconClasses({ danger: true });

      // Icon classes still use Tailwind v3 syntax
      expect(classes).toContain('text-[var(--alert-danger-text)]');
    });

    it('should apply normal icon color when danger is false', () => {
      const classes = getDropdownIconClasses({ danger: false });

      expect(classes).toContain('text-[var(--dropdown-icon)]');
    });

    it('should include hover state for normal icons', () => {
      const classes = getDropdownIconClasses();

      expect(classes).toContain('group-data-[highlighted]:text-[var(--dropdown-icon-hover)]');
    });

    it('should work with undefined options', () => {
      const classes = getDropdownIconClasses(undefined);

      expect(classes).toContain('text-[var(--dropdown-icon)]');
    });

    it('should work with empty options', () => {
      const classes = getDropdownIconClasses({});

      expect(classes).toContain('text-[var(--dropdown-icon)]');
    });
  });

  describe('dropdownSeparatorClasses', () => {
    it('should include height and spacing', () => {
      expect(dropdownSeparatorClasses).toContain('h-px');
      expect(dropdownSeparatorClasses).toContain('my-1');
    });

    it('should include border color', () => {
      // Separator classes still use Tailwind v3 syntax
      expect(dropdownSeparatorClasses).toContain('bg-[var(--dropdown-border)]');
    });
  });

  describe('dropdownLabelClasses', () => {
    it('should include padding classes', () => {
      expect(dropdownLabelClasses).toContain('px-3');
      expect(dropdownLabelClasses).toContain('py-1.5');
      expect(dropdownLabelClasses).toContain('md:px-4');
      expect(dropdownLabelClasses).toContain('md:py-2');
    });

    it('should include typography classes', () => {
      expect(dropdownLabelClasses).toContain('text-xs');
      expect(dropdownLabelClasses).toContain('font-medium');
    });

    it('should include muted text color', () => {
      // Label classes still use Tailwind v3 syntax
      expect(dropdownLabelClasses).toContain('text-[var(--text-muted)]');
    });
  });

  describe('Integration tests', () => {
    it('should work together for complete dropdown', () => {
      const contentStyles = getDropdownContentStyles();
      const contentClasses = dropdownContentClasses;
      const itemClasses = getDropdownItemClasses();
      const iconClasses = getDropdownIconClasses();

      // Content should have glass effect
      expect(contentStyles.backdropFilter).toBeTruthy();
      expect(contentClasses).toContain('rounded-2xl');

      // Items should have proper spacing
      expect(itemClasses).toContain('px-3');
      expect(itemClasses).toContain('py-2.5');

      // Icons should have consistent sizing
      expect(iconClasses).toContain('w-3.5');
      expect(iconClasses).toContain('h-3.5');
    });

    it('should support all dropdown component variants', () => {
      // Normal item (Tailwind v4 syntax)
      const normalItem = getDropdownItemClasses();
      expect(normalItem).toContain('text-(--dropdown-item-text)');

      // Danger item
      const dangerItem = getDropdownItemClasses({ danger: true });
      expect(dangerItem).toContain('text-(--alert-danger-text)');

      // Selected item
      const selectedItem = getDropdownItemClasses({ selected: true });
      expect(selectedItem).toContain('bg-(--select-item-selected-bg)');

      // Highlighted item
      const highlightedItem = getDropdownItemClasses({ highlighted: true });
      expect(highlightedItem).toContain('bg-(--dropdown-item-hover)');
    });
  });
});
