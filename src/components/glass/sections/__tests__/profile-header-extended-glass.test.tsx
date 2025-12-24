import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProfileHeaderExtendedGlass } from '../profile-header-extended-glass';

const mockUser = {
  name: 'The Octocat',
  login: 'octocat',
  avatar: 'https://github.com/octocat.png',
  url: 'https://github.com/octocat',
  createdAt: '2011-01-25T18:44:36Z',
};

describe('ProfileHeaderExtendedGlass', () => {
  describe('Rendering', () => {
    it('renders user name', () => {
      render(<ProfileHeaderExtendedGlass user={mockUser} />);
      expect(screen.getByText('The Octocat')).toBeInTheDocument();
    });

    it('renders login as display name when name is null', () => {
      render(<ProfileHeaderExtendedGlass user={{ ...mockUser, name: null }} />);
      expect(screen.getByRole('heading')).toHaveTextContent('octocat');
    });

    it('renders username with @ prefix and link', () => {
      render(<ProfileHeaderExtendedGlass user={mockUser} />);
      const link = screen.getByRole('link', { name: /@octocat/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://github.com/octocat');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('renders avatar image when provided', () => {
      render(<ProfileHeaderExtendedGlass user={mockUser} />);
      const avatar = screen.getByRole('img', { name: /octocat's avatar/i });
      expect(avatar).toHaveAttribute('src', 'https://github.com/octocat.png');
    });

    it('applies custom className', () => {
      const { container } = render(
        <ProfileHeaderExtendedGlass user={mockUser} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Date Formatting', () => {
    it('formats ISO date to human readable', () => {
      render(<ProfileHeaderExtendedGlass user={mockUser} />);
      expect(screen.getByText(/Joined January 25, 2011/)).toBeInTheDocument();
    });

    it('handles parseable date string', () => {
      render(<ProfileHeaderExtendedGlass user={{ ...mockUser, createdAt: 'Jan 2023' }} />);
      // "Jan 2023" is parsed as a valid date and formatted to "January 1, 2023"
      expect(screen.getByText(/Joined January 1, 2023/)).toBeInTheDocument();
    });

    it('handles invalid date gracefully', () => {
      render(<ProfileHeaderExtendedGlass user={{ ...mockUser, createdAt: 'invalid-date' }} />);
      expect(screen.getByText(/Joined invalid-date/)).toBeInTheDocument();
    });
  });

  describe('Bio', () => {
    it('renders bio when provided', () => {
      render(
        <ProfileHeaderExtendedGlass
          user={{ ...mockUser, bio: 'GitHub mascot and friend to all' }}
        />
      );
      expect(screen.getByText('GitHub mascot and friend to all')).toBeInTheDocument();
    });

    it('does not render bio section when null', () => {
      render(<ProfileHeaderExtendedGlass user={{ ...mockUser, bio: null }} />);
      expect(screen.queryByText(/GitHub mascot/)).not.toBeInTheDocument();
    });

    it('does not render bio section when undefined', () => {
      render(<ProfileHeaderExtendedGlass user={mockUser} />);
      // Check that no paragraph with bio exists
      const paragraphs = screen.queryAllByText(
        (_, element) => element?.tagName === 'P' && element?.classList.contains('line-clamp-2')
      );
      expect(paragraphs).toHaveLength(0);
    });
  });

  describe('Location', () => {
    it('renders location when provided', () => {
      render(<ProfileHeaderExtendedGlass user={{ ...mockUser, location: 'San Francisco' }} />);
      expect(screen.getByText('San Francisco')).toBeInTheDocument();
    });

    it('does not render location when null', () => {
      render(<ProfileHeaderExtendedGlass user={{ ...mockUser, location: null }} />);
      expect(screen.queryByText('San Francisco')).not.toBeInTheDocument();
    });
  });

  describe('Stats', () => {
    it('renders default stats (all zeros)', () => {
      render(<ProfileHeaderExtendedGlass user={mockUser} />);
      // Multiple "0" values are expected (repos, followers, following)
      expect(screen.getAllByText('0')).toHaveLength(3);
      expect(screen.getByText('repos')).toBeInTheDocument();
    });

    it('renders custom stats', () => {
      render(
        <ProfileHeaderExtendedGlass
          user={{
            ...mockUser,
            stats: { repos: 42, followers: 100, following: 50, gists: 10 },
          }}
        />
      );
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('hides gists when zero', () => {
      render(<ProfileHeaderExtendedGlass user={{ ...mockUser, stats: { repos: 5, gists: 0 } }} />);
      expect(screen.queryByText('gists')).not.toBeInTheDocument();
    });

    it('shows gists when greater than zero', () => {
      render(<ProfileHeaderExtendedGlass user={{ ...mockUser, stats: { gists: 15 } }} />);
      expect(screen.getByText('gists')).toBeInTheDocument();
      expect(screen.getByText('15')).toBeInTheDocument();
    });
  });

  describe('Languages', () => {
    it('does not render language bar when no languages', () => {
      render(<ProfileHeaderExtendedGlass user={mockUser} />);
      expect(
        screen.queryByRole('group', { name: /language distribution/i })
      ).not.toBeInTheDocument();
    });

    it('renders language bar when languages provided', () => {
      render(
        <ProfileHeaderExtendedGlass
          user={{
            ...mockUser,
            languages: [
              { name: 'TypeScript', percent: 60, color: '#3178c6' },
              { name: 'JavaScript', percent: 40, color: '#f7df1e' },
            ],
          }}
        />
      );
      expect(screen.getByRole('group', { name: /language distribution/i })).toBeInTheDocument();
    });
  });

  describe('Actions Slot', () => {
    it('renders custom actions when provided', () => {
      render(<ProfileHeaderExtendedGlass user={mockUser} actions={<button>Follow</button>} />);
      expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
    });

    it('does not render actions slot when not provided', () => {
      const { container } = render(<ProfileHeaderExtendedGlass user={mockUser} />);
      // No extra button besides the link
      expect(container.querySelectorAll('button')).toHaveLength(0);
    });
  });

  describe('Accessibility', () => {
    it('has heading element', () => {
      render(<ProfileHeaderExtendedGlass user={mockUser} />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('external link has proper attributes', () => {
      render(<ProfileHeaderExtendedGlass user={mockUser} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<ProfileHeaderExtendedGlass user={mockUser} ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('spreads additional props', () => {
      render(
        <ProfileHeaderExtendedGlass
          user={mockUser}
          data-testid="profile-header-extended"
          aria-label="Extended user profile"
        />
      );
      expect(screen.getByTestId('profile-header-extended')).toBeInTheDocument();
    });
  });
});
