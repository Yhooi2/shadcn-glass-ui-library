/* eslint-disable react-refresh/only-export-components */
/**
 * StepperGlass Component (Compound API)
 *
 * Glass-themed step indicator for multi-step workflows with theme-aware styling
 * and full accessibility support.
 *
 * ## Features
 * - Theme-aware glassmorphism styling (glass/light/aurora)
 * - Horizontal and vertical orientations
 * - Three visual variants: numbered, icon, dots
 * - Three sizes: small, medium, large
 * - Linear mode to lock future steps
 * - Animated connector lines between steps
 * - Compound component API for maximum flexibility
 * - Keyboard navigation with arrow keys
 * - 44x44px minimum touch targets (WCAG 2.5.5)
 * - Custom icons and completed icon overrides
 *
 * ## Sub-Components
 * - **StepperGlass.Root** - Context provider with value/onValueChange
 * - **StepperGlass.List** - Visual container for step triggers (uses `role="tablist"`)
 * - **StepperGlass.Step** - Individual step button with indicator and label
 * - **StepperGlass.Content** - Content panel for each step (uses `role="tabpanel"`)
 *
 * ## CSS Variables
 * Customize appearance via theme CSS variables:
 * - `--stepper-step-bg` - Pending step background
 * - `--stepper-step-active-bg` - Active step background
 * - `--stepper-step-completed-bg` - Completed step background (purple gradient)
 * - `--stepper-step-disabled-bg` - Disabled step background
 * - `--stepper-step-border` - Step indicator border
 * - `--stepper-step-active-border` - Active step border with subtle glow
 * - `--stepper-step-completed-border` - Completed step border
 * - `--stepper-step-disabled-border` - Disabled step border (muted)
 * - `--stepper-step-text` - Step number/icon text color
 * - `--stepper-step-active-text` - Active step text (purple)
 * - `--stepper-step-completed-text` - Completed step text (white)
 * - `--stepper-step-disabled-text` - Disabled step text (muted)
 * - `--stepper-connector-bg` - Connector line background (default)
 * - `--stepper-connector-active-bg` - Connector line background (completed, purple)
 * - `--stepper-step-glow` - Completed step glow effect
 * - `--stepper-step-active-glow` - Active step glow effect
 * - `--stepper-label-text` - Label text color
 * - `--stepper-description-text` - Description text color (subtle)
 *
 * @example Basic usage (numbered variant)
 * ```tsx
 * import { StepperGlass } from 'shadcn-glass-ui'
 *
 * function Wizard() {
 *   const [step, setStep] = useState('step1')
 *
 *   return (
 *     <StepperGlass.Root value={step} onValueChange={setStep}>
 *       <StepperGlass.List>
 *         <StepperGlass.Step value="step1" label="Account" description="Create your account" />
 *         <StepperGlass.Step value="step2" label="Profile" description="Setup your profile" />
 *         <StepperGlass.Step value="step3" label="Complete" description="Finish setup" />
 *       </StepperGlass.List>
 *       <StepperGlass.Content value="step1">Step 1 content</StepperGlass.Content>
 *       <StepperGlass.Content value="step2">Step 2 content</StepperGlass.Content>
 *       <StepperGlass.Content value="step3">Step 3 content</StepperGlass.Content>
 *     </StepperGlass.Root>
 *   )
 * }
 * ```
 *
 * @example Icon variant with custom icons
 * ```tsx
 * <StepperGlass.Root value={step} variant="icon">
 *   <StepperGlass.List>
 *     <StepperGlass.Step value="step1" label="Account" icon={<User className="w-4 h-4" />} />
 *     <StepperGlass.Step value="step2" label="Payment" icon={<CreditCard className="w-4 h-4" />} />
 *     <StepperGlass.Step value="step3" label="Done" icon={<CheckCircle className="w-4 h-4" />} />
 *   </StepperGlass.List>
 * </StepperGlass.Root>
 * ```
 *
 * @example Linear mode (lock future steps)
 * ```tsx
 * <StepperGlass.Root value={step} onValueChange={setStep} linear>
 *   <StepperGlass.List>
 *     <StepperGlass.Step value="step1" label="Email" />
 *     <StepperGlass.Step value="step2" label="Password" />
 *     <StepperGlass.Step value="step3" label="Done" />
 *   </StepperGlass.List>
 * </StepperGlass.Root>
 * ```
 *
 * @example Vertical orientation
 * ```tsx
 * <StepperGlass.Root value={step} orientation="vertical">
 *   <StepperGlass.List>
 *     <StepperGlass.Step value="step1" label="Order Confirmed" />
 *     <StepperGlass.Step value="step2" label="Processing" />
 *     <StepperGlass.Step value="step3" label="Shipped" />
 *   </StepperGlass.List>
 * </StepperGlass.Root>
 * ```
 *
 * @accessibility
 * - **Keyboard Navigation:** Arrow keys navigate between steps (WCAG 2.1.1)
 * - **Focus Management:** Visible focus ring using `--focus-glow` (WCAG 2.4.7)
 * - **Screen Readers:** Uses `role="tablist"`, `role="tab"` (WCAG 4.1.3)
 * - **ARIA Attributes:** `aria-current="step"`, `aria-disabled` for state
 * - **Touch Targets:** 44x44px minimum touch targets (WCAG 2.5.5)
 * - **Color Contrast:** All states meet WCAG AA 4.5:1 ratio
 * - **Motion:** Connector line animations respect `prefers-reduced-motion`
 *
 * @since v1.0.0
 */

