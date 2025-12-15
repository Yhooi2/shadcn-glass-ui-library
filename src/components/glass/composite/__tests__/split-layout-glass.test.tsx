import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SplitLayoutGlass } from '../split-layout-glass';
import { createRef } from 'react';

describe('SplitLayoutGlass Compound API', () => {
  // ==================== RENDERING ====================

  describe('Rendering', () => {
    it('renders sidebar and main content', () => {
      render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <div data-testid="sidebar-content">Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div data-testid="main-content">Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
      expect(screen.getByTestId('main-content')).toBeInTheDocument();
    });

    it('renders with Provider and all intensity variants', () => {
      const intensities: Array<'subtle' | 'medium' | 'strong'> = ['subtle', 'medium', 'strong'];

      intensities.forEach((intensity) => {
        const { unmount } = render(
          <SplitLayoutGlass.Provider intensity={intensity}>
            <SplitLayoutGlass.Root>
              <SplitLayoutGlass.Sidebar>
                <div>Sidebar</div>
              </SplitLayoutGlass.Sidebar>
              <SplitLayoutGlass.Main>
                <div>Main</div>
              </SplitLayoutGlass.Main>
            </SplitLayoutGlass.Root>
          </SplitLayoutGlass.Provider>
        );
        expect(screen.getByLabelText('Sidebar navigation')).toBeInTheDocument();
        expect(screen.getByLabelText('Main content')).toBeInTheDocument();
        unmount();
      });
    });

    it('applies default props correctly', () => {
      const { container } = render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      expect(grid).toHaveClass('grid');

      // Check default CSS variables
      const style = grid.getAttribute('style');
      expect(style).toContain('--grid-template: minmax(300px, 1fr) 2fr');
      expect(style).toContain('--sticky-offset: 24px');
    });
  });

  // ==================== RATIO PROPS ====================

  describe('Ratio Props', () => {
    it('applies default ratio (1:2)', () => {
      const { container } = render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--grid-template: minmax(300px, 1fr) 2fr');
    });

    it('applies custom ratio (1:3)', () => {
      const { container } = render(
        <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 3 }}>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--grid-template: minmax(300px, 1fr) 3fr');
    });

    it('applies equal ratio', () => {
      const { container } = render(
        <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 1 }}>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--grid-template: minmax(300px, 1fr) 1fr');
    });
  });

  // ==================== WIDTH CONSTRAINTS ====================

  describe('Width Constraints', () => {
    it('applies minSidebarWidth', () => {
      const { container } = render(
        <SplitLayoutGlass.Root minSidebarWidth="250px">
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--grid-template: minmax(250px, 1fr) 2fr');
    });

    it('applies maxSidebarWidth', () => {
      const { container } = render(
        <SplitLayoutGlass.Root minSidebarWidth="280px" maxSidebarWidth="400px">
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--grid-template: minmax(280px, 400px) 2fr');
    });

    it('calculates grid template correctly with max width', () => {
      const { container } = render(
        <SplitLayoutGlass.Root
          minSidebarWidth="300px"
          maxSidebarWidth="500px"
          ratio={{ sidebar: 1, main: 3 }}
        >
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--grid-template: minmax(300px, 500px) 3fr');
    });
  });

  // ==================== GAP PROPS ====================

  describe('Gap Props', () => {
    it('applies gap with CSS variables', () => {
      const { container } = render(
        <SplitLayoutGlass.Root gap={20}>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--gap-mobile: 20px');
      expect(style).toContain('--gap-desktop: 20px');
    });

    it('applies mobile gap', () => {
      const { container } = render(
        <SplitLayoutGlass.Root gap={{ mobile: 12 }}>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--gap-mobile: 12px');
    });

    it('applies desktop gap via object', () => {
      const { container } = render(
        <SplitLayoutGlass.Root gap={{ mobile: 16, desktop: 32 }}>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--gap-mobile: 16px');
      expect(style).toContain('--gap-desktop: 32px');
    });
  });

  // ==================== MOBILE LAYOUTS ====================

  describe('Mobile Layouts', () => {
    it('renders stack layout (default)', () => {
      const { container } = render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      expect(grid).toHaveClass('grid-cols-1');
    });

    it('renders main-only layout', () => {
      const { container } = render(
        <SplitLayoutGlass.Root mobileLayout="main-only">
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('*:data-split-sidebar:hidden');
    });

    it('renders sidebar-only layout', () => {
      const { container } = render(
        <SplitLayoutGlass.Root mobileLayout="sidebar-only">
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('*:data-split-main:hidden');
    });
  });

  // ==================== BREAKPOINTS ====================

  describe('Breakpoints', () => {
    it('applies md breakpoint (default)', () => {
      const { container } = render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      expect(grid.className).toMatch(/md:grid-cols-/);

      const aside = screen.getByLabelText('Sidebar navigation');
      expect(aside.className).toMatch(/md:sticky/);
      expect(aside.className).toMatch(/md:top-/);
    });

    it('applies lg breakpoint via Provider', () => {
      const { container } = render(
        <SplitLayoutGlass.Provider breakpoint="lg">
          <SplitLayoutGlass.Root>
            <SplitLayoutGlass.Sidebar>
              <div>Sidebar</div>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <div>Main</div>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </SplitLayoutGlass.Provider>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      expect(grid.className).toMatch(/lg:grid-cols-/);

      const aside = screen.getByLabelText('Sidebar navigation');
      expect(aside.className).toMatch(/lg:sticky/);
    });

    it('applies xl breakpoint via Provider', () => {
      const { container } = render(
        <SplitLayoutGlass.Provider breakpoint="xl">
          <SplitLayoutGlass.Root>
            <SplitLayoutGlass.Sidebar>
              <div>Sidebar</div>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <div>Main</div>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </SplitLayoutGlass.Provider>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      expect(grid.className).toMatch(/xl:grid-cols-/);

      const aside = screen.getByLabelText('Sidebar navigation');
      expect(aside.className).toMatch(/xl:sticky/);
    });
  });

  // ==================== STICKY BEHAVIOR ====================

  describe('Sticky Behavior', () => {
    it('applies sticky offset via Provider', () => {
      const { container } = render(
        <SplitLayoutGlass.Provider stickyOffset={32}>
          <SplitLayoutGlass.Root>
            <SplitLayoutGlass.Sidebar>
              <div>Sidebar</div>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <div>Main</div>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </SplitLayoutGlass.Provider>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--sticky-offset: 32px');
    });

    it('calculates max-height correctly', () => {
      const { container } = render(
        <SplitLayoutGlass.Provider stickyOffset={20}>
          <SplitLayoutGlass.Root>
            <SplitLayoutGlass.Sidebar>
              <div>Sidebar</div>
            </SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.Main>
              <div>Main</div>
            </SplitLayoutGlass.Main>
          </SplitLayoutGlass.Root>
        </SplitLayoutGlass.Provider>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--sticky-max-height: calc(100vh - calc(20px * 2))');
    });
  });

  // ==================== ACCESSIBILITY ====================

  describe('Accessibility', () => {
    it('applies sidebar ARIA label', () => {
      render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar label="Navigation menu">
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const aside = screen.getByLabelText('Navigation menu');
      expect(aside).toBeInTheDocument();
    });

    it('applies main ARIA label', () => {
      render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main label="Article content">
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const main = screen.getByLabelText('Article content');
      expect(main).toBeInTheDocument();
    });

    it('renders semantic HTML (aside, main)', () => {
      render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const aside = screen.getByLabelText('Sidebar navigation');
      expect(aside.tagName).toBe('ASIDE');

      const main = screen.getByLabelText('Main content');
      expect(main.tagName).toBe('MAIN');
    });
  });

  // ==================== CUSTOM CLASSNAMES ====================

  describe('Custom ClassNames', () => {
    it('applies className to Root', () => {
      const { container } = render(
        <SplitLayoutGlass.Root className="custom-container">
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const grid = container.querySelector('[data-split-layout-root]') as HTMLElement;
      expect(grid).toHaveClass('custom-container');
    });

    it('applies className to Sidebar', () => {
      render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar className="custom-sidebar">
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const aside = screen.getByLabelText('Sidebar navigation');
      expect(aside).toHaveClass('custom-sidebar');
    });

    it('applies className to Main', () => {
      render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main className="custom-main">
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      const main = screen.getByLabelText('Main content');
      expect(main).toHaveClass('custom-main');
    });
  });

  // ==================== REF FORWARDING ====================

  describe('Ref Forwarding', () => {
    it('forwards ref to Root correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <SplitLayoutGlass.Root ref={ref}>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('grid');
    });
  });

  // ==================== COMPOUND COMPONENTS ====================

  describe('Compound Components', () => {
    it('renders SidebarHeader', () => {
      render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.SidebarHeader>
              <div data-testid="sidebar-header">Header</div>
            </SplitLayoutGlass.SidebarHeader>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      expect(screen.getByTestId('sidebar-header')).toBeInTheDocument();
    });

    it('renders SidebarContent with scrollable wrapper', () => {
      const { container } = render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.SidebarContent>
              <div data-testid="sidebar-content">Content</div>
            </SplitLayoutGlass.SidebarContent>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
      const scrollArea = container.querySelector('[data-radix-scroll-area-viewport]');
      expect(scrollArea).toBeInTheDocument();
    });

    it('renders SidebarContent without scrollable wrapper', () => {
      const { container } = render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.SidebarContent scrollable={false}>
              <div data-testid="sidebar-content">Content</div>
            </SplitLayoutGlass.SidebarContent>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
      const scrollArea = container.querySelector('[data-radix-scroll-area-viewport]');
      expect(scrollArea).not.toBeInTheDocument();
    });

    it('renders SidebarFooter', () => {
      render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <SplitLayoutGlass.SidebarFooter>
              <div data-testid="sidebar-footer">Footer</div>
            </SplitLayoutGlass.SidebarFooter>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <div>Main</div>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      expect(screen.getByTestId('sidebar-footer')).toBeInTheDocument();
    });

    it('renders MainHeader', () => {
      render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <SplitLayoutGlass.MainHeader>
              <div data-testid="main-header">Header</div>
            </SplitLayoutGlass.MainHeader>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      expect(screen.getByTestId('main-header')).toBeInTheDocument();
    });

    it('renders MainContent with scrollable wrapper', () => {
      const { container } = render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <SplitLayoutGlass.MainContent>
              <div data-testid="main-content">Content</div>
            </SplitLayoutGlass.MainContent>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      expect(screen.getByTestId('main-content')).toBeInTheDocument();
      const scrollArea = container.querySelector('[data-radix-scroll-area-viewport]');
      expect(scrollArea).toBeInTheDocument();
    });

    it('renders MainFooter', () => {
      render(
        <SplitLayoutGlass.Root>
          <SplitLayoutGlass.Sidebar>
            <div>Sidebar</div>
          </SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.Main>
            <SplitLayoutGlass.MainFooter>
              <div data-testid="main-footer">Footer</div>
            </SplitLayoutGlass.MainFooter>
          </SplitLayoutGlass.Main>
        </SplitLayoutGlass.Root>
      );

      expect(screen.getByTestId('main-footer')).toBeInTheDocument();
    });
  });
});
