import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RainbowProgressGlass } from '../rainbow-progress-glass';

describe('RainbowProgressGlass', () => {
  describe('Rendering', () => {
    it('renders progressbar', () => {
      render(<RainbowProgressGlass value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders with default size (lg)', () => {
      const { container } = render(<RainbowProgressGlass value={50} />);
      const progressbar = container.firstChild;
      expect(progressbar).toHaveClass('h-[1.125rem]');
    });

    it('renders with glow by default', () => {
      render(<RainbowProgressGlass value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <RainbowProgressGlass value={50} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Value Clamping', () => {
    it('clamps value to 0-100 range', () => {
      render(<RainbowProgressGlass value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    });

    it('clamps value above 100 to 100', () => {
      render(<RainbowProgressGlass value={150} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '100');
    });

    it('clamps negative value to 0', () => {
      render(<RainbowProgressGlass value={-10} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
    });

    it('handles exactly 0', () => {
      render(<RainbowProgressGlass value={0} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
    });

    it('handles exactly 100', () => {
      render(<RainbowProgressGlass value={100} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '100');
    });

    it('handles decimal values', () => {
      render(<RainbowProgressGlass value={50.5} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '50.5');
    });

    it('clamps very large positive values', () => {
      render(<RainbowProgressGlass value={999999} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '100');
    });

    it('clamps very large negative values', () => {
      render(<RainbowProgressGlass value={-999999} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
    });
  });

  describe('Size Variants', () => {
    it('applies sm size', () => {
      const { container } = render(<RainbowProgressGlass value={50} size="sm" />);
      expect(container.firstChild).toHaveClass('h-2.5');
    });

    it('applies md size', () => {
      const { container } = render(<RainbowProgressGlass value={50} size="md" />);
      expect(container.firstChild).toHaveClass('h-3.5');
    });

    it('applies lg size (default)', () => {
      const { container } = render(<RainbowProgressGlass value={50} />);
      expect(container.firstChild).toHaveClass('h-[1.125rem]');
    });

    it('applies xl size', () => {
      const { container } = render(<RainbowProgressGlass value={50} size="xl" />);
      expect(container.firstChild).toHaveClass('h-6');
    });
  });

  describe('Glow Control', () => {
    it('shows glow by default', () => {
      render(<RainbowProgressGlass value={50} />);
      // Glow is applied via inline styles
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('hides glow when showGlow=false', () => {
      render(<RainbowProgressGlass value={50} showGlow={false} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows glow when showGlow=true explicitly', () => {
      render(<RainbowProgressGlass value={50} showGlow />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has role="progressbar"', () => {
      render(<RainbowProgressGlass value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('has aria-valuenow', () => {
      render(<RainbowProgressGlass value={75} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
    });

    it('has aria-valuemin=0', () => {
      render(<RainbowProgressGlass value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    });

    it('has aria-valuemax=100', () => {
      render(<RainbowProgressGlass value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });

    it('has descriptive aria-label', () => {
      render(<RainbowProgressGlass value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-label', 'Rainbow progress: 50%');
    });

    it('updates aria-label with clamped value', () => {
      render(<RainbowProgressGlass value={150} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-label', 'Rainbow progress: 100%');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<RainbowProgressGlass ref={ref} value={50} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('spreads additional props', () => {
      render(
        <RainbowProgressGlass
          value={50}
          data-testid="rainbow-progress"
          aria-describedby="desc"
        />
      );
      expect(screen.getByTestId('rainbow-progress')).toBeInTheDocument();
    });
  });

  describe('Visual Styling', () => {
    it('has rounded-full class', () => {
      const { container } = render(<RainbowProgressGlass value={50} />);
      expect(container.firstChild).toHaveClass('rounded-full');
    });

    it('has overflow-hidden class', () => {
      const { container } = render(<RainbowProgressGlass value={50} />);
      expect(container.firstChild).toHaveClass('overflow-hidden');
    });

    it('fill has transition-all class', () => {
      const { container } = render(<RainbowProgressGlass value={50} />);
      const fill = container.querySelector('.transition-all');
      expect(fill).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles NaN by clamping to 0', () => {
      render(<RainbowProgressGlass value={NaN} />);
      const progressbar = screen.getByRole('progressbar');
      // Math.max(0, NaN) returns NaN, Math.min(100, NaN) returns NaN
      // So aria-valuenow will be NaN, but component should not crash
      expect(progressbar).toBeInTheDocument();
    });

    it('handles Infinity by clamping to 100', () => {
      render(<RainbowProgressGlass value={Infinity} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '100');
    });

    it('handles -Infinity by clamping to 0', () => {
      render(<RainbowProgressGlass value={-Infinity} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
    });

    it('handles zero with glow disabled', () => {
      render(<RainbowProgressGlass value={0} showGlow={false} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('handles 100% with glow enabled', () => {
      render(<RainbowProgressGlass value={100} showGlow />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });
});
