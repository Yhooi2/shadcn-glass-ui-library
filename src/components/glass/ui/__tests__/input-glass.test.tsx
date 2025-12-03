import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputGlass } from '../input-glass';
import { Mail, Lock } from 'lucide-react';

describe('InputGlass', () => {
  describe('Rendering', () => {
    it('renders input correctly', () => {
      render(<InputGlass placeholder="Enter text" />);
      expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<InputGlass label="Email" placeholder="email@example.com" />);
      expect(screen.getByText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email@example.com/i)).toBeInTheDocument();
    });

    it('renders without label when not provided', () => {
      render(<InputGlass placeholder="Enter text" />);
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<InputGlass className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Sizes', () => {
    it('renders with default size (md)', () => {
      render(<InputGlass placeholder="Medium" />);
      const input = screen.getByPlaceholderText(/medium/i);
      expect(input).toBeInTheDocument();
    });

    it('renders with small size', () => {
      render(<InputGlass inputSize="sm" placeholder="Small" />);
      const input = screen.getByPlaceholderText(/small/i);
      expect(input).toBeInTheDocument();
    });

    it('renders with large size', () => {
      render(<InputGlass inputSize="lg" placeholder="Large" />);
      const input = screen.getByPlaceholderText(/large/i);
      expect(input).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('renders icon on the left by default', () => {
      const { container } = render(<InputGlass icon={Mail} placeholder="Email" />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders icon on the right when iconPosition is right', () => {
      const { container } = render(
        <InputGlass icon={Lock} iconPosition="right" placeholder="Password" />
      );
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('does not render icon when not provided', () => {
      const { container } = render(<InputGlass placeholder="No icon" />);
      const icon = container.querySelector('svg');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('displays error message', () => {
      render(<InputGlass error="This field is required" />);
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    });

    it('does not display error when not provided', () => {
      render(<InputGlass placeholder="No error" />);
      expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    });

    it('displays both error and success when both provided', () => {
      render(<InputGlass error="Error message" success="Success message" />);
      expect(screen.getByText(/error message/i)).toBeInTheDocument();
      expect(screen.getByText(/success message/i)).toBeInTheDocument();
    });
  });

  describe('Success State', () => {
    it('displays success message', () => {
      render(<InputGlass success="Looks good!" />);
      expect(screen.getByText(/looks good!/i)).toBeInTheDocument();
    });

    it('does not display success when not provided', () => {
      render(<InputGlass placeholder="No success" />);
      expect(screen.queryByText(/looks good/i)).not.toBeInTheDocument();
    });

    it('displays success message when provided without error', () => {
      render(<InputGlass success="Success" />);
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables input when disabled prop is true', () => {
      render(<InputGlass disabled placeholder="Disabled" />);
      expect(screen.getByPlaceholderText(/disabled/i)).toBeDisabled();
    });

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<InputGlass disabled onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when typing', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<InputGlass onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');
      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onFocus when focused', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<InputGlass onFocus={handleFocus} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when blurred', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<InputGlass onBlur={handleBlur} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('handles value changes correctly', async () => {
      const user = userEvent.setup();
      render(<InputGlass placeholder="Type here" />);

      const input = screen.getByPlaceholderText(/type here/i) as HTMLInputElement;
      await user.type(input, 'Hello World');
      expect(input.value).toBe('Hello World');
    });
  });

  describe('HTML Attributes', () => {
    it('renders as textbox by default', () => {
      render(<InputGlass />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with custom type', () => {
      render(<InputGlass type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<InputGlass ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });

    it('spreads additional props', () => {
      render(<InputGlass data-testid="custom-input" aria-label="Custom" />);
      const input = screen.getByTestId('custom-input');
      expect(input).toHaveAttribute('aria-label', 'Custom');
    });
  });

  describe('Accessibility', () => {
    it('has role="textbox"', () => {
      render(<InputGlass />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('is keyboard accessible', () => {
      render(<InputGlass />);
      const input = screen.getByRole('textbox');
      input.focus();
      expect(input).toHaveFocus();
    });

    it('respects aria-label', () => {
      render(<InputGlass aria-label="Custom label" />);
      expect(screen.getByRole('textbox', { name: /custom label/i })).toBeInTheDocument();
    });

    it('indicates disabled state to screen readers', () => {
      render(<InputGlass disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('disabled');
    });

    it('associates label with input', () => {
      render(<InputGlass label="Email address" />);
      const label = screen.getByText(/email address/i);
      const input = screen.getByRole('textbox');
      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });
  });
});
