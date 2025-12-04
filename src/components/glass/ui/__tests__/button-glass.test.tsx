import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonGlass } from '../button-glass';
import { Check } from 'lucide-react';

describe('ButtonGlass', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<ButtonGlass>Click me</ButtonGlass>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders with default variant (primary)', () => {
      render(<ButtonGlass>Primary</ButtonGlass>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders with custom variant', () => {
      render(<ButtonGlass variant="secondary">Secondary</ButtonGlass>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders all variant types without errors', () => {
      const variants = ['primary', 'secondary', 'ghost', 'danger', 'success', 'text'] as const;

      variants.forEach((variant) => {
        const { unmount } = render(<ButtonGlass variant={variant}>{variant}</ButtonGlass>);
        const button = screen.getByRole('button', { name: new RegExp(variant, 'i') });
        expect(button).toBeInTheDocument();
        unmount();
      });
    });

    it('renders with different sizes without errors', () => {
      const sizes = ['sm', 'md', 'lg', 'icon'] as const;

      sizes.forEach((size) => {
        const { unmount } = render(<ButtonGlass size={size}>{size}</ButtonGlass>);
        const button = screen.getByRole('button', { name: new RegExp(size, 'i') });
        expect(button).toBeInTheDocument();
        unmount();
      });
    });

    it('applies custom className', () => {
      render(<ButtonGlass className="custom-class">Button</ButtonGlass>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('Icons', () => {
    it('renders icon on the left by default', () => {
      render(<ButtonGlass icon={Check}>With Icon</ButtonGlass>);
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders icon on the right when iconPosition is right', () => {
      render(<ButtonGlass icon={Check} iconPosition="right">With Icon</ButtonGlass>);
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders spinner icon when loading', () => {
      render(<ButtonGlass icon={Check} loading>Loading</ButtonGlass>);
      const button = screen.getByRole('button');
      const spinner = button.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when loading', () => {
      render(<ButtonGlass loading>Loading</ButtonGlass>);
      const button = screen.getByRole('button');
      const spinner = button.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('hides children when loading', () => {
      render(<ButtonGlass loading>Click me</ButtonGlass>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveTextContent('Click me');
    });

    it('disables button when loading', () => {
      render(<ButtonGlass loading>Loading</ButtonGlass>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('does not trigger onClick when loading', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ButtonGlass loading onClick={handleClick}>Loading</ButtonGlass>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('disables button when disabled prop is true', () => {
      render(<ButtonGlass disabled>Disabled</ButtonGlass>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('does not trigger onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ButtonGlass disabled onClick={handleClick}>Disabled</ButtonGlass>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ButtonGlass onClick={handleClick}>Click me</ButtonGlass>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles click event correctly', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ButtonGlass onClick={handleClick}>Ripple</ButtonGlass>);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('HTML Attributes', () => {
    it('renders with type="button" by default', () => {
      render(<ButtonGlass>Button</ButtonGlass>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<ButtonGlass ref={ref}>Button</ButtonGlass>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
    });

    it('spreads additional props', () => {
      render(<ButtonGlass data-testid="custom-button" aria-label="Custom">Button</ButtonGlass>);
      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('aria-label', 'Custom');
    });
  });

  describe('Accessibility', () => {
    it('has role="button"', () => {
      render(<ButtonGlass>Button</ButtonGlass>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('is keyboard accessible', () => {
      render(<ButtonGlass>Button</ButtonGlass>);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('respects aria-label', () => {
      render(<ButtonGlass aria-label="Custom label">Icon only</ButtonGlass>);
      expect(screen.getByRole('button', { name: /custom label/i })).toBeInTheDocument();
    });

    it('indicates disabled state to screen readers', () => {
      render(<ButtonGlass disabled>Disabled</ButtonGlass>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
    });
  });
});
