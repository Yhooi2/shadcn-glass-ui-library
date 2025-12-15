/**
 * SplitLayoutGlass Component Exports
 *
 * Responsive two-column layout with sticky scroll behavior.
 * Compound Components API only (like ModalGlass).
 *
 * @since v2.2.0 - Legacy props API removed
 * @module split-layout-glass
 */

// Main component exports
export { SplitLayoutGlass } from './split-layout-glass';
export { SplitLayoutAccordion } from './split-layout-accordion';

// Hook exports
export { useSplitLayout, useSplitLayoutOptional } from './split-layout-context';

// Type exports
export type {
  // Context types
  SplitLayoutProviderProps,
  SplitLayoutContextValue,
  // Component props
  SplitLayoutRootProps,
  SplitLayoutSidebarProps,
  SplitLayoutSidebarHeaderProps,
  SplitLayoutSidebarContentProps,
  SplitLayoutSidebarFooterProps,
  SplitLayoutMainProps,
  SplitLayoutMainHeaderProps,
  SplitLayoutMainContentProps,
  SplitLayoutMainFooterProps,
  SplitLayoutTriggerProps,
} from './split-layout-glass';

export type { Breakpoint, MobileMode } from './split-layout-context';

export type {
  SplitLayoutAccordionRootProps,
  SplitLayoutAccordionItemProps,
} from './split-layout-accordion';
