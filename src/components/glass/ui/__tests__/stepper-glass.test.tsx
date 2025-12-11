import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StepperGlass } from '../stepper-glass';

// ========================================
// TEST HELPERS
// ========================================

const renderStepper = ({
  value = 'step1',
  onValueChange = vi.fn(),
  orientation = 'horizontal' as const,
  variant = 'numbered' as const,
  size = 'md' as const,
  linear = false,
} = {}) => {
  return render(
    <StepperGlass.Root
      value={value}
      onValueChange={onValueChange}
      orientation={orientation}
      variant={variant}
      size={size}
      linear={linear}
    >
      <StepperGlass.List>
        <StepperGlass.Step value="step1" label="Step 1" description="First step" />
        <StepperGlass.Step value="step2" label="Step 2" description="Second step" />
        <StepperGlass.Step value="step3" label="Step 3" description="Third step" />
      </StepperGlass.List>
      <StepperGlass.Content value="step1">Content 1</StepperGlass.Content>
      <StepperGlass.Content value="step2">Content 2</StepperGlass.Content>
      <StepperGlass.Content value="step3">Content 3</StepperGlass.Content>
    </StepperGlass.Root>
  );
};

// ========================================
// TESTS
// ========================================

describe('StepperGlass', () => {
  describe('Rendering', () => {
    it('renders all steps', () => {
      renderStepper();
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('renders step descriptions', () => {
      renderStepper();
      expect(screen.getByText('First step')).toBeInTheDocument();
      expect(screen.getByText('Second step')).toBeInTheDocument();
      expect(screen.getByText('Third step')).toBeInTheDocument();
    });

    it('renders tablist container', () => {
      renderStepper();
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders step buttons with role="tab"', () => {
      renderStepper();
      expect(screen.getAllByRole('tab')).toHaveLength(3);
    });

    it('renders active content panel', () => {
      renderStepper({ value: 'step1' });
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('renders step numbers in numbered variant', () => {
      renderStepper({ variant: 'numbered' });
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('Active State', () => {
    it('marks first step as active', () => {
      renderStepper({ value: 'step1' });
      const step1 = screen.getAllByRole('tab')[0];
      expect(step1).toHaveAttribute('aria-selected', 'true');
      expect(step1).toHaveAttribute('aria-current', 'step');
    });

    it('marks second step as active when value changes', () => {
      renderStepper({ value: 'step2' });
      const step2 = screen.getAllByRole('tab')[1];
      expect(step2).toHaveAttribute('aria-selected', 'true');
      expect(step2).toHaveAttribute('aria-current', 'step');
    });

    it('shows completed state for previous steps', () => {
      renderStepper({ value: 'step2' });
      const step1 = screen.getAllByRole('tab')[0];
      expect(step1).toHaveAttribute('data-status', 'completed');
    });

    it('shows pending state for future steps', () => {
      renderStepper({ value: 'step1' });
      const step3 = screen.getAllByRole('tab')[2];
      expect(step3).toHaveAttribute('data-status', 'pending');
    });
  });

  describe('Linear Mode', () => {
    it('disables future steps in linear mode', () => {
      renderStepper({ value: 'step1', linear: true });
      const step2 = screen.getAllByRole('tab')[1];
      const step3 = screen.getAllByRole('tab')[2];
      expect(step2).toHaveAttribute('aria-disabled', 'true');
      expect(step3).toHaveAttribute('aria-disabled', 'true');
    });

    it('allows previous steps in linear mode', () => {
      renderStepper({ value: 'step2', linear: true });
      const step1 = screen.getAllByRole('tab')[0];
      expect(step1).not.toHaveAttribute('aria-disabled', 'true');
    });

    it('allows current step in linear mode', () => {
      renderStepper({ value: 'step2', linear: true });
      const step2 = screen.getAllByRole('tab')[1];
      expect(step2).not.toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('User Interactions', () => {
    it('calls onValueChange when step is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderStepper({ onValueChange: handleChange });

      const step2 = screen.getAllByRole('tab')[1];
      await user.click(step2);

      expect(handleChange).toHaveBeenCalledWith('step2');
    });

    it('does not call onValueChange for disabled steps', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderStepper({ value: 'step1', onValueChange: handleChange, linear: true });

      const step3 = screen.getAllByRole('tab')[2];
      await user.click(step3);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    it('moves to next step with ArrowRight (horizontal)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderStepper({ value: 'step1', onValueChange: handleChange });

      const step1 = screen.getAllByRole('tab')[0];
      step1.focus();
      await user.keyboard('{ArrowRight}');

      expect(handleChange).toHaveBeenCalledWith('step2');
    });

    it('moves to previous step with ArrowLeft', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderStepper({ value: 'step2', onValueChange: handleChange });

      const step2 = screen.getAllByRole('tab')[1];
      step2.focus();
      await user.keyboard('{ArrowLeft}');

      expect(handleChange).toHaveBeenCalledWith('step1');
    });

    it('moves to first step with Home', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderStepper({ value: 'step3', onValueChange: handleChange });

      const step3 = screen.getAllByRole('tab')[2];
      step3.focus();
      await user.keyboard('{Home}');

      expect(handleChange).toHaveBeenCalledWith('step1');
    });

    it('moves to last step with End', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderStepper({ value: 'step1', onValueChange: handleChange });

      const step1 = screen.getAllByRole('tab')[0];
      step1.focus();
      await user.keyboard('{End}');

      expect(handleChange).toHaveBeenCalledWith('step3');
    });

    it('wraps around at the end', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderStepper({ value: 'step3', onValueChange: handleChange });

      const step3 = screen.getAllByRole('tab')[2];
      step3.focus();
      await user.keyboard('{ArrowRight}');

      expect(handleChange).toHaveBeenCalledWith('step1');
    });
  });

  describe('Vertical Orientation', () => {
    it('renders with vertical orientation', () => {
      renderStepper({ orientation: 'vertical' });
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('uses ArrowDown for vertical navigation', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderStepper({ orientation: 'vertical', onValueChange: handleChange });

      const step1 = screen.getAllByRole('tab')[0];
      step1.focus();
      await user.keyboard('{ArrowDown}');

      expect(handleChange).toHaveBeenCalledWith('step2');
    });

    it('uses ArrowUp for vertical navigation', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      renderStepper({ orientation: 'vertical', value: 'step2', onValueChange: handleChange });

      const step2 = screen.getAllByRole('tab')[1];
      step2.focus();
      await user.keyboard('{ArrowUp}');

      expect(handleChange).toHaveBeenCalledWith('step1');
    });
  });

  describe('Variants', () => {
    it('renders numbered variant with numbers', () => {
      renderStepper({ variant: 'numbered' });
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('renders dots variant without numbers', () => {
      render(
        <StepperGlass.Root value="step1" variant="dots">
          <StepperGlass.List>
            <StepperGlass.Step value="step1" label="" />
            <StepperGlass.Step value="step2" label="" />
            <StepperGlass.Step value="step3" label="" />
          </StepperGlass.List>
        </StepperGlass.Root>
      );
      expect(screen.queryByText('1')).not.toBeInTheDocument();
      expect(screen.queryByText('2')).not.toBeInTheDocument();
    });
  });

  describe('Context Error Handling', () => {
    it('throws error when Step used outside Root', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<StepperGlass.Step value="test" label="Test" />);
      }).toThrow('Stepper compound components must be used within StepperGlass.Root');

      consoleSpy.mockRestore();
    });

    it('throws error when List used outside Root', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(
          <StepperGlass.List>
            <div>Test</div>
          </StepperGlass.List>
        );
      }).toThrow('Stepper compound components must be used within StepperGlass.Root');

      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('has accessible label on container', () => {
      renderStepper();
      const container = screen.getByRole('tablist').closest('[aria-label]');
      expect(container).toHaveAttribute('aria-label', 'Progress steps');
    });

    it('has correct aria-orientation', () => {
      renderStepper({ orientation: 'horizontal' });
      expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('marks active step with aria-current="step"', () => {
      renderStepper({ value: 'step2' });
      const activeStep = screen.getAllByRole('tab')[1];
      expect(activeStep).toHaveAttribute('aria-current', 'step');
    });

    it('marks inactive steps without aria-current', () => {
      renderStepper({ value: 'step2' });
      const inactiveStep = screen.getAllByRole('tab')[0];
      expect(inactiveStep).not.toHaveAttribute('aria-current');
    });

    it('has minimum touch target size class', () => {
      renderStepper();
      const steps = screen.getAllByRole('tab');
      steps.forEach((step) => {
        expect(step.className).toContain('min-w-[44px]');
        expect(step.className).toContain('min-h-[44px]');
      });
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      renderStepper({ size: 'sm' });
      const step = screen.getAllByRole('tab')[0];
      expect(step.className).toContain('w-8');
      expect(step.className).toContain('h-8');
    });

    it('renders medium size (default)', () => {
      renderStepper({ size: 'md' });
      const step = screen.getAllByRole('tab')[0];
      expect(step.className).toContain('w-10');
      expect(step.className).toContain('h-10');
    });

    it('renders large size', () => {
      renderStepper({ size: 'lg' });
      const step = screen.getAllByRole('tab')[0];
      expect(step.className).toContain('w-12');
      expect(step.className).toContain('h-12');
    });
  });

  describe('Content Rendering', () => {
    it('shows content for active step only', () => {
      renderStepper({ value: 'step2' });
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('renders content with tabpanel role', () => {
      renderStepper({ value: 'step1' });
      const content = screen.getByRole('tabpanel');
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent('Content 1');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to step button', () => {
      const ref = vi.fn();
      render(
        <StepperGlass.Root value="step1">
          <StepperGlass.List>
            <StepperGlass.Step ref={ref} value="step1" label="Step 1" />
          </StepperGlass.List>
        </StepperGlass.Root>
      );
      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
    });

    it('forwards ref to list element', () => {
      const ref = vi.fn();
      render(
        <StepperGlass.Root value="step1">
          <StepperGlass.List ref={ref}>
            <StepperGlass.Step value="step1" label="Step 1" />
          </StepperGlass.List>
        </StepperGlass.Root>
      );
      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
    });
  });
});
