/* eslint-disable react-refresh/only-export-components */
// ========================================
// YEAR CARD GLASS CONTEXT
// Context for compound component state
// ========================================

import { createContext, useContext } from 'react';

export interface YearCardContextValue {
  /** Whether the card is selected */
  isSelected: boolean;
  /** Whether the card is expanded */
  isExpanded: boolean;
  /** Callback when selection is triggered */
  onSelect?: () => void;
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
}

const YearCardContext = createContext<YearCardContextValue | null>(null);

/**
 * Hook to access YearCardGlass context
 * @throws Error if used outside of YearCardGlass.Root
 */
export function useYearCard(): YearCardContextValue {
  const context = useContext(YearCardContext);
  if (!context) {
    throw new Error('[YearCardGlass] useYearCard must be used within YearCardGlass.Root');
  }
  return context;
}

/**
 * Hook to optionally access YearCardGlass context
 * Returns null if used outside of YearCardGlass.Root
 */
export function useYearCardOptional(): YearCardContextValue | null {
  return useContext(YearCardContext);
}

export { YearCardContext };
