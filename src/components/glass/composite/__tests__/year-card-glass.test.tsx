import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { YearCardGlass } from '../year-card-glass';

describe('YearCardGlass', () => {
  const defaultProps = {
    year: '2023',
    emoji: '🚀',
    label: 'Peak Year',
    commits: '1,234',
    progress: 75,
  };

  describe('Rendering', () => {
    it('renders year correctly', () => {
      render(<YearCardGlass {...defaultProps} />);
      expect(screen.getByText('2023')).toBeInTheDocument();
    });

    it('renders emoji and label in badge', () => {
      render(<YearCardGlass {...defaultProps} />);
      expect(screen.getByText(/🚀 Peak Year/)).toBeInTheDocument();
    });

    it('renders commits count', () => {
      render(<YearCardGlass {...defaultProps} />);
      expect(screen.getByText('1,234')).toBeInTheDocument();
    });

    it('renders progress bar', () => {
      render(<YearCardGlass {...defaultProps} />);
      // Progress bar with correct value
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<YearCardGlass {...defaultProps} className="custom-class" />);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('accepts numeric year', () => {
      render(<YearCardGlass {...defaultProps} year={2023} />);
      expect(screen.getByText('2023')).toBeInTheDocument();
    });
  });

  describe('Expanded State', () => {
    it('shows chevron down when collapsed', () => {
      render(<YearCardGlass {...defaultProps} isExpanded={false} />);
      // Check for down arrow (ChevronDown is displayed)
      const card = screen.getByRole('button');
      expect(card.querySelector('svg')).toBeInTheDocument();
    });

    it('shows expanded content when isExpanded=true', () => {
      render(<YearCardGlass {...defaultProps} isExpanded prs={50} repos={10} />);

      expect(screen.getByText('Commits')).toBeInTheDocument();
      expect(screen.getByText('PRs')).toBeInTheDocument();
      expect(screen.getByText('Repos')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('shows Show Year button when onShowYear provided and expanded', () => {
      render(<YearCardGlass {...defaultProps} isExpanded onShowYear={vi.fn()} />);

      expect(screen.getByRole('button', { name: /show repos from 2023/i })).toBeInTheDocument();
    });

    it('does not show Show Year button when collapsed', () => {
      render(<YearCardGlass {...defaultProps} isExpanded={false} onShowYear={vi.fn()} />);

      expect(screen.queryByRole('button', { name: /show repos/i })).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<YearCardGlass {...defaultProps} onClick={handleClick} />);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick on Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<YearCardGlass {...defaultProps} onClick={handleClick} />);

      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalled();
    });

    it('calls onClick on Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<YearCardGlass {...defaultProps} onClick={handleClick} />);

      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalled();
    });

    it('calls onShowYear and stops propagation', async () => {
      const user = userEvent.setup();
      const handleShowYear = vi.fn();
      const handleClick = vi.fn();
      render(
        <YearCardGlass
          {...defaultProps}
          isExpanded
          onShowYear={handleShowYear}
          onClick={handleClick}
        />
      );

      await user.click(screen.getByRole('button', { name: /show repos/i }));

      expect(handleShowYear).toHaveBeenCalledTimes(1);
      // Parent onClick should NOT be called due to stopPropagation
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has role="button"', () => {
      render(<YearCardGlass {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has tabIndex=0', () => {
      render(<YearCardGlass {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '0');
    });

    it('has aria-expanded attribute', () => {
      render(<YearCardGlass {...defaultProps} isExpanded />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('has descriptive aria-label', () => {
      render(<YearCardGlass {...defaultProps} isExpanded />);
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        expect.stringContaining('2023')
      );
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<YearCardGlass ref={ref} {...defaultProps} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe('Sparkline Integration', () => {
    it('renders sparkline when data provided', () => {
      const sparklineData = [10, 20, 15, 25, 30, 28, 35];
      render(<YearCardGlass {...defaultProps} sparklineData={sparklineData} />);

      // Sparkline has role="img"
      expect(screen.getByRole('img', { name: /activity trend/i })).toBeInTheDocument();
    });

    it('does not render sparkline when data is empty', () => {
      render(<YearCardGlass {...defaultProps} sparklineData={[]} />);

      expect(screen.queryByRole('img', { name: /activity trend/i })).not.toBeInTheDocument();
    });

    it('does not render sparkline when data is undefined', () => {
      render(<YearCardGlass {...defaultProps} />);

      expect(screen.queryByRole('img', { name: /activity trend/i })).not.toBeInTheDocument();
    });
  });

  describe('Insights Integration', () => {
    const mockInsights = [
      { variant: 'growth' as const, text: 'Growth', detail: '+47%' },
      { variant: 'highlight' as const, text: 'Best month', detail: 'April' },
    ];

    it('renders insights when expanded and insights provided', () => {
      render(<YearCardGlass {...defaultProps} isExpanded insights={mockInsights} />);

      expect(screen.getByText('Growth')).toBeInTheDocument();
      expect(screen.getByText('+47%')).toBeInTheDocument();
      expect(screen.getByText('Best month')).toBeInTheDocument();
      expect(screen.getByText('April')).toBeInTheDocument();
    });

    it('does not render insights when collapsed', () => {
      render(<YearCardGlass {...defaultProps} isExpanded={false} insights={mockInsights} />);

      expect(screen.queryByText('Growth')).not.toBeInTheDocument();
    });

    it('does not render insights section when insights array is empty', () => {
      render(<YearCardGlass {...defaultProps} isExpanded insights={[]} />);

      // Check that stats grid is still visible
      expect(screen.getByText('Commits')).toBeInTheDocument();
      // But no insight text
      expect(screen.queryByText('Growth')).not.toBeInTheDocument();
    });

    it('renders insights with custom emoji', () => {
      const insightsWithEmoji = [
        { variant: 'stat' as const, emoji: '⭐', text: 'New record', detail: 'Most PRs' },
      ];
      render(<YearCardGlass {...defaultProps} isExpanded insights={insightsWithEmoji} />);

      expect(screen.getByText('New record')).toBeInTheDocument();
      expect(screen.getByText('Most PRs')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles zero PRs and repos', () => {
      render(<YearCardGlass {...defaultProps} isExpanded prs={0} repos={0} />);

      // Should display 0 for both
      const zeros = screen.getAllByText('0');
      expect(zeros.length).toBeGreaterThanOrEqual(2);
    });

    it('handles undefined onShowYear', () => {
      render(<YearCardGlass {...defaultProps} isExpanded />);
      // Should not show the button
      expect(screen.queryByRole('button', { name: /show repos/i })).not.toBeInTheDocument();
    });

    it('handles undefined onClick gracefully', async () => {
      const user = userEvent.setup();
      render(<YearCardGlass {...defaultProps} />);

      // Should not throw
      await user.click(screen.getByRole('button'));
    });

    it('handles both sparkline and insights together', () => {
      const sparklineData = [10, 20, 15, 25, 30];
      const insights = [{ variant: 'growth' as const, text: 'Growing', detail: '+50%' }];
      render(
        <YearCardGlass
          {...defaultProps}
          isExpanded
          sparklineData={sparklineData}
          insights={insights}
        />
      );

      expect(screen.getByRole('img', { name: /activity trend/i })).toBeInTheDocument();
      expect(screen.getByText('Growing')).toBeInTheDocument();
    });
  });
});
