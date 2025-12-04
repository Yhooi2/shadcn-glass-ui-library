import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SliderGlass } from '../slider-glass';

describe('SliderGlass', () => {
  describe('Rendering', () => {
    it('renders slider with label', () => {
      render(<SliderGlass value={50} onChange={vi.fn()} label="Volume" />);
      expect(screen.getByText('Volume')).toBeInTheDocument();
    });

    it('renders slider without label', () => {
      render(<SliderGlass value={50} onChange={vi.fn()} />);
      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();
    });

    it('shows value when showValue is true', () => {
      render(<SliderGlass value={75} onChange={vi.fn()} showValue />);
      expect(screen.getByText('75')).toBeInTheDocument();
    });

    it('shows both label and value', () => {
      render(<SliderGlass value={30} onChange={vi.fn()} label="Brightness" showValue />);
      expect(screen.getByText('Brightness')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <SliderGlass value={50} onChange={vi.fn()} className="custom-class" />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('Value and Range', () => {
    it('renders with correct initial value', () => {
      render(<SliderGlass value={60} onChange={vi.fn()} />);
      const slider = screen.getByRole('slider') as HTMLInputElement;
      expect(slider.value).toBe('60');
    });

    it('uses default min/max values (0-100)', () => {
      render(<SliderGlass value={50} onChange={vi.fn()} />);
      const slider = screen.getByRole('slider') as HTMLInputElement;
      expect(slider.min).toBe('0');
      expect(slider.max).toBe('100');
    });

    it('respects custom min/max values', () => {
      render(<SliderGlass value={50} onChange={vi.fn()} min={10} max={200} />);
      const slider = screen.getByRole('slider') as HTMLInputElement;
      expect(slider.min).toBe('10');
      expect(slider.max).toBe('200');
    });

    it('respects step value', () => {
      render(<SliderGlass value={50} onChange={vi.fn()} step={5} />);
      const slider = screen.getByRole('slider') as HTMLInputElement;
      expect(slider.step).toBe('5');
    });

    it('uses default step value of 1', () => {
      render(<SliderGlass value={50} onChange={vi.fn()} />);
      const slider = screen.getByRole('slider') as HTMLInputElement;
      expect(slider.step).toBe('1');
    });
  });

  describe('ARIA Attributes', () => {
    it('has correct ARIA attributes with label', () => {
      render(<SliderGlass value={50} onChange={vi.fn()} label="Volume" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-label', 'Volume');
      expect(slider).toHaveAttribute('aria-valuenow', '50');
      expect(slider).toHaveAttribute('aria-valuemin', '0');
      expect(slider).toHaveAttribute('aria-valuemax', '100');
    });

    it('has default ARIA label when no label provided', () => {
      render(<SliderGlass value={50} onChange={vi.fn()} min={0} max={100} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-label', 'Slider: 50 (0-100)');
    });

    it('has correct aria-valuetext', () => {
      render(<SliderGlass value={75} onChange={vi.fn()} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuetext', '75');
    });
  });

  describe('User Interactions', () => {
    it('has accessible slider input', () => {
      render(<SliderGlass value={50} onChange={vi.fn()} />);
      const slider = screen.getByRole('slider') as HTMLInputElement;
      expect(slider).toBeInTheDocument();
      expect(slider.type).toBe('range');
    });
  });

  describe('Disabled State', () => {
    it('renders disabled state', () => {
      render(<SliderGlass value={50} onChange={vi.fn()} disabled />);
      const slider = screen.getByRole('slider');
      expect(slider).toBeDisabled();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to input element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<SliderGlass ref={ref} value={50} onChange={vi.fn()} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect((ref.current as HTMLInputElement).type).toBe('range');
    });

    it('allows ref methods to be called', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<SliderGlass ref={ref} value={50} onChange={vi.fn()} />);

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        (ref.current as HTMLInputElement).focus();
        expect(document.activeElement).toBe(ref.current);
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to input', () => {
      render(
        <SliderGlass
          value={50}
          onChange={vi.fn()}
          data-testid="custom-slider"
          aria-describedby="description"
        />
      );

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('data-testid', 'custom-slider');
      expect(slider).toHaveAttribute('aria-describedby', 'description');
    });

    it('applies id attribute correctly', () => {
      render(<SliderGlass value={50} onChange={vi.fn()} id="my-slider" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('id', 'my-slider');
    });
  });

  describe('Visual Elements', () => {
    it('renders track element', () => {
      const { container } = render(<SliderGlass value={50} onChange={vi.fn()} />);
      const track = container.querySelector('.rounded-full');
      expect(track).toBeInTheDocument();
    });

    it('calculates percentage correctly', () => {
      const { container } = render(<SliderGlass value={25} onChange={vi.fn()} min={0} max={100} />);
      // Fill should be 25% wide
      const fill = container.querySelectorAll('.rounded-full')[1] as HTMLElement;
      expect(fill).toHaveStyle({ width: '25%' });
    });

    it('calculates percentage with custom range', () => {
      const { container } = render(<SliderGlass value={15} onChange={vi.fn()} min={10} max={20} />);
      // Value 15 in range 10-20 is 50%
      const fill = container.querySelectorAll('.rounded-full')[1] as HTMLElement;
      expect(fill).toHaveStyle({ width: '50%' });
    });
  });

  describe('Theme Styling', () => {
    it('applies track CSS variables', () => {
      const { container } = render(<SliderGlass value={50} onChange={vi.fn()} />);
      const track = container.querySelector('.rounded-full') as HTMLElement;
      expect(track).toHaveStyle({
        background: 'var(--slider-track)',
      });
    });

    it('applies fill CSS variables', () => {
      const { container } = render(<SliderGlass value={50} onChange={vi.fn()} />);
      const fill = container.querySelectorAll('.rounded-full')[1] as HTMLElement;
      expect(fill).toHaveStyle({
        background: 'var(--slider-fill)',
      });
    });
  });
});
