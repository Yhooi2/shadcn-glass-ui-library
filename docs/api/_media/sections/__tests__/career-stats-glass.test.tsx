import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CareerStatsGlass, type YearData } from '../career-stats-glass';

const mockYears: YearData[] = [
  {
    year: '2023',
    emoji: '🚀',
    label: 'Peak Year',
    commits: '1,234',
    progress: 100,
    prs: 50,
    repos: 10,
  },
  {
    year: '2022',
    emoji: '📈',
    label: 'Growth',
    commits: '800',
    progress: 65,
    prs: 30,
    repos: 8,
  },
];

describe('CareerStatsGlass', () => {
  describe('Rendering', () => {
    it('renders title', () => {
      render(<CareerStatsGlass />);
      expect(screen.getByText('Career Stats')).toBeInTheDocument();
    });

    it('renders default totals', () => {
      render(<CareerStatsGlass />);
      expect(screen.getByText('2,242 commits')).toBeInTheDocument();
      expect(screen.getByText('47 PRs')).toBeInTheDocument();
      expect(screen.getByText('11 repos')).toBeInTheDocument();
    });

    it('renders custom totals', () => {
      render(
        <CareerStatsGlass
          totalCommits={5000}
          totalPRs={100}
          totalRepos={50}
        />
      );
      expect(screen.getByText('5,000 commits')).toBeInTheDocument();
      expect(screen.getByText('100 PRs')).toBeInTheDocument();
      expect(screen.getByText('50 repos')).toBeInTheDocument();
    });

    it('renders year cards', () => {
      render(<CareerStatsGlass years={mockYears} />);
      expect(screen.getByText('2023')).toBeInTheDocument();
      expect(screen.getByText('2022')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<CareerStatsGlass className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Year Card Expansion', () => {
    it('expands year card on click', async () => {
      const user = userEvent.setup();
      render(<CareerStatsGlass years={mockYears} />);

      const yearCard = screen.getByText('2023').closest('[role="button"]');
      expect(yearCard).toHaveAttribute('aria-expanded', 'false');

      await user.click(yearCard!);
      expect(yearCard).toHaveAttribute('aria-expanded', 'true');
    });

    it('collapses year card on second click', async () => {
      const user = userEvent.setup();
      render(<CareerStatsGlass years={mockYears} />);

      const yearCard = screen.getByText('2023').closest('[role="button"]');

      await user.click(yearCard!);
      expect(yearCard).toHaveAttribute('aria-expanded', 'true');

      await user.click(yearCard!);
      expect(yearCard).toHaveAttribute('aria-expanded', 'false');
    });

    it('only one year expanded at a time', async () => {
      const user = userEvent.setup();
      render(<CareerStatsGlass years={mockYears} />);

      const year2023 = screen.getByText('2023').closest('[role="button"]');
      const year2022 = screen.getByText('2022').closest('[role="button"]');

      // Expand 2023
      await user.click(year2023!);
      expect(year2023).toHaveAttribute('aria-expanded', 'true');
      expect(year2022).toHaveAttribute('aria-expanded', 'false');

      // Expand 2022 - should collapse 2023
      await user.click(year2022!);
      expect(year2023).toHaveAttribute('aria-expanded', 'false');
      expect(year2022).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty years array', () => {
      render(<CareerStatsGlass years={[]} />);
      expect(screen.getByText('Career Stats')).toBeInTheDocument();
      // No year cards rendered
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('handles single year', () => {
      render(<CareerStatsGlass years={[mockYears[0]]} />);
      expect(screen.getByText('2023')).toBeInTheDocument();
      expect(screen.queryByText('2022')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<CareerStatsGlass ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('spreads additional props', () => {
      render(
        <CareerStatsGlass
          data-testid="career-stats"
          aria-label="Career statistics"
        />
      );
      expect(screen.getByTestId('career-stats')).toBeInTheDocument();
    });
  });
});
