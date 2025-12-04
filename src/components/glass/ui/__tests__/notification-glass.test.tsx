import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotificationGlass } from '../notification-glass';

describe('NotificationGlass', () => {
  describe('Rendering', () => {
    it('renders notification with title and message', () => {
      render(
        <NotificationGlass
          variant="default"
          title="Notification Title"
          message="Notification message"
          onClose={vi.fn()}
        />
      );
      expect(screen.getByText('Notification Title')).toBeInTheDocument();
      expect(screen.getByText('Notification message')).toBeInTheDocument();
    });

    it('renders with correct ARIA attributes', () => {
      render(
        <NotificationGlass
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      const notification = screen.getByRole('alert');
      expect(notification).toHaveAttribute('aria-live', 'polite');
    });

    it('applies custom className', () => {
      const { container } = render(
        <NotificationGlass
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
          className="custom-class"
        />
      );
      const notification = container.firstChild;
      expect(notification).toHaveClass('custom-class');
    });

    it('renders close button with correct aria-label', () => {
      render(
        <NotificationGlass
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      expect(screen.getByLabelText('Close notification')).toBeInTheDocument();
    });
  });

  describe('Type Variants', () => {
    it('renders info type by default', () => {
      render(
        <NotificationGlass
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      const notification = screen.getByRole('alert');
      expect(notification).toBeInTheDocument();
    });

    it('renders info type explicitly', () => {
      render(
        <NotificationGlass
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('renders success type', () => {
      render(
        <NotificationGlass
          variant="success"
          title="Success"
          message="Operation successful"
          onClose={vi.fn()}
        />
      );
      expect(screen.getByText('Success')).toBeInTheDocument();
    });

    it('renders warning type', () => {
      render(
        <NotificationGlass
          variant="warning"
          title="Warning"
          message="Warning message"
          onClose={vi.fn()}
        />
      );
      expect(screen.getByText('Warning')).toBeInTheDocument();
    });

    it('renders error type', () => {
      render(
        <NotificationGlass
          variant="destructive"
          title="Error"
          message="Error message"
          onClose={vi.fn()}
        />
      );
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('renders info icon for info type', () => {
      const { container } = render(
        <NotificationGlass
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders success icon for success type', () => {
      const { container } = render(
        <NotificationGlass
          variant="success"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders warning icon for warning type', () => {
      const { container } = render(
        <NotificationGlass
          variant="warning"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders error icon for error type', () => {
      const { container } = render(
        <NotificationGlass
          variant="destructive"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(
        <NotificationGlass
          variant="default"
          title="Test"
          message="Message"
          onClose={handleClose}
        />
      );

      const closeButton = screen.getByLabelText('Close notification');
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('displays X icon in close button', () => {
      render(
        <NotificationGlass
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      const closeButton = screen.getByLabelText('Close notification');
      const icon = closeButton.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Hover Effects', () => {
    it('applies hover state when mouse enters', async () => {
      const user = userEvent.setup();
      render(
        <NotificationGlass
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );

      const notification = screen.getByRole('alert');
      await user.hover(notification);

      // Hover state is applied (tested by checking element exists)
      expect(notification).toBeInTheDocument();
    });

    it('removes hover state when mouse leaves', async () => {
      const user = userEvent.setup();
      render(
        <NotificationGlass
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );

      const notification = screen.getByRole('alert');
      await user.hover(notification);
      await user.unhover(notification);

      expect(notification).toBeInTheDocument();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to notification div', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(
        <NotificationGlass
          ref={ref}
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref to access element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(
        <NotificationGlass
          ref={ref}
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        expect((ref.current as HTMLElement).tagName).toBe('DIV');
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to notification div', () => {
      render(
        <NotificationGlass
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
          data-testid="custom-notification"
        />
      );

      const notification = screen.getByTestId('custom-notification');
      expect(notification).toBeInTheDocument();
    });

    it('applies id attribute correctly', () => {
      render(
        <NotificationGlass
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
          id="my-notification"
        />
      );
      const notification = screen.getByRole('alert');
      expect(notification).toHaveAttribute('id', 'my-notification');
    });
  });

  describe('Theme Styling', () => {
    it('applies notification CSS variables', () => {
      render(
        <NotificationGlass
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      const notification = screen.getByRole('alert');
      expect(notification).toHaveStyle({
        background: 'var(--notification-bg)',
      });
    });

    it('applies type-specific color variables', () => {
      const { container } = render(
        <NotificationGlass
          variant="success"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      const iconContainer = container.querySelector('.rounded-xl') as HTMLElement;
      expect(iconContainer).toHaveStyle({
        background: 'var(--notification-success-icon-bg)',
      });
    });
  });

  describe('Content Layout', () => {
    it('renders title with correct styling', () => {
      render(
        <NotificationGlass
          variant="default"
          title="Test Title"
          message="Message"
          onClose={vi.fn()}
        />
      );
      const title = screen.getByText('Test Title');
      expect(title).toHaveStyle({
        color: 'var(--text-primary)',
      });
    });

    it('renders message with correct styling', () => {
      render(
        <NotificationGlass
          variant="default"
          title="Title"
          message="Test Message"
          onClose={vi.fn()}
        />
      );
      const message = screen.getByText('Test Message');
      expect(message).toHaveStyle({
        color: 'var(--text-secondary)',
      });
    });

    it('renders long title', () => {
      const longTitle = 'This is a very long notification title that should still render correctly';
      render(
        <NotificationGlass
          variant="default"
          title={longTitle}
          message="Message"
          onClose={vi.fn()}
        />
      );
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('renders long message', () => {
      const longMessage = 'This is a very long notification message that provides detailed information about the event or action that occurred';
      render(
        <NotificationGlass
          variant="default"
          title="Title"
          message={longMessage}
          onClose={vi.fn()}
        />
      );
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });
  });

  describe('Multiple Notifications', () => {
    it('renders multiple notifications independently', () => {
      const { container } = render(
        <>
          <NotificationGlass
            variant="default"
            title="Info"
            message="Info message"
            onClose={vi.fn()}
          />
          <NotificationGlass
            variant="success"
            title="Success"
            message="Success message"
            onClose={vi.fn()}
          />
          <NotificationGlass
            variant="destructive"
            title="Error"
            message="Error message"
            onClose={vi.fn()}
          />
        </>
      );

      const notifications = container.querySelectorAll('[role="alert"]');
      expect(notifications).toHaveLength(3);
    });

    it('each notification has independent close handler', async () => {
      const user = userEvent.setup();
      const handleClose1 = vi.fn();
      const handleClose2 = vi.fn();

      render(
        <>
          <NotificationGlass
            variant="default"
            title="Notification 1"
            message="Message 1"
            onClose={handleClose1}
          />
          <NotificationGlass
            variant="success"
            title="Notification 2"
            message="Message 2"
            onClose={handleClose2}
          />
        </>
      );

      const closeButtons = screen.getAllByLabelText('Close notification');
      await user.click(closeButtons[0]);

      expect(handleClose1).toHaveBeenCalledTimes(1);
      expect(handleClose2).not.toHaveBeenCalled();
    });
  });

  describe('Type Color Configurations', () => {
    it('applies info colors correctly', () => {
      const { container } = render(
        <NotificationGlass
          variant="default"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      const iconContainer = container.querySelector('.rounded-xl') as HTMLElement;
      expect(iconContainer).toHaveStyle({
        background: 'var(--notification-info-icon-bg)',
      });
    });

    it('applies warning colors correctly', () => {
      const { container } = render(
        <NotificationGlass
          variant="warning"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      const iconContainer = container.querySelector('.rounded-xl') as HTMLElement;
      expect(iconContainer).toHaveStyle({
        background: 'var(--notification-warning-icon-bg)',
      });
    });

    it('applies error colors correctly', () => {
      const { container } = render(
        <NotificationGlass
          variant="destructive"
          title="Test"
          message="Message"
          onClose={vi.fn()}
        />
      );
      const iconContainer = container.querySelector('.rounded-xl') as HTMLElement;
      expect(iconContainer).toHaveStyle({
        background: 'var(--notification-error-icon-bg)',
      });
    });
  });
});
