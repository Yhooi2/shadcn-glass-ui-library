import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabsGlass } from '../tabs-glass';

// Helper to render TabsGlass with Compound API
const renderTabs = ({
  value = 'tab1',
  defaultValue,
  onValueChange = vi.fn(),
  className,
  ...listProps
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  [key: string]: unknown;
} = {}) => {
  return render(
    <TabsGlass.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
      <TabsGlass.List className={className} {...listProps}>
        <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
        <TabsGlass.Trigger value="tab2">Tab 2</TabsGlass.Trigger>
        <TabsGlass.Trigger value="tab3">Tab 3</TabsGlass.Trigger>
      </TabsGlass.List>
    </TabsGlass.Root>
  );
};

describe('TabsGlass', () => {
  describe('Rendering', () => {
    it('renders all tabs', () => {
      renderTabs();
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('renders tablist container with role', () => {
      const { container } = renderTabs();
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toBeInTheDocument();
    });

    it('renders each tab button with correct role', () => {
      renderTabs();
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
    });

    it('applies custom className', () => {
      const { container } = renderTabs({ className: 'custom-class' });
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toHaveClass('custom-class');
    });

    it('has data-slot attributes for shadcn/ui v4 compatibility', () => {
      const { container } = renderTabs();
      expect(container.querySelector('[data-slot="tabs"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="tabs-list"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="tabs-trigger"]')).toBeInTheDocument();
    });
  });

  describe('Active Tab State', () => {
    it('marks first tab as active', () => {
      renderTabs({ value: 'tab1' });
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab1).toHaveAttribute('data-state', 'active');
    });

    it('marks second tab as active', () => {
      renderTabs({ value: 'tab2' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(tab2).toHaveAttribute('data-state', 'active');
    });

    it('marks inactive tabs with aria-selected false', () => {
      renderTabs({ value: 'tab1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      expect(tab2).toHaveAttribute('aria-selected', 'false');
      expect(tab3).toHaveAttribute('aria-selected', 'false');
      expect(tab2).toHaveAttribute('data-state', 'inactive');
      expect(tab3).toHaveAttribute('data-state', 'inactive');
    });

    it('shows indicator via data-state for active tab', () => {
      renderTabs({ value: 'tab1' });
      const activeTab = screen.getByRole('tab', { name: 'Tab 1' });
      // Indicator is shown via CSS ::after pseudo-element when data-state=active
      expect(activeTab).toHaveAttribute('data-state', 'active');
      // The actual indicator visibility is controlled by CSS: data-[state=active]:after:opacity-100
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when tab is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderTabs({ value: 'tab1', onValueChange: handleChange });

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);

      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('calls onChange with correct tab id', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderTabs({ onValueChange: handleChange });

      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      await user.click(tab3);

      expect(handleChange).toHaveBeenCalledWith('tab3');
    });

    it('handles multiple tab switches', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderTabs({ value: 'tab1', onValueChange: handleChange });

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      await user.click(tab2);
      await user.click(tab3);

      // Verify both tabs were called (order depends on Radix internal behavior)
      expect(handleChange).toHaveBeenCalledWith('tab2');
      expect(handleChange).toHaveBeenCalledWith('tab3');
    });

    it('can click active tab without error', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderTabs({ value: 'tab1', onValueChange: handleChange });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });

      await expect(user.click(tab1)).resolves.not.toThrow();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to div element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
      render(
        <TabsGlass.Root value="tab1" onValueChange={vi.fn()}>
          <TabsGlass.List ref={ref}>
            <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
            <TabsGlass.Trigger value="tab2">Tab 2</TabsGlass.Trigger>
          </TabsGlass.List>
        </TabsGlass.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref methods to be called', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
      render(
        <TabsGlass.Root value="tab1" onValueChange={vi.fn()}>
          <TabsGlass.List ref={ref}>
            <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
            <TabsGlass.Trigger value="tab2">Tab 2</TabsGlass.Trigger>
          </TabsGlass.List>
        </TabsGlass.Root>
      );

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        expect((ref.current as HTMLElement).tagName).toBe('DIV');
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to container', () => {
      renderTabs({
        'data-testid': 'custom-tabs',
        'aria-describedby': 'description',
      });

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('data-testid', 'custom-tabs');
      expect(tablist).toHaveAttribute('aria-describedby', 'description');
    });

    it('applies id attribute correctly', () => {
      renderTabs({ id: 'my-tabs' });
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('id', 'my-tabs');
    });
  });

  describe('Edge Cases', () => {
    it('renders with empty tabs array', () => {
      const { container } = render(
        <TabsGlass.Root value="" onValueChange={vi.fn()}>
          <TabsGlass.List />
        </TabsGlass.Root>
      );
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toBeInTheDocument();
      expect(screen.queryAllByRole('tab')).toHaveLength(0);
    });

    it('renders with single tab', () => {
      render(
        <TabsGlass.Root value="only" onValueChange={vi.fn()}>
          <TabsGlass.List>
            <TabsGlass.Trigger value="only">Only Tab</TabsGlass.Trigger>
          </TabsGlass.List>
        </TabsGlass.Root>
      );
      expect(screen.getByRole('tab')).toBeInTheDocument();
      expect(screen.getByText('Only Tab')).toBeInTheDocument();
    });

    it('handles activeTab not in tabs array', () => {
      renderTabs({ value: 'nonexistent' });
      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab) => {
        expect(tab).toHaveAttribute('aria-selected', 'false');
      });
    });
  });

  describe('Theme Styling', () => {
    it('applies container CSS classes', () => {
      const { container } = renderTabs();
      const tablist = container.querySelector('[role="tablist"]') as HTMLElement;
      // Tailwind v4 classes for CSS variables
      expect(tablist).toHaveClass('bg-(--tab-container-bg)');
      expect(tablist).toHaveClass('border-(--tab-container-border)');
    });

    it('applies active tab data-state', () => {
      renderTabs({ value: 'tab1' });
      const activeTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(activeTab).toHaveAttribute('data-state', 'active');
      // Styling is applied via CSS: data-[state=active]:bg-(--tab-active-bg)
    });

    it('applies inactive tab data-state', () => {
      renderTabs({ value: 'tab1' });
      const inactiveTab = screen.getByRole('tab', { name: 'Tab 2' });
      expect(inactiveTab).toHaveAttribute('data-state', 'inactive');
      // Styling is applied via CSS: bg-(--tab-bg)
    });
  });

  describe('Keyboard Navigation', () => {
    it('moves to next tab with ArrowRight', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderTabs({ value: 'tab1', onValueChange: handleChange });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      tab1.focus();
      await user.keyboard('{ArrowRight}');

      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('moves to previous tab with ArrowLeft', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderTabs({ value: 'tab2', onValueChange: handleChange });

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      tab2.focus();
      await user.keyboard('{ArrowLeft}');

      expect(handleChange).toHaveBeenCalledWith('tab1');
    });

    it('moves to first tab with Home key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderTabs({ value: 'tab3', onValueChange: handleChange });

      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      tab3.focus();
      await user.keyboard('{Home}');

      expect(handleChange).toHaveBeenCalledWith('tab1');
    });

    it('moves to last tab with End key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderTabs({ value: 'tab1', onValueChange: handleChange });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      tab1.focus();
      await user.keyboard('{End}');

      expect(handleChange).toHaveBeenCalledWith('tab3');
    });
  });

  describe('Context Error Handling', () => {
    it('throws error when TabsTrigger used outside Root', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TabsGlass.Trigger value="test">Test</TabsGlass.Trigger>);
      }).toThrow(); // Radix throws its own error message

      consoleSpy.mockRestore();
    });

    it('throws error when TabsContent used outside Root', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TabsGlass.Content value="test">Content</TabsGlass.Content>);
      }).toThrow(); // Radix throws its own error message

      consoleSpy.mockRestore();
    });
  });

  describe('Uncontrolled Mode', () => {
    it('works with defaultValue', async () => {
      const user = userEvent.setup();
      render(
        <TabsGlass.Root defaultValue="tab1">
          <TabsGlass.List>
            <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
            <TabsGlass.Trigger value="tab2">Tab 2</TabsGlass.Trigger>
          </TabsGlass.List>
          <TabsGlass.Content value="tab1">Content 1</TabsGlass.Content>
          <TabsGlass.Content value="tab2">Content 2</TabsGlass.Content>
        </TabsGlass.Root>
      );

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      expect(tab1).toHaveAttribute('data-state', 'active');
      expect(screen.getByText('Content 1')).toBeInTheDocument();

      await user.click(tab2);

      expect(tab2).toHaveAttribute('data-state', 'active');
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  describe('TabsContent', () => {
    it('renders content for active tab', () => {
      render(
        <TabsGlass.Root value="tab1">
          <TabsGlass.List>
            <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
            <TabsGlass.Trigger value="tab2">Tab 2</TabsGlass.Trigger>
          </TabsGlass.List>
          <TabsGlass.Content value="tab1">Content 1</TabsGlass.Content>
          <TabsGlass.Content value="tab2">Content 2</TabsGlass.Content>
        </TabsGlass.Root>
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('has data-slot attribute', () => {
      const { container } = render(
        <TabsGlass.Root value="tab1">
          <TabsGlass.List>
            <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
          </TabsGlass.List>
          <TabsGlass.Content value="tab1">Content 1</TabsGlass.Content>
        </TabsGlass.Root>
      );

      expect(container.querySelector('[data-slot="tabs-content"]')).toBeInTheDocument();
    });
  });
});
