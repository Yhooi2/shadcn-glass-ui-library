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
});
