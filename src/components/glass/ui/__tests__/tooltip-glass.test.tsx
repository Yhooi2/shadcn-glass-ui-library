import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  TooltipGlass,
  TooltipGlassProvider,
  TooltipGlassTrigger,
  TooltipGlassContent,
  TooltipGlassSimple,
  // shadcn/ui compatible aliases
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '../tooltip-glass';

// Helper to render with Provider
const renderWithProvider = (ui: React.ReactNode) => {
  return render(<TooltipGlassProvider>{ui}</TooltipGlassProvider>);
};

// Helper to get tooltip content element (not the hidden span)
const getTooltipContent = () => {
  return document.querySelector('[data-slot="tooltip-content"]');
};

describe('TooltipGlass', () => {
  describe('Compound API', () => {
    it('renders trigger element', () => {
      renderWithProvider(
        <TooltipGlass>
          <TooltipGlassTrigger asChild>
            <button>Hover me</button>
          </TooltipGlassTrigger>
          <TooltipGlassContent>Tooltip text</TooltipGlassContent>
        </TooltipGlass>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('does not show tooltip by default', () => {
      renderWithProvider(
        <TooltipGlass>
          <TooltipGlassTrigger asChild>
            <button>Hover me</button>
          </TooltipGlassTrigger>
          <TooltipGlassContent>Tooltip text</TooltipGlassContent>
        </TooltipGlass>
      );
      expect(getTooltipContent()).not.toBeInTheDocument();
    });

    it('shows tooltip on hover', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlass>
          <TooltipGlassTrigger asChild>
            <button>Hover me</button>
          </TooltipGlassTrigger>
          <TooltipGlassContent>Tooltip text</TooltipGlassContent>
        </TooltipGlass>
      );

      const button = screen.getByText('Hover me');
      await user.hover(button);

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent('Tooltip text');
      });
    });

    it('trigger has correct data-state when hovered', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlass>
          <TooltipGlassTrigger asChild>
            <button data-testid="trigger">Hover me</button>
          </TooltipGlassTrigger>
          <TooltipGlassContent>Tooltip text</TooltipGlassContent>
        </TooltipGlass>
      );

      const trigger = screen.getByTestId('trigger');

      // Initial state
      expect(trigger).toHaveAttribute('data-state', 'closed');

      await user.hover(trigger);

      // After hover, state changes
      await waitFor(() => {
        expect(trigger).toHaveAttribute('data-state', 'delayed-open');
      });
    });

    it('applies custom className to content', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlass>
          <TooltipGlassTrigger asChild>
            <button>Hover me</button>
          </TooltipGlassTrigger>
          <TooltipGlassContent className="custom-class">Tooltip text</TooltipGlassContent>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toHaveClass('custom-class');
      });
    });
  });

  describe('Simple API (TooltipGlassSimple)', () => {
    it('renders children', () => {
      renderWithProvider(
        <TooltipGlassSimple content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlassSimple>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('shows tooltip on hover', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlassSimple content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlassSimple>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent('Tooltip text');
      });
    });

    it('applies custom className', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlassSimple content="Tooltip text" className="custom-class">
          <button>Hover me</button>
        </TooltipGlassSimple>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toHaveClass('custom-class');
      });
    });
  });

  describe('Position Variants', () => {
    it('renders with top position by default', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlassSimple content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlassSimple>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveAttribute('data-side', 'top');
      });
    });

    it('renders with bottom position', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlassSimple content="Tooltip text" side="bottom">
          <button>Hover me</button>
        </TooltipGlassSimple>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveAttribute('data-side', 'bottom');
      });
    });

    it('renders with left position', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlassSimple content="Tooltip text" side="left">
          <button>Hover me</button>
        </TooltipGlassSimple>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveAttribute('data-side', 'left');
      });
    });

    it('renders with right position', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlassSimple content="Tooltip text" side="right">
          <button>Hover me</button>
        </TooltipGlassSimple>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveAttribute('data-side', 'right');
      });
    });
  });

  describe('ARIA Attributes', () => {
    it('tooltip has role="tooltip" (hidden span)', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlassSimple content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlassSimple>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        // Radix renders a hidden span with role="tooltip" for accessibility
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('tooltip has unique id', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlassSimple content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlassSimple>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('id');
        expect(tooltip.getAttribute('id')).toBeTruthy();
      });
    });
  });

  describe('Theme Styling', () => {
    it('applies tooltip CSS variables', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlassSimple content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlassSimple>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent() as HTMLElement;
        expect(tooltip).toHaveStyle({
          background: 'var(--tooltip-bg)',
          color: 'var(--tooltip-text)',
        });
      });
    });
  });

  describe('Content Variations', () => {
    it('renders short tooltip text', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlassSimple content="Hi">
          <button>Hover me</button>
        </TooltipGlassSimple>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toHaveTextContent('Hi');
      });
    });

    it('renders long tooltip text', async () => {
      const user = userEvent.setup();
      const longText = 'This is a very long tooltip text that provides detailed information';
      renderWithProvider(
        <TooltipGlassSimple content={longText}>
          <button>Hover me</button>
        </TooltipGlassSimple>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toHaveTextContent(longText);
      });
    });

    it('renders empty content', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlassSimple content="">
          <button>Hover me</button>
        </TooltipGlassSimple>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toBeInTheDocument();
      });
    });
  });

  describe('Complex Children', () => {
    it('renders with complex child components', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlass>
          <TooltipGlassTrigger asChild>
            <div>
              <span>Icon</span>
              <span>Label</span>
            </div>
          </TooltipGlassTrigger>
          <TooltipGlassContent>Tooltip text</TooltipGlassContent>
        </TooltipGlass>
      );

      const icon = screen.getByText('Icon');
      await user.hover(icon);

      await waitFor(() => {
        expect(getTooltipContent()).toBeInTheDocument();
      });
    });

    it('renders with multiple children', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlass>
          <TooltipGlassTrigger asChild>
            <button>
              <span>Click</span>
              <span>Me</span>
            </button>
          </TooltipGlassTrigger>
          <TooltipGlassContent>Tooltip text</TooltipGlassContent>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Click'));

      await waitFor(() => {
        expect(getTooltipContent()).toBeInTheDocument();
      });
    });
  });

  describe('Multiple Tooltips', () => {
    it('renders multiple independent tooltips', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <>
          <TooltipGlassSimple content="Tooltip 1">
            <button>Button 1</button>
          </TooltipGlassSimple>
          <TooltipGlassSimple content="Tooltip 2">
            <button>Button 2</button>
          </TooltipGlassSimple>
        </>
      );

      await user.hover(screen.getByText('Button 1'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toHaveTextContent('Tooltip 1');
      });
    });

    it('each tooltip is independently controlled', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <>
          <TooltipGlassSimple content="Tooltip 1">
            <button data-testid="btn1">Button 1</button>
          </TooltipGlassSimple>
          <TooltipGlassSimple content="Tooltip 2">
            <button data-testid="btn2">Button 2</button>
          </TooltipGlassSimple>
        </>
      );

      // Initially both triggers are closed
      const btn1 = screen.getByTestId('btn1');
      const btn2 = screen.getByTestId('btn2');

      expect(btn1).toHaveAttribute('data-state', 'closed');
      expect(btn2).toHaveAttribute('data-state', 'closed');

      // Hovering Button 1 only affects its trigger
      await user.hover(btn1);
      await waitFor(() => {
        expect(btn1).toHaveAttribute('data-state', 'delayed-open');
        expect(btn2).toHaveAttribute('data-state', 'closed');
      });
    });
  });

  describe('Data Slots', () => {
    it('has data-slot on trigger', () => {
      renderWithProvider(
        <TooltipGlass>
          <TooltipGlassTrigger asChild>
            <button data-testid="trigger">Hover me</button>
          </TooltipGlassTrigger>
          <TooltipGlassContent>Tooltip text</TooltipGlassContent>
        </TooltipGlass>
      );

      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('data-slot', 'tooltip-trigger');
    });

    it('has data-slot on content', async () => {
      const user = userEvent.setup();
      renderWithProvider(
        <TooltipGlass>
          <TooltipGlassTrigger asChild>
            <button>Hover me</button>
          </TooltipGlassTrigger>
          <TooltipGlassContent>Tooltip text</TooltipGlassContent>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toHaveAttribute('data-slot', 'tooltip-content');
      });
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to content', async () => {
      const user = userEvent.setup();
      const ref = { current: null } as React.RefObject<HTMLDivElement>;

      renderWithProvider(
        <TooltipGlass>
          <TooltipGlassTrigger asChild>
            <button>Hover me</button>
          </TooltipGlassTrigger>
          <TooltipGlassContent ref={ref}>Tooltip text</TooltipGlassContent>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });
    });
  });

  describe('shadcn/ui API Compatibility', () => {
    it('Tooltip alias works identically to TooltipGlass', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>Hover me</button>
            </TooltipTrigger>
            <TooltipContent>Tooltip text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('shows tooltip on hover with shadcn/ui API', async () => {
      const user = userEvent.setup();
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>Hover me</button>
            </TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent('Tooltip content');
      });
    });

    it('supports side prop with shadcn/ui API', async () => {
      const user = userEvent.setup();
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>Hover me</button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = getTooltipContent();
        expect(tooltip).toHaveAttribute('data-side', 'bottom');
      });
    });

    it('all shadcn/ui compatible exports are defined', () => {
      expect(Tooltip).toBeDefined();
      expect(TooltipTrigger).toBeDefined();
      expect(TooltipContent).toBeDefined();
      expect(TooltipProvider).toBeDefined();
    });

    it('shadcn/ui aliases are same as TooltipGlass exports', () => {
      expect(Tooltip).toBe(TooltipGlass);
      expect(TooltipTrigger).toBe(TooltipGlassTrigger);
      expect(TooltipContent).toBe(TooltipGlassContent);
      expect(TooltipProvider).toBe(TooltipGlassProvider);
    });
  });
});
