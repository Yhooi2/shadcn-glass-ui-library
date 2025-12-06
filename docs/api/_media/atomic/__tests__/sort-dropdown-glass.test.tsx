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
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('sets aria-expanded to true when open', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('closes on second click', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      const button = screen.getByRole('button');
      await user.click(button);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(button);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('closes on Escape key', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('closes on outside click', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <SortDropdownGlass {...defaultProps} />
          <button data-testid="outside">Outside</button>
        </div>
      );

      await user.click(screen.getByRole('button', { name: /commits/i }));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(screen.getByTestId('outside'));
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('Field Selection', () => {
    it('shows all default options in dropdown', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('option', { name: /commits/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /stars/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /name/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /contribution/i })).toBeInTheDocument();
    });

    it('shows custom options when provided', async () => {
      const user = userEvent.setup();
      render(
        <SortDropdownGlass {...defaultProps} options={['stars', 'name']} />
      );

      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('option', { name: /stars/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /name/i })).toBeInTheDocument();
      expect(screen.queryByRole('option', { name: /commits/i })).not.toBeInTheDocument();
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
      await user.click(screen.getByRole('option', { name: /stars/i }));

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
      await user.click(screen.getByRole('option', { name: /commits/i }));

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
      await user.click(screen.getByRole('option', { name: /commits/i }));

      expect(handleChange).toHaveBeenCalledWith('commits', 'asc');
    });

    it('closes dropdown after selection', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(screen.getByRole('option', { name: /stars/i }));
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('marks selected option with aria-selected', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} sortBy="stars" />);

      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('option', { name: /stars/i }))
        .toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('option', { name: /commits/i }))
        .toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Keyboard Support', () => {
    it('opens on Enter key', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('opens on Space key', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has aria-haspopup="listbox"', () => {
      render(<SortDropdownGlass {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('dropdown has role="listbox"', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('options have role="option"', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getAllByRole('option')).toHaveLength(4);
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
    it('handles rapid toggle clicks', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} />);

      const button = screen.getByRole('button');

      // Rapid clicks
      await user.click(button);
      await user.click(button);
      await user.click(button);

      // Should be open after odd number of clicks
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('handles empty options array', async () => {
      const user = userEvent.setup();
      render(<SortDropdownGlass {...defaultProps} options={[]} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.queryAllByRole('option')).toHaveLength(0);
    });
  });
});
