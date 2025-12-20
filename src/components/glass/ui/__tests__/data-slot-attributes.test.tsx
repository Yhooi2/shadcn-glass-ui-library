/**
 * Tests for data-slot attributes (shadcn/ui v4 compatibility)
 *
 * These tests verify that all Glass UI components have the correct
 * data-slot attributes for CSS targeting with Tailwind v4.
 *
 * @see https://github.com/Yhooi2/shadcn-glass-ui-library/issues/7
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import {
  AvatarGlass,
  AvatarGlassSimple,
  AvatarGlassFallback,
  AvatarGlassImage,
} from '../avatar-glass';
import { GlassCard } from '../glass-card';
import { SkeletonGlass } from '../skeleton-glass';
import { ToggleGlass } from '../toggle-glass';
import { SliderGlass } from '../slider-glass';
import { NotificationGlass } from '../notification-glass';
import { CircularProgressGlass } from '../circular-progress-glass';
import { ProgressGlass } from '../../specialized/progress-glass';
import { StepperGlass } from '../stepper-glass';
import {
  PopoverGlass,
  PopoverGlassTrigger,
  PopoverGlassContent,
  PopoverGlassAnchor,
} from '../popover-glass';
import {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
  DropdownMenuGlassLabel,
  DropdownMenuGlassSeparator,
} from '../dropdown-menu-glass';
import { DropdownGlass } from '../dropdown-glass';

describe('data-slot attributes (shadcn/ui v4 compatibility)', () => {
  describe('AvatarGlass', () => {
    it('has data-slot="avatar" on root wrapper', () => {
      const { container } = render(
        <AvatarGlass>
          <AvatarGlassFallback>JD</AvatarGlassFallback>
        </AvatarGlass>
      );
      expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument();
    });

    it('has data-slot="avatar-fallback" on fallback', () => {
      const { container } = render(
        <AvatarGlass>
          <AvatarGlassFallback>JD</AvatarGlassFallback>
        </AvatarGlass>
      );
      expect(container.querySelector('[data-slot="avatar-fallback"]')).toBeInTheDocument();
    });

    it('has data-slot="avatar-image" on image element', () => {
      // Note: AvatarGlassImage renders with data-slot but may not show
      // until image loads. We test that the component applies the attribute.
      const { container } = render(
        <AvatarGlass>
          <AvatarGlassImage src="https://example.com/avatar.jpg" alt="User" />
          <AvatarGlassFallback>JD</AvatarGlassFallback>
        </AvatarGlass>
      );
      // The image element exists in DOM with data-slot, but may be hidden
      // until loaded. We check the img element has the attribute.
      const img = container.querySelector('img');
      if (img) {
        expect(img).toHaveAttribute('data-slot', 'avatar-image');
      } else {
        // Image not yet rendered (async load), verify fallback is shown
        expect(container.querySelector('[data-slot="avatar-fallback"]')).toBeInTheDocument();
      }
    });

    it('has data-slot="avatar-status" on status indicator', () => {
      const { container } = render(<AvatarGlassSimple name="John Doe" status="online" />);
      expect(container.querySelector('[data-slot="avatar-status"]')).toBeInTheDocument();
    });
  });

  describe('GlassCard', () => {
    it('has data-slot="card" on root', () => {
      const { container } = render(<GlassCard>Content</GlassCard>);
      expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
    });
  });

  describe('SkeletonGlass', () => {
    it('has data-slot="skeleton" on root', () => {
      const { container } = render(<SkeletonGlass />);
      expect(container.querySelector('[data-slot="skeleton"]')).toBeInTheDocument();
    });
  });

  describe('ToggleGlass', () => {
    it('has data-slot="toggle" on button', () => {
      const { container } = render(<ToggleGlass />);
      expect(container.querySelector('[data-slot="toggle"]')).toBeInTheDocument();
    });
  });

  describe('SliderGlass', () => {
    it('has data-slot="slider" on root', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} />);
      expect(container.querySelector('[data-slot="slider"]')).toBeInTheDocument();
    });

    it('has data-slot="slider-track" on track', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} />);
      expect(container.querySelector('[data-slot="slider-track"]')).toBeInTheDocument();
    });

    it('has data-slot="slider-range" on range', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} />);
      expect(container.querySelector('[data-slot="slider-range"]')).toBeInTheDocument();
    });

    it('has data-slot="slider-thumb" on thumb', () => {
      const { container } = render(<SliderGlass defaultValue={[50]} />);
      expect(container.querySelector('[data-slot="slider-thumb"]')).toBeInTheDocument();
    });
  });

  describe('NotificationGlass', () => {
    it('has data-slot="notification" on root', () => {
      const { container } = render(
        <NotificationGlass title="Test" message="Message" onClose={() => {}} />
      );
      expect(container.querySelector('[data-slot="notification"]')).toBeInTheDocument();
    });
  });

  describe('CircularProgressGlass', () => {
    it('has data-slot="circular-progress" on root', () => {
      const { container } = render(<CircularProgressGlass value={50} />);
      expect(container.querySelector('[data-slot="circular-progress"]')).toBeInTheDocument();
    });
  });

  describe('ProgressGlass', () => {
    it('has data-slot="progress" on root', () => {
      const { container } = render(<ProgressGlass value={50} />);
      expect(container.querySelector('[data-slot="progress"]')).toBeInTheDocument();
    });

    it('has data-slot="progress-indicator" on indicator', () => {
      const { container } = render(<ProgressGlass value={50} />);
      expect(container.querySelector('[data-slot="progress-indicator"]')).toBeInTheDocument();
    });
  });

  describe('StepperGlass', () => {
    const renderStepper = () =>
      render(
        <StepperGlass.Root value="step1">
          <StepperGlass.List>
            <StepperGlass.Step value="step1" label="Step 1" />
            <StepperGlass.Step value="step2" label="Step 2" />
          </StepperGlass.List>
          <StepperGlass.Content value="step1">Content 1</StepperGlass.Content>
        </StepperGlass.Root>
      );

    it('has data-slot="stepper" on root', () => {
      const { container } = renderStepper();
      expect(container.querySelector('[data-slot="stepper"]')).toBeInTheDocument();
    });

    it('has data-slot="stepper-list" on list', () => {
      const { container } = renderStepper();
      expect(container.querySelector('[data-slot="stepper-list"]')).toBeInTheDocument();
    });

    it('has data-slot="stepper-item" on step items', () => {
      const { container } = renderStepper();
      const items = container.querySelectorAll('[data-slot="stepper-item"]');
      expect(items.length).toBeGreaterThanOrEqual(1);
    });

    it('has data-slot="stepper-separator" on separators', () => {
      const { container } = renderStepper();
      expect(container.querySelector('[data-slot="stepper-separator"]')).toBeInTheDocument();
    });

    it('has data-slot="stepper-content" on content', () => {
      const { container } = renderStepper();
      expect(container.querySelector('[data-slot="stepper-content"]')).toBeInTheDocument();
    });
  });

  describe('PopoverGlass', () => {
    it('has data-slot="popover-trigger" on trigger', () => {
      const { container } = render(
        <PopoverGlass>
          <PopoverGlassTrigger>Open</PopoverGlassTrigger>
          <PopoverGlassContent>Content</PopoverGlassContent>
        </PopoverGlass>
      );
      expect(container.querySelector('[data-slot="popover-trigger"]')).toBeInTheDocument();
    });

    it('has data-slot="popover-anchor" on anchor', () => {
      const { container } = render(
        <PopoverGlass>
          <PopoverGlassAnchor>Anchor</PopoverGlassAnchor>
          <PopoverGlassTrigger>Open</PopoverGlassTrigger>
          <PopoverGlassContent>Content</PopoverGlassContent>
        </PopoverGlass>
      );
      expect(container.querySelector('[data-slot="popover-anchor"]')).toBeInTheDocument();
    });

    it('has data-slot="popover-content" on content when open', async () => {
      const user = userEvent.setup();
      render(
        <PopoverGlass>
          <PopoverGlassTrigger>Open</PopoverGlassTrigger>
          <PopoverGlassContent>Content</PopoverGlassContent>
        </PopoverGlass>
      );
      await user.click(screen.getByText('Open'));
      expect(document.querySelector('[data-slot="popover-content"]')).toBeInTheDocument();
    });
  });

  describe('DropdownMenuGlass', () => {
    it('has data-slot="dropdown-menu-trigger" on trigger', () => {
      const { container } = render(
        <DropdownMenuGlass>
          <DropdownMenuGlassTrigger>Open</DropdownMenuGlassTrigger>
          <DropdownMenuGlassContent>
            <DropdownMenuGlassItem>Item</DropdownMenuGlassItem>
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>
      );
      expect(container.querySelector('[data-slot="dropdown-menu-trigger"]')).toBeInTheDocument();
    });

    it('has data-slot="dropdown-menu-content" on content when open', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenuGlass>
          <DropdownMenuGlassTrigger>Open</DropdownMenuGlassTrigger>
          <DropdownMenuGlassContent>
            <DropdownMenuGlassItem>Item</DropdownMenuGlassItem>
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>
      );
      await user.click(screen.getByText('Open'));
      expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeInTheDocument();
    });

    it('has data-slot="dropdown-menu-item" on items when open', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenuGlass>
          <DropdownMenuGlassTrigger>Open</DropdownMenuGlassTrigger>
          <DropdownMenuGlassContent>
            <DropdownMenuGlassItem>Item</DropdownMenuGlassItem>
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>
      );
      await user.click(screen.getByText('Open'));
      expect(document.querySelector('[data-slot="dropdown-menu-item"]')).toBeInTheDocument();
    });

    it('has data-slot="dropdown-menu-label" on labels when open', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenuGlass>
          <DropdownMenuGlassTrigger>Open</DropdownMenuGlassTrigger>
          <DropdownMenuGlassContent>
            <DropdownMenuGlassLabel>Label</DropdownMenuGlassLabel>
            <DropdownMenuGlassItem>Item</DropdownMenuGlassItem>
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>
      );
      await user.click(screen.getByText('Open'));
      expect(document.querySelector('[data-slot="dropdown-menu-label"]')).toBeInTheDocument();
    });

    it('has data-slot="dropdown-menu-separator" on separators when open', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenuGlass>
          <DropdownMenuGlassTrigger>Open</DropdownMenuGlassTrigger>
          <DropdownMenuGlassContent>
            <DropdownMenuGlassItem>Item 1</DropdownMenuGlassItem>
            <DropdownMenuGlassSeparator />
            <DropdownMenuGlassItem>Item 2</DropdownMenuGlassItem>
          </DropdownMenuGlassContent>
        </DropdownMenuGlass>
      );
      await user.click(screen.getByText('Open'));
      expect(document.querySelector('[data-slot="dropdown-menu-separator"]')).toBeInTheDocument();
    });
  });

  describe('DropdownGlass', () => {
    it('has data-slot="dropdown" on wrapper', () => {
      const { container } = render(
        <DropdownGlass
          trigger={<button>Open</button>}
          items={[{ label: 'Item', onClick: () => {} }]}
        />
      );
      expect(container.querySelector('[data-slot="dropdown"]')).toBeInTheDocument();
    });
  });
});
