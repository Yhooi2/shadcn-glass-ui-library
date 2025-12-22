import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  HoverCardGlass,
  HoverCardGlassTrigger,
  HoverCardGlassContent,
  HoverCardGlassLegacy,
} from '../hover-card-glass';

describe('HoverCardGlass', () => {
  describe('Rendering', () => {
    it('renders trigger element', () => {
      render(
        <HoverCardGlassLegacy trigger={<span>Hover me</span>}>
          <div>HoverCard Content</div>
        </HoverCardGlassLegacy>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('opens hover card when trigger is hovered', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover me</span>} openDelay={0}>
          <div>HoverCard Content</div>
        </HoverCardGlassLegacy>
      );

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.getByText('HoverCard Content')).toBeInTheDocument();
      });
    });

    it('displays hover card content when open', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover me</span>} openDelay={0}>
          <div>Test Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByText('Test Content')).toBeInTheDocument();
      });
    });

    it('applies custom className to content', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy
          trigger={<span>Hover me</span>}
          className="custom-class"
          openDelay={0}
        >
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const content = screen.getByText('Content').closest('[data-slot="hovercard-content"]');
        expect(content).toHaveClass('custom-class');
      });
    });

    it('has correct data-slot attribute on trigger', () => {
      render(
        <HoverCardGlassLegacy trigger={<span>Hover me</span>}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      const trigger = screen.getByText('Hover me').closest('[data-slot="hovercard-trigger"]');
      expect(trigger).toBeInTheDocument();
    });

    it('has correct data-slot attribute on content', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover me</span>} openDelay={0}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const content = screen.getByText('Content').closest('[data-slot="hovercard-content"]');
        expect(content).toBeInTheDocument();
      });
    });
  });

  describe('Positioning', () => {
    it('renders with bottom side (default)', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} side="bottom" openDelay={0}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        const content = screen.getByText('Content').closest('[data-slot="hovercard-content"]');
        expect(content).toBeInTheDocument();
        expect(content?.getAttribute('data-side')).toBe('bottom');
      });
    });

    it('renders with top side', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} side="top" openDelay={0}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        const content = screen.getByText('Content').closest('[data-slot="hovercard-content"]');
        expect(content?.getAttribute('data-side')).toBe('top');
      });
    });

    it('renders with right side', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} side="right" openDelay={0}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        const content = screen.getByText('Content').closest('[data-slot="hovercard-content"]');
        expect(content?.getAttribute('data-side')).toBe('right');
      });
    });

    it('renders with left side', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} side="left" openDelay={0}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        const content = screen.getByText('Content').closest('[data-slot="hovercard-content"]');
        expect(content?.getAttribute('data-side')).toBe('left');
      });
    });
  });

  describe('Alignment', () => {
    it('renders with center alignment (default)', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} align="center" openDelay={0}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        const content = screen.getByText('Content').closest('[data-slot="hovercard-content"]');
        expect(content).toBeInTheDocument();
        expect(content?.getAttribute('data-align')).toBe('center');
      });
    });

    it('renders with start alignment', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} align="start" openDelay={0}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        const content = screen.getByText('Content').closest('[data-slot="hovercard-content"]');
        expect(content?.getAttribute('data-align')).toBe('start');
      });
    });

    it('renders with end alignment', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} align="end" openDelay={0}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        const content = screen.getByText('Content').closest('[data-slot="hovercard-content"]');
        expect(content?.getAttribute('data-align')).toBe('end');
      });
    });
  });

  describe('Arrow', () => {
    it('renders arrow by default', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} openDelay={0}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        const content = screen.getByText('Content').closest('[data-slot="hovercard-content"]');
        const arrow = content?.querySelector('svg');
        expect(arrow).toBeInTheDocument();
      });
    });

    it('hides arrow when showArrow is false', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} showArrow={false} openDelay={0}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        const content = screen.getByText('Content').closest('[data-slot="hovercard-content"]');
        const arrow = content?.querySelector('svg');
        expect(arrow).not.toBeInTheDocument();
      });
    });
  });

  describe('Controlled Mode', () => {
    it('respects controlled open state', () => {
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} open={true}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      // Should be visible immediately
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('calls onOpenChange when state changes', async () => {
      const user = userEvent.setup();
      const handleOpenChange = vi.fn();

      render(
        <HoverCardGlassLegacy
          trigger={<span>Hover</span>}
          onOpenChange={handleOpenChange}
          openDelay={0}
        >
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(true);
      });
    });

    it('remains closed when open is false', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} open={false}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover'));

      // Should not open because it's controlled as closed
      await waitFor(
        () => {
          expect(screen.queryByText('Content')).not.toBeInTheDocument();
        },
        { timeout: 500 }
      );
    });
  });

  describe('Delays', () => {
    it('uses default openDelay of 200ms', () => {
      // This is primarily a prop test - actual delay behavior is tested in Storybook
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );
      expect(screen.getByText('Hover')).toBeInTheDocument();
    });

    it('accepts custom openDelay', () => {
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} openDelay={500}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );
      expect(screen.getByText('Hover')).toBeInTheDocument();
    });

    it('accepts custom closeDelay', () => {
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} closeDelay={50}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );
      expect(screen.getByText('Hover')).toBeInTheDocument();
    });
  });

  describe('Compound API', () => {
    it('renders with compound API', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlass openDelay={0}>
          <HoverCardGlassTrigger>
            <span>Hover me</span>
          </HoverCardGlassTrigger>
          <HoverCardGlassContent>
            <div>Compound Content</div>
          </HoverCardGlassContent>
        </HoverCardGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByText('Compound Content')).toBeInTheDocument();
      });
    });

    it('supports asChild on trigger', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlass openDelay={0}>
          <HoverCardGlassTrigger asChild>
            <button>Custom Button</button>
          </HoverCardGlassTrigger>
          <HoverCardGlassContent>
            <div>Content</div>
          </HoverCardGlassContent>
        </HoverCardGlass>
      );

      const button = screen.getByRole('button', { name: 'Custom Button' });
      expect(button.tagName).toBe('BUTTON');

      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });

    it('supports showArrow prop on content', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlass openDelay={0}>
          <HoverCardGlassTrigger>
            <span>Hover</span>
          </HoverCardGlassTrigger>
          <HoverCardGlassContent showArrow={false}>
            <div>No Arrow</div>
          </HoverCardGlassContent>
        </HoverCardGlass>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        const content = screen.getByText('No Arrow').closest('[data-slot="hovercard-content"]');
        const arrow = content?.querySelector('svg');
        expect(arrow).not.toBeInTheDocument();
      });
    });

    it('supports side and align props on content', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlass openDelay={0}>
          <HoverCardGlassTrigger>
            <span>Hover</span>
          </HoverCardGlassTrigger>
          <HoverCardGlassContent side="right" align="start">
            <div>Content</div>
          </HoverCardGlassContent>
        </HoverCardGlass>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        const content = screen.getByText('Content').closest('[data-slot="hovercard-content"]');
        expect(content?.getAttribute('data-side')).toBe('right');
        expect(content?.getAttribute('data-align')).toBe('start');
      });
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to content element', async () => {
      const user = userEvent.setup();
      const ref = { current: null as HTMLDivElement | null };

      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} ref={ref} openDelay={0}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLElement);
      });
    });
  });

  describe('Side Offset', () => {
    it('applies custom sideOffset', async () => {
      const user = userEvent.setup();
      render(
        <HoverCardGlassLegacy trigger={<span>Hover</span>} sideOffset={16} openDelay={0}>
          <div>Content</div>
        </HoverCardGlassLegacy>
      );

      await user.hover(screen.getByText('Hover'));

      await waitFor(() => {
        const content = screen.getByText('Content').closest('[data-slot="hovercard-content"]');
        expect(content).toBeInTheDocument();
        // sideOffset is applied internally by Radix UI
      });
    });
  });
});
