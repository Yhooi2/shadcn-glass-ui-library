import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxGlass } from '../checkbox-glass';

// Helper function to get the visual checkbox div (not the hidden input)
const getCheckboxDiv = (container: HTMLElement) => {
  return container.querySelector('div[role="checkbox"]') as HTMLElement;
};

describe('CheckboxGlass', () => {
  describe('Rendering', () => {
    it('renders checkbox with label', () => {
      render(<CheckboxGlass checked={false} onChange={vi.fn()} label="Test Label" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders checkbox without label', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} />);
      const checkbox = getCheckboxDiv(container);
      expect(checkbox).toBeInTheDocument();
      expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    });

    it('applies custom className to label', () => {
      const { container } = render(
        <CheckboxGlass checked={false} onChange={vi.fn()} className="custom-class" />
      );
      const label = container.querySelector('label');
      expect(label).toHaveClass('custom-class');
    });

    it('renders with correct ARIA attributes', () => {
      const { container } = render(<CheckboxGlass checked={true} onChange={vi.fn()} label="Checkbox" />);
      const checkbox = getCheckboxDiv(container);
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
      expect(checkbox).toHaveAttribute('aria-label', 'Checkbox');
    });

    it('uses aria-label from label prop', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} label="Custom Label" />);
      const checkbox = getCheckboxDiv(container);
      expect(checkbox).toHaveAttribute('aria-label', 'Custom Label');
    });

    it('has default aria-label when no label provided', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} />);
      const checkbox = getCheckboxDiv(container);
      expect(checkbox).toHaveAttribute('aria-label', 'Checkbox');
    });
  });

  describe('Checked State', () => {
    it('renders unchecked state correctly', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} />);
      const checkbox = getCheckboxDiv(container);
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    it('renders checked state correctly', () => {
      const { container } = render(<CheckboxGlass checked={true} onChange={vi.fn()} />);
      const checkbox = getCheckboxDiv(container);
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    it('displays check icon when checked', () => {
      const { container } = render(<CheckboxGlass checked={true} onChange={vi.fn()} />);
      const checkIcon = container.querySelector('svg');
      expect(checkIcon).toBeInTheDocument();
    });

    it('does not display check icon when unchecked', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} />);
      const checkIcon = container.querySelector('svg');
      expect(checkIcon).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls onChange with true when unchecked checkbox is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(<CheckboxGlass checked={false} onChange={handleChange} />);

      const checkbox = getCheckboxDiv(container);
      await user.click(checkbox);

      // Called twice: once by div onClick, once by label propagation to input onChange
      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange with false when checked checkbox is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(<CheckboxGlass checked={true} onChange={handleChange} />);

      const checkbox = getCheckboxDiv(container);
      await user.click(checkbox);

      // Called twice: once by div onClick, once by label propagation to input onChange
      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('toggles on label click', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<CheckboxGlass checked={false} onChange={handleChange} label="Click me" />);

      const label = screen.getByText('Click me');
      await user.click(label);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('toggles on Enter key press', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(<CheckboxGlass checked={false} onChange={handleChange} />);

      const checkbox = getCheckboxDiv(container);
      checkbox.focus();
      await user.keyboard('{Enter}');

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('toggles on Space key press', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(<CheckboxGlass checked={false} onChange={handleChange} />);

      const checkbox = getCheckboxDiv(container);
      checkbox.focus();
      await user.keyboard(' ');

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('does not toggle on other key press', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(<CheckboxGlass checked={false} onChange={handleChange} />);

      const checkbox = getCheckboxDiv(container);
      checkbox.focus();
      await user.keyboard('a');

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('renders disabled state correctly', () => {
      const { container } = render(
        <CheckboxGlass checked={false} onChange={vi.fn()} disabled />
      );
      const label = container.querySelector('label');
      expect(label).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('does not call onChange when disabled and clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(<CheckboxGlass checked={false} onChange={handleChange} disabled />);

      const checkbox = getCheckboxDiv(container);
      await user.click(checkbox);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when disabled and Enter pressed', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(<CheckboxGlass checked={false} onChange={handleChange} disabled />);

      const checkbox = getCheckboxDiv(container);
      checkbox.focus();
      await user.keyboard('{Enter}');

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when disabled and Space pressed', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(<CheckboxGlass checked={false} onChange={handleChange} disabled />);

      const checkbox = getCheckboxDiv(container);
      checkbox.focus();
      await user.keyboard(' ');

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('sets tabIndex to -1 when disabled', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} disabled />);
      const checkbox = getCheckboxDiv(container);
      expect(checkbox).toHaveAttribute('tabIndex', '-1');
    });

    it('sets tabIndex to 0 when not disabled', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} />);
      const checkbox = getCheckboxDiv(container);
      expect(checkbox).toHaveAttribute('tabIndex', '0');
    });

    it('disables native input when disabled prop is true', () => {
      const { container } = render(
        <CheckboxGlass checked={false} onChange={vi.fn()} disabled />
      );
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeDisabled();
    });
  });

  describe('Optional onChange', () => {
    it('renders without onChange prop', () => {
      expect(() => {
        render(<CheckboxGlass checked={false} />);
      }).not.toThrow();
    });

    it('does not throw error when clicked without onChange', async () => {
      const user = userEvent.setup();
      const { container } = render(<CheckboxGlass checked={false} />);

      const checkbox = getCheckboxDiv(container);

      expect(async () => {
        await user.click(checkbox);
      }).not.toThrow();
    });

    it('does not throw error on keyboard interaction without onChange', async () => {
      const user = userEvent.setup();
      const { container } = render(<CheckboxGlass checked={false} />);

      const checkbox = getCheckboxDiv(container);
      checkbox.focus();

      expect(async () => {
        await user.keyboard('{Enter}');
      }).not.toThrow();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to input element', () => {
      const ref = { current: null } as React.RefObject<HTMLInputElement>;
      render(<CheckboxGlass ref={ref} checked={false} onChange={vi.fn()} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect((ref.current as HTMLInputElement).type).toBe('checkbox');
    });

    it('allows ref methods to be called', () => {
      const ref = { current: null } as React.RefObject<HTMLInputElement>;
      render(<CheckboxGlass ref={ref} checked={false} onChange={vi.fn()} />);

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        (ref.current as HTMLInputElement).focus();
        expect(document.activeElement).toBe(ref.current);
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to input', () => {
      const { container } = render(
        <CheckboxGlass
          checked={false}
          onChange={vi.fn()}
          data-testid="custom-checkbox"
          aria-describedby="description"
        />
      );

      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveAttribute('data-testid', 'custom-checkbox');
      expect(input).toHaveAttribute('aria-describedby', 'description');
    });

    it('applies id attribute correctly', () => {
      const { container } = render(
        <CheckboxGlass checked={false} onChange={vi.fn()} id="my-checkbox" />
      );

      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveAttribute('id', 'my-checkbox');
    });

    it('applies name attribute correctly', () => {
      const { container } = render(
        <CheckboxGlass checked={false} onChange={vi.fn()} name="agree-terms" />
      );

      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveAttribute('name', 'agree-terms');
    });
  });

  describe('Theme Styling', () => {
    it('applies glass theme CSS variables when unchecked', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} />);
      const checkboxDiv = getCheckboxDiv(container);

      expect(checkboxDiv).toHaveStyle({
        background: 'var(--checkbox-bg)',
      });
    });

    it('applies checked theme CSS variables when checked', () => {
      const { container } = render(<CheckboxGlass checked={true} onChange={vi.fn()} />);
      const checkboxDiv = getCheckboxDiv(container);

      expect(checkboxDiv).toHaveStyle({
        background: 'var(--checkbox-checked-bg)',
      });
    });
  });
});
