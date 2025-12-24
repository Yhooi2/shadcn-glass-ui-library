import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GitCommit, GitPullRequest } from 'lucide-react';
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

      // There are 2 buttons: the card container and the action button
      const actionButton = screen.getByText(/show repos from 2023/i).closest('button');
      expect(actionButton).toBeInTheDocument();
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

    it('supports keyboard navigation with Enter key', async () => {
      const user = userEvent.setup();
      render(<YearCardGlass {...defaultProps} />);

      // Get the card container specifically
      const card = screen.getByRole('button');
      card.focus();

      // Verify card is focusable
      expect(document.activeElement).toBe(card);

      // Enter key should work (component handles it internally for expand/collapse)
      await user.keyboard('{Enter}');
    });

    it('supports keyboard navigation with Space key', async () => {
      const user = userEvent.setup();
      render(<YearCardGlass {...defaultProps} />);

      // Get the card container specifically
      const card = screen.getByRole('button');
      card.focus();

      // Verify card is focusable
      expect(document.activeElement).toBe(card);

      // Space key should work (component handles it internally for expand/collapse)
      await user.keyboard(' ');
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

      // Get the action button by its text content
      const actionButton = screen.getByText(/show repos/i).closest('button');
      expect(actionButton).toBeInTheDocument();
      await user.click(actionButton!);

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

    it('has aria-expanded and aria-selected attributes', () => {
      render(<YearCardGlass {...defaultProps} isExpanded />);
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('aria-expanded', 'true');
      expect(card).toHaveAttribute('aria-selected', 'false');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<YearCardGlass ref={ref} {...defaultProps} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe('Sparkline Integration', () => {
    it('renders sparkline when data provided and expanded', () => {
      const sparklineData = [10, 20, 15, 25, 30, 28, 35];
      render(<YearCardGlass {...defaultProps} isExpanded sparklineData={sparklineData} />);

      // Sparkline has role="img" with aria-label containing "Sparkline chart"
      expect(screen.getByRole('img', { name: /sparkline chart/i })).toBeInTheDocument();
    });

    it('does not render sparkline in collapsed view', () => {
      const sparklineData = [10, 20, 15, 25, 30, 28, 35];
      render(<YearCardGlass {...defaultProps} sparklineData={sparklineData} />);

      // Sparkline should not be visible when collapsed
      expect(screen.queryByRole('img', { name: /sparkline chart/i })).not.toBeInTheDocument();
    });

    it('does not render sparkline when data is empty', () => {
      render(<YearCardGlass {...defaultProps} isExpanded sparklineData={[]} />);

      expect(screen.queryByRole('img', { name: /sparkline chart/i })).not.toBeInTheDocument();
    });

    it('does not render sparkline when data is undefined', () => {
      render(<YearCardGlass {...defaultProps} isExpanded />);

      expect(screen.queryByRole('img', { name: /sparkline chart/i })).not.toBeInTheDocument();
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

    it('handles both sparkline and insights together when expanded', () => {
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

      // Sparkline is only visible in expanded view
      expect(screen.getByRole('img', { name: /sparkline chart/i })).toBeInTheDocument();
      expect(screen.getByText('Growing')).toBeInTheDocument();
    });
  });

  describe('Custom Stats', () => {
    it('renders custom stats when provided', () => {
      const customStats = [
        { label: 'Commits', value: '2,567' },
        { label: 'PRs', value: 234 },
        { label: 'Stars', value: '1.2k' },
      ];
      render(<YearCardGlass {...defaultProps} isExpanded stats={customStats} />);

      expect(screen.getByText('2,567')).toBeInTheDocument();
      expect(screen.getByText('234')).toBeInTheDocument();
      expect(screen.getByText('1.2k')).toBeInTheDocument();
    });

    it('renders stats with icons', () => {
      const statsWithIcons = [
        {
          label: 'Commits',
          value: '2,567',
          icon: <GitCommit data-testid="commit-icon" className="w-4 h-4" />,
        },
        {
          label: 'PRs',
          value: 234,
          icon: <GitPullRequest data-testid="pr-icon" className="w-4 h-4" />,
        },
      ];
      render(<YearCardGlass {...defaultProps} isExpanded stats={statsWithIcons} />);

      expect(screen.getByTestId('commit-icon')).toBeInTheDocument();
      expect(screen.getByTestId('pr-icon')).toBeInTheDocument();
    });

    it('uses default stats when custom stats not provided', () => {
      render(<YearCardGlass {...defaultProps} isExpanded prs={50} repos={10} />);

      expect(screen.getByText('Commits')).toBeInTheDocument();
      expect(screen.getByText('PRs')).toBeInTheDocument();
      expect(screen.getByText('Repos')).toBeInTheDocument();
    });
  });

  describe('Sparkline Labels', () => {
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const sparklineData = [100, 120, 140, 160, 180, 200];

    it('passes labels to sparkline in expanded view', () => {
      render(
        <YearCardGlass
          {...defaultProps}
          isExpanded
          sparklineData={sparklineData}
          sparklineLabels={monthLabels}
        />
      );

      // Sparkline should be rendered with labels (aria-label includes month name at max value)
      expect(screen.getByRole('img', { name: /sparkline chart.*Jun/i })).toBeInTheDocument();
    });
  });

  describe('Sparkline Visibility', () => {
    const sparklineData = [100, 120, 140, 160, 180, 200];

    it('does not show sparkline in collapsed view', () => {
      render(<YearCardGlass {...defaultProps} sparklineData={sparklineData} />);

      // Sparkline is now only shown in expanded view
      expect(screen.queryByRole('img', { name: /sparkline chart/i })).not.toBeInTheDocument();
    });

    it('shows sparkline in expanded view', () => {
      render(<YearCardGlass {...defaultProps} isExpanded sparklineData={sparklineData} />);

      // Sparkline should be visible when expanded
      expect(screen.getByRole('img', { name: /sparkline chart/i })).toBeInTheDocument();
    });

    it('shows sparkline with labels in expanded view', () => {
      render(
        <YearCardGlass
          {...defaultProps}
          isExpanded
          sparklineData={sparklineData}
          sparklineLabels={['J', 'F', 'M', 'A', 'M', 'J']}
        />
      );

      // Expanded view should show sparkline with labels (aria-label includes label at max value)
      expect(screen.getByRole('img', { name: /sparkline chart/i })).toBeInTheDocument();
    });
  });

  describe('Custom Action Label', () => {
    it('renders custom action label', () => {
      render(
        <YearCardGlass
          {...defaultProps}
          isExpanded
          actionLabel="View detailed analytics"
          onShowYear={vi.fn()}
        />
      );

      // Find the action button by its text
      const actionButton = screen.getByText(/view detailed analytics/i).closest('button');
      expect(actionButton).toBeInTheDocument();
    });

    it('uses default action label when not provided', () => {
      render(<YearCardGlass {...defaultProps} isExpanded onShowYear={vi.fn()} />);

      // Find the action button by its text
      const actionButton = screen.getByText(/show repos from 2023/i).closest('button');
      expect(actionButton).toBeInTheDocument();
    });
  });

  describe('Value Formatter', () => {
    it('formats commits display with custom formatter', () => {
      render(
        <YearCardGlass
          {...defaultProps}
          commits="3456"
          valueFormatter={(commits) => `${(parseInt(commits) / 1000).toFixed(1)}k commits`}
        />
      );

      expect(screen.getByText('3.5k commits')).toBeInTheDocument();
    });

    it('uses raw value when no formatter provided', () => {
      render(<YearCardGlass {...defaultProps} commits="1,234" />);

      expect(screen.getByText('1,234')).toBeInTheDocument();
    });
  });

  describe('Children Content', () => {
    it('renders children in expanded view', () => {
      render(
        <YearCardGlass {...defaultProps} isExpanded>
          <div data-testid="custom-content">Custom Content</div>
        </YearCardGlass>
      );

      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('does not render children when collapsed', () => {
      render(
        <YearCardGlass {...defaultProps}>
          <div data-testid="custom-content">Custom Content</div>
        </YearCardGlass>
      );

      expect(screen.queryByTestId('custom-content')).not.toBeInTheDocument();
    });
  });

  describe('Full Featured Extended', () => {
    it('renders all new features together', () => {
      const customStats = [
        {
          label: 'Commits',
          value: '4.6k',
          icon: <GitCommit data-testid="commit-icon" className="w-4 h-4" />,
        },
        {
          label: 'PRs',
          value: 456,
          icon: <GitPullRequest data-testid="pr-icon" className="w-4 h-4" />,
        },
      ];

      render(
        <YearCardGlass
          year={2024}
          emoji="🏅"
          label="Best Year"
          commits="4567"
          progress={95}
          gradient="gold"
          isExpanded
          sparklineData={[250, 280, 310, 340, 370, 400]}
          sparklineLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
          valueFormatter={(commits) => `${(parseInt(commits) / 1000).toFixed(1)}k`}
          stats={customStats}
          insights={[
            { variant: 'growth', text: 'Record Breaking', detail: 'Most productive year' },
          ]}
          actionLabel="Explore 2024"
          onShowYear={vi.fn()}
        >
          <div data-testid="languages">TypeScript, Python, Go</div>
        </YearCardGlass>
      );

      // Check year and badge
      expect(screen.getByText('2024')).toBeInTheDocument();
      expect(screen.getByText(/🏅 Best Year/)).toBeInTheDocument();

      // Check formatted value in header (valueFormatter is applied there)
      // and in stats grid (custom stats have value '4.6k')
      // Use getAllByText since both places show '4.6k'
      const formattedValues = screen.getAllByText('4.6k');
      expect(formattedValues.length).toBeGreaterThanOrEqual(1);

      // Check custom stats with icons
      expect(screen.getByTestId('commit-icon')).toBeInTheDocument();
      expect(screen.getByTestId('pr-icon')).toBeInTheDocument();

      // Check insights
      expect(screen.getByText('Record Breaking')).toBeInTheDocument();
      expect(screen.getByText('Most productive year')).toBeInTheDocument();

      // Check custom action label (find by text, not by role because there are 2 buttons)
      const actionButton = screen.getByText(/explore 2024/i).closest('button');
      expect(actionButton).toBeInTheDocument();

      // Check children
      expect(screen.getByTestId('languages')).toBeInTheDocument();

      // Check sparkline in expanded view (aria-label includes label at max value)
      expect(screen.getByRole('img', { name: /sparkline chart.*Jun/i })).toBeInTheDocument();
    });
  });
});
