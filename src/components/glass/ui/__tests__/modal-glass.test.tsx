import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalGlass } from '../modal-glass';
import type { ReactNode } from 'react';

// Helper to render ModalGlass with controlled mode
const renderModal = ({
  open = true,
  onOpenChange = vi.fn(),
  title = 'Test Modal',
  description,
  children = 'Content' as ReactNode,
  size,
  showCloseButton = true,
  className,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  className?: string;
} = {}) => {
  return render(
    <ModalGlass.Root open={open} onOpenChange={onOpenChange} size={size}>
      <ModalGlass.Content showCloseButton={showCloseButton} className={className}>
        <ModalGlass.Header>
          <ModalGlass.Title>{title}</ModalGlass.Title>
          {description && <ModalGlass.Description>{description}</ModalGlass.Description>}
        </ModalGlass.Header>
        <ModalGlass.Body>{children}</ModalGlass.Body>
      </ModalGlass.Content>
    </ModalGlass.Root>
  );
};

describe('ModalGlass', () => {
  describe('Rendering', () => {
    it('renders nothing when open is false', () => {
      renderModal({ open: false });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders modal when open is true', () => {
      renderModal();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('displays modal title', () => {
      renderModal({ title: 'Modal Title' });
      expect(screen.getByText('Modal Title')).toBeInTheDocument();
    });

    it('displays modal children content', () => {
      renderModal({ children: <p>Modal content here</p> });
      expect(screen.getByText('Modal content here')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderModal({ className: 'custom-class' });
      const content = screen.getByRole('dialog');
      expect(content).toHaveClass('custom-class');
    });
  });

  describe('ARIA Attributes (Radix Dialog)', () => {
    it('has correct dialog role', () => {
      renderModal();
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('has correct accessibility semantics', () => {
      renderModal();
      // Radix Dialog provides modal semantics
      const dialog = screen.getByRole('dialog');
      // The dialog element is found, confirming modal semantics
      // Radix handles focus trapping and body scroll lock internally
      expect(dialog).toBeInTheDocument();
    });

    it('links title to dialog via aria-labelledby', () => {
      renderModal({ title: 'Test Title' });
      const dialog = screen.getByRole('dialog');
      // Radix automatically generates and links IDs
      expect(dialog).toHaveAttribute('aria-labelledby');
    });

    it('links description to dialog via aria-describedby when description exists', () => {
      renderModal({ description: 'Test Description' });
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-describedby');
    });
  });

  describe('Size Variants', () => {
    it('renders small size', () => {
      renderModal({ size: 'sm' });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      renderModal();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders large size', () => {
      renderModal({ size: 'lg' });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders extra large size', () => {
      renderModal({ size: 'xl' });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders full size', () => {
      renderModal({ size: 'full' });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('renders close button when showCloseButton is true', () => {
      renderModal({ showCloseButton: true });
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('does not render close button when showCloseButton is false', () => {
      renderModal({ showCloseButton: false });
      const closeButton = screen.queryByRole('button', { name: /close/i });
      expect(closeButton).not.toBeInTheDocument();
    });

    it('calls onOpenChange when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleOpenChange = vi.fn();
      renderModal({ onOpenChange: handleOpenChange });

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(false);
      });
    });

    it('displays X icon in close button', () => {
      renderModal();
      const closeButton = screen.getByRole('button', { name: /close/i });
      const icon = closeButton.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Overlay', () => {
    it('renders overlay', () => {
      renderModal();
      // Radix Dialog renders overlay with data-slot
      const overlay = document.querySelector('[data-slot="dialog-overlay"]');
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('Keyboard Interactions', () => {
    it('closes modal when Escape key is pressed', async () => {
      const user = userEvent.setup();
      const handleOpenChange = vi.fn();
      renderModal({ onOpenChange: handleOpenChange });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Trigger Mode (Uncontrolled)', () => {
    it('opens modal when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <ModalGlass.Root>
          <ModalGlass.Trigger>Open Modal</ModalGlass.Trigger>
          <ModalGlass.Content>
            <ModalGlass.Header>
              <ModalGlass.Title>Triggered Modal</ModalGlass.Title>
            </ModalGlass.Header>
            <ModalGlass.Body>Content</ModalGlass.Body>
          </ModalGlass.Content>
        </ModalGlass.Root>
      );

      // Modal should not be visible initially
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      // Click trigger
      await user.click(screen.getByText('Open Modal'));

      // Modal should now be visible
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('supports asChild on trigger', async () => {
      const user = userEvent.setup();
      render(
        <ModalGlass.Root>
          <ModalGlass.Trigger asChild>
            <button data-testid="custom-trigger">Custom Button</button>
          </ModalGlass.Trigger>
          <ModalGlass.Content>
            <ModalGlass.Header>
              <ModalGlass.Title>Modal</ModalGlass.Title>
            </ModalGlass.Header>
          </ModalGlass.Content>
        </ModalGlass.Root>
      );

      const trigger = screen.getByTestId('custom-trigger');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });

  describe('Close Component', () => {
    it('closes modal when Close component is clicked', async () => {
      const user = userEvent.setup();
      const handleOpenChange = vi.fn();
      render(
        <ModalGlass.Root open={true} onOpenChange={handleOpenChange}>
          <ModalGlass.Content showCloseButton={false}>
            <ModalGlass.Header>
              <ModalGlass.Title>Modal</ModalGlass.Title>
            </ModalGlass.Header>
            <ModalGlass.Footer>
              <ModalGlass.Close data-testid="close-btn">Cancel</ModalGlass.Close>
            </ModalGlass.Footer>
          </ModalGlass.Content>
        </ModalGlass.Root>
      );

      await user.click(screen.getByTestId('close-btn'));

      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(false);
      });
    });

    it('supports asChild on Close component', async () => {
      const user = userEvent.setup();
      const handleOpenChange = vi.fn();
      render(
        <ModalGlass.Root open={true} onOpenChange={handleOpenChange}>
          <ModalGlass.Content showCloseButton={false}>
            <ModalGlass.Header>
              <ModalGlass.Title>Modal</ModalGlass.Title>
            </ModalGlass.Header>
            <ModalGlass.Footer>
              <ModalGlass.Close asChild>
                <button data-testid="cancel-btn">Cancel Action</button>
              </ModalGlass.Close>
            </ModalGlass.Footer>
          </ModalGlass.Content>
        </ModalGlass.Root>
      );

      await user.click(screen.getByTestId('cancel-btn'));

      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to modal content', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(
        <ModalGlass.Root open={true} onOpenChange={vi.fn()}>
          <ModalGlass.Content ref={ref}>
            <ModalGlass.Header>
              <ModalGlass.Title>Test</ModalGlass.Title>
            </ModalGlass.Header>
          </ModalGlass.Content>
        </ModalGlass.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Theme Styling', () => {
    it('applies modal CSS variables to content', () => {
      renderModal();
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveStyle({
        background: 'var(--modal-bg)',
      });
    });

    it('applies overlay CSS variables', () => {
      renderModal();
      const overlay = document.querySelector('[data-slot="dialog-overlay"]') as HTMLElement;
      expect(overlay).toHaveStyle({
        background: 'var(--modal-overlay)',
      });
    });
  });

  describe('Data Slots (shadcn/ui v4 compatibility)', () => {
    it('has data-slot="dialog-content" on content', () => {
      renderModal();
      const content = screen.getByRole('dialog');
      expect(content).toHaveAttribute('data-slot', 'dialog-content');
    });

    it('has data-slot="dialog-overlay" on overlay', () => {
      renderModal();
      const overlay = document.querySelector('[data-slot="dialog-overlay"]');
      expect(overlay).toBeInTheDocument();
    });

    it('has data-slot="dialog-header" on header', () => {
      renderModal();
      const header = document.querySelector('[data-slot="dialog-header"]');
      expect(header).toBeInTheDocument();
    });

    it('has data-slot="dialog-body" on body', () => {
      renderModal();
      const body = document.querySelector('[data-slot="dialog-body"]');
      expect(body).toBeInTheDocument();
    });

    it('has data-slot="dialog-title" on title', () => {
      renderModal();
      const title = document.querySelector('[data-slot="dialog-title"]');
      expect(title).toBeInTheDocument();
    });

    it('has data-slot="dialog-footer" on footer', () => {
      render(
        <ModalGlass.Root open={true} onOpenChange={vi.fn()}>
          <ModalGlass.Content>
            <ModalGlass.Header>
              <ModalGlass.Title>Title</ModalGlass.Title>
            </ModalGlass.Header>
            <ModalGlass.Footer data-testid="footer">Footer</ModalGlass.Footer>
          </ModalGlass.Content>
        </ModalGlass.Root>
      );
      const footer = document.querySelector('[data-slot="dialog-footer"]');
      expect(footer).toBeInTheDocument();
    });

    it('has data-slot="dialog-description" on description', () => {
      renderModal({ description: 'Test description' });
      const description = document.querySelector('[data-slot="dialog-description"]');
      expect(description).toBeInTheDocument();
    });

    it('has data-slot="dialog-close" on close button', () => {
      renderModal({ showCloseButton: true });
      const closeButton = document.querySelector('[data-slot="dialog-close"]');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Modal Title', () => {
    it('applies title text color from CSS variables', () => {
      renderModal({ title: 'Test' });
      const title = screen.getByText('Test');
      expect(title).toHaveStyle({
        color: 'var(--text-primary)',
      });
    });
  });

  describe('Modal Description', () => {
    it('renders description with correct styling', () => {
      renderModal({ description: 'Description text' });
      const description = screen.getByText('Description text');
      expect(description).toHaveStyle({
        color: 'var(--text-muted)',
      });
    });
  });

  describe('Modal Body', () => {
    it('applies content text color from CSS variables', () => {
      renderModal({ children: <div>Content here</div> });
      const body = document.querySelector('[data-slot="dialog-body"]') as HTMLElement;
      expect(body).toHaveStyle({
        color: 'var(--text-secondary)',
      });
    });

    it('renders complex children correctly', () => {
      renderModal({
        children: (
          <div>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
            <button>Action</button>
          </div>
        ),
      });

      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  describe('Modal Footer', () => {
    it('renders footer with correct layout', () => {
      render(
        <ModalGlass.Root open={true} onOpenChange={vi.fn()}>
          <ModalGlass.Content>
            <ModalGlass.Header>
              <ModalGlass.Title>Title</ModalGlass.Title>
            </ModalGlass.Header>
            <ModalGlass.Footer data-testid="footer">
              <button>Cancel</button>
              <button>Confirm</button>
            </ModalGlass.Footer>
          </ModalGlass.Content>
        </ModalGlass.Root>
      );

      const footer = screen.getByTestId('footer');
      expect(footer).toHaveAttribute('data-slot', 'dialog-footer');
      expect(footer).toHaveClass('flex');
    });
  });

  describe('Edge Cases', () => {
    it('handles missing onOpenChange gracefully', async () => {
      const user = userEvent.setup();
      render(
        <ModalGlass.Root open={true}>
          <ModalGlass.Content>
            <ModalGlass.Header>
              <ModalGlass.Title>Title</ModalGlass.Title>
            </ModalGlass.Header>
          </ModalGlass.Content>
        </ModalGlass.Root>
      );

      // Should not throw when pressing Escape
      await expect(user.keyboard('{Escape}')).resolves.not.toThrow();
    });
  });

  describe('shadcn/ui Dialog Compatibility', () => {
    it('Dialog alias works identically to ModalGlass.Root', async () => {
      const { Dialog, DialogContent, DialogTitle } = await import('../modal-glass');
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('supports shadcn/ui import pattern with all components', async () => {
      const user = userEvent.setup();
      const {
        Dialog,
        DialogTrigger,
        DialogContent,
        DialogHeader,
        DialogTitle,
        DialogFooter,
        DialogClose,
      } = await import('../modal-glass');

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
            <p>Content without Body wrapper</p>
            <DialogFooter>
              <DialogClose>Close</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByText('Open'));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Content without Body wrapper')).toBeInTheDocument();
      });
    });
  });
});
