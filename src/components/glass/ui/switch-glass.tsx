/**
 * SwitchGlass Component
 *
 * Glass-themed switch component with shadcn/ui compatible API.
 * Built on @radix-ui/react-switch for accessibility and keyboard navigation.
 *
 * **shadcn/ui compatible props:**
 * - `checked` / `defaultChecked` - Control checked state
 * - `onCheckedChange` - Callback when state changes
 * - `disabled` - Disable the switch
 *
 * @example
 * ```tsx
 * // Controlled
 * <SwitchGlass checked={isOn} onCheckedChange={setIsOn} />
 *
 * // Uncontrolled
 * <SwitchGlass defaultChecked />
 *
 * // With label
 * <SwitchGlass label="Airplane Mode" checked={isOn} onCheckedChange={setIsOn} />
 * ```
 *
 * @see https://www.radix-ui.com/primitives/docs/components/switch
 */

'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

export interface SwitchGlassProps extends React.ComponentPropsWithoutRef<
  typeof SwitchPrimitive.Root
> {
  /**
   * Optional label text displayed next to the switch
   */
  readonly label?: string;
}

// ========================================
// COMPONENT
// ========================================

export const SwitchGlass = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchGlassProps
>(({ className, label, disabled, checked, defaultChecked, ...props }, ref) => {
  // Track internal state for styling (Radix handles actual state)
  const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false);
  const effectiveChecked = checked ?? isChecked;

  const handleCheckedChange = (newChecked: boolean) => {
    if (checked === undefined) {
      setIsChecked(newChecked);
    }
    props.onCheckedChange?.(newChecked);
  };

  const switchElement = (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      disabled={disabled}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={handleCheckedChange}
      className={cn(
        // Layout
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center',
        'rounded-full border-2 border-transparent',
        // Transitions
        'transition-all duration-300',
        // Focus state
        'focus-visible:outline-none',
        // Disabled state
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      style={{
        background: effectiveChecked ? 'var(--toggle-active-bg)' : 'var(--toggle-bg)',
        boxShadow: effectiveChecked ? 'var(--toggle-glow)' : 'none',
      }}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full shadow-lg',
          'ring-0 transition-transform duration-300',
          // Movement based on state (Radix adds data-state automatically)
          'data-[state=checked]:translate-x-5',
          'data-[state=unchecked]:translate-x-0'
        )}
        style={{
          background: 'var(--toggle-knob)',
        }}
      />
    </SwitchPrimitive.Root>
  );

  // Wrap in label if label prop provided
  if (label) {
    return (
      <label
        className={cn(
          'inline-flex items-center gap-2.5',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        )}
      >
        {/* Touch target wrapper for 44px minimum */}
        <span className="inline-flex items-center justify-center min-h-11">{switchElement}</span>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </span>
      </label>
    );
  }

  return switchElement;
});

SwitchGlass.displayName = 'SwitchGlass';

// ========================================
// SHADCN/UI COMPATIBLE ALIAS
// ========================================

/**
 * Switch - shadcn/ui compatible alias for SwitchGlass
 *
 * @example
 * ```tsx
 * import { Switch } from 'shadcn-glass-ui'
 *
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 * ```
 * @since v2.5.0
 */
export const Switch = SwitchGlass;
