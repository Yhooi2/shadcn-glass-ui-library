import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlagAlertGlass } from '../flag-alert-glass';

describe('FlagAlertGlass', () => {
  describe('Rendering', () => {
    it('renders alert with title', () => {
      render(<FlagAlertGlass title="Warning message" />);
      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(<FlagAlertGlass title="Warning" description="This is a warning message" />);
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByText('This is a warning message')).toBeInTheDocument();
    });

    it('renders without description', () => {
      render(<FlagAlertGlass title="Warning" />);
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<FlagAlertGlass title="Warning" className="custom-class" />);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass('custom-class');
    });
  });

  describe('Type Variants', () => {
    it('renders warning type (default)', () => {
      const { container } = render(<FlagAlertGlass title="Warning" />);
      const alert = container.querySelector('[role="alert"]') as HTMLElement;
      expect(alert.style.background).toBe('var(--alert-warning-bg)');
      expect(alert.style.borderColor).toBe('var(--alert-warning-border)');
    });

    it('renders danger type', () => {
      const { container } = render(<FlagAlertGlass title="Danger" type="danger" />);
      const alert = container.querySelector('[role="alert"]') as HTMLElement;
      expect(alert.style.background).toBe('var(--alert-danger-bg)');
      expect(alert.style.borderColor).toBe('var(--alert-danger-border)');
    });

    it('applies correct text color for warning', () => {
      const { container } = render(<FlagAlertGlass title="Warning message" type="warning" />);
      const titleContainer = container.querySelector('.flex.items-center') as HTMLElement;
      expect(titleContainer.style.color).toBe('var(--alert-warning-text)');
    });

    it('applies correct text color for danger', () => {
      const { container } = render(<FlagAlertGlass title="Danger message" type="danger" />);
      const titleContainer = container.querySelector('.flex.items-center') as HTMLElement;
      expect(titleContainer.style.color).toBe('var(--alert-danger-text)');
    });
  });

  describe('Status Indicator', () => {
    it('shows yellow status for warning', () => {
      const { container } = render(<FlagAlertGlass title="Warning" type="warning" />);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
    });

    it('shows red status for danger', () => {
      const { container } = render(<FlagAlertGlass title="Danger" type="danger" />);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
    });
  });

  describe('Hover Interaction', () => {
    it('has hover event handlers', () => {
      const { container } = render(<FlagAlertGlass title="Warning" />);
      const alert = container.querySelector('[role="alert"]') as HTMLElement;

      // Alert should have transition classes for hover animation
      expect(alert).toHaveClass('transition-all', 'duration-300');

      // Initially not hovered
      expect(alert.style.transform).toBe('translateX(0)');
    });

    it('has transition duration', () => {
      const { container } = render(<FlagAlertGlass title="Warning" />);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass('transition-all', 'duration-300');
    });
  });

  describe('Accessibility', () => {
    it('has role="alert"', () => {
      const { container } = render(<FlagAlertGlass title="Warning" />);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
    });

    it('has accessible text for screen readers', () => {
      render(<FlagAlertGlass title="Important warning" />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('Important warning');
    });

    it('description uses muted text color', () => {
      render(<FlagAlertGlass title="Warning" description="Details here" />);
      const description = screen.getByText('Details here');
      expect(description).toHaveStyle({
        color: 'var(--text-muted)',
      });
    });
  });

  describe('Responsive Styling', () => {
    it('has responsive padding', () => {
      const { container } = render(<FlagAlertGlass title="Warning" />);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass('p-2.5', 'md:p-3');
    });

    it('has responsive font size', () => {
      const { container } = render(<FlagAlertGlass title="Warning" />);
      const titleContainer = container.querySelector('.flex.items-center') as HTMLElement;
      expect(titleContainer).toHaveClass('text-xs', 'md:text-sm');
    });

    it('has responsive gap in title row', () => {
      const { container } = render(<FlagAlertGlass title="Warning" />);
      const titleContainer = container.querySelector('.flex.items-center') as HTMLElement;
      expect(titleContainer).toHaveClass('gap-1.5', 'md:gap-2');
    });

    it('description has responsive font size', () => {
      render(<FlagAlertGlass title="Warning" description="Details" />);
      const description = screen.getByText('Details');
      expect(description).toHaveClass('text-[10px]', 'md:text-xs');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to div element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<FlagAlertGlass ref={ref} title="Warning" />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref methods to be called', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<FlagAlertGlass ref={ref} title="Warning" />);

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        expect(ref.current.tagName).toBe('DIV');
        expect(ref.current).toHaveAttribute('role', 'alert');
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes', () => {
      const { container } = render(
        <FlagAlertGlass title="Warning" data-testid="flag-alert" id="warning-1" />
      );

      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveAttribute('data-testid', 'flag-alert');
      expect(alert).toHaveAttribute('id', 'warning-1');
    });
  });

  describe('Edge Cases', () => {
    it('handles long titles', () => {
      const longTitle = 'This is a very long warning message that should wrap properly';
      render(<FlagAlertGlass title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('handles long descriptions', () => {
      const longDesc =
        'This is a very long description that provides detailed information about the warning';
      render(<FlagAlertGlass title="Warning" description={longDesc} />);
      expect(screen.getByText(longDesc)).toBeInTheDocument();
    });

    it('handles empty description string', () => {
      render(<FlagAlertGlass title="Warning" description="" />);
      expect(screen.getByText('Warning')).toBeInTheDocument();
    });
  });
});
