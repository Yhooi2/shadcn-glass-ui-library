import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalGlass } from '../modal-glass';

describe('ModalGlass', () => {
  let originalOverflow: string;

  beforeEach(() => {
    originalOverflow = document.body.style.overflow;
  });

  afterEach(() => {
    document.body.style.overflow = originalOverflow;
  });

  describe('Rendering', () => {
    it('renders nothing when isOpen is false', () => {
      const { container } = render(
        <ModalGlass isOpen={false} onClose={vi.fn()} title="Test Modal">
          Content
        </ModalGlass>
      );
      expect(container.firstChild).toBeNull();
    });

    it('renders modal when isOpen is true', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test Modal">
          Content
        </ModalGlass>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('displays modal title', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Modal Title">
          Content
        </ModalGlass>
      );
      expect(screen.getByText('Modal Title')).toBeInTheDocument();
    });

    it('displays modal children content', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          <p>Modal content here</p>
        </ModalGlass>
      );
      expect(screen.getByText('Modal content here')).toBeInTheDocument();
    });

    it('has correct ARIA attributes', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('applies custom className', () => {
      const { container } = render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test" className="custom-class">
          Content
        </ModalGlass>
      );
      const modal = container.querySelector('.custom-class');
      expect(modal).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('renders small size', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test" size="sm">
          Content
        </ModalGlass>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test" size="lg">
          Content
        </ModalGlass>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('renders close button with correct aria-label', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );
      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(
        <ModalGlass isOpen={true} onClose={handleClose} title="Test">
          Content
        </ModalGlass>
      );

      const closeButton = screen.getByLabelText('Close modal');
      await user.click(closeButton);

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledTimes(1);
      });
    });

    it('displays X icon in close button', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );
      const closeButton = screen.getByLabelText('Close modal');
      const icon = closeButton.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Overlay', () => {
    it('renders overlay with correct styling', () => {
      const { container } = render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );
      const overlay = container.querySelector('[aria-hidden="true"]');
      expect(overlay).toBeInTheDocument();
    });

    it('calls onClose when overlay is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      const { container } = render(
        <ModalGlass isOpen={true} onClose={handleClose} title="Test">
          Content
        </ModalGlass>
      );

      const overlay = container.querySelector('[aria-hidden="true"]') as HTMLElement;
      await user.click(overlay);

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Keyboard Interactions', () => {
    it('closes modal when Escape key is pressed', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(
        <ModalGlass isOpen={true} onClose={handleClose} title="Test">
          Content
        </ModalGlass>
      );

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledTimes(1);
      });
    });

    it('does not close on other key presses', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(
        <ModalGlass isOpen={true} onClose={handleClose} title="Test">
          Content
        </ModalGlass>
      );

      await user.keyboard('a');
      await user.keyboard('{Enter}');
      await user.keyboard('{Space}');

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('Body Scroll Lock', () => {
    it('locks body scroll when modal opens', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('unlocks body scroll when modal closes', () => {
      const { rerender } = render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );
      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <ModalGlass isOpen={false} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );
      expect(document.body.style.overflow).toBe('');
    });

    it('unlocks body scroll on unmount', () => {
      const { unmount } = render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );
      expect(document.body.style.overflow).toBe('hidden');

      unmount();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to modal content div', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(
        <ModalGlass ref={ref} isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref to access element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(
        <ModalGlass ref={ref} isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        expect((ref.current as HTMLElement).tagName).toBe('DIV');
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to dialog wrapper', () => {
      render(
        <ModalGlass
          isOpen={true}
          onClose={vi.fn()}
          title="Test"
          data-testid="custom-modal"
        >
          Content
        </ModalGlass>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('data-testid', 'custom-modal');
    });

    it('applies id attribute correctly', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test" id="my-modal">
          Content
        </ModalGlass>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('id', 'my-modal');
    });
  });

  describe('Theme Styling', () => {
    it('applies modal CSS variables', () => {
      const { container } = render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );
      const modal = container.querySelector('[id="modal-title"]')?.parentElement?.parentElement;
      expect(modal).toHaveStyle({
        background: 'var(--modal-bg)',
      });
    });

    it('applies overlay CSS variables', () => {
      const { container } = render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );
      const overlay = container.querySelector('[aria-hidden="true"]') as HTMLElement;
      expect(overlay).toHaveStyle({
        background: 'var(--modal-overlay)',
      });
    });
  });

  describe('Modal Title', () => {
    it('has correct id for ARIA labelledby', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test Title">
          Content
        </ModalGlass>
      );
      const title = document.getElementById('modal-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Test Title');
    });

    it('applies title text color from CSS variables', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </ModalGlass>
      );
      const title = screen.getByText('Test');
      expect(title).toHaveStyle({
        color: 'var(--text-primary)',
      });
    });
  });

  describe('Modal Content', () => {
    it('applies content text color from CSS variables', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          <div>Content here</div>
        </ModalGlass>
      );
      const content = screen.getByText('Content here').parentElement;
      expect(content).toHaveStyle({
        color: 'var(--text-secondary)',
      });
    });

    it('renders complex children correctly', () => {
      render(
        <ModalGlass isOpen={true} onClose={vi.fn()} title="Test">
          <div>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
            <button>Action</button>
          </div>
        </ModalGlass>
      );

      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });
});
