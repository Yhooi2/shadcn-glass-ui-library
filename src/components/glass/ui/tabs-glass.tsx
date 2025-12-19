/* eslint-disable react-refresh/only-export-components */
/**
 * TabsGlass Component (Radix UI based)
 *
 * Glass-themed tab navigation built on Radix UI primitives with:
 * - 100% shadcn/ui type compatibility
 * - Theme-aware styling (glass/light/aurora)
 * - Active tab indicator
 * - Full keyboard navigation (Arrow keys, Home, End)
 * - Support for orientation, dir, activationMode
 *
 * @since v2.2.6 - Migrated to Radix UI primitives for full type compatibility
 */

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

/**
 * Legacy TabItem interface for backwards compatibility
 */
export interface TabItem {
  readonly id: string;
  readonly label: string;
}

/**
 * Props for TabsGlass Root component
 *
 * Extends Radix UI Tabs.Root props for 100% shadcn/ui compatibility.
 * All Radix props are supported including: value, defaultValue, onValueChange,
 * orientation, dir, activationMode.
 *
 * **Type Compatibility (v2.3.1+):**
 * - Extends `React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>`
 * - No more `as unknown as` type assertions needed
 * - Full IntelliSense for all Radix props
 *
 * **New props from Radix:**
 * - `orientation`: 'horizontal' | 'vertical' - Tab layout direction
 * - `dir`: 'ltr' | 'rtl' - Text direction for RTL support
 * - `activationMode`: 'automatic' | 'manual' - Tab activation behavior
 *
 * @accessibility
 * - **Keyboard Navigation:** Arrow keys navigate between tabs (respects orientation)
 * - **Focus Management:** Visible focus ring using CSS variables
 * - **Screen Readers:** Radix UI handles all ARIA attributes automatically
 * - **RTL Support:** Full RTL support via `dir` prop
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 *
 * // Vertical tabs
 * <Tabs defaultValue="tab1" orientation="vertical">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 * </Tabs>
 *
 * // Manual activation (click required, not focus)
 * <Tabs defaultValue="tab1" activationMode="manual">
 *   ...
 * </Tabs>
 * ```
 *
 * @since v2.3.0 - Added shadcn/ui compatible separate exports
 * @since v2.2.6 - Migrated to Radix UI primitives
 */
export type TabsRootProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

/**
 * Props for TabsList component
 */
export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

/**
 * Props for TabsTrigger component
 */
export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;

/**
 * Props for TabsContent component
 */
export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

// ========================================
// COMPONENTS
// ========================================

/**
 * TabsRoot - Root container for tabs
 */
function TabsRoot({ className, ...props }: TabsRootProps) {
  return (
    <TabsPrimitive.Root data-slot="tabs" className={cn('tabs-glass-root', className)} {...props} />
  );
}

/**
 * TabsList - Container for tab triggers
 */
const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(
        'inline-flex gap-0.5 md:gap-1 p-0.5 md:p-1 rounded-xl',
        'bg-(--tab-container-bg) border border-(--tab-container-border)',
        className
      )}
      {...props}
    />
  )
);

TabsList.displayName = 'TabsList';

/**
 * TabsTrigger - Individual tab button
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(
      'relative px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg',
      'text-xs md:text-sm font-medium',
      'transition-[background-color,color,opacity,box-shadow] duration-300',
      // Inactive state
      'bg-(--tab-bg) text-(--text-secondary)',
      // Active state
      'data-[state=active]:bg-(--tab-active-bg) data-[state=active]:text-(--tab-active-text)',
      // Focus state
      'focus-visible:outline-none focus-visible:shadow-(--focus-glow)',
      // Disabled state
      'disabled:opacity-50 disabled:cursor-not-allowed',
      // Indicator (using ::after pseudo-element)
      'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2',
      'after:w-6 md:after:w-8 after:h-0.5 after:rounded-full',
      'after:bg-(--tab-indicator)',
      'after:opacity-0 data-[state=active]:after:opacity-100',
      'after:transition-opacity after:duration-300',
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Trigger>
));

TabsTrigger.displayName = 'TabsTrigger';

/**
 * TabsContent - Content panel for a tab
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn(
      'animate-in fade-in-0 duration-200 outline-none',
      'focus-visible:outline-none',
      className
    )}
    {...props}
  />
));

TabsContent.displayName = 'TabsContent';

// ========================================
// COMPOUND COMPONENT EXPORT
// ========================================

/**
 * TabsGlass - Compound Component API
 *
 * @example
 * ```tsx
 * // Compound API (TabsGlass.Root pattern)
 * <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
 *   <TabsGlass.List>
 *     <TabsGlass.Trigger value="tab1">Overview</TabsGlass.Trigger>
 *     <TabsGlass.Trigger value="tab2">Analytics</TabsGlass.Trigger>
 *   </TabsGlass.List>
 *   <TabsGlass.Content value="tab1">
 *     <p>Overview content</p>
 *   </TabsGlass.Content>
 *   <TabsGlass.Content value="tab2">
 *     <p>Analytics content</p>
 *   </TabsGlass.Content>
 * </TabsGlass.Root>
 *
 * // shadcn/ui compatible API (separate imports)
 * import { Tabs, TabsList, TabsTrigger, TabsContent } from 'shadcn-glass-ui'
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Overview</TabsTrigger>
 *     <TabsTrigger value="tab2">Analytics</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Overview content</TabsContent>
 *   <TabsContent value="tab2">Analytics content</TabsContent>
 * </Tabs>
 * ```
 *
 * @since v1.0.0 - Legacy API removed (tabs/activeTab/onChange props)
 * @since v2.3.0 - Added shadcn/ui compatible separate exports
 * @since v2.2.6 - Migrated to Radix UI primitives
 */
export const TabsGlass = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};

// ========================================
// SHADCN/UI COMPATIBLE EXPORTS
// ========================================

/**
 * Tabs - shadcn/ui compatible alias for TabsGlass.Root
 */
export const Tabs = TabsRoot;

export { TabsList, TabsTrigger, TabsContent };
