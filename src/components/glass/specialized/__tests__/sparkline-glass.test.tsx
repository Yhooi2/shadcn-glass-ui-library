import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SparklineGlass } from '../sparkline-glass';

describe('SparklineGlass', () => {
  const sampleData = [10, 25, 45, 80, 60];
  const labels = ['A', 'B', 'C', 'D', 'E'];

  describe('Rendering', () => {
    it('renders with role="img"', () => {
      render(<SparklineGlass data={sampleData} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('has aria-label describing the chart', () => {
      render(<SparklineGlass data={sampleData} />);
      const chart = screen.getByRole('img');
      expect(chart.getAttribute('aria-label')).toContain('5 data points');
      expect(chart.getAttribute('aria-label')).toContain('maximum value 80');
    });

    it('applies custom className', () => {
      render(<SparklineGlass data={sampleData} className="custom-class" />);
      expect(screen.getByRole('img')).toHaveClass('custom-class');
    });
  });

  describe('Labels', () => {
    it('does not render labels by default', () => {
      render(<SparklineGlass data={sampleData} labels={labels} />);
      expect(screen.queryByText('A')).not.toBeInTheDocument();
    });

    it('renders labels when showLabels is true', () => {
      render(<SparklineGlass data={sampleData} labels={labels} showLabels />);
      labels.forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });
  });

  describe('Height variants', () => {
    it('applies sm height class', () => {
      const { container } = render(<SparklineGlass data={sampleData} height="sm" />);
      expect(container.querySelector('.h-4')).toBeInTheDocument();
    });

    it('applies lg height class', () => {
      const { container } = render(<SparklineGlass data={sampleData} height="lg" />);
      expect(container.querySelector('.h-8')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('handles empty data array', () => {
      render(<SparklineGlass data={[]} />);
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Empty sparkline chart');
    });

    it('handles all zeros', () => {
      const { container } = render(<SparklineGlass data={[0, 0, 0]} />);
      expect(container.querySelectorAll('.flex-1')).toHaveLength(3);
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = { current: null };
      render(<SparklineGlass ref={ref} data={sampleData} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
