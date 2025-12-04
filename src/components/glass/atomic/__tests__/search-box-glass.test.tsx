import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBoxGlass } from '../search-box-glass';

describe('SearchBoxGlass', () => {
  describe('Rendering', () => {
    it('renders input and button', () => {
      render(<SearchBoxGlass />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    it('renders with default placeholder', () => {
      render(<SearchBoxGlass />);
      expect(screen.getByPlaceholderText('Search username...')).toBeInTheDocument();
    });

    it('renders with custom placeholder', () => {
      render(<SearchBoxGlass placeholder="Find user..." />);
      expect(screen.getByPlaceholderText('Find user...')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<SearchBoxGlass className="custom-class" />);
      expect(screen.getByRole('textbox').parentElement).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<SearchBoxGlass ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });

    it('renders compact variant without text', () => {
      render(<SearchBoxGlass variant="compact" />);
      // Button should not contain "Search" text in compact mode
      const button = screen.getByRole('button', { name: /search/i });
      expect(button.textContent).not.toContain('Search');
    });

    it('renders default variant with text', () => {
      render(<SearchBoxGlass variant="default" />);
      // Has span with Search text (may be hidden on mobile)
      const button = screen.getByRole('button', { name: /search/i });
      expect(button.querySelector('span')).toBeInTheDocument();
    });
  });

  describe('Uncontrolled Mode', () => {
    it('manages internal state with defaultValue', async () => {
      const user = userEvent.setup();
      render(<SearchBoxGlass defaultValue="initial" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('initial');

      await user.clear(input);
      await user.type(input, 'new value');
      expect(input).toHaveValue('new value');
    });

    it('starts with empty value by default', () => {
      render(<SearchBoxGlass />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });

  describe('Controlled Mode', () => {
    it('uses controlled value', () => {
      render(<SearchBoxGlass value="controlled" onChange={vi.fn()} />);
      expect(screen.getByRole('textbox')).toHaveValue('controlled');
    });

    it('calls onChange with new value', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SearchBoxGlass value="" onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      // In controlled mode without value update, each keystroke sees previous value + new char
      // But since value is always "", each call gets just the single character
      expect(handleChange).toHaveBeenCalledTimes(4); // t, e, s, t
      expect(handleChange).toHaveBeenNthCalledWith(1, 't');
      expect(handleChange).toHaveBeenNthCalledWith(2, 'e');
      expect(handleChange).toHaveBeenNthCalledWith(3, 's');
      expect(handleChange).toHaveBeenNthCalledWith(4, 't');
    });

    it('updates when controlled value changes', () => {
      const { rerender } = render(<SearchBoxGlass value="first" onChange={vi.fn()} />);
      expect(screen.getByRole('textbox')).toHaveValue('first');

      rerender(<SearchBoxGlass value="second" onChange={vi.fn()} />);
      expect(screen.getByRole('textbox')).toHaveValue('second');
    });
  });

  describe('Submit Behavior', () => {
    it('calls onSubmit when Enter is pressed', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<SearchBoxGlass defaultValue="search term" onSubmit={handleSubmit} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('{Enter}');

      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith('search term');
    });

    it('calls onSubmit when button is clicked', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<SearchBoxGlass defaultValue="query" onSubmit={handleSubmit} />);

      await user.click(screen.getByRole('button', { name: /search/i }));

      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith('query');
    });

    it('submits current value in controlled mode', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(
        <SearchBoxGlass value="controlled value" onChange={vi.fn()} onSubmit={handleSubmit} />
      );

      await user.click(screen.getByRole('button', { name: /search/i }));

      expect(handleSubmit).toHaveBeenCalledWith('controlled value');
    });

    it('handles undefined onSubmit gracefully', async () => {
      const user = userEvent.setup();
      render(<SearchBoxGlass defaultValue="test" />);

      const input = screen.getByRole('textbox');
      // Should not throw
      await user.click(input);
      await user.keyboard('{Enter}');
      await user.click(screen.getByRole('button', { name: /search/i }));
    });
  });

  describe('Focus State', () => {
    it('tracks focus state for styling', async () => {
      const user = userEvent.setup();
      render(<SearchBoxGlass />);

      const input = screen.getByRole('textbox');
      const container = input.parentElement;

      // Initially no glow
      expect(container).toHaveStyle({ boxShadow: 'none' });

      // Focus adds glow
      await user.click(input);
      expect(container).toHaveStyle({ boxShadow: 'var(--search-focus-glow)' });

      // Blur removes glow
      await user.tab();
      expect(container).toHaveStyle({ boxShadow: 'none' });
    });
  });

  describe('Accessibility', () => {
    it('input has aria-label matching placeholder', () => {
      render(<SearchBoxGlass placeholder="Find something" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Find something');
    });

    it('button has aria-label', () => {
      render(<SearchBoxGlass />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Search');
    });

    it('button has type="button"', () => {
      render(<SearchBoxGlass />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('input has type="text"', () => {
      render(<SearchBoxGlass />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<SearchBoxGlass />);

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');

      await user.tab();
      expect(input).toHaveFocus();

      await user.tab();
      expect(button).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty submit', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<SearchBoxGlass onSubmit={handleSubmit} />);

      await user.click(screen.getByRole('button', { name: /search/i }));

      expect(handleSubmit).toHaveBeenCalledWith('');
    });

    it('spreads additional input props', () => {
      render(
        <SearchBoxGlass
          data-testid="search-input"
          maxLength={50}
          autoComplete="off"
        />
      );

      const input = screen.getByTestId('search-input');
      expect(input).toHaveAttribute('maxLength', '50');
      expect(input).toHaveAttribute('autoComplete', 'off');
    });

    it('handles rapid typing', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SearchBoxGlass value="" onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'rapid');

      expect(handleChange).toHaveBeenCalledTimes(5);
    });
  });
});
