/* eslint-disable react-refresh/only-export-components */
/**
 * RadioGroupGlass Component
 *
 * Glass-themed radio group with:
 * - Theme-aware styling (glass/light/aurora)
 * - Glass indicator with glow effects
 * - Smooth selection animations
 * - 100% shadcn/ui RadioGroup API compatible
 *
 * @accessibility
 * - Uses native radio group semantics via Radix
 * - Arrow keys navigate between options
 * - Space/Enter selects focused option
 * - `aria-checked` indicates selection state
 * - Focus ring visible on keyboard navigation
 *
 * @example
 * ```tsx
 * // Basic radio group
 * <RadioGroupGlass.Root defaultValue="option1">
 *   <RadioGroupGlass.Item value="option1" id="r1" />
 *   <label htmlFor="r1">Option 1</label>
 *   <RadioGroupGlass.Item value="option2" id="r2" />
 *   <label htmlFor="r2">Option 2</label>
 * </RadioGroupGlass.Root>
 *
 * // Controlled
 * <RadioGroupGlass.Root value={value} onValueChange={setValue}>
 *   ...
 * </RadioGroupGlass.Root>
 * ```
 */

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// ROOT COMPONENT
// ========================================

export type RadioGroupGlassRootProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;

const RadioGroupGlassRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupGlassRootProps
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn('grid gap-2', className)} {...props} />
));

RadioGroupGlassRoot.displayName = 'RadioGroupGlassRoot';

// ========================================
// ITEM COMPONENT
// ========================================

export type RadioGroupGlassItemProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
>;

const RadioGroupGlassItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupGlassItemProps
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      // Base styling
      'aspect-square h-4 w-4 rounded-full',
      // Glass border and background
      'border border-[var(--radio-border,var(--glass-border))]',
      'bg-[var(--radio-bg,transparent)]',
      // Text/indicator color
      'text-[var(--radio-indicator,var(--semantic-primary))]',
      // Focus styling
      'ring-offset-background',
      'focus:outline-none focus-visible:ring-2',
      'focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2',
      // Disabled state
      'disabled:cursor-not-allowed disabled:opacity-50',
      // Checked state
      'data-[state=checked]:border-[var(--radio-border-checked,var(--semantic-primary))]',
      'data-[state=checked]:bg-[var(--radio-bg-checked,var(--semantic-primary-subtle))]',
      // Transition
      'transition-all duration-200',
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle
        className={cn(
          'h-2.5 w-2.5 fill-current text-current',
          // Glow effect for checked state
          'drop-shadow-[0_0_4px_var(--semantic-primary)]'
        )}
      />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));

RadioGroupGlassItem.displayName = 'RadioGroupGlassItem';

// ========================================
// COMPOUND EXPORT
// ========================================

/**
 * RadioGroupGlass - A glass-themed radio button group
 *
 * @example
 * ```tsx
 * // Settings form with radio options
 * <form>
 *   <fieldset>
 *     <legend className="text-sm font-medium mb-3">Theme Preference</legend>
 *     <RadioGroupGlass.Root defaultValue="system" className="space-y-3">
 *       <div className="flex items-center space-x-2">
 *         <RadioGroupGlass.Item value="light" id="theme-light" />
 *         <label htmlFor="theme-light" className="text-sm">Light</label>
 *       </div>
 *       <div className="flex items-center space-x-2">
 *         <RadioGroupGlass.Item value="dark" id="theme-dark" />
 *         <label htmlFor="theme-dark" className="text-sm">Dark</label>
 *       </div>
 *       <div className="flex items-center space-x-2">
 *         <RadioGroupGlass.Item value="system" id="theme-system" />
 *         <label htmlFor="theme-system" className="text-sm">System</label>
 *       </div>
 *     </RadioGroupGlass.Root>
 *   </fieldset>
 * </form>
 *
 * // Card-style radio group
 * <RadioGroupGlass.Root className="grid grid-cols-3 gap-4">
 *   {plans.map((plan) => (
 *     <label
 *       key={plan.id}
 *       htmlFor={plan.id}
 *       className="cursor-pointer"
 *     >
 *       <GlassCard className="p-4 has-[:checked]:border-primary">
 *         <RadioGroupGlass.Item value={plan.id} id={plan.id} className="sr-only" />
 *         <h3 className="font-medium">{plan.name}</h3>
 *         <p className="text-sm text-muted-foreground">{plan.price}</p>
 *       </GlassCard>
 *     </label>
 *   ))}
 * </RadioGroupGlass.Root>
 * ```
 */
export const RadioGroupGlass = {
  Root: RadioGroupGlassRoot,
  Item: RadioGroupGlassItem,
};

// Named exports for direct imports
export { RadioGroupGlassRoot, RadioGroupGlassItem };
