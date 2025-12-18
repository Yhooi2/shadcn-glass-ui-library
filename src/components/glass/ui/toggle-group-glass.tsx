/* eslint-disable react-refresh/only-export-components */
/**
 * ToggleGroupGlass Component
 *
 * Glass-themed toggle group with:
 * - Theme-aware styling (glass/light/aurora)
 * - Single or multiple selection modes
 * - Size variants (default, sm, lg)
 * - Variant styles (default, outline)
 * - 100% shadcn/ui ToggleGroup API compatible
 *
 * @accessibility
 * - Uses roving tabindex for keyboard navigation
 * - Arrow keys move between items
 * - Space/Enter toggles selection
 * - `aria-pressed` indicates selection state
 * - Focus ring visible on keyboard navigation
 *
 * @example
 * ```tsx
 * // Single selection (default)
 * <ToggleGroupGlass.Root type="single" defaultValue="center">
 *   <ToggleGroupGlass.Item value="left">
 *     <AlignLeft className="h-4 w-4" />
 *   </ToggleGroupGlass.Item>
 *   <ToggleGroupGlass.Item value="center">
 *     <AlignCenter className="h-4 w-4" />
 *   </ToggleGroupGlass.Item>
 *   <ToggleGroupGlass.Item value="right">
 *     <AlignRight className="h-4 w-4" />
 *   </ToggleGroupGlass.Item>
 * </ToggleGroupGlass.Root>
 *
 * // Multiple selection
 * <ToggleGroupGlass.Root type="multiple" value={selected} onValueChange={setSelected}>
 *   ...
 * </ToggleGroupGlass.Root>
 * ```
 */

import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// CONTEXT FOR GROUP-LEVEL PROPS
// ========================================

interface ToggleGroupContextValue {
  size: 'default' | 'sm' | 'lg';
  variant: 'default' | 'outline';
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: 'default',
  variant: 'default',
});

// ========================================
// VARIANTS
// ========================================

const toggleGroupItemVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center rounded-md text-sm font-medium',
    'transition-all duration-200',
    'focus:outline-none focus-visible:ring-2',
    'focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          // Glass background for default variant
          'bg-[var(--toggle-group-item-bg,transparent)]',
          'hover:bg-[var(--toggle-group-item-hover-bg,var(--glass-bg-subtle))]',
          'data-[state=on]:bg-[var(--toggle-group-item-active-bg,var(--semantic-primary-subtle))]',
          'data-[state=on]:text-[var(--toggle-group-item-active-text,var(--semantic-primary))]',
        ],
        outline: [
          // Outline variant
          'border border-[var(--toggle-group-item-border,var(--glass-border))]',
          'bg-transparent',
          'hover:bg-[var(--toggle-group-item-hover-bg,var(--glass-bg-subtle))]',
          'data-[state=on]:border-[var(--semantic-primary)]',
          'data-[state=on]:bg-[var(--toggle-group-item-active-bg,var(--semantic-primary-subtle))]',
          'data-[state=on]:text-[var(--toggle-group-item-active-text,var(--semantic-primary))]',
        ],
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-8 px-2',
        lg: 'h-11 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// ========================================
// ROOT COMPONENT
// ========================================

// Base props shared by both single and multiple modes
interface ToggleGroupGlassBaseProps extends VariantProps<typeof toggleGroupItemVariants> {
  className?: string;
  children?: React.ReactNode;
}

