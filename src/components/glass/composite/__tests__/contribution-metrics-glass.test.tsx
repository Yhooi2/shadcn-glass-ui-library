import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContributionMetricsGlass } from '../contribution-metrics-glass';

describe('ContributionMetricsGlass', () => {
  const defaultProps = {
    userCommits: 150,
    userContribution: 25,
  };

  describe('Rendering', () => {
    it('renders user contribution section', () => {
      render(<ContributionMetricsGlass {...defaultProps} />);
      expect(screen.getByText('Your Contribution')).toBeInTheDocument();
    });

    it('renders full project section', () => {
      render(<ContributionMetricsGlass {...defaultProps} />);
      expect(screen.getByText('Full Project')).toBeInTheDocument();
    });

    it('displays user commits with locale formatting', () => {
      render(<ContributionMetricsGlass {...defaultProps} userCommits={1500} />);
      expect(screen.getByText('1,500 commits')).toBeInTheDocument();
    });

    it('displays contribution percentage', () => {
      render(<ContributionMetricsGlass {...defaultProps} />);
      expect(screen.getByText('25%')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ContributionMetricsGlass {...defaultProps} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Calculations', () => {
    it('calculates total project commits from contribution percentage', () => {
      render(
        <ContributionMetricsGlass
          userCommits={100}
          userContribution={50} // 50% means total is 200
        />
      );

      expect(screen.getByText('200 commits')).toBeInTheDocument();
    });

    it('uses provided totalProjectCommits when given', () => {
      render(
        <ContributionMetricsGlass
          userCommits={100}
          userContribution={50}
          totalProjectCommits={500} // Override calculation
        />
      );

      expect(screen.getByText('500 commits')).toBeInTheDocument();
    });

    it('calculates estimated lines (commits * 12)', () => {
      render(
        <ContributionMetricsGlass
          userCommits={100}
          userContribution={100}
        />
      );

      // 100 commits * 12 = 1200 lines
      expect(screen.getByText('~1,200 lines')).toBeInTheDocument();
    });

    it('uses provided estimatedLines when given', () => {
      render(
        <ContributionMetricsGlass
          userCommits={100}
          userContribution={100}
          estimatedLines={5000}
        />
      );

      expect(screen.getByText('~5,000 lines')).toBeInTheDocument();
    });

    it('handles 0% contribution gracefully', () => {
      render(
        <ContributionMetricsGlass
          userCommits={100}
          userContribution={0}
        />
      );

      // When contribution is 0%, total should equal userCommits
      // Both sections show "100 commits" - user contribution and full project
      const commitTexts = screen.getAllByText('100 commits');
      expect(commitTexts.length).toBe(2);
    });

    it('handles small contribution percentages', () => {
      render(
        <ContributionMetricsGlass
          userCommits={10}
          userContribution={1} // 1% means total is 1000
        />
      );

      expect(screen.getByText('1,000 commits')).toBeInTheDocument();
    });
  });

  describe('Grid Layout', () => {
    it('uses 2 columns by default', () => {
      const { container } = render(
        <ContributionMetricsGlass {...defaultProps} />
      );

      expect(container.firstChild).toHaveClass('grid-cols-1');
      expect(container.firstChild).toHaveClass('sm:grid-cols-2');
    });

    it('uses 1 column when specified', () => {
      const { container } = render(
        <ContributionMetricsGlass {...defaultProps} columns={1} />
      );

      expect(container.firstChild).toHaveClass('grid-cols-1');
      expect(container.firstChild).not.toHaveClass('sm:grid-cols-2');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<ContributionMetricsGlass ref={ref} {...defaultProps} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('spreads additional props', () => {
      render(
        <ContributionMetricsGlass
          {...defaultProps}
          data-testid="metrics-grid"
          aria-label="Contribution metrics"
        />
      );

      expect(screen.getByTestId('metrics-grid')).toBeInTheDocument();
      expect(screen.getByTestId('metrics-grid'))
        .toHaveAttribute('aria-label', 'Contribution metrics');
    });
  });

  describe('Edge Cases', () => {
    it('handles very large numbers', () => {
      render(
        <ContributionMetricsGlass
          userCommits={1000000}
          userContribution={10}
        />
      );

      expect(screen.getByText('1,000,000 commits')).toBeInTheDocument();
    });

    it('handles decimal contribution percentages', () => {
      // Note: Component doesn't round display, shows what's passed
      render(
        <ContributionMetricsGlass
          userCommits={100}
          userContribution={33.5}
        />
      );

      expect(screen.getByText('33.5%')).toBeInTheDocument();
    });
  });
});
