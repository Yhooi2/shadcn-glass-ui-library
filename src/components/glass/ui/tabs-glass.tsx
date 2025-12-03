/**
 * TabsGlass Component
 *
 * Glass-themed tab navigation with:
 * - Theme-aware styling (glass/light/aurora)
 * - Active tab indicator
 * - Smooth transitions
 */

import { forwardRef, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export interface TabItem {
  readonly id: string;
  readonly label: string;
}

// ========================================
// PROPS INTERFACE
// ========================================

export interface TabsGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  readonly tabs: readonly TabItem[];
  readonly activeTab: string;
  readonly onChange: (tabId: string) => void;
}

// ========================================
// COMPONENT
// ========================================

export const TabsGlass = forwardRef<HTMLDivElement, TabsGlassProps>(
  ({ className, tabs, activeTab, onChange, ...props }, ref) => {
    const containerStyles: CSSProperties = {
      background: 'var(--tab-container-bg)',
      border: '1px solid var(--tab-container-border)',
    };

    const getTabStyles = (isActive: boolean): CSSProperties => ({
      background: isActive ? 'var(--tab-active-bg)' : 'var(--tab-bg)',
      color: isActive ? 'var(--tab-active-text)' : 'var(--text-secondary)',
    });

    return (
      <div
        ref={ref}
        className={cn('flex gap-0.5 md:gap-1 p-0.5 md:p-1 rounded-xl', className)}
        style={containerStyles}
        role="tablist"
        {...props}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className="relative px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300"
              style={getTabStyles(isActive)}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
              {isActive && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 md:w-8 h-0.5 rounded-full"
                  style={{ background: 'var(--tab-indicator)' }}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

TabsGlass.displayName = 'TabsGlass';
