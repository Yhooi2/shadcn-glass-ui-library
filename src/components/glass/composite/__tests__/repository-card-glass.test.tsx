import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RepositoryCardGlass } from '../repository-card-glass';

describe('RepositoryCardGlass', () => {
  const defaultProps = {
    name: 'my-project',
    languages: 'TypeScript, React',
    commits: 150,
    contribution: 25,
  };

  describe('Rendering', () => {
    it('renders repository name', () => {
      render(<RepositoryCardGlass {...defaultProps} />);
      expect(screen.getByText('my-project')).toBeInTheDocument();
    });

    it('renders languages', () => {
      render(<RepositoryCardGlass {...defaultProps} />);
      expect(screen.getByText('TypeScript, React')).toBeInTheDocument();
    });

    it('renders commits and contribution', () => {
      render(<RepositoryCardGlass {...defaultProps} />);
      expect(screen.getByText('150 commits · 25%')).toBeInTheDocument();
    });

    it('renders star count when provided', () => {
      render(<RepositoryCardGlass {...defaultProps} stars={42} />);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('does not show stars when zero', () => {
      render(<RepositoryCardGlass {...defaultProps} stars={0} />);
      // Star icon should not be present
      const card = screen.getByText('my-project').closest('[role="button"]');
      expect(card?.querySelector('.lucide-star')).toBeNull();
    });

    it('applies custom className', () => {
      const { container } = render(
        <RepositoryCardGlass {...defaultProps} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Expanded State', () => {
    it('shows expanded content when expanded=true', () => {
      render(<RepositoryCardGlass {...defaultProps} expanded />);

      expect(screen.getByText('Your Contribution')).toBeInTheDocument();
      expect(screen.getByText('Full Project')).toBeInTheDocument();
    });

    it('shows action buttons when expanded', () => {
      render(
        <RepositoryCardGlass
          {...defaultProps}
          expanded
          onGitHubClick={vi.fn()}
          onAIAnalysisClick={vi.fn()}
        />
      );

      expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /ai analysis/i })).toBeInTheDocument();
    });

    it('shows issues when provided and expanded', () => {
      render(
        <RepositoryCardGlass
          {...defaultProps}
          expanded
          issues={['Missing tests', 'Outdated deps']}
        />
      );

      expect(screen.getByText('Issues')).toBeInTheDocument();
      expect(screen.getByText('• Missing tests')).toBeInTheDocument();
      expect(screen.getByText('• Outdated deps')).toBeInTheDocument();
    });

    it('does not show issues section when empty', () => {
      render(<RepositoryCardGlass {...defaultProps} expanded issues={[]} />);
      expect(screen.queryByText('Issues')).not.toBeInTheDocument();
    });
  });

  describe('Calculations', () => {
    it('calculates total project commits from contribution', () => {
      render(
        <RepositoryCardGlass
          {...defaultProps}
          commits={100}
          contribution={50}
          expanded
        />
      );

      // 100 / 0.5 = 200 total commits
      expect(screen.getByText('200 commits')).toBeInTheDocument();
    });

    it('calculates estimated lines (commits * 12)', () => {
      render(
        <RepositoryCardGlass
          {...defaultProps}
          commits={100}
          contribution={100}
          expanded
        />
      );

      // 100 * 12 = 1200 lines
      expect(screen.getByText('~1200 lines')).toBeInTheDocument();
    });

    it('handles 0% contribution', () => {
      render(
        <RepositoryCardGlass
          {...defaultProps}
          commits={100}
          contribution={0}
          expanded
        />
      );

      // When contribution is 0, total equals commits
      // There are multiple elements with "100 commits" (in header and expanded section)
      const commitTexts = screen.getAllByText('100 commits');
      expect(commitTexts.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Interactions', () => {
    it('calls onToggle when card is clicked', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<RepositoryCardGlass {...defaultProps} onToggle={handleToggle} />);

      await user.click(screen.getByRole('button'));
      expect(handleToggle).toHaveBeenCalledTimes(1);
    });

    it('calls onToggle on Enter key', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<RepositoryCardGlass {...defaultProps} onToggle={handleToggle} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleToggle).toHaveBeenCalled();
    });

    it('calls onToggle on Space key', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<RepositoryCardGlass {...defaultProps} onToggle={handleToggle} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(handleToggle).toHaveBeenCalled();
    });

    it('calls onGitHubClick and stops propagation', async () => {
      const user = userEvent.setup();
      const handleGitHub = vi.fn();
      const handleToggle = vi.fn();
      render(
        <RepositoryCardGlass
          {...defaultProps}
          expanded
          onGitHubClick={handleGitHub}
          onToggle={handleToggle}
        />
      );

      await user.click(screen.getByRole('button', { name: /github/i }));

      expect(handleGitHub).toHaveBeenCalledTimes(1);
      // Toggle should NOT be called due to stopPropagation
      expect(handleToggle).not.toHaveBeenCalled();
    });

    it('calls onAIAnalysisClick and stops propagation', async () => {
      const user = userEvent.setup();
      const handleAI = vi.fn();
      const handleToggle = vi.fn();
      render(
        <RepositoryCardGlass
          {...defaultProps}
          expanded
          onAIAnalysisClick={handleAI}
          onToggle={handleToggle}
        />
      );

      await user.click(screen.getByRole('button', { name: /ai analysis/i }));

      expect(handleAI).toHaveBeenCalledTimes(1);
      expect(handleToggle).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has role="button" on clickable area', () => {
      render(<RepositoryCardGlass {...defaultProps} />);
      // When not expanded, there's only one button
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has aria-expanded attribute', () => {
      render(<RepositoryCardGlass {...defaultProps} expanded />);
      // Main card area has aria-expanded, find by aria-expanded attribute
      const expandedButton = screen.getByRole('button', { expanded: true });
      expect(expandedButton).toBeInTheDocument();
    });

    it('has tabIndex=0', () => {
      render(<RepositoryCardGlass {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '0');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<RepositoryCardGlass ref={ref} {...defaultProps} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe('Flag Types', () => {
    it('defaults to green flag', () => {
      render(<RepositoryCardGlass {...defaultProps} />);
      // StatusIndicatorGlass should be present
      expect(screen.getByRole('button').querySelector('[class*="status"]') ||
             screen.getByRole('button').querySelector('span')).toBeInTheDocument();
    });

    it('accepts different flag types', () => {
      const { rerender } = render(
        <RepositoryCardGlass {...defaultProps} flagType="green" />
      );
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<RepositoryCardGlass {...defaultProps} flagType="yellow" />);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<RepositoryCardGlass {...defaultProps} flagType="red" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined onToggle gracefully', async () => {
      const user = userEvent.setup();
      render(<RepositoryCardGlass {...defaultProps} />);

      // Should not throw
      await user.click(screen.getByRole('button'));
    });

    it('handles very large numbers', () => {
      render(
        <RepositoryCardGlass
          {...defaultProps}
          commits={1000000}
          contribution={1}
          expanded
        />
      );

      // Should render without error
      expect(screen.getByText('Your Contribution')).toBeInTheDocument();
    });
  });
});
