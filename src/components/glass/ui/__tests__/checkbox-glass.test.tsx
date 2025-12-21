import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxGlass } from '../checkbox-glass';

// Helper function to get the Radix checkbox button
const getCheckboxButton = (container: HTMLElement) => {
  return container.querySelector('button[role="checkbox"]') as HTMLElement;
};

describe('CheckboxGlass', () => {
  describe('Rendering', () => {
    it('renders checkbox with label', () => {
      render(<CheckboxGlass checked={false} onChange={vi.fn()} label="Test Label" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders checkbox without label', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} />);
      const checkbox = getCheckboxButton(container);
      expect(checkbox).toBeInTheDocument();
      expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    });

    it('applies custom className to checkbox root (shadcn/ui pattern)', () => {
      const { container } = render(
        <CheckboxGlass checked={false} onChange={vi.fn()} className="custom-class" />
      );
      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveClass('custom-class');
    });

    it('applies wrapperClassName to label wrapper', () => {
      const { container } = render(
        <CheckboxGlass checked={false} onChange={vi.fn()} wrapperClassName="wrapper-class" />
      );
      const label = container.querySelector('label');
      expect(label).toHaveClass('wrapper-class');
    });

    it('applies both className and wrapperClassName correctly', () => {
      const { container } = render(
        <CheckboxGlass
          checked={false}
          onChange={vi.fn()}
          className="checkbox-class"
          wrapperClassName="wrapper-class"
          label="Test"
        />
      );
      const checkbox = getCheckboxButton(container);
      const label = container.querySelector('label');
      expect(checkbox).toHaveClass('checkbox-class');
      expect(label).toHaveClass('wrapper-class');
    });

    it('renders with correct data-state attribute when checked', () => {
      const { container } = render(
        <CheckboxGlass checked={true} onChange={vi.fn()} label="Checkbox" />
      );
      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveAttribute('data-state', 'checked');
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    it('renders with correct data-state attribute when unchecked', () => {
      const { container } = render(
        <CheckboxGlass checked={false} onChange={vi.fn()} label="Checkbox" />
      );
      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveAttribute('data-state', 'unchecked');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    it('has data-slot attribute for shadcn/ui v4 compatibility', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} />);
      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveAttribute('data-slot', 'checkbox');
    });
  });

  describe('Checked State', () => {
    it('renders unchecked state correctly', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} />);
      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    });

    it('renders checked state correctly', () => {
      const { container } = render(<CheckboxGlass checked={true} onChange={vi.fn()} />);
      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveAttribute('data-state', 'checked');
    });

    it('renders indeterminate state correctly', () => {
      const { container } = render(<CheckboxGlass checked="indeterminate" onChange={vi.fn()} />);
      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
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

      const checkbox = getCheckboxButton(container);
      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange with false when checked checkbox is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(<CheckboxGlass checked={true} onChange={handleChange} />);

      const checkbox = getCheckboxButton(container);
      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('calls onCheckedChange (shadcn/ui API)', async () => {
      const user = userEvent.setup();
      const handleCheckedChange = vi.fn();
      const { container } = render(
        <CheckboxGlass checked={false} onCheckedChange={handleCheckedChange} />
      );

      const checkbox = getCheckboxButton(container);
      await user.click(checkbox);

      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });

    it('toggles on label click', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<CheckboxGlass checked={false} onChange={handleChange} label="Click me" />);

      const label = screen.getByText('Click me');
      await user.click(label);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('toggles on Space key press (WCAG standard)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(<CheckboxGlass checked={false} onChange={handleChange} />);

      const checkbox = getCheckboxButton(container);
      checkbox.focus();
      await user.keyboard(' ');

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('does not toggle on Enter key press (WCAG standard for checkboxes)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(<CheckboxGlass checked={false} onChange={handleChange} />);

      const checkbox = getCheckboxButton(container);
      checkbox.focus();
      await user.keyboard('{Enter}');

      // Radix checkbox does NOT respond to Enter per WCAG
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not toggle on other key press', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(<CheckboxGlass checked={false} onChange={handleChange} />);

      const checkbox = getCheckboxButton(container);
      checkbox.focus();
      await user.keyboard('a');

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('renders disabled state correctly', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} disabled />);
      const label = container.querySelector('label');
      expect(label).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('has disabled attribute on button', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} disabled />);
      const checkbox = getCheckboxButton(container);
      expect(checkbox).toBeDisabled();
    });

    it('has data-disabled attribute', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} disabled />);
      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveAttribute('data-disabled');
    });

    it('does not call onChange when disabled and clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(
        <CheckboxGlass checked={false} onChange={handleChange} disabled />
      );

      const checkbox = getCheckboxButton(container);
      await user.click(checkbox);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when disabled and Space pressed', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(
        <CheckboxGlass checked={false} onChange={handleChange} disabled />
      );

      const checkbox = getCheckboxButton(container);
      checkbox.focus();
      await user.keyboard(' ');

      expect(handleChange).not.toHaveBeenCalled();
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

      const checkbox = getCheckboxButton(container);

      await expect(user.click(checkbox)).resolves.not.toThrow();
    });

    it('does not throw error on keyboard interaction without onChange', async () => {
      const user = userEvent.setup();
      const { container } = render(<CheckboxGlass checked={false} />);

      const checkbox = getCheckboxButton(container);
      checkbox.focus();

      await expect(user.keyboard(' ')).resolves.not.toThrow();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to button element (Radix primitive)', () => {
      const ref = { current: null } as React.RefObject<HTMLButtonElement | null>;
      render(<CheckboxGlass ref={ref} checked={false} onChange={vi.fn()} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveAttribute('role', 'checkbox');
    });

    it('allows ref methods to be called', () => {
      const ref = { current: null } as React.RefObject<HTMLButtonElement | null>;
      render(<CheckboxGlass ref={ref} checked={false} onChange={vi.fn()} />);

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        ref.current.focus();
        expect(document.activeElement).toBe(ref.current);
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to button', () => {
      const { container } = render(
        <CheckboxGlass
          checked={false}
          onChange={vi.fn()}
          data-testid="custom-checkbox"
          aria-describedby="description"
        />
      );

      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveAttribute('data-testid', 'custom-checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'description');
    });

    it('applies id attribute correctly', () => {
      const { container } = render(
        <CheckboxGlass checked={false} onChange={vi.fn()} id="my-checkbox" />
      );

      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveAttribute('id', 'my-checkbox');
    });

    it('accepts name prop for form submission', () => {
      // Radix Checkbox creates a hidden input with name for form submission
      // We just verify the component renders without errors when name is provided
      expect(() => {
        render(<CheckboxGlass checked={false} onChange={vi.fn()} name="agree-terms" />);
      }).not.toThrow();
    });

    it('applies value attribute correctly', () => {
      const { container } = render(
        <CheckboxGlass checked={false} onChange={vi.fn()} value="yes" />
      );

      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveAttribute('value', 'yes');
    });

    it('applies required attribute correctly', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} required />);

      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Theme Styling', () => {
    it('has correct inline styles for unchecked state', () => {
      const { container } = render(<CheckboxGlass checked={false} onChange={vi.fn()} />);
      const checkbox = getCheckboxButton(container);

      // Inline styles with CSS variables for unchecked state
      expect(checkbox).toHaveStyle({ background: 'var(--checkbox-bg)' });
      expect(checkbox.style.borderColor).toBe('var(--checkbox-border)');
    });

    it('has correct inline styles for checked state', () => {
      const { container } = render(<CheckboxGlass checked={true} onChange={vi.fn()} />);
      const checkbox = getCheckboxButton(container);

      // Radix sets data-state for CSS styling
      expect(checkbox).toHaveAttribute('data-state', 'checked');
      // Inline styles with CSS variables for checked state
      expect(checkbox).toHaveStyle({ background: 'var(--checkbox-checked-bg)' });
      expect(checkbox.style.borderColor).toBe('var(--checkbox-checked-bg)');
    });
  });

  describe('Uncontrolled Mode', () => {
    it('works in uncontrolled mode with defaultChecked', async () => {
      const user = userEvent.setup();
      const { container } = render(<CheckboxGlass defaultChecked={true} />);

      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveAttribute('data-state', 'checked');

      await user.click(checkbox);
      expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    });

    it('starts unchecked by default in uncontrolled mode', () => {
      const { container } = render(<CheckboxGlass />);

      const checkbox = getCheckboxButton(container);
      expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    });
  });
});
