import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabsGlass } from '../tabs-glass';

// Helper to render TabsGlass with Compound API
const renderTabs = ({
  value = 'tab1',
  onValueChange = vi.fn(),
  className,
  ...listProps
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  [key: string]: unknown;
} = {}) => {
  return render(
    <TabsGlass.Root value={value} onValueChange={onValueChange}>
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
  });

  describe('Active Tab State', () => {
    it('marks first tab as active', () => {
      renderTabs({ value: 'tab1' });
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab1).toHaveAttribute('aria-selected', 'true');
    });

    it('marks second tab as active', () => {
      renderTabs({ value: 'tab2' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    it('marks inactive tabs with aria-selected false', () => {
      renderTabs({ value: 'tab1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      expect(tab2).toHaveAttribute('aria-selected', 'false');
      expect(tab3).toHaveAttribute('aria-selected', 'false');
    });

    it('shows indicator for active tab', () => {
      const { container } = renderTabs({ value: 'tab1' });
      // Each active tab should have an indicator div
      const indicators = container.querySelectorAll('.absolute.bottom-0');
      expect(indicators.length).toBeGreaterThan(0);
    });

    it('does not show indicator for inactive tabs', () => {
      const { container } = renderTabs({ value: 'tab1' });
      // Should have exactly 1 indicator (for the active tab)
      const indicators = container.querySelectorAll('.absolute.bottom-0');
      expect(indicators).toHaveLength(1);
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when tab is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderTabs({ onValueChange: handleChange });

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);

      expect(handleChange).toHaveBeenCalledTimes(1);
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
      renderTabs({ onValueChange: handleChange });

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      await user.click(tab2);
      await user.click(tab3);

      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenNthCalledWith(1, 'tab2');
      expect(handleChange).toHaveBeenNthCalledWith(2, 'tab3');
    });

    it('can click active tab without error', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderTabs({ value: 'tab1', onValueChange: handleChange });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      await user.click(tab1);

      expect(handleChange).toHaveBeenCalledWith('tab1');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to div element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
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
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
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
    it('applies container CSS variables', () => {
      const { container } = renderTabs();
      const tablist = container.querySelector('[role="tablist"]') as HTMLElement;
      expect(tablist).toHaveStyle({
        background: 'var(--tab-container-bg)',
      });
    });

    it('applies active tab styling', () => {
      renderTabs({ value: 'tab1' });
      const activeTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(activeTab).toHaveStyle({
        background: 'var(--tab-active-bg)',
      });
    });

    it('applies inactive tab styling', () => {
      renderTabs({ value: 'tab1' });
      const inactiveTab = screen.getByRole('tab', { name: 'Tab 2' });
      expect(inactiveTab).toHaveStyle({
        background: 'var(--tab-bg)',
      });
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
      }).toThrow('Tabs compound components must be used within TabsGlass.Root');

      consoleSpy.mockRestore();
    });

    it('throws error when TabsContent used outside Root', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TabsGlass.Content value="test">Content</TabsGlass.Content>);
      }).toThrow('Tabs compound components must be used within TabsGlass.Root');

      consoleSpy.mockRestore();
    });
  });
});
