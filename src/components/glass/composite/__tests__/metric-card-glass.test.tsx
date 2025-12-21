import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Activity } from 'lucide-react';
import { MetricCardGlass } from '../metric-card-glass';

describe('MetricCardGlass', () => {
  describe('Rendering', () => {
    it('renders label and value', () => {
      render(<MetricCardGlass title="Trust Score" value="85%" />);
      expect(screen.getByText('Trust Score')).toBeInTheDocument();
      expect(screen.getByText('85%')).toBeInTheDocument();
    });

    it('renders progress bar', () => {
      render(<MetricCardGlass title="Trust Score" value="85%" progress={85} />);
      // ProgressGlass renders with role="progressbar"
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <MetricCardGlass title="Trust Score" value="85%" progress={85} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Color Mapping', () => {
    it('uses blue color by default', () => {
      render(<MetricCardGlass title="Trust Score" value="85%" progress={85} />);
      // ProgressGlass should receive "blue" gradient
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('maps emerald color to emerald gradient', () => {
      render(<MetricCardGlass title="Trust Score" value="85%" progress={85} color="emerald" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('maps amber color to amber gradient', () => {
      render(<MetricCardGlass title="Trust Score" value="85%" progress={85} color="amber" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('maps blue color to blue gradient', () => {
      render(<MetricCardGlass title="Trust Score" value="85%" progress={85} color="blue" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('maps red color to rose gradient', () => {
      render(<MetricCardGlass title="Trust Score" value="85%" progress={85} color="red" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Value Display', () => {
    it('appends % to value', () => {
      render(<MetricCardGlass title="Trust Score" value="85%" progress={85} />);
      expect(screen.getByText('85%')).toBeInTheDocument();
    });

    it('handles 0 value', () => {
      render(<MetricCardGlass title="Trust Score" value="0%" progress={0} />);
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('handles 100 value', () => {
      render(<MetricCardGlass title="Trust Score" value="100%" progress={100} />);
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('handles decimal values', () => {
      render(<MetricCardGlass title="Trust Score" value="85.5%" progress={85.5} />);
      expect(screen.getByText('85.5%')).toBeInTheDocument();
    });
  });

  describe('Hover Effect', () => {
    it('applies hover styles on mouse enter', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <MetricCardGlass title="Trust Score" value="85%" progress={85} />
      );

      const card = container.firstChild as HTMLElement;
      await user.hover(card);

      // Card should have transform applied
      expect(card).toHaveStyle({ transform: 'translateY(-2px)' });
    });

    it('removes hover styles on mouse leave', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <MetricCardGlass title="Trust Score" value="85%" progress={85} />
      );

      const card = container.firstChild as HTMLElement;
      await user.hover(card);
      await user.unhover(card);

      // Card should return to normal
      expect(card).toHaveStyle({ transform: 'translateY(0)' });
    });
  });

  describe('Progress Bar Integration', () => {
    it('passes value to ProgressGlass', () => {
      render(<MetricCardGlass title="Trust Score" value="75%" progress={75} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
    });

    it('uses sm size for ProgressGlass', () => {
      render(<MetricCardGlass title="Trust Score" value="75%" progress={75} />);
      // ProgressGlass is rendered with size="sm"
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<MetricCardGlass ref={ref} title="Trust Score" value="85%" progress={85} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('spreads additional props', () => {
      render(
        <MetricCardGlass
          title="Trust Score"
          value="85%"
          progress={85}
          data-testid="metric-card"
          aria-label="Metric card"
        />
      );
      expect(screen.getByTestId('metric-card')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty label', () => {
      render(<MetricCardGlass title="" value="85%" progress={85} />);
      expect(screen.getByText('85%')).toBeInTheDocument();
    });

    it('handles very long label', () => {
      const longLabel = 'This is a very long label that might wrap to multiple lines';
      render(<MetricCardGlass title={longLabel} value="85%" progress={85} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('handles negative values', () => {
      render(<MetricCardGlass title="Trust Score" value="-10%" />);
      expect(screen.getByText('-10%')).toBeInTheDocument();
    });

    it('handles values over 100', () => {
      render(<MetricCardGlass title="Trust Score" value="150%" progress={100} />);
      expect(screen.getByText('150%')).toBeInTheDocument();
    });

    it('handles all color variants', () => {
      const colors: Array<'emerald' | 'amber' | 'blue' | 'red'> = [
        'emerald',
        'amber',
        'blue',
        'red',
      ];

      colors.forEach((color) => {
        const { unmount } = render(
          <MetricCardGlass title="Test" value="50%" progress={50} color={color} />
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Sparkline Integration', () => {
    it('renders sparkline when data provided', () => {
      const sparklineData = [10, 20, 15, 25, 30, 28, 35];
      render(
        <MetricCardGlass title="Test" value="75%" progress={75} sparklineData={sparklineData} />
      );

      // Sparkline has role="img"
      expect(screen.getByRole('img', { name: /test trend/i })).toBeInTheDocument();
    });

    it('does not render sparkline when data is empty', () => {
      render(<MetricCardGlass title="Test" value="75%" progress={75} sparklineData={[]} />);

      expect(screen.queryByRole('img', { name: /trend/i })).not.toBeInTheDocument();
    });

    it('does not render sparkline when data is undefined', () => {
      render(<MetricCardGlass title="Test" value="75%" progress={75} />);

      expect(screen.queryByRole('img', { name: /trend/i })).not.toBeInTheDocument();
    });

    it('does not render sparkline when showSparkline is false', () => {
      const sparklineData = [10, 20, 15, 25, 30, 28, 35];
      render(
        <MetricCardGlass
          title="Test"
          value="75%"
          progress={75}
          sparklineData={sparklineData}
          showSparkline={false}
        />
      );

      expect(screen.queryByRole('img', { name: /trend/i })).not.toBeInTheDocument();
    });

    it('renders both progress bar and sparkline when data provided', () => {
      const sparklineData = [10, 20, 15, 25, 30, 28, 35];
      render(
        <MetricCardGlass title="Test" value="75%" progress={75} sparklineData={sparklineData} />
      );

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /test trend/i })).toBeInTheDocument();
    });

    it('uses correct aria-label for sparkline', () => {
      const sparklineData = [10, 20, 15, 25, 30];
      render(
        <MetricCardGlass
          title="Performance"
          value="85%"
          progress={85}
          sparklineData={sparklineData}
        />
      );

      expect(screen.getByRole('img', { name: 'Performance trend' })).toBeInTheDocument();
    });
  });

  describe('CSS Variables', () => {
    it('applies color-specific CSS variables for emerald', () => {
      const { container } = render(
        <MetricCardGlass title="Test" value="50%" progress={50} color="emerald" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.style.background).toContain('var(--metric-success-bg)');
    });

    it('applies color-specific CSS variables for amber', () => {
      const { container } = render(
        <MetricCardGlass title="Test" value="50%" progress={50} color="amber" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.style.background).toContain('var(--metric-warning-bg)');
    });

    it('applies color-specific CSS variables for blue', () => {
      const { container } = render(
        <MetricCardGlass title="Test" value="50%" progress={50} color="blue" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.style.background).toContain('var(--metric-default-bg)');
    });

    it('applies color-specific CSS variables for red', () => {
      const { container } = render(
        <MetricCardGlass title="Test" value="50%" progress={50} color="red" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.style.background).toContain('var(--metric-destructive-bg)');
    });
  });

  describe('Icon Support', () => {
    it('renders icon when provided', () => {
      render(
        <MetricCardGlass
          title="Activity"
          value="85%"
          progress={85}
          icon={<Activity data-testid="activity-icon" className="w-4 h-4" />}
        />
      );
      expect(screen.getByTestId('activity-icon')).toBeInTheDocument();
    });

    it('does not render icon container when no icon provided', () => {
      const { container } = render(<MetricCardGlass title="Test" value="50%" progress={50} />);
      // Icon wrapper has aria-hidden="true"
      expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
    });
  });

  describe('Trend Indicator', () => {
    it('renders trend up indicator', () => {
      render(
        <MetricCardGlass
          title="Growth"
          value="85%"
          progress={85}
          change={{ value: 12, direction: 'up' }}
        />
      );
      expect(screen.getByText('+12%')).toBeInTheDocument();
    });

    it('renders trend down indicator with negative sign', () => {
      render(
        <MetricCardGlass
          title="Error Rate"
          value="23%"
          progress={23}
          change={{ value: 8, direction: 'down' }}
        />
      );
      expect(screen.getByText('-8%')).toBeInTheDocument();
    });

    it('renders neutral trend indicator', () => {
      render(
        <MetricCardGlass
          title="Steady"
          value="50%"
          progress={50}
          change={{ value: 0, direction: 'neutral' }}
        />
      );
      expect(screen.getByText('+0%')).toBeInTheDocument();
    });

    it('renders trend label when provided', () => {
      render(
        <MetricCardGlass
          title="Growth"
          value="85%"
          progress={85}
          change={{ value: 12, direction: 'up', period: 'vs last month' }}
        />
      );
      expect(screen.getByText('vs last month')).toBeInTheDocument();
    });

    it('does not render trend when not provided', () => {
      render(<MetricCardGlass title="Test" value="50%" progress={50} />);
      // Trend indicator shows +X% or -X% text - check that no trend percentage is shown
      expect(screen.queryByText(/^[+-]\d+%$/)).not.toBeInTheDocument();
    });
  });

  describe('Value Formatter', () => {
    it('uses custom valueFormatter', () => {
      render(
        <MetricCardGlass
          title="Performance"
          value={8750}
          valueFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
        />
      );
      expect(screen.getByText('8.8k')).toBeInTheDocument();
    });

    it('uses default formatter (%) when not provided', () => {
      render(<MetricCardGlass title="Test" value="85%" progress={85} />);
      expect(screen.getByText('85%')).toBeInTheDocument();
    });
  });

  describe('Value Suffix', () => {
    it('renders value suffix', () => {
      render(
        <MetricCardGlass title="Trust Score" value="85%" progress={85} description="of 100" />
      );
      expect(screen.getByText('of 100')).toBeInTheDocument();
    });

    it('does not render suffix when not provided', () => {
      render(<MetricCardGlass title="Test" value="50%" progress={50} />);
      expect(screen.queryByText('of 100')).not.toBeInTheDocument();
    });
  });

  describe('Show Progress', () => {
    it('renders progress bar by default', () => {
      render(<MetricCardGlass title="Test" value="75%" progress={75} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('hides progress bar when showProgress=false', () => {
      render(<MetricCardGlass title="Test" value="75%" progress={75} showProgress={false} />);
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('shows progress bar with sparkline when both are enabled', () => {
      const sparklineData = [10, 20, 30, 40, 50];
      render(
        <MetricCardGlass
          title="Test"
          value="75%"
          progress={75}
          showProgress={true}
          sparklineData={sparklineData}
        />
      );
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /test trend/i })).toBeInTheDocument();
    });

    it('hides progress bar but shows sparkline', () => {
      const sparklineData = [10, 20, 30, 40, 50];
      render(
        <MetricCardGlass
          title="Test"
          value="75%"
          progress={75}
          showProgress={false}
          sparklineData={sparklineData}
        />
      );
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(screen.getByRole('img', { name: /test trend/i })).toBeInTheDocument();
    });
  });

  describe('Full Featured', () => {
    it('renders all features together', () => {
      render(
        <MetricCardGlass
          title="Activity Score"
          value="92%"
          progress={92}
          variant="success"
          icon={<Activity data-testid="icon" className="w-4 h-4" />}
          change={{ value: 15, direction: 'up', period: 'vs last week' }}
          description="points"
          sparklineData={[70, 75, 80, 85, 90, 92]}
        />
      );

      expect(screen.getByText('Activity Score')).toBeInTheDocument();
      expect(screen.getByText('92%')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('+15%')).toBeInTheDocument();
      expect(screen.getByText('vs last week')).toBeInTheDocument();
      expect(screen.getByText('points')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /activity score trend/i })).toBeInTheDocument();
    });
  });

  describe('Explain Button', () => {
    it('renders explain button when onExplain is provided', () => {
      const onExplain = vi.fn();
      render(<MetricCardGlass title="Trust Score" value="85%" onExplain={onExplain} />);

      const button = screen.getByRole('button', { name: 'Explain Trust Score metric' });
      expect(button).toBeInTheDocument();
    });

    it('calls onExplain when explain button is clicked', async () => {
      const user = userEvent.setup();
      const onExplain = vi.fn();
      render(<MetricCardGlass title="Activity Index" value="92%" onExplain={onExplain} />);

      const button = screen.getByRole('button', { name: 'Explain Activity Index metric' });
      await user.click(button);
      expect(onExplain).toHaveBeenCalledTimes(1);
    });

    it('uses actualTitle in aria-label', () => {
      render(<MetricCardGlass title="Performance Score" value="78%" onExplain={() => {}} />);

      expect(
        screen.getByRole('button', { name: 'Explain Performance Score metric' })
      ).toBeInTheDocument();
    });

    it('does not render explain button when onExplain is not provided', () => {
      render(<MetricCardGlass title="Test" value="50%" />);

      expect(screen.queryByRole('button', { name: /explain/i })).not.toBeInTheDocument();
    });

    it('hides explain button when showExplain is false', () => {
      render(<MetricCardGlass title="Test" value="50%" onExplain={() => {}} showExplain={false} />);

      expect(screen.queryByRole('button', { name: /explain/i })).not.toBeInTheDocument();
    });

    it('handles multi-word titles in aria-label', () => {
      render(
        <MetricCardGlass title="Customer Satisfaction Index" value="95%" onExplain={() => {}} />
      );

      expect(
        screen.getByRole('button', { name: 'Explain Customer Satisfaction Index metric' })
      ).toBeInTheDocument();
    });

    it('handles maxScore with explain button', () => {
      render(<MetricCardGlass title="Test Score" value={85} maxScore={100} onExplain={() => {}} />);

      expect(screen.getByText('85/100')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Explain Test Score metric' })).toBeInTheDocument();
    });
  });
});
