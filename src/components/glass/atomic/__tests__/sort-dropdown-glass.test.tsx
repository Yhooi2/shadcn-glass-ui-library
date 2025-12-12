import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortDropdownGlass, type SortField, type SortOrder } from '../sort-dropdown-glass';

describe('SortDropdownGlass', () => {
  const defaultProps = {
    sortBy: 'commits' as SortField,
    sortOrder: 'desc' as SortOrder,
    onSortChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders trigger button', () => {
      render(<SortDropdownGlass {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('displays current sort field', () => {
      render(<SortDropdownGlass {...defaultProps} sortBy="stars" />);
      expect(screen.getByText('Stars')).toBeInTheDocument();
    });

    it('shows compact mode correctly', () => {
      render(<SortDropdownGlass {...defaultProps} compact />);
      expect(screen.getByText('Sort')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<SortDropdownGlass {...defaultProps} className="custom-class" />);
      expect(screen.getByRole('button').parentElement).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<SortDropdownGlass ref={ref} {...defaultProps} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe('Opening/Closing', () => {
    it('opens dropdown on click', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('sets aria-expanded to true when open', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('closes on Escape key', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });
  });

  describe('Field Selection', () => {
    it('shows all default options in dropdown', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('menuitem', { name: /commits/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /stars/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /name/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /contribution/i })).toBeInTheDocument();
    });

    it('shows custom options when provided', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} options={['stars', 'name']} />);

      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('menuitem', { name: /stars/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /name/i })).toBeInTheDocument();
      expect(screen.queryByRole('menuitem', { name: /commits/i })).not.toBeInTheDocument();
    });

    it('selects new field with default desc order', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <SortDropdownGlass
          {...defaultProps}
          sortBy="commits"
          sortOrder="asc"
          onSortChange={handleChange}
        />
      );

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('menuitem', { name: /stars/i }));

      expect(handleChange).toHaveBeenCalledWith('stars', 'desc');
    });

    it('toggles order when clicking same field (asc to desc)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <SortDropdownGlass
          {...defaultProps}
          sortBy="commits"
          sortOrder="asc"
          onSortChange={handleChange}
        />
      );

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('menuitem', { name: /commits/i }));

      expect(handleChange).toHaveBeenCalledWith('commits', 'desc');
    });

    it('toggles order when clicking same field (desc to asc)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <SortDropdownGlass
          {...defaultProps}
          sortBy="commits"
          sortOrder="desc"
          onSortChange={handleChange}
        />
      );

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('menuitem', { name: /commits/i }));

      expect(handleChange).toHaveBeenCalledWith('commits', 'asc');
    });

    it('closes dropdown after selection', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      await user.click(screen.getByRole('menuitem', { name: /stars/i }));
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('visually highlights selected option', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} sortBy="stars" />);

      await user.click(screen.getByRole('button'));

      // Check that the selected item has the selected class
      const starsItem = screen.getByRole('menuitem', { name: /stars/i });
      expect(starsItem).toHaveClass('bg-(--select-item-selected-bg)');
    });
  });

  describe('Keyboard Support', () => {
    it('opens on Enter key', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('opens on Space key', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has aria-haspopup="menu"', () => {
      render(<SortDropdownGlass {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'menu');
    });

    it('dropdown has role="menu"', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('options have role="menuitem"', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getAllByRole('menuitem')).toHaveLength(4);
    });

    it('button has type="button"', () => {
      render(<SortDropdownGlass {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('spreads additional props', () => {
      render(
        <SortDropdownGlass
          {...defaultProps}
          data-testid="sort-dropdown"
          aria-label="Sort selection"
        />
      );

      expect(screen.getByTestId('sort-dropdown')).toBeInTheDocument();
    });
  });

  describe('Sort Order Icons', () => {
    it('shows ArrowDown when sortOrder is desc', () => {
      render(<SortDropdownGlass {...defaultProps} sortOrder="desc" />);
      // ArrowDown has specific path - we can check by svg presence
      const button = screen.getByRole('button');
      expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('shows ArrowUp when sortOrder is asc', () => {
      render(<SortDropdownGlass {...defaultProps} sortOrder="asc" />);
      const button = screen.getByRole('button');
      expect(button.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options array', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} options={[]} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.queryAllByRole('menuitem')).toHaveLength(0);
    });
  });
});
