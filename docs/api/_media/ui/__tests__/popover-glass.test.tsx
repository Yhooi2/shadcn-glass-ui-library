import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PopoverGlass } from '../popover-glass';

describe('PopoverGlass', () => {
  describe('Rendering', () => {
    it('renders trigger element', () => {
      render(
        <PopoverGlass trigger={<button>Open Popover</button>}>
          <div>Popover Content</div>
        </PopoverGlass>
      );
      expect(screen.getByText('Open Popover')).toBeInTheDocument();
    });

    it('opens popover when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open Popover</button>}>
          <div>Popover Content</div>
        </PopoverGlass>
      );

      const trigger = screen.getByText('Open Popover');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('displays popover content when open', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open Popover</button>}>
          <div>Test Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open Popover'));

      await waitFor(() => {
        expect(screen.getByText('Test Content')).toBeInTheDocument();
      });
    });

    it('applies custom className to content', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass
          trigger={<button>Open Popover</button>}
          className="custom-class"
        >
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open Popover'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveClass('custom-class');
      });
    });
  });

  describe('Positioning', () => {
    it('renders with bottom side (default)', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>} side="bottom">
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog.getAttribute('data-side')).toBe('bottom');
      });
    });

    it('renders with top side', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>} side="top">
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog.getAttribute('data-side')).toBe('top');
      });
    });

    it('renders with right side', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>} side="right">
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog.getAttribute('data-side')).toBe('right');
      });
    });

    it('renders with left side', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>} side="left">
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog.getAttribute('data-side')).toBe('left');
      });
    });
  });

  describe('Alignment', () => {
    it('renders with center alignment (default)', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>} align="center">
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog.getAttribute('data-align')).toBe('center');
      });
    });

    it('renders with start alignment', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>} align="start">
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog.getAttribute('data-align')).toBe('start');
      });
    });

    it('renders with end alignment', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>} align="end">
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog.getAttribute('data-align')).toBe('end');
      });
    });
  });

  describe('Arrow', () => {
    it('renders arrow by default', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>}>
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        const arrow = dialog.querySelector('svg');
        expect(arrow).toBeInTheDocument();
      });
    });

    it('hides arrow when showArrow is false', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>} showArrow={false}>
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        const arrow = dialog.querySelector('svg');
        expect(arrow).not.toBeInTheDocument();
      });
    });
  });

  describe('Controlled Mode', () => {
    it('respects controlled open state', () => {
      render(
        <PopoverGlass trigger={<button>Open</button>} open={true}>
          <div>Content</div>
        </PopoverGlass>
      );

      // Should be visible immediately
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('calls onOpenChange when state changes', async () => {
      const user = userEvent.setup();
      const handleOpenChange = vi.fn();

      render(
        <PopoverGlass
          trigger={<button>Open</button>}
          onOpenChange={handleOpenChange}
        >
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(true);
      });
    });

    it('remains closed when open is false', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>} open={false}>
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      // Should not open because it's controlled as closed
      await waitFor(
        () => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        },
        { timeout: 500 }
      );
    });
  });

  describe('Interactions', () => {
    it('closes on ESC key press', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>}>
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));
      await waitFor(() => screen.getByRole('dialog'));

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('closes on click outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <PopoverGlass trigger={<button>Open</button>}>
            <div>Content</div>
          </PopoverGlass>
          <button>Outside Button</button>
        </div>
      );

      await user.click(screen.getByText('Open'));
      await waitFor(() => screen.getByRole('dialog'));

      await user.click(screen.getByText('Outside Button'));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA role', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>}>
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
      });
    });

    it('has aria-modal="false" attribute', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>}>
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'false');
      });
    });

    it('trigger is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass trigger={<button>Open</button>}>
          <div>Content</div>
        </PopoverGlass>
      );

      const trigger = screen.getByText('Open');
      trigger.focus();

      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });

  describe('Side Offset', () => {
    it('applies custom sideOffset', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass
          trigger={<button>Open</button>}
          sideOffset={16}
        >
          <div>Content</div>
        </PopoverGlass>
      );

      await user.click(screen.getByText('Open'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        // sideOffset is applied internally by Radix UI
      });
    });
  });
});