// Props for single selection mode
export interface ToggleGroupGlassSingleProps extends ToggleGroupGlassBaseProps {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

// Props for multiple selection mode
export interface ToggleGroupGlassMultipleProps extends ToggleGroupGlassBaseProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ToggleGroupGlassRootProps = ToggleGroupGlassSingleProps | ToggleGroupGlassMultipleProps;

function ToggleGroupGlassRootImpl(
  props: ToggleGroupGlassRootProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { className, variant = 'default', size = 'default', children, ...rest } = props;

  const containerClasses = cn(
    'inline-flex items-center justify-center gap-1',
    // Glass container background
    'rounded-lg p-1',
    'bg-[var(--toggle-group-bg,var(--glass-bg-subtle))]',
    'border border-[var(--toggle-group-border,var(--glass-border))]',
    className
  );

  const contextValue = { size: size ?? 'default', variant: variant ?? 'default' };

  if (props.type === 'multiple') {
    const multipleRest = rest as Omit<
      ToggleGroupGlassMultipleProps,
      'className' | 'children' | 'variant' | 'size'
    >;
    return (
      <ToggleGroupPrimitive.Root ref={ref} className={containerClasses} {...multipleRest}>
        <ToggleGroupContext.Provider value={contextValue}>{children}</ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    );
  }

  const singleRest = rest as Omit<
    ToggleGroupGlassSingleProps,
    'className' | 'children' | 'variant' | 'size'
  >;
  return (
    <ToggleGroupPrimitive.Root ref={ref} className={containerClasses} {...singleRest}>
      <ToggleGroupContext.Provider value={contextValue}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

const ToggleGroupGlassRoot = React.forwardRef(ToggleGroupGlassRootImpl);
ToggleGroupGlassRoot.displayName = 'ToggleGroupGlassRoot';

// ========================================
// ITEM COMPONENT
// ========================================

export interface ToggleGroupGlassItemProps
  extends
    React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof toggleGroupItemVariants> {}

const ToggleGroupGlassItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupGlassItemProps
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleGroupItemVariants({
          variant: variant ?? context.variant,
          size: size ?? context.size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupGlassItem.displayName = 'ToggleGroupGlassItem';

// ========================================
// COMPOUND EXPORT
// ========================================

/**
 * ToggleGroupGlass - A glass-themed segmented control / toggle button group
 *
 * @example
 * ```tsx
 * // Text alignment toolbar
 * <ToggleGroupGlass.Root type="single" defaultValue="left" aria-label="Text alignment">
 *   <ToggleGroupGlass.Item value="left" aria-label="Align left">
 *     <AlignLeft className="h-4 w-4" />
 *   </ToggleGroupGlass.Item>
 *   <ToggleGroupGlass.Item value="center" aria-label="Align center">
 *     <AlignCenter className="h-4 w-4" />
 *   </ToggleGroupGlass.Item>
 *   <ToggleGroupGlass.Item value="right" aria-label="Align right">
 *     <AlignRight className="h-4 w-4" />
 *   </ToggleGroupGlass.Item>
 *   <ToggleGroupGlass.Item value="justify" aria-label="Justify">
 *     <AlignJustify className="h-4 w-4" />
 *   </ToggleGroupGlass.Item>
 * </ToggleGroupGlass.Root>
 *
 * // View mode selector
 * <ToggleGroupGlass.Root type="single" value={view} onValueChange={setView}>
 *   <ToggleGroupGlass.Item value="grid">
 *     <Grid className="h-4 w-4 mr-2" />
 *     Grid
 *   </ToggleGroupGlass.Item>
 *   <ToggleGroupGlass.Item value="list">
 *     <List className="h-4 w-4 mr-2" />
 *     List
 *   </ToggleGroupGlass.Item>
 * </ToggleGroupGlass.Root>
 *
 * // Multiple selection with outline variant
 * <ToggleGroupGlass.Root type="multiple" variant="outline">
 *   <ToggleGroupGlass.Item value="bold">
 *     <Bold className="h-4 w-4" />
 *   </ToggleGroupGlass.Item>
 *   <ToggleGroupGlass.Item value="italic">
 *     <Italic className="h-4 w-4" />
 *   </ToggleGroupGlass.Item>
 *   <ToggleGroupGlass.Item value="underline">
 *     <Underline className="h-4 w-4" />
 *   </ToggleGroupGlass.Item>
 * </ToggleGroupGlass.Root>
 * ```
 */
export const ToggleGroupGlass = {
  Root: ToggleGroupGlassRoot,
  Item: ToggleGroupGlassItem,
};

// Named exports for direct imports
export { ToggleGroupGlassRoot, ToggleGroupGlassItem };