import {
  forwardRef,
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useLayoutEffect,
  type CSSProperties,
  type FC,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import { useFocus } from '@/lib/hooks/use-focus';
import { Check } from 'lucide-react';
import {
  stepperRootVariants,
  stepperListVariants,
  stepperStepContainerVariants,
  stepperIndicatorVariants,
  stepperConnectorVariants,
  stepperLabelVariants,
  stepperDescriptionVariants,
  stepperContentVariants,
  type StepperOrientation,
  type StepperVariant,
  type StepperSize,
  type StepStatus,
} from '@/lib/variants/stepper-glass-variants';
import '@/glass-theme.css';

// ========================================
// CONTEXT
// ========================================

interface StepperContextValue {
  value: string;
  onValueChange?: (value: string) => void;
  orientation: StepperOrientation;
  variant: StepperVariant;
  size: StepperSize;
  linear: boolean;
  steps: string[];
  registerStep: (value: string, index: number) => void;
  unregisterStep: (value: string) => void;
}

const StepperContext = createContext<StepperContextValue | null>(null);

const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('Stepper compound components must be used within StepperGlass.Root');
  }
  return context;
};

// ========================================
// UTILITY: GET STEP STATUS
// ========================================

function getStepStatus(
  stepValue: string,
  currentValue: string,
  steps: string[],
  linear: boolean,
  disabled?: boolean
): StepStatus {
  if (disabled) return 'disabled';

  const stepIndex = steps.indexOf(stepValue);
  const currentIndex = steps.indexOf(currentValue);

  if (stepIndex === -1 || currentIndex === -1) return 'pending';
  if (stepIndex === currentIndex) return 'active';
  if (stepIndex < currentIndex) return 'completed';
  if (linear && stepIndex > currentIndex) return 'disabled';
  return 'pending';
}

// ========================================
// ROOT COMPONENT
// ========================================

/**
 * Props for StepperGlass.Root component.
 *
 * @example
 * ```tsx
 * const props: StepperRootProps = {
 *   value: 'step2',
 *   onValueChange: (value) => setStep(value),
 *   orientation: 'horizontal',
 *   variant: 'numbered',
 *   size: 'md',
 *   linear: false,
 * };
 * ```
 */
