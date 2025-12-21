import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleGlass } from '../toggle-glass';

describe('ToggleGlass', () => {
  describe('Rendering', () => {
    it('renders toggle with label', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} label="Test Label" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders toggle without label', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
      expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    });

    it('applies custom className to toggle without label', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} className="custom-class" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('custom-class');
    });

    it('applies custom className to toggle even with label (shadcn/ui pattern)', () => {
      render(
        <ToggleGlass
          pressed={false}
          onPressedChange={vi.fn()}
          label="Label"
          className="custom-class"
        />
      );
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('custom-class');
    });

    it('applies wrapperClassName to label wrapper when label is provided', () => {
      const { container } = render(
        <ToggleGlass
          pressed={false}
          onPressedChange={vi.fn()}
          label="Label"
          wrapperClassName="wrapper-class"
        />
      );
      const label = container.querySelector('label');
      expect(label).toHaveClass('wrapper-class');
    });

    it('applies both className and wrapperClassName correctly with label', () => {
      const { container } = render(
        <ToggleGlass
          pressed={false}
          onPressedChange={vi.fn()}
          label="Label"
          className="toggle-class"
          wrapperClassName="wrapper-class"
        />
      );
      const toggle = screen.getByRole('switch');
      const label = container.querySelector('label');
      expect(toggle).toHaveClass('toggle-class');
      expect(label).toHaveClass('wrapper-class');
    });

    it('renders with correct ARIA attributes (aria-pressed)', () => {
      render(<ToggleGlass pressed={true} onPressedChange={vi.fn()} label="Toggle" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-pressed', 'true');
      expect(toggle).toHaveAttribute('aria-label', 'Toggle');
    });

    it('uses aria-label from label prop', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} label="Custom Label" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-label', 'Custom Label');
    });

    it('has default aria-label when no label provided', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-label', 'Toggle switch');
    });
  });

  describe('Pressed State (shadcn/ui compatible)', () => {
    it('renders unpressed state correctly', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-pressed', 'false');
    });

    it('renders pressed state correctly', () => {
      render(<ToggleGlass pressed={true} onPressedChange={vi.fn()} />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-pressed', 'true');
    });

    it('displays knob in left position when unpressed', () => {
      const { container } = render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} />);
      const knob = container.querySelector('button > div.rounded-full');
      expect(knob).not.toHaveClass('translate-x-5');
    });

    it('displays knob in right position when pressed', () => {
      const { container } = render(<ToggleGlass pressed={true} onPressedChange={vi.fn()} />);
      const knob = container.querySelector('button > div.rounded-full');
      expect(knob).toHaveClass('translate-x-5');
    });
  });

  describe('Size Variants (shadcn/ui compatible)', () => {
    it('renders small size', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} size="sm" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
    });

    it('renders default size', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} size="default" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} size="lg" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
    });

    it('applies correct knob translate for small size when pressed', () => {
      const { container } = render(
        <ToggleGlass pressed={true} onPressedChange={vi.fn()} size="sm" />
      );
      const knob = container.querySelector('button > div.rounded-full');
      expect(knob).toHaveClass('translate-x-4');
    });

    it('applies correct knob translate for default size when pressed', () => {
      const { container } = render(
        <ToggleGlass pressed={true} onPressedChange={vi.fn()} size="default" />
      );
      const knob = container.querySelector('button > div.rounded-full');
      expect(knob).toHaveClass('translate-x-5');
    });

    it('applies correct knob translate for large size when pressed', () => {
      const { container } = render(
        <ToggleGlass pressed={true} onPressedChange={vi.fn()} size="lg" />
      );
      const knob = container.querySelector('button > div.rounded-full');
      expect(knob).toHaveClass('translate-x-7');
    });
  });

  describe('Variant Types (shadcn/ui compatible)', () => {
    it('renders default variant', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} variant="default" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
    });

    it('renders outline variant', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} variant="outline" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('border-2');
    });
  });

  describe('User Interactions', () => {
    it('calls onPressedChange with true when unpressed toggle is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ToggleGlass pressed={false} onPressedChange={handleChange} />);

      const toggle = screen.getByRole('switch');
      await user.click(toggle);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('calls onPressedChange with false when pressed toggle is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ToggleGlass pressed={true} onPressedChange={handleChange} />);

      const toggle = screen.getByRole('switch');
      await user.click(toggle);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('toggles when label is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ToggleGlass pressed={false} onPressedChange={handleChange} label="Click me" />);

      const label = screen.getByText('Click me');
      await user.click(label);

      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Disabled State', () => {
    it('renders disabled state correctly', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} disabled />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeDisabled();
      expect(toggle).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('does not call onPressedChange when disabled and clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ToggleGlass pressed={false} onPressedChange={handleChange} disabled />);

      const toggle = screen.getByRole('switch');
      await user.click(toggle);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('applies disabled styles to label wrapper when label is provided', () => {
      const { container } = render(
        <ToggleGlass pressed={false} onPressedChange={vi.fn()} label="Label" disabled />
      );
      const label = container.querySelector('label');
      expect(label).toHaveClass('opacity-50', 'cursor-not-allowed');
    });
  });

  describe('Uncontrolled Mode (defaultPressed)', () => {
    it('renders with defaultPressed=false', () => {
      render(<ToggleGlass defaultPressed={false} />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-pressed', 'false');
    });

    it('renders with defaultPressed=true', () => {
      render(<ToggleGlass defaultPressed={true} />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-pressed', 'true');
    });

    it('toggles internal state when clicked in uncontrolled mode', async () => {
      const user = userEvent.setup();
      render(<ToggleGlass defaultPressed={false} />);

      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-pressed', 'false');

      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-pressed', 'true');
    });

    it('calls onPressedChange even in uncontrolled mode', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ToggleGlass defaultPressed={false} onPressedChange={handleChange} />);

      const toggle = screen.getByRole('switch');
      await user.click(toggle);

      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to button element', () => {
      const ref = { current: null } as React.RefObject<HTMLButtonElement>;
      render(<ToggleGlass ref={ref} pressed={false} onPressedChange={vi.fn()} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('allows ref methods to be called', () => {
      const ref = { current: null } as React.RefObject<HTMLButtonElement>;
      render(<ToggleGlass ref={ref} pressed={false} onPressedChange={vi.fn()} />);

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        ref.current.focus();
        expect(document.activeElement).toBe(ref.current);
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to button', () => {
      render(
        <ToggleGlass
          pressed={false}
          onPressedChange={vi.fn()}
          data-testid="custom-toggle"
          aria-describedby="description"
        />
      );

      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('data-testid', 'custom-toggle');
      expect(toggle).toHaveAttribute('aria-describedby', 'description');
    });

    it('applies id attribute correctly', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} id="my-toggle" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('id', 'my-toggle');
    });
  });

  describe('Theme Styling', () => {
    it('applies glass theme CSS variables when unpressed', () => {
      render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} />);
      const toggle = screen.getByRole('switch');

      expect(toggle).toHaveStyle({
        background: 'var(--toggle-bg)',
      });
    });

    it('applies active theme CSS variables when pressed', () => {
      render(<ToggleGlass pressed={true} onPressedChange={vi.fn()} />);
      const toggle = screen.getByRole('switch');

      expect(toggle).toHaveStyle({
        background: 'var(--toggle-active-bg)',
      });
    });

    it('applies knob CSS variables', () => {
      const { container } = render(<ToggleGlass pressed={false} onPressedChange={vi.fn()} />);
      const knob = container.querySelector('button > div.rounded-full') as HTMLElement;

      expect(knob).toHaveStyle({
        background: 'var(--toggle-knob)',
      });
    });
  });
});
