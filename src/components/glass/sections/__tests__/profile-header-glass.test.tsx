import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
      expect(screen.getByText(/Joined March 2020/)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<ProfileHeaderGlass className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('getInitials Logic', () => {
    it('generates initials from full name', () => {
      render(<ProfileHeaderGlass name="John Doe" />);
      // ProfileAvatarGlass should receive "JD" as initials
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('generates initials from single word name', () => {
      render(<ProfileHeaderGlass name="John" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('limits initials to 2 characters', () => {
      render(<ProfileHeaderGlass name="John Middle Doe" />);
      // Should be "JM" (first 2)
      expect(screen.getByText('JM')).toBeInTheDocument();
    });

    it('handles empty name', () => {
      render(<ProfileHeaderGlass name="" />);
      // Empty initials
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });
  });

  describe('Stats', () => {
    it('renders default stats', () => {
      render(<ProfileHeaderGlass />);
      expect(screen.getByText('11 repos')).toBeInTheDocument();
      expect(screen.getByText('1 followers')).toBeInTheDocument();
      expect(screen.getByText('5 following')).toBeInTheDocument();
    });

    it('renders custom stats', () => {
      render(<ProfileHeaderGlass stats={{ repos: 50, followers: 100, following: 25 }} />);
      expect(screen.getByText('50 repos')).toBeInTheDocument();
      expect(screen.getByText('100 followers')).toBeInTheDocument();
      expect(screen.getByText('25 following')).toBeInTheDocument();
    });

    it('merges partial stats with defaults', () => {
      render(<ProfileHeaderGlass stats={{ repos: 99 }} />);
      expect(screen.getByText('99 repos')).toBeInTheDocument();
      // Defaults for others
      expect(screen.getByText('1 followers')).toBeInTheDocument();
      expect(screen.getByText('5 following')).toBeInTheDocument();
    });
  });

  describe('Languages', () => {
    it('does not render language bar when no languages', () => {
      render(<ProfileHeaderGlass languages={[]} />);
      // LanguageBarGlass should not be rendered
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
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
    it('renders AI card', () => {
      render(<ProfileHeaderGlass />);
      expect(screen.getByText(/Generate/i)).toBeInTheDocument();
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

  describe('Transparent Mode', () => {
    it('renders with GlassCard by default (transparent=false)', () => {
      const { container } = render(<ProfileHeaderGlass />);
      // GlassCard has data-slot="card" attribute
      expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
    });

    it('renders without GlassCard when transparent=true', () => {
      const { container } = render(<ProfileHeaderGlass transparent />);
      // Should not have the GlassCard data-slot attribute
      expect(container.querySelector('[data-slot="card"]')).not.toBeInTheDocument();
    });

    it('AICardGlass keeps glass background when parent is transparent', () => {
      render(<ProfileHeaderGlass transparent />);
      // AICardGlass uses InteractiveCard which should still be present
      // Check that Generate button is still rendered (AICardGlass content)
      expect(screen.getByText(/Generate/i)).toBeInTheDocument();
    });

    it('preserves className when transparent', () => {
      const { container } = render(<ProfileHeaderGlass transparent className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
      expect(container.firstChild).toHaveClass('p-5');
    });

    it('forwards ref when transparent', () => {
      const ref = vi.fn();
      render(<ProfileHeaderGlass transparent ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('spreads props when transparent', () => {
      render(<ProfileHeaderGlass transparent data-testid="transparent-header" />);
      expect(screen.getByTestId('transparent-header')).toBeInTheDocument();
    });
  });
});
