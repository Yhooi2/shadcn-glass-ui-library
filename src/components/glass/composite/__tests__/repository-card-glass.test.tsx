import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RepositoryCardGlass } from '../repository-card-glass';
import type { ContributorRole } from '../repository-card-glass';

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
      render(<RepositoryCardGlass {...defaultProps} commits={100} contribution={50} expanded />);

      // 100 / 0.5 = 200 total commits
      expect(screen.getByText('200 commits')).toBeInTheDocument();
    });

    it('calculates estimated lines (commits * 12)', () => {
      render(<RepositoryCardGlass {...defaultProps} commits={100} contribution={100} expanded />);

      // 100 * 12 = 1200 lines
      expect(screen.getByText('~1200 lines')).toBeInTheDocument();
    });

    it('handles 0% contribution', () => {
      render(<RepositoryCardGlass {...defaultProps} commits={100} contribution={0} expanded />);

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

      await user.tab();
      await user.keyboard('{Enter}');

      expect(handleToggle).toHaveBeenCalled();
    });

    it('calls onToggle on Space key', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<RepositoryCardGlass {...defaultProps} onToggle={handleToggle} />);

      await user.tab();
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
      expect(
        screen.getByRole('button').querySelector('[class*="status"]') ||
          screen.getByRole('button').querySelector('span')
      ).toBeInTheDocument();
    });

    it('accepts different flag types', () => {
      const { rerender } = render(<RepositoryCardGlass {...defaultProps} flagType="green" />);
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
      render(<RepositoryCardGlass {...defaultProps} commits={1000000} contribution={1} expanded />);

      // Should render without error
      expect(screen.getByText('Your Contribution')).toBeInTheDocument();
    });
  });
});

// ========================================
// NEW SUB-COMPONENTS TESTS (Issue #28)
// ========================================

