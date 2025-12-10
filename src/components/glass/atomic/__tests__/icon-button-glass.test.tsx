import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButtonGlass } from '../icon-button-glass';
import { Search, Settings, X } from 'lucide-react';

describe('IconButtonGlass', () => {
  describe('Rendering', () => {
    it('renders button with icon', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toBeInTheDocument();
      expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('renders with different icons', () => {
      const { rerender } = render(<IconButtonGlass icon={Search} aria-label="Search" />);
      expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();

      rerender(<IconButtonGlass icon={Settings} aria-label="Settings" />);
      expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();

      rerender(<IconButtonGlass icon={X} aria-label="Close" />);
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" className="custom-class" />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Size Variants', () => {
    it('renders small size', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" size="sm" />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toHaveClass('w-8', 'h-8');
    });

    it('renders medium size (default)', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toHaveClass('w-10', 'h-10');
    });

    it('renders large size', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" size="lg" />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toHaveClass('w-12', 'h-12');
    });

    it('renders touch size for accessibility', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" size="touch" />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toHaveClass('w-11', 'h-11', 'md:w-10', 'md:h-10');
    });
  });

  describe('Style Variants', () => {
    it('renders gradient variant (default)', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" variant="gradient" />);
      const button = screen.getByRole('button', { name: 'Search' });
      // Gradient is applied via inline style
      expect(button.style.background).toContain('linear-gradient');
      expect(button.style.boxShadow).toBe('var(--icon-btn-shadow)');
    });

    it('renders subtle variant', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" variant="subtle" />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toHaveStyle({
        background: 'var(--card-subtle-bg)',
      });
    });

    it('renders ghost variant', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" variant="ghost" />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toHaveClass('bg-transparent', 'hover:bg-white/10');
    });
  });

  describe('Icon Size', () => {
    it('uses default icon size (20px)', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" />);
      const button = screen.getByRole('button', { name: 'Search' });
      const icon = button.querySelector('svg');
      expect(icon).toHaveAttribute('width', '20');
      expect(icon).toHaveAttribute('height', '20');
    });

    it('accepts custom icon size', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" iconSize={24} />);
      const button = screen.getByRole('button', { name: 'Search' });
      const icon = button.querySelector('svg');
      expect(icon).toHaveAttribute('width', '24');
      expect(icon).toHaveAttribute('height', '24');
    });

    it('renders small icons', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" iconSize={16} />);
      const button = screen.getByRole('button', { name: 'Search' });
      const icon = button.querySelector('svg');
      expect(icon).toHaveAttribute('width', '16');
      expect(icon).toHaveAttribute('height', '16');
    });
  });

  describe('User Interactions', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<IconButtonGlass icon={Search} aria-label="Search" onClick={handleClick} />);

      const button = screen.getByRole('button', { name: 'Search' });
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be focused', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" />);
      const button = screen.getByRole('button', { name: 'Search' });

      button.focus();
      expect(button).toHaveFocus();
    });

    it('has hover styles', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toHaveClass('hover:scale-105');
    });
  });

  describe('Accessibility', () => {
    it('requires aria-label prop', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search button" />);
      const button = screen.getByRole('button', { name: 'Search button' });
      expect(button).toHaveAttribute('aria-label', 'Search button');
    });

    it('has button type', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toHaveAttribute('type', 'button');
    });

    it('has focus ring', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2');
    });

    it('meets touch target size (44px minimum)', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" size="touch" />);
      const button = screen.getByRole('button', { name: 'Search' });
      // 44px = 11 * 4px (w-11 h-11 in Tailwind)
      expect(button).toHaveClass('w-11', 'h-11');
    });
  });

  describe('Disabled State', () => {
    it('can be disabled', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" disabled />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toBeDisabled();
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<IconButtonGlass icon={Search} aria-label="Search" onClick={handleClick} disabled />);

      const button = screen.getByRole('button', { name: 'Search' });
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to button element', () => {
      const ref = { current: null } as React.RefObject<HTMLButtonElement>;
      render(<IconButtonGlass ref={ref} icon={Search} aria-label="Search" />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('allows ref methods to be called', () => {
      const ref = { current: null } as React.RefObject<HTMLButtonElement>;
      render(<IconButtonGlass ref={ref} icon={Search} aria-label="Search" />);

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        ref.current.focus();
        expect(document.activeElement).toBe(ref.current);
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes', () => {
      render(
        <IconButtonGlass
          icon={Search}
          aria-label="Search"
          data-testid="search-button"
          title="Search for items"
        />
      );

      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toHaveAttribute('data-testid', 'search-button');
      expect(button).toHaveAttribute('title', 'Search for items');
    });

    it('applies id attribute', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" id="search-btn" />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toHaveAttribute('id', 'search-btn');
    });
  });

  describe('Theme Styling', () => {
    it('applies icon color from CSS variable', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" />);
      const button = screen.getByRole('button', { name: 'Search' });
      const icon = button.querySelector('svg');
      expect(icon).toHaveStyle({
        color: 'var(--icon-btn-text)',
      });
    });

    it('applies gradient shadow on gradient variant', () => {
      render(<IconButtonGlass icon={Search} aria-label="Search" variant="gradient" />);
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toHaveStyle({
        boxShadow: 'var(--icon-btn-shadow)',
      });
    });
  });
});
