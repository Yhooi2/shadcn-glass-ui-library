import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlertTriangle } from 'lucide-react';
import { ExpandableHeaderGlass } from '../expandable-header-glass';

describe('ExpandableHeaderGlass', () => {
  describe('Rendering', () => {
    it('renders title', () => {
      render(
        <ExpandableHeaderGlass title="Warnings" expanded={false} />
      );
      expect(screen.getByText('Warnings')).toBeInTheDocument();
    });

    it('renders icon when provided', () => {
      const { container } = render(
        <ExpandableHeaderGlass
          title="Warnings"
          expanded={false}
          icon={AlertTriangle}
        />
      );
      // Icon is rendered as SVG
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(1); // Icon + Chevron
    });

    it('renders without icon', () => {
      const { container } = render(
        <ExpandableHeaderGlass title="Warnings" expanded={false} />
      );
      expect(container.querySelector('.lucide')).toBeInTheDocument(); // Only chevron
    });

    it('renders chevron down when collapsed', () => {
      const { container } = render(
        <ExpandableHeaderGlass title="Warnings" expanded={false} />
      );
      expect(container.querySelector('.lucide-chevron-down')).toBeInTheDocument();
    });

    it('renders chevron up when expanded', () => {
      const { container } = render(
        <ExpandableHeaderGlass title="Warnings" expanded />
      );
      expect(container.querySelector('.lucide-chevron-up')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <ExpandableHeaderGlass
          title="Warnings"
          expanded={false}
          className="custom-class"
        />
      );
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('Toggle Callback', () => {
    it('calls onToggle when clicked', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(
        <ExpandableHeaderGlass
          title="Warnings"
          expanded={false}
          onToggle={handleToggle}
        />
      );

      await user.click(screen.getByRole('button'));
      expect(handleToggle).toHaveBeenCalledTimes(1);
    });

    it('calls onToggle on Enter key', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(
        <ExpandableHeaderGlass
          title="Warnings"
          expanded={false}
          onToggle={handleToggle}
        />
      );

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleToggle).toHaveBeenCalled();
    });

    it('calls onToggle on Space key', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(
        <ExpandableHeaderGlass
          title="Warnings"
          expanded={false}
          onToggle={handleToggle}
        />
      );

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(handleToggle).toHaveBeenCalled();
    });

    it('does not throw when onToggle is undefined', async () => {
      const user = userEvent.setup();
      render(
        <ExpandableHeaderGlass title="Warnings" expanded={false} />
      );

      // Should not throw
      await user.click(screen.getByRole('button'));
    });
  });

  describe('Expanded State', () => {
    it('has aria-expanded=false when collapsed', () => {
      render(
        <ExpandableHeaderGlass title="Warnings" expanded={false} />
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('has aria-expanded=true when expanded', () => {
      render(
        <ExpandableHeaderGlass title="Warnings" expanded />
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('updates chevron based on expanded state', () => {
      const { container, rerender } = render(
        <ExpandableHeaderGlass title="Warnings" expanded={false} />
      );
      expect(container.querySelector('.lucide-chevron-down')).toBeInTheDocument();

      rerender(<ExpandableHeaderGlass title="Warnings" expanded />);
      expect(container.querySelector('.lucide-chevron-up')).toBeInTheDocument();
    });
  });

  describe('Icon Color', () => {
    it('uses default icon color', () => {
      const { container } = render(
        <ExpandableHeaderGlass
          title="Warnings"
          expanded={false}
          icon={AlertTriangle}
        />
      );
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('applies custom icon color', () => {
      const { container } = render(
        <ExpandableHeaderGlass
          title="Warnings"
          expanded={false}
          icon={AlertTriangle}
          iconColor="var(--status-red)"
        />
      );
      const icon = container.querySelector('svg');
      expect(icon).toHaveStyle({ color: 'var(--status-red)' });
    });

    it('accepts CSS variable as icon color', () => {
      const { container } = render(
        <ExpandableHeaderGlass
          title="Warnings"
          expanded={false}
          icon={AlertTriangle}
          iconColor="var(--text-accent)"
        />
      );
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('accepts hex color as icon color', () => {
      const { container } = render(
        <ExpandableHeaderGlass
          title="Warnings"
          expanded={false}
          icon={AlertTriangle}
          iconColor="#ff0000"
        />
      );
      const icon = container.querySelector('svg');
      expect(icon).toHaveStyle({ color: '#ff0000' });
    });
  });

  describe('Title Types', () => {
    it('renders string title', () => {
      render(
        <ExpandableHeaderGlass title="String Title" expanded={false} />
      );
      expect(screen.getByText('String Title')).toBeInTheDocument();
    });

    it('renders ReactNode title', () => {
      render(
        <ExpandableHeaderGlass
          title={<span data-testid="custom-title">Custom Title</span>}
          expanded={false}
        />
      );
      expect(screen.getByTestId('custom-title')).toBeInTheDocument();
    });

    it('renders number title', () => {
      render(
        <ExpandableHeaderGlass title={42} expanded={false} />
      );
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has type="button"', () => {
      render(
        <ExpandableHeaderGlass title="Warnings" expanded={false} />
      );
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(
        <ExpandableHeaderGlass
          title="Warnings"
          expanded={false}
          onToggle={handleToggle}
        />
      );

      const button = screen.getByRole('button');
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(
        <ExpandableHeaderGlass ref={ref} title="Warnings" expanded={false} />
      );
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
    });

    it('spreads additional props', () => {
      render(
        <ExpandableHeaderGlass
          title="Warnings"
          expanded={false}
          data-testid="expandable-header"
          aria-label="Toggle warnings"
        />
      );
      expect(screen.getByTestId('expandable-header')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles disabled state', () => {
      render(
        <ExpandableHeaderGlass title="Warnings" expanded={false} disabled />
      );
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('handles very long title', () => {
      const longTitle = 'This is a very long title that might wrap to multiple lines in the UI';
      render(
        <ExpandableHeaderGlass title={longTitle} expanded={false} />
      );
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('handles empty string title', () => {
      render(
        <ExpandableHeaderGlass title="" expanded={false} />
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles rapid toggling', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(
        <ExpandableHeaderGlass
          title="Warnings"
          expanded={false}
          onToggle={handleToggle}
        />
      );

      const button = screen.getByRole('button');
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(handleToggle).toHaveBeenCalledTimes(3);
    });
  });
});
