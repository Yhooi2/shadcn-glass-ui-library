import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleGlass } from '../toggle-glass';

describe('ToggleGlass', () => {
  describe('Rendering', () => {
    it('renders toggle with label', () => {
      render(<ToggleGlass checked={false} onChange={vi.fn()} label="Test Label" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders toggle without label', () => {
      render(<ToggleGlass checked={false} onChange={vi.fn()} />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
      expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    });

    it('applies custom className to toggle without label', () => {
      render(<ToggleGlass checked={false} onChange={vi.fn()} className="custom-class" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('custom-class');
    });

    it('applies custom className to label wrapper when label is provided', () => {
      const { container } = render(
        <ToggleGlass checked={false} onChange={vi.fn()} label="Label" className="custom-class" />
      );
      const label = container.querySelector('label');
      expect(label).toHaveClass('custom-class');
    });

    it('renders with correct ARIA attributes', () => {
      render(<ToggleGlass checked={true} onChange={vi.fn()} label="Toggle" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'true');
      expect(toggle).toHaveAttribute('aria-label', 'Toggle');
    });

    it('uses aria-label from label prop', () => {
      render(<ToggleGlass checked={false} onChange={vi.fn()} label="Custom Label" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-label', 'Custom Label');
    });

    it('has default aria-label when no label provided', () => {
      render(<ToggleGlass checked={false} onChange={vi.fn()} />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-label', 'Toggle switch');
    });
  });

  describe('Checked State', () => {
    it('renders unchecked state correctly', () => {
      render(<ToggleGlass checked={false} onChange={vi.fn()} />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    it('renders checked state correctly', () => {
      render(<ToggleGlass checked={true} onChange={vi.fn()} />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('displays knob in left position when unchecked', () => {
      const { container } = render(<ToggleGlass checked={false} onChange={vi.fn()} />);
      const knob = container.querySelector('button > div.rounded-full');
      expect(knob).not.toHaveClass('translate-x-5');
    });

    it('displays knob in right position when checked', () => {
      const { container } = render(<ToggleGlass checked={true} onChange={vi.fn()} />);
      const knob = container.querySelector('button > div.rounded-full');
      expect(knob).toHaveClass('translate-x-5');
    });
  });

  describe('Size Variants', () => {
    it('renders small size', () => {
      render(<ToggleGlass checked={false} onChange={vi.fn()} size="sm" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<ToggleGlass checked={false} onChange={vi.fn()} />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<ToggleGlass checked={false} onChange={vi.fn()} size="lg" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
    });

    it('applies correct knob translate for small size when checked', () => {
      const { container } = render(<ToggleGlass checked={true} onChange={vi.fn()} size="sm" />);
      const knob = container.querySelector('button > div.rounded-full');
      expect(knob).toHaveClass('translate-x-4');
    });

    it('applies correct knob translate for medium size when checked', () => {
      const { container } = render(<ToggleGlass checked={true} onChange={vi.fn()} size="md" />);
      const knob = container.querySelector('button > div.rounded-full');
      expect(knob).toHaveClass('translate-x-5');
    });

    it('applies correct knob translate for large size when checked', () => {
      const { container } = render(<ToggleGlass checked={true} onChange={vi.fn()} size="lg" />);
      const knob = container.querySelector('button > div.rounded-full');
      expect(knob).toHaveClass('translate-x-7');
    });
  });

  describe('User Interactions', () => {
    it('calls onChange with true when unchecked toggle is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ToggleGlass checked={false} onChange={handleChange} />);

      const toggle = screen.getByRole('switch');
      await user.click(toggle);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange with false when checked toggle is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ToggleGlass checked={true} onChange={handleChange} />);

      const toggle = screen.getByRole('switch');
      await user.click(toggle);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('toggles when label is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ToggleGlass checked={false} onChange={handleChange} label="Click me" />);

      const label = screen.getByText('Click me');
      await user.click(label);

      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Disabled State', () => {
    it('renders disabled state correctly', () => {
      render(<ToggleGlass checked={false} onChange={vi.fn()} disabled />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeDisabled();
      expect(toggle).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('does not call onChange when disabled and clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ToggleGlass checked={false} onChange={handleChange} disabled />);

      const toggle = screen.getByRole('switch');
      await user.click(toggle);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('applies disabled styles to label wrapper when label is provided', () => {
      const { container } = render(
        <ToggleGlass checked={false} onChange={vi.fn()} label="Label" disabled />
      );
      const label = container.querySelector('label');
      expect(label).toHaveClass('opacity-50', 'cursor-not-allowed');
    });
  });

  describe('Optional onChange', () => {
    it('renders without onChange prop', () => {
      expect(() => {
        render(<ToggleGlass checked={false} />);
      }).not.toThrow();
    });

    it('does not throw error when clicked without onChange', async () => {
      const user = userEvent.setup();
      render(<ToggleGlass checked={false} />);

      const toggle = screen.getByRole('switch');

      expect(async () => {
        await user.click(toggle);
      }).not.toThrow();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to button element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<ToggleGlass ref={ref} checked={false} onChange={vi.fn()} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('allows ref methods to be called', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<ToggleGlass ref={ref} checked={false} onChange={vi.fn()} />);

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        (ref.current as HTMLButtonElement).focus();
        expect(document.activeElement).toBe(ref.current);
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to button', () => {
      render(
        <ToggleGlass
          checked={false}
          onChange={vi.fn()}
          data-testid="custom-toggle"
          aria-describedby="description"
        />
      );

      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('data-testid', 'custom-toggle');
      expect(toggle).toHaveAttribute('aria-describedby', 'description');
    });

    it('applies id attribute correctly', () => {
      render(<ToggleGlass checked={false} onChange={vi.fn()} id="my-toggle" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('id', 'my-toggle');
    });
  });

  describe('Theme Styling', () => {
    it('applies glass theme CSS variables when unchecked', () => {
      render(<ToggleGlass checked={false} onChange={vi.fn()} />);
      const toggle = screen.getByRole('switch');

      expect(toggle).toHaveStyle({
        background: 'var(--toggle-bg)',
      });
    });

    it('applies active theme CSS variables when checked', () => {
      render(<ToggleGlass checked={true} onChange={vi.fn()} />);
      const toggle = screen.getByRole('switch');

      expect(toggle).toHaveStyle({
        background: 'var(--toggle-active-bg)',
      });
    });

    it('applies knob CSS variables', () => {
      const { container } = render(<ToggleGlass checked={false} onChange={vi.fn()} />);
      const knob = container.querySelector('button > div.rounded-full') as HTMLElement;

      expect(knob).toHaveStyle({
        background: 'var(--toggle-knob)',
      });
    });
  });
});
