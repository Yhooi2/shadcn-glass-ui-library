import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalGlass } from '../modal-glass';
import type { ReactNode } from 'react';

// Helper to render ModalGlass with Compound API
const renderModal = ({
  open = true,
  onOpenChange = vi.fn(),
  title = 'Test Modal',
  children = 'Content' as ReactNode,
  size,
  className,
  ...props
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  [key: string]: unknown;
} = {}) => {
  return render(
    <ModalGlass.Root open={open} onOpenChange={onOpenChange} size={size} {...props}>
      {open && (
        <>
          <ModalGlass.Overlay />
          <ModalGlass.Content className={className}>
            <ModalGlass.Header>
              <ModalGlass.Title>{title}</ModalGlass.Title>
              <ModalGlass.Close />
            </ModalGlass.Header>
            <ModalGlass.Body>{children}</ModalGlass.Body>
          </ModalGlass.Content>
        </>
      )}
    </ModalGlass.Root>
  );
};

describe('ModalGlass', () => {
  let originalOverflow: string;

  beforeEach(() => {
    originalOverflow = document.body.style.overflow;
  });

  afterEach(() => {
    document.body.style.overflow = originalOverflow;
  });

  describe('Rendering', () => {
    it('renders nothing when open is false', () => {
      const { container } = renderModal({ open: false });
      expect(container.firstChild).toBeNull();
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

    it('has correct ARIA attributes', () => {
      renderModal();
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('applies custom className', () => {
      const { container } = renderModal({ className: 'custom-class' });
      const modal = container.querySelector('.custom-class');
      expect(modal).toBeInTheDocument();
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
  });

  describe('Close Button', () => {
    it('renders close button with correct aria-label', () => {
      renderModal();
      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      renderModal({ onOpenChange: handleClose });

      const closeButton = screen.getByLabelText('Close modal');
      await user.click(closeButton);

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledWith(false);
      });
    });

    it('displays X icon in close button', () => {
      renderModal();
      const closeButton = screen.getByLabelText('Close modal');
      const icon = closeButton.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Overlay', () => {
    it('renders overlay with correct styling', () => {
      const { container } = renderModal();
      const overlay = container.querySelector('[aria-hidden="true"]');
      expect(overlay).toBeInTheDocument();
    });

    it('calls onClose when overlay is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      const { container } = renderModal({ onOpenChange: handleClose });

      const overlay = container.querySelector('[aria-hidden="true"]') as HTMLElement;
      await user.click(overlay);

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Keyboard Interactions', () => {
    it('closes modal when Escape key is pressed', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      renderModal({ onOpenChange: handleClose });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledWith(false);
      });
    });

    it('does not close on other key presses', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      renderModal({ onOpenChange: handleClose });

      await user.keyboard('a');
      await user.keyboard('{Enter}');
      await user.keyboard('{Space}');

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('Body Scroll Lock', () => {
    it('locks body scroll when modal opens', () => {
      renderModal();
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('unlocks body scroll when modal closes', () => {
      const { rerender } = renderModal();
      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <ModalGlass.Root open={false} onOpenChange={vi.fn()}>
          <ModalGlass.Content>
            <ModalGlass.Header>
              <ModalGlass.Title>Test Modal</ModalGlass.Title>
            </ModalGlass.Header>
            <ModalGlass.Body>Content</ModalGlass.Body>
          </ModalGlass.Content>
        </ModalGlass.Root>
      );
      expect(document.body.style.overflow).toBe('');
    });

    it('unlocks body scroll on unmount', () => {
      const { unmount } = renderModal();
      expect(document.body.style.overflow).toBe('hidden');

      unmount();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to modal content div', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(
        <ModalGlass.Root open={true} onOpenChange={vi.fn()}>
          <ModalGlass.Overlay />
          <ModalGlass.Content ref={ref}>
            <ModalGlass.Header>
              <ModalGlass.Title>Test</ModalGlass.Title>
              <ModalGlass.Close />
            </ModalGlass.Header>
            <ModalGlass.Body>Content</ModalGlass.Body>
          </ModalGlass.Content>
        </ModalGlass.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref to access element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(
        <ModalGlass.Root open={true} onOpenChange={vi.fn()}>
          <ModalGlass.Overlay />
          <ModalGlass.Content ref={ref}>
            <ModalGlass.Header>
              <ModalGlass.Title>Test</ModalGlass.Title>
              <ModalGlass.Close />
            </ModalGlass.Header>
            <ModalGlass.Body>Content</ModalGlass.Body>
          </ModalGlass.Content>
        </ModalGlass.Root>
      );

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        expect((ref.current as HTMLElement).tagName).toBe('DIV');
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to dialog wrapper', () => {
      renderModal({ 'data-testid': 'custom-modal' });

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('data-testid', 'custom-modal');
    });

    it('applies id attribute correctly', () => {
      renderModal({ id: 'my-modal' });
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('id', 'my-modal');
    });
  });

  describe('Theme Styling', () => {
    it('applies modal CSS variables', () => {
      const { container } = renderModal();
      const modal = container.querySelector('[id="modal-title"]')?.parentElement?.parentElement;
      expect(modal).toHaveStyle({
        background: 'var(--modal-bg)',
      });
    });

    it('applies overlay CSS variables', () => {
      const { container } = renderModal();
      const overlay = container.querySelector('[aria-hidden="true"]') as HTMLElement;
      expect(overlay).toHaveStyle({
        background: 'var(--modal-overlay)',
      });
    });
  });

  describe('Modal Title', () => {
    it('has correct id for ARIA labelledby', () => {
      renderModal({ title: 'Test Title' });
      const title = document.getElementById('modal-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Test Title');
    });

    it('applies title text color from CSS variables', () => {
      renderModal({ title: 'Test' });
      const title = screen.getByText('Test');
      expect(title).toHaveStyle({
        color: 'var(--text-primary)',
      });
    });
  });

  describe('Modal Content', () => {
    it('applies content text color from CSS variables', () => {
      renderModal({ children: <div>Content here</div> });
      const content = screen.getByText('Content here').parentElement;
      expect(content).toHaveStyle({
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
});
