/* eslint-disable react-refresh/only-export-components */
// ========================================
// REPOSITORY CARD GLASS CONTEXT
// Context for compound component state
// ========================================

import { createContext, useContext } from 'react';

export interface RepositoryCardContextValue {
  /** Whether the card is expanded */
  expanded: boolean;
  /** Toggle expanded state */
  onToggle?: () => void;
}

const RepositoryCardContext = createContext<RepositoryCardContextValue | null>(null);

/**
 * Hook to access RepositoryCardGlass context
 * @throws Error if used outside of RepositoryCardGlass.Root
 */
export function useRepositoryCard(): RepositoryCardContextValue {
  const context = useContext(RepositoryCardContext);
  if (!context) {
    throw new Error(
      '[RepositoryCardGlass] useRepositoryCard must be used within RepositoryCardGlass.Root'
    );
  }
  return context;
}

/**
 * Hook to optionally access RepositoryCardGlass context
 * Returns null if used outside of RepositoryCardGlass.Root
 */
export function useRepositoryCardOptional(): RepositoryCardContextValue | null {
  return useContext(RepositoryCardContext);
}

export { RepositoryCardContext };
