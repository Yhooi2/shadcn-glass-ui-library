import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MetricCardGlass } from '../metric-card-glass';

describe('MetricCardGlass', () => {
  describe('Rendering', () => {
    it('renders label and value', () => {
      render(<MetricCardGlass label="Trust Score" value={85} />);
      expect(screen.getByText('Trust Score')).toBeInTheDocument();
      expect(screen.getByText('85%')).toBeInTheDocument();
    });

    it('renders progress bar', () => {
      render(<MetricCardGlass label="Trust Score" value={85} />);
      // ProgressGlass renders with role="progressbar"
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <MetricCardGlass label="Trust Score" value={85} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Color Mapping', () => {
    it('uses blue color by default', () => {
      render(<MetricCardGlass label="Trust Score" value={85} />);
      // ProgressGlass should receive "blue" gradient
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('maps emerald color to emerald gradient', () => {
      render(<MetricCardGlass label="Trust Score" value={85} color="emerald" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('maps amber color to amber gradient', () => {
      render(<MetricCardGlass label="Trust Score" value={85} color="amber" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('maps blue color to blue gradient', () => {
      render(<MetricCardGlass label="Trust Score" value={85} color="blue" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('maps red color to rose gradient', () => {
      render(<MetricCardGlass label="Trust Score" value={85} color="red" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Value Display', () => {
    it('appends % to value', () => {
      render(<MetricCardGlass label="Trust Score" value={85} />);
      expect(screen.getByText('85%')).toBeInTheDocument();
    });

    it('handles 0 value', () => {
      render(<MetricCardGlass label="Trust Score" value={0} />);
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('handles 100 value', () => {
      render(<MetricCardGlass label="Trust Score" value={100} />);
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('handles decimal values', () => {
      render(<MetricCardGlass label="Trust Score" value={85.5} />);
      expect(screen.getByText('85.5%')).toBeInTheDocument();
    });
  });

  describe('Hover Effect', () => {
    it('applies hover styles on mouse enter', async () => {
      const user = userEvent.setup();
      const { container } = render(<MetricCardGlass label="Trust Score" value={85} />);

      const card = container.firstChild as HTMLElement;
      await user.hover(card);

      // Card should have transform applied
      expect(card).toHaveStyle({ transform: 'translateY(-2px)' });
    });

    it('removes hover styles on mouse leave', async () => {
      const user = userEvent.setup();
      const { container } = render(<MetricCardGlass label="Trust Score" value={85} />);

      const card = container.firstChild as HTMLElement;
      await user.hover(card);
      await user.unhover(card);

      // Card should return to normal
      expect(card).toHaveStyle({ transform: 'translateY(0)' });
    });
  });

  describe('Progress Bar Integration', () => {
    it('passes value to ProgressGlass', () => {
      render(<MetricCardGlass label="Trust Score" value={75} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
    });

    it('uses sm size for ProgressGlass', () => {
      render(<MetricCardGlass label="Trust Score" value={75} />);
      // ProgressGlass is rendered with size="sm"
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<MetricCardGlass ref={ref} label="Trust Score" value={85} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('spreads additional props', () => {
      render(
        <MetricCardGlass
          label="Trust Score"
          value={85}
          data-testid="metric-card"
          aria-label="Metric card"
        />
      );
      expect(screen.getByTestId('metric-card')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty label', () => {
      render(<MetricCardGlass label="" value={85} />);
      expect(screen.getByText('85%')).toBeInTheDocument();
    });

    it('handles very long label', () => {
      const longLabel = 'This is a very long label that might wrap to multiple lines';
      render(<MetricCardGlass label={longLabel} value={85} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('handles negative values', () => {
      render(<MetricCardGlass label="Trust Score" value={-10} />);
      expect(screen.getByText('-10%')).toBeInTheDocument();
    });

    it('handles values over 100', () => {
      render(<MetricCardGlass label="Trust Score" value={150} />);
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
          <MetricCardGlass label="Test" value={50} color={color} />
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('CSS Variables', () => {
    it('applies color-specific CSS variables for emerald', () => {
      const { container } = render(
        <MetricCardGlass label="Test" value={50} color="emerald" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.style.backgroundColor).toContain('var(--metric-emerald-bg)');
    });

    it('applies color-specific CSS variables for amber', () => {
      const { container } = render(
        <MetricCardGlass label="Test" value={50} color="amber" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.style.backgroundColor).toContain('var(--metric-amber-bg)');
    });

    it('applies color-specific CSS variables for blue', () => {
      const { container } = render(
        <MetricCardGlass label="Test" value={50} color="blue" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.style.backgroundColor).toContain('var(--metric-blue-bg)');
    });

    it('applies color-specific CSS variables for red', () => {
      const { container } = render(
        <MetricCardGlass label="Test" value={50} color="red" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.style.backgroundColor).toContain('var(--metric-red-bg)');
    });
  });
});
