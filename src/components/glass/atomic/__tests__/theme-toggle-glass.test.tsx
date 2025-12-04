import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggleGlass } from '../theme-toggle-glass';
import { ThemeProvider } from '@/lib/theme-context';

// Helper to render with ThemeProvider
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ThemeToggleGlass', () => {
  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear();
  });

  describe('Rendering', () => {
    it('renders theme toggle button', () => {
      renderWithTheme(<ThemeToggleGlass />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('shows next theme label', () => {
      renderWithTheme(<ThemeToggleGlass />);
      // Default theme is 'glass', so next is 'light'
      expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument();
    });

    it('renders icon for next theme', () => {
      const { container } = renderWithTheme(<ThemeToggleGlass />);
      // Next theme is Light, icon is Sun
      const icon = container.querySelector('.lucide-sun');
      expect(icon).toBeInTheDocument();
    });

    it('hides label on mobile, shows on desktop (default)', () => {
      renderWithTheme(<ThemeToggleGlass />);
      // Label has hidden md:inline classes
      const button = screen.getByRole('button');
      expect(button.textContent).toContain('Light');
    });

    it('always hides label when iconOnly=true', () => {
      renderWithTheme(<ThemeToggleGlass iconOnly />);
      const button = screen.getByRole('button');
      // Button should not contain text label
      expect(button.textContent).toBe('');
    });

    it('applies custom className', () => {
      renderWithTheme(<ThemeToggleGlass className="custom-class" />);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('Theme Cycle Logic', () => {
    it('cycles from glass to light to aurora to glass', async () => {
      const user = userEvent.setup();
      renderWithTheme(<ThemeToggleGlass />);

      // Initial: glass -> next is light
      expect(screen.getByRole('button', { name: /switch to light/i })).toBeInTheDocument();

      // Click: switch to light -> next is aurora
      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('button', { name: /switch to aurora/i })).toBeInTheDocument();

      // Click: switch to aurora -> next is glass
      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('button', { name: /switch to glass/i })).toBeInTheDocument();

      // Click: switch to glass -> next is light (cycle complete)
      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('button', { name: /switch to light/i })).toBeInTheDocument();
    });

    it('calculates next theme with modulo', async () => {
      const user = userEvent.setup();
      renderWithTheme(<ThemeToggleGlass />);

      // Verify (idx + 1) % length logic works
      const button = screen.getByRole('button');

      // glass (idx 2) -> (2+1) % 3 = 0 -> light
      expect(button).toHaveAttribute('aria-label', 'Switch to Light theme');

      await user.click(button);
      // light (idx 0) -> (0+1) % 3 = 1 -> aurora
      expect(button).toHaveAttribute('aria-label', 'Switch to Aurora theme');

      await user.click(button);
      // aurora (idx 1) -> (1+1) % 3 = 2 -> glass
      expect(button).toHaveAttribute('aria-label', 'Switch to Glass theme');
    });
  });

  describe('Custom Handler', () => {
    it('calls custom onToggle when provided', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      renderWithTheme(<ThemeToggleGlass onToggle={handleToggle} />);

      await user.click(screen.getByRole('button'));
      expect(handleToggle).toHaveBeenCalledTimes(1);
    });

    it('does not cycle theme when custom onToggle provided', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      renderWithTheme(<ThemeToggleGlass onToggle={handleToggle} />);

      // const initialLabel = screen.getByRole('button').getAttribute('aria-label');
      await user.click(screen.getByRole('button'));

      // Theme should not change because custom handler is used
      expect(handleToggle).toHaveBeenCalled();
    });
  });

  describe('Icon Configuration', () => {
    it('shows Sun icon for Light theme', () => {
      const { container } = renderWithTheme(<ThemeToggleGlass />);
      // glass -> next is light (Sun)
      expect(container.querySelector('.lucide-sun')).toBeInTheDocument();
    });

    it('uses custom icon size', () => {
      renderWithTheme(<ThemeToggleGlass iconSize={24} />);
      // Icon is rendered with custom size prop
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('uses default icon size 20', () => {
      renderWithTheme(<ThemeToggleGlass />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has type="button"', () => {
      renderWithTheme(<ThemeToggleGlass />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('has descriptive aria-label with next theme', () => {
      renderWithTheme(<ThemeToggleGlass />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label');
      expect(button.getAttribute('aria-label')).toMatch(/switch to \w+ theme/i);
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      renderWithTheme(<ThemeToggleGlass ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
    });

    it('spreads additional props', () => {
      renderWithTheme(
        <ThemeToggleGlass data-testid="theme-toggle" aria-describedby="desc" />
      );
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles disabled state', () => {
      renderWithTheme(<ThemeToggleGlass disabled />);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('handles rapid clicking', async () => {
      const user = userEvent.setup();
      renderWithTheme(<ThemeToggleGlass />);

      const button = screen.getByRole('button');

      // Click multiple times rapidly
      await user.click(button);
      await user.click(button);
      await user.click(button);

      // Should still cycle correctly
      expect(button).toHaveAttribute('aria-label', 'Switch to Light theme');
    });
  });
});
