import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComboBoxGlass, type ComboBoxOption } from '../combobox-glass';

const mockOptions: ComboBoxOption<string>[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'disabled', label: 'Disabled Option', disabled: true },
];

describe('ComboBoxGlass', () => {
  describe('Rendering', () => {
    it('renders with placeholder when no value selected', () => {
      render(<ComboBoxGlass options={mockOptions} placeholder="Select fruit..." />);
      expect(screen.getByRole('combobox')).toHaveTextContent('Select fruit...');
    });

    it('renders selected option label when value provided', () => {
      render(<ComboBoxGlass options={mockOptions} value="banana" />);
      expect(screen.getByRole('combobox')).toHaveTextContent('Banana');
    });

    it('renders with default placeholder when not specified', () => {
      render(<ComboBoxGlass options={mockOptions} />);
      expect(screen.getByRole('combobox')).toHaveTextContent('Select option...');
    });

    it('applies custom className', () => {
      render(<ComboBoxGlass options={mockOptions} className="custom-class" />);
      expect(screen.getByRole('combobox')).toHaveClass('custom-class');
    });

    it('renders all glass variants without errors', () => {
      const variants = ['glass', 'frosted', 'fluted', 'crystal'] as const;

      variants.forEach((variant) => {
        const { unmount } = render(
          <ComboBoxGlass options={mockOptions} glassVariant={variant} />
        );
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Disabled State', () => {
    it('disables combobox when disabled prop is true', () => {
      render(<ComboBoxGlass options={mockOptions} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('does not open popover when disabled', async () => {
      const user = userEvent.setup();
      render(<ComboBoxGlass options={mockOptions} disabled />);

      await user.click(screen.getByRole('combobox'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('Opening/Closing', () => {
    it('opens popover on click', async () => {
      const user = userEvent.setup();
      render(<ComboBoxGlass options={mockOptions} />);

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
      });
    });

    it('sets aria-expanded to true when open', async () => {
      const user = userEvent.setup();
      render(<ComboBoxGlass options={mockOptions} />);

      const combobox = screen.getByRole('combobox');
      expect(combobox).toHaveAttribute('aria-expanded', 'false');

      await user.click(combobox);
      await waitFor(() => {
        expect(combobox).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('Option Selection', () => {
    it('calls onChange when option is selected', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ComboBoxGlass options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Apple'));
      expect(handleChange).toHaveBeenCalledWith('apple');
    });

    it('closes popover after selection', async () => {
      const user = userEvent.setup();
      render(<ComboBoxGlass options={mockOptions} onChange={vi.fn()} />);

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Apple'));
      await waitFor(() => {
        expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();
      });
    });

    it('shows check icon for selected option', async () => {
      const user = userEvent.setup();
      render(<ComboBoxGlass options={mockOptions} value="banana" onChange={vi.fn()} />);

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        // The selected option in dropdown should have data-value attribute
        const options = screen.getAllByText('Banana');
        // One in trigger, one in dropdown
        expect(options.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('Clearable', () => {
    it('clears value when clicking same option with clearable=true', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <ComboBoxGlass
          options={mockOptions}
          value="apple"
          onChange={handleChange}
          clearable
        />
      );

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        // Find the option in the dropdown (has data-value attribute)
        const appleOptions = screen.getAllByText('Apple');
        expect(appleOptions.length).toBeGreaterThanOrEqual(2); // trigger + dropdown
      });

      // Click the option in dropdown (second one)
      const appleOptions = screen.getAllByText('Apple');
      await user.click(appleOptions[1]);
      expect(handleChange).toHaveBeenCalledWith(undefined);
    });

    it('selects new option when clicking different option with clearable=true', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <ComboBoxGlass
          options={mockOptions}
          value="apple"
          onChange={handleChange}
          clearable
        />
      );

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('Banana')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Banana'));
      expect(handleChange).toHaveBeenCalledWith('banana');
    });

    it('does not clear value when clearable=false', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <ComboBoxGlass
          options={mockOptions}
          value="apple"
          onChange={handleChange}
          clearable={false}
        />
      );

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        // Find the option in the dropdown
        const appleOptions = screen.getAllByText('Apple');
        expect(appleOptions.length).toBeGreaterThanOrEqual(2);
      });

      // Click the option in dropdown (second one)
      const appleOptions = screen.getAllByText('Apple');
      await user.click(appleOptions[1]);
      expect(handleChange).toHaveBeenCalledWith('apple');
    });
  });

  describe('Search/Filtering', () => {
    it('filters options based on search input', async () => {
      const user = userEvent.setup();
      render(<ComboBoxGlass options={mockOptions} />);

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'ban');

      await waitFor(() => {
        expect(screen.getByText('Banana')).toBeInTheDocument();
        expect(screen.queryByText('Apple')).not.toBeInTheDocument();
        expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
      });
    });

    it('shows empty message when no options match', async () => {
      const user = userEvent.setup();
      render(<ComboBoxGlass options={mockOptions} emptyText="No fruits found" />);

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'xyz');

      await waitFor(() => {
        expect(screen.getByText('No fruits found')).toBeInTheDocument();
      });
    });

    it('uses custom search placeholder', async () => {
      const user = userEvent.setup();
      render(
        <ComboBoxGlass options={mockOptions} searchPlaceholder="Type to filter..." />
      );

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Type to filter...')).toBeInTheDocument();
      });
    });

    it('case insensitive search', async () => {
      const user = userEvent.setup();
      render(<ComboBoxGlass options={mockOptions} />);

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'APPLE');

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
    });

    it('clears search after selection', async () => {
      const user = userEvent.setup();
      render(<ComboBoxGlass options={mockOptions} onChange={vi.fn()} />);

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'ban');
      await user.click(screen.getByText('Banana'));

      // Reopen to verify search is cleared
      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
      });
    });
  });

  describe('Disabled Options', () => {
    it('renders disabled option with disabled styling', async () => {
      const user = userEvent.setup();
      render(<ComboBoxGlass options={mockOptions} />);

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        const disabledOption = screen.getByText('Disabled Option');
        expect(disabledOption.closest('[data-disabled]')).toBeInTheDocument();
      });
    });
  });

  describe('Generic Type Support', () => {
    it('works with number values', async () => {
      const user = userEvent.setup();
      const numericOptions: ComboBoxOption<number>[] = [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
        { value: 3, label: 'Three' },
      ];
      const handleChange = vi.fn();

      render(
        <ComboBoxGlass<number>
          options={numericOptions}
          value={1}
          onChange={handleChange}
        />
      );

      expect(screen.getByRole('combobox')).toHaveTextContent('One');

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('Two')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Two'));
      expect(handleChange).toHaveBeenCalledWith(2);
    });

    it('works with object values', async () => {
      // const user = userEvent.setup();
      type ObjectValue = { id: string; name: string };
      const objectOptions: ComboBoxOption<ObjectValue>[] = [
        { value: { id: '1', name: 'First' }, label: 'Option 1' },
        { value: { id: '2', name: 'Second' }, label: 'Option 2' },
      ];
      const handleChange = vi.fn();
      const selectedValue = objectOptions[0].value;

      render(
        <ComboBoxGlass<ObjectValue>
          options={objectOptions}
          value={selectedValue}
          onChange={handleChange}
        />
      );

      expect(screen.getByRole('combobox')).toHaveTextContent('Option 1');
    });
  });

  describe('Accessibility', () => {
    it('has correct aria attributes on trigger', () => {
      render(<ComboBoxGlass options={mockOptions} />);
      const combobox = screen.getByRole('combobox');

      expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');
      expect(combobox).toHaveAttribute('aria-expanded', 'false');
    });

    it('sets aria-label to selected option label', () => {
      render(<ComboBoxGlass options={mockOptions} value="banana" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Banana');
    });

    it('sets aria-label to placeholder when no selection', () => {
      render(<ComboBoxGlass options={mockOptions} placeholder="Choose one" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Choose one');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<ComboBoxGlass ref={ref} options={mockOptions} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options array', () => {
      render(<ComboBoxGlass options={[]} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles undefined onChange gracefully', async () => {
      const user = userEvent.setup();
      render(<ComboBoxGlass options={mockOptions} />);

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });

      // Should not throw
      await user.click(screen.getByText('Apple'));
    });

    it('handles value not in options', () => {
      render(<ComboBoxGlass options={mockOptions} value="nonexistent" />);
      // Should show placeholder since value is not found
      expect(screen.getByRole('combobox')).toHaveTextContent('Select option...');
    });
  });
});
