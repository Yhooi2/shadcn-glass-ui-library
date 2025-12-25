import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProfileHeaderGlass } from '../profile-header-glass';

describe('ProfileHeaderGlass', () => {
  describe('Rendering', () => {
    it('renders with default name', () => {
      render(<ProfileHeaderGlass />);
      expect(screen.getByText('Artem Safronov')).toBeInTheDocument();
    });

    it('renders with custom name', () => {
      render(<ProfileHeaderGlass name="John Doe" />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders username with @ prefix', () => {
      render(<ProfileHeaderGlass username="testuser" />);
      expect(screen.getByText(/@testuser/)).toBeInTheDocument();
    });

    it('renders join date', () => {
      render(<ProfileHeaderGlass joinDate="March 2020" />);
      // formatJoinDate converts "March 2020" to "March 1, 2020"
      expect(screen.getByText(/Joined March 1, 2020/)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<ProfileHeaderGlass className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Stats', () => {
    it('renders default stats', () => {
      render(<ProfileHeaderGlass />);
      // Stats are rendered with number + label separately in ProfileHeaderExtendedGlass
      expect(screen.getByText('11')).toBeInTheDocument();
      expect(screen.getByText('repos')).toBeInTheDocument();
    });

    it('renders custom stats', () => {
      render(<ProfileHeaderGlass stats={{ repos: 50, followers: 100, following: 25 }} />);
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('25')).toBeInTheDocument();
    });

    it('merges partial stats with defaults', () => {
      render(<ProfileHeaderGlass stats={{ repos: 99 }} />);
      expect(screen.getByText('99')).toBeInTheDocument();
      // Defaults for others
      expect(screen.getByText('1')).toBeInTheDocument(); // followers
      expect(screen.getByText('5')).toBeInTheDocument(); // following
    });
  });

  describe('Languages', () => {
    it('does not render language bar when no languages', () => {
      render(<ProfileHeaderGlass languages={[]} />);
      // LanguageBarGlass should not be rendered
      expect(
        screen.queryByRole('group', { name: /language distribution/i })
      ).not.toBeInTheDocument();
    });

    it('renders language bar when languages provided', () => {
      render(
        <ProfileHeaderGlass
          languages={[
            { name: 'TypeScript', percent: 60, color: '#3178c6' },
            { name: 'JavaScript', percent: 40, color: '#f7df1e' },
          ]}
        />
      );
      // LanguageBarGlass renders segments - check via aria-label
      expect(screen.getByRole('group', { name: /language distribution/i })).toBeInTheDocument();
    });
  });

  describe('AI Card', () => {
    it('renders AI card with glass background', () => {
      render(<ProfileHeaderGlass />);
      expect(screen.getByText(/Generate Report/i)).toBeInTheDocument();
    });
  });

  describe('Composite Structure', () => {
    it('renders ProfileHeaderExtendedGlass without glass (transparent)', () => {
      const { container } = render(<ProfileHeaderGlass />);
      // ProfileHeaderExtendedGlass with transparent=true should not have data-slot="card"
      // But AICardGlass might have its own styling
      // The root container is a plain div with flex layout
      expect(container.firstChild).toHaveClass('flex');
    });

    it('renders AICardGlass with its own glass styling', () => {
      render(<ProfileHeaderGlass />);
      // AICardGlass should be present with its content
      expect(screen.getByText(/Generate Report/i)).toBeInTheDocument();
    });
  });

  describe('Extended Fields (Issue #30)', () => {
    it('renders bio when provided', () => {
      render(<ProfileHeaderGlass bio="Software engineer and open source enthusiast" />);
      expect(screen.getByText(/Software engineer and open source enthusiast/)).toBeInTheDocument();
    });

    it('does not render bio when not provided', () => {
      const { container } = render(<ProfileHeaderGlass />);
      // Bio should not be present in the document
      expect(container.textContent).not.toContain('Software engineer');
    });

    it('renders location when provided', () => {
      render(<ProfileHeaderGlass location="San Francisco, CA" />);
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    });

    it('does not render location when not provided', () => {
      render(<ProfileHeaderGlass />);
      // Location icon and text should not be present
      expect(screen.queryByText(/San Francisco/)).not.toBeInTheDocument();
    });

    it('renders avatar when URL provided', () => {
      render(<ProfileHeaderGlass avatar="https://example.com/avatar.jpg" name="John Doe" />);
      const avatar = screen.getByAltText("John Doe's avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('renders initials when no avatar URL', () => {
      render(<ProfileHeaderGlass name="John Doe" avatar="" />);
      // Should render ProfileAvatarGlass with initials fallback
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders custom profile URL', () => {
      render(<ProfileHeaderGlass url="https://github.com/octocat" username="octocat" />);
      const link = screen.getByRole('link', { name: /@octocat/i });
      expect(link).toHaveAttribute('href', 'https://github.com/octocat');
    });

    it('renders default URL when not provided', () => {
      render(<ProfileHeaderGlass username="testuser" />);
      const link = screen.getByRole('link', { name: /@testuser/i });
      expect(link).toHaveAttribute('href', '#');
    });

    it('renders gists count when provided', () => {
      render(<ProfileHeaderGlass stats={{ gists: 25 }} />);
      expect(screen.getByText('25')).toBeInTheDocument();
      expect(screen.getByText('gists')).toBeInTheDocument();
    });

    it('does not render gists when count is 0', () => {
      render(<ProfileHeaderGlass stats={{ gists: 0 }} />);
      expect(screen.queryByText('gists')).not.toBeInTheDocument();
    });

    it('renders all extended fields together', () => {
      render(
        <ProfileHeaderGlass
          name="The Octocat"
          username="octocat"
          avatar="https://github.com/octocat.png"
          bio="GitHub mascot"
          location="San Francisco"
          url="https://github.com/octocat"
          joinDate="2011-01-25T18:44:36Z"
          stats={{ repos: 42, followers: 1000, following: 50, gists: 10 }}
        />
      );

      expect(screen.getByText('The Octocat')).toBeInTheDocument();
      expect(screen.getByText('GitHub mascot')).toBeInTheDocument();
      expect(screen.getByText('San Francisco')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('gists')).toBeInTheDocument();

      const link = screen.getByRole('link', { name: /@octocat/i });
      expect(link).toHaveAttribute('href', 'https://github.com/octocat');
    });
  });

  describe('Accessibility', () => {
    it('has heading element', () => {
      render(<ProfileHeaderGlass />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<ProfileHeaderGlass ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('spreads additional props', () => {
      render(<ProfileHeaderGlass data-testid="profile-header" aria-label="User profile" />);
      expect(screen.getByTestId('profile-header')).toBeInTheDocument();
    });
  });

  describe('Compound Component API (Issue #31)', () => {
    const mockUser = {
      name: 'John Doe',
      login: 'johndoe',
      avatar: 'https://example.com/avatar.jpg',
      url: 'https://github.com/johndoe',
      createdAt: '2023-01-15',
      stats: { repos: 42, followers: 100, following: 50 },
      languages: [{ name: 'TypeScript', percent: 60, color: '#3178c6' }],
    };

    describe('ProfileHeaderGlass.Root', () => {
      it('renders children', () => {
        render(
          <ProfileHeaderGlass.Root>
            <div data-testid="child">Child content</div>
          </ProfileHeaderGlass.Root>
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();
      });

      it('applies horizontal layout by default', () => {
        const { container } = render(
          <ProfileHeaderGlass.Root>
            <div>Content</div>
          </ProfileHeaderGlass.Root>
        );
        expect(container.firstChild).toHaveClass('lg:flex-row');
      });

      it('applies stacked layout when specified', () => {
        const { container } = render(
          <ProfileHeaderGlass.Root layout="stacked">
            <div>Content</div>
          </ProfileHeaderGlass.Root>
        );
        expect(container.firstChild).toHaveClass('flex-col');
        expect(container.firstChild).not.toHaveClass('lg:flex-row');
      });

      it('forwards ref correctly', () => {
        const ref = vi.fn();
        render(
          <ProfileHeaderGlass.Root ref={ref}>
            <div>Content</div>
          </ProfileHeaderGlass.Root>
        );
        expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
      });

      it('applies custom className', () => {
        const { container } = render(
          <ProfileHeaderGlass.Root className="custom-root">
            <div>Content</div>
          </ProfileHeaderGlass.Root>
        );
        expect(container.firstChild).toHaveClass('custom-root');
      });
    });

    describe('ProfileHeaderGlass.Profile', () => {
      it('renders user information', () => {
        render(
          <ProfileHeaderGlass.Root>
            <ProfileHeaderGlass.Profile user={mockUser} />
          </ProfileHeaderGlass.Root>
        );
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText(/@johndoe/)).toBeInTheDocument();
      });

      it('renders with status indicator', () => {
        render(
          <ProfileHeaderGlass.Root>
            <ProfileHeaderGlass.Profile user={mockUser} showStatus status="online" />
          </ProfileHeaderGlass.Root>
        );
        // Status indicator should be present (via ProfileAvatarGlass)
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      it('applies horizontal width when in horizontal layout', () => {
        const { container } = render(
          <ProfileHeaderGlass.Root layout="horizontal">
            <ProfileHeaderGlass.Profile user={mockUser} />
          </ProfileHeaderGlass.Root>
        );
        const profile = container.querySelector('[class*="lg:w-1/2"]');
        expect(profile).toBeInTheDocument();
      });

      it('does not apply width constraints in stacked layout', () => {
        const { container } = render(
          <ProfileHeaderGlass.Root layout="stacked">
            <ProfileHeaderGlass.Profile user={mockUser} />
          </ProfileHeaderGlass.Root>
        );
        const profile = container.querySelector('[class*="lg:w-1/2"]');
        expect(profile).not.toBeInTheDocument();
      });

      it('throws error when used outside Root', () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
        expect(() => {
          render(<ProfileHeaderGlass.Profile user={mockUser} />);
        }).toThrow('ProfileHeader compound components must be used within ProfileHeaderGlass.Root');
        consoleError.mockRestore();
      });
    });

    describe('ProfileHeaderGlass.AI', () => {
      it('renders AI card with default content', () => {
        render(
          <ProfileHeaderGlass.Root>
            <ProfileHeaderGlass.AI />
          </ProfileHeaderGlass.Root>
        );
        expect(screen.getByText(/Generate Report/i)).toBeInTheDocument();
        expect(screen.getByText(/~30 seconds/)).toBeInTheDocument();
      });

      it('renders with custom features', () => {
        render(
          <ProfileHeaderGlass.Root>
            <ProfileHeaderGlass.AI features={['Custom feature 1', 'Custom feature 2']} />
          </ProfileHeaderGlass.Root>
        );
        expect(screen.getByText('Custom feature 1')).toBeInTheDocument();
        expect(screen.getByText('Custom feature 2')).toBeInTheDocument();
      });

      it('renders with custom estimated time', () => {
        render(
          <ProfileHeaderGlass.Root>
            <ProfileHeaderGlass.AI estimatedTime="~2 minutes" />
          </ProfileHeaderGlass.Root>
        );
        expect(screen.getByText('~2 minutes')).toBeInTheDocument();
      });

      it('calls onGenerate when button clicked', async () => {
        const user = userEvent.setup();
        const onGenerate = vi.fn();
        render(
          <ProfileHeaderGlass.Root>
            <ProfileHeaderGlass.AI onGenerate={onGenerate} />
          </ProfileHeaderGlass.Root>
        );
        await user.click(screen.getByRole('button', { name: /Generate Report/i }));
        expect(onGenerate).toHaveBeenCalledTimes(1);
      });

      it('applies custom className', () => {
        render(
          <ProfileHeaderGlass.Root>
            <ProfileHeaderGlass.AI className="custom-ai-class" />
          </ProfileHeaderGlass.Root>
        );
        // The className is applied to AICardGlass inside the wrapper
        const aiCard = document.querySelector('.custom-ai-class');
        expect(aiCard).toBeInTheDocument();
      });

      it('throws error when used outside Root', () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
        expect(() => {
          render(<ProfileHeaderGlass.AI />);
        }).toThrow('ProfileHeader compound components must be used within ProfileHeaderGlass.Root');
        consoleError.mockRestore();
      });
    });

    describe('Full Compound Usage', () => {
      it('renders complete compound structure', () => {
        const onGenerate = vi.fn();
        render(
          <ProfileHeaderGlass.Root layout="horizontal">
            <ProfileHeaderGlass.Profile user={mockUser} showStatus status="online" />
            <ProfileHeaderGlass.AI
              onGenerate={onGenerate}
              features={['Code review', 'Security audit']}
              estimatedTime="~1 minute"
            />
          </ProfileHeaderGlass.Root>
        );

        // Profile content
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText(/@johndoe/)).toBeInTheDocument();

        // AI card content
        expect(screen.getByText('Code review')).toBeInTheDocument();
        expect(screen.getByText('Security audit')).toBeInTheDocument();
        expect(screen.getByText('~1 minute')).toBeInTheDocument();
      });

      it('allows replacing AI card with custom component', () => {
        render(
          <ProfileHeaderGlass.Root>
            <ProfileHeaderGlass.Profile user={mockUser} />
            <div data-testid="custom-ai">Custom AI Component</div>
          </ProfileHeaderGlass.Root>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByTestId('custom-ai')).toBeInTheDocument();
        // Default AI card should not be present
        expect(screen.queryByText(/Generate Report/i)).not.toBeInTheDocument();
      });
    });

    describe('Legacy API Compatibility', () => {
      it('legacy API still works with layout prop', () => {
        const { container } = render(<ProfileHeaderGlass layout="stacked" />);
        expect(container.firstChild).toHaveClass('flex-col');
      });

      it('legacy API renders both profile and AI card', () => {
        render(<ProfileHeaderGlass name="Legacy User" />);
        expect(screen.getByText('Legacy User')).toBeInTheDocument();
        expect(screen.getByText(/Generate Report/i)).toBeInTheDocument();
      });
    });
  });
});
