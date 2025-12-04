import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentedControlGlass, SegmentOption } from '../segmented-control-glass';

const mockOptions: SegmentOption[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'contributions', label: 'Contributions' },
  { value: 'projects', label: 'Projects' },
];

describe('SegmentedControlGlass', () => {
  describe('Rendering', () => {
    it('renders all options', () => {
      render(<SegmentedControlGlass options={mockOptions} value="overview" />);

      expect(screen.getByText('Overview')).toBeInTheDocument();
      expect(screen.getByText('Contributions')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });

    it('renders with tablist role', () => {
      render(<SegmentedControlGlass options={mockOptions} value="overview" />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders each option as a tab', () => {
      render(<SegmentedControlGlass options={mockOptions} value="overview" />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
    });

    it('applies custom className', () => {
      render(
        <SegmentedControlGlass
          options={mockOptions}
          value="overview"
          className="custom-class"
        />
      );
      expect(screen.getByRole('tablist')).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<SegmentedControlGlass ref={ref} options={mockOptions} value="overview" />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe('Selection State', () => {
    it('marks selected option with aria-selected=true', () => {
      render(<SegmentedControlGlass options={mockOptions} value="contributions" />);

      const overviewTab = screen.getByText('Overview').closest('[role="tab"]');
      const contributionsTab = screen.getByText('Contributions').closest('[role="tab"]');
      const projectsTab = screen.getByText('Projects').closest('[role="tab"]');

      expect(overviewTab).toHaveAttribute('aria-selected', 'false');
      expect(contributionsTab).toHaveAttribute('aria-selected', 'true');
      expect(projectsTab).toHaveAttribute('aria-selected', 'false');
    });

    it('updates aria-selected when value changes', () => {
      const { rerender } = render(
        <SegmentedControlGlass options={mockOptions} value="overview" />
      );

      expect(screen.getByText('Overview').closest('[role="tab"]'))
        .toHaveAttribute('aria-selected', 'true');

      rerender(<SegmentedControlGlass options={mockOptions} value="projects" />);

      expect(screen.getByText('Overview').closest('[role="tab"]'))
        .toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('Projects').closest('[role="tab"]'))
        .toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Interactions', () => {
    it('calls onChange when option is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <SegmentedControlGlass
          options={mockOptions}
          value="overview"
          onChange={handleChange}
        />
      );

      await user.click(screen.getByText('Contributions'));
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('contributions');
    });

    it('calls onChange with correct value for each option', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <SegmentedControlGlass
          options={mockOptions}
          value="overview"
          onChange={handleChange}
        />
      );

      await user.click(screen.getByText('Projects'));
      expect(handleChange).toHaveBeenCalledWith('projects');

      await user.click(screen.getByText('Overview'));
      expect(handleChange).toHaveBeenCalledWith('overview');
    });

    it('handles click on already selected option', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <SegmentedControlGlass
          options={mockOptions}
          value="overview"
          onChange={handleChange}
        />
      );

      await user.click(screen.getByText('Overview'));
      expect(handleChange).toHaveBeenCalledWith('overview');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options array', () => {
      render(<SegmentedControlGlass options={[]} value="" />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.queryAllByRole('tab')).toHaveLength(0);
    });

    it('handles undefined onChange gracefully', async () => {
      const user = userEvent.setup();
      render(<SegmentedControlGlass options={mockOptions} value="overview" />);

      // Should not throw
      await user.click(screen.getByText('Contributions'));
    });

    it('handles single option', () => {
      const singleOption = [{ value: 'only', label: 'Only Option' }];
      render(<SegmentedControlGlass options={singleOption} value="only" />);

      expect(screen.getByText('Only Option')).toBeInTheDocument();
      expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true');
    });

    it('handles value not in options', () => {
      render(
        <SegmentedControlGlass options={mockOptions} value="nonexistent" />
      );

      // All should be aria-selected=false
      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab) => {
        expect(tab).toHaveAttribute('aria-selected', 'false');
      });
    });
  });

  describe('Accessibility', () => {
    it('each button has type="button"', () => {
      render(<SegmentedControlGlass options={mockOptions} value="overview" />);
      const tabs = screen.getAllByRole('tab');

      tabs.forEach((tab) => {
        expect(tab).toHaveAttribute('type', 'button');
      });
    });

    it('is keyboard accessible', () => {
      render(<SegmentedControlGlass options={mockOptions} value="overview" />);
      const firstTab = screen.getAllByRole('tab')[0];

      firstTab.focus();
      expect(firstTab).toHaveFocus();
    });

    it('spreads additional props', () => {
      render(
        <SegmentedControlGlass
          options={mockOptions}
          value="overview"
          data-testid="custom-segmented"
          aria-label="View selection"
        />
      );

      const tablist = screen.getByTestId('custom-segmented');
      expect(tablist).toHaveAttribute('aria-label', 'View selection');
    });
  });

  describe('Styling', () => {
    it('applies active styles to selected option', () => {
      render(<SegmentedControlGlass options={mockOptions} value="contributions" />);

      const activeTab = screen.getByText('Contributions').closest('[role="tab"]');
      expect(activeTab).toHaveStyle({ background: 'var(--segmented-active-bg)' });
    });

    it('applies inactive styles to non-selected options', () => {
      render(<SegmentedControlGlass options={mockOptions} value="contributions" />);

      const inactiveTab = screen.getByText('Overview').closest('[role="tab"]');
      expect(inactiveTab).toHaveStyle({ background: 'transparent' });
    });
  });
});
