import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MetricsGridGlass, type MetricData } from '../metrics-grid-glass';

const mockMetrics: MetricData[] = [
  { label: 'Commits', value: 75, color: 'blue' },
  { label: 'PRs', value: 90, color: 'emerald' },
  { label: 'Issues', value: 60, color: 'amber' },
  { label: 'Stars', value: 85, color: 'blue' },
];

describe('MetricsGridGlass', () => {
  describe('Rendering', () => {
    it('renders grid with metrics', () => {
      const { container } = render(<MetricsGridGlass metrics={mockMetrics} />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid');
    });

    it('renders all metric cards', () => {
      const { getByText } = render(<MetricsGridGlass metrics={mockMetrics} />);
      expect(getByText('Commits')).toBeInTheDocument();
      expect(getByText('PRs')).toBeInTheDocument();
      expect(getByText('Issues')).toBeInTheDocument();
      expect(getByText('Stars')).toBeInTheDocument();
    });

    it('renders metric values', () => {
      const { getByText } = render(<MetricsGridGlass metrics={mockMetrics} />);
      expect(getByText('75%')).toBeInTheDocument();
      expect(getByText('90%')).toBeInTheDocument();
      expect(getByText('60%')).toBeInTheDocument();
      expect(getByText('85%')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <MetricsGridGlass metrics={mockMetrics} className="custom-class" />
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('custom-class');
    });
  });

  describe('Empty State', () => {
    it('returns null when metrics array is empty', () => {
      const { container } = render(<MetricsGridGlass metrics={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it('does not render when no metrics provided', () => {
      const { container } = render(<MetricsGridGlass metrics={[]} />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('Column Variants', () => {
    it('renders 1 column grid', () => {
      const { container } = render(<MetricsGridGlass metrics={mockMetrics} columns={1} />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-1');
    });

    it('renders 2 column grid', () => {
      const { container } = render(<MetricsGridGlass metrics={mockMetrics} columns={2} />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2');
    });

    it('renders 3 column grid', () => {
      const { container } = render(<MetricsGridGlass metrics={mockMetrics} columns={3} />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3');
    });

    it('renders 4 column grid (default)', () => {
      const { container } = render(<MetricsGridGlass metrics={mockMetrics} />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-2', 'sm:grid-cols-3', 'md:grid-cols-4');
    });

    it('renders 5 column grid', () => {
      const { container } = render(<MetricsGridGlass metrics={mockMetrics} columns={5} />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-2', 'sm:grid-cols-3', 'md:grid-cols-5');
    });

    it('renders 6 column grid', () => {
      const { container } = render(<MetricsGridGlass metrics={mockMetrics} columns={6} />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-2', 'sm:grid-cols-3', 'md:grid-cols-6');
    });
  });

  describe('Gap Variants', () => {
    it('renders small gap', () => {
      const { container } = render(<MetricsGridGlass metrics={mockMetrics} gap="sm" />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('gap-2');
    });

    it('renders medium gap (default)', () => {
      const { container } = render(<MetricsGridGlass metrics={mockMetrics} />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('gap-4');
    });

    it('renders large gap', () => {
      const { container } = render(<MetricsGridGlass metrics={mockMetrics} gap="lg" />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('gap-6');
    });
  });

  describe('Metric Colors', () => {
    it('renders metrics with different colors', () => {
      const coloredMetrics: MetricData[] = [
        { label: 'Blue', value: 50, color: 'blue' },
        { label: 'Emerald', value: 60, color: 'emerald' },
        { label: 'Amber', value: 70, color: 'amber' },
        { label: 'Red', value: 80, color: 'red' },
      ];
      const { getByText } = render(<MetricsGridGlass metrics={coloredMetrics} />);
      expect(getByText('Blue')).toBeInTheDocument();
      expect(getByText('Emerald')).toBeInTheDocument();
      expect(getByText('Amber')).toBeInTheDocument();
      expect(getByText('Red')).toBeInTheDocument();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to div element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<MetricsGridGlass ref={ref} metrics={mockMetrics} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref methods to be called', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<MetricsGridGlass ref={ref} metrics={mockMetrics} />);

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        expect(ref.current.tagName).toBe('DIV');
        expect(ref.current).toHaveClass('grid');
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes', () => {
      const { container } = render(
        <MetricsGridGlass metrics={mockMetrics} data-testid="metrics-grid" id="grid-1" />
      );

      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveAttribute('data-testid', 'metrics-grid');
      expect(grid).toHaveAttribute('id', 'grid-1');
    });
  });

  describe('Edge Cases', () => {
    it('handles single metric', () => {
      const singleMetric: MetricData[] = [{ label: 'Solo', value: 100, color: 'blue' }];
      const { getByText } = render(<MetricsGridGlass metrics={singleMetric} />);
      expect(getByText('Solo')).toBeInTheDocument();
      expect(getByText('100%')).toBeInTheDocument();
    });

    it('handles many metrics', () => {
      const manyMetrics: MetricData[] = Array.from({ length: 12 }, (_, i) => ({
        label: `Metric ${i + 1}`,
        value: (i + 1) * 10,
        color: 'blue' as const,
      }));
      const { getByText } = render(<MetricsGridGlass metrics={manyMetrics} />);
      expect(getByText('Metric 1')).toBeInTheDocument();
      expect(getByText('Metric 12')).toBeInTheDocument();
    });

    it('handles metrics with 0 value', () => {
      const zeroMetrics: MetricData[] = [
        { label: 'Zero', value: 0, color: 'blue' },
        { label: 'Hundred', value: 100, color: 'emerald' },
      ];
      const { getByText } = render(<MetricsGridGlass metrics={zeroMetrics} />);
      expect(getByText('Zero')).toBeInTheDocument();
      expect(getByText('0%')).toBeInTheDocument();
    });

    it('handles metrics with 100 value', () => {
      const maxMetrics: MetricData[] = [{ label: 'Perfect', value: 100, color: 'emerald' }];
      const { getByText } = render(<MetricsGridGlass metrics={maxMetrics} />);
      expect(getByText('Perfect')).toBeInTheDocument();
      expect(getByText('100%')).toBeInTheDocument();
    });

    it('handles long metric labels', () => {
      const longLabel: MetricData[] = [
        { label: 'Very Long Metric Label That Might Wrap', value: 75, color: 'blue' },
      ];
      const { getByText } = render(<MetricsGridGlass metrics={longLabel} />);
      expect(getByText('Very Long Metric Label That Might Wrap')).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('applies responsive grid classes for 4 columns', () => {
      const { container } = render(<MetricsGridGlass metrics={mockMetrics} columns={4} />);
      const grid = container.firstChild as HTMLElement;
      // Mobile: 2 cols, Small: 3 cols, Medium+: 4 cols
      expect(grid).toHaveClass('grid-cols-2');
      expect(grid).toHaveClass('sm:grid-cols-3');
      expect(grid).toHaveClass('md:grid-cols-4');
    });

    it('applies responsive grid classes for 3 columns', () => {
      const { container } = render(<MetricsGridGlass metrics={mockMetrics} columns={3} />);
      const grid = container.firstChild as HTMLElement;
      // Mobile: 1 col, Small: 2 cols, Medium+: 3 cols
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('sm:grid-cols-2');
      expect(grid).toHaveClass('md:grid-cols-3');
    });
  });

  describe('Integration with MetricCardGlass', () => {
    it('renders MetricCardGlass components', () => {
      const { container } = render(<MetricsGridGlass metrics={mockMetrics} />);
      const grid = container.firstChild as HTMLElement;
      // Grid should have 4 children (one for each metric)
      expect(grid.children.length).toBe(4);
    });

    it('passes correct props to MetricCardGlass', () => {
      const { getByText } = render(<MetricsGridGlass metrics={mockMetrics} />);
      // Verify each metric card receives correct data
      mockMetrics.forEach((metric) => {
        expect(getByText(metric.label)).toBeInTheDocument();
        expect(getByText(`${metric.value}%`)).toBeInTheDocument();
      });
    });
  });
});