interface StepperRootProps {
  /** Current active step value */
  value: string;
  /** Callback when step value changes */
  onValueChange?: (value: string) => void;
  /**
   * Orientation of the stepper.
   *
   * @default "horizontal"
   */
  orientation?: StepperOrientation;
  /**
   * Visual variant.
   *
   * @default "numbered"
   */
  variant?: StepperVariant;
  /**
   * Size of step indicators.
   *
   * @default "md"
   */
  size?: StepperSize;
  /**
   * Lock future steps (require sequential completion).
   *
   * @default false
   */
  linear?: boolean;
  /** Child components */
  children: ReactNode;
  /** Optional className */
  className?: string;
}

const StepperRoot: FC<StepperRootProps> = ({
  value,
  onValueChange,
  orientation = 'horizontal',
  variant = 'numbered',
  size = 'md',
  linear = false,
  children,
  className,
}) => {
  const [steps, setSteps] = useState<string[]>([]);

  const registerStep = useCallback((stepValue: string, index: number) => {
    setSteps((prev) => {
      if (prev.includes(stepValue)) return prev;
      const newSteps = [...prev];
      // Insert at correct position to maintain order
      newSteps.splice(index, 0, stepValue);
      return newSteps;
    });
  }, []);

  const unregisterStep = useCallback((stepValue: string) => {
    setSteps((prev) => prev.filter((s) => s !== stepValue));
  }, []);

  const contextValue = useMemo(
    () => ({
      value,
      onValueChange,
      orientation,
      variant,
      size,
      linear,
      steps,
      registerStep,
      unregisterStep,
    }),
    [value, onValueChange, orientation, variant, size, linear, steps, registerStep, unregisterStep]
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        data-slot="stepper"
        className={cn(stepperRootVariants({ orientation }), className)}
        aria-label="Progress steps"
      >
        {children}
      </div>
    </StepperContext.Provider>
  );
};

// ========================================
// LIST COMPONENT
// ========================================

