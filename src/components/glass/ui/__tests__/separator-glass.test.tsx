import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SeparatorGlass } from '../separator-glass';

describe('SeparatorGlass', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<SeparatorGlass />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<SeparatorGlass className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('has correct data-slot attribute', () => {
      const { container } = render(<SeparatorGlass />);
      expect(container.firstChild).toHaveAttribute('data-slot', 'separator-glass');
    });
  });

  describe('Orientation', () => {
    it('defaults to horizontal orientation', () => {
      const { container } = render(<SeparatorGlass />);
      expect(container.firstChild).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('renders with horizontal orientation explicitly', () => {
      const { container } = render(<SeparatorGlass orientation="horizontal" />);
      expect(container.firstChild).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('renders with vertical orientation', () => {
      const { container } = render(<SeparatorGlass orientation="vertical" />);
      expect(container.firstChild).toHaveAttribute('data-orientation', 'vertical');
    });
  });

  describe('Decorative prop', () => {
    it('defaults to decorative (role="none")', () => {
      render(<SeparatorGlass />);
      // Decorative separators have role="none" and are not in the accessibility tree as separators
      const separator = screen.queryByRole('separator');
      expect(separator).not.toBeInTheDocument();
    });

    it('renders with role="separator" when decorative=false', () => {
      render(<SeparatorGlass decorative={false} />);
      const separator = screen.getByRole('separator');
      expect(separator).toBeInTheDocument();
    });

    it('does not have aria-orientation for horizontal (implicit default per WAI-ARIA)', () => {
      // Per WAI-ARIA spec, aria-orientation defaults to horizontal for separator,
      // so Radix UI doesn't add the attribute when horizontal
      render(<SeparatorGlass decorative={false} orientation="horizontal" />);
      const separator = screen.getByRole('separator');
      // Should NOT have aria-orientation since horizontal is the default
      expect(separator).not.toHaveAttribute('aria-orientation');
    });

    it('has aria-orientation when not decorative (vertical)', () => {
      render(<SeparatorGlass decorative={false} orientation="vertical" />);
      const separator = screen.getByRole('separator');
      expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('Glow prop', () => {
    it('renders without glow by default', () => {
      const { container } = render(<SeparatorGlass />);
      const element = container.firstChild as HTMLElement;
      // Glow is applied via boxShadow inline style
      expect(element.style.boxShadow).toBeFalsy();
    });

    it('applies glow style when glow=true', () => {
      const { container } = render(<SeparatorGlass glow />);
      const element = container.firstChild as HTMLElement;
      // boxShadow should reference var(--separator-glow)
      expect(element.style.boxShadow).toBe('var(--separator-glow)');
    });
  });

  describe('Styling', () => {
    it('has shrink-0 class to prevent shrinking in flex containers', () => {
      const { container } = render(<SeparatorGlass />);
      expect(container.firstChild).toHaveClass('shrink-0');
    });

    it('applies background from CSS variable', () => {
      const { container } = render(<SeparatorGlass />);
      const element = container.firstChild as HTMLElement;
      expect(element.style.background).toBe('var(--separator-bg)');
    });
  });

  describe('Accessibility', () => {
    it('can receive additional aria attributes', () => {
      render(<SeparatorGlass aria-label="Content divider" decorative={false} />);
      const separator = screen.getByRole('separator');
      expect(separator).toHaveAttribute('aria-label', 'Content divider');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the underlying element', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<SeparatorGlass ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });
});
