import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlertGlass } from '../alert-glass';

describe('AlertGlass', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<AlertGlass>Test alert message</AlertGlass>);
      expect(screen.getByText(/test alert message/i)).toBeInTheDocument();
    });

    it('renders with title', () => {
      render(<AlertGlass title="Alert Title">Message</AlertGlass>);
      expect(screen.getByText(/alert title/i)).toBeInTheDocument();
      expect(screen.getByText(/message/i)).toBeInTheDocument();
    });

    it('renders without title when not provided', () => {
      render(<AlertGlass>Only message</AlertGlass>);
      expect(screen.getByText(/only message/i)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<AlertGlass className="custom-class">Message</AlertGlass>);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Variants - shadcn/ui compatible', () => {
    it('renders with default variant', () => {
      render(<AlertGlass variant="default">Default alert</AlertGlass>);
      expect(screen.getByText(/default alert/i)).toBeInTheDocument();
    });

    it('renders with destructive variant', () => {
      render(<AlertGlass variant="destructive">Destructive alert</AlertGlass>);
      expect(screen.getByText(/destructive alert/i)).toBeInTheDocument();
    });

    it('defaults to default variant when no variant specified', () => {
      render(<AlertGlass>Default by default</AlertGlass>);
      expect(screen.getByText(/default by default/i)).toBeInTheDocument();
    });
  });

  describe('Variants - Glass UI extended', () => {
    it('renders with success variant', () => {
      render(<AlertGlass variant="success">Success alert</AlertGlass>);
      expect(screen.getByText(/success alert/i)).toBeInTheDocument();
    });

    it('renders with warning variant', () => {
      render(<AlertGlass variant="warning">Warning alert</AlertGlass>);
      expect(screen.getByText(/warning alert/i)).toBeInTheDocument();
    });
  });

  describe('Backward compatibility - deprecated type prop', () => {
    it('supports deprecated type prop with info alias', () => {
      render(<AlertGlass type="info">Info alert</AlertGlass>);
      expect(screen.getByText(/info alert/i)).toBeInTheDocument();
    });

    it('supports deprecated type prop with error alias', () => {
      render(<AlertGlass type="error">Error alert</AlertGlass>);
      expect(screen.getByText(/error alert/i)).toBeInTheDocument();
    });

    it('variant prop takes precedence over type prop', () => {
      render(<AlertGlass variant="success" type="error">Success wins</AlertGlass>);
      expect(screen.getByText(/success wins/i)).toBeInTheDocument();
    });

    it('works with only variant prop', () => {
      render(<AlertGlass variant="default">With variant</AlertGlass>);
      expect(screen.getByText(/with variant/i)).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('renders icon for default variant', () => {
      const { container } = render(<AlertGlass variant="default">Message</AlertGlass>);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders icon for destructive variant', () => {
      const { container } = render(<AlertGlass variant="destructive">Message</AlertGlass>);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders icon for success variant', () => {
      const { container } = render(<AlertGlass variant="success">Message</AlertGlass>);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders icon for warning variant', () => {
      const { container } = render(<AlertGlass variant="warning">Message</AlertGlass>);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Dismissible', () => {
    it('does not show dismiss button by default', () => {
      render(<AlertGlass>Message</AlertGlass>);
      expect(screen.queryByRole('button', { name: /dismiss/i })).not.toBeInTheDocument();
    });

    it('shows dismiss button when dismissible is true', () => {
      render(<AlertGlass dismissible>Message</AlertGlass>);
      expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
    });

    it('calls onDismiss when dismiss button is clicked', async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(<AlertGlass dismissible onDismiss={handleDismiss}>Message</AlertGlass>);

      const dismissButton = screen.getByRole('button', { name: /dismiss/i });
      await user.click(dismissButton);
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('renders X icon in dismiss button', () => {
      render(<AlertGlass dismissible>Message</AlertGlass>);
      const dismissButton = screen.getByRole('button', { name: /dismiss/i });
      const icon = dismissButton.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('has role="alert"', () => {
      render(<AlertGlass>Message</AlertGlass>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<AlertGlass ref={ref}>Message</AlertGlass>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('spreads additional props', () => {
      render(<AlertGlass data-testid="custom-alert" aria-live="polite">Message</AlertGlass>);
      const alert = screen.getByTestId('custom-alert');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Accessibility', () => {
    it('has role="alert" for screen readers', () => {
      render(<AlertGlass>Message</AlertGlass>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('dismiss button has proper aria-label', () => {
      render(<AlertGlass dismissible>Message</AlertGlass>);
      const dismissButton = screen.getByRole('button', { name: /dismiss alert/i });
      expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss alert');
    });

    it('title is properly marked up', () => {
      render(<AlertGlass title="Important">Message</AlertGlass>);
      const title = screen.getByText(/important/i);
      expect(title.tagName).toBe('P');
      expect(title).toHaveClass('font-medium');
    });

    it('supports custom aria attributes', () => {
      render(<AlertGlass aria-describedby="details">Message</AlertGlass>);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-describedby', 'details');
    });
  });
});
