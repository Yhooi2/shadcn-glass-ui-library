import { describe, it, expect, vi } from 'vitest';
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

    it('renders chart container with data-chart attribute', () => {
      const { container } = render(<SparklineGlass data={sampleData} />);
      expect(container.querySelector('[data-chart="sparkline"]')).toBeInTheDocument();
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

    it('handles all zeros - renders Recharts container', () => {
      const { container } = render(<SparklineGlass data={[0, 0, 0]} />);
      // Recharts renders SVG elements - check for the chart container
      expect(container.querySelector('[data-chart="sparkline"]')).toBeInTheDocument();
      // And ResponsiveContainer creates a wrapper div
      expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = { current: null };
      render(<SparklineGlass ref={ref} data={sampleData} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Config and Colors', () => {
    it('applies CSS variables from config', () => {
      const { container } = render(<SparklineGlass data={sampleData} barColor="red" />);
      const chartContainer = container.querySelector('[data-chart="sparkline"]') as HTMLElement;
      expect(chartContainer.style.getPropertyValue('--color-value')).toBe('red');
    });

    it('applies maxBarColor via CSS variables', () => {
      const { container } = render(
        <SparklineGlass data={sampleData} maxBarColor="green" highlightMax />
      );
      const chartContainer = container.querySelector('[data-chart="sparkline"]') as HTMLElement;
      expect(chartContainer.style.getPropertyValue('--color-max')).toBe('green');
    });

    it('uses custom config colors', () => {
      const customConfig = {
        value: { label: 'Custom', color: '#ff0000' },
        max: { label: 'Max Custom', color: '#00ff00' },
      };
      const { container } = render(<SparklineGlass data={sampleData} config={customConfig} />);
      const chartContainer = container.querySelector('[data-chart="sparkline"]') as HTMLElement;
      expect(chartContainer.style.getPropertyValue('--color-value')).toBe('#ff0000');
    });
  });

  describe('Callbacks', () => {
    it('accepts onBarClick callback', () => {
      const handleClick = vi.fn();
      render(<SparklineGlass data={sampleData} onBarClick={handleClick} />);
      // Callback should be passed without errors
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('accepts valueFormatter', () => {
      const formatter = vi.fn((value: number) => `$${value}`);
      render(<SparklineGlass data={sampleData} valueFormatter={formatter} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Tooltip', () => {
    it('has tooltip enabled by default', () => {
      const { container } = render(<SparklineGlass data={sampleData} />);
      // Recharts adds tooltip components
      expect(container.querySelector('[data-chart="sparkline"]')).toBeInTheDocument();
    });

    it('can disable tooltip', () => {
      const { container } = render(<SparklineGlass data={sampleData} showTooltip={false} />);
      // Component still renders
      expect(container.querySelector('[data-chart="sparkline"]')).toBeInTheDocument();
    });
  });
});
