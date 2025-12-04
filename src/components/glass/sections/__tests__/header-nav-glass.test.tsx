import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeaderNavGlass } from '../header-nav-glass';
import { ThemeProvider } from '@/lib/theme-context';

// Wrapper with ThemeProvider
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('HeaderNavGlass', () => {
  describe('Rendering', () => {
    it('renders title', () => {
      renderWithTheme(<HeaderNavGlass />);
      expect(screen.getByText('User Analytics')).toBeInTheDocument();
    });

    it('renders search input with default username', () => {
      renderWithTheme(<HeaderNavGlass />);
      expect(screen.getByDisplayValue('Yhooi2')).toBeInTheDocument();
    });

    it('renders search input with custom username', () => {
      renderWithTheme(<HeaderNavGlass username="testuser" />);
      expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    });

    it('renders GitHub button', () => {
      renderWithTheme(<HeaderNavGlass />);
      // There are multiple GitHub-related elements - the icon button and Sign in button
      const buttons = screen.getAllByRole('button');
      const githubBtn = buttons.find(btn => btn.getAttribute('aria-label') === 'GitHub');
      expect(githubBtn).toBeInTheDocument();
    });

    it('renders theme toggle button', () => {
      renderWithTheme(<HeaderNavGlass />);
      expect(screen.getByRole('button', { name: /switch to/i })).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = renderWithTheme(<HeaderNavGlass className="custom-class" />);
      expect(container.querySelector('header')).toHaveClass('custom-class');
    });
  });

  describe('Search Functionality', () => {
    it('updates search value on input', async () => {
      const user = userEvent.setup();
      renderWithTheme(<HeaderNavGlass />);

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, 'newuser');

      expect(input).toHaveValue('newuser');
    });

    it('calls onSearch when Enter is pressed', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      renderWithTheme(<HeaderNavGlass onSearch={handleSearch} />);

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, 'searchterm{Enter}');

      expect(handleSearch).toHaveBeenCalledWith('searchterm');
    });

    it('calls onSearch when search button is clicked', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      renderWithTheme(<HeaderNavGlass onSearch={handleSearch} username="test" />);

      // Find the search button (not the GitHub button)
      const searchButtons = screen.getAllByRole('button');
      const searchBtn = searchButtons.find(btn =>
        btn.querySelector('.lucide-search')
      );

      await user.click(searchBtn!);
      expect(handleSearch).toHaveBeenCalledWith('test');
    });
  });

  describe('Theme Toggle', () => {
    it('calls onThemeToggle when provided', async () => {
      const user = userEvent.setup();
      const handleThemeToggle = vi.fn();
      renderWithTheme(<HeaderNavGlass onThemeToggle={handleThemeToggle} />);

      const themeBtn = screen.getByRole('button', { name: /switch to/i });
      await user.click(themeBtn);

      expect(handleThemeToggle).toHaveBeenCalledTimes(1);
    });

    it('uses cycleTheme when onThemeToggle not provided', async () => {
      const user = userEvent.setup();
      renderWithTheme(<HeaderNavGlass />);

      const themeBtn = screen.getByRole('button', { name: /switch to/i });
      // Should not throw, uses internal cycleTheme
      await user.click(themeBtn);
    });
  });

  describe('Focus State', () => {
    it('tracks focus state on search input', async () => {
      const user = userEvent.setup();
      renderWithTheme(<HeaderNavGlass />);

      const input = screen.getByRole('textbox');
      const searchBox = input.parentElement;

      // Initially no glow
      expect(searchBox).toHaveStyle({ boxShadow: 'none' });

      // Focus adds glow
      await user.click(input);
      expect(searchBox).toHaveStyle({ boxShadow: 'var(--search-focus-glow)' });
    });
  });

  describe('Accessibility', () => {
    it('search input has aria-label', () => {
      renderWithTheme(<HeaderNavGlass />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Search username');
    });

    it('GitHub button has aria-label', () => {
      renderWithTheme(<HeaderNavGlass />);
      expect(screen.getByRole('button', { name: 'GitHub' })).toBeInTheDocument();
    });

    it('theme button has descriptive aria-label', () => {
      renderWithTheme(<HeaderNavGlass />);
      const themeBtn = screen.getByRole('button', { name: /switch to.*theme/i });
      expect(themeBtn).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      renderWithTheme(<HeaderNavGlass ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it('all buttons have type="button"', () => {
      renderWithTheme(<HeaderNavGlass />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(btn => {
        expect(btn).toHaveAttribute('type', 'button');
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined onSearch gracefully', async () => {
      const user = userEvent.setup();
      renderWithTheme(<HeaderNavGlass />);

      const input = screen.getByRole('textbox');
      // Should not throw
      await user.type(input, '{Enter}');
    });

    it('handles empty search value', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      renderWithTheme(<HeaderNavGlass onSearch={handleSearch} username="" />);

      await user.keyboard('{Enter}');
      // onSearch should be called with empty string
    });
  });
});
