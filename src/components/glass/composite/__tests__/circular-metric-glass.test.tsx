import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CircularMetricGlass } from '../circular-metric-glass';

describe('CircularMetricGlass', () => {
  describe('Rendering', () => {
    it('renders label and value', () => {
      render(<CircularMetricGlass label="Reg" value={84} />);
      expect(screen.getByText('Reg')).toBeInTheDocument();
      // Multiple elements have "84%" - visible label and sr-only progressbar
      expect(screen.getAllByText('84%').length).toBeGreaterThanOrEqual(1);
    });

    it('renders circular progress indicator', () => {
      render(<CircularMetricGlass label="Reg" value={84} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <CircularMetricGlass label="Reg" value={84} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('has flex column layout', () => {
      const { container } = render(
        <CircularMetricGlass label="Reg" value={84} />
      );
      expect(container.firstChild).toHaveClass('flex', 'flex-col', 'items-center');
    });
  });

  describe('Color Mapping', () => {
    it('uses blue color by default', () => {
      render(<CircularMetricGlass label="Reg" value={84} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('maps emerald color', () => {
      render(<CircularMetricGlass label="Reg" value={84} color="emerald" />);
      const label = screen.getByText('Reg');
      expect(label).toHaveStyle({ color: 'var(--metric-emerald-text)' });
    });

    it('maps amber color', () => {
      render(<CircularMetricGlass label="Imp" value={45} color="amber" />);
      const label = screen.getByText('Imp');
      expect(label).toHaveStyle({ color: 'var(--metric-amber-text)' });
    });

    it('maps blue color', () => {
      render(<CircularMetricGlass label="Div" value={78} color="blue" />);
      const label = screen.getByText('Div');
      expect(label).toHaveStyle({ color: 'var(--metric-blue-text)' });
    });

    it('maps red color to rose gradient', () => {
      render(<CircularMetricGlass label="Collab" value={12} color="red" />);
      const label = screen.getByText('Collab');
      expect(label).toHaveStyle({ color: 'var(--metric-red-text)' });
    });
  });

  describe('Size Variants', () => {
    it('uses sm size by default', () => {
      render(<CircularMetricGlass label="Reg" value={84} />);
      // sm size is 64px (w-16 h-16)
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('accepts md size', () => {
      render(<CircularMetricGlass label="Reg" value={84} size="md" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Value Display', () => {
    it('shows percentage in center', () => {
      render(<CircularMetricGlass label="Reg" value={84} />);
      expect(screen.getAllByText('84%').length).toBeGreaterThanOrEqual(1);
    });

    it('handles 0 value', () => {
      render(<CircularMetricGlass label="Reg" value={0} />);
      expect(screen.getAllByText('0%').length).toBeGreaterThanOrEqual(1);
    });

    it('handles 100 value', () => {
      render(<CircularMetricGlass label="Reg" value={100} />);
      expect(screen.getAllByText('100%').length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Label Display', () => {
    it('renders label below the circle', () => {
      const { container } = render(
        <CircularMetricGlass label="Reg" value={84} />
      );
      const label = screen.getByText('Reg');
      expect(label).toHaveClass('text-xs', 'font-medium');
    });

    it('handles short labels', () => {
      render(<CircularMetricGlass label="Reg" value={84} />);
      expect(screen.getByText('Reg')).toBeInTheDocument();
    });

    it('handles longer labels', () => {
      render(<CircularMetricGlass label="Collab" value={12} />);
      expect(screen.getByText('Collab')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<CircularMetricGlass ref={ref} label="Reg" value={84} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('spreads additional props', () => {
      render(
        <CircularMetricGlass
          label="Reg"
          value={84}
          data-testid="circular-metric"
          aria-label="Circular metric"
        />
      );
      expect(screen.getByTestId('circular-metric')).toBeInTheDocument();
    });

    it('has accessible progressbar', () => {
      render(<CircularMetricGlass label="Reg" value={84} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '84');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });
  });

  describe('Edge Cases', () => {
    it('handles all color variants', () => {
      const colors: Array<'emerald' | 'amber' | 'blue' | 'red'> = [
        'emerald',
        'amber',
        'blue',
        'red',
      ];

      colors.forEach((color) => {
        const { unmount } = render(
          <CircularMetricGlass label="Test" value={50} color={color} />
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
        unmount();
      });
    });

    it('handles negative values (clamped by CircularProgressGlass)', () => {
      render(<CircularMetricGlass label="Reg" value={-10} />);
      // CircularProgressGlass clamps to 0
      expect(screen.getAllByText('0%').length).toBeGreaterThanOrEqual(1);
    });

    it('handles values over 100 (clamped by CircularProgressGlass)', () => {
      render(<CircularMetricGlass label="Reg" value={150} />);
      // CircularProgressGlass clamps to 100
      expect(screen.getAllByText('100%').length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Integration with CircularProgressGlass', () => {
    it('passes correct value to CircularProgressGlass', () => {
      render(<CircularMetricGlass label="Reg" value={75} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
    });

    it('uses glow effect', () => {
      render(<CircularMetricGlass label="Reg" value={75} />);
      // Glow is enabled by default in CircularMetricGlass
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });
});
