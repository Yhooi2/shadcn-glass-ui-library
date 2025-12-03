import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BadgeGlass } from '../badge-glass';

describe('BadgeGlass', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<BadgeGlass>Test badge</BadgeGlass>);
      expect(screen.getByText(/test badge/i)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<BadgeGlass className="custom-class">Badge</BadgeGlass>);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Variants - shadcn/ui compatible', () => {
    it('renders with default variant', () => {
      render(<BadgeGlass variant="default">Default</BadgeGlass>);
      expect(screen.getByText(/default/i)).toBeInTheDocument();
    });

    it('renders with secondary variant', () => {
      render(<BadgeGlass variant="secondary">Secondary</BadgeGlass>);
      expect(screen.getByText(/secondary/i)).toBeInTheDocument();
    });

    it('renders with destructive variant', () => {
      render(<BadgeGlass variant="destructive">Destructive</BadgeGlass>);
      expect(screen.getByText(/destructive/i)).toBeInTheDocument();
    });

    it('renders with outline variant', () => {
      render(<BadgeGlass variant="outline">Outline</BadgeGlass>);
      expect(screen.getByText(/outline/i)).toBeInTheDocument();
    });

    it('defaults to default variant when no variant specified', () => {
      render(<BadgeGlass>Default by default</BadgeGlass>);
      expect(screen.getByText(/default by default/i)).toBeInTheDocument();
    });
  });

  describe('Variants - Glass UI extended', () => {
    it('renders with success variant', () => {
      render(<BadgeGlass variant="success">Success</BadgeGlass>);
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });

    it('renders with warning variant', () => {
      render(<BadgeGlass variant="warning">Warning</BadgeGlass>);
      expect(screen.getByText(/warning/i)).toBeInTheDocument();
    });

    it('renders with info variant', () => {
      render(<BadgeGlass variant="info">Info</BadgeGlass>);
      expect(screen.getByText(/info/i)).toBeInTheDocument();
    });

    it('renders all extended variants without errors', () => {
      const variants: Array<'success' | 'warning' | 'info'> = ['success', 'warning', 'info'];

      variants.forEach((variant) => {
        const { unmount } = render(<BadgeGlass variant={variant}>{variant}</BadgeGlass>);
        expect(screen.getByText(new RegExp(variant, 'i'))).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Sizes', () => {
    it('renders with default size (md)', () => {
      render(<BadgeGlass>Medium</BadgeGlass>);
      expect(screen.getByText(/medium/i)).toBeInTheDocument();
    });

    it('renders with small size', () => {
      render(<BadgeGlass size="sm">Small</BadgeGlass>);
      expect(screen.getByText(/small/i)).toBeInTheDocument();
    });

    it('renders with large size', () => {
      render(<BadgeGlass size="lg">Large</BadgeGlass>);
      expect(screen.getByText(/large/i)).toBeInTheDocument();
    });

    it('renders all sizes without errors', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

      sizes.forEach((size) => {
        const { unmount } = render(<BadgeGlass size={size}>{size}</BadgeGlass>);
        expect(screen.getByText(new RegExp(size, 'i'))).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Dot indicator', () => {
    it('does not show dot by default', () => {
      const { container } = render(<BadgeGlass>No dot</BadgeGlass>);
      const dot = container.querySelector('.animate-pulse');
      expect(dot).not.toBeInTheDocument();
    });

    it('shows animated dot when dot prop is true', () => {
      const { container } = render(<BadgeGlass dot>With dot</BadgeGlass>);
      const dot = container.querySelector('.animate-pulse');
      expect(dot).toBeInTheDocument();
    });

    it('dot has proper styling', () => {
      const { container } = render(<BadgeGlass dot>Badge</BadgeGlass>);
      const dot = container.querySelector('.animate-pulse');
      expect(dot).toHaveClass('rounded-full');
    });

    it('renders badge with dot and text', () => {
      const { container } = render(<BadgeGlass dot>Active</BadgeGlass>);
      const dot = container.querySelector('.animate-pulse');
      expect(dot).toBeInTheDocument();
      expect(screen.getByText(/active/i)).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('renders as span element', () => {
      const { container } = render(<BadgeGlass>Badge</BadgeGlass>);
      expect(container.firstChild?.nodeName).toBe('SPAN');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<BadgeGlass ref={ref}>Badge</BadgeGlass>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
    });

    it('spreads additional props', () => {
      render(<BadgeGlass data-testid="custom-badge" aria-label="Custom">Badge</BadgeGlass>);
      const badge = screen.getByTestId('custom-badge');
      expect(badge).toHaveAttribute('aria-label', 'Custom');
    });
  });

  describe('Accessibility', () => {
    it('is accessible via text content', () => {
      render(<BadgeGlass>Accessible badge</BadgeGlass>);
      expect(screen.getByText(/accessible badge/i)).toBeInTheDocument();
    });

    it('supports custom aria attributes', () => {
      render(<BadgeGlass aria-label="Status badge">New</BadgeGlass>);
      const badge = screen.getByText(/new/i);
      expect(badge).toHaveAttribute('aria-label', 'Status badge');
    });

    it('can be used with aria-describedby', () => {
      render(
        <>
          <BadgeGlass aria-describedby="badge-description">Active</BadgeGlass>
          <span id="badge-description">This badge indicates active status</span>
        </>
      );
      const badge = screen.getByText('Active');
      expect(badge).toHaveAttribute('aria-describedby', 'badge-description');
    });
  });

  describe('Combination of props', () => {
    it('renders with variant, size, and dot together', () => {
      const { container } = render(
        <BadgeGlass variant="success" size="lg" dot>
          Complete
        </BadgeGlass>
      );
      expect(screen.getByText(/complete/i)).toBeInTheDocument();
      expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('renders all variants with dot', () => {
      const variants: Array<'default' | 'success' | 'warning' | 'destructive'> = [
        'default',
        'success',
        'warning',
        'destructive',
      ];

      variants.forEach((variant) => {
        const { container, unmount } = render(
          <BadgeGlass variant={variant} dot>
            {variant}
          </BadgeGlass>
        );
        expect(screen.getByText(new RegExp(variant, 'i'))).toBeInTheDocument();
        expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
        unmount();
      });
    });
  });
});
