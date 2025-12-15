import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SplitLayoutGlass } from '../split-layout-glass';
import { createRef } from 'react';

describe('SplitLayoutGlass', () => {
  // ==================== RENDERING ====================

  describe('Rendering', () => {
    it('renders sidebar and main content', () => {
      render(
        <SplitLayoutGlass
          sidebar={<div data-testid="sidebar-content">Sidebar</div>}
          main={<div data-testid="main-content">Main</div>}
        />
      );

      expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
      expect(screen.getByTestId('main-content')).toBeInTheDocument();
    });

    it('renders with all intensity variants', () => {
      const intensities: Array<'subtle' | 'medium' | 'strong'> = ['subtle', 'medium', 'strong'];

      intensities.forEach((intensity) => {
        const { unmount } = render(
          <SplitLayoutGlass
            intensity={intensity}
            sidebar={<div>Sidebar</div>}
            main={<div>Main</div>}
          />
        );
        expect(screen.getByRole('complementary')).toBeInTheDocument();
        expect(screen.getByRole('main')).toBeInTheDocument();
        unmount();
      });
    });

    it('applies default props correctly', () => {
      const { container } = render(
        <SplitLayoutGlass sidebar={<div>Sidebar</div>} main={<div>Main</div>} />
      );

      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid');

      // Check default CSS variables
      expect(grid).toHaveStyle({
        '--grid-template': 'minmax(300px, 1fr) 2fr',
        '--sticky-offset': '24px',
      });
    });
  });

  // ==================== RATIO PROPS ====================

  describe('Ratio Props', () => {
    it('applies default ratio (1:2)', () => {
      const { container } = render(
        <SplitLayoutGlass sidebar={<div>Sidebar</div>} main={<div>Main</div>} />
      );

      const grid = container.firstChild as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--grid-template: minmax(300px, 1fr) 2fr');
    });

    it('applies custom ratio (1:3)', () => {
      const { container } = render(
        <SplitLayoutGlass
          ratio={{ sidebar: 1, main: 3 }}
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const grid = container.firstChild as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--grid-template: minmax(300px, 1fr) 3fr');
    });

    it('applies equal ratio', () => {
      const { container } = render(
        <SplitLayoutGlass
          ratio={{ sidebar: 1, main: 1 }}
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const grid = container.firstChild as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--grid-template: minmax(300px, 1fr) 1fr');
    });
  });

  // ==================== WIDTH CONSTRAINTS ====================

  describe('Width Constraints', () => {
    it('applies minSidebarWidth', () => {
      const { container } = render(
        <SplitLayoutGlass
          minSidebarWidth="250px"
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const grid = container.firstChild as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--grid-template: minmax(250px, 1fr) 2fr');
    });

    it('applies maxSidebarWidth', () => {
      const { container } = render(
        <SplitLayoutGlass
          minSidebarWidth="280px"
          maxSidebarWidth="400px"
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const grid = container.firstChild as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--grid-template: minmax(280px, 400px) 2fr');
    });

    it('calculates grid template correctly with max width', () => {
      const { container } = render(
        <SplitLayoutGlass
          minSidebarWidth="300px"
          maxSidebarWidth="500px"
          ratio={{ sidebar: 1, main: 3 }}
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const grid = container.firstChild as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--grid-template: minmax(300px, 500px) 3fr');
    });
  });

  // ==================== GAP PROPS ====================

  describe('Gap Props', () => {
    it('applies number gap', () => {
      const { container } = render(
        <SplitLayoutGlass gap={20} sidebar={<div>Sidebar</div>} main={<div>Main</div>} />
      );

      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveStyle({ gap: '20px' });
    });

    it('applies mobile gap', () => {
      const { container } = render(
        <SplitLayoutGlass
          gap={{ mobile: 12 }}
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveStyle({ gap: '12px' });
    });

    it('applies desktop gap via object', () => {
      const { container } = render(
        <SplitLayoutGlass
          gap={{ mobile: 16, desktop: 32 }}
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const grid = container.firstChild as HTMLElement;
      // Mobile gap applied inline
      expect(grid).toHaveStyle({ gap: '16px' });

      // Desktop gap is applied via @media in style tag
      const styleTag = container.querySelector('style');
      expect(styleTag?.textContent).toContain('gap: 32px');
    });
  });

  // ==================== MOBILE LAYOUTS ====================

  describe('Mobile Layouts', () => {
    it('renders stack layout (default)', () => {
      const { container } = render(
        <SplitLayoutGlass sidebar={<div>Sidebar</div>} main={<div>Main</div>} />
      );

      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-1');
    });

    it('renders main-only layout', () => {
      const { container } = render(
        <SplitLayoutGlass
          mobileLayout="main-only"
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('[&>aside]:hidden');
    });

    it('renders sidebar-only layout', () => {
      const { container } = render(
        <SplitLayoutGlass
          mobileLayout="sidebar-only"
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('[&>main]:hidden');
    });
  });

  // ==================== BREAKPOINTS ====================

  describe('Breakpoints', () => {
    it('applies xl breakpoint (default)', () => {
      const { container } = render(
        <SplitLayoutGlass sidebar={<div>Sidebar</div>} main={<div>Main</div>} />
      );

      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('xl:grid-cols-[var(--grid-template)]');

      const aside = screen.getByRole('complementary');
      expect(aside).toHaveClass('xl:sticky');
      expect(aside).toHaveClass('xl:top-[var(--sticky-offset)]');
    });

    it('applies lg breakpoint', () => {
      const { container } = render(
        <SplitLayoutGlass breakpoint="lg" sidebar={<div>Sidebar</div>} main={<div>Main</div>} />
      );

      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('lg:grid-cols-[var(--grid-template)]');

      const aside = screen.getByRole('complementary');
      expect(aside).toHaveClass('lg:sticky');
    });

    it('applies md breakpoint', () => {
      const { container } = render(
        <SplitLayoutGlass breakpoint="md" sidebar={<div>Sidebar</div>} main={<div>Main</div>} />
      );

      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('md:grid-cols-[var(--grid-template)]');

      const aside = screen.getByRole('complementary');
      expect(aside).toHaveClass('md:sticky');
    });
  });

  // ==================== STICKY BEHAVIOR ====================

  describe('Sticky Behavior', () => {
    it('applies sticky offset', () => {
      const { container } = render(
        <SplitLayoutGlass stickyOffset={32} sidebar={<div>Sidebar</div>} main={<div>Main</div>} />
      );

      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveStyle({
        '--sticky-offset': '32px',
      });
    });

    it('calculates max-height correctly', () => {
      const { container } = render(
        <SplitLayoutGlass stickyOffset={20} sidebar={<div>Sidebar</div>} main={<div>Main</div>} />
      );

      const grid = container.firstChild as HTMLElement;
      const style = grid.getAttribute('style');
      expect(style).toContain('--sticky-max-height: calc(100vh - calc(20px * 2))');
    });
  });

  // ==================== ACCESSIBILITY ====================

  describe('Accessibility', () => {
    it('applies sidebar ARIA label', () => {
      render(
        <SplitLayoutGlass
          sidebarLabel="Navigation menu"
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const aside = screen.getByRole('complementary', { name: /navigation menu/i });
      expect(aside).toBeInTheDocument();
    });

    it('applies main ARIA label', () => {
      render(
        <SplitLayoutGlass
          mainLabel="Article content"
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const main = screen.getByRole('main', { name: /article content/i });
      expect(main).toBeInTheDocument();
    });

    it('renders semantic HTML (aside, main)', () => {
      render(<SplitLayoutGlass sidebar={<div>Sidebar</div>} main={<div>Main</div>} />);

      const aside = screen.getByRole('complementary');
      expect(aside.tagName).toBe('ASIDE');

      const main = screen.getByRole('main');
      expect(main.tagName).toBe('MAIN');
    });
  });

  // ==================== CUSTOM CLASSNAMES ====================

  describe('Custom ClassNames', () => {
    it('applies className to container', () => {
      const { container } = render(
        <SplitLayoutGlass
          className="custom-container"
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('custom-container');
    });

    it('applies sidebarClassName', () => {
      render(
        <SplitLayoutGlass
          sidebarClassName="custom-sidebar"
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const aside = screen.getByRole('complementary');
      expect(aside).toHaveClass('custom-sidebar');
    });

    it('applies mainClassName', () => {
      render(
        <SplitLayoutGlass
          mainClassName="custom-main"
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const main = screen.getByRole('main');
      expect(main).toHaveClass('custom-main');
    });
  });

  // ==================== REF FORWARDING ====================

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(<SplitLayoutGlass ref={ref} sidebar={<div>Sidebar</div>} main={<div>Main</div>} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('grid');
    });
  });
});
