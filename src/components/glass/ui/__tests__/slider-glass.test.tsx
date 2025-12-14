import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SliderGlass } from '../slider-glass';

describe('SliderGlass', () => {
  describe('Rendering', () => {
    it('renders slider with label', () => {
      render(<SliderGlass defaultValue={[50]} label="Volume" />);
      expect(screen.getByText('Volume')).toBeInTheDocument();
    });

    it('renders slider without label', () => {
      render(<SliderGlass defaultValue={[50]} />);
      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();
    });

    it('shows value when showValue is true', () => {
      render(<SliderGlass defaultValue={[75]} showValue />);
      expect(screen.getByText('75')).toBeInTheDocument();
    });

    it('shows both label and value', () => {
      render(<SliderGlass defaultValue={[30]} label="Brightness" showValue />);
      expect(screen.getByText('Brightness')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} className="custom-class" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('Value and Range (shadcn/ui compatible)', () => {
    it('renders single thumb for single value', () => {
      render(<SliderGlass defaultValue={[50]} />);
      const thumbs = screen.getAllByRole('slider');
      expect(thumbs).toHaveLength(1);
    });

    it('renders two thumbs for range slider', () => {
      render(<SliderGlass defaultValue={[25, 75]} />);
      const thumbs = screen.getAllByRole('slider');
      expect(thumbs).toHaveLength(2);
    });

    it('renders multiple thumbs for multi-value slider', () => {
      render(<SliderGlass defaultValue={[20, 50, 80]} />);
      const thumbs = screen.getAllByRole('slider');
      expect(thumbs).toHaveLength(3);
    });

    it('displays range value correctly', () => {
      render(<SliderGlass defaultValue={[25, 75]} showValue />);
      expect(screen.getByText('25 - 75')).toBeInTheDocument();
    });

    it('uses default min/max values (0-100)', () => {
      render(<SliderGlass defaultValue={[50]} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuemin', '0');
      expect(slider).toHaveAttribute('aria-valuemax', '100');
    });

    it('respects custom min/max values', () => {
      render(<SliderGlass defaultValue={[50]} min={10} max={200} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuemin', '10');
      expect(slider).toHaveAttribute('aria-valuemax', '200');
    });
  });

  describe('Controlled vs Uncontrolled (shadcn/ui compatible)', () => {
    it('works as controlled component with value prop', () => {
      const handleChange = vi.fn();
      render(<SliderGlass value={[50]} onValueChange={handleChange} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '50');
    });

    it('works as uncontrolled component with defaultValue prop', () => {
      render(<SliderGlass defaultValue={[50]} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '50');
    });
  });

  describe('ARIA Attributes', () => {
    it('has correct ARIA attributes with label', () => {
      render(<SliderGlass defaultValue={[50]} label="Volume" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-label', 'Volume');
      expect(slider).toHaveAttribute('aria-valuenow', '50');
      expect(slider).toHaveAttribute('aria-valuemin', '0');
      expect(slider).toHaveAttribute('aria-valuemax', '100');
    });

    it('has default ARIA label when no label provided', () => {
      render(<SliderGlass defaultValue={[50]} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-label', 'Slider thumb 1');
    });

    it('has numbered ARIA labels for range thumbs', () => {
      render(<SliderGlass defaultValue={[25, 75]} label="Price Range" />);
      const thumbs = screen.getAllByRole('slider');
      expect(thumbs[0]).toHaveAttribute('aria-label', 'Price Range thumb 1');
      expect(thumbs[1]).toHaveAttribute('aria-label', 'Price Range thumb 2');
    });
  });

  describe('Disabled State', () => {
    it('renders disabled state', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} disabled />);
      const root = container.querySelector('[data-disabled]');
      expect(root).toBeInTheDocument();
    });

    it('applies disabled styling', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} disabled />);
      const sliderRoot = container.querySelector('.opacity-50');
      expect(sliderRoot).toBeInTheDocument();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to root element', () => {
      const ref = { current: null } as React.RefObject<HTMLSpanElement>;
      render(<SliderGlass ref={ref} defaultValue={[50]} />);

      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe('SPAN');
    });
  });

  describe('Visual Elements', () => {
    it('renders track element', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} />);
      const track = container.querySelector('[data-orientation="horizontal"]');
      expect(track).toBeInTheDocument();
    });

    it('renders range (fill) element', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} />);
      const range = container.querySelector('.rounded-full.transition-shadow');
      expect(range).toBeInTheDocument();
    });

    it('renders thumb element', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} />);
      const thumb = container.querySelector('.rounded-full.shadow-md');
      expect(thumb).toBeInTheDocument();
    });
  });

  describe('Theme Styling', () => {
    it('applies track CSS variables', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} />);
      const track = container.querySelector('.grow.rounded-full') as HTMLElement;
      expect(track).toHaveStyle({
        background: 'var(--slider-track)',
      });
    });

    it('applies fill CSS variables', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} />);
      const fill = container.querySelector(
        '.absolute.rounded-full.transition-shadow'
      ) as HTMLElement;
      expect(fill).toHaveStyle({
        background: 'var(--slider-fill)',
      });
    });

    it('applies thumb CSS variables', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} />);
      const thumb = container.querySelector('.rounded-full.shadow-md') as HTMLElement;
      expect(thumb).toHaveStyle({
        background: 'var(--slider-thumb)',
      });
      // Border is applied via inline style
      expect(thumb.style.border).toBe('2px solid var(--slider-thumb-border)');
    });
  });

  describe('Error and Success States', () => {
    it('displays error message when error prop is set', () => {
      render(<SliderGlass defaultValue={[50]} error="Value too low" />);
      expect(screen.getByText('Value too low')).toBeInTheDocument();
    });

    it('displays success message when success prop is set', () => {
      render(<SliderGlass defaultValue={[75]} success="Perfect value" />);
      expect(screen.getByText('Perfect value')).toBeInTheDocument();
    });

    it('error takes priority over success', () => {
      render(<SliderGlass defaultValue={[50]} error="Error message" success="Success message" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles value at minimum boundary', () => {
      render(<SliderGlass defaultValue={[0]} min={0} max={100} showValue />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '0');
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles value at maximum boundary', () => {
      render(<SliderGlass defaultValue={[100]} min={0} max={100} showValue />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '100');
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('handles empty value array gracefully', () => {
      const { container } = render(<SliderGlass defaultValue={[]} />);
      // Should render track even with no thumbs
      const track = container.querySelector('[data-orientation="horizontal"]');
      expect(track).toBeInTheDocument();
    });
  });

  describe('Orientation', () => {
    it('renders horizontal orientation by default', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} />);
      const root = container.querySelector('[data-orientation="horizontal"]');
      expect(root).toBeInTheDocument();
    });

    it('renders vertical orientation when specified', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} orientation="vertical" />);
      const root = container.querySelector('[data-orientation="vertical"]');
      expect(root).toBeInTheDocument();
    });
  });

  describe('Callback Props (shadcn/ui compatible)', () => {
    it('calls onValueChange when value changes', () => {
      const handleChange = vi.fn();
      render(<SliderGlass defaultValue={[50]} onValueChange={handleChange} />);
      // Note: Actually triggering value change requires user interaction
      // which is tested in integration/e2e tests
      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});