interface StepperListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const StepperList = forwardRef<HTMLDivElement, StepperListProps>(
  ({ children, className, ...props }, ref) => {
    const { orientation } = useStepperContext();

    return (
      <div
        ref={ref}
        data-slot="stepper-list"
        role="tablist"
        aria-orientation={orientation}
        className={cn(stepperListVariants({ orientation }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StepperList.displayName = 'StepperList';

// ========================================
// STEP COMPONENT
// ========================================

interface StepperStepProps {
  /** Unique value for this step */
  value: string;
  /** Step label (required for accessibility) */
  label: string;
  /** Optional description */
  description?: string;
  /** Custom icon (for icon variant) */
  icon?: ReactNode;
  /** Completed icon override */
  completedIcon?: ReactNode;
  /** Force disabled state */
  disabled?: boolean;
  /** Optional className */
  className?: string;
  /** Step index for ordering (auto-detected) */
  index?: number;
}

const StepperStep = forwardRef<HTMLButtonElement, StepperStepProps>(
  (
    {
      value: stepValue,
      label,
      description,
      icon,
      completedIcon,
      disabled: forcedDisabled,
      className,
      index: providedIndex,
    },
    ref
  ) => {
    const {
      value: currentValue,
      onValueChange,
      orientation,
      variant,
      size,
      linear,
      steps,
      registerStep,
      unregisterStep,
    } = useStepperContext();

    const { isFocusVisible, focusProps } = useFocus({ focusVisible: true });

    // Track mount order for step registration
    const [mountIndex] = useState(() => providedIndex ?? Date.now());

    // Register step on mount
    // Use useLayoutEffect to register before paint
    useLayoutEffect(() => {
      registerStep(stepValue, mountIndex);
      return () => unregisterStep(stepValue);
    }, [stepValue, mountIndex, registerStep, unregisterStep]);

    const status = getStepStatus(stepValue, currentValue, steps, linear, forcedDisabled);
    const stepIndex = steps.indexOf(stepValue);
    const isLast = stepIndex === steps.length - 1;
    const isClickable = status !== 'disabled';

    // Styles based on status
    const indicatorStyles: CSSProperties = {
      background:
        status === 'completed'
          ? 'var(--stepper-step-completed-bg)'
          : status === 'active'
            ? 'var(--stepper-step-active-bg)'
            : status === 'disabled'
              ? 'var(--stepper-step-disabled-bg)'
              : 'var(--stepper-step-bg)',
      border: `2px solid ${
        status === 'completed'
          ? 'var(--stepper-step-completed-border)'
          : status === 'active'
            ? 'var(--stepper-step-active-border)'
            : status === 'disabled'
              ? 'var(--stepper-step-disabled-border)'
              : 'var(--stepper-step-border)'
      }`,
      color:
        status === 'completed'
          ? 'var(--stepper-step-completed-text)'
          : status === 'active'
            ? 'var(--stepper-step-active-text)'
            : status === 'disabled'
              ? 'var(--stepper-step-disabled-text)'
              : 'var(--stepper-step-text)',
      boxShadow:
        status === 'active'
          ? 'var(--stepper-step-active-glow)'
          : status === 'completed'
            ? 'var(--stepper-step-glow)'
            : isFocusVisible
              ? 'var(--focus-glow)'
              : 'none',
      backdropFilter: 'blur(var(--blur-sm))',
    };

    const connectorStyles: CSSProperties = {
      background:
        stepIndex < steps.indexOf(currentValue)
          ? 'var(--stepper-connector-active-bg)'
          : 'var(--stepper-connector-bg)',
    };

    const labelStyles: CSSProperties = {
      color:
        status === 'active' || status === 'completed'
          ? 'var(--stepper-label-text)'
          : 'var(--stepper-description-text)',
    };

    const descriptionStyles: CSSProperties = {
      color: 'var(--stepper-description-text)',
    };

    // Render indicator content
    const renderIndicatorContent = () => {
      if (status === 'completed') {
        if (completedIcon) return completedIcon;
        return <Check className="w-4 h-4" />;
      }
      if (variant === 'icon' && icon) return icon;
      if (variant === 'dots') return null;
      // Numbered variant
      return stepIndex >= 0 ? stepIndex + 1 : '';
    };

    const handleClick = () => {
      if (isClickable && onValueChange) {
        onValueChange(stepValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isClickable) return;

      const stepList = e.currentTarget.closest('[role="tablist"]');
      if (!stepList) return;

      const allSteps = Array.from(
        stepList.querySelectorAll('[role="tab"]:not([aria-disabled="true"])')
      ) as HTMLButtonElement[];
      const currentIdx = allSteps.indexOf(e.currentTarget as HTMLButtonElement);

      let nextIdx = currentIdx;
      const isHorizontal = orientation === 'horizontal';

      switch (e.key) {
        case isHorizontal ? 'ArrowRight' : 'ArrowDown':
          e.preventDefault();
          nextIdx = (currentIdx + 1) % allSteps.length;
          break;
        case isHorizontal ? 'ArrowLeft' : 'ArrowUp':
          e.preventDefault();
          nextIdx = currentIdx - 1 < 0 ? allSteps.length - 1 : currentIdx - 1;
          break;
        case 'Home':
          e.preventDefault();
          nextIdx = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIdx = allSteps.length - 1;
          break;
        default:
          return;
      }

      const nextStep = allSteps[nextIdx];
      if (nextStep) {
        nextStep.focus();
        const nextValue = nextStep.getAttribute('data-value');
        if (nextValue && onValueChange) {
          onValueChange(nextValue);
        }
      }
    };

    // For horizontal, we need step + connector inline
    // For vertical, step is a row with connector below
    if (orientation === 'horizontal') {
      return (
        <>
          <div
            data-slot="stepper-item"
            className={cn(stepperStepContainerVariants({ orientation }), className)}
          >
            <button
              ref={ref}
              type="button"
              role="tab"
              aria-selected={status === 'active'}
              aria-disabled={!isClickable}
              aria-current={status === 'active' ? 'step' : undefined}
              data-value={stepValue}
              data-status={status}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              onFocus={focusProps.onFocus}
              onBlur={focusProps.onBlur}
              disabled={!isClickable}
              className={cn(
                stepperIndicatorVariants({ size, variant }),
                !isClickable && 'cursor-not-allowed opacity-60',
                isClickable && 'cursor-pointer hover:scale-105',
                // Ensure minimum touch target
                'min-w-[44px] min-h-[44px]'
              )}
              style={indicatorStyles}
            >
              {renderIndicatorContent()}
            </button>

            {label && (
              <div className="flex flex-col items-center">
                <span
                  className={cn(stepperLabelVariants({ size, orientation }))}
                  style={labelStyles}
                >
                  {label}
                </span>
                {description && (
                  <span
                    className={cn(stepperDescriptionVariants({ size, orientation }))}
                    style={descriptionStyles}
                  >
                    {description}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Connector line between steps */}
          {!isLast && (
            <div
              data-slot="stepper-separator"
              className={cn(stepperConnectorVariants({ orientation }))}
              style={connectorStyles}
              aria-hidden="true"
            />
          )}
        </>
      );
    }

    // Vertical orientation
    return (
      <div className="flex flex-col">
        <div
          data-slot="stepper-item"
          className={cn(stepperStepContainerVariants({ orientation }), className)}
        >
          <button
            ref={ref}
            type="button"
            role="tab"
            aria-selected={status === 'active'}
            aria-disabled={!isClickable}
            aria-current={status === 'active' ? 'step' : undefined}
            data-value={stepValue}
            data-status={status}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onFocus={focusProps.onFocus}
            onBlur={focusProps.onBlur}
            disabled={!isClickable}
            className={cn(
              stepperIndicatorVariants({ size, variant }),
              !isClickable && 'cursor-not-allowed opacity-60',
              isClickable && 'cursor-pointer hover:scale-105',
              'min-w-[44px] min-h-[44px]'
            )}
            style={indicatorStyles}
          >
            {renderIndicatorContent()}
          </button>

          {label && (
            <div className="flex flex-col justify-center">
              <span className={cn(stepperLabelVariants({ size, orientation }))} style={labelStyles}>
                {label}
              </span>
              {description && (
                <span
                  className={cn(stepperDescriptionVariants({ size, orientation }))}
                  style={descriptionStyles}
                >
                  {description}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Vertical connector */}
        {!isLast && (
          <div
            data-slot="stepper-separator"
            className={cn(stepperConnectorVariants({ orientation }))}
            style={connectorStyles}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

StepperStep.displayName = 'StepperStep';

// ========================================
// CONTENT COMPONENT
// ========================================

interface StepperContentProps {
  /** Value of the step this content belongs to */
  value: string;
  /** Content to display when step is active */
  children: ReactNode;
  /** Optional className */
  className?: string;
}

const StepperContent: FC<StepperContentProps> = ({ value, children, className }) => {
  const { value: currentValue, orientation } = useStepperContext();
  const isActive = currentValue === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      data-slot="stepper-content"
      aria-hidden={!isActive}
      className={cn(stepperContentVariants({ orientation }), className)}
    >
      {children}
    </div>
  );
};

// ========================================
// EXPORT COMPOUND COMPONENT
// ========================================

export const StepperGlass = {
  Root: StepperRoot,
  List: StepperList,
  Step: StepperStep,
  Content: StepperContent,
};

// Also export individual components for flexibility
export { StepperRoot, StepperList, StepperStep, StepperContent };

// Re-export types
export type {
  StepperRootProps,
  StepperListProps,
  StepperStepProps,
  StepperContentProps,
  StepperOrientation,
  StepperVariant,
  StepperSize,
  StepStatus,
};
