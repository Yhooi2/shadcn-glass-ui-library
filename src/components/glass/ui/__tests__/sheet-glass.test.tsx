import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  SheetGlass,
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '../sheet-glass';
import type { ReactNode } from 'react';
import type { SheetSide } from '@/lib/variants/sheet-glass-variants';

// Helper to render SheetGlass with controlled mode
const renderSheet = ({
  open = true,
  onOpenChange = vi.fn(),
  title = 'Test Sheet',
  description,
  children = 'Content' as ReactNode,
  side = 'right' as SheetSide,
  showCloseButton = true,
  className,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  side?: SheetSide;
  showCloseButton?: boolean;
  className?: string;
} = {}) => {
  return render(
    <SheetGlass.Root open={open} onOpenChange={onOpenChange}>
      <SheetGlass.Content side={side} showCloseButton={showCloseButton} className={className}>
        <SheetGlass.Header>
          <SheetGlass.Title>{title}</SheetGlass.Title>
          {description && <SheetGlass.Description>{description}</SheetGlass.Description>}
        </SheetGlass.Header>
        <div>{children}</div>
        <SheetGlass.Footer>
          <SheetGlass.Close>Close</SheetGlass.Close>
        </SheetGlass.Footer>
      </SheetGlass.Content>
    </SheetGlass.Root>
  );
};

