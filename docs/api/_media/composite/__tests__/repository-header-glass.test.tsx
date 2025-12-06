import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RepositoryHeaderGlass } from '../repository-header-glass';

describe('RepositoryHeaderGlass', () => {
  describe('Rendering', () => {
    it('renders repository name', () => {
      render(<RepositoryHeaderGlass name="my-project" />);
      expect(screen.getByText('my-project')).toBeInTheDocument();
    });

    it('renders status indicator', () => {
      render(<RepositoryHeaderGlass name="my-project" />);
      // StatusIndicatorGlass renders with role="status"
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders chevron down when not expanded', () => {
      const { container } = render(<RepositoryHeaderGlass name="my-project" />);
      const chevronDown = container.querySelector('.lucide-chevron-down');
      expect(chevronDown).toBeInTheDocument();
    });

    it('renders chevron up when expanded', () => {
      const { container } = render(<RepositoryHeaderGlass name="my-project" expanded />);
      const chevronUp = container.querySelector('.lucide-chevron-up');
      expect(chevronUp).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <RepositoryHeaderGlass name="my-project" className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Star Count', () => {
    it('shows stars when count > 0', () => {
      render(<RepositoryHeaderGlass name="my-project" stars={42} />);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('hides stars when count = 0', () => {
      const { container } = render(<RepositoryHeaderGlass name="my-project" stars={0} />);
      const starIcon = container.querySelector('.lucide-star');
      expect(starIcon).not.toBeInTheDocument();
    });

    it('hides stars when not provided', () => {
      const { container } = render(<RepositoryHeaderGlass name="my-project" />);
      const starIcon = container.querySelector('.lucide-star');
      expect(starIcon).not.toBeInTheDocument();
    });

    it('shows star icon with count', () => {
      const { container } = render(<RepositoryHeaderGlass name="my-project" stars={100} />);
      const starIcon = container.querySelector('.lucide-star');
      expect(starIcon).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  describe('Number Formatting', () => {
    it('shows full number when abbreviatedStars=false', () => {
      render(<RepositoryHeaderGlass name="my-project" stars={1234} />);
      expect(screen.getByText('1234')).toBeInTheDocument();
    });

    it('abbreviates thousands to k when abbreviatedStars=true', () => {
      render(<RepositoryHeaderGlass name="my-project" stars={1234} abbreviatedStars />);
      expect(screen.getByText('1.2k')).toBeInTheDocument();
    });

    it('abbreviates millions to M when abbreviatedStars=true', () => {
      render(<RepositoryHeaderGlass name="my-project" stars={1500000} abbreviatedStars />);
      expect(screen.getByText('1.5M')).toBeInTheDocument();
    });

    it('shows exact number below 1000', () => {
      render(<RepositoryHeaderGlass name="my-project" stars={999} abbreviatedStars />);
      expect(screen.getByText('999')).toBeInTheDocument();
    });

    it('handles exactly 1000', () => {
      render(<RepositoryHeaderGlass name="my-project" stars={1000} abbreviatedStars />);
      expect(screen.getByText('1.0k')).toBeInTheDocument();
    });

    it('handles exactly 1 million', () => {
      render(<RepositoryHeaderGlass name="my-project" stars={1000000} abbreviatedStars />);
      expect(screen.getByText('1.0M')).toBeInTheDocument();
    });

    it('formats with 1 decimal place for k', () => {
      render(<RepositoryHeaderGlass name="my-project" stars={5678} abbreviatedStars />);
      expect(screen.getByText('5.7k')).toBeInTheDocument();
    });

    it('formats with 1 decimal place for M', () => {
      render(<RepositoryHeaderGlass name="my-project" stars={2340000} abbreviatedStars />);
      expect(screen.getByText('2.3M')).toBeInTheDocument();
    });
  });

  describe('Flag Types', () => {
    it('defaults to green flag', () => {
      render(<RepositoryHeaderGlass name="my-project" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('accepts yellow flag', () => {
      render(<RepositoryHeaderGlass name="my-project" flagType="yellow" />);
      // Component should render without error
      expect(screen.getByText('my-project')).toBeInTheDocument();
    });

    it('accepts red flag', () => {
      render(<RepositoryHeaderGlass name="my-project" flagType="red" />);
      expect(screen.getByText('my-project')).toBeInTheDocument();
    });

    it('accepts green flag explicitly', () => {
      render(<RepositoryHeaderGlass name="my-project" flagType="green" />);
      expect(screen.getByText('my-project')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<RepositoryHeaderGlass ref={ref} name="my-project" />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('spreads additional props', () => {
      render(
        <RepositoryHeaderGlass
          name="my-project"
          data-testid="repo-header"
          aria-label="Repository header"
        />
      );
      expect(screen.getByTestId('repo-header')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles very large star counts', () => {
      render(<RepositoryHeaderGlass name="my-project" stars={999999999} abbreviatedStars />);
      expect(screen.getByText('1000.0M')).toBeInTheDocument();
    });

    it('handles very long repository names', () => {
      const longName = 'this-is-a-very-long-repository-name-that-might-wrap';
      render(<RepositoryHeaderGlass name={longName} />);
      expect(screen.getByText(longName)).toBeInTheDocument();
    });

    it('handles special characters in name', () => {
      render(<RepositoryHeaderGlass name="my-project_v2.0" />);
      expect(screen.getByText('my-project_v2.0')).toBeInTheDocument();
    });
  });
});
