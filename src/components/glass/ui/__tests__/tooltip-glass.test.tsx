import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TooltipGlass } from '../tooltip-glass';

describe('TooltipGlass', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(
        <TooltipGlass content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlass>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('does not show tooltip by default', () => {
      render(
        <TooltipGlass content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlass>
      );
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('shows tooltip on hover', async () => {
      const user = userEvent.setup();
      render(
        <TooltipGlass content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlass>
      );

      const button = screen.getByText('Hover me');
      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByText('Tooltip text')).toBeInTheDocument();
      });
    });

    it('hides tooltip on mouse leave', async () => {
      const user = userEvent.setup();
      render(
        <TooltipGlass content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlass>
      );

      const button = screen.getByText('Hover me');
      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await user.unhover(button);

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });

    it('applies custom className', () => {
      const { container } = render(
        <TooltipGlass content="Tooltip text" className="custom-class">
          <button>Hover me</button>
        </TooltipGlass>
      );
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('Position Variants', () => {
    it('renders with top position by default', async () => {
      const user = userEvent.setup();
      render(
        <TooltipGlass content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('renders with top position explicitly', async () => {
      const user = userEvent.setup();
      render(
        <TooltipGlass content="Tooltip text" position="top">
          <button>Hover me</button>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('renders with bottom position', async () => {
      const user = userEvent.setup();
      render(
        <TooltipGlass content="Tooltip text" position="bottom">
          <button>Hover me</button>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('renders with left position', async () => {
      const user = userEvent.setup();
      render(
        <TooltipGlass content="Tooltip text" position="left">
          <button>Hover me</button>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('renders with right position', async () => {
      const user = userEvent.setup();
      render(
        <TooltipGlass content="Tooltip text" position="right">
          <button>Hover me</button>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });
  });

  describe('ARIA Attributes', () => {
    it('sets aria-describedby when tooltip is visible', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <TooltipGlass content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlass>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).not.toHaveAttribute('aria-describedby');

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(wrapper).toHaveAttribute('aria-describedby');
      });
    });

    it('removes aria-describedby when tooltip is hidden', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <TooltipGlass content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlass>
      );

      const wrapper = container.firstChild as HTMLElement;
      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(wrapper).toHaveAttribute('aria-describedby');
      });

      await user.unhover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(wrapper).not.toHaveAttribute('aria-describedby');
      });
    });

    it('tooltip has role="tooltip"', async () => {
      const user = userEvent.setup();
      render(
        <TooltipGlass content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('role', 'tooltip');
      });
    });

    it('tooltip has unique id', async () => {
      const user = userEvent.setup();
      render(
        <TooltipGlass content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('id');
        expect(tooltip.getAttribute('id')).toBeTruthy();
      });
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to wrapper div', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(
        <TooltipGlass ref={ref} content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlass>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref to access element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(
        <TooltipGlass ref={ref} content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlass>
      );

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        expect((ref.current as HTMLElement).tagName).toBe('DIV');
      }
    });
  });

  describe('Theme Styling', () => {
    it('applies tooltip CSS variables', async () => {
      const user = userEvent.setup();
      render(
        <TooltipGlass content="Tooltip text">
          <button>Hover me</button>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
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
      render(
        <TooltipGlass content="Hi">
          <button>Hover me</button>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByText('Hi')).toBeInTheDocument();
      });
    });

    it('renders long tooltip text', async () => {
      const user = userEvent.setup();
      const longText = 'This is a very long tooltip text that provides detailed information';
      render(
        <TooltipGlass content={longText}>
          <button>Hover me</button>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByText(longText)).toBeInTheDocument();
      });
    });

    it('renders empty content', async () => {
      const user = userEvent.setup();
      render(
        <TooltipGlass content="">
          <button>Hover me</button>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = screen.queryByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
      });
    });
  });

  describe('Complex Children', () => {
    it('renders with complex child components', async () => {
      const user = userEvent.setup();
      render(
        <TooltipGlass content="Tooltip text">
          <div>
            <span>Icon</span>
            <span>Label</span>
          </div>
        </TooltipGlass>
      );

      const icon = screen.getByText('Icon');
      await user.hover(icon);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('renders with multiple children', async () => {
      const user = userEvent.setup();
      render(
        <TooltipGlass content="Tooltip text">
          <button>
            <span>Click</span>
            <span>Me</span>
          </button>
        </TooltipGlass>
      );

      await user.hover(screen.getByText('Click'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });
  });

  describe('Multiple Tooltips', () => {
    it('renders multiple independent tooltips', async () => {
      const user = userEvent.setup();
      render(
        <>
          <TooltipGlass content="Tooltip 1">
            <button>Button 1</button>
          </TooltipGlass>
          <TooltipGlass content="Tooltip 2">
            <button>Button 2</button>
          </TooltipGlass>
        </>
      );

      await user.hover(screen.getByText('Button 1'));

      await waitFor(() => {
        expect(screen.getByText('Tooltip 1')).toBeInTheDocument();
        expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument();
      });
    });

    it('switches between tooltips on hover', async () => {
      const user = userEvent.setup();
      render(
        <>
          <TooltipGlass content="Tooltip 1">
            <button>Button 1</button>
          </TooltipGlass>
          <TooltipGlass content="Tooltip 2">
            <button>Button 2</button>
          </TooltipGlass>
        </>
      );

      await user.hover(screen.getByText('Button 1'));
      await waitFor(() => expect(screen.getByText('Tooltip 1')).toBeInTheDocument());

      await user.unhover(screen.getByText('Button 1'));
      await user.hover(screen.getByText('Button 2'));

      await waitFor(() => {
        expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument();
        expect(screen.getByText('Tooltip 2')).toBeInTheDocument();
      });
    });
  });
});