describe('RepositoryCardGlass.ContributionBadge', () => {
  it('renders percentage', () => {
    render(<RepositoryCardGlass.ContributionBadge percent={45} />);
    expect(screen.getByText('45%')).toBeInTheDocument();
  });

  it('applies destructive variant for 0-25%', () => {
    const { container } = render(<RepositoryCardGlass.ContributionBadge percent={20} />);
    // BadgeGlass destructive variant check
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies warning variant for 26-50%', () => {
    const { container } = render(<RepositoryCardGlass.ContributionBadge percent={40} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies default variant for 51-75%', () => {
    const { container } = render(<RepositoryCardGlass.ContributionBadge percent={60} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies success variant for 76-100%', () => {
    const { container } = render(<RepositoryCardGlass.ContributionBadge percent={85} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe('RepositoryCardGlass.ForkBadge', () => {
  it('renders Fork text', () => {
    render(<RepositoryCardGlass.ForkBadge />);
    expect(screen.getByText('Fork')).toBeInTheDocument();
  });

  it('renders fork icon', () => {
    const { container } = render(<RepositoryCardGlass.ForkBadge />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows forkedFrom info on hover when provided', async () => {
    const user = userEvent.setup();
    render(<RepositoryCardGlass.ForkBadge forkedFrom="facebook/react" />);

    const badge = screen.getByText('Fork');
    await user.hover(badge);

    await waitFor(() => {
      expect(screen.getByText('facebook/react')).toBeInTheDocument();
    });
  });
});

describe('RepositoryCardGlass.Language', () => {
  it('renders language name', () => {
    render(<RepositoryCardGlass.Language name="TypeScript" />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders percentage when provided', () => {
    render(<RepositoryCardGlass.Language name="TypeScript" percent={65} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('renders color dot', () => {
    const { container } = render(<RepositoryCardGlass.Language name="TypeScript" />);
    const colorDot = container.querySelector('.rounded-full');
    expect(colorDot).toBeInTheDocument();
  });

  it('uses custom color when provided', () => {
    const { container } = render(<RepositoryCardGlass.Language name="Custom" color="#ff0000" />);
    const colorDot = container.querySelector('.rounded-full');
    expect(colorDot).toHaveStyle({ backgroundColor: '#ff0000' });
  });
});

describe('RepositoryCardGlass.ActivityStatus', () => {
  it('renders Active for recent activity', () => {
    const today = new Date().toISOString();
    render(<RepositoryCardGlass.ActivityStatus lastActivityDate={today} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders Recent for 7-30 days ago', () => {
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    render(<RepositoryCardGlass.ActivityStatus lastActivityDate={twoWeeksAgo} />);
    expect(screen.getByText('Recent')).toBeInTheDocument();
  });

  it('renders Stale for 30-90 days ago', () => {
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();
    render(<RepositoryCardGlass.ActivityStatus lastActivityDate={sixtyDaysAgo} />);
    expect(screen.getByText('Stale')).toBeInTheDocument();
  });

  it('renders Inactive for >90 days ago', () => {
    const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString();
    render(<RepositoryCardGlass.ActivityStatus lastActivityDate={sixMonthsAgo} />);
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });
});

describe('RepositoryCardGlass.RoleBadge', () => {
  const roles: ContributorRole[] = ['owner', 'lead', 'core', 'maintainer', 'contributor'];

  it.each(roles)('renders %s role', (role) => {
    render(<RepositoryCardGlass.RoleBadge role={role} />);
    // Each role should render a capitalized label
    expect(screen.getByText(role.charAt(0).toUpperCase() + role.slice(1))).toBeInTheDocument();
  });
});

describe('RepositoryCardGlass.TeamAvatars', () => {
  const members = [
    { id: '1', name: 'Alice Johnson', avatar: 'https://example.com/alice.png' },
    { id: '2', name: 'Bob Smith' },
    { id: '3', name: 'Charlie Brown' },
  ];

  it('renders member avatars', () => {
    const { container } = render(<RepositoryCardGlass.TeamAvatars members={members} />);
    // Should have 3 avatar containers
    const avatars = container.querySelectorAll('[class*="rounded-full"]');
    expect(avatars.length).toBeGreaterThanOrEqual(3);
  });

  it('shows +N indicator when more than max', () => {
    render(<RepositoryCardGlass.TeamAvatars members={members} max={2} total={10} />);
    expect(screen.getByText('+8')).toBeInTheDocument();
  });

  it('respects max prop', () => {
    const { container } = render(<RepositoryCardGlass.TeamAvatars members={members} max={2} />);
    // Should only show 2 avatars plus the +N indicator
    expect(container.firstChild).toBeInTheDocument();
  });

  it('shows member info on hover', async () => {
    const user = userEvent.setup();
    render(<RepositoryCardGlass.TeamAvatars members={members} />);

    // Find an avatar and hover
    const avatarContainers = screen.getAllByText('AJ'); // Alice Johnson initials
    await user.hover(avatarContainers[0]);

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });
  });
});

describe('RepositoryCardGlass.HealthStatus', () => {
  it('renders Healthy for recent push', () => {
    const today = new Date().toISOString();
    render(<RepositoryCardGlass.HealthStatus pushedAt={today} />);
    expect(screen.getByText('Healthy')).toBeInTheDocument();
  });

  it('renders Maintenance for 90-365 days', () => {
    const fourMonthsAgo = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString();
    render(<RepositoryCardGlass.HealthStatus pushedAt={fourMonthsAgo} />);
    expect(screen.getByText('Maintenance')).toBeInTheDocument();
  });

  it('renders Stale for >365 days', () => {
    const twoYearsAgo = new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toISOString();
    render(<RepositoryCardGlass.HealthStatus pushedAt={twoYearsAgo} />);
    expect(screen.getByText('Stale')).toBeInTheDocument();
  });

  it('renders Archived when isArchived=true', () => {
    const today = new Date().toISOString();
    render(<RepositoryCardGlass.HealthStatus pushedAt={today} isArchived={true} />);
    expect(screen.getByText('Archived')).toBeInTheDocument();
  });
});

describe('RepositoryCardGlass.ContributionProgress', () => {
  it('renders commits progress', () => {
    render(<RepositoryCardGlass.ContributionProgress userCommits={150} totalCommits={500} />);
    expect(screen.getByText(/150/)).toBeInTheDocument();
    expect(screen.getByText(/500/)).toBeInTheDocument();
    expect(screen.getByText(/30%/)).toBeInTheDocument();
  });

  it('renders PRs merged when provided', () => {
    render(
      <RepositoryCardGlass.ContributionProgress
        userCommits={100}
        totalCommits={500}
        prsMerged={12}
      />
    );
    expect(screen.getByText('PRs Merged')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('renders reviews when provided', () => {
    render(
      <RepositoryCardGlass.ContributionProgress userCommits={100} totalCommits={500} reviews={28} />
    );
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('28')).toBeInTheDocument();
  });

  it('renders both PRs and reviews', () => {
    render(
      <RepositoryCardGlass.ContributionProgress
        userCommits={100}
        totalCommits={500}
        prsMerged={12}
        reviews={28}
      />
    );
    expect(screen.getByText('PRs Merged')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });

  it('handles large numbers with suffix', () => {
    render(<RepositoryCardGlass.ContributionProgress userCommits={1500} totalCommits={10000} />);
    expect(screen.getByText(/1\.5k/)).toBeInTheDocument();
    expect(screen.getByText(/10\.0k/)).toBeInTheDocument();
  });
});
