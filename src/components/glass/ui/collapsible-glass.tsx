/* eslint-disable react-refresh/only-export-components */
/**
 * CollapsibleGlass Component
 *
 * Glass-themed collapsible section with:
 * - Theme-aware styling (glass/light/aurora)
 * - Smooth expand/collapse animations
 * - Controlled and uncontrolled modes
 * - 100% shadcn/ui Collapsible API compatible
 *
 * @accessibility
 * - Uses `aria-expanded` to indicate state
 * - Uses `aria-controls` to link trigger to content
 * - Keyboard accessible (Enter/Space to toggle)
 * - Content is hidden from screen readers when collapsed
 *
 * @example
 * ```tsx
 * // Basic collapsible
 * <CollapsibleGlass.Root>
 *   <CollapsibleGlass.Trigger>
 *     <ButtonGlass>Toggle</ButtonGlass>
 *   </CollapsibleGlass.Trigger>
 *   <CollapsibleGlass.Content>
 *     <div className="p-4">Hidden content</div>
 *   </CollapsibleGlass.Content>
 * </CollapsibleGlass.Root>
 *
 * // Controlled collapsible
 * <CollapsibleGlass.Root open={isOpen} onOpenChange={setIsOpen}>
 *   ...
 * </CollapsibleGlass.Root>
 * ```
 */

import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// ROOT COMPONENT
// ========================================

export type CollapsibleGlassRootProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Root
>;

const CollapsibleGlassRoot = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleGlassRootProps
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Root ref={ref} className={cn('w-full', className)} {...props} />
));

CollapsibleGlassRoot.displayName = 'CollapsibleGlassRoot';

// ========================================
// TRIGGER COMPONENT
// ========================================

export interface CollapsibleGlassTriggerProps extends React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Trigger
> {
  /** Render as child element (polymorphic) via asChild */
  asChild?: boolean;
}

const CollapsibleGlassTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleGlassTriggerProps
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      'flex w-full items-center justify-between',
      // Focus styling
      'focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));

CollapsibleGlassTrigger.displayName = 'CollapsibleGlassTrigger';

// ========================================
// CONTENT COMPONENT
// ========================================

export type CollapsibleGlassContentProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Content
>;

const CollapsibleGlassContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  CollapsibleGlassContentProps
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      // Animation for expand/collapse
      'overflow-hidden transition-all',
      'data-[state=closed]:animate-collapsible-up',
      'data-[state=open]:animate-collapsible-down',
      className
    )}
    {...props}
  >
    {children}
  </CollapsiblePrimitive.Content>
));

CollapsibleGlassContent.displayName = 'CollapsibleGlassContent';

// ========================================
// COMPOUND EXPORT
// ========================================

/**
 * CollapsibleGlass - A glass-themed expandable/collapsible section
 *
 * @example
 * ```tsx
 * // FAQ section with multiple collapsibles
 * {faqs.map((faq) => (
 *   <CollapsibleGlass.Root key={faq.id}>
 *     <GlassCard className="mb-2">
 *       <CollapsibleGlass.Trigger asChild>
 *         <button className="w-full p-4 flex justify-between items-center">
 *           <span>{faq.question}</span>
 *           <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
 *         </button>
 *       </CollapsibleGlass.Trigger>
 *       <CollapsibleGlass.Content>
 *         <div className="px-4 pb-4 text-muted-foreground">
 *           {faq.answer}
 *         </div>
 *       </CollapsibleGlass.Content>
 *     </GlassCard>
 *   </CollapsibleGlass.Root>
 * ))}
 *
 * // Settings section
 * <CollapsibleGlass.Root>
 *   <div className="flex items-center justify-between py-2">
 *     <h4 className="font-medium">Advanced Settings</h4>
 *     <CollapsibleGlass.Trigger asChild>
 *       <ButtonGlass variant="ghost" size="sm">
 *         <ChevronsUpDown className="h-4 w-4" />
 *       </ButtonGlass>
 *     </CollapsibleGlass.Trigger>
 *   </div>
 *   <CollapsibleGlass.Content>
 *     <div className="space-y-4 pt-4">
 *       <InputGlass label="Custom endpoint" />
 *       <CheckboxGlass label="Enable debug mode" />
 *     </div>
 *   </CollapsibleGlass.Content>
 * </CollapsibleGlass.Root>
 * ```
 */
export const CollapsibleGlass = {
  Root: CollapsibleGlassRoot,
  Trigger: CollapsibleGlassTrigger,
  Content: CollapsibleGlassContent,
};

// Named exports for direct imports
export { CollapsibleGlassRoot, CollapsibleGlassTrigger, CollapsibleGlassContent };
