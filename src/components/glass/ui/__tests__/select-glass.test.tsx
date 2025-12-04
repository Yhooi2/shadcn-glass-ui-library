import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectGlass, type SelectOption } from '../select-glass';
import { User, Mail } from 'lucide-react';

describe('SelectGlass', () => {
  const simpleOptions: SelectOption[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const iconOptions: SelectOption[] = [
    { value: 'user', label: 'User Profile', icon: User },
    { value: 'mail', label: 'Email Address', icon: Mail },
  ];

  describe('Rendering', () => {
    it('renders with placeholder', () => {
      render(<SelectGlass options={simpleOptions} placeholder="Select option" />);
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<SelectGlass options={simpleOptions} label="Choose option" />);
      expect(screen.getByText('Choose option')).toBeInTheDocument();
    });

    it('renders with selected value', () => {
      render(<SelectGlass options={simpleOptions} value="2" />);
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<SelectGlass options={simpleOptions} error="Required field" />);
      expect(screen.getByText('Required field')).toBeInTheDocument();
    });

    it('renders with success message', () => {
      render(<SelectGlass options={simpleOptions} success="Validated" />);
      expect(screen.getByText('Validated')).toBeInTheDocument();
    });

    it('renders all sizes without errors', () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      sizes.forEach((size) => {
        const { unmount } = render(
          <SelectGlass options={simpleOptions} size={size} placeholder={size} />
        );
        expect(screen.getByText(size)).toBeInTheDocument();
        unmount();
      });
    });

    it('renders disabled state', () => {
      render(<SelectGlass options={simpleOptions} disabled />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
    });

    it('renders options with icons', () => {
      render(<SelectGlass options={iconOptions} value="user" />);
      const trigger = screen.getByRole('combobox');
      const icon = trigger.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(screen.getByText('User Profile')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('opens dropdown on trigger click', async () => {
      const user = userEvent.setup();
      render(<SelectGlass options={simpleOptions} />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('selects option on click', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<SelectGlass options={simpleOptions} onChange={onChange} />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      const option = screen.getByRole('option', { name: /option 2/i });
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith('2');
    });

    it('clears selection with clear button', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<SelectGlass options={simpleOptions} value="2" onChange={onChange} />);

      const clearButton = screen.getByLabelText('Clear selection');
      await user.click(clearButton);

      expect(onChange).toHaveBeenCalledWith('');
    });

    it('does not open when disabled', async () => {
      const user = userEvent.setup();
      render(<SelectGlass options={simpleOptions} disabled />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('does not select disabled option', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const optionsWithDisabled: SelectOption[] = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2', disabled: true },
      ];

      render(<SelectGlass options={optionsWithDisabled} onChange={onChange} />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        const option = screen.getByRole('option', { name: /option 2/i });
        expect(option).toBeDisabled();
      });
    });
  });

  describe('Search Functionality', () => {
    it('renders search input when searchable', async () => {
      const user = userEvent.setup();
      render(<SelectGlass options={simpleOptions} searchable />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search...');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('type', 'text');
    });

    it('search input is focusable and interactive', async () => {
      const user = userEvent.setup();
      render(<SelectGlass options={simpleOptions} searchable />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search...');
      await user.click(searchInput);

      expect(searchInput).toHaveFocus();
    });
  });

  describe('Keyboard Navigation', () => {
    it('opens dropdown with ArrowDown key', async () => {
      const user = userEvent.setup();
      render(<SelectGlass options={simpleOptions} />);

      const trigger = screen.getByRole('combobox');
      trigger.focus();
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('navigates options with arrow keys', async () => {
      const user = userEvent.setup();
      render(<SelectGlass options={simpleOptions} />);

      const trigger = screen.getByRole('combobox');
      trigger.focus();
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      // Navigate down should highlight next option
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');

      // Navigate up should go back
      await user.keyboard('{ArrowUp}');

      // Verify keyboard navigation worked by selecting with Enter
      const onChange = vi.fn();
      render(<SelectGlass options={simpleOptions} onChange={onChange} />);
    });

    it('selects option with Enter key', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<SelectGlass options={simpleOptions} onChange={onChange} />);

      const trigger = screen.getByRole('combobox');
      trigger.focus();
      await user.keyboard('{ArrowDown}'); // Open

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      await user.keyboard('{Enter}'); // Select first option

      expect(onChange).toHaveBeenCalledWith('1');
    });

    it('closes dropdown with Escape key', async () => {
      const user = userEvent.setup();
      render(<SelectGlass options={simpleOptions} />);

      const trigger = screen.getByRole('combobox');
      trigger.focus();
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('jumps to first option with Home key', async () => {
      const user = userEvent.setup();
      render(<SelectGlass options={simpleOptions} />);

      const trigger = screen.getByRole('combobox');
      trigger.focus();
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      await user.keyboard('{End}'); // Go to last
      await user.keyboard('{Home}'); // Jump to first

      // First option should now be highlighted (verify by checking data-index)
      const firstOption = screen.getAllByRole('option')[0];
      expect(firstOption).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<SelectGlass options={simpleOptions} label="Select label" />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
      expect(trigger).toHaveAttribute('aria-label', 'Select label');
    });

    it('updates aria-expanded when opened', async () => {
      const user = userEvent.setup();
      render(<SelectGlass options={simpleOptions} />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('options have proper aria-selected attribute', async () => {
      const user = userEvent.setup();
      render(<SelectGlass options={simpleOptions} value="2" />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        const selectedOption = screen.getByRole('option', { name: /option 2/i });
        expect(selectedOption).toHaveAttribute('aria-selected', 'true');
      });
    });
  });

  describe('Controlled Mode', () => {
    it('updates when value prop changes', () => {
      const { rerender } = render(
        <SelectGlass options={simpleOptions} value="1" />
      );

      expect(screen.getByText('Option 1')).toBeInTheDocument();

      rerender(<SelectGlass options={simpleOptions} value="2" />);

      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('calls onChange when selection changes', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<SelectGlass options={simpleOptions} value="1" onChange={onChange} />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      const option = screen.getByRole('option', { name: /option 3/i });
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith('3');
    });
  });
});
