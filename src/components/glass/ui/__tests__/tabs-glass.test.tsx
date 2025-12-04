import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabsGlass } from '../tabs-glass';

const mockTabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
];

describe('TabsGlass', () => {
  describe('Rendering', () => {
    it('renders all tabs', () => {
      render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('renders tablist container with role', () => {
      const { container } = render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} />);
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toBeInTheDocument();
    });

    it('renders each tab button with correct role', () => {
      render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
    });

    it('applies custom className', () => {
      const { container } = render(
        <TabsGlass tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} className="custom-class" />
      );
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toHaveClass('custom-class');
    });
  });

  describe('Active Tab State', () => {
    it('marks first tab as active', () => {
      render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} />);
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab1).toHaveAttribute('aria-selected', 'true');
    });

    it('marks second tab as active', () => {
      render(<TabsGlass tabs={mockTabs} activeTab="tab2" onChange={vi.fn()} />);
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    it('marks inactive tabs with aria-selected false', () => {
      render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} />);
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      expect(tab2).toHaveAttribute('aria-selected', 'false');
      expect(tab3).toHaveAttribute('aria-selected', 'false');
    });

    it('shows indicator for active tab', () => {
      const { container } = render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} />);
      // Each active tab should have an indicator div
      const indicators = container.querySelectorAll('.absolute.bottom-0');
      expect(indicators.length).toBeGreaterThan(0);
    });

    it('does not show indicator for inactive tabs', () => {
      const { container } = render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} />);
      // Should have exactly 1 indicator (for the active tab)
      const indicators = container.querySelectorAll('.absolute.bottom-0');
      expect(indicators).toHaveLength(1);
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when tab is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={handleChange} />);

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('calls onChange with correct tab id', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={handleChange} />);

      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      await user.click(tab3);

      expect(handleChange).toHaveBeenCalledWith('tab3');
    });

    it('handles multiple tab switches', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={handleChange} />);

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
      render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={handleChange} />);

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      await user.click(tab1);

      expect(handleChange).toHaveBeenCalledWith('tab1');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to div element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<TabsGlass ref={ref} tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref methods to be called', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<TabsGlass ref={ref} tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} />);

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        expect((ref.current as HTMLElement).tagName).toBe('DIV');
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to container', () => {
      render(
        <TabsGlass
          tabs={mockTabs}
          activeTab="tab1"
          onChange={vi.fn()}
          data-testid="custom-tabs"
          aria-describedby="description"
        />
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('data-testid', 'custom-tabs');
      expect(tablist).toHaveAttribute('aria-describedby', 'description');
    });

    it('applies id attribute correctly', () => {
      render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} id="my-tabs" />);
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('id', 'my-tabs');
    });
  });

  describe('Edge Cases', () => {
    it('renders with empty tabs array', () => {
      const { container } = render(<TabsGlass tabs={[]} activeTab="" onChange={vi.fn()} />);
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toBeInTheDocument();
      expect(screen.queryAllByRole('tab')).toHaveLength(0);
    });

    it('renders with single tab', () => {
      const singleTab = [{ id: 'only', label: 'Only Tab' }];
      render(<TabsGlass tabs={singleTab} activeTab="only" onChange={vi.fn()} />);
      expect(screen.getByRole('tab')).toBeInTheDocument();
      expect(screen.getByText('Only Tab')).toBeInTheDocument();
    });

    it('handles activeTab not in tabs array', () => {
      render(<TabsGlass tabs={mockTabs} activeTab="nonexistent" onChange={vi.fn()} />);
      const tabs = screen.getAllByRole('tab');
      tabs.forEach(tab => {
        expect(tab).toHaveAttribute('aria-selected', 'false');
      });
    });
  });

  describe('Theme Styling', () => {
    it('applies container CSS variables', () => {
      const { container } = render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} />);
      const tablist = container.querySelector('[role="tablist"]') as HTMLElement;
      expect(tablist).toHaveStyle({
        background: 'var(--tab-container-bg)',
      });
    });

    it('applies active tab styling', () => {
      render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} />);
      const activeTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(activeTab).toHaveStyle({
        background: 'var(--tab-active-bg)',
      });
    });

    it('applies inactive tab styling', () => {
      render(<TabsGlass tabs={mockTabs} activeTab="tab1" onChange={vi.fn()} />);
      const inactiveTab = screen.getByRole('tab', { name: 'Tab 2' });
      expect(inactiveTab).toHaveStyle({
        background: 'var(--tab-bg)',
      });
    });
  });
});