describe('SheetGlass', () => {
  describe('Rendering', () => {
    it('renders nothing when open is false', () => {
      renderSheet({ open: false });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders sheet when open is true', () => {
      renderSheet();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('displays sheet title', () => {
      renderSheet({ title: 'Sheet Title' });
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
    });

    it('displays sheet children content', () => {
      renderSheet({ children: <p>Sheet content here</p> });
      expect(screen.getByText('Sheet content here')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderSheet({ className: 'custom-class' });
      const content = screen.getByRole('dialog');
      expect(content).toHaveClass('custom-class');
    });
  });

  describe('Side Variants', () => {
    it.each(['top', 'right', 'bottom', 'left'] as const)('renders %s side', (side) => {
      renderSheet({ side });
      const content = screen.getByRole('dialog');
      expect(content).toHaveAttribute('data-side', side);
    });

    it('defaults to right side', () => {
      render(
        <SheetGlass.Root open={true}>
          <SheetGlass.Content>
            <SheetGlass.Title>Title</SheetGlass.Title>
          </SheetGlass.Content>
        </SheetGlass.Root>
      );
      const content = screen.getByRole('dialog');
      expect(content).toHaveAttribute('data-side', 'right');
    });
  });

  describe('ARIA Attributes', () => {
    it('has correct dialog role', () => {
      renderSheet();
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('links title to dialog via aria-labelledby', () => {
      renderSheet({ title: 'Test Title' });
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby');
    });

    it('links description to dialog via aria-describedby when description exists', () => {
      renderSheet({ description: 'Test Description' });
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-describedby');
    });
  });

  describe('Close Button', () => {
    it('renders X close button when showCloseButton is true', () => {
      renderSheet({ showCloseButton: true });
      // Should have 2 close buttons: X button and footer button
      const closeButtons = screen.getAllByRole('button', { name: /close/i });
      expect(closeButtons.length).toBeGreaterThanOrEqual(2);
    });

    it('does not render X close button when showCloseButton is false', () => {
      renderSheet({ showCloseButton: false });
      // Only the footer close button should exist, not the X button
      const closeButtons = screen.getAllByRole('button', { name: /close/i });
      expect(closeButtons).toHaveLength(1); // Only the footer close
    });

    it('calls onOpenChange when X close button is clicked', async () => {
      const user = userEvent.setup();
      const handleOpenChange = vi.fn();
      renderSheet({ onOpenChange: handleOpenChange });

      // Get the X button (first close button, which is the icon button)
      const closeButtons = screen.getAllByRole('button', { name: /close/i });
      await user.click(closeButtons[0]);

      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Trigger Mode (Uncontrolled)', () => {
    it('opens sheet when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <SheetGlass.Root>
          <SheetGlass.Trigger>Open Sheet</SheetGlass.Trigger>
          <SheetGlass.Content>
            <SheetGlass.Title>Title</SheetGlass.Title>
          </SheetGlass.Content>
        </SheetGlass.Root>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      await user.click(screen.getByText('Open Sheet'));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('supports asChild on trigger', async () => {
      const user = userEvent.setup();
      render(
        <SheetGlass.Root>
          <SheetGlass.Trigger asChild>
            <button type="button">Custom Trigger</button>
          </SheetGlass.Trigger>
          <SheetGlass.Content>
            <SheetGlass.Title>Title</SheetGlass.Title>
          </SheetGlass.Content>
        </SheetGlass.Root>
      );

      await user.click(screen.getByText('Custom Trigger'));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });

  describe('SheetGlass.Close', () => {
    it('closes sheet when clicked', async () => {
      const user = userEvent.setup();
      const handleOpenChange = vi.fn();
      render(
        <SheetGlass.Root open={true} onOpenChange={handleOpenChange}>
          <SheetGlass.Content showCloseButton={false}>
            <SheetGlass.Title>Title</SheetGlass.Title>
            <SheetGlass.Close>Close Me</SheetGlass.Close>
          </SheetGlass.Content>
        </SheetGlass.Root>
      );

      await user.click(screen.getByText('Close Me'));
      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(false);
      });
    });

    it('supports asChild', async () => {
      const user = userEvent.setup();
      const handleOpenChange = vi.fn();
      render(
        <SheetGlass.Root open={true} onOpenChange={handleOpenChange}>
          <SheetGlass.Content showCloseButton={false}>
            <SheetGlass.Title>Title</SheetGlass.Title>
            <SheetGlass.Close asChild>
              <button type="button">Custom Close</button>
            </SheetGlass.Close>
          </SheetGlass.Content>
        </SheetGlass.Root>
      );

      await user.click(screen.getByText('Custom Close'));
      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Keyboard Interactions', () => {
    it('closes on Escape key', async () => {
      const user = userEvent.setup();
      const handleOpenChange = vi.fn();
      renderSheet({ onOpenChange: handleOpenChange });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Data Slots', () => {
    it('has data-slot="sheet-content" on content', () => {
      renderSheet();
      const content = screen.getByRole('dialog');
      expect(content).toHaveAttribute('data-slot', 'sheet-content');
    });

    it('has data-slot="sheet-header" on header', () => {
      renderSheet();
      const header = document.querySelector('[data-slot="sheet-header"]');
      expect(header).toBeInTheDocument();
    });

    it('has data-slot="sheet-footer" on footer', () => {
      renderSheet();
      const footer = document.querySelector('[data-slot="sheet-footer"]');
      expect(footer).toBeInTheDocument();
    });

    it('has data-slot="sheet-title" on title', () => {
      renderSheet();
      const title = document.querySelector('[data-slot="sheet-title"]');
      expect(title).toBeInTheDocument();
    });
  });

  describe('shadcn/ui API Compatibility', () => {
    it('Sheet alias works identically to SheetGlass.Root', () => {
      render(
        <Sheet open={true}>
          <SheetContent>
            <SheetTitle>Test</SheetTitle>
          </SheetContent>
        </Sheet>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('supports shadcn/ui import pattern', async () => {
      const user = userEvent.setup();

      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Title</SheetTitle>
              <SheetDescription>Description</SheetDescription>
            </SheetHeader>
            <p>Content without Body wrapper</p>
            <SheetFooter>
              <SheetClose>Close</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText('Open'));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Content without Body wrapper')).toBeInTheDocument();
      });
    });

    it('all individual exports work correctly', () => {
      render(
        <Sheet open={true}>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Browse menu items</SheetDescription>
            </SheetHeader>
            <nav>Menu items</nav>
            <SheetFooter>
              <SheetClose>Done</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );

      expect(screen.getByText('Navigation')).toBeInTheDocument();
      expect(screen.getByText('Browse menu items')).toBeInTheDocument();
      expect(screen.getByText('Menu items')).toBeInTheDocument();
      expect(screen.getByText('Done')).toBeInTheDocument();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to SheetContent', () => {
      const ref = vi.fn();
      render(
        <SheetGlass.Root open={true}>
          <SheetGlass.Content ref={ref}>
            <SheetGlass.Title>Title</SheetGlass.Title>
          </SheetGlass.Content>
        </SheetGlass.Root>
      );
      expect(ref).toHaveBeenCalled();
    });

    it('forwards ref to SheetTitle', () => {
      const ref = vi.fn();
      render(
        <SheetGlass.Root open={true}>
          <SheetGlass.Content>
            <SheetGlass.Title ref={ref}>Title</SheetGlass.Title>
          </SheetGlass.Content>
        </SheetGlass.Root>
      );
      expect(ref).toHaveBeenCalled();
    });

    it('forwards ref to SheetDescription', () => {
      const ref = vi.fn();
      render(
        <SheetGlass.Root open={true}>
          <SheetGlass.Content>
            <SheetGlass.Title>Title</SheetGlass.Title>
            <SheetGlass.Description ref={ref}>Description</SheetGlass.Description>
          </SheetGlass.Content>
        </SheetGlass.Root>
      );
      expect(ref).toHaveBeenCalled();
    });

    it('forwards ref to SheetOverlay', () => {
      const ref = vi.fn();
      render(
        <SheetGlass.Root open={true}>
          <SheetGlass.Portal>
            <SheetGlass.Overlay ref={ref} />
          </SheetGlass.Portal>
        </SheetGlass.Root>
      );
      expect(ref).toHaveBeenCalled();
    });
  });
});
