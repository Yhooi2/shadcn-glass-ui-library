/**
 * TabsGlass Component
 *
 * Glass-themed tab navigation with:
 * - Theme-aware styling (glass/light/aurora)
 * - Active tab indicator
 * - Smooth transitions
 * - **NEW**: Compound component API for advanced composition
 *
 * @example
 * Legacy API (still supported):
 * ```tsx
 * <TabsGlass
 *   tabs={[
 *     { id: 'overview', label: 'Overview' },
 *     { id: 'analytics', label: 'Analytics' }
 *   ]}
 *   activeTab={activeTab}
 *   onChange={setActiveTab}
 * />
 * ```
 *
 * @example
 * New Compound API:
 * ```tsx
 * <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
 *   <TabsGlass.List>
 *     <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
 *     <TabsGlass.Trigger value="analytics">Analytics</TabsGlass.Trigger>
 *     <TabsGlass.Trigger value="settings">Settings</TabsGlass.Trigger>
 *   </TabsGlass.List>
 *   <TabsGlass.Content value="overview">
 *     Overview content
 *   </TabsGlass.Content>
 *   <TabsGlass.Content value="analytics">
 *     Analytics content
 *   </TabsGlass.Content>
 *   <TabsGlass.Content value="settings">
 *     Settings content
 *   </TabsGlass.Content>
 * </TabsGlass.Root>
 * ```
 */

import {
  forwardRef,
  createContext,
  useContext,
  type CSSProperties,
  type FC,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import { useFocus } from '@/lib/hooks/use-focus';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export interface TabItem {
  readonly id: string;
  readonly label: string;
}

// ========================================
// CONTEXT FOR COMPOUND COMPONENTS
// ========================================

interface TabsContextValue {
  value: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within TabsGlass.Root');
  }
  return context;
};

// ========================================
// COMPOUND COMPONENT: ROOT
// ========================================

interface TabsRootProps {
  /** Current active tab value */
  value: string;
  /** Callback when tab value changes */
  onValueChange?: (value: string) => void;
  /** Child components */
  children: ReactNode;
  /** Optional className for container */
  className?: string;
}

const TabsRoot: FC<TabsRootProps> = ({ value, onValueChange, children, className }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn('tabs-glass-root', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

// ========================================
// COMPOUND COMPONENT: LIST
// ========================================

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(({ children, className }, ref) => {
  const containerStyles: CSSProperties = {
    background: 'var(--tab-container-bg)',
    border: '1px solid var(--tab-container-border)',
  };

  return (
    <div
      ref={ref}
      className={cn('flex gap-0.5 md:gap-1 p-0.5 md:p-1 rounded-xl', className)}
      style={containerStyles}
      role="tablist"
    >
      {children}
    </div>
  );
});

TabsList.displayName = 'TabsList';

// ========================================
// COMPOUND COMPONENT: TRIGGER
// ========================================

interface TabsTriggerProps {
  /** Value of this tab */
  value: string;
  /** Tab label/content */
  children: ReactNode;
  /** Optional className */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, children, className, disabled }, ref) => {
    const { value: activeValue, onValueChange } = useTabsContext();
    const { isFocusVisible, focusProps } = useFocus({ focusVisible: true });
    const isActive = activeValue === value;

    const tabStyles: CSSProperties = {
      background: isActive ? 'var(--tab-active-bg)' : 'var(--tab-bg)',
      color: isActive ? 'var(--tab-active-text)' : 'var(--text-secondary)',
      boxShadow: isFocusVisible && !disabled ? 'var(--tab-focus-glow)' : 'none',
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        disabled={disabled}
        className={cn(
          'relative px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-[background-color,color,opacity] duration-300',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        style={tabStyles}
        onClick={() => !disabled && onValueChange?.(value)}
        onFocus={focusProps.onFocus}
        onBlur={focusProps.onBlur}
      >
        {children}
        {isActive && (
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 md:w-8 h-0.5 rounded-full"
            style={{ background: 'var(--tab-indicator)' }}
          />
        )}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

// ========================================
// COMPOUND COMPONENT: CONTENT
// ========================================

interface TabsContentProps {
  /** Value of the tab this content belongs to */
  value: string;
  /** Content to display when tab is active */
  children: ReactNode;
  /** Optional className */
  className?: string;
}

const TabsContent: FC<TabsContentProps> = ({ value, children, className }) => {
  const { value: activeValue } = useTabsContext();
  const isActive = activeValue === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      aria-hidden={!isActive}
      className={cn('animate-in fade-in-0 duration-200', className)}
    >
      {children}
    </div>
  );
};

// ========================================
// LEGACY COMPONENT (BACKWARD COMPATIBLE)
// ========================================

/**
 * Props for the legacy TabsGlass API
 *
 * @deprecated Use the compound component API (TabsGlass.Root, TabsGlass.List, etc.) for better composition.
 * Legacy API is still supported but compound API is recommended for new code.
 */
export interface TabsGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  readonly tabs: readonly TabItem[];
  readonly activeTab: string;
  readonly onChange: (tabId: string) => void;
}

const LegacyTabsGlass = forwardRef<HTMLDivElement, TabsGlassProps>(
  ({ className, tabs, activeTab, onChange, ...props }, ref) => {
    return (
      <TabsRoot value={activeTab} onValueChange={onChange}>
        <TabsList ref={ref} className={className} {...props}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </TabsRoot>
    );
  }
);

LegacyTabsGlass.displayName = 'TabsGlass';

// ========================================
// EXPORT COMPOUND COMPONENT
// ========================================

export const TabsGlass = Object.assign(LegacyTabsGlass, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
