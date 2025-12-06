import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Settings, Trash2, User } from 'lucide-react';
import { DropdownGlass } from '../dropdown-glass';
import type { DropdownItem } from '../dropdown-glass';

describe('DropdownGlass', () => {
  const basicItems: DropdownItem[] = [
    { label: 'Profile', icon: User, onClick: vi.fn() },
    { label: 'Settings', icon: Settings, onClick: vi.fn() },
    { label: 'Delete', icon: Trash2, onClick: vi.fn(), danger: true },
  ];

  describe('Rendering', () => {
    it('renders trigger element', () => {
      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={basicItems}
        />
      );
      expect(screen.getByText('Open Menu')).toBeInTheDocument();
    });

    it('opens menu when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={basicItems}
        />
      );

      const trigger = screen.getByText('Open Menu');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });
    });

    it('displays all menu items', async () => {
      const user = userEvent.setup();
      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={basicItems}
        />
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
      });
    });

    it('applies custom className', () => {
      const { container } = render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={basicItems}
          className="custom-class"
        />
      );
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('Menu Items', () => {
    it('renders menu items with correct role', async () => {
      const user = userEvent.setup();
      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={basicItems}
        />
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        const menuItems = screen.getAllByRole('menuitem');
        expect(menuItems).toHaveLength(3);
      });
    });

    it('renders item icons', async () => {
      const user = userEvent.setup();
      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={basicItems}
        />
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        const menu = screen.getByRole('menu');
        const icons = menu.querySelectorAll('svg');
        expect(icons.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('calls onClick when item is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const items: DropdownItem[] = [
        { label: 'Item 1', onClick: handleClick },
      ];

      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={items}
        />
      );

      await user.click(screen.getByText('Open Menu'));
      await waitFor(() => screen.getByText('Item 1'));
      await user.click(screen.getByText('Item 1'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders items without onClick', async () => {
      const user = userEvent.setup();
      const items: DropdownItem[] = [
        { label: 'Read-only Item' },
      ];

      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={items}
        />
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Read-only Item')).toBeInTheDocument();
      });
    });

    it('renders items without icons', async () => {
      const user = userEvent.setup();
      const items: DropdownItem[] = [
        { label: 'Item without icon', onClick: vi.fn() },
      ];

      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={items}
        />
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Item without icon')).toBeInTheDocument();
      });
    });
  });

  describe('Danger Items', () => {
    it('applies danger styling to danger items', async () => {
      const user = userEvent.setup();
      const items: DropdownItem[] = [
        { label: 'Normal Item', onClick: vi.fn() },
        { label: 'Danger Item', onClick: vi.fn(), danger: true },
      ];

      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={items}
        />
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        const dangerItem = screen.getByText('Danger Item');
        expect(dangerItem).toBeInTheDocument();
      });
    });
  });

  describe('Dividers', () => {
    it('renders dividers between items', async () => {
      const user = userEvent.setup();
      const items: DropdownItem[] = [
        { label: 'Item 1', onClick: vi.fn() },
        { divider: true },
        { label: 'Item 2', onClick: vi.fn() },
      ];

      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={items}
        />
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        const separators = screen.getAllByRole('separator');
        expect(separators).toHaveLength(1);
      });
    });

    it('renders multiple dividers', async () => {
      const user = userEvent.setup();
      const items: DropdownItem[] = [
        { label: 'Item 1', onClick: vi.fn() },
        { divider: true },
        { label: 'Item 2', onClick: vi.fn() },
        { divider: true },
        { label: 'Item 3', onClick: vi.fn() },
      ];

      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={items}
        />
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        const separators = screen.getAllByRole('separator');
        expect(separators).toHaveLength(2);
      });
    });
  });

  describe('Alignment', () => {
    it('renders with left alignment by default', () => {
      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={basicItems}
        />
      );
      expect(screen.getByText('Open Menu')).toBeInTheDocument();
    });

    it('renders with explicit left alignment', () => {
      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={basicItems}
          align="left"
        />
      );
      expect(screen.getByText('Open Menu')).toBeInTheDocument();
    });

    it('renders with right alignment', () => {
      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={basicItems}
          align="right"
        />
      );
      expect(screen.getByText('Open Menu')).toBeInTheDocument();
    });
  });

  describe('ARIA Attributes', () => {
    it('has correct menu role', async () => {
      const user = userEvent.setup();
      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={basicItems}
        />
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        const menu = screen.getByRole('menu');
        expect(menu).toHaveAttribute('aria-orientation', 'vertical');
      });
    });

    it('menu items have menuitem role', async () => {
      const user = userEvent.setup();
      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={basicItems}
        />
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        const menuItems = screen.getAllByRole('menuitem');
        menuItems.forEach(item => {
          expect(item).toHaveAttribute('role', 'menuitem');
        });
      });
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to wrapper div', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(
        <DropdownGlass
          ref={ref}
          trigger={<button>Open Menu</button>}
          items={basicItems}
        />
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref to access element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(
        <DropdownGlass
          ref={ref}
          trigger={<button>Open Menu</button>}
          items={basicItems}
        />
      );

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        expect((ref.current as HTMLElement).tagName).toBe('DIV');
      }
    });
  });

  describe('Theme Styling', () => {
    it('applies dropdown CSS variables', async () => {
      const user = userEvent.setup();
      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={basicItems}
        />
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        const menu = screen.getByRole('menu');
        expect(menu).toHaveStyle({
          background: 'var(--dropdown-bg)',
        });
      });
    });
  });

  describe('Empty Items', () => {
    it('renders with empty items array', async () => {
      const user = userEvent.setup();
      render(
        <DropdownGlass
          trigger={<button>Open Menu</button>}
          items={[]}
        />
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        const menu = screen.getByRole('menu');
        expect(menu).toBeInTheDocument();
      });
    });
  });

  describe('Complex Triggers', () => {
    it('renders with custom trigger component', () => {
      render(
        <DropdownGlass
          trigger={
            <div>
              <span>Custom</span>
              <span>Trigger</span>
            </div>
          }
          items={basicItems}
        />
      );

      expect(screen.getByText('Custom')).toBeInTheDocument();
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('renders with icon trigger', async () => {
      const user = userEvent.setup();
      render(
        <DropdownGlass
          trigger={
            <button aria-label="Settings menu">
              <Settings />
            </button>
          }
          items={basicItems}
        />
      );

      const trigger = screen.getByLabelText('Settings menu');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });
    });
  });
});
